<template>
  <div v-if="ufData" class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
          <span class="text-gray-700">/</span>
          <span class="text-gray-400">{{ ufData.uf }}</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 50%,rgba(52,211,153,.07) 0%,transparent 70%)"></div>
      <div class="relative max-w-6xl mx-auto">
        <div class="flex flex-wrap gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">✂️ {{ ufData.uf }}</span>
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">📍 {{ cities.length }} cidades</span>
        </div>
        <!-- ✅ H1 com contador dinâmico da UF -->
        <h1 class="font-black leading-none mb-6 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em">
          <template v-if="ufCount.pending.value">
            <span class="animate-pulse">CARREGANDO...</span>
          </template>
          <template v-else>
            {{ ufCount.count.value.toLocaleString('pt-BR') }} BARBEARIAS EM<br><span class="text-green-400">{{ ufData.uf.toUpperCase() }}</span>
          </template>
        </h1>
        <p class="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
          Encontre barbearias em {{ ufData.uf }} com agendamento online. Escolha sua cidade e agende direto pelo WhatsApp.
        </p>
        <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5">
          ✂️ Sou barbeiro — quero aparecer aqui
        </a>
      </div>
    </section>

    <!-- ── BUSCA + CARDS ─────────────────────────────────────────── -->
    <div class="bg-[#0a0a0a]">
      <PageSearchSection
        :uf="ufSlug"
        :context-label="ufData.uf"
      />
    </div>

    <!-- CIDADES -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Cidades</span>
        <h2 class="font-black leading-none mb-10 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)">ESCOLHA SUA CIDADE</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="city in cities" :key="city.citySlug"
            :to="`/barbearias/${ufSlug}/${city.citySlug}`"
            class="group flex items-center justify-between p-5 rounded-2xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all duration-200"
          >
            <div>
              <p class="font-bold text-white group-hover:text-green-400 transition-colors">{{ city.city }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ totalNeighborhoods(city) }} bairros</p>
            </div>
            <span class="text-gray-600 group-hover:text-green-400 transition-colors text-lg">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"></div>
      <div class="relative max-w-xl mx-auto">
        <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          SUA BARBEARIA<br>NO <span class="text-green-400">GOOGLE</span> EM 5 MIN
        </h2>
        <p class="mb-8 text-[17px] leading-relaxed text-gray-400">
          Barbeiros em {{ ufData.uf }} que usam a SuaAgenda aparecem no Google sem pagar anúncio.
        </p>
        <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300 hover:scale-105">
          ✂️ Testar grátis por 7 dias
        </a>
        <div class="flex items-center justify-center flex-wrap gap-5 mt-6 text-sm text-gray-600">
          <span>🔒 Sem cartão</span><span>⚡ 5 minutos</span><span>✓ Cancela quando quiser</span>
        </div>
      </div>
    </section>

  </div>

  <!-- 404 -->
  <div v-else class="min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-20">
    <div class="text-center px-6">
      <p class="font-black text-green-400/20 leading-none mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:120px">404</p>
      <h1 class="text-2xl font-bold text-white mb-3">Estado não encontrado</h1>
      <NuxtLink to="/barbearias" class="text-green-400 hover:underline">Ver todas as regiões →</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { allCities, type CityData } from '~/data/locations'

definePageMeta({ layout: 'barber' })

const route  = useRoute()
const ufSlug = route.params.uf as string

const cities = computed(() => allCities.filter(c => c.ufSlug === ufSlug))
const ufData = computed(() => cities.value[0] ?? null)

// ✅ Contador da UF
const ufCount = useBarbershopCounts()
 
onMounted(() => {
  if (ufData.value) {
    ufCount.fetch({ uf: ufSlug })
  }
})

function totalNeighborhoods(city: CityData): number {
  return city.districts.reduce((acc, d) => acc + d.neighborhoods.length, 0)
}

useHead(computed(() => {
  if (!ufData.value) return { title: 'Estado não encontrado' }
  return {
    title: `${ufCount.count.value.toLocaleString('pt-BR')} Barbearias em ${ufData.value.uf} — Agende Online | SuaAgenda`,
    meta: [
      { 
        name: 'description', 
        content: `Encontre entre ${ufCount.count.value.toLocaleString('pt-BR')} barbearias em ${ufData.value.uf} com agendamento online. ${cities.value.length} cidades disponíveis.` 
      },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: `https://suaagenda.link/barbearias/${ufSlug}` }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início',     item: 'https://suaagenda.link' },
        { '@type': 'ListItem', position: 2, name: 'Barbearias', item: 'https://suaagenda.link/barbearias' },
        { '@type': 'ListItem', position: 3, name: ufData.value.uf, item: `https://suaagenda.link/barbearias/${ufSlug}` },
      ],
    }) }],
  }
}))
</script>