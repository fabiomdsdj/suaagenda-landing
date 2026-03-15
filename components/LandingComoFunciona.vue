<template>
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center" id="como-funciona-passos">
      <div class="max-w-5xl mx-auto">
  
        <span class="fade-on-scroll text-xs font-bold tracking-[.12em] uppercase text-green-400">Do zero ao ar</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white text-4xl md:text-6xl" style="font-family:'Bebas Neue',sans-serif">
          PRONTO EM <span class="text-green-400">5 MINUTOS</span>
        </h2>
        <p class="fade-on-scroll mb-16 mx-auto max-w-md text-lg leading-relaxed text-gray-400">
          Os serviços já vêm pré-preenchidos. Você só confirma o que usa e já está no ar.
        </p>
  
        <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <!-- linha conectora desktop -->
          <div class="hidden lg:block absolute top-11 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent" />
  
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="fade-on-scroll flex flex-col items-center group"
          >
            <div class="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mb-5 text-green-400 bg-[#181818] border-2 border-green-400/25 transition-all duration-200 group-hover:scale-105 group-hover:border-green-400 group-hover:bg-green-400/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" :d="step.icon" />
              </svg>
            </div>
            <span class="text-xs font-bold tracking-[.1em] text-green-400 mb-3">PASSO {{ i + 1 }}</span>
            <h3 class="text-base font-bold mb-2 text-white">{{ step.title }}</h3>
            <p class="text-sm leading-relaxed text-gray-500">{{ step.desc }}</p>
          </div>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  const steps = [
    { icon: 'M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z',          title: 'Cria sua conta',       desc: 'Nome da barbearia, endereço e número. Dois minutos no máximo.' },
    { icon: 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z', title: 'Confirma os serviços', desc: 'Corte, barba, combo já estão lá. Você só ajusta o preço e tira o que não usa.' },
    { icon: 'M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z', title: 'Recebe seu link',      desc: 'Sua página fica no ar na hora. Manda o link no WhatsApp e coloca na bio do Instagram.' },
    { icon: 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z', title: 'Agenda enche',         desc: 'Cliente agenda sozinho, lembrete vai automático. Você só aparece e corta o cabelo.' },
  ]
  </script>