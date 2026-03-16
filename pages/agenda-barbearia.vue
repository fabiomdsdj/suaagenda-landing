<template>
    <div class="text-[15px]">
  
      <!-- HERO -->
      <section class="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-16 overflow-hidden bg-[#0a0a0a]">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 65% 60% at 60% 50%,rgba(52,211,153,.10) 0%,transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div class="flex flex-wrap gap-3 mb-6">
              <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-green-400 bg-green-400/10 border border-green-400/30">
                <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Pronto em 5 minutos
              </span>
            </div>
            <h1
              class="font-black leading-none mb-6 text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(52px,7vw,88px);letter-spacing:.03em"
            >
              AGENDA ONLINE<br>
              PARA <span class="text-green-400">BARBEARIA</span>
            </h1>
            <p class="text-xl text-gray-400 leading-relaxed mb-10 max-w-lg">
              Chega de responder "tem horário pra sexta?" no WhatsApp o dia todo.
              Com a agenda online da SuaAgenda, o cliente escolhe o horário sozinho —
              você só corta o cabelo.
            </p>
            <div class="flex flex-wrap gap-4 mb-10">
              <a
                href="https://wa.me/5511941649284"
                class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
              >🔥 Testar 7 dias grátis</a>
              <a
                href="#como-funciona"
                class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
              >Ver como funciona →</a>
            </div>
            <div class="flex gap-8 pt-6 border-t border-green-400/10">
              <div v-for="s in heroStats" :key="s.label">
                <p class="font-black text-green-400 text-3xl leading-none" style="font-family:'Bebas Neue',sans-serif">{{ s.num }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ s.label }}</p>
              </div>
            </div>
          </div>
  
          <!-- Card visual da agenda -->
          <div class="hidden md:block">
            <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-8 relative overflow-hidden">
              <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
              <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-6">Sua agenda hoje</p>
              <div class="space-y-3">
                <div v-for="slot in agendaSlots" :key="slot.hora"
                  class="flex items-center gap-4 p-3 rounded-xl"
                  :class="slot.status === 'confirmado' ? 'bg-green-400/10 border border-green-400/20' : slot.status === 'pendente' ? 'bg-yellow-400/5 border border-yellow-400/20' : 'bg-white/[.03] border border-white/[.06]'"
                >
                  <span class="text-sm font-bold w-12 flex-shrink-0" :class="slot.status === 'confirmado' ? 'text-green-400' : slot.status === 'pendente' ? 'text-yellow-400' : 'text-gray-600'">
                    {{ slot.hora }}
                  </span>
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-semibold truncate" :class="slot.status === 'livre' ? 'text-gray-600' : 'text-white'">
                      {{ slot.nome }}
                    </p>
                    <p class="text-[11px]" :class="slot.status === 'confirmado' ? 'text-green-400' : slot.status === 'pendente' ? 'text-yellow-400' : 'text-gray-700'">
                      {{ slot.label }}
                    </p>
                  </div>
                  <span v-if="slot.status === 'confirmado'" class="text-green-400 text-lg">✓</span>
                  <span v-else-if="slot.status === 'pendente'" class="text-yellow-400 text-lg">⏳</span>
                </div>
              </div>
              <div class="mt-5 p-3 rounded-xl bg-green-400/[.06] border border-green-400/10">
                <p class="text-xs text-green-400 font-semibold">🔔 Novo agendamento — Rafael · Corte + Barba · 15h30</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- PROBLEMA -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">O problema</span>
          <h2 class="mt-3 mb-10 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,60px)">
            SEM AGENDA ONLINE,<br>VOCÊ <span class="text-red-400">PERDE</span> TODO DIA
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div v-for="(p, i) in problemas" :key="i"
              class="rounded-2xl border border-red-400/10 bg-[#181818] p-7">
              <div class="text-3xl mb-4">{{ p.emoji }}</div>
              <h3 class="text-[16px] font-bold text-white mb-2">{{ p.title }}</h3>
              <p class="text-[14px] leading-relaxed text-gray-500">{{ p.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- COMO FUNCIONA -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]" id="como-funciona">
        <div class="max-w-6xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">Como funciona</span>
          <h2 class="mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,60px)">
            AGENDA ONLINE QUE <span class="text-green-400">FUNCIONA</span><br>DO JEITO QUE VOCÊ PRECISA
          </h2>
          <p class="mb-14 max-w-xl text-xl text-gray-400 leading-relaxed">
            Do cadastro até o primeiro agendamento em menos de 5 minutos. Sem técnico, sem treinamento.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="(f, i) in funcionalidades" :key="i"
              class="group flex items-start gap-5 p-7 rounded-2xl border border-green-400/10 bg-[#181818] hover:border-green-400/30 transition-all hover:-translate-y-0.5">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-green-400/10 border border-green-400/20 group-hover:bg-green-400/20 transition-colors">
                {{ f.emoji }}
              </div>
              <div>
                <h3 class="text-[16px] font-bold text-white mb-2">{{ f.title }}</h3>
                <p class="text-[14px] leading-relaxed text-gray-500">{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- FUNCIONA NO CELULAR -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-green-400">Feito pro barbeiro</span>
            <h2 class="mt-3 mb-5 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,52px)">
              FUNCIONA NO<br><span class="text-green-400">CELULAR.</span><br>IGUAL UM APP.
            </h2>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
              A SuaAgenda abre direto no navegador do celular — sem precisar instalar nada na loja de aplicativos.
              Você pode salvar na tela inicial e usar igual a um app, só que sem ocupar espaço e sem atualização forçada.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-6">
              Barbeiro não fica na frente do computador. Por isso tudo aqui foi pensado pra funcionar
              com um dedo, enquanto você atende — notificação no WhatsApp, agenda na palma da mão.
            </p>
            <div class="flex flex-wrap gap-2">
              <span v-for="t in celularTags" :key="t" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-green-400 bg-green-400/[.08] border border-green-400/20">✓ {{ t }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in celularStats" :key="stat.label"
              class="rounded-2xl border border-green-400/10 bg-[#181818] p-6 text-center">
              <p class="font-black text-green-400 leading-none mb-2" style="font-family:'Bebas Neue',sans-serif;font-size:44px">{{ stat.num }}</p>
              <p class="text-sm text-gray-500 leading-snug">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- DEPOIMENTO -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
        <div class="max-w-3xl mx-auto text-center">
          <p class="text-6xl text-green-400/20 font-black leading-none mb-4">"</p>
          <blockquote class="text-2xl md:text-3xl italic leading-relaxed text-white mb-8">
            Antes ficava respondendo WhatsApp o dia inteiro. Agora mando o link e o cliente agenda sozinho.
            Minha sexta-feira tá sempre cheia.
          </blockquote>
          <div class="flex items-center justify-center gap-3">
            <div class="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-black font-bold text-sm">WS</div>
            <div class="text-left">
              <p class="font-semibold text-white">Wellington Santos</p>
              <p class="text-sm text-gray-500">Studio W Barber — Rio de Janeiro</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- PREÇO -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111] text-center">
        <div class="max-w-4xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">Preço</span>
          <h2 class="mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,60px)">
            A PARTIR DE <span class="text-green-400">R$79,90</span>/MÊS
          </h2>
          <p class="mb-10 text-xl text-gray-400">Sem taxa de setup. Sem contrato. Cancela quando quiser.</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300">
              ✂️ Testar 7 dias grátis
            </a>
            <NuxtLink to="/barbearia#preco"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400">
              Ver todos os planos →
            </NuxtLink>
          </div>
          <p class="mt-5 text-xs text-gray-600">🔒 Sem cartão de crédito no trial</p>
        </div>
      </section>
  
      <!-- LINKS INTERNOS SEO -->
      <section class="w-full py-12 px-6 md:px-16 bg-[#0a0a0a] border-t border-white/[.05]">
        <div class="max-w-6xl mx-auto">
          <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-5">Veja também</p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink v-for="link in seoLinks" :key="link.href" :to="link.href"
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
    { num: '500+', label: 'Barbearias ativas' },
    { num: '5min', label: 'Pra estar no ar' },
    { num: 'R$79', label: 'Por mês' },
  ]
  
  const agendaSlots = [
    { hora: '09:00', nome: 'Carlos Souza', label: 'Corte + Barba · confirmado', status: 'confirmado' },
    { hora: '10:00', nome: 'Marcos Lima', label: 'Corte · confirmado', status: 'confirmado' },
    { hora: '11:00', nome: 'Diego Moura', label: 'Aguardando confirmação', status: 'pendente' },
    { hora: '12:00', nome: 'Horário livre', label: 'Disponível', status: 'livre' },
    { hora: '14:00', nome: 'Rafael Neves', label: 'Corte · confirmado', status: 'confirmado' },
  ]
  
  const problemas = [
    {
      emoji: '📱',
      title: 'Horas respondendo no WhatsApp',
      desc: 'Você para no meio de um corte pra responder "tem horário amanhã?" — e ainda arrisca errar o serviço.',
    },
    {
      emoji: '🪑',
      title: 'Cadeira vazia sem aviso',
      desc: 'Cliente que não confirmou, que esqueceu, que sumiu. Você fica esperando com a cadeira vazia e o dinheiro indo embora.',
    },
    {
      emoji: '📓',
      title: 'Agenda no papel vira confusão',
      desc: 'Dois clientes no mesmo horário, rasura que não dá pra ler, horário que você não lembra se marcou.',
    },
  ]
  
  const funcionalidades = [
    {
      emoji: '🔗',
      title: 'Link único de agendamento',
      desc: 'Você recebe um link. Manda no WhatsApp, coloca na bio do Instagram. O cliente clica, vê os horários e agenda — sem te chamar.',
    },
    {
      emoji: '✅',
      title: 'Confirmação automática via WhatsApp',
      desc: 'O sistema pede confirmação pro cliente pelo WhatsApp. Confirmou → garantido. Não respondeu → horário libera sozinho e chama o próximo.',
    },
    {
      emoji: '🔔',
      title: 'Notificação de novo agendamento',
      desc: 'Cada agendamento novo chega no seu WhatsApp na hora — mesmo você estando na cadeira atendendo.',
    },
    {
      emoji: '⏳',
      title: 'Fila de espera automática',
      desc: 'Horário cancelado? O sistema chama automaticamente quem estava esperando. Você não perde a cadeira à toa.',
    },
    {
      emoji: '📅',
      title: 'Disponibilidade pré-configurada',
      desc: 'A disponibilidade dos seus profissionais já vem configurada pelo horário de funcionamento. Ajuste o que quiser, bloqueie quando precisar.',
    },
    {
      emoji: '📍',
      title: 'Aparece no Google do seu bairro',
      desc: 'Tecnologia exclusiva coloca sua barbearia nas primeiras posições do Google para quem busca no seu bairro. Sem pagar anúncio.',
    },
  ]
  
  const celularTags = [
    'Funciona no celular',
    'Salva na tela inicial',
    'Sem instalar nada',
    'Notificação no WhatsApp',
  ]
  
  const celularStats = [
    { num: '100%', label: 'Funciona no celular' },
    { num: '0', label: 'Apps pra instalar' },
    { num: '5min', label: 'Pra estar no ar' },
    { num: '24h', label: 'Recebendo agendamentos' },
  ]
  
  const seoLinks = [
    { label: 'Sistema para barbearia', href: '/sistema-para-barbearia' },
    { label: 'App para barbeiro', href: '/app-para-barbeiro' },
    { label: 'Link de agendamento', href: '/recursos/link-agendamento' },
    { label: 'Como divulgar barbearia', href: '/blog/como-divulgar-barbearia' },
    { label: 'Barbearias por bairro', href: '/barbearias' },
  ]
  
  useHead({
    title: 'Agenda Online para Barbearia — Sem Papel, Sem Confusão | SuaAgenda',
    meta: [
      { name: 'description', content: 'Agenda online para barbearia: cliente agenda pelo link, confirmação automática via WhatsApp, zero confusão de horário. Pronto em 5 minutos, a partir de R$79,90/mês.' },
      { property: 'og:title', content: 'Agenda Online para Barbearia | SuaAgenda' },
      { property: 'og:description', content: 'Agenda online para barbearia: cliente agenda pelo link, confirmação automática via WhatsApp, zero confusão de horário.' },
      { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/barber-og_rgvr3h.jpg' },
      { property: 'og:url', content: 'https://suaagenda.link/agenda-barbearia' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: 'https://suaagenda.link/agenda-barbearia' }],
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SuaAgenda — Agenda Online para Barbearia',
        applicationCategory: 'BusinessApplication',
        description: 'Agenda online para barbearia com confirmação automática via WhatsApp e SEO local.',
        offers: { '@type': 'Offer', price: '79.90', priceCurrency: 'BRL' },
        url: 'https://suaagenda.link/agenda-barbearia',
      }),
    }],
  })
  </script>