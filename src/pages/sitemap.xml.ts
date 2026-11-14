import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config/site';
import { getLocalNewsEntries, getNewsArchivePath, getNewsLocalArchivePath } from '@/data/news';

const routes = [
  '/',
  '/en/',
  '/proyectos/',
  '/en/projects/',
  '/experiencia/',
  '/en/experience/',
  '/otra-forma-de-mirar/',
  '/en/another-way-of-looking/',
  '/aviso-legal/',
  '/en/legal-notice/',
  '/politica-privacidad/',
  '/en/privacy-policy/',
  '/politica-cookies/',
  '/en/cookie-policy/',
];

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL(siteConfig.canonical);
  const entries = await getCollection('news');
  const newsRoutes = entries.map((entry) => `${getNewsArchivePath(entry.data.lang, 1)}${entry.data.slug}/`);
  const archiveRoutes = (['es', 'en'] as const).flatMap((lang) => [
    getNewsArchivePath(lang, 1),
    ...(getLocalNewsEntries(entries.filter((entry) => entry.data.lang === lang)).length > 0 ? [getNewsLocalArchivePath(lang, 1)] : []),
  ]);
  const body = [...routes, ...newsRoutes, ...archiveRoutes].map((route) => `  <url><loc>${new URL(route, origin).toString()}</loc></url>`).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
