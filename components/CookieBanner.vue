<!-- components/CookieBanner.vue -->
<template>
    <Transition name="cookie">
      <div
        v-if="showBanner"
        class="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-6 md:pb-6"
      >
        <div class="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#181818]/95 backdrop-blur-sm p-5 md:p-6 shadow-2xl">
          <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
  
            <!-- texto -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-white mb-1">
                🍪 Usamos cookies
              </p>
              <p class="text-[13px] leading-relaxed text-gray-400">
                Usamos cookies pra lembrar suas preferências e entender
                como o site é usado — só pra melhorar sua experiência.
                Nenhum dado é vendido.
                <a href="/privacidade" class="text-green-400 underline underline-offset-2 hover:text-green-300">
                    Saiba mais
                </a>
             </p>
            </div>
  
            <!-- botões -->
            <div class="flex gap-3 flex-shrink-0">
              <button
                class="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-400 border border-white/10 transition hover:border-white/30 hover:text-white"
                @click="reject"
              >
                Recusar
              </button>
              <button
                class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-green-400 text-black transition hover:bg-green-300"
                @click="accept"
              >
                Aceitar
              </button>
            </div>
  
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  const { showBanner, accept, reject } = useCookieConsent()
  </script>
  
  <style scoped>
  .cookie-enter-active { transition: transform .3s ease, opacity .3s ease; }
  .cookie-leave-active { transition: transform .2s ease, opacity .2s ease; }
  .cookie-enter-from   { transform: translateY(20px); opacity: 0; }
  .cookie-leave-to     { transform: translateY(20px); opacity: 0; }
  </style>