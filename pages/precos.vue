<template>
  <div class="max-w-6xl mx-auto py-28 px-6">
    <h1 class="text-4xl font-bold text-center mb-16">
      Nossos Planos
    </h1>

    <!-- Preços vêm de /plans/public (mesma fonte do admin e do checkout). -->
    <PlanSelector
      segment="barber"
      :redirect-base="adminBase"
      :redirect="true"
      :trial-days="trialDays"
      :annual-discount="annualDiscount"
      :quarterly-discount="quarterlyDiscount"
    />
  </div>
</template>
<script setup>
import PlanSelector from '~/components/PlanSelector.vue'

// Mesma configuração do /barbearia/choose-plan.
const config            = useRuntimeConfig()
const adminBase         = config.public.adminBaseUrl || 'https://app.suaagenda.link'
const trialDays         = Number(config.public.trialDays         || 15)
const annualDiscount    = Number(config.public.annualDiscount    || 15)
const quarterlyDiscount = Number(config.public.quarterlyDiscount || 10)

const name = 'Planos e preços'
const content = 'Conheça os planos e preços da SuaAgenda. Escolha o ideal para seu negócio e cresça no digital.'
const slug = 'planos'

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
    { rel: 'canonical', href: `https://suaagenda.link/${slug}/` }
  ]
})
</script>
