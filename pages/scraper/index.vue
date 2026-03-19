<!-- pages/scraper/index.vue -->
<template>
    <div class="min-h-screen bg-[#0a0a0a] px-4 pb-20" style="padding-top: calc(68px + 2rem); font-family: 'DM Sans', sans-serif">
      <div class="max-w-6xl mx-auto">
  
        <!-- ── Header ──────────────────────────────────────────────── -->
        <div class="flex items-start justify-between mb-8">
          <div>
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
  
        <!-- ── Filtros ─────────────────────────────────────────────── -->
        <div class="flex flex-wrap items-center gap-3 mb-6">
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
  
          <select v-model="filters.city" class="filter-select" @change="fetchList">
            <option value="">Todas as cidades</option>
            <option v-for="c in cityOptions" :key="c" :value="c">{{ c }}</option>
          </select>
  
          <button
            v-if="hasFilters"
            class="text-xs text-gray-500 hover:text-red-400 transition-colors underline"
            @click="clearFilters"
          >Limpar</button>
  
          <p class="ml-auto text-xs text-gray-600">
            <span class="text-gray-400 font-medium">{{ meta.total }}</span> registro{{ meta.total !== 1 ? 's' : '' }}
          </p>
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
          <template v-else-if="rows.length">
            <div
              v-for="shop in rows"
              :key="shop.id"
              class="flex items-center gap-4 px-5 py-4 border-b border-white/[.04] last:border-0 hover:bg-white/[.02] transition-colors group"
            >
              <!-- ✅ FIX: thumb usa photos[0] como capa, coverImageUrl como fallback -->
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
                <p class="text-xs text-gray-500 mt-0.5 truncate">
                  {{ [shop.neighborhood, shop.city, shop.state].filter(Boolean).join(', ') }}
                  <span v-if="shop.googleRating" class="ml-2 text-yellow-400">★ {{ Number(shop.googleRating).toFixed(1) }}</span>
                  <span v-if="shop.services?.length" class="ml-2 text-gray-600">{{ shop.services.length }} serviços</span>
                </p>
              </div>
  
              <!-- Plano -->
              <span
                class="hidden sm:inline-flex px-2 py-1 rounded text-[10px] font-bold border flex-shrink-0"
                :class="{
                  'bg-white/[.04] text-gray-500 border-white/[.08]':      shop.plan === 'free',
                  'bg-blue-400/10 text-blue-400 border-blue-400/20':      shop.plan === 'basic',
                  'bg-green-400/10 text-green-400 border-green-400/20':   shop.plan === 'pro',
                  'bg-purple-400/10 text-purple-400 border-purple-400/20': shop.plan === 'enterprise',
                }"
              >{{ shop.plan }}</span>
  
              <!-- Ações -->
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
            <p class="text-gray-500 text-sm">Nenhuma barbearia encontrada</p>
            <NuxtLink to="/scraper/new" class="inline-block mt-4 text-green-400 text-sm hover:underline">
              Cadastrar primeira barbearia →
            </NuxtLink>
          </div>
        </div>
  
        <!-- ── Paginação ────────────────────────────────────────────── -->
        <div v-if="meta.pages > 1" class="flex items-center justify-center gap-2 mt-6">
          <button
            v-for="p in meta.pages"
            :key="p"
            class="w-9 h-9 rounded-xl text-sm font-medium transition-all"
            :class="meta.page === p
              ? 'bg-green-400 text-black'
              : 'bg-[#181818] border border-white/[.06] text-gray-500 hover:border-green-400/30 hover:text-white'"
            @click="goPage(p)"
          >{{ p }}</button>
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
  
  definePageMeta({ layout: 'barber' })
  
  const isDev = import.meta.dev
  const api   = useScrapingApi()
  
  // ── Estado ────────────────────────────────────────────────────────────────
  const loading = ref(true)
  const rows    = ref<any[]>([])
  const stats   = ref<any>(null)
  const meta    = ref({ total: 0, page: 1, pages: 1, limit: 20 })
  
  const filters = reactive({
    q:       '',
    status:  '',
    claimed: '',
    city:    '',
    page:    1,
  })
  
  const cityOptions = ref<string[]>([])
  
  const hasFilters = computed(() =>
    !!filters.q || !!filters.status || !!filters.claimed || !!filters.city
  )
  
  // ✅ FIX: thumbnail usa photos[0] (capa da tabela) → coverImageUrl (legado) → null
  function getThumb(shop: any): string | null {
    // A listagem não inclui photos[] por performance — só coverImageUrl
    // Se futuramente incluir, pega photos[0] primeiro
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
      if (filters.q)              params.q         = filters.q
      if (filters.status)         params.status    = filters.status
      if (filters.claimed !== '') params.isClaimed = filters.claimed
      if (filters.city)           params.city      = filters.city
  
      const res = await api.listBarbershops(params)
      rows.value = res.data ?? []
      meta.value = res.meta ?? meta.value
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }
  
  const debouncedFetch = useDebounceFn(() => { filters.page = 1; fetchList() }, 400)
  
  function goPage(p: number) { filters.page = p; fetchList() }
  
  function clearFilters() {
    filters.q = ''; filters.status = ''; filters.claimed = ''; filters.city = ''; filters.page = 1
    fetchList()
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
  </style>