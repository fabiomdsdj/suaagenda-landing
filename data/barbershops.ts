// data/barbershops.ts — VERSÃO FINAL

export interface BarbershopService {
  id: string
  name: string
  slug: string
  category: 'corte' | 'barba' | 'tratamento' | 'combo' | 'outro'
  description?: string
  price: number
  priceMin?: number
  priceMax?: number
  durationMin: number
  isActive: boolean
  isFeatured: boolean
  seoTag?: string
  sortOrder: number
}

export interface Barbershop {
  id: string
  name: string
  slug: string
  subdomain?: string
  status: 'pending' | 'active' | 'suspended' | 'churned'
  plan: 'free' | 'basic' | 'pro' | 'enterprise'
  isClaimed: boolean
  importedFrom?: 'google_maps' | 'manual' | 'api'
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  street?: string
  number?: string
  complement?: string
  neighborhood: string
  neighborhoodSlug: string
  city: string
  citySlug: string
  uf: string
  ufSlug: string
  zipCode?: string
  latitude?: number
  longitude?: number
  description?: string
  metaTitle?: string
  metaDescription?: string
  coverImageUrl?: string
  logoUrl?: string
  photos?: string[]
  googlePlaceId?: string
  googleRating?: number
  googleReviewCount?: number
  nativeRating?: number
  nativeReviewCount?: number
  featured?: boolean
  openingHours?: {
    mon?: { open: string; close: string } | null
    tue?: { open: string; close: string } | null
    wed?: { open: string; close: string } | null
    thu?: { open: string; close: string } | null
    fri?: { open: string; close: string } | null
    sat?: { open: string; close: string } | null
    sun?: { open: string; close: string } | null
  }
  services: BarbershopService[]
}

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────

export const allBarbershops: Barbershop[] = [
  {
    id: 'barb_001',
    name: 'Barbearia do Zé',
    slug: 'barbearia-do-ze',
    subdomain: 'barbearia-do-ze',
    status: 'active',
    plan: 'pro',
    isClaimed: true,
    importedFrom: 'manual',
    phone: '13991234567',
    whatsapp: '13991234567',
    neighborhood: 'Centro',
    neighborhoodSlug: 'centro',
    city: 'Peruíbe',
    citySlug: 'peruibe',
    uf: 'SP',
    ufSlug: 'sp',
    street: 'Rua XV de Novembro',
    number: '123',
    latitude: -24.3189,
    longitude: -47.0056,
    description: 'Barbearia tradicional no coração de Peruíbe. Cortes clássicos e modernos.',
    metaTitle: 'Barbearia do Zé — Peruíbe, SP',
    metaDescription: 'Cortes, barba e muito estilo em Peruíbe. Agende pelo WhatsApp.',
    googleRating: 4.8,
    googleReviewCount: 112,
    featured: true,
    openingHours: {
      mon: { open: '09:00', close: '19:00' },
      tue: { open: '09:00', close: '19:00' },
      wed: { open: '09:00', close: '19:00' },
      thu: { open: '09:00', close: '19:00' },
      fri: { open: '09:00', close: '20:00' },
      sat: { open: '08:00', close: '17:00' },
      sun: null,
    },
    services: [
      { id: 's1', name: 'Corte de Cabelo',    slug: 'corte-de-cabelo',  category: 'corte',  price: 35, durationMin: 30, isActive: true,  isFeatured: true,  seoTag: 'corte-de-cabelo', sortOrder: 1 },
      { id: 's2', name: 'Barba',              slug: 'barba',            category: 'barba',  price: 25, durationMin: 20, isActive: true,  isFeatured: true,  seoTag: 'barba',           sortOrder: 2 },
      { id: 's3', name: 'Corte e Barba',      slug: 'corte-e-barba',    category: 'combo',  price: 55, durationMin: 50, isActive: true,  isFeatured: true,  seoTag: 'corte-e-barba',   sortOrder: 3 },
      { id: 's4', name: 'Sobrancelha',        slug: 'sobrancelha',      category: 'outro',  price: 15, durationMin: 15, isActive: true,  isFeatured: false, seoTag: 'sobrancelha',     sortOrder: 4 },
    ],
  },
  {
    id: 'barb_002',
    name: 'Navalha Fina',
    slug: 'navalha-fina',
    status: 'active',
    plan: 'basic',
    isClaimed: true,
    importedFrom: 'google_maps',
    phone: '13997654321',
    whatsapp: '13997654321',
    neighborhood: 'Centro',
    neighborhoodSlug: 'centro',
    city: 'Peruíbe',
    citySlug: 'peruibe',
    uf: 'SP',
    ufSlug: 'sp',
    street: 'Av. São Paulo',
    number: '456',
    latitude: -24.3201,
    longitude: -47.0071,
    description: 'Especialistas em degradê e barba modelada.',
    googleRating: 4.6,
    googleReviewCount: 87,
    featured: false,
    openingHours: {
      mon: { open: '10:00', close: '19:00' },
      tue: { open: '10:00', close: '19:00' },
      wed: { open: '10:00', close: '19:00' },
      thu: { open: '10:00', close: '19:00' },
      fri: { open: '10:00', close: '20:00' },
      sat: { open: '09:00', close: '16:00' },
      sun: null,
    },
    services: [
      { id: 's5', name: 'Corte de Cabelo', slug: 'corte-de-cabelo', category: 'corte', price: 40, durationMin: 40, isActive: true,  isFeatured: true,  seoTag: 'corte-de-cabelo', sortOrder: 1 },
      { id: 's6', name: 'Barba',           slug: 'barba',           category: 'barba', price: 30, durationMin: 25, isActive: true,  isFeatured: true,  seoTag: 'barba',           sortOrder: 2 },
      { id: 's7', name: 'Corte e Barba',   slug: 'corte-e-barba',   category: 'combo', price: 65, durationMin: 60, isActive: true,  isFeatured: false, seoTag: 'corte-e-barba',   sortOrder: 3 },
    ],
  },
  {
    id: 'barb_003',
    name: 'BarberKing Santos',
    slug: 'barberking-santos',
    status: 'active',
    plan: 'pro',
    isClaimed: true,
    importedFrom: 'manual',
    phone: '13991111222',
    whatsapp: '13991111222',
    neighborhood: 'Boqueirão',
    neighborhoodSlug: 'boqueirao',
    city: 'Santos',
    citySlug: 'santos',
    uf: 'SP',
    ufSlug: 'sp',
    street: 'Av. Ana Costa',
    number: '789',
    latitude: -23.9608,
    longitude: -46.3336,
    description: 'A barbearia mais estilosa do Boqueirão. Degradê, barba e pigmentação.',
    googleRating: 4.9,
    googleReviewCount: 234,
    featured: true,
    openingHours: {
      mon: { open: '09:00', close: '20:00' },
      tue: { open: '09:00', close: '20:00' },
      wed: { open: '09:00', close: '20:00' },
      thu: { open: '09:00', close: '20:00' },
      fri: { open: '09:00', close: '21:00' },
      sat: { open: '08:00', close: '18:00' },
      sun: null,
    },
    services: [
      { id: 's8',  name: 'Corte de Cabelo', slug: 'corte-de-cabelo', category: 'corte',     price: 45, durationMin: 35, isActive: true, isFeatured: true,  seoTag: 'corte-de-cabelo', sortOrder: 1 },
      { id: 's9',  name: 'Barba',           slug: 'barba',           category: 'barba',     price: 35, durationMin: 25, isActive: true, isFeatured: true,  seoTag: 'barba',           sortOrder: 2 },
      { id: 's10', name: 'Pigmentação',     slug: 'pigmentacao',     category: 'tratamento',price: 60, durationMin: 45, isActive: true, isFeatured: true,  seoTag: 'pigmentacao',     sortOrder: 3 },
      { id: 's11', name: 'Sobrancelha',     slug: 'sobrancelha',     category: 'outro',     price: 20, durationMin: 15, isActive: true, isFeatured: false, seoTag: 'sobrancelha',     sortOrder: 4 },
    ],
  },
]

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

export function getBarbershopBySlug(
  ufSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
  slug: string
): Barbershop | null {
  return allBarbershops.find(
    (b) =>
      b.ufSlug           === ufSlug &&
      b.citySlug         === citySlug &&
      b.neighborhoodSlug === neighborhoodSlug &&
      b.slug             === slug &&
      b.status           === 'active'
  ) ?? null
}

export function getBarbershopsByNeighborhood(
  ufSlug: string,
  citySlug: string,
  neighborhoodSlug: string
): Barbershop[] {
  return allBarbershops.filter(
    (b) =>
      b.ufSlug           === ufSlug &&
      b.citySlug         === citySlug &&
      b.neighborhoodSlug === neighborhoodSlug &&
      b.status           === 'active'
  )
}

export function getBarbershopsByService(
  ufSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
  serviceSlug: string
): Barbershop[] {
  return getBarbershopsByNeighborhood(ufSlug, citySlug, neighborhoodSlug).filter((b) =>
    b.services.some((s) => s.seoTag === serviceSlug || s.slug === serviceSlug)
  )
}

/** Rota SEO de cada barbearia */
export function getAllBarbershopRoutes(): string[] {
  return allBarbershops
    .filter((b) => b.status === 'active')
    .map((b) => `/barbearias/${b.ufSlug}/${b.citySlug}/${b.neighborhoodSlug}/${b.slug}`)
}