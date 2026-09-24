// data/segmentos.ts
// Segmentos atendidos pela plataforma — fonte única da grade da home (/).
//
// Para lançar um segmento: crie a página dele (ex.: pages/salao-de-beleza.vue)
// e troque o status para 'ativo'. Enquanto estiver 'em-breve' o card não tem
// link. Atenção: sem arquivo próprio, /<slug> cai no catch-all pages/[slug].vue.
//
// planSegment é a key usada em /barbearia/choose-plan?segment=<planSegment>
// (SEGMENT_META do choose-plan).

export type SegmentoStatus = 'ativo' | 'em-breve'

export interface Segmento {
  key:         string
  slug:        string
  label:       string
  emoji:       string
  description: string
  status:      SegmentoStatus
  planSegment: string
}

export const segmentos: Segmento[] = [
  {
    key:         'barbearia',
    slug:        'barbearia',
    label:       'Barbearia',
    emoji:       '💈',
    description: 'Agenda online, página própria no Google e confirmações pelo WhatsApp para barbearias e barbeiros.',
    status:      'ativo',
    planSegment: 'barber',
  },
  {
    key:         'salao-de-beleza',
    slug:        'salao-de-beleza',
    label:       'Salão de Beleza',
    emoji:       '💇',
    description: 'Agendamento de cortes, coloração e tratamentos com a agenda de cada profissional do salão.',
    status:      'em-breve',
    planSegment: 'salon',
  },
  {
    key:         'estetica',
    slug:        'estetica',
    label:       'Estética',
    emoji:       '✨',
    description: 'Sessões, pacotes e retornos de procedimentos estéticos organizados em uma só agenda.',
    status:      'em-breve',
    planSegment: 'estetica',
  },
  {
    key:         'fisioterapia',
    slug:        'fisioterapia',
    label:       'Fisioterapia',
    emoji:       '🧘',
    description: 'Agenda de sessões e acompanhamento de pacientes para clínicas e fisioterapeutas.',
    status:      'em-breve',
    planSegment: 'physio',
  },
  {
    key:         'petshop',
    slug:        'petshop',
    label:       'Pet Shop',
    emoji:       '🐾',
    description: 'Banho, tosa e atendimentos agendados online, com lembretes automáticos para os tutores.',
    status:      'em-breve',
    planSegment: 'petshop',
  },
]

export function segmentoPath(s: Segmento): string {
  return `/${s.slug}`
}

export default segmentos
