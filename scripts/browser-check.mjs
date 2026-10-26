const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { products, productFilters } from '../src/data/products.ts';
import { formatPrice } from '../src/lib/catalogue.ts';
await mkdir('artifacts/review', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, headless: true });
const errors = [];
const base = process.env.TEST_URL || 'http://127.0.0.1:4321/';
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
page.on('console', message => {
  // Astro dev correctly serves the intentionally visited 404 page with status 404.
  const expected404 = message.location().url === new URL('404.html', base).href && message.text().includes('status of 404');
  if (message.type() === 'error' && !expected404) errors.push(message.text());
});
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('/404.html')) errors.push(`${response.status()}: ${response.url()}`); });
const menuClosed = () => page.waitForFunction(() => !document.querySelector('.mobile-menu').open);
try {
  assert.equal((await page.goto(base, { waitUntil: 'networkidle' })).status(), 200);
  for (const img of await page.locator('img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(el => el.decode()); }
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`);
  }
  // Data truth is checked independently by catalogue.test.mjs. Exercise every option in the browser.
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const product of products) {
    const panel = page.locator(`[data-product-id="${product.id}"]`);
    for (const variant of product.variants) {
      await panel.getByRole('radio', { name: variant.weight, exact: true }).check();
      assert.equal(await panel.locator('[data-variant-price]').textContent(), formatPrice(variant.price));
      assert.equal(await panel.locator('[data-variant-description]').textContent(), variant.description || product.description);
      const box = await panel.locator('.variant-summary').boundingBox();
      assert(box && box.width > 0);
    }
    const response = await page.request.get(new URL(`urunler/${product.id}/`, base).href);
    assert.equal(response.status(), 200, `${product.id}: detail route`);
  }
  for (const filter of productFilters.slice(1).concat(productFilters.slice(0, 1))) {
    await page.locator(`[data-filter="${filter.id}"]`).click();
    assert.equal(await page.locator('.product-card:visible').count(), filter.count);
  }
  // History restores filters and weight selection; detail routes remain directly accessible.
  await page.locator('[data-filter="karisik-profiterol"]').click();
  const mixed = page.locator('[data-product-id="karisik-profiterol"]');
  await mixed.getByRole('radio', { name: '750 g', exact: true }).check();
  assert.equal(await page.locator('.product-detail-link').count(), 0);
  await page.goto(new URL('urunler/karisik-profiterol/?gramaj=750%20g', base).href);
  await page.waitForURL('**/urunler/karisik-profiterol/**');
  assert.equal(new URL(page.url()).searchParams.get('gramaj'), '750 g');
  assert.equal(await page.locator('[data-variant-price]').textContent(), '590 TL');
  await page.getByRole('radio', { name: '1,2 kg', exact: true }).check();
  await page.goBack({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('.product-card:visible').count(), 1);
  assert.equal(await mixed.locator('[data-variant-price]').textContent(), '895 TL');
  await page.goForward({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('[data-variant-price]').textContent(), '895 TL');
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Detail overflow at ${width}`);
  }
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(a => a.finished.catch(() => {}))); scrollTo({ top: 0, behavior: 'instant' }); });
  await page.screenshot({ path: 'artifacts/review/detail-mobile.png', fullPage: true });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('[data-filter="ekler"]').click();
  await page.locator('[data-filter="beyaz-cikolatali-profiterol"]').click();
  await page.goBack();
  assert.equal(await page.locator('.product-card:visible').count(), 12);
  await page.goForward();
  assert.equal(await page.locator('.product-card:visible').count(), 1);
  await page.locator('[data-filter="all"]').click();
  // Native radios support keyboard arrows, including unknown-price options.
  const raspberry = page.locator('[data-product-id="frambuazli-ekler"]');
  await raspberry.getByRole('radio', { name: '250 g', exact: true }).check();
  await page.keyboard.press('ArrowRight');
  assert.equal(await raspberry.locator('[data-variant-price]').textContent(), '495 TL');
  await page.keyboard.press('ArrowLeft');
  assert.equal(await raspberry.locator('[data-variant-price]').textContent(), 'Fiyat doğrulanacak');
  // Reveal is one-shot; hover transforms are only enabled on fine-pointer desktop devices.
  const card = page.locator('.product-card').first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.product-card').classList.contains('is-revealed'));
  await page.waitForFunction(() => document.querySelector('.product-card').getAnimations().every(a => a.playState === 'finished'));
  await page.locator('#anasayfa').scrollIntoViewIfNeeded();
  await card.scrollIntoViewIfNeeded();
  assert(await card.evaluate(el => el.getAnimations().every(a => a.playState === 'finished')));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.locator('.mobile-menu summary').click();
  assert(await page.locator('.mobile-menu').evaluate(e => e.open));
  await page.keyboard.press('Escape');
  await menuClosed();
  assert(await page.locator('.mobile-menu summary').evaluate(el => el === document.activeElement));
  await page.locator('.mobile-menu summary').click();
  await page.locator('.mobile-menu a[href="#urunler"]').click();
  await menuClosed();
  assert.equal(await page.locator('a[href="tel:+905078941841"]').count(), 2);
  assert(await page.locator('.mobile-contact').isVisible());
  for (const target of await page.locator('.mobile-contact a, .filters button, .mobile-menu summary, .weight-options span').all()) {
    const box = await target.boundingBox(); assert(box && box.height >= 44 && box.width >= 44, 'Touch target below 44px');
  }
  assert.equal(await page.locator('a[href*="instagram"]').count(), 0);
  assert.equal(await page.locator('a[href="https://wa.me/905078941841"]').count(), 2);
  assert(await page.locator('.contact-person').textContent().then(text => text.includes('Umut Ceylan')));
  assert.equal(await page.locator('a[href*="yemeksepeti.com"]').count(), 2);
  assert.equal(await page.locator('.hours-row').count(), 7);
  const mapsUrl = await page.locator('.header-direction').getAttribute('href');
  assert(mapsUrl.includes('google.com/maps/dir/') && mapsUrl.includes('destination='));
  const map = page.locator('.location-map iframe');
  assert.equal(await map.count(), 1);
  const embedURL = new URL(await map.getAttribute('src'));
  assert.equal(embedURL.hostname, 'www.google.com');
  assert.equal(embedURL.searchParams.get('output'), 'embed');
  assert.equal(embedURL.searchParams.get('cid'), '16883094759500540193');
  assert(mapsUrl.includes('destination_place_id=ChIJFXkbTwBvKhURIelJuTvNTOo'));
  assert.equal(await map.getAttribute('loading'), 'lazy');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  await mixed.getByRole('radio', { name: '600 g', exact: true }).check();
  assert.equal(await page.locator('.variant-summary').evaluateAll(els => els.flatMap(el => el.getAnimations()).length), 0);
  assert.equal(await card.evaluate(el => getComputedStyle(el).animationName), 'none');
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert(await page.locator('.skip-link').evaluate(el => el === document.activeElement));
  await page.keyboard.press('Enter');
  assert.equal(new URL(page.url()).hash, '#icerik');
  await page.goto(base);
  await page.locator('.mobile-menu summary').focus();
  await page.keyboard.press('Enter');
  assert(await page.locator('.mobile-menu').evaluate(el => el.open));
  await page.keyboard.press('Escape');
  await menuClosed();
  // Fresh screenshots show default weights, without persisted QA selections.
  await page.evaluate(() => sessionStorage.clear());
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.activeElement?.blur(); scrollTo({ top: 0, behavior: 'instant' }); });
  await page.screenshot({ path: 'artifacts/review/mobile.png', fullPage: true });
  await page.locator('#urunler').screenshot({ path: 'artifacts/review/catalogue-mobile.png' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: 'artifacts/review/desktop.png', fullPage: true });
  await page.locator('#urunler').screenshot({ path: 'artifacts/review/catalogue-desktop.png' });
  const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await nojs.goto(base);
  assert.equal(await nojs.locator('.product-card:visible').count(), 15);
  assert.equal(await nojs.locator('.filters:visible').count(), 0);
  await nojs.locator('.mobile-menu summary').click();
  assert(await nojs.locator('.mobile-menu nav').isVisible());
  for (const panel of await nojs.locator('.variant-fallback').all()) await panel.locator('summary').click();
  assert.equal(await nojs.locator('.variant-fallback dt:visible').count(), 51);
  await nojs.goto(new URL('urunler/karisik-profiterol/', base).href);
  await nojs.locator('.variant-fallback summary').click();
  assert.equal(await nojs.locator('.variant-fallback dt:visible').count(), 6);
  await page.goto(new URL('404.html', base).href);
  assert.equal(await page.locator('a[href="/#anasayfa"]').count(), 3);
  await page.locator('.footer-bottom a').click();
  assert.equal(new URL(page.url()).pathname, '/');
  assert.deepEqual(errors, []);
  console.log('PASS: 51 variants, 15 detail routes, 4 category filters, back/forward + selection persistence, keyboard, 5 responsive widths, touch targets, one-shot/reduced motion, JS-free 51-price fallback, contact links, no console/asset errors.');
} finally { await browser.close(); }
