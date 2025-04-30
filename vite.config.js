import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import wasm from "vite-plugin-wasm"

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [
    vue(),
    vueDevTools(),
    wasm(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  worker: {
    format: 'es',
    plugins: [
      wasm(),
    ],
  },
})
