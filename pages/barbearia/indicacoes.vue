<!-- pages/indicacoes/index.vue -->
<template>
  <div class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span>/</span>
          <span class="text-gray-400">Programa de Indicações</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">

      <div
        class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse 60% 50% at 65% 40%,rgba(52,211,153,.06) 0%,transparent 70%)"
      />

      <div class="relative max-w-6xl mx-auto">

        <div class="flex flex-wrap gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
            💰 Renda Recorrente
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            📍 Brasil — via Asaas
          </span>
        </div>

        <h1
          class="font-black leading-none mb-6 text-green-400"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,88px);letter-spacing:.03em"
        >
          INDIQUE UMA VEZ.<br>
          <span class="text-white">GANHE TODO MÊS.</span>
        </h1>

        <div class="max-w-3xl space-y-5 mb-10">
          <p class="text-xl text-gray-400 leading-relaxed">
            Cada barbearia que você indicar e assinar o plano gera comissão recorrente pra você — todo mês, enquanto ela permanecer ativa.
          </p>
          <p class="text-lg text-gray-500 leading-relaxed">
            Não é bônus único. É uma carteira que cresce enquanto você dorme.
          </p>
        </div>

        <!-- HERO STATS -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
          <div
            v-for="hstat in heroStats"
            :key="hstat.label"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-5 text-center"
          >
            <p
              class="font-black text-green-400 leading-none mb-1"
              style="font-family:'Bebas Neue',sans-serif;font-size:36px"
            >
              {{ hstat.num }}
            </p>
            <p class="text-xs text-gray-500">{{ hstat.label }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- VENDA ÚNICA x RENDA RECORRENTE -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Por que recorrente é melhor
        </span>

        <h2
          class="mt-3 mb-10 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          VENDA ÚNICA<br>
          <span class="text-green-400">VS RENDA RECORRENTE</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

          <!-- VENDA ÚNICA -->
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-white/[.05] flex items-center justify-center text-gray-400 font-bold text-sm">1×</span>
              <h3 class="text-lg font-bold text-gray-400">Venda Única</h3>
            </div>
            <div class="space-y-4 mb-6">
              <div v-for="item in vendaUnica" :key="item" class="flex items-start gap-3">
                <span class="text-gray-600 mt-0.5 shrink-0">→</span>
                <p class="text-sm text-gray-600 leading-relaxed">{{ item }}</p>
              </div>
            </div>
            <!-- Mini gráfico venda única -->
            <div class="bg-[#141414] rounded-xl p-4">
              <p class="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Ganhos ao longo do tempo</p>
              <div class="flex items-end gap-2 h-16">
                <div class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full bg-gray-700 rounded-sm" style="height:48px"></div>
                  <span class="text-[10px] text-gray-600">Mês 1</span>
                </div>
                <div v-for="m in [2,3,4,5,6]" :key="m" class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full bg-gray-800 rounded-sm" style="height:4px"></div>
                  <span class="text-[10px] text-gray-700">{{ m }}</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 mt-3">Recebe uma vez. Depois, zero.</p>
            </div>
          </div>

          <!-- RENDA RECORRENTE -->
          <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-green-400/15 flex items-center justify-center text-green-400 font-bold text-sm">∞</span>
              <h3 class="text-lg font-bold text-white">Renda Recorrente</h3>
            </div>
            <div class="space-y-4 mb-6">
              <div v-for="item in rendaRecorrente" :key="item" class="flex items-start gap-3">
                <span class="text-green-400 mt-0.5 shrink-0">→</span>
                <p class="text-sm text-gray-400 leading-relaxed">{{ item }}</p>
              </div>
            </div>
            <!-- Mini gráfico recorrente -->
            <div class="bg-[#141414] rounded-xl p-4">
              <p class="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Ganhos ao longo do tempo</p>
              <div class="flex items-end gap-2 h-16">
                <div
                  v-for="(h, i) in [20, 30, 38, 44, 50, 56]"
                  :key="i"
                  class="flex flex-col items-center gap-1 flex-1"
                >
                  <div
                    class="w-full rounded-sm"
                    :style="`height:${h}px; background: rgba(52,211,153,${0.3 + i * 0.1})`"
                  />
                  <span class="text-[10px] text-gray-600">{{ i + 1 }}</span>
                </div>
              </div>
              <p class="text-xs text-green-400/70 mt-3">Cresce a cada nova indicação ativa.</p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section class="py-20 bg-[#111]">
      <div class="max-w-6xl mx-auto px-6">

        <h2
          class="font-black text-white mb-10"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          NÍVEIS DE
          <span class="text-green-400">PARCERIA</span>
        </h2>

        <div class="grid md:grid-cols-2 gap-5 mb-10">

          <button
            @click="partnerMode = 'system'"
            class="rounded-2xl border p-8 text-left transition-all"
            :class="
              partnerMode === 'system'
                ? 'border-green-400 bg-green-400/5'
                : 'border-white/[.06] bg-[#181818]'
            "
          >
            <h3 class="text-white font-bold text-xl mb-3">
              Parceiro Sistema
            </h3>

            <p class="text-gray-400 mb-4">
              Indicação apenas do Barber.
            </p>

            <p class="text-green-400 text-4xl font-black">
              R$ 14,97
            </p>

            <p class="text-gray-500">
              por cliente ativo
            </p>

            <div
              v-if="partnerMode === 'system'"
              class="mt-4 inline-flex px-3 py-1 rounded-full bg-green-400 text-black text-xs font-bold"
            >
              Selecionado
            </div>
          </button>

          <button
            @click="partnerMode = 'growth'"
            class="rounded-2xl border p-8 text-left transition-all"
            :class="
              partnerMode === 'growth'
                ? 'border-green-400 bg-green-400/5'
                : 'border-white/[.06] bg-[#181818]'
            "
          >
            <h3 class="text-white font-bold text-xl mb-3">
              Parceiro Growth
            </h3>

            <p class="text-gray-400 mb-4">
              Sistema + gestão de tráfego.
            </p>

            <p class="text-green-400 text-4xl font-black">
              R$ 44,97
            </p>

            <p class="text-gray-500">
              por cliente ativo
            </p>

            <div
              v-if="partnerMode === 'growth'"
              class="mt-4 inline-flex px-3 py-1 rounded-full bg-green-400 text-black text-xs font-bold"
            >
              Selecionado
            </div>
          </button>

        </div>

      </div>
    </section>

    <!-- SIMULADOR INTERATIVO -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Simulador
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          QUANTO VOCÊ<br>
          <span class="text-green-400">PODE GANHAR</span>
        </h2>
        <p class="text-gray-500 mb-10 text-[15px]">Selecione quantas indicações ativas você teria por mês:</p>

        <div class="mb-6">
          <span
            class="inline-flex px-4 py-2 rounded-full bg-green-400/10 text-green-400 text-sm font-bold"
          >
            {{
              partnerMode === 'system'
                ? 'Modo Parceiro Sistema'
                : 'Modo Parceiro Growth'
            }}
          </span>
        </div>
        <!-- SELETOR -->
        <div class="flex flex-wrap gap-3 mb-10">
          <button
            v-for="opt in simOptions"
            :key="opt.qty"
            @click="selectedSim = opt.qty"
            class="px-5 py-3 rounded-xl border text-sm font-bold transition"
            :class="selectedSim === opt.qty
              ? 'bg-green-400 text-black border-green-400'
              : 'bg-[#181818] text-gray-400 border-white/[.08] hover:border-green-400/40'"
          >
            {{ opt.label }}
          </button>
        </div>

        <!-- RESULTADO DO SIMULADOR -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div
            v-for="res in currentSimResults"
            :key="res.label"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-6 text-center"
          >
            <p class="text-xs text-gray-600 uppercase tracking-widest mb-2">{{ res.label }}</p>
            <p
              class="font-black text-green-400 leading-none"
              style="font-family:'Bebas Neue',sans-serif;font-size:36px"
            >
              {{ res.value }}
            </p>
            <p class="text-xs text-gray-600 mt-1">{{ res.sub }}</p>
          </div>
        </div>

        <!-- TABELA COMPARATIVA -->
        <div class="rounded-2xl border border-white/[.06] bg-[#181818] overflow-hidden">
          <div class="p-5 border-b border-white/[.06]">
            <p class="text-xs font-bold uppercase tracking-widest text-gray-500">Comparativo por volume de indicações</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-white/[.06]">
                  <th class="text-left text-xs text-gray-600 uppercase tracking-wider px-5 py-3">Indicações ativas</th>
                  <th class="text-right text-xs text-gray-600 uppercase tracking-wider px-5 py-3">Ganho/mês</th>
                  <th class="text-right text-xs text-gray-600 uppercase tracking-wider px-5 py-3">12 meses</th>
                  <th class="text-right text-xs text-gray-600 uppercase tracking-wider px-5 py-3">24 meses</th>
                  <th class="text-right text-xs text-gray-600 uppercase tracking-wider px-5 py-3">36 meses</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in simTable"
                  :key="row.qty"
                  class="border-b border-white/[.04] last:border-0 transition"
                  :class="selectedSim === row.qty ? 'bg-green-400/5' : ''"
                >
                  <td class="px-5 py-4">
                    <span
                      class="font-bold text-[15px]"
                      :class="selectedSim === row.qty ? 'text-green-400' : 'text-gray-300'"
                    >
                      {{ row.qty }} barbearias
                    </span>
                  </td>
                  <td class="text-right px-5 py-4 font-bold" :class="selectedSim === row.qty ? 'text-green-400' : 'text-gray-300'">{{ row.monthly }}</td>
                  <td class="text-right px-5 py-4 text-gray-400">{{ row.y1 }}</td>
                  <td class="text-right px-5 py-4 text-gray-400">{{ row.y2 }}</td>
                  <td class="text-right px-5 py-4 text-gray-300 font-bold">{{ row.y3 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p class="text-xs text-gray-600 mt-4">
          * Cálculo baseado na comissão recorrente mensal por indicação ativa. Valores acumulados consideram churn zero para fins ilustrativos.
        </p>

      </div>
    </section>

    <!-- GRÁFICO CRESCIMENTO 12/24/36 MESES -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Crescimento acumulado
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          PROJEÇÃO DE<br>
          <span class="text-green-400">12, 24 E 36 MESES</span>
        </h2>
        <p class="text-gray-500 mb-8 text-[15px]">Ganhos acumulados conforme você vai indicando e mantendo clientes ativos.</p>

        <!-- SELETOR GRÁFICO -->
        <div class="flex flex-wrap gap-3 mb-8">
          <button
            v-for="opt in chartOptions"
            :key="opt.qty"
            @click="selectedChart = opt.qty"
            class="px-4 py-2 rounded-lg border text-sm font-bold transition"
            :class="selectedChart === opt.qty
              ? 'bg-green-400 text-black border-green-400'
              : 'bg-[#181818] text-gray-400 border-white/[.08] hover:border-green-400/40'"
          >
            {{ opt.label }}
          </button>
        </div>

        <!-- BARRAS DE CRESCIMENTO -->
        <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-7">

          <!-- Marcos: 12, 24, 36 -->
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div
              v-for="marco in currentMarcos"
              :key="marco.label"
              class="text-center"
            >
              <p class="text-xs text-gray-600 uppercase tracking-widest mb-1">{{ marco.label }}</p>
              <p
                class="font-black text-green-400"
                style="font-family:'Bebas Neue',sans-serif;font-size:32px"
              >
                {{ marco.value }}
              </p>
              <p class="text-xs text-gray-600">acumulado</p>
            </div>
          </div>

          <!-- Barras mensais -->
          <div class="flex items-end gap-1 h-40 mb-3">
            <div
              v-for="(bar, i) in currentBars"
              :key="i"
              class="flex-1 rounded-t-sm transition-all"
              :style="`height: ${bar.pct}%; background: rgba(52,211,153,${0.2 + (i / currentBars.length) * 0.7})`"
              :title="`Mês ${i + 1}: ${bar.label}`"
            />
          </div>
          <div class="flex justify-between text-[10px] text-gray-700">
            <span>Mês 1</span>
            <span>Mês 12</span>
            <span v-if="currentBars.length > 12">Mês 24</span>
            <span v-if="currentBars.length > 24">Mês 36</span>
          </div>

        </div>

      </div>
    </section>

    <!-- REGRAS ASAAS — TIMELINE -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Como funciona o pagamento
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          REGRAS DO ASAAS<br>
          <span class="text-green-400">PASSO A PASSO</span>
        </h2>
        <p class="text-gray-500 mb-12 text-[15px] max-w-2xl">
          Os pagamentos são processados via Asaas, plataforma financeira regulada pelo Banco Central. Veja exatamente como funciona da indicação ao saque.
        </p>

        <!-- TIMELINE -->
        <div class="relative max-w-3xl">

          <div class="absolute left-5 top-0 bottom-0 w-px bg-white/[.06]" />

          <div
            v-for="(step, i) in asaasTimeline"
            :key="step.title"
            class="relative flex gap-6 mb-10 last:mb-0"
          >
            <!-- Dot -->
            <div
              class="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black text-sm"
              :class="step.highlight ? 'bg-green-400 text-black' : 'bg-[#181818] border border-white/[.1] text-gray-500'"
            >
              {{ i + 1 }}
            </div>

            <!-- Content -->
            <div class="flex-1 pb-2">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-[15px] font-bold text-white">{{ step.title }}</h3>
                <span
                  v-if="step.tag"
                  class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  :class="step.highlight ? 'bg-green-400/15 text-green-400 border border-green-400/20' : 'bg-white/[.05] text-gray-500 border border-white/[.08]'"
                >
                  {{ step.tag }}
                </span>
              </div>
              <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- DASHBOARD FICTÍCIO -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Painel do parceiro
        </span>
        <h2
          class="mt-3 mb-10 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          COMO FICA<br>
          <span class="text-green-400">SEU DASHBOARD</span>
        </h2>

        <!-- MOCKUP DASHBOARD -->
        <div class="rounded-2xl border border-white/[.06] bg-[#0e0e0e] overflow-hidden">

          <!-- Header mockup -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/[.05] bg-[#141414]">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-md bg-green-400/20 flex items-center justify-center">
                <span class="text-green-400 text-xs font-black">S</span>
              </div>
              <span class="text-sm font-bold text-white">SuaAgenda Parceiro</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-20 h-2 bg-white/[.05] rounded-full" />
              <div class="w-8 h-8 rounded-full bg-green-400/10 flex items-center justify-center text-green-400 text-xs font-bold">EU</div>
            </div>
          </div>

          <!-- Stats row -->
          <div class="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/[.05]">
            <div
              v-for="ds in dashStats"
              :key="ds.label"
              class="p-6"
            >
              <p class="text-xs text-gray-600 uppercase tracking-widest mb-2">{{ ds.label }}</p>
              <p
                class="font-black leading-none"
                :class="ds.green ? 'text-green-400' : 'text-white'"
                style="font-family:'Bebas Neue',sans-serif;font-size:28px"
              >
                {{ ds.value }}
              </p>
              <p class="text-xs mt-1" :class="ds.up ? 'text-green-400/70' : 'text-gray-600'">{{ ds.sub }}</p>
            </div>
          </div>

          <!-- Tabela indicações -->
          <div class="p-6 border-t border-white/[.05]">
            <p class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Suas indicações ativas</p>
            <div class="space-y-3">
              <div
                v-for="ref in mockReferrals"
                :key="ref.name"
                class="flex items-center justify-between rounded-xl bg-[#181818] border border-white/[.04] px-4 py-3"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center text-green-400 text-xs font-black">
                    {{ ref.name[0] }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white">{{ ref.name }}</p>
                    <p class="text-xs text-gray-600">{{ ref.city }} · ativo há {{ ref.months }} meses</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold text-green-400">{{ ref.commission }}/mês</p>
                  <p class="text-xs text-gray-600">{{ ref.total }} acumulado</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Próximo pagamento -->
          <div class="flex items-center justify-between px-6 py-4 border-t border-white/[.05] bg-[#141414]">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span class="text-sm text-gray-400">Próximo pagamento via Asaas</span>
            </div>
            <span class="text-sm font-bold text-white">R$ 497,00 · dia 05</span>
          </div>

        </div>

        <p class="text-xs text-gray-600 mt-4">* Dashboard fictício para fins ilustrativos. Os valores reais dependem do volume de indicações ativas.</p>

      </div>
    </section>

    <!-- MOCKUP BARBER APP -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          O que a barbearia recebe
        </span>
        <h2
          class="mt-3 mb-10 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          SISTEMA QUE<br>
          <span class="text-green-400">VOCÊ INDICA</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

          <!-- Mobile mockup 1 -->
          <div
            v-for="screen in appScreens"
            :key="screen.title"
            class="rounded-2xl border border-white/[.06] bg-[#181818] overflow-hidden"
          >
            <div class="bg-[#0e0e0e] px-5 py-4 border-b border-white/[.05]">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs text-gray-600">{{ screen.label }}</span>
                <span class="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <p class="text-sm font-bold text-white">{{ screen.title }}</p>
            </div>

            <div class="p-5 space-y-3">
              <div
                v-for="item in screen.items"
                :key="item.name"
                class="flex items-center justify-between py-2 border-b border-white/[.04] last:border-0"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                    :class="item.green ? 'bg-green-400/10 text-green-400' : 'bg-white/[.04] text-gray-500'"
                  >
                    {{ item.icon }}
                  </div>
                  <span class="text-sm text-gray-300">{{ item.name }}</span>
                </div>
                <span class="text-sm font-bold" :class="item.green ? 'text-green-400' : 'text-gray-500'">{{ item.value }}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- FAQ JURÍDICO -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-4xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Dúvidas frequentes
        </span>
        <h2
          class="mt-3 mb-10 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          FAQ JURÍDICO<br>
          <span class="text-green-400">E COMERCIAL</span>
        </h2>

        <div class="space-y-3">
          <div
            v-for="faq in faqs"
            :key="faq.q"
            class="rounded-2xl border border-white/[.06] bg-[#181818] overflow-hidden"
          >
            <button
              class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              @click="toggleFaq(faq.q)"
            >
              <span class="text-[15px] font-bold text-white">{{ faq.q }}</span>
              <span
                class="text-green-400 text-xl font-bold shrink-0 transition-transform"
                :class="openFaq === faq.q ? 'rotate-45' : ''"
              >+</span>
            </button>
            <div v-if="openFaq === faq.q" class="px-6 pb-5">
              <p class="text-sm text-gray-400 leading-relaxed">{{ faq.a }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a] border-t border-white/5">
      <div class="max-w-2xl mx-auto text-center">
        <h2
          class="font-black leading-none text-white mb-4"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,72px)"
        >
          COMECE A<br>
          <span class="text-green-400">INDICAR HOJE.</span>
        </h2>
        <p class="text-gray-500 text-[16px] leading-relaxed mb-10">
          Cada indicação que você fizer hoje vira renda mensal por anos.
        </p>
        <a
          href="https://wa.me/5511941649284"
          class="inline-flex items-center gap-2 px-8 py-5 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
        >
          💰 Quero ser parceiro
        </a>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'barber',
})

const partnerMode = ref<'system' | 'growth'>('growth')

const COMMISSIONS = {
  system: 14.97,
  growth: 44.97,
}

const activeCommission = computed(() => {
  return COMMISSIONS[partnerMode.value]
})

// ─── HERO ───────────────────────────────────────────────────────────────────
const heroStats = [
  { num: 'R$44,97', label: 'comissão do pack completo' },
  { num: '30%', label: 'sistema Barber' },
  { num: '+10%', label: 'gestão de tráfego' },
  { num: '30 dias', label: 'ciclo médio de repasse' },
]

// ─── VENDA ÚNICA x RECORRENTE ─────────────────────────────────────────────
const vendaUnica = [
  'Você vende uma vez e recebe uma comissão única.',
  'No mês seguinte, precisa buscar um novo cliente do zero.',
  'Sua renda depende sempre do próximo fechamento.',
  'Não existe carteira — existe só o próximo mês.',
]

const rendaRecorrente = [
  'Você recebe comissão recorrente enquanto a assinatura permanecer ativa.',
  'Clientes que utilizam sistema + marketing geram comissões maiores.',
  'Com apenas 10 clientes ativos no plano completo você pode gerar cerca de R$ 449,70 por mês.',
  'Uma carteira construída ao longo dos anos pode gerar renda recorrente sem necessidade de novas vendas todos os meses.',
]

// ─── SIMULADOR ───────────────────────────────────────────────────────────────
const PLAN_PRICE = 49.9
const MARKETING_PRICE = 300

const SYSTEM_COMMISSION_RATE = 0.30
const MARKETING_COMMISSION_RATE = 0.10

const SYSTEM_COMMISSION = PLAN_PRICE * SYSTEM_COMMISSION_RATE // 14.97
const MARKETING_COMMISSION = MARKETING_PRICE * MARKETING_COMMISSION_RATE // 30

const FULL_PACK_COMMISSION =
  SYSTEM_COMMISSION + MARKETING_COMMISSION // 44.97

const COMMISSION = FULL_PACK_COMMISSION

const simOptions = [
  { qty: 5, label: '5 indicações' },
  { qty: 10, label: '10 indicações' },
  { qty: 20, label: '20 indicações' },
  { qty: 50, label: '50 indicações' },
]

const selectedSim = ref(10)

const simTable = computed(() =>
  [5, 10, 20, 50].map(qty => {
    const monthly = qty * COMMISSION
    return {
      qty,
      monthly: `R$ ${monthly.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
      y1: `R$ ${(monthly * 12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
      y2: `R$ ${(monthly * 24).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
      y3: `R$ ${(monthly * 36).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
    }
  })
)

const currentSimResults = computed(() => {
  const qty = selectedSim.value
  const monthly = qty * activeCommission.value
  return [
    { label: 'Por mês', value: `R$ ${monthly.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`, sub: `${qty} barbearias ativas` },
    { label: 'Em 12 meses', value: `R$ ${(monthly * 12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`, sub: 'acumulado' },
    { label: 'Em 24 meses', value: `R$ ${(monthly * 24).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`, sub: 'acumulado' },
    { label: 'Em 36 meses', value: `R$ ${(monthly * 36).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`, sub: 'acumulado' },
  ]
})

// ─── GRÁFICO 12/24/36 ────────────────────────────────────────────────────────
const chartOptions = [
  { qty: 5, label: '5 indicações/mês' },
  { qty: 10, label: '10 indicações/mês' },
  { qty: 20, label: '20 indicações/mês' },
  { qty: 50, label: '50 indicações/mês' },
  { qty: 100, label: '100 indicações/mês' },
]

const selectedChart = ref(10)

function buildBars(qty: number, months: number) {
  const monthly = qty * activeCommission.value
  const bars = []
  let acc = 0
  for (let i = 0; i < months; i++) {
    acc += monthly
    bars.push({ label: `R$ ${acc.toFixed(0)}`, pct: 0 })
  }
  const max = bars[bars.length - 1] ? acc : 1
  return bars.map(b => ({ ...b, pct: Math.round((parseFloat(b.label.replace('R$ ', '').replace('.', '')) / acc) * 95) + 5 }))
}

const currentBars = computed(() => buildBars(selectedChart.value, 36))

const currentMarcos = computed(() => {
  const monthly = selectedChart.value * activeCommission.value
  const fmt = (v: number) => `R$ ${v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  return [
    { label: '12 meses', value: fmt(monthly * 12) },
    { label: '24 meses', value: fmt(monthly * 24) },
    { label: '36 meses', value: fmt(monthly * 36) },
  ]
})

// ─── ASAAS TIMELINE ──────────────────────────────────────────────────────────
const asaasTimeline = [
  {
    title: 'Você indica uma barbearia',
    tag: 'Indicação',
    highlight: false,
    desc: 'A barbearia entra através do seu link ou contato comercial.',
  },
  {
    title: 'A barbearia assina',
    tag: 'Venda',
    highlight: false,
    desc: 'O cliente contrata o sistema ou o plano completo.',
  },
  {
    title: 'Pagamento processado',
    tag: 'Asaas',
    highlight: false,
    desc: 'A cobrança é processada normalmente pela plataforma.',
  },
  {
    title: 'Liquidação confirmada',
    tag: 'Recebimento',
    highlight: true,
    desc: 'A comissão só é validada após o recebimento efetivo pela SuaAgenda.',
  },
  {
    title: 'Apuração das comissões',
    tag: 'Mensal',
    highlight: true,
    desc: 'As vendas são agrupadas dentro do ciclo financeiro.',
  },
  {
    title: 'Repasse ao parceiro',
    tag: 'Pagamento',
    highlight: false,
    desc: 'O pagamento ocorre normalmente até aproximadamente 30 dias após o fechamento da venda.',
  },
]

// ─── DASHBOARD MOCK ──────────────────────────────────────────────────────────
const dashStats = [
  { label: 'Comissão este mês', value: 'R$ 497', sub: '↑ +R$49 vs. mês passado', green: true, up: true },
  { label: 'Indicações ativas', value: '10', sub: '2 em período de teste', green: false, up: false },
  { label: 'Total acumulado', value: 'R$ 3.241', sub: 'desde o início', green: false, up: false },
  { label: 'Próximo pagamento', value: 'Dia 05', sub: 'via Asaas · Pix', green: false, up: false },
]

const mockReferrals = [
  { name: 'Barbearia do Zé', city: 'São Paulo', months: 8, commission: 'R$ 49,90', total: 'R$ 399,20' },
  { name: 'Barber Kings', city: 'Campinas', months: 6, commission: 'R$ 49,90', total: 'R$ 299,40' },
  { name: 'Studio 23', city: 'Santo André', months: 4, commission: 'R$ 49,90', total: 'R$ 199,60' },
  { name: 'Barber Shop MV', city: 'Guarulhos', months: 3, commission: 'R$ 49,90', total: 'R$ 149,70' },
]

// ─── MOCKUP APP SCREENS ──────────────────────────────────────────────────────
const appScreens = [
  {
    label: 'Agenda Online',
    title: 'Horários do dia',
    items: [
      { icon: '✓', name: '09:00 · João Silva', value: 'Corte', green: true },
      { icon: '✓', name: '10:00 · Pedro Melo', value: 'Barba', green: true },
      { icon: '○', name: '11:00 · Disponível', value: '', green: false },
      { icon: '✓', name: '14:00 · Lucas R.', value: 'Combo', green: true },
      { icon: '○', name: '15:00 · Disponível', value: '', green: false },
    ],
  },
  {
    label: 'Relatório Mensal',
    title: 'Resumo do mês',
    items: [
      { icon: '↑', name: 'Atendimentos', value: '143', green: true },
      { icon: '↑', name: 'Clientes novos', value: '28', green: true },
      { icon: '$', name: 'Faturamento', value: 'R$ 6.435', green: true },
      { icon: '★', name: 'Avaliação média', value: '4,9', green: false },
      { icon: '↻', name: 'Taxa de retorno', value: '78%', green: false },
    ],
  },
  {
    label: 'Fidelidade',
    title: 'Clientes VIP',
    items: [
      { icon: '★', name: 'Carlos Lima', value: '22 visitas', green: true },
      { icon: '★', name: 'Marcos Neto', value: '18 visitas', green: true },
      { icon: '★', name: 'Rafael S.', value: '14 visitas', green: false },
      { icon: '★', name: 'Bruno A.', value: '11 visitas', green: false },
      { icon: '↻', name: 'Cashback ativo', value: 'R$ 12,50', green: true },
    ],
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const openFaq = ref('')

function toggleFaq(q: string) {
  openFaq.value = openFaq.value === q ? '' : q
}

const faqs = [
  {
    q: 'Preciso ter CNPJ para receber as comissões?',
    a: 'Não. Pessoas físicas podem receber normalmente via Asaas com CPF. Para volumes acima de R$ 6.000/mês, recomendamos consultar um contador sobre a melhor forma de enquadramento tributário.',
  },
  {
    q: 'A comissão é tratada como renda e preciso declarar?',
    a: 'Sim. As comissões recebidas via Asaas são rendimentos tributáveis e devem ser declarados no Imposto de Renda. O Asaas fornece informe de rendimentos anual. Para valores mensais acima de R$ 1.903,98 (faixa de isenção do IR 2024), pode haver retenção na fonte.',
  },
  {
    q: 'Existe algum contrato ou vínculo empregatício?',
    a: 'Não. O relacionamento entre parceiro e SuaAgenda é estritamente comercial, sem vínculo empregatício, CLT ou qualquer obrigação trabalhista. A atividade de indicação é autônoma.',
  },
  {
    q: 'O que acontece se a barbearia cancelar a assinatura?',
    a: 'A comissão daquela indicação para automaticamente. Você não perde comissões já pagas — apenas deixa de receber os meses futuros daquele cliente específico.',
  },
  {
    q: 'Posso indicar barbearias de qualquer cidade do Brasil?',
    a: 'Sim. O sistema SuaAgenda funciona 100% online, então qualquer barbearia com acesso à internet pode usar o sistema independente da cidade.',
  },
  {
    q: 'Existe limite de indicações que posso fazer?',
    a: 'Não existe limite. Quanto mais barbearias ativas você tiver na sua carteira, maior o seu rendimento mensal recorrente.',
  },
  {
    q: 'Quando recebo minha comissão?',
    a: 'As comissões são pagas após a liquidação das cobranças processadas pelo Asaas. Dependendo da data da venda e do ciclo financeiro, o pagamento normalmente ocorre em até aproximadamente 30 dias após o fechamento.',
  },
  {
    q: 'O Asaas é seguro? Como funciona o saque?',
    a: 'O Asaas é uma instituição financeira regulada pelo Banco Central do Brasil (Resolução nº 80/2021 do BCB). Seu saldo fica protegido e você pode sacar via Pix ou TED a qualquer momento, sem custo adicional da SuaAgenda.',
  },
]

// ─── SEO ─────────────────────────────────────────────────────────────────────
useHead({
  title: 'Programa de Indicações SuaAgenda — Renda Recorrente por Indicação',

  meta: [
    {
      name: 'description',
      content:
        'Indique barbearias para o sistema SuaAgenda e ganhe comissão recorrente todo mês via Asaas. Veja projeções de 12, 24 e 36 meses e simule seus ganhos.',
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})
</script>