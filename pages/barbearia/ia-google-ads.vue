<!-- pages/gestao-de-trafego/index.vue -->
<template>
  <div class="text-[15px]">

    <!-- HERO -->
    <section class="relative w-full py-20 px-4 md:px-16 bg-[#f8f7f4] overflow-hidden">
      <div
        class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse 55% 50% at 70% 40%,rgba(22,163,74,.06) 0%,transparent 70%)"
      />
      <div class="relative max-w-6xl mx-auto">

        <div class="flex flex-wrap gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-700 bg-green-100 border border-green-200">
            🏆 1ª do Brasil a unir Sistema de agendamento + IA + Google Ads
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-700 bg-green-100 border border-green-200">
            🤖 SuaAgenda IA
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-gray-600 bg-white border border-black/10">
            🔍 Google Ads integrado
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-gray-600 bg-white border border-black/10">
            ⚡ Otimiza toda semana
          </span>
        </div>

        <h1
          class="font-black leading-none mb-6 text-green-600"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,6vw,88px);letter-spacing:.03em"
        >
          NÃO É AGÊNCIA.<br>
          <span class="text-[#0f0f0f]">É UMA IA QUE TRABALHA<br>POR VOCÊ.</span>
        </h1>

        <!-- GARANTIA EM DESTAQUE — primeira coisa que o barbeiro pergunta é "qual o risco?" -->
        <div class="rounded-2xl border-2 border-green-300 bg-green-50 p-5 sm:p-6 mb-10 max-w-2xl">
          <p class="text-green-700 font-black text-lg sm:text-xl mb-2 flex items-center gap-2">
            🛡️ GARANTIA DE 30 DIAS
          </p>
          <p class="text-gray-700 text-[15px] sm:text-base leading-relaxed">
            Investindo pelo menos R$ 10/dia em anúncios, se a campanha não gerar pelo menos
            5 agendamentos confirmados de clientes novos no primeiro mês, você não paga o
            módulo de IA no período seguinte.
          </p>
          <div class="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-sm text-gray-600">
            <span class="flex items-center gap-1.5">✅ Sem fidelidade</span>
            <span class="flex items-center gap-1.5">✅ Validação automática pelo sistema</span>
            <span class="flex items-center gap-1.5">✅ Sem burocracia</span>
          </div>
          <p class="text-xs text-gray-400 mt-3">
            🔌 Disponível para quem usa o sistema de agenda SuaAgenda.
          </p>
        </div>

        <div class="max-w-3xl space-y-5 mb-10">
          <p class="text-xl text-gray-600 leading-relaxed">
            A SuaAgenda foi a primeira plataforma do Brasil a colocar uma IA analisando seu histórico de agendamentos e criando campanhas segmentadas por serviço no Google Ads — otimizando tudo automaticamente toda semana, sem você precisar entender de tráfego.
          </p>
          <p class="text-lg text-gray-500 leading-relaxed">
            Enquanto você corta cabelo, a nossa Inteligência Artificial capta, agenda e registra. No fim do mês, você vê exatamente quantos clientes novos a campanha trouxe e o que ela ajustou pra melhorar.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mb-12">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="flex items-start gap-3 rounded-2xl border border-black/[.08] bg-white p-5 shadow-sm"
          >
            <div class="text-2xl shrink-0">{{ benefit.emoji }}</div>
            <div>
              <p class="font-bold text-[#0f0f0f] text-[15px] mb-2">{{ benefit.title }}</p>
              <p class="text-sm text-gray-500 leading-relaxed">{{ benefit.desc }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <a
            :href="wppLinkBase"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-green-600 text-white text-base font-bold transition hover:bg-green-700 hover:-translate-y-0.5 shadow-md"
          >
            🚀 Quero lotar minha agenda agora !
          </a>
        </div>

        <div class="mt-8 flex flex-wrap gap-4 text-xs text-gray-400">
          <span class="flex items-center gap-1">✅ Cancele quando quiser</span>
        </div>

      </div>
    </section>

    <!-- PIONEIRA NO BRASIL -->
    <section class="w-full py-16 px-4 md:px-16 bg-green-600">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          <div class="md:col-span-2">
            <span class="text-xs font-bold tracking-widest uppercase text-green-100">Ineditismo</span>
            <h2
              class="mt-3 mb-4 font-black leading-none text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,48px)"
            >
              NENHUMA OUTRA PLATAFORMA NO BRASIL<br>
              FAZ ISSO POR BARBEARIA.
            </h2>
            <p class="text-green-50 text-[15px] leading-relaxed max-w-2xl">
              Gestão de tráfego pago com IA sempre foi coisa de agência cara, feita
              pra franquia ou negócio grande. A SuaAgenda foi a primeira a colocar
              agenda, cliente e campanha de Google Ads dentro de uma única IA —
              disponível pra qualquer barbeiro, em qualquer cidade do Brasil.
            </p>
          </div>

          <div class="rounded-2xl bg-white/10 border border-white/20 p-6 text-center shrink-0">
            <p class="text-green-100 text-xs uppercase tracking-widest mb-2">Combo inédito</p>
            <p class="font-black text-white leading-none" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,5vw,52px)">
              IA + Ads
            </p>
            <p class="text-green-100 text-xs mt-2">criado 100% pra barbearia</p>
          </div>

        </div>
      </div>
    </section>

    <!-- COMO A IA TRABALHA -->
    <section class="w-full py-20 px-4 md:px-16 bg-white border-y border-black/[.07]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-600">SuaAgenda IA</span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-[#0f0f0f]"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          UMA IA QUE CONHECE<br>
          <span class="text-green-600">SUA BARBEARIA DE VERDADE.</span>
        </h2>
        <p class="text-gray-500 text-[15px] max-w-2xl mb-12 leading-relaxed">
          Antes de criar qualquer anúncio, a SuaAgenda IA lê seu histórico — quais serviços você mais faz, qual o ticket médio de cada um, quais horários têm mais agendamentos. Só depois monta a campanha.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div
            v-for="step in iaSteps"
            :key="step.title"
            class="rounded-2xl border bg-[#f8f7f4] p-7 relative overflow-hidden"
            :class="step.highlight ? 'border-green-300 bg-green-50' : 'border-black/[.08]'"
          >
            <div class="text-3xl mb-5">{{ step.emoji }}</div>
            <p class="text-[10px] font-bold uppercase tracking-widest mb-2"
              :class="step.highlight ? 'text-green-600' : 'text-gray-400'">
              {{ step.badge }}
            </p>
            <h3 class="text-lg font-bold text-[#0f0f0f] mb-3">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

        <div class="rounded-2xl border border-green-200 bg-green-50 overflow-hidden max-w-3xl">
          <div class="flex items-center justify-between px-5 py-4 border-b border-green-100 bg-white/60">
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center text-white text-xs font-black">IA</span>
              <span class="text-sm font-bold text-[#0f0f0f]">Exemplo real — como a IA segmenta</span>
            </div>
            <span class="text-xs text-gray-400">por serviço</span>
          </div>
          <div class="p-5 space-y-3">
            <div
              v-for="seg in segmentacaoExemplo"
              :key="seg.servico"
              class="flex items-center justify-between gap-4 rounded-xl px-4 py-3 border"
              :class="seg.anuncia ? 'bg-white border-green-200' : 'bg-white/50 border-black/[.06]'"
            >
              <div class="flex items-center gap-3 min-w-0">
                <span class="text-lg shrink-0">{{ seg.anuncia ? '✅' : '⏸️' }}</span>
                <div class="min-w-0">
                  <p class="text-[15px] font-bold" :class="seg.anuncia ? 'text-[#0f0f0f]' : 'text-gray-400'">{{ seg.servico }}</p>
                  <p class="text-xs text-gray-400">Ticket: {{ seg.ticket }}</p>
                </div>
              </div>
              <span
                class="text-xs font-bold px-3 py-1 rounded-full shrink-0"
                :class="seg.anuncia ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'"
              >
                {{ seg.status }}
              </span>
            </div>
          </div>
          <p class="text-xs text-gray-400 px-5 pb-4 leading-relaxed">
            A SuaAgenda IA só anuncia serviços onde o ticket cobre o custo de aquisição estimado. Verba zero desperdiçada.
          </p>
        </div>

      </div>
    </section>

    <!-- POR QUE GOOGLE ADS -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#f8f7f4]">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-green-600">Por que só Google Ads</span>
            <h2
              class="mt-3 mb-6 font-black leading-none text-[#0f0f0f]"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,56px)"
            >
              QUEM PESQUISA<br>
              <span class="text-green-600">JÁ QUER CORTAR.</span><br>
              VOCÊ APARECE PRIMEIRO.
            </h2>
            <div class="space-y-5 text-gray-600 text-[16px] leading-relaxed">
              <p>No Google, o cliente já está com a intenção de agendar. Ele digita "barbearia perto de mim" — e o seu nome aparece antes de qualquer concorrente.</p>
              <p>Diferente do Instagram ou Facebook, você não precisa convencer ninguém. A pessoa já decidiu que quer cortar. É só estar lá na hora certa.</p>
              <p>Por isso focamos 100% no Google: é o canal com maior intenção de compra, menor desperdício de verba e mais fácil de padronizar para barbearias em qualquer cidade do Brasil.</p>
            </div>
          </div>

          <div class="space-y-3 mt-8 md:mt-0">
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-4">Como você aparece no Google</p>

            <div class="rounded-2xl border border-green-200 bg-white p-5 relative shadow-sm">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="text-[10px] font-bold border border-green-300 text-green-700 bg-green-50 px-2 py-0.5 rounded shrink-0">Anúncio</span>
                <span class="text-xs text-gray-400 truncate">suaagenda.link/barbearia</span>
              </div>
              <p class="text-[15px] font-bold text-green-700 mb-1">Barbearia em [Cidade] — Agende Online Agora</p>
              <p class="text-sm text-gray-500">Agenda online 24h · Confirmação automática · Sem espera · Marque seu horário agora.</p>
              <div class="absolute top-3 right-3 text-[10px] text-green-600 font-bold tracking-widest">TOPO</div>
            </div>

            <div class="rounded-2xl border border-black/[.06] bg-white/50 p-5 opacity-40">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold border border-gray-300 text-gray-500 px-2 py-0.5 rounded shrink-0">Anúncio</span>
                <span class="text-xs text-gray-400">concorrente.com.br</span>
              </div>
              <p class="text-[15px] font-bold text-gray-500 mb-1">Barbearia — Entre em contato</p>
              <p class="text-sm text-gray-400">Horários disponíveis. Ligue agora.</p>
            </div>

            <div class="rounded-2xl border border-black/[.08] bg-white p-5 shadow-sm">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Google Perfil da Empresa</p>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700 font-black text-lg shrink-0">B</div>
                <div>
                  <p class="text-[15px] font-bold text-[#0f0f0f]">Sua Barbearia</p>
                  <p class="text-xs text-yellow-500 mb-1">★★★★★ <span class="text-gray-400">4,9 (128 avaliações)</span></p>
                  <p class="text-xs text-gray-400">Barbearia · Aberto agora · 1,2 km</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
          <div
            v-for="gstat in googleStats"
            :key="gstat.label"
            class="rounded-2xl border border-green-100 bg-white p-5 text-center shadow-sm"
          >
            <p
              class="font-black text-green-600 leading-none mb-2"
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
    <section class="w-full py-20 px-4 md:px-16 bg-white border-y border-black/[.07]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-600">Como funciona</span>
        <h2
          class="mt-3 mb-10 font-black leading-none text-[#0f0f0f]"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          DO CLIQUE<br>
          <span class="text-green-600">AO AGENDAMENTO REGISTRADO.</span>
        </h2>

        <div class="max-w-3xl mx-auto mb-16">
          <div v-for="(step, idx) in funnelSteps" :key="step.title" class="flex flex-col items-center">
            <div
              class="w-full flex items-center gap-4 rounded-2xl border border-black/[.08] bg-[#f8f7f4] p-5 transition-all"
              :class="step.highlight ? 'border-green-200 bg-green-50' : ''"
              :style="isMobile ? '' : `max-width: ${100 - idx * 7}%`"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                :class="step.highlight ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'"
              >
                {{ idx + 1 }}
              </div>
              <div class="min-w-0">
                <p class="font-bold text-[#0f0f0f] text-[15px]">{{ step.title }}</p>
                <p class="text-sm text-gray-500 mt-0.5 leading-relaxed">{{ step.desc }}</p>
              </div>
              <span v-if="step.ia" class="ml-auto shrink-0 text-[10px] font-bold px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">IA</span>
            </div>
            <div v-if="idx < funnelSteps.length - 1" class="text-green-400 text-2xl my-1">↓</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="step in howItWorks" :key="step.title" class="rounded-2xl border border-black/[.08] bg-[#f8f7f4] p-7">
            <div class="text-3xl mb-5">{{ step.emoji }}</div>
            <h3 class="text-lg font-bold text-[#0f0f0f] mb-3">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- OTIMIZAÇÃO SEMANAL -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#f8f7f4] border-b border-black/[.07]" id="otimizacao">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-600">Otimização automática</span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-[#0f0f0f]"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          TODA SEMANA A IA<br>
          <span class="text-green-600">MELHORA SUA CAMPANHA.</span>
        </h2>
        <p class="text-gray-500 text-[15px] max-w-2xl mb-12 leading-relaxed">
          Nenhuma campanha nasce perfeita. A SuaAgenda IA analisa o que está convertendo, pausa o que está desperdiçando verba e ajusta automaticamente — sem você precisar fazer nada.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div
            v-for="ot in otimizacoes"
            :key="ot.title"
            class="rounded-2xl border border-black/[.08] bg-white p-6 flex items-start gap-4 shadow-sm"
          >
            <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700 text-xl shrink-0">{{ ot.emoji }}</div>
            <div>
              <p class="font-bold text-[#0f0f0f] text-[15px] mb-1">{{ ot.title }}</p>
              <p class="text-sm text-gray-500 leading-relaxed">{{ ot.desc }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-black/[.08] bg-white overflow-hidden max-w-2xl shadow-sm">
          <div class="flex items-center justify-between px-5 py-4 border-b border-black/[.06] bg-[#f8f7f4]">
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center text-white text-xs font-black">IA</span>
              <span class="text-sm font-bold text-[#0f0f0f]">SuaAgenda IA · Análise semanal</span>
            </div>
            <span class="text-xs text-gray-400">Automático</span>
          </div>
          <div class="p-5 space-y-3">
            <div class="rounded-xl bg-green-50 border border-green-200 p-4">
              <p class="text-sm text-gray-700 leading-relaxed">
                ✦ <strong class="text-[#0f0f0f]">Corte + Barba</strong> teve CPL de R$14 esta semana — melhor que a média. Aumentei o lance em 20% nesse grupo.
              </p>
            </div>
            <div class="rounded-xl bg-gray-50 border border-black/[.06] p-4">
              <p class="text-sm text-gray-500 leading-relaxed">
                ⏸ <strong class="text-gray-600">Relaxamento</strong> gerou 0 agendamentos em 7 dias. Pausei temporariamente para não queimar verba.
              </p>
            </div>
            <div class="rounded-xl bg-gray-50 border border-black/[.06] p-4">
              <p class="text-sm text-gray-500 leading-relaxed">
                🔍 Adicionei 3 novas palavras-chave com base nas buscas que trouxeram cliques: <strong class="text-gray-600">"barbearia navalhado centro"</strong>, <strong class="text-gray-600">"corte masculino degradê"</strong>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- O QUE INCLUI / NÃO INCLUI -->
    <section class="w-full py-20 px-4 md:px-16 bg-white" id="escopo">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-600">Escopo do serviço</span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-[#0f0f0f]"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          O QUE ESTÁ<br>
          <span class="text-green-600">DENTRO E FORA DO PLANO</span>
        </h2>
        <p class="text-gray-500 mb-10 text-[15px] max-w-2xl">
          Transparência total. Você sabe exatamente o que contratou e por que o serviço custa o que custa.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="rounded-2xl border border-green-200 bg-green-50 p-5 sm:p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-black text-sm shrink-0">✓</span>
              <h3 class="text-lg font-bold text-[#0f0f0f]">Incluso no plano</h3>
            </div>
            <div class="space-y-4">
              <div v-for="item in included" :key="item.title" class="flex items-start gap-3">
                <span class="text-green-600 mt-0.5 shrink-0">→</span>
                <div>
                  <p class="text-[15px] font-bold text-[#0f0f0f]">{{ item.title }}</p>
                  <p class="text-sm text-gray-500 mt-0.5 leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-black/[.08] bg-[#f8f7f4] p-5 sm:p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-black text-sm shrink-0">✕</span>
              <h3 class="text-lg font-bold text-gray-500">Fora do escopo</h3>
            </div>
            <div class="space-y-4">
              <div v-for="item in notIncluded" :key="item.title" class="flex items-start gap-3">
                <span class="text-gray-400 mt-0.5 shrink-0">→</span>
                <div>
                  <p class="text-[15px] font-bold text-gray-500">{{ item.title }}</p>
                  <p class="text-sm text-gray-400 mt-0.5 leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
            </div>
            <div class="mt-6 rounded-xl bg-white border border-black/[.06] p-4">
              <p class="text-xs text-gray-400 leading-relaxed">
                O foco em Google Ads é intencional. Ele reduz a complexidade operacional e permite padronizar a campanha para qualquer barbearia, mantendo o preço acessível.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- PROJEÇÃO FINANCEIRA -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#f8f7f4]" id="projecao">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-600">Projeção de resultados</span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-[#0f0f0f]"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          O QUE ESPERAR<br>
          <span class="text-green-600">NOS PRIMEIROS 3 MESES</span>
        </h2>
        <p class="text-gray-500 mb-10">Exemplo com R$ 300 de verba no Google Ads e ticket médio de R$ 45.</p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <div v-for="metric in projectionMetrics" :key="metric.label">
            <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{{ metric.label }}</p>
            <div v-for="(bar, idx) in metric.bars" :key="idx" class="mb-3">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-500">Mês {{ idx + 1 }}</span>
                <span class="text-[#0f0f0f] font-bold">{{ bar.value }}</span>
              </div>
              <div class="h-2 bg-black/[.06] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all bg-green-500"
                  :style="`width: ${bar.pct}%; opacity: ${0.4 + idx * 0.25}`"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div
            v-for="(month, idx) in revenueMonths"
            :key="month.label"
            class="rounded-2xl p-6 text-center border shadow-sm"
            :class="idx === 2 ? 'border-green-300 bg-green-50' : 'border-black/[.08] bg-white'"
          >
            <p class="text-xs uppercase tracking-widest text-gray-400 mb-1">{{ month.label }}</p>
            <p class="text-sm text-gray-400 mb-4">{{ month.clients }} novos clientes</p>
            <p
              class="font-black leading-none"
              :class="idx === 2 ? 'text-green-600' : 'text-[#0f0f0f]'"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,6vw,48px)"
            >
              {{ month.revenue }}
            </p>
            <p class="text-xs text-gray-400 mt-2">faturamento estimado</p>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border border-black/[.08] bg-white p-5 max-w-2xl shadow-sm">
          <p class="text-sm text-gray-500 leading-relaxed">
            ⚡ Esses valores consideram apenas <strong class="text-gray-700">novos clientes</strong>. Com retenção e retorno dos clientes existentes, o faturamento real tende a ser consideravelmente maior.
          </p>
        </div>

      </div>
    </section>

    <!-- VALOR REAL DO CLIENTE -->
    <section class="w-full py-20 px-4 md:px-16 bg-white border-t border-black/[.07]" id="valor-real">
      <div class="max-w-5xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-600">O que muitos barbeiros não calculam</span>
        <h2
          class="mt-3 mb-6 font-black leading-none text-[#0f0f0f]"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,58px)"
        >
          O VALOR REAL NÃO ESTÁ<br>
          NO PRIMEIRO CORTE
        </h2>
        <p class="text-gray-600 text-lg max-w-3xl mb-12">
          Quando um novo cliente entra na sua barbearia, o retorno não acontece só naquele atendimento. O verdadeiro lucro vem da recorrência dos próximos meses.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="rounded-2xl border border-black/[.08] bg-[#f8f7f4] p-5 text-center">
            <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">Cliente novo</p>
            <p class="font-black text-[#0f0f0f]" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,6vw,52px)">1</p>
          </div>
          <div class="rounded-2xl border border-black/[.08] bg-[#f8f7f4] p-5 text-center">
            <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">Ticket médio</p>
            <p class="font-black text-green-600" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,4vw,52px)">R$45</p>
          </div>
          <div class="rounded-2xl border border-black/[.08] bg-[#f8f7f4] p-5 text-center">
            <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">Frequência média</p>
            <p class="font-black text-[#0f0f0f]" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,6vw,52px)">2x</p>
            <p class="text-xs text-gray-400">cortes por mês</p>
          </div>
          <div class="rounded-2xl border border-green-300 bg-green-50 p-5 text-center">
            <p class="text-xs uppercase tracking-widest text-green-600 mb-2">Valor anual</p>
            <p class="font-black text-green-600" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(22px,3.5vw,52px)">R$1.080</p>
          </div>
        </div>

        <div class="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8">
          <h3 class="font-black text-[#0f0f0f] mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,4vw,40px)">
            CADA CLIENTE NOVO VALE MAIS DO QUE PARECE
          </h3>
          <p class="text-gray-600 text-lg leading-relaxed mb-6">
            Com 8 novos clientes captados em um mês, por exemplo, isso representa:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div class="rounded-xl bg-white border border-black/[.08] p-5 text-center">
              <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">Clientes captados</p>
              <p class="text-4xl font-black text-[#0f0f0f]">8</p>
            </div>
            <div class="rounded-xl bg-white border border-black/[.08] p-5 text-center">
              <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">Valor anual por cliente</p>
              <p class="text-3xl font-black text-[#0f0f0f]">R$1.080</p>
            </div>
            <div class="rounded-xl bg-white border border-green-200 p-5 text-center">
              <p class="text-xs uppercase tracking-widest text-green-600 mb-2">Receita potencial</p>
              <p class="text-3xl font-black text-green-600">R$8.640</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- INVESTIMENTO — PLANOS GROWTH -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#f8f7f4] border-t border-black/[.07]" id="investimento">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-600">Investimento</span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-[#0f0f0f]"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,56px)"
        >
          TRÊS PARTES.<br>
          <span class="text-green-600">UM SISTEMA SÓ.</span>
        </h2>
        <p class="text-gray-500 text-[15px] leading-relaxed max-w-2xl mb-10">
          Entenda exatamente o que você está pagando, pra quem, e por quê cada parte existe.
        </p>

        <!-- PASSO 1 -->
        <div class="rounded-2xl border border-black/[.08] bg-white p-6 sm:p-8 mb-4 shadow-sm">
          <p class="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">
            1 · Escolha o plano Growth (sistema + IA inclusos)
          </p>

          <div v-if="plansLoading" class="flex items-center gap-3 text-sm text-gray-400">
            <div class="w-4 h-4 rounded-full border-2 border-green-200 border-t-green-500 animate-spin" />
            Carregando planos...
          </div>

          <div v-else-if="plansError" class="text-sm text-red-500">
            Não foi possível carregar os planos.
            <button @click="loadGrowthPlans" class="underline ml-2 text-green-600">Tentar novamente</button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              v-for="plan in growthPlans"
              :key="plan.id"
              @click="selectedPlanId = plan.id"
              type="button"
              class="rounded-xl border p-5 text-left transition-all flex flex-col gap-2"
              :class="selectedPlanId === plan.id
                ? 'border-green-400 bg-green-50 ring-2 ring-green-200'
                : 'border-black/[.08] bg-[#f8f7f4] hover:border-black/20'"
            >
              <div class="flex items-center justify-between gap-1 flex-wrap">
                <span
                  class="text-[10px] font-bold uppercase tracking-widest"
                  :class="selectedPlanId === plan.id ? 'text-green-600' : 'text-gray-400'"
                >
                  {{ plan.name }}
                </span>
                <span
                  v-if="plan.isPopular"
                  class="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200"
                >
                  Popular
                </span>
              </div>
              <p
                class="font-black leading-none"
                :class="selectedPlanId === plan.id ? 'text-green-600' : 'text-[#0f0f0f]'"
                style="font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,3vw,28px)"
              >
                {{ plan.price === 0 ? 'Sob consulta' : `R$ ${fmt(plan.price)}/mês` }}
              </p>
              <p class="text-[11px] text-gray-400 leading-snug">{{ plan.description }}</p>
              <div v-if="plan.highlights?.length" class="mt-1 space-y-1">
                <p
                  v-for="h in plan.highlights"
                  :key="h"
                  class="text-[11px] text-gray-500 flex items-center gap-1.5"
                >
                  <span class="text-green-500">✓</span> {{ h }}
                </p>
              </div>
              <p v-if="plan.noGuarantee" class="text-[10px] text-amber-600 flex items-start gap-1 mt-1.5 leading-snug">
                <span class="shrink-0">⚠️</span> Sem sistema próprio — não elegível à garantia de 30 dias
              </p>
            </button>
          </div>

          <p class="text-xs text-gray-400 mt-4">
            ✨ Planos Growth incluem sistema + IA + Google Ads em um único pacote.
            <NuxtLink to="/barbearia/gestao-de-trafego/agencias" class="text-green-600 hover:text-green-700 underline underline-offset-2 ml-1">
              É agência? Veja condições especiais →
            </NuxtLink>
          </p>
        </div>

        <!-- PASSO 2 -->
        <div class="rounded-2xl border border-black/[.08] bg-white p-6 sm:p-8 mb-4 shadow-sm">
          <p class="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">
            2 · Qual será sua verba mensal no Google Ads?
          </p>
          <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-3">
            <input
              type="range"
              v-model="investBudget"
              min="300"
              max="5000"
              step="100"
              class="w-full sm:flex-1 accent-green-600"
            />
            <span
              class="font-black text-green-600 sm:shrink-0"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,4vw,28px)"
            >
              R$ {{ Number(investBudget).toLocaleString('pt-BR') }}/mês
            </span>
          </div>
          <!--
            Régua de referência — posicionada com left calculado (não flex justify-between),
            pra cada valor cair exatamente no ponto real da escala min=300/max=5000 do slider
            acima. Com justify-between os labels ficam igualmente espaçados visualmente, mas
            os VALORES não são lineares nessa escala — causava desalinhamento entre o que o
            label dizia e onde a thumb do slider realmente estava.

            Cada `left` também compensa a largura física do thumb nativo (~16px): o CENTRO
            do thumb não percorre 0%–100% da largura do track, e sim de (raio) até
            (100% - raio), porque ele não pode passar da borda. Sem essa compensação os
            labels do meio (1.500/3.000) ficavam visivelmente fora do ponto real — só as
            pontas (300/5.000) coincidiam por sorte de simetria.
          -->
          <div class="relative h-4 text-xs text-gray-400 mb-3">
            <span class="absolute" style="left: calc(0.000% + 8px); transform: translateX(-8px)">R$ 300</span>
            <span class="absolute" style="left: calc(25.532% + 3.91px); transform: translateX(-50%)">R$ 1.500</span>
            <span class="absolute" style="left: calc(57.447% - 1.19px); transform: translateX(-50%)">R$ 3.000</span>
            <span class="absolute" style="left: calc(100% - 8px); transform: translateX(calc(-100% + 8px))">R$ 5.000+</span>
          </div>
          <p class="text-xs text-gray-400 mb-5">
            💡 R$ 300/mês (≈ R$ 10/dia) é o mínimo recomendado para a IA ter dados suficientes
            pra otimizar a campanha — e é o valor que vale a garantia de 30 dias.
          </p>
          <p class="text-xs text-gray-400">
            💳 A verba vai diretamente para o Google — não passa por nós.
          </p>
        </div>

        <!-- TOTAL + CTA -->
        <div
          class="rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm"
          :class="selectedPlanData?.price === 0 ? 'border-yellow-300 bg-yellow-50' : 'border-green-300 bg-green-50'"
        >
          <div class="flex-1">
            <p class="text-xs uppercase tracking-widest mb-1"
              :class="selectedPlanData?.price === 0 ? 'text-yellow-600' : 'text-green-600'">
              Investimento total estimado / mês
            </p>

            <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2 mb-3">
              <span>
                🤖 Plano Growth:
                <strong class="text-gray-700">
                  {{ selectedPlanData ? (selectedPlanData.price === 0 ? 'sob consulta' : `R$ ${fmt(selectedPlanData.price)}`) : 'selecione o plano' }}
                </strong>
              </span>
              <span>
                💳 Verba:
                <strong class="text-gray-700">R$ {{ Number(investBudget).toLocaleString('pt-BR') }}</strong>
              </span>
            </div>

            <p
              class="font-black leading-none"
              :class="selectedPlanData?.price === 0 ? 'text-yellow-700' : 'text-green-700'"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,4vw,36px)"
            >
              {{ totalInvestDisplay }}
            </p>

            <p v-if="!selectedPlanId" class="text-xs text-gray-400 mt-1">
              ↑ Selecione um plano acima para ver o total completo
            </p>
          </div>

          <div class="flex flex-col gap-2 shrink-0">
            <a
              :href="ctaWhatsappUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base transition hover:-translate-y-0.5 shadow-md"
              :class="selectedPlanData?.price === 0
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-green-600 text-white hover:bg-green-700'"
            >
              🚀 Quero começar agora
            </a>
            <p class="text-[11px] text-gray-400 text-center">Sem cartão · 30 dias de garantia</p>
          </div>
        </div>

      </div>
    </section>

    <!-- RELATÓRIO INTEGRADO -->
    <section class="w-full py-20 px-4 md:px-16 bg-white border-y border-black/[.07]" id="relatorio">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-600">Transparência total</span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-[#0f0f0f]"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,56px)"
        >
          VOCÊ VÊ O RESULTADO<br>
          <span class="text-green-600">DENTRO DO SEU PAINEL.</span>
        </h2>
        <p class="text-gray-600 text-[16px] leading-relaxed max-w-2xl mb-12">
          Enquanto uma agência tradicional entrega um PDF no fim do mês, você vê os dados de campanha integrados direto na sua agenda — em tempo real.
        </p>

        <div class="rounded-2xl border border-black/[.08] bg-[#f8f7f4] overflow-hidden max-w-3xl shadow-sm">
          <div class="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-black/[.06] bg-white gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center text-white font-black text-xs">S</div>
              <span class="text-sm font-bold text-[#0f0f0f] truncate">SuaAgenda · Relatório Mensal</span>
            </div>
            <span class="text-xs text-gray-400 shrink-0">SuaAgenda IA</span>
          </div>

          <div class="p-4 sm:p-6 border-b border-black/[.06]">
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-3">Resumo da campanha — Junho</p>
            <div class="rounded-xl bg-green-50 border border-green-200 p-4">
              <p class="text-sm text-gray-700 leading-relaxed">
                ✦ Sua campanha gerou <strong class="text-[#0f0f0f]">126 cliques</strong>, <strong class="text-[#0f0f0f]">9 agendamentos</strong> e <strong class="text-[#0f0f0f]">6 novos clientes</strong> este mês. Estimativa de receita gerada: <strong class="text-green-700">R$ 270</strong>.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 divide-black/[.05]">
            <div
              v-for="(ds, idx) in reportStats"
              :key="ds.label"
              class="p-5 text-center border-black/[.05]"
              :class="[
                idx % 2 === 0 && idx < reportStats.length - 1 ? 'border-r' : '',
                idx < 2 ? 'border-b sm:border-b-0' : '',
                idx > 0 && idx < 3 ? 'sm:border-r' : ''
              ]"
            >
              <p class="text-xs text-gray-400 uppercase tracking-widest mb-2">{{ ds.label }}</p>
              <p
                class="font-black leading-none"
                :class="ds.green ? 'text-green-600' : 'text-[#0f0f0f]'"
                style="font-family:'Bebas Neue',sans-serif;font-size:clamp(18px,4vw,28px)"
              >
                {{ ds.value }}
              </p>
            </div>
          </div>
        </div>

        <p class="text-xs text-gray-400 mt-4 max-w-xl">* Painel fictício para fins ilustrativos.</p>
      </div>
    </section>

    <!-- DIFERENCIAIS -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#f8f7f4]" id="diferenciais">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

        <div>
          <span class="text-xs font-bold tracking-widest uppercase text-green-600">Diferencial</span>
          <h2
            class="mt-3 mb-8 font-black leading-none text-[#0f0f0f]"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,56px)"
          >
            NÃO ENTREGAMOS<br>
            <span class="text-green-600">CLIQUES.</span><br>
            ENTREGAMOS CLIENTES.
          </h2>

          <div class="space-y-3">
            <div
              v-for="(diff, idx) in differentials"
              :key="diff"
              class="flex items-center gap-3 rounded-xl border px-4 py-4 shadow-sm"
              :class="idx === 0 ? 'border-green-300 bg-green-50' : 'border-black/[.08] bg-white'"
            >
              <span class="font-black text-lg shrink-0" :class="idx === 0 ? 'text-green-700' : 'text-green-600'">{{ idx === 0 ? '🏆' : '✓' }}</span>
              <span class="text-[15px]" :class="idx === 0 ? 'text-[#0f0f0f] font-bold' : 'text-gray-700'">{{ diff }}</span>
            </div>
          </div>

          <p class="mt-8 text-gray-500 text-[15px] leading-relaxed italic border-l-2 border-green-400 pl-5">
            "O que importa não é quantas pessoas viram o anúncio. O que importa é quantas sentaram na cadeira."
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-2xl border border-green-100 bg-white p-5 text-center shadow-sm"
          >
            <p
              class="font-black text-green-600 leading-none mb-2"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,5vw,48px)"
            >
              {{ stat.num }}
            </p>
            <p class="text-sm text-gray-500 leading-snug">{{ stat.label }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- COMPATIBILIDADE -->
    <CompatibilidadeSection />

    <!-- FAQ -->
    <section class="w-full py-20 px-4 md:px-16 bg-[#f8f7f4] border-t border-black/[.07]" id="faq">
      <div class="max-w-4xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-600 text-center block">Dúvidas comuns</span>
        <h2
          class="mt-3 mb-12 font-black leading-none text-[#0f0f0f] text-center"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px)"
        >
          PERGUNTAS FREQUENTES
        </h2>

        <div class="space-y-3">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="rounded-2xl border border-black/[.08] bg-white overflow-hidden shadow-sm"
          >
            <button
              @click="faq.open = !faq.open"
              class="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-[#f8f7f4]"
            >
              <span class="font-bold text-[#0f0f0f] text-[16px] sm:text-[17px] pr-4">{{ faq.question }}</span>
              <span class="text-green-600 text-xl shrink-0 ml-4">{{ faq.open ? '−' : '+' }}</span>
            </button>
            <div v-show="faq.open" class="px-5 sm:px-6 pb-5 sm:pb-6">
              <div class="pt-2 border-t border-black/[.06] text-gray-600 text-[15px] leading-relaxed space-y-3">
                <p v-for="(paragraph, pIdx) in faq.answer" :key="pIdx">{{ paragraph }}</p>
                <div v-if="faq.note" class="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                  💡 {{ faq.note }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="w-full py-24 px-4 md:px-16 bg-white border-t border-black/[.07]">
      <div class="max-w-2xl mx-auto text-center">

        <h2
          class="font-black leading-none text-[#0f0f0f] mb-4"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,5vw,72px)"
        >
          PRONTO PARA<br>
          <span class="text-green-600">LOTAR SUA AGENDA?</span>
        </h2>

        <div class="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8 max-w-md mx-auto">
          <p class="text-green-700 font-bold text-lg">🛡️ Garantia de 30 dias</p>
          <p class="text-gray-600 text-sm">
            Investindo pelo menos R$ 10/dia, se a campanha não gerar pelo menos 5 agendamentos
            confirmados de clientes novos nos primeiros 30 dias, você não paga o módulo de IA
            no período seguinte.
          </p>
          <p class="text-gray-500 text-xs mt-2">
            Tudo validado automaticamente pelos agendamentos registrados no sistema.
            Sem formulários. Sem discussão. Sem burocracia.
          </p>
          <p class="text-gray-400 text-[11px] mt-2">
            🔌 Disponível para quem usa o sistema SuaAgenda — a validação é automática pelos
            agendamentos da própria plataforma.
          </p>
          <div class="h-px bg-black/[.06] my-3"></div>
          <p class="text-green-700 font-bold text-lg">Sem fidelidade</p>
          <p class="text-gray-600 text-sm">Cancele quando quiser, sem multa. Sua verba vai direto pro Google — a gente não toca nela.</p>
        </div>

        <div class="flex flex-wrap gap-4 justify-center">
          <a
            :href="wppLinkBase"
            class="inline-flex items-center gap-2 px-8 py-5 rounded-2xl bg-green-600 text-white text-lg font-bold transition hover:bg-green-700 hover:-translate-y-0.5 shadow-lg"
          >
            🚀 Quero lotar minha agenda agora !
          </a>
        </div>

        <p class="text-xs text-gray-400 mt-6">
          Sem fidelidade. Cancele quando quiser. Sua verba do Google Ads vai direto pro Google.
        </p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import CompatibilidadeSection from '@/components/CompatibilidadeSection.vue'

definePageMeta({ layout: 'landing' })

const wppLinkBase = 'https://wa.me/5511941649284?text=Quero%20testar%20a%20SuaAgenda%20IA%20com%20garantia%20de%2030%20dias'

const isMobile     = ref(false)
const investBudget = ref(300)

interface GrowthPlan {
  id:           number
  name:         string
  description:  string
  price:        number
  isPopular:    boolean
  highlights?:  string[]
  noGuarantee?: boolean // true para planos sem o sistema de agenda SuaAgenda (sem dados pra validar a garantia)
}

const GROWTH_PLAN_IDS = new Set([6, 7, 8, 9, 10])

const GROWTH_HIGHLIGHTS: Record<number, string[]> = {
  6:  ['1 profissional', 'IA Google Ads', 'Verba até R$300'],
  7:  ['Até 3 profissionais', 'IA Google Ads', 'Verba até R$500'],
  8:  ['Até 6 profissionais', 'IA + otimização', 'Verba até R$1.000'],
  9:  ['Profissionais ilimitados', 'IA avançada', 'Verba ilimitada'],
  10: ['Somente IA + Google Ads', 'Sem sistema de agenda', 'Verba até R$300'],
}

// Planos sem o sistema de agenda SuaAgenda — sem dados próprios de
// agendamento, não há como validar a garantia de 30 dias automaticamente.
const GROWTH_NO_GUARANTEE_PLAN_IDS = new Set([10])

const config       = useRuntimeConfig()
const plansLoading = ref(false)
const plansError   = ref(false)
const growthPlans  = ref<GrowthPlan[]>([])
const selectedPlanId = ref<number | null>(null)

const selectedPlanData = computed(() =>
  growthPlans.value.find(p => p.id === selectedPlanId.value) ?? null
)

async function loadGrowthPlans() {
  plansLoading.value = true
  plansError.value   = false
  try {
    const res  = await fetch(`${config.public.plansApiBase}/plans/public`)
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
        noGuarantee: GROWTH_NO_GUARANTEE_PLAN_IDS.has(Number(p.id)),
      }))

    const popular = growthPlans.value.find(p => p.isPopular)
    selectedPlanId.value = popular?.id ?? growthPlans.value[0]?.id ?? null
  } catch (e) {
    console.error('[loadGrowthPlans]', e)
    plansError.value = true
  } finally {
    plansLoading.value = false
  }
}

function fmt(n: number): string {
  return Number(n).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const totalInvestDisplay = computed(() => {
  const plan  = selectedPlanData.value
  if (!plan) return `R$ ${Number(investBudget.value).toLocaleString('pt-BR')}/mês`
  if (plan.price === 0) return 'A consultar'
  const total = plan.price + Number(investBudget.value)
  return `R$ ${total.toLocaleString('pt-BR')}/mês`
})

const ctaWhatsappUrl = computed(() => {
  const planName  = selectedPlanData.value?.name ?? 'sem plano'
  const planPrice = selectedPlanData.value
    ? (selectedPlanData.value.price === 0 ? 'sob consulta' : `R$${fmt(selectedPlanData.value.price)}/mês`)
    : 'a definir'
  const verba = `R$${Number(investBudget.value).toLocaleString('pt-BR')}/mês`
  const total = totalInvestDisplay.value

  const msg = `Olá! Quero começar com a SuaAgenda IA Growth.\n\n` +
    `📋 Plano: ${planName} (${planPrice})\n` +
    `💳 Verba Google Ads: ${verba}\n` +
    `📊 Total estimado: ${total}\n\n` +
    `Pode me ajudar a configurar?`

  return `https://wa.me/5511941649284?text=${encodeURIComponent(msg)}`
})

onMounted(() => {
  isMobile.value = window.innerWidth < 640
  window.addEventListener('resize', () => { isMobile.value = window.innerWidth < 640 })
  loadGrowthPlans()
})

// ── DADOS ESTÁTICOS ───────────────────────────────────────────────────────────

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

const reportStats = [
  { label: 'Cliques', value: '126', green: false },
  { label: 'Agendamentos', value: '9', green: false },
  { label: 'Novos clientes', value: '6', green: true },
  { label: 'Receita est.', value: 'R$270', green: true },
]

const differentials = [
  'Primeira plataforma do Brasil a unir agenda + IA + Google Ads num só sistema',
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

const faqs = ref([
  {
    open: false,
    question: '🚀 O que a SuaAgenda IA faz exatamente?',
    answer: [
      'A SuaAgenda IA cria, monitora e otimiza campanhas no Google Ads para trazer novos clientes para sua barbearia.',
      'Diferente de uma agência tradicional, a plataforma acompanha os resultados continuamente e ajusta as campanhas com apoio de inteligência artificial.',
      'Tudo foi pensado para que você não precise entender de marketing ou tráfego pago.'
    ],
    note: 'Seu foco continua sendo atender clientes. O nosso é ajudar a trazer mais deles.'
  },
  {
    open: false,
    question: '📈 Quantos clientes novos posso conseguir por mês?',
    answer: [
      'Não existe um número fixo porque os resultados dependem da sua cidade, concorrência, serviços oferecidos e investimento em anúncios.',
      'O objetivo da SuaAgenda IA é utilizar o orçamento disponível da forma mais eficiente possível para gerar o maior número de agendamentos possível dentro da sua região.',
      'Conforme a campanha coleta dados, a IA identifica o que gera mais clientes e otimiza automaticamente os anúncios.'
    ],
    note: 'Quanto melhor o mercado e o investimento disponível, maior tende a ser o potencial de crescimento.'
  },
  {
    open: false,
    question: '💰 Quanto preciso investir em anúncios?',
    answer: [
      'A recomendação mínima é de R$ 10 por dia — cerca de R$ 300 por mês.',
      'Com esse valor a IA já tem dados suficientes pra começar a otimizar a campanha de verdade. Abaixo disso, o volume de cliques fica baixo demais pra IA aprender o que funciona.',
      'O investimento vai direto pra sua conta do Google Ads e pode ser aumentado, reduzido ou pausado quando quiser.'
    ],
    note: 'Você mantém total controle do orçamento — o mínimo recomendado é só o ponto de partida pra IA ter o que trabalhar.'
  },
  {
    open: false,
    question: '🔌 Eu já uso AppBarber, Trinks, Booksy ou outro sistema. Funciona?',
    answer: [
      'Sim. Você pode continuar usando o sistema que já conhece.',
      'Basta possuir um link público de agendamento para que a IA envie os clientes diretamente para sua agenda.',
      'Não é necessário migrar dados, trocar de plataforma ou aprender um novo sistema.'
    ],
    note: 'Você mantém sua agenda atual e a IA cuida da captação.'
  },
  {
    open: false,
    question: '🤝 Sou barbeiro autônomo. Posso usar?',
    answer: [
      'Sim.',
      'A SuaAgenda IA funciona tanto para barbeiros autônomos quanto para barbearias com vários profissionais.',
      'Basta possuir um serviço ativo e uma forma de receber agendamentos.'
    ],
    note: 'Você não precisa ter uma equipe ou várias unidades para começar.'
  },
  {
    open: false,
    question: '🎯 Preciso entender de Google Ads para usar?',
    answer: [
      'Não.',
      'A configuração inicial é simples e guiada.',
      'Depois disso, a IA assume a maior parte do trabalho de criação, monitoramento e otimização das campanhas.'
    ],
    note: 'Você não precisa ser especialista em anúncios para começar.'
  },
  {
    open: false,
    question: '💸 O dinheiro dos anúncios fica com vocês?',
    answer: [
      'Não.',
      'A verba de anúncios é investida diretamente na sua própria conta do Google Ads.',
      'Você acompanha os gastos em tempo real e pode aumentar, reduzir ou pausar quando desejar.'
    ],
    note: 'O investimento é sempre seu e permanece sob seu controle.'
  },
  {
    open: false,
    question: '📅 Em quanto tempo começam a aparecer resultados?',
    answer: [
      'Na maioria dos casos, os anúncios começam a gerar visitas, contatos e agendamentos nos primeiros dias após a ativação.',
      'O desempenho tende a melhorar conforme a IA coleta dados e aprende quais buscas trazem mais clientes.',
      'O prazo pode variar conforme a cidade, concorrência e investimento disponível.'
    ],
    note: 'Quanto mais dados a IA recebe, melhores tendem a ser os resultados.'
  },
  {
    open: false,
    question: '🛡️ Como funciona a garantia?',
    answer: [
      'A campanha precisa permanecer ativa durante os 30 dias, com investimento de pelo menos R$ 10/dia (R$ 300/mês) — o mínimo recomendado pra IA ter dados suficientes pra otimizar.',
      'Os agendamentos precisam estar com status confirmado, registrados no sistema.',
      'Consideramos apenas clientes novos — que não tinham agendamento registrado antes do início da campanha.',
      'Se a meta mínima de 5 agendamentos não for atingida nesse período, o próximo ciclo do módulo de IA é isento de cobrança.',
      'A garantia está disponível para quem usa o sistema de agenda SuaAgenda. Como a validação é feita automaticamente pelos agendamentos registrados na própria plataforma, não conseguimos oferecer a mesma garantia para quem usa agendas externas (AppBarber, Trinks, Booksy, WhatsApp, caderno, etc.) — não temos como apurar confirmações, cancelamentos e clientes novos fora do nosso sistema.'
    ],
    note: 'Criamos essa garantia para reduzir o risco de quem está começando.'
  },
  {
    open: false,
    question: '🤔 Qual a diferença entre a SuaAgenda IA e uma agência de tráfego?',
    answer: [
      'Uma agência normalmente depende de análises e ajustes manuais realizados por uma equipe.',
      'A SuaAgenda IA foi construída para acompanhar os dados continuamente e automatizar boa parte da otimização das campanhas.',
      'Isso permite que pequenas barbearias tenham acesso a uma estrutura de marketing normalmente disponível apenas para empresas maiores.'
    ],
    note: 'Não é apenas gestão de anúncios. É uma plataforma de aquisição de clientes.'
  },
  {
    open: false,
    question: '🏆 Vocês são realmente os primeiros a fazer isso no Brasil?',
    answer: [
      'Sim. A SuaAgenda foi a primeira plataforma no Brasil a unir sistema de agenda, inteligência artificial e criação/otimização de campanhas no Google Ads num único produto voltado especificamente para barbearias.',
      'Antes, esse tipo de automação só existia em soluções genéricas de marketing, sem entender particularidades do setor — como ticket médio por serviço, sazonalidade de corte ou horário de pico.',
      'A SuaAgenda IA foi construída do zero pensando na realidade da barbearia brasileira.'
    ],
    note: 'Ineditismo não é slogan — é a arquitetura do produto.'
  },
  {
    open: false,
    question: '🔁 Posso cancelar quando quiser?',
    answer: [
      'Sim.',
      'Não existe fidelidade, multa contratual ou prazo mínimo de permanência.',
      'Você pode solicitar o cancelamento quando desejar.'
    ],
    note: 'Você mantém o controle da sua conta e do seu investimento.'
  }
])

useHead({
  title: 'SuaAgenda IA - A 1ª Plataforma do Brasil com IA + Google Ads pra Barbearia',
  meta: [
    { name: 'description', content: 'A SuaAgenda foi pioneira no Brasil ao unir agenda, IA e Google Ads em uma única plataforma para barbearias. Campanhas segmentadas por serviço, otimização automática toda semana e garantia de resultado em 30 dias.' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://suaagenda.link/barbearia/ia-google-ads' }],
})
</script>