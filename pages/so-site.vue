<!-- pages/so-site.vue — oferta "Só Site" (site sem agenda online) -->
<template>
  <div class="text-[15px]">

    <!-- Hero + oferta -->
    <section class="relative px-6 pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
      <div
        class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse 60% 55% at 50% 30%,rgba(52,211,153,.09) 0%,transparent 70%)"
      ></div>

      <div class="relative max-w-3xl mx-auto text-center">
        <span class="inline-flex px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm font-semibold">
          Só Site
        </span>

        <h1
          class="mt-8 font-black leading-none text-white"
          style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,76px)"
        >
          Tenha seu próprio site e
          <span class="text-green-400">personalize você mesmo.</span>
        </h1>

        <p class="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Site profissional com a cara do seu negócio. Você muda cores, logo, fotos e textos
          pelo painel, sem depender de desenvolvedor.
        </p>

        <!-- Preço: vem do plano (/plans/public); sem plano, sem preço -->
        <div v-if="plan" class="mt-10">
          <p class="text-white">
            <span class="font-black" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,6vw,64px)">{{ price }}</span>
            <span class="text-gray-400 text-lg">/mês</span>
          </p>
        </div>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a
            :href="cta.href"
            :target="cta.kind === 'whatsapp' ? '_blank' : undefined"
            rel="noopener"
            data-cta="primary"
            class="bg-green-400 hover:bg-green-300 text-black font-bold px-8 py-4 rounded-xl transition-colors"
          >
            {{ ctaLabel }}
          </a>
          <a
            :href="duvidasHref"
            target="_blank"
            rel="noopener"
            class="border border-white/10 hover:border-white/25 text-white px-8 py-4 rounded-xl transition-colors"
          >
            Tirar dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>

    <!-- O que vem no Só Site -->
    <section class="px-6 py-20 border-t border-white/5">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-center text-white">O que você recebe</h2>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="b in beneficios" :key="b.title" class="rounded-2xl border border-white/[.06] p-7">
            <span class="text-2xl" aria-hidden="true">{{ b.emoji }}</span>
            <h3 class="mt-4 font-bold text-lg text-white">{{ b.title }}</h3>
            <p class="mt-2 text-gray-400 leading-relaxed">{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Como funciona -->
    <section class="px-6 py-20 border-t border-white/5">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-center text-white">Como funciona</h2>
        <ol class="mt-10 grid gap-5 md:grid-cols-3">
          <li v-for="(p, i) in passos" :key="p" class="rounded-2xl border border-white/[.06] p-7">
            <span class="text-green-400 font-black text-2xl">{{ i + 1 }}</span>
            <p class="mt-3 text-gray-300 leading-relaxed">{{ p }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- CTA final -->
    <section class="px-6 pb-24">
      <div class="max-w-4xl mx-auto rounded-2xl border border-green-400/25 bg-white/[.03] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 class="text-2xl font-bold text-white">Seu site no ar, do seu jeito.</h2>
          <p v-if="plan" class="mt-2 text-gray-400">{{ price }}/mês</p>
        </div>
        <a
          :href="cta.href"
          :target="cta.kind === 'whatsapp' ? '_blank' : undefined"
          rel="noopener"
          class="flex-shrink-0 bg-green-400 hover:bg-green-300 text-black font-bold px-8 py-4 rounded-xl transition-colors"
        >
          {{ ctaLabel }}
        </a>
      </div>
      <p class="mt-8 text-center text-gray-500">
        Precisa de agenda online também?
        <NuxtLink to="/precos" class="text-green-400 hover:text-green-300 font-semibold">Ver planos com agendamento →</NuxtLink>
      </p>
    </section>

  </div>
</template>

<script setup lang="ts">
import { findSoSitePlan, soSiteCta, formatBRL, whatsappHref, ADMIN_BASE } from '~/utils/soSite.js'

definePageMeta({ layout: 'landing' })

const config = useRuntimeConfig()

// SSR: preço no HTML. Mesma fonte do cadastro e do checkout (/plans/public).
const { data: plan } = await useAsyncData('so-site-plan', async () => {
  try {
    const res = await $fetch(`${config.public.plansApiBase}/plans/public`, { timeout: 8000 })
    return findSoSitePlan(res)
  } catch (err) {
    console.error('[so-site] /plans/public falhou:', err)
    return null
  }
})

const price    = computed(() => (plan.value ? formatBRL(plan.value.price) : ''))
// Pagamento imediato, sem teste grátis: cadastro → checkout do Asaas no admin.
// Sem plano (API fora) ou com trial no banco, o CTA cai no WhatsApp de vendas.
const adminBase = (config.public.adminBaseUrl as string) || ADMIN_BASE
const cta      = computed(() => soSiteCta(plan.value, { adminBase }))
const ctaLabel = 'Quero meu site'
const duvidasHref = whatsappHref('Tenho dúvidas sobre o Só Site')

// Só o que o produto entrega hoje (painel "Meu site" + site público).
const beneficios = [
  { emoji: '🌐', title: 'Seu endereço na internet',   desc: 'Um link seunegocio.suaagenda.link pronto para divulgar no Instagram, no Google e no WhatsApp.' },
  { emoji: '🎨', title: 'Identidade visual própria',   desc: 'Logo, cor principal, tema, fonte e estilo dos cantos com a cara da sua marca.' },
  { emoji: '🖼️', title: 'Fotos e textos seus',         desc: 'Galeria de fotos no topo do site, título e texto de apresentação que você escreve.' },
  { emoji: '🛠️', title: 'Você mesmo altera',          desc: 'Tudo pelo painel, na hora, sem depender de desenvolvedor.' },
  { emoji: '💬', title: 'Botão de WhatsApp',           desc: 'Seu cliente fala com você direto pelo WhatsApp a partir do site.' },
  { emoji: '📍', title: 'Serviços, endereço e redes', desc: 'Lista de serviços com preços, endereço com "como chegar" e links das suas redes sociais.' },
]

const passos = [
  'Crie sua conta, escolha o segmento e conclua o pagamento no cartão.',
  'Personalize o site no painel: logo, cores, fotos e textos.',
  'Divulgue seu link. Mudou algo? Você mesmo atualiza.',
]

const title   = 'Só Site — Site profissional que você mesmo personaliza | SuaAgenda'
const ogImage = 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg'
const description = computed(() => (plan.value
  ? `Tenha seu próprio site e personalize você mesmo pelo painel. ${price.value}/mês.`
  : 'Tenha seu próprio site e personalize você mesmo pelo painel.'))

useHead({
  title,
  titleTemplate: null,
  link: [{ rel: 'canonical', href: 'https://suaagenda.link/so-site' }],
})
useSeoMeta({
  description,
  ogTitle:            title,
  ogDescription:      description,
  ogUrl:              'https://suaagenda.link/so-site',
  ogType:             'website',
  ogImage,
  twitterCard:        'summary_large_image',
  twitterTitle:       title,
  twitterDescription: description,
  twitterImage:       ogImage,
})
</script>
