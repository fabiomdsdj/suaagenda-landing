<!-- pages/barbearias/[uf]/[cidade]/[bairro]/[slug].vue -->
<template>
  <div v-if="barbershop" class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${ufSlug}`" class="hover:text-green-400 transition-colors">
            {{ ufSlug.toUpperCase() }}
          </NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}`" class="hover:text-green-400 transition-colors">
            {{ neighborhoodData?.city.city }}
          </NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`" class="hover:text-green-400 transition-colors">
            {{ neighborhoodData?.neighborhood.name }}
          </NuxtLink>
          <span class="text-gray-700">/</span>
          <span class="text-gray-400">{{ barbershop.name }}</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 50%,rgba(52,211,153,.07) 0%,transparent 70%)"/>
      <div class="relative max-w-6xl mx-auto">

        <div class="flex flex-wrap gap-3 mb-6">
          <span
            v-if="barbershop.featured"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-yellow-400 bg-yellow-400/10 border border-yellow-400/20"
          >⭐ DESTAQUE</span>
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            📍 {{ neighborhoodData?.neighborhood.name }}, {{ neighborhoodData?.city.city }}
          </span>
          <span
            v-if="barbershop.googleRating"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20"
          >⭐ {{ barbershop.googleRating }} ({{ barbershop.googleReviewCount }} avaliações)</span>
        </div>

        <h1
          class="font-black leading-none mb-6 text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em"
        >{{ barbershop.name.toUpperCase() }}</h1>

        <p v-if="barbershop.description" class="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-6">
          {{ barbershop.description }}
        </p>

        <p v-if="barbershop.address" class="text-gray-500 mb-10">
          📍 {{ barbershop.address }}
        </p>

        <div class="flex flex-wrap gap-4">
          
          <a  v-if="barbershop.phone"
            :href="`https://wa.me/55${barbershop.phone.replace(/\D/g, '')}`"
            target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
          >💬 Agendar pelo WhatsApp</a>
          <NuxtLink
            :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >← Ver outras em {{ neighborhoodData?.neighborhood.name }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- SERVIÇOS -->
    <section v-if="barbershop.services.length" class="w-full py-16 px-6 md:px-16 bg-[#0f0f0f]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Serviços disponíveis</span>
        <h2
          class="font-black leading-none mb-8 text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)"
        >O QUE OFERECEMOS</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink
            v-for="service in barbershop.services.filter(s => s.isActive)"
            :key="service.slug"
            :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}/s/${service.seoTag ?? service.slug}`"
            class="flex flex-col items-center gap-3 p-5 rounded-xl border border-green-400/20 bg-green-400/5 hover:border-green-400/50 transition-colors"
          >
            <span class="text-xs font-bold text-green-400">{{ service.category }}</span>
            <span class="text-sm text-center text-gray-300 font-medium">{{ service.name }}</span>
            <span class="text-xs text-gray-500">R$ {{ service.price }} · {{ service.durationMin }}min</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- HORÁRIOS -->
    <section v-if="barbershop.openingHours" class="w-full py-16 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">
        <h2
          class="font-black leading-none mb-8 text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)"
        >HORÁRIOS DE FUNCIONAMENTO</h2>
        <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-8 max-w-md">
          <div
            v-for="(entry, day) in formattedHours"
            :key="day"
            class="flex justify-between py-3 border-b border-white/[.05] last:border-0"
          >
            <span class="text-gray-400 capitalize">{{ entry.label }}</span>
            <span class="text-white font-medium">{{ entry.hours }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"/>
      <div class="relative max-w-xl mx-auto">
        <h2
          class="font-black leading-none text-white mb-4"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)"
        >AGENDE JÁ<br>SEU <span class="text-green-400">HORÁRIO</span></h2>
        <p class="mb-8 text-[17px] leading-relaxed text-gray-400">
          Atendimento profissional em {{ neighborhoodData?.neighborhood.name }}. Agende direto pelo WhatsApp.
        </p>
        
        <a  v-if="barbershop.phone"
          :href="`https://wa.me/55${barbershop.phone.replace(/\D/g, '')}`"
          target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300 hover:scale-105"
        >💬 Falar no WhatsApp</a>
      </div>
    </section>

  </div>

  <!-- 404 -->
  <div v-else class="min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-20">
    <div class="text-center px-6">
      <p class="font-black text-green-400/20 leading-none mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:120px">404</p>
      <h1 class="text-2xl font-bold text-white mb-3">Barbearia não encontrada</h1>
      <p class="text-gray-400 mb-6">Essa barbearia não está cadastrada ainda.</p>
      <NuxtLink to="/barbearias" class="text-green-400 hover:underline">Ver todas as regiões →</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getBarbershopBySlug } from '~/data/barbershops'
import { getNeighborhoodData } from '~/data/locations'

definePageMeta({ layout: 'barber' })

const route = useRoute()
const ufSlug          = route.params.uf as string
const citySlug        = route.params.cidade as string
const neighborhoodSlug = route.params.bairro as string
const barbershopSlug  = route.params.slug as string

const barbershop = computed(() =>
  getBarbershopBySlug(ufSlug, citySlug, neighborhoodSlug, barbershopSlug)
)

const neighborhoodData = computed(() =>
  getNeighborhoodData(ufSlug, citySlug, neighborhoodSlug)
)

// Horários formatados — chave curta do mock → label PT
const daysMap: Record<string, string> = {
  mon: 'segunda',
  tue: 'terça',
  wed: 'quarta',
  thu: 'quinta',
  fri: 'sexta',
  sat: 'sábado',
  sun: 'domingo',
}

const formattedHours = computed(() => {
  const hours = barbershop.value?.openingHours
  if (!hours) return {}

  return Object.entries(hours).reduce((acc, [key, val]) => {
    acc[key] = {
      label: daysMap[key] ?? key,
      hours: val ? `${val.open} – ${val.close}` : 'Fechado',
    }
    return acc
  }, {} as Record<string, { label: string; hours: string }>)
})

// SEO
useHead(
  computed(() => {
    if (!barbershop.value || !neighborhoodData.value) return { title: 'Barbearia não encontrada' }

    const b  = barbershop.value
    const nd = neighborhoodData.value

    return {
      title: `${b.name} — Barbearia em ${nd.neighborhood.name}, ${nd.city.city} | SuaAgenda`,
      meta: [
        {
          name: 'description',
          content: b.description ?? `${b.name} em ${nd.neighborhood.name}, ${nd.city.city}. Agende horário online direto pelo WhatsApp.`,
        },
        { property: 'og:title',       content: `${b.name} — ${nd.neighborhood.name}` },
        { property: 'og:type',        content: 'business.business' },
        { name:     'robots',         content: 'index, follow' },
      ],
      link: [
        { rel: 'canonical', href: `https://suaagenda.link/barbearias/${nd.city.ufSlug}/${nd.city.citySlug}/${nd.neighborhood.slug}/${b.slug}` },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: b.name,
            image: b.photos?.[0],
            address: {
              '@type':           'PostalAddress',
              streetAddress:     b.address,
              addressLocality:   nd.city.city,
              addressRegion:     nd.city.uf,
              addressCountry:    'BR',
            },
            aggregateRating: b.googleRating ? {
              '@type':      'AggregateRating',
              ratingValue:  b.googleRating,
              reviewCount:  b.googleReviewCount ?? 0,
            } : undefined,
            telephone: b.phone,
          }),
        },
      ],
    }
  })
)
</script>