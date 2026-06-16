<!-- pages/gestao-de-trafego/index.vue -->
<template>
  <div class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-4 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span>/</span>
          <span class="text-gray-400">Captação Automática</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="relative w-full py-20 px-4 md:px-16 bg-[#0a0a0a] overflow-hidden">
      <div
        class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse 55% 50% at 70% 40%,rgba(52,211,153,.07) 0%,transparent 70%)"
      />
      <div class="relative max-w-6xl mx-auto">

        <div class="flex flex-wrap gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
            🤖 SuaAgenda IA
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            🔍 Google Ads integrado
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            ⚡ Otimiza toda semana
          </span>
        </div>

        <h1
          class="font-black leading-none mb-6 text-green-400"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,6vw,88px);letter-spacing:.03em"
        >
          NÃO É AGÊNCIA.<br>
          <span class="text-white">É UMA IA QUE TRABALHA<br>POR VOCÊ.</span>
        </h1>

        <div class="max-w-3xl space-y-5 mb-10">
          <p class="text-xl text-gray-400 leading-relaxed">
            A SuaAgenda IA analisa seu histórico de agendamentos, cria campanhas no Google Ads segmentadas por serviço e otimiza automaticamente toda semana — sem você precisar entender de tráfego.
          </p>
          <p class="text-lg text-gray-500 leading-relaxed">
            Enquanto você corta cabelo, a IA capta, agenda e registra. No fim do mês, você vê exatamente quantos clientes novos a campanha trouxe — e o que ela ajustou pra melhorar.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mb-12">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="flex items-start gap-3 rounded-2xl border border-white/[.06] bg-[#181818] p-5"
          >
            <div class="text-2xl shrink-0">{{ benefit.emoji }}</div>
            <div>
              <p class="font-bold text-white text-[15px] mb-2">{{ benefit.title }}</p>
              <p class="text-sm text-gray-500 leading-relaxed">{{ benefit.desc }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <a href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-green-400 text-black text-base font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            🚀 Quero a IA captando clientes pra mim
          </a>
          <NuxtLink
            to="/barbearias"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-base text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            Ver barbearias →
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- COMO A IA TRABALHA -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0d0d0d] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          SuaAgenda IA
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          UMA IA QUE CONHECE<br>
          <span class="text-green-400">SUA BARBEARIA DE VERDADE.</span>
        </h2>
        <p class="text-gray-500 text-[15px] max-w-2xl mb-12 leading-relaxed">
          Antes de criar qualquer anúncio, a SuaAgenda IA lê seu histórico — quais serviços você mais faz, qual o ticket médio de cada um, quais horários têm mais agendamentos. Só depois monta a campanha.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div
            v-for="step in iaSteps"
            :key="step.title"
            class="rounded-2xl border bg-[#181818] p-7 relative overflow-hidden"
            :class="step.highlight ? 'border-green-400/30' : 'border-white/[.06]'"
          >
            <div
              v-if="step.highlight"
              class="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20"
              style="background: #34d399"
            />
            <div class="text-3xl mb-5">{{ step.emoji }}</div>
            <p class="text-[10px] font-bold uppercase tracking-widest mb-2"
              :class="step.highlight ? 'text-green-400' : 'text-gray-600'">
              {{ step.badge }}
            </p>
            <h3 class="text-lg font-bold text-white mb-3">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

        <!-- EXEMPLO REAL DE SEGMENTAÇÃO -->
        <div class="rounded-2xl border border-green-400/20 bg-[#111] p-6 sm:p-8 max-w-3xl">
          <p class="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">Exemplo real — como a IA segmenta</p>
          <div class="space-y-3">
            <div
              v-for="seg in segmentacaoExemplo"
              :key="seg.servico"
              class="flex items-center justify-between gap-4 rounded-xl px-4 py-3 border"
              :class="seg.anuncia ? 'bg-green-400/5 border-green-400/20' : 'bg-white/[.02] border-white/[.05]'"
            >
              <div class="flex items-center gap-3 min-w-0">
                <span class="text-lg shrink-0">{{ seg.anuncia ? '✅' : '⏸️' }}</span>
                <div class="min-w-0">
                  <p class="text-[15px] font-bold" :class="seg.anuncia ? 'text-white' : 'text-gray-500'">{{ seg.servico }}</p>
                  <p class="text-xs text-gray-600">Ticket: {{ seg.ticket }}</p>
                </div>
              </div>
              <span
                class="text-xs font-bold px-3 py-1 rounded-full shrink-0"
                :class="seg.anuncia ? 'bg-green-400/15 text-green-400' : 'bg-white/[.05] text-gray-600'"
              >
                {{ seg.status }}
              </span>
            </div>
          </div>
          <p class="text-xs text-gray-600 mt-4 leading-relaxed">
            A SuaAgenda IA só anuncia serviços onde o ticket cobre o custo de aquisição estimado. Verba zero desperdiçada.
          </p>
        </div>

      </div>
    </section>

    <!-- POR QUE GOOGLE ADS -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-green-400">
              Por que só Google Ads
            </span>
            <h2
              class="mt-3 mb-6 font-black leading-none text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,56px)"
            >
              QUEM PESQUISA<br>
              <span class="text-green-400">JÁ QUER CORTAR.</span><br>
              VOCÊ APARECE PRIMEIRO.
            </h2>
            <div class="space-y-5 text-gray-400 text-[16px] leading-relaxed">
              <p>
                No Google, o cliente já está com a intenção de agendar. Ele digita "barbearia perto de mim", "barbeiro em [cidade]" ou "corte masculino" — e o seu nome aparece antes de qualquer concorrente.
              </p>
              <p>
                Diferente do Instagram ou Facebook, você não precisa convencer ninguém. A pessoa já decidiu que quer cortar. É só estar lá na hora certa.
              </p>
              <p>
                Por isso focamos 100% no Google: é o canal com maior intenção de compra, menor desperdício de verba e mais fácil de padronizar para barbearias em qualquer cidade do Brasil.
              </p>
            </div>
          </div>

          <!-- SERP MOCKUP -->
          <div class="space-y-3 mt-8 md:mt-0">
            <p class="text-xs text-gray-600 uppercase tracking-widest mb-4">Como você aparece no Google</p>

            <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-5 relative">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="text-[10px] font-bold border border-green-400/40 text-green-400 px-2 py-0.5 rounded shrink-0">Anúncio</span>
                <span class="text-xs text-gray-600 truncate">suaagenda.link/barbearia</span>
              </div>
              <p class="text-[15px] font-bold text-green-400 mb-1">Barbearia em [Cidade] — Agende Online Agora</p>
              <p class="text-sm text-gray-500">Agenda online 24h · Confirmação automática · Sem espera · Marque seu horário agora.</p>
              <div class="absolute top-3 right-3 text-[10px] text-green-400/60 font-bold tracking-widest">TOPO</div>
            </div>

            <div class="rounded-2xl border border-white/[.04] bg-[#141414] p-5 opacity-40">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold border border-gray-700 text-gray-600 px-2 py-0.5 rounded shrink-0">Anúncio</span>
                <span class="text-xs text-gray-700">concorrente.com.br</span>
              </div>
              <p class="text-[15px] font-bold text-gray-600 mb-1">Barbearia — Entre em contato</p>
              <p class="text-sm text-gray-700">Horários disponíveis. Ligue agora.</p>
            </div>

            <div class="rounded-2xl border border-white/[.04] bg-[#181818] p-5">
              <p class="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Google Perfil da Empresa</p>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 font-black text-lg shrink-0">B</div>
                <div>
                  <p class="text-[15px] font-bold text-white">Sua Barbearia</p>
                  <p class="text-xs text-yellow-400 mb-1">★★★★★ <span class="text-gray-500">4,9 (128 avaliações)</span></p>
                  <p class="text-xs text-gray-500">Barbearia · Aberto agora · 1,2 km</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
          <div
            v-for="gstat in googleStats"
            :key="gstat.label"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-5 text-center"
          >
            <p
              class="font-black text-green-400 leading-none mb-2"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,5vw,40px)"
            >
              {{ gstat.num }}
            </p>
            <p class="text-xs text-gray-500 leading-snug">{{ gstat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA — FUNIL -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Como funciona
        </span>
        <h2
          class="mt-3 mb-10 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          DO CLIQUE<br>
          <span class="text-green-400">AO AGENDAMENTO REGISTRADO.</span>
        </h2>

        <div class="max-w-3xl mx-auto mb-16">
          <div
            v-for="(step, i) in funnelSteps"
            :key="step.title"
            class="flex flex-col items-center"
          >
            <div
              class="w-full flex items-center gap-4 rounded-2xl border border-white/[.06] bg-[#181818] p-5 transition-all"
              :style="isMobile ? '' : `max-width: ${100 - i * 7}%`"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                :class="step.highlight ? 'bg-green-400 text-black' : 'bg-green-400/10 text-green-400'"
              >
                {{ i + 1 }}
              </div>
              <div class="min-w-0">
                <p class="font-bold text-white text-[15px]">{{ step.title }}</p>
                <p class="text-sm text-gray-500 mt-0.5 leading-relaxed">{{ step.desc }}</p>
              </div>
              <span v-if="step.ia" class="ml-auto shrink-0 text-[10px] font-bold px-2 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">IA</span>
            </div>
            <div v-if="i < funnelSteps.length - 1" class="text-green-400/40 text-2xl my-1">↓</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="step in howItWorks"
            :key="step.title"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-7"
          >
            <div class="text-3xl mb-5">{{ step.emoji }}</div>
            <h3 class="text-lg font-bold text-white mb-3">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- OTIMIZAÇÃO SEMANAL -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Otimização automática
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          TODA SEMANA A IA<br>
          <span class="text-green-400">MELHORA SUA CAMPANHA.</span>
        </h2>
        <p class="text-gray-500 text-[15px] max-w-2xl mb-12 leading-relaxed">
          Nenhuma campanha nasce perfeita. A SuaAgenda IA analisa o que está convertendo, pausa o que está desperdiçando verba e ajusta automaticamente — sem você precisar fazer nada.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div
            v-for="ot in otimizacoes"
            :key="ot.title"
            class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 flex items-start gap-4"
          >
            <div class="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 text-xl shrink-0">{{ ot.emoji }}</div>
            <div>
              <p class="font-bold text-white text-[15px] mb-1">{{ ot.title }}</p>
              <p class="text-sm text-gray-500 leading-relaxed">{{ ot.desc }}</p>
            </div>
          </div>
        </div>

        <!-- MOCKUP RELATÓRIO IA -->
        <div class="rounded-2xl border border-green-400/20 bg-[#0e0e0e] overflow-hidden max-w-2xl">
          <div class="flex items-center justify-between px-5 py-4 border-b border-white/[.05] bg-[#141414]">
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-md bg-green-400/20 flex items-center justify-center text-green-400 text-xs font-black">IA</span>
              <span class="text-sm font-bold text-white">SuaAgenda IA · Análise semanal</span>
            </div>
            <span class="text-xs text-gray-600">Automático</span>
          </div>
          <div class="p-5 space-y-3">
            <div class="rounded-xl bg-green-400/5 border border-green-400/20 p-4">
              <p class="text-sm text-green-400/90 leading-relaxed">
                ✦ <strong class="text-white">Corte + Barba</strong> teve CPL de R$14 esta semana — melhor que a média. Aumentei o lance em 20% nesse grupo.
              </p>
            </div>
            <div class="rounded-xl bg-white/[.03] border border-white/[.05] p-4">
              <p class="text-sm text-gray-500 leading-relaxed">
                ⏸ <strong class="text-gray-300">Relaxamento</strong> gerou 0 agendamentos em 7 dias. Pausei temporariamente para não queimar verba.
              </p>
            </div>
            <div class="rounded-xl bg-white/[.03] border border-white/[.05] p-4">
              <p class="text-sm text-gray-500 leading-relaxed">
                🔍 Adicionei 3 novas palavras-chave com base nas buscas que trouxeram cliques mas ainda não tinham cobertura: <strong class="text-gray-300">"barbearia navalhado centro"</strong>, <strong class="text-gray-300">"corte masculino degradê"</strong>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- O QUE INCLUI / NÃO INCLUI -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Escopo do serviço
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          O QUE ESTÁ<br>
          <span class="text-green-400">DENTRO E FORA DO PLANO</span>
        </h2>
        <p class="text-gray-500 mb-10 text-[15px] max-w-2xl">
          Transparência total. Você sabe exatamente o que contratou e por que o serviço custa o que custa.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-5 sm:p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-green-400/15 flex items-center justify-center text-green-400 font-black text-sm shrink-0">✓</span>
              <h3 class="text-lg font-bold text-white">Incluso no plano</h3>
            </div>
            <div class="space-y-4">
              <div v-for="item in included" :key="item.title" class="flex items-start gap-3">
                <span class="text-green-400 mt-0.5 shrink-0">→</span>
                <div>
                  <p class="text-[15px] font-bold text-white">{{ item.title }}</p>
                  <p class="text-sm text-gray-500 mt-0.5 leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 sm:p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-white/[.05] flex items-center justify-center text-gray-500 font-black text-sm shrink-0">✕</span>
              <h3 class="text-lg font-bold text-gray-400">Fora do escopo</h3>
            </div>
            <div class="space-y-4">
              <div v-for="item in notIncluded" :key="item.title" class="flex items-start gap-3">
                <span class="text-gray-600 mt-0.5 shrink-0">→</span>
                <div>
                  <p class="text-[15px] font-bold text-gray-400">{{ item.title }}</p>
                  <p class="text-sm text-gray-600 mt-0.5 leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
            </div>
            <div class="mt-6 rounded-xl bg-white/[.03] border border-white/[.06] p-4">
              <p class="text-xs text-gray-500 leading-relaxed">
                O foco em Google Ads é intencional. Ele reduz a complexidade operacional e permite padronizar a campanha para qualquer barbearia, mantendo o preço acessível.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- PROJEÇÃO FINANCEIRA -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Projeção de resultados
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          O QUE ESPERAR<br>
          <span class="text-green-400">NOS PRIMEIROS 3 MESES</span>
        </h2>
        <p class="text-gray-500 mb-10">Exemplo com R$ 300 de verba no Google Ads e ticket médio de R$ 45.</p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <div v-for="metric in projectionMetrics" :key="metric.label">
            <p class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{{ metric.label }}</p>
            <div v-for="(bar, i) in metric.bars" :key="i" class="mb-3">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-500">Mês {{ i + 1 }}</span>
                <span class="text-white font-bold">{{ bar.value }}</span>
              </div>
              <div class="h-2 bg-white/[.06] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all"
                  :style="`width: ${bar.pct}%; background: rgba(52,211,153,${0.4 + i * 0.25})`"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div
            v-for="(month, i) in revenueMonths"
            :key="month.label"
            class="rounded-2xl p-6 text-center border"
            :class="i === 2 ? 'border-green-400/30 bg-green-400/5' : 'border-white/[.06] bg-[#181818]'"
          >
            <p class="text-xs uppercase tracking-widest text-gray-500 mb-1">{{ month.label }}</p>
            <p class="text-sm text-gray-600 mb-4">{{ month.clients }} novos clientes</p>
            <p
              class="font-black leading-none"
              :class="i === 2 ? 'text-green-400' : 'text-white'"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,6vw,48px)"
            >
              {{ month.revenue }}
            </p>
            <p class="text-xs text-gray-600 mt-2">faturamento estimado</p>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border border-white/[.06] bg-[#181818] p-5 max-w-2xl">
          <p class="text-sm text-gray-500 leading-relaxed">
            ⚡ Esses valores consideram apenas <strong class="text-gray-300">novos clientes</strong>. Com retenção e retorno dos clientes existentes, o faturamento real tende a ser consideravelmente maior.
          </p>
        </div>

      </div>
    </section>

    <!-- VALOR REAL DO CLIENTE -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#111]">
      <div class="max-w-5xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          O que muitos barbeiros não calculam
        </span>
        <h2
          class="mt-3 mb-6 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          O VALOR REAL NÃO ESTÁ<br>
          NO PRIMEIRO CORTE
        </h2>
        <p class="text-gray-400 text-lg max-w-3xl mb-12">
          Quando um novo cliente entra na sua barbearia, o retorno não acontece só naquele atendimento. O verdadeiro lucro vem da recorrência dos próximos meses.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 text-center">
            <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Cliente novo</p>
            <p class="font-black text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,6vw,52px)">1</p>
          </div>
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 text-center">
            <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Ticket médio</p>
            <p class="font-black text-green-400" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,4vw,52px)">R$45</p>
          </div>
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 text-center">
            <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Frequência média</p>
            <p class="font-black text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,6vw,52px)">2x</p>
            <p class="text-xs text-gray-600">cortes por mês</p>
          </div>
          <div class="rounded-2xl border border-green-400/20 bg-green-400/5 p-5 text-center">
            <p class="text-xs uppercase tracking-widest text-green-400 mb-2">Valor anual</p>
            <p class="font-black text-green-400" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(22px,3.5vw,52px)">R$1.080</p>
          </div>
        </div>

        <div class="mt-10 rounded-2xl border border-green-400/20 bg-green-400/5 p-6 sm:p-8">
          <h3 class="font-black text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,4vw,40px)">
            5 CLIENTES NOVOS POR MÊS
          </h3>
          <p class="text-gray-300 text-lg leading-relaxed mb-6">
            Mesmo que sua campanha gere apenas 5 novos clientes por mês, isso representa:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div class="rounded-xl bg-[#111] p-5 text-center">
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Clientes captados</p>
              <p class="text-4xl font-black text-white">5</p>
            </div>
            <div class="rounded-xl bg-[#111] p-5 text-center">
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Valor anual por cliente</p>
              <p class="text-3xl font-black text-white">R$1.080</p>
            </div>
            <div class="rounded-xl bg-[#111] p-5 text-center">
              <p class="text-xs uppercase tracking-widest text-green-400 mb-2">Receita potencial</p>
              <p class="text-3xl font-black text-green-400">R$5.400</p>
            </div>
          </div>
          <p class="mt-8 text-gray-400">
            Por isso, a Captação Automática não deve ser avaliada pelo faturamento do primeiro mês. O objetivo é construir uma base recorrente de clientes que continuam voltando ao longo do ano.
          </p>
        </div>

      </div>
    </section>

    <!-- INVESTIMENTO -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Investimento
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,56px)"
        >
          TRÊS PARTES.<br>
          <span class="text-green-400">UM SISTEMA SÓ.</span>
        </h2>
        <p class="text-gray-500 text-[15px] leading-relaxed max-w-2xl mb-10">
          Entenda exatamente o que você está pagando, pra quem, e por quê cada parte existe.
        </p>

        <!-- SLIDER DE VERBA -->
        <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 sm:p-8 mb-6">
          <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
            Qual será sua verba mensal no Google Ads?
          </p>
          <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-3">
            <input
              type="range"
              :value="investBudget"
              @input="investBudget = Number(($event.target as HTMLInputElement).value)"
              min="100"
              max="6000"
              step="100"
              class="w-full sm:flex-1 accent-green-400"
            />
            <span
              class="font-black text-green-400 sm:shrink-0"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,4vw,28px)"
            >
              R$ {{ investBudget.toLocaleString('pt-BR') }}/mês
            </span>
          </div>
          <div class="flex justify-between text-xs text-gray-600 px-1">
            <span>R$ 100</span>
            <span>R$ 1.500</span>
            <span>R$ 3.000</span>
            <span>R$ 5.000</span>
            <span>R$ 6.000+</span>
          </div>

          <!-- Faixas visuais -->
          <div class="flex gap-3 mt-5 flex-wrap">
            <div
              class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
              :class="investBudget <= 1500
                ? 'border-green-400/40 bg-green-400/10 text-green-400'
                : 'border-white/[.06] bg-white/[.02] text-gray-600'"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="investBudget <= 1500 ? 'bg-green-400' : 'bg-gray-700'" />
              Até R$1.500 → IA R$300/mês
            </div>
            <div
              class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
              :class="investBudget > 1500 && investBudget <= 5000
                ? 'border-green-400/40 bg-green-400/10 text-green-400'
                : 'border-white/[.06] bg-white/[.02] text-gray-600'"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="investBudget > 1500 && investBudget <= 5000 ? 'bg-green-400' : 'bg-gray-700'" />
              R$1.500–R$5.000 → IA R$500/mês
            </div>
            <div
              class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
              :class="investBudget > 5000
                ? 'border-green-400/40 bg-green-400/10 text-green-400'
                : 'border-white/[.06] bg-white/[.02] text-gray-600'"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="investBudget > 5000 ? 'bg-green-400' : 'bg-gray-700'" />
              Acima de R$5.000 → A consultar
            </div>
          </div>
        </div>

        <!-- CARDS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div
            v-for="item in planItems"
            :key="item.label"
            class="rounded-2xl border bg-[#181818] p-6 sm:p-7 flex flex-col gap-4"
            :class="item.highlight ? 'border-green-400/30' : 'border-white/[.06]'"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="text-2xl">{{ item.emoji }}</div>
              <span
                class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shrink-0"
                :class="item.highlight ? 'bg-green-400/15 text-green-400 border border-green-400/20' : 'bg-white/[.05] text-gray-500 border border-white/[.08]'"
              >
                {{ item.badge }}
              </span>
            </div>
            <div>
              <p class="text-[15px] font-bold text-white mb-1">{{ item.label }}</p>

              <!-- Preço dinâmico apenas no card da IA -->
              <template v-if="item.isIa">
                <p
                  class="font-black leading-none mb-3 transition-all"
                  :class="iaPricing.consult ? 'text-yellow-400' : 'text-green-400'"
                  style="font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,3vw,28px)"
                >
                  {{ iaPricing.label }}
                </p>
              </template>
              <template v-else>
                <p
                  class="font-black leading-none mb-3"
                  :class="item.highlight ? 'text-green-400' : 'text-gray-300'"
                  style="font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,3vw,28px)"
                >
                  {{ item.price }}
                </p>
              </template>

              <p class="text-sm text-gray-500 leading-relaxed">{{ item.desc }}</p>
            </div>
            <div
              class="mt-auto rounded-xl p-3 text-xs leading-relaxed"
              :class="item.highlight ? 'bg-green-400/8 text-green-400/80 border border-green-400/15' : 'bg-white/[.03] text-gray-600 border border-white/[.05]'"
            >
              {{ item.isIa && iaPricing.consult ? 'Para verbas acima de R$5.000, entre em contato para um plano personalizado.' : item.note }}
            </div>
          </div>
        </div>

        <!-- TOTAL DINÂMICO -->
        <div class="rounded-2xl border border-green-400/20 bg-green-400/5 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-widest text-green-400 mb-1">Investimento total estimado</p>
            <p class="text-sm text-gray-500 max-w-md">
              Sistema SuaAgenda + SuaAgenda IA
              <template v-if="!iaPricing.consult"> + Verba Google Ads. Tudo integrado, funcionando junto.</template>
              <template v-else>. Para verba acima de R$5.000, o módulo IA é cotado individualmente.</template>
            </p>
          </div>
          <p
            class="font-black shrink-0 transition-all"
            :class="iaPricing.consult ? 'text-yellow-400' : 'text-green-400'"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,4vw,36px)"
          >
            {{ totalInvestDisplay }}
          </p>
        </div>

      </div>
    </section>

    <!-- RELATÓRIO INTEGRADO -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0d0d0d] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Transparência total
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,56px)"
        >
          VOCÊ VÊ O RESULTADO<br>
          <span class="text-green-400">DENTRO DO SEU PAINEL.</span>
        </h2>
        <p class="text-gray-400 text-[16px] leading-relaxed max-w-2xl mb-12">
          Enquanto uma agência tradicional entrega um PDF no fim do mês, você vê os dados de campanha integrados direto na sua agenda — em tempo real.
        </p>

        <div class="rounded-2xl border border-white/[.06] bg-[#0e0e0e] overflow-hidden max-w-3xl">
          <div class="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/[.05] bg-[#141414] gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-6 h-6 rounded-md bg-green-400/20 flex items-center justify-center text-green-400 font-black text-xs">S</div>
              <span class="text-sm font-bold text-white truncate">SuaAgenda · Relatório Mensal</span>
            </div>
            <span class="text-xs text-gray-600 shrink-0">SuaAgenda IA</span>
          </div>

          <div class="p-4 sm:p-6 border-b border-white/[.05]">
            <p class="text-xs text-gray-600 uppercase tracking-widest mb-3">Resumo da campanha — Junho</p>
            <div class="rounded-xl bg-green-400/5 border border-green-400/20 p-4">
              <p class="text-sm text-green-400/90 leading-relaxed">
                ✦ Sua campanha gerou <strong class="text-white">126 cliques</strong>, <strong class="text-white">9 agendamentos</strong> e <strong class="text-white">6 novos clientes</strong> este mês. Estimativa de receita gerada: <strong class="text-green-400">R$ 270</strong>.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 divide-white/[.05]">
            <div
              v-for="(ds, i) in reportStats"
              :key="ds.label"
              class="p-5 text-center border-white/[.05]"
              :class="[
                i % 2 === 0 && i < reportStats.length - 1 ? 'border-r' : '',
                i < 2 ? 'border-b sm:border-b-0' : '',
                i > 0 && i < 3 ? 'sm:border-r' : ''
              ]"
            >
              <p class="text-xs text-gray-600 uppercase tracking-widest mb-2">{{ ds.label }}</p>
              <p
                class="font-black leading-none"
                :class="ds.green ? 'text-green-400' : 'text-white'"
                style="font-family:'Bebas Neue',sans-serif;font-size:clamp(18px,4vw,28px)"
              >
                {{ ds.value }}
              </p>
            </div>
          </div>
        </div>

        <p class="text-xs text-gray-600 mt-4 max-w-xl">* Painel fictício para fins ilustrativos. Os dados reais são gerados automaticamente pela integração entre Google Ads e o sistema SuaAgenda.</p>

      </div>
    </section>

    <!-- DIFERENCIAIS -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

        <div>
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">
            Diferencial
          </span>
          <h2
            class="mt-3 mb-8 font-black leading-none text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,56px)"
          >
            NÃO ENTREGAMOS<br>
            <span class="text-green-400">CLIQUES.</span><br>
            ENTREGAMOS CLIENTES.
          </h2>

          <div class="space-y-3">
            <div
              v-for="diff in differentials"
              :key="diff"
              class="flex items-center gap-3 rounded-xl border border-white/[.06] bg-[#181818] px-4 py-4"
            >
              <span class="text-green-400 font-black text-lg shrink-0">✓</span>
              <span class="text-[15px] text-gray-300">{{ diff }}</span>
            </div>
          </div>

          <p class="mt-8 text-gray-500 text-[15px] leading-relaxed italic border-l-2 border-green-400/30 pl-5">
            "O que importa não é quantas pessoas viram o anúncio. O que importa é quantas sentaram na cadeira."
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-5 text-center"
          >
            <p
              class="font-black text-green-400 leading-none mb-2"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,5vw,48px)"
            >
              {{ stat.num }}
            </p>
            <p class="text-sm text-gray-500 leading-snug">{{ stat.label }}</p>
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
          <span class="text-green-400">LOTAR SUA AGENDA?</span>
        </h2>
        <p class="text-gray-500 text-[16px] leading-relaxed mb-10">
          7 dias grátis. Sem contrato. Cancele quando quiser.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <a href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-green-400 text-black text-base font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            🚀 Começar agora — é grátis
          </a>
          <NuxtLink
            to="/barbearias"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-base text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            Ver barbearias →
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'barber' })

const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.innerWidth < 640
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 640
  })
})

const benefits = [
  {
    emoji: '🤖',
    title: 'IA que conhece sua barbearia',
    desc: 'A SuaAgenda IA lê seu histórico de agendamentos e ticket médio antes de criar qualquer anúncio. A campanha nasce personalizada pro seu negócio.',
  },
  {
    emoji: '🎯',
    title: 'Segmentação por serviço',
    desc: 'Cada serviço vira um grupo de anúncio separado. Corte, barba, progressiva — cada um com palavras-chave específicas e verba direcionada.',
  },
  {
    emoji: '⚡',
    title: 'Otimização automática toda semana',
    desc: 'A IA analisa o que está convertendo, pausa o que não traz resultado e ajusta lances sozinha. Sem você precisar fazer nada.',
  },
  {
    emoji: '📊',
    title: 'Relatório em linguagem simples',
    desc: 'Nada de métricas complicadas. A IA explica em português direto: quantos clientes novos, quanto gastou e o que foi ajustado.',
  },
]

const iaSteps = [
  {
    emoji: '🔍',
    badge: 'Antes de criar',
    highlight: false,
    title: 'A IA lê seu histórico',
    desc: 'Quais serviços você mais faz, qual o ticket médio de cada um, quais horários têm mais agendamentos. Só depois decide o que anunciar.',
  },
  {
    emoji: '🎯',
    badge: 'Na criação',
    highlight: true,
    title: 'Segmenta por serviço e viabilidade',
    desc: 'Só anuncia serviços onde o ticket cobre o custo de aquisição. Corte infantil de R$25 com custo por clique de R$40 não entra na campanha.',
  },
  {
    emoji: '📈',
    badge: 'Toda semana',
    highlight: false,
    title: 'Otimiza com base em resultados reais',
    desc: 'Aumenta lance no que converte, pausa o que desperdiça verba, adiciona palavras-chave novas com base nas buscas reais da semana.',
  },
]

const segmentacaoExemplo = [
  { servico: 'Corte + Barba',      ticket: 'R$ 95', anuncia: true,  status: 'Anunciando' },
  { servico: 'Corte Masculino',    ticket: 'R$ 55', anuncia: true,  status: 'Anunciando' },
  { servico: 'Progressiva',        ticket: 'R$ 120',anuncia: true,  status: 'Anunciando' },
  { servico: 'Corte Infantil',     ticket: 'R$ 30', anuncia: false, status: 'Pausado pela IA' },
  { servico: 'Relaxamento',        ticket: 'R$ 25', anuncia: false, status: 'Pausado pela IA' },
]

const funnelSteps = [
  { title: 'SuaAgenda IA cria a campanha',         desc: 'Analisa seu histórico, segmenta por serviço e lança no Google Ads',              highlight: true,  ia: true  },
  { title: 'Google Ads — pesquisa local',           desc: '"Barbearia perto de mim" → seu nome no topo',                                    highlight: false, ia: false },
  { title: 'Clique no anúncio',                     desc: 'Cliente vai direto pra sua página de agendamento',                               highlight: false, ia: false },
  { title: 'Agendamento registrado',                desc: 'Sistema SuaAgenda confirma e envia lembrete automático via WhatsApp',            highlight: false, ia: false },
  { title: 'Cliente na cadeira',                    desc: 'Barbearia lotada. Sem você ter respondido uma mensagem sequer.',                 highlight: true,  ia: false },
  { title: 'SuaAgenda IA analisa a semana',         desc: 'O que converteu, o que não converteu, o que ajustar — automático',             highlight: true,  ia: true  },
  { title: 'Relatório mensal automático',           desc: 'Cliques, novos clientes e receita estimada — dentro do painel, em linguagem simples', highlight: false, ia: true  },
]

const howItWorks = [
  {
    emoji: '🎯',
    title: 'Campanha criada pela IA',
    desc: 'A SuaAgenda IA usa seu histórico real para montar grupos de anúncio por serviço, com palavras-chave de intenção local: "barbearia perto de mim", "corte masculino [cidade]".',
  },
  {
    emoji: '🔗',
    title: 'Integrado com sua agenda',
    desc: 'O botão do anúncio conecta direto com o sistema. Nenhuma etapa extra — o cliente agenda sem precisar falar com ninguém.',
  },
  {
    emoji: '📈',
    title: 'Otimização toda semana',
    desc: 'A SuaAgenda IA ajusta lances e palavras-chave automaticamente com base nos agendamentos reais gerados, não apenas em cliques.',
  },
]

const otimizacoes = [
  {
    emoji: '📊',
    title: 'Análise de conversão por grupo',
    desc: 'A IA compara cliques com agendamentos reais por serviço. Corte que traz cliente recebe mais verba. Serviço que não converte é pausado.',
  },
  {
    emoji: '🔍',
    title: 'Novas palavras-chave automáticas',
    desc: 'Toda semana a IA analisa os termos de busca que geraram cliques e adiciona os que fazem sentido para sua barbearia.',
  },
  {
    emoji: '💰',
    title: 'Ajuste de lances por desempenho',
    desc: 'Grupos com menor custo por agendamento recebem mais investimento. A verba vai onde o retorno é maior.',
  },
  {
    emoji: '🛑',
    title: 'Pausa automática do que não converte',
    desc: 'Se um serviço ficou 7 dias sem gerar agendamento, a IA pausa o grupo e realoca o orçamento para o que está funcionando.',
  },
]

const included = [
  {
    title: 'Criação da campanha pela SuaAgenda IA',
    desc: 'A IA analisa seu histórico, monta grupos por serviço e só anuncia o que compensa financeiramente.',
  },
  {
    title: 'Otimização automática toda semana',
    desc: 'Ajuste de lances, pausa de grupos sem resultado e adição de novas palavras-chave — tudo automático.',
  },
  {
    title: 'Integração do botão "Agendar" com o sistema',
    desc: 'O clique no anúncio leva direto para a agenda online. Sem desvios, sem WhatsApp no meio do caminho.',
  },
  {
    title: 'Campanha local de Pesquisa + Perfil da Empresa',
    desc: 'Cobertura nos resultados pagos e no Google Maps, dominando a busca local da sua cidade.',
  },
  {
    title: 'Relatório mensal gerado pela SuaAgenda IA',
    desc: '"Sua campanha gerou X cliques, Y agendamentos e Z novos clientes este mês." Em linguagem simples, dentro do painel.',
  },
]

const notIncluded = [
  {
    title: 'Gestão de Instagram ou Facebook Ads',
    desc: 'O foco exclusivo no Google é intencional e é o que permite o preço acessível.',
  },
  {
    title: 'Criação de criativos, artes ou vídeos',
    desc: 'Google Ads de pesquisa é baseado em texto — não precisa de imagens para converter.',
  },
  {
    title: 'Reuniões estratégicas mensais',
    desc: 'Os dados estão no painel e o relatório é gerado pela IA. Você vê tudo sem precisar marcar call.',
  },
  {
    title: 'Produção de conteúdo para redes sociais',
    desc: 'Esse serviço é focado em captação via busca, não em construção de marca.',
  },
]

const googleStats = [
  { num: '3×',   label: 'mais conversão que redes sociais' },
  { num: '1ª',   label: 'posição na pesquisa local' },
  { num: '24h',  label: 'campanha rodando' },
  { num: '100%', label: 'intenção de compra' },
]

const projectionMetrics = [
  {
    label: 'Visitas na landing page',
    bars: [
      { value: '120', pct: 48 },
      { value: '180', pct: 72 },
      { value: '250', pct: 100 },
    ],
  },
  {
    label: 'Agendamentos',
    bars: [
      { value: '12', pct: 40 },
      { value: '20', pct: 66 },
      { value: '30', pct: 100 },
    ],
  },
  {
    label: 'Novos clientes',
    bars: [
      { value: '8',  pct: 33 },
      { value: '15', pct: 62 },
      { value: '24', pct: 100 },
    ],
  },
]

const revenueMonths = [
  { label: 'Mês 1', clients: '8',  revenue: 'R$ 360'   },
  { label: 'Mês 2', clients: '15', revenue: 'R$ 675'   },
  { label: 'Mês 3', clients: '24', revenue: 'R$ 1.080' },
]

const planItems: {
  emoji: string
  label: string
  badge: string
  highlight: boolean
  isIa: boolean
  price: string
  desc: string
  note: string
}[] = [
  {
    emoji: '🖥️',
    label: 'Sistema SuaAgenda',
    badge: '7 dias grátis',
    highlight: true,
    isIa: false,
    price: 'a partir de R$ 99/mês',
    desc: 'Agenda online, painel de clientes...',
    note: 'Pago à SuaAgenda...',
  },
  {
    emoji: '🤖',
    label: 'SuaAgenda IA',
    badge: 'Marketing IA',
    highlight: false,
    isIa: true,
    price: '',
    desc: 'A IA cria sua campanha...',
    note: 'Pago à SuaAgenda...',
  },
  {
    emoji: '💳',
    label: 'Verba Google Ads',
    badge: 'Google',
    highlight: false,
    isIa: false,
    price: 'a partir de R$ 300/mês',
    desc: 'Valor investido diretamente...',
    note: 'Pago por você diretamente ao Google...',
  },
]

const reportStats = [
  { label: 'Cliques',        value: '126',   green: false },
  { label: 'Agendamentos',   value: '9',     green: false },
  { label: 'Novos clientes', value: '6',     green: true  },
  { label: 'Receita est.',   value: 'R$270', green: true  },
]

const differentials = [
  'SuaAgenda IA cria a campanha com base no seu histórico real',
  'Segmentação por serviço — sem desperdiçar verba',
  'Otimização automática toda semana, sem você fazer nada',
  'Agendamento direto — sem WhatsApp no meio',
  'Relatório em linguagem simples dentro do painel',
  'Você vê o resultado, não a promessa',
]

const stats = [
  { num: '24h',  label: 'Campanha rodando'      },
  { num: '7d',   label: 'Teste grátis'           },
  { num: '100%', label: 'Automatizado'           },
  { num: '0',    label: 'Reuniões mensais'       },
]

// ── IA pricing dinâmico ────────────────────────────────────────────
const investBudget = ref(300)

const iaPricing = computed(() => {
  if (investBudget.value <= 1500) return { label: 'R$ 300/mês', value: 300, consult: false }
  if (investBudget.value <= 5000) return { label: 'R$ 500/mês', value: 500, consult: false }
  return { label: 'A consultar', value: null, consult: true }
})

const totalInvestDisplay = computed(() => {
  if (iaPricing.value.consult) return 'A consultar'
  const total = 99 + (iaPricing.value.value ?? 0) + investBudget.value
  return `R$ ${total.toLocaleString('pt-BR')}/mês`
})


useHead({
  title: 'SuaAgenda IA - Captação Automática de Clientes para Barbearias',
  meta: [
    {
      name: 'description',
      content: 'A SuaAgenda IA cria campanhas no Google Ads segmentadas por serviço, otimiza toda semana e gera relatório automático. Cada clique vira agendamento — sem agência, sem reunião.',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [
    { rel: 'canonical', href: 'https://suaagenda.link/barbearia/gestao-de-trafego' },
  ],
})
</script>