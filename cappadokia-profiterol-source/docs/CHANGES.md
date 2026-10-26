# Mekân fotoğrafları ve harita — 21 Ekim 2026

Dokuz kullanıcı fotoğrafı `src/assets/shop/` ve `src/data/gallery.ts` üzerinden eklendi. `ShopPreview.astro` ana sayfa seçkisini, `GalleryPhoto.astro` ortak fotoğraf bileşenini, `/mekanimiz/` tam galeriyi sunar. `gallery.ts` büyütme, klavye ve odak yönetimini ekler. Görseller responsive WebP olarak üretilir; yeni bağımlılık yoktur.

Layout, SEO yardımcıları ve sitemap; galeri paylaşım görseli, Bakery görselleri ve ImageGallery/ImageObject verileriyle güncellendi. İndekslenebilir üretim sitemap'i 17 sayfa ve dokuz benzersiz mekân görseli içerir. Önizleme noindex kalır.

Kullanıcının son isteğiyle Location.astro içindeki sağ konum kartı Google Maps iframe'iyle değiştirildi. İletişim metinleri, arama/WhatsApp ve diğer bölümler korundu. Kullanıcının paylaştığı kesin Google işletme kaydının harita/yol tarifi bağlantıları site.ts içinde, boyutları CSS'te yönetilir ve lazy yüklenir. Galeri ve harita kontrolleri mevcut testlere eklendi.

---

# Gel-al bilgisi — 21 Ekim 2026

Menüde, kategori filtrelerinin üstüne “Gel-al’da fiyatlar 130 TL daha uygun.” notu eklendi. Metin `src/data/site.ts` içindeki `pickupOffer` alanından yönetilir. Ürün/gramaj fiyatları ve yapılandırılmış veri fiyatları değiştirilmedi; otomatik indirim hesabı eklenmedi.

---

# İletişim güncellemesi — 20 Ekim 2026

Arama numarası +90 507 894 18 41 olarak değiştirildi. Umut Ceylan iletişim kişisi olarak eklendi. İletişim bölümünde ve mobil alt çubukta WhatsApp sipariş bağlantısı eklendi; yol tarifi korundu. Meta açıklaması, Schema.org telefon kaydı ve detay sayfalarındaki arama bağlantıları merkezi yapılandırmayı kullanır. Dahili sepet/ödeme eklenmedi.

---

# Görsel güncellemesi — 20 Ekim 2026

Dokuz kullanıcı görseli merkezi katalogla eşleştirildi. `src/assets/`, `src/data/products.ts`, `src/data/product-images.ts`, `ProductImage.astro` ve görsel yerleşimi güncellendi. Astro responsive WebP optimizasyonu ve lazy loading korunur. Dört üründe geçici görsel alanı kalır. Katalogdaki ürün detay bağlantıları önceki talep doğrultusunda kapalıdır.

---

# Katalog güncellemesi — 16 Ekim 2026

Mevcut Astro SSG, Tailwind CSS 4, tipografi, krem/çikolata paleti, hero, iletişim ve konum korunmuştur. Marka adı kullanıcı tercihiyle **Cappadokia Profiterol** olarak kalır. Yeni bağımlılık, sunucu, sepet veya ödeme eklenmedi.

## Değişen / eklenen kaynaklar

- `src/data/products.ts`: 15 ürün, 4 kategori, 51 gramaj; kullanıcıdan verilen fiyatlar, iki `null` fiyat ve gramaja özel açıklamalar. Çikolatalı Klasik Ekler / Klasik Ekler ayrı kayıtlardır.
- `src/data/product-images.ts`: mevcut fotoğrafları doğru ürünlere eşleyen ayrı harita. Klasik Ekler ve Karışık Profiterol dışındaki 13 ürün için fotoğraf ataması yapılmadı.
- `src/lib/catalogue.ts`: ortak Türkçe fiyat gösterimi.
- `src/components/Products.astro`, `ProductCard.astro`: mevcut katalog alanı genişletildi; yeniden kullanılabilir kartlar ve detay bağlantıları.
- `src/components/products/{ProductGrid,CategoryFilter,WeightSelector,ProductImage}.astro`: grid, filtre, erişilebilir native radio seçenekleri, fiyat/açıklama, JS'siz fiyat listesi ve geçici görsel alanları.
- `src/scripts/catalogue.ts`: sayfa yenilemeden filtreleme, URL ile filtre geçmişi, gramaj değişimi, sekme içi seçim hafızası, canlı bildirim, tek seferlik Intersection Observer görünümü.
- `src/pages/urunler/[id].astro`: 15 statik ürün detay sayfası; seçilen gramaj bağlantıya eklenir. Bilinen fiyatlar için Schema.org MenuItem/Offer; bilinmeyen fiyatlar şemada teklif oluşturmaz.
- `src/layouts/Layout.astro`, `src/pages/sitemap.xml.ts`: detay sayfası şeması, mevcut canonical/meta kurallarının korunması, üretimde 16 URL içeren sitemap.
- `src/components/Header.astro`, `src/scripts/menu.ts`: native menü korunarak hafif açılış/kapanış, Escape ve odak yönetimi, hızlı tekrar açma desteği.
- `src/styles/global.css`: tutarlı kart geometrisi, 44 px gramaj alanları, masaüstü hover, hafif fiyat/kart animasyonları, azaltılmış hareket desteği, detay sayfası.
- `scripts/catalogue.test.mjs`, `browser-check.mjs`, `verify-build.mjs`, `package.json`: tüm 51 eşleşme, null değerler, şema/bağlantılar, filtreler, geçmiş, mobil ve JS'siz kullanım testleri.
- README, ASSETS ve QA belgeleri güncellendi. Kaynak ve Cloudflare ZIP'leri yenilendi.

## Geçiş yaklaşımı

Statik sayfalar için CSS `@view-transition { navigation: auto; }` kullanılır. Destekleyen tarayıcılarda 260 ms fade; diğerlerinde normal bağlantı gezinmesi vardır. Astro ClientRouter eklenmedi: native geri/ileri geçmişi ve JS'siz linkler korunur. Gramaj animasyonu 220 ms, kart görünümü 360 ms, hover 250 ms, menü açılış/kapanışı 220/180 ms. Azaltılmış hareket tercihinde animasyonlar kapalıdır.

Kaynaklar: [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/), [MDN @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition).

## Yayın öncesi içerik

- Frambuazlı Ekler **250 g** ve Portakallı Ekler **500 g** fiyatlarını işletme doğrulamalı. Şimdilik ziyaretçiye “Fiyat doğrulanacak” gösterilir.
- 13 ürünün kendi fotoğrafı eksik. Geçici alanlar kullanılır; başka ürün fotoğrafı atanmaz.
- Gerçek alan adı gelince `SITE_URL` ve `SITE_INDEXABLE=true` ile yeniden üretim build'i alınmalı. Teslim edilen `dist` ve Cloudflare ZIP önizleme/noindex durumundadır.
- Kullanıcının verdiği Yemeksepeti bağlantısı korunur. Dış platformdaki işletme kaydı yayın öncesi kontrol edilmeli.
- Telefon/adres/saatler tamam; Instagram ve WhatsApp doğrulanmadığı için gösterilmez.
