// composables/useLocalImage.ts
//
// Imagem escolhida pelo visitante no configurador, SÓ no navegador: nada é
// enviado para servidor nem para o Cloudinary. O arquivo é validado (tipo e
// tamanho), decodificado (createImageBitmap), reduzido num canvas e vira um
// objectURL `blob:`. A URL anterior é revogada a cada troca, no clear() e
// quando o componente dono sai da página (onScopeDispose).
//
// As dependências de browser (decode/encode/URL) são injetáveis: a lógica de
// validação, tamanho, corrida entre seleções e revogação é testada em node.
import { getCurrentScope, onScopeDispose, readonly, ref } from 'vue'

export type LocalImageKind = 'photo' | 'logo'

export const LOCAL_IMAGE_MAX_BYTES = 8 * 1024 * 1024
/** Maior lado depois de reduzir: foto do topo e logo. */
export const LOCAL_IMAGE_MAX_SIDE: Record<LocalImageKind, number> = { photo: 1600, logo: 400 }

export const LOCAL_IMAGE_MESSAGES = {
  notImage: 'Esse arquivo não é uma imagem. Escolha uma foto JPG, PNG ou WebP.',
  tooBig: 'A imagem passa de 8 MB. Escolha uma foto menor.',
  heic: 'Fotos HEIC do iPhone não abrem neste navegador. Salve a foto como JPG (ou tire um print dela) e envie de novo.',
  decode: 'Não conseguimos abrir essa imagem. Tente outro arquivo JPG ou PNG.',
} as const

const HEIC_RE = /^image\/hei[cf](-sequence)?$/i
const HEIC_NAME_RE = /\.hei[cf]$/i

export interface LocalImageFile {
  name?: string
  type: string
  size: number
}

const isHeic = (file: LocalImageFile) => HEIC_RE.test(file.type) || HEIC_NAME_RE.test(file.name ?? '')

/**
 * Mensagem de erro do arquivo, ou null se pode seguir para o decode.
 * SVG fica de fora (não é foto e não passa pelo canvas do mesmo jeito).
 * HEIC segue: o Safari decodifica; nos outros o decode falha com a mensagem
 * própria. Alguns sistemas mandam HEIC com type vazio — vale a extensão.
 */
export function checkImageFile(file: LocalImageFile | null | undefined): string | null {
  if (!file) return LOCAL_IMAGE_MESSAGES.notImage
  const type = (file.type || '').toLowerCase()
  const imageType = type.startsWith('image/') && type !== 'image/svg+xml'
  if (!imageType && !(type === '' && isHeic(file))) return LOCAL_IMAGE_MESSAGES.notImage
  if (!Number.isFinite(file.size) || file.size <= 0) return LOCAL_IMAGE_MESSAGES.notImage
  if (file.size > LOCAL_IMAGE_MAX_BYTES) return LOCAL_IMAGE_MESSAGES.tooBig
  return null
}

/** Cabe em max×max mantendo a proporção; nunca aumenta. */
export function fitWithin(width: number, height: number, max: number): { width: number; height: number } {
  if (!(width > 0) || !(height > 0)) return { width: 0, height: 0 }
  const scale = Math.min(1, max / Math.max(width, height))
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) }
}

export interface DecodedImage {
  width: number
  height: number
  close?: () => void
}

export interface LocalImageDeps<Img extends DecodedImage = DecodedImage, F extends LocalImageFile = LocalImageFile> {
  decode: (file: F) => Promise<Img>
  encode: (image: Img, size: { width: number; height: number }, kind: LocalImageKind) => Promise<Blob>
  createUrl: (blob: Blob) => string
  revokeUrl: (url: string) => void
}

/** Implementação real (só roda no navegador). */
export const browserImageDeps: LocalImageDeps<ImageBitmap, File> = {
  decode: file => createImageBitmap(file),
  encode: (image, { width, height }, kind) => new Promise<Blob>((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return reject(new Error('canvas 2d indisponível'))
    // Logo em PNG (mantém transparência); foto em JPEG, com fundo branco
    // para PNG transparente não virar preto.
    if (kind === 'photo') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
    }
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(image, 0, 0, width, height)
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error('toBlob vazio'))),
      kind === 'logo' ? 'image/png' : 'image/jpeg',
      0.86,
    )
  }),
  createUrl: blob => URL.createObjectURL(blob),
  revokeUrl: url => URL.revokeObjectURL(url),
}

export function useLocalImage<Img extends DecodedImage, F extends LocalImageFile>(
  kind: LocalImageKind,
  deps?: LocalImageDeps<Img, F>,
) {
  const d = (deps ?? browserImageDeps) as unknown as LocalImageDeps<Img, F>
  const url = ref<string | null>(null)
  const error = ref('')
  const busy = ref(false)
  // Cada seleção ganha um número; só a última aplica o resultado (o usuário
  // pode trocar de arquivo antes de o anterior terminar).
  let seq = 0

  function setUrl(next: string | null) {
    if (url.value) d.revokeUrl(url.value)
    url.value = next
  }

  /** Processa o arquivo. Devolve a nova URL, ou null (erro em `error`). */
  async function select(file: F | null | undefined): Promise<string | null> {
    const id = ++seq
    error.value = ''
    const problem = checkImageFile(file)
    if (problem || !file) {
      error.value = problem ?? LOCAL_IMAGE_MESSAGES.notImage
      return null
    }
    busy.value = true
    let image: Img | null = null
    try {
      try {
        image = await d.decode(file)
      } catch {
        if (id === seq) error.value = isHeic(file) ? LOCAL_IMAGE_MESSAGES.heic : LOCAL_IMAGE_MESSAGES.decode
        return null
      }
      const size = fitWithin(image.width, image.height, LOCAL_IMAGE_MAX_SIDE[kind])
      if (!size.width) throw new Error('imagem vazia')
      const blob = await d.encode(image, size, kind)
      const next = d.createUrl(blob)
      if (id !== seq) { // chegou outra seleção no meio: descarta esta
        d.revokeUrl(next)
        return null
      }
      setUrl(next)
      return next
    } catch {
      if (id === seq) error.value = LOCAL_IMAGE_MESSAGES.decode
      return null
    } finally {
      image?.close?.()
      if (id === seq) busy.value = false
    }
  }

  /** Tira a imagem e revoga a URL (também cancela seleção em andamento). */
  function clear() {
    seq++
    busy.value = false
    error.value = ''
    setUrl(null)
  }

  if (getCurrentScope()) onScopeDispose(clear)

  return { kind, url: readonly(url), error: readonly(error), busy: readonly(busy), select, clear }
}

export type LocalImage = ReturnType<typeof useLocalImage>
