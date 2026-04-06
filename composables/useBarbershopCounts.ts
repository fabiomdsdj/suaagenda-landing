// composables/useBarbershopCounts.ts
interface CountParams {
  uf?: string
  city?: string
  neighborhood?: string
}

export function useBarbershopCounts(params: CountParams = {}) {
  const count   = ref<number>(0)
  const pending = ref(false)
  const error   = ref<string | null>(null)

  async function fetch(newParams?: CountParams) {
    const p = newParams ?? params
    pending.value = true
    error.value   = null

    try {
      const query: Record<string, string> = {}
      if (p.uf)           query.uf           = p.uf
      if (p.city)         query.city         = p.city
      if (p.neighborhood) query.neighborhood = p.neighborhood

      // Passa pelo proxy local → cache Redis em vez de bater direto na API
      const val = await $fetch<number>('/api/counts', { params: query })
      count.value = typeof val === 'number' ? val : (val as any)?.count ?? 0
    } catch (err: any) {
      error.value = err?.data?.error ?? err?.message ?? 'Erro ao buscar contadores'
      count.value = 0
    } finally {
      pending.value = false
    }
  }

  return { count, pending, error, fetch }
}