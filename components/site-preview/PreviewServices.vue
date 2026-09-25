<!-- Espelho das seções "Filtros" e "Serviços" de white-label/pages/index.vue,
     com o card de white-label/components/services/ServiceCard.vue.
     Estado mostrado: o de quem abre o site (sem filtro, ordem "Nome A-Z",
     agrupado por categoria). Os filtros são só visuais. O card segue o WL:
     preço sempre visível, duração, até 2 categorias e o CTA — "Chamar no
     WhatsApp" no "Só Site" com número; senão "Agendar"/"Ver detalhes". -->
<template>
  <div>
    <!-- Filtros -->
    <section class="sp-container sp-filters">
      <div class="sp-filters__row">
        <div class="sp-filter sp-filter--category">
          <div class="sp-filter__icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <select class="sp-filter__control sp-filter__control--select" tabindex="-1">
            <option>Todas as categorias</option>
            <option v-for="cat in categories" :key="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <div class="sp-filter sp-filter--price">
          <div class="sp-filter__icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_MONEY" />
            </svg>
          </div>
          <input type="number" placeholder="Preço mín." class="sp-filter__control" tabindex="-1" readonly>
        </div>

        <div class="sp-filter sp-filter--price">
          <div class="sp-filter__icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="ICON_MONEY" />
            </svg>
          </div>
          <input type="number" placeholder="Preço máx." class="sp-filter__control" tabindex="-1" readonly>
        </div>

        <div class="sp-filter sp-filter--sort">
          <div class="sp-filter__icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </div>
          <select class="sp-filter__control sp-filter__control--select" tabindex="-1">
            <option>Nome A-Z</option>
            <option>Menor preço</option>
            <option>Maior preço</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Serviços -->
    <section class="sp-container sp-services">
      <template v-if="services.length">
        <div v-for="group in groups" :key="group.categoryId" class="sp-services__group">
          <h2 class="sp-section-title">
            <span class="sp-section-title__bar" />
            {{ group.categoryName }}
            <span class="sp-section-title__count">({{ group.services.length }})</span>
          </h2>
          <div class="sp-grid-3">
            <a
              v-for="service in group.services"
              :key="service.id"
              :href="`/servicos/${slugify(service.name)}`"
              class="sp-service"
              @click.prevent
            >
              <div class="sp-service__media">
                <img
                  v-if="categoryImage(service) && !imgErrors[service.id]"
                  :src="categoryImage(service)"
                  :alt="service.name"
                  class="sp-service__img"
                  @error="imgErrors[service.id] = true"
                >
                <template v-else>
                  <svg class="sp-service__placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="sp-service__placeholder-text">Sem foto</span>
                </template>
              </div>

              <div class="sp-service__body">
                <h3 class="sp-service__name">{{ service.name }}</h3>
                <p v-if="service.description" class="sp-service__description">{{ service.description }}</p>

                <div class="sp-service__row">
                  <div class="sp-service__price-col">
                    <div class="sp-service__price">{{ formatCurrency(Number(service.price) || 0) }}</div>
                  </div>
                  <div v-if="service.durationMs" class="sp-service__duration">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ formatDuration(service.durationMs) }}
                  </div>
                </div>

                <div v-if="service.categories.length" class="sp-service__tags">
                  <span v-for="cat in service.categories.slice(0, 2)" :key="cat.id" class="sp-service__tag">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {{ cat.name }}
                  </span>
                </div>

                <button v-if="whatsapp" type="button" class="sp-btn-whatsapp sp-service__cta" data-cta="whatsapp" tabindex="-1">
                  <PreviewWhatsappIcon class="sp-icon-4" />
                  Chamar no WhatsApp
                </button>
                <button v-else type="button" class="sp-btn sp-service__cta" tabindex="-1">
                  {{ canBook ? 'Agendar' : 'Ver detalhes' }}
                  <svg class="sp-icon-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </a>
          </div>
        </div>
      </template>

      <div v-else class="sp-empty">
        <h3 class="sp-empty__title">Nenhum serviço disponível no momento</h3>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import PreviewWhatsappIcon from './PreviewWhatsappIcon.vue'
import {
  categoriesFromServices,
  formatCurrency,
  formatDuration,
  groupServicesByCategory,
  resolveImg,
  slugifyWl as slugify,
  type PreviewService,
} from '~/utils/sitePreview'

const props = defineProps<{
  services: PreviewService[]
  canBook: boolean
  /** "Só Site" com WhatsApp válido (showsWhatsapp). */
  whatsapp: boolean
}>()

const ICON_MONEY = 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'

const groups = computed(() => groupServicesByCategory(props.services))
const categories = computed(() => categoriesFromServices(props.services))
const imgErrors = reactive<Record<number, boolean>>({})

// ServiceCard: imagem da 1ª categoria, sem dimensões (c_limit).
const categoryImage = (service: PreviewService) => resolveImg(service.categories[0]?.image)
</script>
