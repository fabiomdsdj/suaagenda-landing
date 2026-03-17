// data/locations/index.ts — VERSÃO FINAL

import extremoLesteSP from "../extremo-leste-sp"
import spZonaLeste    from "../sp-zona-leste"
import spZonaNorte    from "../sp-zona-norte"
import spZonaSul      from "../sp-zona-sul"
import spZonaOeste    from "../sp-zona-oeste"
import baixadaSantista from "../baixada-santista"
import abcPaulista  from "../abc-paulista"
import altoTiete from "../alto-tiete"

import rioDeJaneiroRJ from "../rio-de-janeiro-rj"

export interface Neighborhood {
  name: string
  slug: string
}

export interface District {
  name: string
  slug: string
  zone?: string
  region?: string
  neighborhoods: Neighborhood[]
}

export interface CityData {
  city: string
  citySlug: string
  uf: string
  ufSlug: string
  zone: string
  region: string
  districts: District[]
}

export interface Service {
  name: string
  slug: string
  emoji: string
}

export const allServices: Service[] = [
  { name: "Corte de Cabelo", slug: "corte-de-cabelo", emoji: "✂️" },
  { name: "Barba",           slug: "barba",           emoji: "🧔" },
  { name: "Corte e Barba",   slug: "corte-e-barba",   emoji: "💈" },
  { name: "Sobrancelha",     slug: "sobrancelha",     emoji: "👁️" },
  { name: "Pigmentação",     slug: "pigmentacao",     emoji: "🎨" },
  { name: "Relaxamento",     slug: "relaxamento",     emoji: "😌" },
]

// ═══════════════════════════════════════════════════════════════
// Helpers de montagem
// ═══════════════════════════════════════════════════════════════

function spZone(
  source: {
    city: string
    citySlug: string
    zone: string
    region: string
    districts: { name: string; slug: string; neighborhoods: Neighborhood[] }[]
  }
): CityData {
  return {
    city:     source.city,
    citySlug: source.citySlug,
    uf:       "SP",
    ufSlug:   "sp",
    zone:     "São Paulo",
    region:   "São Paulo",
    districts: source.districts.map((d) => ({
      ...d,
      zone:   source.zone,
      region: source.region,
    })),
  }
}

function addUF(cities: any[]): CityData[] {
  return cities.map((city) => ({ ...city, uf: "SP", ufSlug: "sp" }))
}

function mergeCities(sources: CityData[]): CityData[] {
  const map = new Map<string, CityData>()
  for (const source of sources) {
    const existing = map.get(source.citySlug)
    if (!existing) {
      map.set(source.citySlug, { ...source, districts: [...source.districts] })
    } else {
      for (const district of source.districts) {
        if (!existing.districts.some((d) => d.slug === district.slug)) {
          existing.districts.push(district)
        }
      }
    }
  }
  return Array.from(map.values())
}

const rawSources: CityData[] = [
  spZone(extremoLesteSP),
  ...addUF(altoTiete),
  spZone(spZonaLeste),
  spZone(spZonaNorte),
  spZone(spZonaSul),
  spZone(spZonaOeste),
  ...addUF(abcPaulista),
  ...addUF(baixadaSantista),
  ...rioDeJaneiroRJ,
]

export const allCities: CityData[] = mergeCities(rawSources)

// ═══════════════════════════════════════════════════════════════
// Lookups
// ═══════════════════════════════════════════════════════════════

export function getNeighborhoodData(
  ufSlug: string,
  citySlug: string,
  neighborhoodSlug: string
): { city: CityData; district: District; neighborhood: Neighborhood } | null {
  const city = allCities.find((c) => c.ufSlug === ufSlug && c.citySlug === citySlug)
  if (!city) return null
  for (const district of city.districts) {
    const neighborhood = district.neighborhoods.find((n) => n.slug === neighborhoodSlug)
    if (neighborhood) return { city, district, neighborhood }
  }
  return null
}

/** @deprecated use getNeighborhoodData com ufSlug */
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

// ═══════════════════════════════════════════════════════════════
// Geração de rotas
// ═══════════════════════════════════════════════════════════════

/** /barbearias/sp */
export function getAllUFRoutes(): string[] {
  const ufs = new Set(allCities.map((c) => c.ufSlug))
  return Array.from(ufs).map((uf) => `/barbearias/${uf}`)
}

/** /barbearias/sp/sao-paulo */
export function getAllCityRoutes(): string[] {
  return allCities.map((c) => `/barbearias/${c.ufSlug}/${c.citySlug}`)
}

/** /barbearias/sp/sao-paulo/itaquera */
export function getAllNeighborhoodRoutes(): string[] {
  const routes: string[] = []
  const seen = new Set<string>()
  for (const city of allCities) {
    for (const district of city.districts) {
      for (const neighborhood of district.neighborhoods) {
        const route = `/barbearias/${city.ufSlug}/${city.citySlug}/${neighborhood.slug}`
        if (!seen.has(route)) {
          seen.add(route)
          routes.push(route)
        }
      }
    }
  }
  return routes
}

/** /barbearias/sp/sao-paulo/itaquera/s/corte-de-cabelo */
export function getAllServiceRoutes(): string[] {
  const routes: string[] = []
  for (const city of allCities) {
    for (const district of city.districts) {
      for (const neighborhood of district.neighborhoods) {
        for (const service of allServices) {
          routes.push(
            `/barbearias/${city.ufSlug}/${city.citySlug}/${neighborhood.slug}/s/${service.slug}`
          )
        }
      }
    }
  }
  return routes
}

/** /barbeiros/sp/sao-paulo */
export function getAllBarbeirosRoutes(): string[] {
  return allCities.map((c) => `/barbeiros/${c.ufSlug}/${c.citySlug}`)
}

// ═══════════════════════════════════════════════════════════════
// Redirects 301
// ═══════════════════════════════════════════════════════════════

export function getOldNeighborhoodRoutes(): Array<{ from: string; to: string }> {
  const redirects: Array<{ from: string; to: string }> = []
  for (const city of allCities) {
    for (const district of city.districts) {
      for (const neighborhood of district.neighborhoods) {
        redirects.push({
          from: `/barbearias/${city.citySlug}/${neighborhood.slug}`,
          to:   `/barbearias/${city.ufSlug}/${city.citySlug}/${neighborhood.slug}`,
        })
      }
    }
  }
  return redirects
}

export function getOldCityRoutes(): Array<{ from: string; to: string }> {
  return allCities.map((c) => ({
    from: `/barbearias/${c.citySlug}`,
    to:   `/barbearias/${c.ufSlug}/${c.citySlug}`,
  }))
}

export function getOldBarbeirosRoutes(): Array<{ from: string; to: string }> {
  return allCities.map((c) => ({
    from: `/barbeiros/${c.citySlug}`,
    to:   `/barbeiros/${c.ufSlug}/${c.citySlug}`,
  }))
}

// ═══════════════════════════════════════════════════════════════
// Debug
// ═══════════════════════════════════════════════════════════════

export function debugCities() {
  for (const city of allCities) {
    const total = city.districts.reduce((acc, d) => acc + d.neighborhoods.length, 0)
    console.log(`${city.city} (${city.ufSlug}/${city.citySlug}): ${city.districts.length} distritos, ${total} bairros`)
  }
}