<!-- Moldura do preview: barra com as páginas (Início · Sobre · Como chegar) e
     o modo Celular/Computador, e o PreviewSite dentro.
     O layout do site é decidido pela LARGURA DA MOLDURA (390px ou 1280px),
     via as container queries do .sp-root — nunca pela janela. Quando a
     moldura não cabe na coluna, ela é reduzida por escala (transform), sem
     mudar a largura "lógica" que o site enxerga.
     Não conhece router: página e modo são v-model (update:page/update:device). -->
<template>
  <div class="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
      <div class="flex items-center gap-1" role="group" aria-label="Página do site">
        <button
          v-for="p in PREVIEW_PAGES"
          :key="p.id"
          type="button"
          class="cfg-tab"
          :aria-pressed="page === p.id"
          :data-page="p.id"
          @click="setPage(p.id)"
        >{{ p.label }}</button>
      </div>
      <div class="flex items-center gap-1" role="group" aria-label="Tamanho da tela">
        <button
          v-for="d in DEVICES"
          :key="d.id"
          type="button"
          class="cfg-tab"
          :aria-pressed="device === d.id"
          :data-device="d.id"
          @click="$emit('update:device', d.id)"
        >{{ d.label }}</button>
      </div>
    </div>

    <div ref="stage" class="cfg-stage" :style="{ height: viewportHeight }">
      <div
        class="mx-auto"
        :style="{ width: `${frameWidth * scale}px`, height: innerHeight ? `${innerHeight * scale}px` : undefined }"
      >
        <div
          ref="inner"
          class="origin-top-left"
          :class="{ 'cfg-device-phone': device === 'mobile' }"
          :style="{ width: `${frameWidth}px`, transform: scale === 1 ? undefined : `scale(${scale})` }"
          data-preview-frame
        >
          <PreviewSite
            :site="site"
            :theme="theme"
            :primary-color="primaryColor"
            :page="page"
            @navigate="setPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PreviewSite from '~/components/site-preview/PreviewSite.vue'
import { PREVIEW_PAGES, type PreviewPage, type PreviewSiteData } from '~/utils/sitePreview'
import type { WebsiteTheme } from '~/utils/theme'
import type { PreviewDevice } from '~/composables/useSiteConfigurator'

const props = withDefaults(defineProps<{
  site: PreviewSiteData
  theme: WebsiteTheme
  primaryColor?: string | null
  page?: PreviewPage
  device?: PreviewDevice
  /** Altura visível da moldura (CSS). O site rola dentro dela. */
  viewportHeight?: string
}>(), { primaryColor: null, page: 'inicio', device: 'mobile', viewportHeight: 'min(80vh, 860px)' })

const emit = defineEmits<{
  'update:page': [page: PreviewPage]
  'update:device': [device: PreviewDevice]
}>()

const DEVICES: { id: PreviewDevice; label: string; width: number }[] = [
  { id: 'mobile', label: 'Celular', width: 390 },
  { id: 'desktop', label: 'Computador', width: 1280 },
]

const frameWidth = computed(() => DEVICES.find(d => d.id === props.device)!.width)

const stage = ref<HTMLElement | null>(null)
const inner = ref<HTMLElement | null>(null)
const available = ref(0)
const innerHeight = ref(0)
// Sem medida (SSR, 1º render) a escala é 1; o overflow do palco é escondido.
const scale = computed(() => (available.value ? Math.min(1, available.value / frameWidth.value) : 1))

let observer: ResizeObserver | null = null
onMounted(() => {
  observer = new ResizeObserver(() => {
    if (stage.value) available.value = stage.value.clientWidth
    if (inner.value) innerHeight.value = inner.value.offsetHeight
  })
  if (stage.value) observer.observe(stage.value)
  if (inner.value) observer.observe(inner.value)
})
onBeforeUnmount(() => observer?.disconnect())

function setPage(next: PreviewPage) {
  emit('update:page', next)
}

// Trocou de página ou de tela: volta ao topo do site, como uma navegação real.
watch(() => [props.page, props.device], () => {
  stage.value?.scrollTo({ top: 0 })
})
</script>
