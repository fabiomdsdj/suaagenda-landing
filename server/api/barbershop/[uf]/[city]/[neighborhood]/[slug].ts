export default defineEventHandler(async (event) => {
  const { uf, city, neighborhood, slug } = getRouterParams(event)
  const path = `${uf}/${city}/${neighborhood}/${slug}`
  
  console.log('🟢 Proxy Nuxt atingido:', { uf, city, neighborhood, slug, path })

  const storage = useStorage('cache')
  const key = `barbershop-${path}`
  const hit = await storage.getItem(key)
  if (hit) return hit

  const config = useRuntimeConfig(event)
  const apiBase = config.public.apiBase as string
  const apiKey  = config.public.apiKey  as string

  const data = await $fetch(`${apiBase}/barbershops/${path}`, {
    headers: apiKey ? { 'x-api-key': apiKey } : {},
  }).catch(() => null)

  if (data) await storage.setItem(key, data, { ttl: 60 * 60 * 6 })
  return data
})