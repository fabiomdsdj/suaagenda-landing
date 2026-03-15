<template>
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a]" id="como-funciona">
      <div class="max-w-6xl mx-auto">
  
        <span class="fade-on-scroll text-xs font-bold tracking-[.12em] uppercase text-green-400">A solução</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white text-4xl md:text-6xl" style="font-family:'Bebas Neue',sans-serif">
          SIMPLES. <span class="text-green-400">PODEROSO.</span> FEITO PRA BARBEIRO.
        </h2>
        <p class="fade-on-scroll mb-14 max-w-xl text-lg leading-relaxed text-gray-400">
          Três problemas resolvidos de uma vez, sem complicação, sem treinamento e em menos de 5 minutos.
        </p>
  
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(s, i) in solutions"
            :key="i"
            class="fade-on-scroll group relative overflow-hidden rounded-2xl border border-green-400/10 bg-[#181818] p-8 transition-all duration-200 hover:-translate-y-1 hover:border-green-400/40"
          >
            <!-- barra topo hover -->
            <div class="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-green-400 to-emerald-300" />
  
            <!-- ícone -->
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-green-400 bg-green-400/10 border border-green-400/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="s.icon" />
              </svg>
            </div>
  
            <p class="font-black leading-none mb-3 text-green-400/20" style="font-family:'Bebas Neue',sans-serif; font-size:44px">
              {{ String(i + 1).padStart(2, '0') }}
            </p>
            <h3 class="text-[17px] font-bold mb-2 text-white">{{ s.title }}</h3>
            <p class="text-sm leading-relaxed text-gray-500">{{ s.desc }}</p>
          </div>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  const solutions = [
    { icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',           title: 'Clientes novos no Google',        desc: 'Sua barbearia aparece quando alguém busca no Google — sem pagar anúncio. A gente cuida de toda parte técnica pra você ser encontrado.' },
    { icon: 'M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244', title: 'Link de agendamento no WhatsApp', desc: 'Você recebe um link único. Manda no zap, coloca na bio do Instagram. O cliente escolhe o horário sozinho. Sem você responder nada.' },
    { icon: 'M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0',         title: 'Lembrete automático',             desc: 'O sistema manda mensagem lembrando o cliente do horário. Falta cai mais de 60%. Você para de perder dinheiro à toa.' },
    { icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3',                                                                           title: 'Página profissional',             desc: 'Sua barbearia com cara de profissional. Mostra serviços, preços e horários. Passa confiança pra quem ainda não te conhece.' },
    { icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5',   title: 'Agenda sem confusão',             desc: 'Tudo num só lugar, claro e organizado. Chega de papel, chega de anotação perdida no zap.' },
    { icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z',                                                                                                                                                                                 title: 'No ar em 5 minutos',              desc: 'Serviços já pré-cadastrados. Você ajusta o que quer, confirma os horários e já tem o link pra divulgar. Simples assim.' },
  ]
  </script>