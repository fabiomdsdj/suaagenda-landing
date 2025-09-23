// composables/useLocal.ts
import { ref } from 'vue'

const local = ref('meu local')

export function useLocal() {
  return { local }
}
