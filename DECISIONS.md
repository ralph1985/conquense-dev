# Decisiones Arquitectónicas

## Astro sin framework cliente

Se usa Astro porque el portfolio es mayoritariamente contenido estático. Permite entregar HTML rápido, mantener bajo el JavaScript inicial y reservar el código cliente para la navegación.

Alternativas descartadas: React, Vue y Svelte. Añaden una capa de runtime innecesaria para este primer borrador.

## Scroll vertical nativo

La portada usa scroll vertical nativo. La navegación de progreso actualiza la sección activa con `IntersectionObserver`, enlaces internos y atajos de teclado.

Alternativa descartada: mantener el desplazamiento horizontal con pinning. Era distintivo, pero hacía que la home se sintiera demasiado como una presentación lineal y menos como una portada profesional clásica.

## Scroll nativo

No se usa Lenis ni Locomotive Scroll. El scroll nativo reduce complejidad, conserva mejor la accesibilidad y evita conflictos con navegación por teclado, hash links y preferencias de movimiento.

## SCSS y tokens

Se usa SCSS con variables CSS centralizadas para mantener una capa de diseño sencilla: colores, tipografía, espaciado, radios, sombras, breakpoints y tiempos de animación.

Alternativa descartada: framework UI. El objetivo visual es específico y sobrio, y un framework añadiría estilos y convenciones que no hacen falta.

## Datos locales tipados

Las secciones se definen en `src/data/sections.ts` mediante un array tipado. Esto mantiene el proyecto simple y permite añadir secciones sin tocar la lógica de navegación.

Alternativa descartada: CMS. Para un primer borrador con Lorem Ipsum sería una dependencia prematura.

## Reduced motion

Cuando el usuario prefiere reducir movimiento, se eliminan desplazamientos decorativos y transiciones de entrada. La información sigue disponible en el mismo orden del DOM mediante scroll vertical.
