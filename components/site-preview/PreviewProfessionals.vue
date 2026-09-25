<!-- Espelho de white-label/components/ProfessionalsCarousel.vue.
     Sem Swiper: rolagem horizontal simples com cards de 16rem e 16px de
     espaço (slides-per-view auto + space-between 16 no WL). Cargo e selo
     "Disponível" não aparecem: a API pública de profissionais não devolve
     role/specialty/isActive, então o site real também não mostra. -->
<template>
  <section class="sp-container sp-pros">
    <div class="sp-pros__head">
      <span class="sp-section-title__bar" />
      <h2 class="sp-pros__title">Nossos Profissionais</h2>
    </div>

    <div v-if="employees.length" class="sp-pros__track">
      <div v-for="employee in employees" :key="employee.id" class="sp-pros__slide">
        <div class="sp-pro">
          <div class="sp-pro__avatar-wrap">
            <img
              v-if="employee.avatar && !imgErrors[employee.id]"
              :src="resolveImg(employee.avatar, { width: 56, height: 56, cropMode: 'fill' })"
              :alt="employee.fullName"
              class="sp-pro__avatar"
              @error="imgErrors[employee.id] = true"
            >
            <div v-else class="sp-pro__initials">{{ initials(employee.fullName) }}</div>
          </div>
          <div class="sp-pro__info">
            <p class="sp-pro__name">{{ employee.fullName }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { initials, resolveImg, type PreviewEmployee } from '~/utils/sitePreview'

defineProps<{ employees: PreviewEmployee[] }>()

const imgErrors = reactive<Record<number, boolean>>({})
</script>
