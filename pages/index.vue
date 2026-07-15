<template>
  <div class="min-h-screen bg-[#0b0b0b] text-white">
    <!-- Header -->
    

    <!-- Hero -->
    <section class="py-24">
      <div class="max-w-5xl mx-auto px-6 text-center">

        <span
          class="inline-flex px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm"
        >
          Plataforma oficial SuaAgenda
        </span>

        <h2
          class="mt-8 text-5xl font-black leading-tight"
        >
          Gestão completa para
          <span class="text-green-400">
            barbearias
          </span>
        </h2>

        <p
          class="mt-8 text-xl text-gray-400 max-w-3xl mx-auto"
        >
          O SuaAgenda ajuda barbeiros e barbearias a gerenciar
          agendamentos, clientes, serviços, campanhas do Google Ads
          e automações com Inteligência Artificial.
        </p>

        <div class="mt-12 flex justify-center gap-4">
          <NuxtLink
            to="/login"
            class="bg-green-400 text-black font-bold px-8 py-4 rounded-xl"
          >
            Entrar
          </NuxtLink>

          <NuxtLink
            to="/barbearia/gestao-de-trafego"
            class="border border-white/10 px-8 py-4 rounded-xl"
          >
            Conhecer a Plataforma
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- Recursos -->
    <section class="py-16 border-t border-white/10">
      <div class="max-w-6xl mx-auto px-6">

        <h3 class="text-3xl font-bold text-center">
          Recursos
        </h3>

        <div class="grid md:grid-cols-3 gap-6 mt-12">

          <div class="rounded-2xl border border-white/10 p-8">
            <h4 class="font-bold text-xl">
              Agenda Online
            </h4>

            <p class="text-gray-400 mt-4">
              Gerencie horários, confirmações,
              lista de espera e disponibilidade.
            </p>
          </div>

          <div class="rounded-2xl border border-white/10 p-8">
            <h4 class="font-bold text-xl">
              Inteligência Artificial
            </h4>

            <p class="text-gray-400 mt-4">
              Auxilia na criação e otimização
              de campanhas do Google Ads.
            </p>
          </div>

          <div class="rounded-2xl border border-white/10 p-8">
            <h4 class="font-bold text-xl">
              WhatsApp
            </h4>

            <p class="text-gray-400 mt-4">
              Confirmações automáticas,
              lembretes e comunicação
              com clientes.
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- Google Ads -->
    <section class="py-20 border-t border-white/10">
      <div class="max-w-4xl mx-auto px-6">

        <h3 class="text-3xl font-bold">
          Integração com Google Ads
        </h3>

        <p class="mt-6 text-gray-400 leading-8">
          O SuaAgenda utiliza a Google Ads API para permitir que
          usuários autorizados criem, consultem e gerenciem campanhas
          publicitárias em suas próprias contas do Google Ads.
        </p>

        <p class="mt-6 text-gray-400 leading-8">
          O acesso é concedido exclusivamente após autenticação via
          OAuth 2.0 e consentimento explícito do usuário.
        </p>

        <p class="mt-6 text-gray-400 leading-8">
          Nenhum dado é compartilhado ou vendido a terceiros.
          As informações são utilizadas somente para fornecer
          as funcionalidades contratadas pelo usuário.
        </p>

      </div>
    </section>

    
  </div>
</template>

<script setup>
definePageMeta({ layout: 'landing' })
useSeoMeta({
  title: 'SuaAgenda | Plataforma para Barbearias',
  description:
    'Sistema de gestão para barbearias com agenda online, clientes, Google Ads e Inteligência Artificial.',
  ogTitle: 'SuaAgenda',
  ogDescription:
    'Plataforma de gestão para barbearias.',
})
</script>