// utils/soSite.js — regra da página /so-site, sem dependência de Nuxt
// (testada com `node --test tests/soSite.test.mjs`).
//
// O plano "Só Site" é achado pelos MÓDULOS que /plans/public devolve em
// `limits` — site sem agenda —, nunca por id, nome ou preço fixos. Preço e
// nome vêm do plano; mudar o preço no master-admin muda a página. O `trialDays`
// do plano NÃO é anunciado: o Só Site é pagamento imediato.

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

/** "R$ 39,90" */
export function formatBRL(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/ /g, ' ')
}

/**
 * Destino do CTA do Só Site: SEMPRE o WhatsApp de vendas. O Só Site é
 * pagamento imediato, sem teste grátis, e hoje não há contratação paga
 * self-service: o register só cria conta em trial (plano pago sem trialDays
 * → 422) e o checkout do admin exige conta logada. Não depende de `trialDays`
 * do plano.
 */
export function soSiteCta(text = 'Quero contratar o Só Site') {
  return { kind: 'whatsapp', href: `https://wa.me/${WHATSAPP_VENDAS}?text=${encodeURIComponent(text)}` }
}

/**
 * Mensagem do CTA das páginas /site-para-<slug>: o segmento REAL
 * (segment_types.label + name) e o modelo escolhido (label + id), para a
 * contratação — e o upgrade depois — saberem de onde o cliente veio.
 */
export function siteModelCtaText({ segmentLabel, segmentType, modelLabel, modelId }) {
  return `Quero contratar o Só Site. Segmento: ${segmentLabel} (${segmentType}). Modelo: ${modelLabel} (${modelId}).`
}
