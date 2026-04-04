// server/api/sitemap.ts
//
// Source do nuxt-simple-sitemap — chamado em runtime pelo módulo.
// Combina rotas estáticas (locations.ts) + barbearias dinâmicas do banco via API.

import {
  getAllNeighborhoodRoutes,
  getAllServiceRoutes,
  getAllCityRoutes,
  getAllUFRoutes,
} from '~/data/locations'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiBase = config.public.apiBase as string
  const sitemapToken = config.sitemapInternalToken  

  // ── Rotas estáticas do locations.ts ──────────────────────────────────────
  const staticRoutes = [
    ...getAllUFRoutes(),
    ...getAllCityRoutes(),
    ...getAllNeighborhoodRoutes(),
    ...getAllServiceRoutes(),
  ]

  // ── Barbearias do banco (dinâmico) ────────────────────────────────────────
  // Pagina até buscar todas — limite de 500 por página pra não estourar memória
  const barbershopRoutes: string[] = []

  try {
    let page = 1
    const limit = 500
    const myIp = await $fetch('https://api64.ipify.org?format=json')
    console.log('[sitemap] IP do servidor Nuxt:', myIp)

    while (true) {
      const res = await $fetch<{
        data: Array<{
          slug:              string
          state:             string
          citySlug:          string
          neighborhoodSlug:  string
          status:            string
        }>
        meta: { pages: number; page: number }
      }>(`${apiBase}/barbershops`, {
        params: { page, limit, sort: 'relevance' },
        // Timeout razoável — não travar o build por API lenta
        timeout: 15_000,
        headers: {
          'x-internal-token': sitemapToken,
        },
      })

      for (const shop of res.data) {
        if (!shop.slug || !shop.state || !shop.citySlug || !shop.neighborhoodSlug) continue
        const uf = shop.state.toLowerCase()
        barbershopRoutes.push(
          `/barbearias/${uf}/${shop.citySlug}/${shop.neighborhoodSlug}/${shop.slug}`
        )
      }

      if (page >= res.meta.pages) break
      page++
    }

    console.log(`[sitemap] ${barbershopRoutes.length} barbearias incluídas`)
  } catch (err: any) {
    console.error('🚨 [sitemap] ERRO AO BUSCAR BARBEARIAS:', err?.message, err?.statusCode, err?.data)
    // Se a API estiver fora, retorna só as rotas estáticas — não quebra o build
    console.warn('[sitemap] Falha ao buscar barbearias do banco:', err?.message ?? err)
  }

  // Deduplica (caso haja overlap entre estático e dinâmico)
  const seen = new Set<string>()
  const all: string[] = []
  for (const route of [...staticRoutes, ...barbershopRoutes]) {
    if (!seen.has(route)) {
      seen.add(route)
      all.push(route)
    }
  }

  return all
})