import { allCities } from '~/data/locations'

export interface UFData {
  uf: string
  ufSlug: string
  count?: number
}

export async function fetchAvailableUFs(event?: any): Promise<UFData[]> {
  const config = useRuntimeConfig(event)

  const hardcodedUFs = new Map<string, UFData>(
    [...new Set(allCities.map(c => c.ufSlug))].map(slug => [
      slug,
      { uf: slug.toUpperCase(), ufSlug: slug },
    ])
  )

  try {
    const res = await $fetch<{ data: UFData[] }>(
      `${config.public.apiBase}/geoLocations/available-ufs`,
      {
        headers: config.public.apiKey ? { 'x-api-key': config.public.apiKey } : {},
        timeout: 5000,
      }
    )
    if (Array.isArray(res?.data)) {
      for (const uf of res.data) {
        hardcodedUFs.set(uf.ufSlug, {
          uf:     uf.uf ?? uf.ufSlug.toUpperCase(),
          ufSlug: uf.ufSlug,
          count:  uf.count,
        })
      }
    }
  } catch (err: any) {
    console.warn('[fetchAvailableUFs] Fallback hardcoded:', err?.message ?? err)
  }

  return [...hardcodedUFs.values()].sort((a, b) =>
    a.ufSlug < b.ufSlug ? -1 : 1
  )
}