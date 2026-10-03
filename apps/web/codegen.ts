import type { CodegenConfig } from '@graphql-codegen/cli'

// Genera los tipos TypeScript desde la copia versionada del contrato (../../contrato/schema.graphql).
// El archivo generado SÍ se versiona; el CI falla si `npm run codegen` deja diferencias.
const config: CodegenConfig = {
  schema: '../../contrato/schema.graphql',
  generates: {
    'src/graphql/tipos.ts': {
      plugins: ['typescript'],
      config: {
        enumsAsTypes: true,
        skipTypename: true,
        scalars: { DateTime: 'string' },
      },
    },
  },
}

export default config
