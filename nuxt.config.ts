// nuxt.config.ts — VERSÃO FINAL

import tailwindcss from "@tailwindcss/vite"
import servicos from "./data/servicos"
import nichos from "./data/nichos"
import {
  getAllNeighborhoodRoutes,
  getAllServiceRoutes,
  getAllCityRoutes,
  getAllUFRoutes,
  getAllBarbeirosRoutes,
  getOldNeighborhoodRoutes,
  getOldCityRoutes,
  getOldBarbeirosRoutes,
} from "./data/locations"
import { getAllBarbershopRoutes } from "./data/barbershops"

// ── Rotas serviço x nicho (existentes) ────────────────────────
const servicoNichoRoutes = [
  ...servicos.flatMap((s) => nichos.map((n) => `/servicos/${s.slug}/${n.slug}`)),
  ...nichos.map((n) => `/${n.slug}`),
]

// ── Rotas SEO local ────────────────────────────────────────────
const localSeoRoutes = [
  ...getAllUFRoutes(),              // /barbearias/sp
  ...getAllCityRoutes(),            // /barbearias/sp/sao-paulo
  ...getAllNeighborhoodRoutes(),    // /barbearias/sp/sao-paulo/itaquera
  ...getAllServiceRoutes(),         // /barbearias/sp/sao-paulo/itaquera/s/corte-de-cabelo  ✅ /s/
  ...getAllBarbershopRoutes(),      // /barbearias/sp/peruibe/centro/barbearia-do-ze         ✅ mock
  ...getAllBarbeirosRoutes(),       // /barbeiros/sp/sao-paulo
]

const dynamicRoutes = [...servicoNichoRoutes, ...localSeoRoutes]

// ── Redirects 301 ──────────────────────────────────────────────
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
  css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],

  site: {
    url: "https://suaagenda.link",
    name: "Sua Agenda",
  },

  app: {
    baseURL: "/",
    head: {
      title: "Sua agenda",
      titleTemplate: "%s | Sua agenda",
      meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      htmlAttrs: { lang: "pt-BR" },
      script: [],
    },
  },

  modules: ["@vueuse/motion/nuxt", "nuxt-simple-sitemap", "@nuxt/image"],

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
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || "",
      apiKey:  process.env.NUXT_PUBLIC_API_KEY      || "",
    },
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      target: "esnext",
      cssMinify: true,
      rollupOptions: { treeshake: true },
    },
    esbuild: {
      drop: ["console", "debugger"],
    },
  },

  appConfig: {
    siteUrl: process.env.NUXT_PUBLIC_API_SITE_URL,
  },

  sitemap: {
    sitemapName: "sitemap.xml",
    urls: dynamicRoutes,
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      routes: dynamicRoutes,
    },
  },

  routeRules: {
    "/fonts/**":      { headers: { "cache-control": "public, max-age=31536000, immutable" } },
    "/icons/**":      { headers: { "cache-control": "public, max-age=31536000, immutable" } },
    "/images/**":     { headers: { "cache-control": "public, max-age=31536000, immutable" } },
    "/barbearias/**": { headers: { "cache-control": "public, max-age=86400, stale-while-revalidate=3600" } },
    "/barbeiros/**":  { headers: { "cache-control": "public, max-age=86400, stale-while-revalidate=3600" } },

    // Redirects 301
    ...redirectRules,
  },

  vue: {
    compilerOptions: {
      whitespace: "condense",
      comments:   false,
      isCustomElement: () => false,
    },
  },
})