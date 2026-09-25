// data/siteModels/index.ts
//
// Registro dos segmentos com modelos de site. SÓ o registro: cada segmento é
// importado sob demanda e vira um chunk próprio — quem abre fisioterapia não
// baixa os modelos de outro segmento. Nada de conteúdo compartilhado aqui.
import type { SegmentSiteModels, SiteModelSegmentId } from './types'

export const SITE_MODEL_SEGMENTS: Record<SiteModelSegmentId, () => Promise<{ default: SegmentSiteModels }>> = {
  fisioterapia: () => import('./fisioterapia'),
}

export function isSiteModelSegment(value: unknown): value is SiteModelSegmentId {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(SITE_MODEL_SEGMENTS, value)
}

/** Modelos do segmento, ou null para slug desconhecido (a página responde 404). */
export async function loadSiteModels(segment: string): Promise<SegmentSiteModels | null> {
  if (!isSiteModelSegment(segment)) return null
  return (await SITE_MODEL_SEGMENTS[segment]()).default
}

/** Rota pública do segmento (pages/site-para-[segmento].vue). */
export function siteModelPath(segment: SiteModelSegmentId): string {
  return `/site-para-${segment}`
}

/** Rotas públicas de todos os segmentos com modelos — fonte do sitemap. */
export function siteModelPaths(): string[] {
  return (Object.keys(SITE_MODEL_SEGMENTS) as SiteModelSegmentId[]).map(siteModelPath)
}
