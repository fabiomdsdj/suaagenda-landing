<!-- Espelho de white-label/pages/sobre.vue (/sobre).
     Todos os textos saem de aboutTexts() (utils/sitePreview.ts), cópia da
     regra do seoData do WL: segmento pelo SEGMENT_MAP, 1º parágrafo =
     website.description, diferenciais de agenda só com canBook. -->
<template>
  <div class="sp-page">
    <!-- Hero da página Sobre -->
    <section class="sp-about-hero">
      <div class="sp-container sp-max-5xl sp-about-hero__inner">
        <span class="sp-about-hero__badge">{{ t.segmentLabel }}</span>
        <h1 class="sp-about-hero__title">{{ t.h1 }}</h1>
        <p class="sp-about-hero__intro">{{ t.intro }}</p>

        <div class="sp-about-hero__actions">
          <a v-if="site.canBook" href="/" class="sp-btn sp-btn--lg sp-shadow-lg" @click.prevent>
            <svg class="sp-icon-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_CALENDAR" />
            </svg>
            Agendar agora
          </a>
          <!-- No WL este botão não depende do plano: só do número válido. -->
          <a v-if="whatsappNumber" href="#" class="sp-btn-whatsapp sp-btn-whatsapp--hero" @click.prevent>
            <PreviewWhatsappIcon class="sp-icon-5" />
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>

    <!-- Estatísticas rápidas -->
    <section class="sp-container sp-max-5xl sp-about-stats">
      <div class="sp-about-stats__grid">
        <div v-for="stat in t.quickStats" :key="stat.label" class="sp-about-stat">
          <div class="sp-about-stat__value">{{ stat.value }}</div>
          <div class="sp-about-stat__label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Sobre nós -->
    <section class="sp-container sp-max-5xl sp-py-16">
      <div class="sp-about-intro">
        <div>
          <h2 class="sp-h2-3xl sp-mb-6">{{ t.aboutTitle }}</h2>
          <div class="sp-about-intro__text">
            <p v-for="(paragraph, i) in t.aboutParagraphs" :key="i">{{ paragraph }}</p>
          </div>
        </div>

        <div class="sp-stack-4">
          <div v-for="item in t.differentials" :key="item.title" class="sp-diff">
            <div class="sp-icon-tile">
              <svg class="sp-icon-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
              </svg>
            </div>
            <div>
              <h4 class="sp-diff__title">{{ item.title }}</h4>
              <p class="sp-diff__text">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Serviços em destaque -->
    <section v-if="t.services.length" class="sp-py-16 sp-tint-5">
      <div class="sp-container sp-max-5xl">
        <div class="sp-center-head">
          <h2 class="sp-h2-3xl sp-mb-3">{{ t.servicesTitle }}</h2>
          <p class="sp-center-head__sub">{{ t.servicesSubtitle }}</p>
        </div>

        <div class="sp-about-services">
          <a
            v-for="service in t.services.slice(0, 9)"
            :key="service.id"
            :href="`/servicos/${slugify(service.name)}`"
            class="sp-about-service"
            @click.prevent
          >
            <div class="sp-about-service__row">
              <div class="sp-about-service__main">
                <h3 class="sp-about-service__name">{{ service.name }}</h3>
                <p v-if="service.description" class="sp-about-service__desc">{{ service.description }}</p>
              </div>
              <div class="sp-about-service__price-col">
                <span class="sp-about-service__price">{{ formatCurrency(service.price) }}</span>
              </div>
            </div>
          </a>
        </div>

        <div class="sp-center sp-mt-8">
          <a href="/" class="sp-btn-outline" @click.prevent="$emit('navigate', 'inicio')">
            Ver todos os serviços
            <svg class="sp-icon-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Profissionais -->
    <section v-if="site.employees.length" class="sp-container sp-max-5xl sp-py-16">
      <div class="sp-center-head">
        <h2 class="sp-h2-3xl sp-mb-3">{{ t.teamTitle }}</h2>
        <p class="sp-center-head__sub">{{ t.teamSubtitle }}</p>
      </div>

      <div class="sp-about-team">
        <div v-for="employee in site.employees" :key="employee.id" class="sp-about-member">
          <div class="sp-about-member__avatar">
            <img
              v-if="employee.avatar && !imgErrors[employee.id]"
              :src="resolveImg(employee.avatar)"
              :alt="employee.fullName"
              @error="imgErrors[employee.id] = true"
            >
            <span v-else>{{ employee.fullName?.charAt(0) }}</span>
          </div>
          <h3 class="sp-about-member__name">{{ employee.fullName }}</h3>
        </div>
      </div>
    </section>

    <!-- Unidades -->
    <section v-if="site.units.length" class="sp-py-16 sp-tint-5">
      <div class="sp-container sp-max-5xl">
        <div class="sp-center-head">
          <h2 class="sp-h2-3xl sp-mb-3">{{ t.unitsTitle }}</h2>
          <p class="sp-muted">{{ t.unitsSubtitle }}</p>
        </div>

        <div class="sp-about-units">
          <div v-for="unit in site.units" :key="unit.id" class="sp-about-unit">
            <div class="sp-about-unit__head">
              <div class="sp-icon-tile">
                <svg class="sp-icon-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_PIN" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="sp-about-unit__name">{{ unit.name }}</h3>
            </div>

            <address class="sp-about-unit__address">
              <p v-if="unit.address" class="sp-about-unit__line sp-about-unit__line--top">
                <svg class="sp-icon-4 sp-about-unit__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {{ unit.address }}{{ unit.city ? `, ${unit.city}` : '' }}{{ unit.state ? ` - ${unit.state}` : '' }}
              </p>
              <p v-if="unit.phone" class="sp-about-unit__line">
                <svg class="sp-icon-4 sp-about-unit__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_PHONE" />
                </svg>
                {{ unit.phone }}
              </p>
            </address>
            <PreviewUnitHours :availabilities="unit.availabilities" class="sp-mt-3" />

            <a v-if="site.canBook" href="/" class="sp-about-unit__cta" @click.prevent>
              Agendar nesta unidade
              <svg class="sp-icon-3-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a v-else-if="whatsapp" href="#" class="sp-about-unit__cta sp-about-unit__cta--wa" @click.prevent>
              <PreviewWhatsappIcon class="sp-icon-3-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section v-if="site.canBook" class="sp-py-20">
      <div class="sp-container sp-max-3xl sp-center">
        <h2 class="sp-h2-3xl sp-mb-4">{{ t.ctaTitle }}</h2>
        <p class="sp-cta__sub">{{ t.ctaSubtitle }}</p>
        <a href="/" class="sp-btn sp-btn--xl" @click.prevent>
          <svg class="sp-icon-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_CALENDAR" />
          </svg>
          Agendar meu horário
        </a>
      </div>
    </section>
    <section v-else-if="whatsapp" class="sp-py-20">
      <div class="sp-container sp-max-3xl sp-center">
        <h2 class="sp-h2-3xl sp-mb-4">Ficou com alguma dúvida?</h2>
        <p class="sp-cta__sub">Fale com a gente pelo WhatsApp.</p>
        <a href="#" class="sp-btn-whatsapp sp-btn-whatsapp--xl" @click.prevent>
          <PreviewWhatsappIcon class="sp-icon-5" />
          Falar no WhatsApp
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import PreviewUnitHours from './PreviewUnitHours.vue'
import PreviewWhatsappIcon from './PreviewWhatsappIcon.vue'
import {
  aboutTexts,
  formatCurrency,
  hasWhatsapp,
  resolveImg,
  showsWhatsapp,
  slugifyWl as slugify,
  type PreviewPage,
  type PreviewSiteData,
} from '~/utils/sitePreview'

const props = defineProps<{ site: PreviewSiteData }>()
defineEmits<{ navigate: [page: PreviewPage] }>()

const ICON_CALENDAR = 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
const ICON_PIN = 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
const ICON_PHONE = 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'

const t = computed(() => aboutTexts(props.site))
const whatsapp = computed(() => showsWhatsapp(props.site))
const whatsappNumber = computed(() => hasWhatsapp(props.site))
const imgErrors = reactive<Record<number, boolean>>({})
</script>
