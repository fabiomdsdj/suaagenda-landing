<!-- pages/barbearias/[uf]/[cidade]/[bairro]/[slug].vue -->
<template>
  <div v-if="barbershop" class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${ufSlug}`" class="hover:text-green-400 transition-colors">{{ ufLabel }}</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}`" class="hover:text-green-400 transition-colors">{{ cityLabel }}</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`" class="hover:text-green-400 transition-colors">{{ neighborhoodLabel }}</NuxtLink>
          <span class="text-gray-700">/</span>
          <span class="text-gray-400">{{ barbershop.name }}</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 50%,rgba(52,211,153,.07) 0%,transparent 70%)"/>
      <div class="relative max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

        <div class="flex-1">
          <div class="flex flex-wrap gap-3 mb-6">
            <span v-if="barbershop.featured" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-yellow-400 bg-yellow-400/10 border border-yellow-400/20">⭐ DESTAQUE</span>
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
              📍 {{ neighborhoodLabel }}, {{ cityLabel }}
            </span>
            <span v-if="googleRating" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
              ⭐ {{ googleRating.toFixed(1) }} ({{ barbershop.googleReviewCount }} avaliações)
            </span>
            <span
              v-if="opening.status !== 'closed' || opening.sublabel"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border"
              :class="{
                'text-green-400 bg-green-400/10 border-green-400/20': opening.status === 'open',
                'text-amber-400 bg-amber-400/10 border-amber-400/20': opening.status === 'closing_soon',
                'text-red-400   bg-red-400/10   border-red-400/20':   opening.status === 'closed',
                'text-gray-500  bg-white/[.04]  border-white/[.06]':  opening.status === 'closed' && !opening.sublabel,
              }"
            >
              <span
                class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                :class="{
                  'bg-green-400 animate-pulse': opening.status === 'open',
                  'bg-amber-400 animate-pulse': opening.status === 'closing_soon',
                  'bg-red-400':                 opening.status === 'closed',
                  'bg-gray-500':                opening.status === 'closed' && !opening.sublabel,
                }"
              />
              {{ opening.label }}
              <span v-if="opening.sublabel" class="font-normal opacity-70">· {{ opening.sublabel }}</span>
            </span>
          </div>

          <h1 class="font-black leading-none mb-3 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em">
            {{ barbershop.name.toUpperCase() }}
          </h1>
          <p class="text-xl font-semibold text-green-400/80 mb-6 tracking-wide">
            Barbearia em {{ neighborhoodLabel }}, {{ cityLabel }}
          </p>

          <p v-if="barbershop.description" class="text-lg text-gray-400 max-w-2xl leading-relaxed mb-4">
            {{ barbershop.description }}
          </p>

          <p v-if="fullAddress" class="text-gray-500 mb-8 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
            </svg>
            {{ fullAddress }}
          </p>

          <div class="flex flex-wrap gap-4">
            <a
              v-if="whatsappNumber"
              :href="whatsappHref"
              target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5"
              @click="onWhatsappClick"
            >💬 Agendar pelo WhatsApp</a>
            <NuxtLink
              :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`"
              class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5"
            >← Ver outras em {{ neighborhoodLabel }}</NuxtLink>
          </div>
        </div>

        <div v-if="coverSrc" class="lg:w-80 flex-shrink-0">
          <img
            :src="coverSrc"
            :alt="`${barbershop.name} — barbearia em ${neighborhoodLabel}`"
            class="w-full h-56 lg:h-72 object-cover rounded-2xl border border-white/[.06]"
          />
        </div>
      </div>
    </section>

    <!-- BANNER COMUNIDADE + REIVINDICAÇÃO -->
    <section v-if="!barbershop.isClaimed" class="w-full px-6 md:px-16 bg-[#0a0a0a] pb-2">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-amber-400/20 bg-amber-400/[.04] px-6 py-4">
          <div class="flex items-start gap-3">
            <span class="text-xl mt-0.5">🌐</span>
            <div>
              <p class="text-sm font-semibold text-white leading-snug">Esta página foi criada pela comunidade SuaAgenda</p>
              <p class="text-xs text-gray-500 mt-0.5 leading-relaxed">As informações podem estar desatualizadas. Dados coletados de fontes públicas.</p>
            </div>
          </div>
          <div class="flex-shrink-0 flex flex-col sm:items-end gap-1">
            <a
              :href="`https://wa.me/5511941649284?text=${encodeURIComponent(`Olá! Sou proprietário da ${barbershop.name} e quero reivindicar ou editar minha página no Portal SuaAgenda. 😊`)}`"
              target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-400/10 border border-green-400/30 text-green-400 text-sm font-bold hover:bg-green-400 hover:text-black transition-all whitespace-nowrap"
            >✏️ Sou o dono — quero editar</a>
            <p class="text-[11px] text-gray-600 text-center sm:text-right">Reivindicar · Atualizar · Destacar</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MAPA -->
    <section v-if="barbershop.latitude && barbershop.longitude || fullAddress" class="w-full py-12 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-6">Localização</span>
        <BarbershopMap
          v-if="barbershop.latitude && barbershop.longitude"
          :lat="Number(barbershop.latitude)"
          :lng="Number(barbershop.longitude)"
          :name="barbershop.name"
          :address="fullAddress"
          :height="300"
        />
        <div v-else-if="fullAddress" class="rounded-2xl border border-white/[.06] bg-[#181818] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p class="text-sm text-gray-400 flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
              </svg>
              {{ fullAddress }}
            </p>
            <p class="text-xs text-gray-600">Coordenadas ainda não cadastradas para este endereço.</p>
          </div>
          <a
            :href="`https://www.google.com/maps/search/${encodeURIComponent(fullAddress ?? '')}`"
            target="_blank" rel="noopener noreferrer"
            class="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-green-400/30 hover:text-green-400 transition-colors whitespace-nowrap"
          >Ver no Google Maps →</a>
        </div>
      </div>
    </section>

    <!-- GALERIA DE FOTOS -->
    <section v-if="allPhotos.length > 1" class="w-full py-12 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-6">Fotos</span>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div
            v-for="(photo, i) in allPhotos"
            :key="i"
            class="relative overflow-hidden rounded-xl cursor-pointer group"
            :class="i === 0 ? 'col-span-2 row-span-2' : ''"
            @click="lightboxIndex = i; showLightbox = true"
          >
            <img
              :src="photo"
              :alt="`${barbershop.name} em ${neighborhoodLabel} — foto ${i + 1}`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              :class="i === 0 ? 'h-72 sm:h-80' : 'h-36 sm:h-40'"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"/>
            <div v-if="i === allPhotos.length - 1 && allPhotos.length > 8" class="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span class="text-white font-bold text-lg">+{{ allPhotos.length - 8 }}</span>
            </div>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <Transition name="fade">
          <div
            v-if="showLightbox"
            class="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            @click.self="showLightbox = false"
            @keydown.escape="showLightbox = false"
          >
            <button class="absolute top-4 right-4 text-white/60 hover:text-white text-3xl leading-none" @click="showLightbox = false">✕</button>
            <button class="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl px-3" @click="lightboxIndex = Math.max(0, lightboxIndex - 1)">‹</button>
            <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl px-3" @click="lightboxIndex = Math.min(allPhotos.length - 1, lightboxIndex + 1)">›</button>
            <img
              :src="allPhotos[lightboxIndex]"
              :alt="`${barbershop.name} — foto ${lightboxIndex + 1}`"
              class="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
            <p class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm">{{ lightboxIndex + 1 }} / {{ allPhotos.length }}</p>
          </div>
        </Transition>
      </Teleport>
    </section>

    <!-- SERVIÇOS -->
    <section v-if="activeServices.length" class="w-full py-16 px-6 md:px-16 bg-[#0f0f0f]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Serviços disponíveis</span>
        <h2 class="font-black leading-none mb-8 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)">O QUE OFERECEMOS</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="service in activeServices"
            :key="service.slug"
            class="flex flex-col gap-2 p-5 rounded-xl border border-white/[.06] bg-[#181818]"
          >
            <span v-if="service.category" class="text-[10px] font-bold tracking-widest uppercase text-green-400">{{ service.category }}</span>
            <span class="text-sm font-medium text-white">{{ service.name }}</span>
            <div class="flex items-center justify-between mt-auto pt-2 border-t border-white/[.05]">
              <span class="text-sm font-bold text-white">R$ {{ Number(service.price).toFixed(2).replace('.', ',') }}</span>
              <span class="text-xs text-gray-600">{{ service.durationMin }}min</span>
            </div>
          </div>
        </div>

        <div v-if="serviceLinks.length" class="mt-8 pt-8 border-t border-white/[.05]">
          <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4">
            Ver por serviço em {{ neighborhoodLabel }}
          </p>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="link in serviceLinks"
              :key="link.href"
              :to="link.href"
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:text-green-400 text-sm text-gray-500 transition-all"
            >
              {{ link.emoji }} {{ link.label }} em {{ neighborhoodLabel }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- HORÁRIOS -->
    <section v-if="barbershop.openingHours" class="w-full py-16 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px)">HORÁRIOS DE FUNCIONAMENTO</h2>
          <div class="flex items-center gap-2 pb-1">
            <span
              class="w-2 h-2 rounded-full flex-shrink-0"
              :class="{
                'bg-green-400 animate-pulse': opening.status === 'open',
                'bg-amber-400 animate-pulse': opening.status === 'closing_soon',
                'bg-red-400':                 opening.status === 'closed',
                'bg-gray-500':                opening.status === 'closed' && !opening.sublabel,
              }"
            />
            <span class="text-sm font-semibold" :class="opening.color">{{ opening.label }}</span>
            <span v-if="opening.sublabel" class="text-xs text-gray-500">· {{ opening.sublabel }}</span>
          </div>
        </div>
        <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-8 max-w-md">
          <div v-for="(entry, day) in formattedHours" :key="day" class="flex justify-between py-3 border-b border-white/[.05] last:border-0">
            <span class="text-gray-400 capitalize">{{ entry.label }}</span>
            <span class="font-medium" :class="entry.isToday ? opening.color : entry.hours === 'Fechado' ? 'text-gray-600' : 'text-white'">
              {{ entry.hours }}
              <span v-if="entry.isToday" class="ml-1 text-[10px] font-bold opacity-60">← hoje</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- OUTRAS BARBEARIAS NO MESMO BAIRRO -->
    <section class="w-full py-16 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">No mesmo bairro</span>
        <h2 class="font-black leading-none mb-8 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,2.5vw,36px)">
          OUTRAS BARBEARIAS EM {{ neighborhoodLabel.toUpperCase() }}
        </h2>
        <div v-if="nearbyBarbershops.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <NuxtLink
            v-for="nb in nearbyBarbershops"
            :key="nb.slug"
            :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}/${nb.slug}`"
            class="group flex flex-col gap-3 p-5 rounded-2xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] transition-all duration-200 hover:-translate-y-0.5"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="font-bold text-white group-hover:text-green-400 transition-colors text-[15px] leading-snug">{{ nb.name }}</p>
              <span v-if="nb.googleRating" class="flex-shrink-0 text-xs text-green-400 font-bold">⭐ {{ Number(nb.googleRating).toFixed(1) }}</span>
            </div>
            <p v-if="nb.street" class="text-xs text-gray-600 truncate">{{ nb.street }}{{ nb.number ? ', ' + nb.number : '' }}</p>
            <span class="mt-auto text-xs text-green-400/60 group-hover:text-green-400 transition-colors">Ver barbearia →</span>
          </NuxtLink>
        </div>
        <NuxtLink
          :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`"
          class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-400 transition-colors"
        >
          Ver todas as barbearias em {{ neighborhoodLabel }} →
        </NuxtLink>
      </div>
    </section>

    <!-- CONTEÚDO TEXTUAL -->
    <section class="w-full py-16 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 space-y-6">
          <h2 class="font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,2.5vw,36px)">
            SOBRE A {{ barbershop.name.toUpperCase() }}
          </h2>
          <p class="text-[15px] leading-relaxed text-gray-400">
            A {{ barbershop.name }} é uma barbearia localizada
            {{ fullAddress ? `na ${fullAddress}` : `no bairro ${neighborhoodLabel}, em ${cityLabel}` }}.
            <template v-if="activeServices.length">
              O espaço oferece {{ servicesSummary }}, atendendo clientes da região com agendamento direto pelo WhatsApp.
            </template>
            <template v-else>
              O espaço atende clientes da região com agendamento direto pelo WhatsApp.
            </template>
          </p>
          <p v-if="googleRating" class="text-[15px] leading-relaxed text-gray-400">
            Com avaliação de {{ googleRating.toFixed(1) }} estrelas
            {{ barbershop.googleReviewCount ? `(${barbershop.googleReviewCount} avaliações no Google)` : 'no Google' }},
            a {{ barbershop.name }} é reconhecida pelos clientes da {{ neighborhoodLabel }}
            pela qualidade do atendimento e pelo cuidado com cada detalhe.
          </p>
          <p class="text-[15px] leading-relaxed text-gray-400">
            Para agendar um horário na {{ barbershop.name }}, basta clicar no botão de WhatsApp
            desta página. A barbearia atende clientes de {{ neighborhoodLabel }}
            e das regiões próximas de {{ cityLabel }}.
          </p>
        </div>

        <aside class="space-y-6">
          <div v-if="nearbyNeighborhoodsFromData.length" class="rounded-2xl border border-white/[.06] bg-[#181818] p-6">
            <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Bairros próximos</p>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="n in nearbyNeighborhoodsFromData"
                :key="n.slug"
                :to="`/barbearias/${ufSlug}/${citySlug}/${n.slug}`"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-gray-400 bg-white/[.04] border border-white/[.06] hover:border-green-400/30 hover:text-green-400 transition-colors"
              >{{ n.name }}</NuxtLink>
            </div>
          </div>
          <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6">
            <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Links úteis</p>
            <ul class="space-y-2">
              <li>
                <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}`" class="flex items-center gap-2 text-[14px] text-gray-400 hover:text-green-400 transition-colors py-1.5">
                  <span class="w-1 h-1 rounded-full bg-green-400/50 flex-shrink-0"/>
                  Barbearias em {{ neighborhoodLabel }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}`" class="flex items-center gap-2 text-[14px] text-gray-400 hover:text-green-400 transition-colors py-1.5">
                  <span class="w-1 h-1 rounded-full bg-green-400/50 flex-shrink-0"/>
                  Barbearias em {{ cityLabel }}
                </NuxtLink>
              </li>
              <li v-for="link in serviceLinks.slice(0, 4)" :key="link.href">
                <NuxtLink :to="link.href" class="flex items-center gap-2 text-[14px] text-gray-400 hover:text-green-400 transition-colors py-1.5">
                  <span class="w-1 h-1 rounded-full bg-green-400/50 flex-shrink-0"/>
                  {{ link.label }} em {{ neighborhoodLabel }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative w-full py-24 px-6 md:px-16 bg-[#0a0a0a] text-center overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"/>
      <div class="relative max-w-xl mx-auto">
        <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          AGENDE JÁ<br>SEU <span class="text-green-400">HORÁRIO</span>
        </h2>
        <p class="mb-8 text-[17px] leading-relaxed text-gray-400">
          Atendimento profissional em {{ neighborhoodLabel }}. Agende direto pelo WhatsApp.
        </p>
        <a
          v-if="whatsappNumber"
          :href="whatsappHref"
          target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300 hover:scale-105"
          @click="onWhatsappClick"
        >💬 Falar no WhatsApp</a>
      </div>
    </section>

  </div>

  <!-- 404 -->
  <div v-else class="min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-20">
    <div class="text-center px-6">
      <p class="font-black text-green-400/20 leading-none mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:120px">404</p>
      <h1 class="text-2xl font-bold text-white mb-3">Barbearia não encontrada</h1>
      <p class="text-gray-400 mb-6">Essa barbearia não está cadastrada ainda.</p>
      <NuxtLink to="/barbearias" class="text-green-400 hover:underline">Ver todas as regiões →</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { fetchBarbershopBySlug, fetchNearbyBarbershops } from '~/composables/useBarbershopApi'
import { getNeighborhoodData, allCities, allServices } from '~/data/locations'
import { useOpeningStatus } from '~/composables/useOpeningStatus'
import { useAnalytics } from '~/composables/useAnalytics'

definePageMeta({ layout: 'barber' })

const route = useRoute()

const ufSlug           = (route.params.uf     as string).toLowerCase().trim()
const citySlug         = (route.params.cidade as string).toLowerCase().trim()
const neighborhoodSlug = (route.params.bairro as string).toLowerCase().trim()
const barbershopSlug   = (route.params.slug   as string).toLowerCase().trim()

// ── ✅ SSR: useAsyncData roda no servidor — Googlebot recebe HTML completo ──
const { data: barbershop } = await useAsyncData(
  `barbershop-${ufSlug}-${citySlug}-${neighborhoodSlug}-${barbershopSlug}`,
  () => fetchBarbershopBySlug(ufSlug, citySlug, neighborhoodSlug, barbershopSlug),
  { server: true }
)

// ── Barbearias próximas — client-only, não bloqueia SSR ──────────────────
const nearbyBarbershops = ref<any[]>([])

onMounted(async () => {
  // ✅ Analytics só no cliente — não existe window no servidor
  if (barbershop.value?.id) {
    const { trackBarbershopView } = useAnalytics()
    trackBarbershopView(barbershop.value.id, barbershop.value.name)
  }

  // Secundário fire-and-forget
  fetchNearbyBarbershops(ufSlug, citySlug, neighborhoodSlug, barbershopSlug)
    .then(res => { nearbyBarbershops.value = res })
    .catch(() => {})
})

// ── Status de funcionamento ───────────────────────────────────────────────
const opening = computed(() => useOpeningStatus(barbershop.value?.openingHours))

// ── Labels de localização ─────────────────────────────────────────────────
const neighborhoodData = computed(() => getNeighborhoodData(ufSlug, citySlug, neighborhoodSlug))

const ufLabel = computed(() =>
  neighborhoodData.value?.city.uf ?? barbershop.value?.state ?? ufSlug.toUpperCase()
)

const cityLabel = computed(() =>
  neighborhoodData.value?.city.city
  ?? barbershop.value?.city
  ?? allCities.find(c => c.citySlug === citySlug)?.city
  ?? citySlug
)

const neighborhoodLabel = computed(() => {
  if (neighborhoodData.value) return neighborhoodData.value.neighborhood.name
  if (barbershop.value?.neighborhood) return barbershop.value.neighborhood
  const city = allCities.find(c => c.citySlug === citySlug)
  if (city) {
    for (const d of city.districts) {
      const n = d.neighborhoods.find(n => n.slug === neighborhoodSlug)
      if (n) return n.name
    }
  }
  return neighborhoodSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
})

// ── Bairros próximos ──────────────────────────────────────────────────────
const nearbyNeighborhoodsFromData = computed(() => {
  if (!neighborhoodData.value) return []
  return neighborhoodData.value.district.neighborhoods
    .filter(n => n.slug !== neighborhoodSlug)
    .slice(0, 8)
})

// ── Helpers ───────────────────────────────────────────────────────────────
const googleRating = computed(() =>
  barbershop.value?.googleRating != null ? Number(barbershop.value.googleRating) : null
)

const coverSrc = computed(() =>
  barbershop.value?.coverImageUrl ?? barbershop.value?.photos?.[0] ?? null
)

const fullAddress = computed(() => {
  const b = barbershop.value
  if (!b) return null
  const parts = [b.street, b.number, b.complement, b.neighborhood, b.city, b.state].filter(Boolean)
  return parts.length ? parts.join(', ') : null
})

const whatsappNumber = computed(() => {
  const b = barbershop.value
  if (!b) return null
  const raw = (b.whatsapp || b.phone || '').replace(/\D/g, '')
  if (!raw) return null
  return raw.startsWith('55') ? raw : `55${raw}`
})

const whatsappHref = computed(() => {
  if (!whatsappNumber.value) return null
  const msg = encodeURIComponent(`Olá! Vim pelo Portal SuaAgenda e gostaria de agendar um horário na ${barbershop.value?.name}. 😊`)
  return `https://wa.me/${whatsappNumber.value}?text=${msg}`
})

const showLightbox  = ref(false)
const lightboxIndex = ref(0)

const allPhotos = computed(() => {
  const b = barbershop.value
  if (!b) return []
  const fromTable = (b.photos ?? []) as string[]
  if (fromTable.length > 0) return fromTable
  if (b.coverImageUrl) return [b.coverImageUrl]
  return []
})

const activeServices = computed(() =>
  (barbershop.value?.services ?? [])
    .filter(s => Boolean(s.isActive))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
)

// ── Tracking ─────────────────────────────────────────────────────────────
function onWhatsappClick() {
  if (barbershop.value?.id) {
    const { trackWhatsappClick } = useAnalytics()
    trackWhatsappClick(barbershop.value.id, barbershop.value.name)
  }
}

// ── Serviços ─────────────────────────────────────────────────────────────
const servicesSummary = computed(() => {
  const names = activeServices.value.map(s => s.name.toLowerCase()).slice(0, 4)
  if (!names.length) return ''
  if (names.length === 1) return names[0]
  return `${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}`
})

const serviceLinks = computed(() => {
  function toSlug(str: string): string {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
  const activeSlugs = new Set<string>(
    activeServices.value.flatMap(s => {
      const tags: string[] = []
      if (s.seoTag) tags.push(s.seoTag)
      if (s.slug)   tags.push(s.slug)
      if (s.name)   tags.push(toSlug(s.name))
      return tags
    })
  )
  return allServices
    .filter(s => activeSlugs.has(s.slug))
    .map(s => ({ label: s.name, emoji: s.emoji, href: `/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}/s/${s.slug}` }))
})

// ── Horários ──────────────────────────────────────────────────────────────
const DAY_KEYS_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
const daysMap: Record<string, string> = {
  mon: 'Segunda', tue: 'Terça',  wed: 'Quarta',
  thu: 'Quinta',  fri: 'Sexta',  sat: 'Sábado', sun: 'Domingo',
}
const jsDayToKey = ['sun','mon','tue','wed','thu','fri','sat'] as const

const formattedHours = computed(() => {
  const hours = barbershop.value?.openingHours
  if (!hours) return {}
  const todayKey = jsDayToKey[new Date().getDay()]
  return DAY_KEYS_ORDER.reduce((acc, key) => {
    const val = hours[key] ?? null
    acc[key] = {
      label:   daysMap[key] ?? key,
      hours:   val ? `${val.open} – ${val.close}` : 'Fechado',
      isToday: key === todayKey,
    }
    return acc
  }, {} as Record<string, { label: string; hours: string; isToday: boolean }>)
})

// ── SEO — roda no servidor com dados reais ────────────────────────────────
const OG_FALLBACK = 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/barber-og_rgvr3h.jpg'

const ogImage = computed(() =>
  barbershop.value?.coverImageUrl ?? barbershop.value?.photos?.[0] ?? OG_FALLBACK
)

useHead(computed(() => {
  // ✅ 404 correto no servidor — sem dados reais não indexa
  if (!barbershop.value) {
    return {
      title: `Barbearia não encontrada | SuaAgenda`,
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    }
  }

  const b         = barbershop.value
  const canonical = `https://suaagenda.link/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}/${b.slug}`

  const streetPart    = b.street ? [b.street, b.number].filter(Boolean).join(', ') : null
  const titleLocation = streetPart
    ? `${streetPart}, ${neighborhoodLabel.value}`
    : `${neighborhoodLabel.value}, ${cityLabel.value}`
  const metaTitle = `${b.name} — Barbearia em ${titleLocation} | SuaAgenda`

  const CTA = ' Agende pelo WhatsApp.'
  let desc = fullAddress.value
    ? `${b.name} — ${fullAddress.value}.`
    : `${b.name} em ${neighborhoodLabel.value}, ${cityLabel.value}.`

  if (googleRating.value) {
    const reviewPart  = b.googleReviewCount && b.googleReviewCount > 0 ? ` · ${b.googleReviewCount} avaliações` : ''
    const ratingChunk = ` ⭐ ${googleRating.value.toFixed(1)}${reviewPart} no Google.`
    if (desc.length + ratingChunk.length + CTA.length <= 160) desc += ratingChunk
  }
  desc += CTA
  if (desc.length > 160) desc = desc.substring(0, 157) + '...'

  return {
    title: metaTitle,
    meta: [
      { name: 'description',       content: desc },
      { property: 'og:title',      content: `${b.name} — ${neighborhoodLabel.value}` },
      { property: 'og:type',       content: 'business.business' },
      { property: 'og:url',        content: canonical },
      { property: 'og:image',      content: ogImage.value },
      { name: 'twitter:card',      content: 'summary_large_image' },
      { name: 'twitter:image',     content: ogImage.value },
      { name: 'robots',            content: 'index, follow' },
    ],
    link: [{ rel: 'canonical', href: canonical }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(buildJsonLd(b, canonical)) }],
  }
}))

function buildJsonLd(b: any, canonical: string) {
  const services = (b.services ?? []).filter((s: any) => Boolean(s.isActive))
  const prices   = services.map((s: any) => Number(s.price)).filter((p: number) => p > 0)
  const priceMin = prices.length ? Math.min(...prices) : null

  const daySchemaMap: Record<string, string> = {
    mon: 'https://schema.org/Monday', tue: 'https://schema.org/Tuesday',
    wed: 'https://schema.org/Wednesday', thu: 'https://schema.org/Thursday',
    fri: 'https://schema.org/Friday', sat: 'https://schema.org/Saturday',
    sun: 'https://schema.org/Sunday',
  }

  const openingHoursSpec = b.openingHours
    ? Object.entries(b.openingHours as Record<string, { open: string; close: string } | null>)
        .filter(([, val]) => val !== null)
        .map(([day, val]) => ({
          '@type':   'OpeningHoursSpecification',
          dayOfWeek: daySchemaMap[day] ?? day,
          opens:     (val as any).open,
          closes:    (val as any).close,
        }))
    : undefined

  const offerCatalog = services.length
    ? {
        '@type': 'OfferCatalog',
        name: `Serviços de ${b.name}`,
        itemListElement: services.map((s: any) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            ...(s.description ? { description: s.description }     : {}),
            ...(s.durationMin ? { duration: `PT${s.durationMin}M` } : {}),
          },
          price: Number(s.price).toFixed(2),
          priceCurrency: 'BRL',
        })),
      }
    : undefined

  const images = (b.photos ?? []).length > 0
    ? (b.photos as string[])
    : (b.coverImageUrl ? [b.coverImageUrl] : [ogImage.value])
  const sameAs = b.googlePlaceId ? [`https://maps.google.com/?cid=${b.googlePlaceId}`] : undefined

  return {
    '@context': 'https://schema.org',
    '@type':    ['HairSalon', 'LocalBusiness'],
    name:       b.name,
    image:      images.length === 1 ? images[0] : images,
    url:        canonical,
    address: {
      '@type':         'PostalAddress',
      streetAddress:   fullAddress.value,
      addressLocality: cityLabel.value,
      addressRegion:   ufLabel.value,
      postalCode:      b.zipCode ?? undefined,
      addressCountry:  'BR',
    },
    ...(b.latitude && b.longitude ? { geo: { '@type': 'GeoCoordinates', latitude: Number(b.latitude), longitude: Number(b.longitude) } } : {}),
    telephone: whatsappNumber.value ?? undefined,
    ...(b.email   ? { email: b.email }   : {}),
    ...(b.website ? { sameAs: [b.website, ...(sameAs ?? [])] } : (sameAs ? { sameAs } : {})),
    ...(priceMin  ? { priceRange: priceMin <= 50 ? 'R$' : priceMin <= 100 ? 'R$$' : priceMin <= 200 ? 'R$$$' : 'R$$$$' } : {}),
    ...(googleRating.value ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: googleRating.value, reviewCount: b.googleReviewCount ?? 0, bestRating: 5, worstRating: 1 } } : {}),
    ...(openingHoursSpec?.length ? { openingHoursSpecification: openingHoursSpec } : {}),
    ...(offerCatalog ? { hasOfferCatalog: offerCatalog } : {}),
    ...(b.description ? { description: b.description } : {}),
    ...(b.logoUrl     ? { logo: { '@type': 'ImageObject', url: b.logoUrl } } : {}),
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>