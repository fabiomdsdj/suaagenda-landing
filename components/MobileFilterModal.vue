<!-- components/MobileFilterModal.vue -->
<template>
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="show"
          class="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a]"
          @click.self="$emit('update:show', false)"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-white/5 bg-[#0a0a0a]">
            <h2 class="text-xl font-bold text-white">Filtros</h2>
            <button
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[.04] hover:bg-white/[.08] text-gray-400 hover:text-white transition-colors"
              @click="$emit('update:show', false)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
  
          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-6 space-y-5">
  
            <!-- Serviço -->
            <div class="rounded-2xl border border-white/[.06] bg-[#111] p-5">
              <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Serviço</p>
              <div class="space-y-2.5">
                <label
                  v-for="s in allServices" :key="s.slug"
                  class="flex items-center gap-3 cursor-pointer group"
                  @click="$emit('update:service', service === s.slug ? null : s.slug)"
                >
                  <div
                    class="w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all"
                    :class="service === s.slug ? 'bg-green-400 border-green-400' : 'border-white/20 group-hover:border-green-400/50'"
                  >
                    <svg v-if="service === s.slug" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-base transition-colors" :class="service === s.slug ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
                    {{ s.emoji }} {{ s.name }}
                  </span>
                </label>
              </div>
            </div>
  
            <!-- Faixa de preço -->
            <div class="rounded-2xl border border-white/[.06] bg-[#111] p-5">
              <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Faixa de preço</p>
              <div class="space-y-2.5">
                <label
                  v-for="range in priceRanges" :key="range.value"
                  class="flex items-center gap-3 cursor-pointer group"
                  @click="$emit('update:price', price === range.value ? null : range.value)"
                >
                  <div
                    class="w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all"
                    :class="price === range.value ? 'bg-green-400 border-green-400' : 'border-white/20 group-hover:border-green-400/50'"
                  >
                    <svg v-if="price === range.value" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-base transition-colors" :class="price === range.value ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
                    {{ range.label }}
                  </span>
                </label>
              </div>
            </div>
  
            <!-- Avaliação Mínima -->
            <div class="rounded-2xl border border-white/[.06] bg-[#111] p-5">
              <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Avaliação mínima</p>
              <div class="space-y-2.5">
                <label
                  v-for="r in ratingOptions" :key="r.value"
                  class="flex items-center gap-3 cursor-pointer group"
                  @click="$emit('update:rating', rating === r.value ? null : r.value)"
                >
                  <div
                    class="w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all"
                    :class="rating === r.value ? 'bg-green-400 border-green-400' : 'border-white/20 group-hover:border-green-400/50'"
                  >
                    <svg v-if="rating === r.value" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-base transition-colors flex items-center gap-1.5"
                        :class="rating === r.value ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
                    {{ r.label }}
                    <span class="text-yellow-400">⭐</span>
                  </span>
                </label>
              </div>
            </div>
  
            <!-- Tipo de Plano -->
            <div class="rounded-2xl border border-white/[.06] bg-[#111] p-5">
              <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Tipo de plano</p>
              <div class="space-y-2.5">
                <label
                  v-for="p in planOptions" :key="p.value"
                  class="flex items-center gap-3 cursor-pointer group"
                  @click="$emit('update:plan', plan === p.value ? null : p.value)"
                >
                  <div
                    class="w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all"
                    :class="plan === p.value ? 'bg-green-400 border-green-400' : 'border-white/20 group-hover:border-green-400/50'"
                  >
                    <svg v-if="plan === p.value" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-base transition-colors"
                        :class="plan === p.value ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
                    {{ p.label }}
                  </span>
                </label>
              </div>
            </div>
  
            <!-- Apenas Destaques -->
            <div class="rounded-2xl border border-white/[.06] bg-[#111] p-5">
              <label class="flex items-center gap-3 cursor-pointer group" @click="$emit('update:featured', !featured)">
                <div
                  class="w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all"
                  :class="featured ? 'bg-green-400 border-green-400' : 'border-white/20 group-hover:border-green-400/50'"
                >
                  <svg v-if="featured" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span class="text-base transition-colors"
                      :class="featured ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
                  ⭐ Apenas destaques
                </span>
              </label>
            </div>
  
            <!-- Ordenar -->
            <div class="rounded-2xl border border-white/[.06] bg-[#111] p-5">
              <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Ordenar por</p>
              <div class="space-y-2.5">
                <label
                  v-for="opt in sortOptions" :key="opt.value"
                  class="flex items-center gap-3 cursor-pointer group"
                  @click="$emit('update:sort', opt.value)"
                >
                  <div
                    class="w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all"
                    :class="sort === opt.value ? 'border-green-400' : 'border-white/20 group-hover:border-green-400/50'"
                  >
                    <div v-if="sort === opt.value" class="w-2.5 h-2.5 rounded-full bg-green-400"/>
                  </div>
                  <span class="text-base transition-colors" :class="sort === opt.value ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
                    {{ opt.label }}
                  </span>
                </label>
              </div>
            </div>
  
          </div>
  
          <!-- Footer -->
          <div class="p-6 border-t border-white/5 bg-[#0a0a0a] flex gap-3">
            <button
              v-if="hasActiveFilters"
              class="flex-1 py-3.5 rounded-xl border border-white/20 text-base font-medium text-white hover:border-green-400 hover:text-green-400 transition-all"
              @click="$emit('clear-filters')"
            >
              Limpar filtros
            </button>
            <button
              class="flex-1 py-3.5 rounded-xl bg-green-400 text-black text-base font-bold hover:bg-green-300 transition-colors"
              @click="$emit('apply')"
            >
              Ver resultados
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { allServices } from '~/data/locations'
  
  defineProps<{
    show: boolean
    service: string | null
    price: string | null
    rating: string | null
    plan: string | null
    featured: boolean
    sort: string
    hasActiveFilters: boolean
  }>()
  
  defineEmits<{
    'update:show': [value: boolean]
    'update:service': [value: string | null]
    'update:price': [value: string | null]
    'update:rating': [value: string | null]
    'update:plan': [value: string | null]
    'update:featured': [value: boolean]
    'update:sort': [value: string]
    'clear-filters': []
    'apply': []
  }>()
  
  const priceRanges = [
    { label: 'Até R$ 30',       value: 'ate-30'    },
    { label: 'R$ 30 – R$ 60',   value: '30-60'     },
    { label: 'R$ 60 – R$ 100',  value: '60-100'    },
    { label: 'Acima de R$ 100', value: 'acima-100' },
  ]
  
  const ratingOptions = [
    { label: '4.0+', value: '4.0' },
    { label: '4.5+', value: '4.5' },
    { label: '4.8+', value: '4.8' },
  ]
  
  const planOptions = [
    { label: 'Free', value: 'free' },
    { label: '👑 PRO', value: 'pro' },
    { label: '🚀 Enterprise', value: 'enterprise' },
  ]
  
  const sortOptions = [
    { label: 'Mais relevantes',  value: 'relevance' },
    { label: 'Melhor avaliados', value: 'rating'    },
    { label: 'Menor preço',      value: 'price'     },
    { label: 'Destaque',         value: 'featured'  },
  ]
  </script>
  
  <style scoped>
  /* Animação do modal */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  </style>