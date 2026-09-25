// data/siteModels/barbearia.ts
//
// Três modelos de site para barbearia (segment_types.name = 'barber') e o
// conteúdo da página comercial do segmento. Chunk próprio (index.ts).
//
// Catálogo só de visualização (previewOnly): o visitante escolhe o modelo e
// contrata; a personalização é no admin (Configuração do Site), a partir do
// modelo escolhido (utils/siteModelSeed.ts → API).
//
// Cuidados de texto: vocabulário de barbearia, sem termos de saúde
// (tests/siteModelsBarbearia.test.ts confere). Preços e durações realistas,
// dentro das regras do WL (types.ts).
//
// Dados de exemplo: endereços, telefones e WhatsApp são fictícios e NÃO vão
// para o site do cliente. As imagens são public_ids ainda NÃO enviados ao
// Cloudinary (ver SITE_MODEL_IMAGE_RE em types.ts).
import type { SegmentSiteModels } from './types'

const IMG = 'suaagenda/site-models/barbearia'

const barbearia: SegmentSiteModels = {
  segment: 'barbearia',
  segmentType: 'barber',
  label: 'Barbearia',
  previewOnly: true,

  models: [
    // ── 1. Clássica: barbearia tradicional de bairro ────────────────────────
    {
      id: 'classica',
      label: 'Clássica',
      pitch: 'Barbearia tradicional, com corte masculino, barba na navalha e atendimento de confiança.',
      theme: { preset: 'barbearia', font: 'barbearia', radius: 'sm' },
      content: {
        businessName: 'Barbearia Tradição',
        heroText: 'Corte e barba do jeito clássico',
        tagline: 'Barbearia tradicional em {cidade}, com corte masculino, barba na navalha e atendimento de quem conhece você.',
        heroImage: `${IMG}/classica/hero`,
        about: [
          'A {negocio} mantém o jeito tradicional de cuidar do visual masculino: conversa boa, cadeira confortável e acabamento caprichado.',
          'Corte, barba e pezinho feitos com calma, do jeito que você gosta.',
        ],
        categories: [
          { id: 'cabelo', name: 'Cabelo', image: `${IMG}/classica/categoria-cabelo` },
          { id: 'barba', name: 'Barba', image: `${IMG}/classica/categoria-barba` },
          { id: 'combos', name: 'Combos', image: `${IMG}/classica/categoria-combos` },
        ],
        services: [
          { name: 'Corte masculino', description: 'Corte na tesoura ou na máquina, com acabamento e finalização.', price: 45, durationMin: 30, categoryId: 'cabelo' },
          { name: 'Corte na máquina', description: 'Máquina em um pente só, rápido e bem acabado.', price: 35, durationMin: 30, categoryId: 'cabelo' },
          { name: 'Corte infantil', description: 'Corte para meninos de até 10 anos, feito com calma.', price: 35, durationMin: 30, categoryId: 'cabelo' },
          { name: 'Pezinho e acabamento', description: 'Contorno da nuca e das laterais entre um corte e outro.', price: 20, durationMin: 15, categoryId: 'cabelo' },
          { name: 'Barba tradicional', description: 'Barba feita na navalha, com toalha quente e loção pós-barba.', price: 40, durationMin: 30, categoryId: 'barba' },
          { name: 'Aparar a barba', description: 'Aparo e desenho da barba na máquina e na tesoura.', price: 30, durationMin: 30, categoryId: 'barba' },
          { name: 'Corte + barba', description: 'O combo clássico: corte masculino e barba na navalha.', price: 75, durationMin: 60, categoryId: 'combos' },
        ],
        professionals: [
          { name: 'Seu Antônio', role: 'Barbeiro e fundador', avatar: `${IMG}/classica/profissional-antonio` },
          { name: 'Marcos Lima', role: 'Barbeiro', avatar: `${IMG}/classica/profissional-marcos` },
          { name: 'Diego Souza', role: 'Barbeiro', avatar: `${IMG}/classica/profissional-diego` },
        ],
        unit: {
          street: 'Rua XV de Novembro, 410',
          neighborhood: 'Centro',
          city: 'Curitiba',
          state: 'PR',
          phone: '(41) 3300-0001',
          hours: [
            { days: [2, 3, 4, 5], open: '09:00', close: '19:00' },
            { days: [6], open: '08:00', close: '17:00' },
          ],
        },
        whatsapp: '41900000001',
      },
    },

    // ── 2. Premium: experiência sofisticada ─────────────────────────────────
    {
      id: 'premium',
      label: 'Premium',
      pitch: 'Barbearia sofisticada, com experiência completa, acabamento no detalhe e horário marcado.',
      theme: { preset: 'premium', font: 'premium', radius: 'full' },
      content: {
        businessName: 'Nobre Barbearia',
        heroText: 'Seu estilo com acabamento de alto padrão',
        tagline: 'Cortes, barba e cuidados masculinos em {cidade}, num ambiente pensado para você relaxar enquanto é atendido.',
        heroImage: `${IMG}/premium/hero`,
        about: [
          'Na {negocio}, cada atendimento começa com uma conversa sobre o seu estilo e termina com a finalização no detalhe.',
          'Ambiente climatizado, café e bebidas de cortesia e horário marcado para você não esperar.',
        ],
        categories: [
          { id: 'cortes', name: 'Cortes', image: `${IMG}/premium/categoria-cortes` },
          { id: 'barba', name: 'Barba', image: `${IMG}/premium/categoria-barba` },
          { id: 'experiencias', name: 'Experiências', image: `${IMG}/premium/categoria-experiencias` },
        ],
        services: [
          { name: 'Corte premium', description: 'Conversa sobre o estilo, lavagem, corte e finalização com produtos profissionais.', price: 90, durationMin: 60, categoryId: 'cortes' },
          { name: 'Corte degradê', description: 'Degradê na máquina e na navalha, com transição bem marcada.', price: 80, durationMin: 45, categoryId: 'cortes' },
          { name: 'Barba premium', description: 'Toalha quente, óleo pré-barba, navalha e hidratação no final.', price: 70, durationMin: 45, categoryId: 'barba' },
          { name: 'Design de barba', description: 'Desenho e alinhamento da barba de acordo com o formato do rosto.', price: 60, durationMin: 30, categoryId: 'barba' },
          { name: 'Experiência completa', description: 'Corte premium, barba premium e finalização, com bebida de cortesia.', price: 150, durationMin: 90, categoryId: 'experiencias' },
          { name: 'Limpeza de pele masculina', description: 'Limpeza, esfoliação e hidratação do rosto, feitas na cadeira.', price: 90, durationMin: 45, categoryId: 'experiencias' },
          { name: 'Pai e filho', description: 'Corte para dois no mesmo horário, lado a lado.', price: 130, durationMin: 60, categoryId: 'experiencias' },
        ],
        professionals: [
          { name: 'Rodrigo Sá', role: 'Barbeiro master', avatar: `${IMG}/premium/profissional-rodrigo` },
          { name: 'Felipe Andrade', role: 'Barbeiro e visagista', avatar: `${IMG}/premium/profissional-felipe` },
          { name: 'Lucas Moreira', role: 'Barbeiro', avatar: `${IMG}/premium/profissional-lucas` },
        ],
        unit: {
          street: 'Av. do Batel, 1200 — loja 3',
          neighborhood: 'Batel',
          city: 'Curitiba',
          state: 'PR',
          phone: '(41) 3300-0002',
          hours: [
            { days: [1, 2, 3, 4, 5], open: '10:00', close: '21:00' },
            { days: [6], open: '09:00', close: '18:00' },
          ],
        },
        whatsapp: '41900000002',
      },
    },

    // ── 3. Barbeiro Autônomo: agenda individual ─────────────────────────────
    {
      id: 'autonomo',
      label: 'Barbeiro Autônomo',
      pitch: 'Barbeiro independente, com agenda individual, hora marcada e contato direto pelo WhatsApp.',
      theme: { preset: 'dark-light', font: 'minimalista', radius: 'full' },
      content: {
        businessName: 'Thiago Barber',
        heroText: 'Corte com hora marcada, sem fila e sem espera',
        tagline: 'Barbeiro com agenda própria em {cidade}. Você escolhe o horário e fala direto comigo pelo WhatsApp.',
        heroImage: `${IMG}/autonomo/hero`,
        about: [
          // Sem nome próprio: o texto vira a base do site do cliente.
          'Sou barbeiro há mais de oito anos e atendo um cliente por vez, com toda a atenção no seu corte.',
          'Na {negocio}, você marca o horário, chega e é atendido na hora, com corte e barba do jeito que combinamos.',
        ],
        categories: [
          { id: 'cortes', name: 'Cortes', image: `${IMG}/autonomo/categoria-cortes` },
          { id: 'barba', name: 'Barba', image: `${IMG}/autonomo/categoria-barba` },
        ],
        services: [
          { name: 'Corte masculino', description: 'Corte na máquina e na tesoura, com acabamento e finalização.', price: 50, durationMin: 45, categoryId: 'cortes' },
          { name: 'Corte + barba', description: 'Corte e barba no mesmo horário, sem pressa.', price: 80, durationMin: 60, categoryId: 'cortes' },
          { name: 'Pezinho', description: 'Acabamento da nuca e das laterais entre um corte e outro.', price: 20, durationMin: 15, categoryId: 'cortes' },
          { name: 'Atendimento em domicílio', description: 'Corte na sua casa ou no seu trabalho, com horário combinado.', price: 90, durationMin: 60, categoryId: 'cortes' },
          { name: 'Barba na navalha', description: 'Barba com toalha quente, navalha e loção pós-barba.', price: 40, durationMin: 30, categoryId: 'barba' },
        ],
        professionals: [
          { name: 'Thiago Ramos', role: 'Barbeiro', avatar: `${IMG}/autonomo/profissional-thiago` },
        ],
        unit: {
          street: 'Rua Padre Anchieta, 88 — sala 4',
          neighborhood: 'Mercês',
          city: 'Curitiba',
          state: 'PR',
          phone: '(41) 3300-0003',
          hours: [
            { days: [2, 3, 4, 5], open: '10:00', close: '20:00' },
            { days: [6], open: '08:00', close: '16:00' },
          ],
        },
        whatsapp: '41900000003',
      },
    },
  ],

  // Página comercial do segmento (landing). Fala do produto, não de um negócio:
  // sem placeholders. Não promete posição no Google nem o que o plano não tem.
  seo: {
    title: 'Site para barbearia e barbeiro | SuaAgenda',
    description: 'Escolha um modelo de site para barbearia com serviços, valores, equipe, endereço e WhatsApp já preenchidos. Contrate e personalize pelo painel.',
    h1: 'Site para barbearias e barbeiros',
    intro: 'Veja três modelos de site feitos para barbearia: clássica, premium e barbeiro autônomo. Cada um já vem com serviços, textos e horários de exemplo, que você troca pelos seus no painel.',
    sections: [
      {
        h2: 'Modelos pensados para a rotina da barbearia',
        body: 'Os modelos trazem os serviços mais procurados, como corte masculino, barba na navalha, pezinho e combos, organizados por categoria. Você mantém o que faz sentido e troca o resto.',
      },
      {
        h2: 'Serviços com valor e duração',
        body: 'Cada serviço aparece com descrição, valor e tempo de atendimento, do jeito que o cliente vê no site publicado.',
      },
      {
        h2: 'Endereço, horário e WhatsApp à vista',
        body: 'O site mostra onde fica a barbearia, os horários de funcionamento e um botão para o cliente falar com você pelo WhatsApp.',
      },
      {
        h2: 'O modelo escolhido vira o seu site',
        body: 'Depois de contratar, o seu site já começa com o visual e os textos do modelo escolhido. No painel você troca nome, cores, fotos, textos e serviços.',
      },
    ],
    faq: [
      {
        q: 'Preciso saber programar para ter o site?',
        a: 'Não. Você escolhe um modelo, contrata e ajusta as informações pelo painel. As alterações seguintes também são feitas por lá.',
      },
      {
        q: 'Posso mudar os serviços e os valores depois?',
        a: 'Sim. Serviços, descrições, valores e duração podem ser editados no painel sempre que precisar.',
      },
      {
        q: 'O cliente consegue falar comigo pelo WhatsApp?',
        a: 'Sim. Com o número cadastrado, o site mostra botões para o cliente iniciar a conversa pelo WhatsApp.',
      },
      {
        q: 'Também dá para ter agendamento online?',
        a: 'Sim. Nos planos com agenda, o cliente escolhe o serviço, o barbeiro e o horário direto pelo site.',
      },
      {
        q: 'Qual vai ser o endereço do meu site?',
        a: 'Você escolhe o nome no cadastro e o site fica em seunome.suaagenda.link, pronto para divulgar no Instagram e no WhatsApp.',
      },
    ],
  },
}

export default barbearia
