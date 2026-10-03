# Solventa — Frontend (contexto de trabajo)

Frontend de Solventa (aseguradora digital sobre Open Finance y Open Data), Proyecto Final 2 de MISW4501. Este repo construye la **web** (Vue 3) y el **móvil** (Flutter). El backend, el contrato y la infraestructura viven en `../solventa-backend`; la evidencia de los experimentos en `../solventa-arquitectura` (congelado). Estrategia de repos: ADR-06 en `../solventa-backend/docs/adr/`.

Mapa: [`README.md`](README.md). Plan: [`docs/plan-frontend.md`](docs/plan-frontend.md). Convenciones: [`docs/convenciones.md`](docs/convenciones.md).

## Estado (2026-10-03)

- Repo **recién estructurado**: la web arranca, tiene el catálogo de las 12 pantallas del Sprint 1 como placeholders con su ruta, mocks del BFF (MSW), tipos generados desde el contrato, CI y agentes. Typecheck, 18 pruebas de Vitest y `vite build` pasan. **Ninguna pantalla está construida todavía.**
- `apps/mobile` no tiene código: arranca en el Sprint 2.
- Cypress (`e2e/`) tiene una prueba de humo **sin ejecutar** (no se instaló el binario).
- Sprint 1 (tentativo): 12–25 de octubre de 2026. La web depende del BFF, que aún no existe → se trabaja con mocks.
- GitHub: organización `solventa-app` (`origin` = https://github.com/solventa-app/solventa-frontend.git, repo vacío; aún sin commit ni push).
- Pendiente de decidir: **D-F1** librería de componentes de UI (hoy solo CSS base) y si el equipo es de 3 o 4 personas (el plan supone 4).
- Las decisiones D-01…D-06 del Sprint 1 son del backend y están sin cerrar (ver `../solventa-backend/docs/sprint-1.md`).

## Stack

- **Web:** Vue 3 (`<script setup lang="ts">`), TypeScript estricto, Vite, Vue Router. Pruebas: Vitest + `@vue/test-utils` (jsdom). Mocks: MSW. Tipos del contrato: `graphql-codegen`. E2E: Cypress.
- **Móvil:** Flutter (prioridad Android), `local_auth`, `flutter_secure_storage`, `flutter_test`, `integration_test` y Firebase Test Lab.
- **CI:** GitHub Actions con filtro por ruta (la web no dispara el móvil, ni al revés), SonarQube Community y Dependabot.

## Reglas (no las reinterpretes)

1. **El contrato manda.** `contrato/schema.graphql` es una copia del backend: no se edita a mano. Si falta un campo, se pide el cambio al backend (aditivo) y se sincroniza. Los tipos salen de `src/graphql/tipos.ts` (generado). Un cambio de contrato = dos PRs enlazados.
2. **Trabajar con mocks hasta que el BFF esté desplegado.** Los mocks (`apps/web/src/mocks/handlers.ts`) siguen el esquema y sirven igual para Vitest y para `dev:mock`. Sus convenciones de demo (documento terminado en `999` → oferta preliminar, en `000` → error) **no son del backend real**.
3. **Fiel al prototipo.** Las 52 pantallas están en Figma (plano v21). Una pantalla se construye contra su frame de Figma y sus criterios de aceptación (`docs/plan-frontend.md`); no se inventa diseño.
4. **Una pantalla = un componente en `src/views/`**, registrado en `src/router/pantallas.ts` (campo `componente`) y con `data-pantalla="<id>"` en su raíz.
5. **Nunca mostrar un error técnico ni un 5xx.** Hay estados de carga, vacío, error y degradado (oferta preliminar, cobro pendiente) y todos se diseñan.
6. **Consentimiento explícito.** El checkbox de Habeas Data no viene marcado y el botón de enviar está deshabilitado hasta marcarlo (CA-W01-01). Nunca un valor por defecto.
7. **Sin datos personales** en `localStorage`, consola, URL ni logs. Dinero: texto decimal + moneda del contrato, formateado con `Intl.NumberFormat`.
8. **No sobre-construir.** Cada tarea se traza a una pantalla o criterio de `docs/plan-frontend.md`. Sin librerías ni capas que una pantalla del sprint no pida (Pinia, un cliente GraphQL pesado y una librería de UI se agregan cuando haya una razón).

## Agentes de este repo (`.claude/agents/`)

- **`web-builder`** — construir pantallas y lógica de la web contra Figma, contrato y mocks.
- **`mobile-builder`** — la app Flutter (desde el Sprint 2).
- **`contract-consumer`** — sincronizar el contrato, regenerar tipos y actualizar mocks; detectar rupturas.
- **`frontend-quality`** — Vitest, Cypress/`integration_test`, accesibilidad y evidencia de la definición de hecho.

## Reglas de trabajo

- **Verifica antes de reportar éxito:** `npm run typecheck`, `npm test` y `npm run build` en `apps/web`, con la salida a la vista. Una pantalla no está lista hasta verla en el navegador (`dev:mock`).
- No hagas commit ni push sin que el usuario lo pida.
- Español en documentación, comentarios y commits (Conventional Commits con la clave de Jira).
