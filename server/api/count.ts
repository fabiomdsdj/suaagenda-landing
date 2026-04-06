// server/api/counts.ts
import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, number>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1h em memória
})

export default defineEventHandler(async (event) => {
  const { uf, city, neighborhood } = getQuery(event)

  const key = `${uf ?? ''}:${city ?? ''}:${neighborhood ?? ''}`
  const hit = cache.get(key)
  if (hit !== undefined) return hit

  const config = useRuntimeConfig(event)
  const apiBase = config.public.apiBase as string

  const count = await $fetch<number>(
    `${apiBase}/barbershops/stats/counts`,
    { params: { uf, city, neighborhood } }
  ).catch(() => 0)

  const val = typeof count === 'object' ? (count as any).count ?? 0 : count
  cache.set(key, val)
  return val
})