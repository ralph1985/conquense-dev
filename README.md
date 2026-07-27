# Conquense Dev

Portfolio profesional construido con Astro, TypeScript y SCSS.

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
- `src/data/experience.ts`: fuente de datos ES/EN para la experiencia profesional.
- `src/data/projects.ts`: fuente de datos ES/EN para proyectos y casos representativos.
- `src/styles/`: tokens, estilos base, layout, navegación y secciones.
- `src/scripts/portfolio-scroll.ts`: navegación vertical, teclado, indicadores y estado activo.

## Datos

Las secciones se definen en `src/data/sections.ts`, separadas por idioma en `localizedPortfolioSections`. Para añadir una sección hay que añadir el objeto equivalente en `es` y `en`; la navegación, el progreso y el recorrido se derivan de los datos renderizados.

La experiencia profesional vive en `src/data/experience.ts` y se muestra en `/experiencia/` y `/en/experience/`. Los proyectos viven en `src/data/projects.ts` y se muestran en `/proyectos/` y `/en/projects/`.

## Idiomas

El español se publica en `/` y el inglés en `/en/`. `BaseLayout` recibe `lang` y enlaces alternativos para generar `canonical` y `hreflang`. El cambio de idioma apunta a la ruta equivalente cuando existe.

## Scroll

La portada usa scroll vertical nativo en todos los tamaños. Los indicadores funcionan como enlaces internos, actualizan la sección activa y conservan navegación por teclado.

Con `prefers-reduced-motion`, se eliminan las transiciones visuales no esenciales y el contenido conserva el mismo orden lógico.

## Decisiones técnicas

- Astro mantiene el HTML estático y reduce JavaScript cliente.
- El scroll nativo evita dependencias de animación para la navegación principal.
- SCSS centraliza tokens y estilos sin introducir un framework visual.
- Los datos viven en TypeScript para mantener tipos y edición simple.
- El bilingüismo se resuelve con datos tipados y rutas Astro estáticas, sin añadir una librería i18n.

## Mejoras futuras

- Revisar proyectos, enlaces públicos y casos ampliables.
- Actualizar los README de los proyectos seleccionados que necesiten mejor presentación pública y añadir capturas.
- Añadir imagen Open Graph definitiva.
- Incorporar analítica ligera si aporta valor.
- Afinar copy, contraste y microinteracciones tras revisar el contenido final.
