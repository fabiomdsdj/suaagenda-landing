<!-- Espelho de white-label/components/site/BusinessContact.vue (bloco
     "Onde estamos" da home): endereço, telefone e horário de até `max`
     unidades, mais o botão de WhatsApp do site no "Só Site". -->
<template>
  <section v-if="units.length || whatsapp" class="sp-container sp-contact" aria-labelledby="sp-contato-titulo">
    <h2 id="sp-contato-titulo" class="sp-contact__title">
      {{ units.length > 1 ? 'Nossas unidades' : 'Onde estamos' }}
    </h2>
    <div class="sp-grid-3">
      <div v-for="unit in shown" :key="unit.id" class="sp-contact__card">
        <h3 v-if="units.length > 1" class="sp-contact__unit">{{ unit.name }}</h3>
        <address v-if="formatUnitAddress(unit)" class="sp-contact__address">
          {{ formatUnitAddress(unit) }}
          <span v-if="unit.zipCode" class="sp-contact__zip">CEP {{ unit.zipCode }}</span>
        </address>
        <p v-if="unit.phone" class="sp-contact__phone">
          <span class="sp-muted">Telefone: </span>
          <a v-if="telHref(unit.phone)" :href="telHref(unit.phone)!" class="sp-contact__tel" @click.prevent>{{ unit.phone }}</a>
          <span v-else class="sp-ink-80">{{ unit.phone }}</span>
        </p>
        <div v-if="formatOpeningHours(unit.availabilities).length">
          <p class="sp-eyebrow">Horário de funcionamento</p>
          <PreviewUnitHours :availabilities="unit.availabilities" />
        </div>
      </div>
    </div>
    <p v-if="units.length > max" class="sp-contact__more">
      <a href="/localizacao" class="sp-link-strong" @click.prevent>Ver todas as unidades</a>
    </p>
    <p v-if="whatsapp" class="sp-contact__more">
      <a href="#" class="sp-btn-whatsapp sp-btn-whatsapp--lg" @click.prevent>
        <PreviewWhatsappIcon class="sp-icon-5" />
        Falar no WhatsApp
      </a>
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PreviewUnitHours from './PreviewUnitHours.vue'
import PreviewWhatsappIcon from './PreviewWhatsappIcon.vue'
import { formatOpeningHours, formatUnitAddress, telHref, type PreviewUnit } from '~/utils/sitePreview'

const props = withDefaults(defineProps<{
  units: PreviewUnit[]
  /** "Só Site" com WhatsApp válido (showsWhatsapp). */
  whatsapp?: boolean
  max?: number
}>(), { whatsapp: false, max: 3 })

const shown = computed(() => props.units.slice(0, props.max))
</script>
