// server/api/barbershop/[...slug].ts
export default defineEventHandler(async (event) => {
  const raw = getRouterParams(event).slug
  const path = Array.isArray(raw) ? raw.join('/') : String(raw ?? '')

  const storage = useStorage('cache')
  const key = `barbershop:${path}`

  const hit = await storage.getItem(key)
  if (hit) return hit

  const config = useRuntimeConfig(event)
  const apiBase = config.public.apiBase as string
  const apiKey  = config.public.apiKey  as string

  const data = await $fetch(`${apiBase}/barbershops/${path}`, {
    headers: apiKey ? { 'x-api-key': apiKey } : {},
  }).catch(() => null)

  if (data) await storage.setItem(key, data, { ttl: 60 * 60 * 6 }) // 6h
  return data
})