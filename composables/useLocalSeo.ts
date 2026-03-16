// composables/useLocalSeo.ts
import { computed } from 'vue'
import { getNeighborhoodData, type Neighborhood } from '~/data/locations'

export interface LocalSeoData {
  neighborhoodName: string
  districtName: string
  cityName: string
  citySlug: string
  neighborhoodSlug: string
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
}

export function useLocalSeo(citySlug: string, neighborhoodSlug: string) {
  const data = computed((): LocalSeoData | null => {
    const result = getNeighborhoodData(citySlug, neighborhoodSlug)
    if (!result) return null

    const { city, district, neighborhood } = result
    const neighborhoodName = neighborhood.name
    const cityName = city.city
    const districtName = district.name

    const h1 = `Barbearias em ${neighborhoodName}, ${cityName}`
    const metaTitle = `Barbearias em ${neighborhoodName} — Agende Online | SuaAgenda`
    const metaDescription = `Encontre barbearias em ${neighborhoodName}, ${districtName}, ${cityName}. Agende horário online, sem fila, direto pelo WhatsApp. Profissionais com agenda digital.`
    const canonicalUrl = `https://suaagenda.link/barbearias/${city.citySlug}/${neighborhoodSlug}`

    const introParagraph = `Se você procura barbearias em ${neighborhoodName}, ${cityName}, existem diversos profissionais que atendem a região. A procura por serviços de barbearia em ${districtName} cresceu nos últimos anos, e cada vez mais barbeiros do bairro apostam em ferramentas digitais para organizar a agenda e receber novos clientes.`

    const secondParagraph = `Muitos barbeiros do bairro ${neighborhoodName} já utilizam agenda online para organizar horários e evitar filas. Com um sistema de agendamento para barbearias em ${cityName}, os profissionais conseguem receber marcações diretamente pelo celular — enquanto estão na cadeira atendendo — e reduzir faltas com confirmação automática pelo WhatsApp.`

    const thirdParagraph = `Barbeiros em ${neighborhoodName} podem usar nossa agenda online para organizar horários, receber agendamentos pelo WhatsApp e aparecer nas primeiras posições do Google quando alguém busca por "barbearia em ${neighborhoodName}". O sistema entra no ar em menos de 5 minutos, sem precisar de técnico.`

    const internalLinks = [
      { label: `Sistema de agenda para barbearias em ${cityName}`, href: '/barbearia' },
      { label: 'Como funciona o agendamento online', href: '/barbearia#como-funciona' },
      { label: 'Planos e preços para barbeiros', href: '/barbearia#preco' },
      { label: `Barbeiros em ${cityName} com agenda online`, href: `/barbeiros/${city.citySlug}` },
      { label: 'Como divulgar sua barbearia', href: '/blog/como-divulgar-barbearia' },
      { label: 'Como conseguir mais clientes na barbearia', href: '/blog/como-conseguir-clientes-barbearia' },
      { label: 'Link de agendamento pelo WhatsApp', href: '/recursos/link-agendamento' },
      { label: 'Agenda online para barbearias', href: '/recursos/agenda-online' },
    ]

    const nearbyNeighborhoods = district.neighborhoods.filter(
      (n) => n.slug !== neighborhoodSlug
    )

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://suaagenda.link' },
          { '@type': 'ListItem', position: 2, name: 'Barbearias', item: 'https://suaagenda.link/barbearias' },
          { '@type': 'ListItem', position: 3, name: cityName, item: `https://suaagenda.link/barbearias/${city.citySlug}` },
          { '@type': 'ListItem', position: 4, name: neighborhoodName, item: canonicalUrl },
        ],
      },
      mainEntity: {
        '@type': 'ItemList',
        name: `Barbearias em ${neighborhoodName}`,
        description: `Barbearias e barbeiros em ${neighborhoodName}, ${cityName} com agenda online`,
      },
    }

    return {
      neighborhoodName,
      districtName,
      cityName,
      citySlug: city.citySlug,
      neighborhoodSlug,
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
    }
  })

  return { data }
}