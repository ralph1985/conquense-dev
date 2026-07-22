# Conquense Dev

Primer borrador de portfolio profesional construido con Astro, TypeScript, SCSS, GSAP y ScrollTrigger.

## Instalación

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # servidor local
npm run build    # validación Astro + build estático
npm run lint     # validación Astro
npm run preview  # preview del build
```

## Arquitectura

- `src/pages/index.astro`: compone la página principal.
- `src/layouts/BaseLayout.astro`: HTML base, SEO y estilos globales.
- `src/components/PortfolioShell.astro`: estructura del recorrido.
- `src/components/SectionPanel.astro`: render genérico de cada sección.
- `src/components/ProgressNav.astro`: navegación fija, indicadores y progreso.
- `src/data/sections.ts`: fuente de datos tipada para todas las secciones.
- `src/styles/`: tokens, estilos base, layout, navegación y secciones.
- `src/scripts/portfolio-scroll.ts`: lógica GSAP, teclado, indicadores y estado activo.

## Datos

Las secciones se definen en `src/data/sections.ts`. Para añadir una sección basta con añadir un objeto al array `portfolioSections`; la navegación, el progreso y el recorrido se derivan de los datos renderizados.

## Scroll

En escritorio, desde `1024px` y solo si no está activo `prefers-reduced-motion`, `ScrollTrigger` fija el escenario principal y traduce el track horizontal según el scroll vertical. El desplazamiento se calcula con `scrollWidth - innerWidth`, evitando valores hardcodeados.

En móvil y con reducción de movimiento, el recorrido horizontal se desactiva y la página usa scroll vertical normal. Los indicadores funcionan como enlaces internos.

## Decisiones técnicas

- Astro mantiene el HTML estático y reduce JavaScript cliente.
- GSAP + ScrollTrigger cubre `pin`, `scrub` y `snap` sin dependencias de smooth scroll.
- SCSS centraliza tokens y estilos sin introducir un framework visual.
- Los datos viven en TypeScript para mantener tipos y edición simple.

## Mejoras futuras

- Actualizar el contenido con CV y LinkedIn revisados.
- Añadir imagen Open Graph definitiva.
- Incorporar analítica ligera si aporta valor.
- Afinar copy, contraste y microinteracciones tras revisar el contenido final.
