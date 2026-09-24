<template>
    <div class="text-[15px]">
  
      <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
        <div class="max-w-6xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span>/</span>
            <NuxtLink to="/recursos" class="hover:text-green-400 transition-colors">Recursos</NuxtLink>
            <span>/</span>
            <span class="text-gray-400">Controle de Clientes</span>
          </nav>
        </div>
      </section>
  
      <!-- HERO -->
      <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 55% at 65% 50%,rgba(52,211,153,.08),transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Recurso</span>
          <h1
            class="font-black leading-none mb-5 text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.02em"
          >
            CONTROLE DE<br>
            <span class="text-green-400">CLIENTES</span><br>
            PARA BARBEARIA
          </h1>
          <p class="text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl">
            Saiba quem agendou, quem confirmou, quem faltou e quem está na fila de espera —
            tudo no celular, em tempo real, sem complicação.
          </p>
          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
          >
            🔥 Testar grátis por 15 dias
          </a>
        </div>
      </section>
  
      <!-- FUNCIONALIDADES -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-black leading-none mb-4 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3.5vw,48px)">
            TUDO QUE VOCÊ PRECISA <span class="text-green-400">SABER</span> SOBRE SEUS CLIENTES
          </h2>
          <p class="text-[16px] text-gray-400 leading-relaxed mb-10 max-w-2xl">
            Sem planilha, sem anotação em papel. O controle de clientes da SuaAgenda é automático —
            cada agendamento, confirmação e falta fica registrado sem você fazer nada.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="(f, i) in funcionalidades" :key="i"
              class="flex items-start gap-5 p-6 rounded-2xl border border-white/[.06] bg-[#181818] hover:border-green-400/20 transition-colors">
              <span class="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-green-400/10 border border-green-400/20">{{ f.emoji }}</span>
              <div>
                <h3 class="text-[16px] font-bold text-white mb-1">{{ f.title }}</h3>
                <p class="text-[14px] leading-relaxed text-gray-500">{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- POR QUE IMPORTA -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
        <div class="max-w-4xl mx-auto">
          <h2 class="font-black leading-none mb-8 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3.5vw,48px)">
            POR QUE O CONTROLE DE CLIENTES <span class="text-green-400">IMPORTA</span>?
          </h2>
          <div class="space-y-5">
            <p class="text-[16px] leading-relaxed text-gray-400">
              Um barbeiro que atende 8 clientes por dia, 6 dias por semana, tem 48 interações semanais.
              Sem sistema, é impossível saber quem faltou mais, quem é cliente frequente, quais horários
              têm mais furo. Você fica no escuro — gerenciando no feeling.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400">
              Com controle de clientes automatizado, você vê padrões: quais dias têm mais falta, quais
              clientes sempre confirmam, quem não volta depois do primeiro corte. Com esses dados,
              você toma decisões melhores — sem precisar de planilha.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400">
              Além disso, o histórico de agendamentos ajuda na fidelização: você sabe quando um cliente
              regular sumiu e pode agir antes de perdê-lo definitivamente.
            </p>
          </div>
        </div>
      </section>
  
      <!-- CTA -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111] text-center">
        <div class="max-w-xl mx-auto">
          <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,60px)">
            COMECE A <span class="text-green-400">CONTROLAR</span><br>SUA AGENDA
          </h2>
          <p class="text-[17px] text-gray-400 leading-relaxed mb-8">
            Agenda, controle de clientes, confirmação automática e SEO no Google — tudo num só sistema,
            pronto em 5 minutos.
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
  
  const funcionalidades = [
    { emoji: '📋', title: 'Histórico de agendamentos', desc: 'Cada horário marcado fica salvo automaticamente — quem agendou, qual serviço, qual profissional.' },
    { emoji: '✅', title: 'Status de confirmação', desc: 'Veja em tempo real quem confirmou, quem está pendente e quem não respondeu.' },
    { emoji: '🚫', title: 'Registro de faltas', desc: 'Clientes que não apareceram ficam marcados. Você decide como tratar reincidentes.' },
    { emoji: '⏳', title: 'Fila de espera', desc: 'Quem entrou na fila, quando foi chamado e se confirmou — tudo rastreado.' },
    { emoji: '🔔', title: 'Notificação em tempo real', desc: 'Novo agendamento, confirmação ou cancelamento chegam no seu WhatsApp na hora.' },
    { emoji: '👥', title: 'Controle por profissional', desc: 'Em barbearias com mais de um barbeiro, você vê a agenda de cada profissional separadamente.' },
  ]
  
  const relatedLinks = [
    { label: 'Agenda online', href: '/recursos/agenda-online' },
    { label: 'Link de agendamento', href: '/recursos/link-agendamento' },
    { label: 'Como conseguir mais clientes', href: '/blog/como-conseguir-clientes-barbearia' },
    { label: 'Sistema para barbearia', href: '/barbearia' },
  ]
  
  useHead({
    title: 'Controle de Clientes para Barbearia | SuaAgenda',
    meta: [
      { name: 'description', content: 'Controle de clientes para barbearia: histórico de agendamentos, confirmações, faltas e fila de espera — automático, no celular, sem planilha.' },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: 'https://suaagenda.link/recursos/controle-clientes' }],
  })
  </script>