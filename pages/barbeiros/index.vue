<!-- pages/barbeiros/index.vue -->
<template>
    <div class="text-[15px]">
  
      <!-- BREADCRUMB -->
      <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
        <div class="max-w-6xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span>/</span>
            <span class="text-gray-400">Barbeiros</span>
          </nav>
        </div>
      </section>
  
      <!-- HERO -->
      <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 40%,rgba(52,211,153,.07) 0%,transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto">
          <h1
            class="font-black leading-none mb-6 text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em"
          >
            BARBEIROS COM<br>
            <span class="text-green-400">AGENDA ONLINE</span><br>
            <span class="text-white/40" style="font-size:clamp(24px,3vw,40px)">EM TODO O BRASIL</span>
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
            Encontre barbeiros que usam a SuaAgenda para organizar horários, receber agendamentos
            pelo WhatsApp e aparecer nas primeiras posições do Google no bairro deles.
          </p>
          <div class="flex flex-wrap gap-4">
            <a
              href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300 hover:-translate-y-0.5"
            >
              ✂️ Sou barbeiro — quero entrar
            </a>
            <NuxtLink
              to="/barbearias"
              class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
            >
              Ver por bairro →
            </NuxtLink>
          </div>
        </div>
      </section>
  
      <!-- CIDADES POR REGIÃO -->
      <section class="w-full py-16 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto">
          <h2
            class="font-black leading-none mb-3 text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3.5vw,44px)"
          >
            ESCOLHA SUA <span class="text-green-400">CIDADE</span>
          </h2>
          <p class="text-[16px] text-gray-400 mb-12">
            Selecione a cidade para ver os barbeiros da região com agenda online.
          </p>
  
          <div class="space-y-12">
            <div v-for="region in groupedByRegion" :key="region.name">
              <div class="flex items-center gap-3 mb-5">
                <span class="text-xs font-bold tracking-widest uppercase text-green-400">{{ region.name }}</span>
                <div class="flex-1 h-px bg-white/[.05]"></div>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <NuxtLink
                  v-for="city in region.cities"
                  :key="city.citySlug"
                  :to="`/barbeiros/${city.ufSlug}/${city.citySlug}`"
                  class="group flex flex-col gap-1 px-4 py-3 rounded-xl bg-[#181818] border border-white/[.06] hover:border-green-400/30 hover:bg-[#1e1e1e] transition-all"
                >
                  <span class="text-[13px] font-semibold text-gray-300 group-hover:text-green-400 transition-colors leading-snug">
                    {{ city.city }}
                  </span>
                  <span class="text-[11px] text-gray-600 uppercase tracking-wider">{{ city.uf }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- STATS -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
        <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-2xl border border-green-400/10 bg-[#181818] p-6 text-center"
          >
            <p
              class="font-black text-green-400 leading-none mb-2"
              style="font-family:'Bebas Neue',sans-serif;font-size:44px"
            >{{ stat.num }}</p>
            <p class="text-sm text-gray-500 leading-snug">{{ stat.label }}</p>
          </div>
        </div>
      </section>
  
      <!-- POR QUE USAR -->
      <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-green-400">Por que barbeiros escolhem a SuaAgenda</span>
            <h2
              class="mt-3 mb-5 font-black leading-none text-white"
              style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4vw,48px)"
            >
              FEITO PRA QUEM<br><span class="text-green-400">TRABALHA NO CELULAR</span>
            </h2>
            <p class="text-[16px] text-gray-400 leading-relaxed mb-4">
              Barbeiros não ficam sentados na frente de um computador. Trabalham de pé, tesoura na mão, cliente na cadeira.
            </p>
            <p class="text-[16px] text-gray-400 leading-relaxed mb-6">
              A SuaAgenda foi construída pra funcionar no celular — agendamentos chegam no WhatsApp, a agenda é gerenciada com um dedo, e o site aparece no Google automaticamente.
            </p>
            <a
              href="https://wa.me/5511941649284"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold transition hover:bg-green-300"
            >
              ✂️ Começar grátis
            </a>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="benefit in benefits"
              :key="benefit.title"
              class="flex items-start gap-4 rounded-xl border border-white/[.06] bg-[#181818] p-5"
            >
              <span class="text-2xl">{{ benefit.emoji }}</span>
              <div>
                <p class="font-semibold text-white text-[15px] mb-1">{{ benefit.title }}</p>
                <p class="text-[13px] text-gray-500 leading-relaxed">{{ benefit.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA FINAL -->
      <section class="relative w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"></div>
        <div class="relative max-w-xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Barbeiros em todo o Brasil</span>
          <h2
            class="font-black leading-none text-white mb-4"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)"
          >
            SUA BARBEARIA<br>NO <span class="text-green-400">GOOGLE</span> EM 5 MIN
          </h2>
          <p class="mb-8 text-[17px] leading-relaxed text-gray-400">
            Cria sua conta, confirma os serviços e já tem site profissional aparecendo no Google quando alguém busca barbearia no seu bairro.
          </p>
          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300 hover:scale-105"
          >
            ✂️ Testar grátis por 15 dias
          </a>
          <div class="flex items-center justify-center flex-wrap gap-5 mt-6 text-sm text-gray-600">
            <span>🔒 Sem cartão</span>
            <span>⚡ 5 minutos</span>
            <span>✓ Cancela quando quiser</span>
          </div>
        </div>
      </section>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { allCities } from '~/data/locations'
  
  definePageMeta({ layout: 'barber' })
  
  // Agrupa cidades por region, ordenando alfabeticamente dentro de cada grupo
  const groupedByRegion = computed(() => {
    const map = new Map<string, typeof allCities>()
  
    for (const city of allCities) {
      const key = city.region ?? city.zone ?? city.uf
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(city)
    }
  
    return Array.from(map.entries())
      .map(([name, cities]) => ({
        name,
        cities: [...cities].sort((a, b) => a.city.localeCompare(b.city, 'pt-BR')),
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  })
  
  const stats = [
    { num: '500+', label: 'Barbearias ativas na plataforma' },
    { num: '5min', label: 'Pra estar no ar' },
    { num: '100%', label: 'Funciona no celular' },
    { num: '7dias', label: 'Trial gratuito sem cartão' },
  ]
  
  const benefits = [
    {
      emoji: '📍',
      title: 'Aparece no Google do seu bairro',
      desc: 'SEO local automático — quando alguém busca "barbearia em [bairro]", sua página aparece nas primeiras posições.',
    },
    {
      emoji: '📱',
      title: 'Agendamento direto no WhatsApp',
      desc: 'Cliente escolhe horário e confirma pelo celular. Notificação chega pra você na hora, sem largar a tesoura.',
    },
    {
      emoji: '✅',
      title: 'Confirmação automática anti-furo',
      desc: 'Sistema avisa o cliente antes do horário. Não confirmou? O horário volta pra agenda automaticamente.',
    },
  ]
  
  useHead({
    title: 'Barbeiros com Agenda Online',
    meta: [
      {
        name: 'description',
        content: 'Encontre barbeiros com agenda online em todo o Brasil. Profissionais que usam a SuaAgenda para organizar horários e receber agendamentos pelo WhatsApp.',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [
      { rel: 'canonical', href: 'https://suaagenda.link/barbeiros' },
    ],
  })
  </script>