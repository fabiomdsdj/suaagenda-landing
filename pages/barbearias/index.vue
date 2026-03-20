<!-- pages/barbearias/index.vue -->
<template>
  <div class="text-[15px]">

    <!-- ══════════════════════════════════════════════════════════════ -->
    <!-- MODO BUSCA                                                      -->
    <!-- ══════════════════════════════════════════════════════════════ -->
    <div v-if="isSearchMode">

      <!-- TOPBAR FIXA -->
      <div class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5 pt-[72px]">
        <div class="max-w-7xl mx-auto px-6 py-3">
          
          <!-- Linha 1: Busca + Botão filtros mobile + Voltar -->
          <div class="flex items-center gap-3 mb-3">
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
                @input="debouncedSearch"
                @focus="onSearchInput"
                @keydown.enter="commitSearch"
                @keydown.escape="closeDropdown"
              />
              <button v-if="queryInput" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white" @click="clearQuery">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
              </button>

              <!-- Dropdown autocomplete -->
              <Transition name="dropdown">
                <div
                  v-if="showDropdown && dropdownResults.length"
                  class="absolute top-full mt-1 left-0 right-0 rounded-xl border border-white/[.08] bg-[#1a1a1a] shadow-2xl overflow-hidden max-h-[400px] overflow-y-auto"
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
                      <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-300 truncate">{{ item.name }}</p>
                        <p class="text-xs text-gray-600">{{ item.city }}, {{ item.uf }}</p>
                      </div>
                      <span class="text-[10px] text-gray-700 bg-white/[.03] px-1.5 py-0.5 rounded">{{ item.count }}</span>
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
                      <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-300 truncate">{{ item.name }}</p>
                        <p class="text-xs text-gray-600">{{ item.uf }} · {{ item.totalBairros }} bairros</p>
                      </div>
                      <span class="text-[10px] text-gray-700 bg-white/[.03] px-1.5 py-0.5 rounded">{{ item.count }}</span>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Botão filtros mobile -->
            <button 
              class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[.08] bg-[#181818] text-sm text-gray-400 hover:border-green-400/30 hover:text-white transition-colors lg:hidden"
              @click="showMobileFilters = !showMobileFilters"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"/>
              </svg>
              Filtros
              <span v-if="activeFiltersCount > 0" class="ml-1 px-1.5 py-0.5 rounded-full bg-green-400 text-black text-[10px] font-bold">{{ activeFiltersCount }}</span>
            </button>

            <button class="ml-auto text-xs text-gray-500 hover:text-green-400 transition-colors whitespace-nowrap flex-shrink-0" @click="exitSearch">
              ← Voltar
            </button>
          </div>

          <!-- Linha 2: Chips de filtros ativos -->
          <div v-if="activeFilterChips.length" class="flex items-center gap-2 flex-wrap">
            <TransitionGroup name="chip">
              <button
                v-for="chip in activeFilterChips"
                :key="chip.id"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-400/15 border border-green-400/30 text-green-400 text-xs font-medium hover:bg-green-400/20 transition-all"
                @click="removeFilter(chip.id)"
              >
                <span>{{ chip.label }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
              </button>
            </TransitionGroup>
            <button
              v-if="activeFiltersCount > 1"
              class="text-xs text-gray-500 hover:text-white transition-colors underline"
              @click="clearFilters"
            >Limpar tudo</button>
          </div>
        </div>
      </div>

      <!-- LAYOUT RESULTADOS -->
      <div class="pt-[180px] min-h-screen bg-[#0a0a0a]">
        <div class="max-w-7xl mx-auto px-6 py-8 flex gap-8">

          <!-- SIDEBAR DESKTOP -->
          <FilterSidebar
            v-model:service="activeService"
            v-model:price="activePrice"
            v-model:rating="activeRating"
            v-model:plan="activePlan"
            v-model:featured="activeFeatured"
            v-model:sort="activeSort"
            :has-active-filters="hasActiveFilters"
            :current-neighborhood="currentNeighborhood"
            :current-city="currentCity"
            :neighborhood-label="neighborhoodLabel"
            :city-label="cityLabel"
            @clear-filters="clearFilters"
            @clear-neighborhood="clearNeighborhood"
            @clear-city="clearCity"
            class="hidden lg:block w-64 flex-shrink-0"
          />

          <!-- CARDS -->
          <div class="flex-1 min-w-0">

            <!-- Header com stats -->
            <div class="mb-6">
              <div class="flex items-center justify-between flex-wrap gap-3 mb-2">
                <div>
                  <p class="text-white font-bold text-lg">
                    {{ searchResult.meta.total }} resultado{{ searchResult.meta.total !== 1 ? 's' : '' }}
                    <span v-if="currentQ" class="text-gray-500 font-normal"> para "{{ currentQ }}"</span>
                    <span v-else-if="currentNeighborhood" class="text-gray-500 font-normal"> em {{ neighborhoodLabel }}</span>
                    <span v-else-if="currentCity" class="text-gray-500 font-normal"> em {{ cityLabel }}</span>
                  </p>
                  
                  <!-- Estatísticas -->
                  <div v-if="searchResult.meta.stats.avgRating || searchResult.meta.stats.avgPrice" class="flex items-center gap-4 mt-1 text-sm text-gray-500 flex-wrap">
                    <span v-if="searchResult.meta.stats.avgRating" class="flex items-center gap-1">
                      ⭐ Média {{ searchResult.meta.stats.avgRating.toFixed(1) }}
                    </span>
                    <span v-if="searchResult.meta.stats.avgPrice" class="flex items-center gap-1">
                      💰 Média R$ {{ Math.round(searchResult.meta.stats.avgPrice) }}
                    </span>
                    <span v-if="searchResult.meta.stats.proCount > 0" class="flex items-center gap-1">
                      👑 {{ searchResult.meta.stats.proCount }} PRO
                    </span>
                    <span class="flex items-center gap-1">
                      📸 {{ searchResult.meta.stats.hasPhotos }} com fotos
                    </span>
                  </div>
                </div>
                
                <select
                  v-model="activeSort"
                  class="lg:hidden text-sm bg-[#181818] border border-white/[.08] text-gray-400 rounded-xl px-3 py-2 focus:outline-none"
                >
                  <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
            </div>

            <!-- Grid -->
            <div v-if="searchResult.data.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <BarbershopCard
                v-for="shop in searchResult.data"
                :key="shop.id"
                :shop="shop"
              />
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center py-24 text-center">
              <div class="w-32 h-32 mb-6 rounded-full bg-green-400/10 flex items-center justify-center">
                <span class="text-6xl opacity-40">✂️</span>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Nenhum resultado encontrado</h2>
              <p class="text-gray-500 mb-6 max-w-md">
                Não encontramos barbearias com esses filtros.
                <span v-if="hasActiveFilters">Tente remover alguns filtros.</span>
                <span v-else>Tente buscar outra localização.</span>
              </p>
              
              <div class="flex flex-wrap justify-center gap-3">
                <button 
                  v-if="hasActiveFilters"
                  class="px-5 py-2.5 rounded-xl bg-green-400 text-black font-bold hover:bg-green-300 transition-colors"
                  @click="clearFilters"
                >
                  Limpar filtros
                </button>
                <button 
                  v-if="currentNeighborhood"
                  class="px-5 py-2.5 rounded-xl border border-white/20 text-white hover:border-green-400 hover:text-green-400 transition-colors"
                  @click="clearNeighborhood"
                >
                  Ver toda a cidade
                </button>
              </div>
            </div>

            <!-- Sugestões de Refinamento -->
            <div v-if="searchResult.data.length > 0">
              <!-- Bairros próximos -->
              <div v-if="searchResult.suggestions.nearbyNeighborhoods.length" class="mt-12 p-6 rounded-2xl border border-white/[.06] bg-[#111]">
                <h3 class="text-sm font-bold text-gray-400 mb-4">📍 Bairros próximos</h3>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="n in searchResult.suggestions.nearbyNeighborhoods"
                    :key="n.slug"
                    class="px-3 py-2 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all text-sm text-gray-400 hover:text-white"
                    @click="goToNeighborhood(n.slug)"
                  >
                    {{ n.name }}
                    <span class="ml-1.5 text-xs text-gray-600">({{ n.count }})</span>
                  </button>
                </div>
              </div>

              <!-- Serviços relacionados -->
              <div v-if="searchResult.suggestions.relatedServices.length" class="mt-6 p-6 rounded-2xl border border-white/[.06] bg-[#111]">
                <h3 class="text-sm font-bold text-gray-400 mb-4">✂️ Outros serviços disponíveis</h3>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="s in searchResult.suggestions.relatedServices"
                    :key="s.slug"
                    class="px-3 py-2 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all text-sm text-gray-400 hover:text-white"
                    @click="toggleService(s.slug)"
                  >
                    {{ s.name }}
                    <span class="ml-1.5 text-xs text-gray-600">({{ s.count }})</span>
                  </button>
                </div>
              </div>
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

    <!-- ══════════════════════════════════════════════════════════════ -->
    <!-- MODO DISCOVERY                                                  -->
    <!-- ══════════════════════════════════════════════════════════════ -->
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
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-gray-300 font-medium truncate">{{ item.name }}</p>
                      <p class="text-xs text-gray-600">{{ item.city }}, {{ item.uf }}</p>
                    </div>
                    <span class="text-[10px] text-gray-700 bg-white/[.03] px-1.5 py-0.5 rounded">{{ item.count }}</span>
                  </button>
                </div>
                <div v-if="dropdownCities.length">
                  <p class="px-4 pt-3 pb-1 text-[11px] font-bold tracking-widest uppercase text-gray-600">Cidades</p>
                  <button v-for="item in dropdownCities" :key="item.href" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[.04] transition-colors text-left" @click="goTo(item.href)">
                    <span class="text-gray-500">🏙️</span>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-gray-300 font-medium truncate">{{ item.name }}</p>
                      <p class="text-xs text-gray-600">{{ item.uf }} · {{ item.totalBairros }} bairros</p>
                    </div>
                    <span class="text-[10px] text-gray-700 bg-white/[.03] px-1.5 py-0.5 rounded">{{ item.count }}</span>
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

    <!-- Modal Filtros Mobile -->
    <MobileFilterModal
      v-model:show="showMobileFilters"
      v-model:service="activeService"
      v-model:price="activePrice"
      v-model:rating="activeRating"
      v-model:plan="activePlan"
      v-model:featured="activeFeatured"
      v-model:sort="activeSort"
      :has-active-filters="hasActiveFilters"
      @clear-filters="clearFilters"
      @apply="showMobileFilters = false"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { allCities, allServices } from '~/data/locations'
import { allBarbershops } from '~/data/barbershops'
import { useBarbershopSearch, getBarbershopNeighborhoodLabel, minPrice } from '~/composables/useBarbershops'
import type { Barbershop } from '~/data/barbershops'

definePageMeta({ layout: 'barber' })

const router = useRouter()
const route  = useRoute()

// ── Query params (fonte da verdade) ──────────────────────────────────────────
const currentQ            = computed(() => (route.query.q            as string) || '')
const currentSvc          = computed(() => (route.query.svc          as string) || '')
const currentPrice        = computed(() => (route.query.price        as string) || '')
const currentRating       = computed(() => (route.query.rating       as string) || '')
const currentPlan         = computed(() => (route.query.plan         as string) || '')
const currentFeatured     = computed(() => route.query.featured === 'true')
const currentSort         = computed(() => (route.query.sort         as string) || 'relevance')
const currentPage         = computed(() => Number(route.query.page)  || 1)
const currentCity         = computed(() => (route.query.city         as string) || '')
const currentUf           = computed(() => (route.query.uf           as string) || '')
const currentNeighborhood = computed(() => (route.query.neighborhood as string) || '')

// ── Labels legíveis ───────────────────────────────────────────────────────────
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

// ── Search mode ───────────────────────────────────────────────────────────────
const isSearchMode = computed(() =>
  !!currentQ.value ||
  !!currentSvc.value ||
  !!currentPrice.value ||
  !!currentRating.value ||
  !!currentPlan.value ||
  currentFeatured.value ||
  !!currentCity.value ||
  !!currentNeighborhood.value
)

// ── Filtros locais (sincronizados com URL) ────────────────────────────────────
const queryInput      = ref(currentQ.value)
const activeService   = ref<string | null>(currentSvc.value     || null)
const activePrice     = ref<string | null>(currentPrice.value   || null)
const activeRating    = ref<string | null>(currentRating.value  || null)
const activePlan      = ref<string | null>(currentPlan.value    || null)
const activeFeatured  = ref(currentFeatured.value)
const activeSort      = ref(currentSort.value)
const showMobileFilters = ref(false)

watch(() => route.query, () => {
  queryInput.value     = currentQ.value
  activeService.value  = currentSvc.value     || null
  activePrice.value    = currentPrice.value   || null
  activeRating.value   = currentRating.value  || null
  activePlan.value     = currentPlan.value    || null
  activeFeatured.value = currentFeatured.value
  activeSort.value     = currentSort.value
}, { immediate: true })

const hasActiveFilters = computed(() =>
  !!activeService.value || !!activePrice.value || !!activeRating.value ||
  !!activePlan.value || activeFeatured.value ||
  activeSort.value !== 'relevance' || !!currentCity.value || !!currentNeighborhood.value
)

// ── buildQuery ─────────────────────────────────────────────────────────────────
function buildQuery(overrides: Record<string, any> = {}): Record<string, string> {
  const q: Record<string, string> = {}
  if (queryInput.value.trim())          q.q            = queryInput.value.trim()
  if (activeService.value)              q.svc          = activeService.value
  if (activePrice.value)                q.price        = activePrice.value
  if (activeRating.value)               q.rating       = activeRating.value
  if (activePlan.value)                 q.plan         = activePlan.value
  if (activeFeatured.value)             q.featured     = 'true'
  if (activeSort.value !== 'relevance') q.sort         = activeSort.value
  if (currentCity.value)                q.city         = currentCity.value
  if (currentUf.value)                  q.uf           = currentUf.value
  if (currentNeighborhood.value)        q.neighborhood = currentNeighborhood.value
  
  Object.entries(overrides).forEach(([key, val]) => {
    if (val === undefined) delete q[key]
    else q[key] = String(val)
  })
  
  return q
}

// ── Debounced search ───────────────────────────────────────────────────────────
const debouncedSearch = useDebounceFn(() => {
  onSearchInput()
}, 300)

// ── Navegação ──────────────────────────────────────────────────────────────────
function commitSearch() {
  closeDropdown()
  const q: Record<string, string> = {}
  if (queryInput.value.trim()) q.q = queryInput.value.trim()
  if (activeService.value)     q.svc = activeService.value
  if (activePrice.value)       q.price = activePrice.value
  if (activeRating.value)      q.rating = activeRating.value
  if (activePlan.value)        q.plan = activePlan.value
  if (activeFeatured.value)    q.featured = 'true'
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
  queryInput.value     = ''
  activeService.value  = null
  activePrice.value    = null
  activeRating.value   = null
  activePlan.value     = null
  activeFeatured.value = false
  router.push('/barbearias')
}

function clearQuery() {
  queryInput.value = ''
  router.replace({ path: '/barbearias', query: buildQuery() })
}

function clearCity() {
  router.replace({ path: '/barbearias', query: buildQuery({ city: undefined, uf: undefined, neighborhood: undefined }) })
}

function clearNeighborhood() {
  router.replace({ path: '/barbearias', query: buildQuery({ neighborhood: undefined }) })
}

function toggleService(slug: string) {
  activeService.value = activeService.value === slug ? null : slug
  router.replace({ path: '/barbearias', query: buildQuery() })
}

function clearFilters() {
  activeService.value  = null
  activePrice.value    = null
  activeRating.value   = null
  activePlan.value     = null
  activeFeatured.value = false
  activeSort.value     = 'relevance'
  
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

function goToNeighborhood(slug: string) {
  const city = allCities.find(c =>
    c.districts.some(d => d.neighborhoods.some(n => n.slug === slug))
  )
  if (city) {
    router.push({ path: '/barbearias', query: { neighborhood: slug, city: city.citySlug, uf: city.ufSlug } })
  }
}

watch(activeSort, () => {
  if (isSearchMode.value) router.replace({ path: '/barbearias', query: buildQuery() })
})

// ── Chips de filtros ativos ────────────────────────────────────────────────────
interface FilterChip {
  id: string
  label: string
}

const activeFilterChips = computed((): FilterChip[] => {
  const chips: FilterChip[] = []
  
  if (currentNeighborhood.value) {
    chips.push({ id: 'neighborhood', label: `📍 ${neighborhoodLabel.value}` })
  } else if (currentCity.value) {
    chips.push({ id: 'city', label: `🏙️ ${cityLabel.value}` })
  }
  
  if (activeService.value) {
    const service = allServices.find(s => s.slug === activeService.value)
    if (service) chips.push({ id: 'service', label: `${service.emoji} ${service.name}` })
  }
  
  if (activePrice.value) {
    const range = priceRanges.find(p => p.value === activePrice.value)
    if (range) chips.push({ id: 'price', label: `💰 ${range.label}` })
  }
  
  if (activeRating.value) {
    chips.push({ id: 'rating', label: `⭐ ${activeRating.value}+ estrelas` })
  }
  
  if (activePlan.value) {
    const planLabel = activePlan.value === 'pro' ? 'PRO' : activePlan.value.toUpperCase()
    chips.push({ id: 'plan', label: `👑 ${planLabel}` })
  }
  
  if (activeFeatured.value) {
    chips.push({ id: 'featured', label: '⭐ Destaques' })
  }
  
  return chips
})

const activeFiltersCount = computed(() => activeFilterChips.value.length)

function removeFilter(chipId: string) {
  const updates: Record<string, any> = {}
  
  if (chipId === 'neighborhood') {
    updates.neighborhood = undefined
  } else if (chipId === 'city') {
    updates.city = undefined
    updates.uf = undefined
  } else if (chipId === 'service') {
    activeService.value = null
  } else if (chipId === 'price') {
    activePrice.value = null
  } else if (chipId === 'rating') {
    activeRating.value = null
  } else if (chipId === 'plan') {
    activePlan.value = null
  } else if (chipId === 'featured') {
    activeFeatured.value = false
  }
  
  router.replace({ path: '/barbearias', query: buildQuery(updates) })
}

// ── Resultados ─────────────────────────────────────────────────────────────────
const searchResult = computed(() =>
  useBarbershopSearch({
    q:            currentQ.value,
    svc:          currentSvc.value,
    price:        currentPrice.value,
    rating:       currentRating.value,
    plan:         currentPlan.value,
    featured:     currentFeatured.value ? true : undefined,
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

// ── Filtros UI estáticos ───────────────────────────────────────────────────────
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

// ── Dropdown autocomplete ──────────────────────────────────────────────────────
const showDropdown = ref(false)
const heroRef      = ref<HTMLElement | null>(null)
const topbarRef    = ref<HTMLElement | null>(null)

interface DropItem {
  name:          string
  href:          string
  city:          string
  uf:            string
  type:          'neighborhood' | 'city'
  totalBairros?: number
  count:         number
}

const dropdownResults = computed((): DropItem[] => {
  const q = queryInput.value.trim().toLowerCase()
  if (q.length < 2) return []
  const out: DropItem[] = []

  // Bairros
  outer: for (const city of allCities) {
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
              name: n.name,
              href: `/barbearias?neighborhood=${n.slug}&city=${city.citySlug}&uf=${city.ufSlug}`,
              city: city.city,
              uf:   city.uf,
              type: 'neighborhood',
              count,
            })
          }
          
          if (out.filter(r => r.type === 'neighborhood').length >= 5) break outer
        }
      }
    }
  }

  // Cidades
  for (const city of allCities) {
    if (out.filter(r => r.type === 'city').length >= 3) break
    if (city.city.toLowerCase().includes(q) || city.citySlug.includes(q)) {
      const count = allBarbershops.filter(b =>
        b.citySlug === city.citySlug && b.status === 'active'
      ).length
      
      if (count > 0) {
        out.push({
          name: city.city,
          href: `/barbearias?city=${city.citySlug}&uf=${city.ufSlug}`,
          city: city.city,
          uf:   city.uf,
          type: 'city',
          totalBairros: city.districts.reduce((a, d) => a + d.neighborhoods.length, 0),
          count,
        })
      }
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

// ── Discovery data ─────────────────────────────────────────────────────────────
const ufs = computed(() => {
  const map = new Map<string, { uf: string; ufSlug: string; totalCidades: number; totalBairros: number }>()
  for (const city of allCities) {
    const bairros = city.districts.reduce((a, d) => a + d.neighborhoods.length, 0)
    const ex = map.get(city.ufSlug)
    if (!ex) map.set(city.ufSlug, { uf: city.uf, ufSlug: city.ufSlug, totalCidades: 1, totalBairros: bairros })
    else { ex.totalCidades++; ex.totalBairros += bairros }
  }
  // ✅ Sort por ufSlug (ASCII) — determinístico em qualquer ambiente
  return Array.from(map.values()).sort((a, b) => (a.ufSlug < b.ufSlug ? -1 : 1))
})

const featuredCities = computed(() =>
  [...allCities]
    .map(c => ({
      city: c.city, citySlug: c.citySlug, uf: c.uf, ufSlug: c.ufSlug,
      totalDistritos: c.districts.length,
      totalBairros: c.districts.reduce((a, d) => a + d.neighborhoods.length, 0),
    }))
    // ✅ Desempata por citySlug — garante ordem idêntica server/client quando totalBairros for igual
    .sort((a, b) => b.totalBairros - a.totalBairros || (a.citySlug < b.citySlug ? -1 : 1))
    .slice(0, 6)
)

const totalCidades = computed(() => allCities.length)
const totalBairros = computed(() =>
  allCities.reduce((acc, c) => acc + c.districts.reduce((a, d) => a + d.neighborhoods.length, 0), 0)
)

// ── SEO ────────────────────────────────────────────────────────────────────────
useHead(computed(() => ({
  title: isSearchMode.value
    ? `Busca: ${currentQ.value || neighborhoodLabel.value || cityLabel.value || 'Barbearias'} — SuaAgenda`
    : 'As melhores Barbearias no Brasil ',
  meta: [
    { name: 'description', content: `Encontre barbearias em ${totalCidades.value} cidades do Brasil.` },
    { name: 'robots', content: isSearchMode.value ? 'noindex, follow' : 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://suaagenda.link/barbearias' }],
})))
</script>

<style scoped>
.chip-enter-active,
.chip-leave-active {
  transition: all 0.3s ease;
}
.chip-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.chip-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity .15s, transform .15s;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>