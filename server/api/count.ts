// server/api/counts.ts
export default defineEventHandler(async (event) => {
  const { uf, city, neighborhood } = getQuery(event)
  const key = `counts:${uf ?? ''}:${city ?? ''}:${neighborhood ?? ''}`

  const storage = useStorage('cache')

  const hit = await storage.getItem<number>(key)
  if (hit !== null && hit !== undefined) return hit

  const config = useRuntimeConfig(event)
  const apiBase = config.public.apiBase as string
  const apiKey  = config.public.apiKey  as string

  const res = await $fetch<{ count: number } | number>(
    `${apiBase}/barbershops/stats/counts`,
    {
      params: { uf, city, neighborhood },
      headers: apiKey ? { 'x-api-key': apiKey } : {},
    }
  ).catch(() => 0)

  const val = typeof res === 'object' && res !== null
    ? (res as any).count ?? 0
    : (res as number)

  await storage.setItem(key, val, { ttl: 60 * 60 }) // 1h
  return val
})