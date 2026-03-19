<template>
  <div>
    <!-- ✅ FIX: isolation:isolate cria um novo stacking context
         impedindo que o Leaflet vaze z-index pro nav fixo (z-50).
         position:relative + z-index:0 garante que o mapa fique
         dentro da sua própria camada. -->
    <div
      ref="mapEl"
      class="w-full rounded-2xl overflow-hidden border border-white/[.06] map-container"
      :style="{ height: height + 'px' }"
    />

    <!-- Botões de ação -->
    <div class="flex flex-wrap gap-3 mt-4">
      <a
        :href="googleMapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-400 text-black text-sm font-bold hover:bg-green-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
        </svg>
        Como chegar
      </a>

      <a
        v-if="wazeUrl"
        :href="wazeUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-white/20 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.54 6.63C19.3 4.19 16.96 2.4 14.2 2.07 10.5 1.63 7.1 3.84 5.8 7.3c-.47 1.22-.55 2.55-.27 3.84L4.3 13.5c-.18.4-.05.87.33 1.12l1.5.98c.1.87.42 1.72.94 2.45L6.5 19.5c-.1.44.07.9.44 1.15.37.25.84.25 1.2-.01l1.56-1.04c.7.28 1.44.43 2.19.44l.12.01c.76 0 1.5-.14 2.2-.4l1.58 1.03c.37.24.84.23 1.2-.02.36-.25.53-.7.43-1.14l-.5-2.35c1.2-1.42 1.9-3.2 1.9-5.07 0-.4-.03-.8-.1-1.18l1.5-.97c.39-.25.52-.73.32-1.13zM12 17.5c-.94 0-1.82-.24-2.58-.66L8 18l.48-2.24A5.49 5.49 0 0 1 6.5 11.5C6.5 8.46 9 6 12 6s5.5 2.46 5.5 5.5-2.5 5.5-5.5 5.5zm1-8.5h-2v3h2zm0 4h-2v2h2z"/>
        </svg>
        Waze
      </a>

      <button
        v-if="address"
        class="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-white/20 hover:text-white transition-colors"
        @click="copyAddress"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>
        </svg>
        {{ copied ? 'Copiado!' : 'Copiar endereço' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  lat:      number
  lng:      number
  name:     string
  address?: string | null
  height?:  number
}>()

const height = props.height ?? 280
const mapEl  = ref<HTMLElement | null>(null)
const copied = ref(false)

// URLs externas
const googleMapsUrl = computed(() => {
  if (props.lat && props.lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${props.lat},${props.lng}`
  }
  return `https://www.google.com/maps/search/${encodeURIComponent(props.address ?? props.name)}`
})

const wazeUrl = computed(() =>
  props.lat && props.lng
    ? `https://waze.com/ul?ll=${props.lat},${props.lng}&navigate=yes`
    : null
)

async function copyAddress() {
  if (!props.address) return
  await navigator.clipboard.writeText(props.address)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

// ── Leaflet ────────────────────────────────────────────────────────────────
let map: any = null
let L: any   = null

onMounted(async () => {
  if (!mapEl.value || !props.lat || !props.lng) return

  try {
    L = (await import('leaflet')).default

    // Ícone personalizado dark
    const icon = L.divIcon({
      className: '',
      html: `
        <div style="
          width:36px;height:36px;
          background:#4ade80;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          border:3px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,.4);
        ">
          <div style="
            transform:rotate(45deg);
            width:100%;height:100%;
            display:flex;align-items:center;justify-content:center;
            font-size:16px;
          ">✂️</div>
        </div>
      `,
      iconSize:    [36, 36],
      iconAnchor:  [18, 36],
      popupAnchor: [0, -38],
    })

    map = L.map(mapEl.value, {
      center:             [props.lat, props.lng],
      zoom:               16,
      zoomControl:        true,
      attributionControl: false,
    })

    // Tile escuro combinando com o dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map)

    L.marker([props.lat, props.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'DM Sans',sans-serif;min-width:160px">
          <p style="font-weight:700;font-size:14px;margin:0 0 4px">${props.name}</p>
          ${props.address ? `<p style="font-size:12px;color:#9ca3af;margin:0">${props.address}</p>` : ''}
        </div>
      `)
      .openPopup()

  } catch (e) {
    console.warn('Leaflet não disponível:', e)
  }
})

onUnmounted(() => {
  if (map) { map.remove(); map = null }
})
</script>

<style scoped>
/*
  ✅ FIX PRINCIPAL: isolation:isolate cria um novo stacking context para o mapa.
  Isso impede que os elementos internos do Leaflet (tiles, controles, popups)
  compitam com o z-index do nav fixo (z-50 = z-index:50 no Tailwind).

  O Leaflet usa z-index 400~600 internamente nos seus layers, mas dentro
  de um stacking context isolado esses valores não "escapam" para o
  stacking context raiz — ficam contidos no próprio container do mapa.
*/
.map-container {
  position: relative;
  z-index: 0;
  isolation: isolate;
}

/*
  Garante que o pane de tiles e o pane de overlays do Leaflet
  fiquem dentro do container e não criem stacking context próprio
  fora dele.
*/
.map-container :deep(.leaflet-pane),
.map-container :deep(.leaflet-top),
.map-container :deep(.leaflet-bottom) {
  z-index: auto;
}

.map-container :deep(.leaflet-tile-pane)    { z-index: 2; }
.map-container :deep(.leaflet-shadow-pane)  { z-index: 5; }
.map-container :deep(.leaflet-overlay-pane) { z-index: 4; }
.map-container :deep(.leaflet-marker-pane)  { z-index: 6; }
.map-container :deep(.leaflet-tooltip-pane) { z-index: 7; }
.map-container :deep(.leaflet-popup-pane)   { z-index: 8; }
.map-container :deep(.leaflet-control)      { z-index: 9; }
</style>