<!--
  pages/barbearia/choose-plan.vue   (landing app)
  ─────────────────────────────────────────────────────────────────────────────
  Página intermediária entre a landing e o cadastro.
  Recebe ?segment=barber (opcional) via query.

  Fluxo:
    landing CTA  →  /barbearia/choose-plan?segment=barber
                 →  usuário escolhe plano + ciclo
                 →  redirect para admin/auth/register?planId=X&billingCycle=Y
-->
<template>
    <div class="cp-wrap">
  
      <!-- ── bg noise + glow ─────────────────────────────────────────────── -->
      <div class="cp-bg-glow" aria-hidden="true"></div>
      <div class="cp-bg-noise" aria-hidden="true"></div>
  
      <!-- ── nav strip ───────────────────────────────────────────────────── -->
      <nav class="cp-nav">
        <NuxtLink to="/" class="cp-nav-logo">
          <img
            src="https://res.cloudinary.com/du872kkq0/image/upload/v1758896496/logo-sua-agenda-fundo-preto-thumb_hhcyp9.jpg"
            alt="Sua Agenda"
            class="cp-nav-img"
          />
          <span>SuaAgenda</span>
        </NuxtLink>
        <div class="cp-nav-trust">
          <span>🔒 Sem cartão de crédito</span>
          <span class="cp-divider">·</span>
          <span>Cancela quando quiser</span>
        </div>
      </nav>
  
      <!-- ── hero copy ────────────────────────────────────────────────────── -->
      <header class="cp-hero">
        <span class="cp-segment-pill" v-if="segmentLabel">
          {{ segmentEmoji }} {{ segmentLabel }}
        </span>
        <h1 class="cp-title">
          Escolha o plano<br>
          <span class="cp-title-accent">do seu tamanho</span>
        </h1>
        <p class="cp-subtitle">
          Todos os planos pagos começam com
          <strong>{{ trialDays }} dias grátis</strong> — sem cartão de crédito.
          Cancela quando quiser.
        </p>
  
        <!-- trust row -->
        <div class="cp-trust-row">
          <div v-for="t in trustItems" :key="t.label" class="cp-trust-item">
            <span class="cp-trust-icon">{{ t.icon }}</span>
            <span>{{ t.label }}</span>
          </div>
        </div>
      </header>
  
      <!-- ── plan selector ────────────────────────────────────────────────── -->
      <main class="cp-plans-wrap">
        <PlanSelector
          :segment="segment"
          :redirect-base="adminBase"
          :redirect="true"
          :trial-days="trialDays"
          :annual-discount="annualDiscount"
          :quarterly-discount="quarterlyDiscount"
          @select="onSelect"
        />
      </main>
  
      <!-- ── FAQ rápido ───────────────────────────────────────────────────── -->
      <section class="cp-faq">
        <h2 class="cp-faq-title">Dúvidas rápidas</h2>
        <div class="cp-faq-grid">
          <div v-for="item in faqs" :key="item.q" class="cp-faq-card">
            <p class="cp-faq-q">{{ item.q }}</p>
            <p class="cp-faq-a">{{ item.a }}</p>
          </div>
        </div>
      </section>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useRuntimeConfig } from '#app'
  import PlanSelector from '~/components/PlanSelector.vue'
  
  definePageMeta({ layout: 'barber' })
  
  const route  = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()
  
  // ── env / config ─────────────────────────────────────────────────────────
  const adminBase          = (config.public.adminBaseUrl as string) || 'https://app.suaagenda.link'
  const trialDays          = Number((config.public.trialDays         as string) || 15)
  const annualDiscount     = Number((config.public.annualDiscount    as string) || 15)
  const quarterlyDiscount  = Number((config.public.quarterlyDiscount as string) || 10)
  
  // ── segment ───────────────────────────────────────────────────────────────
  const segment = computed(() => (route.query.segment as string) || 'barber')
  
  const SEGMENT_META: Record<string, { label: string; emoji: string }> = {
    barber:       { label: 'Barbearia',       emoji: '✂️'  },
    salon:        { label: 'Salão de Beleza', emoji: '💇'  },
    nails:        { label: 'Nail Studio',     emoji: '💅'  },
    estetica:     { label: 'Estética',        emoji: '🧖'  },
    lash:         { label: 'Lash Studio',     emoji: '👁️' },
    dentist:      { label: 'Dentista',        emoji: '🦷'  },
    clinic:       { label: 'Clínica',         emoji: '🩺'  },
    psychology:   { label: 'Psicologia',      emoji: '🧠'  },
    physio:       { label: 'Fisioterapia',    emoji: '🦾'  },
    petshop:      { label: 'Petshop',         emoji: '🐾'  },
    personal:     { label: 'Personal',        emoji: '🏋️' },
    studio:       { label: 'Studio',          emoji: '🧘'  },
  }
  
  const segmentLabel = computed(() => SEGMENT_META[segment.value]?.label || '')
  const segmentEmoji = computed(() => SEGMENT_META[segment.value]?.emoji || '📋')
  
  // ── head ──────────────────────────────────────────────────────────────────
  useHead({
    title: `Escolha seu plano — SuaAgenda${segmentLabel.value ? ' para ' + segmentLabel.value : ''}`,
    meta: [
      { name: 'description', content: 'Plano do seu tamanho. Comece grátis, sem cartão de crédito.' },
      { name: 'robots', content: 'noindex' },
    ],
  })
  
  // ── trust items ───────────────────────────────────────────────────────────
  const trustItems = [
    { icon: '🔒', label: 'Sem cartão de crédito' },
    { icon: '⚡', label: `${trialDays} dias grátis nos planos pagos` },
    { icon: '✓',  label: 'Cancela quando quiser' },
    { icon: '💬', label: 'Suporte via WhatsApp' },
  ]
  
  // ── select handler (só para emit; redirect acontece dentro do componente) ─
  function onSelect(payload: {
    planId: number
    billingCycle: string
    priceMonthly: string
    priceTotal: string
  }) {
    // hook para analytics, etc.
    if (process.client && typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', 'plan_selected', {
        plan_id:       payload.planId,
        billing_cycle: payload.billingCycle,
      })
    }
  }
  
  // ── FAQ ───────────────────────────────────────────────────────────────────
  const faqs = [
    {
      q: 'Preciso de cartão de crédito pra começar?',
      a: `Não. Todos os planos pagos têm ${trialDays} dias grátis, sem pedir cartão. Você cadastra o cartão só se quiser continuar depois do período de teste.`,
    },
    {
      q: 'Posso mudar de plano depois?',
      a: 'Sim. Você pode fazer upgrade ou downgrade a qualquer momento. O valor é ajustado proporcionalmente.',
    },
    {
      q: 'O que acontece quando o trial acaba?',
      a: 'Você recebe um aviso por e-mail e pode cadastrar o cartão para continuar. Se não cadastrar, a conta fica no modo gratuito (planId=1) automaticamente.',
    },
    {
      q: 'Qual a diferença entre mensal, trimestral e anual?',
      a: `Mensal: cobrado todo mês. Trimestral: cobrado a cada 3 meses com ${quarterlyDiscount}% de desconto. Anual: cobrado uma vez por ano com ${annualDiscount}% de desconto.`,
    },
    {
      q: 'Posso cancelar sem multa?',
      a: 'Sim. Cancele quando quiser, sem burocracia e sem multa. O acesso continua até o fim do período já pago.',
    },
  ]
  </script>
  
  <style scoped>
  /* ── root ──────────────────────────────────────────────────────────────── */
  .cp-wrap {
    min-height: 100vh;
    background: #0a0a0a;
    color: #f0f0f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow-x: hidden;
    padding-bottom: 5rem;
  }
  
  /* ── bg effects ─────────────────────────────────────────────────────────── */
  .cp-bg-glow {
    position: fixed;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 800px; height: 400px;
    background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,211,153,0.07), transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  .cp-bg-noise {
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }
  
  /* ── nav ────────────────────────────────────────────────────────────────── */
  .cp-nav {
    position: relative; z-index: 10;
    width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  
  .cp-nav-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none;
    font-size: 0.95rem; font-weight: 700;
    color: #f0f0f2;
  }
  .cp-nav-img {
    width: 36px; height: 36px; border-radius: 10px;
    object-fit: cover; border: 1px solid rgba(255,255,255,0.08);
  }
  
  .cp-nav-trust {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.75rem; color: rgba(255,255,255,0.35);
  }
  .cp-divider { opacity: 0.3; }
  
  @media (max-width: 540px) { .cp-nav-trust { display: none; } }
  
  /* ── hero ───────────────────────────────────────────────────────────────── */
  .cp-hero {
    position: relative; z-index: 5;
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
    padding: 3.5rem 1.5rem 2rem;
    max-width: 640px;
    width: 100%;
    gap: 1rem;
  }
  
  .cp-segment-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 14px;
    border-radius: 20px;
    background: rgba(52,211,153,0.08);
    border: 1px solid rgba(52,211,153,0.2);
    font-size: 0.75rem; font-weight: 700;
    color: #34d399;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  
  .cp-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(42px, 6vw, 72px);
    line-height: 1;
    color: #fff;
    letter-spacing: 0.5px;
  }
  .cp-title-accent { color: #34d399; }
  
  .cp-subtitle {
    font-size: 1rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.6;
    max-width: 440px;
  }
  .cp-subtitle strong { color: #f0f0f2; }
  
  /* ── trust row ──────────────────────────────────────────────────────────── */
  .cp-trust-row {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 20px;
    margin-top: 0.5rem;
  }
  .cp-trust-item {
    display: flex; align-items: center; gap: 5px;
    font-size: 0.77rem; color: rgba(255,255,255,0.38);
  }
  .cp-trust-icon { font-size: 0.85rem; }
  
  /* ── plans wrap ─────────────────────────────────────────────────────────── */
  .cp-plans-wrap {
    position: relative; z-index: 5;
    width: 100%;
    max-width: 1300px;
    padding: 0 1.5rem 1rem;
  }
  
  /* ── faq ────────────────────────────────────────────────────────────────── */
  .cp-faq {
    position: relative; z-index: 5;
    width: 100%; max-width: 900px;
    padding: 3rem 1.5rem 0;
  }
  
  .cp-faq-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(28px, 3vw, 40px);
    color: #fff;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .cp-faq-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  @media (max-width: 600px) { .cp-faq-grid { grid-template-columns: 1fr; } }
  
  .cp-faq-card {
    background: #181818;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 1.25rem;
    display: flex; flex-direction: column; gap: 6px;
  }
  .cp-faq-q {
    font-size: 0.85rem; font-weight: 700;
    color: #f0f0f2;
    line-height: 1.4;
  }
  .cp-faq-a {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.5;
  }
  </style>