<template>
  <div class="max-w-6xl mx-auto py-28 px-6">
    <h1 class="text-4xl font-bold text-center mb-16">
      Nossos Planos
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Plano Básico -->
      <div class="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col hover:shadow-xl transition">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Básico</h2>
        <p class="text-gray-600 mb-6">Ideal para quem está começando.</p>
        <ul class="space-y-3 flex-1">
          <li class="flex items-center gap-2 text-gray-700">✅ Agenda online simples</li>
          <li class="flex items-center gap-2 text-gray-700">✅ Site básico</li>
          <li class="flex items-center gap-2 text-gray-700">✅ Suporte por WhatsApp</li>
        </ul>
        <div class="mt-8 text-center">
          <p class="text-3xl font-bold text-gray-800 mb-4">R$49/mês</p>
          <button
            class="w-full bg-[#05df72] text-white font-semibold py-3 rounded-lg shadow hover:bg-[#04c864] transition"
          >
            Assinar
          </button>
        </div>
      </div>

      <!-- Plano Pro -->
      <div
        class="bg-gradient-to-br from-[#05df72] to-[#04c864] text-white rounded-2xl shadow-2xl p-8 flex flex-col relative transform hover:-translate-y-1 hover:shadow-3xl transition"
      >
        <span
          class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff6467] text-white text-sm font-bold px-3 py-1 rounded-full shadow"
        >
          Mais Popular
        </span>
        <h2 class="text-2xl font-bold mb-3">Profissional</h2>
        <p class="text-white/90 mb-6">Para quem quer crescer no digital.</p>
        <ul class="space-y-3 flex-1">
          <li class="flex items-center gap-2">✅ Agenda online completa</li>
          <li class="flex items-center gap-2">✅ Site otimizado para Google</li>
          <li class="flex items-center gap-2">✅ Lembretes automáticos</li>
          <li class="flex items-center gap-2">✅ Suporte prioritário</li>
        </ul>
        <div class="mt-8 text-center">
          <p class="text-3xl font-bold mb-4">R$99/mês</p>
          <button
            class="w-full bg-white text-[#05df72] font-semibold py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Assinar
          </button>
        </div>
      </div>

      <!-- Plano Premium -->
      <div class="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col hover:shadow-xl transition">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Premium</h2>
        <p class="text-gray-600 mb-6">Para quem quer ser referência.</p>
        <ul class="space-y-3 flex-1">
          <li class="flex items-center gap-2 text-gray-700">✅ Tudo do Profissional</li>
          <li class="flex items-center gap-2 text-gray-700">✅ Consultoria de marketing</li>
          <li class="flex items-center gap-2 text-gray-700">✅ Landing pages extras</li>
          <li class="flex items-center gap-2 text-gray-700">✅ Relatórios avançados</li>
        </ul>
        <div class="mt-8 text-center">
          <p class="text-3xl font-bold text-gray-800 mb-4">R$199/mês</p>
          <button
            class="w-full bg-[#ff6467] text-white font-semibold py-3 rounded-lg shadow hover:bg-[#e55559] transition"
          >
            Assinar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const name = 'Planos e preços'
const content = 'Conheça os planos e preços da SuaAgenda: Básico, Profissional e Premium. Escolha o ideal para seu negócio e cresça no digital.'
const slug = 'planos'

useHead({
  title: name,
  meta: [
    { name: 'description', content },
    { property: 'og:title', content: name },
    { property: 'og:description', content },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://suaagenda-landing.onrender.com/${slug}/` },
    { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: name },
    { name: 'twitter:description', content },
    { name: 'twitter:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' }
  ],
  link: [
    { rel: 'canonical', href: `https://suaagenda-landing.onrender.com/${slug}/` }
  ]
})
</script>
