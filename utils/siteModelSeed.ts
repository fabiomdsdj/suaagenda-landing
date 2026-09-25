// utils/siteModelSeed.ts
//
// Base inicial do site do cliente: o que do modelo escolhido na landing vai
// para o `websites` no cadastro. A fonte continua sendo data/siteModels; a API
// recebe uma cópia gerada (scripts/sync-site-models.sh → app/data/
// siteModelSeeds.json) e a aplica em registerTenantService, trocando
// {negocio} pelo nome do negócio do cadastro.
//
// Vai para o site: tema (preset, fonte, cantos, cor) e textos de apresentação
// (heroText, heroSubText, description) — os mesmos campos que o admin edita em
// Configuração do Site. NÃO vai: telefone, WhatsApp, endereço, horários,
// profissionais e serviços de exemplo (dados fictícios) nem imagens (ainda não
// enviadas ao Cloudinary do site).
//
// Sem import de runtime (só `import type`): o export roda em Node puro
// (node --experimental-strip-types), fora do Nuxt.
import type { SegmentSiteModels, SiteModel, SiteModelTheme } from '~/data/siteModels/types'

export interface SiteModelSeed {
  theme: Pick<SiteModelTheme, 'preset' | 'font' | 'radius'>
  primaryColor?: string
  /** website.heroText; pode conter {negocio}. */
  heroText: string
  /** website.heroSubText; pode conter {negocio}. */
  heroSubText: string
  /** website.description (um parágrafo, como no WL); pode conter {negocio}. */
  description: string
}

/** segment_types.name → id do modelo → base do site. */
export type SiteModelSeeds = Record<string, Record<string, SiteModelSeed>>

/**
 * A cidade não é pedida no cadastro. "… em {cidade}" sai do texto:
 *   "Barbearia tradicional em {cidade}, com …" → "Barbearia tradicional, com …"
 *   "Atendo em consultório e em domicílio, em {cidade}." → "… em domicílio."
 */
const CITY_RE = /,?\s+em \{cidade\}/g

export function withoutCity(text: string): string {
  const out = text.replace(CITY_RE, '')
  if (out.includes('{cidade}')) {
    throw new Error(`{cidade} fora do padrão "em {cidade}": ${text}`)
  }
  return out
}

/** Mesma regra de aboutAsDescription (siteModelPreview.ts): um parágrafo só. */
function joinAbout(about: string[]): string {
  return about.map(p => withoutCity(p).trim()).filter(Boolean).join(' ')
}

export function siteModelSeed(model: SiteModel): SiteModelSeed {
  const { preset, font, radius, primaryColor } = model.theme
  return {
    theme: { preset, font, radius },
    ...(primaryColor ? { primaryColor } : {}),
    heroText: withoutCity(model.content.heroText),
    heroSubText: withoutCity(model.content.tagline),
    description: joinAbout(model.content.about),
  }
}

export function buildSiteModelSeeds(segments: SegmentSiteModels[]): SiteModelSeeds {
  const out: SiteModelSeeds = {}
  for (const seg of segments) {
    if (out[seg.segmentType]) throw new Error(`segmentType repetido: ${seg.segmentType}`)
    out[seg.segmentType] = Object.fromEntries(seg.models.map(m => [m.id, siteModelSeed(m)]))
  }
  return out
}
