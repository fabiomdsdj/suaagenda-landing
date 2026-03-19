// composables/useGeocoding.ts
//
// Estratégia em cascata:
//   1. CEP disponível → ViaCEP (logradouro exato) → Nominatim com query rica
//   2. Sem CEP → Nominatim direto (mesmo comportamento anterior)
//
// ViaCEP: gratuito, sem key, cobre 100% dos CEPs brasileiros
// Nominatim: gratuito, sem key, rate limit 1 req/s (debounce 400ms)

export interface NominatimResult {
  place_id:     number
  display_name: string
  lat:          string
  lon:          string
  address: {
    road?:          string
    house_number?:  string
    suburb?:        string
    neighbourhood?: string
    city?:          string
    town?:          string
    village?:       string
    state?:         string
    state_code?:    string
    postcode?:      string
    country_code?:  string
  }
  boundingbox: string[]
}

export interface ViaCepResult {
  cep:         string
  logradouro:  string
  complemento: string
  bairro:      string
  localidade:  string
  uf:          string
  erro?:       boolean
}

export interface GeoSuggestion {
  displayName:  string
  lat:          number
  lon:          number
  street:       string
  number:       string
  neighborhood: string
  city:         string
  state:        string
  zipCode:      string
  country:      string
}

const NOMINATIM = 'https://nominatim.openstreetmap.org'
const VIACEP    = 'https://viacep.com.br/ws'

// ─── Mapa UF ─────────────────────────────────────────────────────────────────
const BR_STATE_MAP: Record<string, string> = {
  'AC': 'AC', 'AL': 'AL', 'AP': 'AP', 'AM': 'AM', 'BA': 'BA',
  'CE': 'CE', 'DF': 'DF', 'ES': 'ES', 'GO': 'GO', 'MA': 'MA',
  'MT': 'MT', 'MS': 'MS', 'MG': 'MG', 'PA': 'PA', 'PB': 'PB',
  'PR': 'PR', 'PE': 'PE', 'PI': 'PI', 'RJ': 'RJ', 'RN': 'RN',
  'RS': 'RS', 'RO': 'RO', 'RR': 'RR', 'SC': 'SC', 'SP': 'SP',
  'SE': 'SE', 'TO': 'TO',
  'acre': 'AC', 'alagoas': 'AL', 'amapá': 'AP', 'amapa': 'AP',
  'amazonas': 'AM', 'bahia': 'BA', 'ceará': 'CE', 'ceara': 'CE',
  'distrito federal': 'DF', 'espírito santo': 'ES', 'espirito santo': 'ES',
  'goiás': 'GO', 'goias': 'GO', 'maranhão': 'MA', 'maranhao': 'MA',
  'mato grosso': 'MT', 'mato grosso do sul': 'MS', 'minas gerais': 'MG',
  'pará': 'PA', 'para': 'PA', 'paraíba': 'PB', 'paraiba': 'PB',
  'paraná': 'PR', 'parana': 'PR', 'pernambuco': 'PE',
  'piauí': 'PI', 'piaui': 'PI', 'rio de janeiro': 'RJ',
  'rio grande do norte': 'RN', 'rio grande do sul': 'RS',
  'rondônia': 'RO', 'rondonia': 'RO', 'roraima': 'RR',
  'santa catarina': 'SC', 'são paulo': 'SP', 'sao paulo': 'SP',
  'sergipe': 'SE', 'tocantins': 'TO',
}

function resolveStateCode(address: NominatimResult['address']): string {
  const code = address.state_code?.trim().toUpperCase()
  if (code && BR_STATE_MAP[code]) return BR_STATE_MAP[code]
  const name       = address.state?.trim().toLowerCase() ?? ''
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

// ─── ViaCEP ───────────────────────────────────────────────────────────────────
function cleanCep(cep: string): string {
  return cep.replace(/\D/g, '')
}

async function fetchViaCep(cep: string): Promise<ViaCepResult | null> {
  const cleaned = cleanCep(cep)
  if (cleaned.length !== 8) return null
  try {
    const res = await fetch(`${VIACEP}/${cleaned}/json/`)
    if (!res.ok) return null
    const data: ViaCepResult = await res.json()
    if (data.erro) return null
    return data
  } catch {
    return null
  }
}

// ─── Nominatim search ────────────────────────────────────────────────────────
async function nominatimSearch(q: string, limit = 6): Promise<NominatimResult[]> {
  const params = new URLSearchParams({
    q,
    format:            'json',
    addressdetails:    '1',
    limit:             String(limit),
    countrycodes:      'br',
    'accept-language': 'pt-BR',
  })
  const res = await fetch(`${NOMINATIM}/search?${params}`, {
    headers: { 'Accept-Language': 'pt-BR' },
  })
  if (!res.ok) throw new Error(`Nominatim ${res.status}`)
  return res.json()
}

// ─── Monta query Nominatim a partir dos dados do ViaCEP ──────────────────────
// Query enriquecida tem taxa de acerto muito maior do que endereço livre
function buildQueryFromViaCep(cep: ViaCepResult, number?: string): string {
  const parts = [
    cep.logradouro,
    number,
    cep.bairro,
    cep.localidade,
    cep.uf,
    'Brasil',
  ].filter(Boolean)
  return parts.join(', ')
}

// ─── geocodeExact com cascata ─────────────────────────────────────────────────
// Chamado pelo botão "Obter coords do endereço" no formulário.
// Recebe o endereço como string — tenta extrair CEP da string pra ativar cascata.
export async function geocodeExact(address: string, opts?: {
  cep?:    string
  number?: string
}): Promise<GeoSuggestion | null> {
  // Tenta extrair CEP do endereço ou dos opts
  const cepMatch = opts?.cep ?? address.match(/\d{5}-?\d{3}/)?.[0]

  if (cepMatch) {
    // ── Caminho 1: ViaCEP + Nominatim ───────────────────────────────────
    const viaCep = await fetchViaCep(cepMatch)
    if (viaCep) {
      const q = buildQueryFromViaCep(viaCep, opts?.number)
      try {
        const results = await nominatimSearch(q, 1)
        if (results.length) {
          const suggestion = toSuggestion(results[0])
          // Complementa com dados precisos do ViaCEP (logradouro e bairro)
          return {
            ...suggestion,
            street:       viaCep.logradouro || suggestion.street,
            neighborhood: viaCep.bairro     || suggestion.neighborhood,
            city:         viaCep.localidade || suggestion.city,
            state:        viaCep.uf         || suggestion.state,
            zipCode:      cleanCep(viaCep.cep),
          }
        }
      } catch {
        // fallthrough pro Nominatim direto
      }

      // Se Nominatim não achou mas temos ViaCEP, retorna sem coordenadas
      // (melhor que nada — endereço fica preenchido)
      return {
        displayName:  `${viaCep.logradouro}, ${viaCep.localidade} - ${viaCep.uf}`,
        lat:          0,
        lon:          0,
        street:       viaCep.logradouro,
        number:       opts?.number ?? '',
        neighborhood: viaCep.bairro,
        city:         viaCep.localidade,
        state:        viaCep.uf,
        zipCode:      cleanCep(viaCep.cep),
        country:      'BR',
      }
    }
  }

  // ── Caminho 2: Nominatim direto (sem CEP) ─────────────────────────────
  try {
    const results = await nominatimSearch(address, 1)
    return results.length ? toSuggestion(results[0]) : null
  } catch {
    return null
  }
}

// ─── Reverse geocoding ────────────────────────────────────────────────────────
export async function reverseGeocode(lat: number, lon: number): Promise<GeoSuggestion | null> {
  try {
    const params = new URLSearchParams({
      lat:               String(lat),
      lon:               String(lon),
      format:            'json',
      addressdetails:    '1',
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

// ─── Autocomplete ─────────────────────────────────────────────────────────────
// Tenta ViaCEP primeiro se a query parecer um CEP, senão vai pro Nominatim
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
        // Se parecer CEP (só números/hífen, 8 dígitos) → ViaCEP
        const cepCandidate = q.replace(/\D/g, '')
        if (cepCandidate.length === 8) {
          const viaCep = await fetchViaCep(cepCandidate)
          if (viaCep) {
            // Com ViaCEP bate no Nominatim pra pegar coordenada
            const nominatimQ = buildQueryFromViaCep(viaCep)
            const results    = await nominatimSearch(nominatimQ, 1).catch(() => [])
            const base       = results.length ? toSuggestion(results[0]) : null

            suggestions.value = [{
              displayName:  `${viaCep.logradouro}, ${viaCep.bairro} — ${viaCep.localidade}/${viaCep.uf}`,
              lat:          base?.lat          ?? 0,
              lon:          base?.lon          ?? 0,
              street:       viaCep.logradouro,
              number:       '',
              neighborhood: viaCep.bairro,
              city:         viaCep.localidade,
              state:        viaCep.uf,
              zipCode:      cepCandidate,
              country:      'BR',
            }]
            return
          }
        }

        // Senão — Nominatim normal
        const results = await nominatimSearch(q, 6)
        suggestions.value = results.map(toSuggestion)
      } catch (err: any) {
        error.value = err?.message ?? 'Erro no geocoding'
      } finally {
        loading.value = false
      }
    }, 400)
  }

  function clear() {
    suggestions.value = []
    query.value = ''
    if (debounceTimer) clearTimeout(debounceTimer)
  }

  return { query, suggestions, loading, error, search, clear }
}