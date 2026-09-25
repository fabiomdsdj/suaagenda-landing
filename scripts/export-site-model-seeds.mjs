// scripts/export-site-model-seeds.mjs — gera o JSON da base inicial dos
// modelos de site (utils/siteModelSeed.ts) que a API aplica no cadastro.
//
//   node --experimental-strip-types scripts/export-site-model-seeds.mjs [saida.json]
//
// Sem argumento, escreve no stdout. Quem chama é scripts/sync-site-models.sh
// (raiz), que grava/confere a cópia em api/app/data/siteModelSeeds.json.
// Segmentos = registro data/siteModels/index.ts; o arquivo de cada um é
// data/siteModels/<slug>.ts (a mesma convenção do import() do registro).
import { writeFileSync } from 'node:fs'
import { SITE_MODEL_SEGMENTS } from '../data/siteModels/index.ts'
import { buildSiteModelSeeds } from '../utils/siteModelSeed.ts'

const segments = []
for (const slug of Object.keys(SITE_MODEL_SEGMENTS)) {
  const mod = await import(`../data/siteModels/${slug}.ts`)
  segments.push(mod.default)
}

const json = `${JSON.stringify({
  _comment: 'GERADO por landing/scripts/export-site-model-seeds.mjs (scripts/sync-site-models.sh). Não editar: a fonte é landing/data/siteModels.',
  segments: buildSiteModelSeeds(segments),
}, null, 2)}\n`

const out = process.argv[2]
if (out) writeFileSync(out, json)
else process.stdout.write(json)
