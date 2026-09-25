<!-- Escolha de imagem local (logo ou foto do topo). Só emite o arquivo: quem
     valida, reduz e cria o objectURL é o useLocalImage do SiteConfigurator.
     Nada é enviado para servidor. -->
<template>
  <div class="cfg-field">
    <span :id="`${id}-label`" class="cfg-label">{{ label }}</span>
    <div class="flex items-center gap-3">
      <div
        class="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white/[.04]"
        :class="{ 'bg-white': url && kind === 'logo' }"
      >
        <img v-if="url" :src="url" :alt="`${label} escolhida`" class="size-full" :class="kind === 'logo' ? 'object-contain p-1' : 'object-cover'">
        <svg v-else class="size-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5 8.5 11l4 4 2.5-2.5L21 18.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm11 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        </svg>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <label :for="id" class="cfg-btn" :class="{ 'pointer-events-none opacity-60': busy }">
          {{ busy ? 'Preparando…' : url ? 'Trocar' : 'Escolher imagem' }}
        </label>
        <input
          :id="id"
          ref="input"
          type="file"
          accept="image/*"
          class="sr-only"
          :aria-labelledby="`${id}-label`"
          :aria-describedby="`${id}-msg`"
          :disabled="busy"
          :data-image-input="kind"
          @change="onChange"
        >
        <button v-if="url" type="button" class="cfg-btn cfg-btn--ghost" @click="$emit('clear')">Remover</button>
      </div>
    </div>
    <p :id="`${id}-msg`" class="mt-1 text-xs" :class="error ? 'text-amber-300' : 'text-gray-500'" :role="error ? 'alert' : undefined">
      {{ error || hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'
import type { LocalImageKind } from '~/composables/useLocalImage'

defineProps<{
  label: string
  kind: LocalImageKind
  url: string | null
  busy: boolean
  error: string
  hint: string
}>()

const emit = defineEmits<{ select: [file: File]; clear: [] }>()

const id = useId()
const input = ref<HTMLInputElement | null>(null)

function onChange() {
  const file = input.value?.files?.[0]
  // Limpa o input: escolher o mesmo arquivo de novo dispara `change`.
  if (input.value) input.value.value = ''
  if (file) emit('select', file)
}
</script>
