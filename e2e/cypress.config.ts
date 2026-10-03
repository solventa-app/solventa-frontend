import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // Local: la web de `npm run dev:mock`. Contra staging: CYPRESS_BASE_URL=https://<staging> npm run correr
    baseUrl: process.env.CYPRESS_BASE_URL ?? 'http://localhost:5173',
    supportFile: false,
    video: false,
  },
})
