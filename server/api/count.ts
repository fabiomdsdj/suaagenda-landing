export default defineEventHandler(async (event) => {
  const { uf, city, neighborhood } = getQuery(event)
  
  // chave com - em vez de : — funciona no filesystem em dev
  const key = `counts-${uf ?? ''}-${city ?? ''}-${neighborhood ?? ''}`
  const storage = useStorage('cache')
  
  const hit = await storage.getItem<number>(key)
  if (hit !== null && hit !== undefined) return hit

  const config  = useRuntimeConfig(event)
  const apiBase = config.public.apiBase as string
  const apiKey  = config.public.apiKey  as string

  const res = await $fetch<{ count: number } | number>(
    `${apiBase}/barbershops/stats/counts`,
    {
      params: { uf, city, neighborhood },
      headers: {
        ...(config.public.apiKey        ? { 'x-api-key':        config.public.apiKey        } : {}),
        ...(config.sitemapInternalToken  ? { 'x-internal-token': config.sitemapInternalToken  } : {}),
      },
    }
  ).catch(() => 0)

  const val = typeof res === 'object' && res !== null
    ? (res as any).count ?? 0
    : (res as number)

  await storage.setItem(key, val, { ttl: 60 * 60 })
  return val
})