<!--pages/scraper.vue-->
<template>
  <div class="min-h-screen bg-[#0a0a0a] px-4 pb-20" style="padding-top: calc(68px + 2rem); font-family: 'DM Sans', sans-serif">
    <div class="max-w-3xl mx-auto">

      <!-- ── Header ─────────────────────────────────────── -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-white tracking-tight">Scraper manual</h1>
          <p class="text-sm text-gray-500 mt-1">Cadastro manual de barbearia + serviços</p>
        </div>
        <DataSourceToggle v-if="isDev" />
      </div>

      <form class="flex flex-col gap-3" @submit.prevent="handleSubmit">

        <!-- ── Identificação ───────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Identificação</h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="field required col-span-2 sm:col-span-1">
              <label>Nome</label>
              <input v-model="form.name" type="text" placeholder="Barbearia do João" @input="autoSlug" />
            </div>
            <div class="field col-span-2 sm:col-span-1">
              <label>Slug</label>
              <input v-model="form.slug" type="text" placeholder="barbearia-do-joao-sp" />
              <span class="hint">Gerado automaticamente.</span>
            </div>
            <div class="field">
              <label>Subdomínio</label>
              <input v-model="form.subdomain" type="text" placeholder="barbearia-joao" />
            </div>
            <div class="field">
              <label>Google Place ID</label>
              <input v-model="form.googlePlaceId" type="text" placeholder="ChIJxxx..." />
            </div>
          </div>
        </section>

        <!-- ── Status & Plano ──────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Status & Plano</h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="field">
              <label>Status</label>
              <select v-model="form.status">
                <option value="pending">Pendente</option>
                <option value="active">Ativo</option>
                <option value="suspended">Suspenso</option>
                <option value="churned">Churned</option>
              </select>
            </div>
            <div class="field">
              <label>Plano</label>
              <select v-model="form.plan">
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
        </section>

        <!-- ── Endereço ────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Endereço</h2>
          <div class="field mb-4">
            <label>Buscar endereço <span class="text-[11px] text-gray-600 font-normal">(preenche automaticamente)</span></label>
            <AddressAutocomplete
              placeholder="Digite o endereço ou nome do estabelecimento..."
              @select="onAddressSelect"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="field"><label>Rua</label><input v-model="form.street" type="text" placeholder="Rua das Flores" /></div>
            <div class="field"><label>Número</label><input v-model="form.number" type="text" placeholder="123" /></div>
            <div class="field"><label>Complemento</label><input v-model="form.complement" type="text" placeholder="Sala 2" /></div>
            <div class="field"><label>Bairro</label><input v-model="form.neighborhood" type="text" placeholder="Centro" /></div>
            <div class="field required">
              <label>Cidade</label>
              <input v-model="form.city" type="text" placeholder="São Paulo" @input="autoCitySlug" />
            </div>
            <div class="field"><label>City Slug</label><input v-model="form.citySlug" type="text" placeholder="sao-paulo" /></div>
            <div class="field required">
              <label>Estado (UF)</label>
              <input v-model="form.state" type="text" maxlength="2" placeholder="SP" class="uppercase" />
            </div>
            <div class="field"><label>CEP</label><input v-model="form.zipCode" type="text" placeholder="00000-000" /></div>
          </div>
        </section>

        <!-- ── Geolocalização ──────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Geolocalização</h2>
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="field"><label>Latitude</label><input v-model.number="form.latitude" type="number" step="any" placeholder="-23.5505" /></div>
            <div class="field"><label>Longitude</label><input v-model.number="form.longitude" type="number" step="any" placeholder="-46.6333" /></div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="btn-geo" :disabled="geocoding || !canGeocode" @click="geocodeFromAddress">
              {{ geocoding && geocodingMode === 'address' ? 'Buscando...' : '↑ Obter coords do endereço' }}
            </button>
            <button type="button" class="btn-geo" :disabled="geocoding || !canReverse" @click="reverseFromCoords">
              {{ geocoding && geocodingMode === 'reverse' ? 'Buscando...' : '↓ Preencher endereço das coords' }}
            </button>
            <button type="button" class="btn-geo" :disabled="geocoding" @click="useMyLocation">
              {{ geocoding && geocodingMode === 'browser' ? 'Localizando...' : '⊙ Minha localização' }}
            </button>
          </div>
          <p v-if="geoError" class="mt-2 text-xs text-red-400">{{ geoError }}</p>
        </section>

        <!-- ── Contato ─────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Contato</h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="field"><label>Telefone</label><input v-model="form.phone" type="tel" placeholder="(11) 99999-0000" /></div>
            <div class="field"><label>WhatsApp</label><input v-model="form.whatsapp" type="tel" placeholder="(11) 99999-0000" /></div>
            <div class="field"><label>E-mail</label><input v-model="form.email" type="email" placeholder="contato@barbearia.com" /></div>
            <div class="field"><label>Website</label><input v-model="form.website" type="url" placeholder="https://barbearia.com" /></div>
          </div>
        </section>

        <!-- ── Google ──────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Dados do Google</h2>
          <div class="grid grid-cols-3 gap-3">
            <div class="field"><label>Nota Google</label><input v-model.number="form.googleRating" type="number" step="0.1" min="0" max="5" placeholder="4.5" /></div>
            <div class="field"><label>Qtd. avaliações</label><input v-model.number="form.googleReviewCount" type="number" min="0" placeholder="120" /></div>
            <div class="field"><label>Nota nativa</label><input v-model.number="form.nativeRating" type="number" step="0.01" min="0" max="5" placeholder="4.75" /></div>
          </div>
        </section>

        <!-- ── SEO & Conteúdo ──────────────────────────── -->
        <section class="card">
          <h2 class="section-title">SEO & Conteúdo</h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="field"><label>Meta title</label><input v-model="form.metaTitle" type="text" maxlength="70" placeholder="Barbearia do João — SP" /></div>
            <div class="field"><label>Meta description</label><input v-model="form.metaDescription" type="text" maxlength="160" placeholder="Corte e barba no centro de SP..." /></div>
            <div class="field"><label>Logo URL</label><input v-model="form.logoUrl" type="url" placeholder="https://..." /></div>
            <div class="field"><label>Cover URL</label><input v-model="form.coverImageUrl" type="url" placeholder="https://..." /></div>
          </div>
          <div class="field mt-3">
            <label>Descrição</label>
            <textarea v-model="form.description" rows="3" placeholder="Barbearia tradicional fundada em..." />
          </div>
        </section>

        <!-- ── Horários ────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Horários de funcionamento</h2>
          <div class="flex flex-col gap-2">
            <div v-for="day in weekDays" :key="day.key" class="flex items-center gap-3">
              <div class="flex items-center gap-2 w-20 flex-shrink-0">
                <input
                  :id="`day-${day.key}`"
                  type="checkbox"
                  class="w-4 h-4 rounded accent-green-400"
                  :checked="form.openingHours[day.key] !== null"
                  @change="toggleDay(day.key)"
                />
                <label :for="`day-${day.key}`" class="text-sm text-gray-300 cursor-pointer select-none">{{ day.label }}</label>
              </div>
              <template v-if="form.openingHours[day.key] !== null">
                <input v-model="form.openingHours[day.key].open" type="time" class="time-input" />
                <span class="text-xs text-gray-600">até</span>
                <input v-model="form.openingHours[day.key].close" type="time" class="time-input" />
              </template>
              <span v-else class="text-xs text-gray-600 italic">Fechado</span>
            </div>
          </div>
        </section>

        <!-- ── Fotos ───────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Fotos</h2>

          <!-- Previews -->
          <div v-if="form.photos.length" class="grid grid-cols-3 gap-2 mb-4">
            <div
              v-for="(photo, i) in form.photos"
              :key="i"
              class="relative group rounded-lg overflow-hidden bg-[#0d0d0d] border border-white/[.06]"
              style="aspect-ratio:4/3"
            >
              <img
                :src="photo.url"
                :alt="`Foto ${i + 1}`"
                class="w-full h-full object-cover"
                @error="photo.error = true"
              />
              <div v-if="photo.error" class="absolute inset-0 flex items-center justify-center">
                <span class="text-xs text-gray-600">URL inválida</span>
              </div>
              <!-- Badge capa -->
              <div
                v-if="photo.isCover"
                class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-400 text-black"
              >capa</div>
              <!-- Ações hover -->
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  class="px-2 py-1 rounded text-[10px] font-bold bg-green-400 text-black"
                  :disabled="photo.isCover"
                  @click="setCover(i)"
                >capa</button>
                <button
                  type="button"
                  class="px-2 py-1 rounded text-[10px] font-bold bg-red-400/80 text-white"
                  @click="removePhoto(i)"
                >✕</button>
              </div>
            </div>
          </div>

          <!-- Input de nova URL -->
          <div class="flex gap-2">
            <div class="field flex-1">
              <input
                v-model="photoInput"
                type="url"
                placeholder="https://lh3.googleusercontent.com/..."
                @keydown.enter.prevent="addPhoto"
              />
            </div>
            <button
              type="button"
              class="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-white/20 hover:text-white transition-colors flex-shrink-0"
              @click="addPhoto"
            >+ Add</button>
          </div>
          <p class="text-[11px] text-gray-700 mt-2">Cole a URL e pressione Enter ou clique em Add. A primeira foto vira a capa.</p>
        </section>

        <!-- ── Serviços ────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Serviços</h2>

          <div v-for="(svc, i) in form.services" :key="i" class="svc-card">
            <div class="flex justify-between items-center mb-3">
              <span class="text-xs text-gray-500 font-medium">#{{ i + 1 }}</span>
              <button type="button" class="text-xs text-gray-600 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-400/10" @click="removeService(i)">✕ remover</button>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="field required"><label>Nome</label><input v-model="svc.name" type="text" placeholder="Corte degradê" @input="autoSvcSlug(i)" /></div>
              <div class="field"><label>Slug</label><input v-model="svc.slug" type="text" placeholder="corte-degrade" /></div>
              <div class="field">
                <label>Categoria</label>
                <select v-model="svc.category">
                  <option value="">— selecione —</option>
                  <option value="corte">Corte</option>
                  <option value="barba">Barba</option>
                  <option value="tratamento">Tratamento</option>
                  <option value="combo">Combo</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div class="field"><label>Duração (min)</label><input v-model.number="svc.durationMin" type="number" min="5" max="480" placeholder="30" /></div>
              <div class="field required"><label>Preço (R$)</label><input v-model.number="svc.price" type="number" step="0.01" min="0" placeholder="45.00" /></div>
              <div class="field"><label>Preço mín.</label><input v-model.number="svc.priceMin" type="number" step="0.01" min="0" placeholder="Opcional" /></div>
              <div class="field"><label>Preço máx.</label><input v-model.number="svc.priceMax" type="number" step="0.01" min="0" placeholder="Opcional" /></div>
              <div class="field"><label>Ordem</label><input v-model.number="svc.sortOrder" type="number" min="0" placeholder="0" /></div>
            </div>
            <div class="field mt-3"><label>Descrição</label><textarea v-model="svc.description" rows="2" placeholder="Opcional..." /></div>
            <div class="flex gap-4 mt-3">
              <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input v-model="svc.isActive" type="checkbox" class="accent-green-400" /> Ativo
              </label>
              <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input v-model="svc.isFeatured" type="checkbox" class="accent-green-400" /> Destaque
              </label>
            </div>
          </div>

          <button
            type="button"
            class="w-full mt-1 py-2.5 border border-dashed border-white/10 rounded-xl text-sm text-gray-500 hover:border-white/20 hover:text-gray-300 transition-colors"
            @click="addService"
          >
            + Adicionar serviço
          </button>
        </section>

        <!-- ── Resultado ───────────────────────────────── -->
        <div v-if="result" class="px-4 py-3 rounded-xl text-sm border"
          :class="{
            'bg-green-400/10 border-green-400/20 text-green-300': result.created,
            'bg-amber-400/10 border-amber-400/20 text-amber-300': result.duplicate,
            'bg-red-400/10   border-red-400/20   text-red-300':   result.error,
          }"
        >
          <span v-if="result.created">✔ Criado — ID: <code class="font-mono text-xs">{{ result.id }}</code></span>
          <span v-else-if="result.duplicate">⚠ Duplicado — ID existente: <code class="font-mono text-xs">{{ result.id }}</code></span>
          <span v-else-if="result.error">✕ Erro: {{ result.error }}</span>
        </div>

        <!-- ── Actions ─────────────────────────────────── -->
        <div class="flex gap-3 justify-end pt-1">
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
            @click="resetForm"
          >
            Limpar
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-2.5 rounded-xl text-sm font-bold bg-green-400 text-black hover:bg-green-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Salvando...' : 'Salvar barbearia' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'barber' })
 
// ✅ Bloqueia indexação do Google — página admin interna
useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })
 
import slugify from 'slugify'
import { useScraping } from '~/composables/useScraping'
import { geocodeExact, reverseGeocode } from '~/composables/useGeocoding'
import type { GeoSuggestion } from '~/composables/useGeocoding'

const { loading, result, submitBarbershop } = useScraping()
const isDev = import.meta.dev

const weekDays = [
  { key: 'mon', label: 'Seg' }, { key: 'tue', label: 'Ter' },
  { key: 'wed', label: 'Qua' }, { key: 'thu', label: 'Qui' },
  { key: 'fri', label: 'Sex' }, { key: 'sat', label: 'Sáb' },
  { key: 'sun', label: 'Dom' },
]

const geocoding     = ref(false)
const geocodingMode = ref<'address' | 'reverse' | 'browser' | null>(null)
const geoError      = ref<string | null>(null)

const canGeocode = computed(() => !!(form.city || form.street))
const canReverse = computed(() => form.latitude != null && form.longitude != null)

function applyGeoSuggestion(s: GeoSuggestion) {
  if (s.street)       form.street       = s.street
  if (s.number)       form.number       = s.number
  if (s.neighborhood) form.neighborhood = s.neighborhood
  if (s.city)         { form.city = s.city; autoCitySlug() }
  if (s.state)        form.state        = s.state  // já resolvido pelo resolveStateCode
  if (s.zipCode)      form.zipCode      = s.zipCode
  if (s.country)      form.country      = s.country
  form.latitude  = s.lat
  form.longitude = s.lon
  autoSlug()
}

function onAddressSelect(sug: GeoSuggestion) { applyGeoSuggestion(sug) }

async function geocodeFromAddress() {
  const q = [form.street, form.number, form.neighborhood, form.city, form.state, 'Brasil'].filter(Boolean).join(', ')
  geocoding.value = true; geocodingMode.value = 'address'; geoError.value = null
  try {
    const res = await geocodeExact(q)
    if (res) { form.latitude = res.lat; form.longitude = res.lon }
    else geoError.value = 'Endereço não encontrado. Tente um endereço mais completo.'
  } finally { geocoding.value = false; geocodingMode.value = null }
}

async function reverseFromCoords() {
  if (!form.latitude || !form.longitude) return
  geocoding.value = true; geocodingMode.value = 'reverse'; geoError.value = null
  try {
    const res = await reverseGeocode(form.latitude, form.longitude)
    if (res) applyGeoSuggestion(res)
    else geoError.value = 'Não foi possível encontrar endereço para essas coordenadas.'
  } finally { geocoding.value = false; geocodingMode.value = null }
}

async function useMyLocation() {
  if (!navigator.geolocation) { geoError.value = 'Browser não suporta geolocalização.'; return }
  geocoding.value = true; geocodingMode.value = 'browser'; geoError.value = null
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      form.latitude = pos.coords.latitude; form.longitude = pos.coords.longitude
      const res = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
      if (res) applyGeoSuggestion(res)
      geocoding.value = false; geocodingMode.value = null
    },
    (err) => { geoError.value = `Geolocalização negada: ${err.message}`; geocoding.value = false; geocodingMode.value = null },
  )
}

function makeSlug(str: string) { return slugify(str, { lower: true, strict: true }) }

function makeDefaultHours() {
  return {
    mon: { open: '09:00', close: '20:00' }, tue: { open: '09:00', close: '20:00' },
    wed: { open: '09:00', close: '20:00' }, thu: { open: '09:00', close: '20:00' },
    fri: { open: '09:00', close: '20:00' }, sat: { open: '09:00', close: '18:00' },
    sun: null,
  }
}

function makeDefaultForm() {
  return {
    name: '', slug: '', subdomain: '', googlePlaceId: '',
    status: 'active' as const, plan: 'free' as const,
    phone: '', whatsapp: '', email: '', website: '',
    street: '', number: '', complement: '', neighborhood: '',
    city: '', citySlug: '', state: '', zipCode: '', country: 'BR',
    latitude: null as number | null, longitude: null as number | null,
    description: '', metaTitle: '', metaDescription: '', coverImageUrl: '', logoUrl: '',
    googleRating: null as number | null, googleReviewCount: 0, nativeRating: null as number | null,
    openingHours: makeDefaultHours() as Record<string, { open: string; close: string } | null>,
    services: [] as any[],
    photos:   [] as Array<{ url: string; isCover: boolean; error: boolean }>,
  }
}

const form = reactive(makeDefaultForm())

function autoSlug() { form.slug = form.citySlug ? `${makeSlug(form.name)}-${form.citySlug}` : makeSlug(form.name) }
function autoCitySlug() { form.citySlug = makeSlug(form.city); if (form.name) autoSlug() }
function toggleDay(key: string) { form.openingHours[key] = form.openingHours[key] === null ? { open: '09:00', close: '20:00' } : null }
function addService() { form.services.push({ name: '', slug: '', category: '', description: '', price: 0, priceMin: null, priceMax: null, durationMin: 30, isActive: true, isFeatured: false, sortOrder: form.services.length }) }
function removeService(i: number) { form.services.splice(i, 1) }
function autoSvcSlug(i: number) { form.services[i].slug = makeSlug(form.services[i].name) }
// ── Fotos ──────────────────────────────────────────────────────────────────
const photoInput = ref('')

function addPhoto() {
  const url = photoInput.value.trim()
  if (!url) return
  form.photos.push({ url, isCover: form.photos.length === 0, error: false })
  photoInput.value = ''
}

function removePhoto(i: number) {
  const wasCover = form.photos[i].isCover
  form.photos.splice(i, 1)
  // Se removeu a capa e ainda tem fotos, promove a primeira
  if (wasCover && form.photos.length > 0) form.photos[0].isCover = true
}

function setCover(i: number) {
  form.photos.forEach((p, idx) => { p.isCover = idx === i })
}

function resetForm() { Object.assign(form, makeDefaultForm()); geoError.value = null; photoInput.value = '' }

async function handleSubmit() {
  if (!form.name || !form.city || !form.state) { alert('Preencha nome, cidade e estado.'); return }
  await submitBarbershop({
    ...form,
    state:           form.state.toUpperCase(),
    subdomain:       form.subdomain       || undefined,
    googlePlaceId:   form.googlePlaceId   || undefined,
    phone:           form.phone           || undefined,
    whatsapp:        form.whatsapp        || undefined,
    email:           form.email           || undefined,
    website:         form.website         || undefined,
    street:          form.street          || undefined,
    zipCode:         form.zipCode         || undefined,
    description:     form.description     || undefined,
    metaTitle:       form.metaTitle       || undefined,
    metaDescription: form.metaDescription || undefined,
    coverImageUrl:   form.coverImageUrl   || undefined,
    logoUrl:         form.logoUrl         || undefined,
    latitude:        form.latitude        ?? undefined,
    longitude:       form.longitude       ?? undefined,
    googleRating:    form.googleRating    ?? undefined,
    nativeRating:    form.nativeRating    ?? undefined,
    services:        form.services.length > 0 ? form.services : undefined,
    photos:          form.photos.length > 0
      ? form.photos.map((p, i) => ({ url: p.url, isCover: p.isCover ? 1 : 0, source: 'manual', sortOrder: i }))
      : undefined,
  })
}
</script>

<style scoped>
/* Cards */
.card {
  background: #111;
  border: 0.5px solid rgba(255,255,255,.07);
  border-radius: 14px;
  padding: 1.25rem;
}

.section-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #4b5563;
  margin-bottom: 1rem;
  padding-bottom: .5rem;
  border-bottom: 0.5px solid rgba(255,255,255,.05);
}

/* Fields */
.field { display: flex; flex-direction: column; gap: 4px; }
.field label { font-size: 12px; font-weight: 500; color: #6b7280; }
.field.required label::after { content: " *"; color: #f87171; }
.hint { font-size: 11px; color: #374151; }

.field input,
.field select,
.field textarea {
  padding: 8px 11px;
  font-size: 13px;
  border: 0.5px solid rgba(255,255,255,.1);
  border-radius: 8px;
  background: #0d0d0d;
  color: #e5e7eb;
  outline: none;
  font-family: inherit;
  transition: border-color .15s;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: rgba(255,255,255,.25);
}
.field input::placeholder,
.field textarea::placeholder { color: #374151; }
.field select option { background: #111; }
.field textarea { resize: vertical; min-height: 64px; }

/* Time input */
.time-input {
  padding: 5px 8px;
  font-size: 12px;
  border: 0.5px solid rgba(255,255,255,.1);
  border-radius: 7px;
  background: #0d0d0d;
  color: #d1d5db;
  font-family: inherit;
  outline: none;
  width: 96px;
}
.time-input:focus { border-color: rgba(255,255,255,.25); }

/* Geo buttons */
.btn-geo {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 8px;
  border: 0.5px solid rgba(255,255,255,.1);
  background: none;
  color: #6b7280;
  cursor: pointer;
  font-family: inherit;
  transition: all .15s;
}
.btn-geo:hover:not(:disabled) {
  border-color: rgba(255,255,255,.2);
  color: #d1d5db;
}
.btn-geo:disabled { opacity: .35; cursor: not-allowed; }

/* Serviço card */
.svc-card {
  background: #0d0d0d;
  border: 0.5px solid rgba(255,255,255,.06);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: .75rem;
}

@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr !important; }
}
</style>