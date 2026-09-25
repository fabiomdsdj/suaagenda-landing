// utils/siteModelPreview.ts
//
// Ponte entre um modelo de site (data/siteModels) e o preview
// (components/site-preview): troca os placeholders e converte o conteúdo
// para o formato que o white-label recebe da API (PreviewSiteData).
import type { SegmentSiteModels, SiteContent, SiteModel } from '~/data/siteModels/types'
import type { PreviewSiteData } from './sitePreview'

export interface PlaceholderValues {
  negocio: string
  cidade: string
}

/** Troca {negocio} e {cidade}. Placeholder desconhecido fica como está. */
export function fillPlaceholders(text: string, values: PlaceholderValues): string {
  return text.replace(/\{(negocio|cidade)\}/g, (_, key: keyof PlaceholderValues) => values[key])
}

/** Valores padrão: os do próprio modelo (nome do negócio e cidade da unidade). */
export function placeholderValuesOf(content: SiteContent): PlaceholderValues {
  return { negocio: content.businessName, cidade: content.unit.city }
}

/**
 * Texto do /sobre como o WL o recebe: website.description é UM campo, e o
 * sobre.vue o mostra num único <p> (quebra de linha não aparece). Por isso os
 * parágrafos viram uma frase corrida separada por espaço.
 */
export function aboutAsDescription(about: string[], values: PlaceholderValues): string {
  return about.map(p => fillPlaceholders(p, values).trim()).filter(Boolean).join(' ')
}

/**
 * Modelo → dados do preview. Ids numéricos estáveis (ordem no modelo), como os
 * que a API devolveria depois de o conteúdo ser criado no cadastro.
 */
export function siteModelToPreview(
  model: SiteModel,
  segment: Pick<SegmentSiteModels, 'segmentType' | 'label'>,
  options: { canBook?: boolean; values?: PlaceholderValues } = {},
): PreviewSiteData {
  const c = model.content
  const values = options.values ?? placeholderValuesOf(c)
  const categoryIds = new Map(c.categories.map((cat, i) => [cat.id, i + 1]))

  return {
    name: values.negocio,
    logo: null,
    heroText: fillPlaceholders(c.heroText, values),
    heroSubText: fillPlaceholders(c.tagline, values),
    heroImage: c.heroImage,
    description: aboutAsDescription(c.about, values),
    segment: { name: segment.segmentType, label: segment.label },
    whatsapp: c.whatsapp,
    canBook: options.canBook ?? false,
    services: c.services.map((s, i) => {
      const cat = c.categories.find(k => k.id === s.categoryId)
      return {
        id: i + 1,
        name: s.name,
        description: s.description,
        price: s.price,
        durationMs: s.durationMin * 60_000,
        categories: cat ? [{ id: categoryIds.get(cat.id)!, name: cat.name, image: cat.image }] : [],
      }
    }),
    // `role` fica de fora: a API pública não o expõe, o site real não o mostra.
    employees: c.professionals.map((p, i) => ({ id: i + 1, fullName: p.name, avatar: p.avatar })),
    units: [{
      id: 1,
      // O modelo não tem nome de unidade; o WL o mostra no /sobre, no
      // /localizacao e no rodapé. Usa o nome do negócio.
      name: values.negocio,
      address: c.unit.street,
      neighborhood: c.unit.neighborhood,
      city: values.cidade,
      state: c.unit.state,
      phone: c.unit.phone,
      availabilities: c.unit.hours.flatMap(h =>
        h.days.map(day => ({ dayOfWeek: day, startTime: `${h.open}:00`, endTime: `${h.close}:00` })),
      ),
    }],
  }
}
