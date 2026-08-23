import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getBlogArchivePath, getBlogPageCount } from '@/data/blog';

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
  const origin = site ?? new URL('https://conquense.dev');
  const entries = await getCollection('blog');
  const blogRoutes = entries.map((entry) => `/${entry.data.lang === 'en' ? 'en/' : ''}blog/${entry.data.slug}/`);
  const archiveRoutes = (['es', 'en'] as const).flatMap((lang) => {
    const languageEntries = entries.filter((entry) => entry.data.lang === lang);
    const totalPages = getBlogPageCount(languageEntries);
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => getBlogArchivePath(lang, index + 2));
  });
  const body = [...routes, ...blogRoutes, ...archiveRoutes].map((route) => `  <url><loc>${new URL(route, origin).toString()}</loc></url>`).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
