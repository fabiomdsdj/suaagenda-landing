<!-- Espelho de white-label/components/common/Header.vue.
     Mesmo markup (logo ou nome em cor de link, "Sobre"/"Como chegar", menu
     mobile com ☰/✕), com os dados por props. Os links não navegam: emitem
     `navigate` para o PreviewFrame trocar a página exibida. O "mobile" é a
     largura da moldura (container query em site-preview.css), não da janela. -->
<template>
  <header class="sp-header">
    <div class="sp-container">
      <div class="sp-header__bar">
        <a href="/" class="sp-header__brand" @click.prevent="go('inicio')">
          <img v-if="logoUrl" :src="logoUrl" :alt="name || 'Logo'" class="sp-header__logo">
          <span v-else class="sp-header__name">{{ name || 'SuaAgenda' }}</span>
        </a>

        <nav class="sp-header__nav">
          <a
            v-for="link in links"
            :key="link.id"
            :href="link.path"
            class="sp-header__link"
            :aria-current="page === link.id ? 'page' : undefined"
            @click.prevent="go(link.id)"
          >{{ link.label }}</a>
        </nav>

        <button type="button" class="sp-header__toggle" @click="mobileMenuOpen = !mobileMenuOpen">
          <span v-if="!mobileMenuOpen" class="sp-header__toggle-icon">☰</span>
          <span v-else class="sp-header__toggle-icon">✕</span>
        </button>
      </div>

      <Transition name="sp-slide-down">
        <div v-if="mobileMenuOpen" class="sp-header__mobile">
          <nav class="sp-header__mobile-nav">
            <a
              v-for="link in links"
              :key="link.id"
              :href="link.path"
              class="sp-header__link"
              :aria-current="page === link.id ? 'page' : undefined"
              @click.prevent="go(link.id)"
            >{{ link.label }}</a>
          </nav>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { PREVIEW_PAGES, resolveImg, type PreviewPage } from '~/utils/sitePreview'

const props = defineProps<{
  name: string
  logo?: string | null
  page?: PreviewPage
}>()

const emit = defineEmits<{ navigate: [page: PreviewPage] }>()

// O header real só tem Sobre e Como chegar; o Início é o logo.
const links = PREVIEW_PAGES.filter(p => p.id !== 'inicio')
const logoUrl = computed(() => resolveImg(props.logo, { width: 200, height: 80, cropMode: 'fit' }))
const mobileMenuOpen = ref(false)

function go(page: PreviewPage) {
  mobileMenuOpen.value = false
  emit('navigate', page)
}
</script>
