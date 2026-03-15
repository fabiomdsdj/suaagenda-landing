// composables/useBarberJsonLd.ts
// Uso: chamar no useHead() da página ou diretamente no setup

export function useBarberJsonLd() {

    // ─── 1. SoftwareApplication — o produto em si ─────────────────────────────
    const softwareApp = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'SuaAgenda',
      url: 'https://suaagenda.link',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      description:
        'Sistema de agendamento online para barbearias com confirmação automática via WhatsApp, site próprio indexado no Google e portal de descoberta regional.',
      offers: {
        '@type': 'Offer',
        price: '79.90',
        priceCurrency: 'BRL',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '79.90',
          priceCurrency: 'BRL',
          billingDuration: 'P1M', // mensal
          unitText: 'mês',
        },
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'SuaAgenda',
          url: 'https://suaagenda.link',
        },
      },
      featureList: [
        'Agendamento online 24h',
        'Confirmação automática via WhatsApp Business API',
        'Site próprio da barbearia indexado no Google',
        'Portal de descoberta regional de barbearias',
        'Fila de espera automática',
        'Liberação automática de horário não confirmado',
        'Agenda manual e bloqueio de horários',
        'Link de agendamento para WhatsApp e Instagram',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '6',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          author: { '@type': 'Person', name: 'Felipe Costa' },
          reviewBody:
            'Em um mês já tinha 4 clientes novos que vieram pelo Google. Nunca tinha acontecido isso antes.',
        },
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          author: { '@type': 'Person', name: 'Wellington Santos' },
          reviewBody:
            'Ficava respondendo WhatsApp o dia todo. Agora mando o link e o cliente agenda sozinho.',
        },
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          author: { '@type': 'Person', name: 'Rafael Lima' },
          reviewBody:
            'As faltas caíram muito depois que o sistema começou a pedir confirmação. Sexta-feira sempre cheia.',
        },
      ],
    }
  
    // ─── 2. FAQPage — as perguntas frequentes ─────────────────────────────────
    const faqPage = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quanto tempo leva pra configurar o sistema de agendamento?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Só 5 minutos de verdade. Os serviços mais comuns já vêm pré-preenchidos — corte, barba, combo, sobrancelha. Você confirma o que usa, ajusta o preço se quiser e o link já está pronto pra divulgar.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como funciona a confirmação automática de agendamento via WhatsApp?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Quando o cliente escolhe um horário, ele fica pendente. O sistema manda um WhatsApp oficial pedindo confirmação. Respondeu SIM, o horário fica garantido. Não respondeu até o prazo, o horário volta pra agenda automaticamente.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que são os créditos de agendamento do WhatsApp?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O WhatsApp Business API tem um custo por mensagem enviada. Por isso, cada horário confirmado pelo sistema consome um crédito de agendamento. Os créditos já vêm inclusos no plano mensal de R$79,90.',
          },
        },
        {
          '@type': 'Question',
          name: 'Em quanto tempo minha barbearia aparece no Google?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O Google costuma indexar a página da barbearia em 2 a 3 semanas. A maioria das barbearias aparece nas buscas em menos de um mês.',
          },
        },
        {
          '@type': 'Question',
          name: 'Os clientes precisam baixar algum aplicativo para agendar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. O cliente clica no link, abre no navegador do celular e já agenda. Sem baixar nada.',
          },
        },
        {
          '@type': 'Question',
          name: 'O sistema de agendamento funciona só para barbearia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Funciona para qualquer negócio que vive de horário: barbearia, salão de beleza, manicure, cílios, sobrancelha, estética, clínica.',
          },
        },
        {
          '@type': 'Question',
          name: 'Tem fidelidade ou multa para cancelar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. Você cancela quando quiser, sem burocracia. É mês a mês.',
          },
        },
      ],
    }
  
    // ─── 3. WebSite — com SearchAction para sitelinks search box ──────────────
    const webSite = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SuaAgenda',
      url: 'https://suaagenda.link',
      description: 'Plataforma de agendamento online para barbearias e salões de beleza.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://suaagenda.link/buscar?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    }
  
    // ─── 4. Organization — autoridade da marca ────────────────────────────────
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SuaAgenda',
      url: 'https://suaagenda.link',
      logo: 'https://suaagenda.link/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: 'Portuguese',
        contactOption: 'TollFree',
      },
      sameAs: [
        'https://www.instagram.com/suaagenda',
        'https://www.facebook.com/suaagenda',
      ],
    }
  
    // ─── 5. BreadcrumbList — para a página /barbearia ─────────────────────────
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: 'https://suaagenda.link',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Barbearias',
          item: 'https://suaagenda.link/barbearia',
        },
      ],
    }
  
    // ─── injeta tudo no <head> via useHead ────────────────────────────────────
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(softwareApp),
          key: 'jsonld-software',
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(faqPage),
          key: 'jsonld-faq',
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(webSite),
          key: 'jsonld-website',
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(organization),
          key: 'jsonld-org',
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(breadcrumb),
          key: 'jsonld-breadcrumb',
        },
      ],
    })
  }