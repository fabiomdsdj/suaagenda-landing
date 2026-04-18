<!--
  components/PlanSelector.vue
  ─────────────────────────────────────────────────────────────────────────────
  Componente reutilizável de seleção de plano.

  Props:
    - segment     : String  — 'barber' | 'salon' | etc. (para personalizar label)
    - redirectBase: String  — URL base do admin (default: https://admin.suaagenda.link)

  Emits:
    - select(payload) → { planId, billingCycle, priceMonthly, priceTotal }

  Uso standalone (landing):
    <PlanSelector segment="barber" />

  Uso incorporado (sem redirect, captura o emit):
    <PlanSelector segment="barber" :redirect="false" @select="onSelect" />
-->
<template>
  <div class="ps-root">

    <!-- ── Billing cycle toggle ────────────────────────────────────────────── -->
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

    <!-- ── Cards ──────────────────────────────────────────────────────────── -->
    <div class="ps-grid">
      <div
        v-for="(plano, i) in planosOrdenados"
        :key="plano.planId"
        class="ps-card"
        :class="{
          'ps-card--featured': plano.destaque,
          'ps-card--selected': selectedPlanId === plano.planId,
          'ps-card--free': plano.isFree,
        }"
        @click="selectPlan(plano)"
      >
        <!-- badge destaque -->
        <div v-if="plano.destaque" class="ps-badge">⭐ Mais popular</div>

        <!-- cabeçalho -->
        <div class="ps-card-head">
          <p class="ps-card-label">{{ plano.label }}</p>
          <p class="ps-card-desc">{{ plano.desc }}</p>
        </div>

        <!-- preço -->
        <div class="ps-price-wrap">
          <template v-if="plano.isFree">
            <div class="ps-price">
              <span class="ps-price-num">R$ 0</span>
              <span class="ps-price-period">/mês</span>
            </div>
            <p class="ps-price-note">Para sempre grátis</p>
          </template>
          <template v-else-if="plano.preco">
            <div class="ps-price-striked" v-if="billingCycle !== 'monthly'">
              <span>R$ {{ plano.preco }}</span>/mês
            </div>
            <div class="ps-price">
              <span class="ps-price-currency">R$</span>
              <span class="ps-price-num">{{ displayPrice(plano.preco) }}</span>
              <span class="ps-price-period">/mês</span>
            </div>
            <p class="ps-price-note" v-if="billingCycle !== 'monthly'">
              cobrado R$ {{ totalCharged(plano.preco) }}
              {{ billingCycle === 'quarterly' ? '/trimestre' : '/ano' }}
              · economia R$ {{ savings(plano.preco) }}
            </p>
            <p class="ps-trial-chip" v-if="!plano.isFree">
              🎁 {{ trialDays }} dias grátis · sem cartão
            </p>
          </template>
          <template v-else>
            <div class="ps-price">
              <span class="ps-price-num" style="font-size:1.5rem">Sob consulta</span>
            </div>
          </template>
        </div>

        <!-- features -->
        <ul class="ps-features">
          <li
            v-for="f in plano.features"
            :key="f.texto"
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
          :class="plano.destaque ? 'ps-cta--primary' : 'ps-cta--outline'"
          @click.stop="handleCta(plano)"
        >
          {{ ctaLabel(plano) }}
        </button>
      </div>
    </div>

    <p class="ps-footnote">
      🔒 Pagamento seguro · Cancele quando quiser · Sem multa de saída
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ── props ──────────────────────────────────────────────────────────────────
const props = withDefaults(defineProps<{
  segment?:      string
  redirectBase?: string
  redirect?:     boolean   // false = só emite, não navega
  trialDays?:    number
  annualDiscount?:    number
  quarterlyDiscount?: number
}>(), {
  segment:      'barber',
  redirectBase: 'https://admin.suaagenda.link',
  redirect:     true,
  trialDays:    7,
  annualDiscount:    20,
  quarterlyDiscount: 10,
})

// ── emits ──────────────────────────────────────────────────────────────────
const emit = defineEmits<{
  (e: 'select', payload: {
    planId:       number
    billingCycle: 'monthly' | 'quarterly' | 'annual'
    priceMonthly: string
    priceTotal:   string
  }): void
}>()

// ── state ──────────────────────────────────────────────────────────────────
type BillingCycle = 'monthly' | 'quarterly' | 'annual'
const billingCycle    = ref<BillingCycle>('annual')
const selectedPlanId  = ref<number | null>(null)

// ── cycles ─────────────────────────────────────────────────────────────────
const cycles = computed(() => [
  { value: 'monthly',   label: 'Mensal',     badge: '' },
  { value: 'quarterly', label: 'Trimestral', badge: `-${props.quarterlyDiscount}%` },
  { value: 'annual',    label: 'Anual',      badge: `-${props.annualDiscount}%` },
])

// ── helpers de preço ───────────────────────────────────────────────────────
const discountFactor = computed(() => {
  if (billingCycle.value === 'annual')    return 1 - props.annualDiscount    / 100
  if (billingCycle.value === 'quarterly') return 1 - props.quarterlyDiscount / 100
  return 1
})

const periodMonths = computed(() => ({
  monthly: 1, quarterly: 3, annual: 12
}[billingCycle.value]))

function toNum(preco: string) {
  return parseFloat(preco.replace(',', '.'))
}
function fmt(n: number) {
  return n.toFixed(2).replace('.', ',')
}

function displayPrice(preco: string) {
  return fmt(toNum(preco) * discountFactor.value)
}

function totalCharged(preco: string) {
  return fmt(toNum(preco) * discountFactor.value * periodMonths.value)
}

function savings(preco: string) {
  const base     = toNum(preco)
  const discounted = base * discountFactor.value
  return fmt((base - discounted) * periodMonths.value)
}

// ── features builder ───────────────────────────────────────────────────────
function mkFeatures(
  agend: string | number, profs: string | number, users: string | number,
  clients: string | number, site: boolean, emailNotif: boolean,
  lembretes: boolean, whatsapp: boolean, integrations: string | number,
  relatorios: boolean, units: string | number
) {
  return [
    { texto: `${agend} agendamentos/mês`,                                                                          ok: true       },
    { texto: `${profs} profissional${profs === 1 ? '' : 'is'}`,                                                    ok: true       },
    { texto: `${users} usuário${users === 1 ? '' : 's'}`,                                                          ok: true       },
    { texto: clients === 'true' || clients === true ? 'Clientes ilimitados' : `${clients} clientes`,               ok: true       },
    { texto: 'Site público',                                                                                        ok: site       },
    { texto: 'Notificação por e-mail',                                                                              ok: emailNotif },
    { texto: 'Lembretes automáticos anti-furo',                                                                     ok: lembretes  },
    { texto: 'Notificação via WhatsApp',                                                                            ok: whatsapp   },
    { texto: integrations === 'Ilimitado' ? 'Integrações ilimitadas'
             : (integrations === 0 || integrations === '0') ? 'Sem integrações'
             : `${integrations} integração${integrations === 1 || integrations === '1' ? '' : 'ões'}`,             ok: Number(integrations) > 0 || integrations === 'Ilimitado' },
    { texto: 'Relatórios e métricas',                                                                               ok: relatorios },
    { texto: units === 'Ilimitado' ? 'Unidades ilimitadas' : `${units} unidade${units === 1 || units === '1' ? '' : 's'}`, ok: true },
  ]
}

// ── planos ─────────────────────────────────────────────────────────────────
const planos = [
  {
    planId:   1,
    label:    'Gratuito',
    desc:     'Comece sem pagar nada. Para sempre.',
    preco:    '0',
    destaque: false,
    isFree:   true,
    features: mkFeatures(20, 1, 1, 10, true, false, false, false, 0, false, 1),
  },
  {
    planId:   2,
    label:    'Profissional Solo',
    desc:     'Para autônomos que trabalham sozinhos.',
    preco:    '79,90',
    destaque: true,
    isFree:   false,
    features: mkFeatures(200, 1, 2, 'true', true, true, false, true, 1, false, 1),
  },
  {
    planId:   3,
    label:    'Equipe Pequena',
    desc:     'Barbearia com 2 a 3 profissionais.',
    preco:    '99,90',
    destaque: false,
    isFree:   false,
    features: mkFeatures(500, 3, 5, 'true', true, true, false, true, 2, false, 1),
  },
  {
    planId:   4,
    label:    'Equipe Média',
    desc:     'Negócio em crescimento, 4 a 6 profissionais.',
    preco:    '149,90',
    destaque: false,
    isFree:   false,
    features: mkFeatures(1000, 6, 10, 'true', true, true, true, true, 5, true, 2),
  },
  {
    planId:   5,
    label:    'Equipe Avançada',
    desc:     '7+ profissionais. Múltiplas unidades.',
    preco:    null,
    destaque: false,
    isFree:   false,
    features: mkFeatures('Ilimitado', 'Ilimitado', 'Ilimitado', 'Ilimitado', true, true, true, true, 'Ilimitado', true, 'Ilimitado'),
  },
]

const planosOrdenados = computed(() =>
  planos.map(p => ({
    ...p,
    features: [...p.features].sort((a, b) => Number(b.ok) - Number(a.ok)),
  }))
)

// ── actions ────────────────────────────────────────────────────────────────
function selectPlan(plano: typeof planos[0]) {
  selectedPlanId.value = plano.planId
}

function ctaLabel(plano: typeof planos[0]) {
  if (plano.isFree)         return '🎁 Começar grátis'
  if (plano.preco === null) return '💬 Falar com a gente'
  return `✂️ Começar ${props.trialDays} dias grátis`
}

function buildUrl(plano: typeof planos[0]): string {
  if (plano.preco === null) return 'https://wa.me/5511941649284'

  const params = new URLSearchParams({
    planId:       String(plano.planId),
    billingCycle: billingCycle.value,
  })
  return `${props.redirectBase}/admin/auth/register?${params.toString()}`
}

function handleCta(plano: typeof planos[0]) {
  selectedPlanId.value = plano.planId

  const payload = {
    planId:       plano.planId,
    billingCycle: billingCycle.value,
    priceMonthly: plano.preco ? displayPrice(plano.preco) : '0',
    priceTotal:   plano.preco ? totalCharged(plano.preco) : '0',
  }

  emit('select', payload)

  if (props.redirect) {
    if (plano.preco === null) {
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

.ps-feat--ok { color: rgba(255,255,255,0.75); }
.ps-feat--off { color: rgba(255,255,255,0.2); }

.ps-feat-icon {
  flex-shrink: 0;
  font-size: 0.7rem;
  margin-top: 1px;
}
.ps-feat--ok .ps-feat-icon  { color: #34d399; }
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

.ps-cta--primary {
  background: #34d399;
  color: #000;
}
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