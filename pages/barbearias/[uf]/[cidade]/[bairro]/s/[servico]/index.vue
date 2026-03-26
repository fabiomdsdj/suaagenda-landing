<!-- pages/barbearias/[uf]/[cidade]/[bairro]/s/[servico]/index.vue -->
<template>
  <div>

    <!-- ═══════════════════════════ PÁGINA NORMAL ════════════════════════════
         seo != null: bairro + serviço mapeados no locations
    ════════════════════════════════════════════════════════════════════════ -->
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
          <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5">
            {{ currentService?.emoji }} Sou barbeiro — quero aparecer aqui
          </a>
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
          <span class="text-xs font-bold tracking-widest uppercase text-gray-500 block mb-4">Outros serviços em {{ seo.neighborhoodName }}</span>
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
          <div class="lg:col-span-2">
            <div class="rounded-2xl border border-green-400/10 bg-[#181818] p-8">
              <h2 class="font-black leading-none mb-4 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
                {{ seo.serviceName?.toUpperCase() }} COM AGENDAMENTO ONLINE EM
                <span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span>
              </h2>
              <p class="text-[16px] leading-relaxed text-gray-400 mb-4">{{ seo.secondParagraph }}</p>
              <p class="text-[16px] leading-relaxed text-gray-400">{{ seo.thirdParagraph }}</p>
            </div>
          </div>
          <aside class="space-y-6">
            <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-7 relative overflow-hidden">
              <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
              <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">Você é barbeiro?</p>
              <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:28px">APAREÇA NO GOOGLE EM 5 MIN</h3>
              <p class="text-[14px] text-gray-400 leading-relaxed mb-5">
                Cadastre sua barbearia e apareça quando alguém buscar
                <strong class="text-white">{{ seo.serviceName }}</strong> em
                <strong class="text-white">{{ seo.neighborhoodName }}</strong>.
              </p>
              <a href="https://wa.me/5511941649284" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300">🔥 Testar 7 dias grátis</a>
              <p class="text-xs text-center text-gray-600 mt-3">Sem cartão de crédito · Cancela quando quiser</p>
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

    <!-- ════════════════════════════ FALLBACK ════════════════════════════════
         seo === null: serviço inexistente neste bairro OU bairro não mapeado.
         Mostra BarbershopCards filtrados pelo serviço dos bairros vizinhos.
    ════════════════════════════════════════════════════════════════════════ -->
    <div v-else class="min-h-screen bg-[#0a0a0a] pt-28">

      <!-- Breadcrumb -->
      <div class="px-6 md:px-16 pb-6 border-b border-white/5">
        <div class="max-w-6xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span class="text-gray-700">/</span>
            <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
            <span class="text-gray-700">/</span>
            <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}`" class="hover:text-green-400 transition-colors">{{ fallback.cityLabel }}</NuxtLink>
            <span class="text-gray-700">/</span>
            <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`" class="hover:text-green-400 transition-colors">{{ neighborhoodLabel }}</NuxtLink>
            <span class="text-gray-700">/</span>
            <span class="text-gray-600">{{ serviceLabel }}</span>
          </nav>
        </div>
      </div>

      <!-- Hero -->
      <section class="relative w-full py-16 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden border-b border-white/[.04]">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 60% 50% at 60% 50%,rgba(52,211,153,.05) 0%,transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto">
          <h1 class="font-black leading-none mb-4 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,5vw,64px);letter-spacing:.03em">
            {{ serviceLabel.toUpperCase() }} PERTO DE<br>
            <span class="text-green-400">{{ neighborhoodLabel.toUpperCase() }}</span>
          </h1>
          <p class="text-lg text-gray-400 max-w-2xl leading-relaxed">
            <template v-if="fallback.level.value === 'district'">
              Não encontramos <strong class="text-white">{{ serviceLabel }}</strong> em
              <strong class="text-white">{{ neighborhoodLabel }}</strong>, mas veja profissionais nos bairros vizinhos de
              <strong class="text-white">{{ fallback.districtLabel || fallback.cityLabel }}</strong>.
            </template>
            <template v-else-if="fallback.level.value === 'city'">
              Não encontramos esse serviço neste bairro. Veja profissionais em
              <strong class="text-white">{{ fallback.cityLabel }}</strong>.
            </template>
            <template v-else-if="fallback.level.value === 'uf'">
              Ainda não temos cobertura nessa cidade para esse serviço. Confira no estado.
            </template>
            <template v-else>
              Essa região ainda não está no nosso mapa.
            </template>
          </p>
        </div>
      </section>

      <div class="px-6 md:px-16 py-14">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <!-- Coluna principal -->
            <div class="lg:col-span-2 space-y-14">

              <!-- Skeleton -->
              <div v-if="fallback.pending.value" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="i in 6" :key="i" class="h-64 rounded-2xl bg-[#111] animate-pulse border border-white/[.04]" />
              </div>

              <!-- Cards reais filtrados pelo serviço -->
              <template v-else-if="fallback.shops.value.length > 0">
                <div>
                  <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-1 flex items-center gap-2">
                    <span class="w-4 h-px bg-green-400/40 inline-block" />
                    {{ serviceLabel }} — profissionais próximos
                  </p>
                  <p class="text-[13px] text-gray-600 mb-6">
                    Atendem próximo a <strong class="text-gray-400">{{ neighborhoodLabel }}</strong>
                  </p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <BarbershopCard
                      v-for="shop in fallback.shops.value"
                      :key="shop.id"
                      :shop="shop"
                    />
                  </div>
                </div>
              </template>

              <!-- Vazio -->
              <template v-else>
                <div class="flex flex-wrap gap-4">
                  <NuxtLink
                    :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`"
                    class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-400/30 text-sm transition-all"
                  >← Barbearias em {{ neighborhoodLabel }}</NuxtLink>
                  <a
                    href="https://wa.me/5511941649284"
                    class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-400 text-black text-sm font-bold transition hover:bg-green-300"
                  >✂️ Cadastrar minha barbearia</a>
                </div>
              </template>

              <!-- Outros bairros com esse serviço -->
              <div v-if="fallback.nearbyNeighborhoods.value.length">
                <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-4 flex items-center gap-2">
                  <span class="w-4 h-px bg-green-400/40 inline-block" />
                  Outros bairros com {{ serviceLabel }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="n in fallback.nearbyNeighborhoods.value" :key="n.slug"
                    :to="`/barbearias/${ufSlug}/${citySlug}/${n.slug}/s/${serviceSlug}`"
                    class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/40 hover:text-green-400 hover:bg-green-400/[.03] text-sm text-gray-400 transition-all duration-150"
                  >
                    📍 {{ n.name }}
                    <span v-if="n.count" class="text-gray-600 text-xs">({{ n.count }})</span>
                  </NuxtLink>
                </div>
              </div>

              <!-- Outros serviços disponíveis na região -->
              <div v-if="fallback.relatedServices.value.length">
                <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4 flex items-center gap-2">
                  <span class="w-4 h-px bg-gray-700 inline-block" />
                  Outros serviços na região
                </p>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="s in fallback.relatedServices.value" :key="s.slug"
                    :class="[
                      'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-[#181818] text-sm transition-all duration-150',
                      s.slug === serviceSlug
                        ? 'border-green-400/20 text-green-400/50 pointer-events-none'
                        : 'border-white/[.06] text-gray-400 hover:border-green-400/30 hover:bg-green-400/[.03] hover:text-white'
                    ]"
                    @click="$router.push(`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}/s/${s.slug}`)"
                  >
                    {{ s.emoji ?? '✂️' }} {{ s.name }}
                    <span v-if="s.count" class="text-gray-600 text-xs">({{ s.count }})</span>
                  </button>
                </div>
              </div>

              <NuxtLink
                :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`"
                class="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                ← Ver todas as barbearias em {{ neighborhoodLabel }}
              </NuxtLink>
            </div>

            <!-- Sidebar CTA -->
            <aside>
              <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-7 relative overflow-hidden sticky top-24">
                <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
                <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">Você é barbeiro?</p>
                <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:26px">
                  OFEREÇA {{ serviceLabel.toUpperCase() }} AQUI
                </h3>
                <p class="text-[13px] text-gray-400 leading-relaxed mb-5">
                  Cadastre sua barbearia e apareça quando alguém buscar
                  <strong class="text-white">{{ serviceLabel }}</strong> em
                  <strong class="text-white">{{ neighborhoodLabel }}</strong>.
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

  </div>
</template>

<script setup lang="ts">
import { computed }               from 'vue'
import { useRoute }               from 'vue-router'
import { useLocalSeo }            from '~/composables/useLocalSeo'
import { useFallbackSuggestions } from '~/composables/useFallbackSuggestions'

definePageMeta({ layout: 'barber' })

const nuxtApp = useNuxtApp()
if (import.meta.server) nuxtApp.payload.layout = 'barber'

const route = useRoute()
const ufSlug           = (route.params.uf      as string).toLowerCase().trim()
const citySlug         = (route.params.cidade  as string).toLowerCase().trim()
const neighborhoodSlug = (route.params.bairro  as string).toLowerCase().trim()
const serviceSlug      = (route.params.servico as string).toLowerCase().trim()

const neighborhoodLabel = neighborhoodSlug.replace(/-/g, ' ')
const serviceLabel      = serviceSlug.replace(/-/g, ' ')

// SEO completo (só resolve quando bairro + serviço estão mapeados)
const { data: seo } = useLocalSeo(ufSlug, citySlug, neighborhoodSlug, serviceSlug)

// ✅ Fallback com filtro de serviço — hierarquia bairro → distrito → cidade → uf
const fallback = useFallbackSuggestions({
  ufSlug,
  citySlug,
  neighborhoodSlug,
  serviceSlug,
  limit: 6,
})

// ✅ CRÍTICO: executa no onMounted do componente
onMounted(() => {
  fallback.execute()
})

const currentService = computed(() =>
  seo.value?.availableServices.find(s => s.slug === serviceSlug)
)
const otherServices = computed(() =>
  seo.value?.availableServices.filter(s => s.slug !== serviceSlug) ?? []
)

// ── Head ─────────────────────────────────────────────────────────────────────

useHead(computed(() => {
  if (!seo.value && fallback.shops.value.length > 0) {
    return {
      title: `${serviceLabel} perto de ${neighborhoodLabel} — ${fallback.cityLabel}`,
      meta: [
        { name: 'description', content: `Encontre profissionais de ${serviceLabel} próximos de ${neighborhoodLabel} em ${fallback.cityLabel}.` },
        { name: 'robots',      content: 'noindex, follow' },
      ],
    }
  }
  if (!seo.value) {
    return {
      title: `${serviceLabel} em ${neighborhoodLabel}`,
      meta: [{ name: 'robots', content: 'noindex, follow' }],
    }
  }
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