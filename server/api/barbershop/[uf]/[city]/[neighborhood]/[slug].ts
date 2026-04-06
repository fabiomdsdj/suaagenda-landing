// server/api/barbershop/[...slug].ts
import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, unknown>({
  max: 5000,
  ttl: 1000 * 60 * 60 * 6, // 6h — conteúdo muito estável
})

export default defineEventHandler(async (event) => {
  const slug = getRouterParams(event).slug as string[]
  const path = slug.join('/')
  
  const hit = cache.get(path)
  if (hit) return hit

  const config = useRuntimeConfig(event)
  const apiBase = config.public.apiBase as string
  const apiKey  = config.public.apiKey  as string

  const data = await $fetch(`${apiBase}/barbershops/${path}`, {
    headers: apiKey ? { 'x-api-key': apiKey } : {},
  }).catch(() => null)

  if (data) cache.set(path, data)
  return data
})