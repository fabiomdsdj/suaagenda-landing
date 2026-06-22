<!-- components/CompatibilidadeSection.vue -->
<template>
  <section
    id="compatibilidade"
    class="w-full py-20 px-4 md:px-16 bg-white border-y border-black/[.07]"
  >
    <div class="max-w-6xl mx-auto">

      <!-- HEADER -->
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-green-700 bg-green-100 border border-green-200 mb-6"
      >
        🔌 Já usa outro sistema de agendamento?
      </div>

      <h2
        class="font-black leading-none text-[#0f0f0f] mb-5"
        style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,5vw,64px)"
      >
        VOCÊ NÃO PRECISA<br />
        <span class="text-green-600">
          TROCAR DE SISTEMA.
        </span>
      </h2>

      <p class="text-gray-500 text-[16px] max-w-3xl leading-relaxed mb-10">
        Se você já usa AppBarber, Trinks, Booksy, Avec ou qualquer outro sistema
        de agendamento, pode continuar usando normalmente.
        A SuaAgenda IA cria, monitora e otimiza suas campanhas no Google Ads
        utilizando o link da sua agenda atual.
      </p>

      <!-- SISTEMAS -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        <div
          v-for="sys in compatibleSystems"
          :key="sys.name"
          class="rounded-2xl border border-black/[.08] bg-[#f8f7f4] p-5 flex items-center gap-3"
        >
          <span class="text-2xl">{{ sys.emoji }}</span>

          <div>
            <p class="text-sm font-bold text-[#0f0f0f]">
              {{ sys.name }}
            </p>

            <p class="text-xs text-green-600 font-bold">
              ✅ Compatível
            </p>
          </div>
        </div>
      </div>

      <!-- BLOCO PRINCIPAL -->
      <div
        class="rounded-3xl border border-green-200 bg-green-50 p-6 md:p-8 mb-12"
      >
        <div class="flex gap-4 items-start">
          <span class="text-3xl">🚀</span>

          <div>
            <h3 class="text-[#0f0f0f] font-bold text-lg mb-2">
              Funciona com a agenda que você já usa
            </h3>

            <p class="text-gray-600 leading-relaxed">
              Você não precisa migrar, importar clientes ou aprender um novo sistema.
              Basta informar sua agenda atual e a IA já consegue criar campanhas,
              captar novos clientes e otimizar seus anúncios automaticamente.
            </p>
          </div>
        </div>
      </div>

      <!-- COMPARAÇÃO -->
      <div class="grid md:grid-cols-2 gap-5 mb-12">

        <!-- Nativo -->
        <div
          class="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm"
        >
          <div class="mb-5">
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-green-100 text-green-700"
            >
              ⭐ Experiência Completa
            </span>
          </div>

          <h3 class="text-[#0f0f0f] font-bold mb-5">
            Sistema SuaAgenda + IA
          </h3>

          <div class="space-y-3">
            <div
              v-for="item in nativeFeatures"
              :key="item"
              class="flex gap-3"
            >
              <span class="text-green-600 font-bold">✓</span>
              <p class="text-gray-700 text-sm">
                {{ item }}
              </p>
            </div>
          </div>
        </div>

        <!-- Externo -->
        <div
          class="rounded-3xl border border-black/[.08] bg-[#f8f7f4] p-6 shadow-sm"
        >
          <div class="mb-5">
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white text-gray-600 border border-black/[.08]"
            >
              ✅ Compatível com sua agenda atual
            </span>
          </div>

          <h3 class="text-[#0f0f0f] font-bold mb-5">
            AppBarber, Trinks, Booksy...
          </h3>

          <div class="space-y-3">
            <div
              v-for="item in externalFeatures"
              :key="item"
              class="flex gap-3"
            >
              <span class="text-green-600 font-bold">✓</span>
              <p class="text-gray-500 text-sm">
                {{ item }}
              </p>
            </div>
          </div>

          <div class="mt-6 pt-5 border-t border-black/[.06]">
            <p class="text-xs text-gray-400">
              Recursos avançados de inteligência e análise ficam disponíveis
              para quem utiliza o sistema nativo da SuaAgenda.
            </p>
          </div>
        </div>

      </div>

      <!-- PASSO A PASSO -->
      <div class="mb-12">

        <p
          class="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5"
        >
          Como funciona
        </p>

        <div class="grid md:grid-cols-3 gap-5">

          <div
            v-for="step in compatSteps"
            :key="step.title"
            class="rounded-2xl border border-black/[.08] bg-[#f8f7f4] p-6"
          >
            <div
              class="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-black mb-4"
            >
              {{ step.num }}
            </div>

            <p class="text-[#0f0f0f] font-bold mb-2">
              {{ step.title }}
            </p>

            <p class="text-sm text-gray-500 leading-relaxed">
              {{ step.desc }}
            </p>
          </div>

        </div>
      </div>

      <!-- CTA -->
      <div
        class="rounded-3xl border border-green-200 bg-green-50 p-6 flex flex-col md:flex-row gap-5 items-center shadow-sm"
      >
        <div class="flex-1">
          <h3 class="text-[#0f0f0f] font-bold mb-2">
            Já usa AppBarber, Trinks ou Booksy?
          </h3>

          <p class="text-gray-500 text-sm leading-relaxed">
            Comece usando sua agenda atual.
            Se desejar, você poderá migrar futuramente para desbloquear
            recursos avançados da IA.
          </p>
        </div>

        <a
          href="https://wa.me/5511941649284?text=Quero%20testar%20a%20SuaAgenda%20IA"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-md"
        >
          Começar sem migrar →
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const compatibleSystems = [
  { emoji: '💈', name: 'AppBarber' },
  { emoji: '✂️', name: 'Trinks' },
  { emoji: '📅', name: 'Booksy' },
  { emoji: '🗓️', name: 'Avec' },
  { emoji: '➕', name: 'Outros' }
]

const nativeFeatures = [
  'IA aprende com o histórico real da barbearia',
  'Relatórios completos de clientes e serviços',
  'Segmentação automática baseada em comportamento real',
  'Otimização avançada usando dados reais de agendamento',
  'Tudo integrado sem cadastro manual'
]

const externalFeatures = [
  'Mantém seu sistema atual sem migração',
  'Campanhas criadas automaticamente pela IA',
  'Integração simples usando seu link de agendamento',
  'Relatórios de desempenho das campanhas',
  'Pode migrar futuramente se desejar'
]

const compatSteps = [
  {
    num: '1',
    title: 'Informe sua agenda',
    desc: 'Cadastre o link público da agenda que você já utiliza.'
  },
  {
    num: '2',
    title: 'A IA cria a campanha',
    desc: 'Os anúncios são gerados automaticamente para sua região.'
  },
  {
    num: '3',
    title: 'Receba novos clientes',
    desc: 'A IA acompanha e otimiza os resultados continuamente.'
  }
]
</script>