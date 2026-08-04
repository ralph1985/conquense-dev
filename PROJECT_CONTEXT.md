# Contexto del proyecto

Conquense Dev es un portfolio profesional en Astro. Está diseñado como una web estática, sobria y técnica, con una home vertical clásica y secciones separadas para experiencia y proyectos.

## Principios

- Claridad antes que ornamento.
- HTML estático y JavaScript mínimo.
- Datos de secciones centralizados en TypeScript.
- Animación discreta, coherente y respetuosa con `prefers-reduced-motion`.
- Accesibilidad como restricción de diseño, no como añadido posterior.
- Los commits del proyecto deben usar Conventional Commits y escribirse en inglés.

## Experiencia principal

El usuario hace scroll vertical nativo. La navegación fija muestra progreso, sección activa, enlaces internos, cambio de idioma y tema visual.

## Stack

- Astro para estructura estática.
- TypeScript para configuración y scripts.
- Tailwind CSS para layout, responsive y estados, con DaisyUI tematizado para primitivas visuales.
- JavaScript cliente mínimo para navegación vertical, progreso y estado activo.

## Pendientes editoriales

- La experiencia laboral en `src/data/experience.ts` ya está revisada por etapas: BBVA, Mobile One2One, Geanet onDemand, ComNet y Goitek.
- Los proyectos viven aparte en `src/data/projects.ts`. Queda pendiente revisar GitHub, enlaces y casos públicos para decidir qué proyectos pueden ampliarse sin inventar ni exponer información sensible.
