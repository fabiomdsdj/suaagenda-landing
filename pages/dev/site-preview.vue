<!-- pages/dev/site-preview.vue — bancada do preview (SÓ em `nuxt dev`).
     Renderiza o PreviewSite ocupando a janela inteira, com a fixture crua da
     API (data/siteModels/fixtures/wl-fixture.json), para comparar lado a lado
     com o white-label real servido pelo mock da mesma fixture
     (scripts/site-preview-fidelity/). Fora do dev é 404 e noindex.
       ?page=inicio|sobre|como-chegar   página
       ?canBook=1                       com agenda (a fixture é "Só Site")
       ?preset=&font=&radius=           troca o tema da fixture -->
<template>
  <PreviewSite
    :site="site"
    :theme="theme"
    :primary-color="primaryColor"
    :secondary-color="secondaryColor"
    :page="page"
    @navigate="go"
  />
</template>

<script setup lang="ts">
import PreviewSite from '~/components/site-preview/PreviewSite.vue'
import fixture from '~/data/siteModels/fixtures/wl-fixture.json'
import { PREVIEW_PAGES, previewFromWlPayload, type PreviewPage, type WlPublicPayload } from '~/utils/sitePreview'
import { presetBrandColors, sanitizeTheme, type ThemePresetId } from '~/utils/theme'

if (!import.meta.dev) throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })

definePageMeta({ layout: false })
useHead({ title: 'Bancada do preview', titleTemplate: null, meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const route = useRoute()
const router = useRouter()
const q = (k: string) => (typeof route.query[k] === 'string' ? (route.query[k] as string) : '')

const page = computed<PreviewPage>(() => (PREVIEW_PAGES.find(p => p.id === q('page'))?.id ?? 'inicio'))

const payload = fixture as unknown as WlPublicPayload
const site = computed(() => {
  const data = previewFromWlPayload(payload)
  if (q('canBook')) data.canBook = q('canBook') === '1'
  return data
})

// Tema: o da fixture; ?preset= troca o estilo e, como no editor do admin,
// grava as cores dele (presetBrandColors).
const override = computed(() => sanitizeTheme({ preset: q('preset') || undefined, font: q('font') || undefined, radius: q('radius') || undefined }))
// Com ?preset= o tema é só o do estilo (fonte e raio dele), como no mock.
const theme = computed(() => (override.value.preset ? override.value : { ...sanitizeTheme(payload.website.theme), ...override.value }))
const brand = computed(() => (override.value.preset ? presetBrandColors(override.value.preset as ThemePresetId) : null))
const primaryColor = computed(() => brand.value?.primaryColor ?? payload.website.primaryColor ?? null)
const secondaryColor = computed(() => brand.value?.secondaryColor ?? payload.website.secondaryColor ?? null)

function go(next: PreviewPage) {
  router.replace({ query: { ...route.query, page: next } })
}
</script>
