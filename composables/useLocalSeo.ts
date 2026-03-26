// composables/useLocalSeo.ts
import { fetchLocations } from '@/composables/useLocation'
import { allServices, type Neighborhood, type Service, type CityData, type District } from '~/data/locations'

// ─────────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────────

export interface LocalSeoData {
  neighborhoodName:    string
  districtName:        string
  zoneName:            string
  cityName:            string
  citySlug:            string
  uf:                  string
  ufSlug:              string
  neighborhoodSlug:    string
  serviceName?:        string
  serviceSlug?:        string
  h1:                  string
  metaTitle:           string
  metaDescription:     string
  canonicalUrl:        string
  introParagraph:      string
  secondParagraph:     string
  thirdParagraph:      string
  internalLinks:       { label: string; href: string }[]
  jsonLd:              object
  nearbyNeighborhoods: Neighborhood[]
  availableServices:   Service[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Lookup (recebe cities injetado — API ou hardcode)
// ─────────────────────────────────────────────────────────────────────────────

function findNeighborhoodData(
  cities: CityData[],
  ufSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
): { city: CityData; district: District; neighborhood: Neighborhood } | null {
  console.log('🔍 [findNeighborhoodData] Procurando:', {
    ufSlug,
    citySlug,
    neighborhoodSlug,
    totalCities: cities.length
  })

  const city = cities.find(c => c.ufSlug === ufSlug && c.citySlug === citySlug)
  
  if (!city) {
    console.log('❌ [findNeighborhoodData] Cidade NÃO encontrada')
    return null
  }

  console.log('✅ [findNeighborhoodData] Cidade encontrada:', {
    city: city.city,
    districtsCount: city.districts.length
  })

  for (const district of city.districts) {
    const neighborhood = district.neighborhoods.find(n => n.slug === neighborhoodSlug)
    if (neighborhood) {
      console.log('✅ [findNeighborhoodData] Bairro encontrado:', {
        neighborhood: neighborhood.name,
        district: district.name
      })
      return { city, district, neighborhood }
    }
  }

  console.log('❌ [findNeighborhoodData] Bairro NÃO encontrado em nenhum distrito')
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// Builder — lógica pura, sem side effects
// ─────────────────────────────────────────────────────────────────────────────

function buildSeoData(
  cities: CityData[],
  ufSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
  serviceSlug?: string,
): LocalSeoData | null {
  console.log('🏗️ [buildSeoData] INÍCIO', {
    ufSlug,
    citySlug,
    neighborhoodSlug,
    serviceSlug
  })

  const result = findNeighborhoodData(cities, ufSlug, citySlug, neighborhoodSlug)
  
  if (!result) {
    console.log('❌ [buildSeoData] findNeighborhoodData retornou NULL')
    return null
  }

  const { city, district, neighborhood } = result

  console.log('✅ [buildSeoData] Dados encontrados:', {
    city: city.city,
    district: district.name,
    neighborhood: neighborhood.name
  })

  const neighborhoodName = neighborhood.name
  const cityName         = city.city
  const districtName     = district.name
  const uf               = city.uf
  const ufSlugValue      = city.ufSlug
  const zoneName         = district.zone ?? city.zone

  // ── Serviço ───────────────────────────────────────────────────────────────
  const service      = serviceSlug ? allServices.find(s => s.slug === serviceSlug) : undefined
  const serviceName  = service?.name  ?? ''
  const serviceEmoji = service?.emoji ?? '💈'

  console.log('🔧 [buildSeoData] Serviço:', {
    serviceSlug,
    found: !!service,
    serviceName
  })

  // ── H1 / Meta ─────────────────────────────────────────────────────────────
  const h1 = service
    ? `${serviceName} perto de mim em ${neighborhoodName}, ${cityName}`
    : `Barbearia mais próxima em ${neighborhoodName}, ${cityName}`

  const metaTitle = service
    ? `${serviceName} em ${neighborhoodName}`
    : `Barbearias em ${neighborhoodName}`

  const metaDescription = service
    ? `Encontre profissionais de ${serviceName.toLowerCase()} em ${neighborhoodName}, ${districtName}, ${cityName}. Agende horário online, sem fila.`
    : `Encontre barbearias próximas em ${neighborhoodName}, ${districtName}, ${cityName}. Agende horário online, sem fila. Profissionais com agenda digital.`

  const canonicalUrl = service
    ? `https://suaagenda.link/barbearias/${ufSlugValue}/${city.citySlug}/${neighborhoodSlug}/${serviceSlug}`
    : `https://suaagenda.link/barbearias/${ufSlugValue}/${city.citySlug}/${neighborhoodSlug}`

  // ── Parágrafos ────────────────────────────────────────────────────────────
  const introParagraph = service
    ? `Se você procura ${serviceName.toLowerCase()} em ${neighborhoodName}, ${cityName}, existem diversos profissionais que atendem a região. A procura por ${serviceName.toLowerCase()} em ${districtName} cresceu nos últimos anos, e cada vez mais barbeiros do bairro apostam em ferramentas digitais para organizar a agenda e receber novos clientes.`
    : `Se você procura uma barbearia próxima de você em ${neighborhoodName}, ${cityName}, existem diversos profissionais que atendem a região. A procura por serviços de barbearia em ${districtName} cresceu nos últimos anos, e cada vez mais barbeiros do bairro apostam em ferramentas digitais para organizar a agenda e receber novos clientes.`

  const secondParagraph = service
    ? `Muitos profissionais de ${serviceName.toLowerCase()} do bairro ${neighborhoodName} já utilizam agenda online para organizar horários e evitar filas. Com um sistema de agendamento, os barbeiros conseguem receber marcações diretamente pelo celular — enquanto estão na cadeira atendendo — e reduzir faltas com confirmação automática pelo WhatsApp.`
    : `Muitos barbeiros do bairro ${neighborhoodName} já utilizam agenda online para organizar horários e evitar filas. Com um sistema de agendamento para barbearias em ${cityName}, os profissionais conseguem receber marcações diretamente pelo celular — enquanto estão na cadeira atendendo — e reduzir faltas com confirmação automática pelo WhatsApp.`

  const thirdParagraph = service
    ? `Barbeiros em ${neighborhoodName} podem usar nossa agenda online para organizar horários de ${serviceName.toLowerCase()}, receber agendamentos pelo WhatsApp e aparecer nas primeiras posições do Google quando alguém busca por "${serviceName.toLowerCase()} em ${neighborhoodName}". O sistema entra no ar em menos de 5 minutos, sem precisar de técnico.`
    : `Barbeiros em ${neighborhoodName} podem usar nossa agenda online para organizar horários, receber agendamentos pelo WhatsApp e aparecer nas primeiras posições do Google quando alguém busca por "barbearia em ${neighborhoodName}". O sistema entra no ar em menos de 5 minutos, sem precisar de técnico.`

  // ── Links internos ────────────────────────────────────────────────────────
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

  // ── Bairros próximos ──────────────────────────────────────────────────────
  const nearbyNeighborhoods = district.neighborhoods
    .filter(n => n.slug !== neighborhoodSlug)
    .slice(0, 8)

  console.log('🗺️ [buildSeoData] Bairros próximos:', nearbyNeighborhoods.length)

  // ── JSON-LD ───────────────────────────────────────────────────────────────
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type':    'WebPage',
    name:        metaTitle,
    description: metaDescription,
    url:         canonicalUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início',           item: 'https://suaagenda.link' },
        { '@type': 'ListItem', position: 2, name: 'Barbearias',       item: 'https://suaagenda.link/barbearias' },
        { '@type': 'ListItem', position: 3, name: uf,                 item: `https://suaagenda.link/barbearias/${ufSlugValue}` },
        { '@type': 'ListItem', position: 4, name: cityName,           item: `https://suaagenda.link/barbearias/${ufSlugValue}/${city.citySlug}` },
        { '@type': 'ListItem', position: 5, name: neighborhoodName,   item: canonicalUrl },
      ],
    },
    mainEntity: {
      '@type':       'ItemList',
      name:          service ? `${serviceName} em ${neighborhoodName}` : `Barbearias em ${neighborhoodName}`,
      description:   service
        ? `Profissionais de ${serviceName.toLowerCase()} em ${neighborhoodName}, ${cityName} com agenda online`
        : `Barbearias e barbeiros em ${neighborhoodName}, ${cityName} com agenda online`,
    },
  }

  const seoData = {
    neighborhoodName,
    districtName,
    zoneName,
    cityName,
    citySlug:         city.citySlug,
    uf,
    ufSlug:           ufSlugValue,
    neighborhoodSlug,
    serviceName:      service ? serviceName : undefined,
    serviceSlug:      service ? serviceSlug : undefined,
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
    availableServices: allServices,
  }

  console.log('✅ [buildSeoData] SEO data construído com sucesso')

  return seoData
}

// ─────────────────────────────────────────────────────────────────────────────
// Composable público
// ─────────────────────────────────────────────────────────────────────────────

export function useLocalSeo(
  ufSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
  serviceSlug?: string,
) {
  console.log('🚀 [useLocalSeo] INÍCIO', {
    ufSlug,
    citySlug,
    neighborhoodSlug,
    serviceSlug,
    timestamp: new Date().toISOString()
  })

  // useAsyncData garante:
  // - roda 1x no SSR, hidrata no client sem refetch
  // - chave única por rota — sem colisão entre páginas
  // - data é Ref<LocalSeoData | null>, igual ao uso atual nas páginas
  const key = `seo:${ufSlug}:${citySlug}:${neighborhoodSlug}${serviceSlug ? `:${serviceSlug}` : ''}`

  console.log('🔑 [useLocalSeo] Cache key:', key)

  const { data } = useAsyncData<LocalSeoData | null>(key, async () => {
    console.log('💾 [useLocalSeo useAsyncData] Buscando locations...')
    const cities = await fetchLocations()
    
    console.log('📍 [useLocalSeo useAsyncData] Locations carregados:', {
      citiesCount: cities.length,
      firstCity: cities[0] ? cities[0].city : null
    })
    
    console.log('🏗️ [useLocalSeo useAsyncData] Chamando buildSeoData...')
    const result = buildSeoData(cities, ufSlug, citySlug, neighborhoodSlug, serviceSlug)
    
    console.log('📦 [useLocalSeo useAsyncData] Resultado buildSeoData:', {
      found: !!result,
      metaTitle: result?.metaTitle
    })
    
    return result
  })

  console.log('✨ [useLocalSeo] Retornando composable')

  return { data }
}