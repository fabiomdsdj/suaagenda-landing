// server/api/sitemap/site-models.ts
//
// Páginas /site-para-<segmento> (configurador "site já pronto"). Vem do
// registro data/siteModels: segmento novo entra no sitemap sozinho.
import { siteModelPaths } from '~/data/siteModels'

export default defineEventHandler(() => siteModelPaths())
