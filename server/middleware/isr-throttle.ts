// server/middleware/isr-throttle.ts
//
// Problema: o Nitro ISR revalida muitas páginas em paralelo quando
// o cache expira — cada uma bate em /barbershops + /barbershops/stats/counts
// simultaneamente, causando burst de centenas de requests por minuto.
//
// Solução: fila simples com concorrência máxima de 3 revalidações simultâneas.
// Requests além do limite recebem 429 com Retry-After — o Nitro vai tentar
// de novo e vai encontrar a fila mais livre.
//
// Só aplica em rotas SSR do backend (sem Origin = Nuxt SSR interno).
// Browsers com Origin passam direto — não afeta usuários reais.

const CONCURRENT_LIMIT = 3       // máx de revalidações simultâneas
const QUEUE_TIMEOUT_MS = 10_000  // desiste após 10s na fila

let activeCount = 0
const queue: Array<() => void> = []

function processQueue() {
  while (queue.length > 0 && activeCount < CONCURRENT_LIMIT) {
    const resolve = queue.shift()!
    activeCount++
    resolve()
  }
}

export default defineEventHandler(async (event) => {
  const path   = event.path || ''
  const origin = getHeader(event, 'origin')
  const method = event.method

  // Só aplica em rotas de barbearia sem Origin (= Nuxt SSR/ISR interno)
  // OPTIONS nunca entra na fila
  if (
    origin ||
    method === 'OPTIONS' ||
    !path.startsWith('/barbearias')
  ) return

  // Se tem capacidade, passa direto
  if (activeCount < CONCURRENT_LIMIT) {
    activeCount++
    event.node.res.on('finish', () => {
      activeCount--
      processQueue()
    })
    event.node.res.on('close', () => {
      activeCount--
      processQueue()
    })
    return
  }

  // Fila cheia — espera ou rejeita
  const waited = await new Promise<boolean>((resolve) => {
    const timeout = setTimeout(() => {
      // Remove da fila se ainda estiver lá
      const idx = queue.indexOf(proceed)
      if (idx !== -1) queue.splice(idx, 1)
      resolve(false) // timeout — rejeita
    }, QUEUE_TIMEOUT_MS)

    const proceed = () => {
      clearTimeout(timeout)
      resolve(true) // conseguiu slot
    }

    queue.push(proceed)
  })

  if (!waited) {
    // Timeout na fila — diz pro Nitro tentar mais tarde
    setResponseStatus(event, 429)
    setResponseHeaders(event, {
      'Retry-After': '5',
      'Content-Type': 'application/json',
    })
    return { error: 'ISR queue full, retry shortly' }
  }

  // Conseguiu slot — libera quando a resposta terminar
  event.node.res.on('finish', () => {
    activeCount--
    processQueue()
  })
  event.node.res.on('close', () => {
    activeCount--
    processQueue()
  })
})