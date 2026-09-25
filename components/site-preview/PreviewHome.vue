<!-- Espelho de white-label/pages/index.vue (Início), na ordem real das seções:
     hero → breadcrumb → banner de localização → filtros + serviços →
     divisória → profissionais → "Onde estamos" → bloco SEO local.
     O layout do WL é fixo: os modelos mudam só dados e tema, nunca a ordem. -->
<template>
  <div class="sp-page">
    <PreviewHero
      :name="site.name"
      :hero-text="site.heroText"
      :hero-sub-text="site.heroSubText"
      :image="site.heroImage"
      :can-book="site.canBook"
    />

    <!-- Breadcrumb -->
    <nav class="sp-container sp-breadcrumb" aria-label="Breadcrumb">
      <ol class="sp-breadcrumb__list">
        <li><a href="/" class="sp-breadcrumb__link" @click.prevent>Início</a></li>
      </ol>
    </nav>

    <!-- Banner de localização SEO -->
    <section v-if="texts.location" class="sp-container sp-home-banner">
      <div class="sp-home-banner__box">
        <div class="sp-home-banner__row">
          <div class="sp-icon-tile">
            <svg class="sp-icon-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_PIN" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="sp-home-banner__text">
            <h2 class="sp-home-banner__title">{{ texts.headline }}</h2>
            <p class="sp-home-banner__sub">{{ texts.subheadline }}</p>
          </div>
        </div>
      </div>
    </section>

    <PreviewServices :services="site.services" :can-book="site.canBook" :whatsapp="whatsapp" />

    <div class="sp-container">
      <div class="sp-divider" />
    </div>

    <PreviewProfessionals v-if="site.employees.length" :employees="site.employees" />

    <PreviewContact :units="site.units" :whatsapp="whatsapp" />

    <!-- Bloco SEO local -->
    <section v-if="texts.location" class="sp-container sp-py-12">
      <div class="sp-max-4xl">
        <div class="sp-seo-block">
          <h2 class="sp-seo-block__title">{{ texts.textTitle }}</h2>
          <div class="sp-seo-block__text">
            <p>{{ texts.paragraph1 }}</p>
            <p v-if="texts.paragraph2">{{ texts.paragraph2 }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PreviewHero from './PreviewHero.vue'
import PreviewServices from './PreviewServices.vue'
import PreviewProfessionals from './PreviewProfessionals.vue'
import PreviewContact from './PreviewContact.vue'
import { homeTexts, showsWhatsapp, type PreviewSiteData } from '~/utils/sitePreview'

const props = defineProps<{ site: PreviewSiteData }>()

const ICON_PIN = 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'

const texts = computed(() => homeTexts(props.site))
const whatsapp = computed(() => showsWhatsapp(props.site))
</script>
