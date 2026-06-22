<!-- pages/gestao-de-trafego/agencias.vue -->
<template>
  <div class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-4 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span>/</span>
          <NuxtLink to="/gestao-de-trafego" class="hover:text-green-400 transition-colors">Captação Automática</NuxtLink>
          <span>/</span>
          <span class="text-gray-400">Para Agências</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="relative w-full py-20 px-4 md:px-16 bg-[#0a0a0a] overflow-hidden">
      <div
        class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse 55% 50% at 30% 40%,rgba(52,211,153,.06) 0%,transparent 70%)"
      />
      <div class="relative max-w-6xl mx-auto">

        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20 mb-8">
          🤝 Para agências e gestores de tráfego
        </div>

        <h1
          class="font-black leading-none mb-6 text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,6vw,88px);letter-spacing:.03em"
        >
          SUA AGÊNCIA<br>
          <span class="text-green-400">ATENDE MAIS.</span><br>
          SEM CONTRATAR MAIS.
        </h1>

        <div class="max-w-3xl space-y-5 mb-10">
          <p class="text-xl text-gray-400 leading-relaxed">
            A SuaAgenda IA assume o trabalho operacional de Google Ads para barbearias — criação, segmentação e otimização semanal. Sua equipe para de fazer tarefas repetitivas e começa a fazer o que importa: estratégia e crescimento.
          </p>
          <p class="text-lg text-gray-500 leading-relaxed">
            Cada cliente da agência roda com uma IA dedicada, que lê os dados reais de agendamento e ajusta campanhas automaticamente. Você mantém a visão, a IA executa.
          </p>
        </div>

        <div class="flex flex-wrap gap-4 mb-10">
          <a
            href="https://wa.me/5511941649284?text=Sou%20gest%C3%A3o%20de%20tr%C3%A1fego%20e%20quero%20entender%20a%20SuaAgenda%20IA%20para%20ag%C3%AAncias"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-green-400 text-black text-base font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            💬 Falar com um especialista
          </a>
          <a
            href="#planos"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-base text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            Ver planos →
          </a>
        </div>

        <div class="flex flex-wrap gap-4 text-xs text-gray-600">
          <span class="flex items-center gap-1">✅ Sem aumentar equipe</span>
          <span class="flex items-center gap-1">✅ Relatório por cliente</span>
          <span class="flex items-center gap-1">✅ Cancelamento sem multa</span>
        </div>

      </div>
    </section>

    <!-- O PROBLEMA QUE RESOLVE -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0d0d0d] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">O problema real</span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          GESTÃO MANUAL<br>
          <span class="text-green-400">NÃO ESCALA.</span>
        </h2>
        <p class="text-gray-500 text-[15px] max-w-2xl mb-12 leading-relaxed">
          Para cada novo cliente de barbearia que você aceita, alguém da sua equipe precisa criar campanhas, revisar palavras-chave, ajustar lances e montar relatório. É trabalho que não escala — e que a IA faz melhor.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <!-- Sem IA -->
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 sm:p-8">
            <p class="text-xs font-bold uppercase tracking-widest text-gray-600 mb-5">Hoje, sem a IA</p>
            <div class="space-y-4">
              <div v-for="pain in painPoints" :key="pain" class="flex items-start gap-3">
                <span class="text-gray-700 mt-0.5 shrink-0 text-lg">✕</span>
                <p class="text-[15px] text-gray-500">{{ pain }}</p>
              </div>
            </div>
          </div>

          <!-- Com IA -->
          <div class="rounded-2xl border border-green-400/20 bg-green-400/5 p-6 sm:p-8">
            <p class="text-xs font-bold uppercase tracking-widest text-green-400 mb-5">Com a SuaAgenda IA</p>
            <div class="space-y-4">
              <div v-for="gain in gains" :key="gain" class="flex items-start gap-3">
                <span class="text-green-400 mt-0.5 shrink-0 text-lg">✓</span>
                <p class="text-[15px] text-gray-300">{{ gain }}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- COMO FUNCIONA PARA A AGÊNCIA -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">Como funciona</span>
        <h2
          class="mt-3 mb-12 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          VOCÊ CONFIGURA.<br>
          <span class="text-green-400">A IA EXECUTA.</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          <div
            v-for="(step, idx) in agencyFlow"
            :key="step.title"
            class="rounded-2xl border p-6 relative"
            :class="step.highlight ? 'border-green-400/30 bg-green-400/5' : 'border-white/[.06] bg-[#181818]'"
          >
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm mb-4"
              :class="step.highlight ? 'bg-green-400 text-black' : 'bg-green-400/10 text-green-400'"
            >
              {{ idx + 1 }}
            </div>
            <p class="text-[10px] font-bold uppercase tracking-widest mb-2"
              :class="step.highlight ? 'text-green-400' : 'text-gray-600'">
              {{ step.who }}
            </p>
            <h3 class="text-[15px] font-bold text-white mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

        <!-- simulação de painel de agência -->
        <div class="rounded-2xl border border-white/[.06] bg-[#0e0e0e] overflow-hidden max-w-3xl">
          <div class="flex items-center justify-between px-5 py-4 border-b border-white/[.05] bg-[#141414]">
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-md bg-green-400/20 flex items-center justify-center text-green-400 text-xs font-black">IA</span>
              <span class="text-sm font-bold text-white">Painel da Agência · Visão geral dos clientes</span>
            </div>
            <span class="text-xs text-gray-600">Automático</span>
          </div>
          <div class="divide-y divide-white/[.04]">
            <div
              v-for="client in agencyClients"
              :key="client.name"
              class="flex items-center justify-between px-5 py-4 gap-4"
            >
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center text-green-400 font-black text-xs shrink-0">
                  {{ client.name[0] }}
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-bold text-white truncate">{{ client.name }}</p>
                  <p class="text-xs text-gray-600">{{ client.city }}</p>
                </div>
              </div>
              <div class="flex items-center gap-6 shrink-0">
                <div class="text-right hidden sm:block">
                  <p class="text-xs text-gray-600">Agendamentos</p>
                  <p class="text-sm font-bold text-white">{{ client.bookings }}</p>
                </div>
                <div class="text-right hidden sm:block">
                  <p class="text-xs text-gray-600">Novos clientes</p>
                  <p class="text-sm font-bold text-green-400">{{ client.newClients }}</p>
                </div>
                <span
                  class="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  :class="client.status === 'Ativo' ? 'bg-green-400/15 text-green-400' : 'bg-yellow-400/10 text-yellow-400'"
                >
                  {{ client.status }}
                </span>
              </div>
            </div>
          </div>
          <div class="px-5 py-3 bg-[#141414] border-t border-white/[.05]">
            <p class="text-xs text-gray-600">* Painel fictício para fins ilustrativos.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- BENEFÍCIOS PARA A AGÊNCIA -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#111] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">Por que usar</span>
        <h2
          class="mt-3 mb-12 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          O QUE MUDA<br>
          <span class="text-green-400">NA SUA OPERAÇÃO.</span>
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          <div
            v-for="benefit in agencyBenefits"
            :key="benefit.title"
            class="rounded-2xl border border-white/[.06] bg-[#181818] p-6"
          >
            <div class="text-3xl mb-4">{{ benefit.emoji }}</div>
            <h3 class="text-[15px] font-bold text-white mb-2">{{ benefit.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>

        <!-- comparativo de escala -->
        <div class="rounded-2xl border border-green-400/20 bg-[#0e0e0e] p-6 sm:p-8 max-w-3xl">
          <p class="text-xs font-bold uppercase tracking-widest text-green-400 mb-6">Exemplo de escala</p>
          <div class="space-y-5">
            <div v-for="row in scaleRows" :key="row.label">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-400">{{ row.label }}</span>
                <span class="font-bold text-white">{{ row.value }}</span>
              </div>
              <div class="h-2 bg-white/[.06] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full"
                  :style="`width: ${row.pct}%; background: rgba(52,211,153,${row.opacity})`"
                />
              </div>
              <p class="text-xs text-gray-600 mt-1">{{ row.note }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- PLANOS GROWTH PARA AGÊNCIAS -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]" id="planos">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">Planos</span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,56px)"
        >
          CADA CLIENTE DA AGÊNCIA<br>
          <span class="text-green-400">TEM SEU PRÓPRIO PLANO.</span>
        </h2>
        <p class="text-gray-500 text-[15px] max-w-2xl mb-10 leading-relaxed">
          O plano é contratado por barbearia, não por agência. Você indica o plano certo para cada cliente e a IA faz o resto. Sem mensalidade de agência, sem taxa de plataforma.
        </p>

        <!-- planos growth via API -->
        <div v-if="plansLoading" class="flex items-center gap-3 text-sm text-gray-500 mb-8">
          <div class="w-4 h-4 rounded-full border-2 border-green-400/30 border-t-green-400 animate-spin" />
          Carregando planos...
        </div>

        <div v-else-if="plansError" class="text-sm text-red-400 mb-8">
          Não foi possível carregar os planos.
          <button @click="loadGrowthPlans" class="underline ml-2 text-green-400">Tentar novamente</button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div
            v-for="plan in growthPlans"
            :key="plan.id"
            class="rounded-2xl border p-6 flex flex-col gap-3 relative overflow-hidden"
            :class="plan.isPopular
              ? 'border-green-400/40 bg-green-400/[.04]'
              : 'border-white/[.06] bg-[#181818]'"
          >
            <div v-if="plan.isPopular" class="absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-400/20 text-green-400 border border-green-400/30">
              Mais usado
            </div>

            <p class="text-[10px] font-bold uppercase tracking-widest"
              :class="plan.isPopular ? 'text-green-400' : 'text-gray-500'">
              {{ plan.name }}
            </p>

            <p
              class="font-black leading-none"
              :class="plan.price === 0 ? 'text-yellow-400' : 'text-white'"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(22px,3.5vw,32px)"
            >
              {{ plan.price === 0 ? 'Sob consulta' : `R$ ${fmt(plan.price)}/mês` }}
            </p>
            <p class="text-xs text-gray-600 -mt-1">por barbearia cliente</p>

            <p class="text-sm text-gray-500 leading-relaxed">{{ plan.description }}</p>

            <div v-if="plan.highlights?.length" class="space-y-1.5 pt-1 border-t border-white/[.05]">
              <p
                v-for="h in plan.highlights"
                :key="h"
                class="text-[11px] text-gray-500 flex items-center gap-1.5"
              >
                <span class="text-green-400/70">✓</span> {{ h }}
              </p>
            </div>

            <a
              :href="`https://wa.me/5511941649284?text=Sou%20gestor%20e%20quero%20saber%20mais%20sobre%20o%20plano%20${encodeURIComponent(plan.name)}%20para%20minha%20ag%C3%AAncia`"
              target="_blank"
              rel="noopener"
              class="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition"
              :class="plan.isPopular
                ? 'bg-green-400 text-black hover:bg-green-300'
                : 'border border-white/20 text-white hover:border-green-400 hover:text-green-400'"
            >
              {{ plan.price === 0 ? 'Falar sobre condições' : 'Quero esse plano' }}
            </a>
          </div>
        </div>

        <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 max-w-2xl">
          <p class="text-sm text-gray-500 leading-relaxed">
            💡 <strong class="text-gray-300">Agências com volume acima de 10 clientes</strong> têm condições especiais de parceria. Entre em contato pelo WhatsApp para saber mais.
          </p>
        </div>

      </div>
    </section>

    <!-- O QUE A IA FAZ, O QUE SOBRA PRA VOCÊ -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#111] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">Divisão de trabalho</span>
        <h2
          class="mt-3 mb-12 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          O QUE A IA FAZ.<br>
          <span class="text-green-400">O QUE SOBRA PRA VOCÊ.</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-green-400/15 flex items-center justify-center text-green-400 text-sm shrink-0">🤖</span>
              <h3 class="text-lg font-bold text-white">A IA faz</h3>
            </div>
            <div class="space-y-4">
              <div v-for="item in iaDoes" :key="item" class="flex items-center gap-3">
                <span class="text-green-400 shrink-0">→</span>
                <p class="text-[15px] text-gray-300">{{ item }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-white/[.05] flex items-center justify-center text-gray-400 text-sm shrink-0">👤</span>
              <h3 class="text-lg font-bold text-white">Você faz</h3>
            </div>
            <div class="space-y-4">
              <div v-for="item in agencyDoes" :key="item" class="flex items-center gap-3">
                <span class="text-green-400 shrink-0">→</span>
                <p class="text-[15px] text-gray-300">{{ item }}</p>
              </div>
            </div>
            <div class="mt-6 rounded-xl bg-green-400/5 border border-green-400/15 p-4">
              <p class="text-sm text-green-400/90 leading-relaxed">
                💡 Sua agência vira uma consultora estratégica — enquanto a IA faz o operacional de tráfego.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- FAQ PARA AGÊNCIAS -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0d0d0d] border-t border-white/5" id="faq">
      <div class="max-w-4xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400 text-center block">Dúvidas de agências</span>
        <h2
          class="mt-3 mb-12 font-black leading-none text-white text-center"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px)"
        >
          PERGUNTAS FREQUENTES
        </h2>

        <div class="space-y-4">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="rounded-2xl border border-white/[.06] bg-[#181818] overflow-hidden"
          >
            <button
              @click="faq.open = !faq.open"
              class="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-white/[.02]"
            >
              <span class="font-bold text-white text-[16px] pr-4">{{ faq.question }}</span>
              <span class="text-green-400 text-xl shrink-0 ml-4">{{ faq.open ? '−' : '+' }}</span>
            </button>
            <div v-show="faq.open" class="px-5 sm:px-6 pb-5 sm:pb-6">
              <div class="pt-2 border-t border-white/[.05] text-gray-400 text-[15px] leading-relaxed space-y-3">
                <p v-for="(paragraph, pIdx) in faq.answer" :key="pIdx">{{ paragraph }}</p>
                <div v-if="faq.note" class="mt-3 p-3 rounded-xl bg-green-400/5 border border-green-400/15 text-green-400/90 text-sm">
                  💡 {{ faq.note }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="w-full py-24 px-4 md:px-16 bg-[#0a0a0a] border-t border-white/5">
      <div class="max-w-2xl mx-auto text-center">

        <h2
          class="font-black leading-none text-white mb-4"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,5vw,72px)"
        >
          PRONTO PARA<br>
          <span class="text-green-400">ESCALAR SUA AGÊNCIA?</span>
        </h2>

        <p class="text-gray-400 text-lg mb-8 leading-relaxed">
          Fale com a gente pelo WhatsApp. A gente explica como funciona a parceria, mostra o painel ao vivo e tira todas as dúvidas antes de você indicar para qualquer cliente.
        </p>

        <div class="flex flex-wrap gap-4 justify-center mb-6">
          <a
            href="https://wa.me/5511941649284?text=Sou%20gest%C3%A3o%20de%20tr%C3%A1fego%20e%20quero%20entender%20a%20SuaAgenda%20IA%20para%20ag%C3%AAncias"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-8 py-5 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            💬 Quero conversar sobre parceria
          </a>
          <NuxtLink
            to="/gestao-de-trafego"
            class="inline-flex items-center gap-2 px-6 py-5 rounded-2xl font-bold text-base text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            ← Ver para barbearias
          </NuxtLink>
        </div>

        <p class="text-xs text-gray-600">
          Sem contrato de agência. Cada cliente contrata o próprio plano.
        </p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'barber' })

// ── PLANOS GROWTH ─────────────────────────────────────────────────────────────

interface GrowthPlan {
  id:          number
  name:        string
  description: string
  price:       number
  isPopular:   boolean
  highlights?: string[]
}

const GROWTH_PLAN_IDS = new Set([6, 7, 8, 9, 10])

const GROWTH_HIGHLIGHTS: Record<number, string[]> = {
  6:  ['1 profissional', 'IA Google Ads incluída', 'Verba até R$300/mês'],
  7:  ['Até 3 profissionais', 'IA Google Ads incluída', 'Verba até R$500/mês'],
  8:  ['Até 6 profissionais', 'IA + otimização avançada', 'Verba até R$1.000/mês'],
  9:  ['Profissionais ilimitados', 'IA avançada', 'Verba ilimitada'],
  10: ['Somente IA + Google Ads', 'Ideal para quem já usa outro sistema', 'Verba até R$300/mês'],
}

const config       = useRuntimeConfig()
const plansLoading = ref(false)
const plansError   = ref(false)
const growthPlans  = ref<GrowthPlan[]>([])

async function loadGrowthPlans() {
  plansLoading.value = true
  plansError.value   = false
  try {
    const res  = await fetch(`${config.public.apiBase}/plans/public`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const list: any[] = Array.isArray(json) ? json : (json.data ?? [])

    growthPlans.value = list
      .filter((p: any) => GROWTH_PLAN_IDS.has(Number(p.id)))
      .sort((a: any, b: any) => Number(a.price) - Number(b.price))
      .map((p: any) => ({
        id:          Number(p.id),
        name:        p.name,
        description: p.description ?? '',
        price:       Number(p.price),
        isPopular:   !!p.isPopular,
        highlights:  GROWTH_HIGHLIGHTS[Number(p.id)] ?? [],
      }))
  } catch (e) {
    console.error('[loadGrowthPlans]', e)
    plansError.value = true
  } finally {
    plansLoading.value = false
  }
}

function fmt(n: number): string {
  return Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

onMounted(() => { loadGrowthPlans() })

// ── DADOS ESTÁTICOS ───────────────────────────────────────────────────────────

const painPoints = [
  'Criar campanha do zero para cada cliente novo consome horas',
  'Ajustes semanais de lance dependem de quem está disponível na equipe',
  'Relatório mensal manual é repetitivo e atrasa o fechamento',
  'Escalar de 5 para 20 clientes exige contratar mais pessoas',
  'Erros humanos em campanhas queimam verba do cliente',
]

const gains = [
  'Campanha criada e ativada automaticamente pela IA para cada cliente',
  'Otimização semanal sem intervenção humana — a IA ajusta lances sozinha',
  'Relatório gerado e enviado automaticamente todo mês',
  'Você passa de 5 para 20 clientes sem aumentar a equipe',
  'Menos erros: a IA segmenta por ticket médio antes de ativar',
]

const agencyFlow = [
  {
    who: 'Você', highlight: false,
    title: 'Onboarding do cliente',
    desc: 'Você indica o plano Growth certo para cada barbearia e faz o cadastro inicial.',
  },
  {
    who: 'IA', highlight: true,
    title: 'Lê o histórico e cria a campanha',
    desc: 'A IA analisa os dados de agendamento e monta grupos por serviço no Google Ads.',
  },
  {
    who: 'IA', highlight: true,
    title: 'Otimiza toda semana',
    desc: 'Ajusta lances, pausa grupos sem resultado, adiciona palavras-chave — sem você tocar.',
  },
  {
    who: 'Você', highlight: false,
    title: 'Acompanha e estratégia',
    desc: 'Você vê o painel de todos os clientes, foca em crescimento e relacionamento.',
  },
]

const agencyClients = [
  { name: 'Barbearia do João',  city: 'São Paulo, SP',    bookings: '23', newClients: '+8',  status: 'Ativo' },
  { name: 'Cortes & Cia',       city: 'Campinas, SP',     bookings: '17', newClients: '+5',  status: 'Ativo' },
  { name: 'Studio Masculino',   city: 'Ribeirão Preto',   bookings: '31', newClients: '+12', status: 'Ativo' },
  { name: 'Barber House',       city: 'Santos, SP',       bookings: '9',  newClients: '+3',  status: 'Otimizando' },
]

const agencyBenefits = [
  {
    emoji: '🚀',
    title: 'Escala sem contratar',
    desc: 'Atenda 2x mais clientes com a mesma equipe. A IA faz o trabalho operacional de tráfego.',
  },
  {
    emoji: '📊',
    title: 'Visão unificada',
    desc: 'Painel único com todos os clientes — agendamentos, novos clientes e status de campanha.',
  },
  {
    emoji: '🤖',
    title: 'Otimização baseada em resultado real',
    desc: 'A IA não otimiza por cliques. Ela otimiza por agendamentos gerados — o que importa pro cliente.',
  },
  {
    emoji: '💬',
    title: 'Relatório automático por cliente',
    desc: 'Relatório mensal gerado e enviado automaticamente. Você para de montar PDF.',
  },
  {
    emoji: '🎯',
    title: 'Mais tempo para estratégia',
    desc: 'Sua equipe para de ajustar lance e começa a pensar em crescimento, criativos e novos serviços.',
  },
  {
    emoji: '💰',
    title: 'Nova fonte de receita recorrente',
    desc: 'Ofereça captação automatizada como serviço e cobre pela gestão estratégica por cima.',
  },
]

const scaleRows = [
  { label: 'Clientes hoje', value: '5 barbearias', pct: 25, opacity: 0.4, note: 'Gerenciados manualmente' },
  { label: 'Com SuaAgenda IA', value: '20 barbearias', pct: 100, opacity: 0.9, note: 'Mesma equipe, IA faz o operacional' },
]

const iaDoes = [
  'Cria e ativa campanhas no Google Ads',
  'Segmenta por serviço e ticket médio',
  'Ajusta lances toda semana',
  'Pausa grupos sem conversão',
  'Adiciona palavras-chave novas automaticamente',
  'Gera relatório mensal por cliente',
]

const agencyDoes = [
  'Define estratégia e posicionamento do cliente',
  'Faz o onboarding e configura o sistema',
  'Acompanha os resultados no painel',
  'Desenvolve criativos e branding',
  'Cuida do relacionamento e retenção do cliente',
  'Propõe expansão e novos serviços',
]

const faqs = ref([
  {
    open: false,
    question: '🤝 Como funciona a parceria com agências?',
    answer: [
      'Não existe um contrato de parceria formal. Cada barbearia cliente sua contrata o próprio plano Growth diretamente.',
      'Sua agência faz o onboarding, configura o sistema e acompanha os resultados. A IA executa o operacional de campanha.',
      'Para agências com volume acima de 10 clientes, temos condições especiais. Entre em contato pelo WhatsApp.',
    ],
    note: 'Sem mensalidade de agência. Você cobra pelo serviço estratégico por cima.',
  },
  {
    open: false,
    question: '📊 Minha agência tem acesso ao painel de todos os clientes?',
    answer: [
      'Sim. Você tem uma visão unificada de todos os clientes que gerencia — agendamentos, novos clientes e status de campanha.',
      'Cada cliente também tem seu próprio acesso para acompanhar os dados individualmente.',
    ],
    note: 'Transparência total para você e para o cliente final.',
  },
  {
    open: false,
    question: '💸 A agência pode cobrar por cima do plano?',
    answer: [
      'Sim. O plano Growth é o custo de plataforma. Você pode cobrar qualquer valor adicional pelo serviço de gestão, consultoria e estratégia que oferece.',
      'A maioria das agências parceiras cobra uma mensalidade de gestão por cima do plano Growth do cliente.',
    ],
    note: 'Você define sua margem. Nós só cobramos do cliente o plano da plataforma.',
  },
  {
    open: false,
    question: '🔌 O cliente já usa outro sistema de agendamento. Funciona?',
    answer: [
      'Sim. A IA usa qualquer link público de agendamento como destino dos anúncios.',
      'O cliente pode continuar usando AppBarber, Trinks, Booksy ou qualquer outra plataforma.',
    ],
    note: 'Isso facilita muito o onboarding — o cliente não precisa migrar nada.',
  },
  {
    open: false,
    question: '🎯 Preciso entender de Google Ads para operar?',
    answer: [
      'Não é necessário. A IA cria e otimiza as campanhas automaticamente.',
      'Mas se você já tem expertise em tráfego pago, vai conseguir tirar ainda mais resultado acompanhando os dados e ajustando a estratégia em cima do que a IA está fazendo.',
    ],
    note: 'A IA executa. Você estrategiza.',
  },
  {
    open: false,
    question: '📈 E se o cliente quiser cancelar?',
    answer: [
      'O cliente pode cancelar quando quiser, sem multa.',
      'Sua agência continua existindo independentemente. A saída de um cliente não afeta os outros.',
    ],
  },
])

useHead({
  title: 'SuaAgenda IA para Agências — Escale sem contratar',
  meta: [
    { name: 'description', content: 'A SuaAgenda IA automatiza Google Ads para agências de marketing que atendem barbearias. Escale sua operação sem aumentar equipe.' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://suaagenda.link/gestao-de-trafego/agencias' }],
})
</script>