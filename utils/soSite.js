// utils/soSite.js — regra da página /so-site, sem dependência de Nuxt
// (testada com `node --test tests/soSite.test.mjs`).
//
// O plano "Só Site" é achado pelos MÓDULOS que /plans/public devolve em
// `limits` — site sem agenda —, nunca por id, nome ou preço fixos. Preço e
// nome vêm do plano; mudar o preço no master-admin muda a página. O `trialDays`
// do plano NÃO é anunciado: o Só Site é pagamento imediato.

export const WHATSAPP_VENDAS = '5511941649284'
// Mesmo default do /precos (config.public.adminBaseUrl).
export const ADMIN_BASE = 'https://app.suaagenda.link'

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

export function whatsappHref(text) {
  return `https://wa.me/${WHATSAPP_VENDAS}?text=${encodeURIComponent(text)}`
}

/**
 * Pagamento imediato: plano pago sem `trialDays`. Só assim o cadastro cria a
 * conta com a contratação pendente e leva ao checkout do Asaas. Com
 * trialDays > 0 no banco o cadastro daria teste grátis — a landing não manda
 * para lá (cai no WhatsApp) até o plano estar sem trial.
 */
export function paysNow(plan) {
  if (!isSoSitePlan(plan)) return false
  const days = Number(plan.trialDays)
  return !(Number.isInteger(days) && days > 0)
}

/**
 * Cadastro do admin com o plano e a escolha da landing:
 *   /admin/auth/register?planId=<id>&billingCycle=monthly&segmentType=physio&siteModel=clinica
 * `segmentType` = segment_types.name; `siteModel` = id do modelo da landing.
 * O cadastro grava os dois (tenants.segmentTypeId e websites.siteModel).
 * @param {{ id: number | string }} plan
 * @param {{ adminBase?: string, segmentType?: string, siteModel?: string }} [opts]
 */
export function soSiteSignupUrl(plan, { adminBase = ADMIN_BASE, segmentType, siteModel } = {}) {
  const params = new URLSearchParams({ planId: String(plan.id), billingCycle: 'monthly' })
  if (segmentType) params.set('segmentType', segmentType)
  if (segmentType && siteModel) params.set('siteModel', siteModel)
  return `${adminBase.replace(/\/+$/, '')}/admin/auth/register?${params.toString()}`
}

/**
 * Destino do CTA principal do Só Site: o cadastro self-service (conta →
 * checkout do Asaas → plano ativo) quando o plano é pagamento imediato; o
 * WhatsApp de vendas quando o plano não carregou ou ainda tem trial.
 * @param {any} plan
 * @param {{ adminBase?: string, segmentType?: string, siteModel?: string, text?: string }} [opts]
 * @returns {{ kind: 'signup' | 'whatsapp', href: string }}
 */
export function soSiteCta(plan, { adminBase, segmentType, siteModel, text = 'Quero contratar o Só Site' } = {}) {
  if (paysNow(plan)) {
    return { kind: 'signup', href: soSiteSignupUrl(plan, { adminBase, segmentType, siteModel }) }
  }
  return { kind: 'whatsapp', href: whatsappHref(text) }
}

/**
 * Mensagem de WhatsApp das páginas /site-para-<slug> (contato secundário ou
 * fallback do CTA): o segmento REAL (segment_types.label + name) e o modelo
 * escolhido (label + id).
 */
export function siteModelCtaText({ segmentLabel, segmentType, modelLabel, modelId }) {
  return `Quero contratar o Só Site. Segmento: ${segmentLabel} (${segmentType}). Modelo: ${modelLabel} (${modelId}).`
}
