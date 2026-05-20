<!-- pages/gestao-de-trafego/[uf]/[cidade]/[bairro]/index.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import {
  getNeighborhoodData,
} from '~/data/locations'

definePageMeta({
  layout: 'barber',
})

const route = useRoute()

const ufSlug = route.params.uf as string
const citySlug = route.params.cidade as string
const neighborhoodSlug = route.params.bairro as string

const neighborhoodData = computed(() =>
  getNeighborhoodData(
    ufSlug,
    citySlug,
    neighborhoodSlug,
  ),
)

const city = computed(() => neighborhoodData.value?.city)
const district = computed(() => neighborhoodData.value?.district)
const neighborhood = computed(() => neighborhoodData.value?.neighborhood)

const heroBenefits = computed(() => [
  {
    emoji: '📍',
    title: `Google em ${neighborhood.value?.name}`,
    desc:
      `Sua barbearia aparece quando alguém procura barbeiro em ${neighborhood.value?.name}.`,
  },

  {
    emoji: '🔥',
    title: 'Tráfego pago integrado',
    desc:
      'Instagram, Facebook e Google conectados direto com sua agenda online.',
  },

  {
    emoji: '📲',
    title: 'Cliente agenda sozinho',
    desc:
      'O sistema evita perder cliente enquanto você está atendendo.',
  },

  {
    emoji: '💰',
    title: 'Mais retorno por cliente',
    desc:
      'Cashback, fidelidade e automações ajudam o cliente voltar mais vezes.',
  },
])

const trafficSteps = computed(() => [
  {
    emoji: '🎯',
    title: `Rodamos anúncios em ${city.value?.city}`,
    desc:
      `Criamos campanhas focadas em pessoas próximas de ${neighborhood.value?.name} procurando corte, barba e barbeiro.`,
  },

  {
    emoji: '📲',
    title: 'Cliente cai direto no agendamento',
    desc:
      'Ao invés de cair num direct perdido, o cliente já entra no WhatsApp ou agenda online pronto pra converter.',
  },

  {
    emoji: '🔥',
    title: 'O sistema ajuda fechar o agendamento',
    desc:
      'Confirmações automáticas, lembretes e agenda inteligente ajudam transformar clique em cliente real.',
  },
])

const systemFlow = computed(() => [
  {
    emoji: '📢',
    title: `Anúncio aparece pra quem mora em ${neighborhood.value?.name}`,
    desc:
      'Sua barbearia aparece pra pessoas da região procurando barbeiro perto delas.',
  },

  {
    emoji: '📲',
    title: 'Cliente entra no WhatsApp ou agenda',
    desc:
      'Tudo já integrado com sua estrutura digital e página de agendamento.',
  },

  {
    emoji: '⚡',
    title: 'Agendamento acontece rápido',
    desc:
      'Sem depender de alguém responder manualmente cada mensagem.',
  },

  {
    emoji: '💈',
    title: 'A cadeira fica ocupada',
    desc:
      'O foco final não é clique nem curtida. É aumentar faturamento da barbearia.',
  },
])

const stats = [
  {
    num: '24h',
    label: 'Recebendo agendamentos',
  },

  {
    num: '5min',
    label: 'Pra colocar no ar',
  },

  {
    num: '100%',
    label: 'Funciona no celular',
  },

  {
    num: '+Clientes',
    label: 'Vindos do Google e Instagram',
  },
]

useHead(
  computed(() => {
    if (!neighborhoodData.value) {
      return {
        title: 'Bairro não encontrado',
      }
    }

    const cityName = city.value?.city
    const neighborhoodName = neighborhood.value?.name

    return {
      title:
        `Gestão de Tráfego para Barbearias em ${neighborhoodName} — ${cityName}`,

      meta: [
        {
          name: 'description',
          content:
            `Gestão de tráfego para barbearias em ${neighborhoodName}, ${cityName}. ` +
            `Instagram, Google e anúncios conectados com agenda online e WhatsApp automático.`,
        },

        {
          name: 'robots',
          content: 'index, follow',
        },

        {
          property: 'og:title',
          content:
            `Gestão de Tráfego para Barbearias em ${neighborhoodName}`,
        },

        {
          property: 'og:description',
          content:
            `Traga mais clientes para sua barbearia em ${neighborhoodName} com tráfego pago integrado ao sistema de agendamento.`,
        },
      ],

      link: [
        {
          rel: 'canonical',
          href:
            `https://suaagenda.link/barbearia/gestao-de-trafego/${ufSlug}/${citySlug}/${neighborhoodSlug}`,
        },
      ],
    }
  }),
)
</script>

<template>
  <div
    v-if="neighborhoodData"
    class="text-[15px]"
  >

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

          <NuxtLink
            to="/gestao-de-trafego"
            class="hover:text-green-400 transition-colors"
          >
            Gestão de tráfego
          </NuxtLink>

          <span>/</span>

          <NuxtLink
            :to="`/gestao-de-trafego/${city?.ufSlug}/${city?.citySlug}`"
            class="hover:text-green-400 transition-colors"
          >
            {{ city?.city }}
          </NuxtLink>

          <span>/</span>

          <span class="text-gray-400">
            {{ neighborhood?.name }}
          </span>

        </nav>

      </div>
    </section>

    <!-- HERO -->
    <section class="relative w-full py-24 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">

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
            📍 {{ neighborhood?.name }}
          </span>

        </div>

        <!-- TITLE -->
        <h1
          class="font-black leading-none mb-6 text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(46px,6vw,90px);letter-spacing:.03em"
        >
          BARBEIROS EM<br>

          <span class="text-green-400">
            {{ neighborhood?.name?.toUpperCase() }}
          </span>

          <br>

          <span
            class="text-white/40"
            style="font-size:clamp(24px,3vw,42px)"
          >
            QUE LOTAM A AGENDA TODOS OS DIAS
          </span>
        </h1>

        <!-- MAIN TEXT -->
        <div class="max-w-4xl space-y-5 mb-10">

          <p class="text-xl text-gray-300 leading-relaxed">
            A SuaAgenda conecta gestão de tráfego,
            agenda online
            e automações pra ajudar barbeiros de
            <strong class="text-white">
              {{ neighborhood?.name }}
            </strong>
            a receber mais clientes todos os dias.
          </p>

          <p class="text-lg text-gray-500 leading-relaxed">
            O cliente vê o anúncio,
            entra no WhatsApp,
            escolhe horário
            e agenda sozinho —
            sem depender do barbeiro responder manualmente.
          </p>

          <p class="text-lg text-gray-500 leading-relaxed">
            O objetivo não é só gerar clique.
            É transformar tráfego em cadeira ocupada
            e faturamento recorrente pra barbearia.
          </p>

        </div>

        <!-- BENEFITS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mb-12">

          <div
            v-for="item in heroBenefits"
            :key="item.title"
            class="flex items-start gap-4 rounded-2xl border border-white/[.06] bg-[#181818] p-5"
          >
            <div class="text-2xl text-green-400">
              {{ item.emoji }}
            </div>

            <div>
              <p class="font-bold text-white text-[15px] mb-1">
                {{ item.title }}
              </p>

              <p class="text-sm text-gray-500 leading-relaxed">
                {{ item.desc }}
              </p>
            </div>
          </div>

        </div>

        <!-- CTA -->
        <div class="flex flex-wrap gap-4">

          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            🚀 Quero lotar minha agenda
          </a>

          <NuxtLink
            :to="`/barbearias/${city?.ufSlug}/${city?.citySlug}/${neighborhood?.slug}`"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            Ver barbeiros do bairro →
          </NuxtLink>

        </div>

      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#111]">

      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Tráfego pago + automação + agenda online
        </span>

        <h2
          class="mt-3 mb-5 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(38px,4vw,64px)"
        >
          NÃO É SÓ<br>

          <span class="text-green-400">
            IMPULSIONAR POST
          </span>
        </h2>

        <p class="text-lg text-gray-500 leading-relaxed max-w-3xl mb-12">
          Cada anúncio já leva o cliente direto
          pra uma estrutura preparada pra converter em agendamento.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div
            v-for="item in trafficSteps"
            :key="item.title"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-8"
          >
            <div class="text-4xl mb-5">
              {{ item.emoji }}
            </div>

            <h3 class="text-xl font-bold text-white mb-4">
              {{ item.title }}
            </h3>

            <p class="text-[15px] text-gray-500 leading-relaxed">
              {{ item.desc }}
            </p>
          </div>

        </div>

      </div>

    </section>

    <!-- STATS -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a]">

      <div class="max-w-6xl mx-auto">

        <h2
          class="font-black leading-none text-white mb-10"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4vw,60px)"
        >
          MAIS CLIENTES EM<br>

          <span class="text-green-400">
            {{ neighborhood?.name?.toUpperCase() }}
          </span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-7 text-center"
          >
            <p
              class="font-black text-green-400 leading-none mb-3"
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