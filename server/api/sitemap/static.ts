// server/api/sitemap/static.ts
//
// Retorna só as rotas estáticas geradas pelo locations.ts.
// Conteúdo estável — cache de 24h no nuxt-simple-sitemap é suficiente.
// Sem Redis, sem fetch externo, sem estado — puro e previsível.

import {
    getAllNeighborhoodRoutes,
    getAllServiceRoutes,
    getAllCityRoutes,
    getAllUFRoutes,
  } from '~/data/locations'
  
  export default defineEventHandler(() => {
    const routes = [
      ...getAllUFRoutes(),
      ...getAllCityRoutes(),
      ...getAllNeighborhoodRoutes(),
      ...getAllServiceRoutes(),
    ]
  
    console.log(`[sitemap/static] ${routes.length} rotas estáticas`)
  
    return routes
  })