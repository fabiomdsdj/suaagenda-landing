<template>
    <div class="max-w-6xl mx-auto py-28 px-6">
      <h1 class="text-4xl font-bold text-center mb-12">
        Nossos Planos
      </h1>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Plano Básico -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Básico</h2>
          <p class="text-gray-600 mb-6">Ideal para quem está começando.</p>
          <ul class="space-y-3 flex-1">
            <li class="flex items-center gap-2 text-gray-700">
              ✅ Agenda online simples
            </li>
            <li class="flex items-center gap-2 text-gray-700">
              ✅ Site básico
            </li>
            <li class="flex items-center gap-2 text-gray-700">
              ✅ Suporte por WhatsApp
            </li>
          </ul>
          <div class="mt-6">
            <p class="text-3xl font-bold text-gray-800 mb-4">R$49/mês</p>
            <button
              class="w-full bg-[#05df72] text-white font-semibold py-3 rounded-lg shadow hover:bg-[#04c864] transition"
            >
              Assinar
            </button>
          </div>
        </div>
  
        <!-- Plano Pro -->
        <div class="bg-[#05df72] text-white rounded-2xl shadow-xl p-8 flex flex-col relative">
          <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff6467] text-white text-sm font-bold px-3 py-1 rounded-full shadow">
            Mais Popular
          </span>
          <h2 class="text-2xl font-bold mb-4">Profissional</h2>
          <p class="text-white/90 mb-6">Para quem quer crescer no digital.</p>
          <ul class="space-y-3 flex-1">
            <li class="flex items-center gap-2">
              ✅ Agenda online completa
            </li>
            <li class="flex items-center gap-2">
              ✅ Site otimizado para Google
            </li>
            <li class="flex items-center gap-2">
              ✅ Lembretes automáticos
            </li>
            <li class="flex items-center gap-2">
              ✅ Suporte prioritário
            </li>
          </ul>
          <div class="mt-6">
            <p class="text-3xl font-bold mb-4">R$99/mês</p>
            <button
              class="w-full bg-white text-[#05df72] font-semibold py-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Assinar
            </button>
          </div>
        </div>
  
        <!-- Plano Premium -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Premium</h2>
          <p class="text-gray-600 mb-6">Para quem quer ser referência.</p>
          <ul class="space-y-3 flex-1">
            <li class="flex items-center gap-2 text-gray-700">
              ✅ Tudo do Profissional
            </li>
            <li class="flex items-center gap-2 text-gray-700">
              ✅ Consultoria de marketing
            </li>
            <li class="flex items-center gap-2 text-gray-700">
              ✅ Landing pages extras
            </li>
            <li class="flex items-center gap-2 text-gray-700">
              ✅ Relatórios avançados
            </li>
          </ul>
          <div class="mt-6">
            <p class="text-3xl font-bold text-gray-800 mb-4">R$199/mês</p>
            <button
              class="w-full bg-[#ff6467] text-white font-semibold py-3 rounded-lg shadow hover:bg-[#e55559] transition"
            >
              Assinar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  