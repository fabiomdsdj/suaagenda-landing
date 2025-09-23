<template>
    <div class="max-w-4xl mx-auto py-20 px-6">
      <h1 class="text-4xl font-bold mb-4">
        {{ servicoData.name }}
      </h1>
      <p class="text-lg text-gray-700">
        Aqui você encontra tudo sobre {{ servicoData.name }}. Agende seu atendimento e realce sua beleza!
      </p>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from "vue-router";
  import servicos from "~/data/servicos";
  
  const route = useRoute();
  
  const servicoSlug = route.params.servico;

  // Pega os dados pelo slug
  const servicoData = servicos.find((s) => s.slug === servicoSlug) || { name: servicoSlug };

  useHead(() => ({
  title: `${servicoData.name} | Seu Studio`,
    meta: [
      { name: 'description', content: `Você está na rota ${route.fullPath}` }
    ]
  }))
  </script>
  