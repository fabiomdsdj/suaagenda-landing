// data/locations/index.ts

import extremoLesteSP from "../extremo-leste-sp"
import spZonaLeste    from "../sp-zona-leste"
import spZonaNorte    from "../sp-zona-norte"
import spZonaSul      from "../sp-zona-sul"
import spZonaOeste    from "../sp-zona-oeste"
import baixadaSantista from "../baixada-santista"

export interface Neighborhood {
  name: string
  slug: string
}

export interface District {
  name: string
  slug: string
  zone?: string    // ex: "Zona Leste", "Zona Norte" — opcional p/ cidades pequenas
  region?: string  // ex: "Extremo Leste" — opcional
  neighborhoods: Neighborhood[]
}

export interface CityData {
  city: string
  citySlug: string
  zone: string    // mantido p/ compatibilidade — em SP usa "São Paulo"
  region: string  // mantido p/ compatibilidade — em SP usa "São Paulo"
  districts: District[]
}

// ─── Converte um arquivo de zona de SP em CityData com zone/region no distrito ─
function spZone(
  source: { city: string; citySlug: string; zone: string; region: string; districts: { name: string; slug: string; neighborhoods: Neighborhood[] }[] }
): CityData {
  return {
    city: source.city,
    citySlug: source.citySlug,
    zone: "São Paulo",
    region: "São Paulo",
    districts: source.districts.map((d) => ({
      ...d,
      zone: source.zone,
      region: source.region,
    })),
  }
}

// ─── Merge de cidades com mesmo citySlug ────────────────────────────────────
function mergeCities(sources: CityData[]): CityData[] {
  const map = new Map<string, CityData>()

  for (const source of sources) {
    const existing = map.get(source.citySlug)

    if (!existing) {
      map.set(source.citySlug, {
        ...source,
        districts: [...source.districts],
      })
    } else {
      for (const district of source.districts) {
        const alreadyIn = existing.districts.some((d) => d.slug === district.slug)
        if (!alreadyIn) {
          existing.districts.push(district)
        }
      }
    }
  }

  return Array.from(map.values())
}

// ─── Fontes — cada zona de SP passa por spZone() antes do merge ─────────────
const rawSources: CityData[] = [
  spZone(extremoLesteSP),
  spZone(spZonaLeste),
  spZone(spZonaNorte),
  spZone(spZonaSul),
  spZone(spZonaOeste),

  // Baixada Santista — cidades independentes, sem merge necessário
  ...baixadaSantista,

  // Adicionar novas zonas de SP: spZone(spZonaCentro), etc.
  // Adicionar novas cidades: ...litoral, ...abc, etc.
]

export const allCities: CityData[] = mergeCities(rawSources)

// ─── Lookup por cidade + bairro ──────────────────────────────────────────────
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

// ─── Lookup por distrito (útil pra breadcrumb e meta tags) ──────────────────
export function getDistrictData(
  citySlug: string,
  districtSlug: string
): { city: CityData; district: District } | null {
  const city = allCities.find((c) => c.citySlug === citySlug)
  if (!city) return null

  const district = city.districts.find((d) => d.slug === districtSlug)
  if (!district) return null

  return { city, district }
}

// ─── Geração de rotas ────────────────────────────────────────────────────────

/** /barbearias/sao-paulo/mooca, /barbearias/santos/gonzaga ... */
export function getAllNeighborhoodRoutes(): string[] {
  const routes: string[] = []
  const seen = new Set<string>()

  for (const city of allCities) {
    for (const district of city.districts) {
      for (const neighborhood of district.neighborhoods) {
        const route = `/barbearias/${city.citySlug}/${neighborhood.slug}`
        if (!seen.has(route)) {
          seen.add(route)
          routes.push(route)
        }
      }
    }
  }

  return routes
}

/** /barbearias/sao-paulo, /barbearias/santos ... */
export function getAllCityRoutes(): string[] {
  return allCities.map((c) => `/barbearias/${c.citySlug}`)
}

/** /barbeiros/sao-paulo, /barbeiros/santos ... */
export function getAllBarbeirosRoutes(): string[] {
  return allCities.map((c) => `/barbeiros/${c.citySlug}`)
}

// ─── Debug (remover em produção) ─────────────────────────────────────────────
export function debugCities() {
  for (const city of allCities) {
    const total = city.districts.reduce((acc, d) => acc + d.neighborhoods.length, 0)
    console.log(`${city.city} (${city.citySlug}): ${city.districts.length} distritos, ${total} bairros`)
    for (const d of city.districts) {
      console.log(`  [${d.zone ?? city.zone}] ${d.name} (${d.slug}): ${d.neighborhoods.length} bairros`)
    }
  }
}