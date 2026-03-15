<template>
    <section class="w-full py-24 px-6 md:px-16 bg-[#111111] text-center" id="depoimentos">
      <div class="max-w-6xl mx-auto">
  
        <span class="fade-on-scroll text-xs font-bold tracking-[.12em] uppercase text-green-400">O que dizem os barbeiros</span>
        <h2 class="fade-on-scroll mt-3 mb-10 font-black leading-none text-white text-4xl md:text-6xl" style="font-family:'Bebas Neue',sans-serif">
          QUEM JÁ USA, <span class="text-green-400">NÃO LARGA</span>
        </h2>
  
        <!-- rating geral -->
        <div class="fade-on-scroll flex flex-col items-center gap-2 mb-12">
          <span class="font-black text-yellow-400 leading-none" style="font-family:'Bebas Neue',sans-serif; font-size:56px">
            {{ mediaRating }}/5
          </span>
          <div class="flex gap-1">
            <template v-for="i in 5" :key="i">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="w-7 h-7"
                :class="i <= Math.round(mediaRating) ? 'text-yellow-400' : 'text-gray-700'">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.073 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.073-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </template>
          </div>
        </div>
  
        <!-- Swiper — igual ao seu original -->
        <client-only>
          <Swiper
            :modules="[Navigation, Pagination]"
            :slides-per-view="1"
            :space-between="20"
            :breakpoints="{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
            navigation
            :pagination="{ clickable: true }"
            loop
            class="w-full max-w-5xl mx-auto relative pb-12"
          >
            <SwiperSlide v-for="(d, i) in depoimentos" :key="i">
              <div class="rounded-2xl p-6 h-full flex flex-col justify-between text-left bg-[#181818] border border-white/[.06] hover:border-green-400/20 transition-colors duration-200">
  
                <!-- stars — igual ao seu original -->
                <div class="flex items-center mb-4">
                  <span v-for="n in 5" :key="n" class="w-5 h-5">
                    <svg v-if="n <= d.rating" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="text-yellow-400">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.073 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.073-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-gray-700">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.073 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.073-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </span>
                </div>
  
                <p class="text-[15px] font-semibold italic leading-relaxed text-white flex-1 mb-5">"{{ d.texto }}"</p>
  
                <!-- autor — mesma estrutura { nome, profissao, foto? } do seu original -->
                <div class="flex items-center gap-3">
                  <template v-if="d.foto">
                    <NuxtImg class="w-12 h-12 rounded-full object-cover" :src="d.foto" :alt="`Foto de ${d.nome}`" />
                  </template>
                  <template v-else>
                    <div class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 bg-green-400 text-black">
                      {{ getInitials(d.nome) }}
                    </div>
                  </template>
                  <div>
                    <p class="font-semibold text-sm text-white">{{ d.nome }}</p>
                    <p class="text-xs text-gray-500">{{ d.profissao }}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </client-only>
  
      </div>
    </section>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Navigation, Pagination } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'
  
  const depoimentos = [
    { texto: 'Em um mês já tinha 4 clientes novos que vieram pelo Google. Nunca tinha acontecido isso antes.', nome: 'Felipe Costa', profissao: 'Barbearia do Felipe — BH', rating: 5 },
    { texto: 'Ficava respondendo WhatsApp o dia todo. Agora mando o link e o cliente agenda sozinho. Muito mais leve.', nome: 'Wellington Santos', profissao: 'Studio W Barber — RJ', rating: 5 },
    { texto: 'Tentei dois outros sistemas e não durei nem uma semana. Esse eu uso todo dia. É realmente simples.', nome: 'Marcos Alves', profissao: 'Old School Barber — SP', rating: 5 },
    { texto: 'As faltas caíram muito depois que o lembrete automático. Sexta-feira sempre cheia.', nome: 'Rafael Lima', profissao: 'Barbearia RL — Curitiba', rating: 5 },
    { texto: 'R$79 por mês e minha agenda nunca ficou tão cheia. Me paga fácil.', nome: 'Diego Moura', profissao: 'Moura Barbers — Fortaleza', rating: 5 },
    { texto: 'Minha barbearia apareceu no Google em 3 semanas. Tenho clientes novos toda semana.', nome: 'Júnior Neves', profissao: 'JN Barber Shop — Recife', rating: 5 },
  ]
  
  const mediaRating = computed(() => {
    const total = depoimentos.reduce((acc, d) => acc + d.rating, 0)
    return (total / depoimentos.length).toFixed(1)
  })
  
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase()
  </script>
  
  <style>
  .swiper-button-next, .swiper-button-prev { color: #34d399 !important; }
  .swiper-pagination-bullet { background: #34d399 !important; opacity: .5; }
  .swiper-pagination-bullet-active { opacity: 1 !important; }
  </style>