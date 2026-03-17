import {
  getAllNeighborhoodRoutes,
  getAllServiceRoutes,
  getAllCityRoutes,
  getAllUFRoutes,
} from '~/data/locations'

import { getAllBarbershopRoutes } from '~/data/barbershops'

export default defineEventHandler(() => {
  return [
    ...getAllUFRoutes(),
    ...getAllCityRoutes(),
    ...getAllNeighborhoodRoutes(),
    ...getAllServiceRoutes(),
    ...getAllBarbershopRoutes()
  ]
})