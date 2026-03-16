<template>
    <div v-if="cityData" class="text-[15px]">
  
      <!-- BREADCRUMB -->
      <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
        <div class="max-w-6xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span>/</span>
            <NuxtLink to="/barbeiros" class="hover:text-green-400 transition-colors">Barbeiros</NuxtLink>
            <span>/</span>
            <span class="text-gray-400">{{ cityData.city }}</span>
          </nav>
        </div>
      </section>
  
      <!-- HERO -->
      <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 40%,rgba(52,211,153,.07) 0%,transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto">
          <h1
            class="font-black leading-none mb-6 text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em"
          >
            BARBEIROS EM<br>
            <span class="text-green-400">{{ cityData.city.toUpperCase() }}</span><br>
            <span class="text-white/40" style="font-size:clamp(24px,3vw,40px)">QUE USAM AGENDA ONLINE</span>
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
            Barbeiros em {{ cityData.city }} que usam a SuaAgenda para organizar horários, receber agendamentos
            pelo WhatsApp e aparecer nas primeiras posições do Google no seu bairro.
          </p>
          <div class="flex flex-wrap gap-4">
            <a
              href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
            >
              ✂️ Sou barbeiro — quero entrar
            </a>
            <NuxtLink
              :to="`/barbearias/${cityData.citySlug}`"
              class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
            >
              Ver por bairro →
            </NuxtLink>
          </div>
        </div>
      </section>
  
      <!-- BAIRROS — onde atuam -->
      <section class="w-full py-16 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto">
          <h2
            class="font-black leading-none mb-3 text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3.5vw,44px)"
          >
            BAIRROS ATENDIDOS EM <span class="text-green-400">{{ cityData.city.toUpperCase() }}</span>
          </h2>
          <p class="text-[16px] text-gray-400 mb-10">
            Clique no bairro para ver informações e como barbeiros da região usam agenda online.
          </p>
          <div class="space-y-8">
            <div v-for="district in cityData.districts" :key="district.slug">
              <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-3">{{ district.name }}</p>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="n in district.neighborhoods"
                  :key="n.slug"
                  :to="`/barbearias/${cityData.citySlug}/${n.slug}`"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium text-gray-400 bg-[#181818] border border-white/[.06] hover:border-green-400/30 hover:text-green-400 transition-all"
                >
                  📍 {{ n.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- POR QUE USAR -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-green-400">Por que barbeiros de {{ cityData.city }} escolhem a SuaAgenda</span>
            <h2
              class="mt-3 mb-5 font-black leading-none text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,48px)"
            >
              FEITO PRA QUEM<br><span class="text-green-400">TRABALHA NO CELULAR</span>
            </h2>
            <p class="text-[16px] text-gray-400 leading-relaxed mb-4">
              Barbeiros em {{ cityData.city }} não ficam sentados na frente de um computador. Trabalham de pé, tesoura na mão, cliente na cadeira.
            </p>
            <p class="text-[16px] text-gray-400 leading-relaxed mb-6">
              A SuaAgenda foi construída pra funcionar no celular — agendamentos chegam no WhatsApp, a agenda é gerenciada com um dedo, e o site aparece no Google automaticamente.
            </p>
            <a
              href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300"
            >
              ✂️ Começar grátis
            </a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="stat in cityStats"
              :key="stat.label"
              class="rounded-2xl border border-green-400/10 bg-[#181818] p-6 text-center"
            >
              <p
                class="font-black text-green-400 leading-none mb-2"
                style="font-family:'Bebas Neue',sans-serif;font-size:44px"
              >{{ stat.num }}</p>
              <p class="text-sm text-gray-500 leading-snug">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </section>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { allCities } from '~/data/locations'
  
  definePageMeta({ layout: 'barber' })
  
  const route = useRoute()
  const citySlug = route.params.cidade as string
  
  const cityData = computed(() =>
    allCities.find((c) => c.citySlug === citySlug) ?? null
  )
  
  const cityStats = [
    { num: '500+', label: 'Barbearias ativas na plataforma' },
    { num: '5min', label: 'Pra estar no ar' },
    { num: '100%', label: 'Funciona no celular' },
    { num: '7dias', label: 'Trial gratuito sem cartão' },
  ]
  
  useHead(
    computed(() => {
      if (!cityData.value) return { title: 'Cidade não encontrada' }
      const city = cityData.value.city
      return {
        title: `Barbeiros em ${city} com Agenda Online | SuaAgenda`,
        meta: [
          {
            name: 'description',
            content: `Barbeiros em ${city} que usam agenda online para organizar horários e receber agendamentos pelo WhatsApp. Apareça no Google no seu bairro.`,
          },
          { name: 'robots', content: 'index, follow' },
        ],
        link: [
          { rel: 'canonical', href: `https://suaagenda.link/barbeiros/${citySlug}` },
        ],
      }
    })
  )
  </script>