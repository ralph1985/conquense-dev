---
name: safe-gitflow
description: Usar solo cuando haya ramas, stage, commits, historial, push, pull requests, GitHub CLI o una auditoría Git explícita; no por consultas de solo lectura durante QA.
---

# Flujo Git seguro

## Estado y ramas

1. Ejecuta `git status --short --branch` antes de modificar el índice o crear commits.
2. Si hay cambios locales ajenos o imprevistos, para y pregunta.
3. Usa ramas y commits en inglés.
4. No hagas merge, rebase, force push, reescritura de historial, stash, resets destructivos, checkout forzado ni limpieza sin permiso.

## Escrituras y commit

- Ejecuta fuera del sandbox cualquier escritura en refs, `HEAD`, index o commits si el entorno lo requiere.
- Antes del commit, revisa status, stat, nombres de archivos y diff.
- Usa `git add` solo con rutas explícitas; nunca `.`, `-A` ni `--all`.
- Crea commits pequeños con Conventional Commits.

## Publicación

- Push o PR solo por petición explícita.
- Antes de publicar, valida rama, remoto, worktree limpio y autenticación de GitHub si aplica.
- No instales ni reconfigures `gh`, no muestres tokens y no crees forks sin permiso.

Los errores de permisos sobre `.git`, refs, `HEAD` o index pueden ser limitaciones del sandbox. Si aparecen, no repitas sin escalar de forma explícita.
