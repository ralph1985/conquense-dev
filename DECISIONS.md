# Decisiones Arquitectónicas

## Astro sin framework cliente

Se usa Astro porque el portfolio es mayoritariamente contenido estático. Permite entregar HTML rápido, mantener bajo el JavaScript inicial y reservar el código cliente para la navegación.

Alternativas descartadas: React, Vue y Svelte. Añaden una capa de runtime innecesaria para este primer borrador.

## GSAP ScrollTrigger

Se usa GSAP con ScrollTrigger para implementar `pin`, `scrub`, `snap`, progreso y navegación programática con control suficiente sobre resize y cálculo de anchuras.

Alternativa descartada: CSS scroll-snap puro. Es más ligero, pero no ofrece el mismo control para una experiencia vertical que desplaza secciones horizontalmente con pinning.

## Scroll nativo

No se usa Lenis ni Locomotive Scroll. El scroll nativo reduce complejidad, conserva mejor la accesibilidad y evita conflictos con navegación por teclado, hash links y preferencias de movimiento.

## SCSS y tokens

Se usa SCSS con variables CSS centralizadas para mantener una capa de diseño sencilla: colores, tipografía, espaciado, radios, sombras, breakpoints y tiempos de animación.

Alternativa descartada: framework UI. El objetivo visual es específico y sobrio, y un framework añadiría estilos y convenciones que no hacen falta.

## Datos locales tipados

Las secciones se definen en `src/data/sections.ts` mediante un array tipado. Esto mantiene el proyecto simple y permite añadir secciones sin tocar la lógica de scroll.

Alternativa descartada: CMS. Para un primer borrador con Lorem Ipsum sería una dependencia prematura.

## Scroll horizontal y reduced motion

El desplazamiento horizontal se activa también en móvil para evaluar la experiencia lateral en dispositivo real. Cuando el usuario prefiere reducir movimiento, la información sigue disponible en el mismo orden del DOM mediante scroll vertical.
