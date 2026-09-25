// data/siteModels/types.ts
//
// Modelos de "site já pronto" por segmento. Cada segmento tem exatamente 3
// modelos; um modelo = tema do WL (ids de utils/theme.ts, cópia do WL) +
// conteúdo completo. O layout do site real é fixo: os modelos diferem só em
// tema e conteúdo, nunca na ordem das seções.
//
// Onde cada campo aparece no WL (utils/siteModelPreview.ts faz a ponte):
//   businessName → tenant.officeName (header, rodapé, textos gerados)
//   heroText     → website.heroText (h1 do topo)
//   tagline      → website.heroSubText (subtítulo do topo)
//   heroImage    → website.heroImages[0]
//   about        → website.description (1º parágrafo do /sobre)
//   categories   → ServiceCategory (nome + imagem do card de serviço)
//   services     → Service (nome, descrição, preço, Duration, categoria)
//   professionals→ Employee (nome e foto; `role` NÃO aparece no site hoje)
//   unit         → Unit + UnitAvailability ("Onde estamos", /localizacao)
//   whatsapp     → website.whatsapp (CTAs do "Só Site")
import type { ThemeFontId, ThemePresetId, ThemeRadiusId } from '~/utils/theme'

/**
 * Slug público da landing (/site-para-<slug>) → segmento REAL do sistema.
 * O segmento é o `name` de `segment_types` (fonte da verdade: API, seed
 * 20260219223812-seed-segment_types; prod: physio = id 9, "Fisioterapia").
 * É por esse name que a API acha o segmento e os service_templates dele
 * (GET /service-templates/:segmentType). O id numérico não entra aqui: ele
 * muda entre bancos.
 *   fisioterapia → physio
 *   barbearia    → barber
 * O `modelo` (SiteModel.id) é só da landing: o sistema não tem entidade de
 * modelo de site, e service_templates é uma lista plana por segmento. No
 * cadastro, a API aplica o tema e os textos do modelo ao site do cliente
 * (utils/siteModelSeed.ts → scripts/sync-site-models.sh → API).
 */
export type SiteModelSegmentId = 'fisioterapia' | 'barbearia'
export type SegmentTypeName = 'physio' | 'barber'

export interface SiteModelTheme {
  preset: ThemePresetId
  font: ThemeFontId
  radius: ThemeRadiusId
  /** Cor da marca; sem ela vale a do preset (presetBrandColors). */
  primaryColor?: string
}

export interface SiteCategory {
  /** Id local do modelo (kebab-case), referenciado por services[].categoryId. */
  id: string
  name: string
  /** public_id no Cloudinary da landing (ver SITE_MODEL_IMAGE_RE). */
  image: string
}

export interface SiteService {
  name: string
  description: string
  /** Reais, > 0: o ServiceCard do WL sempre mostra o preço (0 vira "R$ 0,00"). */
  price: number
  /** Uma das durações da tabela `durations` (SITE_DURATIONS_MIN). */
  durationMin: number
  categoryId: string
}

export interface SiteProfessional {
  name: string
  /** Guardado para o futuro: a API pública de profissionais não expõe cargo. */
  role: string
  avatar: string
}

export interface SiteHours {
  /** 0 = domingo … 6 = sábado (UnitAvailability.dayOfWeek). */
  days: number[]
  /** "HH:MM" */
  open: string
  close: string
}

export interface SiteUnit {
  /** Logradouro e número, como o campo `address` da unidade. */
  street: string
  neighborhood: string
  city: string
  /** UF — o WL usa em "em Bairro, Cidade - UF" (home, /sobre, /localizacao). */
  state: string
  phone: string
  hours: SiteHours[]
}

export interface SiteContent {
  businessName: string
  tagline: string
  heroText: string
  heroImage: string
  /** Parágrafos do /sobre. No WL viram UM parágrafo (description, ≤ 300). */
  about: string[]
  categories: SiteCategory[]
  services: SiteService[]
  professionals: SiteProfessional[]
  unit: SiteUnit
  /** Celular BR, 11 dígitos (DDD + 9 + 8), sem +55. */
  whatsapp: string
}

export interface SiteModel {
  /** kebab-case, único no segmento. */
  id: string
  label: string
  pitch: string
  theme: SiteModelTheme
  content: SiteContent
}

export interface SiteModelSeo {
  title: string
  description: string
  h1: string
  intro: string
  sections: { h2: string; body: string }[]
  faq: { q: string; a: string }[]
}

export interface SegmentSiteModels {
  segment: SiteModelSegmentId
  /** `segment_types.name` do segmento real (ver SiteModelSegmentId). */
  segmentType: SegmentTypeName
  /** Igual ao `segment_types.label` (prod: "Fisioterapia"). */
  label: string
  /**
   * true = catálogo só de visualização: a página mostra os modelos, o preview
   * e o CTA, sem o editor. A personalização fica no admin. Ausente = com
   * editor (fisioterapia, comportamento da etapa 4).
   */
  previewOnly?: boolean
  models: [SiteModel, SiteModel, SiteModel]
  seo: SiteModelSeo
}

// ─── Regras compartilhadas pelos dados e pelos testes ────────────────────────

/** Durações da tabela `durations` (seed 20250516001623), em minutos. */
export const SITE_DURATIONS_MIN = [15, 30, 45, 60, 90, 120, 150, 180] as const

/** services.price é DECIMAL(6,2). */
export const SITE_MAX_PRICE = 9999.99

/**
 * Limites de texto. Os de banco/admin são duros; os demais são de layout
 * (o texto cabe no card/título do WL sem quebrar feio).
 */
export const SITE_TEXT_LIMITS = {
  businessName: 60,     // officeName: header text-2xl numa linha no celular
  heroText: 80,         // h1 do topo (text-5xl no desktop)
  tagline: 140,         // heroSubText (varchar 255; admin maxlength 255)
  about: 300,           // description: admin maxlength 300 (soma dos parágrafos + espaços)
  categoryName: 40,
  serviceName: 60,      // services.name varchar 255; título do card
  serviceDescription: 140, // services.description varchar 255; card corta em 2 linhas
  professionalName: 60,
  professionalRole: 60,
  label: 30,
  pitch: 120,
  seoTitle: 60,
  seoDescription: 160,
  seoH1: 80,
} as const

/** Placeholders trocados pela identidade do visitante (fillPlaceholders). */
export const SITE_PLACEHOLDERS = ['{negocio}', '{cidade}'] as const
export type SitePlaceholder = (typeof SITE_PLACEHOLDERS)[number]

/** Campos de conteúdo em que placeholder faz sentido (texto de apresentação). */
export const SITE_PLACEHOLDER_FIELDS = ['heroText', 'tagline', 'about'] as const

/**
 * Imagem = public_id no Cloudinary da landing, na pasta do segmento/modelo.
 * Os arquivos ainda NÃO foram enviados: até o upload, o preview cai no estado
 * "sem imagem" do WL (gradiente, "Sem foto", iniciais).
 */
export const SITE_MODEL_IMAGE_RE = /^suaagenda\/site-models\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/
