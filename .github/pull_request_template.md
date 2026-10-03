## Qué cambia

<!-- 1–3 líneas. Título del PR: `feat(web): KAN-24 formulario de captura con consentimiento` -->

## Historia / pantallas

- Jira: KAN-
- Pantallas (id del plano v21): W01-01, …
- Criterios de aceptación cubiertos: CA-

## Lista de verificación (definición de hecho)

- [ ] `npm run typecheck`, `npm test` y `npm run build` en verde (`apps/web`)
- [ ] Pantalla vista en el navegador (`npm run web:dev:mock`) y fiel al frame de Figma
- [ ] Estados de carga, vacío, error y degradado cubiertos; sin errores técnicos para el usuario
- [ ] Sin datos personales en `localStorage`, consola ni URL; el consentimiento no viene marcado por defecto
- [ ] Si cambia el contrato: `npm run contrato:sincronizar` + `npm run codegen`, mocks al día y **enlace al PR gemelo del backend**
- [ ] Si hay flujo E2E nuevo: prueba de Cypress agregada

## Cómo se probó

<!-- Comandos y resultados reales, no "debería funcionar". Capturas si hay cambio visual. -->

## Contrato del backend

<!-- Versión/commit del esquema del backend con la que se probó, o "sin cambios". -->
