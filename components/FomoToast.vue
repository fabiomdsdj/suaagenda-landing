<template>
  <Transition name="fomo-slide">
    <div
      v-if="visible && current"
      class="fixed bottom-6 left-6 z-50 w-[300px] rounded-2xl overflow-hidden"
      style="background:#111;border:0.5px solid rgba(255,255,255,.10);box-shadow:0 8px 32px rgba(0,0,0,.5)"
    >
      <!-- progress bar -->
      <div
        class="absolute bottom-0 left-0 h-[2px] w-full origin-left"
        :class="current.color === 'green' ? 'bg-green-400' : current.color === 'blue' ? 'bg-blue-400' : 'bg-yellow-400'"
        :style="{ transition: `transform ${DURATION}ms linear`, transform: progressActive ? 'scaleX(0)' : 'scaleX(1)' }"
      />

      <div class="flex gap-3 items-start p-4">
        <!-- avatar: foto da barbearia ou initials -->
        <div class="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden bg-white/5 flex items-center justify-center">
          <img
            v-if="current.avatar"
            :src="current.avatar"
            :alt="current.shopName"
            class="w-full h-full object-cover"
            @error="current.avatar = ''"
          />
          <span v-else class="text-[13px] font-bold text-green-400">
            {{ initials(current.shopName) }}
          </span>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start gap-2 mb-0.5">
            <span class="text-[13px] font-semibold text-white leading-tight truncate">{{ current.shopName }}</span>
            <span class="text-[11px] text-gray-500 flex-shrink-0 mt-px">{{ current.time }}</span>
          </div>
          <p class="text-[13px] text-gray-400 leading-snug" v-html="current.msg" />
          <p v-if="current.location" class="text-[11px] text-gray-600 mt-1">📍 {{ current.location }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useBarbershopApi } from '~/composables/useBarbershopApi'
import { useBarbershopCounts } from '~/composables/useBarbershopCounts'

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  /** Delay inicial em ms antes do primeiro toast (default: 4000) */
  initialDelay?: number
  /** Intervalo entre toasts em ms (default: 8000) */
  interval?: number
  /** Duração de cada toast em ms (default: 5000) */
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialDelay: 4000,
  interval:     8000,
  duration:     5000,
})

const DURATION = props.duration

// ─── State ────────────────────────────────────────────────────────────────────
interface ToastItem {
  shopName:  string
  avatar:    string
  location:  string
  msg:       string
  time:      string
  color:     'green' | 'blue' | 'yellow'
}

const visible        = ref(false)
const current        = ref<ToastItem | null>(null)
const progressActive = ref(false)

// Pool de toasts — preenchido pelos fetches da API + fallbacks
const pool = ref<ToastItem[]>([])
let poolIndex = 0

// ─── Timers ───────────────────────────────────────────────────────────────────
let initTimer:     ReturnType<typeof setTimeout>  | null = null
let hideTimer:     ReturnType<typeof setTimeout>  | null = null
let intervalTimer: ReturnType<typeof setInterval> | null = null

// ─── Helpers ──────────────────────────────────────────────────────────────────
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const TIMES = ['agora', 'há 1 min', 'há 2 min', 'há pouco', 'há instantes']

// ─── Templates de mensagem ────────────────────────────────────────────────────
// Cada template recebe o nome da shop e retorna { msg, color }
const MSG_TEMPLATES: Array<{
  fn:    (name: string, extra?: string) => string
  color: 'green' | 'blue' | 'yellow'
  event: 'cadastro' | 'agendamento' | 'whatsapp' | 'google' | 'confirmacao' | 'fila'
}> = [
  // Cadastro / ativação
  {
    fn:    n => `<strong class="text-white">${n}</strong> acabou de ativar a SuaAgenda 🎉`,
    color: 'green',
    event: 'cadastro',
  },
  {
    fn:    n => `<strong class="text-white">${n}</strong> criou sua página em menos de 5 min`,
    color: 'green',
    event: 'cadastro',
  },
  {
    fn:    n => `<strong class="text-white">${n}</strong> está no ar agora — sem precisar de técnico`,
    color: 'green',
    event: 'cadastro',
  },
  // Agendamento
  {
    fn:    n => `<strong class="text-white">${n}</strong> recebeu <span class="text-green-400 font-semibold">+3 agendamentos</span> hoje`,
    color: 'green',
    event: 'agendamento',
  },
  {
    fn:    n => `Cliente novo agendou em <strong class="text-white">${n}</strong> agora há pouco`,
    color: 'green',
    event: 'agendamento',
  },
  {
    fn:    n => `<strong class="text-white">${n}</strong> preencheu <span class="text-green-400 font-semibold">todos os horários</span> da semana`,
    color: 'green',
    event: 'agendamento',
  },
  // WhatsApp click
  {
    fn:    n => `Cliente entrou em contato com <strong class="text-white">${n}</strong> pelo WhatsApp`,
    color: 'green',
    event: 'whatsapp',
  },
  {
    fn:    n => `<strong class="text-white">${n}</strong> recebeu <span class="text-green-400 font-semibold">+5 contatos</span> via WhatsApp hoje`,
    color: 'green',
    event: 'whatsapp',
  },
  // Google
  {
    fn:    n => `<strong class="text-white">${n}</strong> apareceu na <span class="text-green-400 font-semibold">1ª posição</span> do Google`,
    color: 'blue',
    event: 'google',
  },
  {
    fn:    n => `<strong class="text-white">${n}</strong> foi encontrado por novos clientes no Google`,
    color: 'blue',
    event: 'google',
  },
  {
    fn:    n => `<strong class="text-white">${n}</strong> ganhou <span class="text-blue-400 font-semibold">+12 visitas</span> orgânicas essa semana`,
    color: 'blue',
    event: 'google',
  },
  // Confirmação automática
  {
    fn:    n => `Horário confirmado automaticamente em <strong class="text-white">${n}</strong>`,
    color: 'green',
    event: 'confirmacao',
  },
  {
    fn:    n => `<strong class="text-white">${n}</strong> economizou <span class="text-green-400 font-semibold">+2h</span> de resposta hoje`,
    color: 'green',
    event: 'confirmacao',
  },
  {
    fn:    n => `<strong class="text-white">${n}</strong> zerou as faltas com confirmação automática`,
    color: 'green',
    event: 'confirmacao',
  },
  // Fila de espera
  {
    fn:    n => `Fila de espera preencheu horário vago em <strong class="text-white">${n}</strong>`,
    color: 'yellow',
    event: 'fila',
  },
  {
    fn:    n => `<strong class="text-white">${n}</strong> não perdeu nenhum horário — fila de espera funcionou`,
    color: 'yellow',
    event: 'fila',
  },
]

// ─── Fallback pool (usado antes/se a API não retornar) ─────────────────────────
const FALLBACK_NAMES = [
  'Barbearia do João',   'Barber Prime',        'Corte Fino',
  'Navalha Gold',        'Studio RJ Barber',    'BarberKing SP',
  'Old School Barber',   'Barbearia do Marcos',  'RL Barber Shop',
  'Corte & Estilo',      'Barbearia Paulistana', 'Tesoura de Ouro',
  'Barber House',        'Nobre Barber',         'Studio Cut',
]

const FALLBACK_LOCATIONS = [
  'Pinheiros, SP',   'Moema, SP',         'Vila Mariana, SP',
  'Lapa, SP',        'Santana, SP',       'Tijuca, RJ',
  'Botafogo, RJ',    'Barra da Tijuca, RJ','Centro, BH',
  'Savassi, BH',     'Boa Viagem, PE',    'Meireles, CE',
  'Batel, PR',       'Cidade Baixa, RS',  'Itaim Bibi, SP',
]

function buildFallbackPool(): ToastItem[] {
  return FALLBACK_NAMES.map(name => {
    const tpl = pick(MSG_TEMPLATES)
    return {
      shopName: name,
      avatar:   '',
      location: pick(FALLBACK_LOCATIONS),
      msg:      tpl.fn(name),
      time:     pick(TIMES),
      color:    tpl.color,
    }
  })
}

// ─── Fetch de barbearias reais da API ──────────────────────────────────────────
async function buildApiPool() {
  try {
    const { fetch: fetchShops, data } = useBarbershopApi({
      sort:  'relevance',
      limit: 30,
    })
    await fetchShops()

    if (!data.value.length) return

    const items: ToastItem[] = data.value.map(shop => {
      const tpl  = pick(MSG_TEMPLATES)
      const name = shop.name

      // Monta localização legível
      const location = [shop.neighborhood, shop.city, shop.state]
        .filter(Boolean)
        .join(', ')

      return {
        shopName: name,
        avatar:   shop.logoUrl || shop.coverImageUrl || (shop.photos?.[0] ?? ''),
        location,
        msg:      tpl.fn(name),
        time:     pick(TIMES),
        color:    tpl.color,
      }
    })

    // Mistura com fallbacks pra ter variedade mesmo com poucos resultados
    pool.value = shuffle([...items, ...buildFallbackPool()])
  } catch {
    pool.value = shuffle(buildFallbackPool())
  }
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

// ─── Exibição ──────────────────────────────────────────────────────────────────
function nextItem(): ToastItem {
  if (!pool.value.length) pool.value = shuffle(buildFallbackPool())

  // Avança no pool ciclicamente; randomiza a mensagem a cada passagem
  const shop = pool.value[poolIndex % pool.value.length]
  poolIndex++

  // Re-sorteia template e time para parecer mais orgânico
  const tpl = pick(MSG_TEMPLATES)
  return {
    ...shop,
    msg:  tpl.fn(shop.shopName),
    time: pick(TIMES),
    color: tpl.color,
  }
}

function fire() {
  current.value        = nextItem()
  visible.value        = true
  progressActive.value = false

  // Dois frames para garantir que a transição CSS dispare do zero
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressActive.value = true
    })
  })

  clearTimeout(hideTimer!)
  hideTimer = setTimeout(() => {
    visible.value        = false
    progressActive.value = false
  }, DURATION)
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  // Carrega pool em background; enquanto isso usa fallback
  pool.value = shuffle(buildFallbackPool())
  buildApiPool() // fire-and-forget — atualiza pool.value quando terminar

  initTimer = setTimeout(() => {
    fire()
    intervalTimer = setInterval(fire, props.interval + DURATION)
  }, props.initialDelay)
})

onUnmounted(() => {
  clearTimeout(initTimer!)
  clearTimeout(hideTimer!)
  clearInterval(intervalTimer!)
})
</script>

<style scoped>
.fomo-slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.3s ease;
}
.fomo-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.25s ease;
}
.fomo-slide-enter-from,
.fomo-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>