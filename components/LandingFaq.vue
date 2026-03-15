<template>
    <section class="w-full py-24 px-6 md:px-16 bg-[#111111]">
      <div class="max-w-6xl mx-auto">
  
        <span class="fade-on-scroll text-xs font-bold tracking-[.12em] uppercase text-green-400 block text-center">Dúvidas</span>
        <h2 class="fade-on-scroll mt-3 mb-14 font-black leading-none text-white text-4xl md:text-6xl text-center" style="font-family:'Bebas Neue',sans-serif">
          PERGUNTAS <span class="text-green-400">FREQUENTES</span>
        </h2>
  
        <div class="max-w-2xl mx-auto">
          <div
            v-for="(item, i) in faqs"
            :key="i"
            class="fade-on-scroll border-b border-white/[.07] first:border-t first:border-t-white/[.07]"
          >
            <button
              class="w-full flex items-center justify-between gap-5 py-6 text-left bg-transparent border-0 cursor-pointer font-semibold text-base transition-colors duration-200"
              :class="open === i ? 'text-green-400' : 'text-white'"
              @click="open = open === i ? null : i"
            >
              <span>{{ item.pergunta }}</span>
              <span
                class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border border-green-400/30 text-green-400 transition-all duration-300"
                :class="open === i ? 'rotate-45 bg-green-400/10' : ''"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
              </span>
            </button>
  
            <Transition name="faq">
              <p v-if="open === i" class="pb-6 pr-12 text-[15px] leading-relaxed text-gray-400">
                {{ item.resposta }}
              </p>
            </Transition>
          </div>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const open = ref(null)
  
  const faqs = [
    { pergunta: 'Quanto tempo leva pra configurar?',                    resposta: '5 minutos de verdade. Os serviços mais comuns de barbearia já vêm pré-preenchidos — corte, barba, combo, sobrancelha. Você só confirma o que usa, ajusta o preço se quiser e já tem seu link pronto pra divulgar.' },
    { pergunta: 'Preciso entender de tecnologia pra usar?',             resposta: 'Não. Se você usa WhatsApp e Instagram, você usa a SuaAgenda. Foi feita pra ser mais simples do que qualquer coisa que você já tentou antes.' },
    { pergunta: 'Em quanto tempo minha barbearia aparece no Google?',   resposta: 'O Google costuma indexar a página em 2 a 3 semanas. Quanto mais você divulgar seu link, mais rápido ele te reconhece. A maioria dos nossos barbeiros aparece nas buscas em menos de um mês.' },
    { pergunta: 'Os clientes precisam baixar algum aplicativo?',        resposta: 'Não. O cliente clica no link, abre no navegador do celular e já agenda. Sem baixar nada. Quanto mais simples pra ele, mais ele usa.' },
    { pergunta: 'Funciona só pra barbearia ou também pra salão?',       resposta: 'Funciona pra qualquer negócio com agendamento: barbearia, salão, manicure, cílios, sobrancelha, estética. Se você precisa de clientes e organização, a SuaAgenda serve pra você.' },
    { pergunta: 'E se eu quiser cancelar? Tem multa?',                  resposta: 'Nenhuma multa. Você cancela quando quiser, sem burocracia. É mês a mês. A gente confia tanto no produto que não precisa te prender com contrato.' },
    { pergunta: 'Tem suporte? Falo com uma pessoa de verdade?',         resposta: 'Tem suporte pelo WhatsApp em horário comercial. Você fala com uma pessoa real, sem bot, sem fila de espera. A gente te ajuda na hora.' },
  ]
  </script>
  
  <style scoped>
  .faq-enter-active, .faq-leave-active { transition: opacity .25s, transform .25s; }
  .faq-enter-from, .faq-leave-to { opacity: 0; transform: translateY(-6px); }
  </style>