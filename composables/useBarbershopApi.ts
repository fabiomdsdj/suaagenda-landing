// composables/useBarbershopApi.ts

import type { Barbershop } from '~/data/barbershops'
import type { SearchParams, SearchResult } from '~/composables/useBarbershops'

// ─── Shape da resposta paginada da API ───────────────────────────────────────
interface ApiPhoto {
  id:        string
  url:       string
  isCover:   number | boolean
  sortOrder: number
  caption?:  string | null
}

interface ApiService {
  id: string
  name: string
  slug: string
  category: string | null
  description: string | null
  price: number
  priceMin: number | null
  priceMax: number | null
  durationMin: number
  isActive: number | boolean
  isFeatured: number | boolean
  seoTag: string | null
  sortOrder: number
}

interface ApiBarbershop {
  id: string
  name: string
  slug: string
  subdomain: string | null
  status: string
  plan: string
  isClaimed: number | boolean
  phone: string | null
  whatsapp: string | null
  email: string | null
  website: string | null
  street: string | null
  number: string | null
  complement: string | null
  neighborhood: string | null
  neighborhoodSlug: string | null
  city: string
  citySlug: string
  state: string
  zipCode: string | null
  country: string
  latitude: number | null
  longitude: number | null
  description: string | null
  metaTitle: string | null
  metaDescription: string | null
  coverImageUrl: string | null
  logoUrl: string | null
  googlePlaceId: string | null
  googleRating: number | null
  googleReviewCount: number
  nativeRating: number | null
  nativeReviewCount: number
  openingHours: Record<string, { open: string; close: string } | null> | null
  services?: ApiService[]
  photos?:   ApiPhoto[]
  featured?: boolean
  ufSlug?: string
  address?: string
  createdAt?: string
  updatedAt?: string
}

interface ApiPaginatedResponse {
  data: ApiBarbershop[]
  meta: {
    total: number
    page: number
    limit: number
    pages: number
    stats?: {
      avgRating: number | null
      avgPrice: number | null
      hasPhotos: number
      proCount: number
    }
  }
  suggestions?: {
    nearbyNeighborhoods: Array<{ name: string; count: number; slug: string }>
    relatedServices: Array<{ name: string; count: number; slug: string }>
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIX PRINCIPAL: configs resolvidas UMA VEZ no topo do módulo, fora de
// qualquer função. useRuntimeConfig() funciona aqui porque este módulo é
// avaliado durante o setup do Nuxt — sem depender de contexto de componente.
// Assim fetchBarbershopBySlug e fetchNearbyBarbershops podem ser chamadas
// de qualquer lugar (onMounted, event handlers, etc.) sem quebrar.
// ─────────────────────────────────────────────────────────────────────────────
let _baseUrl = ''
let _apiKey  = ''

function getApiConfig() {
  // Lazy init: resolve na primeira chamada real (garante SSR + client)
  if (!_baseUrl) {
    const config = useRuntimeConfig()
    _baseUrl = (config.public.apiBase as string) || ''
    _apiKey  = (config.public.apiKey  as string) || ''
  }
  return { baseUrl: _baseUrl, apiKey: _apiKey }
}

function apiHeaders() {
  const { apiKey } = getApiConfig()
  return apiKey ? { 'x-api-key': apiKey } : {}
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildAddress(raw: ApiBarbershop): string {
  return [raw.street, raw.number, raw.complement].filter(Boolean).join(', ')
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ─── Normalização: ApiBarbershop → Barbershop ────────────────────────────────
function normalizeShop(raw: ApiBarbershop): Barbershop {
  const ufSlug = raw.ufSlug ?? raw.state.toLowerCase()

  const neighborhoodSlug =
    raw.neighborhoodSlug ?? slugify(raw.neighborhood ?? '')

  const neighborhood =
    raw.neighborhood ||
    (raw.neighborhoodSlug
      ? raw.neighborhoodSlug
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      : '')

  const services = (raw.services ?? []).map(s => ({
    id:          s.id,
    name:        s.name,
    slug:        s.slug,
    category:    s.category ?? undefined,
    description: s.description ?? undefined,
    price:       Number(s.price),
    priceMin:    s.priceMin != null ? Number(s.priceMin) : undefined,
    priceMax:    s.priceMax != null ? Number(s.priceMax) : undefined,
    durationMin: s.durationMin,
    isActive:    Boolean(s.isActive),
    isFeatured:  Boolean(s.isFeatured),
    seoTag:      s.seoTag ?? undefined,
    sortOrder:   s.sortOrder,
  }))

  return {
    id:                raw.id,
    name:              raw.name,
    slug:              raw.slug,
    subdomain:         raw.subdomain ?? undefined,
    status:            raw.status as Barbershop['status'],
    plan:              raw.plan   as Barbershop['plan'],
    isClaimed:         Boolean(raw.isClaimed),
    featured:          raw.featured ?? false,
    phone:             raw.phone    ?? undefined,
    whatsapp:          raw.whatsapp ?? undefined,
    email:             raw.email    ?? undefined,
    website:           raw.website  ?? undefined,
    street:            raw.street       ?? undefined,
    number:            raw.number       ?? undefined,
    complement:        raw.complement   ?? undefined,
    neighborhood,
    neighborhoodSlug,
    city:              raw.city,
    citySlug:          raw.citySlug,
    state:             raw.state,
    ufSlug,
    zipCode:           raw.zipCode ?? undefined,
    country:           raw.country,
    address:           raw.address ?? buildAddress(raw),
    latitude:          raw.latitude  ?? undefined,
    longitude:         raw.longitude ?? undefined,
    description:       raw.description      ?? undefined,
    metaTitle:         raw.metaTitle        ?? undefined,
    metaDescription:   raw.metaDescription  ?? undefined,
    coverImageUrl:     raw.coverImageUrl    ?? undefined,
    logoUrl:           raw.logoUrl          ?? undefined,
    googlePlaceId:     raw.googlePlaceId  ?? undefined,
    googleRating:      raw.googleRating   ?? undefined,
    googleReviewCount: raw.googleReviewCount,
    nativeRating:      raw.nativeRating   ?? undefined,
    nativeReviewCount: raw.nativeReviewCount,
    openingHours:      raw.openingHours ?? undefined,
    services,
    photos: (raw.photos ?? [])
      .sort((a, b) => {
        if (Number(b.isCover) !== Number(a.isCover)) return Number(b.isCover) - Number(a.isCover)
        return (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      })
      .map(p => p.url),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}

// ─── Query builder ────────────────────────────────────────────────────────────
function buildQuery(params: SearchParams): Record<string, string | number | boolean> {
  const q: Record<string, string | number | boolean> = {}
  if (params.q)            q.q            = params.q
  if (params.svc)          q.svc          = params.svc
  if (params.price)        q.price        = params.price
  if (params.rating)       q.rating       = params.rating
  if (params.plan)         q.plan         = params.plan
  if (params.featured)     q.featured     = params.featured
  if (params.sort)         q.sort         = params.sort
  if (params.uf)           q.uf           = params.uf
  if (params.city)         q.city         = params.city
  if (params.neighborhood) q.neighborhood = params.neighborhood
  if (params.page)         q.page         = params.page
  if (params.limit)        q.limit        = params.limit
  return q
}

// ─── Composable principal (busca paginada) ────────────────────────────────────
export function useBarbershopApi(initialParams?: SearchParams) {
  // ✅ Aqui useRuntimeConfig é seguro — estamos dentro de um composable
  const config  = useRuntimeConfig()
  const baseUrl = config.public.apiBase as string
  const apiKey  = config.public.apiKey  as string

  const params  = ref<SearchParams>(initialParams ?? {})
  const pending = ref(false)
  const error   = ref<string | null>(null)

  const data        = ref<Barbershop[]>([])
  const meta        = ref<SearchResult['meta'] | null>(null)
  const suggestions = ref<SearchResult['suggestions']>({
    nearbyNeighborhoods: [],
    relatedServices: [],
  })

  async function fetch(newParams?: SearchParams) {
    if (newParams) params.value = newParams
    pending.value = true
    error.value   = null

    try {
      const raw = await $fetch<ApiPaginatedResponse>(`/api/barbershops`, { // ← proxy local
        params: buildQuery(params.value),
      })

      data.value  = raw.data.map(normalizeShop)
      meta.value  = {
        total: raw.meta.total,
        page:  raw.meta.page,
        limit: raw.meta.limit,
        pages: raw.meta.pages,
        stats: raw.meta.stats ?? { avgRating: null, avgPrice: null, hasPhotos: 0, proCount: 0 },
      }
      suggestions.value = raw.suggestions ?? { nearbyNeighborhoods: [], relatedServices: [] }
    } catch (err: any) {
      error.value = err?.data?.error ?? err?.message ?? 'Erro ao buscar barbearias'
    } finally {
      pending.value = false
    }
  }

  const result = computed<SearchResult>(() => ({
    data:        data.value,
    meta:        meta.value ?? { total: 0, page: 1, limit: 20, pages: 0, stats: { avgRating: null, avgPrice: null, hasPhotos: 0, proCount: 0 } },
    suggestions: suggestions.value,
  }))

  return { result, data, meta, suggestions, pending, error, fetch }
}

// ─── Composable para página de barbearia individual ───────────────────────────
export function useBarbershopSlug() {
  // ✅ Seguro — dentro de composable
  const config  = useRuntimeConfig()
  const baseUrl = config.public.apiBase as string
  const apiKey  = config.public.apiKey  as string

  async function fetchBySlug(
    uf: string,
    city: string,
    neighborhood: string,
    slug: string,
  ): Promise<Barbershop | null> {
    try {
      const raw = await $fetch<ApiBarbershop>(
        `${baseUrl}/barbershops/${uf}/${city}/${neighborhood}/${slug}`,
        { headers: apiKey ? { 'x-api-key': apiKey } : {} },
      )
      return normalizeShop(raw)
    } catch {
      return null
    }
  }

  return { fetchBySlug }
}

// ─── fetchBarbershopBySlug ────────────────────────────────────────────────────
// ✅ FIX: usa getApiConfig() (lazy singleton) em vez de useRuntimeConfig()
// direto — assim funciona em onMounted, event handlers e qualquer contexto
// fora do setup do Vue sem lançar "nuxt instance unavailable".
export async function fetchBarbershopBySlug(
  uf: string, city: string, neighborhood: string, slug: string,
): Promise<Barbershop | null> {
  try {
    const raw = await $fetch<ApiBarbershop>(
      `/api/barbershop/${uf}/${city}/${neighborhood}/${slug}` // ← proxy local
    )
    return normalizeShop(raw)
  } catch { return null }
}

// ─── fetchNearbyBarbershops ───────────────────────────────────────────────────
// Retorna outras barbearias do mesmo bairro (excluindo o slug atual).
// Usado pela seção de internal linking no [slug].vue.
export async function fetchNearbyBarbershops(
  uf: string, city: string, neighborhood: string, excludeSlug: string, limit = 6,
): Promise<Barbershop[]> {
  try {
    const raw = await $fetch<ApiPaginatedResponse>(`/api/barbershops`, { // ← proxy local
      params: { uf, city, neighborhood, limit, exclude: excludeSlug },
    })
    return raw.data.map(normalizeShop)
  } catch { return [] }
}