<!-- pages/barbearias/[uf]/[cidade]/[bairro]/index.vue -->
<template>
  <div>

    <!-- ═══════════════════════════ PÁGINA COMPLETA ═══════════════════════════
         Condição: seo != null  OU  fallback encontrou shops neste bairro exato
    ═══════════════════════════════════════════════════════════════════════════ -->
    <div v-if="showFullPage" class="text-[15px]">

      <!-- BREADCRUMB -->
      <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
        <div class="max-w-6xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span class="text-gray-700">/</span>
            <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
            <span class="text-gray-700">/</span>
            <NuxtLink
              :to="`/barbearias/${seo?.ufSlug ?? ufSlug}/${seo?.citySlug ?? citySlug}`"
              class="hover:text-green-400 transition-colors"
            >{{ seo?.cityName ?? fallback.cityLabel }}</NuxtLink>
            <span class="text-gray-700">/</span>
            <span class="text-gray-400">{{ seo?.neighborhoodName ?? neighborhoodLabel }}</span>
          </nav>
        </div>
      </section>

      <!-- HERO -->
      <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 50%,rgba(52,211,153,.07) 0%,transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto">
          <div class="flex flex-wrap gap-3 mb-6">
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
              ✂️ {{ seo?.districtName ?? fallback.districtLabel ?? fallback.cityLabel }}
            </span>
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
              📍 {{ seo?.cityName ?? fallback.cityLabel }}
            </span>
          </div>
          <h1 class="font-black leading-none mb-6 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em">
            BARBEARIA PERTO DE MIM EM<br>
            <span class="text-green-400">{{ (seo?.neighborhoodName ?? neighborhoodLabel).toUpperCase() }}</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
            {{ seo?.introParagraph ?? `Encontramos barbearias que atendem próximo a ${neighborhoodLabel} com agendamento online pelo WhatsApp.` }}
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-green-400 text-black text-lg font-bold shadow transition hover:bg-green-300 hover:-translate-y-0.5">
              ✂️ Sou barbeiro — quero aparecer aqui
            </a>
            <NuxtLink to="/barbearia#como-funciona" class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white border border-white/20 transition hover:border-green-400 hover:text-green-400 hover:-translate-y-0.5">
              Ver como funciona →
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- CARDS -->
      <div class="bg-[#0a0a0a]">
        <!-- Bairro mapeado no locations → PageSearchSection normal -->
        <PageSearchSection
          v-if="seo"
          :uf="seo.ufSlug"
          :city="seo.citySlug"
          :neighborhood="neighborhoodSlug"
          :context-label="seo.neighborhoodName"
        />
        <!-- Bairro existe no banco mas não no locations → cards direto do banco -->
        <div v-else class="py-12 px-6 md:px-16">
          <div class="max-w-6xl mx-auto">
            <!-- Skeleton enquanto carrega -->
            <div v-if="fallback.pending.value" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="i in 6" :key="i" class="h-64 rounded-2xl bg-[#111] animate-pulse border border-white/[.04]" />
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <BarbershopCard
                v-for="shop in fallback.shops.value"
                :key="shop.id"
                :shop="shop"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- CONTEÚDO SEO (só quando temos seo completo do locations) -->
      <template v-if="seo">
        <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
          <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2 space-y-8">
              <div class="rounded-2xl border border-green-400/10 bg-[#181818] p-8">
                <h2 class="font-black leading-none mb-4 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
                  AGENDA ONLINE PARA BARBEIROS EM <span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span>
                </h2>
                <p class="text-[16px] leading-relaxed text-gray-400 mb-4">{{ seo.secondParagraph }}</p>
                <p class="text-[16px] leading-relaxed text-gray-400">{{ seo.thirdParagraph }}</p>
              </div>
              <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-8">
                <h2 class="font-black leading-none mb-6 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,2.5vw,36px)">
                  COMO UM BARBEIRO DE <span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span> USA A SUAAGENDA
                </h2>
                <ol class="list-none p-0 m-0 space-y-4">
                  <li v-for="(step, i) in howItWorks" :key="i" class="flex items-start gap-4 py-4 border-b border-white/[.05] last:border-0">
                    <span class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-green-400 bg-green-400/10 border border-green-400/30">{{ i + 1 }}</span>
                    <div>
                      <p class="font-semibold text-white text-[15px] mb-1">{{ step.title }}</p>
                      <p class="text-[14px] text-gray-500 leading-relaxed">{{ step.desc }}</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div v-for="stat in localStats" :key="stat.label" class="rounded-xl border border-green-400/10 bg-[#181818] p-5 text-center">
                  <p class="font-black text-green-400 leading-none mb-1" style="font-family:'Bebas Neue',sans-serif;font-size:36px">{{ stat.num }}</p>
                  <p class="text-xs text-gray-500">{{ stat.label }}</p>
                </div>
              </div>
            </div>
            <aside class="space-y-6">
              <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-7 relative overflow-hidden">
                <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
                <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">Você é barbeiro?</p>
                <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:28px">APAREÇA NO GOOGLE EM 5 MIN</h3>
                <p class="text-[14px] text-gray-400 leading-relaxed mb-5">Cria sua conta, confirma os serviços e já tem site profissional nas primeiras posições do Google — sem mexer em nada técnico.</p>
                <a href="https://wa.me/5511941649284" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300">🔥 Testar 7 dias grátis</a>
                <p class="text-xs text-center text-gray-600 mt-3">Sem cartão de crédito · Cancela quando quiser</p>
              </div>
              <div class="rounded-2xl border border-white/[.06] bg-[#181818] p-6">
                <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Links úteis</p>
                <ul class="space-y-2">
                  <li v-for="link in seo.internalLinks" :key="link.href">
                    <NuxtLink :to="link.href" class="flex items-center gap-2 text-[14px] text-gray-400 hover:text-green-400 transition-colors py-1.5">
                      <span class="w-1 h-1 rounded-full bg-green-400/50 flex-shrink-0"></span>
                      {{ link.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <div v-if="seo.nearbyNeighborhoods.length" class="rounded-2xl border border-white/[.06] bg-[#181818] p-6">
                <p class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Bairros próximos</p>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="n in seo.nearbyNeighborhoods" :key="n.slug"
                    :to="`/barbearias/${seo.ufSlug}/${seo.citySlug}/${n.slug}`"
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-gray-400 bg-white/[.04] border border-white/[.06] hover:border-green-400/30 hover:text-green-400 transition-colors"
                  >{{ n.name }}</NuxtLink>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
          <div class="max-w-6xl mx-auto">
            <span class="text-xs font-bold tracking-widest uppercase text-green-400">Por que usar</span>
            <h2 class="mt-3 mb-10 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,56px)">
              O QUE MUDA PRA UM BARBEIRO DE<br><span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div v-for="(benefit, i) in benefits" :key="i" class="group relative overflow-hidden rounded-2xl border border-green-400/10 bg-[#181818] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-green-400/40">
                <div class="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-green-400 to-emerald-300"></div>
                <div class="text-2xl mb-4">{{ benefit.emoji }}</div>
                <h3 class="text-[16px] font-bold mb-2 text-white">{{ benefit.title }}</h3>
                <p class="text-[14px] leading-relaxed text-gray-500">{{ benefit.desc }}</p>
              </div>
            </div>
          </div>
        </section>
      </template>

      <!-- CTA FINAL -->
      <section class="relative w-full py-24 px-6 md:px-16 bg-[#111] text-center overflow-hidden">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"></div>
        <div class="relative max-w-xl mx-auto">
          <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Barbearias em {{ seo?.neighborhoodName ?? neighborhoodLabel }}</span>
          <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
            SUA BARBEARIA<br>NO <span class="text-green-400">GOOGLE</span> EM 5 MIN
          </h2>
          <p class="mb-8 text-[17px] leading-relaxed text-gray-400">
            Barbeiros em {{ seo?.neighborhoodName ?? neighborhoodLabel }} que usam a SuaAgenda aparecem quando alguém busca "barbearia em {{ seo?.neighborhoodName ?? neighborhoodLabel }}" no Google — sem pagar anúncio.
          </p>
          <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-400 text-black text-xl font-bold shadow transition hover:bg-green-300 hover:scale-105">
            ✂️ Testar grátis por 7 dias
          </a>
          <div class="flex items-center justify-center flex-wrap gap-5 mt-6 text-sm text-gray-600">
            <span>🔒 Sem cartão</span><span>⚡ 5 minutos</span><span>✓ Cancela quando quiser</span>
          </div>
        </div>
      </section>
    </div>

    <!-- ════════════════════════════ FALLBACK ════════════════════════════════
         Bairro sem shops (ou nível district/city/uf como fallback)
         Mostra BarbershopCards reais dos bairros mais próximos
    ════════════════════════════════════════════════════════════════════════ -->
    <div v-else class="min-h-screen bg-[#0a0a0a] pt-28">

      <!-- Breadcrumb -->
      <div class="px-6 md:px-16 pb-6 border-b border-white/5">
        <div class="max-w-6xl mx-auto">
          <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
            <span class="text-gray-700">/</span>
            <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
            <span class="text-gray-700">/</span>
            <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}`" class="hover:text-green-400 transition-colors">{{ fallback.cityLabel }}</NuxtLink>
            <span class="text-gray-700">/</span>
            <span class="text-gray-600">{{ neighborhoodLabel }}</span>
          </nav>
        </div>
      </div>

      <!-- Hero -->
      <section class="relative w-full py-16 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden border-b border-white/[.04]">
        <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 60% 50% at 60% 50%,rgba(52,211,153,.05) 0%,transparent 70%)"></div>
        <div class="relative max-w-6xl mx-auto">
          <h1 class="font-black leading-none mb-4 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,5vw,64px);letter-spacing:.03em">
            BARBEARIAS PRÓXIMAS DE<br>
            <span class="text-green-400">{{ neighborhoodLabel.toUpperCase() }}</span>
          </h1>
          <p class="text-lg text-gray-400 max-w-2xl leading-relaxed">
            <template v-if="fallback.level.value === 'district'">
              Ainda não temos barbearias cadastradas em <strong class="text-white">{{ neighborhoodLabel }}</strong>,
              mas encontramos profissionais nos bairros vizinhos de
              <strong class="text-white">{{ fallback.districtLabel || fallback.cityLabel }}</strong>.
            </template>
            <template v-else-if="fallback.level.value === 'city'">
              Ainda não temos barbearias neste bairro. Veja os profissionais mais próximos em
              <strong class="text-white">{{ fallback.cityLabel }}</strong>.
            </template>
            <template v-else-if="fallback.level.value === 'uf'">
              Ainda não temos cobertura nessa cidade. Confira barbearias no estado.
            </template>
            <template v-else>
              Essa região ainda não está no nosso mapa.
            </template>
          </p>
        </div>
      </section>

      <div class="px-6 md:px-16 py-14">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <!-- Coluna principal -->
            <div class="lg:col-span-2 space-y-14">

              <!-- Skeleton -->
              <div v-if="fallback.pending.value" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="i in 6" :key="i" class="h-64 rounded-2xl bg-[#111] animate-pulse border border-white/[.04]" />
              </div>

              <!-- Cards reais (bairros vizinhos / cidade / uf) -->
              <template v-else-if="fallback.shops.value.length > 0">
                <div>
                  <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-1 flex items-center gap-2">
                    <span class="w-4 h-px bg-green-400/40 inline-block" />
                    <template v-if="fallback.level.value === 'district'">
                      Barbearias em {{ fallback.districtLabel || fallback.cityLabel }}
                    </template>
                    <template v-else-if="fallback.level.value === 'city'">
                      Barbearias em {{ fallback.cityLabel }}
                    </template>
                    <template v-else>Barbearias no estado</template>
                  </p>
                  <p class="text-[13px] text-gray-600 mb-6">
                    Profissionais que atendem próximo a <strong class="text-gray-400">{{ neighborhoodLabel }}</strong>
                  </p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <BarbershopCard
                      v-for="shop in fallback.shops.value"
                      :key="shop.id"
                      :shop="shop"
                    />
                  </div>
                </div>
              </template>

              <!-- Vazio total -->
              <template v-else>
                <div class="flex flex-wrap gap-4">
                  <NuxtLink to="/barbearias" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-400/30 text-sm transition-all">
                    ← Ver todas as regiões
                  </NuxtLink>
                  <a href="https://wa.me/5511941649284" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-400 text-black text-sm font-bold transition hover:bg-green-300">
                    ✂️ Cadastrar minha barbearia
                  </a>
                </div>
              </template>

              <!-- Outros bairros com barbearias -->
              <div v-if="fallback.nearbyNeighborhoods.value.length">
                <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-4 flex items-center gap-2">
                  <span class="w-4 h-px bg-green-400/40 inline-block" />
                  Outros bairros com barbearias
                </p>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="n in fallback.nearbyNeighborhoods.value" :key="n.slug"
                    :to="`/barbearias/${ufSlug}/${citySlug}/${n.slug}`"
                    class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/40 hover:text-green-400 hover:bg-green-400/[.03] text-sm text-gray-400 transition-all duration-150"
                  >
                    📍 {{ n.name }}
                    <span v-if="n.count" class="text-gray-600 text-xs">({{ n.count }})</span>
                  </NuxtLink>
                </div>
              </div>

              <!-- Serviços disponíveis na região -->
              <div v-if="fallback.relatedServices.value.length">
                <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4 flex items-center gap-2">
                  <span class="w-4 h-px bg-gray-700 inline-block" />
                  Serviços disponíveis na região
                </p>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="s in fallback.relatedServices.value" :key="s.slug"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:bg-green-400/[.03] hover:text-white text-sm text-gray-400 transition-all duration-150"
                    @click="$router.push(`/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}/s/${s.slug}`)"
                  >
                    {{ s.emoji ?? '✂️' }} {{ s.name }}
                    <span v-if="s.count" class="text-gray-600 text-xs">({{ s.count }})</span>
                  </button>
                </div>
              </div>

              <NuxtLink
                :to="`/barbearias/${ufSlug}/${citySlug}`"
                class="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Ver todos os bairros em {{ fallback.cityLabel }} →
              </NuxtLink>
            </div>

            <!-- Sidebar CTA -->
            <aside>
              <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-7 relative overflow-hidden sticky top-24">
                <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
                <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">Você é barbeiro?</p>
                <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:26px">COLOCA SEU BAIRRO NO MAPA</h3>
                <p class="text-[13px] text-gray-400 leading-relaxed mb-5">
                  Cadastre sua barbearia em <strong class="text-white">{{ neighborhoodLabel }}</strong> e apareça no Google quando alguém buscar aqui.
                </p>
                <a href="https://wa.me/5511941649284" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300">
                  🔥 Testar 7 dias grátis
                </a>
                <p class="text-xs text-center text-gray-600 mt-3">Sem cartão de crédito · Cancela quando quiser</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed }               from 'vue'
import { useRoute }               from 'vue-router'
import { useLocalSeo }            from '~/composables/useLocalSeo'
import { useFallbackSuggestions } from '~/composables/useFallbackSuggestions'

definePageMeta({ layout: 'barber' })

const nuxtApp = useNuxtApp()
if (import.meta.server) nuxtApp.payload.layout = 'barber'

const route = useRoute()
const ufSlug           = (route.params.uf     as string).toLowerCase().trim()
const citySlug         = (route.params.cidade as string).toLowerCase().trim()
const neighborhoodSlug = (route.params.bairro as string).toLowerCase().trim()

const neighborhoodLabel = neighborhoodSlug.replace(/-/g, ' ')

// SEO completo (só resolve quando bairro está no locations mapeado)
const { data: seo } = useLocalSeo(ufSlug, citySlug, neighborhoodSlug)

// ✅ Fallback: hierarquia bairro → distrito → cidade → uf
const fallback = useFallbackSuggestions({ ufSlug, citySlug, neighborhoodSlug, limit: 6 })

// ✅ CRÍTICO: executa no onMounted do componente
onMounted(() => {
  fallback.execute()
})

// Mostra página completa quando:
//   (a) seo resolvido (bairro no locations com dados completos), OU
//   (b) o banco tem shops neste bairro exato (nível 'neighborhood')
const showFullPage = computed(() =>
  !!seo.value ||
  (fallback.level.value === 'neighborhood' && fallback.shops.value.length > 0)
)

// ── Dados estáticos da página completa ───────────────────────────────────────

const howItWorks = computed(() => {
  const name = seo.value?.neighborhoodName ?? neighborhoodLabel
  return [
    {
      title: 'Cria a conta em 2 minutos',
      desc:  `Só o nome da barbearia e o endereço em ${name}. O sistema monta a estrutura do site automaticamente.`,
    },
    {
      title: 'Confirma os serviços pré-preenchidos',
      desc:  'Corte, barba, combo já estão lá. A disponibilidade dos profissionais também vem configurada pelo horário de funcionamento.',
    },
    {
      title: 'Informa o WhatsApp pra receber agendamentos',
      desc:  'Cada novo agendamento chega direto no seu celular — enquanto você está cortando cabelo.',
    },
    {
      title: 'Site no ar e Google indexando',
      desc:  `A tecnologia exclusiva da SuaAgenda coloca sua barbearia nas primeiras posições quando alguém busca "barbearia em ${name}".`,
    },
  ]
})

const localStats = [
  { num: '5min', label: 'Pra estar no ar' },
  { num: '500+', label: 'Barbearias ativas' },
  { num: 'R$79', label: 'Por mês' },
]

const benefits = computed(() => {
  const name     = seo.value?.neighborhoodName ?? neighborhoodLabel
  const district = seo.value?.districtName     ?? fallback.districtLabel ?? fallback.cityLabel
  return [
    {
      emoji: '📍',
      title: `Apareça quando buscam barbearia em ${name}`,
      desc:  'A tecnologia de SEO local da SuaAgenda coloca sua barbearia nas primeiras posições do Google para buscas do seu bairro.',
    },
    {
      emoji: '📱',
      title: 'Agendamento direto no WhatsApp',
      desc:  'Cliente clica no link, escolhe horário e confirma — sem você largar a tesoura. Notificação chega no seu celular na hora.',
    },
    {
      emoji: '✅',
      title: 'Confirmação automática anti-furo',
      desc:  'Sistema pede confirmação via WhatsApp. Não respondeu? Horário volta pra agenda e chama o próximo da fila automaticamente.',
    },
    {
      emoji: '🚀',
      title: 'No ar em 5 minutos',
      desc:  'Serviços e disponibilidade já vêm pré-preenchidos. Você só confirma o que usa — sem técnico, sem treinamento.',
    },
    {
      emoji: '📊',
      title: 'Portal de descoberta regional',
      desc:  `Sua barbearia também aparece no portal da SuaAgenda, onde clientes da região de ${district} buscam barbeiros perto deles.`,
    },
    {
      emoji: '💬',
      title: 'WhatsApp oficial (parceiro Facebook)',
      desc:  'Somos parceiros oficiais do Facebook. As mensagens saem pela API oficial — chegam de verdade, não caem em spam.',
    },
  ]
})

// ── Head ─────────────────────────────────────────────────────────────────────

const OG_FALLBACK = 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/barber-og_rgvr3h.jpg'

useHead(computed(() => {
  // Fallback com shops encontrados: noindex mas com dados úteis
  if (!seo.value && fallback.shops.value.length > 0) {
    return {
      title: `Barbearias perto de ${neighborhoodLabel} — ${fallback.cityLabel}`,
      meta: [
        { name: 'description', content: `Encontre barbearias próximas de ${neighborhoodLabel} em ${fallback.cityLabel} com agendamento online pelo WhatsApp.` },
        { name: 'robots',      content: 'noindex, follow' },
      ],
    }
  }
  // Fallback vazio: noindex + nofollow
  if (!seo.value) {
    return {
      title: `Barbearias perto de ${neighborhoodLabel}`,
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    }
  }
  // Página completa com SEO
  return {
    title: seo.value.metaTitle,
    meta: [
      { name: 'description',        content: seo.value.metaDescription },
      { property: 'og:title',       content: seo.value.metaTitle },
      { property: 'og:description', content: seo.value.metaDescription },
      { property: 'og:url',         content: seo.value.canonicalUrl },
      { property: 'og:type',        content: 'website' },
      { property: 'og:image',       content: OG_FALLBACK },
      { property: 'fb:app_id',      content: '1288931335787890' },
      { name: 'twitter:card',       content: 'summary_large_image' },
      { name: 'robots',             content: 'index, follow' },
    ],
    link:   [{ rel: 'canonical', href: seo.value.canonicalUrl }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(seo.value.jsonLd) }],
  }
}))
</script>