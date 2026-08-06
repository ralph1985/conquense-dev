import type { APIRoute } from 'astro';

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

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://conquense.dev');
  const body = routes.map((route) => `  <url><loc>${new URL(route, origin).toString()}</loc></url>`).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
