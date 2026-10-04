# Convenciones del repo

Mismas reglas de flujo que `solventa-backend` (ver su `docs/convenciones.md` y ADR-06).

## Ramas y flujo

- **Trunk-based.** `main` está protegida por un ruleset (`.github/rulesets/main.json`): PR obligatorio, 1 aprobación (se descarta si hay push nuevo), hilos de revisión resueltos, checks `web`, `mobile`, `Título del PR` y `Nombre de rama` en verde, solo squash, historial lineal y sin force-push ni borrado. No hay excepciones configuradas.
- **Ramas cortas desde `main`, con el patrón `tipo/KAN-N-descripcion`** y tipo `feat`, `fix` o `chore`: `feat/KAN-24-formulario-captura`, `fix/KAN-31-validacion-correo`. Lo valida el check `Nombre de rama` (`pr-rama.yml`), obligatorio en `main`: bloquea el merge, no la creación de la rama (GitHub no aplica reglas de nombre de rama en este plan). Las de Dependabot (`dependabot/**`) están exentas. GitHub las borra al hacer merge.
- Tag por sprint al cerrarlo: `sprint-1`, `sprint-2`, `sprint-3` (el mismo nombre que en `solventa-backend`). Los `sprint-*` están protegidos: no se pueden mover ni borrar (`.github/rulesets/tags.json`).
- Cada merge a `main` deja la web publicable en staging.
- **Dependabot:** los PRs patch y minor se aprueban y se integran solos cuando los checks pasan (`dependabot-auto-merge.yml`); los major los revisa una persona.
- **El repo es público**, que es lo que hace gratuitos los rulesets: no se versionan secretos ni datos personales. *Secret scanning* y *push protection* están activos.
- `CI web` y `CI mobile` corren en **todo** PR (sin filtro de rutas) para que `web` y `mobile` se puedan exigir como checks; en `push` a `main` siguen filtrados por ruta.
- Los rulesets son código. Si hay que recrearlos: `gh api -X POST repos/solventa-app/solventa-frontend/rulesets --input .github/rulesets/main.json` (igual con `tags.json`).

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
