// composables/useBarbershopCounts.ts

interface CountParams {
    uf?: string
    city?: string
    neighborhood?: string
  }
  
  export function useBarbershopCounts(params: CountParams = {}) {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase as string
    const apiKey = config.public.apiKey as string
  
    const count = ref<number>(0)
    const pending = ref(false)
    const error = ref<string | null>(null)
  
    async function fetch(newParams?: CountParams) {
      const p = newParams ?? params
      pending.value = true
      error.value = null
  
      try {
        const query: Record<string, string> = {}
        if (p.uf) query.uf = p.uf
        if (p.city) query.city = p.city
        if (p.neighborhood) query.neighborhood = p.neighborhood
  
        const res = await $fetch<{ count: number }>(`${baseUrl}/barbershops/stats/counts`, {
          params: query,
          headers: apiKey ? { 'x-api-key': apiKey } : {},
        })
  
        count.value = res.count
      } catch (err: any) {
        error.value = err?.data?.error ?? err?.message ?? 'Erro ao buscar contadores'
        count.value = 0
      } finally {
        pending.value = false
      }
    }
  
    return { count, pending, error, fetch }
  }