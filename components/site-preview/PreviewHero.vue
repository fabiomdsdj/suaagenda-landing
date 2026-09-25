<!-- Espelho de white-label/components/Hero.vue.
     Sem Swiper: mostra só a primeira imagem (o WL alterna heroImages em fade).
     Sem imagem — ou imagem que não carrega — cai no gradiente da marca, como
     o WL sem heroImages — inclusive quando ela falha antes da hidratação
     (conferido no mount). A busca é só visual (no WL ela filtra a lista). -->
<template>
  <section class="sp-hero" :class="hasImage ? 'sp-hero--image' : 'sp-hero--gradient'">
    <div class="sp-hero__bg">
      <div v-if="hasImage" class="sp-hero__slide">
        <img ref="img" :src="imageUrl" :alt="`${name || 'Hero'} 1`" class="sp-hero__img" @error="imgError = true">
        <div class="sp-hero__overlay" />
      </div>
      <div v-else class="sp-hero__gradient" />
    </div>

    <div class="sp-hero__content">
      <div class="sp-container">
        <div class="sp-hero__inner">
          <h1 class="sp-hero__title">{{ heroText || name }}</h1>
          <p class="sp-hero__subtitle">
            {{ heroSubText || (canBook ? 'Escolha o serviço, profissional e horário ideal para você' : 'Conheça nossos serviços') }}
          </p>

          <div class="sp-search">
            <div class="sp-search__row">
              <svg class="sp-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input type="text" placeholder="Buscar serviços..." class="sp-search__input" tabindex="-1" readonly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { imageFailed, resolveImg } from '~/utils/sitePreview'

const props = defineProps<{
  name: string
  heroText?: string | null
  heroSubText?: string | null
  image?: string | null
  canBook: boolean
}>()

const img = ref<HTMLImageElement | null>(null)
const imgError = ref(false)
watch(() => props.image, () => { imgError.value = false })
// Imagem que falhou antes da hidratação (SSR): o @error não chega a disparar.
onMounted(() => { if (imageFailed(img.value)) imgError.value = true })

const imageUrl = computed(() => resolveImg(props.image, { width: 1600, height: 700, cropMode: 'fill' }))
const hasImage = computed(() => !!imageUrl.value && !imgError.value)
</script>
