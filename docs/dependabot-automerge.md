# Automerge de Dependabot

## Política activa en esta PR

El evaluador permite que Dependabot solicite auto-merge nativo de GitHub para actualizaciones patch, minor y major de npm y GitHub Actions, sean de producción, desarrollo, directas, indirectas, individuales o agrupadas. Las actualizaciones de seguridad siguen la misma regla: se admiten si la PR contiene metadata completa y los checks requeridos pasan. No se excluyen paquetes por sensibilidad; el riesgo de regresión se acepta deliberadamente.

Cada elemento de una PR agrupada debe incluir metadata válida, una versión semver reconocida y destino `main`. Se comprueba que los nombres listados por Dependabot coinciden con las actualizaciones individuales. Los metadatos incompletos o inconsistentes bloquean la política. Para npm sólo se permiten `package.json` y `pnpm-lock.yaml`. Para GitHub Actions sólo se permiten cambios de líneas `uses:` en workflows o manifests de composite Actions, y cada referencia debe corresponder a una Action incluida en la metadata de la PR.

Las PR de Dependabot deben tener `main` como base. La configuración versionada fija `target-branch: main` para los dos ecosistemas. El workflow vuelve a comprobar el destino y deshabilita auto-merge nativo si una PR de Dependabot falla la política; el autor también debe ser exactamente `dependabot[bot]`.

## Gates antes de fusionar

La protección de `main` exige PR, rama actualizada y el check de GitHub Actions `validate`. Ese job ejecuta en `pull_request`, con `contents: read`, instalación congelada, `pnpm audit --prod`, sincronización Astro, typecheck, tests existentes, tests de política, lint y build de producción. No requiere secretos. GitHub mantiene las PR abiertas si el check obligatorio falla o queda pendiente; el auto-merge nativo espera a que se satisfagan los requisitos, sin que el workflow fusione directamente.

La Preview de Vercel no es un check obligatorio. Vercel puede omitir una Preview y desplegar producción después de que el PR se integre en `main`. La comprobación de build que bloquea el merge es la del workflow `validate`.

## Permisos y aislamiento

`Dependabot automerge` usa `pull_request_target`, pero su job de evaluación sólo tiene `contents: read` y `pull-requests: read`. Lee metadata de Dependabot, obtiene los parches de archivos por API y hace checkout sólo de la revisión base confiable con credenciales persistentes desactivadas. Nunca obtiene ni ejecuta el código de la PR.

El job separado que habilita auto-merge tiene únicamente `contents: write` y `pull-requests: write`; sólo se ejecuta si la evaluación previa terminó correctamente y el autor es Dependabot. Un tercer job con esos permisos mínimos sólo desactiva una solicitud de auto-merge ya existente cuando la evaluación falla. No se usan tokens personales.

## Configuración aplicada en GitHub

El 21 de noviembre de 2026 se comprobó que `main` no tenía protección y el auto-merge estaba deshabilitado. Tras la autorización de Rafa, se configuraron la protección mínima de `main` y el auto-merge nativo del repositorio:

- PR obligatoria; cero aprobaciones requeridas.
- Check obligatorio `validate`, con la rama actualizada antes de integrar.
- Protección aplicada también a administradores; sin bypass configurado.
- Auto-merge nativo habilitado en el repositorio.
- No se exige check de Vercel ni aprobación manual.

No se necesita `DEPENDABOT_AUTOMERGE_ENABLED`; se eliminó como condición. Las reglas del repositorio, la identidad del autor y la comprobación de metadata son las barreras de activación.

## Comprobaciones reproducibles

`pnpm test:dependabot-policy` cubre:

- Patch, minor y major con dependencias de producción, desarrollo e indirectas.
- PR agrupadas mixtas que contienen un major.
- Actualización de seguridad incluso con CVSS 10.
- GitHub Actions, incluidas versiones major, limitado a líneas `uses:` de la Action actualizada.
- Rechazo de cambios extra en workflows, autor ajeno, destino distinto de `main`, archivos ajenos, metadata ausente/desconocida o inconsistente.

El test local no ejecuta una fusión. La fusión real se deja a GitHub: la PR de configuración #122 no se fusiona automáticamente por estar abierta por un autor humano, y Rafa no ha autorizado fusionarla.

## Riesgo aceptado y límites

Un major o una actualización de seguridad que rompa el sitio puede integrarse si `validate` pasa; esta es la política solicitada para el portfolio experimental. El build no prueba comportamiento funcional exhaustivo ni la respuesta de Vercel. Los cambios de GitHub Actions se limitan en el diff a líneas `uses:`, pero una Action actualizada aún puede cambiar su comportamiento en ejecución. Los cambios de configuración de Dependabot sólo quedan activos una vez fusionada esta PR.
