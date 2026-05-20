<!-- pages/gestao-de-trafego/index.vue -->
<template>
  <div class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">

          <NuxtLink
            to="/"
            class="hover:text-green-400 transition-colors"
          >
            Início
          </NuxtLink>

          <span>/</span>

          <span class="text-gray-400">
            Gestão de Tráfego
          </span>

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
            🚀 Gestão de tráfego para barbearias
          </span>

          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            📍 Brasil
          </span>

        </div>

        <!-- TITLE -->
        <h1
          class="font-black leading-none mb-6 text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,88px);letter-spacing:.03em"
        >
          GESTÃO DE<br>

          <span class="text-green-400">
            TRÁFEGO PAGO
          </span>

          <br>

          <span
            class="text-white/40"
            style="font-size:clamp(24px,3vw,42px)"
          >
            PRA BARBEARIAS
          </span>
        </h1>

        <!-- TEXT -->
        <div class="max-w-3xl space-y-5 mb-10">

          <p class="text-xl text-gray-400 leading-relaxed">
            A SuaAgenda ajuda barbearias a conseguirem mais clientes através de anúncios no Instagram, Facebook e Google.
          </p>

          <p class="text-lg text-gray-500 leading-relaxed">
            Não é só tráfego pago isolado.
            O anúncio conecta direto com o WhatsApp, agenda online e sistema da barbearia pra transformar visualização em agendamento real.
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
            <div class="text-2xl">
              {{ benefit.emoji }}
            </div>

            <div>
              <p class="font-bold text-white text-[15px] mb-2">
                {{ benefit.title }}
              </p>

              <p class="text-sm text-gray-500 leading-relaxed">
                {{ benefit.desc }}
              </p>
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

    <!-- COMO FUNCIONA -->
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

          <span class="text-green-400">
            CLICA. AGENDA.
          </span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div
            v-for="step in trafficSteps"
            :key="step.title"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-7"
          >

            <div class="text-3xl mb-5">
              {{ step.emoji }}
            </div>

            <h3 class="text-lg font-bold text-white mb-3">
              {{ step.title }}
            </h3>

            <p class="text-sm text-gray-500 leading-relaxed">
              {{ step.desc }}
            </p>

          </div>

        </div>

      </div>
    </section>

    <!-- DIFERENCIAL -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">

      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        <div>

          <span class="text-xs font-bold tracking-widest uppercase text-green-400">
            Sistema + marketing
          </span>

          <h2
            class="mt-3 mb-6 font-black leading-none text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,56px)"
          >
            NÃO ADIANTA<br>

            <span class="text-green-400">
              TRAZER CLIENTE
            </span>

            <br>

            E PERDER NO WHATSAPP
          </h2>

          <div class="space-y-5 text-gray-400 text-[16px] leading-relaxed">

            <p>
              Muitas barbearias até conseguem mensagem no Instagram.
              O problema começa depois:
              demora pra responder, cliente esquece, horário fica bagunçado e o barbeiro perde atendimento.
            </p>

            <p>
              A SuaAgenda junta tráfego pago + agenda online + automação no WhatsApp pra facilitar o processo inteiro.
            </p>

            <p>
              O cliente entra, escolhe horário e agenda sem precisar ficar esperando resposta manual.
            </p>

          </div>

        </div>

        <!-- STATS -->
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

            <p class="text-sm text-gray-500 leading-snug">
              {{ stat.label }}
            </p>

          </div>

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
    emoji: '📍',
    title: 'Google da sua cidade',
    desc:
      'Apareça quando alguém pesquisar barbeiro, barbearia ou corte masculino na sua região.',
  },

  {
    emoji: '🔥',
    title: 'Instagram e Facebook Ads',
    desc:
      'Campanhas criadas pra gerar mensagens, agendamentos e novos clientes pra barbearia.',
  },

  {
    emoji: '📲',
    title: 'WhatsApp integrado',
    desc:
      'O cliente sai do anúncio direto pro seu WhatsApp ou agenda online.',
  },

  {
    emoji: '💰',
    title: 'Mais retorno por cliente',
    desc:
      'Fidelidade, cashback e retorno automático ajudam o cliente voltar mais vezes.',
  },
]

const trafficSteps = [
  {
    emoji: '🎯',
    title: 'Criamos os anúncios',
    desc:
      'Rodamos campanhas segmentadas pra pessoas realmente interessadas em corte, barba e barbearia.',
  },

  {
    emoji: '📲',
    title: 'Cliente entra na agenda',
    desc:
      'O anúncio conecta direto com WhatsApp, landing page ou sistema de agendamento.',
  },

  {
    emoji: '🔥',
    title: 'Sua operação organiza tudo',
    desc:
      'Enquanto chegam novos clientes, o sistema controla horários, lembretes e recorrência.',
  },
]

const stats = [
  {
    num: '24h',
    label: 'Anúncios rodando',
  },

  {
    num: '7d',
    label: 'Teste grátis',
  },

  {
    num: '100%',
    label: 'Mobile',
  },

  {
    num: '+ROI',
    label: 'Mais retorno',
  },
]

useHead({
  title: 'Gestão de Tráfego pago para Barbearias',

  meta: [
    {
      name: 'description',
      content:
        'Gestão de tráfego para barbearias com anúncios no Instagram, Facebook e Google integrados com agenda online e WhatsApp automatizado.',
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