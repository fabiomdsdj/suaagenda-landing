// server/api/sitemap/barbershops.ts
//
// Retorna só as rotas de barbearias buscadas do banco via API dedicada.
// Cache Redis de 6h via useStorage('cache') — mesmo driver configurado em nitro.storage.
// ETag + Cache-Control para evitar retransmissão desnecessária.
// Fallback: se API cair, retorna array vazio sem quebrar o sitemap.

import { createHash } from 'node:crypto'

const CACHE_KEY     = 'sitemap:barbershops'
const CACHE_TTL_SEC = 60 * 60 * 6  // 6h

interface BarbershopSlug {
  slug:             string
  state:            string
  citySlug:         string
  neighborhoodSlug: string
}

interface BarbershopSlugsResponse {
  data:  BarbershopSlug[]
  total: number
}

export default defineEventHandler(async (event) => {
  const config       = useRuntimeConfig(event)
  const apiBase      = config.public.apiBase as string
  const sitemapToken = config.sitemapInternalToken as string
  const storage      = useStorage('cache')

  // ── 1. Tenta cache Redis ─────────────────────────────────────────────────────
  try {
    const cached = await storage.getItem<string[]>(CACHE_KEY)

    if (cached && Array.isArray(cached) && cached.length > 0) {
      console.log(`[sitemap/barbershops] ✅ Cache HIT — ${cached.length} rotas`)

      const etag = buildEtag(cached)
      setResponseHeaders(event, {
        'ETag':          etag,
        'Cache-Control': 'public, max-age=21600',
      })

      if (getHeader(event, 'if-none-match') === etag) {
        setResponseStatus(event, 304)
        return null
      }

      return cached
    }
  } catch (err: any) {
    console.warn('[sitemap/barbershops] Redis indisponível, gerando sem cache:', err?.message)
  }

  // ── 2. Busca no backend ──────────────────────────────────────────────────────
  const routes: string[] = []

  try {
    if (!sitemapToken) {
      throw new Error('SITEMAP_INTERNAL_TOKEN não configurado')
    }

    const res = await $fetch<BarbershopSlugsResponse>(
      `${apiBase}/barbershops/sitemap/slugs`,
      {
        timeout: 30_000,
        headers: { 'x-internal-token': sitemapToken },
      }
    )

    for (const shop of res.data) {
      if (!shop.slug || !shop.state || !shop.citySlug || !shop.neighborhoodSlug) continue

      const uf = shop.state.toLowerCase()
      routes.push(`/barbearias/${uf}/${shop.citySlug}/${shop.neighborhoodSlug}/${shop.slug}`)
    }

    console.log(`[sitemap/barbershops] ${routes.length} barbearias incluídas`)

  } catch (err: any) {
    // API fora do ar — retorna vazio, não quebra o sitemap_index
    console.error('[sitemap/barbershops] 🚨 Falha ao buscar barbearias:', err?.message ?? err)
    return []
  }

  // ── 3. Salva no Redis por 6h ─────────────────────────────────────────────────
  try {
    await storage.setItem(CACHE_KEY, routes, { ttl: CACHE_TTL_SEC })
    console.log(`[sitemap/barbershops] ✅ Cache SET — ${routes.length} rotas por 6h`)
  } catch (err: any) {
    console.warn('[sitemap/barbershops] Falha ao salvar cache Redis:', err?.message)
  }

  // ── 4. ETag + Cache-Control ──────────────────────────────────────────────────
  const etag = buildEtag(routes)
  setResponseHeaders(event, {
    'ETag':          etag,
    'Cache-Control': 'public, max-age=21600',
  })

  return routes
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildEtag(routes: string[]): string {
  const hash = createHash('md5')
    .update(routes.length + ':' + (routes[0] ?? '') + ':' + (routes[routes.length - 1] ?? ''))
    .digest('hex')
    .slice(0, 12)
  return `"sitemap-barbershops-${hash}"`
}