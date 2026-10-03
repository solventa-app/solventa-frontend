# e2e/

Pruebas de extremo a extremo con **Cypress** (web). Tiene su propio `package.json` para no obligar a descargar el binario de Cypress (~500 MB) a quien solo trabaja en la web.

```bash
cd e2e && npm install
npm run abrir          # modo interactivo
npm run correr         # sin interfaz (CI)
```

- **Local:** levanta la web con `npm run web:dev:mock` y corre contra `http://localhost:5173`.
- **Staging:** `CYPRESS_BASE_URL=https://<staging> npm run correr`. Staging se despliega desde el `main` de `solventa-backend`; el E2E de W01 → W03 depende de que esté estable.
- Los flujos se escriben por **historia** (`w01-oferta.cy.ts`, …) y cada pantalla se localiza con `[data-pantalla="<id>"]`.
- El móvil (Flutter) no usa Cypress: sus pruebas viven en `apps/mobile` (`flutter_test`, `integration_test`, Firebase Test Lab).

> Estado: solo hay una prueba de humo. **No se ha ejecutado todavía** (no se instaló el binario de Cypress al estructurar el repo).
