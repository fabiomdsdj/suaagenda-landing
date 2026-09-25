<!-- Editor do configurador, em blocos que um dono de negócio entende:
     Seu negócio · Visual · Textos · Serviços · Profissional · Contato.
     Não guarda estado: lê do `config` (useSiteConfigurator) e muda só pelos
     setters dele, que validam tudo. As imagens vêm prontas do useLocalImage
     (o SiteConfigurator liga a URL delas à identidade). -->
<template>
  <div class="space-y-3">
    <!-- ── Seu negócio ─────────────────────────────────────────────── -->
    <details class="cfg-section" open data-section="negocio">
      <summary class="cfg-summary">
        <span class="cfg-summary__title">Seu negócio</span>
        <span class="cfg-summary__hint">Qual é o nome do seu negócio?</span>
      </summary>
      <div class="cfg-section__body">
        <TextField
          label="Nome do negócio"
          :model-value="identity.businessName"
          :maxlength="LIMITS.businessName"
          :placeholder="examples.businessName"
          hint="Aparece no topo, no rodapé e nos textos do site."
          autocomplete="organization"
          data-field="businessName"
          @update:model-value="config.setBusinessName"
        />
        <ImageField
          label="Logo"
          kind="logo"
          :url="logo.url.value"
          :busy="logo.busy.value"
          :error="logo.error.value"
          hint="Opcional. Sem logo, o site mostra o nome."
          @select="logo.select"
          @clear="logo.clear"
        />
        <ImageField
          label="Foto principal"
          kind="photo"
          :url="hero.url.value"
          :busy="hero.busy.value"
          :error="hero.error.value"
          hint="A foto do topo do site. Fica só no seu navegador."
          @select="hero.select"
          @clear="hero.clear"
        />
      </div>
    </details>

    <!-- ── Visual ──────────────────────────────────────────────────── -->
    <details class="cfg-section" open data-section="visual">
      <summary class="cfg-summary">
        <span class="cfg-summary__title">Visual</span>
        <span class="cfg-summary__hint">Como você quer o visual?</span>
      </summary>
      <div class="cfg-section__body">
        <fieldset>
          <legend class="cfg-label">Estilo</legend>
          <div class="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3">
            <button
              v-for="p in presets"
              :key="p.id"
              type="button"
              class="cfg-choice"
              :aria-pressed="identity.preset === p.id"
              :data-preset="p.id"
              @click="config.setPreset(p.id)"
            >
              <span class="flex h-8 w-full overflow-hidden rounded-md border border-white/10" aria-hidden="true">
                <span class="flex-1" :style="{ background: p.background }" />
                <span class="flex-1" :style="{ background: p.surface }" />
                <span class="flex-1" :style="{ background: p.button }" />
              </span>
              <span class="mt-1.5 block truncate text-xs">{{ p.label }}</span>
            </button>
          </div>
        </fieldset>

        <div class="cfg-field">
          <label :for="`${uid}-color`" class="cfg-label">Cor principal</label>
          <div class="flex flex-wrap items-center gap-2">
            <input
              :id="`${uid}-color`"
              type="color"
              :value="currentColor"
              class="h-10 w-14 cursor-pointer rounded-lg border border-white/10 bg-transparent p-1"
              data-field="primaryColor"
              @input="onColorPicker"
            >
            <input
              :value="colorDraft"
              type="text"
              maxlength="7"
              spellcheck="false"
              autocomplete="off"
              aria-label="Código da cor"
              :aria-invalid="colorInvalid ? 'true' : undefined"
              class="cfg-input w-28 font-mono uppercase"
              :class="{ 'cfg-input--error': colorInvalid }"
              @input="onColorText"
              @blur="syncColorDraft"
            >
            <button v-if="identity.primaryColor" type="button" class="cfg-btn cfg-btn--ghost" @click="config.setPrimaryColor(null)">
              Usar a cor do estilo
            </button>
          </div>
          <p class="mt-1 text-xs" :class="colorInvalid ? 'text-amber-300' : 'text-gray-500'">
            {{ colorInvalid ? 'Use o formato #RRGGBB, por exemplo #1E88E5.' : 'Botões, destaques e o fundo do topo usam esta cor.' }}
          </p>
        </div>

        <fieldset>
          <legend class="cfg-label">Fonte</legend>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="f in fonts"
              :key="f.id"
              type="button"
              class="cfg-choice text-left"
              :aria-pressed="identity.font === f.id"
              :data-font="f.id"
              @click="config.setFont(f.id)"
            >
              <span class="block truncate text-lg leading-tight text-white" :style="{ fontFamily: f.heading }">{{ f.style }}</span>
              <span class="block truncate text-[11px] text-gray-500">{{ f.label }}</span>
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend class="cfg-label">Cantos</legend>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="r in radii"
              :key="r.id"
              type="button"
              class="cfg-choice flex flex-col items-center"
              :aria-pressed="identity.radius === r.id"
              :data-radius="r.id"
              @click="config.setRadius(r.id)"
            >
              <span class="block h-6 w-10 border-2 border-current" :style="{ borderRadius: r.button }" aria-hidden="true" />
              <span class="mt-1.5 block text-[11px]">{{ r.label }}</span>
            </button>
          </div>
        </fieldset>
      </div>
    </details>

    <!-- ── Textos ──────────────────────────────────────────────────── -->
    <details class="cfg-section" data-section="textos">
      <summary class="cfg-summary">
        <span class="cfg-summary__title">Textos</span>
        <span class="cfg-summary__hint">O que você quer dizer para quem chega no site?</span>
      </summary>
      <div class="cfg-section__body">
        <TextField
          label="Título"
          :model-value="config.textOf('heroText')"
          :maxlength="LIMITS.heroText"
          :placeholder="examples.heroText"
          hint="A frase grande do topo do site."
          data-field="heroText"
          @update:model-value="v => config.setText('heroText', v)"
        />
        <TextField
          label="Subtítulo"
          :model-value="config.textOf('tagline')"
          :maxlength="LIMITS.tagline"
          :placeholder="examples.tagline"
          multiline
          :rows="2"
          data-field="tagline"
          @update:model-value="v => config.setText('tagline', v)"
        />
        <TextField
          label="Apresentação"
          :model-value="config.textOf('about')"
          :maxlength="LIMITS.about"
          placeholder="Conte quem você é e como é o seu atendimento."
          hint="Aparece na página Sobre."
          multiline
          :rows="5"
          data-field="about"
          @update:model-value="v => config.setText('about', v)"
        />
      </div>
    </details>

    <!-- ── Serviços ────────────────────────────────────────────────── -->
    <details class="cfg-section" data-section="servicos">
      <summary class="cfg-summary">
        <span class="cfg-summary__title">Serviços</span>
        <span class="cfg-summary__hint">Quais serviços você oferece?</span>
      </summary>
      <div class="cfg-section__body">
        <ul class="space-y-3">
          <li
            v-for="(service, i) in content.services"
            :key="`${config.modelId.value}-${i}`"
            class="rounded-xl border border-white/10 bg-white/[.02] p-3"
            data-service-row
          >
            <TextField
              :label="`Serviço ${i + 1}`"
              :model-value="service.name"
              :maxlength="LIMITS.serviceName"
              placeholder="Nome do serviço"
              data-field="serviceName"
              @update:model-value="v => config.updateService(i, { name: v })"
            />
            <div class="mt-2 flex items-end gap-2">
              <PriceField
                class="w-32 shrink-0"
                label="Preço"
                :model-value="service.price"
                data-field="servicePrice"
                @update:model-value="v => config.updateService(i, { price: v })"
              />
              <div class="cfg-field min-w-0 flex-1">
                <label :for="`${uid}-cat-${i}`" class="cfg-label">Categoria</label>
                <!-- `selected` na option (e não :value no select): vale no SSR e na hidratação. -->
                <select
                  :id="`${uid}-cat-${i}`"
                  class="cfg-input"
                  data-field="serviceCategory"
                  @change="e => config.updateService(i, { categoryId: (e.target as HTMLSelectElement).value })"
                >
                  <option v-for="cat in content.categories" :key="cat.id" :value="cat.id" :selected="cat.id === service.categoryId">{{ cat.name }}</option>
                </select>
              </div>
              <button
                type="button"
                class="cfg-icon-btn"
                :disabled="!config.canRemoveService.value"
                :aria-label="`Remover ${service.name || `serviço ${i + 1}`}`"
                data-action="remove-service"
                @click="config.removeService(i)"
              >
                <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12M9 7V5h6v2m-7 0 1 12h6l1-12" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            class="cfg-btn"
            :disabled="!config.canAddService.value"
            data-action="add-service"
            @click="config.addService()"
          >
            + Adicionar serviço
          </button>
          <span class="text-xs text-gray-500" aria-live="polite" data-service-count>
            {{ content.services.length }} de {{ SITE_MAX_SERVICES }}{{ config.canAddService.value ? '' : ' — limite do modelo' }}
          </span>
        </div>
      </div>
    </details>

    <!-- ── Profissional ────────────────────────────────────────────── -->
    <details class="cfg-section" data-section="profissional">
      <summary class="cfg-summary">
        <span class="cfg-summary__title">{{ content.professionals.length > 1 ? 'Profissionais' : 'Profissional' }}</span>
        <span class="cfg-summary__hint">Quem atende?</span>
      </summary>
      <div class="cfg-section__body">
        <div
          v-for="(pro, i) in content.professionals"
          :key="`${config.modelId.value}-${i}`"
          class="grid gap-2 rounded-xl border border-white/10 bg-white/[.02] p-3 sm:grid-cols-2"
        >
          <TextField
            label="Nome"
            :model-value="pro.name"
            :maxlength="LIMITS.professionalName"
            :placeholder="examples.professionalName"
            data-field="professionalName"
            @update:model-value="v => config.updateProfessional(i, { name: v })"
          />
          <TextField
            label="Cargo"
            :model-value="pro.role"
            :maxlength="LIMITS.professionalRole"
            :placeholder="examples.professionalRole"
            @update:model-value="v => config.updateProfessional(i, { role: v })"
          />
        </div>
        <p class="text-xs text-gray-500">O cargo fica guardado para o seu cadastro; o site mostra o nome e a foto.</p>
      </div>
    </details>

    <!-- ── Contato ─────────────────────────────────────────────────── -->
    <details class="cfg-section" data-section="contato">
      <summary class="cfg-summary">
        <span class="cfg-summary__title">Contato</span>
        <span class="cfg-summary__hint">Como seus clientes entram em contato?</span>
      </summary>
      <div class="cfg-section__body">
        <div class="grid gap-3 sm:grid-cols-2">
          <TextField
            label="WhatsApp"
            :model-value="content.whatsapp"
            :maxlength="LIMITS.whatsapp"
            placeholder="(11) 99999-0000"
            inputmode="tel"
            autocomplete="tel"
            :error="whatsappError"
            data-field="whatsapp"
            @update:model-value="v => config.updateContact({ whatsapp: v })"
          />
          <TextField
            label="Telefone"
            :model-value="content.unit.phone"
            :maxlength="LIMITS.phone"
            placeholder="(11) 3000-0000"
            inputmode="tel"
            autocomplete="tel"
            data-field="phone"
            @update:model-value="v => config.updateContact({ phone: v })"
          />
        </div>
        <TextField
          label="Endereço"
          :model-value="content.unit.street"
          :maxlength="LIMITS.street"
          placeholder="Rua e número"
          autocomplete="street-address"
          data-field="street"
          @update:model-value="v => config.updateContact({ street: v })"
        />
        <div class="grid grid-cols-[1fr_1fr_4.5rem] gap-2">
          <TextField
            label="Bairro"
            :model-value="content.unit.neighborhood"
            :maxlength="LIMITS.neighborhood"
            placeholder="Centro"
            @update:model-value="v => config.updateContact({ neighborhood: v })"
          />
          <TextField
            label="Cidade"
            :model-value="content.unit.city"
            :maxlength="LIMITS.city"
            placeholder="Sua cidade"
            autocomplete="address-level2"
            data-field="city"
            @update:model-value="v => config.updateContact({ city: v })"
          />
          <TextField
            label="UF"
            :model-value="content.unit.state"
            :maxlength="LIMITS.state"
            placeholder="SP"
            autocomplete="address-level1"
            @update:model-value="v => config.updateContact({ state: v })"
          />
        </div>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import TextField from './fields/TextField.vue'
import PriceField from './fields/PriceField.vue'
import ImageField from './fields/ImageField.vue'
import { CONFIGURATOR_LIMITS as LIMITS, SITE_MAX_SERVICES, type SiteConfigurator } from '~/composables/useSiteConfigurator'
import type { LocalImage } from '~/composables/useLocalImage'
import { THEME_FONT_IDS, THEME_FONTS, THEME_PRESET_IDS, THEME_PRESETS, THEME_RADII, THEME_RADIUS_IDS, HEX_COLOR_RE, normalizeHex, presetBrandColors, presetPreviewTheme } from '~/utils/theme'
import { normalizeBrWhatsapp } from '~/utils/sitePreview'

const props = defineProps<{
  config: SiteConfigurator
  logo: LocalImage
  hero: LocalImage
}>()

const uid = useId()
const identity = computed(() => props.config.identity)
const content = computed(() => props.config.content.value)
/** Placeholders no vocabulário do segmento (data/siteModels/<segmento>.ts). */
const examples = computed(() => props.config.segment.editorExamples)

// Listas vindas do theme.ts — nenhuma cópia aqui. Amostra de cada estilo com
// as cores dele (presetPreviewTheme), como a galeria do admin.
const presets = THEME_PRESET_IDS.map((id) => {
  const t = presetPreviewTheme(id)
  return { id, label: THEME_PRESETS[id].label, background: t.background, surface: t.surface, button: t.button }
})
const fonts = THEME_FONT_IDS.map(id => ({ id, style: THEME_FONTS[id].style, label: THEME_FONTS[id].label, heading: THEME_FONTS[id].headingStack }))
const radii = THEME_RADIUS_IDS.map(id => ({ id, label: THEME_RADII[id].label, button: THEME_RADII[id].button }))

// ── Cor ──
/** A cor em vigor: a do visitante ou, sem ela, a do estilo. */
const currentColor = computed(() => identity.value.primaryColor ?? presetBrandColors(identity.value.preset).primaryColor)
const colorDraft = ref(currentColor.value)
const colorInvalid = ref(false)
const colorFocused = ref(false)
function syncColorDraft() {
  colorFocused.value = false
  colorDraft.value = currentColor.value
  colorInvalid.value = false
}
// Cor mudou por fora (seletor, estilo, reset): acompanha, menos enquanto o
// visitante digita o código.
watch(currentColor, (hex) => {
  if (!colorFocused.value) colorDraft.value = hex
})

function onColorPicker(event: Event) {
  props.config.setPrimaryColor((event.target as HTMLInputElement).value)
}

function onColorText(event: Event) {
  colorFocused.value = true
  const raw = (event.target as HTMLInputElement).value.trim()
  colorDraft.value = raw
  const value = raw.startsWith('#') ? raw : `#${raw}`
  // Só o código completo (#RRGGBB) entra, e passa por normalizeHex. Enquanto
  // digita ("#e1", "#e11d"), nada muda; com 6+ caracteres inválidos, avisa.
  const complete = HEX_COLOR_RE.test(value)
  colorInvalid.value = !complete && value.length >= 7
  if (complete) props.config.setPrimaryColor(normalizeHex(value))
}

// ── WhatsApp ──
const whatsappError = computed(() => {
  const v = content.value.whatsapp.trim()
  return v && !normalizeBrWhatsapp(v) ? 'Use um celular com DDD, ex.: (11) 99999-0000. Sem número válido, o site esconde o botão do WhatsApp.' : ''
})
</script>
