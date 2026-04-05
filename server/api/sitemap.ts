// server/api/sitemap.ts
//
// Source do nuxt-simple-sitemap — chamado em runtime pelo módulo.
// Combina rotas estáticas (locations.ts) + barbearias dinâmicas do banco via API.
//
// ✅ Cache Redis de 6h — evita bombardear o banco a cada regeneração
// ✅ Uma só chamada ao backend via /barbershops/sitemap/slugs (sem paginação)
// ✅ Rota dedicada no backend bypassa Redis e retorna só os campos necessários
// ✅ Fallback: se API cair, retorna só rotas estáticas sem quebrar

import {
  getAllNeighborhoodRoutes,
  getAllServiceRoutes,
  getAllCityRoutes,
  getAllUFRoutes,
} from '~/data/locations'

const CACHE_KEY     = 'sitemap:all-routes'
const CACHE_TTL_SEC = 60 * 60 * 6  // 6 horas

export default defineEventHandler(async (event) => {
  const config       = useRuntimeConfig(event)
  const apiBase      = config.public.apiBase as string
  const sitemapToken = config.sitemapInternalToken as string

  // ── 1. Tenta retornar do cache Redis ────────────────────────────────────────
  // useStorage('redis') usa o driver Redis configurado no nuxt.config nitro.storage
  // Se não tiver configurado, cai silenciosamente pro MISS e segue normal
  const storage = useStorage('redis')

  try {
    const cached = await storage.getItem<string[]>(CACHE_KEY)
    if (cached && Array.isArray(cached) && cached.length > 0) {
      console.log(`[sitemap] ✅ Cache HIT — ${cached.length} rotas`)
      return cached
    }
  } catch (err: any) {
    // Redis indisponível — segue sem cache, não quebra o sitemap
    console.warn('[sitemap] Redis indisponível, gerando sem cache:', err?.message)
  }

  // ── 2. Rotas estáticas do locations.ts ──────────────────────────────────────
  const staticRoutes = [
    ...getAllUFRoutes(),
    ...getAllCityRoutes(),
    ...getAllNeighborhoodRoutes(),
    ...getAllServiceRoutes(),
  ]

  // ── 3. Barbearias — UMA SÓ chamada à rota dedicada (sem loop, sem Redis) ────
  const barbershopRoutes: string[] = []

  try {
    if (!sitemapToken) {
      throw new Error('SITEMAP_INTERNAL_TOKEN não configurado')
    }

    // ✅ Rota dedicada: query direta no banco, sem paginação, sem Redis
    const res = await $fetch<{
      data: Array<{
        slug:             string
        state:            string
        citySlug:         string
        neighborhoodSlug: string
      }>
      total: number
    }>(`${apiBase}/barbershops/sitemap/slugs`, {
      timeout: 30_000,
      headers: { 'x-internal-token': sitemapToken },
    })

    for (const shop of res.data) {
      if (!shop.slug || !shop.state || !shop.citySlug || !shop.neighborhoodSlug) continue
      const uf = shop.state.toLowerCase()
      barbershopRoutes.push(
        `/barbearias/${uf}/${shop.citySlug}/${shop.neighborhoodSlug}/${shop.slug}`
      )
    }

    console.log(`[sitemap] ${barbershopRoutes.length} barbearias incluídas`)

  } catch (err: any) {
    // Se a API estiver fora, retorna só as rotas estáticas — não quebra o build
    console.error('🚨 [sitemap] Falha ao buscar barbearias:', err?.message ?? err)
  }

  // ── 4. Deduplica ─────────────────────────────────────────────────────────────
  const seen = new Set<string>()
  const all: string[] = []

  for (const route of [...staticRoutes, ...barbershopRoutes]) {
    if (!seen.has(route)) {
      seen.add(route)
      all.push(route)
    }
  }

  // ── 5. Salva no Redis por 6h ─────────────────────────────────────────────────
  // Próximas chamadas dentro de 6h retornam do cache sem tocar o banco
  try {
    await storage.setItem(CACHE_KEY, all, { ttl: CACHE_TTL_SEC })
    console.log(`[sitemap] ✅ Cache SET — ${all.length} rotas por 6h`)
  } catch (err: any) {
    console.warn('[sitemap] Falha ao salvar cache Redis:', err?.message)
  }

  return all
})