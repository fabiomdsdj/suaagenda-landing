<template>
  <div class="max-w-4xl mx-auto py-28 px-6">
    <h1 class="text-4xl font-bold mb-4">
      {{ servicoData.title }} para {{ nichoData.name }}
    </h1>

    <!-- Renderiza os parágrafos com o nicho injetado -->
    <div class="space-y-4 text-lg text-gray-700 mb-10">
      <p
        v-for="(p, i) in formattedParagraphs"
        :key="'s-' + i"
        v-html="p"
      />
    </div>

    <!-- Parágrafos do nicho -->
    <div class="space-y-4 text-lg text-gray-700">
      <p v-for="(p, i) in nichoData.paragraphs" :key="'n-' + i">
        {{ p }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import servicos from "~/data/servicos";
import nichos from "~/data/nichos";

const route = useRoute();
const servicoSlug = route.params.servico;
const nichoSlug = route.params.nicho;

const servicoData =
  servicos.find((s) => s.slug === servicoSlug) || { name: servicoSlug, paragraphs: [] };

const nichoData =
  nichos.find((n) => n.slug === nichoSlug) || { name: nichoSlug, paragraphs: [] };

// Substitui {NICHO} pelo nome real
const formattedParagraphs = servicoData.paragraphs.map(p =>
  p.replaceAll("{NICHO}", nichoData.name)
);

const name = `${servicoData.name} para ${nichoData.name}`
const content = formattedParagraphs?.[0] || `Informações sobre ${servicoData.name} para ${nichoData.name}`

useHead({
  title: name,
  meta: [
    {
      name: 'description',
      content: content
    },
    
    { property: 'og:title', content: name },
    { property: 'og:description', content: content },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://suaagenda-landing.onrender.com' },
    { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: name },
    { name: 'twitter:description', content: content },
    { name: 'twitter:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' }
  ],
  link: [
    { rel: 'canonical', href: `https://suaagenda-landing.onrender.com/servicos/${servicoSlug}/${nichoSlug}/` }
  ],
  
})
</script>
