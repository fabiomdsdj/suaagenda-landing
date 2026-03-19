// composables/useBarbershopsUnified.ts
//
// Drop-in replacement pro useBarbershopSearch original.
// Despacha automaticamente pra mock ou API real conforme useDataSource.
//
// Uso (substitui useBarbershopSearch onde já existia):
//   const { result, pending, error, fetch } = useBarbershopsUnified(params)

import { useBarbershopSearch }           from '~/composables/useBarbershops'
import { useBarbershopApi }              from '~/composables/useBarbershopApi'
import { useDataSource }                 from '~/composables/useDataSource'
import type { SearchParams, SearchResult } from '~/composables/useBarbershops'

export function useBarbershopsUnified(initialParams?: SearchParams) {
  const { isApi } = useDataSource()

  // ── Instâncias dos dois composables ────────────────────────────────────────
  const api = useBarbershopApi(initialParams)

  // Resultado mock como computed (síncrono, sem fetch)
  const mockParams  = ref<SearchParams>(initialParams ?? {})
  const mockResult  = computed<SearchResult>(() => useBarbershopSearch(mockParams.value))

  // ── API pública unificada ───────────────────────────────────────────────────
  const result = computed<SearchResult>(() =>
    isApi.value ? api.result.value : mockResult.value,
  )

  const pending = computed(() => isApi.value ? api.pending.value : false)
  const error   = computed(() => isApi.value ? api.error.value   : null)

  async function fetch(params?: SearchParams) {
    if (params) mockParams.value = params
    if (isApi.value) await api.fetch(params)
    // mock é reativo, não precisa de fetch explícito
  }

  return { result, pending, error, fetch }
}

// ── Busca individual — mock ou API ────────────────────────────────────────────
import { useBarbershopBySlug as mockBySlug } from '~/composables/useBarbershops'
import { fetchBarbershopBySlug as apiBySlug } from '~/composables/useBarbershopApi'
import type { Barbershop } from '~/data/barbershops'

export async function useBarbershopUnifiedBySlug(
  uf: string,
  city: string,
  neighborhood: string,
  slug: string,
): Promise<Barbershop | null> {
  const { isApi } = useDataSource()

  if (isApi.value) {
    return await apiBySlug(uf, city, neighborhood, slug)
  }
  return mockBySlug(uf, city, neighborhood, slug)
}