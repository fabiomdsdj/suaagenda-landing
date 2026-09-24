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
            <span class="text-gray-400">Como conseguir mais clientes</span>
          </nav>
        </div>
      </section>
  
      <!-- HEADER -->
      <section class="relative w-full pt-16 pb-12 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 50% 60% at 70% 40%,rgba(52,211,153,.07),transparent 70%)"></div>
        <div class="relative max-w-3xl mx-auto">
          <div class="flex flex-wrap gap-3 mb-6">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
              ✂️ Crescimento
            </span>
            <span class="text-sm text-gray-600">10 min de leitura</span>
          </div>
          <h1
            class="font-black leading-none mb-6 text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5.5vw,72px);letter-spacing:.02em"
          >
            COMO CONSEGUIR<br>
            MAIS CLIENTES NA<br>
            <span class="text-green-400">BARBEARIA</span>
          </h1>
          <p class="text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl">
            Estratégias práticas para atrair clientes novos, reter os que já vieram e transformar
            sua barbearia numa máquina de indicações — sem depender de sorte ou viral.
          </p>
          <div class="flex items-center gap-4 py-5 border-t border-b border-white/[.06]">
            <div class="w-10 h-10 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center text-green-400 font-bold text-sm flex-shrink-0">SA</div>
            <div>
              <p class="text-sm font-semibold text-white">Time SuaAgenda</p>
              <p class="text-xs text-gray-500">Publicado em Janeiro de 2025</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CONTEÚDO -->
      <section class="w-full py-16 px-6 md:px-16 bg-[#111]">
        <div class="max-w-3xl mx-auto space-y-10">
  
          <!-- Intro callout -->
          <div class="rounded-2xl border border-green-400/20 bg-green-400/[.04] p-7">
            <p class="text-[16px] leading-relaxed text-gray-300">
              <strong class="text-white">Clientes novos vêm de dois lugares:</strong> de quem te procura
              (Google, indicação) e de quem te encontra por acaso (Instagram, portal). A estratégia certa
              é trabalhar os dois ao mesmo tempo — e com o mínimo de esforço possível.
            </p>
          </div>
  
          <!-- 1 -->
          <div>
            <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
              1. A DIFERENÇA ENTRE CLIENTE <span class="text-green-400">NOVO</span> E CLIENTE <span class="text-red-400">PERDIDO</span>
            </h2>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
              Muitos barbeiros focam só em atrair clientes novos sem perceber que estão perdendo os que
              já têm. Um cliente que marcou e não apareceu, que não confirmou o horário, que foi uma vez
              e não voltou — esse é dinheiro que saiu silenciosamente.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400">
              Antes de buscar cliente novo, feche esse buraco: confirmação automática de horário,
              lembrete antes do compromisso e fácil agendamento para o próximo corte fazem mais
              pelo faturamento do que qualquer campanha de captação.
            </p>
          </div>
  
          <!-- 2 -->
          <div>
            <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
              2. CLIENTE NOVO VEM DO <span class="text-green-400">GOOGLE</span> — TODO DIA
            </h2>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
              Pesquisas mostram que mais de 70% das pessoas buscam serviços locais no Google antes de
              decidir onde ir. "Barbearia perto de mim", "barbearia em [bairro]", "barbeiro [cidade]" —
              essas buscas acontecem todo dia, o dia inteiro.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
              Para aparecer nessas buscas você precisa de: perfil no Google Meu Negócio completo e
              atualizado, página própria com SEO local (nome do bairro e cidade no título e conteúdo)
              e avaliações positivas.
            </p>
            <div class="rounded-xl border border-white/[.06] bg-[#181818] p-6">
              <p class="text-sm font-bold text-green-400 mb-3">✓ Checklist Google</p>
              <ul class="space-y-2 text-[15px] text-gray-400">
                <li class="flex items-start gap-2"><span class="text-green-400 mt-0.5 flex-shrink-0">→</span> Google Meu Negócio criado e verificado</li>
                <li class="flex items-start gap-2"><span class="text-green-400 mt-0.5 flex-shrink-0">→</span> Fotos do espaço e dos serviços adicionadas</li>
                <li class="flex items-start gap-2"><span class="text-green-400 mt-0.5 flex-shrink-0">→</span> Horários de funcionamento corretos</li>
                <li class="flex items-start gap-2"><span class="text-green-400 mt-0.5 flex-shrink-0">→</span> Pelo menos 10 avaliações recentes</li>
                <li class="flex items-start gap-2"><span class="text-green-400 mt-0.5 flex-shrink-0">→</span> Página do site com bairro e cidade no título</li>
              </ul>
            </div>
          </div>
  
          <!-- 3 -->
          <div>
            <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
              3. FIDELIZAÇÃO: O CLIENTE QUE VOLTA <span class="text-green-400">VALE MAIS</span>
            </h2>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
              Um cliente que corta o cabelo a cada 3 semanas vale R$ 3.000 por ano (a R$ 60 o corte).
              Fidelizar esse cliente custa muito menos do que conquistar um novo. E cliente fidelizado
              indica — multiplicando o retorno.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
              As táticas mais simples de fidelização para barbearias são: lembrar do próximo corte
              (automaticamente), facilitar o reagendamento e tratar bem no atendimento. Parece óbvio,
              mas a maioria não executa o básico de forma consistente.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400">
              Um sistema de agenda com lembrete automático faz o trabalho de fidelização por você —
              sem precisar lembrar de mandar mensagem pra cada cliente manualmente.
            </p>
          </div>
  
          <!-- 4 -->
          <div>
            <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
              4. INDICAÇÃO ESTRUTURADA: <span class="text-green-400">SISTEMA</span>, NÃO SORTE
            </h2>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
              Indicação não acontece por acaso — ela acontece quando você facilita. Depois de cada
              atendimento, mande o link de agendamento com uma mensagem: "Gostou? Manda pra um amigo,
              é só clicar aqui pra agendar."
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400">
              Se quiser ir além, crie um sistema simples de recompensa: "Indicou um amigo que veio?
              Seu próximo corte tem desconto." Não precisa de aplicativo especial — uma mensagem no
              WhatsApp já resolve.
            </p>
          </div>
  
          <!-- 5 -->
          <div>
            <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
              5. ELIMINE A <span class="text-red-400">FRICÇÃO</span> DO AGENDAMENTO
            </h2>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">
              Cada vez que um cliente precisa mandar mensagem, esperar resposta e negociar horário,
              existe o risco de ele desistir ou ir no concorrente. Quanto mais difícil agendar,
              menos clientes você tem.
            </p>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-5">
              A solução é um link de agendamento: o cliente clica, vê os horários disponíveis em
              tempo real e confirma na hora — sem você precisar responder nada.
            </p>
            <NuxtLink
              to="/recursos/link-agendamento"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-green-400/30 text-green-400 text-sm font-bold transition hover:border-green-400 hover:bg-green-400/10"
            >
              Ver como funciona o link de agendamento →
            </NuxtLink>
          </div>
  
          <!-- CTA -->
          <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-8 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
            <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:32px">
              PRONTO PRA LOTAR A <span class="text-green-400">AGENDA?</span>
            </h3>
            <p class="text-[15px] text-gray-400 leading-relaxed mb-5">
              A SuaAgenda resolve os três pilares de uma vez: aparece no Google, link de agendamento
              sem fricção e confirmação automática via WhatsApp. Tudo em 5 minutos, sem técnico.
            </p>
            <a
              href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300"
            >
              🔥 Testar 15 dias grátis
            </a>
          </div>
  
          <!-- Links relacionados -->
          <div class="pt-10 border-t border-white/[.06]">
            <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-5">Leia também</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NuxtLink
                to="/blog/como-divulgar-barbearia"
                class="group flex flex-col gap-2 p-5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 transition-all"
              >
                <span class="text-xs font-bold tracking-widest uppercase text-green-400">Artigo</span>
                <span class="text-[15px] font-semibold text-white group-hover:text-green-400 transition-colors">Como divulgar sua barbearia →</span>
              </NuxtLink>
              <NuxtLink
                to="/recursos/controle-clientes"
                class="group flex flex-col gap-2 p-5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 transition-all"
              >
                <span class="text-xs font-bold tracking-widest uppercase text-green-400">Recurso</span>
                <span class="text-[15px] font-semibold text-white group-hover:text-green-400 transition-colors">Controle de clientes para barbearias →</span>
              </NuxtLink>
            </div>
          </div>
  
        </div>
      </section>
  
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({ layout: 'barber' })
  
  useHead({
    title: 'Como Conseguir Mais Clientes na Barbearia | SuaAgenda',
    meta: [
      {
        name: 'description',
        content: 'Estratégias práticas para atrair e fidelizar clientes na barbearia: Google, WhatsApp, indicação e agendamento online. Lotar a agenda sem gastar com anúncio.',
      },
      { property: 'og:title', content: 'Como Conseguir Mais Clientes na Barbearia | SuaAgenda' },
      { property: 'og:type', content: 'article' },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: 'https://suaagenda.link/blog/como-conseguir-clientes-barbearia' }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Como Conseguir Mais Clientes na Barbearia',
          description: 'Estratégias práticas para atrair e fidelizar clientes na barbearia.',
          url: 'https://suaagenda.link/blog/como-conseguir-clientes-barbearia',
          publisher: { '@type': 'Organization', name: 'SuaAgenda', url: 'https://suaagenda.link' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://suaagenda.link' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://suaagenda.link/blog' },
              { '@type': 'ListItem', position: 3, name: 'Como Conseguir Mais Clientes na Barbearia', item: 'https://suaagenda.link/blog/como-conseguir-clientes-barbearia' },
            ],
          },
        }),
      },
    ],
  })
  </script>