// composables/useGeoIp.ts
//
// Detecta cidade/estado do usuário via IP usando ip-api.com (grátis, sem key).
// Retorna slugs prontos pra usar nas rotas do portal.
//
// Só executa no client (window) — no SSR retorna null silenciosamente.
// Tem dedup interno: se já detectou, retorna o cache sem nova request.
//
// Uso:
//   const geo = useGeoIp()
//   await geo.detect()
//   geo.citySlug.value  // → 'sao-paulo'
//   geo.ufSlug.value    // → 'sp'
//   geo.result.value    // → { city, citySlug, uf, ufSlug, region, lat, lon }

export interface GeoIpResult {
    city:     string
    citySlug: string
    uf:       string   // sigla ex: 'SP'
    ufSlug:   string   // lowercase ex: 'sp'
    region:   string   // nome do estado ex: 'São Paulo'
    country:  string   // código ex: 'BR'
    lat:      number
    lon:      number
  }
  
  function slugify(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
  
  // ip-api retorna o nome do estado por extenso — mapeamos pra sigla
  const STATE_SLUGS: Record<string, string> = {
    'Acre':                 'ac',
    'Alagoas':              'al',
    'Amapá':                'ap',
    'Amazonas':             'am',
    'Bahia':                'ba',
    'Ceará':                'ce',
    'Distrito Federal':     'df',
    'Espírito Santo':       'es',
    'Goiás':                'go',
    'Maranhão':             'ma',
    'Mato Grosso':          'mt',
    'Mato Grosso do Sul':   'ms',
    'Minas Gerais':         'mg',
    'Pará':                 'pa',
    'Paraíba':              'pb',
    'Paraná':               'pr',
    'Pernambuco':           'pe',
    'Piauí':                'pi',
    'Rio de Janeiro':       'rj',
    'Rio Grande do Norte':  'rn',
    'Rio Grande do Sul':    'rs',
    'Rondônia':             'ro',
    'Roraima':              'rr',
    'Santa Catarina':       'sc',
    'São Paulo':            'sp',
    'Sergipe':              'se',
    'Tocantins':            'to',
  }
  
  export function useGeoIp() {
    const result   = ref<GeoIpResult | null>(null)
    const pending  = ref(false)
    const error    = ref<string | null>(null)
    const detected = ref(false)
  
    // Shortcuts prontos pra usar no template/router
    const citySlug = computed(() => result.value?.citySlug ?? '')
    const ufSlug   = computed(() => result.value?.ufSlug   ?? '')
  
    async function detect(): Promise<GeoIpResult | null> {
      // Dedup: já detectou, retorna cache
      if (detected.value) return result.value
  
      // Só roda no client — IP do servidor não tem valor pra localizar o usuário
      if (!import.meta.client) return null
  
      pending.value = true
      error.value   = null
  
      try {
        // ip-api.com: free tier, sem CORS em HTTPS com o param fields
        const raw = await $fetch<{
          status:     string
          city:       string
          regionName: string  // nome por extenso ex: 'São Paulo'
          region:     string  // sigla do estado ex: 'SP'
          countryCode:string
          lat:        number
          lon:        number
        }>('https://ip-api.com/json/?fields=status,city,regionName,region,countryCode,lat,lon&lang=pt-BR')
  
        if (raw.status !== 'success') {
          throw new Error(`GeoIP retornou status: ${raw.status}`)
        }
  
        // Preferência: lookup pelo nome (mais confiável pra acentuação)
        // Fallback: sigla retornada pela API em lowercase
        const uf = STATE_SLUGS[raw.regionName] ?? raw.region.toLowerCase()
  
        result.value = {
          city:     raw.city,
          citySlug: slugify(raw.city),
          uf:       raw.region,
          ufSlug:   uf,
          region:   raw.regionName,
          country:  raw.countryCode,
          lat:      raw.lat,
          lon:      raw.lon,
        }
  
        detected.value = true
        return result.value
      } catch (e: any) {
        error.value = e?.message ?? 'Erro ao detectar localização'
        return null
      } finally {
        pending.value = false
      }
    }
  
    return {
      result,
      citySlug,
      ufSlug,
      pending,
      error,
      detected,
      detect,
    }
  }