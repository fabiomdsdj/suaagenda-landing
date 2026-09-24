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
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
            ✂️ {{ ufData.uf }}
          </span>
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            📍 {{ cities.length }} cidades
          </span>
        </div>

        <h1 class="font-black leading-none mb-6 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em">
          <template v-if="ufCount && ufCount > 0">
            {{ ufCount.toLocaleString('pt-BR') }} BARBEARIAS EM<br>
            <span class="text-green-400">{{ ufData.uf.toUpperCase() }}</span>
          </template>
          <template v-else>
            BARBEARIAS EM<br>
            <span class="text-green-400">{{ ufData.uf.toUpperCase() }}</span>
          </template>
        </h1>

        <p class="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
          Encontre barbearias em {{ ufData.uf }} com agendamento online. Escolha sua cidade e agende direto pelo WhatsApp.
        </p>

        <a href="https://wa.me/5511941649284"
          class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
        >
          ✂️ Sou barbeiro — quero aparecer aqui
        </a>
      </div>
    </section>

    <!-- BUSCA + CARDS -->
    <div class="bg-[#0a0a0a]">
      <PageSearchSection :uf="ufSlug" :context-label="ufData.uf" />
    </div>

    <!-- CIDADES -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Cidades</span>
        <h2 class="font-black leading-none mb-10 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)">
          ESCOLHA SUA CIDADE
        </h2>

        <!-- Loading skeleton enquanto cidades do banco carregam -->
        <div v-if="pendingCities" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="i in 6" :key="i" class="h-[72px] rounded-2xl bg-[#181818] animate-pulse border border-white/[.04]" />
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="city in cities"
            :key="city.citySlug"
            :to="`/barbearias/${ufSlug}/${city.citySlug}`"
            class="group flex items-center justify-between p-5 rounded-2xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all duration-200"
          >
            <div>
              <p class="font-bold text-white group-hover:text-green-400 transition-colors">{{ city.city }}</p>
              <p class="text-xs text-gray-500 mt-0.5">
                <template v-if="totalNeighborhoods(city) > 0">
                  {{ totalNeighborhoods(city) }} bairros
                </template>
                <template v-else>
                  Ver barbearias
                </template>
              </p>
            </div>
            <span class="text-gray-600 group-hover:text-green-400 transition-colors text-lg">→</span>
          </NuxtLink>
        </div>

        <!-- Empty state se não encontrar nenhuma cidade -->
        <div v-if="!pendingCities && cities.length === 0" class="text-center py-12">
          <p class="text-gray-500">Nenhuma cidade encontrada para este estado.</p>
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
        <a href="https://wa.me/5511941649284"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300 hover:scale-105"
        >
          ✂️ Testar grátis por 15 dias
        </a>
        <div class="flex items-center justify-center flex-wrap gap-5 mt-6 text-sm text-gray-600">
          <span>🔒 Sem cartão</span>
          <span>⚡ 5 minutos</span>
          <span>✓ Cancela quando quiser</span>
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

// ── Cidades hardcoded para essa UF ───────────────────────────────────────────
const hardcodedCities = allCities.filter(c => c.ufSlug === ufSlug)

// ── UFs dinâmicas do banco ────────────────────────────────────────────────────
const { data: availableUFs } = await useAsyncData(
  'available-ufs',
  () => $fetch<{ data: { uf: string; ufSlug: string; count: number }[] }>('/api/available-ufs'),
  { server: true, lazy: false, default: () => ({ data: [] }) }
)

// ── ufData: hardcoded tem prioridade; banco preenche UFs dinâmicas ────────────
const ufData = computed(() => {
  if (hardcodedCities.length) return hardcodedCities[0]

  const fromDB = availableUFs.value?.data?.find(u => u.ufSlug === ufSlug)
  if (!fromDB) return null

  return {
    uf:       fromDB.uf ?? ufSlug.toUpperCase(),
    ufSlug:   fromDB.ufSlug,
    city:     '',
    citySlug: '',
    zone:     '',
    region:   '',
    districts: [],
  }
})

// ── Cidades do banco (só busca quando não há hardcoded) ───────────────────────
const { data: dbCities, pending: pendingCities } = await useAsyncData(
  `cities-by-uf-${ufSlug}`,
  () => {
    if (hardcodedCities.length) return Promise.resolve({ data: [] as { city: string; citySlug: string }[] })
    return $fetch<{ data: { city: string; citySlug: string }[] }>(`/api/cities-by-uf?uf=${ufSlug}`)
      .catch(() => ({ data: [] as { city: string; citySlug: string }[] }))
  },
  { server: true, lazy: false, default: () => ({ data: [] as { city: string; citySlug: string }[] }) }
)

// ── Cidades visíveis: hardcoded tem prioridade, banco preenche o resto ────────
const cities = computed((): CityData[] => {
  if (hardcodedCities.length) return hardcodedCities

  console.log('[cities computed] dbCities:', JSON.stringify(dbCities.value?.data?.[0]))

  return (dbCities.value?.data ?? []).map(c => ({
    city:      c.city ?? c.name ?? '',  // ← fallback
    citySlug:  c.citySlug ?? c.slug ?? '',
    uf:        c.uf ?? ufData.value?.uf ?? ufSlug.toUpperCase(),
    ufSlug:    c.ufSlug ?? ufSlug,
    zone:      '',
    region:    '',
    districts: [],
  }))
})

// ── Contador de barbearias na UF ──────────────────────────────────────────────
const { data: ufCount } = await useAsyncData(
  `count-uf-${ufSlug}`,
  () => $fetch<number>(`/api/count?uf=${ufSlug}`).catch(() => 0),
  { server: true, lazy: false, default: () => 0 }
)

// ── Helpers ───────────────────────────────────────────────────────────────────
function totalNeighborhoods(city: CityData): number {
  return city.districts.reduce((acc, d) => acc + d.neighborhoods.length, 0)
}

// ── SEO ───────────────────────────────────────────────────────────────────────
useHead(computed(() => {
  if (!ufData.value) return { title: 'Estado não encontrado' }

  const count    = ufCount.value ?? 0
  const countStr = count > 0 ? count.toLocaleString('pt-BR') : ''

  return {
    title: countStr
      ? `${countStr} Barbearias em ${ufData.value.uf} - Agende Online`
      : `Barbearias em ${ufData.value.uf} - Agende Online`,
    meta: [
      {
        name:    'description',
        content: countStr
          ? `Encontre entre ${countStr} barbearias em ${ufData.value.uf} com agendamento online. ${cities.value.length} cidades disponíveis.`
          : `Encontre barbearias em ${ufData.value.uf} com agendamento online. ${cities.value.length} cidades disponíveis.`,
      },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: `https://suaagenda.link/barbearias/${ufSlug}` }],
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type':    'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início',     item: 'https://suaagenda.link' },
          { '@type': 'ListItem', position: 2, name: 'Barbearias', item: 'https://suaagenda.link/barbearias' },
          { '@type': 'ListItem', position: 3, name: ufData.value.uf, item: `https://suaagenda.link/barbearias/${ufSlug}` },
        ],
      }),
    }],
  }
}))
</script>