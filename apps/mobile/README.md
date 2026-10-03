# apps/mobile — app móvil (Flutter)

**Estado: sin código.** La app móvil arranca en el **Sprint 2** (esqueleto de 3 h dentro de HU-M01; ver `docs/plan-frontend.md`). Esta carpeta existe para fijar el lugar y las reglas.

## Cuando arranque

1. Crear el proyecto aquí: `flutter create --org co.solventa --project-name solventa_mobile --platforms android .`
   (la prioridad es Android: biometría con `local_auth`, push con FCM/SNS).
2. Esqueleto del Sprint 2: navegación, tema, textos, y el home móvil `G-03`.
3. Consumir el BFF por **`/graphql/app`** (canal móvil), con el mismo contrato de `contrato/schema.graphql`.
4. Mock del BFF mientras no exista (equivalente a MSW en la web): servidor HTTP local o `http.MockClient`.

## Reglas

- Pruebas: `flutter_test` (widgets y lógica), `integration_test` y **Firebase Test Lab** (dispositivos reales). Cámara y biometría no se prueban bien en emulador: usar un dispositivo físico Android y un modo de demostración para la prueba de vida.
- Almacenamiento seguro del token: `flutter_secure_storage`. Biometría: `local_auth`.
- Sin datos personales en logs.
- CI: `.github/workflows/ci-mobile.yml` ya existe y solo corre cuando hay `pubspec.yaml`.
- Historias móviles: HU-M02 (Sprint 2), HU-M01 y HU-M04 (Sprint 3); HU-M06 condicional.
