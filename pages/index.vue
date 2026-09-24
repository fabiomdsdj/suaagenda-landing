<!-- pages/index.vue — portal da plataforma: escolha do segmento -->
<template>
  <div class="text-[15px]">

    <!-- Hero -->
    <section class="relative px-6 pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
      <div
        class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse 60% 55% at 50% 30%,rgba(52,211,153,.09) 0%,transparent 70%)"
      ></div>

      <div class="relative max-w-4xl mx-auto text-center">
        <span class="inline-flex px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm">
          Plataforma SuaAgenda
        </span>

        <h1
          class="mt-8 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,76px)"
        >
          Agenda online para o
          <span class="text-green-400">seu tipo de negócio</span>
        </h1>

        <p class="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          O SuaAgenda organiza horários, clientes e confirmações e deixa seus clientes
          agendarem online. Escolha o seu segmento para conhecer a solução certa.
        </p>

        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#segmentos"
            class="bg-green-400 hover:bg-green-300 text-black font-bold px-8 py-4 rounded-xl transition-colors"
          >
            Escolher meu segmento
          </a>
          <a
            href="https://app.suaagenda.link"
            class="border border-white/10 hover:border-white/25 text-white px-8 py-4 rounded-xl transition-colors"
          >
            Já sou cliente — Entrar
          </a>
        </div>
      </div>
    </section>

    <!-- Segmentos -->
    <section id="segmentos" class="px-6 py-20 border-t border-white/5 scroll-mt-24">
      <div class="max-w-6xl mx-auto">
        <div class="text-center">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">Segmentos</span>
          <h2
            class="mt-3 font-black leading-none text-white"
            style="font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,4vw,52px)"
          >
            Qual é o seu negócio?
          </h2>
          <p class="mt-4 text-gray-400 max-w-xl mx-auto">
            Cada segmento tem uma página com recursos, planos e cadastro próprios.
          </p>
        </div>

        <ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="s in segmentos" :key="s.key">
            <!-- Ativo: card inteiro é link para a página do segmento -->
            <NuxtLink
              v-if="s.status === 'ativo'"
              :to="segmentoPath(s)"
              class="group flex h-full flex-col rounded-2xl border border-green-400/25 bg-white/[.03] p-7 transition-all hover:border-green-400/60 hover:bg-green-400/[.05]"
            >
              <div class="flex items-center justify-between">
                <span class="text-4xl" aria-hidden="true">{{ s.emoji }}</span>
                <span class="rounded-full bg-green-400/15 px-3 py-1 text-xs font-bold text-green-400">Disponível</span>
              </div>
              <h3 class="mt-5 text-xl font-bold text-white">{{ s.label }}</h3>
              <p class="mt-2 flex-1 text-gray-400 leading-relaxed">{{ s.description }}</p>
              <span class="mt-6 font-semibold text-green-400">
                Conhecer a solução
                <span class="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </NuxtLink>

            <!-- Em breve: sem link e sem ação -->
            <div
              v-else
              class="flex h-full flex-col rounded-2xl border border-white/[.06] bg-white/[.015] p-7"
              :aria-label="`${s.label} — em breve`"
            >
              <div class="flex items-center justify-between">
                <span class="text-4xl opacity-60" aria-hidden="true">{{ s.emoji }}</span>
                <span class="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-gray-400">Em breve</span>
              </div>
              <h3 class="mt-5 text-xl font-bold text-gray-300">{{ s.label }}</h3>
              <p class="mt-2 flex-1 text-gray-500 leading-relaxed">{{ s.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Só Site: oferta sem agenda, para qualquer segmento -->
    <section class="px-6 pb-20">
      <div class="max-w-4xl mx-auto rounded-2xl border border-green-400/25 bg-white/[.03] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p class="text-xs font-bold tracking-widest uppercase text-green-400">Só Site</p>
          <h2 class="mt-2 text-2xl font-bold text-white">Só precisa de um site?</h2>
          <p class="mt-2 text-gray-400">Tenha seu próprio site e personalize você mesmo, para qualquer tipo de negócio.</p>
        </div>
        <NuxtLink
          to="/so-site"
          class="flex-shrink-0 bg-green-400 hover:bg-green-300 text-black font-bold px-7 py-3.5 rounded-xl transition-colors"
        >
          Conhecer o Só Site →
        </NuxtLink>
      </div>
    </section>

    <!-- Recursos comuns -->
    <section class="px-6 py-20 border-t border-white/5">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-center text-white">
          O que todo segmento recebe
        </h2>
        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <div v-for="r in recursos" :key="r.title" class="rounded-2xl border border-white/[.06] p-7">
            <span class="text-2xl" aria-hidden="true">{{ r.emoji }}</span>
            <h3 class="mt-4 font-bold text-lg text-white">{{ r.title }}</h3>
            <p class="mt-2 text-gray-400 leading-relaxed">{{ r.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Marketplace (consumidor final) — jornada separada dos segmentos -->
    <section class="px-6 pb-24">
      <div class="max-w-4xl mx-auto rounded-2xl border border-white/[.08] bg-[#111] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p class="text-xs font-bold tracking-widest uppercase text-gray-500">Para clientes</p>
          <h2 class="mt-2 text-2xl font-bold text-white">Está procurando uma barbearia?</h2>
          <p class="mt-2 text-gray-400">Encontre barbearias perto de você e agende seu horário.</p>
        </div>
        <NuxtLink
          to="/barbearias"
          class="flex-shrink-0 border border-white/15 hover:border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
        >
          Encontrar uma barbearia →
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { segmentos, segmentoPath } from '~/data/segmentos'

definePageMeta({ layout: 'landing' })

const recursos = [
  { emoji: '📅', title: 'Agenda online',          desc: 'Horários, profissionais e disponibilidade organizados em um só lugar.' },
  { emoji: '🔗', title: 'Link de agendamento',    desc: 'Seus clientes marcam sozinhos, a qualquer hora, pelo celular.' },
  { emoji: '💬', title: 'Confirmações no WhatsApp', desc: 'Lembretes e confirmações automáticas para reduzir faltas.' },
]

const title       = 'SuaAgenda — Agenda online e agendamento para o seu negócio'
const description = 'Plataforma de agenda e agendamento online para barbearias, salões de beleza, estética, fisioterapia e pet shops. Escolha seu segmento.'
const ogImage     = 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg'

// Título próprio do portal: sem o titleTemplate global "| SuaAgenda Barber".
useHead({
  title,
  titleTemplate: null,
  link: [{ rel: 'canonical', href: 'https://suaagenda.link/' }],
})
useSeoMeta({
  description,
  ogTitle:            title,
  ogDescription:      description,
  ogUrl:              'https://suaagenda.link/',
  ogType:             'website',
  ogImage,
  twitterCard:        'summary_large_image',
  twitterTitle:       title,
  twitterDescription: description,
  twitterImage:       ogImage,
})
</script>
