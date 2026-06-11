<!-- pages/gestao-de-trafego/index.vue -->
<template>
  <div class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span>/</span>
          <span class="text-gray-400">Captação Automática</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
      <div
        class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse 55% 50% at 70% 40%,rgba(52,211,153,.07) 0%,transparent 70%)"
      />
      <div class="relative max-w-6xl mx-auto">

        <div class="flex flex-wrap gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
            🎯 Captação Automática
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            🔍 Google Ads + Sistema integrado
          </span>
        </div>

        <h1
          class="font-black leading-none mb-6 text-green-400"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,88px);letter-spacing:.03em"
        >
          NÃO É AGÊNCIA.<br>
          <span class="text-white">É CAPTAÇÃO AUTOMÁTICA.</span>
        </h1>

        <div class="max-w-3xl space-y-5 mb-10">
          <p class="text-xl text-gray-400 leading-relaxed">
            Google Ads integrado direto com sua agenda. Cada clique vira um agendamento registrado — sem você precisar responder mensagem, confirmar horário ou contratar ninguém.
          </p>
          <p class="text-lg text-gray-500 leading-relaxed">
            Enquanto você corta cabelo, o sistema capta, agenda e registra. No fim do mês, você vê exatamente quantos clientes novos a campanha trouxe.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mb-12">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="flex items-start gap-3 rounded-2xl border border-white/[.06] bg-[#181818] p-5"
          >
            <div class="text-2xl">{{ benefit.emoji }}</div>
            <div>
              <p class="font-bold text-white text-[15px] mb-2">{{ benefit.title }}</p>
              <p class="text-sm text-gray-500 leading-relaxed">{{ benefit.desc }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          
          <a  href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            🚀 Quero captar clientes automaticamente
          </a>
          <NuxtLink
            to="/barbearias"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            Ver barbearias →
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- POR QUE GOOGLE ADS -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0d0d0d] border-y border-white/5">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-green-400">
              Por que só Google Ads
            </span>
            <h2
              class="mt-3 mb-6 font-black leading-none text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,56px)"
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
          <div class="space-y-3">
            <p class="text-xs text-gray-600 uppercase tracking-widest mb-4">Como você aparece no Google</p>

            <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-5 relative">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold border border-green-400/40 text-green-400 px-2 py-0.5 rounded">Anúncio</span>
                <span class="text-xs text-gray-600">suaagenda.link/barbearia</span>
              </div>
              <p class="text-[15px] font-bold text-green-400 mb-1">Barbearia em [Cidade] — Agende Online Agora</p>
              <p class="text-sm text-gray-500">Agenda online 24h · Confirmação automática · Sem espera · Marque seu horário agora.</p>
              <div class="absolute top-3 right-3 text-[10px] text-green-400/60 font-bold tracking-widest">TOPO</div>
            </div>

            <div class="rounded-2xl border border-white/[.04] bg-[#141414] p-5 opacity-40">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold border border-gray-700 text-gray-600 px-2 py-0.5 rounded">Anúncio</span>
                <span class="text-xs text-gray-700">concorrente.com.br</span>
              </div>
              <p class="text-[15px] font-bold text-gray-600 mb-1">Barbearia — Entre em contato</p>
              <p class="text-sm text-gray-700">Horários disponíveis. Ligue agora.</p>
            </div>

            <div class="rounded-2xl border border-white/[.04] bg-[#181818] p-5">
              <p class="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Google Perfil da Empresa</p>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 font-black text-lg flex-shrink-0">B</div>
                <div>
                  <p class="text-[15px] font-bold text-white">Sua Barbearia</p>
                  <p class="text-xs text-yellow-400 mb-1">★★★★★ <span class="text-gray-500">4,9 (128 avaliações)</span></p>
                  <p class="text-xs text-gray-500">Barbearia · Aberto agora · 1,2 km</p>
                </div>
              </div>
            </div>

            <p class="text-xs text-gray-600 text-center pt-2">
              Perfil da Empresa otimizado + anúncios pagos no topo da busca
            </p>
          </div>

        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
          <div
            v-for="gstat in googleStats"
            :key="gstat.label"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-6 text-center"
          >
            <p
              class="font-black text-green-400 leading-none mb-2"
              style="font-family:'Bebas Neue',sans-serif;font-size:40px"
            >
              {{ gstat.num }}
            </p>
            <p class="text-sm text-gray-500 leading-snug">{{ gstat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA — FUNIL -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Como funciona
        </span>
        <h2
          class="mt-3 mb-10 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
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
              class="w-full flex items-center gap-4 rounded-2xl border border-white/[.06] bg-[#181818] p-5"
              :style="`max-width: ${100 - i * 7}%`"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                :class="step.highlight ? 'bg-green-400 text-black' : 'bg-green-400/10 text-green-400'"
              >
                {{ i + 1 }}
              </div>
              <div>
                <p class="font-bold text-white text-[15px]">{{ step.title }}</p>
                <p class="text-sm text-gray-500 mt-0.5">{{ step.desc }}</p>
              </div>
            </div>
            <div v-if="i < funnelSteps.length - 1" class="text-green-400/40 text-2xl my-1">↓</div>
          </div>
        </div>

        <!-- DIFERENCIAIS DO FUNIL -->
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

    <!-- O QUE INCLUI / NÃO INCLUI -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Escopo do serviço
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          O QUE ESTÁ<br>
          <span class="text-green-400">DENTRO E FORA DO PLANO</span>
        </h2>
        <p class="text-gray-500 mb-10 text-[15px] max-w-2xl">
          Transparência total. Você sabe exatamente o que contratou e por que o serviço custa o que custa.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-green-400/15 flex items-center justify-center text-green-400 font-black text-sm">✓</span>
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

          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-white/[.05] flex items-center justify-center text-gray-500 font-black text-sm">✕</span>
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
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Projeção de resultados
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          O QUE ESPERAR<br>
          <span class="text-green-400">NOS PRIMEIROS 3 MESES</span>
        </h2>
        <p class="text-gray-500 mb-10">Exemplo com R$ 300 de verba no Google Ads e ticket médio de R$ 45.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
            class="rounded-2xl p-7 text-center border"
            :class="i === 2 ? 'border-green-400/30 bg-green-400/5' : 'border-white/[.06] bg-[#181818]'"
          >
            <p class="text-xs uppercase tracking-widest text-gray-500 mb-1">{{ month.label }}</p>
            <p class="text-sm text-gray-600 mb-4">{{ month.clients }} novos clientes</p>
            <p
              class="font-black leading-none"
              :class="i === 2 ? 'text-green-400' : 'text-white'"
              style="font-family:'Bebas Neue',sans-serif;font-size:48px"
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

    <SimuladorVerba />

    <!-- VALOR REAL DO CLIENTE -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-5xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          O que muitos barbeiros não calculam
        </span>
        <h2
          class="mt-3 mb-6 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          O VALOR REAL NÃO ESTÁ<br>
          NO PRIMEIRO CORTE
        </h2>
        <p class="text-gray-400 text-lg max-w-3xl mb-12">
          Quando um novo cliente entra na sua barbearia, o retorno não acontece só naquele atendimento. O verdadeiro lucro vem da recorrência dos próximos meses.
        </p>

        <div class="grid md:grid-cols-4 gap-5">
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 text-center">
            <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Cliente novo</p>
            <p class="font-black text-white" style="font-family:'Bebas Neue',sans-serif;font-size:52px">1</p>
          </div>
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 text-center">
            <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Ticket médio</p>
            <p class="font-black text-green-400" style="font-family:'Bebas Neue',sans-serif;font-size:52px">R$45</p>
          </div>
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 text-center">
            <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Frequência média</p>
            <p class="font-black text-white" style="font-family:'Bebas Neue',sans-serif;font-size:52px">2x</p>
            <p class="text-xs text-gray-600">cortes por mês</p>
          </div>
          <div class="rounded-2xl border border-green-400/20 bg-green-400/5 p-6 text-center">
            <p class="text-xs uppercase tracking-widest text-green-400 mb-2">Valor anual</p>
            <p class="font-black text-green-400" style="font-family:'Bebas Neue',sans-serif;font-size:52px">R$1.080</p>
          </div>
        </div>

        <div class="mt-10 rounded-2xl border border-green-400/20 bg-green-400/5 p-8">
          <h3 class="font-black text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:40px">
            5 CLIENTES NOVOS POR MÊS
          </h3>
          <p class="text-gray-300 text-lg leading-relaxed mb-6">
            Mesmo que sua campanha gere apenas 5 novos clientes por mês, isso representa:
          </p>
          <div class="grid md:grid-cols-3 gap-5">
            <div class="rounded-xl bg-[#111] p-5 text-center">
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Clientes captados</p>
              <p class="text-4xl font-black text-white">5</p>
            </div>
            <div class="rounded-xl bg-[#111] p-5 text-center">
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Valor anual por cliente</p>
              <p class="text-4xl font-black text-white">R$1.080</p>
            </div>
            <div class="rounded-xl bg-[#111] p-5 text-center">
              <p class="text-xs uppercase tracking-widest text-green-400 mb-2">Receita potencial</p>
              <p class="text-4xl font-black text-green-400">R$5.400</p>
            </div>
          </div>
          <p class="mt-8 text-gray-400">
            Por isso, a Captação Automática não deve ser avaliada pelo faturamento do primeiro mês. O objetivo é construir uma base recorrente de clientes que continuam voltando ao longo do ano.
          </p>
        </div>

      </div>
    </section>

    <!-- INVESTIMENTO -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Investimento
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,56px)"
        >
          TRÊS PARTES.<br>
          <span class="text-green-400">UM SISTEMA SÓ.</span>
        </h2>
        <p class="text-gray-500 text-[15px] leading-relaxed max-w-2xl mb-10">
          Entenda exatamente o que você está pagando, pra quem, e por quê cada parte existe.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div
            v-for="item in planItems"
            :key="item.label"
            class="rounded-2xl border bg-[#181818] p-7 flex flex-col gap-4"
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
              <p
                class="font-black leading-none mb-3"
                :class="item.highlight ? 'text-green-400' : 'text-gray-300'"
                style="font-family:'Bebas Neue',sans-serif;font-size:28px"
              >
                {{ item.price }}
              </p>
              <p class="text-sm text-gray-500 leading-relaxed">{{ item.desc }}</p>
            </div>
            <div
              class="mt-auto rounded-xl p-3 text-xs leading-relaxed"
              :class="item.highlight ? 'bg-green-400/8 text-green-400/80 border border-green-400/15' : 'bg-white/[.03] text-gray-600 border border-white/[.05]'"
            >
              {{ item.note }}
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-green-400/20 bg-green-400/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-widest text-green-400 mb-1">Investimento total recomendado</p>
            <p class="text-sm text-gray-500 max-w-md">Sistema SuaAgenda + Captação Automática + Verba Google Ads. Tudo integrado, funcionando junto.</p>
          </div>
          <p class="font-black text-green-400 shrink-0" style="font-family:'Bebas Neue',sans-serif;font-size:36px">
            R$ 699/mês
          </p>
        </div>

      </div>
    </section>

    <!-- RELATÓRIO INTEGRADO -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0d0d0d] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Transparência total
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,56px)"
        >
          VOCÊ VÊ O RESULTADO<br>
          <span class="text-green-400">DENTRO DO SEU PAINEL.</span>
        </h2>
        <p class="text-gray-400 text-[16px] leading-relaxed max-w-2xl mb-12">
          Enquanto uma agência tradicional entrega um PDF no fim do mês, você vê os dados de campanha integrados direto na sua agenda — em tempo real.
        </p>

        <!-- MOCKUP DO PAINEL -->
        <div class="rounded-2xl border border-white/[.06] bg-[#0e0e0e] overflow-hidden max-w-3xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/[.05] bg-[#141414]">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-md bg-green-400/20 flex items-center justify-center">
                <span class="text-green-400 text-xs font-black">S</span>
              </div>
              <span class="text-sm font-bold text-white">SuaAgenda · Relatório Mensal</span>
            </div>
            <span class="text-xs text-gray-600">Gerado automaticamente</span>
          </div>

          <div class="p-6 border-b border-white/[.05]">
            <p class="text-xs text-gray-600 uppercase tracking-widest mb-3">Resumo da campanha — Junho</p>
            <div class="rounded-xl bg-green-400/5 border border-green-400/20 p-4">
              <p class="text-sm text-green-400/90 leading-relaxed">
                ✦ Sua campanha gerou <strong class="text-white">126 cliques</strong>, <strong class="text-white">9 agendamentos</strong> e <strong class="text-white">6 novos clientes</strong> este mês. Estimativa de receita gerada: <strong class="text-green-400">R$ 270</strong>.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/[.05]">
            <div v-for="ds in reportStats" :key="ds.label" class="p-5 text-center">
              <p class="text-xs text-gray-600 uppercase tracking-widest mb-2">{{ ds.label }}</p>
              <p
                class="font-black leading-none"
                :class="ds.green ? 'text-green-400' : 'text-white'"
                style="font-family:'Bebas Neue',sans-serif;font-size:28px"
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
    <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

        <div>
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">
            Diferencial
          </span>
          <h2
            class="mt-3 mb-8 font-black leading-none text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,56px)"
          >
            NÃO ENTREGAMOS<br>
            <span class="text-green-400">CLIQUES.</span><br>
            ENTREGAMOS CLIENTES.
          </h2>

          <div class="space-y-3">
            <div
              v-for="diff in differentials"
              :key="diff"
              class="flex items-center gap-3 rounded-xl border border-white/[.06] bg-[#181818] px-5 py-4"
            >
              <span class="text-green-400 font-black text-lg">✓</span>
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
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-6 text-center"
          >
            <p
              class="font-black text-green-400 leading-none mb-2"
              style="font-family:'Bebas Neue',sans-serif;font-size:48px"
            >
              {{ stat.num }}
            </p>
            <p class="text-sm text-gray-500 leading-snug">{{ stat.label }}</p>
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
          PRONTO PARA<br>
          <span class="text-green-400">LOTAR SUA AGENDA?</span>
        </h2>
        <p class="text-gray-500 text-[16px] leading-relaxed mb-10">
          7 dias grátis. Sem contrato. Cancele quando quiser.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          
          <a  href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-8 py-5 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            🚀 Começar agora — é grátis
          </a>
          <NuxtLink
            to="/barbearias"
            class="inline-flex items-center gap-2 px-7 py-5 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
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

const benefits = [
  {
    emoji: '🔍',
    title: 'Google Ads com intenção real',
    desc: 'Quem pesquisa "barbearia perto de mim" já decidiu cortar. Você aparece na hora certa, antes de qualquer concorrente.',
  },
  {
    emoji: '📲',
    title: 'Clique → agendamento direto',
    desc: 'O anúncio conecta direto com sua agenda online. Sem WhatsApp, sem espera, sem você precisar responder.',
  },
  {
    emoji: '📊',
    title: 'Relatório dentro do sistema',
    desc: 'Cliques, agendamentos e novos clientes gerados pela campanha — tudo visível no seu painel, em tempo real.',
  },
  {
    emoji: '⚙️',
    title: 'Campanha padronizada e automatizada',
    desc: 'Configuramos, integramos e deixamos rodando. Sem reuniões, sem PDF mensal, sem dependência da sua atenção.',
  },
]

const funnelSteps = [
  { title: 'Google Ads',                    desc: 'Campanha local ativa — pesquisa + Perfil da Empresa',          highlight: false },
  { title: 'Clique no anúncio',             desc: '"Barbearia perto de mim" → seu nome no topo',                  highlight: false },
  { title: 'Landing Page / Perfil Google',  desc: 'Página otimizada com botão de agendamento direto',             highlight: false },
  { title: 'Botão "Agendar"',               desc: 'Cliente escolhe serviço, data e horário em segundos',          highlight: false },
  { title: 'Sistema SuaAgenda',             desc: 'Agendamento registrado, confirmação automática via WhatsApp',   highlight: true  },
  { title: 'Comparecimento',                desc: 'Cliente na cadeira. Barbearia lotada.',                         highlight: false },
  { title: 'Relatório automático',          desc: 'Cliques, agendamentos e receita gerada — dentro do painel',    highlight: true  },
]

const howItWorks = [
  {
    emoji: '🎯',
    title: 'Campanha configurada pra barbearia',
    desc: 'Palavras-chave de intenção local: "barbearia perto de mim", "barbeiro em [cidade]", "corte masculino centro". Quem pesquisa isso já está quase na cadeira.',
  },
  {
    emoji: '🔗',
    title: 'Integrado com sua agenda',
    desc: 'O botão do anúncio conecta direto com o sistema. Nenhuma etapa extra — o cliente agenda sem precisar falar com ninguém.',
  },
  {
    emoji: '📈',
    title: 'Otimização contínua',
    desc: 'A campanha ajusta lances e palavras-chave automaticamente com base nos agendamentos reais gerados, não apenas em cliques.',
  },
]

const included = [
  {
    title: 'Configuração inicial da conta Google Ads',
    desc: 'Estrutura da campanha, extensões, raio geográfico, horários de exibição e integração com o Perfil da Empresa.',
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
    title: 'Relatório automático dentro do painel',
    desc: 'Cliques, ligações, solicitações de rota e agendamentos gerados — tudo consolidado no sistema SuaAgenda.',
  },
  {
    title: 'Resumo mensal gerado automaticamente',
    desc: '"Sua campanha gerou X cliques, Y agendamentos e Z novos clientes este mês." Sem PDF, sem reunião.',
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
    desc: 'Os dados estão no painel. Você vê tudo sem precisar marcar call.',
  },
  {
    title: 'Produção de conteúdo para redes sociais',
    desc: 'Esse serviço é focado em captação via busca, não em construção de marca.',
  },
]

const googleStats = [
  { num: '3×',  label: 'mais conversão que redes sociais' },
  { num: '1ª',  label: 'posição na pesquisa local' },
  { num: '24h', label: 'campanha rodando' },
  { num: '100%',label: 'intenção de compra' },
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

const planItems = [
  {
    emoji: '🖥️',
    label: 'Sistema SuaAgenda',
    badge: '7 dias grátis',
    highlight: true,
    price: 'a partir de R$ 99/mês',
    desc: 'Agenda online, painel de clientes, histórico de atendimentos, relatórios e automação de lembretes via WhatsApp.',
    note: 'Pago à SuaAgenda. Os primeiros 7 dias são gratuitos. Planos Solo, Small e Medium conforme o número de profissionais.',
  },
  {
    emoji: '🎯',
    label: 'Captação Automática',
    badge: 'SuaAgenda',
    highlight: false,
    price: 'R$ 300/mês',
    desc: 'Configuração e gerenciamento da campanha Google Ads integrada ao sistema — relatório automático dentro do painel.',
    note: 'Pago à SuaAgenda. Inclui configuração, integração com a agenda, otimização contínua e relatório mensal automático.',
  },
  {
    emoji: '💳',
    label: 'Verba Google Ads',
    badge: 'Google',
    highlight: false,
    price: 'a partir de R$ 300/mês',
    desc: 'Valor investido diretamente no Google Ads — é o combustível da campanha.',
    note: 'Pago por você diretamente ao Google. A SuaAgenda não recebe nada desse valor. Quanto maior a verba, mais cliques e mais clientes.',
  },
]

const reportStats = [
  { label: 'Cliques',       value: '126', green: false },
  { label: 'Agendamentos',  value: '9',   green: false },
  { label: 'Novos clientes',value: '6',   green: true  },
  { label: 'Receita est.',  value: 'R$270',green: true },
]

const differentials = [
  'Google Ads integrado com a agenda',
  'Agendamento direto — sem WhatsApp no meio',
  'Relatório automático dentro do sistema',
  'Campanha padronizada para qualquer cidade',
  'Sem reuniões, sem PDF, sem burocracia',
  'Você vê o resultado, não a promessa',
]

const stats = [
  { num: '24h',  label: 'Campanha rodando' },
  { num: '7d',   label: 'Teste grátis'     },
  { num: '100%', label: 'Automatizado'     },
  { num: '0',    label: 'Reuniões mensais' },
]

useHead({
  title: 'Captação Automática de Clientes para Barbearias - Google Ads + Agenda Online',
  meta: [
    {
      name: 'description',
      content: 'Google Ads integrado com agenda online para barbearias. Cada clique vira agendamento registrado no sistema, com relatório automático. Sem agência, sem reunião, sem PDF.',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [
    { rel: 'canonical', href: 'https://suaagenda.link/barbearia/gestao-de-trafego' },
  ],
})
</script>