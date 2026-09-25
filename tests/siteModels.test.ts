// tests/siteModels.test.ts — modelos de site por segmento (etapa 3)
//
// Estrutura, limites e vocabulário dos modelos de fisioterapia, e a
// compatibilidade com o que o white-label real consegue mostrar.
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { describe, expect, it } from 'vitest'
import fisioterapia from '../data/siteModels/fisioterapia'
import { SITE_MODEL_SEGMENTS, isSiteModelSegment, loadSiteModels, siteModelPaths } from '../data/siteModels'
import {
  SITE_DURATIONS_MIN,
  SITE_MAX_PRICE,
  SITE_MODEL_IMAGE_RE,
  SITE_PLACEHOLDER_FIELDS,
  SITE_PLACEHOLDERS,
  SITE_TEXT_LIMITS,
  type SegmentSiteModels,
  type SiteModel,
} from '../data/siteModels/types'
import { THEME_FONT_IDS, THEME_PRESET_IDS, THEME_RADIUS_IDS, HEX_COLOR_RE } from '../utils/theme'
import { formatOpeningHours, homeTexts, normalizeBrWhatsapp } from '../utils/sitePreview'
import { aboutAsDescription, fillPlaceholders, placeholderValuesOf, siteModelToPreview } from '../utils/siteModelPreview'
import PreviewSite from '../components/site-preview/PreviewSite.vue'

const segment: SegmentSiteModels = fisioterapia
const models = segment.models

// ─── Vocabulário ─────────────────────────────────────────────────────────────

/** Sem acento e minúsculo, para casar "Salão"/"salao". */
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/**
 * Termos de barbearia/salão: conteúdo copiado de outro segmento por engano.
 * Palavra inteira (\b), para "corte" não pegar "cortesia".
 */
const OTHER_SEGMENT_TERMS = [
  'corte', 'cortes', 'barba', 'barbas', 'barbear', 'barbearia', 'barbeiro', 'barbeiros', 'pomada',
  'cliente vip', 'degrade', 'navalha', 'cabelo', 'cabelos', 'escova', 'progressiva', 'manicure',
  'pedicure', 'unha', 'unhas', 'sobrancelha', 'mechas', 'luzes', 'coloracao', 'salao',
]

/** Promessa de resultado em saúde (publicidade prudente, sem regra inventada). */
const HEALTH_CLAIMS = [
  /\bcura(s|r|mos)?\b/, /\bgarant\w*/, /resultado garantido/, /\bzero dor\b/, /\bsem dor\b/,
  /\bem \d+ (dias|semanas|sessoes)\b/, /\b100 ?%/, /\bdefinitiv\w*/, /\belimina\w*/, /\bmilagr\w*/,
]

const hasTerm = (text: string, term: string) => new RegExp(`\\b${term}\\b`).test(norm(text))

/** Todo texto do segmento (modelos + SEO), com o caminho de cada um. */
function allTexts(seg: SegmentSiteModels): [string, string][] {
  const out: [string, string][] = [['label', seg.label]]
  const walk = (value: unknown, path: string) => {
    if (typeof value === 'string') out.push([path, value])
    else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`))
    else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k)
  }
  seg.models.forEach((m, i) => walk(m, `models[${i}]`))
  walk(seg.seo, 'seo')
  walk(seg.editorExamples, 'editorExamples')
  return out
}

// ─── Estrutura ───────────────────────────────────────────────────────────────

describe('registro de segmentos', () => {
  it('fisioterapia e barbearia são carregadas sob demanda e slug desconhecido dá null', async () => {
    expect(Object.keys(SITE_MODEL_SEGMENTS)).toEqual(['fisioterapia', 'barbearia'])
    expect(isSiteModelSegment('fisioterapia')).toBe(true)
    expect(isSiteModelSegment('barbearia')).toBe(true)
    expect(isSiteModelSegment('barbershop')).toBe(false)
    expect(isSiteModelSegment('barber')).toBe(false)
    expect(isSiteModelSegment('toString')).toBe(false)
    expect(await loadSiteModels('fisioterapia')).toBe(fisioterapia)
    expect(await loadSiteModels('nao-existe')).toBeNull()
    // sitemap: uma rota pública por segmento registrado
    expect(siteModelPaths()).toEqual(['/site-para-fisioterapia', '/site-para-barbearia'])
  })

  it('cada slug carrega o arquivo de mesmo nome (convenção do export da API)', async () => {
    for (const slug of Object.keys(SITE_MODEL_SEGMENTS)) {
      expect((await loadSiteModels(slug))?.segment).toBe(slug)
    }
    const types = await Promise.all(Object.keys(SITE_MODEL_SEGMENTS).map(async s => (await loadSiteModels(s))!.segmentType))
    expect(new Set(types).size).toBe(types.length)
  })

  it('fisioterapia continua com o editor no catálogo', () => {
    expect(segment.previewOnly).toBeUndefined()
  })

  it('o slug público aponta para o segmento real do banco (segment_types.name)', () => {
    expect(segment.segment).toBe('fisioterapia')
    expect(segment.segmentType).toBe('physio')
    expect(segment.label).toBe('Fisioterapia')
  })
})

describe('fisioterapia: modelos', () => {
  it('1. exatamente 3 modelos', () => {
    expect(models).toHaveLength(3)
  })

  it('2. ids únicos, kebab-case', () => {
    const ids = models.map(m => m.id)
    expect(new Set(ids).size).toBe(3)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    expect(ids).toEqual(['clinica', 'reabilitacao', 'profissional'])
  })

  it('3. tema só com ids que existem no theme.ts', () => {
    for (const m of models) {
      expect(THEME_PRESET_IDS).toContain(m.theme.preset)
      expect(THEME_FONT_IDS).toContain(m.theme.font)
      expect(THEME_RADIUS_IDS).toContain(m.theme.radius)
      if (m.theme.primaryColor !== undefined) expect(m.theme.primaryColor).toMatch(HEX_COLOR_RE)
    }
  })

  it('os 3 modelos pedidos, com tema, nome e tamanho de catálogo', () => {
    const [clinica, reab, prof] = models
    expect(clinica.theme).toEqual({ preset: 'clean', font: 'classica', radius: 'md' })
    expect(clinica.content.businessName).toBe('Clínica Movimento')
    expect(clinica.content.services).toHaveLength(8)
    expect(clinica.content.categories.map(c => c.name)).toEqual(['Ortopedia', 'Fisioterapia Esportiva', 'Pilates'])
    expect(clinica.content.professionals).toHaveLength(3)

    expect(reab.theme).toEqual({ preset: 'moderno', font: 'geometrica', radius: 'lg' })
    expect(reab.content.businessName).toBe('Clínica Movimento')
    expect(reab.content.heroText).toBe('Recupere seus movimentos e retome sua rotina.')
    expect(reab.content.services).toHaveLength(6)
    expect(reab.content.services.find(s => /10 sess/.test(s.name))?.price).toBe(950)
    expect(reab.content.services.filter(s => /p[oó]s-(operat|cir)/i.test(`${s.name} ${s.description}`)).length).toBeGreaterThanOrEqual(4)
    expect(reab.content.professionals).toHaveLength(2)

    expect(prof.theme).toEqual({ preset: 'elegante', font: 'elegante', radius: 'full' })
    expect(prof.content.businessName).toBe('Dra. Mariana Alves Fisioterapia')
    expect(prof.content.services).toHaveLength(5)
    expect(prof.content.categories.length).toBeLessThanOrEqual(2)
    expect(prof.content.professionals).toHaveLength(1)
    expect(prof.content.professionals[0].name).toMatch(/Mariana/)
    // /sobre mais longo que o dos outros modelos
    const len = (m: SiteModel) => aboutAsDescription(m.content.about, placeholderValuesOf(m.content)).length
    expect(len(prof)).toBeGreaterThan(Math.max(len(clinica), len(reab)))
  })

  it.each(models.map(m => [m.id, m] as const))('4. %s: toda categoria referenciada existe (e toda categoria é usada)', (_, m) => {
    const ids = m.content.categories.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const s of m.content.services) expect(ids, s.name).toContain(s.categoryId)
    for (const id of ids) expect(m.content.services.some(s => s.categoryId === id), id).toBe(true)
  })

  it.each(models.map(m => [m.id, m] as const))('5. %s: todo serviço tem preço numérico > 0 (e cabe no DECIMAL(6,2))', (_, m) => {
    for (const s of m.content.services) {
      expect(typeof s.price, s.name).toBe('number')
      expect(Number.isFinite(s.price), s.name).toBe(true)
      expect(s.price, s.name).toBeGreaterThan(0)
      expect(s.price, s.name).toBeLessThanOrEqual(SITE_MAX_PRICE)
      expect(Math.round(s.price * 100), s.name).toBe(s.price * 100)
    }
  })

  it.each(models.map(m => [m.id, m] as const))('6. %s: durationMin é uma duração da tabela durations', (_, m) => {
    for (const s of m.content.services) expect(SITE_DURATIONS_MIN, s.name).toContain(s.durationMin)
  })

  it.each(models.map(m => [m.id, m] as const))('7. %s: WhatsApp é celular BR de 11 dígitos, aceito pelo WL', (_, m) => {
    expect(m.content.whatsapp).toMatch(/^\d{11}$/)
    expect(normalizeBrWhatsapp(m.content.whatsapp)).toBe(m.content.whatsapp)
  })

  it.each(models.map(m => [m.id, m] as const))('8. %s: textos dentro dos limites', (_, m) => {
    const c = m.content
    const L = SITE_TEXT_LIMITS
    const within = (text: string, max: number, what: string) => {
      expect(text.trim().length, what).toBeGreaterThan(0)
      expect(text.length, `${what} (${text.length}/${max})`).toBeLessThanOrEqual(max)
      expect(text, what).toBe(text.trim())
    }
    within(m.label, L.label, 'label')
    within(m.pitch, L.pitch, 'pitch')
    within(c.businessName, L.businessName, 'businessName')
    within(c.heroText, L.heroText, 'heroText')
    within(c.tagline, L.tagline, 'tagline')
    // about: já com os placeholders trocados, como vai para o description.
    within(aboutAsDescription(c.about, placeholderValuesOf(c)), L.about, 'about')
    for (const p of c.about) within(p, L.about, 'about[]')
    for (const cat of c.categories) within(cat.name, L.categoryName, 'categoria')
    for (const s of c.services) {
      within(s.name, L.serviceName, 'serviço')
      within(s.description, L.serviceDescription, `descrição de ${s.name}`)
    }
    for (const p of c.professionals) {
      within(p.name, L.professionalName, 'profissional')
      within(p.role, L.professionalRole, 'cargo')
    }
    within(c.unit.street, 120, 'rua')
    within(c.unit.neighborhood, 60, 'bairro')
    within(c.unit.city, 60, 'cidade')
    expect(c.unit.state).toMatch(/^[A-Z]{2}$/)
    expect(c.unit.phone).toMatch(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    // nomes de serviço únicos (viram /servicos/<slug> no WL)
    expect(new Set(c.services.map(s => norm(s.name))).size).toBe(c.services.length)
  })

  it.each(models.map(m => [m.id, m] as const))('horário: dias 0–6 sem repetir, abertura antes do fechamento', (_, m) => {
    const days = m.content.unit.hours.flatMap(h => h.days)
    expect(new Set(days).size).toBe(days.length)
    for (const hrs of m.content.unit.hours) {
      for (const d of hrs.days) expect(Number.isInteger(d) && d >= 0 && d <= 6).toBe(true)
      expect(hrs.open).toMatch(/^([01]\d|2[0-3]):[0-5]\d$/)
      expect(hrs.close).toMatch(/^([01]\d|2[0-3]):[0-5]\d$/)
      expect(hrs.open < hrs.close).toBe(true)
    }
  })

  it.each(models.map(m => [m.id, m] as const))('9. %s: nenhuma imagem vazia; todas são public_id da pasta do modelo', (_, m) => {
    const c = m.content
    const images = [c.heroImage, ...c.categories.map(x => x.image), ...c.professionals.map(x => x.avatar)]
    for (const img of images) {
      expect(img.trim()).not.toBe('')
      expect(img).toMatch(SITE_MODEL_IMAGE_RE)
      expect(img.startsWith(`suaagenda/site-models/${segment.segment}/${m.id}/`), img).toBe(true)
    }
    expect(new Set(images).size).toBe(images.length)
  })
})

describe('fisioterapia: vocabulário (10)', () => {
  const texts = allTexts(segment)

  it('nenhum termo de barbearia/salão', () => {
    for (const [path, text] of texts) {
      for (const term of OTHER_SEGMENT_TERMS) expect(hasTerm(text, term), `"${term}" em ${path}: ${text}`).toBe(false)
    }
  })

  it('nenhuma promessa de resultado', () => {
    for (const [path, text] of texts) {
      for (const re of HEALTH_CLAIMS) expect(re.test(norm(text)), `${re} em ${path}: ${text}`).toBe(false)
    }
  })

  it('a guarda pega conteúdo copiado de barbearia (e não pega "cortesia")', () => {
    expect(hasTerm('Corte + Barba', 'corte')).toBe(true)
    expect(hasTerm('Pomada modeladora', 'pomada')).toBe(true)
    expect(hasTerm('Atendimento para cliente VIP', 'cliente vip')).toBe(true)
    expect(hasTerm('Café de cortesia', 'corte')).toBe(false)
    expect(HEALTH_CLAIMS.some(re => re.test(norm('Resultado garantido em 10 dias')))).toBe(true)
  })
})

describe('fisioterapia: placeholders (11)', () => {
  const texts = allTexts(segment)

  it('só {negocio} e {cidade}, e só nos campos de apresentação', () => {
    const allowed = new RegExp(`^models\\[\\d\\]\\.content\\.(${SITE_PLACEHOLDER_FIELDS.join('|')})(\\[\\d+\\])?$`)
    for (const [path, text] of texts) {
      const found = text.match(/\{[^}]*\}/g) || []
      for (const ph of found) {
        expect(SITE_PLACEHOLDERS as readonly string[], `${ph} em ${path}`).toContain(ph)
        expect(path, `${ph} fora do lugar`).toMatch(allowed)
      }
      // chave solta = placeholder digitado errado
      expect(text.replace(/\{(negocio|cidade)\}/g, ''), path).not.toMatch(/[{}]/)
    }
  })

  it.each(models.map(m => [m.id, m] as const))('%s: o /sobre cita o negócio e o topo cita a cidade', (_, m) => {
    expect(m.content.about.join(' ')).toContain('{negocio}')
    expect(m.content.tagline).toContain('{cidade}')
  })

  it('fillPlaceholders troca tudo e não deixa chave para trás', () => {
    for (const m of models) {
      const v = placeholderValuesOf(m.content)
      for (const text of [m.content.heroText, m.content.tagline, ...m.content.about]) {
        const out = fillPlaceholders(text, v)
        expect(out).not.toMatch(/[{}]/)
      }
      expect(fillPlaceholders(m.content.tagline, v)).toContain(m.content.unit.city)
    }
    expect(fillPlaceholders('Na {negocio}, em {cidade}. {outro}', { negocio: 'X', cidade: 'Y' })).toBe('Na X, em Y. {outro}')
  })
})

describe('fisioterapia: SEO (12)', () => {
  const seo = segment.seo

  it('title, description, h1 e intro preenchidos e no tamanho', () => {
    expect(seo.title.length).toBeGreaterThan(10)
    expect(seo.title.length).toBeLessThanOrEqual(SITE_TEXT_LIMITS.seoTitle)
    expect(seo.description.length).toBeGreaterThanOrEqual(70)
    expect(seo.description.length).toBeLessThanOrEqual(SITE_TEXT_LIMITS.seoDescription)
    expect(seo.h1.length).toBeLessThanOrEqual(SITE_TEXT_LIMITS.seoH1)
    expect(norm(seo.h1)).toContain('fisioterap')
    expect(norm(seo.title)).toContain('fisioterap')
    expect(seo.intro.length).toBeGreaterThan(80)
  })

  it('seções e FAQ completas, sem repetição', () => {
    expect(seo.sections.length).toBeGreaterThanOrEqual(3)
    for (const s of seo.sections) {
      expect(s.h2.trim().length).toBeGreaterThan(5)
      expect(s.body.trim().length).toBeGreaterThan(40)
    }
    expect(new Set(seo.sections.map(s => s.h2)).size).toBe(seo.sections.length)
    expect(seo.faq.length).toBeGreaterThanOrEqual(4)
    for (const f of seo.faq) {
      expect(f.q.trim()).toMatch(/\?$/)
      expect(f.a.trim().length).toBeGreaterThan(20)
    }
    expect(new Set(seo.faq.map(f => f.q)).size).toBe(seo.faq.length)
  })
})

// ─── Compatibilidade com o WL real (13) ─────────────────────────────────────

describe('fisioterapia: compatível com o site real (13)', () => {
  it.each(models.map(m => [m.id, m] as const))('%s: vira dados do WL sem perder nada que o site mostra', (_, m) => {
    const site = siteModelToPreview(m, segment)
    const c = m.content
    expect(site.name).toBe(c.businessName)
    expect(site.services).toHaveLength(c.services.length)
    expect(site.employees).toHaveLength(c.professionals.length)
    expect(site.units).toHaveLength(1)
    // toda categoria do serviço chega com nome e imagem (o card usa a 1ª)
    for (const s of site.services) {
      expect(s.categories).toHaveLength(1)
      expect(s.categories[0].image).toBeTruthy()
      expect(s.durationMs! % 60_000).toBe(0)
    }
    // horário no formato do UnitAvailability, lido pela mesma regra do WL
    const lines = formatOpeningHours(site.units[0].availabilities)
    expect(lines.length).toBe(c.unit.hours.length)
    // textos gerados pelo WL (home): segmento + local
    expect(homeTexts(site).headline).toBe(`Fisioterapia em ${c.unit.neighborhood}, ${c.unit.city} - ${c.unit.state}`)
    // nada de placeholder cru chegando ao site
    expect(JSON.stringify(site)).not.toMatch(/\{(negocio|cidade)\}/)
  })

  it.each(models.map(m => [m.id, m] as const))('%s: as 3 páginas renderizam com o tema do modelo', async (_, m) => {
    const site = siteModelToPreview(m, segment)
    for (const page of ['inicio', 'sobre', 'como-chegar'] as const) {
      const app = createSSRApp({ render: () => h(PreviewSite, { site, theme: m.theme, primaryColor: m.theme.primaryColor, page, footerYear: 2026 }) })
      const html = await renderToString(app)
      expect(html).toContain(m.content.businessName)
      if (page === 'inicio') {
        for (const s of m.content.services) expect(html).toContain(s.name)
        for (const cat of m.content.categories) expect(html).toContain(cat.name)
        expect(html).toContain('Chamar no WhatsApp')
      }
    }
  })
})
