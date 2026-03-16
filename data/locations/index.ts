// data/locations/index.ts
import extremoLesteSP from "../extremo-leste-sp"
import spZonaLeste from "../sp-zona-leste"
import spZonaNorte from "../sp-zona-norte"
import spZonaSul from "../sp-zona-sul"
import spZonaOeste from "../sp-zona-oeste"
import baixadaSantista from "../baixada-santista"

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
// Arquivos que exportam um objeto único → colocar direto no array
// Arquivos que exportam um array (ex: baixada-santista) → usar spread
export const allCities: CityData[] = [
  extremoLesteSP,
  spZonaLeste,
  spZonaNorte,
  spZonaSul,
  spZonaOeste,
  ...baixadaSantista,
  // Adicionar novas zonas de SP aqui conforme criar os arquivos:
  
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

/** /barbearias/santos/gonzaga, /barbearias/sao-paulo/itaquera ... */
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

/** /barbearias/santos, /barbearias/sao-paulo ... */
export function getAllCityRoutes(): string[] {
  // Deduplica caso mesma cidade apareça em múltiplos arquivos de zona
  const seen = new Set<string>()
  return allCities
    .filter((c) => {
      if (seen.has(c.citySlug)) return false
      seen.add(c.citySlug)
      return true
    })
    .map((c) => `/barbearias/${c.citySlug}`)
}

/** /barbeiros/santos, /barbeiros/sao-paulo ... */
export function getAllBarbeirosRoutes(): string[] {
  const seen = new Set<string>()
  return allCities
    .filter((c) => {
      if (seen.has(c.citySlug)) return false
      seen.add(c.citySlug)
      return true
    })
    .map((c) => `/barbeiros/${c.citySlug}`)
}