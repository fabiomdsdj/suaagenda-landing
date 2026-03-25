// composables/useLocations.ts
import { allCities as hardcodedCities, type CityData } from '~/data/locations'

let _cache: CityData[] | null = null

export async function fetchLocations(event?: Parameters<typeof useRuntimeConfig>[0]): Promise<CityData[]> {
  const config = useRuntimeConfig(event) // passa o event quando disponível
  
  if (config.public.useLocationsApi !== 'true') return hardcodedCities
  if (_cache) return _cache

  try {
    const data = await $fetch<CityData[]>(
      `${config.public.apiBase}/geoLocations/export`,
      { headers: { 'x-api-key': config.public.apiKey }, timeout: 5000 }
    )
    if (Array.isArray(data) && data.length > 0) {
      _cache = data
      return _cache
    }
  } catch (err) {
    console.error('[fetchLocations] Falha:', err)
  }
  return hardcodedCities
}