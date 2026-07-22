# Instrucciones para agentes

Conquense Dev es un portfolio profesional construido con Astro. El objetivo del proyecto es transmitir ingeniería de software, arquitectura, calidad, claridad, rendimiento y elegancia mediante una experiencia limpia, mantenible y accesible.

## Prioridad e idioma

- Trabajar con el usuario en español.
- Usar ramas y commits en inglés.
- Prioridad documental: `AGENTS.md`, `README.md` y `DECISIONS.md`.
- Antes de ampliar alcance, comprobar si la petición cambia arquitectura, diseño visual, contenido o solo implementación puntual.

## Modo rápido por defecto

- Empezar por archivos probables y búsquedas concretas; no releer todo el repositorio si no hace falta.
- Usar `rg` y rangos concretos antes de abrir archivos completos.
- No inspeccionar `dist`, `.astro`, `node_modules`, lockfiles o assets generados salvo relación directa con la tarea.
- No actualizar documentación salvo que cambien uso, scripts, arquitectura, decisiones estables o flujo de trabajo.
- Evitar sobrecomponentizar. Añadir componentes solo si reducen duplicación real o aíslan una responsabilidad visible.

## Estado técnico actual

- Stack: Astro, TypeScript, SCSS, GSAP y ScrollTrigger.
- Entrada principal: `src/pages/index.astro`.
- Layout base y SEO: `src/layouts/BaseLayout.astro` y `src/config/site.ts`.
- Secciones configurables: `src/data/sections.ts`.
- Componentes principales: `src/components/PortfolioShell.astro`, `SectionPanel.astro` y `ProgressNav.astro`.
- Estilos: `src/styles/*.scss`, con tokens centralizados en `src/styles/_tokens.scss`.
- Interacción cliente: `src/scripts/portfolio-scroll.ts`.
- Documentación de decisiones: `DECISIONS.md`.

## Restricciones técnicas

- No añadir React, Vue, Svelte, Lenis, Locomotive Scroll, frameworks UI, analítica, CMS ni dependencias nuevas sin necesidad clara y permiso explícito.
- Mantener el contenido de secciones definido desde `src/data/sections.ts`; añadir una sección debe requerir añadir un objeto al array.
- Conservar la experiencia de scroll vertical con avance horizontal mediante GSAP y ScrollTrigger también en móvil.
- Con `prefers-reduced-motion`, conservar scroll vertical normal y todo el contenido accesible.
- No sacrificar orden lógico del DOM, foco visible, navegación por teclado ni landmarks semánticos por efectos visuales.
- No introducir efectos visuales exagerados ni estética de agencia creativa. Priorizar sobriedad, tipografía, espacio blanco y grid técnico sutil.
- No tocar `.env` ni credenciales.

## Selección de agentes

- Coordinación normal: `coordinator`.
- Cambios visuales o de interacción: revisar el impacto con criterios de diseño, accesibilidad y rendimiento.
- Configuración de agentes o instrucciones: usar `agent-config-review`.
- Revisión final completa antes de commit o cierre sustancial: usar `qa-final-review`.
- Operaciones Git, ramas, stage, commit, push o PR: usar `safe-gitflow`.
- En cambios pequeños, aplicar estas reglas directamente sin activar agentes extra por defecto.

## Git

- Revisar `git status --short --branch` antes de modificar y antes de commitear.
- Respetar cambios locales ajenos.
- Usar rutas explícitas en `git add`; evitar `git add .`, `git add -A` y `git add --all`.
- Commits pequeños con Conventional Commits.
- No hacer push, merge ni abrir PR salvo petición explícita.
- Las operaciones que escriben en `.git` pueden necesitar permisos escalados por restricciones del sandbox.

## Validación

- Cambios de producto o código: ejecutar `npm run lint` y `npm run build`.
- Cambios de dependencias: ejecutar también `npm audit`.
- Cambios solo documentales o de agentes: validar TOML/frontmatter cuando aplique y ejecutar `git diff --check`.
- Para cambios de scroll o responsive, validar escritorio y móvil cuando sea proporcional.
- No ocultar fallos ni desactivar reglas para que pasen comprobaciones sin una razón técnica clara.

## Resumen final

Al cerrar una tarea sustancial, incluir:

```txt
Rama:
Commit:
Archivos tocados:
Checks:
Notas:
```
