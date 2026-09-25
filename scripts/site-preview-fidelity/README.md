# Fidelidade do preview de site

O preview da landing (`components/site-preview`) tem de mostrar o que o
white-label real mostraria com os mesmos dados. Esta pasta compara os dois com a
**mesma** fixture crua da API (`data/siteModels/fixtures/wl-fixture.json`):

| Lado      | Como recebe a fixture                                          |
|-----------|----------------------------------------------------------------|
| WL real   | `mock-api.cjs` finge a API pública (by-subdomain, services, employees, units) |
| Preview   | `pages/dev/site-preview.vue` → `previewFromWlPayload()` → `PreviewSite` |

## Rodar

```bash
# 1. API falsa (porta 3999)
node landing/scripts/site-preview-fidelity/mock-api.cjs

# 2. WL real apontando para o mock (build ou dev; porta 3100)
cd white-label && NUXT_PUBLIC_API_BASE=http://127.0.0.1:3999 npx nuxt dev --port 3100

# 3. Landing em dev (a bancada /dev/site-preview só existe em dev; porta 3200)
cd landing && npx nuxt dev --port 3200

# 4. Prints 390 e 1280 das 3 páginas, lado a lado
cd landing && PUPPETEER_PATH=/caminho/node_modules/puppeteer \
  node scripts/site-preview-fidelity/compare.cjs fixture fixture-agenda elegante
```

Variantes: `fixture`, `fixture-agenda` (com agenda), `<preset>` e
`<preset>-agenda` (qualquer id de `THEME_PRESET_IDS`). O WL resolve o tenant pelo
Host; o Chrome mapeia `*.wl.test` para 127.0.0.1.

## Diferenças esperadas (não são bug)

- **Hero**: o WL alterna `heroImages` em carrossel (Swiper); o preview mostra só a 1ª.
- **Como chegar**: o WL desenha o mapa Leaflet com tiles e geocodifica no client;
  o preview mostra só a área do mapa.
- **Profissionais**: o WL usa Swiper com `overflow: visible`; no preview a faixa
  rola dentro do container.
- **Imagem que não carrega**: o preview cai no estado "sem imagem" do WL; o WL
  mostra a imagem quebrada.
