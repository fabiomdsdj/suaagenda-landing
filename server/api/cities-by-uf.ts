export default defineEventHandler(async (event) => {
  const query  = getQuery(event)
  const uf     = (query.uf as string)?.toLowerCase()
  const config = useRuntimeConfig(event)

  if (!uf) return { data: [] }

  console.log('[cities-by-uf] buscando uf:', uf)

  const data = await $fetch<{ data: any[] }>(
    `${config.public.apiBase}/geoLocations`,
    {
      query: { type: 'city', uf, limit: 500 },
      headers: {
        ...(config.public.apiKey        ? { 'x-api-key':        config.public.apiKey        } : {}),
        ...(config.sitemapInternalToken  ? { 'x-internal-token': config.sitemapInternalToken  } : {}),
      },
    }
  ).catch((err) => {
    console.error('[cities-by-uf] erro:', err?.message, err?.statusCode)
    return { data: [] }
  })

  console.log('[cities-by-uf] total retornado:', data?.data?.length)
  console.log('[cities-by-uf] primeiro item:', JSON.stringify(data?.data?.[0]))

  // Normaliza snake_case → camelCase
  const normalized = (data?.data ?? []).map((c: any) => ({
    city:     c.name,
    citySlug: c.slug,  // ← era c.citySlug que sempre vem null pra cities
    uf:       c.uf ?? uf.toUpperCase(),
    ufSlug:   c.ufSlug ?? c.uf_slug ?? uf,
  }))

  return { data: normalized }
})