<template>
    <div>
      <!-- ── Barra de busca + filtros ──────────────────────────────────── -->
      <div class="sticky top-[68px] z-40 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5">
        <div class="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
  
          <!-- Input de busca -->
          <div class="relative flex-1 min-w-[180px] max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"/>
            </svg>
            <input
              :value="search.q.value"
              type="text"
              :placeholder="`Buscar em ${contextLabel}...`"
              class="w-full pl-9 pr-8 py-2 rounded-xl bg-[#181818] border border-white/[.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-400/40 transition-colors"
              @input="search.setQ(($event.target as HTMLInputElement).value)"
            />
            <button v-if="search.q.value" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white" @click="search.setQ('')">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
  
          <!-- Filtros rápidos desktop -->
          <div class="hidden lg:flex items-center gap-2 flex-wrap">
            <!-- Serviço -->
            <select
              :value="search.svc.value"
              class="text-xs bg-[#181818] border border-white/[.08] text-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:border-green-400/40"
              @change="search.setSvc(($event.target as HTMLSelectElement).value)"
            >
              <option value="">Todos os serviços</option>
              <option v-for="s in allServices" :key="s.slug" :value="s.slug">{{ s.emoji }} {{ s.name }}</option>
            </select>
  
            <!-- Preço -->
            <select
              :value="search.price.value"
              class="text-xs bg-[#181818] border border-white/[.08] text-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:border-green-400/40"
              @change="search.setPrice(($event.target as HTMLSelectElement).value)"
            >
              <option value="">Qualquer preço</option>
              <option value="ate-30">Até R$ 30</option>
              <option value="30-60">R$ 30 – 60</option>
              <option value="60-100">R$ 60 – 100</option>
              <option value="acima-100">Acima R$ 100</option>
            </select>
  
            <!-- Avaliação -->
            <select
              :value="search.rating.value"
              class="text-xs bg-[#181818] border border-white/[.08] text-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:border-green-400/40"
              @change="search.setRating(($event.target as HTMLSelectElement).value)"
            >
              <option value="">Qualquer nota</option>
              <option value="4.5">4.5+ ⭐</option>
              <option value="4">4.0+ ⭐</option>
              <option value="3.5">3.5+ ⭐</option>
            </select>
  
            <!-- Ordenação -->
            <select
              :value="search.sort.value"
              class="text-xs bg-[#181818] border border-white/[.08] text-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:border-green-400/40"
              @change="search.setSort(($event.target as HTMLSelectElement).value)"
            >
              <option value="relevance">Relevância</option>
              <option value="rating">Melhor avaliados</option>
              <option value="price">Menor preço</option>
              <option value="featured">Destaque</option>
            </select>
  
            <button
              v-if="search.hasActiveFilters.value"
              class="text-xs text-gray-500 hover:text-red-400 transition-colors underline"
              @click="search.clearFilters()"
            >Limpar</button>
          </div>
  
          <!-- Filtros mobile -->
          <button
            class="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[.08] bg-[#181818] text-sm text-gray-400"
            @click="showFilters = !showFilters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"/>
            </svg>
            Filtros
            <span v-if="search.hasActiveFilters.value" class="px-1.5 py-0.5 rounded-full bg-green-400 text-black text-[10px] font-bold">!</span>
          </button>
  
          <!-- Stats inline -->
          <p class="ml-auto text-xs text-gray-600 hidden sm:block">
            <span class="text-gray-400 font-medium">{{ search.result.value.meta.total }}</span>
            barbearia{{ search.result.value.meta.total !== 1 ? 's' : '' }}
          </p>
        </div>
  
        <!-- Filtros mobile expandido -->
        <Transition name="slide-down">
          <div v-if="showFilters" class="lg:hidden border-t border-white/5 bg-[#0f0f0f] px-6 py-4 grid grid-cols-2 gap-3">
            <select :value="search.svc.value" class="filter-select" @change="search.setSvc(($event.target as HTMLSelectElement).value)">
              <option value="">Todos os serviços</option>
              <option v-for="s in allServices" :key="s.slug" :value="s.slug">{{ s.emoji }} {{ s.name }}</option>
            </select>
            <select :value="search.price.value" class="filter-select" @change="search.setPrice(($event.target as HTMLSelectElement).value)">
              <option value="">Qualquer preço</option>
              <option value="ate-30">Até R$ 30</option>
              <option value="30-60">R$ 30 – 60</option>
              <option value="60-100">R$ 60 – 100</option>
              <option value="acima-100">Acima R$ 100</option>
            </select>
            <select :value="search.rating.value" class="filter-select" @change="search.setRating(($event.target as HTMLSelectElement).value)">
              <option value="">Qualquer nota</option>
              <option value="4.5">4.5+ ⭐</option>
              <option value="4">4.0+ ⭐</option>
              <option value="3.5">3.5+ ⭐</option>
            </select>
            <select :value="search.sort.value" class="filter-select" @change="search.setSort(($event.target as HTMLSelectElement).value)">
              <option value="relevance">Relevância</option>
              <option value="rating">Melhor avaliados</option>
              <option value="price">Menor preço</option>
              <option value="featured">Destaque</option>
            </select>
            <button v-if="search.hasActiveFilters.value" class="col-span-2 text-xs text-red-400 underline text-left" @click="search.clearFilters()">Limpar filtros</button>
          </div>
        </Transition>
      </div>
  
      <!-- ── Resultados ────────────────────────────────────────────────── -->
      <div class="max-w-6xl mx-auto px-6 py-8">
  
        <!-- Loading -->
        <div v-if="search.pending.value" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="i in 6" :key="i" class="h-72 rounded-2xl bg-[#111] animate-pulse border border-white/[.04]" />
        </div>
  
        <!-- Resultados -->
        <template v-else-if="search.result.value.data.length">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <BarbershopCard
              v-for="shop in search.result.value.data"
              :key="shop.id"
              :shop="shop"
            />
          </div>
  
          <!-- Paginação -->
          <!-- Substituir o bloco de paginação atual no PageSearchSection -->
          <div v-if="search.result.value.meta.pages > 1" class="flex items-center justify-center gap-2 mt-10">
            
            <!-- Anterior -->
            <button
              class="w-9 h-9 rounded-xl text-sm font-medium bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              :disabled="search.page.value === 1"
              @click="search.setPage(search.page.value - 1)"
            >‹</button>

            <!-- Páginas com truncate -->
            <template v-for="p in paginationPages" :key="p">
              <span
                v-if="p === '...'"
                class="w-9 h-9 flex items-center justify-center text-gray-600 text-sm"
              >…</span>
              <button
                v-else
                class="w-9 h-9 rounded-xl text-sm font-medium transition-all"
                :class="search.page.value === p
                  ? 'bg-green-400 text-black'
                  : 'bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white'"
                @click="search.setPage(p)"
              >{{ p }}</button>
            </template>

            <!-- Próximo -->
            <button
              class="w-9 h-9 rounded-xl text-sm font-medium bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              :disabled="search.page.value === search.result.value.meta.pages"
              @click="search.setPage(search.page.value + 1)"
            >›</button>
          </div>
  
          <!-- Sugestões de serviços relacionados -->
          <div v-if="search.result.value.suggestions.relatedServices.length" class="mt-10 p-6 rounded-2xl border border-white/[.06] bg-[#111]">
            <h3 class="text-sm font-bold text-gray-400 mb-4">✂️ Outros serviços em {{ contextLabel }}</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="s in search.result.value.suggestions.relatedServices"
                :key="s.slug"
                class="px-3 py-2 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 text-sm text-gray-400 hover:text-white transition-all"
                :class="{ 'border-green-400/40 text-green-400': search.svc.value === s.slug }"
                @click="search.setSvc(s.slug)"
              >
                {{ s.name }} <span class="text-gray-600 text-xs">({{ s.count }})</span>
              </button>
            </div>
          </div>
        </template>
  
        <!-- Empty state com sugestões de bairros próximos -->
        <div v-else class="py-16 text-center">
          <div class="w-20 h-20 mx-auto mb-5 rounded-full bg-green-400/10 flex items-center justify-center">
            <span class="text-4xl opacity-30">✂️</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Nenhuma barbearia encontrada</h3>
          <p class="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            <span v-if="search.hasActiveFilters.value">Tente remover alguns filtros.</span>
            <span v-else>Ainda não temos barbearias cadastradas nessa região.</span>
          </p>
  
          <div class="flex flex-wrap justify-center gap-3 mb-8">
            <button
              v-if="search.hasActiveFilters.value"
              class="px-5 py-2.5 rounded-xl bg-green-400 text-black font-bold text-sm hover:bg-green-300 transition-colors"
              @click="search.clearFilters()"
            >Limpar filtros</button>
          </div>
  
          <!-- Bairros próximos se não houver resultado -->
          <div v-if="search.result.value.suggestions.nearbyNeighborhoods.length">
            <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4">📍 Bairros próximos com barbearias</p>
            <div class="flex flex-wrap justify-center gap-2">
              <NuxtLink
                v-for="n in search.result.value.suggestions.nearbyNeighborhoods"
                :key="n.slug"
                :to="`/barbearias/${props.uf}/${props.city}/${n.slug}`"
                class="px-4 py-2 rounded-xl border border-white/[.08] bg-[#181818] text-sm text-gray-400 hover:border-green-400/30 hover:text-green-400 transition-all"
              >
                {{ n.name }} <span class="text-gray-600">({{ n.count }})</span>
              </NuxtLink>
            </div>
          </div>
  
          <!-- Se não tiver nem bairros próximos, sugere a cidade -->
          <div v-else-if="props.neighborhood">
            <NuxtLink
              :to="`/barbearias/${props.uf}/${props.city}`"
              class="inline-flex items-center gap-2 text-green-400 hover:underline text-sm"
            >
              Ver barbearias em toda a cidade →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { allServices } from '~/data/locations'
  import { usePageSearch } from '~/composables/usePageSearch'
  
  const props = defineProps<{
    uf?:           string
    city?:         string
    neighborhood?: string
    contextLabel:  string   // "Vila Madalena", "São Paulo", "SP"
  }>()
  
  const showFilters = ref(false)
  
  const search = usePageSearch({
    uf:           props.uf,
    city:         props.city,
    neighborhood: props.neighborhood,
  })

  // adiciona no <script setup> do PageSearchSection.vue
  const paginationPages = computed((): (number | '...')[] => {
    const current = search.page.value
    const total   = search.result.value.meta.pages
    if (total <= 1) return []

    const delta = 2
    const range: number[] = []
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i)
    }

    const result: (number | '...')[] = [1]
    if (range.length && range[0] > 2)                        result.push('...')
    result.push(...range)
    if (range.length && range[range.length - 1] < total - 1) result.push('...')
    if (total > 1) result.push(total)

    return result
  })
  </script>
  
  <style scoped>
  .filter-select {
    width: 100%;
    padding: 8px 12px;
    font-size: 13px;
    border: 0.5px solid rgba(255,255,255,.1);
    border-radius: 10px;
    background: #111;
    color: #9ca3af;
    outline: none;
    font-family: inherit;
  }
  .filter-select:focus { border-color: rgba(52,211,153,.4); }
  
  .slide-down-enter-active, .slide-down-leave-active { transition: opacity .2s, transform .2s; }
  .slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-6px); }
  </style>