/**
 * useInfluencer — lê os query params do influencer na URL
 *
 * Params suportados:
 *   ref       → slug único, ex: joao-barber
 *   nome      → nome exibido, ex: João Barber
 *   foto      → URL da foto (encodeURIComponent), ex: https%3A%2F%2F...
 *   cor       → hex SEM #, ex: f97316 (laranja) | 34d399 (verde padrão)
 *   frase     → frase/bio exibida na landing
 *   ticket    → ticket médio em R$ (número), ex: 99.90
 *   comissao  → % de comissão (número), ex: 30
 *
 * Exemplo de URL completa:
 *   /barbearia?ref=joao-barber&nome=Jo%C3%A3o+Barber&foto=https%3A%2F%2F...&cor=f97316&frase=Uso+e+indico&ticket=99.9&comissao=30
 */

export function useInfluencer() {
    const route = useRoute()
  
    const influencer = computed(() => ({
      ref:      (route.query.ref      as string) || null,
      nome:     (route.query.nome     as string) || null,
      foto:     (route.query.foto     as string) || null,   // URL encodeURIComponent
      cor:      (route.query.cor      as string) || '34d399',
      frase:    (route.query.frase    as string) || null,
      ticket:   Number(route.query.ticket   || 99.90),
      comissao: Number(route.query.comissao || 30),
    }))
  
    /** true quando há um influencer identificado na URL */
    const hasInfluencer = computed(() => !!influencer.value.ref)
  
    /** nome formatado pra exibição — fallback gracioso */
    const nomeDisplay = computed(() =>
      influencer.value.nome || (influencer.value.ref ? `@${influencer.value.ref}` : null)
    )
  
    /** URL da foto decodificada */
    const fotoUrl = computed(() =>
      influencer.value.foto ? decodeURIComponent(influencer.value.foto) : null
    )
  
    /** cor CSS com # */
    const corHex = computed(() => `#${influencer.value.cor}`)
  
    /** frase com fallback */
    const fraseDisplay = computed(() =>
      influencer.value.frase || 'Eu uso e indico a SuaAgenda pra toda a minha audiência.'
    )
  
    /** WhatsApp link com ref do influencer na mensagem */
    const whatsappLink = computed(() => {
      const base = 'https://wa.me/5511941649284'
      const ref = influencer.value.ref ? ` (indicação: ${influencer.value.ref})` : ''
      const text = encodeURIComponent(`Quero testar a SuaAgenda${ref}`)
      return `${base}?text=${text}`
    })
  
    /** WhatsApp link pra parceria (página do influencer) */
    const whatsappParceiroLink = computed(() => {
      const base = 'https://wa.me/5511999999999'
      const ref = influencer.value.ref ? ` (ref: ${influencer.value.ref})` : ''
      const text = encodeURIComponent(`Vim pelo ${nomeDisplay.value}${ref} e quero entender a parceria`)
      return `${base}?text=${text}`
    })
  
    return {
      influencer,
      hasInfluencer,
      nomeDisplay,
      fotoUrl,
      corHex,
      fraseDisplay,
      whatsappLink,
      whatsappParceiroLink,
    }
  }