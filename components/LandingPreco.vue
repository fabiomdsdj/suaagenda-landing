<template>
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center" id="preco">
      <div class="max-w-6xl mx-auto">
  
        <span class="fade-on-scroll text-xs font-bold tracking-[.12em] uppercase text-green-400">Preço</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white text-4xl md:text-6xl" style="font-family:'Bebas Neue',sans-serif">
          UM PLANO. <span class="text-green-400">SEM SURPRESA.</span>
        </h2>
        <p class="fade-on-scroll mb-14 mx-auto max-w-md text-lg leading-relaxed text-gray-400">
          Tudo incluso. Sem taxa de setup. Sem letra miúda. Cancela quando quiser.
        </p>
  
        <div class="fade-on-scroll relative max-w-md mx-auto rounded-3xl border-2 border-green-400 bg-[#181818] p-12 overflow-hidden">
          <!-- glow -->
          <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(52,211,153,0.1),transparent_70%)]" />
  
          <span class="inline-block text-xs font-bold tracking-[.08em] uppercase px-4 py-1.5 rounded-full mb-7 bg-green-400 text-black">
            Plano Solo — Mais Popular
          </span>
  
          <div class="flex items-start justify-center gap-1 mb-2">
            <span class="text-2xl font-bold mt-2 text-green-400">R$</span>
            <span class="font-black text-white leading-none" style="font-family:'Bebas Neue',sans-serif; font-size:88px">79</span>
            <span class="text-xl font-bold mt-4 text-gray-500">,90</span>
          </div>
          <p class="text-sm text-gray-500 mb-8">por mês · cancela quando quiser</p>
  
          <ul class="list-none p-0 m-0 text-left mb-9">
            <li
              v-for="f in features"
              :key="f"
              class="flex items-center gap-3 py-2.5 text-[15px] text-white border-b border-white/5 last:border-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5 flex-shrink-0 text-green-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              {{ f }}
            </li>
          </ul>
  
          <!-- BotaoAgendar com halo -->
          <BotaoAgendar
            text="Testar 7 dias grátis agora"
            href="https://wa.me/5511999999999"
            bg-color="bg-green-400"
            text-color="text-black"
            halo-color="bg-green-400"
            wrapper-class="w-full block"
            class="w-full"
          />
  
          <p class="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
            </svg>
            Sem cartão de crédito. Sem compromisso. Você decide depois.
          </p>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  const features = [
    'Página profissional da sua barbearia',
    'Link de agendamento online',
    'Aparece no Google (sem anúncio)',
    'Agendamento pelo WhatsApp e Instagram',
    'Lembrete automático para clientes',
    'Serviços pré-cadastrados — no ar em 5 min',
    'Suporte pelo WhatsApp',
    '7 dias grátis pra testar',
  ]
  </script>