<template>
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">
  
        <span class="fade-on-scroll text-xs font-bold tracking-[.12em] uppercase text-green-400">Isso parece com você?</span>
        <h2 class="fade-on-scroll mt-3 mb-14 font-black leading-none text-white text-4xl md:text-6xl" style="font-family:'Bebas Neue',sans-serif">
          VOCÊ SE <span class="text-red-400">RECONHECE</span> AQUI?
        </h2>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
  
          <!-- lista -->
          <ul class="list-none p-0 m-0">
            <li
              v-for="(item, i) in items"
              :key="i"
              class="fade-on-scroll flex items-start gap-4 py-5 border-b border-white/[.06] last:border-0 text-base text-gray-400 leading-relaxed"
            >
              <span class="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-[11px] text-green-400 bg-green-400/10 border border-green-400">
                ✓
              </span>
              {{ item }}
            </li>
          </ul>
  
          <!-- quote -->
          <div class="fade-on-scroll rounded-xl p-9 bg-[#181818] border border-green-400/[.18] border-l-4 border-l-green-400">
            <p class="text-4xl text-green-400/20 mb-4">"</p>
            <blockquote class="text-xl italic leading-relaxed text-white mb-5">
              Perdia pelo menos 3 horários por semana com cliente sumindo. Agora
              o sistema confirma automático e minha semana tá sempre cheia.
            </blockquote>
            <strong class="block text-base text-green-400">Rodrigo Lima</strong>
            <span class="text-sm text-gray-600">Barbearia RLima — São Paulo</span>
          </div>
  
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const items = [
    'Cliente marca horário no WhatsApp e some — você fica esperando, o horário passa e perde aquele dinheiro',
    'Agenda no papel, no WhatsApp ou na cabeça — e ainda rola confusão de horário às vezes',
    'Bom no que faz, mas quem busca "barbearia perto de mim" no Google vai parar na do concorrente',
    'Depende só do Instagram — quando o algoritmo muda, o movimento cai junto',
    'Já tentou sistema de gestão, era complicado demais, largou em dois dias',
  ]
  </script>