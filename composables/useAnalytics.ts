// composables/useAnalytics.ts
//
// Mescla de dois sistemas:
//   1. gtag (Google Analytics 4) — trackEvent e trackPageview originais
//   2. Backend próprio          — pageview e whatsapp_click salvos no banco
//      para exibição no scraper admin (/scraper e /scraper/:id)

export type AnalyticsEvent = 'pageview' | 'whatsapp_click' | 'maps_click'

export interface AnalyticsSummary {
  pageviews:       number
  whatsapp_clicks: number
  maps_clicks:     number
  period_days:     number
}

export interface AnalyticsDailyPoint {
  date:  string
  count: number
}

export interface AnalyticsDailyResult {
  event:       string
  period_days: number
  data:        AnalyticsDailyPoint[]
}

export interface AnalyticsFilterResult {
  event:       string
  minCount:    number
  period_days: number
  ids:         string[]
}

export function useAnalytics() {
  const config  = useRuntimeConfig()
  const baseUrl = config.public.apiBase as string

  // ── GA4 — mantido exatamente como estava ──────────────────────────────────
  const trackEvent = (action: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, params)
    }
  }

  const trackPageview = (path?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path:  path || window.location.pathname,
        page_title: document.title,
      })
    }
  }

  // ── Backend próprio — fire-and-forget, nunca bloqueia a UI ───────────────
  function trackBackend(barbershopId: string, event: AnalyticsEvent): void {
    if (!barbershopId) return
    fetch(`${baseUrl}/analytics/event`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ barbershopId, event }),
    }).catch(() => {})
  }

  // ── Atalhos que disparam GA4 + backend juntos ─────────────────────────────
  function trackBarbershopView(barbershopId: string, barbershopName?: string): void {
    trackPageview()
    trackEvent('barbershop_view', { barbershop_id: barbershopId, barbershop_name: barbershopName })
    trackBackend(barbershopId, 'pageview')
  }

  function trackWhatsappClick(barbershopId: string, barbershopName?: string): void {
    trackEvent('whatsapp_click', { barbershop_id: barbershopId, barbershop_name: barbershopName })
    trackBackend(barbershopId, 'whatsapp_click')
  }

  function trackMapsClick(barbershopId: string, barbershopName?: string): void {
    trackEvent('maps_click', { barbershop_id: barbershopId, barbershop_name: barbershopName })
    trackBackend(barbershopId, 'maps_click')
  }

  // ── Queries pro scraper admin ─────────────────────────────────────────────
  async function fetchSummary(id: string, days = 30): Promise<AnalyticsSummary | null> {
    try {
      return await $fetch<AnalyticsSummary>(`${baseUrl}/analytics/${id}/summary`, {
        params: { days },
      })
    } catch { return null }
  }

  async function fetchDaily(id: string, days = 30, event: AnalyticsEvent = 'pageview'): Promise<AnalyticsDailyResult | null> {
    try {
      return await $fetch<AnalyticsDailyResult>(`${baseUrl}/analytics/${id}/daily`, {
        params: { days, event },
      })
    } catch { return null }
  }

  async function fetchBulkSummary(ids: string[], days = 30): Promise<Record<string, AnalyticsSummary>> {
    if (!ids.length) return {}
    try {
      const res = await $fetch<{ period_days: number; data: Record<string, AnalyticsSummary> }>(
        `${baseUrl}/analytics/bulk-summary`,
        { params: { ids: ids.join(','), days } }
      )
      return res.data ?? {}
    } catch { return {} }
  }

  // ── Novo: busca IDs que passam no filtro de engajamento ──────────────────
  // Usado pelo scraper pra filtrar barbearias que tiveram N+ cliques no WhatsApp.
  // Retorna Set<string> de IDs pra lookup O(1) no filtro do frontend.
  async function fetchFilterIds(
    event: AnalyticsEvent = 'whatsapp_click',
    minCount = 1,
    days = 30,
  ): Promise<Set<string>> {
    try {
      const res = await $fetch<AnalyticsFilterResult>(`${baseUrl}/analytics/filter-ids`, {
        params: { event, minCount, days },
      })
      return new Set(res.ids ?? [])
    } catch { return new Set() }
  }

  return {
    // GA4 originais
    trackEvent,
    trackPageview,
    // Atalhos combinados (GA4 + backend)
    trackBarbershopView,
    trackWhatsappClick,
    trackMapsClick,
    // Queries do scraper admin
    fetchSummary,
    fetchDaily,
    fetchBulkSummary,
    fetchFilterIds,
  }
}