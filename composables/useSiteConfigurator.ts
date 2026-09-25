// composables/useSiteConfigurator.ts
//
// Estado do configurador "site já pronto" (etapa 4). Só em memória: nada vai
// para localStorage, cookie ou API.
//
// O estado tem duas metades, e a separação é o produto:
//   - identity: o que é do visitante (nome, logo, foto do topo e visual).
//     Sobrevive à troca de modelo — "escolhi um site pronto e só coloquei
//     meus dados";
//   - content: cópia independente (structuredClone) do conteúdo do modelo
//     escolhido. A troca de modelo substitui tudo.
//
// Um campo da identidade que o visitante NÃO mexeu segue o modelo: trocar da
// Reabilitação para a Profissional sem ter editado o nome mostra o nome do
// modelo Profissional. O visual (estilo, cor, fonte, cantos) é um grupo: mexeu
// em qualquer um, o visual inteiro é do visitante.
//
// Toda entrada é tratada como não confiável: texto com limite de tamanho e sem
// caractere de controle, cor só via normalizeHex, estilo/fonte/cantos só das
// listas do theme.ts, imagem só `blob:` (useLocalImage), categoria só uma que
// já existe no modelo. Qualquer edição mantém o SiteContent válido.
import { computed, reactive, readonly, ref, shallowRef } from 'vue'
import {
  SITE_DURATIONS_MIN,
  SITE_MAX_PRICE,
  SITE_TEXT_LIMITS,
  type SegmentSiteModels,
  type SiteContent,
  type SiteModel,
  type SiteService,
} from '~/data/siteModels/types'
import {
  THEME_FONT_IDS,
  THEME_PRESET_IDS,
  THEME_PRESETS,
  THEME_RADIUS_IDS,
  normalizeHex,
  type ThemeFontId,
  type ThemePresetId,
  type ThemeRadiusId,
  type WebsiteTheme,
} from '~/utils/theme'
import { fillPlaceholders, siteModelToPreview, type PlaceholderValues } from '~/utils/siteModelPreview'
import type { PreviewSiteData } from '~/utils/sitePreview'

/** Teto do catálogo no configurador (o preview fica legível; o painel não tem esse limite). */
export const SITE_MAX_SERVICES = 12

export const SWITCH_MODEL_CONFIRM = 'Trocar de modelo substitui textos e serviços. Continuar?'

/** Limites dos campos editáveis (os de conteúdo vêm de SITE_TEXT_LIMITS). */
export const CONFIGURATOR_LIMITS = {
  businessName: SITE_TEXT_LIMITS.businessName,
  heroText: SITE_TEXT_LIMITS.heroText,
  tagline: SITE_TEXT_LIMITS.tagline,
  about: SITE_TEXT_LIMITS.about,
  serviceName: SITE_TEXT_LIMITS.serviceName,
  professionalName: SITE_TEXT_LIMITS.professionalName,
  professionalRole: SITE_TEXT_LIMITS.professionalRole,
  phone: 20,
  whatsapp: 20,
  street: 100,
  neighborhood: 60,
  city: 60,
  state: 2,
} as const

export interface SiteIdentity {
  businessName: string
  /** objectURL (`blob:`) do upload local; null = sem logo (o site mostra o nome). */
  logo: string | null
  /** objectURL (`blob:`) do upload local; null = a foto do modelo. */
  heroImage: string | null
  /** null = a cor do estilo (presetBrandColors), como no admin. */
  primaryColor: string | null
  preset: ThemePresetId
  font: ThemeFontId
  radius: ThemeRadiusId
}

/** O que o CTA (ConversionCard) entrega à página: slug, segmento real e modelo. */
export interface ConversionStart {
  segment: SegmentSiteModels['segment']
  segmentType: SegmentSiteModels['segmentType']
  modelId: string
}

/** Largura da moldura do preview (PreviewFrame): 390px ou 1280px. */
export type PreviewDevice = 'mobile' | 'desktop'

export type SiteTextField = 'heroText' | 'tagline' | 'about'
/** Preço aceita número ou o texto digitado ("150,00"). */
export type ServicePatch = Partial<{ name: string; price: number | string; categoryId: string }>
export type ProfessionalPatch = Partial<{ name: string; role: string }>
export type ContactPatch = Partial<{
  phone: string
  whatsapp: string
  street: string
  neighborhood: string
  city: string
  state: string
}>

// ─── Regras puras ────────────────────────────────────────────────────────────

const VISUAL_KEYS = ['primaryColor', 'preset', 'font', 'radius'] as const

/** Identidade que o modelo sugere (o ponto de partida do visitante). */
export function identityOf(model: SiteModel): SiteIdentity {
  return {
    businessName: model.content.businessName,
    logo: null,
    heroImage: null,
    primaryColor: normalizeHex(model.theme.primaryColor),
    preset: model.theme.preset,
    font: model.theme.font,
    radius: model.theme.radius,
  }
}

export function cloneContent(model: SiteModel): SiteContent {
  return structuredClone(model.content)
}

// Caracteres de controle (inclui quebra de linha: todo campo vira UMA linha no
// site — o /sobre do WL é um único <p>).
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u001f\u007f]+/g

/** Texto limpo e cortado no limite, ou null se não for texto. */
export function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  return value.replace(CONTROL_RE, ' ').slice(0, max)
}

/**
 * Preço digitado ("150", "150,5", "1.234,56", 99.9) → número com 2 casas, ou
 * null. Precisa ser > 0 e caber em services.price (DECIMAL(6,2)): o card do WL
 * sempre mostra o preço, 0 vira "R$ 0,00".
 */
export function parsePrice(value: unknown): number | null {
  let n: number
  if (typeof value === 'number') n = value
  else if (typeof value === 'string') {
    const v = value.trim().replace(/^R\$\s*/i, '')
    if (/^\d{1,3}(\.\d{3})+(,\d{0,2})?$/.test(v)) n = Number(v.replace(/\./g, '').replace(',', '.'))
    else if (/^\d+(,\d{0,2})?$/.test(v)) n = Number(v.replace(',', '.'))
    else if (/^\d+(\.\d{0,2})?$/.test(v)) n = Number(v)
    else return null
  } else return null
  if (!Number.isFinite(n)) return null
  n = Math.round(n * 100) / 100
  return n > 0 && n <= SITE_MAX_PRICE ? n : null
}

function isOneOf<T extends string>(list: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && (list as readonly string[]).includes(value)
}

/** Só objectURL local: nada de URL arbitrária (externa, data:, javascript:). */
export function isLocalImageUrl(value: unknown): value is string {
  return typeof value === 'string' && /^blob:/.test(value)
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  const ka = Object.keys(a)
  const kb = Object.keys(b)
  if (ka.length !== kb.length) return false
  return ka.every(k => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]))
}

// ─── Composable ──────────────────────────────────────────────────────────────

export interface UseSiteConfiguratorOptions {
  /** Modelo inicial (id); padrão: o 1º do segmento. */
  initialModelId?: string
  /** Com agenda (true) ou "Só Site" (false, padrão: o produto da vitrine). */
  canBook?: boolean
}

export function useSiteConfigurator(segment: SegmentSiteModels, options: UseSiteConfiguratorOptions = {}) {
  const findModel = (id: string | undefined) => segment.models.find(m => m.id === id)
  const first = findModel(options.initialModelId) ?? segment.models[0]

  const modelId = ref(first.id)
  const identity = reactive<SiteIdentity>(identityOf(first))
  const content = shallowRef<SiteContent>(cloneContent(first))
  const canBook = ref(options.canBook ?? false)

  const model = computed(() => findModel(modelId.value) ?? first)

  // O conteúdo é trocado inteiro a cada edição (shallowRef + cópia): o
  // original do modelo nunca é tocado e o preview recalcula uma vez por edição.
  function patchContent(fn: (draft: SiteContent) => void) {
    const draft = structuredClone(content.value)
    fn(draft)
    content.value = draft
  }

  // ── dirty ──
  const contentDirty = computed(() => !deepEqual(content.value, model.value.content))
  const identityDirty = computed(() => !deepEqual({ ...identity }, identityOf(model.value)))
  /** Algo difere do modelo selecionado como ele veio (identidade ou conteúdo). */
  const dirty = computed(() => contentDirty.value || identityDirty.value)
  /** Trocar de modelo agora perderia edições de conteúdo. */
  const needsSwitchConfirm = contentDirty

  // ── modelo ──

  /**
   * Troca o modelo. Com conteúdo editado, pergunta antes (`confirm` recebe
   * SWITCH_MODEL_CONFIRM; sem `confirm`, troca direto). Devolve se trocou.
   */
  function selectModel(id: string, confirm?: (message: string) => boolean): boolean {
    const next = findModel(id)
    if (!next) return false
    if (next.id === modelId.value) return true
    if (contentDirty.value && confirm && !confirm(SWITCH_MODEL_CONFIRM)) return false

    const before = identityOf(model.value)
    const after = identityOf(next)
    if (identity.businessName === before.businessName) identity.businessName = after.businessName
    const visualTouched = VISUAL_KEYS.some(k => identity[k] !== before[k])
    if (!visualTouched) for (const k of VISUAL_KEYS) (identity as Record<string, unknown>)[k] = after[k]
    // logo e foto: só existem se o visitante enviou — ficam.

    modelId.value = next.id
    content.value = cloneContent(next)
    return true
  }

  /** Volta ao modelo selecionado como ele veio (identidade e conteúdo). */
  function reset() {
    Object.assign(identity, identityOf(model.value))
    content.value = cloneContent(model.value)
  }

  // ── identidade ──

  function setBusinessName(value: unknown) {
    const v = cleanText(value, CONFIGURATOR_LIMITS.businessName)
    if (v !== null) identity.businessName = v
  }

  /** Hex válido vira a cor da marca; null/'' volta à cor do estilo; o resto é ignorado. */
  function setPrimaryColor(value: unknown): boolean {
    if (value === null || value === '') {
      identity.primaryColor = null
      return true
    }
    const hex = normalizeHex(value)
    if (!hex) return false
    identity.primaryColor = hex
    return true
  }

  /**
   * Aplicar um estilo, como no editor do admin: fonte e cantos dele e a cor da
   * marca dele (a cor escolhida antes some — é o que o site real faria).
   */
  function setPreset(value: unknown) {
    if (!isOneOf(THEME_PRESET_IDS, value)) return
    const preset = THEME_PRESETS[value]
    identity.preset = value
    identity.font = preset.font
    identity.radius = preset.radius
    identity.primaryColor = null
  }

  function setFont(value: unknown) {
    if (isOneOf(THEME_FONT_IDS, value)) identity.font = value
  }

  function setRadius(value: unknown) {
    if (isOneOf(THEME_RADIUS_IDS, value)) identity.radius = value
  }

  function setLogo(url: string | null) {
    if (url === null || isLocalImageUrl(url)) identity.logo = url
  }

  function setHeroImage(url: string | null) {
    if (url === null || isLocalImageUrl(url)) identity.heroImage = url
  }

  // ── textos ──

  /** Valores de {negocio}/{cidade}: nome do visitante e cidade do contato. */
  const placeholderValues = computed<PlaceholderValues>(() => ({
    negocio: identity.businessName.trim() || model.value.content.businessName,
    cidade: content.value.unit.city.trim() || model.value.content.unit.city,
  }))

  /**
   * Texto como o visitante o vê (placeholders já trocados). Enquanto ele não
   * edita, o texto acompanha o nome; depois de editado, é o texto dele.
   */
  function textOf(field: SiteTextField): string {
    const v = placeholderValues.value
    if (field === 'about') return content.value.about.map(p => fillPlaceholders(p, v)).join(' ')
    return fillPlaceholders(content.value[field], v)
  }

  function setText(field: SiteTextField, value: unknown) {
    if (field !== 'heroText' && field !== 'tagline' && field !== 'about') return
    const v = cleanText(value, CONFIGURATOR_LIMITS[field])
    if (v === null) return
    patchContent((c) => {
      if (field === 'about') c.about = [v]
      else c[field] = v
    })
  }

  // ── serviços ──

  const canAddService = computed(() => content.value.services.length < SITE_MAX_SERVICES)
  const canRemoveService = computed(() => content.value.services.length > 1)

  /** Aplica só o que for válido do patch; o resto do serviço fica como está. */
  function updateService(index: number, patch: ServicePatch): boolean {
    if (!Number.isInteger(index) || !content.value.services[index] || !patch || typeof patch !== 'object') return false
    const next: Partial<SiteService> = {}
    if ('name' in patch) {
      const name = cleanText(patch.name, CONFIGURATOR_LIMITS.serviceName)
      if (name !== null) next.name = name
    }
    if ('price' in patch) {
      const price = parsePrice(patch.price)
      if (price !== null) next.price = price
    }
    if ('categoryId' in patch && content.value.categories.some(c => c.id === patch.categoryId)) {
      next.categoryId = patch.categoryId
    }
    if (!Object.keys(next).length) return false
    patchContent((c) => { Object.assign(c.services[index], next) })
    return true
  }

  /** Remove o serviço; o catálogo nunca fica vazio. */
  function removeService(index: number): boolean {
    if (!Number.isInteger(index) || !content.value.services[index] || !canRemoveService.value) return false
    patchContent((c) => { c.services.splice(index, 1) })
    return true
  }

  /**
   * Novo serviço no fim, na categoria do último (sempre uma que já existe no
   * modelo — o editor não cria categoria). Devolve o índice, ou -1 no limite.
   */
  function addService(): number {
    if (!canAddService.value) return -1
    const c = content.value
    const last = c.services[c.services.length - 1]
    const categoryId = last && c.categories.some(k => k.id === last.categoryId) ? last.categoryId : c.categories[0]?.id
    if (!categoryId) return -1
    const service: SiteService = {
      name: 'Novo serviço',
      description: '',
      price: last?.price ?? 100,
      durationMin: last && (SITE_DURATIONS_MIN as readonly number[]).includes(last.durationMin) ? last.durationMin : 60,
      categoryId,
    }
    patchContent((d) => { d.services.push(service) })
    return content.value.services.length - 1
  }

  // ── profissionais ──

  function updateProfessional(index: number, patch: ProfessionalPatch): boolean {
    if (!Number.isInteger(index) || !content.value.professionals[index] || !patch || typeof patch !== 'object') return false
    const name = 'name' in patch ? cleanText(patch.name, CONFIGURATOR_LIMITS.professionalName) : null
    const role = 'role' in patch ? cleanText(patch.role, CONFIGURATOR_LIMITS.professionalRole) : null
    if (name === null && role === null) return false
    patchContent((c) => {
      const p = c.professionals[index]
      if (name !== null) p.name = name
      if (role !== null) p.role = role
    })
    return true
  }

  // ── contato ──

  function updateContact(patch: ContactPatch): boolean {
    if (!patch || typeof patch !== 'object') return false
    const read = (key: keyof ContactPatch) => (key in patch ? cleanText(patch[key], CONFIGURATOR_LIMITS[key]) : null)
    const phone = read('phone')
    // WhatsApp: só dígitos e pontuação de telefone; o site valida o número
    // (normalizeBrWhatsapp) e esconde os botões se ele não for um celular BR.
    const whatsapp = read('whatsapp')
    const street = read('street')
    const neighborhood = read('neighborhood')
    const city = read('city')
    // UF: só letras, maiúsculas, 2 (filtra antes de cortar: "S1P" → "SP").
    const rawState = 'state' in patch ? cleanText(patch.state, 20) : null
    const state = rawState === null ? null : rawState.replace(/[^a-zA-Z]/g, '').slice(0, CONFIGURATOR_LIMITS.state).toUpperCase()
    if ([phone, whatsapp, street, neighborhood, city, state].every(v => v === null)) return false
    patchContent((c) => {
      if (phone !== null) c.unit.phone = phone
      if (whatsapp !== null) c.whatsapp = whatsapp.replace(/[^\d\s().+-]/g, '')
      if (street !== null) c.unit.street = street
      if (neighborhood !== null) c.unit.neighborhood = neighborhood
      if (city !== null) c.unit.city = city
      if (state !== null) c.unit.state = state
    })
    return true
  }

  // ── preview ──

  /** Tema no formato de websites.theme (só ids das listas do theme.ts). */
  const theme = computed<WebsiteTheme>(() => ({ preset: identity.preset, font: identity.font, radius: identity.radius }))

  /** Dados do PreviewSite: o conteúdo com a identidade do visitante por cima. */
  const preview = computed<PreviewSiteData>(() => {
    const data = siteModelToPreview({ ...model.value, content: content.value }, segment, {
      canBook: canBook.value,
      values: placeholderValues.value,
    })
    data.logo = identity.logo
    data.heroImage = identity.heroImage ?? content.value.heroImage
    return data
  })

  return {
    segment,
    models: segment.models,
    modelId: computed(() => modelId.value),
    model,
    /** Só leitura: toda mudança passa pelos setters (validação). */
    identity: readonly(identity),
    content: computed(() => content.value),
    canBook,
    dirty,
    contentDirty,
    identityDirty,
    needsSwitchConfirm,
    canAddService,
    canRemoveService,
    theme,
    preview,
    placeholderValues,
    selectModel,
    reset,
    setBusinessName,
    setPrimaryColor,
    setPreset,
    setFont,
    setRadius,
    setLogo,
    setHeroImage,
    textOf,
    setText,
    updateService,
    removeService,
    addService,
    updateProfessional,
    updateContact,
  }
}

export type SiteConfigurator = ReturnType<typeof useSiteConfigurator>
