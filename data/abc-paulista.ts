// data/abc-paulista.ts
// Cidades: Santo André, São Bernardo do Campo, São Caetano do Sul,
//          Diadema, Mauá, Ribeirão Pires, Rio Grande da Serra

const abcPaulista = [

  // ─────────────────────────────────────────────────────────────
  // SANTO ANDRÉ
  // ─────────────────────────────────────────────────────────────
  {
    city: "Santo André",
    citySlug: "santo-andre",
    zone: "ABC Paulista",
    region: "Grande ABC",
    districts: [
      {
        name: "Centro",
        slug: "centro-santo-andre",
        neighborhoods: [
          { name: "Centro", slug: "centro-santo-andre" },
          { name: "Casa Branca", slug: "casa-branca-santo-andre" },
          { name: "Vila Bastos", slug: "vila-bastos" },
          { name: "Vila Assunção", slug: "vila-assuncao" },
        ],
      },
      {
        name: "Zona Norte",
        slug: "zona-norte-santo-andre",
        neighborhoods: [
          { name: "Vila Curuçá", slug: "vila-curuca" },
          { name: "Parque Novo Oratório", slug: "parque-novo-oratorio" },
          { name: "Jardim Santo André", slug: "jardim-santo-andre" },
          { name: "Parque das Nações", slug: "parque-das-nacoes" },
        ],
      },
      {
        name: "Zona Sul",
        slug: "zona-sul-santo-andre",
        neighborhoods: [
          { name: "Campestre", slug: "campestre-santo-andre" },
          { name: "Jardim", slug: "bairro-jardim-santo-andre" },
          { name: "Vila Gilda", slug: "vila-gilda" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // SÃO BERNARDO DO CAMPO
  // ─────────────────────────────────────────────────────────────
  {
    city: "São Bernardo do Campo",
    citySlug: "sao-bernardo-do-campo",
    zone: "ABC Paulista",
    region: "Grande ABC",
    districts: [
      {
        name: "Centro",
        slug: "centro-sao-bernardo",
        neighborhoods: [
          { name: "Centro", slug: "centro-sao-bernardo" },
          { name: "Baeta Neves", slug: "baeta-neves" },
          { name: "Vila Dusi", slug: "vila-dusi" },
          { name: "Jardim do Mar", slug: "jardim-do-mar" },
        ],
      },
      {
        name: "Zona Norte",
        slug: "zona-norte-sao-bernardo",
        neighborhoods: [
          { name: "Rudge Ramos", slug: "rudge-ramos" },
          { name: "Paulicéia", slug: "pauliceia-sbc" },
          { name: "Taboão", slug: "taboao-sbc" },
        ],
      },
      {
        name: "Zona Sul",
        slug: "zona-sul-sao-bernardo",
        neighborhoods: [
          { name: "Alvarenga", slug: "alvarenga-sbc" },
          { name: "Assunção", slug: "assuncao-sbc" },
          { name: "Cooperativa", slug: "cooperativa-sbc" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // SÃO CAETANO DO SUL
  // ─────────────────────────────────────────────────────────────
  {
    city: "São Caetano do Sul",
    citySlug: "sao-caetano-do-sul",
    zone: "ABC Paulista",
    region: "Grande ABC",
    districts: [
      {
        name: "Centro",
        slug: "centro-sao-caetano",
        neighborhoods: [
          { name: "Centro", slug: "centro-sao-caetano" },
          { name: "Fundação", slug: "fundacao-scs" },
          { name: "Santa Paula", slug: "santa-paula-scs" },
        ],
      },
      {
        name: "Zona Leste",
        slug: "zona-leste-sao-caetano",
        neighborhoods: [
          { name: "Nova Gerty", slug: "nova-gerty" },
          { name: "Osvaldo Cruz", slug: "osvaldo-cruz-scs" },
        ],
      },
      {
        name: "Zona Oeste",
        slug: "zona-oeste-sao-caetano",
        neighborhoods: [
          { name: "Barcelona", slug: "barcelona-scs" },
          { name: "Cerâmica", slug: "ceramica-scs" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // DIADEMA
  // ─────────────────────────────────────────────────────────────
  {
    city: "Diadema",
    citySlug: "diadema",
    zone: "ABC Paulista",
    region: "Grande ABC",
    districts: [
      {
        name: "Centro",
        slug: "centro-diadema",
        neighborhoods: [
          { name: "Centro", slug: "centro-diadema" },
          { name: "Vila Conceição", slug: "vila-conceicao-diadema" },
          { name: "Jardim Canhema", slug: "jardim-canhema" },
        ],
      },
      {
        name: "Zona Norte",
        slug: "zona-norte-diadema",
        neighborhoods: [
          { name: "Eldorado", slug: "eldorado-diadema" },
          { name: "Casa Grande", slug: "casa-grande-diadema" },
        ],
      },
      {
        name: "Zona Sul",
        slug: "zona-sul-diadema",
        neighborhoods: [
          { name: "Piraporinha", slug: "piraporinha" },
          { name: "Campanário", slug: "campanario" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MAUÁ
  // ─────────────────────────────────────────────────────────────
  {
    city: "Mauá",
    citySlug: "maua",
    zone: "ABC Paulista",
    region: "Grande ABC",
    districts: [
      {
        name: "Centro",
        slug: "centro-maua",
        neighborhoods: [
          { name: "Centro", slug: "centro-maua" },
          { name: "Vila Bocaina", slug: "vila-bocaina" },
          { name: "Jardim Zaíra", slug: "jardim-zaira" },
        ],
      },
      {
        name: "Zona Leste",
        slug: "zona-leste-maua",
        neighborhoods: [
          { name: "Parque das Américas", slug: "parque-das-americas" },
          { name: "Jardim Itapeva", slug: "jardim-itapeva" },
        ],
      },
      {
        name: "Zona Oeste",
        slug: "zona-oeste-maua",
        neighborhoods: [
          { name: "Vila Assis Brasil", slug: "vila-assis-brasil" },
          { name: "Vila Magini", slug: "vila-magini" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // RIBEIRÃO PIRES
  // ─────────────────────────────────────────────────────────────
  {
    city: "Ribeirão Pires",
    citySlug: "ribeirao-pires",
    zone: "ABC Paulista",
    region: "Grande ABC",
    districts: [
      {
        name: "Centro",
        slug: "centro-ribeirao-pires",
        neighborhoods: [
          { name: "Centro", slug: "centro-ribeirao-pires" },
          { name: "Santa Luzia", slug: "santa-luzia-rp" },
          { name: "Jardim Pastoril", slug: "jardim-pastoril" },
        ],
      },
      {
        name: "Zona Norte",
        slug: "zona-norte-ribeirao-pires",
        neighborhoods: [
          { name: "Ouro Fino", slug: "ouro-fino" },
          { name: "Colônia", slug: "colonia-rp" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // RIO GRANDE DA SERRA
  // ─────────────────────────────────────────────────────────────
  {
    city: "Rio Grande da Serra",
    citySlug: "rio-grande-da-serra",
    zone: "ABC Paulista",
    region: "Grande ABC",
    districts: [
      {
        name: "Centro",
        slug: "centro-rio-grande-serra",
        neighborhoods: [
          { name: "Centro", slug: "centro-rio-grande-serra" },
          { name: "Vila Lopes", slug: "vila-lopes" },
          { name: "Parque América", slug: "parque-america-rgs" },
        ],
      },
      {
        name: "Zona Rural",
        slug: "zona-rural-rio-grande",
        neighborhoods: [
          { name: "Pedreira", slug: "pedreira-rgs" },
          { name: "Rio Pequeno", slug: "rio-pequeno-rgs" },
        ],
      },
    ],
  },
]

export default abcPaulista