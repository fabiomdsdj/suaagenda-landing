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

        <!-- Badge de escassez -->
        <div class="flex justify-center mb-6">
          <ScarcityBadge :scarcity="scarcity" />
        </div>

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
          <a
            href="https://wa.me/5511941649284?text=Quero%20testar%20a%20SuaAgenda%20IA%20gr%C3%A1tis%20por%207%20dias"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-green-400 text-black text-base font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            🚀 Quero minha vaga agora
          </a>
          <NuxtLink
            to="/barbearias"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-base text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            Ver barbearias →
          </NuxtLink>
        </div>

        <div class="mt-8 flex flex-wrap gap-4 text-xs text-gray-600">
          <span class="flex items-center gap-1">✅ 30 dias de garantia de resultado</span>
          <span class="flex items-center gap-1">✅ Sem fidelidade</span>
          <span class="flex items-center gap-1">✅ Cancele quando quiser</span>
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
            v-for="(step, idx) in funnelSteps"
            :key="step.title"
            class="flex flex-col items-center"
          >
            <div
              class="w-full flex items-center gap-4 rounded-2xl border border-white/[.06] bg-[#181818] p-5 transition-all"
              :style="isMobile ? '' : `max-width: ${100 - idx * 7}%`"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                :class="step.highlight ? 'bg-green-400 text-black' : 'bg-green-400/10 text-green-400'"
              >
                {{ idx + 1 }}
              </div>
              <div class="min-w-0">
                <p class="font-bold text-white text-[15px]">{{ step.title }}</p>
                <p class="text-sm text-gray-500 mt-0.5 leading-relaxed">{{ step.desc }}</p>
              </div>
              <span v-if="step.ia" class="ml-auto shrink-0 text-[10px] font-bold px-2 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">IA</span>
            </div>
            <div v-if="idx < funnelSteps.length - 1" class="text-green-400/40 text-2xl my-1">↓</div>
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
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a] border-y border-white/5" id="otimizacao">
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
    <section class="w-full py-20 px-4 md:px-16 bg-[#111]" id="escopo">
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
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]" id="projecao">
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
            <div v-for="(bar, idx) in metric.bars" :key="idx" class="mb-3">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-500">Mês {{ idx + 1 }}</span>
                <span class="text-white font-bold">{{ bar.value }}</span>
              </div>
              <div class="h-2 bg-white/[.06] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all"
                  :style="`width: ${bar.pct}%; background: rgba(52,211,153,${0.4 + idx * 0.25})`"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div
            v-for="(month, idx) in revenueMonths"
            :key="month.label"
            class="rounded-2xl p-6 text-center border"
            :class="idx === 2 ? 'border-green-400/30 bg-green-400/5' : 'border-white/[.06] bg-[#181818]'"
          >
            <p class="text-xs uppercase tracking-widest text-gray-500 mb-1">{{ month.label }}</p>
            <p class="text-sm text-gray-600 mb-4">{{ month.clients }} novos clientes</p>
            <p
              class="font-black leading-none"
              :class="idx === 2 ? 'text-green-400' : 'text-white'"
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
    <section class="w-full py-20 px-4 md:px-16 bg-[#111]" id="valor-real">
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
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]" id="investimento">
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

        <!-- PASSO 1 — PLANO DO SISTEMA -->
        <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 sm:p-8 mb-4">
          <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
            1 · Escolha o plano do sistema
          </p>

          <!-- loading -->
          <div v-if="plansLoading" class="flex items-center gap-3 text-sm text-gray-500">
            <div class="w-4 h-4 rounded-full border-2 border-green-400/30 border-t-green-400 animate-spin" />
            Carregando planos...
          </div>

          <!-- erro -->
          <div v-else-if="plansError" class="text-sm text-red-400">
            Não foi possível carregar os planos.
            <button @click="loadPlans" class="underline ml-2 text-green-400">Tentar novamente</button>
          </div>

          <!-- cards de plano -->
          <div v-else class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              v-for="plan in availablePlans"
              :key="plan.id"
              @click="selectedPlanId = plan.id"
              type="button"
              class="rounded-xl border p-4 text-left transition-all flex flex-col gap-1.5"
              :class="selectedPlanId === plan.id
                ? 'border-green-400/50 bg-green-400/[.06]'
                : 'border-white/[.06] bg-[#141414] hover:border-white/20'"
            >
              <div class="flex items-center justify-between gap-1 flex-wrap">
                <span
                  class="text-[10px] font-bold uppercase tracking-widest"
                  :class="selectedPlanId === plan.id ? 'text-green-400' : 'text-gray-500'"
                >
                  {{ plan.name }}
                </span>
                <span
                  v-if="plan.isPopular"
                  class="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-400/15 text-green-400 border border-green-400/20"
                >
                  Popular
                </span>
              </div>
              <p
                class="font-black leading-none"
                :class="selectedPlanId === plan.id ? 'text-green-400' : 'text-gray-300'"
                style="font-family:'Bebas Neue',sans-serif;font-size:clamp(18px,3vw,26px)"
              >
                R$ {{ fmt(plan.price) }}/mês
              </p>
              <p class="text-[11px] text-gray-600 leading-snug">{{ plan.description }}</p>
            </button>
          </div>

          <p class="text-xs text-gray-600 mt-4">
            ✨ Todos os planos pagos incluem <strong class="text-gray-400">7 dias grátis</strong> — sem cartão de crédito.
            <NuxtLink to="/barbearia/choose-plan?segment=barber" class="text-green-400/70 hover:text-green-400 underline underline-offset-2 ml-1">
              Ver planos completos →
            </NuxtLink>
          </p>
        </div>

        <!-- PASSO 2 — VERBA GOOGLE ADS -->
        <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 sm:p-8 mb-4">
          <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
            2 · Qual será sua verba mensal no Google Ads?
          </p>
          <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-3">
            <input
              type="range"
              v-model="investBudget"
              min="100"
              max="6000"
              step="100"
              class="w-full sm:flex-1 accent-green-400"
            />
            <span
              class="font-black text-green-400 sm:shrink-0"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,4vw,28px)"
            >
              R$ {{ Number(investBudget).toLocaleString('pt-BR') }}/mês
            </span>
          </div>
          <div class="flex justify-between text-xs text-gray-600 px-1 mb-5">
            <span>R$ 100</span>
            <span>R$ 1.500</span>
            <span>R$ 3.000</span>
            <span>R$ 5.000</span>
            <span>R$ 6.000+</span>
          </div>

          <div class="flex gap-3 flex-wrap">
            <div
              class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
              :class="Number(investBudget) <= 1500
                ? 'border-green-400/40 bg-green-400/10 text-green-400'
                : 'border-white/[.06] bg-white/[.02] text-gray-600'"
            >
              <span class="w-1.5 h-1.5 rounded-full"
                :class="Number(investBudget) <= 1500 ? 'bg-green-400' : 'bg-gray-700'" />
              Até R$1.500 → IA R$300/mês
            </div>
            <div
              class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
              :class="Number(investBudget) > 1500 && Number(investBudget) <= 5000
                ? 'border-green-400/40 bg-green-400/10 text-green-400'
                : 'border-white/[.06] bg-white/[.02] text-gray-600'"
            >
              <span class="w-1.5 h-1.5 rounded-full"
                :class="Number(investBudget) > 1500 && Number(investBudget) <= 5000 ? 'bg-green-400' : 'bg-gray-700'" />
              R$1.500–R$5.000 → IA R$500/mês
            </div>
            <div
              class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
              :class="Number(investBudget) > 5000
                ? 'border-green-400/40 bg-green-400/10 text-green-400'
                : 'border-white/[.06] bg-white/[.02] text-gray-600'"
            >
              <span class="w-1.5 h-1.5 rounded-full"
                :class="Number(investBudget) > 5000 ? 'bg-green-400' : 'bg-gray-700'" />
              Acima de R$5.000 → A consultar
            </div>
          </div>
        </div>

        <!-- TOTAL + CTA -->
        <div
          class="rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          :class="iaPricing.consult ? 'border-yellow-400/20 bg-yellow-400/5' : 'border-green-400/20 bg-green-400/5'"
        >
          <div class="flex-1">
            <p class="text-xs uppercase tracking-widest mb-1"
              :class="iaPricing.consult ? 'text-yellow-400' : 'text-green-400'">
              Investimento total estimado / mês
            </p>

            <!-- breakdown -->
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2 mb-3">
              <span>
                🖥️ Sistema:
                <strong class="text-gray-300">
                  {{ selectedPlanId ? `R$ ${fmt(selectedPlanData?.price ?? 0)}` : 'selecione o plano' }}
                </strong>
              </span>
              <span>
                🤖 IA:
                <strong :class="iaPricing.consult ? 'text-yellow-400' : 'text-gray-300'">
                  {{ iaPricing.label }}
                </strong>
              </span>
              <span>
                💳 Verba:
                <strong class="text-gray-300">
                  R$ {{ Number(investBudget).toLocaleString('pt-BR') }}
                </strong>
              </span>
            </div>

            <p
              class="font-black leading-none"
              :class="iaPricing.consult ? 'text-yellow-400' : 'text-green-400'"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,4vw,36px)"
            >
              {{ totalInvestDisplay }}
            </p>

            <p v-if="!selectedPlanId" class="text-xs text-gray-600 mt-1">
              ↑ Selecione um plano acima para ver o total completo
            </p>
          </div>

          <!-- CTA -->
          <div class="flex flex-col gap-2 shrink-0">
            
            <a
              :href="ctaWhatsappUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base transition hover:-translate-y-0.5"
              :class="iaPricing.consult
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-green-400 text-black hover:bg-green-300'"
            >
              🚀 Quero começar agora
            </a>
            <p class="text-[11px] text-gray-600 text-center">Sem cartão · 30 dias grátis</p>
          </div>
        </div>

      </div>
    </section>

    <!-- RELATÓRIO INTEGRADO -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0d0d0d] border-y border-white/5" id="relatorio">
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
              v-for="(ds, idx) in reportStats"
              :key="ds.label"
              class="p-5 text-center border-white/[.05]"
              :class="[
                idx % 2 === 0 && idx < reportStats.length - 1 ? 'border-r' : '',
                idx < 2 ? 'border-b sm:border-b-0' : '',
                idx > 0 && idx < 3 ? 'sm:border-r' : ''
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
    <section class="w-full py-20 px-4 md:px-16 bg-[#0a0a0a]" id="diferenciais">
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

    <!-- COMPATIBILIDADE COM OUTROS SISTEMAS -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#111] border-y border-white/5" id="compatibilidade">
      <div class="max-w-6xl mx-auto">

        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20 mb-6">
          🔌 Já usa outro sistema de agendamento?
        </div>

        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          NÃO PRECISA<br>
          <span class="text-green-400">TROCAR DE SISTEMA.</span>
        </h2>

        <p class="text-gray-500 text-[15px] max-w-3xl mb-10 leading-relaxed">
          A SuaAgenda IA funciona como um módulo de captação independente. Se você já usa AppBarber, Trinks, Booksy ou qualquer outra plataforma, pode continuar normalmente — a IA só precisa de um link público de agendamento para enviar os clientes direto pra sua agenda.
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <div
            v-for="sys in compatibleSystems"
            :key="sys.name"
            class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 flex items-center gap-3"
          >
            <span class="text-2xl shrink-0">{{ sys.emoji }}</span>
            <div>
              <p class="text-sm font-bold text-white">{{ sys.name }}</p>
              <p class="text-xs text-green-400 font-bold mt-0.5">✓ Compatível</p>
            </div>
          </div>
          <div class="rounded-2xl border border-white/[.04] bg-[#141414] p-5 flex items-center gap-3">
            <span class="text-2xl shrink-0">➕</span>
            <div>
              <p class="text-sm font-bold text-gray-400">Qualquer outro</p>
              <p class="text-xs text-gray-600 mt-0.5">com link público</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="step in compatSteps"
            :key="step.title"
            class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 flex items-start gap-4"
          >
            <div class="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center text-green-400 font-black text-sm shrink-0">
              {{ step.num }}
            </div>
            <div>
              <p class="font-bold text-white text-[15px] mb-1">{{ step.title }}</p>
              <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border border-green-400/20 bg-green-400/5 p-5 max-w-2xl">
          <p class="text-sm text-green-400/90 leading-relaxed">
            💡 <strong class="text-white">Quer centralizar tudo?</strong>
            Se preferir migrar para a SuaAgenda, a transição é guiada e seus clientes e serviços são importados sem perda de histórico.
          </p>
        </div>

      </div>
    </section>

    <!-- PARA AGÊNCIAS -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#111] border-y border-white/5" id="agencias">
      
      <div class="max-w-6xl mx-auto">

        <!-- SELO -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20 mb-6">
          🤝 Também disponível para agências e gestores de tráfego
        </div>

        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          SUA AGÊNCIA NÃO PRECISA<br>
          <span class="text-green-400">FAZER TUDO NA MÃO.</span>
        </h2>

        <p class="text-gray-500 text-[15px] max-w-3xl mb-12 leading-relaxed">
          A SuaAgenda IA também pode ser usada por agências de marketing e gestores de tráfego que atendem barbearias. Enquanto a IA faz o trabalho operacional e otimiza campanhas, sua equipe ganha tempo para focar em estratégia, criativos e crescimento.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div
            v-for="item in agencyBenefits"
            :key="item.title"
            class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 flex items-start gap-4"
          >
            <div class="text-3xl">{{ item.emoji }}</div>
            <div>
              <p class="font-bold text-white text-[15px] mb-2">{{ item.title }}</p>
              <p class="text-sm text-gray-500 leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-green-400/20 bg-green-400/5 p-6">
          <p class="text-green-400 font-bold mb-2">
            🤝 Ideal para quem atende negócios locais.
          </p>
          <p class="text-gray-400 leading-relaxed">
            Em vez de gastar horas criando e ajustando campanhas repetitivas para cada cliente,
            a SuaAgenda IA automatiza a operação e permite que sua agência atenda mais contas
            sem precisar aumentar a equipe.
          </p>
        </div>

      </div>
    </section>

    <!-- FAQ -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#0d0d0d] border-t border-white/5" id="faq">
      <div class="max-w-4xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400 text-center block">
          Dúvidas comuns
        </span>
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
              <span class="font-bold text-white text-[16px] sm:text-[17px] pr-4">{{ faq.question }}</span>
              <span class="text-green-400 text-xl shrink-0 ml-4">{{ faq.open ? '−' : '+' }}</span>
            </button>

            <div v-show="faq.open" class="px-5 sm:px-6 pb-5 sm:pb-6">
              <div class="pt-2 border-t border-white/[.05] text-gray-400 text-[15px] leading-relaxed space-y-3">
                <p v-for="(paragraph, pIdx) in faq.answer" :key="pIdx">
                  {{ paragraph }}
                </p>
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

        <div class="flex justify-center mb-6">
          <ScarcityBadge :scarcity="scarcity" />
        </div>

        <h2
          class="font-black leading-none text-white mb-4"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,5vw,72px)"
        >
          PRONTO PARA<br>
          <span class="text-green-400">LOTAR SUA AGENDA?</span>
        </h2>

        <div class="bg-green-400/5 border border-green-400/20 rounded-2xl p-5 mb-8 max-w-md mx-auto">
          <p class="text-green-400 font-bold text-lg">30 dias de garantia</p>
          <p class="text-gray-400 text-sm">Se não gerar pelo menos 5 agendamentos no primeiro mês, você não paga o módulo da IA.</p>
          <div class="h-px bg-white/10 my-3"></div>
          <p class="text-green-400 font-bold text-lg">Sem fidelidade</p>
          <p class="text-gray-400 text-sm">Cancele quando quiser, sem multa. Sua verba vai direto pro Google — a gente não toca nela.</p>
        </div>

        <div class="flex flex-wrap gap-4 justify-center">
          <a
            href="https://wa.me/5511941649284?text=Quero%20testar%20a%20SuaAgenda%20IA%20gr%C3%A1tis%20por%207%20dias"
            class="inline-flex items-center gap-2 px-8 py-5 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            🚀 Quero minha vaga — garantia de 30 dias
          </a>
          <NuxtLink
            to="/barbearias"
            class="inline-flex items-center gap-2 px-6 py-5 rounded-2xl font-bold text-base text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            Ver barbearias →
          </NuxtLink>
        </div>

        <p class="text-xs text-gray-600 mt-6">
          Sem fidelidade. Cancele quando quiser. Sua verba do Google Ads vai direto pro Google — a gente não toca nela.
        </p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { fetchLocations } from '@/composables/useLocation'
import type { CityData } from '~/data/locations'

definePageMeta({ layout: 'barber' })

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

interface ScarcityState {
  /** 'neighborhood' em cidades grandes, 'city' em cidades pequenas */
  unit:         'neighborhood' | 'city'
  /** Nome exibido no badge (bairro ou cidade) */
  unitName:     string
  /** Cidade detectada, sempre presente */
  cityName:     string
  /** Vagas disponíveis (cap - cadastrados) */
  remaining:    number
  /** true enquanto o fetch ainda não terminou */
  loading:      boolean
  /** true se a detecção falhou e estamos no fallback genérico */
  fallback:     boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// CAPS MANUAIS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cidades com +500k hab (segmentadas por bairro).
 * A chave é o nome retornado pela ipapi.co (case-sensitive).
 */
const BIG_CITIES = new Set([
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba',
  'Manaus', 'Fortaleza', 'Recife', 'Salvador', 'Porto Alegre',
  'Belém', 'Goiânia', 'Guarulhos', 'Campinas', 'São Luís',
  'Maceió', 'Natal', 'Teresina', 'Campo Grande', 'João Pessoa',
  'Santo André', 'São Bernardo do Campo', 'Osasco',
  'Jaboatão dos Guararapes', 'Contagem', 'Ribeirão Preto',
  'Sorocaba', 'Aracaju', 'Feira de Santana',
])

/**
 * Cap de barbearias por unidade.
 * Cidades grandes: cap por bairro (padrão = 3 se não mapeado).
 * Cidades pequenas: cap pela cidade inteira (padrão = 2 se não mapeado).
 *
 * Quando tiver o endpoint real, substitua o mock abaixo e mantenha só os caps.
 */
const CAPS: Record<string, number> = {
  // Bairros (cidades grandes) — adicione conforme cadastros crescerem
  'Pinheiros':      3,
  'Vila Madalena':  2,
  'Moema':          3,
  'Lapa':           2,
  'Santana':        3,
  'Copacabana':     3,
  'Barra da Tijuca':3,
  'Lourdes':        2,
  'Savassi':        2,
  'Batel':          2,
  // Cidades pequenas — adicione conforme expansão
  'Ribeirão Preto': 4,
  'Bauru':          3,
  'Marília':        2,
  'Presidente Prudente': 2,
}

const DEFAULT_CAP_BIG   = 3  // bairros não mapeados em cidades grandes
const DEFAULT_CAP_SMALL = 2  // cidades pequenas não mapeadas

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DE CADASTROS (substitua por fetch real quando tiver o endpoint)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Simula quantas barbearias já estão ativas naquela unidade (bairro ou cidade).
 * Quando tiver o endpoint, substitua por:
 *   const res = await $fetch<{ count: number }>(`/api/registrations/count?unit=${unitKey}`)
 *   return res.count
 */
async function fetchRegisteredCount(unitKey: string): Promise<number> {
  // Aguarda como se fosse uma chamada real (remove em produção)
  await new Promise(r => setTimeout(r, 0))

  const mockData: Record<string, number> = {
    'Pinheiros':       2,
    'Vila Madalena':   2,
    'Moema':           1,
    'Lapa':            1,
    'Copacabana':      2,
    'Barra da Tijuca': 1,
    'Ribeirão Preto':  3,
    'Bauru':           2,
    'Marília':         1,
  }
  return mockData[unitKey] ?? 0
}

// ─────────────────────────────────────────────────────────────────────────────
// DETECÇÃO DE LOCALIZAÇÃO + CRUZAMENTO COM locations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cruza o bairro/cidade detectado via IP com os dados reais de locations.
 * Garante que só exibimos unidades que existem no nosso cadastro.
 */
async function resolveUnitFromIP(
  cities: CityData[],
  ipCity: string,
  ipDistrict: string,
): Promise<{ unit: 'neighborhood' | 'city'; unitName: string } | null> {
  const isBig = BIG_CITIES.has(ipCity)

  if (isBig && ipDistrict) {
    // Tenta achar o bairro nos dados de locations
    const cityData = cities.find(c => c.city === ipCity)
    if (cityData) {
      for (const district of cityData.districts) {
        const found = district.neighborhoods.find(
          n => n.name.toLowerCase() === ipDistrict.toLowerCase()
        )
        if (found) return { unit: 'neighborhood', unitName: found.name }
      }
    }
    // Bairro não encontrado no locations mas cidade grande válida —
    // usa o nome retornado pelo IP mesmo (pode ser um bairro real mas não cadastrado ainda)
    return { unit: 'neighborhood', unitName: ipDistrict }
  }

  // Cidade pequena ou cidade grande sem bairro detectado
  if (ipCity) return { unit: 'city', unitName: ipCity }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// ESTADO REATIVO
// ─────────────────────────────────────────────────────────────────────────────

const isMobile    = ref(false)
const investBudget = ref(300)

const scarcity = ref<ScarcityState>({
  unit:      'city',
  unitName:  'sua cidade',
  cityName:  '',
  remaining: 2,
  loading:   true,
  fallback:  false,
})

// ─── PLANOS DO SISTEMA (fetch da API) ────────────────────────────────────────

interface SystemPlan {
  id:          number
  name:        string
  description: string
  price:       number
  isPopular:   boolean
}

const config      = useRuntimeConfig()
const plansLoading = ref(false)
const plansError   = ref(false)
const rawSystemPlans = ref<SystemPlan[]>([])
const selectedPlanId = ref<number | null>(null)

// Exclui plano free (price=0, isTrial=false) e enterprise (price=0, isTrial=true)
const availablePlans = computed(() =>
  rawSystemPlans.value.filter(p => Number(p.price) > 0)
)

const selectedPlanData = computed(() =>
  availablePlans.value.find(p => p.id === selectedPlanId.value) ?? null
)

async function loadPlans() {
  plansLoading.value = true
  plansError.value   = false
  try {
    const res  = await fetch(`${config.public.apiBase}/plans/public`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const list: any[] = Array.isArray(json) ? json : (json.data ?? [])
    rawSystemPlans.value = list
      .filter((p: any) => Number(p.price) > 0)
      .sort((a: any, b: any) => Number(a.price) - Number(b.price))
      .map((p: any) => ({
        id:          p.id,
        name:        p.name,
        description: p.description ?? '',
        price:       Number(p.price),
        isPopular:   !!p.isPopular,
      }))
    // pré-seleciona o popular, ou o primeiro
    const popular = rawSystemPlans.value.find(p => p.isPopular)
    selectedPlanId.value = popular?.id ?? rawSystemPlans.value[0]?.id ?? null
  } catch (e) {
    console.error('[loadPlans]', e)
    plansError.value = true
  } finally {
    plansLoading.value = false
  }
}

function fmt(n: number): string {
  return Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}
// ─────────────────────────────────────────────────────────────────────────────
// ROUTE PARAMS (sobrepõem o IP quando presentes)
// ─────────────────────────────────────────────────────────────────────────────

const route = useRoute()
// Ex: /gestao-de-trafego?city=sao-paulo&neighborhood=pinheiros
const paramCity         = computed(() => route.query.city as string | undefined)
const paramNeighborhood = computed(() => route.query.neighborhood as string | undefined)

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTED — PREÇOS
// ─────────────────────────────────────────────────────────────────────────────

const iaPricing = computed(() => {
  const budget = Number(investBudget.value)
  if (budget <= 1500) return { label: 'R$ 300/mês', value: 300, consult: false }
  if (budget <= 5000) return { label: 'R$ 500/mês', value: 500, consult: false }
  return { label: 'A consultar', value: null, consult: true }
})

const totalInvestDisplay = computed(() => {
  if (iaPricing.value.consult) return 'A consultar'
  const sistema = selectedPlanData.value?.price ?? 0
  const ia      = Number(iaPricing.value.value) || 0
  const verba   = Number(investBudget.value) || 0
  if (!selectedPlanId.value) {
    // sem plano selecionado, mostra só IA + verba
    return `R$ ${(ia + verba).toLocaleString('pt-BR')}/mês`
  }
  return `R$ ${(sistema + ia + verba).toLocaleString('pt-BR')}/mês`
})

const ctaWhatsappUrl = computed(() => {
  const planName  = selectedPlanData.value?.name ?? 'sem plano'
  const planPrice = selectedPlanData.value ? `R$${fmt(selectedPlanData.value.price)}/mês` : 'a definir'
  const ia        = iaPricing.value.consult ? 'a consultar' : iaPricing.value.label
  const verba     = `R$${Number(investBudget.value).toLocaleString('pt-BR')}/mês`
  const total     = totalInvestDisplay.value

  const msg = `Olá! Quero começar com a SuaAgenda IA.\n\n` +
    `📋 Plano do sistema: ${planName} (${planPrice})\n` +
    `🤖 SuaAgenda IA: ${ia}\n` +
    `💳 Verba Google Ads: ${verba}\n` +
    `📊 Total estimado: ${total}\n\n` +
    `Pode me ajudar a configurar?`

  return `https://wa.me/5511941649284?text=${encodeURIComponent(msg)}`
})

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTED — BADGE DE ESCASSEZ
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Texto principal do badge.
 * Cidade grande → "X VAGA(S) PARA PINHEIROS, SÃO PAULO"
 * Cidade pequena → "X VAGA(S) PARA RIBEIRÃO PRETO"
 */
const scarcityLabel = computed(() => {
  if (scarcity.value.loading) return '⚠️ Verificando vagas na sua região...'
  if (scarcity.value.fallback) return '⚠️ VAGAS LIMITADAS — PRÓXIMA LIBERAÇÃO EM 30 DIAS'

  const { unit, unitName, cityName, remaining } = scarcity.value
  const vagaStr = remaining === 1 ? 'VAGA' : 'VAGAS'

  if (unit === 'neighborhood') {
    return `⚠️ APENAS ${remaining} ${vagaStr} PARA ${unitName.toUpperCase()}, ${cityName.toUpperCase()} — PRÓXIMA LIBERAÇÃO EM 30 DIAS`
  }
  return `⚠️ APENAS ${remaining} ${vagaStr} PARA ${unitName.toUpperCase()} — PRÓXIMA LIBERAÇÃO EM 30 DIAS`
})

// ─────────────────────────────────────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────────────────────────────────────

async function initScarcity() {
  try {
    // 1. Carrega locations (usa cache do composable)
    const cities = await fetchLocations()

    let resolvedCity      = ''
    let resolvedUnit:     'neighborhood' | 'city' = 'city'
    let resolvedUnitName  = ''

    // 2. URL params têm prioridade sobre IP
    if (paramCity.value) {
      const cityData = cities.find(c => c.citySlug === paramCity.value)
      if (cityData) {
        resolvedCity = cityData.city
        if (paramNeighborhood.value && BIG_CITIES.has(cityData.city)) {
          // Acha o bairro pelo slug
          for (const district of cityData.districts) {
            const found = district.neighborhoods.find(n => n.slug === paramNeighborhood.value)
            if (found) {
              resolvedUnit     = 'neighborhood'
              resolvedUnitName = found.name
              break
            }
          }
        }
        if (!resolvedUnitName) {
          resolvedUnit     = BIG_CITIES.has(cityData.city) ? 'neighborhood' : 'city'
          resolvedUnitName = cityData.city
        }
      }
    }

    // 3. Fallback: IP detection
    if (!resolvedCity) {
      const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) })
      const data = await res.json()

      const ipCity     = (data.city     ?? '').trim()
      const ipDistrict = (data.district ?? '').trim()

      if (ipCity) {
        resolvedCity = ipCity
        const resolved = await resolveUnitFromIP(cities, ipCity, ipDistrict)
        if (resolved) {
          resolvedUnit     = resolved.unit
          resolvedUnitName = resolved.unitName
        } else {
          resolvedUnit     = 'city'
          resolvedUnitName = ipCity
        }
      }
    }

    if (!resolvedCity) {
      // Não foi possível detectar nada
      scarcity.value = { ...scarcity.value, loading: false, fallback: true }
      return
    }

    // 4. Calcula vagas: cap - cadastrados
    const cap        = CAPS[resolvedUnitName] ?? (resolvedUnit === 'neighborhood' ? DEFAULT_CAP_BIG : DEFAULT_CAP_SMALL)
    const registered = await fetchRegisteredCount(resolvedUnitName)
    const remaining  = Math.max(0, cap - registered)

    scarcity.value = {
      unit:      resolvedUnit,
      unitName:  resolvedUnitName,
      cityName:  resolvedCity,
      remaining,
      loading:   false,
      fallback:  false,
    }
  } catch (err) {
    console.error('[ScarcityInit]', err)
    scarcity.value = { ...scarcity.value, loading: false, fallback: true }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LIFECYCLE
// ─────────────────────────────────────────────────────────────────────────────

onMounted(() => {
  isMobile.value = window.innerWidth < 640
  window.addEventListener('resize', () => { isMobile.value = window.innerWidth < 640 })
  initScarcity()
  loadPlans()
})

const compatibleSystems = [
  { emoji: '💈', name: 'AppBarber'  },
  { emoji: '✂️', name: 'Trinks'    },
  { emoji: '📅', name: 'Booksy'    },
  { emoji: '🗓️', name: 'Avec'   },
]

const compatSteps = [
  {
    num: '1',
    title: 'Você nos passa o link de agendamento',
    desc: 'Pode ser do AppBarber, Trinks, Booksy ou qualquer sistema que gere um link público.',
  },
  {
    num: '2',
    title: 'A IA configura a campanha',
    desc: 'Os anúncios são criados com esse link como destino. O cliente clica e já cai na sua agenda.',
  },
  {
    num: '3',
    title: 'Você recebe os agendamentos no sistema que já usa',
    desc: 'Nada muda no seu dia a dia. Só aparecem mais clientes novos na sua agenda.',
  },
]

const agencyBenefits = [
  {
    emoji: '🚀',
    title: 'Escale sua operação',
    desc: 'Atenda mais clientes sem aumentar proporcionalmente sua equipe de tráfego.',
  },
  {
    emoji: '🤖',
    title: 'IA faz o operacional',
    desc: 'A plataforma cria, acompanha e otimiza campanhas automaticamente.',
  },
  {
    emoji: '📊',
    title: 'Resultados conectados ao negócio',
    desc: 'A otimização considera os agendamentos reais, não apenas cliques e impressões.',
  },
  {
    emoji: '💰',
    title: 'Nova fonte de receita',
    desc: 'Ofereça uma solução de aquisição recorrente para seus clientes sem desenvolver uma plataforma própria.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

const faqs = ref([
  {
    open: false,
    question: '🧠 Por que vocês chamam isso de IA e não apenas gestão de tráfego?',
    answer: [
      'Porque a plataforma faz muito mais do que simplesmente criar campanhas no Google Ads.',
      'Enquanto uma gestão tradicional depende de ajustes manuais e análise humana, a SuaAgenda IA acompanha continuamente os dados reais de agendamento para entender o que está gerando clientes de verdade para sua barbearia.',
      'Com essas informações, ela otimiza automaticamente campanhas, palavras-chave e distribuição de orçamento para buscar cada vez mais resultados.',
      'Na prática, não é só uma agência rodando anúncios. É uma camada de inteligência trabalhando 24 horas por dia para trazer mais clientes para a sua agenda.',
    ],
    note: 'A IA não busca mais cliques. Ela busca mais agendamentos.',
  },

  {
    open: false,
    question: '🔌 Eu já uso AppBarber, Trinks, Booksy ou outro sistema. Funciona junto?',
    answer: [
      'Sim. A SuaAgenda IA foi criada para trabalhar junto com o sistema que você já usa.',
      'Basta existir um link público de agendamento para ser usado como destino dos anúncios. Você não precisa trocar sua plataforma nem migrar dados.',
    ],
    note: 'A IA cuida da captação de clientes. Você continua usando o sistema que já conhece.',
  },
  {
    open: false,
    question: '📈 Como a SuaAgenda IA é diferente de uma agência de tráfego?',
    answer: [
      'Uma agência tradicional normalmente otimiza campanhas olhando métricas como cliques, impressões e formulários.',
      'A SuaAgenda IA vai além: ela usa os dados reais dos agendamentos para entender quais campanhas estão trazendo clientes de verdade e otimizar automaticamente com base nisso.',
      'Na prática, o objetivo não é gerar mais cliques. É gerar mais cadeiras ocupadas.',
    ],
    note: 'A IA aprende com o resultado final do seu negócio, não apenas com métricas de marketing.',
  },
  {
    open: false,
    question: '💰 Eu já tenho uma agência. Isso substitui?',
    answer: [
      'Depende do seu modelo atual. Muitas barbearias usam a SuaAgenda IA para reduzir custos ou complementar a estratégia da agência.',
      'Se sua agência já entrega um bom trabalho, ela pode continuar cuidando do branding e das campanhas especiais enquanto a IA fica responsável pela aquisição recorrente de clientes locais.',
    ],
    note: 'A plataforma pode substituir ou trabalhar em conjunto com sua agência atual.',
  },
  {
    open: false,
    question: '🤝 Sou agência de marketing. Posso usar para meus clientes?',
    answer: [
      'Sim. A plataforma também foi pensada para agências que atendem barbearias.',
      'Você pode oferecer a gestão automatizada de Google Ads aos seus clientes, acompanhar os resultados e focar seu tempo em estratégia, vendas e relacionamento.',
      'Em vez de criar e ajustar campanhas manualmente todos os dias, a IA faz o trabalho operacional pesado para você.',
    ],
    note: 'Ideal para agências que querem escalar o atendimento sem aumentar a equipe.',
  },
  {
    open: false,
    question: '🎯 Preciso entender de Google Ads para usar?',
    answer: [
      'Não. O processo foi desenhado para quem nunca anunciou.',
      'A configuração inicial é guiada e a IA faz a maior parte do trabalho de otimização automaticamente.',
      'Você acompanha os resultados em uma linguagem simples, sem precisar virar especialista em tráfego pago.',
    ],
    note: 'Seu foco continua sendo cortar cabelo. O nosso é trazer clientes.',
  },
  {
    open: false,
    question: '💸 O dinheiro dos anúncios fica com vocês?',
    answer: [
      'Não. A verba de anúncios é investida diretamente na sua conta do Google Ads.',
      'Você tem total transparência sobre quanto está sendo investido e pode aumentar, reduzir ou pausar quando quiser.',
    ],
    note: 'A verba é sua. A IA apenas faz a gestão inteligente das campanhas.',
  },
  {
    open: false,
    question: '📊 Como a IA sabe se a campanha está funcionando?',
    answer: [
      'Ela acompanha os agendamentos gerados e cruza essas informações com os dados das campanhas.',
      'Assim, ela consegue identificar quais anúncios, palavras-chave e públicos estão trazendo clientes reais para sua barbearia.',
    ],
    note: 'Otimização baseada em resultado real, não em achismo.',
  },
  {
    open: false,
    question: '🛡️ Como funciona a garantia de resultado?',
    answer: [
      'A garantia é simples: se a campanha não gerar pelo menos 5 agendamentos registrados no sistema durante os primeiros 30 dias de campanha ativa, você não paga o módulo da IA referente àquele mês.',
      'Basta solicitar a análise até o 35º dia. Os dados são verificados automaticamente pelo próprio sistema, sem necessidade de enviar prints ou relatórios.',
      'Se a meta mínima não for atingida, o valor é estornado ou abatido da próxima mensalidade.',
    ],
    note: 'A garantia existe porque a maioria das campanhas ultrapassa essa marca nas primeiras semanas.',
  },
  {
    open: false,
    question: '🚀 Em quanto tempo começo a receber clientes?',
    answer: [
      'Após a configuração inicial e aprovação das campanhas pelo Google, os anúncios já começam a rodar.',
      'Muitas barbearias recebem os primeiros contatos e agendamentos ainda na primeira semana, embora os resultados possam variar conforme a cidade e a concorrência local.',
    ],
    note: 'O objetivo é criar uma fonte previsível e constante de novos clientes.',
  },
  {
    open: false,
    question: '🔁 Posso cancelar quando quiser?',
    answer: [
      'Sim. Não existe fidelidade nem multa contratual.',
      'Você pode cancelar pelo WhatsApp e a desativação é feita sem burocracia.',
    ],
    note: 'Você continua com o controle da sua conta de anúncios e do seu investimento.',
  },
  {
    open: false,
    question: '🏙️ Minha cidade é pequena. Vale a pena?',
    answer: [
      'Sim. O sistema foi desenvolvido justamente para negócios locais.',
      'Em cidades menores, a concorrência costuma ser menor e isso pode reduzir o custo por novo cliente adquirido.',
    ],
    note: 'A estratégia é adaptada para a realidade de cada região.',
  },
  {
    open: false,
    question: '❓ O que acontece se eu já estiver lotado?',
    answer: [
      'Você pode controlar o investimento e a intensidade das campanhas a qualquer momento.',
      'A ideia é criar previsibilidade: aumentar a demanda quando houver horários vagos e reduzir quando a agenda estiver cheia.',
    ],
    note: 'Você define o ritmo de crescimento da sua barbearia.',
  },
])


// ─────────────────────────────────────────────────────────────────────────────
// DADOS ESTÁTICOS
// ─────────────────────────────────────────────────────────────────────────────

const benefits = [
  { emoji: '🤖', title: 'IA que conhece sua barbearia', desc: 'A SuaAgenda IA lê seu histórico de agendamentos e ticket médio antes de criar qualquer anúncio.' },
  { emoji: '🎯', title: 'Segmentação por serviço', desc: 'Cada serviço vira um grupo de anúncio separado.' },
  { emoji: '⚡', title: 'Otimização automática toda semana', desc: 'A IA analisa o que está convertendo e ajusta lances sozinha.' },
  { emoji: '📊', title: 'Relatório em linguagem simples', desc: 'Nada de métricas complicadas. A IA traduz tudo.' },
]

const iaSteps = [
  { emoji: '🔍', badge: 'Antes de criar', highlight: false, title: 'A IA lê seu histórico', desc: 'Quais serviços você mais faz, qual o ticket médio.' },
  { emoji: '🎯', badge: 'Na criação', highlight: true, title: 'Segmenta por serviço', desc: 'Só anuncia onde o ticket cobre o custo de aquisição.' },
  { emoji: '📈', badge: 'Toda semana', highlight: false, title: 'Otimiza resultados', desc: 'Aumenta lance no que converte, pausa o que desperdiça.' },
]

const segmentacaoExemplo = [
  { servico: 'Corte + Barba', ticket: 'R$ 95', anuncia: true, status: 'Anunciando' },
  { servico: 'Corte Masculino', ticket: 'R$ 55', anuncia: true, status: 'Anunciando' },
  { servico: 'Progressiva', ticket: 'R$ 120', anuncia: true, status: 'Anunciando' },
  { servico: 'Corte Infantil', ticket: 'R$ 30', anuncia: false, status: 'Pausado pela IA' },
  { servico: 'Relaxamento', ticket: 'R$ 25', anuncia: false, status: 'Pausado pela IA' },
]

const funnelSteps = [
  { title: 'SuaAgenda IA cria a campanha', desc: 'Analisa histórico e lança no Google Ads', highlight: true, ia: true },
  { title: 'Google Ads — pesquisa local', desc: '"Barbearia perto de mim" → seu nome no topo', highlight: false, ia: false },
  { title: 'Clique no anúncio', desc: 'Cliente vai direto pra sua página de agendamento', highlight: false, ia: false },
  { title: 'Agendamento registrado', desc: 'Sistema confirma e envia lembrete via WhatsApp', highlight: false, ia: false },
  { title: 'Cliente na cadeira', desc: 'Barbearia lotada. Sem você fazer nada.', highlight: true, ia: false },
  { title: 'IA analisa a semana', desc: 'O que converteu, o que ajustar — automático', highlight: true, ia: true },
  { title: 'Relatório mensal', desc: 'Cliques, novos clientes e receita estimada', highlight: false, ia: true },
]

const howItWorks = [
  { emoji: '🎯', title: 'Campanha criada pela IA', desc: 'A IA usa seu histórico real para montar grupos de anúncio.' },
  { emoji: '🔗', title: 'Integrado com sua agenda', desc: 'Botão do anúncio conecta direto com o sistema.' },
  { emoji: '📈', title: 'Otimização toda semana', desc: 'IA ajusta lances com base nos agendamentos reais.' },
]

const otimizacoes = [
  { emoji: '📊', title: 'Análise de conversão', desc: 'IA compara cliques com agendamentos reais.' },
  { emoji: '🔍', title: 'Novas palavras-chave', desc: 'Adiciona termos de busca que geraram cliques.' },
  { emoji: '💰', title: 'Ajuste de lances', desc: 'Grupos com menor custo por agendamento recebem mais verba.' },
  { emoji: '🛑', title: 'Pausa automática', desc: 'Serviço sem agendamento por 7 dias é pausado.' },
]

const included = [
  { title: 'Criação da campanha pela IA', desc: 'IA analisa histórico e monta grupos por serviço.' },
  { title: 'Otimização automática toda semana', desc: 'Ajuste de lances, pausa de grupos sem resultado.' },
  { title: 'Integração com sua agenda', desc: 'Clique no anúncio vai direto pro agendamento.' },
  { title: 'Campanha local de Pesquisa', desc: 'Domina a busca local da sua cidade.' },
  { title: 'Relatório mensal automático', desc: 'Resultados em linguagem simples.' },
]

const notIncluded = [
  { title: 'Gestão de Instagram/Facebook Ads', desc: 'Foco exclusivo no Google é intencional.' },
  { title: 'Criação de criativos ou vídeos', desc: 'Google Ads de pesquisa é baseado em texto.' },
  { title: 'Reuniões estratégicas mensais', desc: 'Os dados estão no painel.' },
  { title: 'Produção de conteúdo para redes', desc: 'Foco em captação via busca.' },
]

const googleStats = [
  { num: '3×', label: 'mais conversão que redes sociais' },
  { num: '1ª', label: 'posição na pesquisa local' },
  { num: '24h', label: 'campanha rodando' },
  { num: '100%', label: 'intenção de compra' },
]

const projectionMetrics = [
  { label: 'Visitas na landing page', bars: [{ value: '120', pct: 48 }, { value: '180', pct: 72 }, { value: '250', pct: 100 }] },
  { label: 'Agendamentos', bars: [{ value: '12', pct: 40 }, { value: '20', pct: 66 }, { value: '30', pct: 100 }] },
  { label: 'Novos clientes', bars: [{ value: '8', pct: 33 }, { value: '15', pct: 62 }, { value: '24', pct: 100 }] },
]

const revenueMonths = [
  { label: 'Mês 1', clients: '8', revenue: 'R$ 360' },
  { label: 'Mês 2', clients: '15', revenue: 'R$ 675' },
  { label: 'Mês 3', clients: '24', revenue: 'R$ 1.080' },
]

const planItems = [
  { emoji: '🖥️', label: 'Sistema SuaAgenda', badge: '30 dias grátis', highlight: true, isIa: false, price: 'a partir de R$ 99/mês', desc: 'Agenda online, painel de clientes.', note: 'Teste grátis de 30 dias.' },
  { emoji: '🤖', label: 'SuaAgenda IA', badge: 'Marketing IA', highlight: false, isIa: true, price: '', desc: 'IA cria e otimiza campanhas.', note: 'Garantia de 30 dias.' },
  { emoji: '💳', label: 'Verba Google Ads', badge: 'Google', highlight: false, isIa: false, price: 'a partir de R$ 300/mês', desc: 'Investido diretamente no Google.', note: 'Pago por você ao Google.' },
]

const reportStats = [
  { label: 'Cliques', value: '126', green: false },
  { label: 'Agendamentos', value: '9', green: false },
  { label: 'Novos clientes', value: '6', green: true },
  { label: 'Receita est.', value: 'R$270', green: true },
]

const differentials = [
  'IA cria campanha com base no seu histórico real',
  'Segmentação por serviço — sem desperdiçar verba',
  'Otimização automática toda semana',
  'Agendamento direto — sem WhatsApp no meio',
  'Relatório em linguagem simples',
  'Você vê o resultado, não a promessa',
]

const stats = [
  { num: '24h', label: 'Campanha rodando' },
  { num: '30d', label: 'Garantia de resultado' },
  { num: '100%', label: 'Automatizado' },
  { num: '0', label: 'Reuniões mensais' },
]

// ─────────────────────────────────────────────────────────────────────────────
// SEO
// ─────────────────────────────────────────────────────────────────────────────

useHead({
  title: 'SuaAgenda IA - Captação Automática de Clientes para Barbearias',
  meta: [
    { name: 'description', content: 'A SuaAgenda IA cria campanhas no Google Ads segmentadas por serviço, otimiza toda semana e gera relatório automático. Garantia de resultado em 30 dias.' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://suaagenda.link/barbearia/gestao-de-trafego' }],
})
</script>