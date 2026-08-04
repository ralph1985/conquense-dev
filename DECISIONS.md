# Decisiones Arquitectónicas

## Astro sin framework cliente

Se usa Astro porque el portfolio es mayoritariamente contenido estático. Permite entregar HTML rápido, mantener bajo el JavaScript inicial y reservar el código cliente para la navegación.

Alternativas descartadas: React, Vue y Svelte. Añaden una capa de runtime innecesaria para este primer borrador.

## Scroll vertical nativo

La portada usa scroll vertical nativo. La navegación de progreso actualiza la sección activa con `IntersectionObserver`, enlaces internos y atajos de teclado.

Alternativa descartada: mantener el desplazamiento horizontal con pinning. Era distintivo, pero hacía que la home se sintiera demasiado como una presentación lineal y menos como una portada profesional clásica.

## Scroll nativo

No se usa Lenis ni Locomotive Scroll. El scroll nativo reduce complejidad, conserva mejor la accesibilidad y evita conflictos con navegación por teclado, hash links y preferencias de movimiento.

## Tailwind CSS y DaisyUI

Se usa Tailwind CSS como sistema principal de layout, responsive y estados. DaisyUI aporta primitivas como botones, con un tema propio que reutiliza los tokens semánticos del portfolio y respeta los modos claro y oscuro.

Alternativa descartada: mantener SCSS como capa principal. La migración reduce estilos dispersos y hace explícita la composición visual en los componentes Astro, sin adoptar la estética predeterminada de DaisyUI.

## Datos locales tipados

Las secciones se definen en `src/data/sections.ts` mediante un array tipado. Esto mantiene el proyecto simple y permite añadir secciones sin tocar la lógica de navegación.

Alternativa descartada: CMS. Para un primer borrador con Lorem Ipsum sería una dependencia prematura.

## Cabecera compartida

La navegación, el cambio de idioma, el control de tema y el logotipo viven en `SiteHeader.astro` y se reutilizan en la portada y en las páginas de experiencia y proyectos. Las páginas internas no mantienen una segunda cabecera distinta.

Alternativa descartada: cabeceras específicas por ruta. Duplicaban controles y producían cambios visuales innecesarios al navegar.

## Reduced motion

Cuando el usuario prefiere reducir movimiento, se eliminan desplazamientos decorativos y transiciones de entrada. La información sigue disponible en el mismo orden del DOM mediante scroll vertical.
