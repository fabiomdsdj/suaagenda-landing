<!-- Campo de texto do configurador: label humano, limite (maxlength) com
     contador perto do fim, dica e erro ligados por aria-describedby.
     O valor é só texto — quem valida e corta de verdade é o composable. -->
<template>
  <div class="cfg-field">
    <label :for="id" class="cfg-label">{{ label }}</label>
    <textarea
      v-if="multiline"
      :id="id"
      :value="modelValue"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :rows="rows"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : undefined"
      class="cfg-input resize-y"
      :class="{ 'cfg-input--error': error }"
      @input="onInput"
    />
    <input
      v-else
      :id="id"
      :value="modelValue"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : undefined"
      type="text"
      class="cfg-input"
      :class="{ 'cfg-input--error': error }"
      @input="onInput"
    >
    <div v-if="error || hint || showCounter" class="mt-1 flex items-start justify-between gap-3 text-xs">
      <p v-if="error" :id="`${id}-msg`" class="text-amber-300" role="alert">{{ error }}</p>
      <p v-else-if="hint" :id="`${id}-msg`" class="text-gray-500">{{ hint }}</p>
      <span v-else />
      <span v-if="showCounter" :id="`${id}-count`" class="shrink-0 tabular-nums text-gray-500">
        {{ modelValue.length }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  modelValue: string
  maxlength: number
  placeholder?: string
  hint?: string
  error?: string
  multiline?: boolean
  rows?: number
  inputmode?: 'text' | 'tel' | 'numeric' | 'decimal'
  autocomplete?: string
}>(), { placeholder: '', hint: '', error: '', multiline: false, rows: 4, inputmode: 'text', autocomplete: 'off' })

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const id = useId()
// Contador só quando está perto do limite: menos ruído na tela.
const showCounter = computed(() => props.modelValue.length >= props.maxlength * 0.8)
const describedBy = computed(() => [
  (props.error || props.hint) ? `${id}-msg` : '',
  showCounter.value ? `${id}-count` : '',
].filter(Boolean).join(' ') || undefined)

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement | HTMLTextAreaElement).value)
}
</script>
