export default defineEventHandler(async (event) => {
  const query   = getQuery(event)
  const key     = `barbershops-${JSON.stringify(query)}`
  const storage = useStorage('cache')
  const hit     = await storage.getItem(key)
  if (hit) return hit

  const config        = useRuntimeConfig(event)
  const apiBase       = config.public.apiBase as string
  const apiKey        = config.public.apiKey  as string
  const sitemapToken  = config.sitemapInternalToken as string  // ← adiciona

  const data = await $fetch(`${apiBase}/barbershops`, {
    params: query,
    headers: {
      ...(apiKey       ? { 'x-api-key':        apiKey       } : {}),
      ...(sitemapToken ? { 'x-internal-token': sitemapToken } : {}),  // ← adiciona
    },
  }).catch(() => ({
    data:        [],
    meta:        { total: 0, page: 1, limit: 20, pages: 0 },
    suggestions: { nearbyNeighborhoods: [], relatedServices: [] },
  }))

  await storage.setItem(key, data, { ttl: 60 * 30 })
  return data
})