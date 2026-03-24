// scripts/export-locations.ts
// npx tsx scripts/export-locations.ts > scripts/locations-export.json

import { allCities } from '../data/locations'

process.stdout.write(JSON.stringify(allCities, null, 2))
process.stdout.write('\n')

const totalDistricts     = allCities.reduce((acc, c) => acc + c.districts.length, 0)
const totalNeighborhoods = allCities.reduce(
  (acc, c) => acc + c.districts.reduce((a, d) => a + d.neighborhoods.length, 0), 0
)

process.stderr.write(`\n✅ Cidades: ${allCities.length} | Distritos: ${totalDistricts} | Bairros: ${totalNeighborhoods}\n`)