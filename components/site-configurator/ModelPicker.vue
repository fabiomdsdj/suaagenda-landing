<!-- "Escolha um modelo": os 3 modelos do segmento como cartões. Cada um mostra
     nome, pitch e uma amostra do visual dele (cores do estilo via
     presetPreviewTheme e a fonte de título do modelo). Grupo de rádio
     acessível: setas não são necessárias, cada cartão é um botão. -->
<template>
  <div role="radiogroup" :aria-label="ariaLabel" class="grid gap-3 sm:grid-cols-3">
    <button
      v-for="card in cards"
      :key="card.id"
      type="button"
      role="radio"
      :aria-checked="card.id === modelValue"
      :data-model="card.id"
      class="group flex min-w-0 flex-col overflow-hidden rounded-2xl border text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
      :class="card.id === modelValue ? 'border-green-400 bg-green-400/[.06]' : 'border-white/10 bg-white/[.02] hover:border-white/25'"
      @click="$emit('select', card.id)"
    >
      <!-- Mini-site: topo no degradê da marca, fundo e cartão do estilo. -->
      <div class="relative h-20 w-full" :style="{ background: card.bg }" aria-hidden="true">
        <div class="absolute inset-x-0 top-0 h-9" :style="{ background: card.hero }" />
        <div
          class="absolute left-3 top-2.5 text-sm font-bold"
          :style="{ color: card.heroText, fontFamily: card.heading }"
        >Aa</div>
        <div class="absolute bottom-2.5 left-3 right-3 flex items-end gap-2">
          <div class="h-6 flex-1 border" :style="{ background: card.surface, borderColor: card.border, borderRadius: card.radius }" />
          <div class="h-6 flex-1 border" :style="{ background: card.surface, borderColor: card.border, borderRadius: card.radius }" />
          <div class="h-4 w-10 shrink-0" :style="{ background: card.button, borderRadius: card.buttonRadius }" />
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between gap-2">
          <span class="font-bold text-white">{{ card.label }}</span>
          <span v-if="card.id === modelValue" class="text-xs font-semibold text-green-400">Selecionado</span>
        </div>
        <p class="mt-1 text-sm leading-snug text-gray-400">{{ card.pitch }}</p>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SiteModel } from '~/data/siteModels/types'
import { THEME_FONTS, THEME_RADII, presetPreviewTheme } from '~/utils/theme'

const props = withDefaults(defineProps<{
  models: readonly SiteModel[]
  modelValue: string
  ariaLabel?: string
}>(), { ariaLabel: 'Modelos de site' })

defineEmits<{ select: [id: string] }>()

// Só valores do theme.ts (hex validado e stacks constantes) chegam ao style.
const cards = computed(() => props.models.map((m) => {
  const t = presetPreviewTheme(m.theme.preset)
  const radius = THEME_RADII[m.theme.radius]
  return {
    id: m.id,
    label: m.label,
    pitch: m.pitch,
    bg: t.background,
    surface: t.surface,
    border: t.border,
    button: t.button,
    hero: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
    heroText: t.heroText,
    heading: THEME_FONTS[m.theme.font].headingStack,
    radius: radius.card,
    buttonRadius: radius.button,
  }
}))
</script>
