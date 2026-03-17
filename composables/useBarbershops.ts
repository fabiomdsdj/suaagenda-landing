// composables/useBarbershops.ts
import { allBarbershops } from '~/data/barbershops'
import { getNeighborhoodData } from '~/data/locations'
import type { Barbershop } from '~/data/barbershops'

export interface SearchParams {
  q?:            string
  svc?:          string
  price?:        string
  rating?:       string      // ✨ NOVO: filtro de avaliação mínima
  plan?:         string      // ✨ NOVO: filtro por plano (free, pro, enterprise)
  featured?:     boolean     // ✨ NOVO: apenas destaques
  sort?:         string
  uf?:           string
  city?:         string
  neighborhood?: string
  page?:         number
  limit?:        number
}

export interface SearchResult {
  data: Barbershop[]
  meta: { 
    total: number
    page: number
    limit: number
    pages: number
    // ✨ NOVO: estatísticas dos resultados
    stats: {
      avgRating: number | null
      avgPrice: number | null
      hasPhotos: number
      proCount: number
    }
  }
  // ✨ NOVO: sugestões de refinamento
  suggestions: {
    nearbyNeighborhoods: Array<{ name: string; count: number; slug: string }>
    relatedServices: Array<{ name: string; count: number; slug: string }>
  }
}

export function minPrice(shop: Barbershop): number | null {
  const prices = shop.services.filter(s => s.isActive).map(s => s.price)
  return prices.length ? Math.min(...prices) : null
}

function avgPrice(shop: Barbershop): number | null {
  const prices = shop.services.filter(s => s.isActive).map(s => s.price)
  return prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : null
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

function inRatingRange(shop: Barbershop, rating: string): boolean {
  if (!rating || !shop.googleRating) return true
  const minRating = parseFloat(rating)
  return shop.googleRating >= minRating
}

// ✨ NOVO: Score de relevância para ordenação inteligente
function calculateRelevanceScore(shop: Barbershop, query: string): number {
  let score = 0
  const qLow = query.toLowerCase()
  
  // Match exato no nome = peso alto
  if (shop.name.toLowerCase() === qLow) score += 100
  if (shop.name.toLowerCase().includes(qLow)) score += 50
  
  // Destaques ganham boost
  if (shop.featured) score += 30
  
  // Plano PRO ganha boost
  if (shop.plan === 'pro' || shop.plan === 'enterprise') score += 20
  
  // Avaliação alta
  if (shop.googleRating) score += shop.googleRating * 5
  
  // Tem fotos
  if (shop.photos && shop.photos.length > 0) score += 10
  
  // Serviços ativos
  score += shop.services.filter(s => s.isActive).length * 2
  
  return score
}

export function useBarbershopSearch(params: SearchParams): SearchResult {
  const {
    q, svc, price, rating, plan, featured,
    sort = 'relevance',
    uf, city, neighborhood,
    page = 1, limit = 20,
  } = params

  const qLow = q?.toLowerCase().trim() ?? ''

  // ✨ Filtros aplicados
  let list = allBarbershops.filter(b => {
    if (b.status !== 'active') return false

    // Busca por texto
    const matchText = !qLow ||
      b.name.toLowerCase().includes(qLow) ||
      b.neighborhoodSlug.includes(qLow) ||
      b.citySlug.includes(qLow) ||
      b.city.toLowerCase().includes(qLow) ||
      b.neighborhood.toLowerCase().includes(qLow) ||
      b.address?.toLowerCase().includes(qLow) ||
      b.description?.toLowerCase().includes(qLow)

    // Filtros de localização
    const matchUf   = !uf           || b.ufSlug           === uf
    const matchCity = !city         || b.citySlug         === city
    const matchHood = !neighborhood || b.neighborhoodSlug === neighborhood

    // Filtros de serviço e preço
    const matchSvc   = !svc   || b.services.some(s => s.seoTag === svc || s.slug === svc)
    const matchPrice = !price || inPriceRange(b, price)

    // ✨ NOVOS filtros
    const matchRating = !rating || inRatingRange(b, rating)
    const matchPlan   = !plan || b.plan === plan
    const matchFeatured = featured === undefined || b.featured === featured

    return matchText && matchUf && matchCity && matchHood && 
           matchSvc && matchPrice && matchRating && matchPlan && matchFeatured
  })

  // ✨ Ordenação melhorada
  if (sort === 'relevance') {
    list = [...list].sort((a, b) => {
      const scoreA = calculateRelevanceScore(a, qLow)
      const scoreB = calculateRelevanceScore(b, qLow)
      return scoreB - scoreA
    })
  }
  if (sort === 'rating') {
    list = [...list].sort((a, b) => {
      const ratingA = a.googleRating ?? 0
      const ratingB = b.googleRating ?? 0
      if (ratingB !== ratingA) return ratingB - ratingA
      // Desempate: mais reviews
      return (b.googleReviewCount ?? 0) - (a.googleReviewCount ?? 0)
    })
  }
  if (sort === 'price') {
    list = [...list].sort((a, b) => (minPrice(a) ?? 999) - (minPrice(b) ?? 999))
  }
  if (sort === 'featured') {
    list = [...list].sort((a, b) => {
      if (b.featured !== a.featured) return Number(b.featured) - Number(a.featured)
      // Desempate: rating
      return (b.googleRating ?? 0) - (a.googleRating ?? 0)
    })
  }

  // ✨ Estatísticas dos resultados
  const stats = {
    avgRating: list.filter(b => b.googleRating).length > 0
      ? list.reduce((sum, b) => sum + (b.googleRating ?? 0), 0) / list.filter(b => b.googleRating).length
      : null,
    avgPrice: list.length > 0
      ? list.reduce((sum, b) => sum + (avgPrice(b) ?? 0), 0) / list.length
      : null,
    hasPhotos: list.filter(b => b.photos && b.photos.length > 0).length,
    proCount: list.filter(b => b.plan === 'pro' || b.plan === 'enterprise').length,
  }

  // ✨ Sugestões de refinamento
  const suggestions = {
    nearbyNeighborhoods: [] as Array<{ name: string; count: number; slug: string }>,
    relatedServices: [] as Array<{ name: string; count: number; slug: string }>,
  }

  // Bairros próximos (mesma cidade)
  if (neighborhood && city) {
    const neighborhoodCounts = new Map<string, { name: string; count: number; slug: string }>()
    allBarbershops
      .filter(b => b.citySlug === city && b.neighborhoodSlug !== neighborhood && b.status === 'active')
      .forEach(b => {
        const key = b.neighborhoodSlug
        if (!neighborhoodCounts.has(key)) {
          neighborhoodCounts.set(key, { name: b.neighborhood, count: 0, slug: b.neighborhoodSlug })
        }
        neighborhoodCounts.get(key)!.count++
      })
    suggestions.nearbyNeighborhoods = Array.from(neighborhoodCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }

  // Serviços relacionados (baseado nos resultados atuais)
  if (list.length > 0) {
    const serviceCounts = new Map<string, { name: string; count: number; slug: string }>()
    list.forEach(b => {
      b.services.filter(s => s.isActive).forEach(s => {
        const key = s.seoTag ?? s.slug
        if (key !== svc) { // Não mostrar o serviço já selecionado
          if (!serviceCounts.has(key)) {
            serviceCounts.set(key, { name: s.name, count: 0, slug: key })
          }
          serviceCounts.get(key)!.count++
        }
      })
    })
    suggestions.relatedServices = Array.from(serviceCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
  }

  const total  = list.length
  const offset = (page - 1) * limit
  const data   = list.slice(offset, offset + limit)

  return { 
    data, 
    meta: { 
      total, 
      page, 
      limit, 
      pages: Math.ceil(total / limit),
      stats,
    },
    suggestions,
  }
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