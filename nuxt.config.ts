// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import servicos from "./data/servicos";
import nichos from "./data/nichos";
import { getAllNeighborhoodRoutes, getAllCityRoutes, getAllBarbeirosRoutes } from "./data/locations";

// Rotas existentes (servicos x nichos)
const servicoNichoRoutes = [
  ...servicos.flatMap((s) => nichos.map((n) => `/servicos/${s.slug}/${n.slug}`)),
  ...nichos.map((n) => `/${n.slug}`),
];

// ✅ Rotas de SEO local — geradas automaticamente dos dados
const localSeoRoutes = [
  ...getAllNeighborhoodRoutes(), // /barbearias/sao-paulo/itaquera, etc.
  ...getAllCityRoutes(),          // /barbearias/sao-paulo, etc.
  ...getAllBarbeirosRoutes(),     // /barbeiros/sao-paulo, etc.
];

const dynamicRoutes = [...servicoNichoRoutes, ...localSeoRoutes];

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
      apiKey: process.env.NUXT_PUBLIC_API_KEY || "",
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
  // ✅ Prerender todas as rotas dinâmicas (SSG)
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      routes: dynamicRoutes,
    },
  },
  // ✅ Route rules: cache longo pra assets estáticos
  routeRules: {
    "/fonts/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/icons/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/images/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    // Cache moderado pra páginas de SEO local (revalidação diária)
    "/barbearias/**": {
      headers: { "cache-control": "public, max-age=86400, stale-while-revalidate=3600" },
    },
    "/barbeiros/**": {
      headers: { "cache-control": "public, max-age=86400, stale-while-revalidate=3600" },
    },
  },
  vue: {
    compilerOptions: {
      whitespace: "condense",
      comments: false,
      isCustomElement: () => false,
    },
  },
});