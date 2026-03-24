// composables/useLocations.ts
import { allCities as hardcodedCities, type CityData } from '~/data/locations'

let _cache: CityData[] | null = null

export async function useLocations(): Promise<CityData[]> {
  const config = useRuntimeConfig()

  // Flag desligada → hardcode direto, sem fetch
  if (config.public.useLocationsApi !== 'true') {
    return hardcodedCities
  }

  // Cache em memória pro processo (SSR): evita refetch a cada request
  if (_cache) return _cache

  try {
    const data = await $fetch<CityData[]>(
      `${config.public.apiBase}/geoLocations/export`,
      {
        headers: { 'x-api-key': config.public.apiKey },
        timeout: 5000,
      }
    )

    // Valida minimamente que veio um array com ao menos 1 cidade
    if (Array.isArray(data) && data.length > 0) {
      _cache = data
      return _cache
    }

    console.warn('[useLocations] API retornou vazio — usando hardcode')
    return hardcodedCities

  } catch (err) {
    console.error('[useLocations] Falha na API — usando hardcode:', err)
    return hardcodedCities
  }
}