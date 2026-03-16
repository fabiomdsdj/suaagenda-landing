<template>
  <div class="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden" style="font-family:'DM Sans',sans-serif">

    <!-- ══════════════════════════════════════════════════════
         NAV
    ═══════════════════════════════════════════════════════ -->
    <header class="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <NuxtImg
            provider="cloudinary"
            src="v1758665895/logo-sua-agenda-site-dark_w1nb5c.png"
            alt="SuaAgenda"
            class="h-9 w-auto"
            v-motion="{ initial:{opacity:0,x:-12}, enter:{opacity:1,x:0,transition:{duration:800}} }"
          />
          <span class="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold tracking-widest uppercase bg-green-400/10 text-green-400 border border-green-400/20">
            ✂️ Barbearia
          </span>
        </NuxtLink>

        <!-- Desktop links -->
        <nav class="hidden md:flex items-center gap-7">
          <a
            v-for="link in navLinks" :key="link.label"
            :href="link.href"
            class="text-[15px] font-medium text-gray-400 hover:text-white transition-colors duration-200 relative group"
          >
            {{ link.label }}
            <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300"></span>
          </a>

          <!-- Dropdown Recursos -->
          <div class="relative group/recursos">
            <button class="text-[15px] font-medium text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1">
              Recursos
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="w-3 h-3 transition-transform group-hover/recursos:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
              </svg>
            </button>
            <div class="absolute top-full right-0 pt-3 opacity-0 pointer-events-none group-hover/recursos:opacity-100 group-hover/recursos:pointer-events-auto transition-all duration-200">
              <div class="w-56 rounded-xl border border-white/[.08] bg-[#181818] shadow-xl p-2">
                <NuxtLink
                  v-for="r in recursosLinks" :key="r.href"
                  :to="r.href"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-gray-400 hover:text-white hover:bg-white/[.04] transition-colors"
                >
                  <span class="text-base">{{ r.emoji }}</span>
                  {{ r.label }}
                </NuxtLink>
                <div class="border-t border-white/[.06] mt-2 pt-2">
                  <NuxtLink
                    v-for="b in blogLinks" :key="b.href"
                    :to="b.href"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-gray-400 hover:text-white hover:bg-white/[.04] transition-colors"
                  >
                    <span class="text-base">{{ b.emoji }}</span>
                    {{ b.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/5511941649284"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300 hover:-translate-y-px shadow-lg shadow-green-400/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>
            </svg>
            Testar grátis
          </a>
        </nav>

        <!-- Burger -->
        <button
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile drawer -->
      <Transition name="slide-down">
        <div v-if="mobileOpen" class="md:hidden border-t border-white/5 bg-[#0f0f0f]">
          <div class="flex flex-col px-6 py-6 gap-1">
            <a
              v-for="link in navLinks" :key="link.label"
              :href="link.href"
              class="text-[17px] font-medium text-gray-300 hover:text-green-400 transition-colors py-2"
              @click="mobileOpen = false"
            >{{ link.label }}</a>

            <div class="pt-3 pb-1">
              <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Recursos</p>
              <NuxtLink
                v-for="r in recursosLinks" :key="r.href"
                :to="r.href"
                class="flex items-center gap-2 text-[16px] text-gray-300 hover:text-green-400 transition-colors py-2"
                @click="mobileOpen = false"
              >
                <span>{{ r.emoji }}</span>{{ r.label }}
              </NuxtLink>
            </div>

            <div class="pt-1 pb-3">
              <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Blog</p>
              <NuxtLink
                v-for="b in blogLinks" :key="b.href"
                :to="b.href"
                class="flex items-center gap-2 text-[16px] text-gray-300 hover:text-green-400 transition-colors py-2"
                @click="mobileOpen = false"
              >
                <span>{{ b.emoji }}</span>{{ b.label }}
              </NuxtLink>
            </div>

            <a
              href="https://wa.me/5511941649284"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-400 text-black text-[16px] font-bold mt-2"
              @click="mobileOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>
              </svg>
              Testar 7 dias grátis
            </a>
          </div>
        </div>
      </Transition>
    </header>

    <!-- CONTEÚDO -->
    <main>
      <slot />
    </main>

    <!-- ══════════════════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════════════════ -->
    <footer class="bg-[#0a0a0a] border-t border-white/5">

      <!-- CTA strip -->
      <div class="bg-gradient-to-r from-green-400/10 via-green-400/5 to-transparent border-b border-green-400/10 py-10 px-6">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p class="text-xl font-bold text-white mb-1">Sua barbearia no Google em menos de 5 minutos.</p>
            <p class="text-[15px] text-gray-400">Sem técnico, sem complicação, sem fidelidade.</p>
          </div>
          <a
            href="https://wa.me/5511941649284"
            class="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300 hover:-translate-y-px shadow-lg shadow-green-400/20 whitespace-nowrap"
          >
            ✂️ Começar agora — grátis
          </a>
        </div>
      </div>

      <!-- Grid principal -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 px-6 py-16">

        <!-- Marca (2 cols) -->
        <div class="sm:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <NuxtImg
              provider="cloudinary"
              src="v1758665895/logo-sua-agenda-site-dark_w1nb5c.png"
              alt="SuaAgenda"
              class="h-8 w-auto"
            />
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold tracking-widest uppercase bg-green-400/10 text-green-400 border border-green-400/20">
              ✂️ Barbearia
            </span>
          </div>
          <p class="text-[15px] text-gray-400 leading-relaxed mb-5 max-w-sm">
            O sistema simples que ajuda a encher a agenda da barbearia.
            Sem app pra baixar, sem contrato, sem dor de cabeça.
          </p>
          <!-- Selos -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span class="inline-flex items-center gap-1.5 text-[12px] text-gray-500 bg-white/[.04] border border-white/[.06] rounded-lg px-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5 text-green-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/>
              </svg>
              Sem fidelidade
            </span>
            <span class="inline-flex items-center gap-1.5 text-[12px] text-gray-500 bg-white/[.04] border border-white/[.06] rounded-lg px-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5 text-green-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>
              </svg>
              No ar em 5 min
            </span>
            <span class="inline-flex items-center gap-1.5 text-[12px] text-gray-500 bg-white/[.04] border border-white/[.06] rounded-lg px-3 py-1.5">
              🤝 Parceiro META oficial
            </span>
          </div>
          <!-- Redes -->
          <div class="flex gap-3">
            <a href="https://www.facebook.com/profile.php?id=61581430582623" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              class="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[.04] border border-white/[.06] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#1877F2" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M22 12a10 10 0 1 0-11.6 9.86v-6.99h-2.5V12h2.5v-1.7c0-2.48 1.48-3.85 3.75-3.85 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.87h-2.34v6.99A10 10 0 0 0 22 12"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/sistemasuaagenda/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              class="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[.04] border border-white/[.06] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#E1306C" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.963.24 2.422.402a4.922 4.922 0 0 1 1.788 1.08 4.922 4.922 0 0 1 1.08 1.788c.163.46.348 1.252.403 2.422.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.24 1.963-.403 2.422a4.922 4.922 0 0 1-1.08 1.788 4.922 4.922 0 0 1-1.788 1.08c-.46.163-1.252.348-2.422.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.963-.24-2.422-.403a4.922 4.922 0 0 1-1.788-1.08 4.922 4.922 0 0 1-1.08-1.788c-.163-.46-.348-1.252-.403-2.422C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.24-1.963.403-2.422a4.922 4.922 0 0 1 1.08-1.788 4.922 4.922 0 0 1 1.788-1.08c.46-.163 1.252-.348 2.422-.403C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.16 0-3.53.012-4.78.069-1.047.048-1.61.22-1.985.367a3.125 3.125 0 0 0-1.135.723 3.125 3.125 0 0 0-.723 1.135c-.147.375-.319.938-.367 1.985-.057 1.25-.069 1.62-.069 4.78s.012 3.53.069 4.78c.048 1.047.22 1.61.367 1.985.17.39.392.73.723 1.135.404.33.745.552 1.135.723.375.147.938.319 1.985.367 1.25.057 1.62.069 4.78.069s3.53-.012 4.78-.069c1.047-.048 1.61-.22 1.985-.367a3.125 3.125 0 0 0 1.135-.723 3.125 3.125 0 0 0 .723-1.135c.147-.375.319-.938.367-1.985.057-1.25.069-1.62.069-4.78s-.012-3.53-.069-4.78c-.048-1.047-.22-1.61-.367-1.985a3.125 3.125 0 0 0-.723-1.135 3.125 3.125 0 0 0-1.135-.723c-.375-.147-.938-.319-1.985-.367-1.25-.057-1.62-.069-4.78-.069zm0 3.5a6.3 6.3 0 1 1 0 12.6 6.3 6.3 0 0 1 0-12.6zm0 1.8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm6.4-1.9a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
              </svg>
            </a>
            <a href="https://wa.me/5511941649284" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              class="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[.04] border border-white/[.06] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#25D366" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.93 11.93 0 0 0 1.64 6.06L0 24l6.17-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22c-1.84 0-3.62-.49-5.18-1.4l-.37-.22-3.66.96.98-3.57-.24-.37A9.95 9.95 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.52-7.46c-.3-.15-1.78-.88-2.06-.98s-.47-.15-.67.15-.77.98-.95 1.18-.35.22-.65.07a8.2 8.2 0 0 1-2.42-1.5 9.07 9.07 0 0 1-1.67-2.09c-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52s.2-.3.3-.5.05-.37-.02-.52-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.14.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43s.25-1.31.17-1.43-.27-.2-.57-.35Z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Produto -->
        <div>
          <h4 class="text-[12px] font-bold tracking-widest uppercase text-gray-500 mb-5">Produto</h4>
          <ul class="space-y-3">
            <li v-for="link in footerProduto" :key="link.label">
              <a :href="link.href" class="text-[14px] text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-green-400/40 flex-shrink-0"></span>
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Recursos -->
        <div>
          <h4 class="text-[12px] font-bold tracking-widest uppercase text-gray-500 mb-5">Recursos</h4>
          <ul class="space-y-3">
            <li v-for="link in footerRecursos" :key="link.href">
              <NuxtLink :to="link.href" class="text-[14px] text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-green-400/40 flex-shrink-0"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
          <h4 class="text-[12px] font-bold tracking-widest uppercase text-gray-500 mb-4 mt-7">Blog</h4>
          <ul class="space-y-3">
            <li v-for="link in footerBlog" :key="link.href">
              <NuxtLink :to="link.href" class="text-[14px] text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-green-400/40 flex-shrink-0"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Empresa + Diretório -->
        <div>
          <h4 class="text-[12px] font-bold tracking-widest uppercase text-gray-500 mb-5">Empresa</h4>
          <ul class="space-y-3 mb-7">
            <li v-for="link in footerEmpresa" :key="link.label">
              <NuxtLink :to="link.to" class="text-[14px] text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-green-400/40 flex-shrink-0"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
          <h4 class="text-[12px] font-bold tracking-widest uppercase text-gray-500 mb-4">Diretório</h4>
          <ul class="space-y-3">
            <li v-for="link in footerDiretorio" :key="link.href">
              <NuxtLink :to="link.href" class="text-[14px] text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-green-400/40 flex-shrink-0"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

      </div>

      <!-- ── Links locais SEO ── -->
      <div class="border-t border-white/[.04] px-6 py-10">
        <div class="max-w-6xl mx-auto">
          <p class="text-[11px] font-bold tracking-widest uppercase text-gray-700 mb-6">
            Barbearias por bairro
          </p>

          <div class="space-y-10">
            <div v-for="city in allCities" :key="city.citySlug">

              <!-- Cabeçalho da cidade -->
              <NuxtLink
                :to="`/barbearias/${city.citySlug}`"
                class="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-gray-500 hover:text-green-400 transition-colors mb-5"
              >
                📍 {{ city.city }}
              </NuxtLink>

              <!-- SP: agrupa por zone -->
              <template v-if="hasZones(city)">
                <div
                  v-for="(districts, zoneName) in districtsByZone(city)"
                  :key="String(zoneName)"
                  class="mb-6"
                >
                  <p class="text-[11px] font-bold tracking-widest uppercase text-gray-700 mb-3">
                    {{ zoneName }}
                  </p>
                  <div class="flex flex-wrap gap-x-5 gap-y-2">
                    <NuxtLink
                      v-for="neighborhood in flatNeighborhoods(districts)"
                      :key="neighborhood.slug"
                      :to="`/barbearias/${city.citySlug}/${neighborhood.slug}`"
                      class="text-[13px] text-gray-600 hover:text-green-400 transition-colors whitespace-nowrap"
                    >
                      {{ neighborhood.name }}
                    </NuxtLink>
                  </div>
                </div>
              </template>

              <!-- Outras cidades (Baixada Santista etc): flat -->
              <template v-else>
                <div class="flex flex-wrap gap-x-5 gap-y-2">
                  <NuxtLink
                    v-for="neighborhood in allNeighborhoods(city)"
                    :key="neighborhood.slug"
                    :to="`/barbearias/${city.citySlug}/${neighborhood.slug}`"
                    class="text-[13px] text-gray-600 hover:text-green-400 transition-colors whitespace-nowrap"
                  >
                    {{ neighborhood.name }}
                  </NuxtLink>
                </div>
              </template>

            </div>
          </div>

          <!-- Barbeiros por cidade -->
          <div class="mt-8 pt-6 border-t border-white/[.04]">
            <p class="text-[11px] font-bold tracking-widest uppercase text-gray-700 mb-4">
              Barbeiros por cidade
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink
                v-for="city in allCities"
                :key="city.citySlug"
                :to="`/barbeiros/${city.citySlug}`"
                class="text-[13px] text-gray-600 hover:text-green-400 transition-colors"
              >
                Barbeiros em {{ city.city }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/5 px-6 py-5">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-gray-600">
          <p>© {{ year }} SuaAgenda · Feito pra barbeiro, por quem entende de barbearia.</p>
          <div class="flex gap-5">
            <NuxtLink to="/privacidade" class="hover:text-gray-400 transition-colors">Privacidade</NuxtLink>
            <NuxtLink to="/termos" class="hover:text-gray-400 transition-colors">Termos</NuxtLink>
          </div>
        </div>
      </div>

      <WhatsappButton
        :contacts="[
          { name: 'Vendas',  phone: '+5511941649284', availableTimes: ['10:30','14:00','16:00'] },
          { name: 'Suporte', phone: '+5511941649284', availableTimes: ['09:00','12:00','15:00'] },
        ]"
        defaultMessage="Olá, vim pelo site de barbearia e gostaria de atendimento"
        aria-label="Falar com a gente no WhatsApp"
      />
    </footer>
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { allCities, type CityData, type District, type Neighborhood } from '~/data/locations'

const mobileOpen = ref(false)
const year = new Date().getFullYear()

// Bairros flat — cidades sem zone (Baixada Santista etc)
function allNeighborhoods(city: CityData): Neighborhood[] {
  return city.districts.flatMap((d) => d.neighborhoods)
}

// Bairros flat de um array de distritos — usado dentro de cada zona de SP
function flatNeighborhoods(districts: District[]): Neighborhood[] {
  return districts.flatMap((d) => d.neighborhoods)
}

// SP tem district.zone definido via spZone() no index.ts
function hasZones(city: CityData): boolean {
  return city.districts.some((d) => d.zone != null)
}

// Agrupa distritos por zone — { "Zona Leste": [...], "Zona Norte": [...] }
function districtsByZone(city: CityData): Record<string, District[]> {
  const groups: Record<string, District[]> = {}
  for (const district of city.districts) {
    const zone = district.zone ?? 'Outras regiões'
    if (!groups[zone]) groups[zone] = []
    groups[zone].push(district)
  }
  return groups
}

const navLinks = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Benefícios',    href: '#como-funciona-passos' },
  { label: 'Depoimentos',   href: '#depoimentos' },
  { label: 'Preço',         href: '#preco' },
  { label: 'Dúvidas',       href: '#faq' },
]

const recursosLinks = [
  { emoji: '📅', label: 'Agenda online',       href: '/recursos/agenda-online' },
  { emoji: '👥', label: 'Controle de clientes', href: '/recursos/controle-clientes' },
  { emoji: '🔗', label: 'Link de agendamento',  href: '/recursos/link-agendamento' },
]

const blogLinks = [
  { emoji: '📣', label: 'Como divulgar barbearia',    href: '/blog/como-divulgar-barbearia' },
  { emoji: '💡', label: 'Como conseguir mais clientes', href: '/blog/como-conseguir-clientes-barbearia' },
]

const footerProduto = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Preço',         href: '#preco' },
  { label: 'Depoimentos',   href: '#depoimentos' },
  { label: 'Testar grátis', href: 'https://wa.me/5511941649284' },
]

const footerRecursos = [
  { label: 'Agenda online',        href: '/recursos/agenda-online' },
  { label: 'Controle de clientes', href: '/recursos/controle-clientes' },
  { label: 'Link de agendamento',  href: '/recursos/link-agendamento' },
]

const footerBlog = [
  { label: 'Como divulgar barbearia',      href: '/blog/como-divulgar-barbearia' },
  { label: 'Como conseguir mais clientes', href: '/blog/como-conseguir-clientes-barbearia' },
]

const footerDiretorio = [
  { label: 'Barbearias por bairro', href: '/barbearias' },
  { label: 'Barbeiros por cidade',  href: '/barbeiros' },
]

const footerEmpresa = [
  { label: 'Planos',                  to: '/precos' },
  { label: 'Política de privacidade', to: '/privacidade' },
  { label: 'Termos de serviço',       to: '/termos' },
]
</script>

<style>
.slide-down-enter-active, .slide-down-leave-active { transition: opacity .2s, transform .2s; }
.slide-down-enter-from, .slide-down-leave-to       { opacity: 0; transform: translateY(-8px); }
</style>