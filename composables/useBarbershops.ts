// composables/useBarbershops.ts
import { allBarbershops } from '~/data/barbershops'
import { getNeighborhoodData } from '~/data/locations'
import type { Barbershop } from '~/data/barbershops'

export interface SearchParams {
  q?:            string
  svc?:          string
  price?:        string
  sort?:         string
  uf?:           string
  city?:         string
  neighborhood?: string
  page?:         number
  limit?:        number
}

export interface SearchResult {
  data: Barbershop[]
  meta: { total: number; page: number; limit: number; pages: number }
}

export function minPrice(shop: Barbershop): number | null {
  const prices = shop.services.filter(s => s.isActive).map(s => s.price)
  return prices.length ? Math.min(...prices) : null
}

function inPriceRange(shop: Barbershop, range: string): boolean {
  const min = minPrice(shop)
  if (min === null) return true
  if (range === 'ate-30')    return min <= 30
  if (range === '30-60')     return min > 30  && min <= 60
  if (range === '60-100')    return min > 60  && min <= 100
  if (range === 'acima-100') return min > 100
  return true
}

export function useBarbershopSearch(params: SearchParams): SearchResult {
  const {
    q, svc, price,
    sort = 'relevance',
    uf, city, neighborhood,
    page = 1, limit = 20,
  } = params

  const qLow = q?.toLowerCase().trim() ?? ''

  let list = allBarbershops.filter(b => {
    if (b.status !== 'active') return false

    const matchText = !qLow ||
      b.name.toLowerCase().includes(qLow) ||
      b.neighborhoodSlug.includes(qLow) ||
      b.citySlug.includes(qLow) ||
      b.city.toLowerCase().includes(qLow) ||        // ✅ nome legível da cidade
      b.neighborhood.toLowerCase().includes(qLow)   // ✅ nome legível do bairro

    const matchUf   = !uf           || b.ufSlug           === uf
    const matchCity = !city         || b.citySlug         === city   // ✅ filtro por cidade
    const matchHood = !neighborhood || b.neighborhoodSlug === neighborhood
    const matchSvc  = !svc   || b.services.some(s => s.seoTag === svc || s.slug === svc)
    const matchPrice = !price || inPriceRange(b, price)

    return matchText && matchUf && matchCity && matchHood && matchSvc && matchPrice
  })

  if (sort === 'rating')    list = [...list].sort((a, b) => (b.googleRating ?? 0) - (a.googleRating ?? 0))
  if (sort === 'price')     list = [...list].sort((a, b) => (minPrice(a) ?? 999) - (minPrice(b) ?? 999))
  if (sort === 'featured')  list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
  if (sort === 'relevance') list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured))

  const total  = list.length
  const offset = (page - 1) * limit
  const data   = list.slice(offset, offset + limit)

  return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } }
}

export function useBarbershopsByNeighborhood(
  uf: string, city: string, neighborhood: string
): Barbershop[] {
  return allBarbershops.filter(
    b => b.ufSlug === uf && b.citySlug === city &&
         b.neighborhoodSlug === neighborhood && b.status === 'active'
  )
}

export function useBarbershopBySlug(
  uf: string, city: string, neighborhood: string, slug: string
): Barbershop | null {
  return allBarbershops.find(
    b => b.ufSlug === uf && b.citySlug === city &&
         b.neighborhoodSlug === neighborhood && b.slug === slug && b.status === 'active'
  ) ?? null
}

export function getBarbershopNeighborhoodLabel(shop: Barbershop): string {
  const nd = getNeighborhoodData(shop.ufSlug, shop.citySlug, shop.neighborhoodSlug)
  return nd
    ? `${nd.neighborhood.name}, ${nd.city.city}`
    : `${shop.neighborhood}, ${shop.city}`
}