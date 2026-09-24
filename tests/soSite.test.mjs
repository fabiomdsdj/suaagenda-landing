// Página /so-site: plano achado por módulo, preço vindo da API, CTA.
// Roda sem dependências: `node --test tests/soSite.test.mjs`
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { findSoSitePlan, isSoSitePlan, soSiteCta, formatBRL, trialDaysOf } from '../utils/soSite.js'

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
})

test('preço exibido é o do plano (mudar no banco muda a página)', () => {
  assert.equal(formatBRL(39.9), 'R$ 39,90')
  assert.equal(formatBRL(findSoSitePlan({ data: [plan(11, 44.9, SO_SITE)] }).price), 'R$ 44,90')
})

test('com trial o CTA vai para o cadastro do admin com o planId; sem trial, WhatsApp', () => {
  const p = findSoSitePlan(CATALOGO)
  assert.equal(trialDaysOf(p), 15)
  assert.deepEqual(soSiteCta(p), {
    kind: 'signup',
    href: 'https://app.suaagenda.link/admin/auth/register?planId=11&billingCycle=monthly',
  })
  const semTrial = soSiteCta({ ...p, trialDays: null })
  assert.equal(semTrial.kind, 'whatsapp')
  assert.match(semTrial.href, /^https:\/\/wa\.me\/\d+\?text=/)
})

test('a página não tem preço escrito no código e usa /plans/public', () => {
  const page = fs.readFileSync(path.join(ROOT, 'pages/so-site.vue'), 'utf8')
  assert.doesNotMatch(page, /R\$\s?\d/)
  assert.doesNotMatch(page, /39[,.]9/)
  assert.match(page, /\/plans\/public/)
  assert.match(page, /findSoSitePlan/)
})
