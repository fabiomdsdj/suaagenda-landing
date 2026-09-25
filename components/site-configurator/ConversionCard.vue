<!-- Chamada para o cadastro, ao lado do configurador. Sem promessa de
     resultado e sem URL inventada: só emite `start` com o segmento e o modelo.
     Quem conecta ao cadastro real (segment/modelo na URL, trial, WhatsApp) é
     a página pública da etapa 5. -->
<template>
  <aside class="rounded-2xl border border-green-400/25 bg-green-400/[.04] p-5" aria-labelledby="cfg-conversion-title">
    <h2 id="cfg-conversion-title" class="text-lg font-bold text-white">Gostou desse modelo? Seu site pode começar assim.</h2>
    <p class="mt-1 text-sm text-gray-400">
      Modelo {{ modelLabel }} de {{ segmentLabel.toLowerCase() }}. Depois de criar a conta, você ajusta textos, serviços e visual pelo painel.
    </p>
    <button
      type="button"
      class="mt-4 w-full rounded-xl bg-green-400 px-6 py-3 font-bold text-black transition-colors hover:bg-green-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
      data-action="start"
      @click="$emit('start', { segment, planSegment, modelId })"
    >
      Quero um site assim
    </button>
    <p class="mt-3 text-xs text-gray-500">Isto é uma prévia: nada do que você editou aqui é salvo ou enviado.</p>
  </aside>
</template>

<script setup lang="ts">
import type { PlanSegment, SiteModelSegmentId } from '~/data/siteModels/types'
import type { ConversionStart } from '~/composables/useSiteConfigurator'

defineProps<{
  segment: SiteModelSegmentId
  planSegment: PlanSegment
  segmentLabel: string
  modelId: string
  modelLabel: string
}>()

defineEmits<{ start: [payload: ConversionStart] }>()
</script>
