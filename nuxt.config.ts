// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import  servicos  from '@/data/servicos'
import  nichos  from '@/data/nichos'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/fonts.css',
  ],


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
      htmlAttrs: {
        lang: 'pt-BR'
      },
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-MB7JZNQX5L',
          defer: true // ao invés de async
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
    format: ['avif', 'webp'], // fallback
    quality: 70,
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    }
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
    build: {
      target: 'esnext',
      cssMinify: true,
      rollupOptions: {
        treeshake: true
      }
    },
    esbuild: {
      drop: ['console', 'debugger'] // remove console.log em prod
    }
  },

  appConfig: {
    siteUrl: 'https://suaagenda-landing.onrender.com',
  },

  sitemap: {
    sitemapName: 'sitemap.xml',
    
  },

  // ✅ Nitro: prerender automático de todas as páginas de cidades
  nitro: {
    compressPublicAssets: true, // gzip/br assets
    minify: true,
    prerender: {
      routes: [
        //...cidades.map(c => `/landing/${c.slug}`),
        //...tipos.map(t => `/servico/${t.slug}`)

        // gera todas as combinações de servico + nicho        
        ...servicos.flatMap(servico =>
          nichos.map(nicho => `/servicos/${servico}/${nicho}`)
        )
      ]
    }
  },

  // ✅ Route rules: SSR para todas as páginas de landing
  
  routeRules: {
    '/fonts/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    },
    '/icons/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    },
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    }
  },  

  vue: {
    compilerOptions: {
      whitespace: 'condense',
      comments: false,
      // Garante que aria-* nunca seja removido
      isCustomElement: tag => false
    }
  },
  
  
})