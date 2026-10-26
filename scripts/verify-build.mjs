import { products } from '../src/data/products.ts';
import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';

const directory = process.argv[2] || 'dist';
const html = await readFile(`${directory}/index.html`, 'utf8');
for (const id of ['icerik', 'anasayfa', 'hakkimizda', 'mekanimiz', 'urunler', 'saatler', 'konum']) {
  assert(html.includes(`id="${id}"`), `Missing section: ${id}`);
}
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one primary heading');
assert(html.includes('lang="tr"'), 'Turkish language metadata');
assert(html.includes('tel:+905078941841'), 'Confirmed phone is clickable');
assert(!/instagram/i.test(html), 'Unverified Instagram must not appear');
assert(html.includes('https://wa.me/905078941841'), 'Confirmed WhatsApp is linked');
assert(html.includes('Umut Ceylan'), 'Confirmed contact name is visible');
assert(!html.includes('903845025511') && !html.includes('0384 502 55 11'), 'Old phone removed');
assert(html.includes('https://www.yemeksepeti.com/restaurant/e9nu/istanbul-profiterol'), 'Owner-supplied vendor link');
assert(!/Çikolatalı Kek|Meyveli Cheesecake|Örnek koleksiyon/.test(html), 'Unconfirmed example products removed');
assert(html.includes('fetchpriority="high"'), 'Prioritize hero image');
assert(html.includes('srcset='), 'Responsive image variants');
assert(!html.includes('images.unsplash.com'), 'Images must be self-hosted');
const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
assert(json, 'JSON-LD exists');
const schema = JSON.parse(json);
assert.equal(schema['@type'], 'Bakery');
assert.equal(schema.telephone, '+905078941841');
assert.equal(schema.openingHoursSpecification.length, 7);
assert(schema.openingHoursSpecification.every(day => day.opens === '08:30' && day.closes === '23:00'));
for (const file of ['404.html', 'robots.txt', 'sitemap.xml', '_headers', '_redirects', 'og-image.jpg']) await access(`${directory}/${file}`);
console.log('Build verified: sections, contact links, responsive local images, metadata, seven-day hours, Cloudflare assets.');

assert.equal(schema.address.addressRegion, 'Nevşehir');
assert(!('geo' in schema) && !('aggregateRating' in schema) && !('priceRange' in schema));
const isIndexable = html.includes('content="index, follow"');
const robots = await readFile(`${directory}/robots.txt`, 'utf8');
const sitemap = await readFile(`${directory}/sitemap.xml`, 'utf8');
const notFound = await readFile(`${directory}/404.html`, 'utf8');
assert(notFound.includes('content="noindex, follow"'));
assert(!notFound.includes('application/ld+json'), '404 must not identify itself as the business');
if (isIndexable) {
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical?.startsWith('https://'));
  assert(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
  assert(sitemap.includes(`<loc>${canonical}</loc>`));
  assert.equal(schema.url, canonical);
} else {
  assert(robots.includes('Disallow: /'));
  assert(!sitemap.includes('<loc>'));
}
for (const [name, document] of [['index.html', html], ['404.html', notFound]]) {
  for (const [, href] of document.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('#')) assert(document.includes(`id="${href.slice(1)}"`), `${name}: missing ${href}`);
    if (href.startsWith('/#')) assert(html.includes(`id="${href.slice(2)}"`), `${name}: missing ${href}`);
    if (href.startsWith('/') && !href.startsWith('/#') && href !== '/') await access(`${directory}${href.split('#')[0]}`);
  }
}
console.log(`SEO/link checks passed (${isIndexable ? 'production' : 'preview'}): canonical/robots/sitemap agree; no unverified claims or broken local anchors.`);

for (const product of products) {
  const detail = await readFile(`${directory}/urunler/${product.id}/index.html`, 'utf8');
  assert.equal((detail.match(/<h1\b/g) || []).length, 1);
  assert(detail.includes(product.name));
  assert(detail.includes('data-product-detail'));
  const schemas = [...detail.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const menuItem = schemas.find(schema => schema['@type'] === 'MenuItem');
  assert(menuItem, `${product.id}: menu schema missing`);
  assert.deepEqual(menuItem.offers.map(offer => offer.price), product.variants.filter(v => v.price !== null).map(v => v.price));
  assert(menuItem.offers.every(offer => offer.priceCurrency === 'TRY'));
  assert(!detail.includes('tel:[object'));
  if (isIndexable) {
    const canonical = detail.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert(canonical?.endsWith(`/urunler/${product.id}/`));
    assert(sitemap.includes(`<loc>${canonical}</loc>`));
    assert.equal(menuItem.url, canonical);
  }
  for (const [, href] of detail.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('#')) assert(detail.includes(`id="${href.slice(1)}"`));
    else if (href.startsWith('/#')) assert(html.includes(`id="${href.slice(2)}"`));
    else if (href.startsWith('/') && href !== '/') await access(`${directory}${href.split('#')[0]}`);
  }
}
assert.equal((html.match(/class="product-card"/g) || []).length, 15);
if (isIndexable) assert.equal((sitemap.match(/<loc>/g) || []).length, 17);
console.log('Catalogue verified: 15 static details, known-price offers only, all local links, complete sitemap.');

const gallery = await readFile(`${directory}/mekanimiz/index.html`, 'utf8');
assert.equal((gallery.match(/data-gallery-photo="\d+"/g) || []).length, 9);
assert.equal((gallery.match(/<h1\b/g) || []).length, 1);
assert.equal((html.match(/class="gallery-photo"/g) || []).length, 3);
const gallerySchemas = [...gallery.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const imageGallery = gallerySchemas.find(schema => schema['@type'] === 'ImageGallery');
assert(imageGallery);
for (const [, href] of gallery.matchAll(/href="([^"]+)"/g)) {
  if (href.startsWith('/#')) assert(html.includes(`id="${href.slice(2)}"`));
  else if (href.startsWith('#')) assert(gallery.includes(`id="${href.slice(1)}"`));
  else if (href.startsWith('/') && href !== '/') await access(`${directory}${href.split('#')[0]}`);
}
for (const [, id] of html.matchAll(/href="\/mekanimiz\/#([^"]+)"/g)) assert(gallery.includes(`id="${id}"`));
const imageUrls = [...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(match => match[1]);
if (isIndexable) {
  assert.equal(imageUrls.length, 12, 'Three preview images and nine gallery images');
  assert.equal(new Set(imageUrls).size, 9);
  assert.equal(imageGallery.image.length, 9);
  assert.equal(schema.image.length, 3);
  for (const image of imageGallery.image) {
    assert(image.contentUrl.startsWith('https://'));
    assert(image.width > 0 && image.height > 0);
    const path = new URL(image.contentUrl).pathname;
    await access(`${directory}${path}`);
    assert(gallery.includes(`src="${path}"`), 'Sitemap/schema image has an HTML src fallback');
    assert(imageUrls.includes(image.contentUrl));
  }
  assert(gallery.includes(`rel="canonical" href="${imageGallery.url}"`));
  assert(sitemap.includes(`<loc>${imageGallery.url}</loc>`));
} else {
  assert.equal(imageUrls.length, 0, 'Preview image sitemap stays empty');
  assert(gallery.includes('content="noindex, follow"'));
}
console.log('Gallery verified: nine crawlable photos, preview links, ImageGallery data, image sitemap and local files.');
