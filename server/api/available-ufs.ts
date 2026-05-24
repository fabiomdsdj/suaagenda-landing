export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  console.log('[available-ufs] token:', JSON.stringify(config.sitemapInternalToken)) // ← aqui
  const data = await $fetch<{ data: { uf: string; ufSlug: string; count: number }[] }>(
    `${config.public.apiBase}/geoLocations/available-ufs`,
    {
      headers: {
        ...(config.public.apiKey        ? { 'x-api-key':        config.public.apiKey        } : {}),
        ...(config.sitemapInternalToken  ? { 'x-internal-token': config.sitemapInternalToken  } : {}),
      },
    }
  ).catch((err) => {
    console.error('[api/available-ufs] erro:', err?.message, '| status:', err?.statusCode)
    return { data: [] }
  })

  console.log('[api/available-ufs] retornou:', JSON.stringify(data).slice(0, 300))

  return data
})