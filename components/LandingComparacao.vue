<template>
    <section class="w-full py-24 px-6 md:px-16 bg-[#111111]">
      <div class="max-w-6xl mx-auto">
  
        <span class="fade-on-scroll text-xs font-bold tracking-[.12em] uppercase text-green-400">Por que SuaAgenda</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white text-4xl md:text-6xl" style="font-family:'Bebas Neue',sans-serif">
          DIFERENTE DE <span class="text-green-400">TUDO</span> QUE VOCÊ JÁ VIU
        </h2>
        <p class="fade-on-scroll mb-14 max-w-xl text-lg leading-relaxed text-gray-400">
          Enquanto outros sistemas te afogam em relatórios, a gente foca no que importa: encher sua agenda.
        </p>
  
        <div class="fade-on-scroll rounded-2xl overflow-hidden border border-green-400/10">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th class="text-left px-5 py-4 font-bold text-gray-500 bg-[#181818] border-b border-green-400/10">Recurso</th>
                <th class="text-left px-5 py-4 font-bold text-green-400 bg-[#181818] border-b border-green-400/10">✂️ SuaAgenda</th>
                <th class="text-left px-5 py-4 font-bold text-gray-500 bg-[#181818] border-b border-green-400/10">Trinks / Avec</th>
                <th class="text-left px-5 py-4 font-bold text-gray-500 bg-[#181818] border-b border-green-400/10 hidden sm:table-cell">Papel / WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in rows" :key="i" class="border-b border-white/[.04] last:border-0">
                <td class="px-5 py-3.5 font-medium text-white">{{ row.feature }}</td>
                <td class="px-5 py-3.5 bg-green-400/[.03]">
                  <span v-if="row.us === true"  class="font-bold text-green-400">✓</span>
                  <span v-else-if="row.us === false" class="text-white/20">✗</span>
                  <span v-else class="text-xs text-green-400">{{ row.us }}</span>
                </td>
                <td class="px-5 py-3.5 text-gray-400">
                  <span v-if="row.them === true"  class="font-bold text-green-400">✓</span>
                  <span v-else-if="row.them === false" class="text-white/20">✗</span>
                  <span v-else class="text-xs">{{ row.them }}</span>
                </td>
                <td class="px-5 py-3.5 text-gray-400 hidden sm:table-cell">
                  <span v-if="row.manual === true"  class="font-bold text-green-400">✓</span>
                  <span v-else-if="row.manual === false" class="text-white/20">✗</span>
                  <span v-else class="text-xs">{{ row.manual }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  const rows = [
    { feature: 'Aparece no Google',                us: true,           them: false,         manual: false },
    { feature: 'Pronto em 5 minutos',              us: true,           them: false,         manual: true  },
    { feature: 'Link de agendamento no WhatsApp',  us: true,           them: false,         manual: false },
    { feature: 'Lembrete automático para cliente', us: true,           them: true,          manual: false },
    { feature: 'Simples, sem treinamento',         us: true,           them: false,         manual: true  },
    { feature: 'Página profissional da barbearia', us: true,           them: 'Parcial',     manual: false },
    { feature: 'Foco em trazer clientes novos',    us: true,           them: false,         manual: false },
    { feature: 'Preço acessível',                  us: 'R$79,90/mês', them: 'R$120–300+',  manual: 'Perde cliente todo dia' },
  ]
  </script>