# Dependabot automerge seguro

## Estado y alcance

- `main` es la rama por defecto y la única rama de despliegue observada; no existe `develop` remoto.
- Vercel publica producción desde `main` y crea comprobaciones de preview para PR. Esta automatización no cambia esa estrategia.
- El repositorio usa pnpm 10.25.0 (`packageManager` en `package.json`), `pnpm-lock.yaml` y Node 22 en CI.
- El workflow `Security checks` valida `pnpm install --frozen-lockfile --ignore-scripts`, `pnpm audit --prod`, sincronización Astro, `tsc --noEmit`, tests, lint y build.
- Los tests de PR usan `permissions: contents: read`. El único workflow con escritura es `Dependabot automerge`: no obtiene ni ejecuta el código de la PR y sólo propone auto-merge nativo.
- No se encontraron secretos de Actions ni de Dependabot configurados; los checks existentes no requieren secretos. Vercel está integrado como proveedor de despliegues/checks y no necesita un token personal en este workflow.

## Política implementada

La evaluación es de cierre seguro: metadatos ausentes, desconocidos o incompletos significan revisión manual.

| Cambio | Automerge |
| --- | --- |
| Patch npm, directo y no sensible | Sí, con protecciones y todos los checks obligatorios satisfechos |
| Minor npm de dependencia directa de desarrollo, no sensible | Sí, con las mismas condiciones |
| Minor de producción o dependencia indirecta | No |
| Major | No, también en PR de seguridad |
| Astro, paquetes `@astrojs/*`, TypeScript, Nodemailer y Vercel Analytics | No, siempre revisión manual |
| GitHub Actions | No |
| PR agrupada | No inicialmente; se bloquea porque el resumen de Dependabot no permite verificar aquí cada elemento de forma independiente |
| Archivos distintos de `package.json` y `pnpm-lock.yaml` | No |
| Autor distinto de `dependabot[bot]` | No |

Dependabot mantiene un máximo de cinco PR npm y tres PR de GitHub Actions abiertas. No se habilitan grupos en su configuración: las PR individuales permiten clasificar cada versión sin convertir un cambio mayor oculto en un patch agregado.

Los cambios de seguridad no tienen una excepción de semver: un major sigue siendo manual. La acción de metadata no consulta alertas de seguridad ni necesita un token adicional; el semver mayor agregado se rechaza. La clasificación de dependencia indirecta también se rechaza, al no poder distinguir con seguridad si afecta a producción o desarrollo.

## Condiciones manuales necesarias en GitHub antes de activar

La auditoría del 21 de noviembre de 2026 encontró `allow_auto_merge=false`, ninguna protección de `main` y ningún ruleset. Por tanto, la automatización queda apagada deliberadamente hasta completar este paso:

1. En Rulesets o protección clásica de `main`, exigir PR para integrar cambios y bloquear push directo/bypass, salvo administradores sólo si la política existente lo permite. No reducir ninguna protección existente.
2. Exigir que la rama esté actualizada antes de fusionar y habilitar auto-merge del repositorio. Si la UI ofrece opción de merge queue, es preferible activarla para serializar la integración; no es requisito para que el workflow cree la intención de auto-merge.
3. Exigir los checks de la PR con nombres exactos verificados en GitHub: `validate`, y los checks de Vercel aplicables a la Preview. Mantener la validación de Vercel obligatoria sólo después de comprobar que se ejecuta una Preview real para PR de dependencias. En el estado observado, `Vercel` para una PR de Astro apareció como pass con “Canceled by Ignored Build Step”; eso no demuestra una compilación ni un despliegue y no debe contarse como validación real.
4. Confirmar que la Preview de Vercel completa el build de producción y no omite cambios de `package.json` o `pnpm-lock.yaml`. No aceptar checks pendientes, ausentes, omitidos o cancelados como evidencia de build.
5. Tras aplicar y leer de vuelta las reglas y checks, crear la variable de repositorio `DEPENDABOT_AUTOMERGE_ENABLED=true`. Hasta entonces, el workflow de escritura no se ejecuta. Esta variable es una barrera de activación, no sustituye la protección de ramas.

No se configura una aprobación automática. La exigencia de revisión humana es recomendable si la política del repositorio así lo establece, aunque limitaría la autonomía de estas categorías; decidirlo al configurar las reglas.

## Ejecución y permisos

`Security checks` conserva permisos de sólo lectura y ejecuta tests, auditoría, lint, typecheck y build en `pull_request`. `Dependabot automerge` se ejecuta por `pull_request_target`, con permisos de escritura, únicamente si el autor exacto es Dependabot y la variable anterior vale `true`. Sólo consulta metadatos y lista de archivos mediante API, y hace checkout de la revisión base confiable sin persistir credenciales. Nunca descarga ni ejecuta código de la PR con el token de escritura.

Tras superar la política local, ejecuta `gh pr merge --auto --squash`; esto no fusiona de inmediato: solicita a GitHub que espere los checks y requisitos aplicables de la protección. La PR de configuración actual no es elegible porque su autor no es Dependabot y toca workflows/configuración.

## Verificación

- Política automatizada: `pnpm test:dependabot-policy` cubre patch elegible, minor de desarrollo elegible, major y minor de producción rechazados, agrupadas rechazadas, cambios ajenos a dependencias/lockfile rechazados, autor ajeno rechazado, paquetes sensibles rechazados y metadatos desconocidos rechazados.
- La prueba de fallo de tests se garantiza por el gate `validate` requerido: una conclusión fallida impide a GitHub completar auto-merge. No se simula una fusión real en esta PR.
- La evaluación de categorías es local y reproducible; la integración real requiere configurar la protección, auto-merge y Vercel en GitHub/Vercel. No se afirma que las pruebas end-to-end de integración hayan pasado.

## Limitaciones y riesgos

- Sin protección obligatoria, auto-merge nativo no puede garantizar los requisitos de calidad. Por eso el workflow está inactivo por defecto y no debe activarse antes de configurar y verificar las reglas.
- GitHub considera un check requerido satisfecho si el proveedor lo marca como pass; un “pass” por build ignorado no equivale a una Preview real. Vercel debe configurarse/validarse para ejecutar una Preview en cambios de dependencias.
- Se rechazan todas las PR agrupadas al inicio, aunque cada elemento pudiera ser elegible. Ampliar esa política exige una prueba fiable que clasifique individualmente cada actualización del grupo.
- “Dependencias sensibles” es una lista conservadora mantenida en `.github/scripts/dependabot-automerge-policy.mjs`; ampliar o reducir esa lista exige revisar el impacto.
- Dependabot puede producir actualizaciones indirectas: quedan siempre para revisión manual hasta poder identificar su tipo/runtime con evidencia suficiente.
- El automerge puede fusionar y activar despliegue de producción en `main` después de satisfacer las reglas. La protección requerida debe ser completa antes de activar la variable.
