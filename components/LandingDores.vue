<template>
    <section class="w-full py-24 px-6 md:px-16 bg-[#111111]">
      <div class="max-w-6xl mx-auto">
  
        <span class="fade-on-scroll text-xs font-bold tracking-[.12em] uppercase text-green-400">O problema real</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white text-4xl md:text-6xl" style="font-family:'Bebas Neue',sans-serif">
          OS 3 MAIORES <span class="text-red-400">VILÕES</span> DO SEU DIA
        </h2>
        <p class="fade-on-scroll mb-12 max-w-xl text-lg leading-relaxed text-gray-400">
          Não é falta de talento. É falta de sistema. Isso tá sabotando sua barbearia toda semana:
        </p>
  
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-red-400/10 gap-px bg-red-400/10">
          <div
            v-for="(p, i) in pains"
            :key="i"
            class="fade-on-scroll p-8 transition-colors duration-200 hover:brightness-110"
            :class="p.highlight ? 'bg-red-400/[.06]' : 'bg-[#181818]'"
          >
            <!-- ícone SVG inline Heroicons -->
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              :class="p.highlight ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="p.icon" />
              </svg>
            </div>
            <h3 class="text-base font-bold mb-2" :class="p.highlight ? 'text-red-400' : 'text-white'">{{ p.title }}</h3>
            <p class="text-sm leading-relaxed text-gray-500">{{ p.desc }}</p>
          </div>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  const pains = [
    {
      icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z',
      title: 'Cliente some no WhatsApp',
      desc: 'Você fica esperando confirmação, o horário passa, perdeu aquela grana. Acontece toda semana. Sem sistema, vai continuar.',
      highlight: true,
    },
    {
      icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5',
      title: 'Agenda desorganizada',
      desc: 'Papel rabiscado, mensagem no zap, memória. Hora que aparecem dois clientes no mesmo horário, a situação fica tensa.',
      highlight: false,
    },
    {
      icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6',
      title: 'Invisível no Google',
      desc: 'Todo dia alguém busca "barbearia no [seu bairro]" — e vai no concorrente porque você não aparece. Cliente novo perdido, todo dia.',
      highlight: false,
    },
    {
      icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
      title: 'Tempo perdido respondendo',
      desc: 'Passa horas respondendo "tem horário pra sexta?". Esse tempo todo poderia ser cortando cabelo e faturando mais.',
      highlight: false,
    },
    {
      icon: 'M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181',
      title: 'Refém do algoritmo',
      desc: 'Quando o Instagram derruba o alcance, seu movimento cai junto. Você não tem controle nenhum sobre isso.',
      highlight: false,
    },
    {
      icon: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z',
      title: 'Sistemas complicados demais',
      desc: 'Trinks, Avec e outros. Cheio de relatório, aba, configuração. Você não precisa de ERP — precisa de agenda cheia.',
      highlight: false,
    },
  ]
  </script>