<!-- Espelho de white-label/components/common/Footer.vue (versão do commit em
     produção). Redes sociais e "Regiões Atendidas" dependem de campos que os
     modelos não têm (instagram…, locationsServed): entram como props
     opcionais, vazias por padrão — igual a um site recém-criado. -->
<template>
  <footer class="sp-footer">
    <div class="sp-container">
      <div class="sp-footer__social">
        <div class="sp-footer__social-row">
          <a v-for="s in socials" :key="s.label" href="#" class="sp-footer__social-link" @click.prevent>
            <svg class="sp-icon-5" viewBox="0 0 24 24" fill="currentColor"><path :d="s.icon" /></svg>
            <span>{{ s.label }}</span>
          </a>
        </div>
      </div>

      <!-- Unidades -->
      <div v-if="site.units.length" class="sp-footer__block">
        <div class="sp-footer__block-head">
          <h4 class="sp-footer__heading">
            <svg class="sp-icon-4 sp-footer__heading-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_BUILDING" />
            </svg>
            Nossas Unidades
          </h4>
        </div>

        <div class="sp-footer__units">
          <div v-for="unit in site.units" :key="unit.id" class="sp-footer__unit">
            <p class="sp-footer__unit-name">
              <svg class="sp-icon-3-5 sp-footer__muted-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_BUILDING" />
              </svg>
              {{ unit.name }}
            </p>
            <address class="sp-footer__unit-address">
              <p v-if="unit.address">{{ unit.address }}{{ unit.number ? `, ${unit.number}` : '' }}</p>
              <p v-if="unit.neighborhood" class="sp-footer__gray-600">{{ unit.neighborhood }}</p>
              <p v-if="unit.city || unit.state">{{ [unit.city, unit.state].filter(Boolean).join(' — ') }}</p>
              <p v-if="unit.zipCode" class="sp-footer__gray-600">CEP {{ unit.zipCode }}</p>
              <p v-if="unit.phone" class="sp-footer__unit-phone">
                <svg class="sp-icon-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_PHONE" />
                </svg>
                {{ unit.phone }}
              </p>
            </address>
          </div>
        </div>
      </div>

      <!-- Links SEO -->
      <div v-if="links.length" class="sp-footer__block">
        <div class="sp-footer__seo">
          <div v-for="group in groups" :key="group.location">
            <h5 class="sp-footer__seo-heading">
              <svg class="sp-icon-3-5 sp-footer__muted-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_PIN" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ group.location }}
            </h5>
            <ul class="sp-footer__seo-list">
              <li v-for="link in group.links" :key="link.href">
                <a :href="link.href" class="sp-footer__seo-link" :title="link.label" @click.prevent>{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="sp-footer__chips">
          <span class="sp-footer__chips-label">Mais buscados:</span>
          <a v-for="link in links.slice(0, 10)" :key="link.href" :href="link.href" class="sp-footer__chip" @click.prevent>{{ link.label }}</a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="sp-footer__bottom">
        <p>© {{ year }} {{ site.name || 'SuaAgenda.link' }}. Todos os direitos reservados.</p>
        <p class="sp-footer__powered">
          Powered by <a href="https://suaagenda.link" class="sp-footer__powered-link" @click.prevent>SuaAgenda.link</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { footerSeoLinks, groupFooterLinks, type PreviewSiteData } from '~/utils/sitePreview'

const props = withDefaults(defineProps<{
  site: PreviewSiteData
  /** Redes já preenchidas, na ordem do WL (TikTok, Instagram, Facebook, YouTube). */
  socials?: { label: string; icon: string }[]
  /** Fixo nos testes de fidelidade (o WL usa o ano corrente). */
  year?: number
}>(), { socials: () => [], year: () => new Date().getFullYear() })

const ICON_BUILDING = 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
const ICON_PIN = 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
const ICON_PHONE = 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'

const links = computed(() => footerSeoLinks(props.site))
const groups = computed(() => groupFooterLinks(links.value))
</script>
