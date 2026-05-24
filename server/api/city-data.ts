export default defineEventHandler(async (event) => {
    const { uf, city } = getQuery(event)
    if (!uf || !city) return null
  
    const config = useRuntimeConfig(event)
  
    return await $fetch(
      `${config.public.apiBase}/geoLocations/export/${uf}/${city}`,
      { 
        headers: {
          ...(config.public.apiKey        ? { 'x-api-key':        config.public.apiKey        } : {}),
          ...(config.sitemapInternalToken  ? { 'x-internal-token': config.sitemapInternalToken  } : {}),
        },
      }
    ).catch(() => null)
  })