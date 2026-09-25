<!-- Espelho de white-label/components/site/UnitHours.vue.
     Sem faixa cadastrada, não renderiza nada — nunca inventa horário. -->
<template>
  <dl v-if="lines.length" class="sp-hours">
    <div v-for="line in lines" :key="line.days" class="sp-hours__row">
      <dt class="sp-hours__days">{{ line.days }}:</dt>
      <dd>{{ line.hours }}</dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatOpeningHours, type PreviewAvailability } from '~/utils/sitePreview'

const props = defineProps<{ availabilities?: PreviewAvailability[] | null }>()

const lines = computed(() => formatOpeningHours(props.availabilities))
</script>
