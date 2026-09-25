// utils/theme.ts
//
// Tema visual do site público por tenant (V1).
//
// ESTE ARQUIVO É A FONTE ÚNICA. O admin usa uma cópia byte a byte em
// `admin/utils/theme.ts` para o preview — não edite a cópia; rode
// `scripts/sync-theme.sh` na raiz do stack depois de mexer aqui.
// Por isso: TypeScript puro, sem auto-import do Nuxt, sem Vue.
//
// Resolução: defaults → preset → overrides → primaryColor.
//   - `primaryColor` (coluna do website) continua sendo a cor da marca e
//     vence o primary do preset;
//   - cores derivadas (texto do botão, hover, borda, rodapé) são calculadas
//     aqui e NUNCA armazenadas;
//   - toda entrada é tratada como não confiável: cor só entra se for hex
//     válido, preset/fonte/raio só de listas fechadas. O CSS emitido por
//     `themeToCss()` só contém hex validado e strings constantes deste arquivo.

// Os 5 primeiros são os do V1 e podem estar salvos em `websites.theme` de
// clientes: NUNCA renomear, remover nem mudar as cores/fontes deles.
// Lista espelhada em api/app/utils/websiteTheme.js (scripts/sync-theme.sh --check).
export const THEME_PRESET_IDS = [
  'moderno', 'clean', 'elegante', 'barbearia', 'premium',
  'preto-vermelho', 'preto-amarelo', 'preto-laranja', 'preto-roxo',
  'verde-escuro', 'azul-marinho', 'vintage-cafe', 'dark-light', 'rose',
] as const
export type ThemePresetId = (typeof THEME_PRESET_IDS)[number]

// As fontes são pares fechados. O usuário escolhe o PAR, nunca um nome de
// fonte livre. Os 5 primeiros têm o id do preset que os introduziu (V1); os
// novos são nomeados pelo estilo.
export const THEME_FONT_IDS = [
  'moderno', 'clean', 'elegante', 'barbearia', 'premium',
  'impacto', 'vintage', 'classica', 'geometrica', 'minimalista',
] as const
export type ThemeFontId = (typeof THEME_FONT_IDS)[number]

export const THEME_RADIUS_IDS = ['none', 'sm', 'md', 'lg', 'full'] as const
export type ThemeRadiusId = (typeof THEME_RADIUS_IDS)[number]

export const THEME_OVERRIDE_KEYS = ['background', 'surface', 'text', 'muted', 'button', 'link'] as const
export type ThemeOverrideKey = (typeof THEME_OVERRIDE_KEYS)[number]

export const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/

/** Formato salvo em `websites.theme` (JSON). Tudo opcional. */
export interface WebsiteTheme {
  preset?: ThemePresetId
  font?: ThemeFontId
  radius?: ThemeRadiusId
  overrides?: Partial<Record<ThemeOverrideKey, string>>
}

export interface ThemeFontPair {
  /** Estilo mostrado no editor ("Moderna", "Vintage"…). */
  style: string
  label: string
  heading: string
  body: string
  headingStack: string
  bodyStack: string
  /**
   * A fonte de título só existe no peso 400 (Anton, Alfa Slab One). O site
   * pede negrito nos títulos; sem isto o navegador inventaria um negrito
   * falso, borrado. Vira `font-synthesis-weight: none` nos títulos.
   */
  singleWeightHeading?: boolean
}

export const THEME_FONTS: Record<ThemeFontId, ThemeFontPair> = {
  moderno: {
    style: 'Moderna',
    label: 'Poppins + Inter',
    heading: 'Poppins',
    body: 'Inter',
    headingStack: "'Poppins', system-ui, sans-serif",
    bodyStack: "'Inter', system-ui, sans-serif",
  },
  clean: {
    style: 'Minimalista',
    label: 'Inter',
    heading: 'Inter',
    body: 'Inter',
    headingStack: "'Inter', system-ui, sans-serif",
    bodyStack: "'Inter', system-ui, sans-serif",
  },
  elegante: {
    style: 'Elegante',
    label: 'Playfair Display + Lato',
    heading: 'Playfair Display',
    body: 'Lato',
    headingStack: "'Playfair Display', Georgia, serif",
    bodyStack: "'Lato', system-ui, sans-serif",
  },
  barbearia: {
    style: 'Condensada',
    label: 'Oswald + Roboto',
    heading: 'Oswald',
    body: 'Roboto',
    headingStack: "'Oswald', Impact, sans-serif",
    bodyStack: "'Roboto', system-ui, sans-serif",
  },
  premium: {
    style: 'Sofisticada',
    label: 'Cormorant Garamond + Montserrat',
    heading: 'Cormorant Garamond',
    body: 'Montserrat',
    headingStack: "'Cormorant Garamond', Georgia, serif",
    bodyStack: "'Montserrat', system-ui, sans-serif",
  },
  impacto: {
    style: 'Impacto',
    label: 'Anton + Inter',
    heading: 'Anton',
    body: 'Inter',
    headingStack: "'Anton', Impact, 'Arial Narrow', sans-serif",
    bodyStack: "'Inter', system-ui, sans-serif",
    singleWeightHeading: true,
  },
  vintage: {
    style: 'Vintage',
    label: 'Alfa Slab One + Lora',
    heading: 'Alfa Slab One',
    body: 'Lora',
    headingStack: "'Alfa Slab One', Rockwell, Georgia, serif",
    bodyStack: "'Lora', Georgia, serif",
    singleWeightHeading: true,
  },
  classica: {
    style: 'Clássica',
    label: 'Libre Baskerville + Source Sans 3',
    heading: 'Libre Baskerville',
    body: 'Source Sans 3',
    headingStack: "'Libre Baskerville', Georgia, serif",
    bodyStack: "'Source Sans 3', system-ui, sans-serif",
  },
  geometrica: {
    style: 'Geométrica',
    label: 'Space Grotesk + Inter',
    heading: 'Space Grotesk',
    body: 'Inter',
    headingStack: "'Space Grotesk', system-ui, sans-serif",
    bodyStack: "'Inter', system-ui, sans-serif",
  },
  minimalista: {
    style: 'Minimalista',
    label: 'DM Sans',
    heading: 'DM Sans',
    body: 'DM Sans',
    headingStack: "'DM Sans', system-ui, sans-serif",
    bodyStack: "'DM Sans', system-ui, sans-serif",
  },
}

export const THEME_RADII: Record<ThemeRadiusId, { label: string; card: string; button: string }> = {
  none: { label: 'Reto',       card: '0px',  button: '0px' },
  sm:   { label: 'Sutil',      card: '4px',  button: '4px' },
  md:   { label: 'Médio',      card: '8px',  button: '6px' },
  lg:   { label: 'Arredondado', card: '12px', button: '8px' },
  full: { label: 'Pílula',     card: '20px', button: '9999px' },
}

/** Agrupamentos da galeria do editor, além de claro/escuro (que vem da cor). */
export const THEME_PRESET_TAGS = ['vintage', 'moderno'] as const
export type ThemePresetTag = (typeof THEME_PRESET_TAGS)[number]

export interface ThemePreset {
  label: string
  description: string
  tags: ThemePresetTag[]
  font: ThemeFontId
  radius: ThemeRadiusId
  /**
   * Cor da marca do estilo. No site, só vale quando o website não tem
   * primaryColor; por isso o editor grava primary/secondary nas colunas ao
   * aplicar o estilo (presetBrandColors).
   */
  primary: string
  /** Segunda cor do degradê do topo sem foto. O texto do topo tem de ler nas duas pontas. */
  secondary: string
  colors: Record<'background' | 'surface' | 'text' | 'muted', string>
}

export const THEME_PRESETS: Record<ThemePresetId, ThemePreset> = {
  // Igual ao visual que o site tinha antes do tema existir: tenant sem
  // `theme` salvo continua com o mesmo fundo, cartões e textos.
  moderno: {
    tags: ['moderno'],
    label: 'Moderno',
    description: 'Claro e versátil, cantos arredondados',
    font: 'moderno',
    radius: 'lg',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    colors: { background: '#f9fafb', surface: '#ffffff', text: '#111827', muted: '#6b7280' },
  },
  clean: {
    tags: ['moderno'],
    label: 'Minimal claro',
    description: 'Branco, minimalista, sem excessos',
    font: 'clean',
    radius: 'md',
    primary: '#0f766e',
    secondary: '#0ea5e9',
    colors: { background: '#ffffff', surface: '#f8fafc', text: '#0f172a', muted: '#64748b' },
  },
  elegante: {
    tags: ['vintage'],
    label: 'Creme elegante',
    description: 'Tons creme e tipografia serifada',
    font: 'elegante',
    radius: 'sm',
    primary: '#9a7b4f',
    secondary: '#3d3530',
    colors: { background: '#faf7f2', surface: '#ffffff', text: '#2b2622', muted: '#7c7168' },
  },
  barbearia: {
    tags: ['vintage'],
    label: 'Preto & Dourado clássico',
    description: 'Escuro, forte, tipografia condensada',
    font: 'barbearia',
    radius: 'sm',
    primary: '#d4a24c',
    secondary: '#7f1d1d',
    colors: { background: '#141414', surface: '#1f1f1f', text: '#f5f5f4', muted: '#a8a29e' },
  },
  premium: {
    tags: ['vintage'],
    label: 'Preto & Dourado luxo',
    description: 'Preto e dourado, botões em pílula',
    font: 'premium',
    radius: 'full',
    primary: '#c9a96e',
    secondary: '#1e1b4b',
    colors: { background: '#0c0c10', surface: '#17171d', text: '#f4f1ea', muted: '#a3a3ad' },
  },

  // ── Lote 1 (identidade visual) ─────────────────────────────────────────────
  // Critério de todos: texto ≥ 4.5 no fundo, texto do botão ≥ 4.5, texto do
  // topo ≥ 3 nas DUAS pontas do degradê primary → secondary (tests/theme.test.ts).
  'preto-vermelho': {
    tags: ['moderno'],
    label: 'Preto & Vermelho',
    description: 'Escuro, vermelho intenso, títulos de impacto',
    font: 'impacto',
    radius: 'sm',
    primary: '#dc2626',
    secondary: '#450a0a',
    colors: { background: '#0f0f10', surface: '#1a1a1d', text: '#f5f5f4', muted: '#a1a1aa' },
  },
  'preto-amarelo': {
    tags: ['moderno'],
    label: 'Preto & Amarelo',
    description: 'Escuro, amarelo vivo, cantos retos',
    font: 'impacto',
    radius: 'none',
    primary: '#facc15',
    // Amarelo → âmbar: o topo fica claro, com texto escuro de ponta a ponta.
    secondary: '#f59e0b',
    colors: { background: '#0b0b0b', surface: '#18181b', text: '#fafafa', muted: '#a1a1aa' },
  },
  'preto-laranja': {
    tags: ['moderno'],
    label: 'Preto & Laranja',
    description: 'Escuro e enérgico, laranja de destaque',
    font: 'moderno',
    radius: 'md',
    primary: '#f97316',
    secondary: '#f59e0b',
    colors: { background: '#111111', surface: '#1c1c1c', text: '#f5f5f5', muted: '#a3a3a3' },
  },
  'preto-roxo': {
    tags: ['moderno'],
    label: 'Preto & Roxo',
    description: 'Escuro, roxo profundo, tipografia geométrica',
    font: 'geometrica',
    radius: 'lg',
    primary: '#9333ea',
    secondary: '#1e1b4b',
    colors: { background: '#0e0b14', surface: '#1a1524', text: '#f5f3ff', muted: '#a8a2b8' },
  },
  'verde-escuro': {
    tags: ['moderno'],
    label: 'Verde escuro',
    description: 'Escuro e calmo, verde esmeralda',
    font: 'minimalista',
    radius: 'md',
    primary: '#10b981',
    secondary: '#14b8a6',
    colors: { background: '#0d1512', surface: '#15201b', text: '#ecfdf5', muted: '#9cb0a6' },
  },
  'azul-marinho': {
    tags: [],
    label: 'Azul marinho',
    description: 'Branco e azul marinho, tipografia clássica',
    font: 'classica',
    radius: 'md',
    primary: '#1e3a8a',
    secondary: '#0369a1',
    colors: { background: '#ffffff', surface: '#f1f5f9', text: '#0f172a', muted: '#64748b' },
  },
  'vintage-cafe': {
    tags: ['vintage'],
    label: 'Vintage café',
    description: 'Creme e marrom, títulos slab, cantos retos',
    font: 'vintage',
    radius: 'none',
    primary: '#8b5e34',
    secondary: '#3b2a1e',
    colors: { background: '#f5efe4', surface: '#fffaf1', text: '#3b2a1e', muted: '#7a6552' },
  },
  'dark-light': {
    tags: ['moderno'],
    label: 'Dark & Light',
    description: 'Grafite e branco, botões em pílula',
    font: 'minimalista',
    radius: 'full',
    primary: '#fafafa',
    // Branco → prata: topo claro, com texto escuro de ponta a ponta.
    secondary: '#a1a1aa',
    colors: { background: '#18181b', surface: '#27272a', text: '#fafafa', muted: '#a1a1aa' },
  },
  rose: {
    tags: ['vintage'],
    label: 'Rosé / Salão',
    description: 'Tons rosados e serifa, para salão',
    font: 'elegante',
    radius: 'lg',
    primary: '#a15f52',
    secondary: '#6d3b47',
    colors: { background: '#fdf6f4', surface: '#ffffff', text: '#3a2a2c', muted: '#86706f' },
  },
}

export const DEFAULT_THEME_PRESET: ThemePresetId = 'moderno'

/**
 * Cores da marca que o editor grava em primaryColor/secondaryColor ao aplicar
 * um estilo. Sem isso a coluna primaryColor (que vence o preset) manteria a
 * cor antiga e o estilo não apareceria no site.
 */
export function presetBrandColors(id: ThemePresetId): { primaryColor: string; secondaryColor: string } {
  const preset = THEME_PRESETS[id] ?? THEME_PRESETS[DEFAULT_THEME_PRESET]
  return { primaryColor: preset.primary, secondaryColor: preset.secondary }
}

export const THEME_STYLE_FILTERS = ['todos', 'escuros', 'claros', 'vintage', 'modernos'] as const
export type ThemeStyleFilter = (typeof THEME_STYLE_FILTERS)[number]

export function presetMatchesFilter(id: ThemePresetId, filter: ThemeStyleFilter): boolean {
  const preset = THEME_PRESETS[id]
  if (!preset) return false
  switch (filter) {
    case 'escuros': return luminance(preset.colors.background) < 0.4
    case 'claros': return luminance(preset.colors.background) >= 0.4
    case 'vintage': return preset.tags.includes('vintage')
    case 'modernos': return preset.tags.includes('moderno')
    default: return true
  }
}

export interface ThemeTokens {
  preset: ThemePresetId
  font: ThemeFontId
  radius: ThemeRadiusId
  scheme: 'light' | 'dark'

  background: string
  surface: string
  text: string
  muted: string
  border: string
  primary: string
  primaryContrast: string
  secondary: string
  /** Texto sobre o gradiente primary → secondary (hero sem foto). */
  heroText: string
  button: string
  buttonText: string
  buttonHover: string
  link: string
  footer: string

  /**
   * Controles nativos (input, select, textarea). Sem isto eles herdavam a cor
   * do texto da página e ficavam transparentes: texto claro de preset escuro
   * sobre o cartão branco do /agendar.
   */
  inputBg: string
  inputText: string
  inputBorder: string
  placeholder: string
  /** Anel/contorno de foco e `accent-color` de checkbox/radio. */
  focusRing: string

  headingFont: string
  bodyFont: string
  radiusCard: string
  radiusButton: string

  /** Cores escolhidas pelo usuário que foram corrigidas por falta de contraste. */
  adjusted: ThemeOverrideKey[]
}

export interface ResolveThemeInput {
  theme?: unknown
  primaryColor?: unknown
  secondaryColor?: unknown
}

// ─── Cor ──────────────────────────────────────────────────────────────────────

/** Hex `#rrggbb` minúsculo, ou null. Aceita `#rgb` legado vindo do banco. */
export function normalizeHex(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const v = value.trim()
  if (HEX_COLOR_RE.test(v)) return v.toLowerCase()
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    return `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`.toLowerCase()
  }
  return null
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const c = (x: number) => Math.round(Math.min(255, Math.max(0, x))).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

/** Mistura `a` com `b` (t = 0 → a, t = 1 → b). */
export function mixHex(a: string, b: string, t: number): string {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  return rgbToHex([0, 1, 2].map(i => ca[i] + (cb[i] - ca[i]) * t) as [number, number, number])
}

/** Luminância relativa WCAG 2.x. */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Razão de contraste WCAG (1 a 21). */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

const WHITE = '#ffffff'
const INK = '#111111'

/**
 * Texto sobre `bg` (botão, badge). Branco sempre que ele atinge 3:1 (WCAG para
 * texto em negrito/componente de interface) — é o que o site já usava com o
 * azul padrão. Só cores claras (amarelo, dourado, branco) ganham texto escuro.
 */
export function contrastText(bg: string): string {
  return contrastRatio(bg, WHITE) >= 3 ? WHITE : INK
}

/**
 * Escurece ou clareia `color` (na direção oposta a `against`) até atingir
 * `ratio`. Se já atinge, devolve a própria cor.
 */
export function ensureContrast(color: string, against: string, ratio: number): string {
  if (contrastRatio(color, against) >= ratio) return color
  const target = contrastRatio(against, WHITE) > contrastRatio(against, '#000000') ? WHITE : '#000000'
  for (let t = 0.05; t < 1; t += 0.05) {
    const candidate = mixHex(color, target, t)
    if (contrastRatio(candidate, against) >= ratio) return candidate
  }
  return target
}

// ─── Entrada ──────────────────────────────────────────────────────────────────

function isOneOf<T extends string>(list: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && (list as readonly string[]).includes(value)
}

/**
 * Lê o `theme` que veio da API (ou do formulário) descartando tudo que não for
 * válido. Nunca lança: tema quebrado vira tema padrão.
 */
export function sanitizeTheme(raw: unknown): WebsiteTheme {
  let value = raw
  if (typeof value === 'string') {
    try { value = JSON.parse(value) } catch { return {} }
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const src = value as Record<string, unknown>

  const out: WebsiteTheme = {}
  if (isOneOf(THEME_PRESET_IDS, src.preset)) out.preset = src.preset
  if (isOneOf(THEME_FONT_IDS, src.font)) out.font = src.font
  if (isOneOf(THEME_RADIUS_IDS, src.radius)) out.radius = src.radius

  const rawOverrides = src.overrides
  if (rawOverrides && typeof rawOverrides === 'object' && !Array.isArray(rawOverrides)) {
    const overrides: Partial<Record<ThemeOverrideKey, string>> = {}
    for (const key of THEME_OVERRIDE_KEYS) {
      const hex = (rawOverrides as Record<string, unknown>)[key]
      if (typeof hex === 'string' && HEX_COLOR_RE.test(hex)) overrides[key] = hex.toLowerCase()
    }
    if (Object.keys(overrides).length) out.overrides = overrides
  }
  return out
}

// ─── Resolução ────────────────────────────────────────────────────────────────

export function resolveTheme(input: ResolveThemeInput = {}): ThemeTokens {
  const theme = sanitizeTheme(input.theme)
  const presetId = theme.preset ?? DEFAULT_THEME_PRESET
  const preset = THEME_PRESETS[presetId]
  const overrides = theme.overrides ?? {}
  const adjusted: ThemeOverrideKey[] = []

  const font = theme.font ?? preset.font
  const radius = theme.radius ?? preset.radius

  const background = overrides.background ?? preset.colors.background
  const surface = overrides.surface ?? preset.colors.surface

  // Texto e texto secundário precisam ser legíveis no fundo da página. Se o
  // override não for, corrige e avisa (o admin mostra o aviso).
  let text = overrides.text ?? preset.colors.text
  const fixedText = ensureContrast(text, background, 4.5)
  if (fixedText !== text) { if (overrides.text) adjusted.push('text'); text = fixedText }

  let muted = overrides.muted ?? preset.colors.muted
  const fixedMuted = ensureContrast(muted, background, 3)
  if (fixedMuted !== muted) { if (overrides.muted) adjusted.push('muted'); muted = fixedMuted }

  const primary = normalizeHex(input.primaryColor) ?? preset.primary
  const secondary = normalizeHex(input.secondaryColor) ?? preset.secondary

  const button = overrides.button ?? primary
  const buttonText = contrastText(button)
  const buttonHover = hoverOf(button)

  // Link/destaque em texto (preços, "ver todas"): cor da marca, escurecida ou
  // clareada só o necessário para ler no fundo.
  let link = overrides.link ?? primary
  const fixedLink = ensureContrast(link, background, 3)
  if (fixedLink !== link) { if (overrides.link) adjusted.push('link'); link = fixedLink }

  const dark = luminance(background) < 0.4
  const border = mixHex(surface, text, dark ? 0.16 : 0.1)
  // O rodapé é sempre escuro (os ícones e textos dele são claros).
  const footer = ensureContrast(dark ? mixHex(background, '#000000', 0.4) : mixHex(text, '#000000', 0.15), WHITE, 12)

  return {
    preset: presetId,
    font,
    radius,
    scheme: dark ? 'dark' : 'light',
    background,
    surface,
    text,
    muted,
    border,
    primary,
    primaryContrast: contrastText(primary),
    secondary,
    // O texto do hero fica no meio do gradiente: contraste contra a mistura.
    heroText: contrastText(mixHex(primary, secondary, 0.5)),
    button,
    buttonText,
    buttonHover,
    link,
    footer,
    ...controlTokens({ dark, surface, text, muted, primary }),
    headingFont: THEME_FONTS[font].headingStack,
    bodyFont: THEME_FONTS[font].bodyStack,
    radiusCard: THEME_RADII[radius].card,
    radiusButton: THEME_RADII[radius].button,
    adjusted,
  }
}

/** Hover do botão: escurece; só botão já muito escuro (quase preto) clareia. */
function hoverOf(button: string): string {
  return luminance(button) > 0.03 ? mixHex(button, '#000000', 0.12) : mixHex(button, WHITE, 0.15)
}

type ControlTokens = Pick<ThemeTokens, 'inputBg' | 'inputText' | 'inputBorder' | 'placeholder' | 'focusRing'>

/**
 * Cores dos controles nativos. No tema claro o campo é branco — é o que o
 * site sempre mostrou (input transparente sobre cartão branco); no escuro, a
 * superfície. A borda do claro (18% do texto) reproduz o gray-300 que o
 * formulário já usava; a do escuro chega a 3:1.
 */
function controlTokens(c: { dark: boolean; surface: string; text: string; muted: string; primary: string }): ControlTokens {
  const inputBg = c.dark ? c.surface : WHITE
  const inputText = ensureContrast(c.text, inputBg, 4.5)
  const inputBorder = c.dark
    ? ensureContrast(mixHex(inputBg, inputText, 0.4), inputBg, 3)
    : mixHex(inputBg, inputText, 0.18)
  return {
    inputBg,
    inputText,
    inputBorder,
    placeholder: ensureContrast(c.muted, inputBg, 4.3),
    focusRing: ensureContrast(c.primary, inputBg, 3),
  }
}

// ─── Bloco claro (/agendar em preset escuro) ─────────────────────────────────
//
// As páginas de /agendar desenham cartões brancos e textos cinza fixos. Com
// preset escuro, o que elas HERDAM (texto de input, títulos sem cor, dias do
// calendário) vinha claro. O layout marca `<html data-surface="light">` nessas
// rotas e o CSS abaixo devolve tokens claros só ao conteúdo (o header e o
// rodapé continuam no tema do site). Presets claros não precisam: não emitem.

/** Cores base do bloco claro: as do preset Moderno, o visual de hoje. */
const LIGHT_SURFACE = { background: '#f9fafb', surface: '#ffffff', text: '#111827', muted: '#6b7280' }
/** Fundo mais escuro do bloco (gray-100, fim do degradê das páginas): links leem nele. */
const LIGHT_SURFACE_DARKEST = '#f3f4f6'
/**
 * O `<main>` da página e o que é teleportado direto para o `<body>` (modal
 * da fila). Seletor constante — nada do tenant entra aqui.
 */
export const LIGHT_SURFACE_SELECTOR = ':root[data-surface="light"] :is(main,body>:not(#__nuxt))'

export type LightSurfaceTokens = Pick<ThemeTokens,
  'background' | 'surface' | 'text' | 'muted' | 'border' | 'button' | 'buttonText' | 'buttonHover' | 'link'
> & ControlTokens

/** Tokens do bloco claro, ou null quando o tema já é claro. */
export function lightSurfaceTokens(tokens: ThemeTokens): LightSurfaceTokens | null {
  if (tokens.scheme !== 'dark') return null
  const { background, surface, text, muted } = LIGHT_SURFACE
  // Botão que some no branco (dark-light: #fafafa, 1:1) usa o fundo escuro
  // do próprio preset; os demais mantêm a cor da marca.
  const button = contrastRatio(tokens.button, WHITE) >= 1.5 ? tokens.button : tokens.background
  return {
    background,
    surface,
    text,
    muted,
    border: mixHex(surface, text, 0.1),
    button,
    buttonText: contrastText(button),
    buttonHover: hoverOf(button),
    link: ensureContrast(tokens.link, LIGHT_SURFACE_DARKEST, 3),
    ...controlTokens({ dark: false, surface, text, muted, primary: tokens.primary }),
  }
}

/** Tema de um estilo com as cores dele próprio (cards da galeria do editor). */
export function presetPreviewTheme(id: ThemePresetId): ThemeTokens {
  return resolveTheme({ theme: { preset: id }, ...presetBrandColors(id) })
}

// ─── Saída ────────────────────────────────────────────────────────────────────

const COLOR_VARS: [keyof ThemeTokens, string][] = [
  ['background', '--background'],
  ['surface', '--surface'],
  ['text', '--text'],
  ['muted', '--muted'],
  ['border', '--border'],
  ['primary', '--primary'],
  ['primaryContrast', '--primary-contrast'],
  ['secondary', '--secondary'],
  ['heroText', '--hero-text'],
  ['button', '--button'],
  ['buttonText', '--button-text'],
  ['buttonHover', '--button-hover'],
  ['link', '--link'],
  ['footer', '--footer'],
  ['inputBg', '--input-bg'],
  ['inputText', '--input-text'],
  ['inputBorder', '--input-border'],
  ['placeholder', '--placeholder'],
  ['focusRing', '--focus-ring'],
  // Aliases de compatibilidade (código antigo lê estes nomes).
  ['primary', '--primary-color'],
  ['secondary', '--secondary-color'],
]

/** Variáveis CSS do tema (nome → valor). Só hex validado e constantes. */
export function themeToCssVars(tokens: ThemeTokens): Record<string, string> {
  const vars = colorVars(tokens)
  const font = THEME_FONTS[tokens.font] ?? THEME_FONTS[DEFAULT_THEME_PRESET]
  const radius = THEME_RADII[tokens.radius] ?? THEME_RADII.lg
  vars['--heading-font'] = font.headingStack
  vars['--body-font'] = font.bodyStack
  // Fonte de título com um peso só: usa o peso dela, sem negrito falso.
  vars['--heading-synthesis'] = font.singleWeightHeading ? 'none' : 'auto'
  vars['--card-radius'] = radius.card
  vars['--button-radius'] = radius.button
  return vars
}

function colorVars(tokens: Partial<ThemeTokens>): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [key, name] of COLOR_VARS) {
    const value = tokens[key]
    // Defesa em profundidade: nada que não seja hex chega ao CSS.
    if (typeof value === 'string' && HEX_COLOR_RE.test(value)) vars[name] = value
  }
  return vars
}

function declarations(vars: Record<string, string>): string {
  return Object.entries(vars).map(([k, v]) => `${k}:${v};`).join('')
}

/** Bloco `:root { ... }` pronto para o `<style>` do SSR. */
export function themeToCss(tokens: ThemeTokens): string {
  const scheme = tokens.scheme === 'dark' ? 'dark' : 'light'
  return `:root{${declarations(themeToCssVars(tokens))}color-scheme:${scheme};}`
}

/**
 * Bloco claro do /agendar (segundo `<style>` do SSR). Vazio em preset claro.
 * `color` reaplica o texto: a cor chega ao <main> já calculada pelo wrapper do
 * layout, trocar só a variável não bastaria.
 */
export function lightSurfaceCss(tokens: ThemeTokens): string {
  const light = lightSurfaceTokens(tokens)
  if (!light) return ''
  return `${LIGHT_SURFACE_SELECTOR}{${declarations(colorVars(light))}color:var(--text);color-scheme:light;}`
}
