<template>
    <div class="text-[15px]">
  
      <!-- BREADCRUMB -->
      <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
        <div class="max-w-3xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span>/</span>
            <NuxtLink to="/blog" class="hover:text-green-400 transition-colors">Blog</NuxtLink>
            <span>/</span>
            <span class="text-gray-400">Como divulgar sua barbearia</span>
          </nav>
        </div>
      </section>
  
      <!-- HEADER DO ARTIGO -->
      <section class="relative w-full pt-16 pb-12 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 50% 60% at 70% 40%,rgba(52,211,153,.07),transparent 70%)"></div>
        <div class="relative max-w-3xl mx-auto">
          <div class="flex flex-wrap gap-3 mb-6">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
              ✂️ Marketing
            </span>
            <span class="text-sm text-gray-600">8 min de leitura</span>
          </div>
          <h1
            class="font-black leading-none mb-6 text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5.5vw,72px);letter-spacing:.02em"
          >
            COMO DIVULGAR<br>
            SUA <span class="text-green-400">BARBEARIA</span>
          </h1>
          <p class="text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl">
            Guia prático com as estratégias que barbeiros profissionais usam para lotar a agenda —
            sem depender de algoritmo e sem gastar fortunas em anúncio.
          </p>
          <div class="flex items-center gap-4 py-5 border-t border-b border-white/[.06]">
            <div class="w-10 h-10 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center text-green-400 font-bold text-sm flex-shrink-0">SA</div>
            <div>
              <p class="text-sm font-semibold text-white">Time SuaAgenda</p>
              <p class="text-xs text-gray-500">Publicado em {{ publishDate }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CONTEÚDO -->
      <section class="w-full py-16 px-6 md:px-16 bg-[#111]">
        <div class="max-w-3xl mx-auto">
  
          <div class="prose-local space-y-10">
  
            <!-- Intro -->
            <div class="rounded-2xl border border-green-400/20 bg-green-400/[.04] p-7">
              <p class="text-[16px] leading-relaxed text-gray-300">
                <strong class="text-white">O maior problema não é falta de talento.</strong> É falta de visibilidade.
                Todo dia clientes novos buscam "barbearia perto de mim" no Google — e vão no concorrente porque você não aparece.
                Esse guia mostra como mudar isso, começando pelo que tem mais resultado com menos esforço.
              </p>
            </div>
  
            <!-- 1 -->
            <div>
              <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
                1. APAREÇA NO GOOGLE — <span class="text-green-400">GRÁTIS</span>
              </h2>
              <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
                Quando alguém digita "barbearia em [seu bairro]", o Google mostra os primeiros resultados.
                Se você não tem site ou página otimizada, você simplesmente não existe pra esse cliente.
              </p>
              <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
                A forma mais rápida de aparecer é ter uma página própria com seu bairro no título, nos textos
                e na URL — o que o Google chama de SEO local. Você não precisa entender de tecnologia pra isso:
                plataformas como a SuaAgenda fazem isso automaticamente quando você cria sua conta.
              </p>
              <div class="rounded-xl border border-white/[.06] bg-[#181818] p-6 mt-5">
                <p class="text-sm font-bold text-green-400 mb-3">✓ O que fazer agora</p>
                <ul class="space-y-2 text-[15px] text-gray-400">
                  <li class="flex items-start gap-2"><span class="text-green-400 mt-0.5 flex-shrink-0">→</span> Crie um perfil no Google Meu Negócio com endereço, fotos e horários atualizados</li>
                  <li class="flex items-start gap-2"><span class="text-green-400 mt-0.5 flex-shrink-0">→</span> Tenha uma página com o nome do seu bairro e cidade no título</li>
                  <li class="flex items-start gap-2"><span class="text-green-400 mt-0.5 flex-shrink-0">→</span> Use um sistema que otimize seu SEO local automaticamente</li>
                </ul>
              </div>
            </div>
  
            <!-- 2 -->
            <div>
              <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
                2. LINK DE AGENDAMENTO NO <span class="text-green-400">WHATSAPP</span>
              </h2>
              <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
                O WhatsApp é onde seus clientes estão. Mas responder "tem horário pra sexta?" o dia todo
                te tira do trabalho e cansa. A solução é ter um link único de agendamento que você manda
                no zap e coloca na bio do Instagram.
              </p>
              <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
                O cliente clica, vê os horários disponíveis e marca sozinho — sem precisar te chamar.
                Você recebe a notificação no celular e continua cortando cabelo. Esse link também funciona
                como divulgação passiva: uma vez criado, trabalha por você 24h por dia.
              </p>
              <NuxtLink
                to="/recursos/link-agendamento"
                class="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-green-400/30 text-green-400 text-sm font-bold transition hover:border-green-400 hover:bg-green-400/10"
              >
                Saiba mais sobre link de agendamento →
              </NuxtLink>
            </div>
  
            <!-- 3 -->
            <div>
              <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
                3. INSTAGRAM: CONSISTÊNCIA <span class="text-green-400">BATE</span> VIRALIZAÇÃO
              </h2>
              <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
                Você não precisa viralizar. Precisa aparecer toda semana pra quem já te segue.
                3 posts por semana com fotos do serviço (antes e depois funcionam muito) já é suficiente
                pra manter o nome na cabeça dos clientes.
              </p>
              <p class="text-[16px] leading-relaxed text-gray-400">
                O erro mais comum: depender só do Instagram. Quando o algoritmo muda, o movimento cai junto.
                Use o Instagram pra aquecer quem já te conhece, e o Google pra capturar quem ainda não te conhece.
              </p>
            </div>
  
            <!-- 4 -->
            <div>
              <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
                4. INDICAÇÃO: O CANAL MAIS <span class="text-green-400">BARATO</span>
              </h2>
              <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
                Cliente satisfeito indica. Mas você precisa facilitar isso. Mande o link de agendamento
                depois do atendimento com uma mensagem simples: "Se gostou, manda pra um amigo — aqui
                o link pra agendar direto."
              </p>
              <p class="text-[16px] leading-relaxed text-gray-400">
                Um sistema de confirmação automática também ajuda: quando o cliente confirma o horário
                pelo WhatsApp, você pode incluir uma mensagem incentivando a indicação. Custa zero e
                traz resultado consistente.
              </p>
            </div>
  
            <!-- 5 -->
            <div>
              <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
                5. REVIEWS NO GOOGLE: <span class="text-green-400">PROVA SOCIAL</span> QUE CONVERTE
              </h2>
              <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
                Barbearia com 50 avaliações positivas no Google fecha mais do que barbearia com zero —
                mesmo que a segunda seja melhor. Peça avaliação após o atendimento. Uma mensagem simples
                no WhatsApp com o link da avaliação já resolve.
              </p>
              <p class="text-[16px] leading-relaxed text-gray-400">
                Responda todas as avaliações, positivas e negativas. O Google valoriza isso e os clientes
                em potencial observam como você trata o feedback.
              </p>
            </div>
  
            <!-- CTA inline -->
            <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-8 relative overflow-hidden">
              <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
              <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:32px">
                QUER APARECER NO GOOGLE <span class="text-green-400">EM 5 MIN?</span>
              </h3>
              <p class="text-[15px] text-gray-400 leading-relaxed mb-5">
                A SuaAgenda cria sua página profissional, otimizada para SEO local, com link de agendamento
                e confirmação automática pelo WhatsApp — sem precisar de técnico.
              </p>
              <a
                href="https://wa.me/5511941649284"
                class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300"
              >
                🔥 Testar 7 dias grátis
              </a>
              <p class="text-xs text-gray-600 mt-3">Sem cartão de crédito · Cancela quando quiser</p>
            </div>
  
            <!-- 6 -->
            <div>
              <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
                6. NUNCA DEPENDA DE <span class="text-red-400">UM SÓ CANAL</span>
              </h2>
              <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
                A estratégia que funciona a longo prazo combina pelo menos três canais: Google (para
                capturar novos clientes), WhatsApp/link de agendamento (para converter e fidelizar)
                e Instagram (para manter presença e aquecer a base).
              </p>
              <p class="text-[16px] leading-relaxed text-gray-400">
                Barbeiros que dependem só do Instagram ficam reféns do algoritmo. Os que têm presença
                no Google recebem cliente novo todo dia — sem pagar anúncio, sem postar todo dia.
              </p>
            </div>
  
          </div>
  
          <!-- Links relacionados -->
          <div class="mt-14 pt-10 border-t border-white/[.06]">
            <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-5">Leia também</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NuxtLink
                to="/blog/como-conseguir-clientes-barbearia"
                class="group flex flex-col gap-2 p-5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 transition-all"
              >
                <span class="text-xs font-bold tracking-widest uppercase text-green-400">Próximo artigo</span>
                <span class="text-[15px] font-semibold text-white group-hover:text-green-400 transition-colors">Como conseguir mais clientes na barbearia →</span>
              </NuxtLink>
              <NuxtLink
                to="/recursos/agenda-online"
                class="group flex flex-col gap-2 p-5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 transition-all"
              >
                <span class="text-xs font-bold tracking-widest uppercase text-green-400">Recurso</span>
                <span class="text-[15px] font-semibold text-white group-hover:text-green-400 transition-colors">Agenda online para barbearias →</span>
              </NuxtLink>
            </div>
          </div>
  
        </div>
      </section>
  
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({ layout: 'barber' })
  
  const publishDate = 'Janeiro de 2025'
  
  useHead({
    title: 'Como Divulgar sua Barbearia — Guia Prático | SuaAgenda',
    meta: [
      {
        name: 'description',
        content: 'Guia prático com as melhores estratégias para divulgar sua barbearia: Google, WhatsApp, Instagram e indicação. Sem gastar fortunas em anúncio.',
      },
      { property: 'og:title', content: 'Como Divulgar sua Barbearia — Guia Prático | SuaAgenda' },
      { property: 'og:description', content: 'Guia prático com as melhores estratégias para divulgar sua barbearia e lotar a agenda.' },
      { property: 'og:type', content: 'article' },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: 'https://suaagenda.link/blog/como-divulgar-barbearia' }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Como Divulgar sua Barbearia — Guia Prático',
          description: 'Guia prático com as melhores estratégias para divulgar sua barbearia e lotar a agenda.',
          url: 'https://suaagenda.link/blog/como-divulgar-barbearia',
          publisher: { '@type': 'Organization', name: 'SuaAgenda', url: 'https://suaagenda.link' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://suaagenda.link' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://suaagenda.link/blog' },
              { '@type': 'ListItem', position: 3, name: 'Como Divulgar sua Barbearia', item: 'https://suaagenda.link/blog/como-divulgar-barbearia' },
            ],
          },
        }),
      },
    ],
  })
  </script>