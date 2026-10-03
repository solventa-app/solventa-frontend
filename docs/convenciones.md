# Convenciones del repo

Mismas reglas de flujo que `solventa-backend` (ver su `docs/convenciones.md` y ADR-06).

## Ramas y flujo

- **Trunk-based.** `main` protegida (PR obligatorio, 1 revisión, CI en verde). Ramas cortas desde `main`: `KAN-24-formulario-captura`.
- Tag por sprint al cerrarlo: `sprint-1`, `sprint-2`, `sprint-3` (el mismo nombre que en `solventa-backend`).
- Cada merge a `main` deja la web publicable en staging.

## Commits y PR

- **Conventional Commits** con alcance y clave de Jira: `feat(web): KAN-24 formulario de captura con consentimiento`.
  Alcances: `web`, `mobile`, `e2e`, `contrato`, `docs`, `ci`.
- Un PR cuenta una sola historia. Si cambia el contrato, enlaza el PR gemelo de `solventa-backend`.

## Definición de hecho (propuesta del equipo)

- Código integrado a `main` por PR con revisión de al menos otro integrante.
- Pruebas unitarias del código nuevo en verde en el pipeline (Vitest en web, `flutter_test` en móvil).
- Quality gate de SonarQube aprobado y Dependabot sin vulnerabilidades críticas abiertas.
- Flujo E2E de la historia en verde en staging (Cypress en web, `integration_test` en móvil).
- Sin datos personales en logs ni en la consola.
- Pantalla fiel al prototipo de Figma y accesible por teclado; estados de carga, vacío y error cubiertos.
- Documentación y tablero de Jira actualizados; historia demostrada en la revisión del sprint.

## Código web (`apps/web`)

- Vue 3 con `<script setup lang="ts">`, TypeScript estricto (`vue-tsc` en el CI), Vite, Vue Router. Pinia se agrega cuando haya estado compartido real (hoy no hace falta).
- **Una pantalla = un componente en `src/views/`** y se registra quitando el `PantallaPendiente` de su fila en `src/router/pantallas.ts` (campo `componente`). Cada pantalla lleva `data-pantalla="<id>"` en su raíz: lo usan Vitest y Cypress.
- **Nunca se escriben a mano los tipos del contrato:** vienen de `src/graphql/tipos.ts` (generado, versionado). Ver `contrato/README.md`.
- Las llamadas al BFF pasan por `src/graphql/cliente.ts`; los componentes no usan `fetch` directo.
- **Errores:** el BFF no devuelve 5xx crudos por falla de proveedor (oferta preliminar o `ErrorOferta`). La interfaz tampoco muestra errores técnicos al usuario.
- **Datos personales:** no se guardan en `localStorage`, no van a la consola ni a la URL. El consentimiento es un acto explícito del usuario, nunca un valor por defecto.
- Dinero: el contrato lo entrega como texto decimal + moneda; se formatea con `Intl.NumberFormat`, nunca con `parseFloat` para operar.
- Pruebas en `tests/*.test.ts`; los mocks de MSW son la misma fuente para Vitest y para `dev:mock`.

## Documentos

- Idioma: español. Decisiones de arquitectura: ADR en `solventa-backend/docs/adr/` (ADR-06 es la estrategia de repositorios).
