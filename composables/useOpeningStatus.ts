// composables/useOpeningStatus.ts
// Calcula se a barbearia está aberta, fechada ou fechando em breve
// baseado no openingHours: { mon: { open: '09:00', close: '20:00' }, ..., sun: null }

export type OpeningStatus = 'open' | 'closing_soon' | 'closed'

export interface OpeningStatusResult {
  status: OpeningStatus
  label: string          // ex: "Aberto agora", "Fecha às 20h", "Fechado"
  sublabel: string       // ex: "Fecha em 30 min", "Abre amanhã às 9h", "Abre hoje às 9h"
  color: string          // classe tailwind de cor
  todayHours: string | null  // ex: "09:00 – 20:00" ou null se fechado hoje
}

// Mapa de índice JS (0=dom) → chave do modelo
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const
type DayKey = typeof DAY_KEYS[number]

const DAY_LABELS: Record<DayKey, string> = {
  sun: 'domingo',
  mon: 'segunda',
  tue: 'terça',
  wed: 'quarta',
  thu: 'quinta',
  fri: 'sexta',
  sat: 'sábado',
}

type DaySchedule = { open: string; close: string } | null
type OpeningHours = Partial<Record<DayKey, DaySchedule>>

// Converte "HH:MM" em minutos desde meia-noite
function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

// Retorna a chave do dia para um índice JS com offset
function dayKey(jsDay: number, offset = 0): DayKey {
  return DAY_KEYS[(jsDay + offset + 7) % 7]
}

export function useOpeningStatus(
  openingHours: OpeningHours | null | undefined,
  // Threshold em minutos para "fechando em breve" (padrão: 60 min)
  closingSoonThreshold = 60
): OpeningStatusResult {

  const fallback: OpeningStatusResult = {
    status:     'closed',
    label:      'Horário não informado',
    sublabel:   '',
    color:      'text-gray-500',
    todayHours: null,
  }

  if (!openingHours) return fallback

  const now     = new Date()
  const jsDay   = now.getDay()           // 0=dom, 1=seg, ...
  const nowMin  = now.getHours() * 60 + now.getMinutes()

  const todayKey    = dayKey(jsDay)
  const todaySchd   = openingHours[todayKey] ?? null
  const todayHours  = todaySchd ? `${todaySchd.open} – ${todaySchd.close}` : null

  // ── Está aberto hoje? ──────────────────────────────────────────────────
  if (todaySchd) {
    const openMin  = toMinutes(todaySchd.open)
    const closeMin = toMinutes(todaySchd.close)

    if (nowMin >= openMin && nowMin < closeMin) {
      const minsLeft = closeMin - nowMin

      // Fechando em breve
      if (minsLeft <= closingSoonThreshold) {
        const closeHour = todaySchd.close.replace(':', 'h').replace(/^0/, '')
        return {
          status:     'closing_soon',
          label:      `Fecha às ${closeHour}`,
          sublabel:   minsLeft <= 30
            ? `Fecha em ${minsLeft} min`
            : `Fecha em ${Math.round(minsLeft / 60 * 10) / 10}h`,
          color:      'text-amber-400',
          todayHours,
        }
      }

      // Aberto normalmente
      const closeHour = todaySchd.close.replace(':', 'h').replace(/^0/, '')
      return {
        status:     'open',
        label:      'Aberto agora',
        sublabel:   `Fecha às ${closeHour}`,
        color:      'text-green-400',
        todayHours,
      }
    }

    // Ainda vai abrir hoje (antes do horário de abertura)
    if (nowMin < toMinutes(todaySchd.open)) {
      const openHour = todaySchd.open.replace(':', 'h').replace(/^0/, '')
      return {
        status:     'closed',
        label:      'Fechado agora',
        sublabel:   `Abre hoje às ${openHour}`,
        color:      'text-red-400',
        todayHours,
      }
    }
  }

  // ── Fechado hoje — procura próximo dia com horário ────────────────────
  for (let offset = 1; offset <= 7; offset++) {
    const nextKey   = dayKey(jsDay, offset)
    const nextSchd  = openingHours[nextKey] ?? null
    if (!nextSchd) continue

    const openHour  = nextSchd.open.replace(':', 'h').replace(/^0/, '')
    const label     = offset === 1 ? 'amanhã' : `${DAY_LABELS[nextKey]}`

    return {
      status:     'closed',
      label:      'Fechado agora',
      sublabel:   `Abre ${label} às ${openHour}`,
      color:      'text-red-400',
      todayHours,
    }
  }

  // Sem horário configurado pra nenhum dia
  return fallback
}