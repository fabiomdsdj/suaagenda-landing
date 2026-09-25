// tests/siteModelsBarbearia.test.ts — modelos de site de barbearia
//
// Mesmas regras dos modelos de fisioterapia (tests/siteModels.test.ts):
// estrutura, limites, imagens, placeholders, SEO e compatibilidade com o WL.
// Mais: vocabulário sem saúde, catálogo só de visualização e a base inicial
// que a API aplica no cadastro (utils/siteModelSeed.ts).
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { describe, expect, it } from 'vitest'
import barbearia from '../data/siteModels/barbearia'
import fisioterapia from '../data/siteModels/fisioterapia'
import { loadSiteModels, siteModelPath, siteModelPaths } from '../data/siteModels'
import {
  SITE_DURATIONS_MIN,
  SITE_MAX_PRICE,
  SITE_MODEL_IMAGE_RE,
  SITE_PLACEHOLDER_FIELDS,
  SITE_PLACEHOLDERS,
  SITE_TEXT_LIMITS,
  type SegmentSiteModels,
} from '../data/siteModels/types'
import { THEME_FONT_IDS, THEME_PRESET_IDS, THEME_RADIUS_IDS, HEX_COLOR_RE } from '../utils/theme'
import { demoSiteAddress, formatOpeningHours, homeTexts, normalizeBrWhatsapp } from '../utils/sitePreview'
import { aboutAsDescription, fillPlaceholders, placeholderValuesOf, siteModelToPreview } from '../utils/siteModelPreview'
import { siteModelSeed } from '../utils/siteModelSeed'
import { soSiteCta, soSiteSignupUrl } from '../utils/soSite.js'
import PreviewSite from '../components/site-preview/PreviewSite.vue'
import SiteConfigurator from '../components/site-configurator/SiteConfigurator.vue'

const segment: SegmentSiteModels = barbearia
const models = segment.models
const byId = Object.fromEntries(models.map(m => [m.id, m]))
const each = models.map(m => [m.id, m] as const)

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const hasTerm = (text: string, term: string) => new RegExp(`\\b${term}\\b`).test(norm(text))

/** Vocabulário de saúde/fisioterapia: conteúdo copiado do segmento errado. */
const HEALTH_TERMS = [
  'fisioterapia', 'fisioterapeuta', 'fisioterapeutas', 'paciente', 'pacientes', 'clinica', 'clinicas',
  'tratamento', 'reabilitacao', 'pos-operatorio', 'pilates', 'sessao', 'sessoes', 'saude', 'terapia',
  'dor', 'dores', 'lesao', 'lesoes', 'ortopedia', 'medico', 'medica', 'consulta', 'diagnostico',
]

function allTexts(seg: SegmentSiteModels): [string, string][] {
  const out: [string, string][] = [['label', seg.label]]
  const walk = (value: unknown, path: string) => {
    if (typeof value === 'string') out.push([path, value])
    else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`))
    else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k)
  }
  seg.models.forEach((m, i) => walk(m, `models[${i}]`))
  walk(seg.seo, 'seo')
  return out
}

// ─── Segmento ────────────────────────────────────────────────────────────────

describe('barbearia: segmento', () => {
  it('slug barbearia → segment_types.name barber (nunca barbershop)', async () => {
    expect(segment.segment).toBe('barbearia')
    expect(segment.segmentType).toBe('barber')
    expect(segment.label).toBe('Barbearia')
    expect(await loadSiteModels('barbearia')).toBe(barbearia)
    expect(await loadSiteModels('barbershop')).toBeNull()
  })

  it('rota /site-para-barbearia e entrada no sitemap', () => {
    expect(siteModelPath('barbearia')).toBe('/site-para-barbearia')
    expect(siteModelPaths()).toContain('/site-para-barbearia')
  })

  it('catálogo só de visualização (fisioterapia segue com editor)', () => {
    expect(segment.previewOnly).toBe(true)
    expect(fisioterapia.previewOnly).toBeUndefined()
  })
})

// ─── Modelos ─────────────────────────────────────────────────────────────────

describe('barbearia: modelos', () => {
  it('exatamente 3: Clássica, Premium e Barbeiro Autônomo', () => {
    expect(models.map(m => m.id)).toEqual(['classica', 'premium', 'autonomo'])
    expect(models.map(m => m.label)).toEqual(['Clássica', 'Premium', 'Barbeiro Autônomo'])
    for (const id of models.map(m => m.id)) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('perfis: temas existentes e catálogo coerente com cada perfil', () => {
    for (const m of models) {
      expect(THEME_PRESET_IDS).toContain(m.theme.preset)
      expect(THEME_FONT_IDS).toContain(m.theme.font)
      expect(THEME_RADIUS_IDS).toContain(m.theme.radius)
      if (m.theme.primaryColor !== undefined) expect(m.theme.primaryColor).toMatch(HEX_COLOR_RE)
    }
    const { classica, premium, autonomo } = byId
    expect(classica.theme.preset).toBe('barbearia')
    expect(classica.content.services.some(s => /barba/i.test(s.name))).toBe(true)
    expect(classica.content.professionals.length).toBeGreaterThanOrEqual(2)

    expect(premium.theme.preset).toBe('premium')
    // premium é o mais caro: o corte principal custa mais que o da clássica
    const corte = (m: typeof classica) => Math.max(...m.content.services.filter(s => /corte/i.test(s.name)).map(s => s.price))
    expect(corte(premium)).toBeGreaterThan(corte(classica))

    expect(autonomo.content.professionals).toHaveLength(1)
    expect(autonomo.content.categories.length).toBeLessThanOrEqual(2)
    expect(autonomo.content.tagline).toMatch(/WhatsApp/)
  })

  it.each(each)('%s: categorias referenciadas existem e todas são usadas', (_, m) => {
    const ids = m.content.categories.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const s of m.content.services) expect(ids).toContain(s.categoryId)
    for (const id of ids) expect(m.content.services.some(s => s.categoryId === id)).toBe(true)
  })

  it.each(each)('%s: preço > 0 em DECIMAL(6,2) e duração da tabela durations', (_, m) => {
    expect(m.content.services.length).toBeGreaterThanOrEqual(1)
    expect(m.content.services.length).toBeLessThanOrEqual(12)
    for (const s of m.content.services) {
      expect(s.price).toBeGreaterThan(0)
      expect(s.price).toBeLessThanOrEqual(SITE_MAX_PRICE)
      expect(Math.round(s.price * 100)).toBe(s.price * 100)
      expect(SITE_DURATIONS_MIN as readonly number[]).toContain(s.durationMin)
    }
  })

  it.each(each)('%s: WhatsApp celular BR de 11 dígitos aceito pelo WL', (_, m) => {
    expect(m.content.whatsapp).toMatch(/^\d{11}$/)
    expect(normalizeBrWhatsapp(m.content.whatsapp)).toBe(m.content.whatsapp)
  })

  it.each(each)('%s: textos dentro dos limites', (_, m) => {
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
    within(aboutAsDescription(c.about, placeholderValuesOf(c)), L.about, 'about')
    for (const cat of c.categories) within(cat.name, L.categoryName, 'categoria')
    for (const s of c.services) {
      within(s.name, L.serviceName, 'serviço')
      within(s.description, L.serviceDescription, `descrição de ${s.name}`)
    }
    for (const p of c.professionals) {
      within(p.name, L.professionalName, 'profissional')
      within(p.role, L.professionalRole, 'cargo')
    }
    expect(c.unit.state).toMatch(/^[A-Z]{2}$/)
    expect(c.unit.phone).toMatch(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    expect(new Set(c.services.map(s => norm(s.name))).size).toBe(c.services.length)
  })

  it.each(each)('%s: horário válido (dias 0–6 sem repetir, abre antes de fechar)', (_, m) => {
    const days = m.content.unit.hours.flatMap(h => h.days)
    expect(new Set(days).size).toBe(days.length)
    for (const hrs of m.content.unit.hours) {
      for (const d of hrs.days) expect(d >= 0 && d <= 6).toBe(true)
      expect(hrs.open < hrs.close).toBe(true)
    }
  })

  it.each(each)('%s: imagens são public_id em suaagenda/site-models/barbearia/<modelo>/', (_, m) => {
    const c = m.content
    const images = [c.heroImage, ...c.categories.map(x => x.image), ...c.professionals.map(x => x.avatar)]
    for (const img of images) {
      expect(img).toMatch(SITE_MODEL_IMAGE_RE)
      expect(img.startsWith(`suaagenda/site-models/barbearia/${m.id}/`), img).toBe(true)
    }
    expect(new Set(images).size).toBe(images.length)
  })
})

// ─── Vocabulário e placeholders ──────────────────────────────────────────────

describe('barbearia: vocabulário', () => {
  it('nenhum termo de saúde/fisioterapia', () => {
    for (const [path, text] of allTexts(segment)) {
      for (const term of HEALTH_TERMS) expect(hasTerm(text, term), `"${term}" em ${path}: ${text}`).toBe(false)
    }
  })

  it('a guarda pega texto de fisioterapia', () => {
    const fisioTexts = allTexts(fisioterapia).map(([, t]) => t).join(' ')
    expect(HEALTH_TERMS.some(term => hasTerm(fisioTexts, term))).toBe(true)
    expect(hasTerm('Atendimento para pacientes', 'pacientes')).toBe(true)
    expect(hasTerm('Corte com dorso', 'dor')).toBe(false)
  })
})

describe('barbearia: placeholders', () => {
  it('só {negocio} e {cidade}, e só nos campos de apresentação', () => {
    const allowed = new RegExp(`^models\\[\\d\\]\\.content\\.(${SITE_PLACEHOLDER_FIELDS.join('|')})(\\[\\d+\\])?$`)
    for (const [path, text] of allTexts(segment)) {
      for (const ph of text.match(/\{[^}]*\}/g) || []) {
        expect(SITE_PLACEHOLDERS as readonly string[], `${ph} em ${path}`).toContain(ph)
        expect(path).toMatch(allowed)
      }
      expect(text.replace(/\{(negocio|cidade)\}/g, ''), path).not.toMatch(/[{}]/)
    }
  })

  it.each(each)('%s: o /sobre cita o negócio e o topo cita a cidade', (_, m) => {
    expect(m.content.about.join(' ')).toContain('{negocio}')
    expect(m.content.tagline).toContain('{cidade}')
    const v = placeholderValuesOf(m.content)
    expect(fillPlaceholders(m.content.tagline, v)).toContain(m.content.unit.city)
  })
})

// ─── SEO ─────────────────────────────────────────────────────────────────────

describe('barbearia: SEO', () => {
  const seo = segment.seo

  it('title, description, h1 e intro preenchidos e no tamanho', () => {
    expect(seo.title.length).toBeLessThanOrEqual(SITE_TEXT_LIMITS.seoTitle)
    expect(seo.description.length).toBeGreaterThanOrEqual(70)
    expect(seo.description.length).toBeLessThanOrEqual(SITE_TEXT_LIMITS.seoDescription)
    expect(seo.h1.length).toBeLessThanOrEqual(SITE_TEXT_LIMITS.seoH1)
    expect(norm(seo.title)).toContain('barbearia')
    expect(norm(seo.h1)).toContain('barbearia')
    expect(seo.intro.length).toBeGreaterThan(80)
  })

  it('seções e FAQ completas, sem repetição e diferentes das de fisioterapia', () => {
    expect(seo.sections.length).toBeGreaterThanOrEqual(3)
    expect(new Set(seo.sections.map(s => s.h2)).size).toBe(seo.sections.length)
    expect(seo.faq.length).toBeGreaterThanOrEqual(4)
    for (const f of seo.faq) expect(f.q.trim()).toMatch(/\?$/)
    expect(new Set(seo.faq.map(f => f.q)).size).toBe(seo.faq.length)
    expect(seo.title).not.toBe(fisioterapia.seo.title)
    expect(seo.intro).not.toBe(fisioterapia.seo.intro)
  })
})

// ─── Site real (WL) ──────────────────────────────────────────────────────────

describe('barbearia: compatível com o site real', () => {
  it.each(each)('%s: vira dados do WL sem perder nada', (_, m) => {
    const site = siteModelToPreview(m, segment)
    const c = m.content
    expect(site.segment).toEqual({ name: 'barber', label: 'Barbearia' })
    expect(site.services).toHaveLength(c.services.length)
    expect(site.employees).toHaveLength(c.professionals.length)
    expect(formatOpeningHours(site.units[0].availabilities).length).toBe(c.unit.hours.length)
    expect(homeTexts(site).headline).toBe(`Barbearia em ${c.unit.neighborhood}, ${c.unit.city} - ${c.unit.state}`)
    expect(JSON.stringify(site)).not.toMatch(/\{(negocio|cidade)\}/)
  })

  it.each(each)('%s: as 3 páginas renderizam com o tema do modelo', async (_, m) => {
    const site = siteModelToPreview(m, segment)
    for (const page of ['inicio', 'sobre', 'como-chegar'] as const) {
      const html = await renderToString(createSSRApp({ render: () => h(PreviewSite, { site, theme: m.theme, primaryColor: m.theme.primaryColor, page, footerYear: 2026 }) }))
      expect(html).toContain(m.content.businessName)
      if (page === 'inicio') for (const s of m.content.services) expect(html).toContain(s.name.replace(/\+/g, '+'))
    }
  })
})

// ─── Catálogo (SSR do configurador) ──────────────────────────────────────────

describe('barbearia: catálogo só de visualização', () => {
  it('modelos, preview com seusite.<domínio> e CTA — sem editor', async () => {
    const html = await renderToString(createSSRApp({
      render: () => h(SiteConfigurator, { segment, editable: false, demoAddress: demoSiteAddress('suaagenda.link') }),
    }))
    for (const m of models) expect(html).toContain(`data-model="${m.id}"`)
    expect(html).toContain('class="sp-root"')
    expect(html).toContain('data-preview-address')
    expect(html).toContain('seusite.suaagenda.link')
    expect(html).toContain('data-action="start"')
    expect(html).toContain('data-catalog-note')
    expect(html).not.toContain('nada do que você editou')
    // nada do editor
    expect(html).not.toContain('data-section=')
    expect(html).not.toContain('data-field=')
    expect(html).not.toContain('data-preset=')
    expect(html).not.toContain('data-action="reset"')
  })

  it('?modelo=premium abre no Premium', async () => {
    const html = await renderToString(createSSRApp({
      render: () => h(SiteConfigurator, { segment, editable: false, initialModelId: 'premium' }),
    }))
    expect(html).toContain('Nobre Barbearia')
    expect(html).not.toContain('Barbearia Tradição')
  })

  it('fisioterapia sem as props novas continua igual (editor, sem barra de endereço)', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(SiteConfigurator, { segment: fisioterapia }) }))
    expect(html).toContain('data-section="negocio"')
    expect(html).toContain('data-action="reset"')
    expect(html).not.toContain('data-preview-address')
    expect(html).not.toContain('data-catalog-note')
    expect(html).toContain('Isto é uma prévia: nada do que você editou aqui é salvo ou enviado.')
  })

  it('demoSiteAddress segue a config do domínio', () => {
    expect(demoSiteAddress('suaagenda.link')).toBe('seusite.suaagenda.link')
    expect(demoSiteAddress('https://sites.exemplo.com.br/')).toBe('seusite.sites.exemplo.com.br')
    expect(demoSiteAddress('')).toBe('seusite.suaagenda.link')
    expect(demoSiteAddress(undefined)).toBe('seusite.suaagenda.link')
  })
})

// ─── Cadastro e base inicial ─────────────────────────────────────────────────

describe('barbearia: cadastro recebe segmentType=barber e siteModel', () => {
  const PLAN = { id: 11, price: 39.9, trialDays: null, isCustomPricing: false, limits: { 'module.whitelabel': true, 'module.scheduling': false } }

  it.each(each)('%s → register?…&segmentType=barber&siteModel=<id>', (id) => {
    const url = new URL(soSiteSignupUrl(PLAN, { segmentType: segment.segmentType, siteModel: id }))
    expect(url.pathname).toBe('/admin/auth/register')
    expect(url.searchParams.get('segmentType')).toBe('barber')
    expect(url.searchParams.get('siteModel')).toBe(id)
    expect(soSiteCta(PLAN, { segmentType: 'barber', siteModel: id }).kind).toBe('signup')
  })
})

describe('barbearia: base inicial do site (siteModelSeed)', () => {
  it.each(each)('%s: tema do modelo, textos sem {cidade} e sem dados de exemplo', (_, m) => {
    const seed = siteModelSeed(m)
    expect(seed.theme).toEqual({ preset: m.theme.preset, font: m.theme.font, radius: m.theme.radius })
    for (const text of [seed.heroText, seed.heroSubText, seed.description]) {
      expect(text).not.toContain('{cidade}')
      expect(text).not.toMatch(/\s{2}|\s,|,,/)
      expect(text).not.toContain(m.content.unit.city)
    }
    expect(seed.description).toContain('{negocio}')
    // mesma regra do /sobre do preview (um parágrafo)
    expect(fillPlaceholders(seed.description, { negocio: 'X', cidade: '' }))
      .toBe(aboutAsDescription(m.content.about.map(p => p.replace(/,?\s+em \{cidade\}/g, '')), { negocio: 'X', cidade: '' }))
    const json = JSON.stringify(seed)
    for (const k of ['whatsapp', 'phone', 'street', 'heroImage', 'services', 'professionals']) expect(json).not.toContain(`"${k}"`)
    expect(json).not.toContain(m.content.whatsapp)
    // sem nome próprio de exemplo no texto que vira o site do cliente
    for (const p of m.content.professionals) expect(json).not.toContain(p.name.split(' ')[0] === 'Seu' ? p.name : p.name.split(' ')[0])
  })
})
