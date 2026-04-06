// server/api/barbershops.ts
import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, unknown>({
  max: 2000,
  ttl: 1000 * 60 * 30, // 30 min
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const key = JSON.stringify(query)

  const hit = cache.get(key)
  if (hit) return hit

  const config = useRuntimeConfig(event)
  const apiBase = config.public.apiBase as string
  const apiKey  = config.public.apiKey  as string

  const data = await $fetch(`${apiBase}/barbershops`, {
    params: query,
    headers: apiKey ? { 'x-api-key': apiKey } : {},
  }).catch(() => ({ data: [], meta: { total: 0, page: 1, limit: 20, pages: 0 }, suggestions: { nearbyNeighborhoods: [], relatedServices: [] } }))

  cache.set(key, data)
  return data
})