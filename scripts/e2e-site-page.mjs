// scripts/e2e-site-page.mjs — E2E da página pública /site-para-<segmento>.
//
// Roda contra o build de produção (a página existe no build, ao contrário da
// bancada). O script sobe um mock de /plans/public; o preview aponta para ele:
//
//   cd landing && npx nuxt build
//   PORT=3201 NUXT_PUBLIC_PLANS_API_BASE=http://127.0.0.1:3998 node .output/server/index.mjs
//   PUPPETEER_PATH=/caminho/node_modules/puppeteer node scripts/e2e-site-page.mjs
//
// Variáveis:
//   E2E_BASE       landing (padrão http://127.0.0.1:3201)
//   E2E_MOCK_PORT  porta do mock de planos (padrão 3998)
//   CHROME_PATH    padrão /usr/bin/google-chrome
//
// O mock de planos tem trialDays=15: aqui o CTA do Só Site cai no WhatsApp
// (fallback de utils/soSite.js). O caminho self-service (cadastro → checkout)
// vale quando o plano não tem trial.
//
// Sai com 1 se qualquer verificação falhar.
import { createRequire } from 'node:module'
import http from 'node:http'

const require = createRequire(import.meta.url)
const puppeteer = require(process.env.PUPPETEER_PATH || 'puppeteer')
const BASE = process.env.E2E_BASE || 'http://127.0.0.1:3201'
const MOCK_PORT = Number(process.env.E2E_MOCK_PORT || 3998)
const PAGE = `${BASE}/site-para-fisioterapia`
const wa = text => `https://wa.me/5511941649284?text=${encodeURIComponent(text)}`
const ctaText = (label, id) => `Quero contratar o Só Site. Segmento: Fisioterapia (physio). Modelo: ${label} (${id}).`

let failures = 0
function check(name, ok, detail = '') {
  if (!ok) failures++
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`)
}
const sleep = ms => new Promise(r => setTimeout(r, ms))
async function waitTrue(page, fn, arg, timeout = 5000) {
  try {
    await page.waitForFunction(fn, { timeout, polling: 50 }, arg)
    return true
  } catch {
    return false
  }
}

// ── Mock de /plans/public (formato real do plan.controller) ─────────────────
let planMode = 'trial' // 'trial' | 'empty'
const SO_SITE = { id: 11, name: 'Só Site', price: '39.90', isCustomPricing: false, trialDays: 15, sortOrder: 15,
  limits: { site: 'true', 'module.whitelabel': 'true', 'module.scheduling': 'false' } }
const mock = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json')
  if (req.url.split('?')[0] !== '/plans/public') { res.statusCode = 404; return res.end('{}') }
  res.end(JSON.stringify({ success: true, data: planMode === 'trial' ? [SO_SITE] : [] }))
})
await new Promise(r => mock.listen(MOCK_PORT, '127.0.0.1', r))

const errors = []
function watchErrors(page) {
  page.on('pageerror', err => errors.push(`pageerror: ${err.message}`))
}

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})

try {
  // ── SSR (HTML cru, sem JS) ────────────────────────────────────────────────
  const res = await fetch(PAGE)
  const html = await res.text()
  check('página responde 200', res.status === 200, `status ${res.status}`)
  check('SSR tem o h1 do segmento', html.includes('Site para fisioterapeutas e clínicas de fisioterapia</h1>'))
  check('SSR tem o modelo padrão (Clínica) no preview', html.includes('Avaliação fisioterapêutica') && /data-model="clinica"[^>]*aria-checked="true"|aria-checked="true"[^>]*data-model="clinica"/.test(html))
  check('SSR tem título, description e canonical',
    html.includes('<title>Site para fisioterapeutas e clínicas | SuaAgenda</title>')
    && html.includes('name="description" content="Escolha um modelo de site para fisioterapia')
    && html.includes('<link rel="canonical" href="https://suaagenda.link/site-para-fisioterapia">'))
  check('preview e editor com data-nosnippet', /data-nosnippet[^>]*>[\s\S]*data-preview-frame/.test(html))
  check('SSR tem as seções SEO e o FAQ', html.includes('Modelos pensados para a rotina da fisioterapia') && html.includes('Preciso saber programar para ter o site?'))
  check('SSR tem o preço do plano e nenhum "grátis" (plano com trialDays=15)', html.includes('R$ 39,90') && !/grátis|auth\/register/.test(html))
  check('SSR: CTA final vai ao WhatsApp com segmento real e modelo padrão', html.includes(`href="${wa(ctaText('Clínica', 'clinica')).replace(/&/g, '&amp;')}"`))

  const so = await (await fetch(`${BASE}/so-site`)).text()
  check('/so-site: preço, sem "grátis" e sem cadastro de trial', so.includes('R$ 39,90') && !/grátis|auth\/register/.test(so))
  check('/so-site: CTA principal no WhatsApp de vendas', so.includes(`href="${wa('Quero contratar o Só Site')}"`))

  for (const slug of ['xyz', 'barbearia']) {
    const r = await fetch(`${BASE}/site-para-${slug}`)
    check(`/site-para-${slug} responde 404 real`, r.status === 404, `status ${r.status}`)
  }

  const sm = await fetch(`${BASE}/__sitemap__/sites.xml`)
  const smXml = await sm.text()
  check('sitemap "sites" lista a página', sm.status === 200 && smXml.includes('<loc>https://suaagenda.link/site-para-fisioterapia</loc>'), `status ${sm.status}`)
  const idx = await (await fetch(`${BASE}/sitemap_index.xml`)).text()
  check('sitemap_index inclui o "sites"', idx.includes('/__sitemap__/sites.xml'))

  // ── Desktop: modelo, ?modelo=, sticky, CTA ────────────────────────────────
  const page = await browser.newPage()
  watchErrors(page)
  await page.setViewport({ width: 1440, height: 900 })
  // window.open do CTA: registra em vez de abrir o WhatsApp
  await page.evaluateOnNewDocument(() => {
    window.__opened = []
    window.open = (url, target, features) => { window.__opened.push({ url, target, features }); return null }
  })

  await page.goto(PAGE, { waitUntil: 'networkidle2', timeout: 60_000 })
  await page.waitForSelector('[data-model="clinica"][aria-checked="true"]')
  await sleep(300)
  const histBefore = await page.evaluate(() => history.length)
  await page.click('[data-model="reabilitacao"]')
  check('trocar de modelo muda o preview', await waitTrue(page, () =>
    document.querySelector('[data-preview-frame]').innerText.includes('Pós-operatório de joelho')))
  check('?modelo= acompanha a troca, sem entrada nova no histórico', await waitTrue(page, () =>
    new URL(location.href).searchParams.get('modelo') === 'reabilitacao')
    && (await page.evaluate(() => history.length)) === histBefore)
  check('CTA final acompanha o modelo',
    (await page.$eval('[data-cta-final]', a => a.href)) === wa(ctaText('Reabilitação', 'reabilitacao')))
  check('card de conversão mostra preço, sem teste grátis', (await page.$eval('[data-cta-price]', el =>
    el.textContent.replace(/\s+/g, ' ').trim())) === 'R$ 39,90/mês')

  // sticky: com a página rolada até o meio do editor, o preview fica abaixo do header fixo
  await page.$eval('[data-section]', el => el.scrollIntoView())
  const frameTopAt = async (dy) => {
    await page.evaluate(d => window.scrollBy(0, d), dy)
    await sleep(300)
    return page.$eval('[data-preview-frame]', el => el.getBoundingClientRect().top)
  }
  const top1 = await frameTopAt(400)
  const top2 = await frameTopAt(500)
  const headerBottom = await page.$eval('header', el => el.getBoundingClientRect().bottom)
  check('preview fica preso abaixo do header ao rolar (sticky)',
    Math.abs(top1 - top2) < 1 && top1 >= headerBottom && top1 < 200,
    `top ${Math.round(top1)} → ${Math.round(top2)} depois de +500px / header ${Math.round(headerBottom)}`)

  await page.click('[data-action="start"]')
  const opened = await page.evaluate(() => window.__opened)
  check('CTA do card abre o WhatsApp com segmento real e modelo',
    opened.length === 1 && opened[0].url === wa(ctaText('Reabilitação', 'reabilitacao')) && opened[0].target === '_blank',
    JSON.stringify(opened))

  const p2 = await browser.newPage()
  watchErrors(p2)
  await p2.goto(`${PAGE}?modelo=profissional`, { waitUntil: 'networkidle2' })
  check('?modelo=profissional abre no Profissional', !!(await p2.$('[data-model="profissional"][aria-checked="true"]')))
  await p2.goto(`${PAGE}?modelo=inexistente`, { waitUntil: 'networkidle2' })
  check('?modelo inválido cai no Clínica', !!(await p2.$('[data-model="clinica"][aria-checked="true"]')))

  // ── Sem plano (API fora / sem Só Site): WhatsApp, sem preço ───────────────
  planMode = 'empty'
  await p2.goto(PAGE, { waitUntil: 'networkidle2' })
  const waHref = await p2.$eval('[data-cta-final]', a => a.href)
  check('sem plano o CTA segue no WhatsApp com segmento e modelo', waHref === wa(ctaText('Clínica', 'clinica')), waHref)
  check('sem plano não mostra preço', !(await p2.$('[data-cta-price]')) && !(await p2.content()).includes('R$ '))
  planMode = 'trial'

  // ── 390px: sem rolagem horizontal (página nova + páginas do mesmo layout) ─
  const m = await browser.newPage()
  watchErrors(m)
  await m.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true })
  for (const route of ['/site-para-fisioterapia', '/so-site', '/termos', '/privacidade', '/']) {
    await m.goto(`${BASE}${route}`, { waitUntil: 'networkidle2', timeout: 60_000 })
    await sleep(300)
    const { sw, cw, sx } = await m.evaluate(() => {
      window.scrollTo(500, 0)
      return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, sx: window.scrollX }
    })
    check(`390px sem rolagem horizontal: ${route}`, sw <= cw && sx === 0, `scrollWidth ${sw} / ${cw}, scrollX ${sx}`)
  }

  check('zero pageerror', errors.length === 0, errors.join(' | '))
} finally {
  await browser.close()
  mock.close()
}

console.log(failures ? `\n${failures} falha(s)` : '\nOK')
process.exit(failures ? 1 : 0)
