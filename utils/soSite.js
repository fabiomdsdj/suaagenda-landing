// utils/soSite.js — regra da página /so-site, sem dependência de Nuxt
// (testada com `node --test tests/soSite.test.mjs`).
//
// O plano "Só Site" é achado pelos MÓDULOS que /plans/public devolve em
// `limits` — site sem agenda —, nunca por id, nome ou preço fixos. Preço,
// trial e nome vêm do plano; mudar o preço no master-admin muda a página.

export const WHATSAPP_VENDAS = '5511941649284'

const enabled = (v) => v === true || String(v).toLowerCase() === 'true'

/** Site (white-label) sem agendamento, com preço público. */
export function isSoSitePlan(plan) {
  if (!plan || plan.isCustomPricing) return false
  const limits = plan.limits || {}
  return enabled(limits['module.whitelabel'])
    && !enabled(limits['module.scheduling'])
    && Number(plan.price) > 0
}

/** Aceita o envelope `{ data: [...] }` de /plans/public ou a lista crua. */
export function findSoSitePlan(payload) {
  const list = Array.isArray(payload) ? payload : (payload && payload.data) || []
  return list
    .filter(isSoSitePlan)
    .sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0) || Number(a.price) - Number(b.price))[0] || null
}

export function trialDaysOf(plan) {
  const n = Number(plan && plan.trialDays)
  return Number.isInteger(n) && n > 0 ? n : 0
}

/** "R$ 39,90" */
export function formatBRL(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/ /g, ' ')
}

/**
 * Destino do CTA. Com trial o cadastro é self-service (register do admin);
 * sem trial o register recusa plano pago (422), então vai para o WhatsApp —
 * a mesma regra do PlanSelector. Sem plano (API fora), também WhatsApp.
 */
export function soSiteCta(plan, adminBase = 'https://app.suaagenda.link') {
  if (plan && trialDaysOf(plan) > 0) {
    const params = new URLSearchParams({ planId: String(plan.id), billingCycle: 'monthly' })
    return { kind: 'signup', href: `${adminBase}/admin/auth/register?${params.toString()}` }
  }
  const text = 'Quero contratar o Só Site'
  return { kind: 'whatsapp', href: `https://wa.me/${WHATSAPP_VENDAS}?text=${encodeURIComponent(text)}` }
}
