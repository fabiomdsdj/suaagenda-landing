// Preview da landing x white-label real, com a mesma fixture, lado a lado.
// Tira print de página inteira nas larguras 390 e 1280 e conta pixels
// diferentes (mesma técnica do compare.cjs das rodadas de tema do WL).
//
// Pré-requisitos (ver README.md desta pasta):
//   1. mock:      node scripts/site-preview-fidelity/mock-api.cjs
//   2. WL real:   NUXT_PUBLIC_API_BASE=http://127.0.0.1:3999 (porta WL_PORT, padrão 3100)
//   3. landing:   npx nuxt dev --port LANDING_PORT (padrão 3200)
//
//   node scripts/site-preview-fidelity/compare.cjs [variante ...]
//     variante = fixture | fixture-agenda | <preset> | <preset>-agenda (padrão: fixture)
//   Saída: prints em OUT_DIR (padrão $TMPDIR/site-preview-fidelity) e uma linha por página/largura.
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const puppeteer = require(process.env.PUPPETEER_PATH || 'puppeteer')
const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome'
const WL = `http://%s.wl.test:${process.env.WL_PORT || 3100}`
const LANDING = `http://127.0.0.1:${process.env.LANDING_PORT || 3200}/dev/site-preview`
const OUT = path.resolve(process.env.OUT_DIR || path.join(os.tmpdir(), 'site-preview-fidelity'))
const WIDTHS = [390, 1280]
const PAGES = [['inicio', '/'], ['sobre', '/sobre'], ['como-chegar', '/localizacao']]
const variants = process.argv.slice(2).length ? process.argv.slice(2) : ['fixture']

// Congela o que é tempo/animação/rede de terceiros; o mapa do WL (Leaflet) e
// o hero em carrossel diferem por natureza — ver README.
const FREEZE = '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}'

function landingUrl(v, page) {
  const agenda = v.endsWith('-agenda')
  const id = agenda ? v.slice(0, -7) : v
  const qs = new URLSearchParams({ page })
  if (agenda) qs.set('canBook', '1')
  if (id !== 'fixture') qs.set('preset', id)
  return `${LANDING}?${qs}`
}

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--host-resolver-rules=MAP *.wl.test 127.0.0.1'],
  })
  const shot = async (url, width) => {
    const p = await browser.newPage()
    await p.setViewport({ width, height: 900, deviceScaleFactor: 1 })
    await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    await p.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
    await p.addStyleTag({ content: FREEZE })
    // Carrega as faces do par de fontes do tema antes do print (document.fonts.ready
    // só espera o que já foi pedido; fonte ainda não usada sairia no fallback).
    await p.evaluate(async () => {
      const el = document.querySelector('.sp-root') || document.documentElement
      const cs = getComputedStyle(el)
      const fams = `${cs.getPropertyValue('--body-font')},${cs.getPropertyValue('--heading-font')}`
      await Promise.all([...document.fonts].filter(f => fams.includes(f.family.replace(/["']/g, ''))).map(f => f.load().catch(() => {})))
      await document.fonts.ready
    })
    await new Promise(r => setTimeout(r, 700))
    const buf = await p.screenshot({ fullPage: true, encoding: 'base64' })
    await p.close()
    return buf
  }
  const cmp = await browser.newPage()
  for (const v of variants) {
    for (const [page, wlPath] of PAGES) {
      for (const width of WIDTHS) {
        const a = await shot(WL.replace('%s', v) + wlPath, width)
        const b = await shot(landingUrl(v, page), width)
        const tag = `${v}_${page}_${width}`
        fs.writeFileSync(path.join(OUT, `${tag}-wl.png`), Buffer.from(a, 'base64'))
        fs.writeFileSync(path.join(OUT, `${tag}-preview.png`), Buffer.from(b, 'base64'))
        const diff = await cmp.evaluate(async (a, b) => {
          const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s })
          const [ia, ib] = await Promise.all([load(a), load(b)])
          const w = Math.min(ia.width, ib.width); const h = Math.min(ia.height, ib.height)
          const px = img => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h).data }
          const da = px(ia); const db = px(ib); let n = 0; let first = -1
          for (let i = 0; i < da.length; i += 4) {
            if (Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]) > 24) { n++; if (first < 0) first = Math.floor(i / 4 / w) }
          }
          return { wl: `${ia.width}x${ia.height}`, preview: `${ib.width}x${ib.height}`, pct: (100 * n / (w * h)).toFixed(2), firstRow: first }
        }, a, b)
        console.log(`${tag.padEnd(34)} WL ${diff.wl.padEnd(10)} preview ${diff.preview.padEnd(10)} diferença ${diff.pct}% (1ª linha ${diff.firstRow})`)
      }
    }
  }
  await browser.close()
})().catch(e => { console.error(e); process.exit(1) })
