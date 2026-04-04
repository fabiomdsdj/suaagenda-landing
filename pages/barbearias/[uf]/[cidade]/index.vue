<!-- pages/barbearias/[uf]/[cidade]/index.vue -->
<template>
  <div class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${ufSlug}`" class="hover:text-green-400 transition-colors">{{ cityData?.uf }}</NuxtLink>
          <span class="text-gray-700">/</span>
          <span class="text-gray-400">{{ cityData?.city }}</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 50%,rgba(52,211,153,.07) 0%,transparent 70%)"/>
      <div class="relative max-w-6xl mx-auto">
        <div class="flex flex-wrap gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">✂️ {{ cityData?.uf }}</span>
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">📍 {{ totalBairros }} bairros</span>
        </div>
        <!-- ✅ H1 com contador via SSR — Googlebot lê o número real -->
        <h1 class="font-black leading-none mb-6 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em">
          <template v-if="cityCount && cityCount > 0">
            {{ cityCount.toLocaleString('pt-BR') }} BARBEARIAS EM<br><span class="text-green-400">{{ cityData?.city.toUpperCase() }}</span>
          </template>
          <template v-else>
            BARBEARIAS EM<br><span class="text-green-400">{{ cityData?.city.toUpperCase() }}</span>
          </template>
        </h1>
        <p class="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
          Encontre barbearias em {{ cityData?.city }} com agendamento online. Escolha seu bairro e agende direto pelo WhatsApp.
        </p>
        <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5">
          ✂️ Sou barbeiro — quero aparecer aqui
        </a>
      </div>
    </section>

    <!-- BUSCA + CARDS -->
    <div class="bg-[#0a0a0a]">
      <PageSearchSection
        :uf="ufSlug"
        :city="citySlug"
        :context-label="cityData?.city ?? citySlug"
      />
    </div>

    <!-- BAIRROS POR REGIÃO -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Bairros</span>
        <h2 class="font-black leading-none mb-10 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)">ESCOLHA SEU BAIRRO</h2>

        <template v-if="hasZones">
          <div v-for="(districts, zoneName) in districtsByZone" :key="String(zoneName)" class="mb-12">
            <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4 flex items-center gap-2">
              <span class="w-4 h-px bg-gray-700 inline-block"/>{{ zoneName }}
            </p>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="neighborhood in flatNeighborhoods(districts)" :key="neighborhood.slug"
                :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhood.slug}`"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:text-green-400 text-sm text-gray-500 transition-all duration-150"
              >📍 {{ neighborhood.name }}</NuxtLink>
            </div>
          </div>
        </template>

        <template v-else>
          <div v-for="district in cityData?.districts" :key="district.slug" class="mb-10">
            <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4 flex items-center gap-2">
              <span class="w-4 h-px bg-gray-700 inline-block"/>{{ district.name }}
            </p>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="neighborhood in district.neighborhoods" :key="neighborhood.slug"
                :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhood.slug}`"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:text-green-400 text-sm text-gray-500 transition-all duration-150"
              >📍 {{ neighborhood.name }}</NuxtLink>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- SERVIÇOS -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0f0f0f]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Serviços</span>
        <h2 class="font-black leading-none mb-8 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)">SERVIÇOS EM {{ cityData?.city.toUpperCase() }}</h2>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="service in allServices" :key="service.slug"
            :to="`/barbearias?svc=${service.slug}&city=${citySlug}&uf=${ufSlug}`"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all text-sm text-gray-400 hover:text-white"
          >{{ service.emoji }} {{ service.name }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"/>
      <div class="relative max-w-xl mx-auto">
        <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          SUA BARBEARIA<br>NO <span class="text-green-400">GOOGLE</span> EM 5 MIN
        </h2>
        <p class="mb-8 text-[17px] leading-relaxed text-gray-400">
          Barbeiros em {{ cityData?.city }} que usam a SuaAgenda aparecem no Google sem pagar anúncio.
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
  <div v-if="!cityData" class="min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-20">
    <div class="text-center px-6">
      <p class="font-black text-green-400/20 leading-none mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:120px">404</p>
      <h1 class="text-2xl font-bold text-white mb-3">Cidade não encontrada</h1>
      <NuxtLink to="/barbearias" class="text-green-400 hover:underline">Ver todas as regiões →</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { allCities, allServices, type District, type Neighborhood } from '~/data/locations'

definePageMeta({ layout: 'barber' })

const route    = useRoute()
const ufSlug   = route.params.uf     as string
const citySlug = route.params.cidade as string

const cityData     = computed(() => allCities.find(c => c.ufSlug === ufSlug && c.citySlug === citySlug) ?? null)
const totalBairros = computed(() => cityData.value?.districts.reduce((acc, d) => acc + d.neighborhoods.length, 0) ?? 0)
const hasZones     = computed(() => cityData.value?.districts.some(d => d.zone != null) ?? false)

// ── ✅ SSR: contador busca no servidor — H1 tem o número quando Googlebot chega ──
const { data: cityCount } = await useAsyncData(
  `count-city-${ufSlug}-${citySlug}`,
  () => $fetch<number>(`/api/counts?uf=${ufSlug}&city=${citySlug}`).catch(() => 0),
  { server: true, default: () => 0 }
)

const districtsByZone = computed(() => {
  const groups: Record<string, District[]> = {}
  for (const d of cityData.value?.districts ?? []) {
    const zone = d.zone ?? 'Outras regiões'
    if (!groups[zone]) groups[zone] = []
    groups[zone].push(d)
  }
  return groups
})

function flatNeighborhoods(districts: District[]): Neighborhood[] {
  return districts.flatMap(d => d.neighborhoods)
}

// ── SEO com dados reais no servidor ──────────────────────────────────────
useHead(computed(() => {
  if (!cityData.value) return { title: 'Cidade não encontrada' }
  const c     = cityData.value
  const count = cityCount.value ?? 0
  const countStr = count > 0 ? count.toLocaleString('pt-BR') : ''

  return {
    title: countStr
      ? `${countStr} Barbearias em ${c.city}, ${c.uf} | Agende Online`
      : `Barbearias em ${c.city}, ${c.uf} | Agende Online`,
    meta: [
      {
        name: 'description',
        content: countStr
          ? `Encontre entre ${countStr} barbearias em ${c.city}, ${c.uf}. ${totalBairros.value} bairros com agendamento online direto pelo WhatsApp.`
          : `Encontre barbearias em ${c.city}, ${c.uf}. ${totalBairros.value} bairros com agendamento online direto pelo WhatsApp.`
      },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: `https://suaagenda.link/barbearias/${ufSlug}/${citySlug}` }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início',     item: 'https://suaagenda.link' },
        { '@type': 'ListItem', position: 2, name: 'Barbearias', item: 'https://suaagenda.link/barbearias' },
        { '@type': 'ListItem', position: 3, name: c.uf,         item: `https://suaagenda.link/barbearias/${ufSlug}` },
        { '@type': 'ListItem', position: 4, name: c.city,       item: `https://suaagenda.link/barbearias/${ufSlug}/${citySlug}` },
      ],
    }) }],
  }
}))
</script>