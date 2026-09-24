<template>
    <div class="text-[15px]">
  
      <!-- HERO -->
      <section class="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-16 overflow-hidden bg-[#0a0a0a]">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 65% 60% at 60% 50%,rgba(52,211,153,.10) 0%,transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div class="flex flex-wrap gap-3 mb-6">
              <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-green-400 bg-green-400/10 border border-green-400/30">
                📱 Funciona igual um app — sem instalar nada
              </span>
            </div>
            <h1
              class="font-black leading-none mb-6 text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(52px,7vw,88px);letter-spacing:.03em"
            >
              O APP DO<br>
              <span class="text-green-400">BARBEIRO</span><br>
              QUE NÃO É APP
            </h1>
            <p class="text-xl text-gray-400 leading-relaxed mb-6 max-w-lg">
              Abre no celular igual um app, salva na tela inicial igual um app —
              mas você não precisa ir na loja de aplicativos, não ocupa espaço e
              nunca pede pra atualizar na hora errada.
            </p>
            <p class="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">
              Funciona em qualquer celular: Android, iPhone, qualquer um.
            </p>
            <div class="flex flex-wrap gap-4 mb-10">
              <a
                href="https://wa.me/5511941649284"
                class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
              >🔥 Testar 15 dias grátis</a>
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
  
          <!-- Visual dos dois celulares (simulado com cards) -->
          <div class="hidden md:flex flex-col gap-4">
            <!-- Notificação WhatsApp simulada -->
            <div class="rounded-2xl border border-green-400/20 bg-[#181818] p-6 relative overflow-hidden">
              <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-full bg-green-400/20 border border-green-400/30 flex items-center justify-center text-green-400 font-bold text-sm flex-shrink-0">SA</div>
                <div>
                  <p class="text-sm font-bold text-white">SuaAgenda</p>
                  <p class="text-xs text-gray-500">Agora mesmo</p>
                </div>
              </div>
              <p class="text-[14px] text-gray-300 leading-relaxed">
                🔔 <strong class="text-white">Novo agendamento!</strong><br>
                Felipe Costa · Corte + Barba<br>
                Amanhã às 14h00 ✓ Confirmado
              </p>
            </div>
            <!-- Ícone na tela inicial simulado -->
            <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6">
              <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4">Tela inicial do celular</p>
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-green-400 flex items-center justify-center text-black text-2xl font-black shadow-lg shadow-green-400/20 flex-shrink-0">✂️</div>
                <div>
                  <p class="font-bold text-white">SuaAgenda</p>
                  <p class="text-xs text-gray-500">Toca e abre igual qualquer app</p>
                  <p class="text-xs text-green-400 mt-1">✓ Salvo na tela inicial · Sem instalar</p>
                </div>
              </div>
            </div>
            <!-- Compatibilidade -->
            <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-5 flex items-center gap-4">
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-xl bg-white/[.06] flex items-center justify-center text-xl">🤖</div>
                <div class="w-10 h-10 rounded-xl bg-white/[.06] flex items-center justify-center text-xl">🍎</div>
              </div>
              <p class="text-[13px] text-gray-400">Funciona em <strong class="text-white">Android e iPhone</strong> — qualquer celular com internet</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- POR QUE SEM INSTALAR -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">Por que é diferente</span>
          <h2 class="mt-3 mb-10 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,52px)">
            A VANTAGEM DE NÃO<br><span class="text-green-400">PRECISAR INSTALAR</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div class="rounded-2xl border border-red-400/10 bg-[#181818] p-7">
              <p class="text-xs font-bold tracking-widest uppercase text-red-400 mb-5">App normal (precisa instalar)</p>
              <ul class="space-y-3">
                <li v-for="d in semVantagem" :key="d" class="flex items-start gap-3 text-[15px] text-gray-400">
                  <span class="text-red-400 font-bold mt-0.5 flex-shrink-0">✗</span>{{ d }}
                </li>
              </ul>
            </div>
            <div class="rounded-2xl border border-green-400/30 bg-[#181818] p-7 relative overflow-hidden">
              <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
              <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-5">SuaAgenda (abre no navegador)</p>
              <ul class="space-y-3">
                <li v-for="s in comVantagem" :key="s" class="flex items-start gap-3 text-[15px] text-white">
                  <span class="text-green-400 font-bold mt-0.5 flex-shrink-0">✓</span>{{ s }}
                </li>
              </ul>
            </div>
          </div>
          <div class="rounded-2xl border border-green-400/10 bg-green-400/[.04] p-6">
            <p class="text-[16px] text-gray-300 leading-relaxed">
              <strong class="text-white">E seu cliente?</strong> Também não precisa instalar nada. Ele clica no link que você manda,
              abre no navegador do celular e agenda na hora — sem baixar app, sem criar conta, sem senha.
            </p>
          </div>
        </div>
      </section>
  
      <!-- O QUE VOCÊ FAZ NO CELULAR -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]" id="como-funciona">
        <div class="max-w-6xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">No dia a dia</span>
          <h2 class="mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,52px)">
            TUDO QUE VOCÊ FAZ<br><span class="text-green-400">NO CELULAR</span>
          </h2>
          <p class="mb-12 max-w-xl text-xl text-gray-400 leading-relaxed">
            Sem precisar abrir computador. Tudo na palma da mão, enquanto você trabalha.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="(a, i) in acoes" :key="i"
              class="group rounded-2xl border border-green-400/10 bg-[#181818] p-7 transition-all hover:-translate-y-1 hover:border-green-400/30 relative overflow-hidden">
              <div class="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-green-400 to-emerald-300"></div>
              <div class="text-3xl mb-4">{{ a.emoji }}</div>
              <h3 class="text-[16px] font-bold text-white mb-2">{{ a.title }}</h3>
              <p class="text-[14px] leading-relaxed text-gray-500">{{ a.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- DEPOIMENTO -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-3xl mx-auto text-center">
          <p class="text-6xl text-green-400/20 font-black leading-none mb-4">"</p>
          <blockquote class="text-2xl italic leading-relaxed text-white mb-8">
            Tentei dois outros sistemas e não durei nem uma semana. Eram cheios de tela e botão.
            Esse eu uso todo dia porque é simples — abre no celular e funciona.
          </blockquote>
          <div class="flex items-center justify-center gap-3">
            <div class="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-black font-bold text-sm">MA</div>
            <div class="text-left">
              <p class="font-semibold text-white">Marcos Alves</p>
              <p class="text-sm text-gray-500">Old School Barber — São Paulo</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA -->
      <section class="relative w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"></div>
        <div class="relative max-w-xl mx-auto">
          <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
            BAIXA ZERO.<br><span class="text-green-400">RESULTADO REAL.</span>
          </h2>
          <p class="mb-8 text-xl text-gray-400 leading-relaxed">
            Em 5 minutos você tem agenda online, link pra compartilhar no WhatsApp
            e sua barbearia aparecendo no Google. Sem instalar nada.
          </p>
          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300 hover:scale-105"
          >✂️ Testar 15 dias grátis</a>
          <div class="flex items-center justify-center flex-wrap gap-5 mt-6 text-sm text-gray-600">
            <span>🔒 Sem cartão</span>
            <span>📱 Funciona em qualquer celular</span>
            <span>✓ Cancela quando quiser</span>
          </div>
        </div>
      </section>
  
      <!-- LINKS SEO -->
      <section class="w-full py-12 px-6 md:px-16 bg-[#111] border-t border-white/[.05]">
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
    { num: '0', label: 'Apps pra instalar' },
    { num: '5min', label: 'Pra estar no ar' },
  ]
  
  const semVantagem = [
    'Cliente precisa ir na loja e instalar',
    'Ocupa espaço no celular',
    'Pede pra atualizar na hora errada',
    'Loja pode reprovar ou remover',
    'Você paga taxa pra loja de app',
  ]
  
  const comVantagem = [
    'Abre direto no navegador — clicou, abriu',
    'Salva na tela inicial como se fosse app',
    'Atualiza automático, sempre na versão nova',
    'Funciona em Android e iPhone sem diferença',
    'Cliente não precisa instalar nada pra agendar',
  ]
  
  const acoes = [
    { emoji: '🔔', title: 'Recebe agendamento novo', desc: 'Notificação chega no seu WhatsApp na hora que o cliente marca.' },
    { emoji: '📅', title: 'Vê a agenda do dia', desc: 'Quem confirmou, quem está pendente, qual horário está livre — tudo numa tela.' },
    { emoji: '🚫', title: 'Bloqueia horário', desc: 'Precisou sair mais cedo? Bloqueia o horário em segundos pelo celular.' },
    { emoji: '✅', title: 'Acompanha confirmações', desc: 'Vê em tempo real quem confirmou e quem ainda não respondeu.' },
    { emoji: '🔗', title: 'Compartilha o link', desc: 'Manda o link de agendamento no WhatsApp ou coloca na bio do Instagram.' },
    { emoji: '👥', title: 'Gerencia a equipe', desc: 'Se tiver mais de um barbeiro, cada um tem sua própria agenda — você vê todas.' },
  ]
  
  const seoLinks = [
    { label: 'Agenda para barbearia', href: '/agenda-barbearia' },
    { label: 'Sistema para barbearia', href: '/sistema-para-barbearia' },
    { label: 'Link de agendamento', href: '/recursos/link-agendamento' },
    { label: 'Como conseguir mais clientes', href: '/blog/como-conseguir-clientes-barbearia' },
    { label: 'Barbearias por bairro', href: '/barbearias' },
  ]
  
  useHead({
    title: 'App para Barbeiro — Sem Instalar, Funciona em Qualquer Celular | SuaAgenda',
    meta: [
      { name: 'description', content: 'App para barbeiro que funciona no celular sem precisar instalar nada. Abre igual app, salva na tela inicial, funciona em Android e iPhone. Agenda, WhatsApp e Google em 5 minutos.' },
      { property: 'og:title', content: 'App para Barbeiro sem Instalar | SuaAgenda' },
      { property: 'og:description', content: 'Funciona igual um app no celular, sem precisar instalar. Android e iPhone. Agenda online + WhatsApp + Google.' },
      { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/barber-og_rgvr3h.jpg' },
      { property: 'og:url', content: 'https://suaagenda.link/app-para-barbeiro' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: 'https://suaagenda.link/app-para-barbeiro' }],
  })
  </script>