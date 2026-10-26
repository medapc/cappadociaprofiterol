import type { APIRoute } from 'astro';
import { getPublication } from '../lib/seo';
export const GET: APIRoute = ({ site }) => {
  const { origin, indexable } = getPublication(site);
  return new Response(indexable && origin ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', origin)}\n` : 'User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
