// data/baixada-santista.ts
// ✅ CORRIGIDO: Slugs agora são APENAS o nome do bairro (sem cidade)
// Cidades: Santos, São Vicente, Guarujá, Praia Grande, Cubatão,
//          Bertioga, Mongaguá, Itanhaém, Peruíbe

const baixadaSantista = [
  // ─────────────────────────────────────────────────────────────
  // SANTOS
  // ─────────────────────────────────────────────────────────────
  {
    city: "Santos",
    citySlug: "santos",
    zone: "Baixada Santista",
    region: "Baixada Santista",
    districts: [
      {
        name: "Centro",
        slug: "centro",  // ✅ Removido -santos
        neighborhoods: [
          { name: "Centro", slug: "centro" },  // ✅ Apenas o bairro
          { name: "Paquetá", slug: "paqueta" },
          { name: "Vila Mathias", slug: "vila-mathias" },
          { name: "Vila Nova", slug: "vila-nova" },
          { name: "Macuco", slug: "macuco" },
          { name: "Valongo", slug: "valongo" },
        ],
      },
      {
        name: "Orla",
        slug: "orla",
        neighborhoods: [
          { name: "Gonzaga", slug: "gonzaga" },
          { name: "Boqueirão", slug: "boqueirao" },
          { name: "Embaré", slug: "embare" },
          { name: "Aparecida", slug: "aparecida" },
          { name: "José Menino", slug: "jose-menino" },
          { name: "Pompéia", slug: "pompeia" },
          { name: "Ponta da Praia", slug: "ponta-da-praia" },
        ],
      },
      {
        name: "Morros",
        slug: "morros",
        neighborhoods: [
          { name: "Monte Serrat", slug: "monte-serrat" },
          { name: "Jabaquara", slug: "jabaquara" },
          { name: "Morro Nova Cintra", slug: "morro-nova-cintra" },
          { name: "São Manoel", slug: "sao-manoel" },
          { name: "Morro José Menino", slug: "morro-jose-menino" },
        ],
      },
      {
        name: "Zona Noroeste",
        slug: "zona-noroeste",
        neighborhoods: [
          { name: "Areia Branca", slug: "areia-branca" },
          { name: "Castelo", slug: "castelo" },
          { name: "Marapé", slug: "marape" },
          { name: "Santa Maria", slug: "santa-maria" },
          { name: "Vila Belmiro", slug: "vila-belmiro" },
          { name: "Rádio Clube", slug: "radio-clube" },
          { name: "Vila Matias", slug: "vila-matias" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // SÃO VICENTE
  // ─────────────────────────────────────────────────────────────
  {
    city: "São Vicente",
    citySlug: "sao-vicente",
    zone: "Baixada Santista",
    region: "Baixada Santista",
    districts: [
      {
        name: "Centro",
        slug: "centro",
        neighborhoods: [
          { name: "Centro", slug: "centro" },
          { name: "Itararé", slug: "itarare" },
          { name: "Vila Cascatinha", slug: "vila-cascatinha" },
          { name: "Vila Soledad", slug: "vila-soledad" },
          { name: "Ilha Porchat", slug: "ilha-porchat" },
        ],
      },
      {
        name: "Zona Leste",
        slug: "zona-leste",
        neighborhoods: [
          { name: "Vila Valença", slug: "vila-valenca" },
          { name: "Japuí", slug: "japui" },
          { name: "Parque Bitarú", slug: "parque-bitaru" },
          { name: "Jardim Rio Branco", slug: "jardim-rio-branco" },
          { name: "Catiapoa", slug: "catiapoa" },
        ],
      },
      {
        name: "Zona Norte",
        slug: "zona-norte",
        neighborhoods: [
          { name: "Jockey Club", slug: "jockey-club" },
          { name: "Vila São Jorge", slug: "vila-sao-jorge" },
          { name: "Jardim Independência", slug: "jardim-independencia" },
          { name: "Parque Continental", slug: "parque-continental" },
          { name: "Vila Voturuá", slug: "vila-voturua" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // GUARUJÁ
  // ─────────────────────────────────────────────────────────────
  {
    city: "Guarujá",
    citySlug: "guaruja",
    zone: "Baixada Santista",
    region: "Baixada Santista",
    districts: [
      {
        name: "Centro",
        slug: "centro",
        neighborhoods: [
          { name: "Centro", slug: "centro" },
          { name: "Santa Rosa", slug: "santa-rosa" },
          { name: "Vila Maia", slug: "vila-maia" },
          { name: "Jardim Progresso", slug: "jardim-progresso" },
        ],
      },
      {
        name: "Praia",
        slug: "praia",
        neighborhoods: [
          { name: "Pitangueiras", slug: "pitangueiras" },
          { name: "Astúrias", slug: "asturias" },
          { name: "Enseada", slug: "enseada" },
          { name: "Pernambuco", slug: "pernambuco" },
          { name: "Tombo", slug: "tombo" },
          { name: "Guaiúba", slug: "guaiuba" },
        ],
      },
      {
        name: "Vicente de Carvalho",
        slug: "vicente-de-carvalho",
        neighborhoods: [
          { name: "Vicente de Carvalho", slug: "vicente-de-carvalho" },
          { name: "Vila Áurea", slug: "vila-aurea" },
          { name: "Morrinhos", slug: "morrinhos" },
          { name: "Jardim Boa Esperança", slug: "jardim-boa-esperanca" },
          { name: "Vila Júlia", slug: "vila-julia" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PRAIA GRANDE
  // ─────────────────────────────────────────────────────────────
  {
    city: "Praia Grande",
    citySlug: "praia-grande",
    zone: "Baixada Santista",
    region: "Baixada Santista",
    districts: [
      {
        name: "Centro",
        slug: "centro",
        neighborhoods: [
          { name: "Centro", slug: "centro" },
          { name: "Boqueirão", slug: "boqueirao" },
          { name: "Guilhermina", slug: "guilhermina" },
          { name: "Canto do Forte", slug: "canto-do-forte" },
        ],
      },
      {
        name: "Zona Norte",
        slug: "zona-norte",
        neighborhoods: [
          { name: "Samambaia", slug: "samambaia" },
          { name: "Mirim", slug: "mirim" },
          { name: "Quietude", slug: "quietude" },
          { name: "Ribeirópolis", slug: "riberopolis" },
          { name: "Flórida", slug: "florida" },
        ],
      },
      {
        name: "Zona Sul",
        slug: "zona-sul",
        neighborhoods: [
          { name: "Aviação", slug: "aviacao" },
          { name: "Ocian", slug: "ocian" },
          { name: "Tupi", slug: "tupi" },
          { name: "Real", slug: "real" },
          { name: "Sítio do Campo", slug: "sitio-do-campo" },
          { name: "Anhanguera", slug: "anhanguera" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CUBATÃO
  // ─────────────────────────────────────────────────────────────
  {
    city: "Cubatão",
    citySlug: "cubatao",
    zone: "Baixada Santista",
    region: "Baixada Santista",
    districts: [
      {
        name: "Centro",
        slug: "centro",
        neighborhoods: [
          { name: "Centro", slug: "centro" },
          { name: "Vila Nova", slug: "vila-nova" },
          { name: "Jardim Casqueiro", slug: "jardim-casqueiro" },
          { name: "Vila Esperança", slug: "vila-esperanca" },
        ],
      },
      {
        name: "Zona Norte",
        slug: "zona-norte",
        neighborhoods: [
          { name: "Jardim Anchieta", slug: "jardim-anchieta" },
          { name: "Vila Parisi", slug: "vila-parisi" },
          { name: "Cota", slug: "cota" },
          { name: "Jardim Nossa Senhora das Graças", slug: "jardim-nsa-gracas" },
        ],
      },
      {
        name: "Zona Sul",
        slug: "zona-sul",
        neighborhoods: [
          { name: "Morro do Sangue Bom", slug: "morro-sangue-bom" },
          { name: "Pilões", slug: "piloes" },
          { name: "Vila Coelho", slug: "vila-coelho" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BERTIOGA
  // ─────────────────────────────────────────────────────────────
  {
    city: "Bertioga",
    citySlug: "bertioga",
    zone: "Baixada Santista",
    region: "Baixada Santista",
    districts: [
      {
        name: "Centro",
        slug: "centro",
        neighborhoods: [
          { name: "Centro", slug: "centro" },
          { name: "Indaiá", slug: "indaia" },
          { name: "Vista Linda", slug: "vista-linda" },
        ],
      },
      {
        name: "Riviera",
        slug: "riviera",
        neighborhoods: [
          { name: "Riviera de São Lourenço", slug: "riviera-sao-lourenco" },
          { name: "São Lourenço", slug: "sao-lourenco" },
          { name: "Boraceia", slug: "boraceia" },
        ],
      },
      {
        name: "Zona Norte",
        slug: "zona-norte",
        neighborhoods: [
          { name: "Guaratuba", slug: "guaratuba" },
          { name: "Mangaguá", slug: "mangagua" },
          { name: "Itaguaré", slug: "itaguare" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MONGAGUÁ
  // ─────────────────────────────────────────────────────────────
  {
    city: "Mongaguá",
    citySlug: "mongagua",
    zone: "Baixada Santista",
    region: "Baixada Santista",
    districts: [
      {
        name: "Centro",
        slug: "centro",
        neighborhoods: [
          { name: "Centro", slug: "centro" },
          { name: "Vera Cruz", slug: "vera-cruz" },
          { name: "Vila Atlântica", slug: "vila-atlantica" },
          { name: "Jardim Praia Grande", slug: "jardim-praia-grande" },
        ],
      },
      {
        name: "Balneários",
        slug: "balnearios",
        neighborhoods: [
          { name: "Agenor de Campos", slug: "agenor-de-campos" },
          { name: "Flórida Mirim", slug: "florida-mirim" },
          { name: "Jardim Regina", slug: "jardim-regina" },
          { name: "Balneário Itaguai", slug: "balneario-itaguai" },
          { name: "Jardim Leonor", slug: "jardim-leonor" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ITANHAÉM
  // ─────────────────────────────────────────────────────────────
  {
    city: "Itanhaém",
    citySlug: "itanhaem",
    zone: "Baixada Santista",
    region: "Baixada Santista",
    districts: [
      {
        name: "Centro",
        slug: "centro",
        neighborhoods: [
          { name: "Centro", slug: "centro" },
          { name: "Jardim Ibisara", slug: "jardim-ibisara" },
          { name: "Suarão", slug: "suarao" },
          { name: "Vila Loty", slug: "vila-loty" },
        ],
      },
      {
        name: "Balneários",
        slug: "balnearios",
        neighborhoods: [
          { name: "Balneário Tupy", slug: "balneario-tupy" },
          { name: "Savoy", slug: "savoy" },
          { name: "Cibratel", slug: "cibratel" },
          { name: "Belas Artes", slug: "belas-artes" },
          { name: "Gaivota", slug: "gaivota" },
          { name: "Jardim Coronel", slug: "jardim-coronel" },
        ],
      },
      {
        name: "Zona Norte",
        slug: "zona-norte",
        neighborhoods: [
          { name: "Angélica", slug: "angelica" },
          { name: "Jamaica", slug: "jamaica" },
          { name: "Jardim Magalhães", slug: "jardim-magalhaes" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PERUÍBE
  // ─────────────────────────────────────────────────────────────
  {
    city: "Peruíbe",
    citySlug: "peruibe",
    zone: "Baixada Santista",
    region: "Baixada Santista",
    districts: [
      {
        name: "Centro",
        slug: "centro",
        neighborhoods: [
          { name: "Centro", slug: "centro" },
          { name: "Jardim São João", slug: "jardim-sao-joao" },
          { name: "Vila Tupi", slug: "vila-tupi" },
          { name: "Estância São Pedro", slug: "estancia-sao-pedro" },
        ],
      },
      {
        name: "Balneários",
        slug: "balnearios",
        neighborhoods: [
          { name: "Balneário Stella Maris", slug: "balneario-stella-maris" },
          { name: "Hortência", slug: "hortencia" },
          { name: "Convento", slug: "convento" },
          { name: "Guaraú", slug: "guarau" },
          { name: "Jardim Beira Mar", slug: "jardim-beira-mar" },
        ],
      },
    ],
  },
]

export default baixadaSantista