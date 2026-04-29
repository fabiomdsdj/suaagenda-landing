import tailwindcss from "@tailwindcss/vite"
import {
  getOldNeighborhoodRoutes,
  getOldCityRoutes,
  getOldBarbeirosRoutes,
  getAllUFRoutesFrom,
} from "./data/locations"

const redirectRules: Record<string, { redirect: string }> = {}
for (const { from, to } of [
  ...getOldNeighborhoodRoutes(),
  ...getOldCityRoutes(),
  ...getOldBarbeirosRoutes(),
]) {
  redirectRules[from] = { redirect: to }
}

// UFs do banco — buscadas em build time pra montar as routeRules
async function fetchActiveUFSlugs(): Promise<string[]> {
  const apiBase = process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3011'
  const apiKey  = process.env.NUXT_PUBLIC_API_KEY || ''
  try {
    const res = await fetch(`${apiBase}/locations/available-ufs`, {
      headers: apiKey ? { 'x-api-key': apiKey } : {},
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json() as { data: { ufSlug: string }[] }
    return json.data.map(u => u.ufSlug)
  } catch (e) {
    console.warn('[nuxt.config] available-ufs falhou, usando só hardcoded:', e)
    return []
  }
}

const activeUFSlugs = await fetchActiveUFSlugs()
const ufRoutes      = getAllUFRoutesFrom(activeUFSlugs)

console.log(`[nuxt.config] UF routes geradas: ${ufRoutes.join(', ')}`)

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "~/assets/css/fonts.css",
    'leaflet/dist/leaflet.css',
  ],
  site: {
    url: "https://suaagenda.link",
    name: "SuaAgenda",
  },
  app: {
    baseURL: "/",
    head: {
      title: "Sua agenda",
      titleTemplate: "%s | Sua agenda",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ],
      htmlAttrs: {
        lang: "pt-BR",
      },
    },
  },
  modules: [
    "@vueuse/motion/nuxt",
    "nuxt-simple-sitemap",
    "@nuxt/image",
  ],
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/du872kkq0/image/upload/",
    },
    format: ["avif", "webp"],
    quality: 70,
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
  runtimeConfig: {
    sitemapInternalToken: process.env.SITEMAP_INTERNAL_TOKEN ?? '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3011",
      apiKey: process.env.NUXT_PUBLIC_API_KEY || "",
      scrapingToken: process.env.NUXT_PUBLIC_SCRAPING_TOKEN ?? '',
      weeklyRegistrationGoal: process.env.NUXT_PUBLIC_WEEKLY_REGISTRATION_GOAL || '0',
      dailyRegistrationGoal:  process.env.NUXT_PUBLIC_DAILY_REGISTRATION_GOAL  || '0',
      useLocationsApi: process.env.NUXT_PUBLIC_USE_LOCATIONS_API || 'true',
      annualDiscount: process.env.NUXT_PUBLIC_ANNUAL_DISCOUNT ?? '15',
      quarterlyDiscount: process.env.NUXT_PUBLIC_QUARTERLY_DISCOUNT ?? '10',
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: "esnext",
      cssMinify: true,
      rollupOptions: {
        treeshake: true,
      },
    },
    esbuild: {},
    optimizeDeps: {
      include: ['leaflet'],
    },
  },
  appConfig: {
    siteUrl: process.env.NUXT_PUBLIC_API_SITE_URL,
  },

  // ✅ FIX 1: habilitar cache do nuxt-simple-sitemap por 6h
  // Antes estava 0 (desabilitado) — cada req. de crawler batia em /api/sitemap
  sitemap: {
    sources: ["/api/sitemap"],
    cacheMaxAgeSeconds: 60 * 60 * 6, // 6h
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: false,
      routes: [],
    },

    // ✅ FIX 2: conectar useStorage('cache') ao Redis do Upstash
    // Antes usava driver de memória — cache perdido em cada restart/deploy
    // REDIS_URL deve ser a connection string do Upstash: rediss://...
    storage: {
      cache: process.env.REDIS_URL && process.env.NODE_ENV === 'production'
        ? {
            driver: 'redis',
            url: process.env.REDIS_URL,
          }
        : {
            driver: 'memory',
          },
    },
  },

  routeRules: {
    '/scraper':    { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/scraper/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/fonts/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/icons/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },

    // ✅ FIX 3: ISR aumentado de 2h para 12h — reduz revalidações em 6x
    // Conteúdo de barbearias é estável; não precisa revalidar a cada 2h
    '/barbearias/**': {
      isr: 60 * 60 * 12,
      headers: { 'cache-control': 'public, max-age=43200, stale-while-revalidate=7200' },
    },
    '/barbeiros/**': {
      isr: 60 * 60 * 12,
      headers: { 'cache-control': 'public, max-age=43200, stale-while-revalidate=3600' },
    },
    // ✅ UFs do banco viram ISR automaticamente no próximo build
    ...Object.fromEntries(
      ufRoutes.map(route => [
        route,
        {
          isr: 60 * 60 * 12,
          headers: { 'cache-control': 'public, max-age=43200, stale-while-revalidate=7200' },
        },
      ])
    ),
    ...redirectRules,
  },

  vue: {
    compilerOptions: {
      whitespace: "condense",
      comments: false,
      isCustomElement: () => false,
    },
  },
})