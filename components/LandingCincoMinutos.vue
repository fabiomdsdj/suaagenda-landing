<template>
    <section class="w-full py-24 px-6 md:px-16 bg-[#111111]">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
  
        <!-- Timer card -->
        <div class="fade-on-scroll relative overflow-hidden rounded-2xl border border-green-400/20 bg-[#181818] p-10 text-center">
          <div class="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.1),transparent_70%)] pointer-events-none" />
          <p class="font-black text-green-400 leading-none" style="font-family:'Bebas Neue',sans-serif; font-size:120px">5</p>
          <p class="text-sm tracking-[.07em] text-gray-400 mb-8 uppercase">Minutos pra estar no ar</p>
          <ul class="list-none p-0 m-0 text-left space-y-0">
            <li
              v-for="(s, i) in steps"
              :key="i"
              class="flex items-center gap-3 py-3 text-[15px] text-gray-400 border-b border-white/5 last:border-0"
            >
              <span class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/30">
                {{ i + 1 }}
              </span>
              {{ s }}
            </li>
          </ul>
        </div>
  
        <!-- texto -->
        <div class="fade-on-scroll">
          <span class="text-xs font-bold tracking-[.12em] uppercase text-green-400">Por que é tão rápido</span>
          <h2 class="mt-3 mb-5 font-black leading-none text-white text-4xl md:text-5xl" style="font-family:'Bebas Neue',sans-serif">
            SEM CONFIGURAÇÃO.<br>SEM <span class="text-green-400">COMPLICAÇÃO.</span>
          </h2>
          <p class="text-base leading-relaxed text-gray-400 mb-4">
            A maioria dos sistemas te faz cadastrar tudo do zero: cada serviço, cada preço, cada regra.
            <strong class="text-white">Aqui não.</strong>
          </p>
          <p class="text-base leading-relaxed text-gray-400 mb-4">
            A SuaAgenda já vem com os serviços mais comuns de barbearia pré-cadastrados —
            corte, barba, combo, sobrancelha. Você só confirma o que usa e ajusta o preço se quiser.
          </p>
          <p class="text-base leading-relaxed text-gray-400">
            Em 5 minutos você tem uma página profissional no ar e um link pra mandar
            no WhatsApp e Instagram agora mesmo.
          </p>
          <div class="flex flex-wrap gap-2 mt-6">
            <span
              v-for="t in tags" :key="t"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-green-400 bg-green-400/[.08] border border-green-400/20"
            >✓ {{ t }}</span>
          </div>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  const steps = [
    'Cria sua conta com nome e endereço',
    'Serviços já vêm pré-preenchidos — ajusta o que quiser',
    'Confirma seus horários de atendimento',
    'Recebe seu link e já manda no WhatsApp',
  ]
  const tags = ['Serviços pré-preenchidos', 'Sem treinamento', 'Sem técnico', 'Funciona no celular']
  </script>