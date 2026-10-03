import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Para pruebas de Vitest: `servidor.listen()` en beforeAll y `servidor.close()` en afterAll.
export const servidor = setupServer(...handlers)
