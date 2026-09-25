<!-- Preço em reais. O texto digitado fica num rascunho local ("150,5",
     "1.200"); só um valor válido (parsePrice) sobe para o estado. Inválido
     mostra o aviso e o preview mantém o último preço bom. -->
<template>
  <div class="cfg-field">
    <label :for="id" class="cfg-label" :class="{ 'sr-only': hideLabel }">{{ label }}</label>
    <div class="cfg-input cfg-input--prefix" :class="{ 'cfg-input--error': invalid }">
      <span class="text-gray-500" aria-hidden="true">R$</span>
      <input
        :id="id"
        v-model="draft"
        type="text"
        inputmode="decimal"
        autocomplete="off"
        maxlength="9"
        placeholder="0,00"
        :aria-invalid="invalid ? 'true' : undefined"
        :aria-describedby="invalid ? `${id}-msg` : undefined"
        class="w-full min-w-0 bg-transparent text-right tabular-nums outline-none"
        @input="onInput"
        @focus="focused = true"
        @blur="onBlur"
      >
    </div>
    <p v-if="invalid" :id="`${id}-msg`" class="mt-1 text-xs text-amber-300" role="alert">
      Valor entre R$ 0,01 e R$ 9.999,99.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import { parsePrice } from '~/composables/useSiteConfigurator'

const props = withDefaults(defineProps<{
  label: string
  modelValue: number
  hideLabel?: boolean
}>(), { hideLabel: false })

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const id = useId()
const format = (n: number) => n.toFixed(2).replace('.', ',')
const draft = ref(format(props.modelValue))
const invalid = ref(false)
const focused = ref(false)

// Troca de modelo / reset / remoção muda o valor por fora: acompanha, a não
// ser que o visitante esteja digitando neste campo.
watch(() => props.modelValue, (n) => {
  if (!focused.value) {
    draft.value = format(n)
    invalid.value = false
  }
})

function onInput() {
  const n = parsePrice(draft.value)
  invalid.value = n === null
  if (n !== null && n !== props.modelValue) emit('update:modelValue', n)
}

function onBlur() {
  focused.value = false
  // Sai do campo: mostra o último valor válido, já formatado.
  draft.value = format(props.modelValue)
  invalid.value = false
}
</script>
