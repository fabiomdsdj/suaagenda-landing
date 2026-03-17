// server/routes/sitemap.xml.ts
import { defineEventHandler } from 'h3'
import {
  allCities,
  allServices,
  getAllNeighborhoodRoutes,
} from '~/data/locations'
import { allBarbershops } from '~/data/barbershops'

const BASE = 'https://suaagenda.link'

function url(loc: string, priority: string, changefreq: string) {
  return `
  <url>
    <loc>${BASE}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export default defineEventHandler((event) => {
  event.node.res.setHeader('Content-Type', 'application/xml')

  const urls: string[] = []

  // Estáticas
  urls.push(url('/',            '1.0', 'weekly'))
  urls.push(url('/barbearias',  '0.9', 'daily'))

  // UFs
  const ufs = new Set(allCities.map(c => c.ufSlug))
  for (const uf of ufs) {
    urls.push(url(`/barbearias/${uf}`, '0.8', 'weekly'))
  }

  // Cidades
  for (const city of allCities) {
    urls.push(url(`/barbearias/${city.ufSlug}/${city.citySlug}`, '0.8', 'weekly'))
  }

  // Bairros
  for (const route of getAllNeighborhoodRoutes()) {
    urls.push(url(route, '0.7', 'weekly'))
  }

  // Bairros + serviço
  for (const route of getAllNeighborhoodRoutes()) {
    for (const service of allServices) {
      urls.push(url(`${route}/s/${service.slug}`, '0.6', 'monthly'))
    }
  }

  // Barbearias
  for (const b of allBarbershops) {
    urls.push(url(
      `/barbearias/${b.ufSlug}/${b.citySlug}/${b.neighborhoodSlug}/${b.slug}`,
      '0.9', 'weekly'
    ))
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`

  return xml
})