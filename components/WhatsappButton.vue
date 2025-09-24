<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Botão flutuante -->
    <button
      @click="showModal = !showModal"
      class="pulse bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.93 11.93 0 0 0 1.64 6.06L0 24l6.17-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52Z" />
      </svg>
    </button>

    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/60 z-40"
        @click="showModal = false"
      ></div>
    </transition>

    <!-- Modal de contatos -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-2xl flex flex-col z-50"
      >
        <!-- Cabeçalho -->
        <div class="bg-green-600 text-white px-4 py-3 flex justify-between items-center rounded-t-lg">
          <h2 class="font-bold text-lg">{{ title }}</h2>
          <button @click="showModal = false" class="text-white hover:text-gray-200 cursor-pointer">✕</button>
        </div>

        <!-- Lista de contatos -->
        <div class="p-4 flex flex-col gap-3">
          <button
            v-for="contact in contacts"
            :key="contact.phone"
            @click="openWhatsApp(contact)"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow cursor-pointer text-left"
          >
            {{ contact.name }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  contacts: { type: Array, default: () => [] }, // [{ name, phone }]
  defaultMessage: { type: String, default: 'Olá! Quero agendar um horário.' },
  title: { type: String, default: 'Escolha o contato' }
})

const showModal = ref(false)

function openWhatsApp(contact) {
  const message = `${props.defaultMessage} - ${contact.name}`
  window.open(`https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`, '_blank')
  showModal.value = false
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
