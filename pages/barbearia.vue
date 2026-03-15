<template>
  <!-- layout barber cuida do header e footer -->
  <div class="text-[15px]">

    <!-- ══════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════ -->
    <section class="relative min-h-screen flex flex-col-reverse md:flex-row items-center gap-12 px-6 md:px-16 pt-28 pb-16 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 65% 60% at 60% 50%,rgba(52,211,153,.10) 0%,transparent 70%)"></div>

      <div class="z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">

        <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium text-green-400 bg-green-400/10 border border-green-400/30">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Pronto em 5 minutos — sem precisar de técnico
        </div>

        <h1
          v-motion="{ initial:{opacity:0,y:40}, enter:{opacity:1,y:0,transition:{duration:1000}} }"
          class="font-black leading-none mb-6 text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(56px,8vw,96px);letter-spacing:.03em"
        >
          AGENDA <span class="text-green-400">CHEIA.</span><br>
          VIDA MAIS <span class="text-red-400">FÁCIL.</span>
        </h1>

        <p
          v-motion="{ initial:{opacity:0,y:20}, enter:{opacity:1,y:0,transition:{duration:900,delay:500}} }"
          class="text-md md:text-xl text-gray-400 max-w-lg leading-relaxed mb-10"
        >
          Sua barbearia no Google, link de agendamento no WhatsApp e lembrete
          automático — tudo funcionando em menos de 5 minutos, sem complicação.
        </p>

        <div
          v-motion="{ initial:{opacity:0,scale:.9}, enter:{opacity:1,scale:1,transition:{duration:700,delay:900}} }"
          class="flex flex-wrap gap-4 justify-center md:justify-start mb-10"
        >
          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
          >🔥 Testar 7 dias grátis</a>
          <a
            href="#como-funciona"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
          >Ver como funciona →</a>
        </div>

        <div class="flex gap-8 pt-6 border-t border-green-400/10">
          <div v-for="s in heroStats" :key="s.label">
            <p class="font-black text-green-400 text-3xl leading-none" style="font-family:'Bebas Neue',sans-serif">{{ s.num }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ s.label }}</p>
          </div>
        </div>
        
      </div>

      <div class="w-full md:w-1/2 flex justify-center md:justify-end items-end">
        <NuxtImg
          provider="cloudinary"
          src="v1758666030/barber-hero-stroked_zuhxar.png"
          alt="Barbeiro atendendo cliente"
          class="block max-w-full h-auto object-contain max-h-[560px] -rotate-3"
        />
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         5 MINUTOS
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <div class="fade-on-scroll relative overflow-hidden rounded-2xl border border-green-400/20 bg-[#181818] p-10 text-center">
          <div class="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(52,211,153,.1),transparent 70%)"></div>
          <p class="font-black text-green-400 leading-none" style="font-family:'Bebas Neue',sans-serif;font-size:120px">5</p>
          <p class="text-sm tracking-widest text-gray-400 mb-8 uppercase">Minutos pra estar no ar</p>
          <ul class="list-none p-0 m-0 text-left">
            <li v-for="(s,i) in cincoSteps" :key="i" class="flex items-center gap-3 py-3 text-base text-gray-400 border-b border-white/5 last:border-0">
              <span class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/30">{{ i+1 }}</span>
              {{ s }}
            </li>
          </ul>
        </div>

        <div class="fade-on-scroll">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400">Por que é tão rápido</span>
          <h2 class="mt-3 mb-5 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4vw,56px)">
            SEM CONFIGURAÇÃO.<br>SEM <span class="text-green-400">COMPLICAÇÃO.</span>
          </h2>
          <p class="text-[17px] leading-relaxed text-gray-400 mb-4">A maioria dos sistemas te faz cadastrar tudo do zero. <strong class="text-white">Aqui não.</strong></p>
          <p class="text-[17px] leading-relaxed text-gray-400 mb-4">A SuaAgenda já vem com os serviços mais comuns de barbearia pré-cadastrados — corte, barba, combo, sobrancelha. Você só confirma o que usa e ajusta o preço se quiser.</p>
          <p class="text-[17px] leading-relaxed text-gray-400">Em 5 minutos você tem uma página profissional no ar e um link pra mandar no WhatsApp agora mesmo.</p>
          <div class="flex flex-wrap gap-2 mt-6">
            <span v-for="t in cincoTags" :key="t" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-green-400 bg-green-400/[.08] border border-green-400/20">✓ {{ t }}</span>
          </div>
        </div>

      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         IDENTIFICAÇÃO
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400">Isso parece com você?</span>
        <h2 class="fade-on-scroll mt-3 mb-14 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          VOCÊ SE <span class="text-red-400">RECONHECE</span> AQUI?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ul class="list-none p-0 m-0">
            <li v-for="(item,i) in idItems" :key="i" class="fade-on-scroll flex items-start gap-4 py-5 border-b border-white/[.06] last:border-0 text-[17px] text-gray-400 leading-relaxed">
              <span class="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-[11px] text-green-400 bg-green-400/10 border border-green-400">✓</span>
              {{ item }}
            </li>
          </ul>
          <div class="fade-on-scroll rounded-xl p-9 bg-[#181818] border border-green-400/[.18]" style="border-left:4px solid #34d399">
            <p class="text-5xl text-green-400/20 mb-2 font-black leading-none">"</p>
            <blockquote class="text-2xl italic leading-relaxed text-white mb-5">Perdia pelo menos 3 horários por semana com cliente sumindo. Agora o sistema confirma automático e minha semana tá sempre cheia.</blockquote>
            <strong class="block text-base text-green-400">Rodrigo Lima</strong>
            <span class="text-sm text-gray-500">Barbearia RLima — São Paulo</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         DORES
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400">O problema real</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          OS 3 MAIORES <span class="text-red-400">VILÕES</span> DO SEU DIA
        </h2>
        <p class="fade-on-scroll mb-12 max-w-xl text-xl leading-relaxed text-gray-400">Não é falta de talento. É falta de sistema. Isso tá sabotando sua barbearia toda semana:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-red-400/10 gap-px bg-red-400/10">
          <div v-for="(p,i) in dores" :key="i"
            class="fade-on-scroll p-8 transition-colors duration-200 hover:brightness-110"
            :class="p.hl ? 'bg-red-400/[.06]' : 'bg-[#181818]'"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4" :class="p.hl ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="p.icon"/>
              </svg>
            </div>
            <h3 class="text-[17px] font-bold mb-2" :class="p.hl ? 'text-red-400' : 'text-white'">{{ p.title }}</h3>
            <p class="text-[15px] leading-relaxed text-gray-500">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         SOLUÇÃO
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a]" id="como-funciona">
      <div class="max-w-6xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400">A solução</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          SIMPLES. <span class="text-green-400">PODEROSO.</span> FEITO PRA BARBEIRO.
        </h2>
        <p class="fade-on-scroll mb-14 max-w-xl text-xl leading-relaxed text-gray-400">Três problemas resolvidos de uma vez, sem complicação, sem treinamento e em menos de 5 minutos.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="(s,i) in solucoes" :key="i"
            class="fade-on-scroll group relative overflow-hidden rounded-2xl border border-green-400/10 bg-[#181818] p-8 transition-all duration-200 hover:-translate-y-1 hover:border-green-400/40"
          >
            <div class="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-green-400 to-emerald-300"></div>
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-green-400 bg-green-400/10 border border-green-400/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="s.icon"/>
              </svg>
            </div>
            <p class="font-black leading-none mb-3 text-green-400/20" style="font-family:'Bebas Neue',sans-serif;font-size:44px">{{ String(i+1).padStart(2,'0') }}</p>
            <h3 class="text-[18px] font-bold mb-2 text-white">{{ s.title }}</h3>
            <p class="text-[15px] leading-relaxed text-gray-500">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
     COMPARAÇÃO
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400">Por que SuaAgenda</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          DIFERENTE DE <span class="text-green-400">TUDO</span> QUE VOCÊ JÁ VIU
        </h2>

        <!-- copy novo — destaca o ponto da recepcionista -->
        <div class="fade-on-scroll mb-14 max-w-2xl">
          <p class="text-xl leading-relaxed text-gray-400 mb-3">
            Os outros sistemas foram feitos pra uma <span class="text-white font-semibold">recepcionista com curso de computação</span> numa clínica com 10 funcionários.
          </p>
          <p class="text-xl leading-relaxed text-gray-400">
            Você é o dono, o barbeiro e às vezes o caixa — tudo ao mesmo tempo. A gente fez isso pra <span class="text-green-400 font-semibold">você, no celular, enquanto corta o cabelo.</span>
          </p>
        </div>

        <!-- Cards mobile-first — sem tabela -->
        <div class="fade-on-scroll grid grid-cols-1 gap-3">

          <!-- header dos "competidores" — só aparece md+ como legenda visual -->
          <div class="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-px mb-1 px-5 text-xs font-bold tracking-widest uppercase text-gray-600">
            <span>Recurso</span>
            <span class="text-green-400">✂️ SuaAgenda</span>
            <span>Concorrência</span>
            <span>Papel / WhatsApp</span>
          </div>

          <div
            v-for="(row, i) in comparacao"
            :key="i"
            class="rounded-xl border border-white/[.05] bg-[#181818] overflow-hidden"
          >
            <!-- Mobile: layout empilhado -->
            <div class="md:hidden p-5">
              <p class="text-[15px] font-semibold text-white mb-4">{{ row.f }}</p>
              <div class="grid grid-cols-3 gap-2 text-center text-xs">

                <div class="rounded-lg p-3 bg-green-400/10 border border-green-400/20">
                  <p class="font-bold text-green-400 mb-1">SuaAgenda</p>
                  <span v-if="row.us===true"  class="text-green-400 text-base font-black">✓</span>
                  <span v-else-if="row.us===false" class="text-white/20 text-base">✗</span>
                  <span v-else class="text-green-400 font-bold leading-tight block">{{ row.us }}</span>
                </div>

                <div class="rounded-lg p-3 bg-white/[.02] border border-white/[.06]">
                  <p class="font-bold text-gray-500 mb-1">Concorrência</p>
                  <span v-if="row.them===true"  class="text-green-400 text-base font-black">✓</span>
                  <span v-else-if="row.them===false" class="text-white/20 text-base">✗</span>
                  <span v-else class="text-gray-500 leading-tight block">{{ row.them }}</span>
                </div>

                <div class="rounded-lg p-3 bg-white/[.02] border border-white/[.06]">
                  <p class="font-bold text-gray-500 mb-1">Papel / Zap</p>
                  <span v-if="row.manual===true"  class="text-green-400 text-base font-black">✓</span>
                  <span v-else-if="row.manual===false" class="text-white/20 text-base">✗</span>
                  <span v-else class="text-gray-500 leading-tight block">{{ row.manual }}</span>
                </div>

              </div>
            </div>

            <!-- Desktop: linha única, grid de 4 colunas -->
            <div class="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-px items-center">
              <div class="px-5 py-4 text-[15px] font-medium text-white">{{ row.f }}</div>

              <div class="px-5 py-4 bg-green-400/[.03] text-center">
                <span v-if="row.us===true"  class="font-black text-green-400 text-lg">✓</span>
                <span v-else-if="row.us===false" class="text-white/20">✗</span>
                <span v-else class="text-xs font-semibold text-green-400">{{ row.us }}</span>
              </div>

              <div class="px-5 py-4 text-center text-gray-400">
                <span v-if="row.them===true"  class="font-bold text-green-400">✓</span>
                <span v-else-if="row.them===false" class="text-white/20">✗</span>
                <span v-else class="text-xs">{{ row.them }}</span>
              </div>

              <div class="px-5 py-4 text-center text-gray-400">
                <span v-if="row.manual===true"  class="font-bold text-green-400">✓</span>
                <span v-else-if="row.manual===false" class="text-white/20">✗</span>
                <span v-else class="text-xs">{{ row.manual }}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
     SEÇÃO: FEITO PRO CELULAR
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-4xl mx-auto">

        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400">A verdade sobre os outros sistemas</span>

        <h2
          class="fade-on-scroll mt-3 mb-8 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)"
        >
          FEITOS PRO <span class="text-red-400">DESKTOP.</span><br>
          VOCÊ TRABALHA <span class="text-green-400">NO CELULAR.</span>
        </h2>

        <div class="fade-on-scroll grid grid-cols-1 md:grid-cols-2 gap-5">

          <!-- Concorrência -->
          <div class="rounded-2xl border border-red-400/20 bg-[#181818] p-8">
            <p class="text-xs font-bold tracking-widest uppercase text-red-400 mb-5">Outros sistemas</p>
            <ul class="list-none p-0 m-0 space-y-4">
              <li v-for="d in outrosSistemas" :key="d" class="flex items-start gap-3 text-[15px] text-gray-400 leading-relaxed">
                <span class="mt-0.5 flex-shrink-0 text-red-400 font-bold">✗</span>
                {{ d }}
              </li>
            </ul>
          </div>

          <!-- SuaAgenda -->
          <div class="rounded-2xl border border-green-400/30 bg-[#181818] p-8 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
            <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-5">SuaAgenda</p>
            <ul class="list-none p-0 m-0 space-y-4">
              <li v-for="s in nossasSolucoes" :key="s" class="flex items-start gap-3 text-[15px] text-white leading-relaxed">
                <span class="mt-0.5 flex-shrink-0 text-green-400 font-bold">✓</span>
                {{ s }}
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         COMO FUNCIONA
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center" id="como-funciona-passos">
      <div class="max-w-5xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400">Do zero ao ar</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          PRONTO EM <span class="text-green-400">5 MINUTOS</span>
        </h2>
        <p class="fade-on-scroll mb-16 mx-auto max-w-md text-xl leading-relaxed text-gray-400">Os serviços já vêm pré-preenchidos. Você só confirma o que usa e já está no ar.</p>
        <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div class="hidden lg:block absolute top-11 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent"></div>
          <div v-for="(step,i) in passos" :key="i" class="fade-on-scroll flex flex-col items-center group">
            <div class="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mb-5 text-green-400 bg-[#181818] border-2 border-green-400/25 transition-all duration-200 group-hover:scale-105 group-hover:border-green-400 group-hover:bg-green-400/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" :d="step.icon"/>
              </svg>
            </div>
            <span class="text-xs font-bold tracking-widest text-green-400 mb-3">PASSO {{ i+1 }}</span>
            <h3 class="text-[17px] font-bold mb-2 text-white">{{ step.title }}</h3>
            <p class="text-[15px] leading-relaxed text-gray-500">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         DEPOIMENTOS
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#111] text-center" id="depoimentos">
      <div class="max-w-6xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400">O que dizem os barbeiros</span>
        <h2 class="fade-on-scroll mt-3 mb-10 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          QUEM JÁ USA, <span class="text-green-400">NÃO LARGA</span>
        </h2>

        <div class="fade-on-scroll flex flex-col items-center gap-2 mb-12">
          <span class="font-black text-yellow-400 leading-none" style="font-family:'Bebas Neue',sans-serif;font-size:56px">{{ mediaRating }}/5</span>
          <div class="flex gap-1">
            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="w-7 h-7" :class="i<=Math.round(mediaRating)?'text-yellow-400':'text-gray-700'">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.073 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.073-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>

        <client-only>
          <Swiper
            :modules="[Navigation, Pagination]"
            :slides-per-view="1"
            :space-between="20"
            :breakpoints="{ 768:{slidesPerView:2}, 1024:{slidesPerView:3} }"
            navigation
            :pagination="{ clickable:true }"
            loop
            class="w-full max-w-5xl mx-auto pb-12"
          >
            <SwiperSlide v-for="(d,i) in depoimentos" :key="i">
              <div class="rounded-2xl p-6 h-full flex flex-col justify-between text-left bg-[#181818] border border-white/[.06] hover:border-green-400/20 transition-colors duration-200">
                <div class="flex items-center mb-4">
                  <svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5" :class="n<=d.rating?'text-yellow-400':'text-gray-700'">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.073 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.073-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <p class="text-[16px] font-semibold italic leading-relaxed text-white flex-1 mb-5">"{{ d.texto }}"</p>
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-green-400 text-black">
                    {{ d.nome.split(' ').slice(0,2).map(n=>n[0]).join('') }}
                  </div>
                  <div>
                    <p class="font-semibold text-[15px] text-white">{{ d.nome }}</p>
                    <p class="text-[13px] text-gray-500">{{ d.profissao }}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </client-only>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         PREÇO
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center" id="preco">
      <div class="max-w-6xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400">Preço</span>
        <h2 class="fade-on-scroll mt-3 mb-4 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          UM PLANO. <span class="text-green-400">SEM SURPRESA.</span>
        </h2>
        <p class="fade-on-scroll mb-14 mx-auto max-w-md text-xl leading-relaxed text-gray-400">Tudo incluso. Sem taxa de setup. Sem letra miúda. Cancela quando quiser.</p>

        <div class="fade-on-scroll relative max-w-md mx-auto rounded-3xl border-2 border-green-400 bg-[#181818] p-12 overflow-hidden">
          <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(52,211,153,.1),transparent 70%)"></div>
          <span class="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-7 bg-green-400 text-black">Plano Solo — Mais Popular</span>
          <div class="flex items-start justify-center gap-1 mb-2">
            <span class="text-2xl font-bold mt-2 text-green-400">R$</span>
            <span class="font-black text-white leading-none" style="font-family:'Bebas Neue',sans-serif;font-size:88px">79</span>
            <span class="text-xl font-bold mt-4 text-gray-500">,90</span>
          </div>
          <p class="text-sm text-gray-500 mb-8">por mês · cancela quando quiser</p>
          <ul class="list-none p-0 m-0 text-left mb-9">
            <li v-for="f in precoFeatures" :key="f" class="flex items-center gap-3 py-2.5 text-[16px] text-white border-b border-white/5 last:border-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5 flex-shrink-0 text-green-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              {{ f }}
            </li>
          </ul>
          <div class="relative inline-block w-full">
            <span class="absolute inset-0 rounded-2xl bg-green-400 opacity-20 animate-pulse pointer-events-none"></span>
            <a
              href="https://wa.me/5511941649284"
              class="relative inline-flex items-center justify-center w-full gap-2 text-lg font-bold px-6 py-4 rounded-2xl bg-green-400 text-black shadow transition hover:bg-green-300 hover:scale-105"
            >✂️ Testar 7 dias grátis agora</a>
          </div>
          <p class="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-500">🔒 Sem cartão de crédito. Sem compromisso.</p>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         FAQ
    ═══════════════════════════════════════════════════════════ -->
    <section class="w-full py-24 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400 block text-center">Dúvidas</span>
        <h2 class="fade-on-scroll mt-3 mb-14 font-black leading-none text-white text-center" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          PERGUNTAS <span class="text-green-400">FREQUENTES</span>
        </h2>
        <div class="max-w-2xl mx-auto">
          <div v-for="(item,i) in faqs" :key="i" class="fade-on-scroll border-b border-white/[.07] first:border-t first:border-white/[.07]">
            <button
              class="w-full flex items-center justify-between gap-5 py-6 text-left bg-transparent border-0 cursor-pointer font-semibold text-[17px] transition-colors duration-200"
              :class="faqOpen===i ? 'text-green-400' : 'text-white'"
              @click="faqOpen = faqOpen===i ? null : i"
            >
              <span>{{ item.q }}</span>
              <span
                class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border border-green-400/30 text-green-400 transition-all duration-300"
                :class="faqOpen===i ? 'rotate-45 bg-green-400/10' : ''"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
              </span>
            </button>
            <Transition name="faq">
              <p v-if="faqOpen===i" class="pb-6 pr-12 text-[16px] leading-relaxed text-gray-400">{{ item.a }}</p>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         CTA FINAL
    ═══════════════════════════════════════════════════════════ -->
    <section class="relative w-full py-32 px-6 md:px-16 bg-[#0a0a0a] text-center overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 350px at 50% 50%,rgba(52,211,153,.07),transparent)"></div>
      <div class="relative max-w-2xl mx-auto">
        <span class="fade-on-scroll text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Começa agora</span>
        <h2 class="fade-on-scroll font-black leading-none text-white mb-6" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,7vw,88px)">
          CHEGA DE <span class="text-red-400">PERDER</span><br>CLIENTE.
        </h2>
        <p class="fade-on-scroll mb-10 text-xl leading-relaxed text-gray-400">Em 5 minutos sua barbearia tem página, link de agendamento e presença no Google.</p>
        <div class="fade-on-scroll flex justify-center mb-6">
          <div class="relative inline-block">
            <span class="absolute inset-0 rounded-2xl bg-green-400 opacity-20 animate-pulse pointer-events-none"></span>
            <a
              href="https://wa.me/5511941649284"
              class="relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300 hover:scale-105"
            >✂️ Testar grátis por 7 dias</a>
          </div>
        </div>
        <div class="fade-on-scroll flex items-center justify-center flex-wrap gap-6 text-sm text-gray-500">
          <span>🔒 Sem cartão de crédito</span>
          <span>⚡ Pronto em 5 minutos</span>
          <span>✓ Cancela quando quiser</span>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import { useBarberJsonLd } from '~/composables/useBarberJsonLd'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

definePageMeta({ layout: 'barber' })

useHead({
  title: 'SuaAgenda para Barbearias — Agenda cheia em 5 minutos',
  meta: [
    { name: 'description', content: 'Sua barbearia no Google, confirmação automática via WhatsApp e link de agendamento em 5 minutos. Parceiros oficiais Meta.' },
    { property: 'og:title',       content: 'SuaAgenda para Barbearias — Agenda cheia em 5 minutos' },
    { property: 'og:description', content: 'Sua barbearia no Google, confirmação automática via WhatsApp e link de agendamento em 5 minutos.' },
    { property: 'og:image',       content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/barber-og_rgvr3h.jpg' },
    { name: 'twitter:card',       content: 'summary_large_image' },
  ],
  link: [
    { rel: 'canonical', href: 'https://suaagenda.link/barbearia' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap' },
  ],
  
})
useBarberJsonLd()

const faqOpen = ref(null)

onMounted(() => {
  if (!process.client) return
  document.querySelectorAll('.fade-on-scroll').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
        }
      })
    }, { threshold: 0.1 })
    observer.observe(el)
  })
})

// ─── dados ────────────────────────────────────────────────────────────────────

const heroStats = [
  { num: '500+', label: 'Barbearias ativas' },
  { num: 'R$79', label: 'por mês' },
  { num: '5min', label: 'pra estar no ar' },
]

// Badge de parceiro — usar linguagem que o barbeiro entende: Facebook/Instagram/WhatsApp
// Evitar "Meta" sem contexto — o público não associa
const metaBadge = {
  label: 'Parceiro oficial Facebook(META)',
  sublabel: 'WhatsApp Business API oficial',
}

const cincoSteps = [
  'Cria sua conta com nome e endereço da barbearia',
  'Serviços já vêm pré-preenchidos — corte, barba, combo, sobrancelha',
  'Confirma seus horários de atendimento',
  'Recebe seu link e já manda no WhatsApp',
]

const cincoTags = ['Serviços pré-preenchidos', 'Sem treinamento', 'Sem técnico', 'Funciona no celular']

const idItems = [
  'Cliente marca horário no WhatsApp e some — você fica esperando, a cadeira fica vazia',
  'Agenda no papel, no WhatsApp ou na cabeça — e ainda rola confusão de horário às vezes',
  'Bom no que faz, mas quem busca "barbearia perto de mim" no Google vai parar na do concorrente',
  'Depende só do Instagram — quando o algoritmo muda, o movimento cai junto',
  'Já tentou sistema de gestão, era complicado demais, largou em dois dias',
]

const dores = [
  {
    icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z',
    title: 'Barbeiro não vende produto — vende tempo de cadeira',
    // doc: "Tempo perdido não volta." — o vilão é a cadeira vazia, não só o furo
    desc: 'Cadeira vazia é dinheiro que foi embora e não volta. Cada horário que fura sem aviso é prejuízo direto no seu bolso. Toda semana.',
    hl: true,
  },
  {
    icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5',
    title: 'Agenda desorganizada',
    desc: 'Papel rabiscado, mensagem no zap, memória. Hora que aparecem dois clientes no mesmo horário, a situação fica tensa.',
    hl: false,
  },
  {
    icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6',
    title: 'Invisível no Google',
    desc: 'Todo dia alguém busca "barbearia no [seu bairro]" — e vai no concorrente porque você não aparece. Cliente novo perdido, todo dia.',
    hl: false,
  },
  {
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    title: 'Tempo perdido respondendo',
    desc: 'Passa horas respondendo "tem horário pra sexta?". Esse tempo todo poderia ser cortando cabelo e faturando mais.',
    hl: false,
  },
  {
    icon: 'M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181',
    title: 'Refém do algoritmo',
    desc: 'Quando o Instagram derruba o alcance, seu movimento cai junto. Você não tem controle nenhum sobre isso.',
    hl: false,
  },
  {
    icon: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z',
    title: 'Sistemas complicados demais',
    desc: 'Os Concorrentes são cheios de relatório, aba, configuração. Você não precisa de ERP — precisa de cadeira cheia.',
    hl: false,
  },
]

const solucoes = [
  {
    icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
    title: 'Apareça no Google e no portal',
    // doc: portal de descoberta regional — dois caminhos de cliente
    desc: 'Sua barbearia ganha um site próprio indexado no Google. E ainda aparece no portal da SuaAgenda — onde clientes da região buscam barbeiros perto deles.',
  },
  {
    icon: 'M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244',
    title: 'Link de agendamento no WhatsApp',
    desc: 'Você recebe um link único. Manda no zap, coloca na bio do Instagram. O cliente escolhe o horário sozinho — sem você largar a tesoura.',
  },
  {
    icon: 'M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0',
    title: 'Confirmação real via WhatsApp',
    // doc: é SIM/NÃO — horário só é garantido após o SIM. Parceiros do Facebook/Instagram/WhatsApp garante entrega
    desc: 'Somos parceiros oficiais do Facebook, Instagram e WhatsApp. Quando o cliente pede horário, recebe um WhatsApp real pedindo confirmação. Respondeu SIM → garantido. Não respondeu → horário libera sozinho.',
  },
  {
    icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3',
    title: 'Página profissional da barbearia',
    desc: 'Serviços, profissionais e horários disponíveis numa única página. O cliente vê tudo e agenda na hora — sem mandar mensagem, sem esperar resposta.',
  },
  {
    icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5',
    title: 'Agenda sem confusão',
    desc: 'Tudo num só lugar, claro e organizado. Cadastra serviços, barbeiros e horários. Agenda manual e bloqueios quando precisar.',
  },
  {
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z',
    title: 'No ar em 5 minutos',
    desc: 'Serviços já pré-cadastrados. Você ajusta o que quer, confirma os horários e já tem o link pra divulgar. Simples assim.',
  },
]

const outrosSistemas = [
  'Tela cheia de aba, relatório e configuração que você nunca vai usar',
  'Precisa de treinamento pra fazer o básico',
  'Feito pra recepcionista com computador na mesa',
  'Você abre no celular e a tela não cabe na mão',
  'Suporte por ticket — responde em 3 dias úteis',
]

const nossasSolucoes = [
  'Abre, funciona, tá feito — tudo no celular',
  'Sem treinamento, sem manual, sem técnico',
  'Feito pra quem é o dono, o barbeiro e o caixa ao mesmo tempo',
  'Layout pensado pra dedo, não pra mouse',
  'Parceiros oficiais do Facebook, Instagram e WhatsApp — mensagem que realmente chega',
]

const comparacao = [
  { f: 'Site próprio + portal de descoberta regional',       us: true,           them: false,          manual: false },
  { f: 'Aparece no Google',                                  us: true,           them: false,          manual: false },
  { f: 'Pronto em 5 minutos',                               us: true,           them: false,          manual: true  },
  { f: 'Link de agendamento no WhatsApp',                   us: true,           them: false,          manual: false },
  { f: 'Confirmação via WhatsApp oficial (Facebook Meta)',   us: true,           them: 'Só lembrete',  manual: false },
  { f: 'Fila de espera automática',                         us: true,           them: false,          manual: false },
  { f: 'Horário não confirmado libera automaticamente',     us: true,           them: false,          manual: false },
  { f: 'Simples, sem treinamento',                          us: true,           them: false,          manual: true  },
  { f: 'Preço acessível',                                   us: 'R$79,90/mês', them: 'R$120–300+',   manual: 'Perde cadeira todo dia' },
]

const passos = [
  {
    icon: 'M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z',
    title: 'Cria sua conta',
    desc: 'Nome da barbearia, endereço e número. Dois minutos no máximo.',
  },
  {
    icon: 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z',
    title: 'Confirma os serviços',
    desc: 'Corte, barba, combo já estão lá. Você só ajusta o preço e tira o que não usa.',
  },
  {
    icon: 'M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z',
    title: 'Recebe seu link',
    desc: 'Sua página fica no ar na hora. Manda o link no WhatsApp, coloca na bio do Instagram ou imprime um QR no balcão.',
  },
  {
    icon: 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z',
    title: 'Sistema cuida do resto',
    // doc: fluxo real — pedido → WhatsApp automático → SIM confirma, silêncio libera
    desc: 'Cliente pede horário → recebe WhatsApp pedindo confirmação → respondeu SIM, tá garantido. Não respondeu → horário volta pra agenda automaticamente.',
  },
]

const depoimentos = [
  { texto: 'Em um mês já tinha 4 clientes novos que vieram pelo Google. Nunca tinha acontecido isso antes.',         nome: 'Felipe Costa',      profissao: 'Barbearia do Felipe — BH',   rating: 5 },
  { texto: 'Ficava respondendo WhatsApp o dia todo. Agora mando o link e o cliente agenda sozinho.',                 nome: 'Wellington Santos',  profissao: 'Studio W Barber — RJ',       rating: 5 },
  { texto: 'Tentei dois outros sistemas e não durei nem uma semana. Esse eu uso todo dia.',                          nome: 'Marcos Alves',       profissao: 'Old School Barber — SP',     rating: 5 },
  { texto: 'As faltas caíram muito depois que o sistema começou a pedir confirmação. Sexta-feira sempre cheia.',     nome: 'Rafael Lima',        profissao: 'Barbearia RL — Curitiba',    rating: 5 },
  { texto: 'R$79 por mês e minha barbearia nunca ficou tão cheia. Se paga fácil.',                                  nome: 'Diego Moura',        profissao: 'Moura Barbers — Fortaleza',  rating: 5 },
  { texto: 'Minha barbearia apareceu no Google em 3 semanas. Tenho clientes novos toda semana.',                    nome: 'Júnior Neves',       profissao: 'JN Barber Shop — Recife',    rating: 5 },
]

const mediaRating = computed(() => {
  const total = depoimentos.reduce((acc, d) => acc + d.rating, 0)
  return (total / depoimentos.length).toFixed(1)
})

const precoFeatures = [
  'Página profissional da sua barbearia',
  'Link de agendamento online',
  'Aparece no Google e no portal de barbearias da região',
  // parceiro do Facebook/Instagram/WhatsApp garante entrega real das mensagens
  'Confirmação automática via WhatsApp (parceiro Facebook oficial)',
  'Créditos de agendamento inclusos no plano',
  'Fila de espera automática quando horário libera',
  'Serviços pré-cadastrados — no ar em 5 min',
  'Suporte pelo WhatsApp',
  '7 dias grátis pra testar',
]

const faqs = [
  {
    q: 'Quanto tempo leva pra configurar?',
    a: 'Só 5 minutos de verdade. Os serviços mais comuns já vêm pré-preenchidos — corte, barba, combo, sobrancelha. Você confirma o que usa, ajusta o preço se quiser e o link já está pronto pra divulgar.',
  },
  {
    q: 'Preciso entender de tecnologia pra usar?',
    a: 'Não. Se você usa WhatsApp e Instagram, você usa a SuaAgenda. Foi feita pra ser mais simples do que qualquer coisa que você já tentou antes.',
  },
  {
    q: 'Como funciona a confirmação automática? É só um lembrete?',
    // doc: confirmação SIM/NÃO via WhatsApp — horário só é garantido após o SIM
    a: 'Não é só lembrete. Quando o cliente escolhe um horário, ele fica pendente. O sistema manda um WhatsApp oficial pedindo que ele confirme com SIM. Confirmou → horário garantido. Não confirmou até o prazo → o horário volta pra agenda automaticamente, sem você precisar fazer nada.',
  },
  {
    q: 'O que são os créditos de agendamento do WhatsApp?',
    a: 'O WhatsApp Business API — que usamos por ser parceiros oficiais do Facebook, Instagram e WhatsApp — tem um custo por mensagem enviada. Por isso, cada horário confirmado pelo sistema consome um crédito de agendamento. Os créditos já vêm inclusos no plano, então pra maioria das barbearias não pesa nada. Se você tiver um volume muito alto, a gente explica na conversa.',
  },
  {
    q: 'Por que vocês são parceiros do Facebook, Instagram e WhatsApp? Isso muda alguma coisa?',
    // diferencial real: mensagem via API oficial chega de verdade, não cai em spam nem é cortada
    a: 'Muda bastante. Quem usa WhatsApp informal pode ter o número banido ou as mensagens bloqueadas. Por sermos parceiros oficiais do Facebook, Instagram e WhatsApp (a empresa que controla os três), as mensagens do sistema são enviadas pela API oficial — chegam de verdade, não caem em spam e o número da barbearia fica protegido.',
  },
  {
    q: 'O que é a fila de espera?',
    a: 'Quando um horário libera porque o barbeiro não teve confirmação, o sistema pode chamar automaticamente o próximo interessado. Ele recebe um WhatsApp, e se não responder, o sistema chama o próximo da lista. Você não perde a cadeira à toa.',
  },
  {
    q: 'Em quanto tempo apareço no Google?',
    a: 'O Google costuma indexar a página da barbearia em 2 a 3 semanas. Quanto mais você divulgar seu link, mais rápido ele te reconhece. A maioria das barbearias aparece nas buscas em menos de um mês.',
  },
  {
    q: 'Os clientes precisam baixar algum aplicativo?',
    a: 'Não. O cliente clica no link, abre no navegador do celular e já agenda. Sem baixar nada.',
  },
  {
    q: 'E se eu quiser cancelar? Tem multa?',
    a: 'Nenhuma multa. Você cancela quando quiser, sem burocracia. É mês a mês.',
  },
  {
    q: 'Tem suporte? Falo com uma pessoa de verdade?',
    a: 'Tem suporte pelo WhatsApp em horário comercial. Você fala com uma pessoa real, sem bot.',
  },
]
</script>

<style scoped>
.faq-enter-active, .faq-leave-active { transition: opacity .25s, transform .25s; }
.faq-enter-from, .faq-leave-to       { opacity: 0; transform: translateY(-6px); }
</style>