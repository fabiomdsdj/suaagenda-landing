// tests/siteConfigurator.test.ts — configurador "site já pronto" (etapa 4)
//
// Estado em memória (useSiteConfigurator), imagem local (useLocalImage) e o
// render SSR dos componentes. Sem DOM real: o fluxo no navegador fica no
// scripts/e2e-configurator.mjs.
import { createSSRApp, effectScope, h, nextTick } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { describe, expect, it, vi } from 'vitest'
import fisioterapia from '../data/siteModels/fisioterapia'
import { SITE_DURATIONS_MIN, SITE_MAX_PACKAGE_SESSIONS, SITE_MAX_PRICE, type SiteContent } from '../data/siteModels/types'
import { servicesWithPackages } from '../utils/sitePackages'
import {
  CONFIGURATOR_LIMITS,
  SITE_MAX_SERVICES,
  SWITCH_MODEL_CONFIRM,
  cleanText,
  identityOf,
  parsePrice,
  parseSessions,
  useSiteConfigurator,
} from '../composables/useSiteConfigurator'
import {
  LOCAL_IMAGE_MAX_BYTES,
  LOCAL_IMAGE_MESSAGES,
  checkImageFile,
  fitWithin,
  useLocalImage,
  type LocalImageDeps,
} from '../composables/useLocalImage'
import { THEME_FONT_IDS, THEME_PRESET_IDS, THEME_PRESETS, THEME_RADIUS_IDS, normalizeHex, presetBrandColors } from '../utils/theme'
import SiteConfigurator from '../components/site-configurator/SiteConfigurator.vue'

const [clinica, reabilitacao, profissional] = fisioterapia.models
const snapshot = JSON.stringify(fisioterapia)
const make = () => useSiteConfigurator(fisioterapia, { initialModelId: 'clinica' })

/** O conteúdo continua no formato que o resto do sistema espera. */
function expectValidContent(c: SiteContent) {
  expect(c.businessName).toBeTypeOf('string')
  for (const k of ['heroText', 'tagline', 'heroImage', 'whatsapp'] as const) expect(c[k]).toBeTypeOf('string')
  expect(Array.isArray(c.about) && c.about.every(p => typeof p === 'string')).toBe(true)
  expect(c.services.length).toBeGreaterThanOrEqual(1)
  expect(c.services.length).toBeLessThanOrEqual(SITE_MAX_SERVICES)
  const categoryIds = new Set(c.categories.map(k => k.id))
  for (const s of c.services) {
    expect(s.name.length).toBeLessThanOrEqual(CONFIGURATOR_LIMITS.serviceName)
    expect(Number.isFinite(s.price) && s.price > 0 && s.price <= SITE_MAX_PRICE).toBe(true)
    expect(SITE_DURATIONS_MIN).toContain(s.durationMin)
    expect(categoryIds.has(s.categoryId)).toBe(true)
  }
  for (const p of c.packages ?? []) {
    expect(p.name.length).toBeLessThanOrEqual(CONFIGURATOR_LIMITS.packageName)
    expect(Number.isInteger(p.sessions) && p.sessions >= 1 && p.sessions <= SITE_MAX_PACKAGE_SESSIONS).toBe(true)
    expect(Number.isFinite(p.price) && p.price > 0 && p.price <= SITE_MAX_PRICE).toBe(true)
    expect(categoryIds.has(p.categoryId)).toBe(true)
  }
  for (const p of c.professionals) {
    expect(p.name).toBeTypeOf('string')
    expect(p.role).toBeTypeOf('string')
  }
  for (const k of ['street', 'neighborhood', 'city', 'state', 'phone'] as const) expect(c.unit[k]).toBeTypeOf('string')
}

// ─── Estado ──────────────────────────────────────────────────────────────────

describe('useSiteConfigurator: estado', () => {
  it('1. estado inicial = modelo Clínica, identidade do modelo, sem dirty', () => {
    const cfg = make()
    expect(cfg.modelId.value).toBe('clinica')
    expect({ ...cfg.identity }).toEqual(identityOf(clinica))
    expect(cfg.identity).toMatchObject({ businessName: 'Clínica Movimento', logo: null, heroImage: null, primaryColor: null, preset: 'clean', font: 'classica', radius: 'md' })
    expect(cfg.content.value).toEqual(clinica.content)
    expect(cfg.content.value).not.toBe(clinica.content)
    expect(cfg.dirty.value).toBe(false)
    expect(cfg.preview.value.name).toBe('Clínica Movimento')
    expect(cfg.preview.value.canBook).toBe(false)
    expect(cfg.theme.value).toEqual({ preset: 'clean', font: 'classica', radius: 'md' })
  })

  it('modelo inicial desconhecido cai no 1º; a identidade exposta é só leitura', () => {
    const cfg = useSiteConfigurator(fisioterapia, { initialModelId: 'nao-existe' })
    expect(cfg.modelId.value).toBe('clinica')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    ;(cfg.identity as { businessName: string }).businessName = 'hack'
    warn.mockRestore()
    expect(cfg.identity.businessName).toBe('Clínica Movimento')
  })

  it('2. editar o nome muda o preview e os placeholders', () => {
    const cfg = make()
    cfg.setBusinessName('Studio Fisio Fabio')
    expect(cfg.identity.businessName).toBe('Studio Fisio Fabio')
    expect(cfg.preview.value.name).toBe('Studio Fisio Fabio')
    expect(cfg.preview.value.units[0].name).toBe('Studio Fisio Fabio')
    // /sobre do Clínica tem {negocio}
    expect(cfg.preview.value.description).toContain('A Studio Fisio Fabio reúne')
    expect(cfg.textOf('about')).toContain('A Studio Fisio Fabio reúne')
    expect(cfg.dirty.value).toBe(true)
    expect(cfg.contentDirty.value).toBe(false)
  })

  it('3. editar texto: vira o texto do visitante, com limite e sem quebra de linha', () => {
    const cfg = make()
    cfg.setText('heroText', 'Fisioterapia perto de você')
    expect(cfg.preview.value.heroText).toBe('Fisioterapia perto de você')
    cfg.setText('about', 'Linha 1\nLinha 2')
    expect(cfg.content.value.about).toEqual(['Linha 1 Linha 2'])
    expect(cfg.preview.value.description).toBe('Linha 1 Linha 2')
    cfg.setText('tagline', 'x'.repeat(500))
    expect(cfg.content.value.tagline).toHaveLength(CONFIGURATOR_LIMITS.tagline)
    expect(cfg.contentDirty.value).toBe(true)
    // texto editado não acompanha mais o nome
    cfg.setText('about', cfg.textOf('about'))
    cfg.setBusinessName('Outro Nome')
    expect(cfg.textOf('about')).toBe('Linha 1 Linha 2')
    // campo desconhecido é ignorado
    cfg.setText('businessName' as never, 'x')
    expect(cfg.content.value.businessName).toBe(clinica.content.businessName)
  })

  it('4. editar serviço: nome, preço (número ou texto BR) e categoria existente', () => {
    const cfg = make()
    expect(cfg.updateService(0, { name: 'Avaliação completa', price: '199,90' })).toBe(true)
    expect(cfg.content.value.services[0]).toMatchObject({ name: 'Avaliação completa', price: 199.9 })
    expect(cfg.preview.value.services[0]).toMatchObject({ name: 'Avaliação completa', price: 199.9 })
    cfg.updateService(0, { price: 250 })
    expect(cfg.content.value.services[0].price).toBe(250)
    cfg.updateService(0, { categoryId: 'pilates' })
    expect(cfg.preview.value.services[0].categories[0].name).toBe('Pilates')
    // o modelo original não mudou
    expect(clinica.content.services[0].name).toBe('Avaliação fisioterapêutica')
  })

  it('5. remover serviço (nunca esvazia o catálogo)', () => {
    const cfg = make()
    const second = cfg.content.value.services[1].name
    expect(cfg.removeService(0)).toBe(true)
    expect(cfg.content.value.services).toHaveLength(7)
    expect(cfg.content.value.services[0].name).toBe(second)
    while (cfg.content.value.services.length > 1) cfg.removeService(0)
    expect(cfg.canRemoveService.value).toBe(false)
    expect(cfg.removeService(0)).toBe(false)
    expect(cfg.content.value.services).toHaveLength(1)
    expect(cfg.removeService(5)).toBe(false)
  })

  it('6. adicionar serviço: fim da lista, categoria que já existe', () => {
    const cfg = make()
    const index = cfg.addService()
    expect(index).toBe(8)
    const added = cfg.content.value.services[8]
    expect(added.name).toBe('Novo serviço')
    expect(clinica.content.categories.map(c => c.id)).toContain(added.categoryId)
    expect(added.categoryId).toBe('pilates') // a do último serviço
    expect(cfg.content.value.categories).toEqual(clinica.content.categories) // nenhuma nova
    expect(cfg.preview.value.services).toHaveLength(9)
  })

  it('7. limite de 12 serviços', () => {
    const cfg = make()
    while (cfg.canAddService.value) cfg.addService()
    expect(cfg.content.value.services).toHaveLength(SITE_MAX_SERVICES)
    expect(SITE_MAX_SERVICES).toBe(12)
    expect(cfg.addService()).toBe(-1)
    expect(cfg.content.value.services).toHaveLength(12)
  })

  it('8. reset volta ao modelo como veio (identidade e conteúdo)', () => {
    const cfg = make()
    cfg.setBusinessName('Studio X')
    cfg.setPreset('rose')
    cfg.setLogo('blob:http://x/1')
    cfg.removeService(0)
    cfg.updateContact({ city: 'Santos' })
    cfg.reset()
    expect({ ...cfg.identity }).toEqual(identityOf(clinica))
    expect(cfg.content.value).toEqual(clinica.content)
    expect(cfg.dirty.value).toBe(false)
  })

  it('9. dirty: identidade, conteúdo e volta ao original', () => {
    const cfg = make()
    expect(cfg.dirty.value).toBe(false)
    cfg.setFont('impacto')
    expect(cfg.dirty.value).toBe(true)
    expect(cfg.identityDirty.value).toBe(true)
    cfg.setFont('classica')
    expect(cfg.dirty.value).toBe(false)
    cfg.updateService(1, { price: 1 })
    expect(cfg.contentDirty.value).toBe(true)
    cfg.updateService(1, { price: clinica.content.services[1].price })
    expect(cfg.dirty.value).toBe(false)
    // editar sem mudar nada não suja
    cfg.setBusinessName('Clínica Movimento')
    expect(cfg.dirty.value).toBe(false)
  })
})

// ─── Troca de modelo ─────────────────────────────────────────────────────────

describe('useSiteConfigurator: troca de modelo', () => {
  it('10. troca o modelo e o conteúdo (serviços, textos, visual do modelo)', () => {
    const cfg = make()
    expect(cfg.selectModel('reabilitacao')).toBe(true)
    expect(cfg.modelId.value).toBe('reabilitacao')
    expect(cfg.model.value.label).toBe('Pós-Operatória')
    expect(cfg.content.value).toEqual(reabilitacao.content)
    // serviços e, depois, os pacotes como serviços
    expect(cfg.preview.value.services.map(s => s.name)).toEqual(servicesWithPackages(reabilitacao.content).map(s => s.name))
    // sem visual editado, o visual é o do novo modelo
    expect(cfg.theme.value).toEqual(reabilitacao.theme)
    expect(cfg.dirty.value).toBe(false)
    expect(cfg.selectModel('nao-existe')).toBe(false)
    expect(cfg.selectModel('reabilitacao')).toBe(true) // o mesmo: nada muda
  })

  it('11. a identidade editada permanece (nome, imagens, visual)', () => {
    const cfg = make()
    cfg.setBusinessName('Studio Fisio Fabio')
    cfg.setLogo('blob:http://x/logo')
    cfg.setHeroImage('blob:http://x/hero')
    cfg.setPrimaryColor('#1e88e5')
    cfg.selectModel('reabilitacao')
    expect(cfg.identity).toMatchObject({
      businessName: 'Studio Fisio Fabio',
      logo: 'blob:http://x/logo',
      heroImage: 'blob:http://x/hero',
      primaryColor: '#1e88e5',
      preset: 'clean', font: 'classica', radius: 'md', // visual é um grupo
    })
    expect(cfg.preview.value.name).toBe('Studio Fisio Fabio')
    expect(cfg.preview.value.logo).toBe('blob:http://x/logo')
    expect(cfg.preview.value.heroImage).toBe('blob:http://x/hero')
    expect(cfg.preview.value.description).toContain('Na Studio Fisio Fabio, a recuperação')
    // identidade editada = dirty mesmo com o conteúdo novo intacto
    expect(cfg.contentDirty.value).toBe(false)
    expect(cfg.dirty.value).toBe(true)
    cfg.selectModel('profissional')
    expect(cfg.identity.businessName).toBe('Studio Fisio Fabio')
  })

  it('o que o visitante não mexeu segue o modelo novo', () => {
    const cfg = make()
    cfg.selectModel('profissional')
    expect(cfg.identity.businessName).toBe('Dra. Mariana Alves Fisioterapia')
    expect(cfg.theme.value).toEqual(profissional.theme)
    expect(cfg.preview.value.heroImage).toBe(profissional.content.heroImage)
  })

  it('12. o conteúdo editado é substituído pelo do modelo novo', () => {
    const cfg = make()
    cfg.setText('heroText', 'Meu título')
    cfg.updateService(0, { name: 'Meu serviço' })
    cfg.updateContact({ phone: '(11) 1234-5678' })
    cfg.selectModel('profissional')
    expect(cfg.content.value).toEqual(profissional.content)
    expect(cfg.preview.value.heroText).toBe(profissional.content.heroText)
    expect(cfg.content.value).not.toBe(profissional.content)
  })

  it('13. confirmação só com conteúdo editado; recusar mantém tudo', () => {
    const cfg = make()
    const confirm = vi.fn(() => false)
    cfg.setBusinessName('Só identidade')
    expect(cfg.needsSwitchConfirm.value).toBe(false)
    expect(cfg.selectModel('reabilitacao', confirm)).toBe(true)
    expect(confirm).not.toHaveBeenCalled()

    cfg.updateService(0, { name: 'Editado' })
    expect(cfg.needsSwitchConfirm.value).toBe(true)
    expect(cfg.selectModel('profissional', confirm)).toBe(false)
    expect(confirm).toHaveBeenCalledWith(SWITCH_MODEL_CONFIRM)
    expect(SWITCH_MODEL_CONFIRM).toBe('Trocar de modelo substitui textos e serviços. Continuar?')
    expect(cfg.modelId.value).toBe('reabilitacao')
    expect(cfg.content.value.services[0].name).toBe('Editado')

    expect(cfg.selectModel('profissional', () => true)).toBe(true)
    expect(cfg.modelId.value).toBe('profissional')
  })

  it('nenhuma edição muta os dados do modelo', () => {
    const cfg = make()
    cfg.setBusinessName('X')
    cfg.setText('about', 'Y')
    cfg.updateService(0, { name: 'Z', price: 1 })
    cfg.removeService(1)
    cfg.addService()
    cfg.updateProfessional(0, { name: 'P', role: 'R' })
    cfg.updateContact({ street: 'S', whatsapp: '11999990000' })
    cfg.selectModel('reabilitacao', () => true)
    cfg.updateService(0, { name: 'W' })
    cfg.reset()
    expect(JSON.stringify(fisioterapia)).toBe(snapshot)
  })
})

// ─── Visual, profissional, contato ───────────────────────────────────────────

describe('useSiteConfigurator: visual, profissional e contato', () => {
  it('14. cor passa por normalizeHex; vazio volta à cor do estilo', () => {
    const cfg = make()
    expect(cfg.setPrimaryColor('#ABC')).toBe(true)
    expect(cfg.identity.primaryColor).toBe(normalizeHex('#ABC'))
    expect(cfg.identity.primaryColor).toBe('#aabbcc')
    expect(cfg.setPrimaryColor(' #1E88E5 ')).toBe(true)
    expect(cfg.identity.primaryColor).toBe('#1e88e5')
    for (const bad of ['red', '#12345', 'rgb(0,0,0)', '#000;background:url(x)', 'var(--x)', 42, {}, undefined]) {
      expect(cfg.setPrimaryColor(bad)).toBe(false)
      expect(cfg.identity.primaryColor).toBe('#1e88e5')
    }
    expect(cfg.setPrimaryColor('')).toBe(true)
    expect(cfg.identity.primaryColor).toBeNull()
  })

  it('estilo aplica fonte, cantos e cor dele; listas fechadas do theme.ts', () => {
    const cfg = make()
    cfg.setPrimaryColor('#123456')
    cfg.setPreset('preto-amarelo')
    expect(cfg.identity).toMatchObject({
      preset: 'preto-amarelo',
      font: THEME_PRESETS['preto-amarelo'].font,
      radius: THEME_PRESETS['preto-amarelo'].radius,
      primaryColor: null,
    })
    expect(presetBrandColors('preto-amarelo').primaryColor).toBe(THEME_PRESETS['preto-amarelo'].primary)
    for (const id of THEME_FONT_IDS) { cfg.setFont(id); expect(cfg.identity.font).toBe(id) }
    for (const id of THEME_RADIUS_IDS) { cfg.setRadius(id); expect(cfg.identity.radius).toBe(id) }
    expect(THEME_PRESET_IDS).toHaveLength(14)
    expect(THEME_FONT_IDS).toHaveLength(10)
    expect(THEME_RADIUS_IDS).toHaveLength(5)
    cfg.setPreset('nao-existe')
    cfg.setFont('Comic Sans')
    cfg.setRadius('999px')
    expect(cfg.theme.value).toEqual({ preset: 'preto-amarelo', font: 'minimalista', radius: 'full' })
  })

  it('imagem só aceita objectURL local', () => {
    const cfg = make()
    for (const bad of ['https://evil.test/x.png', 'javascript:alert(1)', 'data:image/png;base64,AAA', '/x.png']) {
      cfg.setLogo(bad)
      cfg.setHeroImage(bad)
    }
    expect(cfg.identity.logo).toBeNull()
    expect(cfg.identity.heroImage).toBeNull()
    cfg.setHeroImage('blob:http://localhost/abc')
    expect(cfg.preview.value.heroImage).toBe('blob:http://localhost/abc')
    cfg.setHeroImage(null)
    expect(cfg.preview.value.heroImage).toBe(clinica.content.heroImage)
  })

  it('profissional: nome e cargo com limite', () => {
    const cfg = make()
    expect(cfg.updateProfessional(0, { name: 'Dra. Ana Souza', role: 'Fisioterapeuta' })).toBe(true)
    expect(cfg.content.value.professionals[0]).toMatchObject({ name: 'Dra. Ana Souza', role: 'Fisioterapeuta' })
    expect(cfg.preview.value.employees[0].fullName).toBe('Dra. Ana Souza')
    cfg.updateProfessional(0, { name: 'n'.repeat(200) })
    expect(cfg.content.value.professionals[0].name).toHaveLength(CONFIGURATOR_LIMITS.professionalName)
    expect(cfg.updateProfessional(9, { name: 'x' })).toBe(false)
  })

  it('contato: telefone, WhatsApp, endereço e cidade ({cidade})', () => {
    const cfg = make()
    cfg.updateContact({ phone: '(11) 3000-0000', whatsapp: '(11) 99999-0000', street: 'Rua A, 1', neighborhood: 'Moema', city: 'São Paulo', state: 'sp' })
    const unit = cfg.preview.value.units[0]
    expect(unit).toMatchObject({ phone: '(11) 3000-0000', address: 'Rua A, 1', neighborhood: 'Moema', city: 'São Paulo', state: 'SP' })
    expect(cfg.preview.value.whatsapp).toBe('(11) 99999-0000')
    expect(cfg.preview.value.heroSubText).toContain('em São Paulo')
    // WhatsApp guarda só caracteres de telefone
    cfg.updateContact({ whatsapp: '11 99999-0000<script>' })
    expect(cfg.content.value.whatsapp).toBe('11 99999-0000')
    cfg.updateContact({ state: 'S1P2X' })
    expect(cfg.content.value.unit.state).toBe('SP')
  })
})

// ─── Entradas inválidas ──────────────────────────────────────────────────────

describe('useSiteConfigurator: pacotes (Pós-Operatória)', () => {
  const makePosOp = () => useSiteConfigurator(fisioterapia, { initialModelId: 'reabilitacao' })

  it('edita nome, sessões e preço; o preview mostra o pacote como serviço', () => {
    const cfg = makePosOp()
    expect(cfg.updatePackage(0, { name: 'Começo', sessions: '6', price: '800,00' })).toBe(true)
    expect(cfg.content.value.packages![0]).toMatchObject({ id: 'recuperacao-inicial', name: 'Começo', sessions: 6, price: 800 })
    const card = cfg.preview.value.services.find(s => s.name === 'Começo (6 sessões)')
    expect(card?.price).toBe(800)
    expect(card?.categories[0].name).toBe('Pacotes')
    expect(cfg.contentDirty.value).toBe(true)
    // o original do modelo não muda
    expect(JSON.stringify(fisioterapia)).toBe(snapshot)
    cfg.reset()
    expect(cfg.content.value.packages).toEqual(reabilitacao.content.packages)
  })

  it('valores inválidos são recusados; modelo sem pacotes não quebra', () => {
    const cfg = makePosOp()
    const before = structuredClone(cfg.content.value)
    for (const sessions of [0, -1, 1.5, SITE_MAX_PACKAGE_SESSIONS + 1, '', 'abc', '2e1', null, NaN]) {
      expect(cfg.updatePackage(0, { sessions } as never)).toBe(false)
    }
    for (const price of [0, -10, 10_000, 'abc']) expect(cfg.updatePackage(0, { price })).toBe(false)
    for (const index of [-1, 1.5, 99, NaN]) expect(cfg.updatePackage(index, { name: 'x' })).toBe(false)
    expect(cfg.updatePackage(0, null as never)).toBe(false)
    expect(cfg.content.value).toEqual(before)
    expectValidContent(cfg.content.value)

    const clin = make()
    expect(clin.content.value.packages).toBeUndefined()
    expect(clin.updatePackage(0, { name: 'x' })).toBe(false)
  })

  it('parseSessions', () => {
    expect(parseSessions(10)).toBe(10)
    expect(parseSessions(' 4 ')).toBe(4)
    expect(parseSessions(SITE_MAX_PACKAGE_SESSIONS)).toBe(SITE_MAX_PACKAGE_SESSIONS)
    expect(parseSessions('0')).toBeNull()
    expect(parseSessions('4,5')).toBeNull()
  })

  it('o editor mostra a seção Pacotes só no modelo que tem pacotes', async () => {
    const render = (initialModelId: string) => renderToString(createSSRApp({ render: () => h(SiteConfigurator, { segment: fisioterapia, initialModelId }) }))
    const posOp = await render('reabilitacao')
    expect((posOp.match(/data-package-row/g) ?? []).length).toBe(4)
    expect(posOp).toContain('Recuperação Intensiva (10 sessões)')
    expect(posOp).toContain('Manutenção (4 sessões/mês)')
    expect(posOp).toContain('data-example-note')
    const clin = await render('clinica')
    expect(clin).not.toContain('data-section="pacotes"')
    expect(clin).toContain('data-example-note')
  })
})

describe('useSiteConfigurator: entradas inválidas (15)', () => {
  it('valores inválidos não quebram o modelo', () => {
    const cfg = make()
    const before = structuredClone(cfg.content.value)
    const junk: unknown[] = [null, undefined, {}, [], NaN, Infinity, -Infinity, Symbol('x'), () => 1]
    for (const v of junk) {
      cfg.setBusinessName(v)
      cfg.setText('heroText', v)
      cfg.setText('about', v)
      cfg.updateService(0, { name: v, price: v, categoryId: v } as never)
      cfg.updateProfessional(0, { name: v, role: v } as never)
      cfg.updateContact({ phone: v, city: v } as never)
      cfg.updateService(0, v as never)
      cfg.updateContact(v as never)
      cfg.setPreset(v)
      cfg.setFont(v)
      cfg.setRadius(v)
    }
    cfg.setBusinessName(42)
    for (const price of [0, -10, 10_000, '0,00', 'abc', '1e3', '12,345', '', ' ', '1..2', 'R$ -5']) {
      expect(cfg.updateService(0, { price })).toBe(false)
    }
    for (const index of [-1, 1.5, 99, NaN]) {
      expect(cfg.updateService(index, { name: 'x' })).toBe(false)
      expect(cfg.removeService(index)).toBe(false)
      expect(cfg.updateProfessional(index, { name: 'x' })).toBe(false)
    }
    expect(cfg.updateService(0, { categoryId: 'categoria-inventada' })).toBe(false)
    expect(cfg.content.value).toEqual(before)
    expect(cfg.identity.businessName).toBe('Clínica Movimento')
    expectValidContent(cfg.content.value)
  })

  it('o conteúdo continua válido depois de uma sequência de edições', () => {
    const cfg = make()
    for (let i = 0; i < 20; i++) cfg.addService()
    for (let i = 0; i < 20; i++) cfg.updateService(i % 12, { name: `s${i}`.repeat(30), price: i + 0.456 })
    for (let i = 0; i < 30; i++) cfg.removeService(0)
    cfg.addService()
    cfg.selectModel('profissional', () => true)
    cfg.addService()
    cfg.updateService(0, { categoryId: 'domiciliar' })
    expectValidContent(cfg.content.value)
    expect(cfg.content.value.services).toHaveLength(6)
  })

  it('parsePrice e cleanText', () => {
    expect(parsePrice('150')).toBe(150)
    expect(parsePrice('150,5')).toBe(150.5)
    expect(parsePrice('1.234,56')).toBe(1234.56)
    expect(parsePrice('1.200')).toBe(1200)
    expect(parsePrice('99.9')).toBe(99.9)
    expect(parsePrice('R$ 80,00')).toBe(80)
    expect(parsePrice(12.345)).toBe(12.35)
    expect(parsePrice(SITE_MAX_PRICE)).toBe(SITE_MAX_PRICE)
    expect(parsePrice(SITE_MAX_PRICE + 0.01)).toBeNull()
    expect(cleanText('a\u0000b\nc\td', 100)).toBe('a b c d')
    expect(cleanText('abc', 2)).toBe('ab')
    expect(cleanText(1, 10)).toBeNull()
  })

  it('texto com HTML é só texto (sem v-html no configurador)', async () => {
    const cfg = make()
    cfg.setBusinessName('<img src=x onerror=alert(1)>')
    expect(cfg.preview.value.name).toBe('<img src=x onerror=alert(1)>')
    const html = await renderToString(createSSRApp({ render: () => h(SiteConfigurator, { segment: fisioterapia }) }))
    expect(html).not.toMatch(/<img src=x/)
  })
})

// ─── Imagem local ────────────────────────────────────────────────────────────

describe('useLocalImage', () => {
  type FakeFile = { name: string; type: string; size: number; broken?: boolean }
  const file = (p: Partial<FakeFile> = {}): FakeFile => ({ name: 'foto.jpg', type: 'image/jpeg', size: 1000, ...p })

  function fakeDeps() {
    let n = 0
    const revoked: string[] = []
    const sizes: { width: number; height: number }[] = []
    const deps: LocalImageDeps<{ width: number; height: number; close: () => void }, FakeFile> = {
      decode: async (f) => {
        if (f.broken) throw new Error('decode')
        return { width: 4000, height: 3000, close: () => {} }
      },
      encode: async (_img, size) => { sizes.push(size); return new Blob(['x']) },
      createUrl: () => `blob:test/${++n}`,
      revokeUrl: url => { revoked.push(url) },
    }
    return { deps, revoked, sizes }
  }

  it('valida tipo e tamanho (8 MB)', () => {
    expect(checkImageFile(file())).toBeNull()
    expect(checkImageFile(file({ type: 'image/png' }))).toBeNull()
    expect(checkImageFile(file({ type: 'application/pdf' }))).toBe(LOCAL_IMAGE_MESSAGES.notImage)
    expect(checkImageFile(file({ type: 'image/svg+xml' }))).toBe(LOCAL_IMAGE_MESSAGES.notImage)
    expect(checkImageFile(file({ type: '' }))).toBe(LOCAL_IMAGE_MESSAGES.notImage)
    expect(checkImageFile(file({ type: '', name: 'IMG_1.HEIC' }))).toBeNull()
    expect(checkImageFile(file({ size: LOCAL_IMAGE_MAX_BYTES }))).toBeNull()
    expect(checkImageFile(file({ size: LOCAL_IMAGE_MAX_BYTES + 1 }))).toBe(LOCAL_IMAGE_MESSAGES.tooBig)
    expect(checkImageFile(file({ size: 0 }))).toBe(LOCAL_IMAGE_MESSAGES.notImage)
    expect(checkImageFile(null)).toBe(LOCAL_IMAGE_MESSAGES.notImage)
  })

  it('reduz no máximo 1600 (foto) e 400 (logo), sem aumentar', () => {
    expect(fitWithin(4000, 3000, 1600)).toEqual({ width: 1600, height: 1200 })
    expect(fitWithin(3000, 4000, 400)).toEqual({ width: 300, height: 400 })
    expect(fitWithin(800, 600, 1600)).toEqual({ width: 800, height: 600 })
    expect(fitWithin(0, 600, 1600)).toEqual({ width: 0, height: 0 })
  })

  it('gera objectURL, revoga a anterior, limpa e revoga ao sair', async () => {
    const { deps, revoked, sizes } = fakeDeps()
    const scope = effectScope()
    const img = scope.run(() => useLocalImage('photo', deps))!
    expect(await img.select(file())).toBe('blob:test/1')
    expect(img.url.value).toBe('blob:test/1')
    expect(sizes[0]).toEqual({ width: 1600, height: 1200 })
    await img.select(file())
    expect(img.url.value).toBe('blob:test/2')
    expect(revoked).toEqual(['blob:test/1'])
    img.clear()
    expect(img.url.value).toBeNull()
    expect(revoked).toEqual(['blob:test/1', 'blob:test/2'])
    await img.select(file())
    scope.stop()
    expect(revoked).toContain('blob:test/3')
    expect(img.url.value).toBeNull()
  })

  it('logo sai com 400px', async () => {
    const { deps, sizes } = fakeDeps()
    const img = useLocalImage('logo', deps)
    await img.select(file())
    expect(sizes[0]).toEqual({ width: 400, height: 300 })
  })

  it('erros: arquivo inválido, grande demais e HEIC que o navegador não abre', async () => {
    const { deps } = fakeDeps()
    const img = useLocalImage('photo', deps)
    expect(await img.select(file({ type: 'text/plain' }))).toBeNull()
    expect(img.error.value).toBe(LOCAL_IMAGE_MESSAGES.notImage)
    await img.select(file({ size: 9 * 1024 * 1024 }))
    expect(img.error.value).toBe(LOCAL_IMAGE_MESSAGES.tooBig)
    await img.select(file({ type: 'image/heic', name: 'IMG_1.HEIC', broken: true }))
    expect(img.error.value).toBe(LOCAL_IMAGE_MESSAGES.heic)
    await img.select(file({ broken: true }))
    expect(img.error.value).toBe(LOCAL_IMAGE_MESSAGES.decode)
    expect(img.url.value).toBeNull()
    expect(img.busy.value).toBe(false)
    // um arquivo bom depois limpa o erro
    await img.select(file())
    expect(img.error.value).toBe('')
    expect(img.url.value).toBe('blob:test/1')
  })

  it('seleção mais nova vence; a antiga é revogada', async () => {
    const { deps, revoked } = fakeDeps()
    const releases: (() => void)[] = []
    const slow: typeof deps = {
      ...deps,
      decode: () => new Promise((resolve) => { releases.push(() => resolve({ width: 10, height: 10, close: () => {} })) }),
    }
    const img = useLocalImage('photo', slow)
    const first = img.select(file())
    const second = img.select(file())
    // a 2ª termina antes da 1ª: o resultado da 1ª chega atrasado e é descartado
    releases[1]()
    await second
    releases[0]()
    await Promise.all([first, second])
    await nextTick()
    expect(img.url.value).toBe('blob:test/1')
    expect(revoked).toEqual(['blob:test/2'])
  })
})

// ─── Componentes (SSR) ───────────────────────────────────────────────────────

describe('SiteConfigurator (SSR)', () => {
  it('renderiza modelos, editor com as listas do theme.ts, preview e CTA', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(SiteConfigurator, { segment: fisioterapia }) }))
    for (const m of fisioterapia.models) expect(html).toContain(`data-model="${m.id}"`)
    expect(html).toContain('Escolha um modelo')
    expect((html.match(/data-preset="/g) ?? []).length).toBe(14)
    expect((html.match(/data-font="/g) ?? []).length).toBe(10)
    expect((html.match(/data-radius="/g) ?? []).length).toBe(5)
    for (const id of THEME_PRESET_IDS) expect(html).toContain(THEME_PRESETS[id].label.replace(/&/g, '&amp;'))
    expect(html).toContain('class="sp-root"')
    expect(html).toContain('Clínica Movimento')
    expect(html).toContain('Gostou desse modelo? Seu site pode começar assim.')
    expect((html.match(/data-service-row/g) ?? []).length).toBe(8)
    // nenhum tema no :root / fora do preview
    expect(html).not.toMatch(/:root/)
    expect(html).not.toContain('v-html')
  })
})
