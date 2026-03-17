// composables/useLocalSeo.ts — VERSÃO ATUALIZADA COM UF + SERVIÇOS
import { computed } from 'vue'
import { getNeighborhoodData, type Neighborhood, allServices, type Service } from '~/data/locations'

export interface LocalSeoData {
  neighborhoodName: string
  districtName: string
  zoneName: string       // ex: "Zona Leste", "Baixada Santista"
  cityName: string
  citySlug: string
  uf: string             // ✅ NOVO
  ufSlug: string         // ✅ NOVO
  neighborhoodSlug: string
  serviceName?: string   // ✅ NOVO (opcional)
  serviceSlug?: string   // ✅ NOVO (opcional)
  h1: string
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  introParagraph: string
  secondParagraph: string
  thirdParagraph: string
  internalLinks: { label: string; href: string }[]
  jsonLd: object
  nearbyNeighborhoods: Neighborhood[]
  availableServices: Service[]  // ✅ NOVO
}

export function useLocalSeo(
  ufSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
  serviceSlug?: string  // ✅ NOVO parâmetro opcional
) {
  const data = computed((): LocalSeoData | null => {
    const result = getNeighborhoodData(ufSlug, citySlug, neighborhoodSlug)
    if (!result) return null

    const { city, district, neighborhood } = result

    const neighborhoodName = neighborhood.name
    const cityName         = city.city
    const districtName     = district.name
    const uf               = city.uf
    const ufSlugValue      = city.ufSlug

    // zone fica no district para SP ou city.zone para outras cidades
    const zoneName = district.zone ?? city.zone

    // ✅ Buscar dados do serviço (se fornecido)
    const service = serviceSlug 
      ? allServices.find(s => s.slug === serviceSlug) 
      : undefined

    const serviceName = service?.name ?? ''
    const serviceEmoji = service?.emoji ?? '💈'

    // ── H1 e Meta ──────────────────────────────────────────────────────────
    const h1 = service
      ? `${serviceName} em ${neighborhoodName}, ${cityName}`
      : `Barbearias em ${neighborhoodName}, ${cityName}`

    const metaTitle = service
      ? `${serviceName} em ${neighborhoodName} — Agende Online | SuaAgenda`
      : `Barbearias em ${neighborhoodName} — Agende Online | SuaAgenda`

    const metaDescription = service
      ? `Encontre profissionais de ${serviceName.toLowerCase()} em ${neighborhoodName}, ${districtName}, ${cityName}. Agende horário online, sem fila, direto pelo WhatsApp.`
      : `Encontre barbearias em ${neighborhoodName}, ${districtName}, ${cityName}. Agende horário online, sem fila, direto pelo WhatsApp. Profissionais com agenda digital.`

    const canonicalUrl = service
      ? `https://suaagenda.link/barbearias/${ufSlugValue}/${city.citySlug}/${neighborhoodSlug}/${serviceSlug}`
      : `https://suaagenda.link/barbearias/${ufSlugValue}/${city.citySlug}/${neighborhoodSlug}`

    // ── Parágrafos ─────────────────────────────────────────────────────────
    const introParagraph = service
      ? `Se você procura ${serviceName.toLowerCase()} em ${neighborhoodName}, ${cityName}, existem diversos profissionais que atendem a região. A procura por ${serviceName.toLowerCase()} em ${districtName} cresceu nos últimos anos, e cada vez mais barbeiros do bairro apostam em ferramentas digitais para organizar a agenda e receber novos clientes.`
      : `Se você procura barbearias em ${neighborhoodName}, ${cityName}, existem diversos profissionais que atendem a região. A procura por serviços de barbearia em ${districtName} cresceu nos últimos anos, e cada vez mais barbeiros do bairro apostam em ferramentas digitais para organizar a agenda e receber novos clientes.`

    const secondParagraph = service
      ? `Muitos profissionais de ${serviceName.toLowerCase()} do bairro ${neighborhoodName} já utilizam agenda online para organizar horários e evitar filas. Com um sistema de agendamento, os barbeiros conseguem receber marcações diretamente pelo celular — enquanto estão na cadeira atendendo — e reduzir faltas com confirmação automática pelo WhatsApp.`
      : `Muitos barbeiros do bairro ${neighborhoodName} já utilizam agenda online para organizar horários e evitar filas. Com um sistema de agendamento para barbearias em ${cityName}, os profissionais conseguem receber marcações diretamente pelo celular — enquanto estão na cadeira atendendo — e reduzir faltas com confirmação automática pelo WhatsApp.`

    const thirdParagraph = service
      ? `Barbeiros em ${neighborhoodName} podem usar nossa agenda online para organizar horários de ${serviceName.toLowerCase()}, receber agendamentos pelo WhatsApp e aparecer nas primeiras posições do Google quando alguém busca por "${serviceName.toLowerCase()} em ${neighborhoodName}". O sistema entra no ar em menos de 5 minutos, sem precisar de técnico.`
      : `Barbeiros em ${neighborhoodName} podem usar nossa agenda online para organizar horários, receber agendamentos pelo WhatsApp e aparecer nas primeiras posições do Google quando alguém busca por "barbearia em ${neighborhoodName}". O sistema entra no ar em menos de 5 minutos, sem precisar de técnico.`

    // ── Links internos ─────────────────────────────────────────────────────
    const internalLinks = [
      { label: `Sistema de agenda para barbearias em ${cityName}`,  href: '/barbearia' },
      { label: 'Como funciona o agendamento online',                href: '/barbearia#como-funciona' },
      { label: 'Planos e preços para barbeiros',                    href: '/barbearia#preco' },
      { label: `Barbeiros em ${cityName} com agenda online`,        href: `/barbeiros/${ufSlugValue}/${city.citySlug}` },
      { label: 'Como divulgar sua barbearia',                       href: '/blog/como-divulgar-barbearia' },
      { label: 'Como conseguir mais clientes na barbearia',         href: '/blog/como-conseguir-clientes-barbearia' },
      { label: 'Link de agendamento pelo WhatsApp',                 href: '/recursos/link-agendamento' },
      { label: 'Agenda online para barbearias',                     href: '/recursos/agenda-online' },
    ]

    // ── Bairros próximos ───────────────────────────────────────────────────
    const nearbyNeighborhoods = district.neighborhoods
      .filter((n) => n.slug !== neighborhoodSlug)
      .slice(0, 8)

    // ── JSON-LD ────────────────────────────────────────────────────────────
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início',      item: 'https://suaagenda.link' },
          { '@type': 'ListItem', position: 2, name: 'Barbearias',  item: 'https://suaagenda.link/barbearias' },
          { '@type': 'ListItem', position: 3, name: uf,            item: `https://suaagenda.link/barbearias/${ufSlugValue}` },
          { '@type': 'ListItem', position: 4, name: cityName,      item: `https://suaagenda.link/barbearias/${ufSlugValue}/${city.citySlug}` },
          { '@type': 'ListItem', position: 5, name: neighborhoodName, item: canonicalUrl },
        ],
      },
      mainEntity: {
        '@type': 'ItemList',
        name: service ? `${serviceName} em ${neighborhoodName}` : `Barbearias em ${neighborhoodName}`,
        description: service 
          ? `Profissionais de ${serviceName.toLowerCase()} em ${neighborhoodName}, ${cityName} com agenda online`
          : `Barbearias e barbeiros em ${neighborhoodName}, ${cityName} com agenda online`,
      },
    }

    return {
      neighborhoodName,
      districtName,
      zoneName,
      cityName,
      citySlug: city.citySlug,
      uf,
      ufSlug: ufSlugValue,
      neighborhoodSlug,
      serviceName,
      serviceSlug,
      h1,
      metaTitle,
      metaDescription,
      canonicalUrl,
      introParagraph,
      secondParagraph,
      thirdParagraph,
      internalLinks,
      jsonLd,
      nearbyNeighborhoods,
      availableServices: allServices, // ✅ Lista de todos os serviços
    }
  })

  return { data }
}