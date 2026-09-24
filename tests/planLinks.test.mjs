// Caminho de venda da landing: links de plano/cadastro e fonte dos preços.
// Roda sem dependências: `node --test tests/planLinks.test.mjs`
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const SCAN_DIRS = ['pages', 'layouts', 'components', 'composables']

function listFiles(dir) {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return []
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap((e) => {
    const rel = path.join(dir, e.name)
    if (e.isDirectory()) return listFiles(rel)
    return /\.(vue|ts|js|mjs)$/.test(e.name) ? [rel] : []
  })
}

const SOURCES = SCAN_DIRS.flatMap(listFiles).map((rel) => ({
  rel,
  text: fs.readFileSync(path.join(ROOT, rel), 'utf8'),
}))

function occurrences(regex) {
  return SOURCES.flatMap(({ rel, text }) =>
    text.split('\n').flatMap((line, i) => (regex.test(line) ? [`${rel}:${i + 1}: ${line.trim()}`] : [])))
}

test('nenhum link aponta para o admin/API antigos (admin.* é o posoperatorio)', () => {
  assert.deepEqual(occurrences(/admin\.suaagenda\.link|backend\.suaagenda\.link/), [])
})

test('choose-plan só é linkado pela rota que existe (/barbearia/choose-plan)', () => {
  assert.ok(fs.existsSync(path.join(ROOT, 'pages/barbearia/choose-plan.vue')))
  assert.deepEqual(occurrences(/["'`]\/choose-plan/), [])
  assert.ok(occurrences(/\/barbearia\/choose-plan\?segment=barber/).length > 0)
})

test('links de cadastro vão para o admin em app.suaagenda.link', () => {
  const register = occurrences(/\/admin\/auth\/register/)
  assert.ok(register.length > 0)
  const wrongHost = register.filter((l) => /https?:\/\//.test(l) && !l.includes('https://app.suaagenda.link/admin/auth/register'))
  assert.deepEqual(wrongHost, [])
})

test('/precos não tem preço fixo e usa o PlanSelector (/plans/public)', () => {
  const precos = fs.readFileSync(path.join(ROOT, 'pages/precos.vue'), 'utf8')
  assert.doesNotMatch(precos, /R\$\s?\d/)
  assert.match(precos, /<PlanSelector/)
  const selector = fs.readFileSync(path.join(ROOT, 'components/PlanSelector.vue'), 'utf8')
  assert.match(selector, /\/plans\/public/)
})

test('PlanSelector classifica Free e sob consulta por isCustomPricing, não pelo isTrial legado', () => {
  const src = fs.readFileSync(path.join(ROOT, 'components/PlanSelector.vue'), 'utf8')
  const fnSrc = ['isFree', 'isEnterprise'].map((name) => {
    const m = src.match(new RegExp(`function ${name}\\(plan: any\\)\\s*\\{[^}]*\\}`))
    assert.ok(m, `função ${name} não encontrada`)
    return m[0].replace(': any', '')
  }).join('\n')
  const { isFree, isEnterprise } = new Function(`${fnSrc}; return { isFree, isEnterprise }`)()

  // Formato real de /plans/public (isTrial zerado pelas migrations 20260704*).
  const free     = { id: 1, price: '0.00',  isTrial: false, isCustomPricing: false }
  const advanced = { id: 5, price: '0.00',  isTrial: false, isCustomPricing: true }
  const small    = { id: 3, price: '99.90', isTrial: false, isCustomPricing: false }

  assert.equal(isFree(free), true)
  assert.equal(isEnterprise(free), false)
  assert.equal(isFree(advanced), false)
  assert.equal(isEnterprise(advanced), true)
  assert.equal(isFree(small), false)
  assert.equal(isEnterprise(small), false)
})

test('trial anunciado é de 15 dias (nenhum CTA com 7 ou 30 dias grátis)', () => {
  assert.deepEqual(occurrences(/\b(7|30) dias grátis|grátis por (7|30) dias|começam com (7|30) dias/), [])
  assert.ok(occurrences(/15 dias grátis|grátis por 15 dias/).length > 0)
  for (const rel of ['pages/precos.vue', 'pages/barbearia/choose-plan.vue']) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8')
    assert.match(src, /config\.public\.trialDays[^\n]*\|\|\s*15\)/, `${rel}: default de trialDays deveria ser 15`)
  }
  const selector = fs.readFileSync(path.join(ROOT, 'components/PlanSelector.vue'), 'utf8')
  assert.match(selector, /^\s*trialDays:\s+15,$/m)
})

test('build de produção sem env usa api.suaagenda.link', () => {
  const cfg = fs.readFileSync(path.join(ROOT, 'nuxt.config.ts'), 'utf8')
  assert.match(cfg, /apiBase:[^,]*NODE_ENV === "production" \? "https:\/\/api\.suaagenda\.link"/)
  assert.doesNotMatch(cfg, /backend\.suaagenda\.link/)
})
