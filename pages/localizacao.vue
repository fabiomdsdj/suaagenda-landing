<script setup lang="ts">
import locais from '~/data/local'

// 👉 aqui você escolhe manualmente qual bairro mostrar
const slug = "itaquera"

// pega os dados desse bairro
const bairro = locais.find(l => l.slug === slug)
</script>

<template>
  <div class="max-w-3xl mx-auto py-28 px-4">
    <div v-if="bairro">
      <h1 class="text-5xl font-black mb-6">{{ bairro.title }}</h1>
      <p 
        v-for="(p, i) in bairro.paragraphs" 
        :key="i" 
        class="mb-4 leading-relaxed"
      >
        {{ p }}
      </p>
    </div>
    <div v-else>
      <h1 class="text-xl font-semibold">Bairro não encontrado</h1>
    </div>
  </div>
</template>
