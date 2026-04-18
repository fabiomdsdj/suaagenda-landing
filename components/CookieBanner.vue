<!-- components/CookieBanner.vue -->
<template>
  <Transition name="cookie">
    <div
      v-if="showBanner"
      class="fixed bottom-4 left-0 right-0 z-50 px-4 md:bottom-6 md:px-6"
    >
      <div class="max-w-2xl mx-auto rounded-2xl border border-white/8 bg-[#111]/90 backdrop-blur-md p-4 md:p-5 shadow-2xl">
        <div class="flex items-center gap-4">

          <!-- ícone -->
          <div class="w-9 h-9 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center flex-shrink-0 text-base">
            🍪
          </div>

          <!-- texto numa linha só -->
          <p class="flex-1 text-[13px] text-gray-400 leading-relaxed">
            <span class="text-white font-semibold">Cookies aqui.</span>
            Só pra lembrar suas preferências e entender o que funciona —
            nenhum dado é vendido.
            <a href="/privacidade" class="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors">Saiba mais</a>
          </p>

          <!-- botões compactos -->
          <div class="flex gap-2 flex-shrink-0">
            <button
              class="px-4 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-white transition-colors"
              @click="reject"
            >
              Recusar
            </button>
            <button
              class="px-4 py-2 rounded-lg text-xs font-bold bg-green-400 text-black hover:bg-green-300 transition-colors"
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
.cookie-enter-active { transition: transform .4s cubic-bezier(.16,1,.3,1), opacity .3s ease; }
.cookie-leave-active { transition: transform .2s ease, opacity .2s ease; }
.cookie-enter-from   { transform: translateY(24px); opacity: 0; }
.cookie-leave-to     { transform: translateY(16px); opacity: 0; }
</style>