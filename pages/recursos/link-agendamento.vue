<template>
    <div class="text-[15px]">
  
      <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
        <div class="max-w-6xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span>/</span>
            <NuxtLink to="/recursos" class="hover:text-green-400 transition-colors">Recursos</NuxtLink>
            <span>/</span>
            <span class="text-gray-400">Link de Agendamento</span>
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
              LINK DE<br>
              <span class="text-green-400">AGENDAMENTO</span><br>
              PELO WHATSAPP
            </h1>
            <p class="text-xl text-gray-400 leading-relaxed mb-8">
              Um link único para sua barbearia. O cliente clica, vê os horários disponíveis
              e agenda na hora — sem te chamar, sem você largar a tesoura.
            </p>
            <a
              href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
            >
              🔥 Criar meu link grátis
            </a>
          </div>
  
          <!-- Mockup do link -->
          <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-8 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
            <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-5">Exemplo de link</p>
            <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0f0f0f] border border-white/[.06] mb-6">
              <span class="text-green-400 text-sm font-mono flex-shrink-0">🔗</span>
              <span class="text-sm text-gray-300 font-mono truncate">suaagenda.link/<span class="text-green-400">sua-barbearia</span></span>
            </div>
            <div class="space-y-3">
              <div v-for="step in mockupSteps" :key="step.label" class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 flex-shrink-0">{{ step.n }}</span>
                <span class="text-[14px] text-gray-400">{{ step.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- ONDE USAR -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-black leading-none mb-4 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3.5vw,48px)">
            ONDE VOCÊ COLOCA <span class="text-green-400">O LINK</span>
          </h2>
          <p class="text-[16px] text-gray-400 mb-10 max-w-xl">
            O link funciona em qualquer lugar onde você compartilha contato. Uma vez criado, trabalha por
            você 24h por dia — mesmo quando você está na cadeira atendendo.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="(canal, i) in canais" :key="i"
              class="flex items-start gap-4 p-6 rounded-2xl border border-white/[.06] bg-[#181818] hover:border-green-400/20 transition-colors">
              <span class="text-2xl flex-shrink-0">{{ canal.emoji }}</span>
              <div>
                <h3 class="text-[16px] font-bold text-white mb-1">{{ canal.title }}</h3>
                <p class="text-[14px] leading-relaxed text-gray-500">{{ canal.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- COMO FUNCIONA -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="font-black leading-none mb-4 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3.5vw,48px)">
            COMO O LINK <span class="text-green-400">FUNCIONA</span>
          </h2>
          <p class="text-[16px] text-gray-400 mb-12">Do clique do cliente até a notificação no seu celular.</p>
          <div class="relative grid grid-cols-1 sm:grid-cols-4 gap-8">
            <div class="hidden sm:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent"></div>
            <div v-for="(step, i) in comoFunciona" :key="i" class="flex flex-col items-center">
              <div class="relative z-10 w-18 h-18 w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 text-green-400 text-2xl bg-[#181818] border-2 border-green-400/25">
                {{ step.emoji }}
              </div>
              <span class="text-xs font-bold tracking-widest text-green-400 mb-2">PASSO {{ i + 1 }}</span>
              <p class="text-[14px] font-semibold text-white mb-1">{{ step.title }}</p>
              <p class="text-[13px] text-gray-500 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111] text-center">
        <div class="max-w-xl mx-auto">
          <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,60px)">
            SEU LINK PRONTO<br><span class="text-green-400">EM 5 MINUTOS</span>
          </h2>
          <p class="text-[17px] text-gray-400 leading-relaxed mb-8">
            Cria a conta, confirma os serviços e seu link de agendamento já está pronto pra compartilhar
            no WhatsApp e no Instagram.
          </p>
          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300"
          >
            ✂️ Criar meu link grátis
          </a>
          <p class="text-xs text-gray-600 mt-4">Sem cartão · Cancela quando quiser</p>
        </div>
      </section>
  
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
  
  const mockupSteps = [
    { n: '1', label: 'Cliente recebe o link no WhatsApp' },
    { n: '2', label: 'Abre no navegador, sem baixar app' },
    { n: '3', label: 'Escolhe serviço, profissional e horário' },
    { n: '4', label: 'Confirma — você recebe notificação' },
  ]
  
  const canais = [
    { emoji: '💬', title: 'WhatsApp pessoal', desc: 'Mande o link quando o cliente perguntar sobre horário. Ele agenda sozinho.' },
    { emoji: '📸', title: 'Bio do Instagram', desc: 'Um link na bio substitui mil mensagens respondidas no DM.' },
    { emoji: '📍', title: 'Google Meu Negócio', desc: 'Coloque o link no perfil do Google e receba agendamentos direto da busca.' },
    { emoji: '🗂️', title: 'Status do WhatsApp', desc: 'Poste o link no status com um "Agenda aberta pra essa semana" — funciona muito.' },
    { emoji: '💳', title: 'Cartão de visita digital', desc: 'Substitua o cartão de visita pelo link — mais prático e sem gastar em impressão.' },
    { emoji: '🔗', title: 'Qualquer lugar', desc: 'O link funciona em qualquer plataforma: Telegram, e-mail, QR code na parede.' },
  ]
  
  const comoFunciona = [
    { emoji: '🔗', title: 'Cliente clica no link', desc: 'Sem baixar app, direto no navegador do celular.' },
    { emoji: '📅', title: 'Vê horários disponíveis', desc: 'Somente os horários reais, em tempo real.' },
    { emoji: '✅', title: 'Confirma pelo WhatsApp', desc: 'Recebe mensagem oficial pedindo confirmação.' },
    { emoji: '🔔', title: 'Você recebe notificação', desc: 'Agendamento chega no seu WhatsApp na hora.' },
  ]
  
  const relatedLinks = [
    { label: 'Agenda online', href: '/recursos/agenda-online' },
    { label: 'Controle de clientes', href: '/recursos/controle-clientes' },
    { label: 'Como divulgar barbearia', href: '/blog/como-divulgar-barbearia' },
    { label: 'Sistema para barbearia', href: '/barbearia' },
  ]
  
  useHead({
    title: 'Link de Agendamento pelo WhatsApp para Barbearia | SuaAgenda',
    meta: [
      { name: 'description', content: 'Link de agendamento para barbearia: cliente clica, vê horários disponíveis e agenda sozinho pelo WhatsApp. Sem você largar a tesoura.' },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: 'https://suaagenda.link/recursos/link-agendamento' }],
  })
  </script>