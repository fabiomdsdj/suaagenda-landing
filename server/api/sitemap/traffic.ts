// server/api/sitemap/traffic.ts
//
// Rotas de gestão de tráfego por cidade e bairro.
// Geradas a partir do locations.ts — sem fetch externo, sem Redis.
// Mesmo padrão do static.ts: puro, previsível, cache de 6h no sitemap.

import {
    getAllCityRoutes,
    getAllNeighborhoodRoutes,
  } from '~/data/locations'
  
  export default defineEventHandler(() => {
    const cityRoutes = getAllCityRoutes().map((r) =>
      r.replace('/barbearias/', '/barbearia/gestao-de-trafego/')
    )
  
    const neighborhoodRoutes = getAllNeighborhoodRoutes().map((r) =>
      r.replace('/barbearias/', '/barbearia/gestao-de-trafego/')
    )
  
    const routes = [...cityRoutes, ...neighborhoodRoutes]
  
    console.log(`[sitemap/traffic] ${routes.length} rotas de tráfego (${cityRoutes.length} cidades + ${neighborhoodRoutes.length} bairros)`)
  
    return routes
  })