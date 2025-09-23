<template>
    <div :class="['relative inline-block', wrapperClass]">
      <!-- Halo animado -->
      <span class="absolute inset-0 rounded-2xl bg-amber-400 opacity-30 animate-halo pointer-events-none"></span>
  
      <!-- Botão principal -->
      <a
        :href="href"
        class="relative inline-block bg-amber-400 text-pink-900 px-6 py-3 rounded-2xl shadow transition-transform hover:scale-105"
      >
        {{ text }}
      </a>
    </div>
  </template>
  
  <script setup>
  defineProps({
    text: { type: String, default: "Agende seu atendimento" },
    href: { type: String, default: "/agendar" },
    wrapperClass: { type: String, default: "" } // Classe extra pro pai
  })
  </script>
  
  <style scoped>
  @keyframes halo {
    0%, 100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.25);
      opacity: 0.1;
    }
  }
  
  .animate-halo {
    animation: halo 1.5s ease-in-out infinite;
    transform-origin: center;
  }
  </style>
  