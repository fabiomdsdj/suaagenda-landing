<template>
    <div class="text-[15px]">
  
      <!-- HERO -->
      <section class="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-16 overflow-hidden bg-[#0a0a0a]">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 65% 60% at 60% 50%,rgba(52,211,153,.10) 0%,transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto">
          <div class="flex flex-wrap gap-3 mb-6">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-green-400 bg-green-400/10 border border-green-400/30">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Sistema completo — pronto em 5 minutos
            </span>
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/30">
              ✓ Parceiro oficial Facebook (META)
            </span>
          </div>
          <h1
            class="font-black leading-none mb-6 text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(52px,7vw,88px);letter-spacing:.03em"
          >
            O SISTEMA PARA<br>
            BARBEARIA QUE<br>
            <span class="text-green-400">REALMENTE</span><br>
            FUNCIONA
          </h1>
          <p class="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
            Não é o sistema cheio de aba e relatório que você tentou usar e largou em dois dias.
            É o sistema que o barbeiro realmente usa — simples, no celular, pronto em 5 minutos.
          </p>
          <div class="flex flex-wrap gap-4 mb-12">
            <a
              href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
            >🔥 Testar 15 dias grátis</a>
            <a
              href="#funcionalidades"
              class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
            >Ver tudo que inclui →</a>
          </div>
          <!-- Stats em linha -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div v-for="s in heroStats" :key="s.label"
              class="rounded-xl border border-green-400/10 bg-[#181818]/80 p-5 text-center">
              <p class="font-black text-green-400 leading-none mb-1" style="font-family:'Bebas Neue',sans-serif;font-size:36px">{{ s.num }}</p>
              <p class="text-xs text-gray-500">{{ s.label }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- PARA QUEM É -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-green-400">Para quem é</span>
            <h2 class="mt-3 mb-5 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,52px)">
              FEITO PRA QUEM<br>
              <span class="text-green-400">É O DONO,</span><br>
              O BARBEIRO E O CAIXA<br>
              AO MESMO TEMPO
            </h2>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
              Os outros sistemas foram feitos pra uma recepcionista com curso de computação
              numa clínica com 10 funcionários. Você não tem tempo pra aprender sistema —
              você tem cabelo pra cortar.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400">
              A SuaAgenda foi construída do zero pensando em você: barbeiro solo, barbearia pequena,
              ou equipe crescendo. Tudo que você precisa, nada que você não usa.
            </p>
          </div>
          <div class="space-y-3">
            <div v-for="(item, i) in paraQuem" :key="i"
              class="flex items-start gap-4 p-5 rounded-xl border border-white/[.06] bg-[#181818]">
              <span class="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-green-400 bg-green-400/10 border border-green-400/30 mt-0.5">✓</span>
              <p class="text-[15px] text-gray-300 leading-relaxed">{{ item }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- FUNCIONALIDADES COMPLETAS -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]" id="funcionalidades">
        <div class="max-w-6xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">O que está incluso</span>
          <h2 class="mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,52px)">
            TUDO QUE UMA BARBEARIA<br><span class="text-green-400">PRECISA.</span> NADA A MAIS.
          </h2>
          <p class="mb-14 max-w-xl text-xl text-gray-400 leading-relaxed">
            Cada funcionalidade foi escolhida porque barbeiro de verdade precisa dela —
            não porque fica bem no catálogo do sistema.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="(f, i) in funcionalidades" :key="i"
              class="group relative overflow-hidden rounded-2xl border border-green-400/10 bg-[#181818] p-8 transition-all duration-200 hover:-translate-y-1 hover:border-green-400/40">
              <div class="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-green-400 to-emerald-300"></div>
              <p class="font-black text-green-400/20 leading-none mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:44px">{{ String(i+1).padStart(2,'0') }}</p>
              <div class="text-2xl mb-3">{{ f.emoji }}</div>
              <h3 class="text-[17px] font-bold mb-2 text-white">{{ f.title }}</h3>
              <p class="text-[14px] leading-relaxed text-gray-500">{{ f.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- COMPARAÇÃO -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-4xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">Por que a SuaAgenda</span>
          <h2 class="mt-3 mb-10 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,52px)">
            DIFERENTE DOS <span class="text-red-400">OUTROS</span><br>EM TUDO QUE IMPORTA
          </h2>
          <div class="grid grid-cols-1 gap-3">
            <div class="hidden md:grid md:grid-cols-[2fr_1fr_1fr] gap-px px-5 py-3 text-xs font-bold tracking-widest uppercase text-gray-600">
              <span>Recurso</span>
              <span class="text-green-400 text-center">✂️ SuaAgenda</span>
              <span class="text-center">Concorrência</span>
            </div>
            <div v-for="(row, i) in comparacao" :key="i"
              class="rounded-xl border border-white/[.05] bg-[#181818] overflow-hidden">
              <div class="md:hidden p-5">
                <p class="text-[15px] font-semibold text-white mb-3">{{ row.f }}</p>
                <div class="grid grid-cols-2 gap-2 text-center text-xs">
                  <div class="rounded-lg p-3 bg-green-400/10 border border-green-400/20">
                    <p class="font-bold text-green-400 mb-1">SuaAgenda</p>
                    <span v-if="row.us === true" class="text-green-400 text-base font-black">✓</span>
                    <span v-else-if="row.us === false" class="text-white/20 text-base">✗</span>
                    <span v-else class="text-green-400 font-bold text-xs">{{ row.us }}</span>
                  </div>
                  <div class="rounded-lg p-3 bg-white/[.02] border border-white/[.06]">
                    <p class="font-bold text-gray-500 mb-1">Concorrência</p>
                    <span v-if="row.them === true" class="text-green-400 text-base font-black">✓</span>
                    <span v-else-if="row.them === false" class="text-white/20 text-base">✗</span>
                    <span v-else class="text-gray-500 text-xs">{{ row.them }}</span>
                  </div>
                </div>
              </div>
              <div class="hidden md:grid md:grid-cols-[2fr_1fr_1fr] gap-px items-center">
                <div class="px-5 py-4 text-[15px] font-medium text-white">{{ row.f }}</div>
                <div class="px-5 py-4 bg-green-400/[.03] text-center">
                  <span v-if="row.us === true" class="font-black text-green-400 text-lg">✓</span>
                  <span v-else-if="row.us === false" class="text-white/20">✗</span>
                  <span v-else class="text-xs font-semibold text-green-400">{{ row.us }}</span>
                </div>
                <div class="px-5 py-4 text-center text-gray-400">
                  <span v-if="row.them === true" class="font-bold text-green-400">✓</span>
                  <span v-else-if="row.them === false" class="text-white/20">✗</span>
                  <span v-else class="text-xs">{{ row.them }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- DEPOIMENTOS -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-black leading-none mb-10 text-white text-center" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,52px)">
            QUEM USA, <span class="text-green-400">NÃO LARGA</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div v-for="(d, i) in depoimentos" :key="i"
              class="rounded-2xl border border-white/[.06] bg-[#181818] p-7 hover:border-green-400/20 transition-colors">
              <div class="flex mb-4">
                <svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="w-4 h-4 text-yellow-400">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.073 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.073-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <p class="text-[15px] italic leading-relaxed text-white mb-5">"{{ d.texto }}"</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold bg-green-400 text-black flex-shrink-0">
                  {{ d.nome.split(' ').slice(0,2).map((n: string) => n[0]).join('') }}
                </div>
                <div>
                  <p class="font-semibold text-sm text-white">{{ d.nome }}</p>
                  <p class="text-xs text-gray-500">{{ d.local }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- PREÇO -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111] text-center">
        <div class="max-w-2xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">Preço</span>
          <h2 class="mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,60px)">
            A PARTIR DE <span class="text-green-400">R$79,90</span>/MÊS
          </h2>
          <p class="mb-3 text-xl text-gray-400">Sem taxa de setup. Sem contrato. 15 dias grátis pra testar.</p>
          <p class="mb-10 text-sm text-gray-600">💬 Notificações via WhatsApp são cobradas por uso — você paga só o que usar.</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300">
              ✂️ Começar agora — grátis
            </a>
            <NuxtLink to="/barbearia#preco"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400">
              Ver todos os planos →
            </NuxtLink>
          </div>
          <p class="mt-5 text-xs text-gray-600">🔒 Sem cartão de crédito no trial · Cancela quando quiser</p>
        </div>
      </section>
  
      <!-- LINKS SEO -->
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
    { num: 'R$79', label: 'A partir de /mês' },
    { num: '7dias', label: 'Trial gratuito' },
  ]
  
  const paraQuem = [
    'Você trabalha sozinho e precisa parar de responder WhatsApp pra agendar',
    'Você tem 2 ou 3 barbeiros e a agenda vira bagunça sem sistema',
    'Você já tentou outro sistema e achou complicado demais',
    'Você quer aparecer no Google quando alguém buscar barbearia no seu bairro',
    'Você quer que o cliente confirme o horário — e não fure sem avisar',
  ]
  
  const funcionalidades = [
    { emoji: '📅', title: 'Agenda online completa', desc: 'Horários disponíveis em tempo real. O cliente escolhe, confirma e você recebe a notificação.' },
    { emoji: '🔗', title: 'Link único de agendamento', desc: 'Um link pra compartilhar no WhatsApp e no Instagram. O cliente abre no navegador, sem instalar nada.' },
    { emoji: '✅', title: 'Confirmação automática via WhatsApp', desc: 'Parceiros oficiais do Facebook. A mensagem sai pelo WhatsApp oficial — chega de verdade, não cai em spam.' },
    { emoji: '⏳', title: 'Fila de espera automática', desc: 'Horário liberou? Sistema chama o próximo interessado automaticamente. Cadeira nunca fica vazia à toa.' },
    { emoji: '📍', title: 'Site no Google do seu bairro', desc: 'Tecnologia exclusiva de SEO local. Aparece quando alguém busca "barbearia em [seu bairro]" — sem pagar anúncio.' },
    { emoji: '🌐', title: 'Portal de descoberta regional', desc: 'Sua barbearia também aparece no portal da SuaAgenda, onde clientes da região buscam barbeiros.' },
    { emoji: '📱', title: 'Funciona no celular igual um app', desc: 'Abre no navegador, salva na tela inicial. Sem instalar nada, funciona em Android e iPhone.' },
    { emoji: '👥', title: 'Múltiplos profissionais', desc: 'Cada barbeiro tem sua própria agenda. Você gerencia todos pelo celular.' },
    { emoji: '📊', title: 'Relatórios e métricas', desc: 'Veja quantos agendamentos tiveram, quais horários têm mais furo, quais serviços mais vendem.' },
  ]
  
  const comparacao = [
    { f: 'Pronto em 5 minutos',                                  us: true,          them: false },
    { f: 'Funciona no celular sem instalar',                     us: true,          them: false },
    { f: 'Serviços pré-preenchidos',                             us: true,          them: false },
    { f: 'SEO local automático no Google',                       us: true,          them: false },
    { f: 'Confirmação via WhatsApp oficial',                     us: true,          them: 'Só lembrete' },
    { f: 'Fila de espera automática',                            us: true,          them: false },
    { f: 'Portal de descoberta regional',                        us: true,          them: false },
    { f: 'Suporte por WhatsApp com pessoa real',                 us: true,          them: 'Ticket/e-mail' },
    { f: 'Preço acessível',                                      us: 'R$79,90/mês', them: 'R$120–300+' },
  ]
  
  const depoimentos = [
    { texto: 'Em um mês já tinha 4 clientes novos que vieram pelo Google. Nunca tinha acontecido isso antes.', nome: 'Felipe Costa', local: 'Barbearia do Felipe — BH' },
    { texto: 'Tentei dois outros sistemas e não durei nem uma semana. Esse eu uso todo dia.', nome: 'Marcos Alves', local: 'Old School Barber — SP' },
    { texto: 'As faltas caíram muito depois que o sistema começou a pedir confirmação. Sexta-feira sempre cheia.', nome: 'Rafael Lima', local: 'Barbearia RL — Curitiba' },
  ]
  
  const seoLinks = [
    { label: 'Agenda para barbearia', href: '/agenda-barbearia' },
    { label: 'App para barbeiro', href: '/app-para-barbeiro' },
    { label: 'Como divulgar barbearia', href: '/blog/como-divulgar-barbearia' },
    { label: 'Como conseguir mais clientes', href: '/blog/como-conseguir-clientes-barbearia' },
    { label: 'Barbearias por bairro', href: '/barbearias' },
  ]
  
  useHead({
    title: 'Sistema para Barbearia — Simples, no Celular, Pronto em 5 Min | SuaAgenda',
    meta: [
      { name: 'description', content: 'Sistema para barbearia que o barbeiro realmente usa: agenda online, confirmação via WhatsApp, aparece no Google, funciona no celular. Sem complicação, a partir de R$79,90/mês.' },
      { property: 'og:title', content: 'Sistema para Barbearia | SuaAgenda' },
      { property: 'og:description', content: 'Sistema para barbearia simples, no celular, pronto em 5 minutos. Agenda, WhatsApp e Google de uma vez.' },
      { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/barber-og_rgvr3h.jpg' },
      { property: 'og:url', content: 'https://suaagenda.link/sistema-para-barbearia' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: 'https://suaagenda.link/sistema-para-barbearia' }],
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SuaAgenda — Sistema para Barbearia',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Android, iOS, Web',
        description: 'Sistema para barbearia com agenda online, confirmação automática via WhatsApp e SEO local.',
        offers: { '@type': 'Offer', price: '79.90', priceCurrency: 'BRL' },
        url: 'https://suaagenda.link/sistema-para-barbearia',
      }),
    }],
  })
  </script>