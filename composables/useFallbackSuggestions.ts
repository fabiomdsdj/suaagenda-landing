// composables/useFallbackSuggestions.ts
//
// Resolve sugestões de barbearias próximas mesmo quando o bairro ou cidade
// NÃO estão mapeados no locations.ts.
//
// ⚠️  NÃO usa useBarbershopsUnified — o unified compartilha uma instância de
//     api e sofre race condition em chamadas sequenciais dentro do useAsyncData.
//     Aqui cada tentativa usa fetchIsolated(), que cria sua própria instância
//     de useBarbershopApi para que os resultados não se sobrescrevam.
//
// Hierarquia de tentativas:
//   1. bairro + cidade (exato)           → level = 'neighborhood'
//   2. cidade sem bairro                 → level = 'city'
//   3. só UF                             → level = 'uf'
//   4. sem resultado em nenhum nível     → level = 'empty'

import { useBarbershopApi }    from '~/composables/useBarbershopApi'
import { useDataSource }       from '~/composables/useDataSource'
import { useBarbershopSearch } from '~/composables/useBarbershops'
import { allCities }           from '~/data/locations'
import type { Barbershop }     from '~/data/barbershops'
import type { SearchResult }   from '~/composables/useBarbershops'

export type FallbackLevel = 'neighborhood' | 'city' | 'uf' | 'empty'

interface FallbackData {
  level: FallbackLevel
  data:  Barbershop[]
  suggestions: {
    nearbyNeighborhoods: Array<{ name: string; slug: string; count: number }>
    relatedServices:     Array<{ name: string; slug: string; count: number; emoji?: string }>
  }
}

// ── Busca isolada ────────────────────────────────────────────────────────────
// Cada chamada tem sua própria instância de api para evitar race condition.
// No modo mock usa useBarbershopSearch síncrono (sem instância compartilhada).
async function fetchIsolated(params: {
  uf?:          string
  city?:        string
  neighborhood?: string
  svc?:         string
  limit?:       number
  isApi:        boolean
}): Promise<SearchResult> {
  const { uf, city, neighborhood, svc, limit = 6, isApi } = params

  console.log('🔍 [fetchIsolated] INÍCIO', {
    uf,
    city,
    neighborhood,
    svc,
    limit,
    isApi,
    timestamp: new Date().toISOString()
  })

  if (!isApi) {
    console.log('📦 [fetchIsolated] Usando MOCK (useBarbershopSearch)')
    const result = useBarbershopSearch({ uf, city, neighborhood, svc, limit })
    console.log('✅ [fetchIsolated] MOCK retornou:', {
      dataLength: result.data.length,
      hasNeighborhoods: result.suggestions.nearbyNeighborhoods.length,
      hasServices: result.suggestions.relatedServices.length
    })
    return result
  }

  // API real: nova instância por chamada (sem estado compartilhado)
  console.log('🌐 [fetchIsolated] Usando API REAL (useBarbershopApi)')
  const api = useBarbershopApi()
  
  console.log('📡 [fetchIsolated] Chamando api.fetch...')
  await api.fetch({ uf, city, neighborhood, svc, limit })
  
  const result = api.result.value
  console.log('✅ [fetchIsolated] API retornou:', {
    dataLength: result.data.length,
    hasNeighborhoods: result.suggestions.nearbyNeighborhoods.length,
    hasServices: result.suggestions.relatedServices.length,
    firstShop: result.data[0] ? {
      id: result.data[0].id,
      name: result.data[0].name,
      neighborhood: result.data[0].neighborhood
    } : null
  })
  
  return result
}

// ── Composable público ───────────────────────────────────────────────────────
export function useFallbackSuggestions(opts: {
  ufSlug:            string
  citySlug:          string
  neighborhoodSlug?: string
  serviceSlug?:      string
  limit?:            number
}) {
  const { ufSlug, citySlug, neighborhoodSlug, serviceSlug, limit = 6 } = opts

  console.log('🚀 [useFallbackSuggestions] INÍCIO', {
    ufSlug,
    citySlug,
    neighborhoodSlug,
    serviceSlug,
    limit,
    timestamp: new Date().toISOString()
  })

  // ── Labels legíveis mesmo sem locations.ts ──────────────────────────────
  const cityData = allCities.find(
    c => c.ufSlug === ufSlug && c.citySlug === citySlug,
  )

  console.log('📍 [useFallbackSuggestions] cityData lookup:', {
    found: !!cityData,
    cityData: cityData ? {
      city: cityData.city,
      ufSlug: cityData.ufSlug,
      citySlug: cityData.citySlug,
      districtsCount: cityData.districts.length
    } : null
  })

  const cityLabel = cityData?.city
    ?? citySlug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')

  const districtLabel = (() => {
    if (!cityData || !neighborhoodSlug) return ''
    const prefix   = neighborhoodSlug.split('-').slice(0, 2).join('-')
    const district =
      cityData.districts.find(d =>
        d.neighborhoods.some(n => n.slug.startsWith(prefix)),
      ) ??
      [...cityData.districts].sort(
        (a, b) => b.neighborhoods.length - a.neighborhoods.length,
      )[0]
    return district?.name ?? ''
  })()

  console.log('🏷️ [useFallbackSuggestions] Labels:', {
    cityLabel,
    districtLabel
  })

  // ── isApi lido ANTES do useAsyncData (não pode chamar composable async) ─
  const { isApi } = useDataSource()
  const useRealApi = isApi.value

  console.log('⚙️ [useFallbackSuggestions] Data source:', {
    isApi: useRealApi,
    source: useRealApi ? 'API' : 'MOCK'
  })

  // ── Cache key única por rota ─────────────────────────────────────────────
  const cacheKey = [
    'fallback',
    ufSlug,
    citySlug,
    neighborhoodSlug ?? '_',
    serviceSlug      ?? '_',
  ].join(':')

  console.log('🔑 [useFallbackSuggestions] Cache key:', cacheKey)

  // ── useAsyncData: aguarda no SSR, hidrata no client sem refetch ──────────
  const { data, pending, error } = useAsyncData<FallbackData>(
    cacheKey,
    async () => {
      console.log('💾 [useAsyncData] INÍCIO da função async', {
        cacheKey,
        timestamp: new Date().toISOString()
      })

      const empty: FallbackData = {
        level: 'empty',
        data:  [],
        suggestions: { nearbyNeighborhoods: [], relatedServices: [] },
      }

      // Tentativa 1: bairro + cidade
      console.log('🎯 [useAsyncData] TENTATIVA 1: bairro + cidade')
      if (neighborhoodSlug && citySlug) {
        console.log('📍 [useAsyncData] Buscando com:', {
          uf: ufSlug,
          city: citySlug,
          neighborhood: neighborhoodSlug,
          svc: serviceSlug
        })

        const r = await fetchIsolated({
          uf: ufSlug, city: citySlug, neighborhood: neighborhoodSlug,
          svc: serviceSlug, limit, isApi: useRealApi,
        })

        console.log('📊 [useAsyncData] Resultado TENTATIVA 1:', {
          dataLength: r.data.length,
          hasResults: r.data.length > 0
        })

        if (r.data.length > 0) {
          console.log('✅ [useAsyncData] SUCESSO na TENTATIVA 1 (neighborhood)')
          const result = {
            level:       'neighborhood' as FallbackLevel,
            data:        r.data,
            suggestions: r.suggestions,
          }
          console.log('📦 [useAsyncData] Retornando resultado:', {
            level: result.level,
            dataCount: result.data.length,
            neighborhoodsCount: result.suggestions.nearbyNeighborhoods.length,
            servicesCount: result.suggestions.relatedServices.length
          })
          return result
        }
        console.log('❌ [useAsyncData] TENTATIVA 1 falhou (sem resultados)')
      } else {
        console.log('⏭️ [useAsyncData] TENTATIVA 1 pulada (faltam neighborhoodSlug ou citySlug)')
      }

      // Tentativa 2: cidade sem bairro
      console.log('🎯 [useAsyncData] TENTATIVA 2: cidade sem bairro')
      if (citySlug) {
        console.log('📍 [useAsyncData] Buscando com:', {
          uf: ufSlug,
          city: citySlug,
          svc: serviceSlug
        })

        const r = await fetchIsolated({
          uf: ufSlug, city: citySlug,
          svc: serviceSlug, limit, isApi: useRealApi,
        })

        console.log('📊 [useAsyncData] Resultado TENTATIVA 2:', {
          dataLength: r.data.length,
          hasResults: r.data.length > 0
        })

        if (r.data.length > 0) {
          console.log('✅ [useAsyncData] SUCESSO na TENTATIVA 2 (city)')
          const result = {
            level:       'city' as FallbackLevel,
            data:        r.data,
            suggestions: r.suggestions,
          }
          console.log('📦 [useAsyncData] Retornando resultado:', {
            level: result.level,
            dataCount: result.data.length
          })
          return result
        }
        console.log('❌ [useAsyncData] TENTATIVA 2 falhou (sem resultados)')
      } else {
        console.log('⏭️ [useAsyncData] TENTATIVA 2 pulada (falta citySlug)')
      }

      // Tentativa 3: só UF
      console.log('🎯 [useAsyncData] TENTATIVA 3: só UF')
      if (ufSlug) {
        console.log('📍 [useAsyncData] Buscando com:', {
          uf: ufSlug,
          svc: serviceSlug
        })

        const r = await fetchIsolated({
          uf: ufSlug,
          svc: serviceSlug, limit, isApi: useRealApi,
        })

        console.log('📊 [useAsyncData] Resultado TENTATIVA 3:', {
          dataLength: r.data.length,
          hasResults: r.data.length > 0
        })

        if (r.data.length > 0) {
          console.log('✅ [useAsyncData] SUCESSO na TENTATIVA 3 (uf)')
          const result = {
            level:       'uf' as FallbackLevel,
            data:        r.data,
            suggestions: r.suggestions,
          }
          console.log('📦 [useAsyncData] Retornando resultado:', {
            level: result.level,
            dataCount: result.data.length
          })
          return result
        }
        console.log('❌ [useAsyncData] TENTATIVA 3 falhou (sem resultados)')
      } else {
        console.log('⏭️ [useAsyncData] TENTATIVA 3 pulada (falta ufSlug)')
      }

      console.log('💀 [useAsyncData] TODAS as tentativas falhar am. Retornando empty.')
      return empty
    },
    {
      // default garante que .value nunca é null — sem guards no template
      default: (): FallbackData => {
        console.log('🔄 [useAsyncData] Usando valor default (empty)')
        return {
          level: 'empty',
          data:  [],
          suggestions: { nearbyNeighborhoods: [], relatedServices: [] },
        }
      },
    },
  )

  // ── Computed derivados ───────────────────────────────────────────────────
  const level               = computed<FallbackLevel>(() => {
    const val = data.value?.level ?? 'empty'
    console.log('🔢 [computed level]:', val)
    return val
  })

  const shops               = computed<Barbershop[]>(() => {
    const val = data.value?.data ?? []
    console.log('🏪 [computed shops]:', {
      length: val.length,
      firstShop: val[0] ? { id: val[0].id, name: val[0].name } : null
    })
    return val
  })

  const nearbyNeighborhoods = computed(() => {
    const val = data.value?.suggestions?.nearbyNeighborhoods ?? []
    console.log('🗺️ [computed nearbyNeighborhoods]:', { length: val.length })
    return val
  })

  const relatedServices = computed(() => {
    const val = data.value?.suggestions?.relatedServices ?? []
    console.log('🔧 [computed relatedServices]:', { length: val.length })
    return val
  })

  console.log('✨ [useFallbackSuggestions] Retornando composable')

  return {
    shops,
    cityLabel,
    districtLabel,
    nearbyNeighborhoods,
    relatedServices,
    pending,
    error,
    level,
  }
}