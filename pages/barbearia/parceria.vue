<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'barber' })

// ─── Lê todos os params da URL ────────────────────────────────────────────────
const route = useRoute()

const influencer = computed(() => ({
  ref:    route.query.ref    || 'parceiro',
  nome:   route.query.nome   || 'Parceiro',
  foto:   route.query.foto   || null,          // URL da foto (encodeURIComponent)
  cor:    route.query.cor    || '34d399',       // hex sem #
  frase:  route.query.frase  || 'Se você quer escalar sua barbearia, isso aqui faz sentido.',
  ticket: Number(route.query.ticket  || 99.90),
  comissao: Number(route.query.comissao || 30),
}))

// cor principal dinâmica (hex sem #)
const cor = computed(() => `#${influencer.value.cor}`)

// injetar CSS var pra cor do influencer
onMounted(() => {
  document.documentElement.style.setProperty('--inf-color', cor.value)

  // fade-on-scroll
  document.querySelectorAll('.fos').forEach(el => {
    el.classList.add('fos-hidden')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fos-visible') })
    }, { threshold: 0.12 })
    obs.observe(el)
  })
})

// ─── Simulador ───────────────────────────────────────────────────────────────
const barbeiros = ref(100)

const ganhoMensal = computed(() =>
  barbeiros.value * influencer.value.ticket * (influencer.value.comissao / 100)
)
const ganhoAnual = computed(() => ganhoMensal.value * 12)

// ─── WhatsApp link com ref ────────────────────────────────────────────────────
const whatsappLink = computed(() =>
  `https://wa.me/5511941649284?text=${encodeURIComponent(`Vim pelo ${influencer.value.nome ? influencer.value.nome:'Site de parceria da Sua Agenda'} e quero entender a parceria`)}`
)

// ─── Helpers de formatação ────────────────────────────────────────────────────
const fmt = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
</script>

<template>
  <div class="lp-root">

    <!-- ── HEADER ── -->
    <header class="lp-header">
      <div class="lp-header-inner">
        <div class="avatar-wrap">
          <img
            v-if="influencer.foto"
            :src="decodeURIComponent(influencer.foto)"
            :alt="influencer.nome"
            class="avatar-img"
          />
          <span v-else class="avatar-fallback">
            {{ influencer.nome.slice(0, 2).toUpperCase() }}
          </span>
          <span class="avatar-live">●</span>
        </div>
        <div class="header-text">
          <p class="header-by">Programa de Parceiros</p>
          <p class="header-nome">@{{ influencer.ref }}</p>
        </div>
        <div class="header-badge">
          <span class="badge-dot"></span>
          Parceiro oficial
        </div>
      </div>
    </header>

    <!-- ── HERO ── -->
    <section class="hero">
      <div class="hero-bg-glow"></div>

      <div class="hero-avatar-big">
        <img
          v-if="influencer.foto"
          :src="decodeURIComponent(influencer.foto)"
          :alt="influencer.nome"
        />
        <span v-else>{{ influencer.nome.slice(0, 2).toUpperCase() }}</span>
      </div>

      <h1 class="fos hero-h1">
        Transforme sua<br/>
        <span class="inf-accent">audiência</span><br/>
        em renda mensal
      </h1>

      <blockquote class="fos hero-quote">
        "{{ influencer.frase }}"
        <cite>— {{ influencer.nome }}</cite>
      </blockquote>

      <a :href="whatsappLink" target="_blank" class="fos btn-primary hero-cta">
        🤝 Quero isso rodando pra mim
      </a>

      <div class="fos hero-stats">
        <div class="hero-stat">
          <strong>{{ influencer.comissao }}%</strong>
          <span>de comissão</span>
        </div>
        <div class="hero-stat-div"></div>
        <div class="hero-stat">
          <strong>Recorrente</strong>
          <span>todo mês</span>
        </div>
        <div class="hero-stat-div"></div>
        <div class="hero-stat">
          <strong>R$ {{ fmt(influencer.ticket) }}</strong>
          <span>ticket médio</span>
        </div>
      </div>
    </section>

    <!-- ── COMO FUNCIONA ── -->
    <section class="section-dark">
      <h2 class="fos section-title">Como você ganha dinheiro</h2>
      <div class="steps">
        <div class="fos step">
          <div class="step-num">01</div>
          <p class="step-label">Você indica</p>
          <p class="step-desc">Stories, reels, curso, bio — mostra a ferramenta pra sua audiência do jeito que faz mais sentido pra você.</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="fos step">
          <div class="step-num">02</div>
          <p class="step-label">Eles entram</p>
          <p class="step-desc">Barbeiros ativam a conta pelo seu link. Ficam usando no dia a dia.</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="fos step">
          <div class="step-num">03</div>
          <p class="step-label">Você recebe</p>
          <p class="step-desc">{{ influencer.comissao }}% de comissão todo mês, enquanto o barbeiro estiver ativo. Renda recorrente de verdade.</p>
        </div>
      </div>
    </section>

    <!-- ── SIMULADOR ── -->
    <section class="section-sim">
      <div class="sim-card">
        <h2 class="fos sim-title">Simule seu ganho</h2>
        <p class="fos sim-sub">
          Baseado na sua comissão de <strong>{{ influencer.comissao }}%</strong> e ticket médio de <strong>R$ {{ fmt(influencer.ticket) }}</strong>
        </p>

        <div class="fos slider-wrap">
          <div class="slider-header">
            <span>Barbeiros ativos indicados por você</span>
            <strong class="slider-val">{{ barbeiros }}</strong>
          </div>
          <input
            type="range" min="10" max="1000" step="10"
            v-model.number="barbeiros"
            class="slider"
          />
          <div class="slider-labels">
            <span>10</span><span>1.000</span>
          </div>
        </div>

        <div class="fos result-box">
          <div class="result-row">
            <span class="result-label">Mensal</span>
            <strong class="result-value inf-accent">R$ {{ fmt(ganhoMensal) }}</strong>
          </div>
          <div class="result-divider"></div>
          <div class="result-row">
            <span class="result-label">Anual</span>
            <strong class="result-value result-anual">R$ {{ fmt(ganhoAnual) }}</strong>
          </div>
          <p class="result-disclaimer">*Renda cresce conforme você indica mais barbeiros. Sem teto.</p>
        </div>

        <a :href="whatsappLink" target="_blank" class="btn-primary sim-cta">
          Quero ativar isso agora
        </a>
      </div>
    </section>

    <!-- ── CANAIS ── -->
    <section class="section-dark">
      <h2 class="fos section-title">Como você coloca isso pra rodar</h2>
      <div class="canais">
        <div class="fos canal">
          <div class="canal-icon">📱</div>
          <p class="canal-nome">Instagram</p>
          <p class="canal-desc">Stories da rotina, reels mostrando o sistema, link na bio.</p>
        </div>
        <div class="fos canal">
          <div class="canal-icon">🎓</div>
          <p class="canal-nome">Cursos</p>
          <p class="canal-desc">Indica como ferramenta oficial pros alunos do seu curso.</p>
        </div>
        <div class="fos canal">
          <div class="canal-icon">🏆</div>
          <p class="canal-nome">Eventos</p>
          <p class="canal-desc">Campeonatos e workshops com recomendação direta.</p>
        </div>
        <div class="fos canal">
          <div class="canal-icon">🤳</div>
          <p class="canal-nome">Prova social</p>
          <p class="canal-desc">Você usando no dia a dia — o produto se vende sozinho.</p>
        </div>
      </div>
    </section>

    <!-- ── CTA FINAL ── -->
    <section class="section-cta">
      <div class="cta-glow"></div>
      <div class="cta-avatar-ring">
        <img v-if="influencer.foto" :src="decodeURIComponent(influencer.foto)" :alt="influencer.nome" />
        <span v-else>{{ influencer.nome.slice(0, 2).toUpperCase() }}</span>
      </div>
      <h2 class="fos cta-h2">
        Se fizer sentido pra você,<br/>a gente ativa rápido
      </h2>
      <p class="fos cta-sub">
        Você já tem a audiência. Aqui você transforma isso em renda recorrente estruturada — {{ influencer.comissao }}% todo mês.
      </p>
      <p style="color:#666; font-size:13px; margin-top:10px;">
        Ativação limitada pra manter qualidade das indicações.
      </p>
      <a :href="whatsappLink" target="_blank" class="fos btn-primary cta-btn">
        💬 Falar agora
      </a>
      <p class="fos cta-fine">Indicado por {{ influencer.nome }} · ref={{ influencer.ref }}</p>
    </section>

  </div>
</template>

<style scoped>
/* ─── CSS VARS dinâmicas via JS ──────────────────────────────────────────── */
:root { --inf-color: #34d399; }

.inf-accent { color: var(--inf-color); }

/* ─── Reset / base ────────────────────────────────────────────────────────── */
.lp-root {
  background: #080808;
  color: #e5e5e5;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
  min-height: 100vh;
}

/* ─── Fade on scroll ─────────────────────────────────────────────────────── */
.fos-hidden  { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
.fos-visible { opacity: 1; transform: none; }

/* ─── HEADER ─────────────────────────────────────────────────────────────── */
.lp-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(8,8,8,.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.lp-header-inner {
  max-width: 1100px; margin: 0 auto;
  padding: 14px 24px;
  display: flex; align-items: center; gap: 14px;
}
.avatar-wrap { position: relative; flex-shrink: 0; }
.avatar-img, .avatar-fallback {
  width: 42px; height: 42px; border-radius: 50%;
  border: 2px solid var(--inf-color);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 14px;
  background: #1a1a1a; color: var(--inf-color);
}
.avatar-img { object-fit: cover; }
.avatar-live {
  position: absolute; bottom: -2px; right: -2px;
  font-size: 10px; color: #22c55e;
  animation: pulse 1.8s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

.header-text { flex: 1; }
.header-by   { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: .08em; line-height:1; }
.header-nome { font-size: 15px; font-weight: 700; color: #fff; }

.header-badge {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700;
  padding: 5px 12px; border-radius: 99px;
  border: 1px solid color-mix(in srgb, var(--inf-color) 40%, transparent);
  color: var(--inf-color);
  background: color-mix(in srgb, var(--inf-color) 8%, transparent);
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--inf-color); animation: pulse 1.5s infinite;
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
.hero {
  position: relative; overflow: hidden;
  padding: 80px 24px 100px;
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 32px;
}
.hero-bg-glow {
  position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--inf-color) 12%, transparent), transparent 65%);
  pointer-events: none;
}

.hero-avatar-big {
  width: 100px; height: 100px; border-radius: 50%;
  border: 3px solid var(--inf-color);
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; font-weight: 900;
  background: #1a1a1a; color: var(--inf-color);
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--inf-color) 15%, transparent);
}
.hero-avatar-big img { width: 100%; height: 100%; object-fit: cover; }

.hero-h1 {
  font-size: clamp(40px, 7vw, 76px);
  font-weight: 900;
  line-height: 1.05;
  color: #fff;
  letter-spacing: -.02em;
}

.hero-quote {
  max-width: 540px;
  font-size: 18px; line-height: 1.65;
  color: #888;
  font-style: italic;
  border-left: 3px solid var(--inf-color);
  padding-left: 18px; text-align: left;
  margin: 0;
}
.hero-quote cite {
  display: block; margin-top: 10px;
  font-size: 13px; font-style: normal;
  color: var(--inf-color); font-weight: 700;
}

.hero-stats {
  display: flex; align-items: center; gap: 24px;
  flex-wrap: wrap; justify-content: center;
}
.hero-stat { text-align: center; }
.hero-stat strong { display: block; font-size: 22px; font-weight: 900; color: var(--inf-color); }
.hero-stat span   { font-size: 12px; color: #666; }
.hero-stat-div    { width: 1px; height: 36px; background: #222; }

/* ─── BTN ────────────────────────────────────────────────────────────────── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 32px; border-radius: 14px;
  background: var(--inf-color); color: #000;
  font-weight: 800; font-size: 16px;
  text-decoration: none;
  transition: filter .2s, transform .2s;
}
.btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px); }

/* ─── SECTIONS ───────────────────────────────────────────────────────────── */
.section-dark { background: #0f0f0f; padding: 80px 24px; }
.section-title {
  text-align: center; font-size: clamp(28px, 4vw, 44px);
  font-weight: 900; color: #fff; margin: 0 0 52px;
}

/* ─── STEPS ──────────────────────────────────────────────────────────────── */
.steps {
  max-width: 900px; margin: 0 auto;
  display: flex; align-items: flex-start; gap: 12px;
  flex-wrap: wrap; justify-content: center;
}
.step {
  background: #161616; border: 1px solid #222;
  border-radius: 18px; padding: 28px; flex: 1; min-width: 220px; max-width: 280px;
}
.step-num {
  font-size: 48px; font-weight: 900; line-height: 1;
  color: color-mix(in srgb, var(--inf-color) 20%, transparent);
  font-variant-numeric: tabular-nums;
  margin-bottom: 10px;
}
.step-label { font-size: 17px; font-weight: 700; color: var(--inf-color); margin-bottom: 8px; }
.step-desc  { font-size: 14px; color: #777; line-height: 1.6; }
.step-arrow { font-size: 28px; color: #333; align-self: center; }

/* ─── SIMULADOR ──────────────────────────────────────────────────────────── */
.section-sim { padding: 80px 24px; background: #080808; }
.sim-card {
  max-width: 600px; margin: 0 auto;
  background: #111; border: 1px solid #1e1e1e;
  border-radius: 24px; padding: 48px;
  display: flex; flex-direction: column; gap: 28px;
}
.sim-title { font-size: 32px; font-weight: 900; color: #fff; text-align: center; margin: 0; }
.sim-sub   { text-align: center; color: #777; font-size: 15px; margin: 0; }
.sim-sub strong { color: var(--inf-color); }

.slider-wrap { display: flex; flex-direction: column; gap: 8px; }
.slider-header {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 14px; color: #888;
}
.slider-val { font-size: 22px; font-weight: 900; color: var(--inf-color); }
.slider {
  -webkit-appearance: none;
  width: 100%; height: 4px; border-radius: 99px;
  background: #222; cursor: pointer;
  accent-color: var(--inf-color);
}
.slider-labels {
  display: flex; justify-content: space-between;
  font-size: 11px; color: #444;
}

.result-box {
  background: #080808; border: 1px solid color-mix(in srgb, var(--inf-color) 25%, transparent);
  border-radius: 16px; padding: 28px;
  display: flex; flex-direction: column; gap: 16px;
}
.result-row { display: flex; justify-content: space-between; align-items: center; }
.result-label { font-size: 14px; color: #666; }
.result-value { font-size: 32px; font-weight: 900; }
.result-anual { font-size: 22px; color: #fff; }
.result-divider { height: 1px; background: #1e1e1e; }
.result-disclaimer { font-size: 12px; color: #444; text-align: center; margin: 0; }

.sim-cta { width: 100%; justify-content: center; }

/* ─── CANAIS ─────────────────────────────────────────────────────────────── */
.canais {
  max-width: 900px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;
}
.canal {
  background: #161616; border: 1px solid #222;
  border-radius: 16px; padding: 24px;
  transition: border-color .2s;
}
.canal:hover { border-color: var(--inf-color); }
.canal-icon { font-size: 28px; margin-bottom: 12px; }
.canal-nome { font-size: 15px; font-weight: 700; color: var(--inf-color); margin-bottom: 6px; }
.canal-desc { font-size: 13px; color: #666; line-height: 1.5; }

/* ─── CTA FINAL ──────────────────────────────────────────────────────────── */
.section-cta {
  position: relative; overflow: hidden;
  padding: 100px 24px;
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 24px;
}
.cta-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle 400px at 50% 50%, color-mix(in srgb, var(--inf-color) 6%, transparent), transparent);
  pointer-events: none;
}
.cta-avatar-ring {
  width: 80px; height: 80px; border-radius: 50%;
  border: 2px solid var(--inf-color);
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: 900;
  background: #1a1a1a; color: var(--inf-color);
}
.cta-avatar-ring img { width: 100%; height: 100%; object-fit: cover; }
.cta-h2 {
  font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: #fff;
  line-height: 1.2; margin: 0;
}
.cta-sub { max-width: 460px; color: #777; font-size: 16px; line-height: 1.6; margin: 0; }
.cta-btn { padding: 18px 48px; font-size: 18px; }
.cta-fine { font-size: 12px; color: #333; margin: 0; }
</style>