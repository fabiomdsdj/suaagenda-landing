<!-- pages/dev/site-configurator.vue — bancada do configurador (SÓ em `nuxt dev`).
     Segmento fisioterapia, os 3 modelos, Clínica como inicial. Serve para
     testar o configurador (scripts/e2e-configurator.mjs) enquanto a página
     pública (etapa 5) não existe. Fora do dev é 404 e noindex.
       ?modelo=clinica|reabilitacao|profissional   modelo inicial -->
<template>
  <div class="min-h-screen overflow-x-clip bg-[#0a0a0a] text-white" style="font-family:'DM Sans',sans-serif">
    <!-- overflow-x-clip (não hidden): hidden vira contêiner de rolagem e desliga o sticky do preview. -->
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <p class="text-xs font-semibold uppercase tracking-wide text-amber-300">Bancada · só em desenvolvimento</p>
      <h1 class="mt-1 text-2xl font-bold">Site para {{ segment.label.toLowerCase() }}</h1>

      <SiteConfigurator class="mt-6" :segment="segment" :initial-model-id="initialModel" @start="onStart" />

      <p v-if="started" class="mt-6 rounded-lg border border-white/10 p-3 text-sm text-gray-400" data-cta-result>
        CTA: segment={{ started.segment }} planSegment={{ started.planSegment }} modelo={{ started.modelId }}
        — a etapa 5 liga isto ao cadastro.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SiteConfigurator from '~/components/site-configurator/SiteConfigurator.vue'
import { loadSiteModels } from '~/data/siteModels'
import type { ConversionStart } from '~/composables/useSiteConfigurator'

if (!import.meta.dev) throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })

definePageMeta({ layout: false })
useHead({ title: 'Bancada do configurador', titleTemplate: null, meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const route = useRoute()
const segment = (await loadSiteModels('fisioterapia'))!
const initialModel = typeof route.query.modelo === 'string' ? route.query.modelo : 'clinica'

const started = ref<ConversionStart | null>(null)
function onStart(payload: ConversionStart) {
  started.value = payload
}
</script>
