<template>
  <div class="address-ac" ref="containerRef">

    <div class="input-wrap">
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        :placeholder="placeholder"
        autocomplete="off"
        @input="onInput"
        @keydown="onKeydown"
        @focus="showDropdown = suggestions.length > 0"
        @blur="onBlur"
      />
      <!-- Spinner -->
      <span v-if="loading" class="spinner" />
      <!-- Botão limpar -->
      <button
        v-else-if="query"
        type="button"
        class="btn-clear"
        @mousedown.prevent="clearAll"
      >✕</button>
    </div>

    <!-- Dropdown de sugestões -->
    <ul v-if="showDropdown && suggestions.length" class="dropdown">
      <li
        v-for="(sug, i) in suggestions"
        :key="i"
        :class="{ active: highlighted === i }"
        @mousedown.prevent="select(sug)"
      >
        <span class="sug-icon">📍</span>
        <span class="sug-text">{{ sug.displayName }}</span>
      </li>
    </ul>

    <!-- Mensagem sem resultado -->
    <div v-if="showDropdown && !loading && query.length >= 4 && suggestions.length === 0" class="no-results">
      Nenhum endereço encontrado
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAddressAutocomplete, geocodeExact, reverseGeocode } from '~/composables/useGeocoding'
import type { GeoSuggestion } from '~/composables/useGeocoding'

const props = defineProps<{
  placeholder?: string
  // Passa o valor atual do campo de endereço para inicialização
  modelValue?: string
}>()

const emit = defineEmits<{
  // Emite o GeoSuggestion completo — o pai preenche os campos do form
  (e: 'select', suggestion: GeoSuggestion): void
  (e: 'update:modelValue', val: string): void
}>()

const { query, suggestions, loading, search, clear } = useAddressAutocomplete()

const showDropdown = ref(false)
const highlighted  = ref(-1)
const containerRef = ref<HTMLElement | null>(null)
const inputRef     = ref<HTMLInputElement | null>(null)

// Inicializa com modelValue se vier
onMounted(() => {
  if (props.modelValue) query.value = props.modelValue
})

function onInput() {
  highlighted.value = -1
  search(query.value)
  emit('update:modelValue', query.value)
  showDropdown.value = true
}

function onKeydown(e: KeyboardEvent) {
  if (!showDropdown.value || !suggestions.value.length) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlighted.value = Math.min(highlighted.value + 1, suggestions.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlighted.value = Math.max(highlighted.value - 1, 0)
  } else if (e.key === 'Enter' && highlighted.value >= 0) {
    e.preventDefault()
    select(suggestions.value[highlighted.value])
  } else if (e.key === 'Escape') {
    showDropdown.value = false
  }
}

function onBlur() {
  // Delay pra não fechar antes do mousedown no item
  setTimeout(() => { showDropdown.value = false }, 150)
}

function select(sug: GeoSuggestion) {
  query.value = sug.displayName
  showDropdown.value = false
  highlighted.value = -1
  emit('update:modelValue', sug.displayName)
  emit('select', sug)
}

function clearAll() {
  clear()
  emit('update:modelValue', '')
  showDropdown.value = false
  nextTick(() => inputRef.value?.focus())
}
</script>

<style scoped>
.address-ac { position: relative; width: 100%; }

.input-wrap { position: relative; display: flex; align-items: center; }

.input-wrap input {
  width: 100%;
  padding: 8px 32px 8px 11px;
  font-size: 13px;
  border: 0.5px solid rgba(255,255,255,.1);
  border-radius: 8px;
  background: #0d0d0d;
  color: #e5e7eb;
  outline: none;
  font-family: inherit;
  transition: border-color .15s;
}
.input-wrap input::placeholder { color: #374151; }
.input-wrap input:focus { border-color: rgba(255,255,255,.25); }

.spinner {
  position: absolute;
  right: 10px;
  width: 14px;
  height: 14px;
  border: 1.5px solid rgba(255,255,255,.1);
  border-top-color: #6b7280;
  border-radius: 50%;
  animation: spin .6s linear infinite;
  pointer-events: none;
}
@keyframes spin { to { transform: rotate(360deg); } }

.btn-clear {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 11px;
  color: #4b5563;
  padding: 2px 4px;
  line-height: 1;
}
.btn-clear:hover { color: #9ca3af; }

.dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #111;
  border: 0.5px solid rgba(255,255,255,.1);
  border-radius: 10px;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  z-index: 100;
  max-height: 220px;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0,0,0,.6);
}

.dropdown li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.4;
}
.dropdown li:hover, .dropdown li.active {
  background: rgba(255,255,255,.04);
  color: #e5e7eb;
}

.sug-icon { flex-shrink: 0; font-size: 12px; margin-top: 1px; }
.sug-text { flex: 1; }

.no-results {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #111;
  border: 0.5px solid rgba(255,255,255,.1);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12px;
  color: #4b5563;
  z-index: 100;
}
</style>