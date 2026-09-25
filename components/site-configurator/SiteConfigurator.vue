<!-- Configurador "site já pronto" (etapa 4): escolha do modelo, editor e
     preview em tempo real, e o CTA. Dono do estado (useSiteConfigurator) e das
     imagens locais (useLocalImage). Nada é salvo nem enviado.
     A página que o usa (bancada e /site-para-[segmento]) só passa o segmento
     (e o preço do plano) e trata o `start` do CTA.
     editable=false (segmento previewOnly): catálogo só de visualização —
     modelos, preview e CTA, sem o editor; a personalização é no admin. -->
<template>
  <div class="cfg-root">
    <section aria-labelledby="cfg-models-title">
      <h2 id="cfg-models-title" class="text-xl font-bold text-white">Escolha um modelo</h2>
      <p v-if="editable" class="mt-1 text-sm text-gray-400">Todos já vêm com textos, serviços e horários de exemplo. Depois é só colocar os seus dados.</p>
      <p v-else class="mt-1 text-sm text-gray-400" data-catalog-note>Veja como cada modelo fica. O modelo escolhido vira a base do seu site, e você personaliza tudo pelo painel depois de contratar.</p>
      <ModelPicker
        class="mt-4"
        :models="config.models"
        :model-value="config.modelId.value"
        :aria-label="`Modelos de site de ${segment.label.toLowerCase()}`"
        @select="chooseModel"
      />
    </section>

    <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start">
      <!-- Preview primeiro no celular: quem edita vê o resultado antes do formulário. -->
      <!-- --cfg-sticky-top: a página com header fixo empurra o preview para baixo dele. -->
      <div class="min-w-0 lg:sticky lg:top-[var(--cfg-sticky-top,1.5rem)] lg:order-2">
        <PreviewFrame
          v-model:page="page"
          v-model:device="device"
          :site="config.preview.value"
          :theme="config.theme.value"
          :primary-color="config.identity.primaryColor"
          :viewport-height="previewHeight"
          :address="demoAddress"
        />
      </div>

      <div class="min-w-0 lg:order-1">
        <template v-if="editable">
          <div class="mb-3 flex items-center justify-between gap-3">
            <h2 class="text-lg font-bold text-white">Personalize</h2>
            <button
              type="button"
              class="cfg-btn cfg-btn--ghost"
              :disabled="!config.dirty.value"
              data-action="reset"
              @click="resetAll"
            >
              Desfazer alterações
            </button>
          </div>
          <EditorPanel :config="config" :logo="logo" :hero="hero" />
        </template>
        <ConversionCard
          :class="{ 'mt-6': editable }"
          :segment="segment.segment"
          :segment-type="segment.segmentType"
          :segment-label="segment.label"
          :model-id="config.modelId.value"
          :model-label="config.model.value.label"
          :price="price"
          :editable="editable"
          @start="payload => emit('start', payload)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/site-configurator.css'
import { ref, watch } from 'vue'
import ModelPicker from './ModelPicker.vue'
import EditorPanel from './EditorPanel.vue'
import PreviewFrame from './PreviewFrame.vue'
import ConversionCard from './ConversionCard.vue'
import { useSiteConfigurator, type ConversionStart, type PreviewDevice } from '~/composables/useSiteConfigurator'
import { useLocalImage } from '~/composables/useLocalImage'
import type { SegmentSiteModels } from '~/data/siteModels/types'
import type { PreviewPage } from '~/utils/sitePreview'

const props = withDefaults(defineProps<{
  segment: SegmentSiteModels
  initialModelId?: string
  /** false = "Só Site" (o produto da vitrine). */
  canBook?: boolean
  previewHeight?: string
  /** Preço do plano já formatado ("R$ 39,90"), para o CTA. */
  price?: string
  /** false = catálogo só de visualização (sem editor). */
  editable?: boolean
  /** Endereço de demonstração na barra do preview ("seusite.suaagenda.link"). */
  demoAddress?: string
}>(), { initialModelId: undefined, canBook: false, previewHeight: undefined, price: undefined, editable: true, demoAddress: undefined })

const emit = defineEmits<{ start: [payload: ConversionStart]; modelChange: [modelId: string] }>()

const config = useSiteConfigurator(props.segment, { initialModelId: props.initialModelId, canBook: props.canBook })
const logo = useLocalImage('logo')
const hero = useLocalImage('photo')

const page = ref<PreviewPage>('inicio')
const device = ref<PreviewDevice>('mobile')

// A URL da imagem pronta (ou null ao remover) vira identidade. A revogação é
// do useLocalImage: troca, clear() e saída da página.
watch(() => logo.url.value, url => config.setLogo(url))
watch(() => hero.url.value, url => config.setHeroImage(url))
// A página pública espelha o modelo em ?modelo= (link direto para anúncio).
watch(() => config.modelId.value, id => emit('modelChange', id))

function chooseModel(id: string) {
  // Confirmação simples do navegador: só quando há texto/serviço editado.
  config.selectModel(id, message => window.confirm(message))
}

function resetAll() {
  config.reset()
  logo.clear()
  hero.clear()
}
</script>
