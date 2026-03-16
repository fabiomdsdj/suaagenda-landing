<template>
    <div v-if="cityData" class="text-[15px]">
  
      <!-- BREADCRUMB -->
      <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
        <div class="max-w-6xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span>/</span>
            <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
            <span>/</span>
            <span class="text-gray-400">{{ cityData.city }}</span>
          </nav>
        </div>
      </section>
  
      <!-- HERO -->
      <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 40%,rgba(52,211,153,.07) 0%,transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">{{ cityData.region }}</span>
          <h1
            class="font-black leading-none mb-6 text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em"
          >
            BARBEARIAS EM<br>
            <span class="text-green-400">{{ cityData.city.toUpperCase() }}</span>
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
            Encontre barbearias por bairro em {{ cityData.city }}. Profissionais que usam agenda online
            para organizar horários e receber agendamentos direto pelo WhatsApp.
          </p>
          <p class="text-sm text-gray-600">{{ totalNeighborhoods }} bairros mapeados em {{ cityData.city }}</p>
        </div>
      </section>
  
      <!-- DISTRITOS E BAIRROS -->
      <section class="w-full py-16 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto space-y-12">
          <div v-for="district in cityData.districts" :key="district.slug">
            <h2
              class="font-black leading-none mb-6 text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3vw,36px)"
            >
              {{ district.name.toUpperCase() }}
              <span class="text-green-400/40 text-lg font-normal ml-3 font-sans">
                {{ district.neighborhoods.length }} bairros
              </span>
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <NuxtLink
                v-for="n in district.neighborhoods"
                :key="n.slug"
                :to="`/barbearias/${cityData.citySlug}/${n.slug}`"
                class="group flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all duration-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-green-400/40 group-hover:bg-green-400 transition-colors flex-shrink-0"></span>
                <span class="text-[14px] text-gray-400 group-hover:text-white transition-colors leading-snug">{{ n.name }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a] text-center">
        <div class="max-w-xl mx-auto">
          <h2
            class="font-black leading-none text-white mb-4"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4vw,52px)"
          >
            BARBEIRO EM {{ cityData.city.toUpperCase() }}?
          </h2>
          <p class="text-[17px] text-gray-400 leading-relaxed mb-8">
            Apareça no Google quando alguém buscar barbearia no seu bairro em {{ cityData.city }}.
            Pronto em 5 minutos, sem técnico.
          </p>
          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300"
          >
            ✂️ Testar 7 dias grátis
          </a>
        </div>
      </section>
  
    </div>
  
    <div v-else class="min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-20">
      <div class="text-center">
        <p class="text-2xl font-bold text-white mb-3">Cidade não encontrada</p>
        <NuxtLink to="/barbearias" class="text-green-400 hover:underline">Ver todas as regiões →</NuxtLink>
      </div>
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
  
  const totalNeighborhoods = computed(
    () => cityData.value?.districts.reduce((acc, d) => acc + d.neighborhoods.length, 0) ?? 0
  )
  
  useHead(
    computed(() => {
      if (!cityData.value) return { title: 'Cidade não encontrada' }
      const city = cityData.value.city
      return {
        title: `Barbearias em ${city} por Bairro — Agenda Online | SuaAgenda`,
        meta: [
          {
            name: 'description',
            content: `Barbearias em ${city} organizadas por bairro. Profissionais com agenda online, agendamento via WhatsApp e presença no Google.`,
          },
          { name: 'robots', content: 'index, follow' },
        ],
        link: [
          { rel: 'canonical', href: `https://suaagenda.link/barbearias/${citySlug}` },
        ],
      }
    })
  )
  </script>