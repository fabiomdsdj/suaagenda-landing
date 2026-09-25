// Página /so-site: plano achado por módulo, preço vindo da API, CTA.
// Roda sem dependências: `node --test tests/soSite.test.mjs`
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { findSoSitePlan, isSoSitePlan, soSiteCta, siteModelCtaText, formatBRL, paysNow, soSiteSignupUrl } from '../utils/soSite.js'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

// Formato real de /plans/public (plan.controller): limits achatado por key.
const plan = (id, price, limits, extra = {}) => ({
  id, name: `P${id}`, price, isCustomPricing: false, trialDays: 15, sortOrder: id * 10, limits, ...extra,
})
const COM_AGENDA = { site: 'true', 'module.whitelabel': 'true', 'module.scheduling': 'true', appointments_per_month: '200' }
const SO_SITE = { site: 'true', 'module.whitelabel': 'true', 'module.scheduling': 'false', max_units: '1' }
const CATALOGO = {
  success: true,
  data: [
    plan(1, 0, { site: 'false', 'module.whitelabel': 'false', 'module.scheduling': 'true' }, { trialDays: null }),
    plan(2, 79.9, COM_AGENDA),
    plan(11, 39.9, SO_SITE, { name: 'Só Site', sortOrder: 15 }),
    plan(10, 299.9, { 'module.whitelabel': 'false', 'module.scheduling': 'false' }, { trialDays: null }),
    plan(5, 0, SO_SITE, { isCustomPricing: true }),
  ],
}

test('acha o Só Site pelos módulos (site sem agenda), não por id/nome', () => {
  const p = findSoSitePlan(CATALOGO)
  assert.equal(p.id, 11)
  assert.equal(findSoSitePlan(CATALOGO.data).id, 11)
})

test('não confunde com plano com agenda, Growth IA, sob consulta ou grátis', () => {
  assert.equal(isSoSitePlan(plan(2, 79.9, COM_AGENDA)), false)
  assert.equal(isSoSitePlan(plan(10, 299.9, { 'module.whitelabel': 'false', 'module.scheduling': 'false' })), false)
  assert.equal(isSoSitePlan(plan(5, 0, SO_SITE, { isCustomPricing: true })), false)
  assert.equal(isSoSitePlan(plan(7, 0, SO_SITE)), false)
})

test('sem plano Só Site no catálogo → null (página cai no WhatsApp)', () => {
  assert.equal(findSoSitePlan({ data: [plan(2, 79.9, COM_AGENDA)] }), null)
  assert.equal(findSoSitePlan(null), null)
  assert.equal(soSiteCta(null).kind, 'whatsapp')
  assert.equal(soSiteCta(null, { segmentType: 'physio', siteModel: 'clinica' }).kind, 'whatsapp')
})

test('preço exibido é o do plano (mudar no banco muda a página)', () => {
  assert.equal(formatBRL(39.9), 'R$ 39,90')
  assert.equal(formatBRL(findSoSitePlan({ data: [plan(11, 44.9, SO_SITE)] }).price), 'R$ 44,90')
})

const SEM_TRIAL = { ...findSoSitePlan(CATALOGO), trialDays: null }

test('Só Site sem trialDays = pagamento imediato → CTA no cadastro self-service', () => {
  assert.equal(paysNow(SEM_TRIAL), true)
  assert.equal(paysNow({ ...SEM_TRIAL, trialDays: 0 }), true)
  assert.deepEqual(soSiteCta(SEM_TRIAL), {
    kind: 'signup',
    href: 'https://app.suaagenda.link/admin/auth/register?planId=11&billingCycle=monthly',
  })
})

test('plano ainda com trialDays > 0 no banco → WhatsApp (o cadastro daria trial)', () => {
  const p = findSoSitePlan(CATALOGO)
  assert.equal(p.trialDays, 15)
  assert.equal(paysNow(p), false)
  assert.deepEqual(soSiteCta(p), {
    kind: 'whatsapp',
    href: `https://wa.me/5511941649284?text=${encodeURIComponent('Quero contratar o Só Site')}`,
  })
})

test('URL do cadastro leva plano, segmento real e modelo; adminBase configurável', () => {
  assert.equal(
    soSiteSignupUrl(SEM_TRIAL, { segmentType: 'physio', siteModel: 'clinica' }),
    'https://app.suaagenda.link/admin/auth/register?planId=11&billingCycle=monthly&segmentType=physio&siteModel=clinica',
  )
  assert.equal(
    soSiteCta(SEM_TRIAL, { adminBase: 'http://localhost:3000/', segmentType: 'physio', siteModel: 'reabilitacao' }).href,
    'http://localhost:3000/admin/auth/register?planId=11&billingCycle=monthly&segmentType=physio&siteModel=reabilitacao',
  )
  // modelo sem segmento não vai (o modelo só existe dentro de um segmento)
  assert.doesNotMatch(soSiteSignupUrl(SEM_TRIAL, { siteModel: 'clinica' }), /siteModel/)
})

test('a página não tem preço escrito no código e usa /plans/public', () => {
  const page = fs.readFileSync(path.join(ROOT, 'pages/so-site.vue'), 'utf8')
  assert.doesNotMatch(page, /R\$\s?\d/)
  assert.doesNotMatch(page, /39[,.]9/)
  assert.match(page, /\/plans\/public/)
  assert.match(page, /findSoSitePlan/)
})

test('páginas /site-para-*: fallback de WhatsApp com o segmento real (segment_types) e o modelo', () => {
  const text = siteModelCtaText({ segmentLabel: 'Fisioterapia', segmentType: 'physio', modelLabel: 'Reabilitação', modelId: 'reabilitacao' })
  assert.equal(text, 'Quero contratar o Só Site. Segmento: Fisioterapia (physio). Modelo: Reabilitação (reabilitacao).')
  assert.equal(soSiteCta(null, { text }).href, `https://wa.me/5511941649284?text=${encodeURIComponent(text)}`)
})

test('oferta Só Site não anuncia teste grátis; a URL do cadastro só sai de utils/soSite.js (que checa trialDays)', () => {
  for (const file of ['pages/so-site.vue', 'pages/site-para-[segmento].vue', 'components/site-configurator/ConversionCard.vue']) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8')
    assert.doesNotMatch(src, /dias grátis|trialDays|auth\/register/, file)
  }
})

test('a página /site-para-[segmento] usa /plans/public e soSiteCta, sem preço no código', () => {
  const page = fs.readFileSync(path.join(ROOT, 'pages/site-para-[segmento].vue'), 'utf8')
  assert.doesNotMatch(page, /R\$\s?\d/)
  assert.doesNotMatch(page, /39[,.]9/)
  assert.match(page, /\/plans\/public/)
  assert.match(page, /findSoSitePlan/)
  assert.match(page, /soSiteCta/)
})
