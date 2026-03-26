// composables/useLocations.ts
import { allCities as hardcodedCities, type CityData } from '~/data/locations'

let _cache: CityData[] | null = null

export async function fetchLocations(event?: Parameters<typeof useRuntimeConfig>[0]): Promise<CityData[]> {
  console.log('🌍 [fetchLocations] INÍCIO', {
    hasEvent: !!event,
    cacheStatus: _cache ? 'CACHED' : 'EMPTY',
    timestamp: new Date().toISOString()
  })

  const config = useRuntimeConfig(event)
  
  console.log('⚙️ [fetchLocations] Config:', {
    useLocationsApi: config.public.useLocationsApi,
    apiBase: config.public.apiBase,
    hasApiKey: !!config.public.apiKey
  })

  // Se não estiver usando API, retorna hardcoded
  if (config.public.useLocationsApi !== 'true') {
    console.log('📦 [fetchLocations] Usando HARDCODED cities (useLocationsApi !== "true")')
    console.log('📊 [fetchLocations] Retornando hardcodedCities:', {
      count: hardcodedCities.length,
      firstCity: hardcodedCities[0]?.city,
      firstCitySlug: hardcodedCities[0]?.citySlug
    })
    return hardcodedCities
  }

  // Se já tem cache, retorna
  if (_cache) {
    console.log('✅ [fetchLocations] Retornando do CACHE')
    console.log('📊 [fetchLocations] Cache content:', {
      count: _cache.length,
      firstCity: _cache[0]?.city
    })
    return _cache
  }

  // Tenta buscar da API
  console.log('🌐 [fetchLocations] Tentando buscar da API...')
  
  try {
    const url = `${config.public.apiBase}/geoLocations/export`
    console.log('📡 [fetchLocations] URL:', url)
    
    const data = await $fetch<CityData[]>(url, {
      headers: { 'x-api-key': config.public.apiKey },
      timeout: 5000
    })

    console.log('✅ [fetchLocations] API respondeu:', {
      isArray: Array.isArray(data),
      length: Array.isArray(data) ? data.length : 0,
      firstItem: Array.isArray(data) && data.length > 0 ? {
        city: data[0].city,
        citySlug: data[0].citySlug,
        ufSlug: data[0].ufSlug,
        districtsCount: data[0].districts?.length
      } : null
    })

    if (Array.isArray(data) && data.length > 0) {
      console.log('💾 [fetchLocations] Salvando no cache')
      _cache = data
      console.log('📊 [fetchLocations] Cache salvo:', {
        count: _cache.length
      })
      return _cache
    }

    console.warn('⚠️ [fetchLocations] API retornou dados inválidos (não é array ou está vazio)')
    
  } catch (err) {
    console.error('❌ [fetchLocations] ERRO ao buscar da API:', {
      error: err,
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined
    })
  }

  console.log('📦 [fetchLocations] Fallback para HARDCODED cities')
  console.log('📊 [fetchLocations] Retornando hardcodedCities (fallback):', {
    count: hardcodedCities.length
  })
  
  return hardcodedCities
}