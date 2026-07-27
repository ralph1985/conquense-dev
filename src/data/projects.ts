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
      subtitle: 'Trabajo representativo en banca digital, mobile commerce, booking y herramientas internas.',
      description:
        'Una selección cuidada de proyectos públicos y trabajo representativo, con cada repositorio de GitHub revisado antes de incorporarlo.',
      items: [
        {
          name: 'Jucart',
          context: 'Proyecto personal y familiar',
          role: 'Producto, arquitectura frontend y desarrollo asistido por IA',
          summary:
            'Jucart empezó como una lista de compra privada para sustituir la pizarra de la nevera: añadir productos y tacharlos sin complicaciones. A partir de esa necesidad mínima creció por capas: funcionamiento offline para usarla en el supermercado, Supabase para compartirla entre dispositivos y una bandeja de tickets que Codex procesa para extraer líneas y construir histórico de precios. La herramienta conserva la sencillez de uso mientras permite explorar ideas técnicas más ambiciosas.',
          highlights: [
            'Una necesidad doméstica convertida en producto.',
            'Offline first con Dexie e IndexedDB.',
            'Sincronización compartida con Supabase.',
            'Tickets y precios procesados con Codex.',
          ],
          stack: ['React', 'TypeScript', 'Vite', 'SCSS Modules', 'Dexie', 'Supabase', 'PWA', 'Codex', 'Playwright'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/jucart' },
            { label: 'Demo', href: 'https://jucart-rosy.vercel.app' },
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
            { label: 'Demo', href: 'https://buy-buddies.vercel.app' },
          ],
        },
      ],
    },
  en: {
      eyebrow: 'Projects',
      title: 'Projects',
      subtitle: 'Representative work in digital banking, mobile commerce, booking and internal tools.',
      description:
        'A living selection of public projects and representative work. GitHub repositories are reviewed one by one before being added.',
      items: [
        {
          name: 'Jucart',
          context: 'Personal and family project',
          role: 'Product, frontend architecture and AI-assisted development',
          summary:
            'Jucart started as a private shopping list to replace the whiteboard on the fridge: add products and cross them off without friction. From that small need it grew in layers: offline use for shopping, Supabase to share it across devices and a ticket inbox that Codex processes to extract lines and build price history. The tool keeps its simple user experience while making room for more ambitious technical ideas.',
          highlights: [
            'A household need turned into a product.',
            'Offline first with Dexie and IndexedDB.',
            'Shared synchronisation with Supabase.',
            'Tickets and prices processed with Codex.',
          ],
          stack: ['React', 'TypeScript', 'Vite', 'SCSS Modules', 'Dexie', 'Supabase', 'PWA', 'Codex', 'Playwright'],
          links: [
            { label: 'GitHub', href: 'https://github.com/ralph1985/jucart' },
            { label: 'Demo', href: 'https://jucart-rosy.vercel.app' },
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
            'Draft professional website built with Astro, TypeScript and SCSS. The base is prepared for static deployment on Vercel and covers technical SEO, canonical URLs, Open Graph, sitemap, robots, living planning and work tracking.',
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
            'Mobile web application for shared lottery ticket management, groups, receipts, results and balance movements. Built with Next.js, TypeScript, Prisma, Postgres and file storage, with an internal API for tickets, results, prizes and backups.',
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
            { label: 'Demo', href: 'https://buy-buddies.vercel.app' },
          ],
        },
      ],
    },
};

export const projectHighlights = localizedProjects.es.items;
