<!--
  components/PlanSelector.vue
  Planos carregados da rota pública /plans/public — sem auth necessária.

  Props:
    - segment           : String  — 'barber' | 'salon' | etc.
    - redirectBase      : String  — URL base do admin
    - redirect          : Boolean — false = só emite, não navega
    - trialDays         : Number
    - annualDiscount    : Number (default 15)
    - quarterlyDiscount : Number (default 10)
    - apiBase           : String  — URL base da API (ex: https://api.suaagenda.link)

  Emits:
    - select(payload) → { planId, billingCycle, priceMonthly, priceTotal }

  Uso na landing:
    <PlanSelector segment="barber" api-base="https://api.suaagenda.link" />

  Uso incorporado (sem redirect):
    <PlanSelector segment="barber" :redirect="false" @select="onSelect" />
-->
<template>
  <div class="ps-root">

    <!-- ── Loading ─────────────────────────────────────────────────────────── -->
    <div v-if="loading" class="ps-loading">
      <div class="ps-spinner" />
    </div>

    <!-- ── Error ───────────────────────────────────────────────────────────── -->
    <div v-else-if="error" class="ps-error">
      <p>{{ error }}</p>
      <button class="ps-retry-btn" @click="fetchPlans">Tentar novamente</button>
    </div>

    <template v-else>

      <!-- ── Billing cycle toggle ───────────────────────────────────────────── -->
      <div class="ps-toggle-wrap mb-4">
        <button
          v-for="c in cycles"
          :key="c.value"
          type="button"
          class="ps-toggle-btn"
          :class="{ 'ps-toggle-btn--active': billingCycle === c.value }"
          @click="billingCycle = c.value"
        >
          {{ c.label }}
          <span v-if="c.badge" class="ps-toggle-badge">{{ c.badge }}</span>
        </button>
      </div>
      <p v-if="billingCycle !== 'monthly'" class="ps-toggle-hint mb-4">
        {{ billingCycle === 'quarterly' ? 'Cobrado a cada 3 meses' : 'Cobrado anualmente' }} · cancele quando quiser
      </p>

      <!-- ── Cards ─────────────────────────────────────────────────────────── -->
      <div class="ps-grid">
        <div
          v-for="plano in planosExibidos"
          :key="plano.id"
          class="ps-card"
          :class="{
            'ps-card--featured': plano.isPopular,
            'ps-card--selected': selectedPlanId === plano.id,
            'ps-card--free':     isFree(plano),
          }"
          @click="selectPlan(plano)"
        >
          <!-- badge destaque -->
          <div v-if="plano.isPopular" class="ps-badge">⭐ Mais popular</div>

          <!-- cabeçalho -->
          <div class="ps-card-head">
            <p class="ps-card-label">{{ plano.name }}</p>
            <p class="ps-card-desc">{{ plano.description }}</p>
          </div>

          <!-- preço -->
          <div class="ps-price-wrap">
            <template v-if="isFree(plano)">
              <div class="ps-price">
                <span class="ps-price-num">R$ 0</span>
                <span class="ps-price-period">/mês</span>
              </div>
              <p class="ps-price-note">Para sempre grátis</p>
            </template>

            <template v-else-if="isEnterprise(plano)">
              <div class="ps-price">
                <span class="ps-price-num" style="font-size:1.5rem">Sob consulta</span>
              </div>
            </template>

            <template v-else>
              <div v-if="billingCycle !== 'monthly'" class="ps-price-striked">
                <span>R$ {{ fmt(Number(plano.price)) }}</span>/mês
              </div>
              <div class="ps-price">
                <span class="ps-price-currency">R$</span>
                <span class="ps-price-num">{{ displayPrice(plano.price) }}</span>
                <span class="ps-price-period">/mês</span>
              </div>
              <p v-if="billingCycle !== 'monthly'" class="ps-price-note">
                cobrado R$ {{ totalCharged(plano.price) }}
                {{ billingCycle === 'quarterly' ? '/trimestre' : '/ano' }}
                · economia R$ {{ savings(plano.price) }}
              </p>
              <p class="ps-trial-chip">
                🎁 {{ trialDays }} dias grátis · sem cartão
              </p>
            </template>
          </div>

          <!-- features vindas do backend -->
          <ul class="ps-features">
            <li
              v-for="f in plano.parsedFeatures"
              :key="f.key"
              :class="f.ok ? 'ps-feat--ok' : 'ps-feat--off'"
            >
              <span class="ps-feat-icon">{{ f.ok ? '✓' : '✗' }}</span>
              {{ f.texto }}
            </li>
          </ul>

          <!-- CTA -->
          <button
            type="button"
            class="ps-cta"
            :class="plano.isPopular ? 'ps-cta--primary' : 'ps-cta--outline'"
            @click.stop="handleCta(plano)"
          >
            {{ ctaLabel(plano) }}
          </button>
        </div>
      </div>

    </template>

    <p class="ps-footnote">
      🔒 Pagamento seguro · Cancele quando quiser · Sem multa de saída
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// ── Props ───────────────────────────────────────────────────────────────────
const props = withDefaults(defineProps<{
  segment?:            string
  redirectBase?:       string
  redirect?:           boolean
  trialDays?:          number
  annualDiscount?:     number
  quarterlyDiscount?:  number
  apiBase?:            string
}>(), {
  segment:             'barber',
  redirectBase:        'https://app.suaagenda.link',
  redirect:            true,
  trialDays:           15,
  annualDiscount:      15,
  quarterlyDiscount:   10,
  apiBase:             '',
})

// ── Emits ───────────────────────────────────────────────────────────────────
const emit = defineEmits<{
  (e: 'select', payload: {
    planId:       number
    billingCycle: 'monthly' | 'quarterly' | 'annual'
    priceMonthly: string
    priceTotal:   string
  }): void
}>()

// ── State ───────────────────────────────────────────────────────────────────
type BillingCycle = 'monthly' | 'quarterly' | 'annual'
const billingCycle   = ref<BillingCycle>('annual')
const selectedPlanId = ref<number | null>(null)
const rawPlans       = ref<any[]>([])
const loading        = ref(true)
const error          = ref('')

// ── Cycles ──────────────────────────────────────────────────────────────────
const cycles = computed(() => [
  { value: 'monthly'   as BillingCycle, label: 'Mensal',     badge: '' },
  { value: 'quarterly' as BillingCycle, label: 'Trimestral', badge: `-${props.quarterlyDiscount}%` },
  { value: 'annual'    as BillingCycle, label: 'Anual',      badge: `-${props.annualDiscount}%` },
])

// ── Preço ───────────────────────────────────────────────────────────────────
const discountFactor = computed(() => {
  if (billingCycle.value === 'annual')    return 1 - props.annualDiscount    / 100
  if (billingCycle.value === 'quarterly') return 1 - props.quarterlyDiscount / 100
  return 1
})
const periodMonths = computed(() =>
  ({ monthly: 1, quarterly: 3, annual: 12 }[billingCycle.value])
)

function fmt(n: number)                    { return n.toFixed(2).replace('.', ',') }
function displayPrice(p: number | string)  { return fmt(Number(p) * discountFactor.value) }
function totalCharged(p: number | string)  { return fmt(Number(p) * discountFactor.value * periodMonths.value) }
function savings(p: number | string) {
  const base = Number(p)
  return fmt((base - base * discountFactor.value) * periodMonths.value)
}

// ── Classificadores ─────────────────────────────────────────────────────────
// Mesma regra do admin (contratar.vue/checkout.vue): `isCustomPricing` vem do
// banco; `plan.isTrial` é legado e está zerado em todos os planos.
// Free       → price=0 e não é sob consulta (gratuito para sempre)
// Enterprise → isCustomPricing (sob consulta, ex.: Advanced)
function isFree(plan: any)       { return Number(plan.price) === 0 && !plan.isCustomPricing }
function isEnterprise(plan: any) { return !!plan.isCustomPricing }

// ── Feature labels (keys reais da tabela `features`) ────────────────────────
const FEATURE_LABELS: Record<string, (v: string | number) => string> = {
  appointments_per_month: v => v === 'Ilimitado' ? 'Agendamentos ilimitados'    : `${v} agendamentos/mês`,
  max_employees:          v => v === 'Ilimitado' ? 'Profissionais ilimitados'   : `${v} profissional${v == '1' ? '' : 'is'}`,
  max_users:              v => v === 'Ilimitado' ? 'Usuários ilimitados'        : `${v} usuário${v == '1' ? '' : 's'}`,
  max_clients:            v => v === 'Ilimitado' ? 'Clientes ilimitados'        : `${v} clientes`,
  max_services:           v => v === 'Ilimitado' ? 'Serviços ilimitados'        : `${v} serviços`,
  max_units:              v => v === 'Ilimitado' ? 'Unidades ilimitadas'        : `${v} unidade${v == '1' ? '' : 's'}`,
  site:                   _ => 'Site público',
  notificacao_email:      _ => 'Notificação por e-mail',
  lembretes_automaticos:  _ => 'Lembretes automáticos anti-furo',
  whatsapp_enabled:       _ => 'Notificação via WhatsApp',
  integrations:           v => v === 'Ilimitado' ? 'Integrações ilimitadas'
                                : (v == '0' || v === 'false') ? 'Sem integrações'
                                : `${v} integração${v == '1' ? '' : 'ões'}`,
  relatorios:             _ => 'Relatórios e métricas',
  site_customization:     _ => 'Personalização do site',
}

function isFeatureOn(value: string | number): boolean {
  const v = String(value).toLowerCase().trim()
  if (v === 'false' || v === '0') return false
  if (v === 'true'  || v === 'ilimitado') return true
  return Number(value) > 0
}

// O backend já formata features[] como array de strings (ex: "Até 20 agendamentos/mês").
// MAS também retorna planFeatures[] com os objetos brutos.
// Usamos planFeatures quando disponível (mais controle), senão caímos no features[].
function parsePlanFeatures(plan: any): { key: string; texto: string; ok: boolean }[] {
  // Prioridade 1: planFeatures com Feature.key (mais rico)
  if (plan.planFeatures?.length) {
    return plan.planFeatures
      .map((pf: any) => {
        const key     = pf.Feature?.key ?? String(pf.featureId)
        const value   = pf.value
        const labelFn = FEATURE_LABELS[key]
        const texto   = labelFn
          ? labelFn(value)
          : `${pf.Feature?.label ?? key}: ${value}`
        return { key, texto, ok: isFeatureOn(value) }
      })
      .sort((a: any, b: any) => Number(b.ok) - Number(a.ok))
  }

  // Fallback: features[] já formatado pelo backend (strings simples)
  if (plan.features?.length) {
    return plan.features.map((texto: string, i: number) => ({
      key:   String(i),
      texto,
      ok:    true,
    }))
  }

  return []
}

// ── Planos processados ───────────────────────────────────────────────────────
const planosExibidos = computed(() =>
  rawPlans.value.map(p => ({
    ...p,
    parsedFeatures: parsePlanFeatures(p),
  }))
)

// ── Fetch — rota pública, sem JWT ────────────────────────────────────────────
// ── Fetch ──────────────────────────────────────────────────────────────────
const config = useRuntimeConfig() // 👈 pega a config do nuxt.config.ts

async function fetchPlans() {
  loading.value = true
  error.value   = ''
  try {
    // 👇 usa a baseURL da config em vez da prop apiBase
    const res = await fetch(`${config.public.apiBase}/plans/public`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const list: any[] = Array.isArray(json) ? json : (json.data ?? [])
    rawPlans.value = list.sort((a: any, b: any) => {
      if (isEnterprise(a)) return 1
      if (isEnterprise(b)) return -1
      return Number(a.price) - Number(b.price)
    })
  } catch (e: any) {
    error.value = 'Não foi possível carregar os planos. Tente novamente.'
    console.error('[PlanSelector] fetch error:', e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPlans)

// ── Actions ──────────────────────────────────────────────────────────────────
function selectPlan(plano: any) { selectedPlanId.value = plano.id }

function ctaLabel(plano: any) {
  if (isFree(plano))       return '🎁 Começar grátis'
  if (isEnterprise(plano)) return '💬 Falar com a gente'
  return `✂️ Começar ${props.trialDays} dias grátis`
}

function buildUrl(plano: any): string {
  const params = new URLSearchParams({
    planId:       String(plano.id),
    billingCycle: billingCycle.value,
  })
  return `${props.redirectBase}/admin/auth/register?${params.toString()}`
}

function handleCta(plano: any) {
  selectedPlanId.value = plano.id

  emit('select', {
    planId:       plano.id,
    billingCycle: billingCycle.value,
    priceMonthly: !isFree(plano) && !isEnterprise(plano) ? displayPrice(plano.price) : '0',
    priceTotal:   !isFree(plano) && !isEnterprise(plano) ? totalCharged(plano.price)  : '0',
  })

  if (props.redirect) {
    if (isEnterprise(plano)) {
      window.open('https://wa.me/5511941649284', '_blank')
    } else {
      window.location.href = buildUrl(plano)
    }
  }
}
</script>

<style scoped>
/* ── root ──────────────────────────────────────────────────────────────── */
.ps-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

/* ── loading / error ───────────────────────────────────────────────────── */
.ps-loading {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}
.ps-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(52,211,153,0.2);
  border-top-color: #34d399;
  border-radius: 50%;
  animation: ps-spin 0.7s linear infinite;
}
@keyframes ps-spin { to { transform: rotate(360deg); } }

.ps-error {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255,255,255,0.5);
  font-size: 0.875rem;
}
.ps-retry-btn {
  margin-top: 0.75rem;
  padding: 0.5rem 1.25rem;
  border: 1px solid rgba(52,211,153,0.3);
  border-radius: 8px;
  background: transparent;
  color: #34d399;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}
.ps-retry-btn:hover { background: rgba(52,211,153,0.08); }

/* ── toggle ────────────────────────────────────────────────────────────── */
.ps-toggle-wrap {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
}

.ps-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 9px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.4);
  font-size: 0.83rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: inherit;
  white-space: nowrap;
}
.ps-toggle-btn--active {
  background: #34d399;
  color: #000;
}

.ps-toggle-badge {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 20px;
  font-size: 0.65rem;
  font-weight: 800;
  background: rgba(0,0,0,0.18);
  color: inherit;
  letter-spacing: 0.3px;
}
.ps-toggle-btn--active .ps-toggle-badge {
  background: rgba(0,0,0,0.2);
  color: #000;
}
.ps-toggle-btn:not(.ps-toggle-btn--active) .ps-toggle-badge {
  background: rgba(52,211,153,0.15);
  color: #34d399;
}

.ps-toggle-hint {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.35);
  margin-top: -0.75rem;
  text-align: center;
}

/* ── grid ──────────────────────────────────────────────────────────────── */
.ps-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  width: 100%;
}
@media (max-width: 1100px) { .ps-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .ps-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px)  { .ps-grid { grid-template-columns: 1fr; } }

/* ── card ──────────────────────────────────────────────────────────────── */
.ps-card {
  position: relative;
  background: #181818;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
}
.ps-card:hover {
  border-color: rgba(52,211,153,0.3);
  transform: translateY(-2px);
}
.ps-card--featured {
  border-color: #34d399;
  box-shadow: 0 0 0 1px #34d399, 0 8px 32px rgba(52,211,153,0.12);
}
.ps-card--selected {
  border-color: #34d399;
  background: rgba(52,211,153,0.04);
}

/* ── badge ─────────────────────────────────────────────────────────────── */
.ps-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #34d399;
  color: #000;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 3px 12px;
  border-radius: 20px;
  white-space: nowrap;
  letter-spacing: 0.2px;
}

/* ── card head ─────────────────────────────────────────────────────────── */
.ps-card-head { display: flex; flex-direction: column; gap: 4px; }

.ps-card-label {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
}
.ps-card--featured .ps-card-label { color: #34d399; }

.ps-card-desc {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.4;
  min-height: 2.4em;
}

/* ── price ─────────────────────────────────────────────────────────────── */
.ps-price-wrap { display: flex; flex-direction: column; gap: 4px; }

.ps-price-striked {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.28);
  text-decoration: line-through;
}
.ps-price {
  display: flex;
  align-items: baseline;
  gap: 2px;
}
.ps-price-currency {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
  margin-right: 2px;
}
.ps-price-num {
  font-size: 2.2rem;
  font-weight: 900;
  color: #f0f0f2;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.ps-price-period {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.35);
  margin-left: 2px;
}
.ps-price-note {
  font-size: 0.7rem;
  color: #34d399;
  font-weight: 600;
}
.ps-trial-chip {
  display: inline-block;
  margin-top: 4px;
  padding: 3px 10px;
  background: rgba(52,211,153,0.08);
  border: 1px solid rgba(52,211,153,0.2);
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 700;
  color: #34d399;
  width: fit-content;
}

/* ── features ──────────────────────────────────────────────────────────── */
.ps-features {
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}
.ps-features li {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 0.75rem;
  line-height: 1.4;
  color: rgba(255,255,255,0.5);
}
.ps-features li:last-child { border-bottom: none; }
.ps-feat--ok  { color: rgba(255,255,255,0.75); }
.ps-feat--off { color: rgba(255,255,255,0.2); }
.ps-feat-icon { flex-shrink: 0; font-size: 0.7rem; margin-top: 1px; }
.ps-feat--ok  .ps-feat-icon { color: #34d399; }
.ps-feat--off .ps-feat-icon { color: rgba(255,255,255,0.15); }

/* ── CTA ───────────────────────────────────────────────────────────────── */
.ps-cta {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  font-family: inherit;
  border: none;
}
.ps-cta:hover { transform: translateY(-1px); }
.ps-cta--primary { background: #34d399; color: #000; }
.ps-cta--primary:hover {
  background: #6ee7b7;
  box-shadow: 0 4px 20px rgba(52,211,153,0.3);
}
.ps-cta--outline {
  background: transparent;
  border: 1px solid rgba(52,211,153,0.25);
  color: #34d399;
}
.ps-cta--outline:hover {
  background: rgba(52,211,153,0.08);
  border-color: #34d399;
}

/* ── footnote ──────────────────────────────────────────────────────────── */
.ps-footnote {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.25);
  text-align: center;
}
</style>