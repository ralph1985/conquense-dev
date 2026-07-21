---
name: agent-config-review
description: Usar solo al revisar o modificar AGENTS.md, PROJECT_CONTEXT.md, DECISIONS.md, la configuración .codex, agentes o skills locales.
---

# Revisión de configuración de agentes

## Procedimiento

1. Confirma el alcance y usa `AGENTS.md` como autoridad principal.
2. Haz primero un inventario con `rg --files` y rutas relevantes; no abras todo el repositorio.
3. Lee solo la configuración afectada.
4. Valida TOML, frontmatter de skills y coherencia entre carpeta, `name` y `description`.
5. Separa responsabilidades: política operativa en `AGENTS.md`, contexto estable en `PROJECT_CONTEXT.md`, decisiones técnicas en `DECISIONS.md`.
6. Busca activadores demasiado amplios, duplicidades, contradicciones y supuestos obsoletos sobre rutas o tecnología.
7. Mantén la configuración breve y específica del proyecto.

No inspecciones la web, assets, build ni dependencias salvo relación directa. Indica archivos revisados, riesgos y validaciones.
