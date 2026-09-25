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

    // ── 2. Reabilitação: pós-operatório ─────────────────────────────────────
    {
      id: 'reabilitacao',
      label: 'Reabilitação',
      pitch: 'Foco em pós-operatório e reabilitação, com pacote de sessões.',
      theme: { preset: 'moderno', font: 'geometrica', radius: 'lg' },
      content: {
        businessName: 'Clínica Movimento',
        heroText: 'Recupere seus movimentos e retome sua rotina.',
        tagline: 'Fisioterapia pós-operatória e reabilitação em {cidade}, com acompanhamento de perto em cada fase.',
        heroImage: `${IMG}/reabilitacao/hero`,
        about: [
          'Na {negocio}, a reabilitação é feita em sessões individuais, acompanhando de perto cada fase da sua recuperação.',
          'Seguimos as orientações da sua equipe médica e ajustamos os exercícios conforme a sua evolução.',
        ],
        categories: [
          { id: 'pos-operatorio', name: 'Pós-operatório', image: `${IMG}/reabilitacao/categoria-pos-operatorio` },
          { id: 'reabilitacao', name: 'Reabilitação', image: `${IMG}/reabilitacao/categoria-reabilitacao` },
          { id: 'pacotes', name: 'Pacotes', image: `${IMG}/reabilitacao/categoria-pacotes` },
        ],
        services: [
          { name: 'Avaliação pós-operatória', description: 'Primeira sessão para entender a cirurgia, as orientações médicas e montar o plano.', price: 180, durationMin: 60, categoryId: 'pos-operatorio' },
          { name: 'Pós-operatório de joelho', description: 'Sessões voltadas a movimento e força após cirurgias de joelho, como a de ligamento.', price: 150, durationMin: 60, categoryId: 'pos-operatorio' },
          { name: 'Pós-operatório de ombro', description: 'Exercícios progressivos após cirurgias de ombro, respeitando cada fase.', price: 150, durationMin: 60, categoryId: 'pos-operatorio' },
          { name: 'Drenagem linfática pós-cirúrgica', description: 'Técnica manual para o período pós-cirúrgico, conforme a orientação do seu médico.', price: 130, durationMin: 45, categoryId: 'pos-operatorio' },
          { name: 'Reabilitação de quadril e coluna', description: 'Sessão individual com exercícios para mobilidade, força e equilíbrio.', price: 150, durationMin: 60, categoryId: 'reabilitacao' },
          { name: 'Pacote de 10 sessões', description: 'Dez sessões de fisioterapia pós-operatória para usar ao longo do tratamento.', price: 950, durationMin: 60, categoryId: 'pacotes' },
        ],
        professionals: [
          { name: 'Dr. Rafael Nunes', role: 'Fisioterapeuta traumato-ortopédico', avatar: `${IMG}/reabilitacao/profissional-rafael` },
          { name: 'Dra. Beatriz Campos', role: 'Fisioterapeuta de reabilitação', avatar: `${IMG}/reabilitacao/profissional-beatriz` },
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
    intro: 'Veja três modelos de site feitos para fisioterapia: clínica com equipe, reabilitação e atendimento individual. Cada um já vem com serviços, textos e horários de exemplo para você trocar pelos seus.',
    sections: [
      {
        h2: 'Modelos pensados para a rotina da fisioterapia',
        body: 'Os modelos trazem serviços comuns na área, como avaliação, fisioterapia ortopédica, pós-operatório e pilates, organizados por categoria. Você mantém o que faz sentido e troca o resto.',
      },
      {
        h2: 'Serviços com valor e duração',
        body: 'Cada serviço aparece com descrição, valor e tempo de sessão, do jeito que o paciente vê no site publicado.',
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
