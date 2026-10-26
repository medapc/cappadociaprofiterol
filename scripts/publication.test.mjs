import test from 'node:test';
import assert from 'node:assert/strict';
import { publication } from '../config/publication.mjs';

test('local preview cannot advertise an invented canonical domain', () => {
  assert.deepEqual(publication(undefined), { origin: undefined, indexable: false });
  assert.throws(() => publication(undefined, true), /requires SITE_URL/);
});
test('configured preview and production share a canonical but differ in indexing', () => {
  const preview = publication('https://cappadokia.test', false);
  const production = publication('https://cappadokia.test', true);
  assert.equal(preview.origin.href, production.origin.href);
  assert.equal(preview.indexable, false);
  assert.equal(production.indexable, true);
});
test('invalid publication URLs fail instead of leaking into SEO metadata', () => {
  for (const url of ['https://example.com', 'http://cappadokia.test', 'https://user:secret@cappadokia.test', 'https://cappadokia.test/path', 'https://cappadokia.test?x=1', 'https://cappadokia.test#menu', 'invalid']) {
    assert.throws(() => publication(url, true), undefined, url);
  }
});
