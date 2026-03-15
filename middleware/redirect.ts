export default defineNuxtRouteMiddleware((to, from) => {
    // exemplo: redireciona / para /barbearia
    if (to.path === '/') {
      return navigateTo('/barbearia', { redirectCode: 301 })
    }
  })