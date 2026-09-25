<!-- pages/site-para-[segmento].vue — página pública do configurador "site já
     pronto" de um segmento (/site-para-fisioterapia).
       - Segmento fora de data/siteModels → 404 real (o catch-all [slug].vue
         não pega: rota com prefixo estático tem prioridade).
       - SEO vem do objeto `seo` do segmento; o preview leva data-nosnippet
         (telefone/endereço fictícios fora dos resultados do Google).
       - O slug público mapeia para o segmento REAL (segment_types.name,
         data/siteModels/types.ts): fisioterapia → physio.
       - CTA = cadastro self-service do admin (utils/soSite.js): conta →
         checkout do Asaas → plano ativo, sem teste grátis. A URL leva o
         plano, o segmento real (segmentType) e o modelo (siteModel), que o
         cadastro grava. Sem plano ou com trial no banco, cai no WhatsApp.
         O WhatsApp fica como contato secundário. Preço de /plans/public.
       - ?modelo=<id> abre direto no modelo e acompanha a troca.
       - Segmento `previewOnly` (barbearia): catálogo só de visualização, sem
         editor, com o endereço de demonstração "seusite.<siteDomain>" na
         moldura. O modelo escolhido vira a base do site no cadastro. -->
<template>
  <div class="text-[15px]" style="--cfg-sticky-top:5.5rem">

    <!-- Topo: h1 + intro do segmento -->
    <section class="relative px-6 pt-32 pb-10 md:pt-40">
      <div class="relative max-w-3xl mx-auto text-center">
        <span class="inline-flex px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm font-semibold">
          Site pronto para {{ segment.label.toLowerCase() }}
        </span>
        <h1 class="mt-6 text-3xl md:text-5xl font-bold leading-tight text-white">{{ seo.h1 }}</h1>
        <p class="mt-5 text-lg text-gray-400 leading-relaxed">{{ seo.intro }}</p>
      </div>
    </section>

    <!-- Configurador -->
    <section class="px-4 sm:px-6 pb-20" aria-label="Configurador de modelos">
      <div class="max-w-7xl mx-auto" data-nosnippet>
        <SiteConfigurator
          :segment="segment"
          :initial-model-id="initialModelId"
          :price="price || undefined"
          :editable="!segment.previewOnly"
          :demo-address="segment.previewOnly ? demoAddress : undefined"
          @start="onStart"
          @model-change="onModelChange"
        />
      </div>
    </section>

    <!-- Conteúdo do segmento -->
    <section class="px-6 py-20 border-t border-white/5">
      <div class="max-w-6xl mx-auto grid gap-5 sm:grid-cols-2">
        <div v-for="s in seo.sections" :key="s.h2" class="rounded-2xl border border-white/[.06] p-7">
          <h2 class="font-bold text-lg text-white">{{ s.h2 }}</h2>
          <p class="mt-2 text-gray-400 leading-relaxed">{{ s.body }}</p>
        </div>
      </div>
    </section>

    <!-- Perguntas frequentes -->
    <section class="px-6 py-20 border-t border-white/5">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-center text-white">Perguntas frequentes</h2>
        <div class="mt-10 space-y-3">
          <details v-for="f in seo.faq" :key="f.q" class="group rounded-2xl border border-white/[.06] p-5">
            <summary class="cursor-pointer list-none font-semibold text-white">{{ f.q }}</summary>
            <p class="mt-3 text-gray-400 leading-relaxed">{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="px-6 pb-24">
      <div class="max-w-4xl mx-auto rounded-2xl border border-green-400/25 bg-white/[.03] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 class="text-2xl font-bold text-white">Seu site de {{ segment.label.toLowerCase() }} no ar.</h2>
          <p v-if="plan" class="mt-2 text-gray-400">{{ price }}/mês</p>
        </div>
        <div class="flex flex-col items-center gap-3 flex-shrink-0">
          <a
            :href="cta.href"
            :target="cta.kind === 'whatsapp' ? '_blank' : undefined"
            rel="noopener"
            class="bg-green-400 hover:bg-green-300 text-black font-bold px-8 py-4 rounded-xl transition-colors"
            data-cta-final
          >
            Criar meu site
          </a>
          <a :href="duvidasHref" target="_blank" rel="noopener" class="text-sm text-gray-400 hover:text-white" data-cta-whatsapp>
            Tirar dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import SiteConfigurator from '~/components/site-configurator/SiteConfigurator.vue'
import { loadSiteModels, siteModelPath } from '~/data/siteModels'
import { findSoSitePlan, soSiteCta, siteModelCtaText, formatBRL, whatsappHref, ADMIN_BASE } from '~/utils/soSite.js'
import { demoSiteAddress } from '~/utils/sitePreview'
import type { ConversionStart } from '~/composables/useSiteConfigurator'

definePageMeta({ layout: 'landing' })

const route  = useRoute()
const router = useRouter()

const segment = await loadSiteModels(String(route.params.segmento))
if (!segment) throw createError({ statusCode: 404, statusMessage: 'Página não encontrada', fatal: true })
const seo = segment.seo

const isModelId = (v: unknown): v is string => typeof v === 'string' && segment.models.some(m => m.id === v)
const initialModelId = isModelId(route.query.modelo) ? route.query.modelo : segment.models[0].id
const modelId = ref(initialModelId)

const config = useRuntimeConfig()

// SSR: preço no HTML. Mesma fonte do /so-site.
const { data: plan } = await useAsyncData('site-para-plan', async () => {
  try {
    const res = await $fetch(`${config.public.plansApiBase}/plans/public`, { timeout: 8000 })
    return findSoSitePlan(res)
  } catch (err) {
    console.error('[site-para] /plans/public falhou:', err)
    return null
  }
})

const price = computed(() => (plan.value ? formatBRL(plan.value.price) : ''))

const adminBase = (config.public.adminBaseUrl as string) || ADMIN_BASE
const demoAddress = demoSiteAddress(config.public.siteDomain as string)

function whatsappText(id: string) {
  return siteModelCtaText({
    segmentLabel: segment!.label,
    segmentType:  segment!.segmentType,
    modelLabel:   segment!.models.find(m => m.id === id)?.label ?? id,
    modelId:      id,
  })
}
function ctaFor(id: string) {
  return soSiteCta(plan.value, {
    adminBase,
    segmentType: segment!.segmentType,
    siteModel:   id,
    text:        whatsappText(id),
  })
}
const cta         = computed(() => ctaFor(modelId.value))
const duvidasHref = computed(() => whatsappHref(whatsappText(modelId.value).replace('Quero contratar', 'Tenho dúvidas sobre')))

function onModelChange(id: string) {
  modelId.value = id
  // replace: a troca de modelo não enche o histórico.
  router.replace({ query: { ...route.query, modelo: id } })
}

function onStart(payload: ConversionStart) {
  const target = ctaFor(payload.modelId)
  if (target.kind === 'whatsapp') window.open(target.href, '_blank', 'noopener')
  else window.location.assign(target.href)
}

const url     = `https://suaagenda.link${siteModelPath(segment.segment)}`
const ogImage = 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg'

useHead({
  title: seo.title,
  titleTemplate: null,
  link: [{ rel: 'canonical', href: url }],
})
useSeoMeta({
  description:        seo.description,
  ogTitle:            seo.title,
  ogDescription:      seo.description,
  ogUrl:              url,
  ogType:             'website',
  ogImage,
  twitterCard:        'summary_large_image',
  twitterTitle:       seo.title,
  twitterDescription: seo.description,
  twitterImage:       ogImage,
})
</script>
