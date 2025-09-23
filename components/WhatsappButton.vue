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

    <!-- Modal chat -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="absolute bottom-16 right-0 w-80 h-[450px] bg-gray-100 rounded-lg shadow-2xl flex flex-col overflow-hidden z-50"
      >
        <!-- Cabeçalho -->
        <div class="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
          <h2 class="font-bold text-lg">{{ title }}</h2>
          <button @click="showModal = false" class="text-white hover:text-gray-200 cursor-pointer">✕</button>
        </div>

        <!-- Área do chat -->
        <div ref="chatContainer" class="flex-1 p-4 space-y-3 overflow-y-auto text-sm">

          <!-- Contatos -->
          <div v-if="!selectedContact" class="flex flex-col gap-2 mt-2">
            <button
              v-for="contact in props.contacts"
              :key="contact.phone"
              @click="openChat(contact)"
              class="bg-white border border-green-500 text-green-600 px-3 py-2 rounded-lg shadow hover:bg-green-50 cursor-pointer"
            >
              Falar com {{ contact.name }}
            </button>
          </div>

          <!-- Mensagens -->
          <div v-else>
            <div
              v-for="(msg, index) in messages"
              :key="index"
              v-motion="{
                initial: { opacity: 0, y: 20 },
                enter: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }"
              class="flex"
              :class="msg.from === 'bot' ? 'justify-start' : 'justify-end'"
            >
              <div
                class="px-3 py-2 mb-4 rounded-lg shadow max-w-[75%] relative"
                :class="msg.from === 'bot' ? 'bg-white text-gray-800' : 'bg-green-500 text-white'"
              >
                <p>{{ msg.text }}</p>
                <span class="absolute -bottom-4 right-2 text-[10px] text-gray-400">
                  {{ msg.time }}
                </span>
              </div>
            </div>

            <!-- Digitação -->
            <div v-if="typing" class="flex justify-start items-center space-x-2">
              <div class="bg-white text-gray-800 px-3 py-2 rounded-lg shadow max-w-[40%]">
                <span>…</span>
              </div>
            </div>

            <!-- Seleção de dia -->
            <div v-if="selectedContact && !selectedDate" class="flex flex-wrap gap-2 mt-2">
              <button
                v-for="day in weekDates"
                :key="day.date"
                @click="selectDate(day)"
                class="bg-white border border-green-500 text-green-600 px-3 py-2 rounded-lg shadow hover:bg-green-50 cursor-pointer"
              >
                {{ day.display }}
              </button>
            </div>

            <!-- Horários -->
            <div v-if="selectedDate" class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(time, i) in displayedTimes"
                :key="time"
                v-motion="{
                  initial: { opacity: 0, y: 20 },
                  enter: { opacity: 1, y: 0, transition: { delay: i * 0.3, duration: 0.4 } }
                }"
              >
                <button
                  @click="selectTime(time)"
                  class="bg-white border border-green-500 text-green-600 px-3 py-2 rounded-lg shadow hover:bg-green-50 cursor-pointer"
                >
                  {{ time }}
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Input fake -->
        <div class="p-3 bg-white border-t flex items-center gap-2">
          <input
            disabled
            placeholder="Digite sua mensagem..."
            class="flex-1 border rounded-full px-4 py-2 text-gray-400 bg-gray-50"
          />
          <button class="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, watch } from 'vue'

const emit = defineEmits(['lead'])

const props = defineProps({
  contacts: { type: Array, default: () => [] },
  defaultMessage: { type: String, default: 'Olá! Quero agendar um horário.' },
  title: { type: String, default: 'Agendamento WhatsApp' },
  description: { type: String, default: 'Escolha com quem deseja falar:' }
})

const showModal = ref(false)
const messages = ref([])
const typing = ref(false)
const displayedTimes = ref([])
const selectedContact = ref(null)
const selectedDate = ref(null)
const weekDates = ref([])

const chatContainer = ref(null)

// Mensagens iniciais
const fakeMessagesData = [
  { from: 'bot', text: 'Olá, tudo bem? 😊', time: '09:02' },
  { from: 'user', text: 'Oi! Quero agendar um horário.', time: '09:03' }
]

// Gera os próximos 7 dias
function getNextWeekDates() {
  const dates = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(today.getDate() + i)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short' })
    dates.push({
      display: `${weekday} ${day}/${month}`,
      date: date.toISOString().split('T')[0]
    })
  }
  return dates
}

// Scroll automático
function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// Simula mensagens iniciais + horários
async function playFakeMessages(contact) {
  messages.value = []
  displayedTimes.value = []
  selectedContact.value = contact
  selectedDate.value = null

  for (const msg of fakeMessagesData) {
    typing.value = true
    await new Promise(r => setTimeout(r, 800))
    typing.value = false
    messages.value.push(msg)
    scrollToBottom()
    await nextTick()
    await new Promise(r => setTimeout(r, 400))
  }

  // Mensagem do bot pedindo para escolher o dia
  typing.value = true
  await new Promise(r => setTimeout(r, 600))
  typing.value = false
  messages.value.push({
    from: 'bot',
    text: 'Escolha um dia da próxima semana para o agendamento:',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  scrollToBottom()

  weekDates.value = getNextWeekDates()
}

function openChat(contact) {
  playFakeMessages(contact)
}

function selectDate(day) {
  selectedDate.value = day
  messages.value.push({
    from: 'user',
    text: day.display,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  scrollToBottom()

  // Mensagem do bot pedindo horários
  typing.value = true
  setTimeout(() => {
    typing.value = false
    messages.value.push({
      from: 'bot',
      text: `Perfeito! Escolha um horário para ${day.display}:`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    scrollToBottom()

    // Mostra horários animados
    selectedContact.value.availableTimes.forEach((t, i) => {
      setTimeout(() => {
        displayedTimes.value.push(t)
        scrollToBottom()
      }, i * 300)
    })
  }, 800)
}

function selectTime(time) {
  messages.value.push({
    from: 'user',
    text: time,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  scrollToBottom()

  const message = `Olá! Quero agendar um horário com ${selectedContact.value.name} - Dia: ${selectedDate.value.display} - Horário: ${time}`
  window.open(`https://wa.me/${selectedContact.value.phone}?text=${encodeURIComponent(message)}`, '_blank')
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
