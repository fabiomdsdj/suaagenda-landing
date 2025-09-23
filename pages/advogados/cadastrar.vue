<template>
  <div class="max-w-4xl mx-auto p-6 my-28 bg-white rounded-xl shadow-lg">

    <h2 class="text-3xl font-bold mb-8 text-gray-800 text-center">
      Cadastro de Advogado Parceiro
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">

      <!-- Primeiro nome -->
      <div>
        <label class="block mb-1 font-semibold text-gray-700" for="firstName">Primeiro Nome</label>
        <input
          id="firstName"
          v-model="form.firstName"
          type="text"
          placeholder="Ex: João da Silva"
          class="w-full rounded-lg px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-700 transition"
          required
        />
      </div>

      <!-- Sobrenome -->
      <div>
        <label class="block mb-1 font-semibold text-gray-700" for="lastName">Sobrenome</label>
        <input
          id="lastName"
          v-model="form.lastName"
          type="text"
          placeholder="Ex: João da Silva"
          class="w-full rounded-lg px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-700 transition"
          required
        />
      </div>

      <!-- E-mail -->
      <div>
        <label class="block mb-1 font-semibold text-gray-700" for="email">E-mail Profissional</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Ex: joao@advocacia.com"
          class="w-full rounded-lg px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-700 transition"
          required
        />
      </div>

      <!-- Telefone -->
      <div>
        <label class="block mb-1 font-semibold text-gray-700" for="phone">Telefone</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          placeholder="+55 11 99999-9999"
          class="w-full rounded-lg px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-700 transition"
          required
        />
      </div>

      <!-- Número da OAB -->
      <div>
        <label class="block mb-1 font-semibold text-gray-700" for="oab">Número da OAB</label>
        <input
          id="oab"
          v-model="form.oab"
          type="text"
          placeholder="Ex: SP123456"
          class="w-full rounded-lg px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-700 transition"
          required
        />
      </div>

      <!-- Estado de Atuação -->
      <div>
        <label class="block mb-1 font-semibold text-gray-700" for="state">Estado de Atuação</label>
        <select
          id="state"
          v-model="form.state"
          class="w-full rounded-lg px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-700 transition"
          required
        >
          <option value="">Selecione o estado</option>
          <option v-for="uf in estados" :key="uf" :value="uf">{{ uf }}</option>
        </select>
      </div>

      <!-- Especialidade -->
      <div>
        <label class="block mb-1 font-semibold text-gray-700" for="specialty">Especialidade</label>
        <input
          id="specialty"
          v-model="form.specialty"
          type="text"
          placeholder="Ex: Direito Imobiliário"
          class="w-full rounded-lg px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-700 transition"
          required
        />
      </div>

      <!-- Experiência resumida -->
      <div>
        <label class="block mb-1 font-semibold text-gray-700" for="experience">Experiência Profissional</label>
        <textarea
          id="experience"
          v-model="form.experience"
          placeholder="Descreva sua experiência com imóveis irregulares e pareceres jurídicos"
          class="w-full rounded-lg px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-700 transition"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Termos -->
      <div class="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="agree"
          v-model="form.agree"
          class="w-6 h-6 accent-sky-700 rounded-lg border-2 border-gray-300 transition duration-200 cursor-pointer hover:border-sky-700"
        />
        <label for="agree" class="text-gray-700 text-sm cursor-pointer hover:text-sky-700 transition">
          Concordo com os 
          <NuxtLink 
            to="/termos-advogado-parceiro" 
            class="underline hover:text-sky-700 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            termos de parceria e política de privacidade.
          </NuxtLink>
        </label>
      </div>

      <!-- Botão -->
      <button
        type="submit"
        class="cursor-pointer w-full bg-sky-700 text-white py-3 rounded-xl font-semibold hover:bg-sky-800 transition"
      >
        Enviar Cadastro
      </button>
      
    </form>
  </div>
</template>

<script setup>
const { trackEvent, trackPageview } = useAnalytics();
import { ref } from 'vue'

definePageMeta({ layout: 'advogados' })

const estados = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
]

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  oab: '',
  state: '',
  specialty: '',
  experience: '',
  agree: false
})

// Rastrear visualização de página (usar no mounted())
onMounted(() => {
  trackPageview();
});

const handleSubmit = async () => {
  if(!form.value.agree){
    alert("Você precisa concordar com os termos")
    return
  }

  try {
    console.log('Form enviado:', form.value)
    alert('Cadastro enviado com sucesso!')
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      oab: '',
      state: '',
      specialty: '',
      experience: '',
      agree: false
    }
  } catch (err) {
    console.error(err)
    alert('Ocorreu um erro ao enviar o cadastro.')
  }
}
</script>

<style scoped>
input:focus, select:focus, textarea:focus {
  outline: none;
}
</style>
