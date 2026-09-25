<!-- Espelho de white-label/pages/localizacao.vue (Como chegar).
     O mapa do WL é Leaflet + geocodificação no client; aqui fica só a área do
     mapa (mesma altura e borda) com um pino, sem tiles nem rede. Os chips de
     unidade e o "Ver no mapa" assumem geocodificação com sucesso. -->
<template>
  <div class="sp-page">
    <section class="sp-loc-hero">
      <div class="sp-container sp-center">
        <h1 class="sp-loc-hero__title">{{ t.title }}</h1>
        <p class="sp-loc-hero__sub">{{ t.subtitle }}</p>
        <div class="sp-search sp-search--narrow">
          <div class="sp-search__row">
            <svg class="sp-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input type="text" placeholder="Buscar por cidade, bairro ou nome..." class="sp-search__input sp-search__input--sm" tabindex="-1" readonly>
          </div>
        </div>
      </div>
    </section>

    <!-- Mapa (estático no preview) -->
    <section>
      <div class="sp-loc-map">
        <div class="sp-loc-map__canvas">
          <svg class="sp-loc-map__pin" viewBox="0 0 24 24" fill="currentColor">
            <path :d="ICON_PIN_SOLID" />
          </svg>
        </div>
      </div>

      <div v-if="site.units.length" class="sp-container sp-loc-chips">
        <button v-for="unit in site.units" :key="unit.id" type="button" class="sp-loc-chip" tabindex="-1">
          <svg class="sp-icon-3" fill="currentColor" viewBox="0 0 24 24"><path :d="ICON_PIN_SOLID" /></svg>
          {{ unit.name }}
        </button>
      </div>
    </section>

    <!-- Filtro por cidade -->
    <section class="sp-container sp-loc-filter">
      <div class="sp-loc-filter__row">
        <button type="button" class="sp-pill sp-pill--active" tabindex="-1">Todas</button>
        <button v-for="city in t.availableCities" :key="city" type="button" class="sp-pill" tabindex="-1">{{ city }}</button>
      </div>
    </section>

    <!-- Lista de unidades -->
    <section class="sp-container sp-pb-16">
      <div v-for="group in t.groups" :key="group.city" class="sp-services__group">
        <h2 class="sp-section-title">
          <span class="sp-section-title__bar" />
          {{ group.city }}
          <span class="sp-section-title__count">({{ group.units.length }})</span>
        </h2>
        <div class="sp-grid-3">
          <article v-for="unit in group.units" :key="unit.id" class="sp-loc-card">
            <div class="sp-loc-card__head">
              <div class="sp-loc-card__head-row">
                <h3 class="sp-loc-card__name">{{ unit.name }}</h3>
                <span class="sp-loc-card__badge">Aberto</span>
              </div>
            </div>

            <div class="sp-loc-card__body">
              <div v-if="unit.address" class="sp-loc-card__line sp-loc-card__line--top">
                <svg class="sp-icon-4 sp-loc-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_PIN" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <address class="sp-loc-card__address">
                  <span>{{ unit.address }}{{ unit.number ? `, ${unit.number}` : '' }}</span>
                  <span v-if="unit.neighborhood" class="sp-block sp-text-xs">{{ unit.neighborhood }}</span>
                  <span v-if="unit.city || unit.state" class="sp-block">
                    <span>{{ unit.city }}</span>
                    <span v-if="unit.city && unit.state"> — </span>
                    <span>{{ unit.state }}</span>
                  </span>
                  <span v-if="unit.zipCode" class="sp-block sp-text-xs">CEP {{ unit.zipCode }}</span>
                </address>
              </div>

              <div v-if="unit.phone" class="sp-loc-card__line">
                <svg class="sp-icon-4 sp-loc-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_PHONE" />
                </svg>
                <a :href="`tel:${unit.phone}`" class="sp-loc-card__tel" @click.prevent>{{ unit.phone }}</a>
              </div>

              <div v-if="unit.email" class="sp-loc-card__line">
                <svg class="sp-icon-4 sp-loc-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a :href="`mailto:${unit.email}`" class="sp-loc-card__tel sp-truncate" @click.prevent>{{ unit.email }}</a>
              </div>

              <PreviewUnitHours :availabilities="unit.availabilities" class="sp-text-xs" />

              <div class="sp-loc-card__map-link">
                <svg class="sp-icon-3-5" fill="currentColor" viewBox="0 0 24 24"><path :d="ICON_PIN_SOLID" /></svg>
                Ver no mapa
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Bloco SEO descritivo -->
    <section v-if="site.units.length" class="sp-container sp-pb-16">
      <div class="sp-max-4xl sp-seo-block">
        <h2 class="sp-seo-block__title">{{ t.blockTitle }}</h2>
        <div class="sp-seo-block__text">
          <p>{{ t.paragraph1 }}</p>
          <p v-if="t.paragraph2">{{ t.paragraph2 }}</p>
          <div v-if="t.availableCities.length > 1" class="sp-loc-cities">
            <h3 class="sp-loc-cities__title">Estamos presentes em:</h3>
            <div class="sp-loc-cities__row">
              <span v-for="city in t.availableCities" :key="city" class="sp-loc-city">
                <svg class="sp-icon-3" fill="currentColor" viewBox="0 0 24 24"><path :d="ICON_PIN_SOLID" /></svg>
                {{ city }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PreviewUnitHours from './PreviewUnitHours.vue'
import { locationTexts, type PreviewSiteData } from '~/utils/sitePreview'

const props = defineProps<{ site: PreviewSiteData }>()

const ICON_PIN = 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
const ICON_PIN_SOLID = 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z'
const ICON_PHONE = 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'

const t = computed(() => locationTexts(props.site))
</script>
