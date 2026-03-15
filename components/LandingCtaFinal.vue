<template>
    <section class="relative w-full py-32 px-6 md:px-16 bg-[#0a0a0a] text-center overflow-hidden">
      <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_350px_at_50%_50%,rgba(52,211,153,0.07),transparent)]" />
  
      <div class="relative max-w-2xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-[.12em] uppercase text-green-400 block mb-4">Começa agora</span>
  
        <h2 class="fade-on-scroll font-black leading-none text-white mb-6 text-5xl md:text-8xl" style="font-family:'Bebas Neue',sans-serif">
          CHEGA DE <span class="text-red-400">PERDER</span><br>CLIENTE.
        </h2>
  
        <p class="fade-on-scroll mb-10 text-lg leading-relaxed text-gray-400">
          Em 5 minutos sua barbearia tem página, link de agendamento e presença no Google. Sem complicação.
        </p>
  
        <div class="fade-on-scroll flex justify-center">
          <BotaoAgendar
            text="Testar grátis por 7 dias"
            href="https://wa.me/5511999999999"
            bg-color="bg-green-400"
            text-color="text-black"
            halo-color="bg-green-400"
          />
        </div>
  
        <div class="fade-on-scroll flex items-center justify-center flex-wrap gap-6 mt-6 text-sm text-gray-500">
          <span class="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
            </svg>
            Sem cartão de crédito
          </span>
          <span class="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>
            </svg>
            Pronto em 5 minutos
          </span>
          <span class="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            Cancela quando quiser
          </span>
        </div>
      </div>
    </section>
  </template>