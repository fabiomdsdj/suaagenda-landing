<template>
  <div class="max-w-5xl mx-auto px-6 py-28">
    <!-- Página de Nicho -->
    <div v-if="nicho">
      <h1 class="text-3xl font-bold mb-4">{{ nicho.title }}</h1>
      <div class="space-y-4 text-lg leading-relaxed">
        <p v-for="(p, i) in nicho.paragraphs" :key="i">{{ p }}</p>
      </div>
    </div>

    <!-- Página de Serviço -->
    <div v-else-if="servico">
      <h1 class="text-3xl font-bold mb-4">{{ servico.title }}</h1>
      <div class="space-y-4 text-lg leading-relaxed">
        <p v-for="(p, i) in servico.paragraphs" :key="i">
          {{ formatParagraph(p, nicho?.name) }}
        </p>
      </div>
    </div>

    <!-- Fallback -->
    <div v-else>
      <h1 class="text-2xl font-bold text-red-600">Nada encontrado</h1>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { useHead } from '#imports'
import nichos from '~/data/nichos'
import servicos from '~/data/servicos'

const route = useRoute()
const slug = route.params.slug

// tenta achar pelo slug
const nicho = nichos.find(n => n.slug === slug)
const servico = servicos.find(s => s.slug === slug)

// helper para substituir {NICHO}
function formatParagraph(text, nichoName) {
  if (!text) return ""
  if (nichoName) {
    return text.replace(/\{NICHO\}/g, nichoName)
  } else {
    // remove palavras "de {NICHO}" ou "das {NICHO}" ou "dos {NICHO}"
    return text
      .replace(/\s+(de|da|do|das|dos)\s+\{NICHO\}/gi, "")
      .replace(/\{NICHO\}/g, "") // remove caso tenha sobrado
      .trim()
  }
}

// 🔑 monta dinamicamente title e description
const name = nicho
  ? `${nicho.title}`
  : servico
    ? `${servico.title}`
    : 'Página não encontrada'

const content = nicho
  ? nicho.description || `Encontre tudo sobre ${nicho.title} e muito mais.`
  : servico
    ? servico.description || `Serviço de ${servico.title} disponível na Sua Agenda.`
    : 'Ops, nada encontrado aqui.'

// head dinâmico
useHead({
  title: name,
  meta: [
    { name: 'description', content },
    { property: 'og:title', content: name },
    { property: 'og:description', content },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://suaagenda.link/${slug}/` },
    { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: name },
    { name: 'twitter:description', content },
    { name: 'twitter:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' }
  ],
  link: [
    { rel: 'canonical', href: `suaagenda.link/${slug}/` }
  ]
})
</script>
