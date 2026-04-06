// server/api/sitemap.ts
//
// Source do nuxt-simple-sitemap — chamado em runtime pelo módulo.
// Combina rotas estáticas (locations.ts) + barbearias dinâmicas do banco via API.
//
// ✅ Cache Redis de 6h via useStorage('cache') — agora conectado ao Upstash via nitro.storage
// ✅ ETag baseado em hash do conteúdo — evita retornar o array quando nada mudou
// ✅ Cache-Control header — permite que proxies e o CDN cacheiem a resposta
// ✅ Uma só chamada ao backend via /barbershops/sitemap/slugs (sem paginação)
// ✅ Fallback: se API cair, retorna só rotas estáticas sem quebrar

import { createHash } from 'node:crypto'
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
  // useStorage('cache') agora usa o driver Redis configurado em nitro.storage
  // (antes usava memória Nitro — cache perdido a cada restart/deploy)
  const storage = useStorage('cache')

  try {
    const cached = await storage.getItem<string[]>(CACHE_KEY)
    if (cached && Array.isArray(cached) && cached.length > 0) {
      console.log(`[sitemap] ✅ Cache HIT — ${cached.length} rotas`)

      // ✅ FIX: ETag baseado no conteúdo — evita retransmissão desnecessária
      const etag = buildEtag(cached)
      setResponseHeaders(event, {
        'ETag': etag,
        'Cache-Control': 'public, max-age=21600',
      })

      const ifNoneMatch = getHeader(event, 'if-none-match')
      if (ifNoneMatch === etag) {
        setResponseStatus(event, 304)
        return null
      }

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

    // Rota dedicada: query direta no banco, sem paginação, só campos necessários
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
  try {
    await storage.setItem(CACHE_KEY, all, { ttl: CACHE_TTL_SEC })
    console.log(`[sitemap] ✅ Cache SET — ${all.length} rotas por 6h`)
  } catch (err: any) {
    console.warn('[sitemap] Falha ao salvar cache Redis:', err?.message)
  }

  // ── 6. ETag + Cache-Control na resposta ──────────────────────────────────────
  const etag = buildEtag(all)
  setResponseHeaders(event, {
    'ETag': etag,
    'Cache-Control': 'public, max-age=21600',
  })

  return all
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildEtag(routes: string[]): string {
  const hash = createHash('md5')
    .update(routes.length + ':' + routes[0] + ':' + routes[routes.length - 1])
    .digest('hex')
    .slice(0, 12)
  return `"sitemap-${hash}"`
}