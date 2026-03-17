<!-- components/GlobalSearch.vue -->
<template>
    <div class="relative" ref="searchRef">
      <!-- Input de Busca -->
      <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"/>
          </svg>
        </span>
        <input
          v-model="query"
          type="text"
          :placeholder="placeholder"
          class="w-full pl-9 pr-9 py-2 rounded-xl bg-[#181818] border border-white/[.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-400/50 transition-colors"
          @input="debouncedSearch"
          @focus="showDropdown = true"
          @keydown.enter="handleEnter"
          @keydown.escape="closeDropdown"
          @keydown.down.prevent="navigateDown"
          @keydown.up.prevent="navigateUp"
        />
        
        <!-- Botão limpar -->
        <button 
          v-if="query" 
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          @click="clearSearch"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
  
      <!-- Dropdown de Resultados -->
      <Transition name="dropdown">
        <div
          v-if="showDropdown && results.length > 0"
          class="absolute top-full mt-2 left-0 right-0 rounded-xl border border-white/[.08] bg-[#1a1a1a] shadow-2xl overflow-hidden max-h-[400px] overflow-y-auto z-50"
        >
          <!-- Bairros -->
          <div v-if="neighborhoods.length">
            <p class="px-3 pt-3 pb-1 text-[11px] font-bold tracking-widest uppercase text-gray-600">
              Bairros ({{ neighborhoods.length }})
            </p>
            <button
              v-for="(item, index) in neighborhoods.slice(0, 5)"
              :key="item.slug"
              :class="[
                'w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[.04] transition-colors text-left',
                selectedIndex === index && 'bg-white/[.04]'
              ]"
              @click="goToNeighborhood(item)"
              @mouseenter="selectedIndex = index"
            >
              <span class="text-xs text-green-400/60">📍</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-300 truncate">{{ item.name }}</p>
                <p class="text-xs text-gray-600">{{ item.city }}, {{ item.uf }}</p>
              </div>
              <span class="text-[10px] text-gray-700 bg-white/[.03] px-1.5 py-0.5 rounded">
                {{ item.count }}
              </span>
            </button>
          </div>
  
          <!-- Cidades -->
          <div v-if="cities.length">
            <p class="px-3 pt-3 pb-1 text-[11px] font-bold tracking-widest uppercase text-gray-600">
              Cidades ({{ cities.length }})
            </p>
            <button
              v-for="(item, index) in cities.slice(0, 3)"
              :key="item.slug"
              :class="[
                'w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[.04] transition-colors text-left',
                selectedIndex === neighborhoods.length + index && 'bg-white/[.04]'
              ]"
              @click="goToCity(item)"
              @mouseenter="selectedIndex = neighborhoods.length + index"
            >
              <span class="text-xs text-gray-500">🏙️</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-300 truncate">{{ item.name }}</p>
                <p class="text-xs text-gray-600">{{ item.uf }} · {{ item.totalBairros }} bairros</p>
              </div>
              <span class="text-[10px] text-gray-700 bg-white/[.03] px-1.5 py-0.5 rounded">
                {{ item.count }}
              </span>
            </button>
          </div>
  
          <!-- Barbearias -->
          <div v-if="barbershops.length">
            <p class="px-3 pt-3 pb-1 text-[11px] font-bold tracking-widest uppercase text-gray-600">
              Barbearias ({{ barbershops.length }})
            </p>
            <NuxtLink
              v-for="(shop, index) in barbershops.slice(0, 5)"
              :key="shop.id"
              :to="`/barbearias/${shop.ufSlug}/${shop.citySlug}/${shop.neighborhoodSlug}/${shop.slug}`"
              :class="[
                'w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[.04] transition-colors',
                selectedIndex === neighborhoods.length + cities.length + index && 'bg-white/[.04]'
              ]"
              @click="closeDropdown"
              @mouseenter="selectedIndex = neighborhoods.length + cities.length + index"
            >
              <span class="text-xs">✂️</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-300 truncate font-medium">{{ shop.name }}</p>
                <p class="text-xs text-gray-600 truncate">{{ shop.neighborhood }}, {{ shop.city }}</p>
              </div>
              <div v-if="shop.googleRating" class="flex items-center gap-0.5 text-xs">
                <span class="text-yellow-400">⭐</span>
                <span class="text-gray-400">{{ shop.googleRating }}</span>
              </div>
            </NuxtLink>
          </div>
  
          <!-- Ver todos os resultados -->
          <div v-if="totalResults > 8" class="border-t border-white/[.05] p-3">
            <button
              class="w-full text-sm text-green-400 hover:text-green-300 transition-colors text-center"
              @click="viewAllResults"
            >
              Ver todos os {{ totalResults }} resultados →
            </button>
          </div>
  
          <!-- Atalhos de teclado -->
          <div class="px-3 py-2 border-t border-white/[.05] flex gap-4 text-[11px] text-gray-700">
            <span>↵ selecionar</span>
            <span>↑↓ navegar</span>
            <span>esc fechar</span>
          </div>
        </div>
      </Transition>
  
      <!-- Estado vazio -->
      <Transition name="dropdown">
        <div
          v-if="showDropdown && query.length >= 2 && results.length === 0"
          class="absolute top-full mt-2 left-0 right-0 rounded-xl border border-white/[.08] bg-[#1a1a1a] shadow-2xl p-6 text-center z-50"
        >
          <span class="text-4xl mb-3 block opacity-20">🔍</span>
          <p class="text-sm text-gray-400 mb-1">Nenhum resultado encontrado</p>
          <p class="text-xs text-gray-600">Tente buscar por outra cidade ou bairro</p>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useDebounceFn } from '@vueuse/core'
  import { allCities } from '~/data/locations'
  import { allBarbershops } from '~/data/barbershops'
  
  const props = defineProps<{
    placeholder?: string
    size?: 'sm' | 'md' | 'lg'
  }>()
  
  const router = useRouter()
  
  // State
  const query = ref('')
  const showDropdown = ref(false)
  const selectedIndex = ref(0)
  const searchRef = ref<HTMLElement | null>(null)
  
  // Results
  interface DropdownResult {
    type: 'neighborhood' | 'city' | 'barbershop'
    name: string
    slug: string
    city: string
    uf: string
    count?: number
    totalBairros?: number
    id?: number
    googleRating?: number
  }
  
  const results = computed((): DropdownResult[] => {
    const q = query.value.trim().toLowerCase()
    if (q.length < 2) return []
    
    const out: DropdownResult[] = []
  
    // Buscar bairros
    for (const city of allCities) {
      for (const district of city.districts) {
        for (const n of district.neighborhoods) {
          if (n.name.toLowerCase().includes(q) || n.slug.includes(q)) {
            const count = allBarbershops.filter(b =>
              b.neighborhoodSlug === n.slug &&
              b.citySlug === city.citySlug &&
              b.status === 'active'
            ).length
            
            if (count > 0) {
              out.push({
                type: 'neighborhood',
                name: n.name,
                slug: n.slug,
                city: city.city,
                uf: city.uf,
                count,
              })
            }
          }
        }
      }
    }
  
    // Buscar cidades
    for (const city of allCities) {
      if (city.city.toLowerCase().includes(q) || city.citySlug.includes(q)) {
        const count = allBarbershops.filter(b =>
          b.citySlug === city.citySlug && b.status === 'active'
        ).length
        
        if (count > 0) {
          out.push({
            type: 'city',
            name: city.city,
            slug: city.citySlug,
            city: city.city,
            uf: city.uf,
            totalBairros: city.districts.reduce((a, d) => a + d.neighborhoods.length, 0),
            count,
          })
        }
      }
    }
  
    // Buscar barbearias
    const shops = allBarbershops.filter(b =>
      b.status === 'active' &&
      (b.name.toLowerCase().includes(q) ||
       b.city.toLowerCase().includes(q) ||
       b.neighborhood.toLowerCase().includes(q))
    ).slice(0, 5)
  
    shops.forEach(shop => {
      out.push({
        type: 'barbershop',
        name: shop.name,
        slug: shop.slug,
        city: shop.city,
        uf: shop.uf,
        id: shop.id,
        googleRating: shop.googleRating,
      })
    })
  
    return out
  })
  
  const neighborhoods = computed(() => results.value.filter(r => r.type === 'neighborhood'))
  const cities = computed(() => results.value.filter(r => r.type === 'city'))
  const barbershops = computed(() => {
    return results.value
      .filter(r => r.type === 'barbershop')
      .map(r => {
        const shop = allBarbershops.find(b => b.id === r.id)
        return shop!
      })
  })
  
  const totalResults = computed(() => results.value.length)
  
  // Debounced search
  const debouncedSearch = useDebounceFn(() => {
    showDropdown.value = query.value.trim().length >= 2
    selectedIndex.value = 0
  }, 300)
  
  // Navigation
  function navigateDown() {
    if (selectedIndex.value < results.value.length - 1) {
      selectedIndex.value++
    }
  }
  
  function navigateUp() {
    if (selectedIndex.value > 0) {
      selectedIndex.value--
    }
  }
  
  function handleEnter() {
    if (results.value.length === 0) return
    
    const selected = results.value[selectedIndex.value]
    if (!selected) {
      viewAllResults()
      return
    }
  
    if (selected.type === 'neighborhood') {
      const city = allCities.find(c =>
        c.districts.some(d =>
          d.neighborhoods.some(n => n.slug === selected.slug)
        )
      )
      if (city) {
        router.push(`/barbearias?neighborhood=${selected.slug}&city=${city.citySlug}&uf=${city.ufSlug}`)
        closeDropdown()
      }
    } else if (selected.type === 'city') {
      const city = allCities.find(c => c.citySlug === selected.slug)
      if (city) {
        router.push(`/barbearias?city=${city.citySlug}&uf=${city.ufSlug}`)
        closeDropdown()
      }
    } else if (selected.type === 'barbershop') {
      const shop = allBarbershops.find(b => b.id === selected.id)
      if (shop) {
        router.push(`/barbearias/${shop.ufSlug}/${shop.citySlug}/${shop.neighborhoodSlug}/${shop.slug}`)
        closeDropdown()
      }
    }
  }
  
  function goToNeighborhood(item: any) {
    const city = allCities.find(c =>
      c.districts.some(d =>
        d.neighborhoods.some(n => n.slug === item.slug)
      )
    )
    if (city) {
      router.push(`/barbearias?neighborhood=${item.slug}&city=${city.citySlug}&uf=${city.ufSlug}`)
      closeDropdown()
    }
  }
  
  function goToCity(item: any) {
    const city = allCities.find(c => c.citySlug === item.slug)
    if (city) {
      router.push(`/barbearias?city=${city.citySlug}&uf=${city.ufSlug}`)
      closeDropdown()
    }
  }
  
  function viewAllResults() {
    router.push(`/barbearias?q=${query.value.trim()}`)
    closeDropdown()
  }
  
  function clearSearch() {
    query.value = ''
    selectedIndex.value = 0
    showDropdown.value = false
  }
  
  function closeDropdown() {
    showDropdown.value = false
    selectedIndex.value = 0
  }
  
  // Click outside
  function onClickOutside(e: MouseEvent) {
    if (!searchRef.value?.contains(e.target as Node)) {
      closeDropdown()
    }
  }
  
  onMounted(() => document.addEventListener('mousedown', onClickOutside))
  onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
  </script>
  
  <style scoped>
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 0.15s, transform 0.15s;
  }
  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }
  </style>