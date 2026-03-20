// nuxt.config.ts

import tailwindcss from "@tailwindcss/vite"

import {
  getOldNeighborhoodRoutes,
  getOldCityRoutes,
  getOldBarbeirosRoutes,
} from "./data/locations"

// ─────────────────────────────────────────────
// Redirects 301
// ─────────────────────────────────────────────

const redirectRules: Record<string, { redirect: string }> = {}

for (const { from, to } of [
  ...getOldNeighborhoodRoutes(),
  ...getOldCityRoutes(),
  ...getOldBarbeirosRoutes(),
]) {
  redirectRules[from] = { redirect: to }
}

export default defineNuxtConfig({

  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  css: [
    "~/assets/css/main.css",
    "~/assets/css/fonts.css",
    'leaflet/dist/leaflet.css',
  ],

  // ─────────────────────────────────────────────
  // SITE
  // ─────────────────────────────────────────────

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

  // ─────────────────────────────────────────────
  // MODULES
  // ─────────────────────────────────────────────

  modules: [
    "@vueuse/motion/nuxt",
    "nuxt-simple-sitemap",
    "@nuxt/image",
  ],

  // ─────────────────────────────────────────────
  // IMAGE
  // ─────────────────────────────────────────────

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

  // ─────────────────────────────────────────────
  // RUNTIME CONFIG
  // ─────────────────────────────────────────────

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3011",
      apiKey: process.env.NUXT_PUBLIC_API_KEY || "",
      scrapingToken: process.env.NUXT_PUBLIC_SCRAPING_TOKEN  ?? '',
      weeklyRegistrationGoal: process.env.NUXT_PUBLIC_WEEKLY_REGISTRATION_GOAL || '0',
      dailyRegistrationGoal:  process.env.NUXT_PUBLIC_DAILY_REGISTRATION_GOAL  || '0',
    },
  },

  // ─────────────────────────────────────────────
  // VITE
  // ─────────────────────────────────────────────

  vite: {
    plugins: [tailwindcss()],

    build: {
      target: "esnext",
      cssMinify: true,
      rollupOptions: {
        treeshake: true,
      },
    },

    esbuild: {
      drop: ["console", "debugger"],
    },

    optimizeDeps: {
      include: ['leaflet'],
    },
  },

  // ─────────────────────────────────────────────
  // APP CONFIG
  // ─────────────────────────────────────────────

  appConfig: {
    siteUrl: process.env.NUXT_PUBLIC_API_SITE_URL,
  },

  // ─────────────────────────────────────────────
  // SITEMAP DINÂMICO
  // ─────────────────────────────────────────────

  sitemap: {
    sources: ["/api/sitemap"],
    // ✅ Cache de 1 hora — atualiza automaticamente sem rebuild
    // Remove se quiser sempre fresh (mais lento)
    cacheMaxAgeSeconds: 3600,
  },

  // ─────────────────────────────────────────────
  // NITRO
  // ─────────────────────────────────────────────

  nitro: {

    compressPublicAssets: true,

    minify: true,

    prerender: {
      crawlLinks: false,
      routes: []
    }

  },

  // ─────────────────────────────────────────────
  // CACHE HEADERS
  // ─────────────────────────────────────────────

  routeRules: {
    '/scraper':    { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/scraper/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },

    "/fonts/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },

    "/icons/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },

    "/images/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },

    "/barbearias/**": {
      headers: {
        "cache-control":
          "public, max-age=86400, stale-while-revalidate=3600",
      },
    },

    "/barbeiros/**": {
      headers: {
        "cache-control":
          "public, max-age=86400, stale-while-revalidate=3600",
      },
    },

    // redirects SEO
    ...redirectRules,
  },

  // ─────────────────────────────────────────────
  // VUE COMPILER
  // ─────────────────────────────────────────────

  vue: {
    compilerOptions: {
      whitespace: "condense",
      comments: false,
      isCustomElement: () => false,
    },
  },

})