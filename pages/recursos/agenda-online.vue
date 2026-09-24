<template>
    <div class="text-[15px]">
  
      <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
        <div class="max-w-6xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span>/</span>
            <NuxtLink to="/recursos" class="hover:text-green-400 transition-colors">Recursos</NuxtLink>
            <span>/</span>
            <span class="text-gray-400">Agenda Online</span>
          </nav>
        </div>
      </section>
  
      <!-- HERO -->
      <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 55% at 65% 50%,rgba(52,211,153,.08),transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Recurso</span>
            <h1
              class="font-black leading-none mb-5 text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.02em"
            >
              AGENDA ONLINE<br>
              PARA <span class="text-green-400">BARBEARIAS</span>
            </h1>
            <p class="text-xl text-gray-400 leading-relaxed mb-8">
              Chega de agenda no papel, confusão de horário e cliente sumindo.
              Com a agenda online da SuaAgenda, tudo é automático — você só corta o cabelo.
            </p>
            <a
              href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
            >
              🔥 Testar grátis por 15 dias
            </a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in heroStats" :key="stat.label" class="rounded-2xl border border-green-400/10 bg-[#181818] p-6 text-center">
              <p class="font-black text-green-400 leading-none mb-2" style="font-family:'Bebas Neue',sans-serif;font-size:44px">{{ stat.num }}</p>
              <p class="text-sm text-gray-500 leading-snug">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- O QUE É -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-black leading-none mb-10 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,52px)">
            O QUE É UMA <span class="text-green-400">AGENDA ONLINE</span> PARA BARBEARIA?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <p class="text-[16px] leading-relaxed text-gray-400">
              Uma agenda online para barbearia é um sistema digital que substitui o papel, o WhatsApp manual
              e a memória. O cliente acessa um link, vê os horários disponíveis em tempo real e agenda
              sozinho — sem precisar te chamar.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400">
              Você recebe a notificação no celular, o sistema confirma o horário com o cliente via WhatsApp
              e a agenda atualiza automaticamente. Se o cliente não confirmar, o horário volta pra agenda
              e o próximo da fila é chamado.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="(f, i) in features" :key="i" class="group rounded-2xl border border-green-400/10 bg-[#181818] p-7 transition-all hover:-translate-y-1 hover:border-green-400/30">
              <div class="text-2xl mb-4">{{ f.emoji }}</div>
              <h3 class="text-[16px] font-bold text-white mb-2">{{ f.title }}</h3>
              <p class="text-[14px] leading-relaxed text-gray-500">{{ f.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- COMPARAÇÃO -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
        <div class="max-w-4xl mx-auto">
          <h2 class="font-black leading-none mb-10 text-white text-center" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3.5vw,48px)">
            AGENDA ONLINE VS <span class="text-red-400">AGENDA NO PAPEL</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="rounded-2xl border border-red-400/20 bg-[#181818] p-7">
              <p class="text-xs font-bold tracking-widest uppercase text-red-400 mb-5">Agenda no papel / WhatsApp manual</p>
              <ul class="space-y-3">
                <li v-for="d in semSistema" :key="d" class="flex items-start gap-3 text-[15px] text-gray-400">
                  <span class="text-red-400 font-bold mt-0.5 flex-shrink-0">✗</span>{{ d }}
                </li>
              </ul>
            </div>
            <div class="rounded-2xl border border-green-400/30 bg-[#181818] p-7 relative overflow-hidden">
              <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
              <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-5">SuaAgenda — Agenda Online</p>
              <ul class="space-y-3">
                <li v-for="s in comSistema" :key="s" class="flex items-start gap-3 text-[15px] text-white">
                  <span class="text-green-400 font-bold mt-0.5 flex-shrink-0">✓</span>{{ s }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA FINAL -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111] text-center">
        <div class="max-w-xl mx-auto">
          <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,60px)">
            COMECE HOJE.<br><span class="text-green-400">5 MINUTOS.</span>
          </h2>
          <p class="text-[17px] text-gray-400 leading-relaxed mb-8">
            Sem técnico, sem treinamento, sem contrato. Cria a conta, confirma os serviços
            e a agenda online já está no ar.
          </p>
          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300"
          >
            ✂️ Testar 15 dias grátis
          </a>
          <p class="text-xs text-gray-600 mt-4">Sem cartão · Cancela quando quiser</p>
        </div>
      </section>
  
      <!-- Links internos -->
      <section class="w-full py-12 px-6 md:px-16 bg-[#0a0a0a] border-t border-white/[.05]">
        <div class="max-w-6xl mx-auto">
          <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-5">Explore também</p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink v-for="link in relatedLinks" :key="link.href" :to="link.href"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] text-gray-400 border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:text-green-400 transition-all">
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </section>
  
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({ layout: 'barber' })
  
  const heroStats = [
    { num: '5min', label: 'Para estar no ar' },
    { num: '500+', label: 'Barbearias ativas' },
    { num: '0', label: 'Furos por semana (média)' },
    { num: 'R$79', label: 'Por mês' },
  ]
  
  const features = [
    { emoji: '📱', title: 'Funciona 100% no celular', desc: 'Feito pra quem trabalha de pé. Gerencie a agenda do celular enquanto atende.' },
    { emoji: '✅', title: 'Confirmação automática', desc: 'O sistema pede confirmação via WhatsApp. Não confirmou? Horário volta pra agenda.' },
    { emoji: '🔔', title: 'Notificação de novo agendamento', desc: 'Cada novo horário marcado chega no seu WhatsApp na hora.' },
    { emoji: '🚫', title: 'Fila de espera automática', desc: 'Horário liberou? O próximo interessado é chamado automaticamente.' },
    { emoji: '📍', title: 'Aparece no Google', desc: 'Tecnologia exclusiva de SEO local coloca sua barbearia nas primeiras posições.' },
    { emoji: '⚡', title: 'Pronto em 5 minutos', desc: 'Serviços e disponibilidade pré-preenchidos. Você só confirma o que usa.' },
  ]
  
  const semSistema = [
    'Horário duplicado quando não presta atenção',
    'Passa horas respondendo "tem vaga pra amanhã?"',
    'Cliente some sem avisar — cadeira fica vazia',
    'Não aparece no Google quando alguém busca',
    'Sem controle de quem confirmou e quem não confirmou',
  ]
  
  const comSistema = [
    'Horários em tempo real — sem conflito nunca',
    'Cliente agenda sozinho pelo link, você não responde nada',
    'Confirmação automática: quem não confirma perde o horário',
    'Site indexado no Google no seu bairro automaticamente',
    'Fila de espera preenche os buracos sozinha',
  ]
  
  const relatedLinks = [
    { label: 'Link de agendamento', href: '/recursos/link-agendamento' },
    { label: 'Controle de clientes', href: '/recursos/controle-clientes' },
    { label: 'Como divulgar barbearia', href: '/blog/como-divulgar-barbearia' },
    { label: 'Como conseguir mais clientes', href: '/blog/como-conseguir-clientes-barbearia' },
    { label: 'Sistema para barbearia', href: '/barbearia' },
  ]
  
  useHead({
    title: 'Agenda Online para Barbearias — Como Funciona | SuaAgenda',
    meta: [
      { name: 'description', content: 'Agenda online para barbearias: cliente agenda pelo link, confirmação automática via WhatsApp, sem papel e sem confusão. Pronto em 5 minutos.' },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: 'https://suaagenda.link/recursos/agenda-online' }],
  })
  </script>