<!-- barbearias/[uf]/[cidade]/[bairro]/s/[servico]/index.vue-->
<template>
  <div v-if="seo" class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${seo.ufSlug}`" class="hover:text-green-400 transition-colors">
            {{ seo.uf }}
          </NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${seo.ufSlug}/${seo.citySlug}`" class="hover:text-green-400 transition-colors">
            {{ seo.cityName }}
          </NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${seo.ufSlug}/${seo.citySlug}/${seo.neighborhoodSlug}`" class="hover:text-green-400 transition-colors">
            {{ seo.neighborhoodName }}
          </NuxtLink>
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

        <h1
          class="font-black leading-none mb-6 text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em"
        >
          {{ seo.serviceName?.toUpperCase() }} EM<br>
          <span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span>
        </h1>

        <p class="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
          {{ seo.introParagraph }}
        </p>

        <div class="flex flex-wrap gap-4">
          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            {{ currentService?.emoji }} Sou barbeiro — quero aparecer aqui
          </a>
        </div>
      </div>
    </section>

    <!-- ✅ BUSCA + CARDS — filtrado por serviço -->
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
            v-for="service in otherServices"
            :key="service.slug"
            :to="`/barbearias/${seo.ufSlug}/${seo.citySlug}/${seo.neighborhoodSlug}/s/${service.slug}`"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all duration-200 text-sm text-gray-400 hover:text-white"
          >
            <span>{{ service.emoji }}</span>
            {{ service.name }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CONTEÚDO SEO -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        <div class="lg:col-span-2 space-y-8">
          <div class="rounded-2xl border border-green-400/10 bg-[#181818] p-8">
            <h2
              class="font-black leading-none mb-4 text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)"
            >
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
            <h3
              class="font-black leading-none text-white mb-3"
              style="font-family:'Bebas Neue',sans-serif;font-size:28px"
            >APAREÇA NO GOOGLE EM 5 MIN</h3>
            <a
              href="https://wa.me/5511941649284"
              class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300"
            >
              🔥 Testar 7 dias grátis
            </a>
          </div>

          <!-- Ver todos os serviços -->
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

  <!-- 404 -->
  <div v-else class="min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-20">
    <div class="text-center px-6">
      <p
        class="font-black text-green-400/20 leading-none mb-4"
        style="font-family:'Bebas Neue',sans-serif;font-size:120px"
      >404</p>
      <h1 class="text-2xl font-bold text-white mb-3">Página não encontrada</h1>
      <NuxtLink to="/barbearias" class="text-green-400 hover:underline">Ver todas as regiões →</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalSeo } from '~/composables/useLocalSeo'

definePageMeta({ layout: 'barber' })

const route = useRoute()

// ✅ Normaliza igual ao [bairro]/index.vue — lowercase + trim
const ufSlug           = (route.params.uf      as string).toLowerCase().trim()
const citySlug         = (route.params.cidade  as string).toLowerCase().trim()
const neighborhoodSlug = (route.params.bairro  as string).toLowerCase().trim()
const serviceSlug      = (route.params.servico as string).toLowerCase().trim()

const { data: seo } = useLocalSeo(ufSlug, citySlug, neighborhoodSlug, serviceSlug)

const currentService = computed(() => 
  seo.value?.availableServices.find(s => s.slug === serviceSlug)
)

const otherServices = computed(() =>
  seo.value?.availableServices.filter(s => s.slug !== serviceSlug) ?? []
)

useHead(
  computed(() => {
    if (!seo.value) return { title: 'Página não encontrada' }
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
      link: [
        { rel: 'canonical', href: seo.value.canonicalUrl },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(seo.value.jsonLd),
        },
      ],
    }
  })
)
</script>