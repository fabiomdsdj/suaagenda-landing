// utils/sitePreview.ts
//
// Regras puras do preview "site já pronto" (components/site-preview). Cada
// função aqui ESPELHA uma regra do white-label, para o preview mostrar o que o
// site real mostraria com os mesmos dados — nunca mais, nunca menos:
//
//   formatCurrency / formatDuration     ← white-label/utils/formatters.ts
//   groupOpeningHours / formatOpeningHours / formatUnitAddress / telHref
//                                       ← white-label/utils/publicSite.ts
//   normalizeBrWhatsapp                 ← white-label/utils/whatsapp.ts
//   homeTexts                           ← white-label/pages/index.vue (SEO local)
//   aboutTexts                          ← white-label/pages/sobre.vue (seoData)
//   locationTexts                       ← white-label/pages/localizacao.vue
//   footerSeoLinks                      ← white-label/components/common/Footer.vue
//
// Ao mudar a regra no WL, mude aqui também. tests/sitePreview.test.ts compara
// as funções copiadas de utils/*.ts com as originais do WL (quando o WL está no
// mesmo checkout). Sem Nuxt, sem Vue, sem DOM.

// ─── Dados do preview (formato do WL, já sem store/API) ──────────────────────

/** Páginas do site real que o preview sabe desenhar. */
export type PreviewPage = 'inicio' | 'sobre' | 'como-chegar'

export const PREVIEW_PAGES: { id: PreviewPage; label: string; path: string }[] = [
  { id: 'inicio', label: 'Início', path: '/' },
  { id: 'sobre', label: 'Sobre', path: '/sobre' },
  { id: 'como-chegar', label: 'Como chegar', path: '/localizacao' },
]

/** tenantWeb.segment do by-subdomain (segment_types: name + label opcional). */
export interface PreviewSegment {
  name: string
  label?: string | null
}

export interface PreviewCategory {
  id: number
  name: string
  /** URL pronta ou public_id do Cloudinary (resolveImg). */
  image?: string | null
}

export interface PreviewService {
  id: number
  name: string
  description?: string | null
  price: number
  /** duration.milliseconds do WL. */
  durationMs?: number | null
  /** categoryServices do WL (o card usa a 1ª para a imagem). */
  categories: PreviewCategory[]
}

export interface PreviewEmployee {
  id: number
  fullName: string
  avatar?: string | null
}

export interface PreviewAvailability {
  dayOfWeek: number
  startTime: string
  endTime: string
}

export interface PreviewUnit {
  id: number
  name?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  number?: string | null
  neighborhood?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  availabilities?: PreviewAvailability[] | null
}

/** Tudo o que o site real lê do website/tenant/API, já resolvido. */
export interface PreviewSiteData {
  /** tenantWeb.officeName (siteNameOf). */
  name: string
  logo?: string | null
  heroText?: string | null
  heroSubText?: string | null
  /** O WL tem heroImages[] em carrossel; o preview mostra só a primeira. */
  heroImage?: string | null
  /** website.description: 1º parágrafo do /sobre. */
  description?: string | null
  segment?: PreviewSegment | null
  /** website.whatsapp (celular BR); links só com número válido. */
  whatsapp?: string | null
  /** false = "Só Site" (sem agenda): CTAs viram WhatsApp/"Ver detalhes". */
  canBook: boolean
  services: PreviewService[]
  employees: PreviewEmployee[]
  units: PreviewUnit[]
}

// ─── Imagem ──────────────────────────────────────────────────────────────────

/** Cloud da landing (nuxt.config.ts → image.cloudinary.baseURL). */
export const PREVIEW_CLOUDINARY_CLOUD = 'du872kkq0'

export interface ImgOptions {
  width?: number
  height?: number
  cropMode?: string
}

/**
 * Mesma URL do useCloudinaryImg do WL para um public_id; URL absoluta, blob:
 * (upload local do visitante) e data: passam como estão.
 */
export function resolveImg(src: string | null | undefined, options: ImgOptions = {}): string {
  if (!src) return ''
  if (/^(https?:|blob:|data:|\/)/.test(src)) return src
  const { width, height, cropMode = width && height ? 'fill' : 'limit' } = options
  const dims: string[] = []
  if (width) dims.push(`w_${width}`)
  if (height) dims.push(`h_${height}`)
  dims.push(`c_${cropMode}`)
  return `https://res.cloudinary.com/${PREVIEW_CLOUDINARY_CLOUD}/image/upload/f_auto,q_auto,${dims.join(',')}/${src}`
}

/**
 * A imagem já terminou de carregar e falhou? Com SSR, o erro pode acontecer
 * antes da hidratação — o `@error` do Vue ainda não existia e não dispara.
 * Quem usa `@error` para cair no estado "sem imagem" confere isto no mount.
 */
export function imageFailed(img: Pick<HTMLImageElement, 'complete' | 'naturalWidth'> | null | undefined): boolean {
  return !!img && img.complete && img.naturalWidth === 0
}

// ─── formatters.ts ───────────────────────────────────────────────────────────

export function formatCurrency(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num)
}

export function formatDuration(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / (1000 * 60))
  if (minutes < 60) return `${minutes}min`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) return `${hours}h`
  return `${hours}h${remainingMinutes}min`
}

// ─── publicSite.ts (horário e endereço) ──────────────────────────────────────

export interface HoursGroup {
  days: number[]
  ranges: { opens: string; closes: string }[]
}

const DAY_LABELS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]

function hhmm(value: unknown): string | null {
  const m = /^(\d{2}):(\d{2})/.exec(String(value ?? ''))
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (h > 23 || min > 59) return null
  return `${m[1]}:${m[2]}`
}

export function groupOpeningHours(availabilities: PreviewAvailability[] | null | undefined): HoursGroup[] {
  const byDay = new Map<number, Map<string, { opens: string; closes: string }>>()
  for (const a of availabilities || []) {
    const day = Number(a?.dayOfWeek)
    if (!Number.isInteger(day) || day < 0 || day > 6) continue
    const opens = hhmm(a.startTime)
    const closes = hhmm(a.endTime)
    if (!opens || !closes || opens >= closes) continue
    if (!byDay.has(day)) byDay.set(day, new Map())
    byDay.get(day)!.set(`${opens}-${closes}`, { opens, closes })
  }

  const groups: HoursGroup[] = []
  const bySignature = new Map<string, HoursGroup>()
  for (const day of WEEK_ORDER) {
    const ranges = byDay.get(day)
    if (!ranges) continue
    const sorted = [...ranges.values()].sort((x, y) => x.opens.localeCompare(y.opens))
    const signature = sorted.map(r => `${r.opens}-${r.closes}`).join(',')
    const existing = bySignature.get(signature)
    if (existing) existing.days.push(day)
    else {
      const group = { days: [day], ranges: sorted }
      bySignature.set(signature, group)
      groups.push(group)
    }
  }
  return groups
}

function daysLabel(days: number[]): string {
  const idx = days.map(d => WEEK_ORDER.indexOf(d)).sort((a, b) => a - b)
  const runs: number[][] = []
  for (const i of idx) {
    const last = runs[runs.length - 1]
    if (last && i === last[last.length - 1] + 1) last.push(i)
    else runs.push([i])
  }
  const parts = runs.map(run => {
    const first = DAY_LABELS[WEEK_ORDER[run[0]]]
    const lastDay = DAY_LABELS[WEEK_ORDER[run[run.length - 1]]]
    if (run.length === 1) return first
    if (run.length === 2) return `${first} e ${lastDay}`
    return `${first} a ${lastDay}`
  })
  if (parts.length === 1) return parts[0]
  return `${parts.slice(0, -1).join(', ')} e ${parts[parts.length - 1]}`
}

export function formatOpeningHours(
  availabilities: PreviewAvailability[] | null | undefined,
): { days: string; hours: string }[] {
  return groupOpeningHours(availabilities).map(g => ({
    days: daysLabel(g.days),
    hours: g.ranges.map(r => `${r.opens} às ${r.closes}`).join(' e '),
  }))
}

const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim())

export function formatUnitAddress(unit: PreviewUnit): string {
  const street = [clean(unit.address), clean(unit.number)].filter(Boolean).join(', ')
  const cityState = [clean(unit.city), clean(unit.state)].filter(Boolean).join(' - ')
  const place = [clean(unit.neighborhood), cityState].filter(Boolean).join(', ')
  return [street, place].filter(Boolean).join(' — ')
}

export function telHref(phone: string | null | undefined): string | null {
  const raw = clean(phone)
  const digits = raw.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '')
  return digits.replace(/\D/g, '').length >= 8 ? `tel:${digits}` : null
}

// ─── whatsapp.ts ─────────────────────────────────────────────────────────────

const VALID_DDD = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24, 27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
])

export function normalizeBrWhatsapp(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const raw = value.trim()
  if (!raw) return null
  if (/[^\d\s().+-]/.test(raw)) return null
  if (raw.includes('+') && !/^\+\s*55\D*\d/.test(raw)) return null
  if ((raw.match(/\+/g) || []).length > 1) return null

  let digits = raw.replace(/\D/g, '')
  if (raw.startsWith('+') || (digits.length === 13 && digits.startsWith('55'))) {
    if (!digits.startsWith('55')) return null
    digits = digits.slice(2)
  }
  if (digits.length !== 11) return null
  if (!VALID_DDD.has(Number(digits.slice(0, 2)))) return null
  if (digits[2] !== '9') return null
  if (/^(\d)\1{7}$/.test(digits.slice(3))) return null
  return digits
}

/** Número do site válido (useSiteWhatsapp().genericUrl != null). */
export function hasWhatsapp(site: Pick<PreviewSiteData, 'whatsapp'>): boolean {
  return !!normalizeBrWhatsapp(site.whatsapp)
}

/**
 * CTA de WhatsApp no lugar da agenda (cards, "Onde estamos", unidades e CTA
 * final do /sobre): só no "Só Site" e só com número válido. O botão do topo
 * do /sobre é a exceção — aparece com qualquer plano (hasWhatsapp).
 */
export function showsWhatsapp(site: Pick<PreviewSiteData, 'canBook' | 'whatsapp'>): boolean {
  return !site.canBook && hasWhatsapp(site)
}

// ─── Unidades ────────────────────────────────────────────────────────────────

/** O preview não tem unidade inativa: todas as recebidas são ativas. */
function locationParts(unit: PreviewUnit | null, withState: boolean): string[] {
  if (!unit) return []
  return [unit.neighborhood?.trim() || '', unit.city || '', withState ? unit.state || '' : ''].filter(Boolean)
}

function inLocationOf(parts: string[]): string {
  if (parts.length === 3) return `em ${parts[0]}, ${parts[1]} - ${parts[2]}`
  if (parts.length === 2) return `em ${parts[0]} - ${parts[1]}`
  if (parts.length === 1) return `em ${parts[0]}`
  return ''
}

const servicesPhrase = (n: number) => (n === 1 ? '1 serviço' : n > 1 ? `${n} serviços` : '')

// ─── pages/index.vue ─────────────────────────────────────────────────────────

export interface HomeTexts {
  /** null = o banner e o bloco SEO local não aparecem (sem unidade). */
  location: { inLocation: string; hasMultipleUnits: boolean } | null
  headline: string
  subheadline: string
  textTitle: string
  paragraph1: string
  paragraph2: string
}

/** Rótulo do segmento na home, no /localizacao e no rodapé: label || name. */
export function segmentLabelOf(segment: PreviewSegment | null | undefined, fallback = 'Serviços'): string {
  return segment?.label || segment?.name || fallback
}

/**
 * Textos do banner de localização e do bloco "SEO local" da home. Usa o
 * estado final (profissionais já carregados; no WL eles chegam no client).
 */
export function homeTexts(site: PreviewSiteData): HomeTexts {
  const units = site.units
  const primary = units[0] ?? null
  const segmentLabel = segmentLabelOf(site.segment)
  const canBook = site.canBook
  const count = site.services.length
  const employeeCount = site.employees.length

  const location = primary
    ? { inLocation: inLocationOf(locationParts(primary, true)), hasMultipleUnits: units.length > 1 }
    : null

  const suffix = canBook ? ' — Agende Online' : ''
  let headline = `${segmentLabel}${suffix}`
  if (location) {
    headline = location.hasMultipleUnits
      ? `${segmentLabel} ${location.inLocation} — ${units.length} Unidades`
      : `${segmentLabel} ${location.inLocation}${suffix}`
  }

  const services = servicesPhrase(count)
  const agenda = canBook ? ' Escolha o profissional, dia e horário.' : ''
  let subheadline: string
  if (!location) {
    subheadline = services ? `${services} disponíve${count > 1 ? 'is' : 'l'}.${agenda}` : agenda.trim()
  } else {
    const who = [services, employeeCount ? `${employeeCount} profissiona${employeeCount > 1 ? 'is' : 'l'}` : ''].filter(Boolean).join(' e ')
    subheadline = `${who ? `${who} ` : 'Atendimento '}${location.inLocation}.${canBook ? ' Agendamento online rápido e sem filas.' : ''}`
  }

  const place = primary ? primary.neighborhood?.trim() || primary.city || '' : ''
  const textTitle = !location
    ? `${segmentLabel} com Qualidade`
    : place ? `${segmentLabel} em ${place} — Tradição e Qualidade` : `${segmentLabel} — Tradição e Qualidade`

  const name = site.name
  const seg = segmentLabel.toLowerCase()
  let paragraph1: string
  if (!location) {
    paragraph1 = canBook
      ? `${name} oferece ${seg} com profissionais experientes. Agende online, escolhendo o dia e horário ideal para você.`
      : `${name} oferece ${seg} com profissionais experientes. Conheça nossos serviços.`
  } else if (location.hasMultipleUnits) {
    paragraph1 = `${name} atende ${seg} ${location.inLocation}, com ${units.length} unidades.${services ? ` Oferecemos ${services}${canBook ? ', todos disponíveis para agendamento online' : ''}.` : ''}`
  } else {
    paragraph1 = `${name} atende ${seg} ${location.inLocation}, com uma equipe de profissionais qualificados${employeeCount ? ` — ${employeeCount} ao todo` : ''}.${services ? ` São ${services}${canBook ? ' com agendamento online' : ''}.` : ''}`
  }

  let paragraph2 = ''
  if (location && place) {
    const city = primary?.city || ''
    paragraph2 = location.hasMultipleUnits
      ? `Estamos presentes em diversos bairros de ${city}, sempre priorizando localização acessível e conforto para nossos clientes.`
      : canBook
        ? `Localizado em ${place}, nosso espaço foi pensado para oferecer conforto e praticidade. Agende seu horário online.`
        : `Localizado em ${place}, nosso espaço foi pensado para oferecer conforto e praticidade.`
  }

  return { location, headline, subheadline, textTitle, paragraph1, paragraph2 }
}

/**
 * Serviços agrupados por categoria (nome A-Z; serviços A-Z, a ordenação
 * padrão "Nome A-Z" dos filtros). Sem categoria vai para "Outros", no fim.
 */
export function groupServicesByCategory(services: PreviewService[]) {
  const sorted = [...services].sort((a, b) => a.name.localeCompare(b.name))
  const groups = new Map<number, { categoryId: number; categoryName: string; services: PreviewService[] }>()
  const semCategoria: PreviewService[] = []
  for (const service of sorted) {
    if (!service.categories.length) { semCategoria.push(service); continue }
    for (const cat of service.categories) {
      if (!groups.has(cat.id)) groups.set(cat.id, { categoryId: cat.id, categoryName: cat.name, services: [] })
      groups.get(cat.id)!.services.push(service)
    }
  }
  const result = [...groups.values()].sort((a, b) => a.categoryName.localeCompare(b.categoryName))
  if (semCategoria.length) result.push({ categoryId: 0, categoryName: 'Outros', services: semCategoria })
  return result
}

/** Opções do filtro "Todas as categorias" (A-Z, sem repetir). */
export function categoriesFromServices(services: PreviewService[]) {
  const map = new Map<number, string>()
  for (const s of services) for (const c of s.categories) if (!map.has(c.id)) map.set(c.id, c.name)
  return [...map.entries()].map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name))
}

// ─── pages/sobre.vue ─────────────────────────────────────────────────────────

interface Differential { title: string; description: string; icon: string }

const ICON_CALENDAR = 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
const ICON_CHECK = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
const ICON_HEART = 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
const ICON_USER = 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
const ICON_SPARKLES = 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'

interface SegmentCopy {
  label: string
  verb: string
  professionals: string
  differentials: Differential[]
}

/** SEGMENT_MAP do sobre.vue (chave procurada DENTRO do slug do segmento). */
const ABOUT_SEGMENT_MAP: Record<string, SegmentCopy> = {
  barbearia: {
    label: 'Barbearia',
    verb: 'cuidar do visual',
    professionals: 'barbeiros',
    differentials: [
      { title: 'Ambiente masculino', description: 'Espaço pensado para o público masculino com conforto e estilo.', icon: ICON_USER },
      { title: 'Produtos premium', description: 'Utilizamos apenas produtos de alta qualidade para melhor resultado.', icon: ICON_SPARKLES },
      { title: 'Agendamento fácil', description: 'Agende online sem precisar ligar ou comparecer pessoalmente.', icon: ICON_CALENDAR },
      { title: 'Profissionais experientes', description: 'Nossa equipe é treinada e apaixonada pelo que faz.', icon: ICON_CHECK },
    ],
  },
  clinica: {
    label: 'Clínica',
    verb: 'realizar seu procedimento',
    professionals: 'profissionais de saúde',
    differentials: [
      { title: 'Ambiente clínico', description: 'Espaço higienizado e preparado para procedimentos com segurança.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
      { title: 'Profissionais habilitados', description: 'Equipe com certificações e registro nos órgãos competentes.', icon: ICON_CHECK },
      { title: 'Agendamento online', description: 'Agende sua consulta ou procedimento de forma rápida e segura.', icon: ICON_CALENDAR },
      { title: 'Atendimento personalizado', description: 'Cuidado individualizado para cada paciente.', icon: ICON_HEART },
    ],
  },
  salao: {
    label: 'Salão de Beleza',
    verb: 'se cuidar',
    professionals: 'profissionais de beleza',
    differentials: [
      { title: 'Serviços completos', description: 'Cabelo, unhas, estética e muito mais em um só lugar.', icon: ICON_SPARKLES },
      { title: 'Ambiente acolhedor', description: 'Um espaço pensado para você relaxar e sair renovada.', icon: ICON_HEART },
      { title: 'Agendamento online', description: 'Marque seu horário a qualquer hora pelo celular.', icon: ICON_CALENDAR },
      { title: 'Profissionais dedicados', description: 'Nossa equipe está sempre atualizada com as últimas tendências.', icon: ICON_CHECK },
    ],
  },
  estetica: {
    label: 'Estética',
    verb: 'realizar seu tratamento',
    professionals: 'esteticistas',
    differentials: [
      { title: 'Tratamentos modernos', description: 'Técnicas e equipamentos de última geração.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
      { title: 'Resultados comprovados', description: 'Protocolos eficazes para resultados visíveis.', icon: ICON_CHECK },
      { title: 'Agendamento fácil', description: 'Marque sua sessão online sem complicações.', icon: ICON_CALENDAR },
      { title: 'Atendimento exclusivo', description: 'Sessões individuais com total atenção para você.', icon: ICON_HEART },
    ],
  },
}

const ABOUT_DEFAULT_SEGMENT: SegmentCopy = {
  label: 'Agendamento Online',
  verb: 'ser atendido',
  professionals: 'profissionais',
  differentials: [
    { title: 'Agendamento fácil', description: 'Agende pelo celular a qualquer hora.', icon: ICON_CALENDAR },
    { title: 'Confirmação instantânea', description: 'Receba a confirmação imediata pelo WhatsApp.', icon: ICON_CHECK },
    { title: 'Profissionais qualificados', description: 'Equipe experiente e dedicada.', icon: ICON_USER },
    { title: 'Sem filas', description: 'Chega no horário marcado e seja atendido na hora.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ],
}

/** slugify do sobre.vue/Footer.vue (minúsculas antes de tirar acento). */
export function slugifyWl(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function aboutTexts(site: PreviewSiteData) {
  const services = site.services.slice(0, 20)
  const employees = site.employees
  const units = site.units
  const canBook = site.canBook
  const name = site.name

  const raw = site.segment ? site.segment.label || site.segment.name || '' : ''
  const slug = slugifyWl(raw)
  const key = Object.keys(ABOUT_SEGMENT_MAP).find(k => slug.includes(k)) ?? null
  const seg = key ? ABOUT_SEGMENT_MAP[key] : ABOUT_DEFAULT_SEGMENT
  const differentials = seg.differentials.filter(d => canBook || !/agend|confirma|fila/i.test(`${d.title} ${d.description}`))

  const primary = units[0] ?? null
  const parts = locationParts(primary, true)
  const loc = inLocationOf(parts)
  const locStr = parts.join(', ')
  const hasLoc = !!primary?.city

  const categoryNames = new Set<string>()
  for (const s of services) for (const c of s.categories) if (c?.name) categoryNames.add(c.name)
  const categories = [...categoryNames].slice(0, 5)
  const svcs = !categories.length ? '' : categories.length === 1
    ? categories[0]
    : `${categories.slice(0, -1).join(', ')} e ${categories[categories.length - 1]}`
  const hasSvcs = !!svcs
  const prof = seg.professionals

  const h1 = hasLoc ? `${name} — ${seg.label} ${loc}` : `${name} — ${seg.label}`
  const intro = [
    hasSvcs
      ? `${name} é referência em ${svcs}${hasLoc ? ` ${loc}` : ''}.`
      : `${name}${hasLoc ? ` atende ${loc}` : ''}.`,
    canBook ? 'Agende online de forma rápida e sem filas —' : '',
    canBook ? 'escolha o serviço, o profissional e o horário que mais te convém.' : '',
  ].filter(Boolean).join(' ')

  const aboutTitle = `Por que escolher ${hasSvcs ? `a ${name}` : 'a gente'}?`
  const p1 = site.description
    ? site.description
    : `${name} nasceu com um propósito simples: oferecer o melhor atendimento ${hasSvcs ? `em ${svcs}` : ''} ${loc}.`
  const p2 = [
    `Nossa equipe de ${prof}`,
    employees.length ? `— composta por ${employees.length} profissional${employees.length > 1 ? 'is' : ''} —` : '',
    'está pronta para te receber com qualidade, atenção e pontualidade.',
    hasSvcs ? `Aqui você encontra ${svcs} e muito mais.` : '',
  ].filter(Boolean).join(' ')
  const p3 = canBook ? [
    'Com agendamento 100% online, você escolhe o dia e o horário ideal',
    hasLoc ? `sem precisar sair de casa${loc ? ` aqui em ${locStr}` : ''}.` : 'sem precisar ligar.',
    'Confirmação imediata pelo WhatsApp e lembretes automáticos para você nunca perder o horário.',
  ].join(' ') : ''

  const servicesTitle = hasLoc ? `Nossos serviços ${loc}` : 'Conheça nossos serviços'
  const servicesSubtitle = hasSvcs
    ? `Oferecemos ${svcs}${hasLoc ? ` ${loc}` : ''} com profissionais qualificados e preços justos.`
    : canBook ? 'Conheça tudo que oferecemos e agende com facilidade.' : 'Conheça tudo que oferecemos.'

  const teamTitle = `Nossa equipe de ${prof}`
  const teamSubtitle = employees.length
    ? `${employees.length} profissional${employees.length > 1 ? 'is dedicados' : ' dedicado'} a oferecer o melhor para você${hasLoc ? ` ${loc}` : ''}.`
    : 'Conheça quem vai te atender com carinho e profissionalismo.'

  const unitsTitle = units.length > 1 ? 'Nossas unidades' : 'Onde nos encontrar'
  const unitsSubtitle = units.length > 1
    ? `Estamos presentes em ${units.length} localidades para te atender melhor.`
    : hasLoc
      ? `Venha nos visitar ${loc}.${canBook ? ' Agendamento online disponível.' : ''}`
      : canBook ? 'Agendamento online disponível. Venha nos visitar!' : 'Venha nos visitar!'

  const ctaTitle = hasSvcs ? `Pronto para ${seg.verb}?` : 'Pronto para agendar?'
  const ctaSubtitle = [
    'Agende agora mesmo',
    hasSvcs ? `— ${svcs}` : '',
    hasLoc ? `${loc}` : '',
    '— de forma rápida, fácil e sem espera.',
  ].filter(Boolean).join(' ')

  const quickStats: { value: string | number; label: string }[] = []
  if (services.length) quickStats.push({ value: `${services.length}+`, label: 'Serviços disponíveis' })
  if (employees.length) quickStats.push({ value: employees.length, label: `Profissiona${employees.length > 1 ? 'is' : 'l'}` })
  if (units.length) quickStats.push({ value: units.length, label: `Unidade${units.length > 1 ? 's' : ''}` })
  if (canBook) quickStats.push({ value: '100%', label: 'Online e sem filas' })

  return {
    segmentLabel: seg.label,
    differentials,
    quickStats,
    services,
    h1,
    intro,
    aboutTitle,
    aboutParagraphs: [p1, p2, p3].filter(Boolean),
    servicesTitle,
    servicesSubtitle,
    teamTitle,
    teamSubtitle,
    unitsTitle,
    unitsSubtitle,
    ctaTitle,
    ctaSubtitle,
  }
}

// ─── pages/localizacao.vue ───────────────────────────────────────────────────

export function locationTexts(site: PreviewSiteData) {
  const units = site.units
  const count = units.length
  const primary = units[0] ?? null
  const canBook = site.canBook
  const name = site.name
  const seg = segmentLabelOf(site.segment).toLowerCase()
  const availableCities = [...new Set(units.filter(u => u.city).map(u => u.city!))].sort()

  let title = `${name} — Nossas Unidades`
  if (count === 1 && primary?.city) title = `Nossa Unidade em ${primary.city}`
  else if (count > 1) title = `${name} — ${count} Unidades`

  let subtitle = 'Encontre nossa unidade'
  if (count === 1 && primary) {
    const parts = [primary.neighborhood, primary.city, primary.state].filter(Boolean)
    if (!canBook) subtitle = parts.length ? `Estamos em ${parts.join(', ')}.` : 'Encontre nossa unidade'
    else subtitle = parts.length ? `Estamos em ${parts.join(', ')}. Agende online seu horário.` : 'Encontre nossa unidade e agende seu horário'
  } else if (count > 1) {
    const cities = availableCities.slice(0, 3)
    subtitle = cities.length ? `Presentes em ${cities.join(', ')} e mais. Encontre a mais próxima de você.` : 'Encontre a unidade mais próxima de você'
  }

  const blockTitle = count === 1 ? `${name} — Sua melhor escolha` : `${name} — Presença em ${count} localidades`

  let paragraph1 = `${name} oferece ${seg} de qualidade com profissionais experientes.${canBook ? ' Agende online seu horário de forma rápida e prática.' : ''}`
  if (count === 1 && primary) {
    const parts = [primary.neighborhood, primary.city].filter(Boolean)
    const location = parts.length ? ` em ${parts.join(', ')}` : ''
    paragraph1 = `${name} oferece ${seg} de qualidade${location}. Com profissionais qualificados e estrutura completa, garantimos um atendimento de excelência.${canBook ? ' Agende seu horário online de forma rápida e prática — escolha o dia e horário ideal para você.' : ''}`
  } else if (count > 1) {
    const citiesText = availableCities.length > 3
      ? `${availableCities.slice(0, 3).join(', ')} e mais ${availableCities.length - 3} ${availableCities.length - 3 === 1 ? 'cidade' : 'cidades'}`
      : availableCities.join(', ')
    paragraph1 = `${name} está presente em ${availableCities.length} ${availableCities.length === 1 ? 'cidade' : 'cidades'} — ${citiesText} — com ${count} unidades estrategicamente localizadas para te atender melhor. Todas as unidades mantêm o mesmo padrão de qualidade e excelência que nos tornou referência.`
  }

  let paragraph2 = ''
  if (count === 1) paragraph2 = canBook
    ? 'Nosso espaço foi pensado para oferecer conforto e praticidade. Agendamento 100% online com confirmação instantânea — sem espera, sem filas.'
    : 'Nosso espaço foi pensado para oferecer conforto e praticidade.'
  else if (count > 1) paragraph2 = canBook
    ? 'Escolha a unidade mais próxima de você e garanta seu horário. Todas as unidades contam com agendamento online, confirmação instantânea e profissionais qualificados.'
    : 'Escolha a unidade mais próxima de você. Todas contam com profissionais qualificados.'

  const groups = availableCities.map(city => ({ city, units: units.filter(u => u.city === city) }))
  return { title, subtitle, blockTitle, paragraph1, paragraph2, availableCities, groups }
}

// ─── components/common/Footer.vue ────────────────────────────────────────────

export interface FooterSeoLink { label: string; href: string; location: string }

/** Links /buscar do rodapé (fonte 2 do WL: cidades/bairros das unidades). */
export function footerSeoLinks(site: PreviewSiteData): FooterSeoLink[] {
  const MAX_CITIES = 4
  const MAX_PER_CITY = 5
  const MAX_NEIGHBORS = 5
  const MAX_SVC_NEIGH = 4
  const services = site.services.slice(0, 30)
  const segLabel = site.segment ? site.segment.label || site.segment.name : null
  const segSlug = segLabel ? slugifyWl(segLabel) : null
  const url = (term: string, neighborhood: string | null, city: string | null) => {
    const loc = [neighborhood, city].filter(Boolean).map(s => slugifyWl(s!)).join('-')
    return loc ? `/buscar/${slugifyWl(term)}-em-${loc}` : `/buscar/${slugifyWl(term)}`
  }

  const links: FooterSeoLink[] = []
  const seen = new Set<string>()
  const push = (label: string, href: string, location: string) => {
    if (seen.has(href)) return
    seen.add(href)
    links.push({ label, href, location })
  }

  const cities = [...new Set(site.units.filter(u => u.city).map(u => u.city!))].slice(0, MAX_CITIES)
  for (const city of cities) {
    const cityUnits = site.units.filter(u => u.city === city)
    const neighborhoods = [...new Set(cityUnits.map(u => u.neighborhood?.trim()).filter((n): n is string => Boolean(n)))].slice(0, MAX_NEIGHBORS)
    if (!neighborhoods.length) {
      if (segSlug && segLabel) push(`${segLabel} em ${city}`, url(segSlug, null, city), city)
      for (const svc of services.slice(0, MAX_PER_CITY)) push(`${svc.name} em ${city}`, url(svc.name, null, city), city)
    } else {
      for (const neighborhood of neighborhoods) {
        const label = [neighborhood, city].join(', ')
        if (segSlug && segLabel) push(`${segLabel} em ${label}`, url(segSlug, neighborhood, city), label)
        for (const svc of services.slice(0, MAX_SVC_NEIGH)) push(`${svc.name} em ${label}`, url(svc.name, neighborhood, city), label)
      }
    }
  }
  return links
}

export function groupFooterLinks(links: FooterSeoLink[]) {
  const map = new Map<string, FooterSeoLink[]>()
  for (const link of links) {
    if (!map.has(link.location)) map.set(link.location, [])
    map.get(link.location)!.push(link)
  }
  return [...map.entries()].map(([location, items]) => ({ location, links: items }))
}

// ─── Iniciais (ProfessionalsCarousel) ────────────────────────────────────────

export function initials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join('')
}

// ─── Payload da API pública → dados do preview ───────────────────────────────

/**
 * O que o WL recebe da API pública (by-subdomain, /services/public,
 * /employees/public, /units/public), no formato cru. É o formato da fixture de
 * fidelidade: o mesmo JSON alimenta o WL real (via mock da API) e o preview.
 */
export interface WlPublicPayload {
  website: {
    title?: string | null
    logo?: string | null
    heroText?: string | null
    heroSubText?: string | null
    heroImages?: string[] | null
    description?: string | null
    whatsapp?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    theme?: unknown
    modules?: string[] | null
    tenantWeb?: { officeName?: string | null; segment?: PreviewSegment | null } | null
  }
  services: {
    id: number
    name: string
    description?: string | null
    price: number | string
    isActive?: boolean
    duration?: { milliseconds: number } | null
    categoryServices?: { id: number; name: string; image?: string | null }[] | null
  }[]
  employees: { id: number; fullName: string; avatar?: string | null }[]
  units: (PreviewUnit & { status?: string | null; isActive?: boolean })[]
}

/** Mesmas regras do WL: canBook pelos módulos, serviço/unidade inativos fora. */
export function previewFromWlPayload(payload: WlPublicPayload): PreviewSiteData {
  const w = payload.website
  const modules = w.modules
  return {
    name: w.tenantWeb?.officeName?.trim() || w.title?.trim() || 'SuaAgenda.link',
    logo: w.logo ?? null,
    heroText: w.heroText ?? null,
    heroSubText: w.heroSubText ?? null,
    heroImage: Array.isArray(w.heroImages) ? w.heroImages[0] ?? null : null,
    description: w.description ?? null,
    segment: w.tenantWeb?.segment ?? null,
    whatsapp: w.whatsapp ?? null,
    canBook: !Array.isArray(modules) || modules.includes('scheduling'),
    services: payload.services
      .filter(s => s.isActive !== false)
      .map(s => ({
        id: s.id,
        name: s.name,
        description: s.description ?? null,
        price: Number(s.price) || 0,
        durationMs: s.duration?.milliseconds ?? null,
        categories: (s.categoryServices || []).map(c => ({ id: c.id, name: c.name, image: c.image ?? null })),
      })),
    employees: payload.employees.map(e => ({ id: e.id, fullName: e.fullName, avatar: e.avatar ?? null })),
    units: payload.units.filter(u => u.status !== 'inactive' && u.isActive !== false),
  }
}
