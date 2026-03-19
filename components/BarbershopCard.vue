<template>
  <NuxtLink
    :to="cardUrl"
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[.06] bg-[#111] hover:border-green-400/30 transition-all duration-200 hover:-translate-y-0.5"
  >
    <!-- Foto de capa -->
    <div class="relative h-40 w-full overflow-hidden bg-[#181818] flex-shrink-0">
      <img
        v-if="coverSrc"
        :src="coverSrc"
        :alt="shop.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="h-full w-full flex items-center justify-center">
        <span class="text-5xl opacity-10">✂️</span>
      </div>

      <!-- Badge plano PRO -->
      <div
        v-if="isPro"
        class="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-green-400 text-black"
      >PRO</div>

      <!-- Rating flutuante -->
      <div
        v-if="googleRating"
        class="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/70 backdrop-blur text-xs font-bold text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        {{ googleRating!.toFixed(1) }}
        <span class="text-white/40 font-normal">({{ formatCount(shop.googleReviewCount) }})</span>
      </div>

      <!-- ✅ Status de funcionamento flutuante (canto inferior esquerdo da foto) -->
      <div
        v-if="opening.status !== 'closed' || opening.sublabel"
        class="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/75 backdrop-blur text-[11px] font-bold"
        :class="opening.color"
      >
        <span
          class="w-1.5 h-1.5 rounded-full flex-shrink-0"
          :class="{
            'bg-green-400 animate-pulse': opening.status === 'open',
            'bg-amber-400 animate-pulse': opening.status === 'closing_soon',
            'bg-red-400':                 opening.status === 'closed',
          }"
        />
        {{ opening.label }}
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="flex flex-col flex-1 p-4">

      <!-- Nome + bairro -->
      <div class="mb-3">
        <h3 class="font-bold text-white text-[15px] leading-snug group-hover:text-green-400 transition-colors line-clamp-1">
          {{ shop.name }}
        </h3>
        <p class="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
          </svg>
          <span class="truncate">{{ locationLabel }}</span>
        </p>
      </div>

      <!-- Serviços em chips -->
      <div v-if="topServices.length" class="flex flex-wrap gap-1.5 mb-3">
        <span
          v-for="svc in topServices"
          :key="svc.id"
          class="px-2 py-0.5 rounded-md text-[11px] text-gray-400 bg-white/[.04] border border-white/[.05]"
        >{{ svc.name }}</span>
        <span v-if="extraServicesCount > 0" class="px-2 py-0.5 rounded-md text-[11px] text-gray-600 bg-white/[.04] border border-white/[.05]">
          +{{ extraServicesCount }}
        </span>
      </div>

      <!-- Rodapé: preço + sublabel de horário + CTA -->
      <div class="mt-auto flex items-center justify-between gap-2">
        <div class="min-w-0">
          <p v-if="minPriceVal" class="text-xs text-gray-500">a partir de</p>
          <p v-if="minPriceVal" class="text-[15px] font-bold text-white">
            R$ {{ Number(minPriceVal).toFixed(2).replace('.', ',') }}
          </p>
          <p v-else class="text-xs text-gray-600 italic">Consulte valores</p>
          <!-- Sublabel do horário (ex: "Fecha em 30 min", "Abre amanhã às 9h") -->
          <p v-if="opening.sublabel" class="text-[11px] text-gray-600 mt-0.5 truncate">
            {{ opening.sublabel }}
          </p>
        </div>

        <a
          v-if="shop.whatsapp"
          :href="whatsappHref"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-400/10 border border-green-400/20 text-green-400 text-xs font-bold hover:bg-green-400 hover:text-black transition-all flex-shrink-0"
          @click.stop
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.93 11.93 0 0 0 1.64 6.06L0 24l6.17-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22c-1.84 0-3.62-.49-5.18-1.4l-.37-.22-3.66.96.98-3.57-.24-.37A9.95 9.95 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.52-7.46c-.3-.15-1.78-.88-2.06-.98s-.47-.15-.67.15-.77.98-.95 1.18-.35.22-.65.07a8.2 8.2 0 0 1-2.42-1.5 9.07 9.07 0 0 1-1.67-2.09c-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52s.2-.3.3-.5.05-.37-.02-.52-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.14.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43s.25-1.31.17-1.43-.27-.2-.57-.35Z"/>
          </svg>
          Agendar
        </a>
        <span v-else class="text-xs text-gray-600 group-hover:text-green-400 transition-colors flex-shrink-0">
          Ver mais →
        </span>
      </div>
    </div>

    <!-- Barra hover no topo -->
    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-400 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity" />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Barbershop } from '~/data/barbershops'
import { useOpeningStatus } from '~/composables/useOpeningStatus'

const props = defineProps<{ shop: Barbershop }>()

// ✅ Status de funcionamento
const opening = computed(() => useOpeningStatus(props.shop.openingHours))

const isPro = computed(() => props.shop.plan === 'pro' || props.shop.plan === 'enterprise')

const cardUrl = computed(() => {
  const { ufSlug, citySlug, neighborhoodSlug, slug } = props.shop
  if (ufSlug && citySlug && neighborhoodSlug && slug) {
    return `/barbearias/${ufSlug}/${citySlug}/${neighborhoodSlug}/${slug}`
  }
  return `/barbearias?q=${encodeURIComponent(props.shop.name)}`
})

const coverSrc = computed(() =>
  props.shop.coverImageUrl
  ?? (props.shop.photos?.length ? props.shop.photos[0] : null)
  ?? null
)

const locationLabel = computed(() => {
  const b = props.shop
  const hood =
    b.neighborhood ||
    (b.neighborhoodSlug
      ? b.neighborhoodSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : null)
  const parts = [hood, b.city].filter(Boolean)
  return parts.join(', ') || b.state || ''
})

const activeServices = computed(() =>
  (props.shop.services ?? [])
    .filter(s => s.isActive)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
)
const topServices        = computed(() => activeServices.value.slice(0, 3))
const extraServicesCount = computed(() => Math.max(0, activeServices.value.length - 3))

const minPriceVal = computed(() => {
  const prices = activeServices.value.map(s => Number(s.price)).filter(p => p > 0)
  return prices.length ? Math.min(...prices) : null
})

const googleRating = computed(() =>
  props.shop.googleRating != null ? Number(props.shop.googleRating) : null
)

const whatsappHref = computed(() => {
  if (!props.shop.whatsapp) return '#'
  const raw    = props.shop.whatsapp.replace(/\D/g, '')
  const number = raw.startsWith('55') ? raw : `55${raw}`
  const msg    = encodeURIComponent(`Olá! Vim pelo Portal SuaAgenda e gostaria de agendar um horário na ${props.shop.name}. 😊`)
  return `https://wa.me/${number}?text=${msg}`
})

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
</script>