import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

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
  const body = [...routes, ...blogRoutes].map((route) => `  <url><loc>${new URL(route, origin).toString()}</loc></url>`).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
