<!-- Raiz do preview: espelho de white-label/layouts/default.vue.
     Header + página + Footer, com o tema do WL (utils/theme.ts, mesma
     resolveTheme) aplicado como variáveis CSS NESTE elemento — nunca no :root
     da landing. É o container das container queries (site-preview.css): o
     "mobile/desktop" do preview é a largura desta caixa, não da janela.
     Quem troca a página (e depois a moldura, o configurador) é o PreviewFrame
     da etapa 4: aqui `page` é prop e os links só emitem `navigate`. -->
<template>
  <div class="sp-root" :style="rootStyle" :data-scheme="tokens.scheme">
    <div class="sp-layout">
      <PreviewHeader :name="site.name" :logo="site.logo" :page="page" @navigate="navigate" />
      <main class="sp-main">
        <PreviewHome v-if="page === 'inicio'" :site="site" />
        <PreviewAbout v-else-if="page === 'sobre'" :site="site" @navigate="navigate" />
        <PreviewLocation v-else :site="site" />
      </main>
      <PreviewFooter :site="site" :year="footerYear" />
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/site-preview.css'
import { computed } from 'vue'
import PreviewHeader from './PreviewHeader.vue'
import PreviewHome from './PreviewHome.vue'
import PreviewAbout from './PreviewAbout.vue'
import PreviewLocation from './PreviewLocation.vue'
import PreviewFooter from './PreviewFooter.vue'
import { presetBrandColors, resolveTheme, themeToCssVars, type WebsiteTheme } from '~/utils/theme'
import type { PreviewPage, PreviewSiteData } from '~/utils/sitePreview'

const props = withDefaults(defineProps<{
  site: PreviewSiteData
  /** websites.theme (preset/fonte/raio); cores da marca à parte. */
  theme?: WebsiteTheme
  /** websites.primaryColor — vence o primary do preset, como no WL. */
  primaryColor?: string | null
  /** websites.secondaryColor (2ª cor do degradê); sem ela, a do preset. */
  secondaryColor?: string | null
  page?: PreviewPage
  footerYear?: number
}>(), { theme: () => ({}), primaryColor: null, secondaryColor: null, page: 'inicio', footerYear: undefined })

const emit = defineEmits<{ navigate: [page: PreviewPage] }>()

// Igual ao editor do admin: aplicar um estilo grava as cores dele nas colunas
// primary/secondary (presetBrandColors); primaryColor do usuário vence.
const tokens = computed(() => {
  const brand = presetBrandColors(props.theme.preset ?? 'moderno')
  return resolveTheme({
    theme: props.theme,
    primaryColor: props.primaryColor || brand.primaryColor,
    secondaryColor: props.secondaryColor || brand.secondaryColor,
  })
})

const rootStyle = computed(() => ({
  ...themeToCssVars(tokens.value),
  colorScheme: tokens.value.scheme,
}))

function navigate(page: PreviewPage) {
  emit('navigate', page)
}
</script>
