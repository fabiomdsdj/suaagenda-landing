<!-- pages/scraper/[id].vue -->
<!-- Rota: /scraper/:id  (id = UUID da barbearia) -->
<!-- Rota: /scraper/new  (cria nova — reaproveita o mesmo form) -->
<template>
  <div class="min-h-screen bg-[#0a0a0a] px-4 pb-20" style="padding-top: calc(68px + 2rem); font-family: 'DM Sans', sans-serif">
    <div class="max-w-3xl mx-auto">

      <!-- ── Header ──────────────────────────────────────────────── -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <NuxtLink to="/scraper" class="text-xs text-gray-600 hover:text-green-400 transition-colors flex items-center gap-1 mb-2">
            ← Voltar para lista
          </NuxtLink>
          <h1 class="text-2xl font-bold text-white tracking-tight">
            {{ isNew ? 'Nova barbearia' : 'Editar barbearia' }}
          </h1>
          <p v-if="!isNew && form.name" class="text-sm text-gray-500 mt-1">{{ form.name }}</p>
        </div>
        <div class="flex items-center gap-3">
          <DataSourceToggle v-if="isDev" />
          <NuxtLink
            v-if="publicUrl"
            :to="publicUrl"
            target="_blank"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-white/20 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
            </svg>
            Ver página
          </NuxtLink>
        </div>
      </div>

      <!-- ── Loading ─────────────────────────────────────────────── -->
      <div v-if="fetching" class="flex items-center justify-center py-32">
        <div class="w-8 h-8 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
      </div>

      <!-- ── Form ────────────────────────────────────────────────── -->
      <form v-else class="flex flex-col gap-3" @submit.prevent="handleSubmit">

        <!-- ── Identificação ───────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Identificação</h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="field required col-span-2 sm:col-span-1">
              <label>Nome</label>
              <input v-model="form.name" type="text" placeholder="Barbearia do João" @input="onNameInput" />
            </div>
            <div class="field col-span-2 sm:col-span-1">
              <label>Slug</label>
              <div class="relative">
                <input
                  v-model="form.slug"
                  type="text"
                  placeholder="gerado automaticamente"
                  style="padding-right: 110px"
                  :style="{
                    borderColor: slugStatus === 'available' ? 'rgba(52,211,153,.4)' : slugStatus === 'taken' ? 'rgba(248,113,113,.4)' : '',
                  }"
                />
                <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none">
                  <span v-if="slugStatus === 'checking'" class="text-gray-500">verificando...</span>
                  <span v-else-if="slugStatus === 'available'" class="text-green-400">✓ disponível</span>
                  <span v-else-if="slugStatus === 'taken'" class="text-red-400">✕ em uso</span>
                </span>
              </div>
              <span class="hint">Editável. O backend adiciona um ID único ao salvar.</span>
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

        <!-- ── Status & Plano ──────────────────────────────────── -->
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
            <div class="field col-span-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="form.featured" type="checkbox" class="w-4 h-4 rounded accent-green-400" />
                <span>Destaque na listagem</span>
              </label>
            </div>
            <div class="field col-span-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="form.isClaimed" :true-value="1" :false-value="0" type="checkbox" class="w-4 h-4 rounded accent-green-400" />
                <span>Reivindicado pelo proprietário</span>
              </label>
            </div>
          </div>
        </section>

        <!-- ── Endereço ────────────────────────────────────────── -->
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
            <div class="field"><label>Bairro</label><input v-model="form.neighborhood" type="text" placeholder="Centro" @input="tryAutoFillSeo" /></div>
            <div class="field required">
              <label>Cidade</label>
              <input v-model="form.city" type="text" placeholder="São Paulo" @input="autoCitySlug" />
            </div>
            <div class="field"><label>City Slug</label><input v-model="form.citySlug" type="text" placeholder="sao-paulo" /></div>
            <div class="field required">
              <label>Estado (UF)</label>
              <input v-model="form.state" type="text" maxlength="2" placeholder="SP" class="uppercase" @input="tryAutoFillSeo" />
            </div>
            <div class="field"><label>CEP</label><input v-model="form.zipCode" type="text" placeholder="00000-000" /></div>
          </div>
        </section>

        <!-- ── Geolocalização ──────────────────────────────────── -->
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

        <!-- ── Contato ─────────────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Contato</h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="field"><label>Telefone</label><input v-model="form.phone" type="tel" placeholder="(11) 99999-0000" /></div>
            <div class="field"><label>WhatsApp</label><input v-model="form.whatsapp" type="tel" placeholder="(11) 99999-0000" /></div>
            <div class="field"><label>E-mail</label><input v-model="form.email" type="email" placeholder="contato@barbearia.com" /></div>
            <div class="field"><label>Website</label><input v-model="form.website" type="url" placeholder="https://barbearia.com" /></div>
          </div>
        </section>

        <!-- ── Google ──────────────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Dados do Google</h2>
          <div class="grid grid-cols-3 gap-3">
            <div class="field"><label>Nota Google</label><input v-model.number="form.googleRating" type="number" step="0.1" min="0" max="5" placeholder="4.5" @input="tryAutoFillSeo" /></div>
            <div class="field"><label>Qtd. avaliações</label><input v-model.number="form.googleReviewCount" type="number" min="0" placeholder="120" @input="tryAutoFillSeo" /></div>
            <div class="field"><label>Nota nativa</label><input v-model.number="form.nativeRating" type="number" step="0.01" min="0" max="5" placeholder="4.75" /></div>
          </div>
        </section>

        <!-- ── SEO & Conteúdo ──────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">
            SEO & Conteúdo
            <button
              v-if="canAutoFillSeo"
              type="button"
              class="ml-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400/20 transition-colors normal-case tracking-normal"
              @click="applyAutoSeo"
            >
              ✨ Gerar automaticamente
            </button>
            <span v-else class="ml-3 text-[10px] font-normal text-gray-600 normal-case tracking-normal">
              (preencha nome + bairro + cidade para gerar)
            </span>
          </h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="field">
              <label>Meta title</label>
              <input v-model="form.metaTitle" type="text" maxlength="70" placeholder="Barbearia do João — SP" />
              <span v-if="form.metaTitle" class="hint" :class="form.metaTitle.length > 60 ? 'text-amber-500' : 'text-gray-700'">
                {{ form.metaTitle.length }}/70 chars
              </span>
            </div>
            <div class="field">
              <label>Meta description</label>
              <input v-model="form.metaDescription" type="text" maxlength="160" placeholder="Corte e barba no centro de SP..." />
              <span v-if="form.metaDescription" class="hint" :class="form.metaDescription.length > 150 ? 'text-amber-500' : 'text-gray-700'">
                {{ form.metaDescription.length }}/160 chars
              </span>
            </div>
            <div class="field"><label>Logo URL</label><input v-model="form.logoUrl" type="url" placeholder="https://..." /></div>
            <div class="field"><label>Cover URL <span class="text-gray-600 font-normal normal-case">(legado)</span></label><input v-model="form.coverImageUrl" type="url" placeholder="https://..." /></div>
          </div>
          <div class="field mt-3">
            <label>Descrição do estabelecimento</label>
            <textarea v-model="form.description" rows="5" placeholder="Barbearia tradicional fundada em..." />
            <span v-if="form.description" class="hint text-gray-700">{{ form.description.length }} chars</span>
          </div>
        </section>

        <!-- ── Horários ────────────────────────────────────────── -->
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

        <!-- ── Fotos ───────────────────────────────────────────── -->
        <section class="card">
          <h2 class="section-title">Fotos</h2>
          <p class="text-[11px] text-gray-600 mb-4">
            As fotos são salvas na tabela <code class="font-mono text-gray-500">barbershop_photos</code>. A marcada como <strong class="text-gray-400">capa</strong> aparece no hero e na listagem.
          </p>
          <div v-if="form.photos.length" class="grid grid-cols-3 gap-2 mb-4">
            <div
              v-for="(photo, i) in form.photos"
              :key="i"
              class="relative group rounded-lg overflow-hidden bg-[#0d0d0d] border border-white/[.06]"
              style="aspect-ratio:4/3"
            >
              <img :src="photo.url" :alt="`Foto ${i + 1}`" class="w-full h-full object-cover" @error="photo.error = true" />
              <div v-if="photo.error" class="absolute inset-0 flex items-center justify-center">
                <span class="text-xs text-gray-600">URL inválida</span>
              </div>
              <div v-if="photo.isCover" class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-400 text-black">capa</div>
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button type="button" class="px-2 py-1 rounded text-[10px] font-bold bg-green-400 text-black" :disabled="photo.isCover" @click="setCover(i)">capa</button>
                <button type="button" class="px-2 py-1 rounded text-[10px] font-bold bg-red-400/80 text-white" @click="removePhoto(i)">✕</button>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="field flex-1">
              <input v-model="photoInput" type="url" placeholder="https://lh3.googleusercontent.com/..." @keydown.enter.prevent="addPhoto" />
            </div>
            <button type="button" class="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-white/20 hover:text-white transition-colors flex-shrink-0" @click="addPhoto">+ Add</button>
          </div>
          <p class="text-[11px] text-gray-700 mt-2">Cole a URL e pressione Enter ou clique em Add. A primeira foto vira a capa.</p>
        </section>

        <!-- ── Serviços ────────────────────────────────────────── -->
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

              <!-- ✅ Campo seoTag — dropdown com os canônicos do allServices -->
              <div class="field col-span-2">
                <label>
                  Tag canônica (SEO)
                  <span class="text-[11px] text-gray-600 font-normal normal-case">
                    — liga ao portal de busca por serviço
                  </span>
                </label>
                <select v-model="svc.seoTag">
                  <option value="">— nenhuma —</option>
                  <option value="corte-de-cabelo">✂️ Corte de Cabelo</option>
                  <option value="barba">🧔 Barba</option>
                  <option value="corte-e-barba">💈 Corte e Barba</option>
                  <option value="sobrancelha">👁️ Sobrancelha</option>
                  <option value="pigmentacao">🎨 Pigmentação</option>
                  <option value="relaxamento">😌 Relaxamento</option>
                </select>
                <span v-if="svc.seoTag" class="hint text-green-400/60">
                  → /barbearias/.../s/{{ svc.seoTag }}
                </span>
              </div>

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

        <!-- ── Resultado ───────────────────────────────────────── -->
        <div v-if="result" data-result class="px-4 py-3 rounded-xl text-sm border"
          :class="{
            'bg-green-400/10 border-green-400/20 text-green-300': result.ok,
            'bg-red-400/10   border-red-400/20   text-red-300':   result.error,
          }"
        >
          <span v-if="result.ok">✔ {{ isNew ? 'Criado' : 'Salvo' }} com sucesso{{ result.id ? ` — ID: ${result.id}` : '' }}</span>
          <span v-else-if="result.error">✕ Erro: {{ result.error }}</span>
        </div>

        <!-- ── Actions ─────────────────────────────────────────── -->
        <div class="flex gap-3 justify-between pt-1">
          <button
            v-if="!isNew"
            type="button"
            class="px-5 py-2.5 rounded-xl text-sm text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-colors"
            @click="confirmDelete"
          >
            Excluir barbearia
          </button>
          <div class="flex gap-3 ml-auto">
            <NuxtLink
              to="/scraper"
              class="px-5 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
            >
              Cancelar
            </NuxtLink>
            <button
              type="submit"
              :disabled="saving || slugStatus === 'taken'"
              class="px-6 py-2.5 rounded-xl text-sm font-bold bg-green-400 text-black hover:bg-green-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {{ saving ? 'Salvando...' : isNew ? 'Criar barbearia' : 'Salvar alterações' }}
            </button>
          </div>
        </div>

      </form>
    </div>

    <!-- ── Modal delete ────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-4"
          @click.self="showDeleteModal = false"
        >
          <div class="bg-[#181818] border border-white/[.08] rounded-2xl p-6 max-w-sm w-full">
            <h3 class="text-white font-bold text-lg mb-2">Confirmar exclusão</h3>
            <p class="text-gray-400 text-sm mb-6">
              Excluir <strong class="text-white">{{ form.name }}</strong>? Essa ação não pode ser desfeita.
            </p>
            <div class="flex gap-3 justify-end">
              <button class="px-4 py-2 rounded-xl text-sm text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-colors" @click="showDeleteModal = false">Cancelar</button>
              <button class="px-4 py-2 rounded-xl text-sm font-bold bg-red-400 text-white hover:bg-red-300 transition-colors" :disabled="deleting" @click="doDelete">{{ deleting ? 'Excluindo...' : 'Excluir' }}</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'barber' })
 
// ✅ Bloqueia indexação do Google — página admin interna
useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })
 
import slugify from 'slugify'
import { geocodeExact, reverseGeocode } from '~/composables/useGeocoding'
import type { GeoSuggestion } from '~/composables/useGeocoding'
import { useEstabelecimentoSeo } from '~/composables/useEstabelecimentoSeo'

const route  = useRoute()
const router = useRouter()
const api    = useScrapingApi()
const isDev  = import.meta.dev

const id    = route.params.id as string
const isNew = id === 'new'

// ── Estado ────────────────────────────────────────────────────────────────
const fetching        = ref(!isNew)
const saving          = ref(false)
const deleting        = ref(false)
const result          = ref<{ ok?: boolean; id?: string; error?: string } | null>(null)
const showDeleteModal = ref(false)

const weekDays = [
  { key: 'mon', label: 'Seg' }, { key: 'tue', label: 'Ter' },
  { key: 'wed', label: 'Qua' }, { key: 'thu', label: 'Qui' },
  { key: 'fri', label: 'Sex' }, { key: 'sat', label: 'Sáb' },
  { key: 'sun', label: 'Dom' },
]

// ── seoTag canonical map (inline — espelho do backend) ────────────────────
// Mantido em sync com utils/serviceCanonicalMap.js no backend.
const CANONICAL_MAP: Record<string, string> = {
  'corte':                   'corte-de-cabelo',
  'corte-de-cabelo':         'corte-de-cabelo',
  'corte-masculino':         'corte-de-cabelo',
  'corte-social':            'corte-de-cabelo',
  'corte-degrade':           'corte-de-cabelo',
  'corte-navalhado':         'corte-de-cabelo',
  'corte-infantil':          'corte-de-cabelo',
  'corte-feminino':          'corte-de-cabelo',
  'corte-e-acabamento':      'corte-de-cabelo',
  'cabelo':                  'corte-de-cabelo',
  'barba':                   'barba',
  'barba-completa':          'barba',
  'barba-tradicional':       'barba',
  'barba-navalhada':         'barba',
  'aparar-barba':            'barba',
  'modelagem-de-barba':      'barba',
  'corte-e-barba':           'corte-e-barba',
  'corte-barba':             'corte-e-barba',
  'combo':                   'corte-e-barba',
  'cabelo-e-barba':          'corte-e-barba',
  'sobrancelha':             'sobrancelha',
  'design-de-sobrancelha':   'sobrancelha',
  'sobrancelha-masculina':   'sobrancelha',
  'pigmentacao':             'pigmentacao',
  'pigmentacao-de-barba':    'pigmentacao',
  'coloracao':               'pigmentacao',
  'tonalizacao':             'pigmentacao',
  'relaxamento':             'relaxamento',
  'relaxamento-capilar':     'relaxamento',
  'progressiva':             'relaxamento',
  'hidratacao':              'relaxamento',
}

function resolveCanonicalTag(nameOrSlug: string): string {
  if (!nameOrSlug) return ''
  const normalized = nameOrSlug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return CANONICAL_MAP[normalized] ?? ''
}

// ── Geo helpers ───────────────────────────────────────────────────────────
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
  if (s.state)        form.state        = s.state
  if (s.zipCode)      form.zipCode      = s.zipCode
  if (s.country)      form.country      = s.country
  form.latitude  = s.lat
  form.longitude = s.lon
  tryAutoFillSeo()
}

function onAddressSelect(sug: GeoSuggestion) { applyGeoSuggestion(sug) }

async function geocodeFromAddress() {
  const q = [form.street, form.number, form.neighborhood, form.city, form.state, 'Brasil'].filter(Boolean).join(', ')
  geocoding.value = true; geocodingMode.value = 'address'; geoError.value = null
  try {
    // ✅ Passa CEP e número pra ativar cascata ViaCEP + Nominatim quando disponível
    const res = await geocodeExact(q, { cep: form.zipCode || undefined, number: form.number || undefined })
    if (res) {
      form.latitude  = res.lat || form.latitude
      form.longitude = res.lon || form.longitude
      // Se veio do ViaCEP, aproveita pra preencher campos que estiverem vazios
      if (!form.street       && res.street)       form.street       = res.street
      if (!form.neighborhood && res.neighborhood) form.neighborhood = res.neighborhood
      if (!form.city         && res.city)         form.city         = res.city
      if (!form.state        && res.state)        form.state        = res.state
      if (!form.zipCode      && res.zipCode)      form.zipCode      = res.zipCode
    } else {
      geoError.value = 'Endereço não encontrado.'
    }
  } finally { geocoding.value = false; geocodingMode.value = null }
}

async function reverseFromCoords() {
  if (!form.latitude || !form.longitude) return
  geocoding.value = true; geocodingMode.value = 'reverse'; geoError.value = null
  try {
    const res = await reverseGeocode(form.latitude, form.longitude)
    if (res) applyGeoSuggestion(res)
    else geoError.value = 'Coordenadas não encontradas.'
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

// ── Form ──────────────────────────────────────────────────────────────────
function makeDefaultHours() {
  return {
    mon: { open: '09:00', close: '20:00' }, tue: { open: '09:00', close: '20:00' },
    wed: { open: '09:00', close: '20:00' }, thu: { open: '09:00', close: '20:00' },
    fri: { open: '09:00', close: '20:00' }, sat: { open: '09:00', close: '18:00' },
    sun: null,
  }
}

const form = reactive({
  name: '', slug: '', subdomain: '', googlePlaceId: '',
  status: 'active' as string, plan: 'free' as string,
  featured: 0, isClaimed: 0,
  phone: '', whatsapp: '', email: '', website: '',
  street: '', number: '', complement: '', neighborhood: '',
  city: '', citySlug: '', state: '', zipCode: '', country: 'BR',
  latitude: null as number | null, longitude: null as number | null,
  description: '', metaTitle: '', metaDescription: '', coverImageUrl: '', logoUrl: '',
  googleRating: null as number | null, googleReviewCount: 0, nativeRating: null as number | null,
  openingHours: makeDefaultHours() as Record<string, { open: string; close: string } | null>,
  services: [] as any[],
  photos: [] as Array<{ id?: string; url: string; isCover: boolean; error: boolean }>,
})

// ── Slug check em tempo real ──────────────────────────────────────────────
const slugStatus = ref<'idle' | 'checking' | 'available' | 'taken'>('idle')
let slugCheckTimeout: ReturnType<typeof setTimeout> | null = null

watch(() => form.slug, (val) => {
  if (!val || val.length < 3) { slugStatus.value = 'idle'; return }
  slugStatus.value = 'checking'
  if (slugCheckTimeout) clearTimeout(slugCheckTimeout)
  slugCheckTimeout = setTimeout(() => checkSlug(val), 500)
})

async function checkSlug(slug: string) {
  try {
    const res = await api.listBarbershops({ slug, limit: 1 })
    const found = (res.data ?? []).find((b: any) => b.slug === slug && b.id !== id)
    slugStatus.value = found ? 'taken' : 'available'
  } catch {
    slugStatus.value = 'idle'
  }
}

// ── SEO auto-fill via useEstabelecimentoSeo ───────────────────────────────
const canAutoFillSeo = computed(() =>
  !!(form.name?.trim() && form.neighborhood?.trim() && form.city?.trim() && form.state?.trim())
)

function buildSeoInput() {
  return {
    name:              form.name,
    neighborhood:      form.neighborhood,
    city:              form.city,
    state:             form.state?.toUpperCase(),
    googleRating:      form.googleRating,
    googleReviewCount: form.googleReviewCount,
    services:          form.services,
  }
}

function tryAutoFillSeo() {
  if (!canAutoFillSeo.value) return
  const seo = useEstabelecimentoSeo(buildSeoInput())
  if (!form.metaTitle)       form.metaTitle       = seo.metaTitle
  if (!form.metaDescription) form.metaDescription = seo.metaDescription
  if (!form.description)     form.description     = seo.description
}

function applyAutoSeo() {
  if (!canAutoFillSeo.value) return
  const seo = useEstabelecimentoSeo(buildSeoInput())
  form.metaTitle       = seo.metaTitle
  form.metaDescription = seo.metaDescription
  form.description     = seo.description
}

// ── URL pública ───────────────────────────────────────────────────────────
const publicUrl = computed(() => {
  const uf   = form.state?.toLowerCase()
  const city = form.citySlug
  const hood = slugify(form.neighborhood || '', { lower: true, strict: true })
  const slug = form.slug
  if (uf && city && hood && slug) return `/barbearias/${uf}/${city}/${hood}/${slug}`
  return null
})

// ── Fetch para edição ─────────────────────────────────────────────────────
onMounted(async () => {
  if (isNew) return
  try {
    const raw = await api.getBarbershopById(id)

    Object.assign(form, {
      name:              raw.name             ?? '',
      slug:              raw.slug             ?? '',
      subdomain:         raw.subdomain        ?? '',
      googlePlaceId:     raw.googlePlaceId    ?? '',
      status:            raw.status           ?? 'active',
      plan:              raw.plan             ?? 'free',
      featured:          raw.featured         ? 1 : 0,
      isClaimed:         raw.isClaimed        ? 1 : 0,
      phone:             raw.phone            ?? '',
      whatsapp:          raw.whatsapp         ?? '',
      email:             raw.email            ?? '',
      website:           raw.website          ?? '',
      street:            raw.street           ?? '',
      number:            raw.number           ?? '',
      complement:        raw.complement       ?? '',
      neighborhood:      raw.neighborhood     ?? '',
      city:              raw.city             ?? '',
      citySlug:          raw.citySlug         ?? '',
      state:             raw.state            ?? '',
      zipCode:           raw.zipCode          ?? '',
      country:           raw.country          ?? 'BR',
      latitude:          raw.latitude         ?? null,
      longitude:         raw.longitude        ?? null,
      description:       raw.description      ?? '',
      metaTitle:         raw.metaTitle        ?? '',
      metaDescription:   raw.metaDescription  ?? '',
      coverImageUrl:     raw.coverImageUrl    ?? '',
      logoUrl:           raw.logoUrl          ?? '',
      googleRating:      raw.googleRating     ?? null,
      googleReviewCount: raw.googleReviewCount ?? 0,
      nativeRating:      raw.nativeRating     ?? null,
      openingHours:      raw.openingHours     ?? makeDefaultHours(),
    })

    form.services = (raw.services ?? []).map((s: any) => ({
      id:          s.id,
      name:        s.name        ?? '',
      slug:        s.slug        ?? '',
      category:    s.category    ?? '',
      description: s.description ?? '',
      price:       Number(s.price) || 0,
      priceMin:    s.priceMin    ?? null,
      priceMax:    s.priceMax    ?? null,
      durationMin: s.durationMin ?? 30,
      isActive:    Boolean(s.isActive),
      isFeatured:  Boolean(s.isFeatured),
      // ✅ Carrega seoTag do banco, com fallback automático se vier vazio
      seoTag:      s.seoTag || resolveCanonicalTag(s.slug) || resolveCanonicalTag(s.name) || '',
      sortOrder:   s.sortOrder   ?? 0,
    }))

    form.photos = (raw.photos ?? [])
      .sort((a: any, b: any) => {
        if (Number(b.isCover) !== Number(a.isCover)) return Number(b.isCover) - Number(a.isCover)
        return (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      })
      .map((p: any) => ({
        id:      p.id,
        url:     p.url,
        isCover: Boolean(p.isCover),
        error:   false,
      }))

  } catch (e: any) {
    console.error('Erro ao carregar barbearia:', e)
  } finally {
    fetching.value = false
  }
})

// ── Helpers de form ───────────────────────────────────────────────────────
function makeSlug(str: string) { return slugify(str, { lower: true, strict: true }) }

function autoSlug() {
  if (!isNew) return
  form.slug = makeSlug(form.name)
}

function onNameInput() {
  autoSlug()
  tryAutoFillSeo()
}

function autoCitySlug() {
  form.citySlug = makeSlug(form.city)
  tryAutoFillSeo()
}

function toggleDay(key: string) {
  form.openingHours[key] = form.openingHours[key] === null
    ? { open: '09:00', close: '20:00' }
    : null
}

// ✅ addService inclui seoTag vazio por padrão
function addService() {
  form.services.push({
    name: '', slug: '', category: '', description: '',
    price: 0, priceMin: null, priceMax: null,
    durationMin: 30, isActive: true, isFeatured: false,
    seoTag: '',
    sortOrder: form.services.length,
  })
}

function removeService(i: number) { form.services.splice(i, 1) }

// ✅ autoSvcSlug resolve o seoTag automaticamente pelo nome digitado
function autoSvcSlug(i: number) {
  form.services[i].slug = makeSlug(form.services[i].name)
  // Só auto-preenche seoTag se ainda estiver vazio — não sobrescreve escolha manual
  if (!form.services[i].seoTag) {
    form.services[i].seoTag = resolveCanonicalTag(form.services[i].slug)
      || resolveCanonicalTag(form.services[i].name)
  }
}

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
  if (wasCover && form.photos.length > 0) form.photos[0].isCover = true
}
function setCover(i: number) { form.photos.forEach((p, idx) => { p.isCover = idx === i }) }

// ── Submit ────────────────────────────────────────────────────────────────
async function handleSubmit() {
  if (!form.name || !form.city || !form.state) {
    alert('Preencha nome, cidade e estado.')
    return
  }

  if (slugStatus.value === 'taken') {
    alert('Esse slug já está em uso. Edite o campo Slug antes de salvar.')
    return
  }

  saving.value = true
  result.value = null

  const payload = {
    name:              form.name,
    slug:              form.slug             || undefined,
    subdomain:         form.subdomain        || undefined,
    googlePlaceId:     form.googlePlaceId    || undefined,
    status:            form.status,
    plan:              form.plan,
    featured:          form.featured,
    isClaimed:         form.isClaimed,
    phone:             form.phone            || undefined,
    whatsapp:          form.whatsapp         || undefined,
    email:             form.email            || undefined,
    website:           form.website          || undefined,
    street:            form.street           || undefined,
    number:            form.number           || undefined,
    complement:        form.complement       || undefined,
    neighborhood:      form.neighborhood     || undefined,
    city:              form.city,
    citySlug:          form.citySlug         || makeSlug(form.city),
    state:             form.state.toUpperCase(),
    zipCode:           form.zipCode          || undefined,
    country:           form.country,
    latitude:          form.latitude         ?? undefined,
    longitude:         form.longitude        ?? undefined,
    description:       form.description      || undefined,
    metaTitle:         form.metaTitle        || undefined,
    metaDescription:   form.metaDescription  || undefined,
    coverImageUrl:     form.coverImageUrl    || undefined,
    logoUrl:           form.logoUrl          || undefined,
    googleRating:      form.googleRating     ?? undefined,
    googleReviewCount: form.googleReviewCount,
    nativeRating:      form.nativeRating     ?? undefined,
    openingHours:      form.openingHours,
    services: form.services.length > 0
      ? form.services.map(s => ({
          ...(s.id ? { id: s.id } : {}),
          name:        s.name,
          slug:        s.slug || makeSlug(s.name),
          category:    s.category    || undefined,
          description: s.description || undefined,
          price:       s.price,
          priceMin:    s.priceMin    ?? undefined,
          priceMax:    s.priceMax    ?? undefined,
          durationMin: s.durationMin,
          isActive:    s.isActive,
          isFeatured:  s.isFeatured,
          // ✅ Envia seoTag no payload — backend salva direto sem precisar resolver
          seoTag:      s.seoTag      || undefined,
          sortOrder:   s.sortOrder,
        }))
      : undefined,
    photos: form.photos.length > 0
      ? form.photos.map((p, i) => ({
          ...(p.id ? { id: p.id } : {}),
          url:       p.url,
          isCover:   p.isCover ? 1 : 0,
          source:    'manual',
          sortOrder: i,
        }))
      : undefined,
  }

  try {
    if (isNew) {
      const res = await api.createBarbershop(payload)
      result.value = { ok: true, id: res.id }
      await router.replace(`/scraper/${res.id}`)
    } else {
      await api.updateBarbershop(id, payload)
      result.value = { ok: true }
    }
  } catch (e: any) {
    result.value = { error: e?.data?.error ?? e?.message ?? 'Erro desconhecido' }
  } finally {
    saving.value = false
    await nextTick()
    document.querySelector('[data-result]')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// ── Delete ────────────────────────────────────────────────────────────────
function confirmDelete() { showDeleteModal.value = true }

async function doDelete() {
  deleting.value = true
  try {
    await api.deleteBarbershop(id)
    await router.push('/scraper')
  } catch (e: any) {
    alert(`Erro ao excluir: ${e?.data?.error ?? e.message}`)
  } finally {
    deleting.value = false
    showDeleteModal.value = false
  }
}
</script>

<style scoped>
.card { background:#111; border:0.5px solid rgba(255,255,255,.07); border-radius:14px; padding:1.25rem; }
.section-title { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#4b5563; margin-bottom:1rem; padding-bottom:.5rem; border-bottom:0.5px solid rgba(255,255,255,.05); display:flex; align-items:center; }
.field { display:flex; flex-direction:column; gap:4px; }
.field label { font-size:12px; font-weight:500; color:#6b7280; }
.field.required label::after { content:" *"; color:#f87171; }
.hint { font-size:11px; color:#374151; }
.field input,.field select,.field textarea { padding:8px 11px; font-size:13px; border:0.5px solid rgba(255,255,255,.1); border-radius:8px; background:#0d0d0d; color:#e5e7eb; outline:none; font-family:inherit; transition:border-color .15s; }
.field input:focus,.field select:focus,.field textarea:focus { border-color:rgba(255,255,255,.25); }
.field input::placeholder,.field textarea::placeholder { color:#374151; }
.field select option { background:#111; }
.field textarea { resize:vertical; min-height:64px; }
.time-input { padding:5px 8px; font-size:12px; border:0.5px solid rgba(255,255,255,.1); border-radius:7px; background:#0d0d0d; color:#d1d5db; font-family:inherit; outline:none; width:96px; }
.time-input:focus { border-color:rgba(255,255,255,.25); }
.btn-geo { padding:6px 12px; font-size:12px; border-radius:8px; border:0.5px solid rgba(255,255,255,.1); background:none; color:#6b7280; cursor:pointer; font-family:inherit; transition:all .15s; }
.btn-geo:hover:not(:disabled) { border-color:rgba(255,255,255,.2); color:#d1d5db; }
.btn-geo:disabled { opacity:.35; cursor:not-allowed; }
.svc-card { background:#0d0d0d; border:0.5px solid rgba(255,255,255,.06); border-radius:10px; padding:1rem; margin-bottom:.75rem; }
.fade-enter-active,.fade-leave-active { transition:opacity .2s; }
.fade-enter-from,.fade-leave-to { opacity:0; }
@media (max-width:600px) { .grid { grid-template-columns:1fr !important; } }
</style>