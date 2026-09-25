// vitest.config.ts
//
// Testes de unidade da landing em TypeScript (os .mjs antigos continuam com
// `node --test`). Mesmo formato do white-label: não sobe o Nuxt — só o
// compilador de SFC e os aliases `~`/`@`.
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': rootDir,
      '@': rootDir,
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
