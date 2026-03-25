<!-- pages/barbearias/[uf]/[cidade]/[bairro]/s/[servico]/index.vue -->
<template>
  <!-- ───────────────────────────── PÁGINA NORMAL ───────────────────────────── -->
  <div v-if="seo" class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${seo.ufSlug}`" class="hover:text-green-400 transition-colors">{{ seo.uf }}</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${seo.ufSlug}/${seo.citySlug}`" class="hover:text-green-400 transition-colors">{{ seo.cityName }}</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${seo.ufSlug}/${seo.citySlug}/${seo.neighborhoodSlug}`" class="hover:text-green-400 transition-colors">{{ seo.neighborhoodName }}</NuxtLink>
          <span class="text-gray-700">/</span>
          <span class="text-gray-400">{{ seo.serviceName }}</span>
        </nav>
      </div>
    </section>

    <!-- HERO SERVIÇO -->
    <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 50%,rgba(52,211,153,.07) 0%,transparent 70%)"></div>
      <div class="relative max-w-6xl mx-auto">
        <div class="flex flex-wrap gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
            {{ currentService?.emoji }} {{ seo.serviceName }}
          </span>
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            📍 {{ seo.neighborhoodName }}, {{ seo.cityName }}
          </span>
        </div>
        <h1 class="font-black leading-none mb-6 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em">
          {{ seo.serviceName?.toUpperCase() }} EM<br>
          <span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">{{ seo.introParagraph }}</p>
        <div class="flex flex-wrap gap-4">
          <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5">
            {{ currentService?.emoji }} Sou barbeiro — quero aparecer aqui
          </a>
        </div>
      </div>
    </section>

    <!-- BUSCA + CARDS filtrado por serviço -->
    <div class="bg-[#0a0a0a]">
      <PageSearchSection
        :uf="seo.ufSlug"
        :city="seo.citySlug"
        :neighborhood="seo.neighborhoodSlug"
        :svc="serviceSlug"
        :context-label="`${seo.serviceName} em ${seo.neighborhoodName}`"
      />
    </div>

    <!-- OUTROS SERVIÇOS -->
    <section class="w-full py-16 px-6 md:px-16 bg-[#0f0f0f]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-gray-500 block mb-4">
          Outros serviços em {{ seo.neighborhoodName }}
        </span>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="service in otherServices" :key="service.slug"
            :to="`/barbearias/${seo.ufSlug}/${seo.citySlug}/${seo.neighborhoodSlug}/s/${service.slug}`"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all duration-200 text-sm text-gray-400 hover:text-white"
          >
            <span>{{ service.emoji }}</span>{{ service.name }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CONTEÚDO SEO -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        <div class="lg:col-span-2 space-y-8">
          <div class="rounded-2xl border border-green-400/10 bg-[#181818] p-8">
            <h2 class="font-black leading-none mb-4 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
              {{ seo.serviceName?.toUpperCase() }} COM AGENDAMENTO ONLINE EM
              <span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span>
            </h2>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">{{ seo.secondParagraph }}</p>
            <p class="text-[16px] leading-relaxed text-gray-400">{{ seo.thirdParagraph }}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-7 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
            <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">Você é barbeiro?</p>
            <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:28px">APAREÇA NO GOOGLE EM 5 MIN</h3>
            <a href="https://wa.me/5511941649284" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300">
              🔥 Testar 7 dias grátis
            </a>
          </div>
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6">
            <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Ver tudo</p>
            <NuxtLink
              :to="`/barbearias/${seo.ufSlug}/${seo.citySlug}/${seo.neighborhoodSlug}`"
              class="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              ← Voltar para {{ seo.neighborhoodName }}
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

  </div>

  <!-- ─────────────────────────── FALLBACK 404 ─────────────────────────────── -->
  <!--
    Hierarquia de fallback:
      1. Bairro existe mas serviço é inválido  → mostra outros serviços do mesmo bairro
      2. Bairro não existe, cidade sim         → mostra bairros da cidade + CTA
      3. Cidade também não existe              → CTA geral
  -->
  <div v-else class="min-h-screen bg-[#0a0a0a] pt-28">

    <!-- Breadcrumb mínimo -->
    <div class="px-6 md:px-16 pb-6 border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
          <template v-if="fallbackCity">
            <span class="text-gray-700">/</span>
            <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}`" class="hover:text-green-400 transition-colors">
              {{ fallbackCity.city }}
            </NuxtLink>
          </template>
          <template v-if="fallbackNeighborhoodExists">
            <span class="text-gray-700">/</span>
            <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`" class="hover:text-green-400 transition-colors">
              {{ neighborhoodSlug.replace(/-/g, ' ') }}
            </NuxtLink>
          </template>
          <span class="text-gray-700">/</span>
          <span class="text-gray-600">{{ serviceSlug }}</span>
        </nav>
      </div>
    </div>

    <div class="px-6 md:px-16 py-20">
      <div class="max-w-6xl mx-auto">

        <!-- Cabeçalho do 404 -->
        <div class="mb-14">
          <p class="font-black text-green-400/10 leading-none mb-2 select-none" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(80px,15vw,160px)">404</p>
          <h1 class="text-2xl md:text-3xl font-black text-white mb-3" style="font-family:'Bebas Neue',sans-serif">
            <template v-if="fallbackNeighborhoodExists">SERVIÇO NÃO ENCONTRADO</template>
            <template v-else>BAIRRO NÃO MAPEADO AINDA</template>
          </h1>
          <p class="text-gray-400 text-[16px] max-w-lg">
            <template v-if="fallbackNeighborhoodExists">
              Não encontramos <strong class="text-white">{{ serviceSlug.replace(/-/g, ' ') }}</strong> em
              <strong class="text-white">{{ neighborhoodSlug.replace(/-/g, ' ') }}</strong>.
              Veja outros serviços disponíveis nesse bairro.
            </template>
            <template v-else-if="fallbackCity">
              Ainda não temos esse bairro mapeado, mas encontramos opções em
              <strong class="text-white">{{ fallbackCity.city }}</strong>.
            </template>
            <template v-else>
              Essa região ainda não está no nosso mapa.
            </template>
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2 space-y-10">

            <!-- ── Caso 1: bairro existe, serviço inválido ── -->
            <template v-if="fallbackNeighborhoodExists">
              <div>
                <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-4 flex items-center gap-2">
                  <span class="w-4 h-px bg-green-400/40 inline-block"/>Serviços disponíveis nesse bairro
                </p>
                <div class="flex flex-wrap gap-3">
                  <NuxtLink
                    v-for="service in allServices" :key="service.slug"
                    :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}/s/${service.slug}`"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] hover:text-white text-sm text-gray-400 transition-all duration-150"
                  >
                    {{ service.emoji }} {{ service.name }}
                  </NuxtLink>
                </div>
                <NuxtLink
                  :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`"
                  class="inline-flex items-center gap-2 mt-6 text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  ← Voltar para {{ neighborhoodSlug.replace(/-/g, ' ') }}
                </NuxtLink>
              </div>
            </template>

            <!-- ── Caso 2: cidade existe, bairro não ── -->
            <template v-else-if="fallbackCity">

              <div v-if="fallbackSameDistrict.length">
                <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-4 flex items-center gap-2">
                  <span class="w-4 h-px bg-green-400/40 inline-block"/>Bairros do mesmo distrito
                </p>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="n in fallbackSameDistrict" :key="n.slug"
                    :to="`/barbearias/${ufSlug}/${citySlug}/${n.slug}`"
                    class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/40 hover:text-green-400 hover:bg-green-400/[.03] text-sm text-gray-400 transition-all duration-150"
                  >📍 {{ n.name }}</NuxtLink>
                </div>
              </div>

              <div v-if="fallbackOtherNeighborhoods.length">
                <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4 flex items-center gap-2">
                  <span class="w-4 h-px bg-gray-700 inline-block"/>Outros bairros em {{ fallbackCity.city }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="n in fallbackOtherNeighborhoods" :key="n.slug"
                    :to="`/barbearias/${ufSlug}/${citySlug}/${n.slug}`"
                    class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:text-green-400 text-sm text-gray-500 transition-all duration-150"
                  >📍 {{ n.name }}</NuxtLink>
                </div>
              </div>

              <NuxtLink
                :to="`/barbearias/${ufSlug}/${citySlug}`"
                class="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Ver todos os bairros em {{ fallbackCity.city }} →
              </NuxtLink>
            </template>

            <!-- ── Caso 3: cidade não existe ── -->
            <template v-else>
              <div class="flex flex-wrap gap-4">
                <NuxtLink to="/barbearias" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-400/30 text-sm transition-all">
                  ← Ver todas as regiões
                </NuxtLink>
                <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-400 text-black text-sm font-bold transition hover:bg-green-300">
                  ✂️ Cadastrar minha barbearia
                </a>
              </div>
            </template>

          </div>

          <!-- Sidebar CTA -->
          <aside>
            <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-7 relative overflow-hidden sticky top-24">
              <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
              <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">Você é barbeiro?</p>
              <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:26px">
                <template v-if="fallbackNeighborhoodExists">
                  OFEREÇA {{ serviceSlug.replace(/-/g, ' ').toUpperCase() }} AQUI
                </template>
                <template v-else>
                  COLOCA SEU BAIRRO NO MAPA
                </template>
              </h3>
              <p class="text-[13px] text-gray-400 leading-relaxed mb-5">
                <template v-if="fallbackNeighborhoodExists">
                  Cadastre sua barbearia e apareça quando alguém buscar {{ serviceSlug.replace(/-/g, ' ') }} em {{ neighborhoodSlug.replace(/-/g, ' ') }}.
                </template>
                <template v-else>
                  Cadastre sua barbearia e apareça no Google quando alguém buscar nessa região.
                </template>
              </p>
              <a href="https://wa.me/5511941649284" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300">
                🔥 Testar 7 dias grátis
              </a>
              <p class="text-xs text-center text-gray-600 mt-3">Sem cartão de crédito · Cancela quando quiser</p>
            </div>
          </aside>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalSeo } from '~/composables/useLocalSeo'
import { allCities, allServices, type CityData, type Neighborhood } from '~/data/locations'

definePageMeta({ layout: 'barber' })

const route = useRoute()

const ufSlug           = (route.params.uf      as string).toLowerCase().trim()
const citySlug         = (route.params.cidade  as string).toLowerCase().trim()
const neighborhoodSlug = (route.params.bairro  as string).toLowerCase().trim()
const serviceSlug      = (route.params.servico as string).toLowerCase().trim()

const { data: seo } = useLocalSeo(ufSlug, citySlug, neighborhoodSlug, serviceSlug)

// ─────────────────────────────────────────────────────────────────
// Dados da página normal
// ─────────────────────────────────────────────────────────────────

const currentService = computed(() =>
  seo.value?.availableServices.find(s => s.slug === serviceSlug)
)

const otherServices = computed(() =>
  seo.value?.availableServices.filter(s => s.slug !== serviceSlug) ?? []
)

// ─────────────────────────────────────────────────────────────────
// Fallback 404
// ─────────────────────────────────────────────────────────────────

// Cidade existe?
const fallbackCity = computed<CityData | null>(() =>
  allCities.find(c => c.ufSlug === ufSlug && c.citySlug === citySlug) ?? null
)

// Bairro existe na cidade? (serviço inválido mas bairro ok)
const fallbackNeighborhoodExists = computed(() => {
  if (!fallbackCity.value) return false
  return fallbackCity.value.districts.some(d =>
    d.neighborhoods.some(n => n.slug === neighborhoodSlug)
  )
})

// Melhor distrito para sugestão (mesmo algoritmo do [bairro]/index.vue)
const fallbackDistrict = computed(() => {
  if (!fallbackCity.value || fallbackNeighborhoodExists.value) return null
  const prefix = neighborhoodSlug.split('-').slice(0, 2).join('-')
  return (
    fallbackCity.value.districts.find(d =>
      d.neighborhoods.some(n => n.slug.startsWith(prefix))
    ) ??
    [...fallbackCity.value.districts].sort(
      (a, b) => b.neighborhoods.length - a.neighborhoods.length
    )[0] ??
    null
  )
})

const fallbackSameDistrict = computed<Neighborhood[]>(() => {
  if (!fallbackDistrict.value) return []
  return fallbackDistrict.value.neighborhoods
    .filter(n => n.slug !== neighborhoodSlug)
    .slice(0, 16)
})

const fallbackOtherNeighborhoods = computed<Neighborhood[]>(() => {
  if (!fallbackCity.value) return []
  const districtSlug = fallbackDistrict.value?.slug
  return fallbackCity.value.districts
    .filter(d => d.slug !== districtSlug)
    .flatMap(d => d.neighborhoods)
    .slice(0, 20)
})

// ─────────────────────────────────────────────────────────────────
// Head
// ─────────────────────────────────────────────────────────────────

useHead(computed(() => {
  // 404: bairro ok, serviço inválido
  if (!seo.value && fallbackNeighborhoodExists.value) {
    return {
      title: `${serviceSlug.replace(/-/g, ' ')} em ${neighborhoodSlug.replace(/-/g, ' ')} — não encontrado`,
      meta: [{ name: 'robots', content: 'noindex, follow' }],
    }
  }

  // 404: cidade existe, bairro não
  if (!seo.value && fallbackCity.value) {
    return {
      title: `Barbearias perto de ${neighborhoodSlug.replace(/-/g, ' ')} — ${fallbackCity.value.city}`,
      meta: [
        { name: 'description', content: `Veja barbearias em bairros próximos de ${neighborhoodSlug.replace(/-/g, ' ')}, ${fallbackCity.value.city}.` },
        { name: 'robots',      content: 'noindex, follow' },
      ],
    }
  }

  // 404 total
  if (!seo.value) {
    return {
      title: 'Página não encontrada',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    }
  }

  // Página normal
  return {
    title: seo.value.metaTitle,
    meta: [
      { name: 'description',        content: seo.value.metaDescription },
      { property: 'og:title',       content: seo.value.metaTitle },
      { property: 'og:description', content: seo.value.metaDescription },
      { property: 'og:url',         content: seo.value.canonicalUrl },
      { property: 'og:type',        content: 'website' },
      { name: 'robots',             content: 'index, follow' },
    ],
    link:   [{ rel: 'canonical', href: seo.value.canonicalUrl }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(seo.value.jsonLd) }],
  }
}))
</script>