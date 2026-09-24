<template>
  <div class="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden" style="font-family:'DM Sans',sans-serif">

    <!-- ══════════════════════════════════════════════════════
         NAV
    ═══════════════════════════════════════════════════════ -->
    <header class="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5 transition-all duration-300">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4 px-6 py-4">

        <!-- ── Logo: padrão ou white-label ── -->
        <component
          :is="hasInfluencer ? 'div' : NuxtLink"
          :to="hasInfluencer ? undefined : '/'"
          class="flex items-center gap-3 flex-shrink-0"
          :class="{ 'cursor-default': hasInfluencer }"
        >
          <!-- WHITE LABEL: avatar do influencer -->
          <template v-if="hasInfluencer">
            <div class="inf-logo-avatar">
              <img v-if="fotoUrl" :src="fotoUrl" :alt="nomeDisplay" />
              <span v-else>{{ nomeDisplay?.slice(0,2).toUpperCase() }}</span>
              <span class="inf-logo-dot">●</span>
            </div>
            <div class="inf-logo-text">
              <span class="inf-logo-nome">{{ nomeDisplay }}</span>
              <a href="/" class="inf-logo-by">by <span>SuaAgenda</span></a>
            </div>
          </template>

          <!-- PADRÃO: logo normal -->
          <template v-else>
            <NuxtImg
              provider="cloudinary"
              src="v1758665895/logo-sua-agenda-site-dark_w1nb5c.png"
              alt="SuaAgenda"
              class="h-9 w-auto"
              v-motion="{ initial:{opacity:0,x:-12}, enter:{opacity:1,x:0,transition:{duration:800}} }"
            />
          </template>
        </component>

        <!-- Desktop -->
        <nav class="hidden md:flex items-center gap-7" aria-label="Principal">
          <NuxtLink
            v-for="link in navLinks" :key="link.label"
            :to="link.to"
            class="text-[15px] font-medium text-gray-400 hover:text-white transition-colors duration-200"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            :href="appUrl"
            class="text-[15px] font-bold text-black bg-green-400 hover:bg-green-300 px-5 py-2.5 rounded-xl transition-colors"
          >
            Entrar
          </a>
        </nav>

        <!-- Mobile: burger -->
        <button
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
          aria-label="Menu"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile drawer -->
      <Transition name="slide-down">
        <nav v-if="mobileOpen" class="md:hidden border-t border-white/5 bg-[#0f0f0f]" aria-label="Principal">
          <div class="flex flex-col px-6 py-5 gap-1">
            <NuxtLink
              v-for="link in navLinks" :key="link.label"
              :to="link.to"
              class="text-[17px] font-medium text-gray-300 hover:text-green-400 transition-colors py-2"
              @click="mobileOpen = false"
            >{{ link.label }}</NuxtLink>
            <a
              :href="appUrl"
              class="mt-3 text-center font-bold text-black bg-green-400 px-5 py-3 rounded-xl"
            >Entrar</a>
          </div>
        </nav>
      </Transition>
    </header>

    <!-- CONTEÚDO -->
    <main>
      <slot />
    </main>

    <!-- ══════════════════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════════════════ -->
    <footer class="bg-[#0a0a0a] border-t border-white/5">

      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 px-6 py-16">

        <!-- Marca (2 cols) -->
        <div class="sm:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <NuxtImg
              provider="cloudinary"
              src="v1758665895/logo-sua-agenda-site-dark_w1nb5c.png"
              alt="SuaAgenda"
              class="h-8 w-auto"
            />
          </div>

          <p class="text-[15px] text-gray-400 leading-relaxed mb-5 max-w-sm">
            Agenda e agendamento online para negócios que atendem com hora marcada.
          </p>

          <!-- Redes sociais -->
          <div class="flex gap-3">
            <a href="https://www.facebook.com/profile.php?id=61581430582623" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              class="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[.04] border border-white/[.06] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#1877F2" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M22 12a10 10 0 1 0-11.6 9.86v-6.99h-2.5V12h2.5v-1.7c0-2.48 1.48-3.85 3.75-3.85 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.87h-2.34v6.99A10 10 0 0 0 22 12"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/suaagenda.ia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              class="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[.04] border border-white/[.06] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#E1306C" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.963.24 2.422.402a4.922 4.922 0 0 1 1.788 1.08 4.922 4.922 0 0 1 1.08 1.788c.163.46.348 1.252.403 2.422.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.24 1.963-.403 2.422a4.922 4.922 0 0 1-1.08 1.788 4.922 4.922 0 0 1-1.788 1.08c-.46.163-1.252.348-2.422.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.963-.24-2.422-.403a4.922 4.922 0 0 1-1.788-1.08 4.922 4.922 0 0 1-1.08-1.788c-.163-.46-.348-1.252-.403-2.422C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.24-1.963.403-2.422a4.922 4.922 0 0 1 1.08-1.788 4.922 4.922 0 0 1 1.788-1.08c.46-.163 1.252-.348 2.422-.403C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.16 0-3.53.012-4.78.069-1.047.048-1.61.22-1.985.367a3.125 3.125 0 0 0-1.135.723 3.125 3.125 0 0 0-.723 1.135c-.147.375-.319.938-.367 1.985-.057 1.25-.069 1.62-.069 4.78s.012 3.53.069 4.78c.048 1.047.22 1.61.367 1.985.17.39.392.73.723 1.135.404.33.745.552 1.135.723.375.147.938.319 1.985.367 1.25.057 1.62.069 4.78.069s3.53-.012 4.78-.069c1.047-.048 1.61-.22 1.985-.367a3.125 3.125 0 0 0 1.135-.723 3.125 3.125 0 0 0 .723-1.135c.147-.375.319-.938.367-1.985.057-1.25.069-1.62.069-4.78s-.012-3.53-.069-4.78c-.048-1.047-.22-1.61-.367-1.985a3.125 3.125 0 0 0-.723-1.135 3.125 3.125 0 0 0-1.135-.723c-.375-.147-.938-.319-1.985-.367-1.25-.057-1.62-.069-4.78-.069zm0 3.5a6.3 6.3 0 1 1 0 12.6 6.3 6.3 0 0 1 0-12.6zm0 1.8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm6.4-1.9a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
              </svg>
            </a>
            <a :href="wpLink" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              class="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[.04] border border-white/[.06] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#25D366" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.93 11.93 0 0 0 1.64 6.06L0 24l6.17-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22c-1.84 0-3.62-.49-5.18-1.4l-.37-.22-3.66.96.98-3.57-.24-.37A9.95 9.95 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.52-7.46c-.3-.15-1.78-.88-2.06-.98s-.47-.15-.67.15-.77.98-.95 1.18-.35.22-.65.07a8.2 8.2 0 0 1-2.42-1.5 9.07 9.07 0 0 1-1.67-2.09c-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52s.2-.3.3-.5.05-.37-.02-.52-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.14.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43s.25-1.31.17-1.43-.27-.2-.57-.35Z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Colunas de links -->
        <div v-for="col in footerCols" :key="col.title">
          <h4 class="text-[12px] font-bold tracking-widest uppercase text-gray-500 mb-5">{{ col.title }}</h4>
          <ul class="space-y-3">
            <li v-for="link in col.links" :key="link.label">
              <a
                v-if="link.external"
                :href="link.to"
                class="text-[14px] text-gray-400 hover:text-green-400 transition-colors"
              >{{ link.label }}</a>
              <NuxtLink
                v-else
                :to="link.to"
                class="text-[14px] text-gray-400 hover:text-green-400 transition-colors"
              >{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Integração Google Ads (referência discreta; conteúdo técnico que ficava na home) -->
      <div id="google-ads" class="border-t border-white/5 px-6 py-6">
        <p class="max-w-6xl mx-auto text-[12px] leading-relaxed text-gray-600">
          <strong class="font-semibold text-gray-500">Integração com Google Ads:</strong>
          o SuaAgenda utiliza a Google Ads API para permitir que usuários autorizados criem,
          consultem e gerenciem campanhas publicitárias em suas próprias contas do Google Ads.
          O acesso é concedido exclusivamente após autenticação via OAuth 2.0 e consentimento
          explícito do usuário. Nenhum dado é compartilhado ou vendido a terceiros; as informações
          são utilizadas somente para fornecer as funcionalidades contratadas pelo usuário.
        </p>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/5 px-6 py-5">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600">
          <p>© {{ year }} SuaAgenda · Plataforma de agendamento online.</p>
          <div class="flex gap-5">
            <NuxtLink to="/privacidade" class="hover:text-gray-400 transition-colors">Política de Privacidade</NuxtLink>
            <NuxtLink to="/termos" class="hover:text-gray-400 transition-colors">Termos de Uso</NuxtLink>
          </div>
        </div>
      </div>
    </footer>

    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NuxtLink } from '#components'
import { useInfluencer } from '~/composables/useInfluencer'

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SuaAgenda',
        alternateName: 'Sua Agenda',
        url: 'https://suaagenda.link',
      }),
    },
  ],
})

// ── Influencer white label ────────────────────────────────────────────────────
const { hasInfluencer, nomeDisplay, fotoUrl, corHex, whatsappLink } = useInfluencer()
/** Link do WhatsApp unificado — com ref quando tem influencer, padrão caso contrário */
const wpLink = computed(() =>
  hasInfluencer.value
    ? whatsappLink.value   // já tem o ref embutido via useInfluencer
    : 'https://wa.me/5511941649284'
)

// Injeta CSS var de cor do influencer
onMounted(() => {
  if (hasInfluencer.value) {
    document.documentElement.style.setProperty('--inf-color', corHex.value)
  }
})

// ── Estado local ──────────────────────────────────────────────────────────────
const mobileOpen = ref(false)
const year       = new Date().getFullYear()

// ── Nav / Footer data ─────────────────────────────────────────────────────────
// Portal: sem "Preços" — preço e cadastro ficam na página de cada segmento.
const appUrl = 'https://app.suaagenda.link'

const navLinks = [
  { label: 'Segmentos',           to: '/#segmentos' },
  { label: 'Encontrar barbearia', to: '/barbearias' },
]

const footerCols = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Segmentos',       to: '/#segmentos' },
      { label: 'Entrar no app',   to: appUrl, external: true },
    ],
  },
  {
    title: 'Para clientes',
    links: [
      { label: 'Encontrar barbearia', to: '/barbearias' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política de privacidade', to: '/privacidade' },
      { label: 'Termos de uso',           to: '/termos' },
    ],
  },
]
</script>

<style>
:root {
  --nav-h: 68px;
  --inf-color: #34d399;
}

/* ── Slide transitions ── */
.slide-down-enter-active, .slide-down-leave-active { transition: opacity .2s, transform .2s; }
.slide-down-enter-from,   .slide-down-leave-to     { opacity: 0; transform: translateY(-8px); }

/* ── White label: logo avatar no header ── */
.inf-logo-avatar {
  position: relative;
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid var(--inf-color);
  overflow: hidden; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800;
  background: #1a1a1a; color: var(--inf-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--inf-color) 15%, transparent);
}
.inf-logo-avatar img { width: 100%; height: 100%; object-fit: cover; }

.inf-logo-dot {
  position: absolute; bottom: -1px; right: -1px;
  font-size: 9px; color: #22c55e;
  animation: inf-pulse 1.8s infinite;
}
@keyframes inf-pulse { 0%,100%{opacity:1} 50%{opacity:.25} }

.inf-logo-text {
  display: flex; flex-direction: column; line-height: 1.25;
}
.inf-logo-nome {
  font-size: 15px; font-weight: 700; color: #fff;
  max-width: 160px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.inf-logo-by {
  font-size: 11px; color: #555;
  text-decoration: none;
  transition: color .2s;
}
.inf-logo-by span { color: var(--inf-color); opacity: .7; }
.inf-logo-by:hover span { opacity: 1; }

/* ── White label footer minimalista ── */
.wl-footer {
  border-top: 1px solid rgba(255,255,255,.05);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wl-footer-credit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #444;
  text-decoration: none;
  transition: color .2s;
}
.wl-footer-credit:hover { color: #666; }
.wl-footer-icon {
  width: 13px; height: 13px;
  flex-shrink: 0;
  opacity: .4;
}
.wl-footer-logo {
  height: 16px;
  width: auto;
  opacity: .45;
  filter: brightness(2);
  transition: opacity .2s;
}
.wl-footer-credit:hover .wl-footer-logo { opacity: .7; }
</style>