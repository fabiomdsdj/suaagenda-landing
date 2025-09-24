<template>
  <div class="max-w-4xl mx-auto py-20 px-6">
    <h1 class="text-4xl font-bold mb-4">
      {{ servicoData.title }} em {{ nichoData.name }}
    </h1>

    <p class="text-lg text-gray-700 mb-6">
      Aqui você encontra tudo sobre {{ servicoData.name }} para {{ nichoData.name }}.
    </p>

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

useHead(() => ({
  title: `${servicoData.name} em ${nichoData.name} | Seu Studio`,
  meta: [
    {
      name: "description",
      content: formattedParagraphs?.[0] || `Informações sobre ${servicoData.name} em ${nichoData.name}`
    }
  ]
}));
</script>
