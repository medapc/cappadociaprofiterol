import type { APIRoute } from 'astro';
import { products } from '../data/products';
import { getGalleryImages } from '../lib/gallery-images';
import { getPublication } from '../lib/seo';
const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
export const GET: APIRoute = async ({ site }) => {
  const { origin, indexable } = getPublication(site);
  let entries = '';
  if (indexable && origin) {
    const photos = await getGalleryImages();
    const paths = ['/', '/mekanimiz/', ...products.map(product => `/urunler/${product.id}/`)];
    entries = paths.map(path => {
      const images = path === '/mekanimiz/' ? photos : path === '/' ? photos.slice(0, 3) : [];
      return `<url><loc>${escapeXml(new URL(path, origin).href)}</loc>${images.map(photo => `<image:image><image:loc>${escapeXml(new URL(photo.full.src, origin).href)}</image:loc></image:image>`).join('')}</url>`;
    }).join('');
  }
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
