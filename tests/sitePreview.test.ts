// tests/sitePreview.test.ts — preview "site já pronto" (etapa 2: base visual)
//
// 1. As regras copiadas do white-label (utils/sitePreview.ts, utils/theme.ts)
//    continuam iguais às originais — comparadas direto com o código do WL
//    quando ele está no mesmo checkout (no Docker da landing, não está: pula).
// 2. Os componentes renderizam as 3 páginas com a fixture crua da API.
// 3. O CSS do preview não vaza para a landing (sem :root, sem @media de largura).
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { describe, expect, it } from 'vitest'
import PreviewSite from '../components/site-preview/PreviewSite.vue'
import fixture from '../data/siteModels/fixtures/wl-fixture.json'
import {
  aboutTexts,
  formatCurrency,
  formatDuration,
  formatOpeningHours,
  formatUnitAddress,
  homeTexts,
  imageFailed,
  normalizeBrWhatsapp,
  previewFromWlPayload,
  showsWhatsapp,
  telHref,
  type PreviewPage,
  type WlPublicPayload,
} from '../utils/sitePreview'

const file = (rel: string) => fileURLToPath(new URL(rel, import.meta.url))
const WL = file('../../white-label/utils/')
const hasWl = existsSync(`${WL}publicSite.ts`)
const payload = fixture as unknown as WlPublicPayload

describe.skipIf(!hasWl)('espelho do white-label', () => {
  it('theme.ts é cópia byte a byte (scripts/sync-theme.sh)', () => {
    expect(readFileSync(file('../utils/theme.ts'), 'utf8')).toBe(readFileSync(`${WL}theme.ts`, 'utf8'))
  })

  it('horário, endereço e telefone = utils/publicSite.ts', async () => {
    const wl = await import('../../white-label/utils/publicSite')
    const cases = [
      payload.units[0].availabilities,
      [{ dayOfWeek: 0, startTime: '09:00', endTime: '13:00' }, { dayOfWeek: 6, startTime: '09:00', endTime: '13:00' }],
      [{ dayOfWeek: 1, startTime: '08:00', endTime: '12:00' }, { dayOfWeek: 1, startTime: '14:00', endTime: '18:00' }, { dayOfWeek: 3, startTime: '08:00', endTime: '12:00' }],
      [{ dayOfWeek: 9, startTime: '08:00', endTime: '12:00' }, { dayOfWeek: 2, startTime: '18:00', endTime: '08:00' }],
      null,
    ]
    for (const c of cases) expect(formatOpeningHours(c as any)).toEqual(wl.formatOpeningHours(c as any))
    const units = [payload.units[0], { id: 2, address: 'Rua A', city: 'Santos' }, { id: 3 }]
    for (const u of units) expect(formatUnitAddress(u as any)).toBe(wl.formatUnitAddress(u as any))
    for (const p of ['(19) 3232-1000', '+55 11 98765-4321', '123', '', null]) expect(telHref(p)).toBe(wl.telHref(p))
  })

  it('validação do WhatsApp = utils/whatsapp.ts', async () => {
    const wl = await import('../../white-label/utils/whatsapp')
    for (const n of ['11987654321', '(11) 98765-4321', '+55 11 98765-4321', '5511987654321', '1133334444', '00987654321', '11999999999', 'abc', '', null]) {
      expect(normalizeBrWhatsapp(n)).toBe(wl.normalizeBrWhatsapp(n))
    }
  })

  it('preço e duração = utils/formatters.ts', async () => {
    const wl = await import('../../white-label/utils/formatters')
    for (const v of [0, 80, 950, 1234.5, '120.00']) expect(formatCurrency(v)).toBe(wl.formatCurrency(v))
    for (const ms of [1800000, 3000000, 3600000, 5400000]) expect(formatDuration(ms)).toBe(wl.formatDuration(ms))
  })
})

describe('imageFailed (fallback do hero)', () => {
  it('só é falha a imagem que terminou de carregar sem pixels', () => {
    expect(imageFailed({ complete: true, naturalWidth: 0 })).toBe(true)
    expect(imageFailed({ complete: true, naturalWidth: 1600 })).toBe(false)
    expect(imageFailed({ complete: false, naturalWidth: 0 })).toBe(false) // ainda carregando: o @error decide
    expect(imageFailed(null)).toBe(false)
    expect(imageFailed(undefined)).toBe(false)
  })

  it('o PreviewHero confere a falha no mount (erro antes da hidratação)', () => {
    const src = readFileSync(file('../components/site-preview/PreviewHero.vue'), 'utf8')
    expect(src).toMatch(/onMounted\(\(\) => \{ if \(imageFailed\(img\.value\)\) imgError\.value = true \}\)/)
    expect(src).toMatch(/<img ref="img"[^>]*@error="imgError = true"/)
  })
})

describe('previewFromWlPayload', () => {
  const site = previewFromWlPayload(payload)

  it('aplica as regras do WL: serviço inativo fora, canBook pelos módulos', () => {
    expect(site.name).toBe('Espaço Exemplo')
    expect(site.services.map(s => s.name)).not.toContain('Serviço desativado')
    expect(site.canBook).toBe(false)
    expect(previewFromWlPayload({ ...payload, website: { ...payload.website, modules: ['scheduling'] } }).canBook).toBe(true)
    expect(previewFromWlPayload({ ...payload, website: { ...payload.website, modules: null } }).canBook).toBe(true)
  })

  it('WhatsApp só no "Só Site" com número válido', () => {
    expect(showsWhatsapp(site)).toBe(true)
    expect(showsWhatsapp({ ...site, canBook: true })).toBe(false)
    expect(showsWhatsapp({ ...site, whatsapp: '1133334444' })).toBe(false)
  })

  it('textos da home e do /sobre seguem a regra do WL', () => {
    const home = homeTexts(site)
    expect(home.headline).toBe('Fisioterapia em Centro, Campinas - SP')
    expect(home.subheadline).toBe('5 serviços e 3 profissionais em Centro, Campinas - SP.')
    // O SEGMENT_MAP do sobre.vue não conhece fisioterapia: cai no genérico.
    const about = aboutTexts(site)
    expect(about.segmentLabel).toBe('Agendamento Online')
    expect(about.differentials.map(d => d.title)).toEqual(['Profissionais qualificados'])
    expect(about.aboutParagraphs[0]).toBe(payload.website.description)
  })
})

async function render(page: PreviewPage, overrides: Partial<ReturnType<typeof previewFromWlPayload>> = {}) {
  const site = { ...previewFromWlPayload(payload), ...overrides }
  const app = createSSRApp({
    render: () => h(PreviewSite, { site, theme: { preset: 'clean', font: 'classica', radius: 'md' }, page, footerYear: 2026 }),
  })
  return renderToString(app)
}

describe('PreviewSite (SSR)', () => {
  it('Início: hero, categorias, cards com preço e duração, profissionais, contato', async () => {
    const html = await render('inicio')
    expect(html).toContain('Cuidado de perto, no seu ritmo')
    expect(html).toContain('Atendimento')
    expect(html).toContain('Outros') // serviço sem categoria
    expect(html).toContain(formatCurrency(950))
    expect(html).toContain('50min')
    expect(html).toContain('Chamar no WhatsApp')
    expect(html).toContain('Nossos Profissionais')
    expect(html).toContain('Onde estamos')
    expect(html).toContain('Segunda a Sexta')
    expect(html).toContain('© 2026 Espaço Exemplo')
  })

  it('com agenda: CTA "Agendar" e nada de WhatsApp na home', async () => {
    const html = await render('inicio', { canBook: true })
    expect(html).toContain('Agendar')
    expect(html).not.toContain('WhatsApp')
  })

  it('/sobre com agenda: o botão de WhatsApp do topo continua (regra do WL)', async () => {
    const html = await render('sobre', { canBook: true })
    expect(html.match(/Falar no WhatsApp/g)).toHaveLength(1)
    expect(html).toContain('Agendar meu horário')
  })

  it('Sobre e Como chegar', async () => {
    const sobre = await render('sobre')
    expect(sobre).toContain('Por que escolher a Espaço Exemplo?')
    expect(sobre).toContain('Ficou com alguma dúvida?')
    const loc = await render('como-chegar')
    expect(loc).toContain('Nossa Unidade em Campinas')
    expect(loc).toContain('Estamos em Centro, Campinas, SP.')
  })

  it('tema vai como variáveis locais no .sp-root (nunca no :root)', async () => {
    const html = await render('inicio')
    const root = html.match(/<div class="sp-root" style="([^"]*)"/)
    expect(root).not.toBeNull()
    expect(root![1]).toContain('--primary:#0f766e')
    expect(root![1]).toContain('--card-radius:8px')
    expect(root![1]).toMatch(/--heading-font:(&#39;|')Libre Baskerville/)
  })
})

describe('site-preview.css', () => {
  const css = readFileSync(file('../assets/css/site-preview.css'), 'utf8')
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, '')

  it('não mexe no :root nem em tokens da landing', () => {
    expect(rules).not.toMatch(/:root\b/)
    expect(rules).not.toMatch(/--color-/)
    expect(rules).not.toMatch(/@theme/)
  })

  it('layout por container query, não pela janela', () => {
    expect(rules).not.toMatch(/@media[^{]*width/)
    expect(rules).toMatch(/container:\s*sp\s*\/\s*inline-size/)
    expect(rules).toMatch(/@container sp \(min-width: 48rem\)/)
  })

  it('toda regra fora dos @import/@container começa por .sp-', () => {
    const selectors = [...rules.replace(/@import[^;]+;/g, '').replace(/@container[^{]+\{/g, '').matchAll(/(^|})\s*([^{}@]+)\{/g)]
      .map(m => m[2].trim())
      .filter(Boolean)
    for (const sel of selectors) {
      // vírgulas de 1º nível (não as de dentro de :where(...))
      for (const part of sel.split(/,(?![^(]*\))/)) expect(part.trim(), sel).toMatch(/^(:where\()?\.sp-/)
    }
  })
})
