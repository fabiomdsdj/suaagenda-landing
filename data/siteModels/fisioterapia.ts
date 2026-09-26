// data/siteModels/fisioterapia.ts
//
// Três modelos de site para fisioterapia (segment_types.name = 'physio') e o
// conteúdo da página comercial do segmento. Chunk próprio (index.ts).
//
// Cuidados de texto (saúde): nada de promessa de resultado — sem "cura",
// "garante", "sem dor", prazo de melhora ou percentual. Os serviços descrevem
// o atendimento, não o desfecho. tests/siteModels.test.ts confere isso e o
// vocabulário de outros segmentos.
//
// Dados de exemplo: endereços, telefones e WhatsApp são fictícios e serão
// trocados pelos do visitante. As imagens são public_ids ainda NÃO enviados
// ao Cloudinary (ver SITE_MODEL_IMAGE_RE em types.ts).
import type { SegmentSiteModels } from './types'

const IMG = 'suaagenda/site-models/fisioterapia'

const fisioterapia: SegmentSiteModels = {
  segment: 'fisioterapia',
  segmentType: 'physio',
  label: 'Fisioterapia',
  editorExamples: {
    businessName: 'Ex.: Studio Fisio Ana Souza',
    heroText: 'Ex.: Fisioterapia com atenção de verdade',
    tagline: 'Ex.: Atendimento com hora marcada no centro da cidade',
    professionalName: 'Ex.: Dra. Ana Souza',
    professionalRole: 'Ex.: Fisioterapeuta',
  },

  models: [
    // ── 1. Clínica: equipe, várias especialidades ───────────────────────────
    {
      id: 'clinica',
      label: 'Clínica',
      pitch: 'Clínica com equipe e várias especialidades, do tratamento ortopédico ao pilates.',
      theme: { preset: 'clean', font: 'classica', radius: 'md' },
      content: {
        businessName: 'Clínica Movimento',
        heroText: 'Cuidado completo para você se movimentar melhor',
        tagline: 'Ortopedia, fisioterapia esportiva e pilates em {cidade}, com uma equipe que acompanha cada etapa.',
        heroImage: `${IMG}/clinica/hero`,
        about: [
          'A {negocio} reúne fisioterapeutas de diferentes áreas para acompanhar você da primeira avaliação à alta.',
          'Cada plano de tratamento é montado depois da avaliação e revisto ao longo das sessões, junto com você.',
        ],
        categories: [
          { id: 'ortopedia', name: 'Ortopedia', image: `${IMG}/clinica/categoria-ortopedia` },
          { id: 'esportiva', name: 'Fisioterapia Esportiva', image: `${IMG}/clinica/categoria-esportiva` },
          { id: 'pilates', name: 'Pilates', image: `${IMG}/clinica/categoria-pilates` },
        ],
        services: [
          { name: 'Avaliação fisioterapêutica', description: 'Conversa, exame físico e definição do plano de tratamento.', price: 180, durationMin: 60, categoryId: 'ortopedia' },
          { name: 'Fisioterapia ortopédica', description: 'Sessão individual para dores e lesões de coluna, ombro, joelho e outras articulações.', price: 140, durationMin: 60, categoryId: 'ortopedia' },
          { name: 'Reabilitação de coluna', description: 'Exercícios e técnicas manuais para lombar e cervical, com acompanhamento individual.', price: 150, durationMin: 60, categoryId: 'ortopedia' },
          { name: 'Fisioterapia esportiva', description: 'Atendimento para atletas e praticantes de atividade física, do amador ao competitivo.', price: 160, durationMin: 60, categoryId: 'esportiva' },
          { name: 'Prevenção de lesões no esporte', description: 'Avaliação de movimento e exercícios para treinar com mais segurança.', price: 150, durationMin: 60, categoryId: 'esportiva' },
          { name: 'Liberação miofascial', description: 'Técnica manual voltada à tensão muscular, como complemento do tratamento.', price: 120, durationMin: 45, categoryId: 'esportiva' },
          { name: 'Pilates em aparelhos individual', description: 'Aula individual com exercícios adaptados ao seu momento.', price: 130, durationMin: 60, categoryId: 'pilates' },
          { name: 'Pilates em grupo', description: 'Turmas de até quatro pessoas, com orientação de fisioterapeuta.', price: 90, durationMin: 60, categoryId: 'pilates' },
        ],
        professionals: [
          { name: 'Dra. Juliana Prado', role: 'Fisioterapeuta ortopédica', avatar: `${IMG}/clinica/profissional-juliana` },
          { name: 'Dr. Rafael Nunes', role: 'Fisioterapeuta esportivo', avatar: `${IMG}/clinica/profissional-rafael` },
          { name: 'Camila Torres', role: 'Fisioterapeuta e instrutora de pilates', avatar: `${IMG}/clinica/profissional-camila` },
        ],
        unit: {
          street: 'Rua das Palmeiras, 250',
          neighborhood: 'Centro',
          city: 'Campinas',
          state: 'SP',
          phone: '(19) 3200-0001',
          hours: [
            { days: [1, 2, 3, 4, 5], open: '07:00', close: '20:00' },
            { days: [6], open: '08:00', close: '12:00' },
          ],
        },
        whatsapp: '19900000001',
      },
    },

    // ── 2. Pós-Operatória (preset de nicho) ─────────────────────────────────
    // O id continua 'reabilitacao': links ?modelo=reabilitacao, websites.siteModel
    // e a base da API (siteModelSeeds.json) usam esse id.
    // Tudo aqui é ponto de partida editável: preços são de EXEMPLO, a
    // profissional, a apresentação dela e os depoimentos são para trocar.
    {
      id: 'reabilitacao',
      label: 'Pós-Operatória',
      pitch: 'Para quem acompanha a recuperação depois de cirurgias, com avaliação, sessões e pacotes.',
      theme: { preset: 'moderno', font: 'geometrica', radius: 'lg' },
      content: {
        businessName: 'Recupera Fisioterapia',
        heroText: 'Fisioterapia pós-operatória com acompanhamento de perto',
        tagline: 'Fisioterapia pós-operatória em {cidade}: sessões individuais e um plano de recuperação ajustado a cada fase.',
        heroImage: `${IMG}/reabilitacao/hero`,
        about: [
          'Na {negocio}, a recuperação depois da cirurgia é acompanhada em sessões individuais, começando por uma avaliação.',
          'O plano segue as orientações da sua equipe médica e é ajustado conforme a sua evolução.',
        ],
        categories: [
          { id: 'avaliacao', name: 'Avaliação', image: `${IMG}/reabilitacao/categoria-avaliacao` },
          { id: 'pos-operatorio', name: 'Pós-operatório', image: `${IMG}/reabilitacao/categoria-pos-operatorio` },
          { id: 'terapias', name: 'Terapias complementares', image: `${IMG}/reabilitacao/categoria-terapias` },
          { id: 'pacotes', name: 'Pacotes', image: `${IMG}/reabilitacao/categoria-pacotes` },
        ],
        services: [
          { name: 'Avaliação fisioterapêutica pós-operatória', description: 'Primeira consulta para entender a cirurgia, as orientações médicas e montar o plano de sessões.', price: 200, durationMin: 60, categoryId: 'avaliacao' },
          { name: 'Sessão de fisioterapia pós-operatória', description: 'Sessão individual com exercícios e técnicas ajustados à fase da sua recuperação.', price: 150, durationMin: 45, categoryId: 'pos-operatorio' },
          { name: 'Fisioterapia para recuperação de joelho', description: 'Exercícios progressivos de movimento e força após cirurgias de joelho, conforme a orientação médica.', price: 150, durationMin: 45, categoryId: 'pos-operatorio' },
          { name: 'Fisioterapia para recuperação de ombro', description: 'Sessões para retomar a mobilidade do ombro com segurança, respeitando cada fase.', price: 150, durationMin: 45, categoryId: 'pos-operatorio' },
          { name: 'Fisioterapia pós-cirurgia de coluna', description: 'Acompanhamento individual após cirurgias de coluna, seguindo as orientações da sua equipe médica.', price: 150, durationMin: 45, categoryId: 'pos-operatorio' },
          { name: 'Drenagem linfática pós-operatória', description: 'Técnica manual para o período pós-cirúrgico, feita conforme a liberação do seu médico.', price: 140, durationMin: 60, categoryId: 'terapias' },
          { name: 'Terapia manual', description: 'Técnicas manuais como complemento das sessões, de acordo com a avaliação.', price: 130, durationMin: 45, categoryId: 'terapias' },
          { name: 'Reavaliação de evolução', description: 'Consulta para revisar a evolução e ajustar o plano de sessões e os exercícios de casa.', price: 150, durationMin: 45, categoryId: 'avaliacao' },
        ],
        // No site atual, cada pacote vira um serviço da categoria "Pacotes"
        // (utils/sitePackages.ts). Preços de exemplo.
        packages: [
          { id: 'recuperacao-inicial', name: 'Recuperação Inicial', sessions: 5, period: 'total', description: 'Para o começo do acompanhamento, logo depois da liberação médica.', price: 700, sessionMin: 45, categoryId: 'pacotes' },
          { id: 'recuperacao-intensiva', name: 'Recuperação Intensiva', sessions: 10, period: 'total', description: 'Para um acompanhamento mais frequente, com sessões mais próximas umas das outras.', price: 1350, sessionMin: 45, categoryId: 'pacotes' },
          { id: 'recuperacao-completa', name: 'Recuperação Completa', sessions: 15, period: 'total', description: 'Para um acompanhamento prolongado, com reavaliações ao longo do caminho.', price: 1950, sessionMin: 45, categoryId: 'pacotes' },
          { id: 'manutencao', name: 'Manutenção', sessions: 4, period: 'month', description: 'Para dar continuidade ao acompanhamento depois da fase principal.', price: 520, sessionMin: 45, categoryId: 'pacotes' },
        ],
        // Nome e foto de exemplo (o WL mostra nome e foto dos profissionais).
        professionals: [
          { name: 'Dra. Beatriz Campos', role: 'Fisioterapeuta', avatar: `${IMG}/reabilitacao/profissional-beatriz` },
        ],
        unit: {
          street: 'Av. das Acácias, 1800',
          neighborhood: 'Taquaral',
          city: 'Campinas',
          state: 'SP',
          phone: '(19) 3200-0002',
          hours: [
            { days: [1, 2, 3, 4, 5], open: '07:00', close: '19:00' },
          ],
        },
        whatsapp: '19900000002',

        // ── Dados do preset ainda sem seção no WL (não aparecem no preview) ──
        highlight: {
          title: 'Fisioterapia no pós-operatório',
          body: 'Depois de uma cirurgia, a fisioterapia acompanha a retomada gradual dos movimentos e das atividades do dia a dia. Tudo começa com uma avaliação e segue as orientações da sua equipe médica, com exercícios ajustados a cada fase.',
        },
        steps: [
          { title: 'Avaliação', body: 'Conversamos sobre a cirurgia, as orientações médicas e a sua rotina, e fazemos a avaliação física.' },
          { title: 'Planejamento do acompanhamento', body: 'Com a avaliação, montamos o plano de sessões e combinamos a frequência.' },
          { title: 'Sessões', body: 'Sessões individuais, com exercícios e técnicas escolhidos para a fase da sua recuperação.' },
          { title: 'Acompanhamento da evolução', body: 'Reavaliamos periodicamente e ajustamos o plano e os exercícios de casa.' },
        ],
        testimonials: [
          { demo: true, author: 'Nome do paciente', text: 'Depoimento de exemplo. Troque por um relato real, publicado com a autorização do paciente.' },
          { demo: true, author: 'Nome do paciente', text: 'Depoimento de exemplo. Conte como foi o acompanhamento na visão de quem foi atendido.' },
        ],
        faq: [
          { q: 'Quando posso começar a fisioterapia depois da cirurgia?', a: 'Depende da cirurgia e da liberação da sua equipe médica. Na avaliação, conversamos sobre as orientações que você recebeu e combinamos o início das sessões.' },
          { q: 'O que levar na avaliação?', a: 'Exames, relatório ou orientações da cirurgia, o pedido médico se tiver, e uma roupa confortável que permita movimentar a região operada.' },
          { q: 'Quantas sessões vou precisar?', a: 'Varia de pessoa para pessoa. O número de sessões é definido depois da avaliação e revisto conforme a sua evolução.' },
          { q: 'Qual a diferença entre os pacotes?', a: 'A quantidade de sessões e a frequência. Na avaliação, indicamos o pacote que combina com o seu plano de acompanhamento.' },
          { q: 'Quais são as formas de pagamento?', a: 'Fale com a gente pelo WhatsApp para saber as formas de pagamento e como funciona o reembolso.' },
        ],
        // Vazio de propósito: formação, registro e especialidades são dados da profissional.
        aboutProfessional: { name: '', photo: null, bio: '', education: '', registry: '', specialties: [] },
        cta: { title: 'Agende sua avaliação pós-operatória', primary: 'Agendar avaliação', secondary: 'Falar pelo WhatsApp' },
      },
    },

    // ── 3. Profissional: atendimento individual ─────────────────────────────
    {
      id: 'profissional',
      label: 'Profissional',
      pitch: 'Atendimento individual, em consultório e em domicílio, com uma só profissional.',
      theme: { preset: 'elegante', font: 'elegante', radius: 'full' },
      content: {
        businessName: 'Dra. Mariana Alves Fisioterapia',
        heroText: 'Atendimento individual, do começo ao fim',
        tagline: 'Fisioterapia com hora marcada em {cidade}, sempre com a mesma fisioterapeuta.',
        heroImage: `${IMG}/profissional/hero`,
        // No /sobre é a apresentação da Mariana. O WL mostra UM parágrafo
        // (description) e o admin limita a 300 caracteres.
        about: [
          'Sou a Mariana, fisioterapeuta, e acompanho cada paciente do início ao fim do tratamento.',
          'Na {negocio}, o atendimento é sempre individual: começo com uma avaliação cuidadosa e explico cada etapa do plano.',
          'Atendo em consultório e em domicílio, em {cidade}.',
        ],
        categories: [
          { id: 'consultorio', name: 'Em consultório', image: `${IMG}/profissional/categoria-consultorio` },
          { id: 'domiciliar', name: 'Domiciliar', image: `${IMG}/profissional/categoria-domiciliar` },
        ],
        services: [
          { name: 'Avaliação individual', description: 'Conversa, exame físico e plano de tratamento explicado passo a passo.', price: 200, durationMin: 60, categoryId: 'consultorio' },
          { name: 'Sessão de fisioterapia', description: 'Sessão individual no consultório, com exercícios e técnicas manuais.', price: 160, durationMin: 60, categoryId: 'consultorio' },
          { name: 'Pilates clínico individual', description: 'Exercícios de pilates adaptados ao seu tratamento, com atenção exclusiva.', price: 150, durationMin: 60, categoryId: 'consultorio' },
          { name: 'Retorno de acompanhamento', description: 'Consulta de revisão para ajustar exercícios e orientações de casa.', price: 120, durationMin: 30, categoryId: 'consultorio' },
          { name: 'Fisioterapia domiciliar', description: 'Atendimento na sua casa, com horário combinado e região a consultar.', price: 220, durationMin: 60, categoryId: 'domiciliar' },
        ],
        professionals: [
          { name: 'Dra. Mariana Alves', role: 'Fisioterapeuta', avatar: `${IMG}/profissional/profissional-mariana` },
        ],
        unit: {
          street: 'Rua dos Ipês, 90 — sala 12',
          neighborhood: 'Cambuí',
          city: 'Campinas',
          state: 'SP',
          phone: '(19) 3200-0003',
          hours: [
            { days: [1, 3, 5], open: '08:00', close: '18:00' },
            { days: [2, 4], open: '12:00', close: '20:00' },
          ],
        },
        whatsapp: '19900000003',
      },
    },
  ],

  // Página comercial do segmento (landing). Fala do produto, não de um negócio:
  // sem placeholders. Não promete posição no Google nem o que o plano não tem.
  seo: {
    title: 'Site para fisioterapeutas e clínicas | SuaAgenda',
    description: 'Escolha um modelo de site para fisioterapia com serviços, valores, equipe, endereço e WhatsApp já preenchidos. Personalize e publique.',
    h1: 'Site para fisioterapeutas e clínicas de fisioterapia',
    intro: 'Veja três modelos de site feitos para fisioterapia: clínica com equipe, pós-operatória e atendimento individual. Cada um já vem com serviços, textos e horários de exemplo para você trocar pelos seus.',
    sections: [
      {
        h2: 'Modelos pensados para a rotina da fisioterapia',
        body: 'Os modelos trazem serviços comuns na área, como avaliação, fisioterapia ortopédica, pós-operatório e pilates, organizados por categoria. Você mantém o que faz sentido e troca o resto.',
      },
      {
        h2: 'Serviços com valor e duração',
        body: 'Cada serviço aparece com descrição, valor e tempo de sessão, do jeito que o paciente vê no site publicado. Os valores dos modelos são exemplos: você define os seus.',
      },
      {
        h2: 'Endereço, horário e WhatsApp à vista',
        body: 'O site mostra onde você atende, os horários de funcionamento e um botão para o paciente falar com você pelo WhatsApp.',
      },
      {
        h2: 'Seu nome, suas cores',
        body: 'Troque o nome, a cor principal e o estilo visual. Depois de publicar, você altera textos, serviços e aparência pelo painel.',
      },
    ],
    faq: [
      {
        q: 'Preciso saber programar para ter o site?',
        a: 'Não. Você escolhe um modelo, troca as informações pelas suas e publica. As alterações seguintes são feitas pelo painel.',
      },
      {
        q: 'Posso mudar os serviços e os valores depois?',
        a: 'Sim. Serviços, descrições, valores e duração podem ser editados no painel sempre que precisar.',
      },
      {
        q: 'O paciente consegue falar comigo pelo WhatsApp?',
        a: 'Sim. Com o número cadastrado, o site mostra botões para o paciente iniciar a conversa pelo WhatsApp.',
      },
      {
        q: 'Também dá para ter agendamento online?',
        a: 'Sim. Nos planos com agenda, o paciente escolhe o serviço, o profissional e o horário direto pelo site.',
      },
      {
        q: 'Posso usar os textos de exemplo como estão?',
        a: 'Eles são um ponto de partida. Revise tudo antes de publicar, para que o site descreva exatamente o seu atendimento, e siga as orientações do seu conselho profissional sobre publicidade.',
      },
    ],
  },
}

export default fisioterapia
