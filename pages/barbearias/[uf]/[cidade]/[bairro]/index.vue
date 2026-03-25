<!-- pages/barbearias/[uf]/[cidade]/[bairro]/index.vue -->
<template>
  <!-- ───────────────────────────── PÁGINA NORMAL ───────────────────────────── -->
  <div v-if="seo" class="text-[15px]">

    <!-- BREADCRUMB -->
    <section class="pt-28 pb-6 px-6 md:px-16 bg-[#0a0a0a] border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink :to="`/barbearias/${seo.ufSlug}/${seo.citySlug}`" class="hover:text-green-400 transition-colors">{{ seo.cityName }}</NuxtLink>
          <span class="text-gray-700">/</span>
          <span class="text-gray-400">{{ seo.neighborhoodName }}</span>
        </nav>
      </div>
    </section>

    <!-- HERO LOCAL -->
    <section class="relative w-full py-20 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 55% 50% at 70% 50%,rgba(52,211,153,.07) 0%,transparent 70%)"></div>
      <div class="relative max-w-6xl mx-auto">
        <div class="flex flex-wrap gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20">
            ✂️ {{ seo.districtName }}
          </span>
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[.04] border border-white/[.06]">
            📍 {{ seo.cityName }}
          </span>
        </div>
        <h1 class="font-black leading-none mb-6 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);letter-spacing:.03em">
          BARBEARIA PERTO DE MIM EM<br>
          <span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">{{ seo.introParagraph }}</p>
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

    <!-- BUSCA + CARDS -->
    <div class="bg-[#0a0a0a]">
      <PageSearchSection
        :uf="seo.ufSlug"
        :city="seo.citySlug"
        :neighborhood="neighborhoodSlug"
        :context-label="seo.neighborhoodName"
      />
    </div>

    <!-- CONTEÚDO SEO PRINCIPAL -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#111]">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        <!-- Texto principal -->
        <div class="lg:col-span-2 space-y-8">
          <div class="rounded-2xl border border-green-400/10 bg-[#181818] p-8">
            <h2 class="font-black leading-none mb-4 text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,40px)">
              AGENDA ONLINE PARA BARBEIROS EM <span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span>
            </h2>
            <p class="text-[16px] leading-relaxed text-gray-400 mb-4">{{ seo.secondParagraph }}</p>
            <p class="text-[16px] leading-relaxed text-gray-400">{{ seo.thirdParagraph }}</p>
          </div>

          <!-- Como funciona -->
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

          <!-- Stats locais -->
          <div class="grid grid-cols-3 gap-4">
            <div v-for="stat in localStats" :key="stat.label" class="rounded-xl border border-green-400/10 bg-[#181818] p-5 text-center">
              <p class="font-black text-green-400 leading-none mb-1" style="font-family:'Bebas Neue',sans-serif;font-size:36px">{{ stat.num }}</p>
              <p class="text-xs text-gray-500">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-7 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
            <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">Você é barbeiro?</p>
            <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:28px">APAREÇA NO GOOGLE EM 5 MIN</h3>
            <p class="text-[14px] text-gray-400 leading-relaxed mb-5">Cria sua conta, confirma os serviços e já tem site profissional nas primeiras posições do Google — sem mexer em nada técnico.</p>
            <a href="https://wa.me/5511941649284" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300">
              🔥 Testar 7 dias grátis
            </a>
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

    <!-- BENEFÍCIOS LOCAIS -->
    <section class="w-full py-20 px-6 md:px-16 bg-[#0a0a0a]">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400">Por que usar</span>
        <h2 class="mt-3 mb-10 font-black leading-none text-white" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,56px)">
          O QUE MUDA PRA UM BARBEIRO DE<br><span class="text-green-400">{{ seo.neighborhoodName.toUpperCase() }}</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(benefit, i) in benefits" :key="i"
            class="group relative overflow-hidden rounded-2xl border border-green-400/10 bg-[#181818] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-green-400/40"
          >
            <div class="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-green-400 to-emerald-300"></div>
            <div class="text-2xl mb-4">{{ benefit.emoji }}</div>
            <h3 class="text-[16px] font-bold mb-2 text-white">{{ benefit.title }}</h3>
            <p class="text-[14px] leading-relaxed text-gray-500">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="relative w-full py-24 px-6 md:px-16 bg-[#111] text-center overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle 300px at 50% 50%,rgba(52,211,153,.06),transparent)"></div>
      <div class="relative max-w-xl mx-auto">
        <span class="text-xs font-bold tracking-widest uppercase text-green-400 block mb-4">Barbearias em {{ seo.neighborhoodName }}</span>
        <h2 class="font-black leading-none text-white mb-4" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px)">
          SUA BARBEARIA<br>NO <span class="text-green-400">GOOGLE</span> EM 5 MIN
        </h2>
        <p class="mb-8 text-[17px] leading-relaxed text-gray-400">
          Barbeiros em {{ seo.neighborhoodName }} que usam a SuaAgenda aparecem quando alguém busca "barbearia em {{ seo.neighborhoodName }}" no Google — sem pagar anúncio.
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

  <!-- ─────────────────────────── FALLBACK 404 ─────────────────────────────── -->
  <!--
    Chegou aqui porque o bairro não está mapeado no locations.ts.
    Tentamos aproveitar o lead mostrando bairros da mesma cidade/distrito.
    Três níveis de fallback:
      1. Bairros do mesmo distrito (mais relevante)
      2. Bairros da mesma cidade (cidade existe mas distrito não)
      3. Link geral pra /barbearias (cidade também não existe)
  -->
  <div v-else class="min-h-screen bg-[#0a0a0a] pt-28">

    <!-- Breadcrumb mínimo mesmo no 404 -->
    <div class="px-6 md:px-16 pb-6 border-b border-white/5">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <NuxtLink to="/" class="hover:text-green-400 transition-colors">Início</NuxtLink>
          <span class="text-gray-700">/</span>
          <NuxtLink to="/barbearias" class="hover:text-green-400 transition-colors">Barbearias</NuxtLink>
          <template v-if="fallbackCity">
            <span class="text-gray-700">/</span>
            <NuxtLink :to="`/barbearias/${ufSlug}/${citySlug}`" class="hover:text-green-400 transition-colors">
              {{ fallbackCity.city }}
            </NuxtLink>
          </template>
          <span class="text-gray-700">/</span>
          <span class="text-gray-600">{{ neighborhoodSlug }}</span>
        </nav>
      </div>
    </div>

    <div class="px-6 md:px-16 py-20">
      <div class="max-w-6xl mx-auto">

        <!-- Cabeçalho do 404 -->
        <div class="mb-14">
          <p class="font-black text-green-400/10 leading-none mb-2 select-none" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(80px,15vw,160px)">404</p>
          <h1 class="text-2xl md:text-3xl font-black text-white mb-3" style="font-family:'Bebas Neue',sans-serif">
            BAIRRO NÃO MAPEADO AINDA
          </h1>
          <p class="text-gray-400 text-[16px] max-w-lg">
            <template v-if="fallbackCity">
              Ainda não temos barbearias cadastradas em <strong class="text-white">{{ neighborhoodSlug.replace(/-/g, ' ') }}</strong>,
              mas encontramos opções perto de você em <strong class="text-white">{{ fallbackCity.city }}</strong>.
            </template>
            <template v-else>
              Esse bairro ainda não está no nosso mapa. Explore outras regiões ou cadastre sua barbearia.
            </template>
          </p>
        </div>

        <!-- ── Caso 1 & 2: cidade existe → mostra bairros ── -->
        <template v-if="fallbackCity">

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <!-- Bairros sugeridos -->
            <div class="lg:col-span-2 space-y-10">

              <!-- Bairros do mesmo distrito (mais próximos) -->
              <div v-if="fallbackSameDistrict.length">
                <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-4 flex items-center gap-2">
                  <span class="w-4 h-px bg-green-400/40 inline-block"/>Bairros do mesmo distrito
                </p>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="n in fallbackSameDistrict" :key="n.slug"
                    :to="`/barbearias/${ufSlug}/${citySlug}/${n.slug}`"
                    class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/40 hover:text-green-400 hover:bg-green-400/[.03] text-sm text-gray-400 transition-all duration-150"
                  >📍 {{ n.name }}</NuxtLink>
                </div>
              </div>

              <!-- Outros bairros da cidade -->
              <div v-if="fallbackOtherNeighborhoods.length">
                <p class="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4 flex items-center gap-2">
                  <span class="w-4 h-px bg-gray-700 inline-block"/>Outros bairros em {{ fallbackCity.city }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="n in fallbackOtherNeighborhoods" :key="n.slug"
                    :to="`/barbearias/${ufSlug}/${citySlug}/${n.slug}`"
                    class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[.06] bg-[#181818] hover:border-green-400/30 hover:text-green-400 text-sm text-gray-500 transition-all duration-150"
                  >📍 {{ n.name }}</NuxtLink>
                </div>
              </div>

              <NuxtLink
                :to="`/barbearias/${ufSlug}/${citySlug}`"
                class="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Ver todos os bairros em {{ fallbackCity.city }} →
              </NuxtLink>
            </div>

            <!-- Sidebar CTA — aproveita o tráfego orgânico -->
            <aside>
              <div class="rounded-2xl border-2 border-green-400 bg-[#181818] p-7 relative overflow-hidden sticky top-24">
                <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-300"></div>
                <p class="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">Você é barbeiro?</p>
                <h3 class="font-black leading-none text-white mb-3" style="font-family:'Bebas Neue',sans-serif;font-size:26px">
                  COLOCA SEU BAIRRO NO MAPA
                </h3>
                <p class="text-[13px] text-gray-400 leading-relaxed mb-5">
                  Cadastre sua barbearia em {{ neighborhoodSlug.replace(/-/g, ' ') }} e apareça no Google quando alguém buscar aqui.
                </p>
                <a
                  href="https://wa.me/5511941649284"
                  class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-400 text-black text-[15px] font-bold transition hover:bg-green-300"
                >
                  🔥 Testar 7 dias grátis
                </a>
                <p class="text-xs text-center text-gray-600 mt-3">Sem cartão de crédito · Cancela quando quiser</p>
              </div>
            </aside>
          </div>
        </template>

        <!-- ── Caso 3: cidade também não existe → CTA geral ── -->
        <template v-else>
          <div class="flex flex-col items-center text-center gap-6 py-10">
            <p class="text-gray-500 text-[15px]">Essa região ainda não está mapeada.</p>
            <div class="flex flex-wrap gap-4 justify-center">
              <NuxtLink to="/barbearias" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-400/30 text-sm transition-all">
                ← Ver todas as regiões
              </NuxtLink>
              <a
                href="https://wa.me/5511941649284"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-400 text-black text-sm font-bold transition hover:bg-green-300"
              >
                ✂️ Cadastrar minha barbearia
              </a>
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalSeo } from '~/composables/useLocalSeo'
import { allCities, type CityData, type Neighborhood } from '~/data/locations'

definePageMeta({ layout: 'barber' })

const route = useRoute()

const ufSlug           = (route.params.uf     as string).toLowerCase().trim()
const citySlug         = (route.params.cidade as string).toLowerCase().trim()
const neighborhoodSlug = (route.params.bairro as string).toLowerCase().trim()

const { data: seo } = useLocalSeo(ufSlug, citySlug, neighborhoodSlug)

// ─────────────────────────────────────────────────────────────────
// Fallback 404 — só entra quando seo === null
// ─────────────────────────────────────────────────────────────────

// Cidade existe mas bairro não foi mapeado
const fallbackCity = computed<CityData | null>(() =>
  allCities.find(c => c.ufSlug === ufSlug && c.citySlug === citySlug) ?? null
)

// Tenta achar o distrito mais provável pelo prefixo do slug
// ex: "vila-mariana-norte" → tenta bater com distrito que tenha "vila-mariana" nos slugs dos bairros
const fallbackDistrict = computed(() => {
  if (!fallbackCity.value) return null
  const prefix = neighborhoodSlug.split('-').slice(0, 2).join('-')
  return (
    fallbackCity.value.districts.find(d =>
      d.neighborhoods.some(n => n.slug.startsWith(prefix))
    ) ??
    // fallback: primeiro distrito com mais bairros (geralmente o principal)
    [...fallbackCity.value.districts].sort(
      (a, b) => b.neighborhoods.length - a.neighborhoods.length
    )[0] ??
    null
  )
})

// Bairros do mesmo distrito — até 16, sem o slug atual
const fallbackSameDistrict = computed<Neighborhood[]>(() => {
  if (!fallbackDistrict.value) return []
  return fallbackDistrict.value.neighborhoods
    .filter(n => n.slug !== neighborhoodSlug)
    .slice(0, 16)
})

// Outros bairros da cidade (excluindo os do distrito já mostrado) — até 20
const fallbackOtherNeighborhoods = computed<Neighborhood[]>(() => {
  if (!fallbackCity.value) return []
  const districtSlug = fallbackDistrict.value?.slug
  return fallbackCity.value.districts
    .filter(d => d.slug !== districtSlug)
    .flatMap(d => d.neighborhoods)
    .slice(0, 20)
})

// ─────────────────────────────────────────────────────────────────
// Dados da página normal
// ─────────────────────────────────────────────────────────────────

const howItWorks = computed(() => [
  {
    title: 'Cria a conta em 2 minutos',
    desc:  `Só o nome da barbearia e o endereço em ${seo.value?.neighborhoodName}. O sistema monta a estrutura do site automaticamente.`,
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
    desc:  `A tecnologia exclusiva da SuaAgenda coloca sua barbearia nas primeiras posições quando alguém busca "barbearia em ${seo.value?.neighborhoodName}".`,
  },
])

const localStats = [
  { num: '5min', label: 'Pra estar no ar' },
  { num: '500+', label: 'Barbearias ativas' },
  { num: 'R$79', label: 'Por mês' },
]

const benefits = computed(() => [
  {
    emoji: '📍',
    title: `Apareça quando buscam barbearia em ${seo.value?.neighborhoodName}`,
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
    desc:  `Sua barbearia também aparece no portal da SuaAgenda, onde clientes da região de ${seo.value?.districtName} buscam barbeiros perto deles.`,
  },
  {
    emoji: '💬',
    title: 'WhatsApp oficial (parceiro Facebook)',
    desc:  'Somos parceiros oficiais do Facebook. As mensagens saem pela API oficial — chegam de verdade, não caem em spam.',
  },
])

// ─────────────────────────────────────────────────────────────────
// Head
// ─────────────────────────────────────────────────────────────────

const OG_FALLBACK = 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/barber-og_rgvr3h.jpg'

useHead(computed(() => {
  // 404 com cidade encontrada
  if (!seo.value && fallbackCity.value) {
    const city = fallbackCity.value
    const label = neighborhoodSlug.replace(/-/g, ' ')
    return {
      title: `Barbearias perto de ${label} — ${city.city}`,
      meta: [
        { name: 'description', content: `Não encontramos barbearias em ${label}, mas veja opções em bairros próximos de ${city.city}.` },
        { name: 'robots',      content: 'noindex, follow' },
      ],
    }
  }

  // 404 sem cidade
  if (!seo.value) {
    return {
      title: 'Bairro não encontrado',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    }
  }

  // Página normal
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