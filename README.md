# Conquense Dev

Portfolio profesional construido con Astro, TypeScript, Tailwind CSS y DaisyUI.

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
- `src/components/SiteHeader.astro`: cabecera compartida de portada y páginas internas.
- `src/components/CompanyLogo.astro`: representación compartida de empresas con logo o iniciales de fallback.
- `src/components/SectionPanel.astro`: render genérico de cada sección.
- `src/components/ProgressNav.astro`: navegación fija, indicadores y progreso.
- `src/components/DetailPage.astro`: layout para páginas internas de experiencia y proyectos.
- `src/data/i18n.ts`: rutas, etiquetas de UI y soporte de idioma.
- `src/data/sections.ts`: fuente de datos tipada para secciones ES/EN.
- `src/data/experience.ts`: fuente de datos ES/EN para la experiencia profesional.
- `src/data/projects.ts`: fuente de datos ES/EN para proyectos y casos representativos.
- `src/content.config.ts` y `src/content/blog/`: colección Markdown tipada para el blog técnico bilingüe.
- `scripts/blog-worker.mjs`: worker local que busca con Codex, valida borradores, ejecuta checks, crea/actualiza una PR y envía el digest SMTP.
- `scripts/install-blog-cron.sh`: instalador idempotente de la tarea diaria del blog.
- `src/styles/tailwind.css`: reset, tokens semánticos, tema claro/oscuro y componentes visuales construidos sobre Tailwind.
- `src/scripts/portfolio-scroll.ts`: navegación vertical, teclado, indicadores y estado activo.

## Datos

Las secciones se definen en `src/data/sections.ts`, separadas por idioma en `localizedPortfolioSections`. Para añadir una sección hay que añadir el objeto equivalente en `es` y `en`; la navegación, el progreso y el recorrido se derivan de los datos renderizados.

La experiencia profesional vive en `src/data/experience.ts` y se muestra en `/experiencia/` y `/en/experience/`. Los proyectos viven en `src/data/projects.ts` y se muestran en `/proyectos/` y `/en/projects/`.

El blog vive en `/blog/` y `/en/blog/`. Cada noticia se guarda como dos archivos Markdown vinculados por `translationId`, uno por idioma. Los slugs públicos pueden coincidir entre idiomas, pero sus IDs internos son siempre `lang/slug`. `pnpm build` valida además que no haya colisiones, traducciones incompletas ni archivos mal nombrados. El contenido publicado es permanente; la página de índice ordena las entradas por fecha.

## Worker editorial local

El worker se ejecuta con `pnpm blog:worker`. Codex CLI se usa únicamente para investigar y redactar mediante búsqueda web sobre ingeniería, JavaScript, TypeScript, arquitectura frontend, APIs del navegador, tooling, testing, IA aplicada, seguridad, sistemas y rendimiento web; el worker valida la respuesta, exige una versión ES y otra EN, deduplica por URL, ejecuta `pnpm lint` y `pnpm build`, y crea o actualiza la rama `automation/blog-news` mediante GitHub CLI.

La ejecución real requiere `.env.local` con `BLOG_SMTP_PASSWORD` y una sesión válida de `gh`. Los valores de ejemplo están en `.env.example`. La primera prueba controlada puede limitarse a una noticia con `BLOG_MAX_ARTICLES=1`; `BLOG_DRY_RUN=true` evita escribir y publicar.

`BLOG_CODEX_TIMEOUT_MS` permite limitar el tiempo de búsqueda (por defecto, tres minutos) para que una ejecución bloqueada termine y envíe la alerta configurada.

El instalador añade una entrada marcada en la crontab del usuario para las 09:45, fijada a la zona horaria `Europe/Madrid`:

```bash
./scripts/install-blog-cron.sh
```

## Idiomas

El español se publica en `/` y el inglés en `/en/`. `BaseLayout` recibe `lang` y enlaces alternativos para generar `canonical` y `hreflang`. El cambio de idioma apunta a la ruta equivalente cuando existe.

## Scroll

La portada usa scroll vertical nativo en todos los tamaños. Los indicadores funcionan como enlaces internos, actualizan la sección activa y conservan navegación por teclado.

Con `prefers-reduced-motion`, se eliminan las transiciones visuales no esenciales y el contenido conserva el mismo orden lógico.

## Decisiones técnicas

- Astro mantiene el HTML estático y reduce JavaScript cliente.
- Tailwind CSS centraliza layout, responsive y estados; DaisyUI aporta primitivas accesibles tematizadas sin imponer su tema por defecto.
- El scroll nativo evita dependencias de animación para la navegación principal.
- Los datos viven en TypeScript para mantener tipos y edición simple.
- El bilingüismo se resuelve con datos tipados y rutas Astro estáticas, sin añadir una librería i18n.
- Las noticias se mantienen en Content Collections Markdown; la automatización local propone cambios mediante PR y nunca hace merge automáticamente.

## Mejoras futuras

- Revisar proyectos, enlaces públicos y casos ampliables.
- Actualizar los README de los proyectos seleccionados que necesiten mejor presentación pública y añadir capturas.
- Añadir imagen Open Graph definitiva.
- Incorporar analítica ligera si aporta valor.
- Afinar copy, contraste y microinteracciones tras revisar el contenido final.
