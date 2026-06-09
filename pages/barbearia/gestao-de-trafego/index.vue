<!-- pages/gestao-de-trafego/index.vue -->
<template>
  <div class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span>/</span>
          <span class="text-gray-400">Gestão de Tráfego</span>
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

        <!-- TAGS -->
        <div class="flex flex-wrap gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
            🚀 Plano de Crescimento
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            📍 Brasil
          </span>
        </div>

        <!-- TITLE -->
        <h1
          class="font-black leading-none mb-6 text-green-400"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,88px);letter-spacing:.03em"
        >
          MAIS DO QUE ANÚNCIOS.<br>
          <span class="text-white">UM SISTEMA COMPLETO.</span>
        </h1>

        <!-- TEXT -->
        <div class="max-w-3xl space-y-5 mb-10">
          <p class="text-xl text-gray-400 leading-relaxed">
            A SuaAgenda ajuda barbearias a conseguirem mais clientes através de Google Ads, Instagram, Facebook — e converte cada clique em agendamento real.
          </p>
          <p class="text-lg text-gray-500 leading-relaxed">
            Não é só tráfego pago isolado. O anúncio conecta direto com a agenda online, WhatsApp e sistema da barbearia.
          </p>
          <p class="text-lg text-gray-500 leading-relaxed">
            Enquanto você corta cabelo, o sistema continua trazendo clientes, organizando horários e reduzindo perda de atendimento.
          </p>
        </div>

        <!-- BENEFITS -->
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

        <!-- CTA -->
        <div class="flex flex-wrap gap-4">
          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            🚀 Quero lotar minha agenda
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

    <!-- GOOGLE ADS — DESTAQUE -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0d0d0d] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-green-400">
              Cliente quente no Google
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
                No Google, o cliente já está com a intenção de agendar. Ele digita "barbearia perto de mim", "corte masculino" ou "barbeiro em [cidade]" — e o seu nome aparece antes de qualquer concorrente.
              </p>
              <p>
                É o canal de maior conversão porque você não precisa convencer ninguém. A pessoa já decidiu que quer cortar.
              </p>
              <p>
                Combinamos Google Meu Negócio (captação gratuita) com Google Ads (anúncios pagos) para dominar os resultados locais da sua cidade.
              </p>
            </div>
          </div>

          <!-- SIMULAÇÃO DE SERP -->
          <div class="space-y-3">
            <p class="text-xs text-gray-600 uppercase tracking-widest mb-4">Como você aparece no Google</p>

            <!-- Anúncio 1 — SuaAgenda destaque -->
            <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-5 relative">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold border border-green-400/40 text-green-400 px-2 py-0.5 rounded">Anúncio</span>
                <span class="text-xs text-gray-600">suaagenda.link/barbearia</span>
              </div>
              <p class="text-[15px] font-bold text-green-400 mb-1">Barbearia em [Cidade] — Agende Online Agora</p>
              <p class="text-sm text-gray-500">Agenda online 24h · WhatsApp automatizado · Sem espera · Confirme seu horário agora mesmo.</p>
              <div class="absolute top-3 right-3 text-[10px] text-green-400/60 font-bold tracking-widest">TOPO</div>
            </div>

            <!-- Anúncio 2 — concorrente apagado -->
            <div class="rounded-2xl border border-white/[.04] bg-[#141414] p-5 opacity-40">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold border border-gray-700 text-gray-600 px-2 py-0.5 rounded">Anúncio</span>
                <span class="text-xs text-gray-700">concorrente.com.br</span>
              </div>
              <p class="text-[15px] font-bold text-gray-600 mb-1">Barbearia — Entre em contato</p>
              <p class="text-sm text-gray-700">Horários disponíveis. Ligue agora.</p>
            </div>

            <!-- Google Meu Negócio -->
            <div class="rounded-2xl border border-white/[.04] bg-[#181818] p-5">
              <p class="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Google Meu Negócio</p>
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
              Captação gratuita via Google Meu Negócio + anúncios pagos no topo
            </p>
          </div>

        </div>

        <!-- GOOGLE STATS -->
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
          O CLIENTE VÊ.<br>
          <span class="text-green-400">CLICA. AGENDA. APARECE.</span>
        </h2>

        <!-- FUNIL VISUAL -->
        <div class="max-w-3xl mx-auto mb-16">
          <div
            v-for="(step, i) in funnelSteps"
            :key="step.title"
            class="flex flex-col items-center"
          >
            <div
              class="w-full flex items-center gap-4 rounded-2xl border border-white/[.06] bg-[#181818] p-5"
              :style="`max-width: ${100 - i * 8}%`"
            >
              <div class="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 font-black text-sm flex-shrink-0">
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

        <!-- CARDS CANAIS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="step in trafficSteps"
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

    <!-- CANAIS UTILIZADOS -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Canais utilizados
        </span>

        <h2
          class="mt-3 mb-10 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,58px)"
        >
          ONDE SEU CLIENTE<br>
          <span class="text-green-400">ESTÁ EM CADA CANAL</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="channel in channels"
            :key="channel.title"
            class="rounded-2xl border bg-[#181818] p-7"
            :class="channel.highlight ? 'border-green-400/30' : 'border-white/[.06]'"
          >
            <div class="flex items-start gap-4 mb-5">
              <div class="text-3xl">{{ channel.emoji }}</div>
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <h3 class="text-lg font-bold text-white">{{ channel.title }}</h3>
                  <span v-if="channel.badge" class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    :class="channel.highlight ? 'bg-green-400/15 text-green-400 border border-green-400/20' : 'bg-white/[.06] text-gray-500'"
                  >
                    {{ channel.badge }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 leading-relaxed">{{ channel.desc }}</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in channel.tags"
                :key="tag"
                class="text-xs text-gray-500 bg-white/[.04] border border-white/[.06] px-3 py-1 rounded-full"
              >
                {{ tag }}
              </span>
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

        <p class="text-gray-500 mb-10">Exemplo com R$ 300 de verba mensal e ticket médio de R$ 45.</p>

        <!-- PROGRESS BARS -->
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

        <!-- FATURAMENTO CARDS -->
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
          PLANO<br>
          <span class="text-green-400">CRESCIMENTO</span>
        </h2>
        <p class="text-gray-500 text-[15px] leading-relaxed max-w-2xl mb-10">
          O plano é composto por três partes independentes. Entenda exatamente o que você está pagando — e pra quem.
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

        <!-- TOTAL -->
        <div class="rounded-2xl border border-green-400/20 bg-green-400/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-widest text-green-400 mb-1">Investimento total recomendado</p>
            <p class="text-sm text-gray-500 max-w-md">Sistema SuaAgenda + Gestão de Tráfego + Verba de Anúncios. Tudo junto, funcionando como um sistema integrado.</p>
          </div>
          <p class="font-black text-green-400 shrink-0" style="font-family:'Bebas Neue',sans-serif;font-size:36px">
            R$ 499–649/mês
          </p>
        </div>

      </div>
    </section>

    <!-- SEM O SISTEMA -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0d0d0d] border-y border-white/5">
      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-yellow-500">
          ⚠ Importante entender
        </span>
        <h2
          class="mt-3 mb-4 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,56px)"
        >
          SEM O SISTEMA,<br>
          <span class="text-yellow-500">O TRÁFEGO PERDE FORÇA.</span>
        </h2>
        <p class="text-gray-400 text-[16px] leading-relaxed max-w-2xl mb-12">
          É possível contratar só a Gestão de Tráfego. Mas existe uma diferença enorme em resultado.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <!-- COM sistema -->
          <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-green-400/15 flex items-center justify-center text-green-400 font-black text-sm">✓</span>
              <h3 class="text-lg font-bold text-white">Com o Sistema SuaAgenda</h3>
            </div>
            <div class="space-y-4">
              <div
                v-for="pro in withSystem"
                :key="pro.title"
                class="flex items-start gap-3"
              >
                <span class="text-green-400 mt-0.5 shrink-0">→</span>
                <div>
                  <p class="text-[15px] font-bold text-white">{{ pro.title }}</p>
                  <p class="text-sm text-gray-500 mt-0.5 leading-relaxed">{{ pro.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- SEM sistema -->
          <div class="rounded-2xl border border-yellow-500/15 bg-[#181818] p-7">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-black text-sm">!</span>
              <h3 class="text-lg font-bold text-white">Sem o Sistema — só WhatsApp</h3>
            </div>
            <div class="space-y-4">
              <div
                v-for="con in withoutSystem"
                :key="con.title"
                class="flex items-start gap-3"
              >
                <span class="text-yellow-500/70 mt-0.5 shrink-0">→</span>
                <div>
                  <p class="text-[15px] font-bold text-gray-400">{{ con.title }}</p>
                  <p class="text-sm text-gray-600 mt-0.5 leading-relaxed">{{ con.desc }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="mt-8 rounded-2xl border border-yellow-500/15 bg-yellow-500/5 p-5 max-w-3xl">
          <p class="text-sm text-yellow-500/80 leading-relaxed">
            <strong class="text-yellow-400">Resumindo:</strong> o tráfego pago vai funcionar de qualquer forma — mas sem a agenda online, o cliente chega no WhatsApp e depende de você responder na hora certa, no momento certo. Qualquer demora e ele fecha com o concorrente. O sistema é o que transforma o anúncio em agendamento garantido.
          </p>
        </div>

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
            <span class="text-green-400">CURTIDAS.</span><br>
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
          <a
            href="https://wa.me/5511941649284"
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
definePageMeta({
  layout: 'barber',
})

const benefits = [
  {
    emoji: '🔍',
    title: 'Google Ads — cliente quente',
    desc: 'Quem pesquisa "barbearia perto de mim" já quer cortar. Você aparece primeiro, antes de qualquer concorrente.',
  },
  {
    emoji: '🔥',
    title: 'Instagram e Facebook Ads',
    desc: 'Campanhas segmentadas por raio e faixa etária pra gerar agendamentos direto na sua página.',
  },
  {
    emoji: '📲',
    title: 'WhatsApp integrado',
    desc: 'O cliente sai do anúncio direto pro seu WhatsApp ou agenda online. Sem etapas extras.',
  },
  {
    emoji: '💰',
    title: 'Mais retorno por cliente',
    desc: 'Fidelidade, cashback e retorno automático ajudam o cliente voltar mais vezes.',
  },
]

const funnelSteps = [
  { title: 'Cliente vê o anúncio', desc: 'Google Ads, Instagram, Facebook ou Google Meu Negócio' },
  { title: 'Acessa a landing page', desc: 'Página exclusiva da barbearia, otimizada pra converter' },
  { title: 'Escolhe o serviço', desc: 'Corte, barba, combo — sem ligar, sem esperar resposta' },
  { title: 'Agenda online', desc: 'Escolhe data e horário em segundos pelo celular' },
  { title: 'Recebe confirmação automática', desc: 'Mensagem via WhatsApp na hora, com lembrete no dia' },
  { title: 'Comparece ao atendimento', desc: 'Cliente na cadeira. Barbearia lotada.' },
]

const trafficSteps = [
  {
    emoji: '🎯',
    title: 'Criamos os anúncios',
    desc: 'Rodamos campanhas no Google, Instagram e Facebook segmentadas pra pessoas realmente interessadas em corte, barba e barbearia.',
  },
  {
    emoji: '📲',
    title: 'Cliente entra na agenda',
    desc: 'O anúncio conecta direto com landing page exclusiva ou sistema de agendamento. Zero fricção.',
  },
  {
    emoji: '🔄',
    title: 'Remarketing inteligente',
    desc: 'Quem visitou a página mas não agendou recebe anúncios de reimpacto. Esse público converte mais.',
  },
]

const channels = [
  {
    emoji: '🔍',
    title: 'Google Ads',
    badge: 'Maior conversão',
    highlight: true,
    desc: 'Anúncios no momento exato em que o cliente pesquisa. Intenção de compra alta, custo por agendamento menor.',
    tags: ['Barbearia perto de mim', 'Corte masculino', 'Barbeiro em [cidade]', 'Barba e cabelo'],
  },
  {
    emoji: '📍',
    title: 'Google Meu Negócio',
    badge: 'Gratuito',
    highlight: false,
    desc: 'Perfil otimizado que aparece no Maps e na busca local. Avaliações, fotos e botão de agendamento direto.',
    tags: ['Busca local', 'Google Maps', 'Avaliações', 'Horários e endereço'],
  },
  {
    emoji: '📸',
    title: 'Instagram Ads',
    badge: 'Alcance visual',
    highlight: false,
    desc: 'Campanhas com foco em homens de 18 a 55 anos num raio de 3 a 5 km da barbearia. Feed e Stories.',
    tags: ['Raio 3–5 km', 'Homens 18–55 anos', 'Feed e Stories', 'Vídeo e carrossel'],
  },
  {
    emoji: '📘',
    title: 'Facebook Ads',
    badge: 'Remarketing',
    highlight: false,
    desc: 'Reimpacta quem visitou a página mas não agendou. Esse público converte muito mais que tráfego frio.',
    tags: ['Reimpacto', 'Público personalizado', 'Lookalike', 'Conversão'],
  },
]

const googleStats = [
  { num: '3×', label: 'mais conversão que redes sociais' },
  { num: '1ª', label: 'posição na pesquisa local' },
  { num: '24h', label: 'anúncios rodando' },
  { num: '0', label: 'clique sem intenção' },
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
      { value: '8', pct: 33 },
      { value: '15', pct: 62 },
      { value: '24', pct: 100 },
    ],
  },
]

const revenueMonths = [
  { label: 'Mês 1', clients: '8', revenue: 'R$ 360' },
  { label: 'Mês 2', clients: '15', revenue: 'R$ 675' },
  { label: 'Mês 3', clients: '24', revenue: 'R$ 1.080' },
]

const planItems = [
  {
    emoji: '🖥️',
    label: 'Sistema SuaAgenda',
    badge: '7 dias grátis',
    highlight: true,
    price: 'R$ 49,90/mês',
    desc: 'Agenda online, painel de clientes, histórico de atendimentos, relatórios e automação de lembretes via WhatsApp.',
    note: 'Pago à SuaAgenda. Os primeiros 7 dias são gratuitos para você testar o sistema completo antes de assinar.',
  },
  {
    emoji: '📣',
    label: 'Gestão de Tráfego',
    badge: 'SuaAgenda',
    highlight: false,
    price: 'R$ 300,00/mês',
    desc: 'Criação, configuração e gerenciamento das campanhas no Google Ads, Instagram e Facebook Ads.',
    note: 'Pago à SuaAgenda. Inclui estratégia, criação dos anúncios, segmentação e otimização contínua das campanhas.',
  },
  {
    emoji: '💳',
    label: 'Verba de Anúncios',
    badge: 'Google & Meta',
    highlight: false,
    price: 'R$ 150–300/mês',
    desc: 'Valor investido diretamente nas plataformas de anúncio — Google, Instagram e Facebook.',
    note: 'Pago por você diretamente ao Google e à Meta. A SuaAgenda não recebe nenhuma parte desse valor. Quanto maior a verba, maior o alcance.',
  },
]

const withSystem = [
  {
    title: 'Cliente agenda sozinho, 24h por dia',
    desc: 'Depois de clicar no anúncio, o cliente acessa a agenda, escolhe o horário e confirma — sem precisar esperar resposta de ninguém.',
  },
  {
    title: 'Confirmação automática via WhatsApp',
    desc: 'O sistema envia a confirmação e o lembrete automaticamente. Sem trabalho manual da sua parte.',
  },
  {
    title: 'Zero perda por demora',
    desc: 'A barbearia nunca "tá ocupada" para receber um cliente novo. O sistema opera enquanto você trabalha.',
  },
  {
    title: 'Histórico e recorrência',
    desc: 'Você sabe quem agendou, quando voltou e quanto gerou. Dá pra fidelizar com campanhas automáticas.',
  },
]

const withoutSystem = [
  {
    title: 'Tráfego cai direto no WhatsApp',
    desc: 'O cliente chega, manda mensagem — e fica esperando. Se demorar 10 minutos pra responder, ele já fechou com outro.',
  },
  {
    title: 'Você vira o gargalo',
    desc: 'No meio de um corte, você precisa parar pra responder mensagem, confirmar horário e anotar em algum lugar. Dá errado.',
  },
  {
    title: 'Sem histórico, sem controle',
    desc: 'Não tem como saber quantos clientes chegaram pelo anúncio, qual serviço mais pediu ou quem sumiu depois de uma visita.',
  },
  {
    title: 'Verba desperdiçada em interesse perdido',
    desc: 'Você paga pelo clique. Se o cliente não consegue agendar na hora, o dinheiro investido no anúncio vai embora sem retorno.',
  },
]

const differentials = [
  'Agendamentos reais, não curtidas',
  'Controle completo de clientes',
  'Histórico de atendimentos',
  'Relatórios mensais',
  'Crescimento previsível',
  'Processo 100% automatizado',
]

const stats = [
  { num: '24h', label: 'Anúncios rodando' },
  { num: '7d', label: 'Teste grátis' },
  { num: '100%', label: 'Mobile' },
  { num: '+ROI', label: 'Mais retorno' },
]

useHead({
  title: 'Plano de Crescimento para Barbearias — Google Ads, Instagram e Agendamento Online',

  meta: [
    {
      name: 'description',
      content:
        'Sistema completo de tráfego pago para barbearias: Google Ads, Instagram Ads, Facebook Ads e remarketing integrados com agenda online e WhatsApp automatizado. Apareça primeiro no Google e lote sua agenda.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],

  link: [
    {
      rel: 'canonical',
      href: 'https://suaagenda.link/barbearia/gestao-de-trafego',
    },
  ],
})
</script>