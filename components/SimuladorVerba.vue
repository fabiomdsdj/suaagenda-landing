<!-- components/SimuladorVerba.vue -->
<template>
  <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]">
    <div class="max-w-6xl mx-auto">

      <span class="text-xs font-bold tracking-widest uppercase text-green-400">
        Simulador de captação
      </span>
      <h2
        class="mt-3 mb-4 font-black leading-none text-white"
        style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
      >
        QUANTOS CLIENTES<br>
        <span class="text-green-400">SUA VERBA PODE TRAZER</span>
      </h2>
      <p class="text-gray-500 mb-10 text-[15px]">
        Configure verba, ticket e frequência para ver estimativas reais de captação via Google Ads.
      </p>

      <!-- STEP 0 — PLANO DO SISTEMA -->
      <div class="mb-10">
        <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
          0. Plano SuaAgenda contratado
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            v-for="sp in SYSTEM_PLANS"
            :key="sp.id"
            @click="systemPlan = sp.id"
            class="rounded-2xl border p-5 text-left transition-all"
            :class="systemPlan === sp.id
              ? 'border-green-400 bg-green-400/5'
              : 'border-white/[.06] bg-[#181818]'"
          >
            <p class="text-[15px] font-bold text-white mb-1">{{ sp.name }}</p>
            <p class="text-xs text-gray-500 mb-3">{{ sp.desc }}</p>
            <p class="font-black text-green-400" style="font-family:'Bebas Neue',sans-serif;font-size:22px">
              R$ {{ sp.monthly.toFixed(2).replace('.', ',') }}
            </p>
            <p class="text-[10px] text-gray-600 mt-0.5">/mês</p>
            <span
              v-if="systemPlan === sp.id"
              class="mt-3 inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-green-400/15 text-green-400 border border-green-400/20"
            >
              Selecionado
            </span>
          </button>
        </div>
      </div>

      <!-- STEP 1 — VERBA -->
      <div class="mb-10">
        <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
          1. Verba mensal no Google Ads
        </p>
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <input
            type="range"
            :value="budget"
            @input="budget = Number(($event.target as HTMLInputElement).value)"
            min="100"
            max="3000"
            step="50"
            class="w-full sm:flex-1 accent-green-400"
          />
          <span
            class="font-black text-green-400 sm:shrink-0"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,5vw,28px)"
          >
            R$ {{ budget.toLocaleString('pt-BR') }}/mês
          </span>
        </div>
        <div class="flex justify-between text-xs text-gray-600 mt-2 px-1">
          <span>R$ 100</span>
          <span>R$ 1.000</span>
          <span>R$ 2.000</span>
          <span>R$ 3.000</span>
        </div>
        <p class="text-xs text-gray-600 mt-3">
          CPC médio Google Ads local · barbearia: R$ 1,85/clique
        </p>
      </div>

      <!-- STEP 2 — TICKET MÉDIO -->
      <div class="mb-10">
        <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
          2. Ticket médio do serviço
        </p>
        <div class="flex flex-wrap gap-3 mb-4">
          <button
            v-for="opt in ticketOptions"
            :key="opt.value"
            @click="selectTicket(opt.value)"
            class="px-4 py-3 rounded-xl border text-sm font-bold transition"
            :class="ticketPreset === opt.value
              ? 'bg-green-400 text-black border-green-400'
              : 'bg-[#181818] text-gray-400 border-white/[.08] hover:border-green-400/40'"
          >
            {{ opt.label }}
          </button>
          <button
            @click="selectTicket('custom')"
            class="px-4 py-3 rounded-xl border text-sm font-bold transition"
            :class="ticketPreset === 'custom'
              ? 'bg-green-400 text-black border-green-400'
              : 'bg-[#181818] text-gray-400 border-white/[.08] hover:border-green-400/40'"
          >
            Personalizado
          </button>
        </div>
        <div v-if="ticketPreset === 'custom'" class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-4">
          <input
            type="range"
            :value="customTicket"
            @input="customTicket = Number(($event.target as HTMLInputElement).value)"
            min="20"
            max="250"
            step="5"
            class="w-full sm:flex-1 accent-green-400"
          />
          <span
            class="font-black text-green-400 sm:shrink-0"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(18px,5vw,24px)"
          >
            R$ {{ customTicket }}
          </span>
        </div>
      </div>

      <!-- STEP 3 — FREQUÊNCIA -->
      <div class="mb-10">
        <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
          3. Frequência média de retorno
        </p>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="opt in frequencyOptions"
            :key="opt.value"
            @click="frequency = opt.value"
            class="px-4 py-3 rounded-xl border text-sm font-bold transition"
            :class="frequency === opt.value
              ? 'bg-green-400 text-black border-green-400'
              : 'bg-[#181818] text-gray-400 border-white/[.08] hover:border-green-400/40'"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- STEP 4 — CENÁRIO -->
      <div class="mb-12">
        <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
          4. Cenário de conversão
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            v-for="sc in SCENARIOS"
            :key="sc.id"
            @click="scenario = sc.id"
            class="rounded-2xl border p-5 text-left transition-all"
            :class="scenario === sc.id
              ? 'border-green-400 bg-green-400/5'
              : 'border-white/[.06] bg-[#181818]'"
          >
            <p class="text-[15px] font-bold text-white mb-2">{{ sc.label }}</p>
            <p class="text-xs text-gray-500 mb-1">Conversão: <span class="text-gray-300">{{ sc.cvr * 100 }}%</span></p>
            <p class="text-xs text-gray-500">Comparecimento: <span class="text-gray-300">{{ sc.showUp * 100 }}%</span></p>
            <div v-if="scenario === sc.id" class="mt-3 text-[10px] font-bold uppercase tracking-widest text-green-400">
              Selecionado
            </div>
          </button>
        </div>
      </div>

      <!-- CARDS DE RESULTADO -->
      <div class="rounded-2xl border border-green-400/20 bg-green-400/5 p-6 mb-10">
        <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-5">
          Resultado estimado — captação mensal via Google Ads
        </p>
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div
            v-for="card in mainCards"
            :key="card.label"
            class="rounded-xl border border-white/[.06] bg-[#111] p-4 text-center"
            :class="{ 'col-span-2 lg:col-span-1': card.wide }"
          >
            <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{{ card.label }}</p>
            <p
              class="font-black leading-none mb-1 break-words"
              :class="card.green ? 'text-green-400' : 'text-white'"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(18px,4vw,28px)"
            >
              {{ card.value }}
            </p>
            <p class="text-[10px] text-gray-600 leading-snug">{{ card.sub }}</p>
          </div>
        </div>
      </div>

      <!-- VALOR DO CLIENTE -->
      <div class="mb-10">
        <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
          Valor potencial da carteira captada
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 sm:p-7">
            <p class="text-[15px] font-bold text-white mb-5">Como calculamos o valor</p>
            <div class="space-y-1">
              <div class="flex justify-between items-center py-3 border-b border-white/[.04] gap-4">
                <span class="text-sm text-gray-500 shrink-0">Ticket médio</span>
                <span class="text-sm font-bold text-white">R$ {{ effectiveTicket }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-white/[.04] gap-4">
                <span class="text-sm text-gray-500 shrink-0">Visitas por mês</span>
                <span class="text-sm font-bold text-white">{{ frequency }}×</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-white/[.04] gap-4">
                <span class="text-sm text-gray-500 shrink-0">Valor mensal por cliente</span>
                <span class="text-sm font-bold text-green-400">{{ fmtBRL(clientMonthlyValue) }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-white/[.04] gap-4">
                <span class="text-sm text-gray-500 shrink-0">Valor anual por cliente</span>
                <span class="text-sm font-bold text-green-400">{{ fmtBRL(clientAnnualValue) }}</span>
              </div>
              <div class="flex justify-between items-center py-3 gap-4">
                <span class="text-sm text-gray-500 shrink-0">Clientes captados</span>
                <span class="text-sm font-bold text-white">{{ currentClients }}</span>
              </div>
            </div>
            <div class="mt-5 pt-5 border-t border-white/[.08]">
              <div class="flex flex-wrap justify-between items-center gap-2">
                <span class="text-[15px] font-bold text-white">Valor potencial da carteira</span>
                <span
                  class="font-black text-green-400"
                  style="font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,5vw,28px)"
                >
                  {{ fmtBRL(portfolioValue) }}
                </span>
              </div>
              <p class="text-xs text-gray-600 mt-2">
                se todos os {{ currentClients }} clientes retornarem por 12 meses
              </p>
            </div>
          </div>

          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 sm:p-7">
            <p class="text-[15px] font-bold text-white mb-2">Cenários de retenção</p>
            <p class="text-xs text-gray-500 mb-5 leading-relaxed">
              Nem todo cliente retorna por 12 meses. Veja o valor gerado em cada cenário.
            </p>
            <div class="space-y-4">
              <div
                v-for="ret in retentionScenarios"
                :key="ret.label"
                class="rounded-xl p-4"
                :class="ret.highlight ? 'border border-green-400/20 bg-green-400/5' : 'bg-[#141414]'"
              >
                <div class="flex items-center justify-between mb-2 gap-2 flex-wrap">
                  <span class="text-sm font-bold" :class="ret.highlight ? 'text-white' : 'text-gray-400'">
                    {{ ret.label }}
                  </span>
                  <span
                    class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    :class="ret.highlight
                      ? 'bg-green-400/15 text-green-400 border border-green-400/20'
                      : 'bg-white/[.04] text-gray-600 border border-white/[.06]'"
                  >
                    {{ ret.rate * 100 }}% retenção
                  </span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs text-gray-600">{{ Math.round(currentClients * ret.rate) }} clientes permanecendo</span>
                  <span
                    class="font-black shrink-0"
                    :class="ret.highlight ? 'text-green-400' : 'text-gray-400'"
                    style="font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,4vw,22px)"
                  >
                    {{ fmtBRL(portfolioValue * ret.rate) }}
                  </span>
                </div>
                <div class="mt-2 h-1 bg-white/[.05] rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full"
                    :style="`width:${ret.rate * 100}%;background:rgba(52,211,153,${ret.highlight ? 0.7 : 0.3})`"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- PONTO DE EQUILÍBRIO -->
      <div class="mb-10">
        <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
          Ponto de equilíbrio
        </p>
        <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 sm:p-7">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <p class="text-xs text-gray-500 uppercase tracking-widest mb-3">Investimento total/mês</p>
              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm gap-3">
                  <span class="text-gray-500 min-w-0 truncate">Sistema ({{ activeSystemPlan.name }})</span>
                  <span class="text-gray-300 shrink-0">R$ {{ activeSystemPlan.monthly.toFixed(2).replace('.', ',') }}</span>
                </div>
                <div class="flex justify-between text-sm gap-3">
                  <span class="text-gray-500 shrink-0">Captação Automática</span>
                  <span class="text-gray-300 shrink-0">R$ 300,00</span>
                </div>
                <div class="flex justify-between text-sm gap-3">
                  <span class="text-gray-500 shrink-0">Verba Google Ads</span>
                  <span class="text-gray-300 shrink-0">R$ {{ budget.toLocaleString('pt-BR') }}</span>
                </div>
                <div class="flex justify-between text-sm pt-2 border-t border-white/[.06] gap-3">
                  <span class="font-bold text-white">Total</span>
                  <span class="font-bold text-white shrink-0">R$ {{ totalInvestment.toLocaleString('pt-BR') }}</span>
                </div>
              </div>
            </div>

            <div class="md:border-x border-t md:border-t-0 border-white/[.06] md:px-6 pt-6 md:pt-0">
              <p class="text-xs text-gray-500 uppercase tracking-widest mb-3">Cortes para empatar</p>
              <p
                class="font-black text-white leading-none mb-1"
                style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,8vw,48px)"
              >
                {{ breakEvenCuts }}
              </p>
              <p class="text-xs text-gray-500">atendimentos no mês</p>
            </div>

            <div class="border-t md:border-t-0 border-white/[.06] pt-6 md:pt-0">
              <p class="text-xs text-gray-500 uppercase tracking-widest mb-3">Clientes retornando {{ frequency }}×/mês</p>
              <p
                class="font-black leading-none mb-1"
                :class="breakEvenClients <= currentClients ? 'text-green-400' : 'text-yellow-500'"
                style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,8vw,48px)"
              >
                {{ breakEvenClients }}
              </p>
              <p class="text-xs" :class="breakEvenClients <= currentClients ? 'text-green-400/70' : 'text-yellow-500/70'">
                <template v-if="breakEvenClients <= currentClients">
                  atingido neste cenário
                </template>
                <template v-else>
                  precisaria de mais {{ breakEvenClients - currentClients }} além do estimado
                </template>
              </p>
            </div>

          </div>
        </div>
      </div>

      <!-- TABELA COMPARATIVA -->
      <div class="mb-6">
        <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
          Comparativo por nível de verba
        </p>
        <div class="rounded-2xl border border-white/[.06] bg-[#181818] overflow-hidden">
          <div class="overflow-x-auto -webkit-overflow-scrolling-touch">
            <table class="w-full text-sm min-w-[540px]">
              <thead>
                <tr class="border-b border-white/[.06]">
                  <th class="text-left text-xs text-gray-600 uppercase tracking-wider px-4 py-3 whitespace-nowrap">Verba/mês</th>
                  <th class="text-right text-xs text-gray-600 uppercase tracking-wider px-4 py-3 whitespace-nowrap">Cliques</th>
                  <th class="text-right text-xs text-gray-600 uppercase tracking-wider px-4 py-3 whitespace-nowrap">Agendamentos</th>
                  <th class="text-right text-xs text-gray-600 uppercase tracking-wider px-4 py-3 whitespace-nowrap">Clientes</th>
                  <th class="text-right text-xs text-gray-600 uppercase tracking-wider px-4 py-3 whitespace-nowrap">Receita inicial</th>
                  <th class="text-right text-xs text-gray-600 uppercase tracking-wider px-4 py-3 whitespace-nowrap">Carteira/ano</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in comparisonTable"
                  :key="row.budget"
                  class="border-b border-white/[.04] last:border-0 transition"
                  :class="row.isActive ? 'bg-green-400/5' : ''"
                >
                  <td class="px-4 py-4 whitespace-nowrap">
                    <span class="font-bold" :class="row.isActive ? 'text-green-400' : 'text-gray-300'">
                      {{ row.budgetFmt }}
                    </span>
                    <span
                      v-if="row.isActive"
                      class="ml-2 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-green-400/15 text-green-400 border border-green-400/20"
                    >
                      atual
                    </span>
                  </td>
                  <td class="text-right px-4 py-4 text-gray-400">{{ row.clicks }}</td>
                  <td class="text-right px-4 py-4 text-gray-400">{{ row.bookings }}</td>
                  <td class="text-right px-4 py-4 text-gray-400">{{ row.clients }}</td>
                  <td class="text-right px-4 py-4 text-gray-300 whitespace-nowrap">{{ row.revenue }}</td>
                  <td class="text-right px-4 py-4 font-bold whitespace-nowrap" :class="row.isActive ? 'text-green-400' : 'text-gray-300'">{{ row.portfolio }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- RODAPÉ -->
      <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5">
        <p class="text-sm text-gray-500 leading-relaxed">
          Estimativas baseadas em campanhas Google Ads locais para barbearias com CPC médio de R$ 1,85. O desempenho real depende da cidade, concorrência, qualidade da landing page e atendimento.
        </p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// ─── PLANOS DO SISTEMA ────────────────────────────────────────────────────────
const SYSTEM_PLANS = [
  { id: 'solo',   name: 'Solo',   desc: '1 profissional · WhatsApp auto', monthly: 49.90  },
  { id: 'small',  name: 'Small',  desc: 'Até 3 profissionais',            monthly: 89.90  },
  { id: 'medium', name: 'Medium', desc: 'Até 6 profissionais',            monthly: 139.90 },
] as const

type SystemPlanId = typeof SYSTEM_PLANS[number]['id']

const GOOGLE_CPC = 1.85

const SCENARIOS = [
  { id: 'conservative', label: 'Conservador', cvr: 0.03, showUp: 0.65 },
  { id: 'likely',       label: 'Provável',    cvr: 0.05, showUp: 0.75 },
  { id: 'excellent',    label: 'Excelente',   cvr: 0.08, showUp: 0.85 },
] as const

type ScenarioId = typeof SCENARIOS[number]['id']

const retentionScenarios = [
  { label: 'Conservador', rate: 0.25, highlight: false },
  { label: 'Provável',    rate: 0.50, highlight: true  },
  { label: 'Excelente',   rate: 0.75, highlight: false },
]

const systemPlan   = ref<SystemPlanId>('solo')
const budget       = ref<number>(300)
const ticketPreset = ref<number | 'custom'>(45)
const customTicket = ref<number>(55)
const frequency    = ref<number>(2)
const scenario     = ref<ScenarioId>('likely')

const ticketOptions = [
  { label: 'R$ 35 — corte simples', value: 35 },
  { label: 'R$ 45 — corte + barba', value: 45 },
  { label: 'R$ 70 — combo premium', value: 70 },
]

const frequencyOptions = [
  { label: '1× por mês', value: 1 },
  { label: '2× por mês', value: 2 },
  { label: '3× por mês', value: 3 },
  { label: '4× por mês', value: 4 },
]

function selectTicket(val: number | 'custom') { ticketPreset.value = val }

function fmtBRL(v: number): string {
  return `R$ ${Math.round(v).toLocaleString('pt-BR')}`
}

const activeSystemPlan = computed(() => SYSTEM_PLANS.find(p => p.id === systemPlan.value)!)

const effectiveTicket = computed<number>(() =>
  ticketPreset.value === 'custom' ? customTicket.value : (ticketPreset.value as number)
)

const activeScenario = computed(() => SCENARIOS.find(s => s.id === scenario.value)!)

const currentClicks   = computed(() => Math.round(budget.value / GOOGLE_CPC))
const currentBookings = computed(() => Math.round(currentClicks.value * activeScenario.value.cvr))
const currentClients  = computed(() => Math.round(currentBookings.value * activeScenario.value.showUp))
const currentRevenue  = computed(() => currentClients.value * effectiveTicket.value)

const clientMonthlyValue = computed(() => effectiveTicket.value * frequency.value)
const clientAnnualValue  = computed(() => clientMonthlyValue.value * 12)
const portfolioValue     = computed(() => currentClients.value * clientAnnualValue.value)

const totalInvestment  = computed(() => 300 + budget.value + activeSystemPlan.value.monthly)
const breakEvenCuts    = computed(() => Math.ceil(totalInvestment.value / effectiveTicket.value))
const breakEvenClients = computed(() => Math.ceil(breakEvenCuts.value / frequency.value))

const mainCards = computed(() => [
  {
    label: 'Cliques gerados',
    value: currentClicks.value.toLocaleString('pt-BR'),
    sub:   'Google Ads · R$ 1,85/clique',
    green: false,
    wide:  false,
  },
  {
    label: 'Agendamentos',
    value: String(currentBookings.value),
    sub:   `${activeScenario.value.cvr * 100}% de conversão`,
    green: false,
    wide:  false,
  },
  {
    label: 'Clientes novos',
    value: String(currentClients.value),
    sub:   `${activeScenario.value.showUp * 100}% comparecimento`,
    green: true,
    wide:  false,
  },
  {
    label: 'Receita inicial',
    value: fmtBRL(currentRevenue.value),
    sub:   `${currentClients.value} clientes × R$ ${effectiveTicket.value}`,
    green: true,
    wide:  false,
  },
  {
    label: 'Valor potencial carteira',
    value: fmtBRL(portfolioValue.value),
    sub:   'se retornarem por 12 meses',
    green: true,
    wide:  true,
  },
])

const COMPARISON_BUDGETS = [100, 200, 300, 500, 800, 1000, 1500, 2000, 3000]

function calcRow(b: number) {
  const clicks    = Math.round(b / GOOGLE_CPC)
  const bookings  = Math.round(clicks * activeScenario.value.cvr)
  const clients   = Math.round(bookings * activeScenario.value.showUp)
  return {
    clicks,
    bookings,
    clients,
    revenue:   clients * effectiveTicket.value,
    portfolio: clients * clientAnnualValue.value,
  }
}

const comparisonTable = computed(() =>
  COMPARISON_BUDGETS.map(b => {
    const r = calcRow(b)
    return {
      budget:    b,
      budgetFmt: fmtBRL(b),
      clicks:    r.clicks.toLocaleString('pt-BR'),
      bookings:  r.bookings,
      clients:   r.clients,
      revenue:   fmtBRL(r.revenue),
      portfolio: fmtBRL(r.portfolio),
      isActive:  b === budget.value,
    }
  })
)
</script>