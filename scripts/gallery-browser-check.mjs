import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, headless: true });
const base = process.env.TEST_URL || 'http://127.0.0.1:4321/';
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()}: ${response.url()}`); });
try {
  await mkdir('artifacts/review', { recursive: true });
  await page.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.shop-preview-grid img').count(), 3);
  await page.locator('.shop-preview-grid').screenshot({ path: 'artifacts/review/shop-preview.png' });
  for (const width of [1440, 1024, 901, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Home overflow ${width}`);
  }
  await page.goto(new URL('mekanimiz/', base).href, { waitUntil: 'networkidle' });
  const photos = page.locator('[data-gallery-photo]');
  assert.equal(await photos.count(), 9);
  for (const img of await photos.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(el => el.decode());
  }
  for (const width of [1440, 1024, 901, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Gallery overflow ${width}`);
  }
  const dialog = page.locator('.gallery-dialog');
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await photos.first().click();
    await page.waitForFunction(() => document.querySelector('.gallery-dialog').open);
    assert.equal(await page.locator('[data-gallery-counter]').textContent(), '1 / 9');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('[data-gallery-counter]').textContent(), '9 / 9');
    await page.locator('[data-gallery-next]').click();
    assert.equal(await page.locator('[data-gallery-counter]').textContent(), '1 / 9');
    await page.locator('[data-gallery-stage] img').evaluate(el => el.decode());
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      assert(await dialog.evaluate(el => el.contains(document.activeElement)), 'Modal focus escaped');
    }
    const box = await dialog.boundingBox();
    assert(box.x >= 0 && box.x + box.width <= width, 'Modal horizontal overflow');
    await page.screenshot({ path: `artifacts/review/gallery-modal-${width}.png` });
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('.gallery-dialog').open && !document.body.classList.contains('gallery-open'));
    assert(await photos.first().evaluate(el => el === document.activeElement));
  }
  await photos.nth(4).click();
  assert.equal(await page.locator('[data-gallery-counter]').textContent(), '5 / 9');
  await dialog.getByRole('button', { name: 'Kapat' }).click();
  await page.waitForFunction(() => !document.querySelector('.gallery-dialog').open);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(async () => { await document.fonts.ready; scrollTo({ top: 0, behavior: 'instant' }); });
    await page.screenshot({ path: `artifacts/review/gallery-${width}.png`, fullPage: true });
  }
  const nojs = await browser.newPage({ javaScriptEnabled: false });
  await nojs.goto(new URL('mekanimiz/', base).href);
  assert.equal(await nojs.locator('[data-gallery-photo] img').count(), 9);
  const imageURL = await nojs.locator('[data-gallery-photo]').first().getAttribute('href');
  const response = await nojs.request.get(new URL(imageURL, base).href);
  assert.equal(response.status(), 200);
  assert(response.headers()['content-type'].startsWith('image/'));
  assert.deepEqual(errors, []);
  console.log('PASS: nine photos decoded, responsive gallery/home, keyboard modal navigation and wrap, focus restoration, JS-free image access, no console or asset errors.');
} finally { await browser.close(); }
