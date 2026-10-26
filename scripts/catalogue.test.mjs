import test from 'node:test';
import assert from 'node:assert/strict';
import { products, categories, productFilters } from '../src/data/products.ts';
import { formatPrice } from '../src/lib/catalogue.ts';

const expected = {
  'cikolatali-klasik-ekler': [['1 kg', 890]],
  'lotuslu-ekler': [['250 g', 290], ['500 g', 495], ['1 kg', 890]],
  'karisik-ekler': [['250 g', 290], ['500 g', 495], ['1 kg', 890]],
  'antep-fistikli-ekler': [['250 g', 290], ['500 g', 495], ['1 kg', 890]],
  'limonlu-ekler': [['250 g', 290], ['500 g', 495], ['1 kg', 890]],
  'frambuazli-ekler': [['250 g', null], ['500 g', 495], ['1 kg', 890]],
  'cilekli-ekler': [['250 g', 290], ['500 g', 495], ['1 kg', 890]],
  'findik-soslu-ekler': [['250 g', 290], ['500 g', 495], ['1 kg', 890]],
  'beyaz-cikolatali-ekler': [['250 g', 290], ['500 g', 495], ['1 kg', 890]],
  'krempuf-ekler': [['250 g', 290], ['500 g', 495]],
  'klasik-ekler': [['250 g', 290], ['500 g', 495]],
  'portakalli-ekler': [['250 g', 290], ['500 g', null]],
  'karisik-profiterol': [['250 g', 290], ['600 g', 550], ['750 g', 590], ['1 kg', 830], ['1,2 kg', 895], ['1,5 kg', 1250]],
  'callebaut-beyaz-cikolatali-profiterol': [['250 g', 290], ['500 g', 490], ['600 g', 550], ['750 g', 590], ['1 kg', 830], ['1,2 kg', 895], ['1,5 kg', 1250]],
  'callebaut-sutlu-cikolata-soslu-profiterol': [['250 g', 290], ['500 g', 490], ['600 g', 550], ['750 g', 590], ['1 kg', 830], ['1,2 kg', 895], ['1,5 kg', 1250]],
};
test('15 distinct products, 51 exact owner-supplied weight/price pairs', () => {
  assert.equal(products.length, 15);
  assert.equal(new Set(products.map(p => p.id)).size, 15);
  assert.equal(new Set(products.map(p => p.name)).size, 15);
  assert.equal(products.reduce((sum, p) => sum + p.variants.length, 0), 51);
  for (const product of products) {
    assert.deepEqual(product.variants.map(v => [v.weight, v.price]), expected[product.id], product.name);
    assert.equal(new Set(product.variants.map(v => v.weight)).size, product.variants.length);
    assert(categories.some(c => c.id === product.category));
  }
  assert.deepEqual(productFilters.map(c => c.count), [15, 12, 1, 1, 1]);
});
test('unknown prices remain unknown; Turkish currency is formatted correctly', () => {
  assert.equal(products.flatMap(p => p.variants).filter(v => v.price === null).length, 2);
  assert.equal(formatPrice(null), 'Fiyat doğrulanacak');
  assert.equal(formatPrice(1250), '1.250 TL');
});
test('mixed profiterole descriptions remain associated with the correct weight', () => {
  assert.deepEqual(products.find(p => p.id === 'karisik-profiterol').variants.map(v => v.description), [
    '5 adet profiterol topu, çikolata ve vanilya sosu', '12 adet profiterol, çikolata ve vanilya sosu',
    "15'li karışık profiterol, çikolata ve karamel sosu", "20'li karışık profiterol, çikolata ve vanilya sosu",
    '24 adet profiterol, çikolata ve karamel sosu', '1,5 kg olarak servis edilir',
  ]);
});
test('only verified image matches are used', () => {
  assert.deepEqual(products.filter(p => p.image).map(p => [p.id, p.image]), [
    ['cikolatali-klasik-ekler', 'cikolatali-klasik-ekler.png'],
    ['lotuslu-ekler', 'lotuslu-ekler.png'],
    ['karisik-ekler', 'karisik-ekler.png'],
    ['antep-fistikli-ekler', 'antep-fistikli-ekler.png'],
    ['limonlu-ekler', 'limonlu-ekler.png'],
    ['frambuazli-ekler', 'frambuazli-ekler.png'],
    ['cilekli-ekler', 'cilekli-ekler.png'],
    ['findik-soslu-ekler', 'findik-soslu-ekler.png'],
    ['beyaz-cikolatali-ekler', 'beyaz-cikolatali-ekler.png'],
    ['krempuf-ekler', 'krempuf-ekler.png'],
    ['klasik-ekler', 'ekler.jpg'], ['portakalli-ekler', 'portakalli-ekler.png'], ['karisik-profiterol', 'karisik-profiterol.jpg'],
    ['callebaut-beyaz-cikolatali-profiterol', 'beyaz-cikolatali-callebaut.png'],
    ['callebaut-sutlu-cikolata-soslu-profiterol', 'callebaut-profiterol.png'],
  ]);
});
