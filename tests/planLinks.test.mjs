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

function loadClassifiers() {
  const src = fs.readFileSync(path.join(ROOT, 'components/PlanSelector.vue'), 'utf8')
  const names = ['isFree', 'isEnterprise', 'trialDaysOf', 'hasTrial', 'canSelfSignup']
  const fnSrc = names.map((name) => {
    const m = src.match(new RegExp(`function ${name}\\(plan: any\\)\\s*\\{[^}]*\\}`))
    assert.ok(m, `função ${name} não encontrada`)
    return m[0].replace(': any', '')
  }).join('\n')
  return new Function(`${fnSrc}; return { ${names.join(', ')} }`)()
}

// Formato real de /plans/public (isTrial zerado pelas migrations 20260704*;
// trialDays=15 pela 20260924100000; Growth sem trial).
const PLANS = {
  free:     { id: 1,  price: 0,      isTrial: false, isCustomPricing: false, trialDays: null },
  solo:     { id: 2,  price: 79.9,   isTrial: false, isCustomPricing: false, trialDays: 15 },
  small:    { id: 3,  price: 99.9,   isTrial: false, isCustomPricing: false, trialDays: 15 },
  medium:   { id: 4,  price: 149.9,  isTrial: false, isCustomPricing: false, trialDays: 15 },
  advanced: { id: 5,  price: 0,      isTrial: false, isCustomPricing: true,  trialDays: null },
  growth:   { id: 6,  price: 349.9,  isTrial: false, isCustomPricing: false, trialDays: null },
  growthAv: { id: 9,  price: 0,      isTrial: false, isCustomPricing: true,  trialDays: null },
  // isTrial legado ligado não pode virar trial nem grátis
  legacy:   { id: 99, price: 199.9,  isTrial: true,  isCustomPricing: false, trialDays: null },
}

test('PlanSelector classifica Free e sob consulta por isCustomPricing, não pelo isTrial legado', () => {
  const { isFree, isEnterprise } = loadClassifiers()
  assert.equal(isFree(PLANS.free), true)
  assert.equal(isEnterprise(PLANS.free), false)
  for (const p of [PLANS.advanced, PLANS.growthAv]) {
    assert.equal(isFree(p), false)
    assert.equal(isEnterprise(p), true)
  }
  assert.equal(isFree(PLANS.small), false)
  assert.equal(isEnterprise(PLANS.small), false)
  assert.equal(isFree(PLANS.legacy), false)
  assert.equal(isEnterprise(PLANS.legacy), false)
})

test('trial vem de plan.trialDays: Solo/Small/Medium 15, Growth e sob consulta sem trial', () => {
  const { trialDaysOf, hasTrial, canSelfSignup } = loadClassifiers()
  for (const p of [PLANS.solo, PLANS.small, PLANS.medium]) {
    assert.equal(hasTrial(p), true)
    assert.equal(trialDaysOf(p), 15)
    assert.equal(canSelfSignup(p), true)
  }
  for (const p of [PLANS.growth, PLANS.advanced, PLANS.growthAv, PLANS.legacy, PLANS.free]) {
    assert.equal(hasTrial(p), false, `plano ${p.id} não pode prometer trial`)
  }
  // sob consulta e pago sem trial não vão para /auth/register (a API devolve 422)
  for (const p of [PLANS.growth, PLANS.advanced, PLANS.growthAv, PLANS.legacy]) {
    assert.equal(canSelfSignup(p), false, `plano ${p.id} não pode ir para o cadastro`)
  }
  assert.equal(canSelfSignup(PLANS.free), true)

  const src = fs.readFileSync(path.join(ROOT, 'components/PlanSelector.vue'), 'utf8')
  assert.doesNotMatch(src, /props\.trialDays|trialDays:\s+\d/, 'trial não pode ser fixo no componente')
  assert.match(src, /v-if="hasTrial\(plano\)" class="ps-trial-chip"/)
  assert.match(src, /if \(canSelfSignup\(plano\)\) \{\s*window\.location\.href = buildUrl\(plano\)/)
})

test('nenhum texto de trial fixo (7/30 dias grátis) e nenhuma config de trialDays global', () => {
  assert.deepEqual(occurrences(/\b(7|30) dias grátis|grátis por (7|30) dias|começam com (7|30) dias/), [])
  assert.deepEqual(occurrences(/config\.public\.trialDays/), [])
  assert.deepEqual(occurrences(/Todos os planos pagos/), [])
})

test('PlanSelector busca /plans/public no plansApiBase (api.suaagenda.link em produção)', () => {
  const selector = fs.readFileSync(path.join(ROOT, 'components/PlanSelector.vue'), 'utf8')
  assert.match(selector, /config\.public\.plansApiBase/)
  assert.match(selector, /fetch\(`\$\{plansBase\}\/plans\/public`\)/)
  assert.deepEqual(occurrences(/apiBase\}\/plans\/public/), [])
  const cfg = fs.readFileSync(path.join(ROOT, 'nuxt.config.ts'), 'utf8')
  assert.match(cfg, /plansApiBase:[^,]*NODE_ENV === "production" \? "https:\/\/api\.suaagenda\.link"/)
})

test('build de produção sem env usa api.suaagenda.link', () => {
  const cfg = fs.readFileSync(path.join(ROOT, 'nuxt.config.ts'), 'utf8')
  assert.match(cfg, /apiBase:[^,]*NODE_ENV === "production" \? "https:\/\/api\.suaagenda\.link"/)
  assert.doesNotMatch(cfg, /backend\.suaagenda\.link/)
  const fly = fs.readFileSync(path.join(ROOT, 'fly.master.toml'), 'utf8')
  assert.doesNotMatch(fly, /backend\.suaagenda\.link|admin\.suaagenda\.link/)
})

test('preços antigos R$49/R$99/R$199 não aparecem', () => {
  assert.deepEqual(occurrences(/R\$\s?(49|99|199)(?![,.\d])/), [])
})
