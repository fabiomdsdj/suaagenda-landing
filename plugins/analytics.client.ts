// plugins/analytics.client.ts
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', 'G-35PTL676GR', { send_page_view: false })

    // Pageviews automáticos
    const router = useRouter()
    nuxtApp.hook('page:finish', () => {
      gtag('event', 'page_view', {
        page_path: router.currentRoute.value.fullPath,
        page_title: document.title
      })
    })
  }
})
