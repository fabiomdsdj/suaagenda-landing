// composables/useGeocoding.ts
//
// Geocoding via Nominatim (OpenStreetMap) — sem custo, sem chave.
// - searchAddress: autocomplete de endereço → retorna candidatos
// - reverseGeocode: lat/lng → endereço
// - geocodeExact: endereço completo → primeiro resultado
//
// Rate limit Nominatim: 1 req/s — o debounce de 400ms já cobre.

export interface NominatimResult {
  place_id:     number
  display_name: string
  lat:          string
  lon:          string
  address: {
    road?:           string
    house_number?:   string
    suburb?:         string
    neighbourhood?:  string
    city?:           string
    town?:           string
    village?:        string
    state?:          string
    state_code?:     string
    postcode?:       string
    country_code?:   string
  }
  boundingbox: string[]
}

export interface GeoSuggestion {
  displayName: string
  lat:         number
  lon:         number
  // campos já parseados prontos pro form
  street:      string
  number:      string
  neighborhood:string
  city:        string
  state:       string
  zipCode:     string
  country:     string
}

const NOMINATIM = 'https://nominatim.openstreetmap.org'

const BR_STATE_MAP: Record<string, string> = {
  'AC': 'AC', 'AL': 'AL', 'AP': 'AP', 'AM': 'AM', 'BA': 'BA',
  'CE': 'CE', 'DF': 'DF', 'ES': 'ES', 'GO': 'GO', 'MA': 'MA',
  'MT': 'MT', 'MS': 'MS', 'MG': 'MG', 'PA': 'PA', 'PB': 'PB',
  'PR': 'PR', 'PE': 'PE', 'PI': 'PI', 'RJ': 'RJ', 'RN': 'RN',
  'RS': 'RS', 'RO': 'RO', 'RR': 'RR', 'SC': 'SC', 'SP': 'SP',
  'SE': 'SE', 'TO': 'TO',
  'acre': 'AC',
  'alagoas': 'AL',
  'amapá': 'AP', 'amapa': 'AP',
  'amazonas': 'AM',
  'bahia': 'BA',
  'ceará': 'CE', 'ceara': 'CE',
  'distrito federal': 'DF',
  'espírito santo': 'ES', 'espirito santo': 'ES',
  'goiás': 'GO', 'goias': 'GO',
  'maranhão': 'MA', 'maranhao': 'MA',
  'mato grosso': 'MT',
  'mato grosso do sul': 'MS',
  'minas gerais': 'MG',
  'pará': 'PA', 'para': 'PA',
  'paraíba': 'PB', 'paraiba': 'PB',
  'paraná': 'PR', 'parana': 'PR',
  'pernambuco': 'PE',
  'piauí': 'PI', 'piaui': 'PI',
  'rio de janeiro': 'RJ',
  'rio grande do norte': 'RN',
  'rio grande do sul': 'RS',
  'rondônia': 'RO', 'rondonia': 'RO',
  'roraima': 'RR',
  'santa catarina': 'SC',
  'são paulo': 'SP', 'sao paulo': 'SP',
  'sergipe': 'SE',
  'tocantins': 'TO',
}

function resolveStateCode(address: NominatimResult['address']): string {
  const code = address.state_code?.trim().toUpperCase()
  if (code && BR_STATE_MAP[code]) return BR_STATE_MAP[code]
  const name = address.state?.trim().toLowerCase() ?? ''
  const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return BR_STATE_MAP[name] ?? BR_STATE_MAP[normalized] ?? code ?? name.toUpperCase().slice(0, 2)
}

function toSuggestion(r: NominatimResult): GeoSuggestion {
  const a = r.address
  return {
    displayName:  r.display_name,
    lat:          parseFloat(r.lat),
    lon:          parseFloat(r.lon),
    street:       a.road ?? '',
    number:       a.house_number ?? '',
    neighborhood: a.neighbourhood ?? a.suburb ?? '',
    city:         a.city ?? a.town ?? a.village ?? '',
    state:        resolveStateCode(a),
    zipCode:      a.postcode ?? '',
    country:      (a.country_code ?? 'br').toUpperCase(),
  }
}

// ─── Autocomplete ─────────────────────────────────────────────────────────────
export function useAddressAutocomplete() {
  const query       = ref('')
  const suggestions = ref<GeoSuggestion[]>([])
  const loading     = ref(false)
  const error       = ref<string | null>(null)

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  async function search(q: string) {
    query.value = q
    suggestions.value = []

    if (!q || q.trim().length < 4) return

    if (debounceTimer) clearTimeout(debounceTimer)

    debounceTimer = setTimeout(async () => {
      loading.value = true
      error.value   = null
      try {
        const params = new URLSearchParams({
          q,
          format:          'json',
          addressdetails:  '1',
          limit:           '6',
          countrycodes:    'br',        // foca no Brasil
          'accept-language': 'pt-BR',
        })

        const res = await fetch(`${NOMINATIM}/search?${params}`, {
          headers: { 'Accept-Language': 'pt-BR' },
        })

        if (!res.ok) throw new Error(`Nominatim ${res.status}`)

        const data: NominatimResult[] = await res.json()
        suggestions.value = data.map(toSuggestion)
      } catch (err: any) {
        error.value = err?.message ?? 'Erro no geocoding'
      } finally {
        loading.value = false
      }
    }, 400) // debounce 400ms — respeita rate limit
  }

  function clear() {
    suggestions.value = []
    query.value = ''
    if (debounceTimer) clearTimeout(debounceTimer)
  }

  return { query, suggestions, loading, error, search, clear }
}

// ─── Geocoding direto (endereço completo → lat/lon) ───────────────────────────
export async function geocodeExact(address: string): Promise<GeoSuggestion | null> {
  try {
    const params = new URLSearchParams({
      q:               address,
      format:          'json',
      addressdetails:  '1',
      limit:           '1',
      countrycodes:    'br',
      'accept-language': 'pt-BR',
    })

    const res = await fetch(`${NOMINATIM}/search?${params}`, {
      headers: { 'Accept-Language': 'pt-BR' },
    })

    const data: NominatimResult[] = await res.json()
    return data.length ? toSuggestion(data[0]) : null
  } catch {
    return null
  }
}

// ─── Reverse geocoding (lat/lon → endereço) ───────────────────────────────────
export async function reverseGeocode(lat: number, lon: number): Promise<GeoSuggestion | null> {
  try {
    const params = new URLSearchParams({
      lat:             String(lat),
      lon:             String(lon),
      format:          'json',
      addressdetails:  '1',
      'accept-language': 'pt-BR',
    })

    const res = await fetch(`${NOMINATIM}/reverse?${params}`, {
      headers: { 'Accept-Language': 'pt-BR' },
    })

    const data: NominatimResult = await res.json()
    return toSuggestion(data)
  } catch {
    return null
  }
}