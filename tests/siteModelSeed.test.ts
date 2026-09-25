// tests/siteModelSeed.test.ts — base inicial do site gerada dos modelos
// (utils/siteModelSeed.ts), que scripts/sync-site-models.sh copia para a API.
import { describe, expect, it } from 'vitest'
import { SITE_MODEL_SEGMENTS, loadSiteModels } from '../data/siteModels'
import fisioterapia from '../data/siteModels/fisioterapia'
import { buildSiteModelSeeds, siteModelSeed, withoutCity } from '../utils/siteModelSeed'

describe('withoutCity', () => {
  it('tira "em {cidade}" com ou sem vírgula antes', () => {
    expect(withoutCity('Barbearia tradicional em {cidade}, com corte')).toBe('Barbearia tradicional, com corte')
    expect(withoutCity('Atendo em consultório e em domicílio, em {cidade}.')).toBe('Atendo em consultório e em domicílio.')
    expect(withoutCity('Sem cidade aqui.')).toBe('Sem cidade aqui.')
  })

  it('{cidade} fora do padrão é erro (o export falha em vez de gerar texto quebrado)', () => {
    expect(() => withoutCity('{cidade} é a melhor')).toThrow(/cidade/)
  })
})

describe('buildSiteModelSeeds', () => {
  it('todos os segmentos registrados geram base, por segment_types.name', async () => {
    const segments = await Promise.all(Object.keys(SITE_MODEL_SEGMENTS).map(async s => (await loadSiteModels(s))!))
    const seeds = buildSiteModelSeeds(segments)
    expect(Object.keys(seeds)).toEqual(['physio', 'barber'])
    expect(Object.keys(seeds.physio)).toEqual(['clinica', 'reabilitacao', 'profissional'])
    expect(Object.keys(seeds.barber)).toEqual(['classica', 'premium', 'autonomo'])
  })

  it('segmentType repetido é erro', () => {
    expect(() => buildSiteModelSeeds([fisioterapia, fisioterapia])).toThrow(/repetido/)
  })

  it('fisioterapia: base = tema e textos do modelo, sem mexer nos dados do modelo', () => {
    const snapshot = JSON.stringify(fisioterapia)
    const seed = siteModelSeed(fisioterapia.models[0])
    expect(seed).toEqual({
      theme: { preset: 'clean', font: 'classica', radius: 'md' },
      heroText: 'Cuidado completo para você se movimentar melhor',
      heroSubText: 'Ortopedia, fisioterapia esportiva e pilates, com uma equipe que acompanha cada etapa.',
      description: 'A {negocio} reúne fisioterapeutas de diferentes áreas para acompanhar você da primeira avaliação à alta. Cada plano de tratamento é montado depois da avaliação e revisto ao longo das sessões, junto com você.',
    })
    expect(JSON.stringify(fisioterapia)).toBe(snapshot)
  })
})
