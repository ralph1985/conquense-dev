# Contexto del proyecto

Conquense Dev es el primer borrador de un portfolio profesional en Astro. Está diseñado como una web estática, sobria y técnica, con una experiencia tipo presentación también en móvil salvo cuando se reduce el movimiento.

## Principios

- Claridad antes que ornamento.
- HTML estático y JavaScript mínimo.
- Datos de secciones centralizados en TypeScript.
- Animación discreta, coherente y respetuosa con `prefers-reduced-motion`.
- Accesibilidad como restricción de diseño, no como añadido posterior.
- Los commits del proyecto deben usar Conventional Commits y escribirse en inglés.

## Experiencia principal

El usuario hace scroll vertical y las secciones avanzan horizontalmente mediante GSAP ScrollTrigger. Con reducción de movimiento, la navegación horizontal se desactiva por completo y se usa scroll vertical normal.

## Stack

- Astro para estructura estática.
- TypeScript para configuración y scripts.
- SCSS para tokens y estilos.
- GSAP y ScrollTrigger para pin, scrub, snap, progreso y navegación programática.

## Pendientes editoriales

- La experiencia laboral en `src/data/experience.ts` ya está revisada por etapas: BBVA, Mobile One2One, Geanet onDemand, ComNet y Goitek.
- Los proyectos viven aparte en `src/data/projects.ts`. Queda pendiente revisar GitHub, enlaces y casos públicos para decidir qué proyectos pueden ampliarse sin inventar ni exponer información sensible.
