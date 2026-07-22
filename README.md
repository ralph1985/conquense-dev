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

- `src/pages/`: rutas principales en español e inglés.
- `src/layouts/BaseLayout.astro`: HTML base, SEO y estilos globales.
- `src/components/PortfolioShell.astro`: estructura del recorrido.
- `src/components/SectionPanel.astro`: render genérico de cada sección.
- `src/components/ProgressNav.astro`: navegación fija, indicadores y progreso.
- `src/components/DetailPage.astro`: layout para páginas internas de experiencia y proyectos.
- `src/data/i18n.ts`: rutas, etiquetas de UI y soporte de idioma.
- `src/data/sections.ts`: fuente de datos tipada para secciones ES/EN.
- `src/data/professional.ts`: fuente de datos ES/EN para rutas separadas de proyectos y experiencia.
- `src/styles/`: tokens, estilos base, layout, navegación y secciones.
- `src/scripts/portfolio-scroll.ts`: lógica GSAP, teclado, indicadores y estado activo.

## Datos

Las secciones se definen en `src/data/sections.ts`, separadas por idioma en `localizedPortfolioSections`. Para añadir una sección hay que añadir el objeto equivalente en `es` y `en`; la navegación, el progreso y el recorrido se derivan de los datos renderizados.

Los proyectos y la experiencia profesional viven en `src/data/professional.ts` y se muestran en rutas independientes: `/proyectos/`, `/experiencia/`, `/en/projects/` y `/en/experience/`.

## Idiomas

El español se publica en `/` y el inglés en `/en/`. `BaseLayout` recibe `lang` y enlaces alternativos para generar `canonical` y `hreflang`. El cambio de idioma apunta a la ruta equivalente cuando existe.

## Scroll

Si no está activo `prefers-reduced-motion`, `ScrollTrigger` fija el escenario principal y traduce el track horizontal según el scroll vertical en pantallas de `768px` o más. El desplazamiento se calcula con `scrollWidth - innerWidth`, evitando valores hardcodeados.

En móvil y con reducción de movimiento, el recorrido horizontal se desactiva y la página usa scroll vertical normal. Los indicadores funcionan como enlaces internos.

## Decisiones técnicas

- Astro mantiene el HTML estático y reduce JavaScript cliente.
- GSAP + ScrollTrigger cubre `pin`, `scrub` y `snap` sin dependencias de smooth scroll.
- SCSS centraliza tokens y estilos sin introducir un framework visual.
- Los datos viven en TypeScript para mantener tipos y edición simple.
- El bilingüismo se resuelve con datos tipados y rutas Astro estáticas, sin añadir una librería i18n.

## Mejoras futuras

- Actualizar el contenido con CV y LinkedIn revisados.
- Añadir imagen Open Graph definitiva.
- Incorporar analítica ligera si aporta valor.
- Afinar copy, contraste y microinteracciones tras revisar el contenido final.
