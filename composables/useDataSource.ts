// composables/useDataSource.ts
//
// Controla se o portal usa o mock local ou a API real.
// O estado persiste em localStorage e pode ser togglado
// em qualquer página (inclusive com hotkey Ctrl+Shift+D em dev).
//
// Uso:
//   const { isApi, toggle, label } = useDataSource()

const DATA_SOURCE_KEY = 'portal:dataSource'

// Estado global compartilhado entre todos que usarem o composable
const _source = ref<'mock' | 'api'>(
  // Valor padrão: 'mock' em dev, 'api' em produção
  import.meta.env.DEV ? 'mock' : 'api',
)

export function useDataSource() {
  // Hidrata do localStorage na primeira chamada (client-side only)
  onMounted(() => {
    if (import.meta.client) {
      const saved = localStorage.getItem(DATA_SOURCE_KEY) as 'mock' | 'api' | null
      if (saved) _source.value = saved
    }
  })

  function set(source: 'mock' | 'api') {
    _source.value = source
    if (import.meta.client) {
      localStorage.setItem(DATA_SOURCE_KEY, source)
    }
  }

  function toggle() {
    set(_source.value === 'mock' ? 'api' : 'mock')
  }

  // Hotkey Ctrl+Shift+D — só em dev
  if (import.meta.dev) {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') toggle()
    }
    onMounted(() => window.addEventListener('keydown', handler))
    onUnmounted(() => window.removeEventListener('keydown', handler))
  }

  const isApi  = computed(() => _source.value === 'api')
  const isMock = computed(() => _source.value === 'mock')
  const label  = computed(() => _source.value === 'api' ? 'API real' : 'Mock local')

  return { source: _source, isApi, isMock, label, set, toggle }
}