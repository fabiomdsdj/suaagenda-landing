// composables/usePageSearch.ts
//
// Busca + filtros integrados nas páginas SEO de bairro, cidade e UF.
// Usa useBarbershopSearch (mock) ou useBarbershopApi (real) via useDataSource.
// A URL local da página vira query string no router sem mudar a rota.
//
// Uso:
//   const search = usePageSearch({ uf: 'sp', city: 'sao-paulo', neighborhood: 'vila-madalena' })
//   search.isActive    // true quando tem busca/filtro ativo
//   search.result      // SearchResult reativo
//   search.pending     // loading state

import { useDebounceFn } from '@vueuse/core'
import { useBarbershopSearch } from '~/composables/useBarbershops'
import { useBarbershopApi }    from '~/composables/useBarbershopApi'
import { useDataSource }       from '~/composables/useDataSource'
import type { SearchResult }   from '~/composables/useBarbershops'

interface PageContext {
  uf?:           string
  city?:         string
  neighborhood?: string
}

export function usePageSearch(ctx: PageContext = {}) {
  const route  = useRoute()
  const router = useRouter()
  const { isApi } = useDataSource()

  // ── Filtros locais ──────────────────────────────────────────────────────────
  const q      = ref((route.query.q      as string) || '')
  const svc    = ref((route.query.svc    as string) || '')
  const price  = ref((route.query.price  as string) || '')
  const rating = ref((route.query.rating as string) || '')
  const sort   = ref((route.query.sort   as string) || 'relevance')
  const page   = ref(Number(route.query.page) || 1)

  const isActive = computed(() =>
    !!q.value || !!svc.value || !!price.value || !!rating.value ||
    sort.value !== 'relevance' || page.value > 1
  )

  // ✅ FIX: ctx pode chegar antes do Nuxt resolver os params no SSR.
  // Garante que uf/city/neighborhood nunca sejam undefined/null na query —
  // o controller filtra só quando o campo está presente.
  const searchParams = computed(() => ({
    q:            q.value     || undefined,
    svc:          svc.value   || undefined,
    price:        price.value || undefined,
    rating:       rating.value || undefined,
    sort:         sort.value,
    // ✅ FIX: normaliza pra lowercase e sem espaço, evita mismatch de case com o banco
    uf:           ctx.uf?.toLowerCase().trim()           || undefined,
    city:         ctx.city?.toLowerCase().trim()         || undefined,
    neighborhood: ctx.neighborhood?.toLowerCase().trim() || undefined,
    page:         page.value,
    limit:        12,
  }))

  // ── API ───────────────────────────────────────────────────────────────────────
  const api = useBarbershopApi()

  // ✅ FIX: flush: 'sync' garante que o primeiro fetch dispara imediatamente
  // no setup, sem esperar o próximo tick — resolve o problema de SSR/hydration
  // onde o watch com immediate:true disparava antes da API estar pronta.
  watch(
    searchParams,
    (p) => { api.fetch(p) },
    { immediate: true, deep: true, flush: 'sync' },
  )

  // ── Fallback pro mock se API desligada (toggle dev) ────────────────────────
  const result = computed<SearchResult>(() => {
    if (isApi.value || api.data.value.length > 0) return api.result.value
    return useBarbershopSearch(searchParams.value)
  })

  const pending = computed(() => api.pending.value)
  const error   = computed(() => api.error.value)

  // ── URL sync ──────────────────────────────────────────────────────────────────
  function pushQuery(overrides: Record<string, any> = {}) {
    const current = {
      ...(q.value      ? { q: q.value }           : {}),
      ...(svc.value    ? { svc: svc.value }       : {}),
      ...(price.value  ? { price: price.value }   : {}),
      ...(rating.value ? { rating: rating.value } : {}),
      ...(sort.value !== 'relevance' ? { sort: sort.value } : {}),
      ...(page.value > 1 ? { page: String(page.value) } : {}),
    }
    const next = { ...current, ...overrides }
    Object.keys(next).forEach(k => { if (!next[k]) delete next[k] })
    router.replace({ query: next })
  }

  const debouncedPush = useDebounceFn(() => pushQuery(), 400)

  function setQ(val: string)      { q.value = val;     page.value = 1; debouncedPush() }
  function setSvc(val: string)    { svc.value   = svc.value === val   ? '' : val; page.value = 1; pushQuery() }
  function setPrice(val: string)  { price.value = price.value === val ? '' : val; page.value = 1; pushQuery() }
  function setRating(val: string) { rating.value = rating.value === val ? '' : val; page.value = 1; pushQuery() }
  function setSort(val: string)   { sort.value = val;  page.value = 1; pushQuery() }
  function setPage(val: number)   { page.value = val;  pushQuery() }
  function clearFilters() {
    q.value = ''; svc.value = ''; price.value = ''
    rating.value = ''; sort.value = 'relevance'; page.value = 1
    pushQuery()
  }

  // Sincroniza com URL quando navegar de volta
  watch(() => route.query, (rq) => {
    q.value      = (rq.q      as string) || ''
    svc.value    = (rq.svc    as string) || ''
    price.value  = (rq.price  as string) || ''
    rating.value = (rq.rating as string) || ''
    sort.value   = (rq.sort   as string) || 'relevance'
    page.value   = Number(rq.page) || 1
  })

  const hasActiveFilters = computed(() =>
    !!svc.value || !!price.value || !!rating.value || sort.value !== 'relevance'
  )

  return {
    q, svc, price, rating, sort, page,
    isActive, hasActiveFilters, pending, error,
    result,
    setQ, setSvc, setPrice, setRating, setSort, setPage, clearFilters,
  }
}