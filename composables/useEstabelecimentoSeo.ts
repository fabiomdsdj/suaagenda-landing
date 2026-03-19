// composables/useEstabelecimentoSeo.ts
// Gera SEO específico ao estabelecimento (metaTitle, metaDescription, description longa)
// Diferente do useLocalSeo que é focado em páginas de listagem por bairro

export interface EstabelecimentoSeoInput {
    name: string
    neighborhood: string
    city: string
    state: string
    googleRating?: number | null
    googleReviewCount?: number
    services?: { name: string; isActive?: boolean }[]
  }
  
  export interface EstabelecimentoSeoOutput {
    metaTitle: string
    metaDescription: string
    description: string
  }
  
  export function useEstabelecimentoSeo(input: EstabelecimentoSeoInput): EstabelecimentoSeoOutput {
    const { name, neighborhood, city, state, googleRating, googleReviewCount, services } = input
  
    // ── Meta Title ──────────────────────────────────────────────────────────
    // Formato: Nome da Barbearia — Bairro, Cidade
    const metaTitle = `${name} — ${neighborhood}, ${city}`
  
    // ── Serviços ativos formatados ──────────────────────────────────────────
    const activeServices = (services ?? [])
      .filter(s => s.isActive !== false && s.name)
      .map(s => s.name)
      .slice(0, 4) // máximo 4 pra não explodir a description
  
    const servicesText = activeServices.length > 0
      ? activeServices.length === 1
        ? activeServices[0]
        : `${activeServices.slice(0, -1).join(', ')} e ${activeServices[activeServices.length - 1]}`
      : null
  
    // ── Rating formatado ───────────────────────────────────────────────────
    const ratingText = googleRating
      ? googleReviewCount && googleReviewCount > 0
        ? `${Number(googleRating).toFixed(1)} ★ (${googleReviewCount} avaliações)`
        : `${Number(googleRating).toFixed(1)} ★`
      : null
  
    // ── Meta Description ────────────────────────────────────────────────────
    // Até 160 chars: nome + localização + serviços + nota + CTA
    let metaDescription = `${name} em ${neighborhood}, ${city}-${state}.`
  
    if (servicesText) {
      metaDescription += ` Especialistas em ${servicesText.toLowerCase()}.`
    }
  
    if (ratingText) {
      metaDescription += ` ${ratingText} no Google.`
    }
  
    metaDescription += ` Agende online, sem fila.`
  
    // Trunca se passar de 160 chars
    if (metaDescription.length > 160) {
      metaDescription = metaDescription.substring(0, 157) + '...'
    }
  
    // ── Descrição longa (estilo Google Business) ────────────────────────────
    // Parágrafos variados baseados nos dados disponíveis
    const paragraphs: string[] = []
  
    // § 1 — Apresentação geral
    const intro = servicesText
      ? `A ${name} é uma barbearia localizada no bairro ${neighborhood}, em ${city}/${state}, especializada em ${servicesText.toLowerCase()}. Com atendimento personalizado e profissionais experientes, o espaço foi criado para oferecer uma experiência completa de cuidados masculinos em um ambiente confortável e descontraído.`
      : `A ${name} é uma barbearia localizada no bairro ${neighborhood}, em ${city}/${state}. Com atendimento personalizado e profissionais experientes, o espaço foi criado para oferecer uma experiência completa de cuidados masculinos em um ambiente confortável e descontraído.`
  
    paragraphs.push(intro)
  
    // § 2 — Reputação/serviços (só se tiver dado relevante)
    if (ratingText || activeServices.length > 0) {
      let repParagraph = ''
  
      if (ratingText && activeServices.length > 0) {
        repParagraph = `Avaliada com ${ratingText} pelos próprios clientes, a barbearia se destaca pela qualidade nos serviços de ${servicesText?.toLowerCase() ?? 'corte e barba'}. Cada atendimento é feito com atenção aos detalhes, usando produtos de qualidade e técnicas atualizadas para garantir o melhor resultado.`
      } else if (ratingText) {
        repParagraph = `Avaliada com ${ratingText} pelos próprios clientes no Google, a ${name} é reconhecida pela qualidade do atendimento e pelo cuidado com cada detalhe. A satisfação dos clientes é prioridade em todos os serviços prestados.`
      } else if (activeServices.length > 0) {
        repParagraph = `O cardápio de serviços inclui ${servicesText?.toLowerCase()}, atendendo desde o cliente que busca um corte clássico até quem quer um visual mais moderno. Os profissionais estão sempre atualizados com as tendências e técnicas mais recentes do mercado.`
      }
  
      if (repParagraph) paragraphs.push(repParagraph)
    }
  
    // § 3 — Localização e agendamento
    const ctaParagraph = `Situada no ${neighborhood}, a ${name} atende clientes de toda a região de ${city} e cidades vizinhas. Para evitar espera, é possível agendar horário diretamente pelo WhatsApp ou pela plataforma online — rápido, sem complicação e disponível a qualquer hora do dia.`
    paragraphs.push(ctaParagraph)
  
    const description = paragraphs.join('\n\n')
  
    return { metaTitle, metaDescription, description }
  }