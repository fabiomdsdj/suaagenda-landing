<template>
  <div class="max-w-4xl mx-auto p-8 my-28 bg-white rounded-2xl shadow-xl">

    <!-- Barra de progresso -->
    <div class="flex flex-wrap mb-10">
      <div v-for="(step, index) in steps" :key="index" class="flex-1 px-2 min-w-[80px]">
        <div class="relative">
          <div class="h-2 w-full rounded bg-gray-300">
            <div
              class="h-2 rounded bg-sky-700 transition-all"
              :style="{ width: currentStep > index ? '100%' : '0%' }"
            ></div>
          </div>
          <div
            class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700 text-center truncate max-w-[70px] sm:truncate-none sm:max-w-full"
            :class="{ 'text-sky-700 font-bold': currentStep === index + 1 }"
            :title="step"
          >
            {{ step }}
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: Dados básicos -->
    <div v-if="currentStep === 1" class="space-y-5">
      <h2 class="text-2xl font-semibold text-gray-800">Dados do solicitante</h2>
      <input v-model="form.nome" type="text" placeholder="Nome completo" class="w-full p-3 border border-gray-300 rounded-lg focus:border-sky-700 focus:ring-1 focus:ring-sky-200 transition" />
      <input v-model="form.email" type="email" placeholder="E-mail" class="w-full p-3 border border-gray-300 rounded-lg focus:border-sky-700 focus:ring-1 focus:ring-sky-200 transition" />
      <input v-model="form.telefone" type="tel" placeholder="Telefone" class="w-full p-3 border border-gray-300 rounded-lg focus:border-sky-700 focus:ring-1 focus:ring-sky-200 transition" />
    </div>

    <!-- Step 2: Detalhes do imóvel -->
    <div v-if="currentStep === 2" class="space-y-5">
      <h2 class="text-2xl font-semibold text-gray-800">Detalhes do imóvel</h2>
      <input v-model="form.endereco" type="text" placeholder="Endereço" class="w-full p-3 border border-gray-300 rounded-lg focus:border-sky-700 focus:ring-1 focus:ring-sky-200 transition" />
      <select v-model="form.tipoImovel" class="w-full p-3 border border-gray-300 rounded-lg focus:border-sky-700 focus:ring-1 focus:ring-sky-200 transition">
        <option value="">Tipo de imóvel</option>
        <option value="posse">Posse</option>
        <option value="marinha">Marinha</option>
        <option value="reurb">REURB</option>
      </select>
      <textarea v-model="form.observacoes" placeholder="Observações sobre o imóvel" class="w-full p-3 border border-gray-300 rounded-lg focus:border-sky-700 focus:ring-1 focus:ring-sky-200 transition"></textarea>
    </div>

    <!-- Step 3: Documentos -->
    <div v-if="currentStep === 3" class="space-y-5">
      <h2 class="text-2xl font-semibold text-gray-800">Documentos</h2>

      <!-- Documentos já adicionados -->
      <div v-for="(doc, index) in form.documentos" :key="index" class="flex flex-wrap items-center space-x-2 bg-gray-100 p-2 rounded">
        <span class="flex-1 truncate text-gray-700">{{ doc.tipo }} - {{ doc.file.name }}</span>
        <button type="button" class="text-red-500 mt-2 sm:mt-0 hover:underline" @click="removeDocumento(index)">Remover</button>
      </div>

      <!-- Campos dinâmicos para novos documentos -->
      <div v-for="(novo, idx) in novosDocs" :key="idx" class="flex flex-wrap gap-2 items-center">
        <select v-model="novo.tipo" class="p-2 border border-gray-300 rounded-lg flex-1 min-w-[120px] focus:border-sky-700 focus:ring-1 focus:ring-sky-200 transition">
          <option value="">Selecione o tipo</option>
          <option value="certidao">Certidão</option>
          <option value="documentoIdentidade">Documento de Identidade</option>
          <option value="outro">Outro</option>
        </select>
        <input type="file" @change="e => handleFile(e, idx)" class="p-2 border border-gray-300 rounded-lg flex-1 min-w-[120px] focus:border-sky-700 focus:ring-1 focus:ring-sky-200 transition" />
        <button type="button" class="bg-sky-700 text-white px-4 py-2 rounded mt-2 sm:mt-0 hover:bg-sky-800 transition" @click="addDocumento(idx)">Adicionar</button>
        <button
          type="button"
          class="bg-red-500 text-white px-4 py-2 rounded mt-2 sm:mt-0 hover:bg-red-600 transition"
          @click="removeInput(idx)"
          :disabled="idx === 0"
        >
          Remover
        </button>
      </div>

      <button type="button" class="mt-3 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition" @click="novosDocs.push({ tipo: '', file: null })">
        + Adicionar novo documento
      </button>
    </div>

    <!-- Step 4: Confirmação -->
    <div v-if="currentStep === 4" class="space-y-5">
      <h2 class="text-2xl font-semibold text-gray-800">Confirmação</h2>
      <p class="text-gray-700">Revise todas as informações antes de enviar:</p>
      <pre class="bg-gray-100 p-4 rounded text-sm text-gray-800">{{ form }}</pre>
    </div>

    <!-- Navegação -->
    <div class="flex flex-wrap justify-between mt-8 gap-3">
      <button
        class="bg-gray-400 text-white px-5 py-2 rounded disabled:opacity-50 flex-1 sm:flex-none hover:bg-gray-500 transition"
        :disabled="currentStep === 1"
        @click="currentStep--"
      >
        Voltar
      </button>

      <button
        v-if="currentStep < steps.length"
        class="bg-sky-700 text-white px-5 py-2 rounded flex-1 sm:flex-none hover:bg-sky-800 transition"
        @click="currentStep++"
      >
        Próximo
      </button>

      <button
        v-else
        class="bg-emerald-700 text-white px-5 py-2 rounded flex-1 sm:flex-none hover:bg-emerald-800 transition"
        @click="submitForm"
      >
        Enviar
      </button>
    </div>

  </div>
</template>

<script setup>
const { trackEvent, trackPageview } = useAnalytics();
definePageMeta({ layout: 'consultoria' })
import { ref } from 'vue'

const steps = ['Dados', 'Imóvel', 'Documentos', 'Confirmação']
const currentStep = ref(1)

const form = ref({
  nome: '',
  email: '',
  telefone: '',
  endereco: '',
  tipoImovel: '',
  observacoes: '',
  documentos: []
})

const novosDocs = ref([{ tipo: '', file: null }])

const handleFile = (e, idx) => {
  if (e.target.files.length > 0) {
    novosDocs.value[idx].file = e.target.files[0]
  }
}

const addDocumento = (idx) => {
  const doc = novosDocs.value[idx]
  if (!doc.tipo || !doc.file) return alert('Selecione o tipo e arquivo!')
  
  form.value.documentos.push({ ...doc })
  novosDocs.value[idx].tipo = ''
  novosDocs.value[idx].file = null
}

const removeDocumento = (index) => form.value.documentos.splice(index, 1)

const removeInput = (idx) => {
  if (novosDocs.value.length > 1) {
    novosDocs.value.splice(idx, 1)
  }
}

const submitForm = () => {
  console.log('Form enviado:', form.value)
  alert('Solicitação enviada com sucesso!')
}

// Rastrear visualização de página (usar no mounted())
onMounted(() => {
  trackPageview();
});

</script>

<style scoped>
input:focus, select:focus, textarea:focus {
  outline: none;
}
</style>
