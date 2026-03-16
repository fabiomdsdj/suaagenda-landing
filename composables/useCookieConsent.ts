// composables/useCookieConsent.ts
// Gerencia consentimento LGPD e carrega GA só após aceite

const GA_ID = 'G-MB7JZNQX5L'
const COOKIE_KEY = 'cookie_consent' // 'accepted' | 'rejected' | null

export function useCookieConsent() {
  const consent = useCookie(COOKIE_KEY, {
    maxAge: 60 * 60 * 24 * 365, // 1 ano
    sameSite: 'lax',
  })

  // true = mostrar banner, false = já decidiu
  const showBanner = computed(() => !consent.value)

  function loadGA() {
    if (!import.meta.client) return
    if (document.getElementById('ga-script')) return // já carregado

    const script1 = document.createElement('script')
    script1.id = 'ga-script'
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    script1.async = true
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { anonymize_ip: true });
    `
    document.head.appendChild(script2)
  }

  function accept() {
    consent.value = 'accepted'
    loadGA()
  }

  function reject() {
    consent.value = 'rejected'
    // GA não carrega, garante que não rastreia
  }

  // Se já aceitou em sessão anterior, carrega GA automaticamente
  function init() {
    if (import.meta.client && consent.value === 'accepted') {
      loadGA()
    }
  }

  return { consent, showBanner, accept, reject, init }
}