<!-- components/BarbershopCard.vue -->
<template>
    <NuxtLink
      :to="`/barbearias/${shop.ufSlug}/${shop.citySlug}/${shop.neighborhoodSlug}/${shop.slug}`"
      class="group relative flex flex-col rounded-2xl border border-white/[.06] bg-[#111] overflow-hidden hover:border-green-400/30 transition-all duration-200 hover:-translate-y-0.5"
    >
      <!-- Imagem -->
      <div class="relative h-40 bg-[#181818] flex-shrink-0 overflow-hidden">
        <img 
          v-if="shop.photos?.[0]" 
          :src="shop.photos[0]" 
          :alt="shop.name" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <span class="text-5xl opacity-20">✂️</span>
        </div>
        
        <!-- Badges -->
        <span 
          v-if="shop.featured" 
          class="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold uppercase text-yellow-400 bg-black/70 border border-yellow-400/30 backdrop-blur-sm"
        >⭐ Destaque</span>
        
        <span 
          v-if="shop.plan === 'pro' || shop.plan === 'enterprise'" 
          class="absolute top-3 right-3 inline-flex items-center px-2 py-1 rounded-full text-[11px] font-bold uppercase text-green-400 bg-black/70 border border-green-400/30 backdrop-blur-sm"
        >PRO</span>
      </div>
  
      <!-- Conteúdo -->
      <div class="flex flex-col gap-3 p-4 flex-1">
        <!-- Nome e localização -->
        <div>
          <p class="font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
            {{ shop.name }}
          </p>
          <p class="text-xs text-gray-500 mt-0.5 line-clamp-1">
            📍 {{ locationLabel }}
          </p>
        </div>
  
        <!-- Avaliação -->
        <div v-if="shop.googleRating" class="flex items-center gap-1.5">
          <div class="flex">
            <span 
              v-for="i in 5" 
              :key="i" 
              class="text-xs" 
              :class="i <= Math.round(shop.googleRating) ? 'text-yellow-400' : 'text-gray-700'"
            >★</span>
          </div>
          <span class="text-xs text-gray-400 font-medium">{{ shop.googleRating }}</span>
          <span class="text-xs text-gray-600">({{ shop.googleReviewCount }})</span>
        </div>
  
        <!-- Serviços -->
        <div v-if="activeServices.length" class="flex flex-wrap gap-1.5">
          <span 
            v-for="s in activeServices.slice(0, 3)" 
            :key="s.slug" 
            class="inline-flex items-center px-2 py-0.5 rounded-full bg-white/[.04] border border-white/[.05] text-[11px] text-gray-500"
          >{{ s.name }}</span>
          <span 
            v-if="activeServices.length > 3" 
            class="inline-flex items-center px-2 py-0.5 rounded-full bg-white/[.04] border border-white/[.05] text-[11px] text-gray-600"
          >+{{ activeServices.length - 3 }}</span>
        </div>
  
        <!-- Footer: Preço e CTA -->
        <div class="flex items-center justify-between mt-auto pt-2 border-t border-white/[.05]">
          <span v-if="minPrice" class="text-xs text-gray-500">
            A partir de <span class="text-white font-bold">R$ {{ minPrice }}</span>
          </span>
          <a 
            v-if="shop.phone" 
            :href="`https://wa.me/55${shop.phone.replace(/\D/g,'')}`" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-400 text-black text-xs font-bold hover:bg-green-300 transition-colors" 
            @click.stop
          >💬 Agendar</a>
        </div>
      </div>
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import type { Barbershop } from '~/data/barbershops'
  import { getBarbershopNeighborhoodLabel, minPrice as getMinPrice } from '~/composables/useBarbershops'
  
  const props = defineProps<{
    shop: Barbershop
  }>()
  
  const locationLabel = computed(() => getBarbershopNeighborhoodLabel(props.shop))
  const minPrice = computed(() => getMinPrice(props.shop))
  const activeServices = computed(() => props.shop.services.filter(s => s.isActive))
  </script>