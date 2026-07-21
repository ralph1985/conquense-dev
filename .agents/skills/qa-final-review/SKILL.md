---
name: qa-final-review
description: Usar para una revisión completa antes de commit, cierre sustancial o cuando el usuario pida validar una implementación; no para todo cambio pequeño.
---

# Revisión final de QA

1. Compara el objetivo, el diff y los archivos cambiados.
2. Ejecuta `git status --short`, `git diff --stat`, `git diff --name-only` y comprobaciones dirigidas.
3. Usa `git diff --check` cuando el cambio toque documentación, agentes o estilos.
4. Para cambios de código o producto, ejecuta `npm run lint` y `npm run build`.
5. Para cambios de dependencias, ejecuta también `npm audit`.
6. Revisa solo áreas afectadas: no audites SEO, accesibilidad, rendimiento o responsive si el cambio no las toca.
7. Detecta cambios fuera de alcance, archivos generados inesperados, datos sensibles y reglas incumplidas.
8. Reporta evidencia, validaciones no ejecutadas y riesgo residual.

Finaliza solo si el cambio cumple la petición, el diff es mínimo y se respetan los límites del repositorio.
