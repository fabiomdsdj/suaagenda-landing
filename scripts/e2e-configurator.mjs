// scripts/e2e-configurator.mjs — E2E do configurador (etapa 4) na bancada.
//
// A bancada /dev/site-configurator só existe em `nuxt dev` (no build de
// produção ela responde 404 — é o que se confere com E2E_PROD_BASE). Por isso
// o fluxo roda contra o dev, como a bancada de fidelidade do preview:
//
//   cd landing && npx nuxt dev --port 3200
//   PUPPETEER_PATH=/caminho/node_modules/puppeteer node scripts/e2e-configurator.mjs
//
// Variáveis:
//   E2E_BASE       landing em dev (padrão http://127.0.0.1:3200)
//   E2E_PROD_BASE  opcional: landing de `nuxt build && nuxt preview`; confere 404
//   CHROME_PATH    padrão /usr/bin/google-chrome
//   E2E_HEADFUL=1  abre a janela
//
// Sai com 1 se qualquer verificação falhar.
import { createRequire } from 'node:module'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const require = createRequire(import.meta.url)
const puppeteer = require(process.env.PUPPETEER_PATH || 'puppeteer')
const BASE = process.env.E2E_BASE || 'http://127.0.0.1:3200'
const PROD_BASE = process.env.E2E_PROD_BASE || ''
const URL_BENCH = `${BASE}/dev/site-configurator`

let failures = 0
const results = []
function check(name, ok, detail = '') {
  results.push({ name, ok })
  if (!ok) failures++
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`)
}

const sleep = ms => new Promise(r => setTimeout(r, ms))
const norm = s => (s || '').replace(/\s+/g, ' ').trim()

/** Espera a condição (função no browser) ficar verdadeira; devolve se ficou. */
async function waitTrue(page, fn, arg, timeout = 5000) {
  try {
    await page.waitForFunction(fn, { timeout, polling: 50 }, arg)
    return true
  } catch {
    return false
  }
}

const previewText = page => page.$eval('[data-preview-frame]', el => el.innerText.replace(/\s+/g, ' '))
const rootVar = (page, name) => page.$eval('[data-preview-frame] .sp-root', (el, n) => el.style.getPropertyValue(n).trim(), name)

/** Troca o valor de um input como o usuário faria (seleciona tudo e digita). */
async function typeInto(page, selector, text) {
  const el = await page.$(selector)
  if (!el) throw new Error(`campo não encontrado: ${selector}`)
  await el.click({ clickCount: 3 })
  await page.keyboard.down('Control')
  await page.keyboard.press('KeyA')
  await page.keyboard.up('Control')
  await page.keyboard.press('Backspace')
  await el.type(text)
}

async function openSection(page, name) {
  await page.$eval(`[data-section="${name}"]`, (el) => { el.open = true })
}

/**
 * Erros relevantes: pageerror sempre; console.error menos
 *  - imagem de exemplo ainda não enviada ao Cloudinary (public_ids de
 *    data/siteModels) e o gtag;
 *  - PRÉ-EXISTENTE: assets/css/fonts.css (global da landing) declara Inter e
 *    Poppins em /fonts/*.woff2|ttf que não existem em public/fonts. Vai para
 *    `known` (aviso), não para falha — não é do configurador.
 */
const known = new Set()
function watchErrors(page, bucket) {
  page.on('pageerror', err => bucket.push(`pageerror: ${err.message}`))
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return
    const url = msg.location()?.url || ''
    if (/res\.cloudinary\.com|googletagmanager|google-analytics/.test(url)) return
    if (/^https?:\/\/[^/]+\/fonts\/[\w-]+\.(woff2|ttf)$/.test(url)) {
      known.add(new URL(url).pathname)
      return
    }
    bucket.push(`console: ${msg.text()} ${url}`)
  })
  page.on('requestfailed', (req) => {
    const url = req.url()
    if (/res\.cloudinary\.com|googletagmanager|google-analytics|\/_nuxt\/.*\.(woff2?|ttf)/.test(url)) return
    if (req.failure()?.errorText === 'net::ERR_ABORTED') return
    bucket.push(`requestfailed: ${url} ${req.failure()?.errorText}`)
  })
}

/** Imagem de teste (2000×1500 PNG) gerada num canvas e salva em disco. */
async function makeFixture(browser) {
  const page = await browser.newPage()
  const b64 = await page.evaluate(() => {
    const c = document.createElement('canvas')
    c.width = 2000
    c.height = 1500
    const ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, 2000, 1500)
    g.addColorStop(0, '#0ea5e9')
    g.addColorStop(1, '#22c55e')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 2000, 1500)
    return c.toDataURL('image/png').split(',')[1]
  })
  await page.close()
  const file = path.join(os.tmpdir(), `e2e-configurator-${process.pid}.png`)
  fs.writeFileSync(file, Buffer.from(b64, 'base64'))
  return file
}

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  headless: process.env.E2E_HEADFUL ? false : 'new',
  args: ['--no-sandbox'],
})

try {
  const fixture = await makeFixture(browser)
  const errors = []
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  watchErrors(page, errors)

  const res = await page.goto(URL_BENCH, { waitUntil: 'networkidle2', timeout: 120_000 })
  check('bancada abre (200)', res?.status() === 200, `status ${res?.status()}`)
  // hidratação: o botão de modelo precisa responder
  await page.waitForSelector('[data-model="clinica"][aria-checked="true"]')
  await sleep(300)

  // ── Modelo ────────────────────────────────────────────────────────────
  let text = await previewText(page)
  // A foto do modelo ainda não existe no Cloudinary (404, e em geral falha
  // antes da hidratação): o topo tem de cair no degradê, sem imagem quebrada.
  check('foto do modelo que não carrega cai no degradê', await waitTrue(page, () =>
    !!document.querySelector('[data-preview-frame] .sp-hero--gradient .sp-hero__gradient')
    && !document.querySelector('[data-preview-frame] .sp-hero__img'), null, 10_000))
  check('modelo Clínica aparece', text.includes('Avaliação fisioterapêutica') && text.includes('Pilates em grupo'))

  await page.click('[data-model="reabilitacao"]')
  check('Pós-Operatória muda os serviços (e mostra os pacotes)', await waitTrue(page, () => {
    const t = document.querySelector('[data-preview-frame]').innerText
    return t.includes('Fisioterapia para recuperação de joelho') && t.includes('Recuperação Intensiva (10 sessões)')
      && !t.includes('Pilates em grupo')
  }))

  await page.click('[data-model="profissional"]')
  check('Profissional muda o conteúdo', await waitTrue(page, () => {
    const t = document.querySelector('[data-preview-frame]').innerText
    return t.includes('Atendimento individual, do começo ao fim') && t.includes('Fisioterapia domiciliar')
  }))
  await page.click('[data-model="clinica"]')
  await waitTrue(page, () => document.querySelector('[data-preview-frame]').innerText.includes('Pilates em grupo'))

  // ── Identidade ────────────────────────────────────────────────────────
  await typeInto(page, '[data-field="businessName"] input', 'Studio Fisio Fabio')
  check('nome muda no topo do site', await waitTrue(page, () =>
    document.querySelector('[data-preview-frame] .sp-header__name')?.textContent.trim() === 'Studio Fisio Fabio'))
  await page.click('[data-page="sobre"]')
  check('nome muda no Sobre', await waitTrue(page, () => {
    const t = document.querySelector('[data-preview-frame] main').innerText
    return !!document.querySelector('[data-preview-frame] .sp-about-hero') && t.includes('Studio Fisio Fabio')
  }))
  await page.click('[data-page="inicio"]')
  await page.waitForSelector('[data-preview-frame] .sp-hero')

  await page.click('[data-model="reabilitacao"]')
  await waitTrue(page, () => document.querySelector('[data-preview-frame]').innerText.includes('Fisioterapia para recuperação de joelho'))
  check('nome permanece ao trocar de modelo',
    (await page.$eval('[data-preview-frame] .sp-header__name', el => el.textContent.trim())) === 'Studio Fisio Fabio')

  // ── Visual ────────────────────────────────────────────────────────────
  const before = { primary: await rootVar(page, '--primary'), button: await rootVar(page, '--button') }
  await typeInto(page, 'input[aria-label="Código da cor"]', '#e11d48')
  const colorOk = await waitTrue(page, () =>
    document.querySelector('[data-preview-frame] .sp-root').style.getPropertyValue('--primary').trim() === '#e11d48')
  const after = { primary: await rootVar(page, '--primary'), button: await rootVar(page, '--button') }
  const bar = await page.$eval('[data-preview-frame] .sp-section-title__bar', el => getComputedStyle(el).backgroundColor)
  check('cor muda --primary e o botão calculado', colorOk && after.button !== before.button && bar === 'rgb(225, 29, 72)',
    `${before.button} → ${after.button}; barra ${bar}`)

  const bgBefore = await rootVar(page, '--background')
  await page.click('[data-preset="preto-amarelo"]')
  check('estilo muda o tema', await waitTrue(page, prev =>
    document.querySelector('[data-preview-frame] .sp-root').style.getPropertyValue('--background').trim() !== prev, bgBefore))
  check('estilo marcado', !!(await page.$('[data-preset="preto-amarelo"][aria-pressed="true"]')))

  await page.click('[data-font="impacto"]')
  check('fonte muda o título do site', await waitTrue(page, () =>
    getComputedStyle(document.querySelector('[data-preview-frame] .sp-hero__title')).fontFamily.includes('Anton')))

  await page.click('[data-radius="none"]')
  check('cantos mudam', await waitTrue(page, () =>
    document.querySelector('[data-preview-frame] .sp-root').style.getPropertyValue('--card-radius').trim() === '0px'))

  // ── Serviços ──────────────────────────────────────────────────────────
  await openSection(page, 'servicos')
  const rows = () => page.$$eval('[data-service-row]', els => els.length)
  const cards = () => page.$$eval('[data-preview-frame] .sp-service', els => els.length)
  // 8 serviços no editor; no site, 8 + 4 pacotes (categoria Pacotes)
  check('serviços do modelo no editor e no site', (await rows()) === 8 && (await cards()) === 12, `${await rows()} linhas, ${await cards()} cards`)
  const cats = await page.$$eval('[data-field="serviceCategory"]', els => els.map(s => s.value))
  check('categoria de cada serviço no editor', cats.join() === 'avaliacao,pos-operatorio,pos-operatorio,pos-operatorio,pos-operatorio,terapias,terapias,avaliacao', cats.join())
  await page.select('[data-service-row]:nth-child(5) [data-field="serviceCategory"]', 'pacotes')
  check('trocar categoria agrupa o serviço no site', await waitTrue(page, () => {
    const groups = [...document.querySelectorAll('[data-preview-frame] .sp-services__group')]
    const sizes = groups.map(g => g.querySelectorAll('.sp-service').length).sort()
    return sizes.join() === '2,2,3,5'
  }))

  await typeInto(page, '[data-service-row]:first-child [data-field="serviceName"] input', 'Avaliação de joelho')
  check('editar nome do serviço', await waitTrue(page, () =>
    document.querySelector('[data-preview-frame]').innerText.includes('Avaliação de joelho')))

  await typeInto(page, '[data-service-row]:first-child [data-field="servicePrice"] input', '321,00')
  check('editar preço do serviço', await waitTrue(page, () =>
    document.querySelector('[data-preview-frame]').innerText.replace(/\s+/g, ' ').includes('R$ 321,00')))

  // conteúdo editado: trocar de modelo pede confirmação; recusar mantém
  let dialogMessage = ''
  page.once('dialog', async (d) => { dialogMessage = d.message(); await d.dismiss() })
  await page.click('[data-model="profissional"]')
  await sleep(300)
  check('troca com edição pede confirmação', dialogMessage === 'Trocar de modelo substitui textos e serviços. Continuar?', dialogMessage)
  check('recusar mantém o modelo', !!(await page.$('[data-model="reabilitacao"][aria-checked="true"]'))
    && (await previewText(page)).includes('Avaliação de joelho'))

  await page.click('[data-service-row]:last-child [data-action="remove-service"]')
  check('remover serviço', await waitTrue(page, () =>
    document.querySelectorAll('[data-service-row]').length === 7
    && document.querySelectorAll('[data-preview-frame] .sp-service').length === 11))

  // ── Pacotes ───────────────────────────────────────────────────────────
  await openSection(page, 'pacotes')
  check('pacotes no editor', (await page.$$eval('[data-package-row]', els => els.length)) === 4)
  await typeInto(page, '[data-package-row]:first-child [data-field="packageSessions"]', '6')
  check('editar sessões do pacote muda o nome no site', await waitTrue(page, () =>
    document.querySelector('[data-preview-frame]').innerText.includes('Recuperação Inicial (6 sessões)')))
  await typeInto(page, '[data-package-row]:first-child [data-field="packagePrice"] input', '777,00')
  check('editar preço do pacote', await waitTrue(page, () =>
    document.querySelector('[data-preview-frame]').innerText.replace(/\s+/g, ' ').includes('R$ 777,00')))
  await typeInto(page, '[data-package-row]:first-child [data-field="packageSessions"]', '0')
  await page.$eval('[data-package-row]:first-child [data-field="packageSessions"]', el => el.blur())
  check('sessões inválidas não entram (volta ao valor em vigor)', await waitTrue(page, () =>
    document.querySelector('[data-package-row] [data-field="packageSessions"]').value === '6'
    && document.querySelector('[data-preview-frame]').innerText.includes('Recuperação Inicial (6 sessões)')))

  for (let i = 0; i < 10; i++) {
    const disabled = await page.$eval('[data-action="add-service"]', b => b.disabled)
    if (disabled) break
    await page.click('[data-action="add-service"]')
  }
  await sleep(200)
  check('adicionar até 12', (await rows()) === 12 && (await cards()) === 16, `${await rows()} linhas, ${await cards()} cards`)
  const addDisabled = await page.$eval('[data-action="add-service"]', b => b.disabled)
  await page.$eval('[data-action="add-service"]', b => b.click()) // clique forçado
  await sleep(200)
  check('13º serviço bloqueado', addDisabled && (await rows()) === 12 && (await cards()) === 16)

  // ── Imagem ────────────────────────────────────────────────────────────
  const photoInput = await page.$('input[data-image-input="photo"]')
  await photoInput.uploadFile(fixture)
  check('upload da foto principal vira blob: no site', await waitTrue(page, () =>
    !!document.querySelector('[data-preview-frame] .sp-hero__img[src^="blob:"]'), null, 10_000))
  const size = await page.$eval('[data-preview-frame] .sp-hero__img', img => new Promise((resolve) => {
    const probe = new Image()
    probe.onload = () => resolve([probe.naturalWidth, probe.naturalHeight])
    probe.src = img.src
  }))
  check('foto reduzida para 1600px', size[0] === 1600 && size[1] === 1200, size.join('×'))

  const logoInput = await page.$('input[data-image-input="logo"]')
  await logoInput.uploadFile(fixture)
  check('upload do logo vira blob: no topo', await waitTrue(page, () =>
    !!document.querySelector('[data-preview-frame] .sp-header__logo[src^="blob:"]'), null, 10_000))

  // ── Navegação ─────────────────────────────────────────────────────────
  await page.click('[data-page="sobre"]')
  check('navegar: Sobre', await waitTrue(page, () => !!document.querySelector('[data-preview-frame] .sp-about-hero')))
  await page.click('[data-page="como-chegar"]')
  check('navegar: Como chegar', await waitTrue(page, () => !!document.querySelector('[data-preview-frame] .sp-loc-hero')))
  await page.click('[data-page="inicio"]')
  check('navegar: Início', await waitTrue(page, () => !!document.querySelector('[data-preview-frame] .sp-hero')))
  // link do próprio site (header) também navega, sem router
  const urlBefore = page.url()
  await page.$$eval('[data-preview-frame] .sp-header__nav .sp-header__link', (links) => {
    links.find(a => a.textContent.includes('Sobre'))?.click()
  })
  check('link do site navega no preview (sem mudar a URL)', await waitTrue(page, () =>
    !!document.querySelector('[data-preview-frame] .sp-about-hero')) && page.url() === urlBefore)
  await page.click('[data-page="inicio"]')

  // ── Celular x computador (container query, não a janela) ─────────────
  const layout = () => page.$eval('[data-preview-frame] .sp-root', el => ({
    width: el.offsetWidth,
    toggle: getComputedStyle(el.querySelector('.sp-header__toggle')).display,
  }))
  const mobile = await layout()
  check('modo celular: site com 390px e menu ☰', mobile.width === 390 && mobile.toggle !== 'none', JSON.stringify(mobile))
  await page.click('[data-device="desktop"]')
  await sleep(200)
  const desktop = await layout()
  check('modo computador: site com 1280px e menu aberto', desktop.width === 1280 && desktop.toggle === 'none', JSON.stringify(desktop))
  const contained = await page.$eval('.cfg-stage', (stage) => {
    const s = stage.getBoundingClientRect()
    const f = stage.querySelector('[data-preview-frame]').getBoundingClientRect()
    return f.left >= s.left - 1 && f.right <= s.right + 1 && stage.scrollWidth <= stage.clientWidth + 1
  })
  check('modo computador: moldura reduzida e contida', contained)

  // preview fica visível enquanto o editor rola (sticky)
  await page.click('[data-device="mobile"]')
  await page.$eval('[data-section="contato"]', (el) => { el.open = true; el.scrollIntoView() })
  await sleep(200)
  const stickyTop = await page.$eval('.cfg-stage', el => el.getBoundingClientRect().top)
  check('preview acompanha a rolagem do editor', stickyTop >= 0 && stickyTop < 200, `top ${Math.round(stickyTop)}`)

  // ── Reset ─────────────────────────────────────────────────────────────
  await page.click('[data-action="reset"]')
  check('desfazer volta ao modelo', await waitTrue(page, () => {
    const t = document.querySelector('[data-preview-frame]').innerText
    return t.includes('Recupera Fisioterapia') && !t.includes('Avaliação de joelho')
      && !document.querySelector('[data-preview-frame] img[src^="blob:"]')
  }))

  // ── CTA ───────────────────────────────────────────────────────────────
  await page.click('[data-action="start"]')
  check('CTA emite segmento e modelo', await waitTrue(page, () =>
    (document.querySelector('[data-cta-result]')?.textContent || '').includes('segment=fisioterapia segmentType=physio modelo=reabilitacao')))

  // ── 390px ─────────────────────────────────────────────────────────────
  const phone = await browser.newPage()
  const phoneErrors = []
  watchErrors(phone, phoneErrors)
  await phone.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  await phone.goto(URL_BENCH, { waitUntil: 'networkidle2', timeout: 120_000 })
  await phone.waitForSelector('[data-model="clinica"][aria-checked="true"]')
  await sleep(300)
  for (const s of ['textos', 'servicos', 'profissional', 'contato']) await openSection(phone, s)
  const overflow = async () => phone.evaluate(() => ({
    doc: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
    inner: window.innerWidth,
  }))
  let o = await overflow()
  check('390px: sem overflow horizontal', o.doc <= o.inner && o.body <= o.inner, JSON.stringify(o))
  const phoneFrame = async () => phone.$eval('.cfg-stage', (stage) => {
    const s = stage.getBoundingClientRect()
    const f = stage.querySelector('[data-preview-frame]').getBoundingClientRect()
    return { ok: f.left >= s.left - 1 && f.right <= s.right + 1 && s.right <= window.innerWidth, stage: Math.round(s.width), frame: Math.round(f.width) }
  })
  let pf = await phoneFrame()
  check('390px: preview contido na moldura (celular)', pf.ok, JSON.stringify(pf))
  await phone.click('[data-device="desktop"]')
  await sleep(200)
  o = await overflow()
  pf = await phoneFrame()
  check('390px: preview contido na moldura (computador)', pf.ok && o.doc <= o.inner, JSON.stringify({ ...pf, ...o }))

  // ── Erros ─────────────────────────────────────────────────────────────
  const all = [...errors, ...phoneErrors]
  check('zero pageerror / console error relevante', all.length === 0, all.join(' | '))
  if (known.size) console.log(`  aviso (pré-existente, fonts.css global): 404 em ${[...known].join(', ')}`)

  // ── Produção: bancada é 404 ───────────────────────────────────────────
  if (PROD_BASE) {
    const prod = await fetch(`${PROD_BASE}/dev/site-configurator`)
    check('build de produção: /dev/site-configurator = 404', prod.status === 404, `status ${prod.status}`)
  }

  fs.rmSync(fixture, { force: true })
} catch (err) {
  failures++
  console.error('✗ erro inesperado:', err)
} finally {
  await browser.close()
}

console.log(`\n${results.filter(r => r.ok).length}/${results.length} verificações ok${failures ? ` — ${failures} falha(s)` : ''}`)
process.exit(failures ? 1 : 0)
