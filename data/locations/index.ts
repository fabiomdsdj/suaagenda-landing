// data/locations/index.ts
// Agregador central — adicione novas cidades aqui conforme escalar

import extremoLesteSP from '../extremo-leste-sp'

export interface Neighborhood {
  name: string
  slug: string
}

export interface District {
  name: string
  slug: string
  neighborhoods: Neighborhood[]
}

export interface CityData {
  city: string
  citySlug: string
  zone: string
  region: string
  districts: District[]
}

// ── Todas as cidades indexadas ─────────────────────────────────────────────
// Para adicionar nova cidade: importe o arquivo e inclua no array abaixo.
// As rotas, sitemap e prerender se atualizam automaticamente.
export const allCities: CityData[] = [
  extremoLesteSP,
  // import campinas from '../campinas' → adicionar aqui
]

// ── Lookup por cidade + bairro ─────────────────────────────────────────────
export function getNeighborhoodData(
  citySlug: string,
  neighborhoodSlug: string
): { city: CityData; district: District; neighborhood: Neighborhood } | null {
  const city = allCities.find((c) => c.citySlug === citySlug)
  if (!city) return null

  for (const district of city.districts) {
    const neighborhood = district.neighborhoods.find((n) => n.slug === neighborhoodSlug)
    if (neighborhood) return { city, district, neighborhood }
  }
  return null
}

// ── Geração de rotas ───────────────────────────────────────────────────────

/** /barbearias/sao-paulo/itaquera, /barbearias/sao-paulo/cidade-lider ... */
export function getAllNeighborhoodRoutes(): string[] {
  const routes: string[] = []
  for (const city of allCities) {
    for (const district of city.districts) {
      for (const neighborhood of district.neighborhoods) {
        routes.push(`/barbearias/${city.citySlug}/${neighborhood.slug}`)
      }
    }
  }
  return routes
}

/** /barbearias/sao-paulo */
export function getAllCityRoutes(): string[] {
  return allCities.map((c) => `/barbearias/${c.citySlug}`)
}

/** /barbeiros/sao-paulo */
export function getAllBarbeirosRoutes(): string[] {
  return allCities.map((c) => `/barbeiros/${c.citySlug}`)
}