import type { Language } from '@/data/i18n';
import type { DetailCopy } from '@/data/detail-types';

export interface ProjectHighlight {
  name: string;
  context: string;
  role: string;
  summary: string;
  highlights?: string[];
  stack: string[];
  links?: Array<{
    label: string;
    href: string;
  }>;
}

export const localizedProjects: Record<Language, DetailCopy & { items: ProjectHighlight[] }> = {
  es: {
      eyebrow: 'Proyectos',
      title: 'Proyectos',
      subtitle: 'Productos propios, banca digital, mobile commerce y herramientas internas.',
      description:
        'Una selección de productos propios y trabajos representativos, descritos desde el problema que resuelven, el papel que desempeñé y las decisiones técnicas que tomé.',
      items: [
        {
          name: 'Jucart',
          context: 'Proyecto personal y familiar',
          role: 'Definición de producto, arquitectura frontend y desarrollo asistido por IA',
          summary:
            'Jucart resuelve una necesidad doméstica concreta: sustituir la pizarra de la nevera por una lista de compra privada que se pueda usar también sin conexión en el supermercado. Definí el producto y su arquitectura frontend, ampliándolo por capas: Dexie e IndexedDB permiten el uso offline; Supabase comparte la lista entre dispositivos; y una bandeja de tickets permite a Codex extraer líneas y formar un histórico de precios. Así, la sincronización y el procesamiento de tickets se suman a la lista sin convertirlos en requisito para anotar la compra.',
          highlights: [
            'Lista privada pensada para sustituir la pizarra de la compra.',
            'Dexie e IndexedDB mantienen la lista disponible offline.',
            'Supabase permite compartirla entre dispositivos.',
            'Codex extrae líneas de tickets para construir un histórico de precios.',
          ],
          stack: ['React', 'TypeScript', 'Vite', 'SCSS Modules', 'Dexie', 'Supabase', 'PWA', 'Codex', 'Playwright'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/jucart' },
            { label: 'Demo', href: 'https://jucart-rosy.vercel.app' },
          ],
        },
        {
          name: 'Bingo Musical',
          context: 'Producto social en producción',
          role: 'Definición de producto, arquitectura full-stack y flujo de partida en tiempo real',
          summary:
            'Bingo Musical organiza partidas presenciales en las que una persona pone canciones y cada jugador sigue su propio cartón. Definí el producto y la arquitectura de la partida: el anfitrión importa canciones desde texto, CSV o Spotify y comparte una sala mediante código o QR; los jugadores marcan cartones digitales en el móvil. Convex conserva el estado compartido y valida marcas, línea y bingo; los cartones deterministas de 3 × 4 mantienen una distribución reproducible. Spotify es una integración opcional para importar canciones y controlar la reproducción, que ocurre fuera de la aplicación.',
          highlights: [
            'Flujos separados para quien organiza la partida y quienes juegan.',
            'Código de seis caracteres o QR para entrar en la sala compartida.',
            'Cartones deterministas de 3 × 4 y validación del estado en Convex.',
            'Spotify opcional para importar canciones y controlar la reproducción externa.',
          ],
          stack: ['Next.js', 'React', 'TypeScript', 'Convex', 'Spotify API', 'Vitest', 'Playwright'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/music-bingo' },
            { label: 'Demo', href: 'https://bingo.conquense.dev' },
          ],
        },
        {
          name: 'Palomares del Campo',
          context: 'Plataforma digital local y comunitaria',
          role: 'Definición de producto, arquitectura full-stack y desarrollo frontend',
          summary:
            'Palomares del Campo reúne información local —noticias, bandos y rutas— con experiencias interactivas para la comunidad. Me encargué de definir el producto, la arquitectura full-stack y el frontend. El contenido editorial se genera como páginas estáticas para que no dependa de Convex; Leaflet y OpenStreetMap muestran mapas y recorridos GPX, mientras las escenas Three.js se cargan bajo demanda y cuentan con alternativa. Convex queda reservado al estado remoto del juego geolocalizado y a la moderación de propuestas de «Palomareños por el mundo».',
          highlights: [
            'Noticias, bandos y rutas publicados como contenido estático, independiente de Convex.',
            'Mapas y recorridos GPX con Leaflet y OpenStreetMap.',
            'Escenas Three.js con carga bajo demanda y alternativa.',
            'Convex gestiona el estado del juego geolocalizado y la moderación de propuestas comunitarias.',
            'Coordenadas y radios del juego identificados como provisionales.',
          ],
          stack: ['Astro', 'TypeScript', 'Leaflet', 'Three.js', 'Convex', 'OpenStreetMap', 'Turnstile', 'Resend', 'Playwright'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/palomares-del-campo' },
            { label: 'Demo', href: 'https://palomares-del-campo.vercel.app' },
            {
              label: 'Escudo municipal: Asqueladd (CC BY-SA 3.0)',
              href: 'https://commons.wikimedia.org/wiki/File:Escudo_de_Palomares_del_Campo.svg',
            },
          ],
        },
        {
          name: 'Irati',
          context: 'Producto privado familiar',
          role: 'Producto, arquitectura y desarrollo asistido por IA',
          summary:
            'Irati nació cuando nació mi hija: quería dejar de repartir su información entre carpetas, documentos y aplicaciones. Empezó con un perfil, el seguimiento del peso y el calendario de vacunas; después incorporó una checklist de viaje que antes vivía en TickTick. Cuando en el pediatra la conexión dejó de ser suficiente, evolucionó hacia una PWA offline-first. La mayor parte del proyecto se ha construido conversando con Codex, retomando el contexto y avanzando por fases según aparecían nuevas necesidades.',
          highlights: [
            'Centralizar la información familiar en un solo lugar.',
            'Seguimiento de peso y calendario de vacunas.',
            'Checklist de viaje integrada desde TickTick.',
            'Offline first para usarla también en el pediatra.',
          ],
          stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Dexie', 'Serwist', 'Codex', 'Vitest'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/irati-app' },
            { label: 'Demo', href: 'https://irati-app.vercel.app' },
          ],
        },
        {
          name: 'Curvas de crecimiento infantiles',
          context: 'Producto personal y familiar',
          role: 'Producto, arquitectura frontend y desarrollo',
          summary:
            'Aplicación web para registrar medidas infantiles y consultar su evolución con referencias de crecimiento de la OMS. Nació como un fork de child-growth-charts y continúa como una herramienta familiar activa, probada con familias cercanas. Los datos se guardan solo en el navegador, sin cuentas ni servidor.',
          highlights: [
            'Datos locales, sin cuentas ni servidor.',
            'Referencias de crecimiento de la OMS.',
            'Pruebas continuas con familias cercanas.',
            'Fork y continuación de child-growth-charts de Frederik Leonhardt.',
          ],
          stack: ['TypeScript', 'Mithril', 'Chartist', 'Webpack', 'Sass', 'localStorage', 'OMS'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/curvas-crecimiento' },
            { label: 'Demo', href: 'https://crecimiento-bebe.conquense.dev/' },
          ],
        },
        {
          name: 'Borch Gómez',
          context: 'Web profesional con CMS',
          role: 'Arquitectura frontend, contenido y despliegue',
          summary:
            'Web profesional para un creador audiovisual, construida con Astro, SCSS y JavaScript vanilla. El proyecto separa contenido, dominio e infraestructura, integra Sanity como CMS opcional y mantiene fallbacks locales para garantizar builds estables y despliegues seguros en Vercel.',
          stack: ['Astro', 'TypeScript', 'SCSS', 'Sanity', 'Vercel'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/borchgomez' },
            { label: 'Demo', href: 'https://borchgomez.vercel.app' },
          ],
        },
        {
          name: 'Bárbara Núñez Osteópata',
          context: 'Borrador de web profesional',
          role: 'Base técnica, diseño frontend y preparación de despliegue',
          summary:
            'Borrador de web profesional construida con Astro, TypeScript y SCSS. La base está preparada para despliegue estático en Vercel y contempla SEO técnico, canonical, Open Graph, sitemap, robots, planificación viva y seguimiento del trabajo.',
          stack: ['Astro', 'TypeScript', 'SCSS', 'SEO', 'Vercel'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/barbaranunez-osteopata' },
            { label: 'Demo', href: 'https://barbaranunez-osteopata.vercel.app' },
          ],
        },
        {
          name: 'Loto Sync',
          context: 'Aplicación móvil de gestión compartida',
          role: 'Producto, frontend, API y modelo de datos',
          summary:
            'Aplicación web móvil para gestión compartida de boletos de lotería, grupos, resguardos, resultados y movimientos de bote. Construida con Next.js, TypeScript, Prisma, Postgres y almacenamiento de archivos, con API interna para tickets, resultados, premios y copias de seguridad.',
          stack: ['Next.js', 'TypeScript', 'Prisma', 'Postgres', 'Vercel'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/loto-sync' },
            { label: 'Demo', href: 'https://loto-sync.vercel.app' },
          ],
        },
        {
          name: 'Preparación al parto',
          context: 'Curso privado multipágina',
          role: 'Arquitectura estática, contenido y navegación',
          summary:
            'Web estática privada para organizar apuntes de preparación al parto como curso multipágina. Construida con Astro y Markdown, genera páginas por lección, una versión agregada para lectura completa y contenido preparado para consulta por LLMs, con navegación progresiva, cabeceras de seguridad y despliegue estático en Vercel.',
          stack: ['Astro', 'Markdown', 'JavaScript', 'CSS', 'Vercel'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/preparacion-parto' },
            { label: 'Demo', href: 'https://preparacion-parto.vercel.app' },
          ],
        },
        {
          name: 'Gas Price Finder',
          context: 'Aplicación de datos públicos',
          role: 'Frontend, API serverless e integración de datos',
          summary:
            'Buscador de precios de combustible construido con Svelte y Vite, con API serverless en Vercel, caché diaria en cliente y servidor, arquitectura limpia por capas y soporte instalable. El proyecto integra datos externos y resuelve detalles de comunicación HTTP/TLS con un upstream público.',
          stack: ['Svelte', 'Vite', 'JavaScript', 'Vercel API', 'PWA'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/gas-price-finder' },
            { label: 'Demo', href: 'https://gas-price-finder.vercel.app' },
          ],
        },
        {
          name: 'OneDrive File Sync',
          context: 'Herramienta CLI personal',
          role: 'Integración API, sincronización y automatización local',
          summary:
            'Herramienta CLI en TypeScript para sincronizar un archivo local con OneDrive usando Microsoft Graph. Diseñada para uso con cron, OAuth local y permisos acotados al App Folder, con una estrategia simple de resolución por última modificación.',
          stack: ['TypeScript', 'Microsoft Graph', 'OAuth', 'Node.js', 'CLI'],
          links: [{ label: 'GitHub', href: 'https://github.com/ralph1985/onedrive-file-sync' }],
        },
        {
          name: 'Kamikazes Events',
          context: 'Mini webapp mobile first',
          role: 'Frontend, API y persistencia intercambiable',
          summary:
            'Mini webapp mobile first para votar fechas de eventos, construida con Next.js, TypeScript, React Day Picker y persistencia intercambiable entre Vercel KV y mock local. Incluye API server-only, validaciones, resultados ordenados y una abstracción de almacenamiento sencilla.',
          stack: ['Next.js', 'TypeScript', 'Vercel KV', 'React Day Picker'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/kamikazes-events' },
            { label: 'Demo', href: 'https://kamikazes-events.vercel.app' },
          ],
        },
        {
          name: 'Ayuntamiento de Belmontejo',
          context: 'Proyecto institucional no finalizado',
          role: 'Arquitectura web, CMS, automatización y calidad',
          summary:
            'Propuesta de sitio institucional construida con Astro y Decap CMS. Aunque el proyecto no llegó a salir, dejó una base técnica con contenido administrable, automatización de bandos desde RSS municipal, formularios, despliegue en Vercel y una capa de calidad con ESLint, Prettier, Vitest, Playwright, snapshots visuales, Sonar y hooks de pre-push.',
          stack: ['Astro', 'TypeScript', 'Decap CMS', 'Playwright', 'Vitest'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/ayuntamiento-de-belmontejo' },
            { label: 'Demo', href: 'https://ayuntamiento-de-belmontejo.vercel.app' },
          ],
        },
        {
          name: 'BuyBuddies',
          context: 'Proyecto Lit y colaboración',
          role: 'Arquitectura frontend, TDD e integración con Google Sheets',
          summary:
            'Aplicación colaborativa de lista de compra construida con TypeScript, Lit y Material Web Components. Usa Google Sheets como fuente de datos configurable, repositorio mock para desarrollo y un enfoque de arquitectura por dominio, TDD, despliegue en Vercel y observabilidad opcional con Bugsnag.',
          stack: ['TypeScript', 'Lit', 'Material Web Components', 'Google Sheets', 'TDD'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/buy-buddies' },
          ],
        },
      ],
    },
  en: {
      eyebrow: 'Projects',
      title: 'Projects',
      subtitle: 'Personal products, digital banking, mobile commerce and internal tools.',
      description:
        'A selection of personal products and representative work, described through the problem each one solves, my role and the technical decisions I made.',
      items: [
        {
          name: 'Jucart',
          context: 'Personal and family project',
          role: 'Product definition, frontend architecture and AI-assisted development',
          summary:
            'Jucart addresses a specific household need: replacing the fridge whiteboard with a private shopping list that also works offline at the supermarket. I defined the product and frontend architecture, extending it in layers: Dexie and IndexedDB support offline use; Supabase shares the list across devices; and a ticket inbox lets Codex extract line items and build price history. This adds synchronisation and ticket processing without making either a requirement for writing down a purchase.',
          highlights: [
            'A private list designed to replace the household shopping whiteboard.',
            'Dexie and IndexedDB keep the list available offline.',
            'Supabase lets the list be shared across devices.',
            'Codex extracts ticket line items to build price history.',
          ],
          stack: ['React', 'TypeScript', 'Vite', 'SCSS Modules', 'Dexie', 'Supabase', 'PWA', 'Codex', 'Playwright'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/jucart' },
            { label: 'Demo', href: 'https://jucart-rosy.vercel.app' },
          ],
        },
        {
          name: 'Music Bingo',
          context: 'Social product in production',
          role: 'Product definition, full-stack architecture and real-time game flow',
          summary:
            'Music Bingo runs in-person games where one person plays songs and each player follows an individual card. I defined the product and game architecture: the host imports songs from text, CSV or Spotify and shares a room by code or QR; players mark digital cards on their phones. Convex holds shared game state and validates marks, lines and bingo claims; deterministic 3 × 4 cards keep card layouts reproducible. Spotify is optional for importing songs and controlling playback, which happens outside the app.',
          highlights: [
            'Separate flows for the host and the players.',
            'Join a shared room with a six-character code or QR.',
            'Deterministic 3 × 4 cards and state validation in Convex.',
            'Optional Spotify integration to import songs and control external playback.',
          ],
          stack: ['Next.js', 'React', 'TypeScript', 'Convex', 'Spotify API', 'Vitest', 'Playwright'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/music-bingo' },
            { label: 'Demo', href: 'https://bingo.conquense.dev' },
          ],
        },
        {
          name: 'Palomares del Campo',
          context: 'Local and community digital platform',
          role: 'Product definition, full-stack architecture and frontend development',
          summary:
            'Palomares del Campo brings local information—news, municipal notices and routes—together with interactive experiences for the community. I defined the product, full-stack architecture and frontend. Editorial content is generated as static pages so it does not depend on Convex; Leaflet and OpenStreetMap provide maps and GPX routes, while Three.js scenes load on demand with an alternative available. Convex is reserved for remote state in the geolocated game and moderation of “Palomareños por el mundo” submissions.',
          highlights: [
            'News, notices and routes published as static content, independent from Convex.',
            'Maps and GPX routes with Leaflet and OpenStreetMap.',
            'Three.js scenes with on-demand loading and an alternative.',
            'Convex handles game state and moderation of community submissions.',
            'Game coordinates and radii are identified as provisional.',
          ],
          stack: ['Astro', 'TypeScript', 'Leaflet', 'Three.js', 'Convex', 'OpenStreetMap', 'Turnstile', 'Resend', 'Playwright'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/palomares-del-campo' },
            { label: 'Demo', href: 'https://palomares-del-campo.vercel.app' },
            {
              label: 'Coat of arms: Asqueladd (CC BY-SA 3.0)',
              href: 'https://commons.wikimedia.org/wiki/File:Escudo_de_Palomares_del_Campo.svg',
            },
          ],
        },
        {
          name: 'Irati',
          context: 'Private family product',
          role: 'Product, architecture and AI-assisted development',
          summary:
            'Irati began when my daughter was born: I wanted to stop scattering her information across folders, documents and different apps. It started with a profile, weight tracking and a vaccine calendar; later it absorbed a travel checklist that had lived in TickTick. When connectivity proved unreliable at the paediatrician, it evolved into an offline-first PWA. Most of the project has been built by talking with Codex, resuming context and moving in phases as new needs appeared.',
          highlights: [
            'Centralising family information in one place.',
            'Weight tracking and vaccine calendar.',
            'Travel checklist brought over from TickTick.',
            'Offline first for use at the paediatrician.',
          ],
          stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Dexie', 'Serwist', 'Codex', 'Vitest'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/irati-app' },
            { label: 'Demo', href: 'https://irati-app.vercel.app' },
          ],
        },
        {
          name: 'Curvas de crecimiento infantiles',
          context: 'Personal and family product',
          role: 'Product, frontend architecture and development',
          summary:
            "Web application for recording children's measurements and viewing their progress against WHO growth references. It began as a fork of child-growth-charts and continues as an active family tool, tested with families in our circle. Data stays in the browser, with no accounts or server.",
          highlights: [
            'Local data, with no accounts or server.',
            'WHO growth references.',
            'Continuous testing with families in our circle.',
            'Fork and continuation of child-growth-charts by Frederik Leonhardt.',
          ],
          stack: ['TypeScript', 'Mithril', 'Chartist', 'Webpack', 'Sass', 'localStorage', 'WHO'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/curvas-crecimiento' },
            { label: 'Demo', href: 'https://crecimiento-bebe.conquense.dev/' },
          ],
        },
        {
          name: 'Borch Gómez',
          context: 'Professional website with CMS',
          role: 'Frontend architecture, content and deployment',
          summary:
            'Professional website for an audiovisual creator, built with Astro, SCSS and vanilla JavaScript. The project separates content, domain and infrastructure, integrates Sanity as an optional CMS and keeps local fallbacks to guarantee stable builds and safe Vercel deployments.',
          stack: ['Astro', 'TypeScript', 'SCSS', 'Sanity', 'Vercel'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/borchgomez' },
            { label: 'Demo', href: 'https://borchgomez.vercel.app' },
          ],
        },
        {
          name: 'Bárbara Núñez Osteópata',
          context: 'Professional website draft',
          role: 'Technical base, frontend design and deployment setup',
          summary:
            'Draft professional website built with Astro, TypeScript and SCSS. The base is prepared for static deployment on Vercel and covers technical SEO, canonical URLs, Open Graph, sitemap, robots, an evolving roadmap and work tracking.',
          stack: ['Astro', 'TypeScript', 'SCSS', 'SEO', 'Vercel'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/barbaranunez-osteopata' },
            { label: 'Demo', href: 'https://barbaranunez-osteopata.vercel.app' },
          ],
        },
        {
          name: 'Loto Sync',
          context: 'Shared management mobile application',
          role: 'Product, frontend, API and data model',
          summary:
            'Mobile web application for shared lottery ticket management, groups, receipts, results and prize-pool movements. Built with Next.js, TypeScript, Prisma, Postgres and file storage, with an internal API for tickets, results, prizes and backups.',
          stack: ['Next.js', 'TypeScript', 'Prisma', 'Postgres', 'Vercel'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/loto-sync' },
            { label: 'Demo', href: 'https://loto-sync.vercel.app' },
          ],
        },
        {
          name: 'Preparación al parto',
          context: 'Private multipage course',
          role: 'Static architecture, content and navigation',
          summary:
            'Private static website for organizing birth-preparation notes as a multipage course. Built with Astro and Markdown, it generates lesson pages, an aggregated full-reading version and LLM-ready content, with progressive navigation, security headers and static deployment on Vercel.',
          stack: ['Astro', 'Markdown', 'JavaScript', 'CSS', 'Vercel'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/preparacion-parto' },
            { label: 'Demo', href: 'https://preparacion-parto.vercel.app' },
          ],
        },
        {
          name: 'Gas Price Finder',
          context: 'Public data application',
          role: 'Frontend, serverless API and data integration',
          summary:
            'Fuel price finder built with Svelte and Vite, with a serverless API on Vercel, daily client and server caching, clean layered architecture and installable app support. The project integrates external data and handles HTTP/TLS communication details with a public upstream.',
          stack: ['Svelte', 'Vite', 'JavaScript', 'Vercel API', 'PWA'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/gas-price-finder' },
            { label: 'Demo', href: 'https://gas-price-finder.vercel.app' },
          ],
        },
        {
          name: 'OneDrive File Sync',
          context: 'Personal CLI tool',
          role: 'API integration, synchronization and local automation',
          summary:
            'TypeScript CLI tool for syncing a local file with OneDrive through Microsoft Graph. Designed for cron usage, local OAuth and permissions scoped to the App Folder, with a simple last-modified conflict strategy.',
          stack: ['TypeScript', 'Microsoft Graph', 'OAuth', 'Node.js', 'CLI'],
          links: [{ label: 'GitHub', href: 'https://github.com/ralph1985/onedrive-file-sync' }],
        },
        {
          name: 'Kamikazes Events',
          context: 'Mobile-first mini webapp',
          role: 'Frontend, API and swappable persistence',
          summary:
            'Mobile-first mini webapp for voting event dates, built with Next.js, TypeScript, React Day Picker and swappable persistence between Vercel KV and a local mock. It includes a server-only API, validations, ordered results and a simple storage abstraction.',
          stack: ['Next.js', 'TypeScript', 'Vercel KV', 'React Day Picker'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/kamikazes-events' },
            { label: 'Demo', href: 'https://kamikazes-events.vercel.app' },
          ],
        },
        {
          name: 'Ayuntamiento de Belmontejo',
          context: 'Unfinished institutional project',
          role: 'Web architecture, CMS, automation and quality',
          summary:
            'Institutional website proposal built with Astro and Decap CMS. Although the project did not go live, it left a technical base with editable content, automated municipal notices from an RSS feed, forms, Vercel deployment and a quality layer with ESLint, Prettier, Vitest, Playwright, visual snapshots, Sonar and pre-push hooks.',
          stack: ['Astro', 'TypeScript', 'Decap CMS', 'Playwright', 'Vitest'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/ayuntamiento-de-belmontejo' },
            { label: 'Demo', href: 'https://ayuntamiento-de-belmontejo.vercel.app' },
          ],
        },
        {
          name: 'BuyBuddies',
          context: 'Lit and collaboration project',
          role: 'Frontend architecture, TDD and Google Sheets integration',
          summary:
            'Collaborative shopping-list application built with TypeScript, Lit and Material Web Components. It uses Google Sheets as a configurable data source, a mock repository for development and a domain-oriented approach with TDD, Vercel deployment and optional Bugsnag observability.',
          stack: ['TypeScript', 'Lit', 'Material Web Components', 'Google Sheets', 'TDD'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/buy-buddies' },
          ],
        },
      ],
    },
};

export const projectHighlights = localizedProjects.es.items;
