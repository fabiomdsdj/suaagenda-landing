// composables/useFallbackSuggestions.ts
//
// Resolve barbearias próximas quando o bairro não tem shops cadastrados.
//
// Hierarquia de tentativas:
//   1. 'neighborhood' — bairro exato
//   2. 'district'     — cidade inteira, filtra bairros do distrito client-side
//   3. 'city'         — cidade toda (fallback da 2 se distrito deu 0)
//   4. 'uf'           — estado todo
//   5. 'empty'        — nada encontrado
//
// IMPORTANTE: NÃO usa onMounted internamente.
// O componente deve chamar execute() dentro do seu próprio onMounted.

import { fetchLocations } from '~/composables/useLocation'
import type { Barbershop } from '~/data/barbershops'
import type { SearchResult } from '~/composables/useBarbershops'

export type FallbackLevel = 'neighborhood' | 'district' | 'city' | 'uf' | 'empty'

interface FallbackData {
  level: FallbackLevel
  data:  Barbershop[]
  suggestions: {
    nearbyNeighborhoods: Array<{ name: string; slug: string; count: number }>
    relatedServices:     Array<{ name: string; slug: string; count: number; emoji?: string }>
  }
  districtNeighborhoodSlugs: string[]
}

// ── Config lazy (singleton) ───────────────────────────────────────────────────
let _baseUrl = ''
let _apiKey  = ''

function initConfig() {
  if (_baseUrl) return
  const config = useRuntimeConfig()
  _baseUrl = (config.public.apiBase as string) || ''
  _apiKey  = (config.public.apiKey  as string) || ''
}

// ── Normalização inline ───────────────────────────────────────────────────────
function slugify(str: string): string {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function normalizeShop(raw: any): Barbershop {
  const ufSlug           = raw.ufSlug ?? raw.state?.toLowerCase() ?? ''
  const neighborhoodSlug = raw.neighborhoodSlug ?? slugify(raw.neighborhood ?? '')
  const neighborhood     = raw.neighborhood ||
    neighborhoodSlug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return {
    id:                raw.id,
    name:              raw.name,
    slug:              raw.slug,
    subdomain:         raw.subdomain       ?? undefined,
    status:            raw.status,
    plan:              raw.plan,
    isClaimed:         Boolean(raw.isClaimed),
    featured:          raw.featured        ?? false,
    phone:             raw.phone           ?? undefined,
    whatsapp:          raw.whatsapp        ?? undefined,
    email:             raw.email           ?? undefined,
    website:           raw.website         ?? undefined,
    street:            raw.street          ?? undefined,
    number:            raw.number          ?? undefined,
    complement:        raw.complement      ?? undefined,
    neighborhood,
    neighborhoodSlug,
    city:              raw.city,
    citySlug:          raw.citySlug,
    state:             raw.state,
    ufSlug,
    zipCode:           raw.zipCode         ?? undefined,
    country:           raw.country,
    address:           raw.address ?? [raw.street, raw.number, raw.complement].filter(Boolean).join(', '),
    latitude:          raw.latitude        ?? undefined,
    longitude:         raw.longitude       ?? undefined,
    description:       raw.description     ?? undefined,
    metaTitle:         raw.metaTitle       ?? undefined,
    metaDescription:   raw.metaDescription ?? undefined,
    coverImageUrl:     raw.coverImageUrl   ?? undefined,
    logoUrl:           raw.logoUrl         ?? undefined,
    googlePlaceId:     raw.googlePlaceId   ?? undefined,
    googleRating:      raw.googleRating    ?? undefined,
    googleReviewCount: raw.googleReviewCount ?? 0,
    nativeRating:      raw.nativeRating    ?? undefined,
    nativeReviewCount: raw.nativeReviewCount ?? 0,
    openingHours:      raw.openingHours    ?? undefined,
    services: (raw.services ?? []).map((s: any) => ({
      id:          s.id,
      name:        s.name,
      slug:        s.slug,
      category:    s.category    ?? undefined,
      description: s.description ?? undefined,
      price:       Number(s.price),
      priceMin:    s.priceMin != null ? Number(s.priceMin) : undefined,
      priceMax:    s.priceMax != null ? Number(s.priceMax) : undefined,
      durationMin: s.durationMin,
      isActive:    Boolean(s.isActive),
      isFeatured:  Boolean(s.isFeatured),
      seoTag:      s.seoTag    ?? undefined,
      sortOrder:   s.sortOrder,
    })),
    photos: (raw.photos ?? [])
      .sort((a: any, b: any) => {
        if (Number(b.isCover) !== Number(a.isCover)) return Number(b.isCover) - Number(a.isCover)
        return (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      })
      .map((p: any) => p.url),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}

// ── fetchIsolated ─────────────────────────────────────────────────────────────
interface FetchParams {
  uf:            string
  city?:         string
  neighborhood?: string
  svc?:          string
  limit?:        number
}

async function fetchIsolated(params: FetchParams): Promise<SearchResult> {
  const emptyResult: SearchResult = {
    data: [],
    meta: { total: 0, page: 1, limit: params.limit ?? 6, pages: 0, stats: { avgRating: null, avgPrice: null, hasPhotos: 0, proCount: 0 } },
    suggestions: { nearbyNeighborhoods: [], relatedServices: [] },
  }

  try {
    const query: Record<string, string | number> = { uf: params.uf }
    if (params.city)         query.city         = params.city
    if (params.neighborhood) query.neighborhood = params.neighborhood
    if (params.svc)          query.svc          = params.svc
    if (params.limit)        query.limit        = params.limit

    const raw = await $fetch<{ data: any[]; meta: any; suggestions?: any }>(
      `${_baseUrl}/barbershops`,
      {
        params: query,
        headers: _apiKey ? { 'x-api-key': _apiKey } : {},
      }
    )

    return {
      data:        (raw.data ?? []).map(normalizeShop),
      meta: {
        total:  raw.meta?.total  ?? 0,
        page:   raw.meta?.page   ?? 1,
        limit:  raw.meta?.limit  ?? (params.limit ?? 6),
        pages:  raw.meta?.pages  ?? 0,
        stats:  raw.meta?.stats  ?? { avgRating: null, avgPrice: null, hasPhotos: 0, proCount: 0 },
      },
      suggestions: raw.suggestions ?? { nearbyNeighborhoods: [], relatedServices: [] },
    }
  } catch (err: any) {
    console.error('[fetchIsolated] ERRO —', JSON.stringify(params), err?.message)
    return emptyResult
  }
}

// ── resolveDistrictSlugs ──────────────────────────────────────────────────────
async function resolveDistrictSlugs(
  ufSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
): Promise<string[]> {
  const cities = await fetchLocations()
  const city   = cities.find(c => c.ufSlug === ufSlug && c.citySlug === citySlug)
  if (!city) return []

  let district = city.districts.find(d =>
    d.neighborhoods.some(n => n.slug === neighborhoodSlug)
  )
  if (!district) {
    const prefix = neighborhoodSlug.split('-').slice(0, 2).join('-')
    district = city.districts.find(d =>
      d.neighborhoods.some(n => n.slug.startsWith(prefix))
    ) ?? [...city.districts].sort((a, b) => b.neighborhoods.length - a.neighborhoods.length)[0]
  }
  if (!district) return []
  return district.neighborhoods.map(n => n.slug).filter(s => s !== neighborhoodSlug)
}

// ─────────────────────────────────────────────────────────────────────────────

export function useFallbackSuggestions(opts: {
  ufSlug:            string
  citySlug:          string
  neighborhoodSlug?: string
  serviceSlug?:      string
  limit?:            number
}) {
  const { ufSlug, citySlug, neighborhoodSlug, serviceSlug, limit = 6 } = opts

  initConfig()

  // ── Labels legíveis ───────────────────────────────────────────────────────
  const cityLabelRef     = ref('')
  const districtLabelRef = ref('')

  const labelKey = `fallback-labels:${ufSlug}:${citySlug}:${neighborhoodSlug ?? '_'}`
  const { data: labelData } = useAsyncData(labelKey, async () => {
    const cities = await fetchLocations()
    const city   = cities.find(c => c.ufSlug === ufSlug && c.citySlug === citySlug)
    if (!city) return { cityLabel: citySlug, districtLabel: '' }

    const cityLabel = city.city
    if (!neighborhoodSlug) return { cityLabel, districtLabel: '' }

    let district = city.districts.find(d =>
      d.neighborhoods.some(n => n.slug === neighborhoodSlug)
    )
    if (!district) {
      const prefix = neighborhoodSlug.split('-').slice(0, 2).join('-')
      district = city.districts.find(d =>
        d.neighborhoods.some(n => n.slug.startsWith(prefix))
      ) ?? [...city.districts].sort((a, b) => b.neighborhoods.length - a.neighborhoods.length)[0]
    }
    if (!district) return { cityLabel, districtLabel: '' }

    return { cityLabel, districtLabel: district.name }
  })

  watch(labelData, val => {
    if (!val) return
    cityLabelRef.value     = val.cityLabel
    districtLabelRef.value = val.districtLabel
  }, { immediate: true })

  // ── Estado reativo ────────────────────────────────────────────────────────
  // pending começa TRUE → skeleton aparece imediatamente no template
  const pending      = ref(true)
  const fallbackData = ref<FallbackData>({
    level:                     'empty',
    data:                      [],
    suggestions:               { nearbyNeighborhoods: [], relatedServices: [] },
    districtNeighborhoodSlugs: [],
  })

  // ── execute() — chamado pelo componente no seu onMounted ──────────────────
  async function execute() {
    pending.value = true
    try {
      const districtSlugs = neighborhoodSlug
        ? await resolveDistrictSlugs(ufSlug, citySlug, neighborhoodSlug)
        : []

      // Tentativa 1: bairro exato
      if (neighborhoodSlug && citySlug) {
        const r = await fetchIsolated({
          uf: ufSlug, city: citySlug, neighborhood: neighborhoodSlug,
          svc: serviceSlug, limit,
        })
        if (r.data.length > 0) {
          fallbackData.value = { level: 'neighborhood', data: r.data, suggestions: r.suggestions, districtNeighborhoodSlugs: districtSlugs }
          return
        }
      }

      // Tentativa 2+3: city-wide, filtra distrito client-side
      if (citySlug) {
        const r = await fetchIsolated({ uf: ufSlug, city: citySlug, svc: serviceSlug, limit: limit * 4 })
        if (r.data.length > 0) {
          const districtShops    = districtSlugs.length > 0 ? r.data.filter(s => districtSlugs.includes(s.neighborhoodSlug)) : []
          const shops            = districtShops.length > 0 ? districtShops.slice(0, limit) : r.data.slice(0, limit)
          const level: FallbackLevel = districtShops.length > 0 ? 'district' : 'city'
          fallbackData.value = { level, data: shops, suggestions: r.suggestions, districtNeighborhoodSlugs: districtSlugs }
          return
        }
      }

      // Tentativa 4: só UF
      if (ufSlug) {
        const r = await fetchIsolated({ uf: ufSlug, svc: serviceSlug, limit })
        if (r.data.length > 0) {
          fallbackData.value = { level: 'uf', data: r.data, suggestions: r.suggestions, districtNeighborhoodSlugs: districtSlugs }
          return
        }
      }

      // empty
      fallbackData.value = {
        level: 'empty', data: [], suggestions: { nearbyNeighborhoods: [], relatedServices: [] },
        districtNeighborhoodSlugs: districtSlugs,
      }
    } catch (err) {
      console.error('[useFallbackSuggestions] erro:', err)
    } finally {
      pending.value = false
    }
  }

  const level               = computed<FallbackLevel>(() => fallbackData.value.level)
  const shops               = computed<Barbershop[]>(() => fallbackData.value.data)
  const nearbyNeighborhoods = computed(() => fallbackData.value.suggestions?.nearbyNeighborhoods ?? [])
  const relatedServices     = computed(() => fallbackData.value.suggestions?.relatedServices     ?? [])
  const districtSlugs       = computed(() => fallbackData.value.districtNeighborhoodSlugs        ?? [])

  return {
    shops,
    level,
    pending,
    error: ref(null),
    nearbyNeighborhoods,
    relatedServices,
    districtSlugs,
    execute,
    get cityLabel()     { return cityLabelRef.value     || citySlug },
    get districtLabel() { return districtLabelRef.value || ''       },
  }
}