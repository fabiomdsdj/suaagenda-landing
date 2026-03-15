<template>
    <section class="relative min-h-screen flex flex-col-reverse md:flex-row items-center gap-12 px-6 md:px-16 pt-28 pb-16 bg-[#0a0a0a] overflow-hidden">
  
      <!-- glow fundo -->
      <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_60%_at_60%_50%,rgba(52,211,153,0.1)_0%,transparent_70%)]" />
  
      <!-- coluna esquerda -->
      <div class="z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
  
        <!-- badge -->
        <div
          v-motion="{ initial: { opacity:0, y:20 }, enter: { opacity:1, y:0, transition: { duration:800 } } }"
          class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium text-green-400 bg-green-400/10 border border-green-400/30"
        >
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Pronto em 5 minutos — sem precisar de técnico
        </div>
  
        <!-- título -->
        <h1
          v-motion="{ initial: { opacity:0, y:40 }, enter: { opacity:1, y:0, transition: { duration:1000 } } }"
          class="font-black leading-none mb-6 text-5xl md:text-7xl text-white"
          style="font-family: 'Bebas Neue', sans-serif; letter-spacing: .03em"
        >
          AGENDA <span class="text-green-400">CHEIA.</span><br>
          VIDA MAIS <span class="text-red-400">FÁCIL.</span>
        </h1>
  
        <!-- sub -->
        <p
          v-motion="{ initial: { opacity:0, y:20 }, enter: { opacity:1, y:0, transition: { duration:1000, delay:600 } } }"
          class="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed mb-10"
        >
          Sua barbearia no Google, link de agendamento no WhatsApp e lembrete
          automático — tudo funcionando em menos de 5 minutos, sem complicação.
        </p>
  
        <!-- CTAs -->
        <div
          v-motion="{ initial: { opacity:0, scale:.9 }, enter: { opacity:1, scale:1, transition: { duration:700, delay:1000 } } }"
          class="flex flex-wrap gap-4 justify-center md:justify-start mb-10"
        >
          <BotaoAgendar
            text="Testar 7 dias grátis"
            href="https://wa.me/5511999999999"
            bg-color="bg-green-400"
            text-color="text-black"
            halo-color="bg-green-400"
          />
          <a
            href="#como-funciona"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >
            Ver como funciona →
          </a>
        </div>
  
        <!-- stats -->
        <div
          v-motion="{ initial: { opacity:0 }, enter: { opacity:1, transition: { duration:800, delay:1400 } } }"
          class="flex gap-8 pt-6 border-t border-green-400/10"
        >
          <div v-for="s in stats" :key="s.label">
            <p class="text-green-400 font-black text-3xl leading-none" style="font-family:'Bebas Neue',sans-serif">{{ s.num }}</p>
            <p class="text-xs text-gray-600 mt-1">{{ s.label }}</p>
          </div>
        </div>
      </div>
  
      <!-- imagem -->
      <div class="w-full md:w-1/2 flex justify-center md:justify-end items-end">
        <NuxtImg
          provider="cloudinary"
          src="v1758666030/foto-cabeleireira-2-700-hero0_gzstbz.png"
          alt="Barbeiro atendendo cliente"
          class="block max-w-full h-auto object-contain max-h-[560px] -rotate-3"
        />
      </div>
  
    </section>
  </template>
  
  <script setup>
  const stats = [
    { num: '500+', label: 'Barbearias ativas' },
    { num: 'R$79', label: 'por mês' },
    { num: '5min', label: 'pra estar no ar' },
  ]
  </script>