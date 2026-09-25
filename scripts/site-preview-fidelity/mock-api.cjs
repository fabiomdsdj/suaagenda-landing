// API pública falsa para o white-label real, servindo a MESMA fixture que a
// bancada da landing usa (data/siteModels/fixtures/wl-fixture.json). Só local:
// nada sai da máquina. Precedente: mock-api das rodadas de tema do WL/admin.
//
//   node scripts/site-preview-fidelity/mock-api.cjs            (porta 3999)
//
// Subdomínio → variante (o WL resolve o tenant pelo Host):
//   fixture.wl.test            tema da fixture, "Só Site"
//   fixture-agenda.wl.test     idem, com agenda (modules + scheduling)
//   <preset>.wl.test           troca o preset (cores do estilo, como o editor)
//   <preset>-agenda.wl.test    idem, com agenda
const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const PORT = Number(process.env.MOCK_PORT || 3999)
const FIXTURE = path.join(__dirname, '../../data/siteModels/fixtures/wl-fixture.json')
const THEME_TS = path.join(__dirname, '../../utils/theme.ts')

// Cores de cada preset lidas do theme.ts (sem compilar TS): primary/secondary.
function presetColors() {
  const ts = fs.readFileSync(THEME_TS, 'utf8')
  const block = ts.slice(ts.indexOf('export const THEME_PRESETS'), ts.indexOf('export const DEFAULT_THEME_PRESET'))
  const out = {}
  for (const m of block.matchAll(/^\s{2}'?([a-z-]+)'?: \{[\s\S]*?primary: '(#[0-9a-f]{6})',\s*(?:\/\/.*\n\s*)*secondary: '(#[0-9a-f]{6})'/gm)) {
    out[m[1]] = { primaryColor: m[2], secondaryColor: m[3] }
  }
  return out
}
const PRESETS = presetColors()

function variant(subdomain) {
  const agenda = subdomain.endsWith('-agenda')
  const id = agenda ? subdomain.slice(0, -'-agenda'.length) : subdomain
  if (id !== 'fixture' && !PRESETS[id]) return null
  return { agenda, preset: id === 'fixture' ? null : id }
}

http.createServer((req, res) => {
  const fixture = JSON.parse(fs.readFileSync(FIXTURE, 'utf8'))
  res.setHeader('content-type', 'application/json')
  res.setHeader('access-control-allow-origin', req.headers.origin || '*')
  res.setHeader('access-control-allow-credentials', 'true')
  res.setHeader('access-control-allow-headers', req.headers['access-control-request-headers'] || '*')
  res.setHeader('access-control-allow-methods', 'GET,OPTIONS')
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end() }

  const url = req.url.split('?')[0]
  const bySub = url.match(/\/website\/by-subdomain\/([^/]+)$/)
  if (bySub) {
    const v = variant(bySub[1])
    if (!v) { res.statusCode = 404; return res.end('{}') }
    const website = { ...fixture.website, subdomain: bySub[1] }
    if (v.preset) Object.assign(website, { theme: { preset: v.preset } }, PRESETS[v.preset])
    if (v.agenda) website.modules = ['scheduling', 'whitelabel']
    return res.end(JSON.stringify(website))
  }
  if (url.endsWith('/services/public')) return res.end(JSON.stringify(fixture.services))
  if (url.endsWith('/employees/public')) return res.end(JSON.stringify(fixture.employees))
  if (url.endsWith('/units/public')) return res.end(JSON.stringify(fixture.units))
  res.end('[]')
}).listen(PORT, '127.0.0.1', () => console.log(`mock da API do WL em :${PORT} (${Object.keys(PRESETS).length} presets)`))
