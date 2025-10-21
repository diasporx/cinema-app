// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import tailwindcss from "@tailwindcss/vite";

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  srcDir: 'app/',
  alias: {
    '~': resolve(rootDir, 'app'),
    '@': resolve(rootDir, 'app'),

    '@core': resolve(rootDir, 'core'),
    '@infra': resolve(rootDir, 'infra'),
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3022',
        changeOrigin: true,
        prependPath: true
      }
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3022",
    }
  }
})
