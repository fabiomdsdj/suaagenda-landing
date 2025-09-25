// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import cidades from './data/local'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],


  app: {
    baseURL: '/',
    head: {
      title: 'Sua agenda', // título padrão caso a página não defina
      titleTemplate: '%s | Sua agenda', // %s será substituído pelo título da página
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-MB7JZNQX5L',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MB7JZNQX5L');
          `,
          type: 'text/javascript'
        }
      ]
    }
  },

  modules: ['@vueuse/motion/nuxt', 'nuxt-simple-sitemap', '@nuxt/image'],
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/du872kkq0/image/upload/'
    },
    format: ['webp']
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || '',
      apiKey: process.env.NUXT_PUBLIC_API_KEY || '',
    }
  },

  vite: {    
    plugins: [      
      tailwindcss(),    
    ],  
  },

  appConfig: {
    siteUrl: 'https://suaagenda-landing.onrender.com',
  },

  sitemap: {
    sitemapName: 'sitemap.xml',
  },

  // ✅ Nitro: prerender automático de todas as páginas de cidades
  nitro: {
    prerender: {
      routes: [
        //...cidades.map(c => `/landing/${c.slug}`),
        //...tipos.map(t => `/servico/${t.slug}`)
      ]
    }
  },

  // ✅ Route rules: SSR para todas as páginas de landing
  routeRules: {
    //'/landing/**': { ssr: true },
    //'/servico/**': { ssr: true }
  }
})