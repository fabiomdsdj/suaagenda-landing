//composables/useScraping.ts
import { ref } from 'vue'

export interface BarbershopServicePayload {
  name: string
  slug: string
  category?: string
  description?: string
  price: number
  priceMin?: number | null
  priceMax?: number | null
  durationMin: number
  isActive: boolean
  isFeatured: boolean
  sortOrder: number
}

export interface BarbershopPayload {
  name: string
  slug?: string
  subdomain?: string
  status?: 'pending' | 'active' | 'suspended' | 'churned'
  plan?: 'free' | 'basic' | 'pro' | 'enterprise'
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city: string
  citySlug: string
  state: string
  zipCode?: string
  country?: string
  latitude?: number | null
  longitude?: number | null
  description?: string
  metaTitle?: string
  metaDescription?: string
  coverImageUrl?: string
  logoUrl?: string
  googlePlaceId?: string
  googleRating?: number | null
  googleReviewCount?: number
  openingHours?: Record<string, { open: string; close: string } | null>
  services?: BarbershopServicePayload[]
  photos?: Array<{ url: string; isCover?: number; source?: string; sortOrder?: number }>
}

export interface ScrapingResult {
  created?: boolean
  duplicate?: boolean
  id?: string
  servicesCreated?: number
  error?: string
}

export function useScraping() {
  const loading = ref(false)
  const result  = ref<ScrapingResult | null>(null)
  const error   = ref<string | null>(null)

  const { public: { apiBase, scrapingToken } } = useRuntimeConfig()

  async function submitBarbershop(payload: BarbershopPayload): Promise<ScrapingResult> {
    loading.value = true
    error.value   = null
    result.value  = null

    try {
      const data = await $fetch<ScrapingResult>(`${apiBase}/scraping/barbershops`, {
        method:  'POST',
        headers: { 'x-scraping-token': scrapingToken as string },
        body:    payload,
      })
      result.value = data
      return data
    } catch (err: any) {
      const msg = err?.data?.error ?? err?.message ?? 'Erro desconhecido'
      error.value = msg
      return { error: msg }
    } finally {
      loading.value = false
    }
  }

  return { loading, result, error, submitBarbershop }
}