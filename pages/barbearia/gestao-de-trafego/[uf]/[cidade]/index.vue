<!-- pages/gestao-de-trafego/[uf]/[cidade].vue -->
<template>
  <div v-if="cityData" class="text-[15px]">

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

          <span class="text-gray-400">
            {{ cityData.city }}
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
            🚀 Tráfego pago para barbearias
          </span>

          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            📍 {{ cityData.city }}
          </span>

        </div>

        <!-- TITLE -->
        <h1
          class="font-black leading-none mb-6 text-green-400"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(46px,6vw,90px);letter-spacing:.03em"
        >
          TRÁFEGO PAGO EM<br>

          <span class="text-white">
            {{ cityData.city.toUpperCase() }}
          </span>
        </h1>

        <!-- MAIN TEXT -->
        <div class="max-w-4xl space-y-5 mb-10">

          <p class="text-xl text-gray-300 leading-relaxed">
            A maioria das agências roda anúncio e entrega clique.
            A SuaAgenda vai além:
            nós conectamos o tráfego da sua barbearia em
            <strong class="text-white">{{ cityData.city }}</strong>
            direto com o seu sistema de agendamento.
          </p>

          <p class="text-lg text-gray-500 leading-relaxed">
            Isso significa que o cliente vê o anúncio,
            entra no WhatsApp,
            escolhe horário,
            agenda sozinho
            e o sistema ainda confirma automaticamente pra reduzir furo.
          </p>

          <p class="text-lg text-gray-500 leading-relaxed">
            Ou seja:
            o tráfego não termina no clique.
            Ele termina com cadeira ocupada,
            agenda cheia
            e cliente voltando.
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
            :to="`/barbearias/${cityData.ufSlug}/${cityData.citySlug}`"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            Ver barbeiros da cidade →
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
          A diferença é que aqui o tráfego conversa com o sistema.
          O cliente não fica perdido.
          Cada anúncio já leva pra uma estrutura pensada pra converter em agendamento.
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

    <!-- DIFERENCIAL -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        <!-- LEFT -->
        <div>

          <span class="text-xs font-bold tracking-widest uppercase text-green-400">
            O diferencial da SuaAgenda
          </span>

          <h2
            class="mt-3 mb-6 font-black leading-none text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(38px,4vw,58px)"
          >
            O ANÚNCIO NÃO<br>

            <span class="text-green-400">
              MORRE NO WHATSAPP
            </span>
          </h2>

          <div class="space-y-5 text-[16px] text-gray-500 leading-relaxed">

            <p>
              A maioria das barbearias perde cliente porque o barbeiro está trabalhando
              e não consegue responder rápido.
            </p>

            <p>
              O cara vê o anúncio,
              chama no WhatsApp,
              demora responder
              e o cliente vai pra outra barbearia.
            </p>

            <p>
              Na SuaAgenda,
              o tráfego já conecta direto com a agenda online.
              O cliente consegue escolher horário sozinho,
              sem depender de alguém responder mensagem.
            </p>

            <p>
              Isso aumenta conversão,
              reduz cliente perdido
              e faz o investimento em tráfego realmente virar faturamento.
            </p>

          </div>

        </div>

        <!-- RIGHT -->
        <div class="grid grid-cols-1 gap-4">

          <div
            v-for="card in systemFlow"
            :key="card.title"
            class="rounded-2xl border border-white/[.06] bg-[#181818] p-6"
          >
            <div class="flex items-start gap-4">

              <div class="w-12 h-12 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center text-2xl flex-shrink-0">
                {{ card.emoji }}
              </div>

              <div>
                <h3 class="text-lg font-bold text-white mb-2">
                  {{ card.title }}
                </h3>

                <p class="text-sm text-gray-500 leading-relaxed">
                  {{ card.desc }}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- RESULTADOS -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#111]">

      <div class="max-w-6xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400">
          Resultado real
        </span>

        <h2
          class="mt-3 mb-10 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4vw,60px)"
        >
          O QUE MUDA PRA UMA<br>

          <span class="text-green-400">
            BARBEARIA EM {{ cityData.city.toUpperCase() }}
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

    <!-- FINAL CTA -->
    <section class="relative w-full py-28 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden text-center">

      <div
        class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"
      />

      <div class="relative max-w-3xl mx-auto">

        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-5">
          Gestão de tráfego para barbearias em {{ cityData.city }}
        </span>

        <h2
          class="font-black leading-none text-white mb-6"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(42px,5vw,74px)"
        >
          MAIS CLIENTES.<br>

          MAIS HORÁRIOS<br>

          <span class="text-green-400">
            OCUPADOS.
          </span>
        </h2>

        <p class="text-lg text-gray-400 leading-relaxed mb-10">
          Traga mais pessoas do Instagram e Google
          direto pra sua agenda online
          sem depender de responder mensagem manualmente o dia inteiro.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4">

          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:scale-105"
          >
            🚀 Quero começar
          </a>

          <NuxtLink
            to="/barbearia#como-funciona"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400"
          >
            Ver como funciona →
          </NuxtLink>

        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { allCities } from '~/data/locations'

definePageMeta({
  layout: 'barber',
})

const route = useRoute()

const ufSlug = route.params.uf as string
const citySlug = route.params.cidade as string

const cityData = computed(() =>
  allCities.find(
    (c) =>
      c.ufSlug === ufSlug &&
      c.citySlug === citySlug,
  ) ?? null,
)

const heroBenefits = [
  {
    emoji: '📍',
    title: 'Google no seu bairro',
    desc:
      'Sua barbearia aparece quando alguém busca barbeiro ou barbearia na sua região.',
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
]

const trafficSteps = [
  {
    emoji: '🎯',
    title: 'Rodamos campanhas da sua cidade',
    desc:
      `Criamos anúncios focados em pessoas de ${cityData.value?.city} procurando corte, barba ou barbearia perto delas.`,
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
]

const systemFlow = [
  {
    emoji: '📢',
    title: 'Anúncio aparece no Instagram e Google',
    desc:
      'O cliente encontra sua barbearia enquanto procura corte ou barbeiro na região.',
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
]

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
    if (!cityData.value) {
      return {
        title: 'Cidade não encontrada',
      }
    }

    const city = cityData.value.city

    return {
      title:
        `Tráfego pago para Barbearia em ${city}`,

      meta: [
        {
          name: 'description',
          content:
            `Gestão de tráfego para barbearias em ${city}. ` +
            `Instagram, Google e anúncios conectados com agenda online e WhatsApp automático.`,
        },

        {
          name: 'robots',
          content: 'index, follow',
        },

        {
          property: 'og:title',
          content:
            `Tráfego pago para Barbearias em ${city}`,
        },

        {
          property: 'og:description',
          content:
            `Traga mais clientes para sua barbearia em ${city} com tráfego pago integrado ao sistema de agendamento.`,
        },
      ],

      link: [
        {
          rel: 'canonical',
          href:
            `https://suaagenda.link/barbearia/gestao-de-trafego/${ufSlug}/${citySlug}`,
        },
      ],
    }
  }),
)
</script>