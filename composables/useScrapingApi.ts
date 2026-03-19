// composables/useScrapingApi.ts
// CRUD completo para o painel admin de barbearias
// Usa a rota /scraping/barbershops com autenticação por token interno

export function useScrapingApi() {
    const { public: { apiBase, scrapingToken } } = useRuntimeConfig()
  
    const headers: Record<string, string> = {
      'x-scraping-token': scrapingToken as string,
    }
  
    // ─── GET /scraping/barbershops ──────────────────────────────────────────
    async function listBarbershops(params: Record<string, any> = {}) {
      return $fetch<{
        data: any[]
        meta: { total: number; page: number; pages: number; limit: number }
      }>(`${apiBase}/scraping/barbershops`, { headers, params })
    }
  
    // ─── GET /scraping/barbershops/stats ───────────────────────────────────
    async function getStats() {
      return $fetch<{
        total: number
        imported: number
        manual: number
        claimed: number
        unclaimed: number
        byCity: Array<{ citySlug: string; count: number }>
      }>(`${apiBase}/scraping/barbershops/stats`, { headers })
    }
  
    // ─── GET /scraping/barbershops/:id ─────────────────────────────────────
    async function getBarbershopById(id: string) {
      return $fetch<any>(`${apiBase}/scraping/barbershops/${id}`, { headers })
    }
  
    // ─── POST /scraping/barbershops ────────────────────────────────────────
    async function createBarbershop(payload: any) {
      return $fetch<{ created: boolean; id: string; slug: string; servicesCreated: number; photosCreated: number }>(
        `${apiBase}/scraping/barbershops`,
        { method: 'POST', headers, body: payload },
      )
    }
  
    // ─── PATCH /scraping/barbershops/:id ───────────────────────────────────
    async function updateBarbershop(id: string, payload: any) {
      return $fetch<{ updated: boolean; id: string }>(
        `${apiBase}/scraping/barbershops/${id}`,
        { method: 'PATCH', headers, body: payload },
      )
    }
  
    // ─── DELETE /scraping/barbershops/:id ──────────────────────────────────
    async function deleteBarbershop(id: string) {
      return $fetch<{ deleted: boolean; id: string }>(
        `${apiBase}/scraping/barbershops/${id}`,
        { method: 'DELETE', headers },
      )
    }
  
    return {
      listBarbershops,
      getStats,
      getBarbershopById,
      createBarbershop,
      updateBarbershop,
      deleteBarbershop,
    }
  }