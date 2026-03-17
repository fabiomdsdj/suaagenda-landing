<!-- pages/barbearias/index.vue -->
<template>
    <div class="text-[15px]">
  
      <!-- ══ MODO BUSCA ══ -->
      <div v-if="isSearchMode">
  
        <!-- TOPBAR -->
        <div class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5 pt-[72px]">
          <div class="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
  
            <div class="relative flex-1 max-w-md" ref="topbarRef">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"/>
                </svg>
              </span>
              <input
                v-model="queryInput"
                type="text"
                placeholder="Bairro ou cidade..."
                class="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#181818] border border-white/[.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-400/50 transition-colors"
                @input="onSearchInput"
                @focus="onSearchInput"
                @keydown.enter="commitSearch"
                @keydown.escape="closeDropdown"
              />
              <button v-if="queryInput" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white" @click="clearQuery">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
              </button>
  
              <!-- mini dropdown topbar -->
              <div
                v-if="showDropdown && dropdownResults.length"
                class="absolute top-full mt-1 left-0 right-0 rounded-xl border border-white/[.08] bg-[#1a1a1a] shadow-2xl overflow-hidden"
                style="z-index:200"
              >
                <div v-if="dropdownNeighborhoods.length">
                  <p class="px-3 pt-2 pb-1 text-[11px] font-bold tracking-widest uppercase text-gray-600">Bairros</p>
                  <button
                    v-for="item in dropdownNeighborhoods" :key="item.href"
                    class="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[.04] transition-colors text-left"
                    @click="goTo(item.href)"
                  >
                    <span class="text-xs text-green-400/60">📍</span>
                    <div>
                      <p class="text-sm text-gray-300">{{ item.name }}</p>
                      <p class="text-xs text-gray-600">{{ item.city }}, {{ item.uf }}</p>
                    </div>
                  </button>
                </div>
                <div v-if="dropdownCities.length">
                  <p class="px-3 pt-2 pb-1 text-[11px] font-bold tracking-widest uppercase text-gray-600">Cidades</p>
                  <button
                    v-for="item in dropdownCities" :key="item.href"
                    class="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[.04] transition-colors text-left"
                    @click="goTo(item.href)"
                  >
                    <span class="text-xs text-gray-500">🏙️</span>
                    <div>
                      <p class="text-sm text-gray-300">{{ item.name }}</p>
                      <p class="text-xs text-gray-600">{{ item.uf }} · {{ item.totalBairros }} bairros</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Chips serviço desktop -->
            <div class="hidden md:flex items-center gap-2 flex-wrap">
              <button
                v-for="s in allServices" :key="s.slug"
                class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all"
                :class="activeService === s.slug
                  ? 'bg-green-400/15 border-green-400/50 text-green-400'
                  : 'bg-white/[.03] border-white/[.06] text-gray-500 hover:border-white/20 hover:text-gray-300'"
                @click="toggleService(s.slug)"
              >{{ s.emoji }} {{ s.name }}</button>
            </div>
  
            <!-- Badges ativos -->
            <div v-if="currentNeighborhood" class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-400/10 border border-green-400/20 text-green-400 text-xs font-medium flex-shrink-0">
              📍 {{ neighborhoodLabel }}
              <button class="ml-1 hover:text-white" @click="clearNeighborhood">×</button>
            </div>
            <div v-else-if="currentCity" class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-400/10 border border-green-400/20 text-green-400 text-xs font-medium flex-shrink-0">
              🏙️ {{ cityLabel }}
              <button class="ml-1 hover:text-white" @click="clearCity">×</button>
            </div>
  
            <button class="ml-auto text-xs text-gray-500 hover:text-green-400 transition-colors whitespace-nowrap flex-shrink-0" @click="exitSearch">
              ← Voltar
            </button>
          </div>
        </div>
  
        <!-- LAYOUT RESULTADOS -->
        <div class="pt-[136px] min-h-screen bg-[#0a0a0a]">
          <div class="max-w-7xl mx-auto px-6 py-8 flex gap-8">
  
            <!-- SIDEBAR -->
            <aside class="hidden lg:block w-64 flex-shrink-0">
              <div class="sticky top-[144px] space-y-5">
  
                <!-- Filtro ativo de localização -->
                <div v-if="currentNeighborhood || currentCity" class="rounded-2xl border border-green-400/20 bg-green-400/[.04] p-4">
                  <p class="text-xs font-bold tracking-widest uppercase text-green-400/70 mb-2">Filtrando por</p>
                  <div v-if="currentNeighborhood" class="flex items-center justify-between mb-1">
                    <p class="text-sm text-white font-medium">📍 {{ neighborhoodLabel }}</p>
                    <button class="text-xs text-gray-500 hover:text-white" @click="clearNeighborhood">×</button>
                  </div>
                  <div v-if="currentCity" class="flex items-center justify-between">
                    <p class="text-sm text-white font-medium">🏙️ {{ cityLabel }}</p>
                    <button v-if="!currentNeighborhood" class="text-xs text-gray-500 hover:text-white" @click="clearCity">×</button>
                  </div>
                </div>
  
                <!-- Serviço -->
                <div class="rounded-2xl border border-white/[.06] bg-[#111] p-5">
                  <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Serviço</p>
                  <div class="space-y-2.5">
                    <label
                      v-for="s in allServices" :key="s.slug"
                      class="flex items-center gap-3 cursor-pointer group"
                      @click="toggleService(s.slug)"
                    >
                      <div
                        class="w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all"
                        :class="activeService === s.slug ? 'bg-green-400 border-green-400' : 'border-white/20 group-hover:border-green-400/50'"
                      >
                        <svg v-if="activeService === s.slug" xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <span class="text-sm transition-colors" :class="activeService === s.slug ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
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
                      @click="togglePrice(range.value)"
                    >
                      <div
                        class="w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all"
                        :class="activePrice === range.value ? 'bg-green-400 border-green-400' : 'border-white/20 group-hover:border-green-400/50'"
                      >
                        <svg v-if="activePrice === range.value" xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <span class="text-sm transition-colors" :class="activePrice === range.value ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
                        {{ range.label }}
                      </span>
                    </label>
                  </div>
                </div>
  
                <!-- Ordenar -->
                <div class="rounded-2xl border border-white/[.06] bg-[#111] p-5">
                  <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Ordenar por</p>
                  <div class="space-y-2.5">
                    <label
                      v-for="opt in sortOptions" :key="opt.value"
                      class="flex items-center gap-3 cursor-pointer group"
                      @click="activeSort = opt.value"
                    >
                      <div
                        class="w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all"
                        :class="activeSort === opt.value ? 'border-green-400' : 'border-white/20 group-hover:border-green-400/50'"
                      >
                        <div v-if="activeSort === opt.value" class="w-2 h-2 rounded-full bg-green-400"/>
                      </div>
                      <span class="text-sm transition-colors" :class="activeSort === opt.value ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
                        {{ opt.label }}
                      </span>
                    </label>
                  </div>
                </div>
  
                <button
                  v-if="hasActiveFilters"
                  class="w-full py-2.5 rounded-xl border border-white/[.06] text-sm text-gray-500 hover:text-white hover:border-white/20 transition-all"
                  @click="clearFilters"
                >Limpar filtros</button>
              </div>
            </aside>
  
            <!-- CARDS -->
            <div class="flex-1 min-w-0">
  
              <!-- Header -->
              <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <p class="text-white font-bold text-lg">
                    {{ searchResult.meta.total }} resultado{{ searchResult.meta.total !== 1 ? 's' : '' }}
                    <span v-if="currentQ" class="text-gray-500 font-normal"> para "{{ currentQ }}"</span>
                    <span v-else-if="currentNeighborhood" class="text-gray-500 font-normal"> em {{ neighborhoodLabel }}</span>
                    <span v-else-if="currentCity" class="text-gray-500 font-normal"> em {{ cityLabel }}</span>
                  </p>
                  <p v-if="activeService || activePrice" class="text-xs text-gray-600 mt-0.5">
                    <span v-if="activeService">{{ allServices.find(s => s.slug === activeService)?.name }}</span>
                    <span v-if="activeService && activePrice"> · </span>
                    <span v-if="activePrice">{{ priceRanges.find(p => p.value === activePrice)?.label }}</span>
                  </p>
                </div>
                <select
                  v-model="activeSort"
                  class="lg:hidden text-sm bg-[#181818] border border-white/[.08] text-gray-400 rounded-xl px-3 py-2 focus:outline-none"
                >
                  <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
  
              <!-- Grid -->
              <div v-if="searchResult.data.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <NuxtLink
                  v-for="shop in searchResult.data" :key="shop.id"
                  :to="`/barbearias/${shop.ufSlug}/${shop.citySlug}/${shop.neighborhoodSlug}/${shop.slug}`"
                  class="group relative flex flex-col rounded-2xl border border-white/[.06] bg-[#111] overflow-hidden hover:border-green-400/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div class="relative h-40 bg-[#181818] flex-shrink-0 overflow-hidden">
                    <img v-if="shop.photos?.[0]" :src="shop.photos[0]" :alt="shop.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <span class="text-5xl opacity-20">✂️</span>
                    </div>
                    <span v-if="shop.featured" class="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold uppercase text-yellow-400 bg-black/70 border border-yellow-400/30">⭐ Destaque</span>
                    <span v-if="shop.plan === 'pro' || shop.plan === 'enterprise'" class="absolute top-3 right-3 inline-flex items-center px-2 py-1 rounded-full text-[11px] font-bold uppercase text-green-400 bg-black/70 border border-green-400/30">PRO</span>
                  </div>
  
                  <div class="flex flex-col gap-3 p-4 flex-1">
                    <div>
                      <p class="font-bold text-white group-hover:text-green-400 transition-colors">{{ shop.name }}</p>
                      <p class="text-xs text-gray-500 mt-0.5">📍 {{ getLabel(shop) }}</p>
                    </div>
                    <div v-if="shop.googleRating" class="flex items-center gap-1.5">
                      <div class="flex">
                        <span v-for="i in 5" :key="i" class="text-xs" :class="i <= Math.round(shop.googleRating) ? 'text-yellow-400' : 'text-gray-700'">★</span>
                      </div>
                      <span class="text-xs text-gray-400 font-medium">{{ shop.googleRating }}</span>
                      <span class="text-xs text-gray-600">({{ shop.googleReviewCount }})</span>
                    </div>
                    <div v-if="shop.services.length" class="flex flex-wrap gap-1.5">
                      <span v-for="s in shop.services.filter((sv: any) => sv.isActive).slice(0, 3)" :key="s.slug" class="inline-flex items-center px-2 py-0.5 rounded-full bg-white/[.04] border border-white/[.05] text-[11px] text-gray-500">{{ s.name }}</span>
                      <span v-if="shop.services.filter((sv: any) => sv.isActive).length > 3" class="inline-flex items-center px-2 py-0.5 rounded-full bg-white/[.04] border border-white/[.05] text-[11px] text-gray-600">+{{ shop.services.filter((sv: any) => sv.isActive).length - 3 }}</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto pt-2 border-t border-white/[.05]">
                      <span v-if="getMinPrice(shop)" class="text-xs text-gray-500">A partir de <span class="text-white font-bold">R$ {{ getMinPrice(shop) }}</span></span>
                      <a v-if="shop.phone" :href="`https://wa.me/55${shop.phone.replace(/\D/g,'')}`" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-400 text-black text-xs font-bold hover:bg-green-300 transition-colors" @click.stop>💬 Agendar</a>
                    </div>
                  </div>
                </NuxtLink>
              </div>
  
              <!-- Empty -->
              <div v-else class="flex flex-col items-center justify-center py-24 text-center">
                <span class="text-6xl mb-4 opacity-20">✂️</span>
                <p class="text-white font-bold text-xl mb-2">Nenhuma barbearia encontrada</p>
                <p class="text-gray-500 text-sm mb-6">Tente outro bairro ou remova alguns filtros.</p>
                <button class="text-green-400 hover:underline text-sm" @click="clearFilters">Limpar filtros</button>
              </div>
  
              <!-- Paginação -->
              <div v-if="searchResult.meta.pages > 1" class="flex items-center justify-center gap-2 mt-10">
                <button
                  v-for="p in searchResult.meta.pages" :key="p"
                  class="w-9 h-9 rounded-xl text-sm font-medium transition-all"
                  :class="currentPage === p ? 'bg-green-400 text-black' : 'bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white'"
                  @click="goToPage(p)"
                >{{ p }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- ══ MODO DISCOVERY ══ -->
      <div v-else>
  
        <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
          <div class="max-w-6xl mx-auto">
            <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
              <span class="text-gray-700">/</span>
              <span class="text-gray-400">Barbearias</span>
            </nav>
          </div>
        </section>
  
        <section class="relative w-full py-28 px-6 md:px-16 bg-[#0a0a0a] overflow-visible">
          <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 60% 60% at 50% 40%,rgba(52,211,153,.08) 0%,transparent 70%)"/>
          <div class="relative max-w-3xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20 mb-8">
              💈 {{ totalCidades }} cidades · {{ totalBairros }} bairros
            </div>
            <h1 class="font-black leading-none mb-6 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(52px,7vw,96px);letter-spacing:.03em">
              ENCONTRE SUA<br><span class="text-green-400">BARBEARIA</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed mb-10">
              O maior diretório de barbearias do Brasil. Busque por bairro, filtre por serviço e agende em segundos.
            </p>
  
            <!-- INPUT HERO -->
            <div class="relative max-w-xl mx-auto" style="z-index:100" ref="heroRef">
              <div class="flex items-center rounded-2xl bg-[#181818] border border-white/[.08] focus-within:border-green-400/50 transition-colors">
                <span class="pl-5 text-gray-500 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"/>
                  </svg>
                </span>
                <input
                  v-model="queryInput"
                  type="text"
                  placeholder="Qual bairro ou cidade?"
                  class="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-600 text-[16px] focus:outline-none"
                  @input="onSearchInput"
                  @focus="onSearchInput"
                  @keydown.enter="commitSearch"
                  @keydown.escape="closeDropdown"
                />
                <button class="m-1.5 px-5 py-3 rounded-xl bg-green-400 text-black font-bold text-sm flex-shrink-0 hover:bg-green-300 transition-colors" @click="commitSearch">
                  Buscar
                </button>
              </div>
  
              <!-- DROPDOWN HERO -->
              <Transition name="dropdown">
                <div
                  v-if="showDropdown && dropdownResults.length"
                  class="absolute top-full mt-2 left-0 right-0 rounded-2xl border border-white/[.08] bg-[#181818] shadow-2xl overflow-hidden"
                  style="z-index:101"
                >
                  <div v-if="dropdownNeighborhoods.length">
                    <p class="px-4 pt-3 pb-1 text-[11px] font-bold tracking-widest uppercase text-gray-600">Bairros</p>
                    <button v-for="item in dropdownNeighborhoods" :key="item.href" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[.04] transition-colors text-left" @click="goTo(item.href)">
                      <span class="text-green-400/60">📍</span>
                      <div>
                        <p class="text-sm text-gray-300 font-medium">{{ item.name }}</p>
                        <p class="text-xs text-gray-600">{{ item.city }}, {{ item.uf }}</p>
                      </div>
                    </button>
                  </div>
                  <div v-if="dropdownCities.length">
                    <p class="px-4 pt-3 pb-1 text-[11px] font-bold tracking-widest uppercase text-gray-600">Cidades</p>
                    <button v-for="item in dropdownCities" :key="item.href" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[.04] transition-colors text-left" @click="goTo(item.href)">
                      <span class="text-gray-500">🏙️</span>
                      <div>
                        <p class="text-sm text-gray-300 font-medium">{{ item.name }}</p>
                        <p class="text-xs text-gray-600">{{ item.uf }} · {{ item.totalBairros }} bairros</p>
                      </div>
                    </button>
                  </div>
                  <div class="px-4 py-2 border-t border-white/[.05] flex gap-4">
                    <span class="text-[11px] text-gray-700">↵ buscar</span>
                    <span class="text-[11px] text-gray-700">esc fechar</span>
                  </div>
                </div>
              </Transition>
            </div>
  
            <!-- SERVIÇOS RÁPIDOS -->
            <div class="flex flex-wrap justify-center gap-2 mt-6">
              <button
                v-for="s in allServices" :key="s.slug"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                :class="activeService === s.slug ? 'bg-green-400/15 border-green-400/50 text-green-400' : 'bg-white/[.03] border-white/[.06] text-gray-500 hover:border-white/20 hover:text-gray-300'"
                @click="quickServiceSearch(s.slug)"
              >{{ s.emoji }} {{ s.name }}</button>
            </div>
          </div>
        </section>
  
        <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
          <div class="max-w-6xl mx-auto">
            <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Estados</span>
            <h2 class="font-black leading-none mb-10 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)">ESCOLHA SEU ESTADO</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <NuxtLink v-for="uf in ufs" :key="uf.ufSlug" :to="`/barbearias/${uf.ufSlug}`" class="group flex items-center justify-between p-5 rounded-2xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all duration-200">
                <div>
                  <p class="font-bold text-white group-hover:text-green-400 transition-colors text-lg">{{ uf.uf }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ uf.totalCidades }} cidades · {{ uf.totalBairros }} bairros</p>
                </div>
                <span class="text-gray-600 group-hover:text-green-400 transition-colors">→</span>
              </NuxtLink>
            </div>
          </div>
        </section>
  
        <section class="w-full py-20 px-6 md:px-16 bg-[#0f0f0f]">
          <div class="max-w-6xl mx-auto">
            <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Em destaque</span>
            <h2 class="font-black leading-none mb-10 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)">PRINCIPAIS CIDADES</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <NuxtLink v-for="city in featuredCities" :key="city.citySlug" :to="`/barbearias/${city.ufSlug}/${city.citySlug}`" class="group relative overflow-hidden flex flex-col gap-3 p-6 rounded-2xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all duration-200 hover:-translate-y-0.5">
                <div class="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-green-400 to-emerald-300"/>
                <div class="flex items-start justify-between">
                  <div>
                    <p class="font-bold text-white group-hover:text-green-400 transition-colors text-lg">{{ city.city }}</p>
                    <p class="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">{{ city.uf }}</p>
                  </div>
                  <span class="text-2xl">✂️</span>
                </div>
                <p class="text-xs text-gray-600">{{ city.totalDistritos }} regiões · {{ city.totalBairros }} bairros</p>
              </NuxtLink>
            </div>
          </div>
        </section>
  
        <section class="relative w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center overflow-hidden">
          <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"/>
          <div class="relative max-w-xl mx-auto">
            <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">SUA BARBEARIA<br>NO <span class="text-green-400">GOOGLE</span> EM 5 MIN</h2>
            <p class="mb-8 text-[17px] leading-relaxed text-gray-400">Barbeiros que usam a SuaAgenda aparecem quando alguém busca "barbearia perto de mim" — sem pagar anúncio.</p>
            <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300 hover:scale-105">✂️ Testar grátis por 7 dias</a>
            <div class="flex items-center justify-center flex-wrap gap-5 mt-6 text-sm text-gray-600">
              <span>🔒 Sem cartão</span><span>⚡ 5 minutos</span><span>✓ Cancela quando quiser</span>
            </div>
          </div>
        </section>
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { allCities, allServices } from '~/data/locations'
  import { useBarbershopSearch, getBarbershopNeighborhoodLabel, minPrice } from '~/composables/useBarbershops'
  import type { Barbershop } from '~/data/barbershops'
  
  definePageMeta({ layout: 'barber' })
  
  const router = useRouter()
  const route  = useRoute()
  
  // ── Query params (fonte da verdade) ───────────────────────────
  const currentQ            = computed(() => (route.query.q            as string) || '')
  const currentSvc          = computed(() => (route.query.svc          as string) || '')
  const currentPrice        = computed(() => (route.query.price        as string) || '')
  const currentSort         = computed(() => (route.query.sort         as string) || 'relevance')
  const currentPage         = computed(() => Number(route.query.page)  || 1)
  const currentCity         = computed(() => (route.query.city         as string) || '')
  const currentUf           = computed(() => (route.query.uf           as string) || '')
  const currentNeighborhood = computed(() => (route.query.neighborhood as string) || '')
  
  // ── Labels legíveis ────────────────────────────────────────────
  const cityLabel = computed(() =>
    allCities.find(c => c.citySlug === currentCity.value)?.city ?? currentCity.value
  )
  
  const neighborhoodLabel = computed(() => {
    if (!currentNeighborhood.value) return ''
    const city = allCities.find(c => c.citySlug === currentCity.value)
    if (!city) return currentNeighborhood.value
    for (const d of city.districts) {
      const n = d.neighborhoods.find(n => n.slug === currentNeighborhood.value)
      if (n) return `${n.name}, ${city.city}`
    }
    return currentNeighborhood.value
  })
  
  // ── Search mode — qualquer filtro de localização ativa ─────────
  const isSearchMode = computed(() =>
    !!currentQ.value ||
    !!currentSvc.value ||
    !!currentPrice.value ||
    !!currentCity.value ||
    !!currentNeighborhood.value
  )
  
  // ── Filtros locais (sincronizados com URL) ─────────────────────
  const queryInput    = ref(currentQ.value)
  const activeService = ref<string | null>(currentSvc.value   || null)
  const activePrice   = ref<string | null>(currentPrice.value || null)
  const activeSort    = ref(currentSort.value)
  
  watch(() => route.query, () => {
    queryInput.value    = currentQ.value
    activeService.value = currentSvc.value   || null
    activePrice.value   = currentPrice.value || null
    activeSort.value    = currentSort.value
  }, { immediate: true })
  
  const hasActiveFilters = computed(() =>
    !!activeService.value || !!activePrice.value ||
    activeSort.value !== 'relevance' || !!currentCity.value || !!currentNeighborhood.value
  )
  
  // ── buildQuery — monta objeto pra URL preservando localização ──
  function buildQuery(overrides: Record<string, string> = {}): Record<string, string> {
    const q: Record<string, string> = {}
    if (queryInput.value.trim())          q.q            = queryInput.value.trim()
    if (activeService.value)              q.svc          = activeService.value
    if (activePrice.value)                q.price        = activePrice.value
    if (activeSort.value !== 'relevance') q.sort         = activeSort.value
    if (currentCity.value)                q.city         = currentCity.value
    if (currentUf.value)                  q.uf           = currentUf.value
    if (currentNeighborhood.value)        q.neighborhood = currentNeighborhood.value
    return { ...q, ...overrides }
  }
  
  // ── Navegação ──────────────────────────────────────────────────
  function commitSearch() {
    closeDropdown()
    // ao digitar novo texto livre, limpa filtros de localização
    const q: Record<string, string> = {}
    if (queryInput.value.trim()) q.q = queryInput.value.trim()
    if (activeService.value)     q.svc = activeService.value
    if (activePrice.value)       q.price = activePrice.value
    if (activeSort.value !== 'relevance') q.sort = activeSort.value
    router.push({ path: '/barbearias', query: q })
  }
  
  function goTo(href: string) {
    closeDropdown()
    router.push(href)
  }
  
  function goToPage(p: number) {
    router.push({ path: '/barbearias', query: { ...buildQuery(), page: String(p) } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  function exitSearch() {
    queryInput.value    = ''
    activeService.value = null
    activePrice.value   = null
    router.push('/barbearias')
  }
  
  function clearQuery() {
    queryInput.value = ''
    router.replace({ path: '/barbearias', query: buildQuery() })
  }
  
  function clearCity() {
    const q = buildQuery()
    delete q.city
    delete q.uf
    delete q.neighborhood
    router.replace({ path: '/barbearias', query: q })
  }
  
  function clearNeighborhood() {
    const q = buildQuery()
    delete q.neighborhood
    router.replace({ path: '/barbearias', query: q })
  }
  
  function toggleService(slug: string) {
    activeService.value = activeService.value === slug ? null : slug
    router.replace({ path: '/barbearias', query: buildQuery() })
  }
  
  function togglePrice(value: string) {
    activePrice.value = activePrice.value === value ? null : value
    router.replace({ path: '/barbearias', query: buildQuery() })
  }
  
  function clearFilters() {
    activeService.value = null
    activePrice.value   = null
    activeSort.value    = 'relevance'
    const q: Record<string, string> = {}
    if (queryInput.value.trim())   q.q            = queryInput.value.trim()
    if (currentCity.value)         q.city         = currentCity.value
    if (currentUf.value)           q.uf           = currentUf.value
    if (currentNeighborhood.value) q.neighborhood = currentNeighborhood.value
    router.push({ path: '/barbearias', query: q })
  }
  
  function quickServiceSearch(slug: string) {
    activeService.value = activeService.value === slug ? null : slug
    const q: Record<string, string> = {}
    if (activeService.value) q.svc = activeService.value
    router.push({ path: '/barbearias', query: q })
  }
  
  watch(activeSort, () => {
    if (isSearchMode.value) router.replace({ path: '/barbearias', query: buildQuery() })
  })
  
  // ── Resultados ─────────────────────────────────────────────────
  const searchResult = computed(() =>
    useBarbershopSearch({
      q:            currentQ.value,
      svc:          currentSvc.value,
      price:        currentPrice.value,
      sort:         currentSort.value,
      city:         currentCity.value,
      uf:           currentUf.value,
      neighborhood: currentNeighborhood.value,
      page:         currentPage.value,
      limit:        20,
    })
  )
  
  function getLabel(shop: Barbershop)    { return getBarbershopNeighborhoodLabel(shop) }
  function getMinPrice(shop: Barbershop) { return minPrice(shop) }
  
  // ── Filtros UI estáticos ───────────────────────────────────────
  const priceRanges = [
    { label: 'Até R$ 30',       value: 'ate-30'    },
    { label: 'R$ 30 – R$ 60',   value: '30-60'     },
    { label: 'R$ 60 – R$ 100',  value: '60-100'    },
    { label: 'Acima de R$ 100', value: 'acima-100' },
  ]
  
  const sortOptions = [
    { label: 'Mais relevantes',  value: 'relevance' },
    { label: 'Melhor avaliados', value: 'rating'    },
    { label: 'Menor preço',      value: 'price'     },
    { label: 'Destaque',         value: 'featured'  },
  ]
  
  // ── Dropdown autocomplete ──────────────────────────────────────
  const showDropdown = ref(false)
  const heroRef      = ref<HTMLElement | null>(null)
  const topbarRef    = ref<HTMLElement | null>(null)
  
  interface DropItem {
    name:         string
    href:         string
    city:         string
    uf:           string
    type:         'neighborhood' | 'city'
    totalBairros?: number
  }
  
  const dropdownResults = computed((): DropItem[] => {
    const q = queryInput.value.trim().toLowerCase()
    if (q.length < 2) return []
    const out: DropItem[] = []
  
    // ✅ Bairros → modo search com neighborhood + city + uf
    outer: for (const city of allCities) {
      for (const district of city.districts) {
        for (const n of district.neighborhoods) {
          if (n.name.toLowerCase().includes(q) || n.slug.includes(q)) {
            out.push({
              name: n.name,
              href: `/barbearias?neighborhood=${n.slug}&city=${city.citySlug}&uf=${city.ufSlug}`,
              city: city.city,
              uf:   city.uf,
              type: 'neighborhood',
            })
            if (out.filter(r => r.type === 'neighborhood').length >= 5) break outer
          }
        }
      }
    }
  
    // ✅ Cidades → modo search com city + uf
    for (const city of allCities) {
      if (out.filter(r => r.type === 'city').length >= 3) break
      if (city.city.toLowerCase().includes(q) || city.citySlug.includes(q)) {
        out.push({
          name: city.city,
          href: `/barbearias?city=${city.citySlug}&uf=${city.ufSlug}`,
          city: city.city,
          uf:   city.uf,
          type: 'city',
          totalBairros: city.districts.reduce((a, d) => a + d.neighborhoods.length, 0),
        })
      }
    }
  
    return out
  })
  
  const dropdownNeighborhoods = computed(() => dropdownResults.value.filter(r => r.type === 'neighborhood'))
  const dropdownCities        = computed(() => dropdownResults.value.filter(r => r.type === 'city'))
  
  function onSearchInput() {
    showDropdown.value = queryInput.value.trim().length >= 2
  }
  
  function closeDropdown() { showDropdown.value = false }
  
  function onClickOutside(e: MouseEvent) {
    const t = e.target as Node
    if (!heroRef.value?.contains(t) && !topbarRef.value?.contains(t)) closeDropdown()
  }
  
  onMounted(() => document.addEventListener('mousedown', onClickOutside))
  onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
  
  // ── Discovery data ─────────────────────────────────────────────
  const ufs = computed(() => {
    const map = new Map<string, { uf: string; ufSlug: string; totalCidades: number; totalBairros: number }>()
    for (const city of allCities) {
      const bairros = city.districts.reduce((a, d) => a + d.neighborhoods.length, 0)
      const ex = map.get(city.ufSlug)
      if (!ex) map.set(city.ufSlug, { uf: city.uf, ufSlug: city.ufSlug, totalCidades: 1, totalBairros: bairros })
      else { ex.totalCidades++; ex.totalBairros += bairros }
    }
    return Array.from(map.values()).sort((a, b) => a.uf.localeCompare(b.uf))
  })
  
  const featuredCities = computed(() =>
    [...allCities]
      .map(c => ({
        city: c.city, citySlug: c.citySlug, uf: c.uf, ufSlug: c.ufSlug,
        totalDistritos: c.districts.length,
        totalBairros: c.districts.reduce((a, d) => a + d.neighborhoods.length, 0),
      }))
      .sort((a, b) => b.totalBairros - a.totalBairros)
      .slice(0, 6)
  )
  
  const totalCidades = computed(() => allCities.length)
  const totalBairros = computed(() =>
    allCities.reduce((acc, c) => acc + c.districts.reduce((a, d) => a + d.neighborhoods.length, 0), 0)
  )
  
  // ── SEO ────────────────────────────────────────────────────────
  useHead(computed(() => ({
    title: isSearchMode.value
      ? `Busca: ${currentQ.value || neighborhoodLabel.value || cityLabel.value || 'Barbearias'} — SuaAgenda`
      : 'Barbearias no Brasil — Agende Online | SuaAgenda',
    meta: [
      { name: 'description', content: `Encontre barbearias em ${totalCidades.value} cidades do Brasil.` },
      { name: 'robots', content: isSearchMode.value ? 'noindex, follow' : 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: 'https://suaagenda.link/barbearias' }],
  })))
  </script>
  
  <style scoped>
  .dropdown-enter-active, .dropdown-leave-active { transition: opacity .15s, transform .15s; }
  .dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
  </style>