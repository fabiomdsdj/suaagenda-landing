<!-- pages/scraper/index.vue -->
<template>
  <div class="min-h-screen bg-[#0a0a0a] px-4 pb-20" style="padding-top: calc(68px + 2rem); font-family: 'DM Sans', sans-serif">
    <div class="max-w-6xl mx-auto">

      <!-- ── Header ──────────────────────────────────────────────── -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <!-- ✅ Título sempre estático, independente de qualquer filtro -->
          <h1 class="text-2xl font-bold text-white tracking-tight">Barbearias cadastradas</h1>
          <p class="text-sm text-gray-500 mt-1">Gerencie os registros scrapeados e manuais</p>
        </div>
        <div class="flex items-center gap-3">
          <DataSourceToggle v-if="isDev" />
          <NuxtLink
            to="/scraper/new"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-400 text-black text-sm font-bold hover:bg-green-300 transition-colors"
          >
            + Nova barbearia
          </NuxtLink>
        </div>
      </div>

      <!-- ── Stats ───────────────────────────────────────────────── -->
      <div v-if="stats" class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div class="stat-card">
          <p class="stat-num">{{ stats.total }}</p>
          <p class="stat-label">Total</p>
        </div>
        <div class="stat-card">
          <p class="stat-num text-green-400">{{ stats.claimed }}</p>
          <p class="stat-label">Reivindicadas</p>
        </div>
        <div class="stat-card">
          <p class="stat-num text-amber-400">{{ stats.unclaimed }}</p>
          <p class="stat-label">Sem dono</p>
        </div>
        <div class="stat-card">
          <p class="stat-num text-blue-400">{{ stats.manual }}</p>
          <p class="stat-label">Manuais</p>
        </div>
      </div>

      <!-- ✅ Card de metas: semanal + diária -->
      <div v-if="weeklyGoal > 0 || dailyGoal > 0" class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">

        <!-- Meta semanal -->
        <div
          v-if="weeklyGoal > 0"
          class="rounded-2xl border p-5"
          :class="goalWeekly.done
            ? 'border-green-400/30 bg-green-400/[.04]'
            : goalWeekly.pct >= 80
              ? 'border-amber-400/20 bg-amber-400/[.03]'
              : 'border-white/[.06] bg-[#111]'"
        >
          <div class="flex items-start justify-between gap-3 mb-3">
            <div>
              <p class="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Meta semanal</p>
              <p class="text-sm font-bold text-white">
                {{ goalWeekly.done ? 'Meta batida!' : `${weeklyGoal} cadastros` }}
              </p>
            </div>
            <p
              class="font-black leading-none flex-shrink-0"
              style="font-family:'Bebas Neue',sans-serif;font-size:36px"
              :class="goalWeekly.done ? 'text-green-400' : 'text-white'"
            >{{ Math.min(goalWeekly.pct, 999) }}%</p>
          </div>
          <div class="h-1.5 rounded-full bg-white/[.06] overflow-hidden mb-2">
            <div
              class="h-full rounded-full transition-all duration-700"
              :class="goalWeekly.done ? 'bg-green-400' : goalWeekly.pct >= 80 ? 'bg-amber-400' : 'bg-green-400/60'"
              :style="{ width: `${Math.min(goalWeekly.pct, 100)}%` }"
            />
          </div>
          <div class="flex items-center justify-between text-xs text-gray-600">
            <span>
              <span class="text-white font-medium">{{ goalWeekly.current }}</span>
              / {{ weeklyGoal }}
            </span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-bold border"
              :class="goalWeekly.done
                ? 'bg-green-400/10 text-green-400 border-green-400/20'
                : goalWeekly.pct >= 80
                  ? 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                  : 'bg-white/[.04] text-gray-600 border-white/[.08]'"
            >
              {{ goalWeekly.done
                ? `+${goalWeekly.extra} extra`
                : goalWeekly.daysLeft > 0
                  ? `${goalWeekly.daysLeft}d restantes`
                  : 'último dia' }}
            </span>
          </div>
        </div>

        <!-- Meta diária -->
        <div
          v-if="dailyGoal > 0"
          class="rounded-2xl border p-5"
          :class="goalDaily.done
            ? 'border-green-400/30 bg-green-400/[.04]'
            : goalDaily.pct >= 80
              ? 'border-amber-400/20 bg-amber-400/[.03]'
              : 'border-white/[.06] bg-[#111]'"
        >
          <div class="flex items-start justify-between gap-3 mb-3">
            <div>
              <p class="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Meta diária</p>
              <p class="text-sm font-bold text-white">
                {{ goalDaily.done ? 'Meta batida!' : `${dailyGoal} cadastros` }}
              </p>
            </div>
            <p
              class="font-black leading-none flex-shrink-0"
              style="font-family:'Bebas Neue',sans-serif;font-size:36px"
              :class="goalDaily.done ? 'text-green-400' : 'text-white'"
            >{{ Math.min(goalDaily.pct, 999) }}%</p>
          </div>
          <div class="h-1.5 rounded-full bg-white/[.06] overflow-hidden mb-2">
            <div
              class="h-full rounded-full transition-all duration-700"
              :class="goalDaily.done ? 'bg-green-400' : goalDaily.pct >= 80 ? 'bg-amber-400' : 'bg-green-400/60'"
              :style="{ width: `${Math.min(goalDaily.pct, 100)}%` }"
            />
          </div>
          <div class="flex items-center justify-between text-xs text-gray-600">
            <span>
              <span class="text-white font-medium">{{ goalDaily.current }}</span>
              / {{ dailyGoal }} hoje
            </span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-bold border"
              :class="goalDaily.done
                ? 'bg-green-400/10 text-green-400 border-green-400/20'
                : goalDaily.pct >= 80
                  ? 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                  : 'bg-white/[.04] text-gray-600 border-white/[.08]'"
            >
              {{ goalDaily.done
                ? `+${goalDaily.extra} extra`
                : goalDaily.remaining > 0
                  ? `faltam ${goalDaily.remaining}`
                  : 'zerado' }}
            </span>
          </div>
        </div>

      </div>

      <!-- ✅ Card de cobertura de bairros -->
      <div v-if="coverageStats" class="mb-6">
        <div
          class="rounded-2xl border border-white/[.06] bg-[#111] p-5 cursor-pointer select-none"
          @click="showCoverage = !showCoverage"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <div>
                <p class="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Cobertura de bairros</p>
                <p class="text-sm font-bold text-white">
                  {{ coverageStats.coveredNeighborhoods }}
                  <span class="text-gray-500 font-normal">/ {{ coverageStats.totalNeighborhoods }} bairros</span>
                  <span class="ml-2 text-gray-600 font-normal text-xs">em {{ coverageStats.totalCities }} cidades</span>
                </p>
              </div>
              <div class="flex-1 max-w-xs hidden sm:block">
                <div class="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-700"
                    :class="coverageStats.pct >= 80 ? 'bg-green-400' : coverageStats.pct >= 50 ? 'bg-amber-400' : 'bg-green-400/50'"
                    :style="{ width: `${coverageStats.pct}%` }"
                  />
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 flex-shrink-0">
              <p
                class="font-black leading-none"
                style="font-family:'Bebas Neue',sans-serif;font-size:32px"
                :class="coverageStats.pct >= 80 ? 'text-green-400' : coverageStats.pct >= 50 ? 'text-amber-400' : 'text-white'"
              >{{ coverageStats.pct }}%</p>
              <svg
                xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 transition-transform duration-200"
                :class="showCoverage ? 'rotate-180' : ''"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
              </svg>
            </div>
          </div>
        </div>

        <Transition name="coverage">
          <div v-if="showCoverage" class="mt-2 space-y-2">
            <div
              v-for="city in coverageStats.cities"
              :key="city.citySlug"
              class="rounded-xl border border-white/[.05] bg-[#0d0d0d] p-4"
            >
              <div class="flex items-center justify-between gap-3 mb-3">
                <div class="flex items-center gap-2 min-w-0">
                  <NuxtLink
                    :to="`/barbearias/${city.ufSlug}/${city.citySlug}`"
                    class="text-sm font-semibold text-white hover:text-green-400 transition-colors truncate"
                    target="_blank"
                  >{{ city.name }}</NuxtLink>
                  <span class="text-[10px] text-gray-600 uppercase tracking-widest flex-shrink-0">{{ city.ufSlug.toUpperCase() }}</span>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class="text-xs text-gray-500">{{ city.covered }}/{{ city.total }}</span>
                  <span
                    class="text-xs font-bold px-2 py-0.5 rounded-full border"
                    :class="city.pct >= 80
                      ? 'text-green-400 bg-green-400/10 border-green-400/20'
                      : city.pct >= 50
                        ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                        : 'text-gray-500 bg-white/[.04] border-white/[.06]'"
                  >{{ city.pct }}%</span>
                </div>
              </div>
              <div class="h-1 rounded-full bg-white/[.06] overflow-hidden mb-3">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :class="city.pct >= 80 ? 'bg-green-400' : city.pct >= 50 ? 'bg-amber-400' : 'bg-green-400/40'"
                  :style="{ width: `${city.pct}%` }"
                />
              </div>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="n in city.neighborhoods"
                  :key="n.slug"
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] border transition-all"
                  :class="n.covered
                    ? 'bg-green-400/10 border-green-400/20 text-green-400/80 hover:bg-green-400/20 hover:text-green-400 cursor-pointer'
                    : 'bg-white/[.02] border-white/[.05] text-gray-700 cursor-default'"
                  :title="n.covered
                    ? `${n.count} barbearia${n.count !== 1 ? 's' : ''} em ${n.name} — clique para filtrar`
                    : `${n.name} — sem cobertura`"
                  @click="n.covered && filterByNeighborhood(city, n)"
                >
                  {{ n.name }}
                  <span v-if="n.covered" class="ml-1.5 text-[10px] font-bold text-green-400/60">{{ n.count }}</span>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- ── Filtros ─────────────────────────────────────────────── -->
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <div class="relative flex-1 min-w-[200px] max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"/>
          </svg>
          <input
            v-model="filters.q"
            type="text"
            placeholder="Buscar por nome, cidade..."
            class="filter-input pl-9"
            @input="debouncedFetch"
          />
        </div>

        <select v-model="filters.status" class="filter-select" @change="fetchList">
          <option value="">Todos os status</option>
          <option value="active">Ativo</option>
          <option value="pending">Pendente</option>
          <option value="suspended">Suspenso</option>
        </select>

        <select v-model="filters.claimed" class="filter-select" @change="fetchList">
          <option value="">Reivindicado?</option>
          <option value="0">Não reivindicado</option>
          <option value="1">Reivindicado</option>
        </select>

        <select v-model="filters.city" class="filter-select" @change="onCityChange">
          <option value="">Todas as cidades</option>
          <option v-for="c in cityOptions" :key="c" :value="c">{{ c }}</option>
        </select>

        <select v-model="filters.dateRange" class="filter-select" @change="fetchList">
          <option value="">Qualquer data</option>
          <option value="today">Hoje</option>
          <option value="yesterday">Ontem</option>
          <option value="last7">Últimos 7 dias</option>
          <option value="last30">Últimos 30 dias</option>
          <option value="thisMonth">Este mês</option>
        </select>

        <!-- ✅ Filtro por engajamento WhatsApp -->
        <select
          v-model="filters.wppEngagement"
          class="filter-select"
          :class="filters.wppEngagement ? 'border-green-400/40 text-green-400' : ''"
          @change="onWppEngagementChange"
        >
          <option value="">WhatsApp: todos</option>
          <option value="any">Teve algum clique</option>
          <option value="5">5+ cliques</option>
          <option value="10">10+ cliques</option>
          <option value="25">25+ cliques</option>
          <option value="50">50+ cliques</option>
        </select>

        <button
          v-if="hasFilters"
          class="text-xs text-gray-500 hover:text-red-400 transition-colors underline"
          @click="clearFilters"
        >Limpar</button>

        <p class="ml-auto text-xs text-gray-600">
          <template v-if="filters.wppEngagement">
            <span class="text-green-400 font-medium">{{ filteredRows.length }}</span>
            <span class="text-gray-600"> de </span>
          </template>
          <span class="text-gray-400 font-medium">{{ meta.total }}</span>
          registro{{ meta.total !== 1 ? 's' : '' }}
          <span v-if="wppFilterLoading" class="ml-1 text-gray-700 animate-pulse">· filtrando...</span>
        </p>
      </div>

      <!-- Dropdown de bairro -->
      <div v-if="filters.city && neighborhoodChips.length" class="flex flex-wrap items-center gap-3 mb-6">
        <select v-model="filters.neighborhood" class="filter-select" @change="onNeighborhoodChange">
          <option value="">Todos os bairros</option>
          <option v-for="n in neighborhoodChips" :key="n.slug" :value="n.slug">{{ n.name }}</option>
        </select>
      </div>

      <!-- ── Paginação (topo) ─────────────────────────────────────
           ✅ Some quando filtro wpp ativo (resultado client-side, sem páginas reais)
      ──────────────────────────────────────────────────────────── -->
      <div v-if="!filters.wppEngagement && meta.pages > 1" class="flex items-center justify-center gap-2 my-6">
        <button
          class="w-9 h-9 rounded-xl text-sm font-medium bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="meta.page === 1"
          @click="goPage(meta.page - 1)"
        >‹</button>
        <template v-for="p in paginationPages" :key="p">
          <span v-if="p === '...'" class="w-9 h-9 flex items-center justify-center text-gray-600 text-sm">…</span>
          <button
            v-else
            class="w-9 h-9 rounded-xl text-sm font-medium transition-all"
            :class="meta.page === p
              ? 'bg-green-400 text-black'
              : 'bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white'"
            @click="goPage(p)"
          >{{ p }}</button>
        </template>
        <button
          class="w-9 h-9 rounded-xl text-sm font-medium bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="meta.page === meta.pages"
          @click="goPage(meta.page + 1)"
        >›</button>
      </div>

      <!-- ── Tabela ──────────────────────────────────────────────── -->
      <div class="rounded-2xl border border-white/[.06] overflow-hidden">

        <!-- Loading skeleton -->
        <div v-if="loading" class="divide-y divide-white/[.04]">
          <div v-for="i in 8" :key="i" class="flex items-center gap-4 px-5 py-4">
            <div class="w-10 h-10 rounded-lg bg-white/[.04] animate-pulse flex-shrink-0" />
            <div class="flex-1 space-y-2">
              <div class="h-3 bg-white/[.04] rounded animate-pulse w-1/3" />
              <div class="h-2.5 bg-white/[.04] rounded animate-pulse w-1/2" />
            </div>
            <div class="h-6 w-16 bg-white/[.04] rounded animate-pulse" />
          </div>
        </div>

        <!-- Lista -->
        <template v-else-if="filteredRows.length">
          <div
            v-for="shop in filteredRows"
            :key="shop.id"
            class="flex items-center gap-4 px-5 py-4 border-b border-white/[.04] last:border-0 hover:bg-white/[.02] transition-colors group"
          >
            <!-- Thumb -->
            <div class="w-10 h-10 rounded-lg overflow-hidden bg-[#181818] border border-white/[.06] flex-shrink-0">
              <img
                v-if="getThumb(shop)"
                :src="getThumb(shop)"
                :alt="shop.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-lg opacity-20">✂️</div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">

              <!-- Linha 1: nome + badges de status -->
              <div class="flex items-center gap-2 flex-wrap">
                <p class="text-sm font-semibold text-white truncate">{{ shop.name }}</p>
                <span
                  v-if="shop.featured"
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                >★ DEST</span>
                <span
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold"
                  :class="{
                    'bg-green-400/10 text-green-400 border border-green-400/20': shop.status === 'active',
                    'bg-amber-400/10 text-amber-400 border border-amber-400/20': shop.status === 'pending',
                    'bg-red-400/10   text-red-400   border border-red-400/20':   shop.status === 'suspended',
                  }"
                >{{ shop.status }}</span>
                <span
                  v-if="shop.isClaimed"
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-400/10 text-blue-400 border border-blue-400/20"
                >✓ claimed</span>
              </div>

              <!-- Linha 2: localização + rating + serviços + data -->
              <p class="text-xs text-gray-500 mt-0.5 truncate">
                {{ [shop.neighborhood, shop.city, shop.state].filter(Boolean).join(', ') }}
                <span v-if="shop.googleRating" class="ml-2 text-yellow-400">★ {{ Number(shop.googleRating).toFixed(1) }}</span>
                <span v-if="shop.services?.length" class="ml-2 text-gray-600">{{ shop.services.length }} serviços</span>
                <span v-if="shop.createdAt" class="ml-2 text-gray-700" :title="formatDateFull(shop.createdAt)">· {{ formatRelative(shop.createdAt) }}</span>
              </p>

              <!-- ✅ Linha 3: analytics em bloco próprio, bem organizado -->
              <div v-if="analyticsMap[shop.id]" class="flex items-center gap-3 mt-1.5">

                <!-- Views -->
                <span
                  class="inline-flex items-center gap-1 text-[11px] text-gray-600"
                  title="Visualizações nos últimos 30 dias"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
                  {{ analyticsMap[shop.id].pageviews }}
                </span>

                <!-- ✅ WhatsApp com ícone SVG, verde se passou no filtro wpp -->
                <span
                  class="inline-flex items-center gap-1 text-[11px]"
                  :class="filters.wppEngagement && wppFilterIds.has(shop.id)
                    ? 'text-green-400 font-semibold'
                    : 'text-gray-600'"
                  title="Cliques no WhatsApp nos últimos 30 dias"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.93 11.93 0 0 0 1.64 6.06L0 24l6.17-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22c-1.84 0-3.62-.49-5.18-1.4l-.37-.22-3.66.96.98-3.57-.24-.37A9.95 9.95 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.52-7.46c-.3-.15-1.78-.88-2.06-.98s-.47-.15-.67.15-.77.98-.95 1.18-.35.22-.65.07a8.2 8.2 0 0 1-2.42-1.5 9.07 9.07 0 0 1-1.67-2.09c-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52s.2-.3.3-.5.05-.37-.02-.52-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.14.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43s.25-1.31.17-1.43-.27-.2-.57-.35Z"/>
                  </svg>
                  {{ analyticsMap[shop.id].whatsapp_clicks }}
                </span>

                <!-- Maps (só se > 0) -->
                <span
                  v-if="analyticsMap[shop.id].maps_clicks > 0"
                  class="inline-flex items-center gap-1 text-[11px] text-gray-600"
                  title="Cliques no Google Maps nos últimos 30 dias"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                  </svg>
                  {{ analyticsMap[shop.id].maps_clicks }}
                </span>

              </div>
            </div>

            <!-- Plano badge -->
            <span
              class="hidden sm:inline-flex px-2 py-1 rounded text-[10px] font-bold border flex-shrink-0"
              :class="{
                'bg-white/[.04] text-gray-500 border-white/[.08]':       shop.plan === 'free',
                'bg-blue-400/10 text-blue-400 border-blue-400/20':       shop.plan === 'basic',
                'bg-green-400/10 text-green-400 border-green-400/20':    shop.plan === 'pro',
                'bg-purple-400/10 text-purple-400 border-purple-400/20': shop.plan === 'enterprise',
              }"
            >{{ shop.plan }}</span>

            <!-- Ações (hover) -->
            <div class="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <NuxtLink
                v-if="shop.ufSlug && shop.citySlug && shop.neighborhoodSlug && shop.slug"
                :to="`/barbearias/${shop.ufSlug}/${shop.citySlug}/${shop.neighborhoodSlug}/${shop.slug}`"
                target="_blank"
                class="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/[.06] transition-colors"
                title="Ver página pública"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
              </NuxtLink>

              <NuxtLink
                :to="`/scraper/${shop.id}`"
                class="p-1.5 rounded-lg text-gray-600 hover:text-green-400 hover:bg-green-400/[.06] transition-colors"
                title="Editar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"/>
                </svg>
              </NuxtLink>

              <button
                class="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/[.06] transition-colors"
                title="Deletar"
                @click="confirmDelete(shop)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
              </button>
            </div>
          </div>
        </template>

        <!-- Empty -->
        <div v-else class="py-20 text-center">
          <p class="text-4xl mb-3 opacity-20">✂️</p>
          <p class="text-gray-500 text-sm">
            {{ filters.wppEngagement ? 'Nenhuma barbearia passou no filtro de WhatsApp' : 'Nenhuma barbearia encontrada' }}
          </p>
          <NuxtLink to="/scraper/new" class="inline-block mt-4 text-green-400 text-sm hover:underline">
            Cadastrar primeira barbearia →
          </NuxtLink>
        </div>
      </div>

      <!-- ── Paginação (rodapé) ────────────────────────────────────
           ✅ Some quando filtro wpp ativo
      ──────────────────────────────────────────────────────────── -->
      <div v-if="!filters.wppEngagement && meta.pages > 1" class="flex items-center justify-center gap-2 mt-6">
        <button
          class="w-9 h-9 rounded-xl text-sm font-medium bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="meta.page === 1"
          @click="goPage(meta.page - 1)"
        >‹</button>
        <template v-for="p in paginationPages" :key="p">
          <span v-if="p === '...'" class="w-9 h-9 flex items-center justify-center text-gray-600 text-sm">…</span>
          <button
            v-else
            class="w-9 h-9 rounded-xl text-sm font-medium transition-all"
            :class="meta.page === p
              ? 'bg-green-400 text-black'
              : 'bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white'"
            @click="goPage(p)"
          >{{ p }}</button>
        </template>
        <button
          class="w-9 h-9 rounded-xl text-sm font-medium bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="meta.page === meta.pages"
          @click="goPage(meta.page + 1)"
        >›</button>
      </div>

    </div>

    <!-- ── Modal de confirmação de delete ──────────────────────── -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="deleteTarget"
          class="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-4"
          @click.self="deleteTarget = null"
        >
          <div class="bg-[#181818] border border-white/[.08] rounded-2xl p-6 max-w-sm w-full">
            <h3 class="text-white font-bold text-lg mb-2">Confirmar exclusão</h3>
            <p class="text-gray-400 text-sm mb-6">
              Excluir <strong class="text-white">{{ deleteTarget.name }}</strong>? Essa ação não pode ser desfeita.
            </p>
            <div class="flex gap-3 justify-end">
              <button
                class="px-4 py-2 rounded-xl text-sm text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                @click="deleteTarget = null"
              >Cancelar</button>
              <button
                class="px-4 py-2 rounded-xl text-sm font-bold bg-red-400 text-white hover:bg-red-300 transition-colors"
                :disabled="deleting"
                @click="doDelete"
              >{{ deleting ? 'Excluindo...' : 'Excluir' }}</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { allCities } from '~/data/locations'
import { useAnalytics } from '~/composables/useAnalytics'

definePageMeta({ layout: 'barber' })
useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const isDev = import.meta.dev
const api   = useScrapingApi()

// ── Estado ────────────────────────────────────────────────────────────────
const loading = ref(true)
const rows    = ref<any[]>([])
const stats   = ref<any>(null)
const meta    = ref({ total: 0, page: 1, pages: 1, limit: 20 })

const filters = reactive({
  q:             '',
  status:        '',
  claimed:       '',
  city:          '',
  neighborhood:  '',
  dateRange:     '',
  wppEngagement: '' as string,
  page:          1,
})

const cityOptions = ref<string[]>([])

const neighborhoodChips = computed(() => {
  if (!filters.city) return []
  const city = allCities.find(c => c.citySlug === filters.city)
  if (!city) return []
  const seen = new Set<string>()
  const chips: { name: string; slug: string }[] = []
  for (const district of city.districts) {
    for (const n of district.neighborhoods) {
      if (!seen.has(n.slug)) {
        seen.add(n.slug)
        chips.push({ name: n.name, slug: n.slug })
      }
    }
  }
  return chips.sort((a, b) => (a.slug < b.slug ? -1 : 1))
})

const hasFilters = computed(() =>
  !!filters.q || !!filters.status || !!filters.claimed || !!filters.city ||
  !!filters.neighborhood || !!filters.dateRange || !!filters.wppEngagement
)

// ── Paginação truncada ────────────────────────────────────────────────────
const paginationPages = computed(() => {
  const current = meta.value.page
  const total   = meta.value.pages
  if (total <= 1) return []

  const delta = 2
  const range: number[] = []
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  const pages: (number | string)[] = [1]
  if (range.length && range[0] > 2)                        pages.push('...')
  pages.push(...range)
  if (range.length && range[range.length - 1] < total - 1) pages.push('...')
  if (total > 1)                                            pages.push(total)

  return pages
})

// ── Thumb ─────────────────────────────────────────────────────────────────
function getThumb(shop: any): string | null {
  if (Array.isArray(shop.photos) && shop.photos.length > 0) {
    const cover = shop.photos.find((p: any) => p.isCover) ?? shop.photos[0]
    return typeof cover === 'string' ? cover : cover?.url ?? null
  }
  return shop.coverImageUrl ?? null
}

// ── Fetch lista ───────────────────────────────────────────────────────────
async function fetchList() {
  loading.value = true
  try {
    const params: Record<string, any> = { page: filters.page, limit: 20 }
    if (filters.q)              params.q            = filters.q
    if (filters.status)         params.status       = filters.status
    if (filters.claimed !== '') params.isClaimed    = filters.claimed
    if (filters.city)           params.city         = filters.city
    if (filters.neighborhood)   params.neighborhood = filters.neighborhood
    if (filters.dateRange)      params.dateRange    = filters.dateRange

    const res = await api.listBarbershops(params)
    rows.value = res.data ?? []
    meta.value = res.meta ?? meta.value
    const ids = (res.data ?? []).map((r: any) => r.id).filter(Boolean)
    fetchAnalytics(ids)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const debouncedFetch = useDebounceFn(() => { filters.page = 1; fetchList() }, 400)

function goPage(p: number) { filters.page = p; fetchList() }

function onCityChange() {
  filters.neighborhood = ''
  filters.page         = 1
  fetchList()
}

function onNeighborhoodChange() {
  filters.page = 1
  fetchList()
}

function clearFilters() {
  filters.q             = ''
  filters.status        = ''
  filters.claimed       = ''
  filters.city          = ''
  filters.neighborhood  = ''
  filters.dateRange     = ''
  filters.wppEngagement = ''
  filters.page          = 1
  wppFilterIds.value    = new Set()
  fetchList()
}

// ── Analytics ─────────────────────────────────────────────────────────────
const { fetchBulkSummary, fetchFilterIds } = useAnalytics()
const analyticsMap = ref<Record<string, any>>({})

async function fetchAnalytics(ids: string[]) {
  if (!ids.length) return
  analyticsMap.value = await fetchBulkSummary(ids, 30)
}

// ── Filtro de engajamento WhatsApp ────────────────────────────────────────
// ✅ FIX: wppFilterIds agora é ref<Set> (não reativo direto) pra evitar
//    problemas de reatividade com Set no Vue 3
const wppFilterIds     = ref<Set<string>>(new Set())
const wppFilterLoading = ref(false)

async function onWppEngagementChange() {
  filters.page = 1

  if (!filters.wppEngagement) {
    wppFilterIds.value = new Set()
    fetchList()
    return
  }

  // ✅ FIX 1: Busca os IDs ANTES de chamar fetchList,
  //    assim filteredRows já tem os IDs quando a lista chega
  wppFilterLoading.value = true
  const minCount = filters.wppEngagement === 'any' ? 1 : parseInt(filters.wppEngagement)
  wppFilterIds.value = await fetchFilterIds('whatsapp_click', minCount, 30)
  wppFilterLoading.value = false

  fetchList()
}

// ✅ FIX 2: Removido o check `wppFilterIds.value.size === 0` que fazia
//    o filtro mostrar tudo quando o resultado era legítimamente vazio.
//    Agora filtra sempre que wppEngagement estiver ativo.
const filteredRows = computed(() => {
  if (!filters.wppEngagement) return rows.value
  return rows.value.filter(shop => wppFilterIds.value.has(shop.id))
})

// ── Metas de cadastros ────────────────────────────────────────────────────
const { public: runtimeConfig } = useRuntimeConfig()

const weeklyGoal = computed(() => {
  const raw = (runtimeConfig as any).weeklyRegistrationGoal
  return raw ? parseInt(String(raw)) : 0
})

const dailyGoal = computed(() => {
  const raw = (runtimeConfig as any).dailyRegistrationGoal
  return raw ? parseInt(String(raw)) : 0
})

const BUSINESS_DAY_START_HOUR = 5

function businessDay(date = new Date()): string {
  const adjusted = new Date(date.getTime() - BUSINESS_DAY_START_HOUR * 60 * 60 * 1000)
  return adjusted.toISOString().split('T')[0]
}

function todayStr(): string { return businessDay() }

function mondayStr(): string {
  const now       = new Date()
  const adjusted  = new Date(now.getTime() - BUSINESS_DAY_START_HOUR * 60 * 60 * 1000)
  const dayOfWeek = adjusted.getDay()
  const daysSince = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  adjusted.setDate(adjusted.getDate() - daysSince)
  adjusted.setHours(0, 0, 0, 0)
  return adjusted.toISOString().split('T')[0]
}

const weeklyCount = computed(() => {
  if (!stats.value?.byDay) return 0
  const mon = mondayStr()
  return (stats.value.byDay as Array<{ date: string; count: number }>)
    .filter(d => d.date >= mon)
    .reduce((acc, d) => acc + Number(d.count), 0)
})

const dailyCount = computed(() => {
  if (!stats.value?.byDay) return 0
  const today = todayStr()
  const entry = (stats.value.byDay as Array<{ date: string; count: number }>)
    .find(d => d.date === today)
  return entry ? Number(entry.count) : 0
})

function makeGoalStatus(current: number, goal: number, daysLeft = 0) {
  const pct       = goal > 0 ? Math.round((current / goal) * 100) : 0
  const done      = current >= goal
  const remaining = done ? 0 : goal - current
  const extra     = done ? current - goal : 0
  return { current, pct, done, remaining, extra, daysLeft }
}

const goalWeekly = computed(() => {
  const now       = new Date()
  const adjusted  = new Date(now.getTime() - BUSINESS_DAY_START_HOUR * 60 * 60 * 1000)
  const dayOfWeek = adjusted.getDay()
  const daysLeft  = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
  return makeGoalStatus(weeklyCount.value, weeklyGoal.value, daysLeft)
})

const goalDaily = computed(() => makeGoalStatus(dailyCount.value, dailyGoal.value))

// ── Cobertura de bairros ──────────────────────────────────────────────────
const showCoverage = ref(false)

const coverageStats = computed(() => {
  if (!stats.value?.neighborhoodsByCity) return null

  const covered = stats.value.neighborhoodsByCity as Record<string, Record<string, number>>
  let totalNeighborhoods   = 0
  let coveredNeighborhoods = 0

  const cities = allCities.map(city => {
    const allNeighborhoodsOfCity = city.districts.flatMap(d => d.neighborhoods)
    const cityMap = covered[city.citySlug] ?? {}

    const neighborhoods = allNeighborhoodsOfCity.map(n => ({
      name:    n.name,
      slug:    n.slug,
      covered: !!cityMap[n.slug],
      count:   cityMap[n.slug] ?? 0,
    }))

    const total = neighborhoods.length
    const cov   = neighborhoods.filter(n => n.covered).length
    const pct   = total > 0 ? Math.round((cov / total) * 100) : 0

    totalNeighborhoods   += total
    coveredNeighborhoods += cov

    return {
      name:     city.city,
      citySlug: city.citySlug,
      ufSlug:   city.ufSlug,
      total,
      covered:  cov,
      pct,
      neighborhoods: neighborhoods.sort((a, b) => {
        if (a.covered !== b.covered) return b.covered ? 1 : -1
        return a.name.localeCompare(b.name, 'pt-BR')
      }),
    }
  }).sort((a, b) => b.pct - a.pct || b.covered - a.covered)

  const totalCities = cities.length
  const pct = totalNeighborhoods > 0
    ? Math.round((coveredNeighborhoods / totalNeighborhoods) * 100)
    : 0

  return { cities, totalCities, totalNeighborhoods, coveredNeighborhoods, pct }
})

function filterByNeighborhood(city: any, neighborhood: any) {
  filters.city         = city.citySlug
  filters.neighborhood = neighborhood.slug
  filters.page         = 1
  showCoverage.value   = false
  fetchList()
  nextTick(() => {
    document.querySelector('.rounded-2xl.border.border-white\\/\\[\\.06\\].overflow-hidden')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

// ── Fetch stats ───────────────────────────────────────────────────────────
async function fetchStats() {
  try {
    const res = await api.getStats()
    stats.value = res
    cityOptions.value = (res.byCity ?? []).map((c: any) => c.citySlug).filter(Boolean)
  } catch (e) { console.error(e) }
}

// ── Delete ────────────────────────────────────────────────────────────────
const deleteTarget = ref<any>(null)
const deleting     = ref(false)

function confirmDelete(shop: any) { deleteTarget.value = shop }

async function doDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await api.deleteBarbershop(deleteTarget.value.id)
    rows.value = rows.value.filter(r => r.id !== deleteTarget.value.id)
    if (stats.value) stats.value.total = Math.max(0, stats.value.total - 1)
    deleteTarget.value = null
  } catch (e: any) {
    alert(`Erro ao excluir: ${e?.data?.error ?? e.message}`)
  } finally {
    deleting.value = false
  }
}

// ── Formatação de data ────────────────────────────────────────────────────
function formatRelative(dateStr: string): string {
  const date    = new Date(dateStr)
  const now     = new Date()
  const diffMs  = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  const diffH   = Math.floor(diffMs / 3_600_000)
  const diffD   = Math.floor(diffMs / 86_400_000)

  if (diffMin < 1)   return 'agora mesmo'
  if (diffMin < 60)  return `há ${diffMin} min`
  if (diffH   < 24)  return `há ${diffH}h`
  if (diffD   === 1) return `ontem às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
  if (diffD   < 7)   return `há ${diffD} dias`
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

function formatDateFull(dateStr: string): string {
  return new Date(dateStr).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// ── Init ──────────────────────────────────────────────────────────────────
onMounted(() => {
  fetchList()
  fetchStats()
})
</script>

<style scoped>
.stat-card {
  background: #111;
  border: 0.5px solid rgba(255,255,255,.07);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
}
.stat-num {
  font-size: 28px;
  font-weight: 900;
  font-family: 'Bebas Neue', sans-serif;
  line-height: 1;
  color: #fff;
  margin-bottom: 4px;
}
.stat-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: .06em; }

.filter-input, .filter-select {
  padding: 8px 12px;
  font-size: 13px;
  border: 0.5px solid rgba(255,255,255,.1);
  border-radius: 10px;
  background: #111;
  color: #e5e7eb;
  outline: none;
  font-family: inherit;
  transition: border-color .15s;
}
.filter-input:focus, .filter-select:focus { border-color: rgba(52,211,153,.4); }
.filter-input::placeholder { color: #374151; }
.filter-select option { background: #111; }

.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.coverage-enter-active, .coverage-leave-active { transition: opacity .2s, transform .2s; }
.coverage-enter-from, .coverage-leave-to { opacity: 0; transform: translateY(-6px); }
</style>