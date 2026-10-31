# Cappadokia Profiterol

Mevcut Astro 6 / Tailwind CSS 4 kurumsal sitesi üzerinde geliştirilmiştir. Statik HTML üretir; dahili sepet, ödeme, hesap veya sunucu yoktur. Telefon, WhatsApp, Google Maps ve kullanıcının verdiği Yemeksepeti sayfasına yönlendirir.

## Başlatma

Node.js 22.12+ veya 24 LTS kullanın. Projede yeni bağımlılık eklenmedi; `pnpm-lock.yaml` korunmuştur.

```sh
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

Önizleme: `http://localhost:4321`. Üretim çıktısı: `dist/`.

```sh
pnpm test             # katalog ve yayın yapılandırması testleri
pnpm check            # Astro / TypeScript
pnpm verify           # test + tip denetimi + build + çıktı/link/SEO kontrolleri
pnpm preview          # dist/ önizlemesi
pnpm build:production # gerçek domain + indeksleme ayarını zorunlu kılan yayın build'i
```

npm tercih edilirse `npm install`, `npm run verify`, `npm run dev` çalışır. npm'e geçerken oluşan kilit dosyasını sürüm kontrolüne alın ve tek paket yöneticisi kullanın.

## İçerik ve mimari

```text
astro.config.mjs           SSG, Tailwind Vite, SITE_URL, küçük CSS'nin inline sunumu
tailwind.config.mjs        Tailwind v4 @config; font ailesi eşleştirmeleri
config/publication.mjs     HTTPS origin ve indeksleme doğrulaması
src/
  data/site.ts             isim, açıklama, telefon, adres, saatler, dış bağlantılar
  data/products.ts         tipli ürün kataloğu, kategoriler, hesaplanan filtre sayıları
  data/product-images.ts   yalnızca doğrulanmış ürün/fotoğraf eşleşmeleri
  data/gallery.ts          dokuz mekân fotoğrafı, başlıklar ve alternatif metinler
  lib/gallery-images.ts    ortak responsive WebP çıktıları
  scripts/gallery.ts       native dialog ile fotoğraf büyütme ve klavye gezinmesi
  lib/catalogue.ts         ortak Türkçe fiyat biçimi
  scripts/catalogue.ts     gramaj, filtre, geçmiş ve görünüm davranışları
  scripts/menu.ts          hafif native menü animasyonu
  lib/seo.ts               doğrulanmış Bakery verisi ve ortak yayın durumu
  layouts/Layout.astro     meta, canonical, OG/Twitter, font preload, mobil iletişim
  components/
    Header.astro           native details mobil menü, klavye ve odak yönetimi
    Hero.astro             korunan kemerli ana görsel; AVIF/WebP, yüksek öncelik
    About.astro            marka hikâyesi
    ShopPreview.astro      ana sayfadaki üç mekân fotoğrafı
    GalleryPhoto.astro     ortak fotoğraf/başlık bileşeni
    Products.astro         kategori filtreleri, erişilebilir sonuç bildirimi
    ProductCard.astro      tipli ve yeniden kullanılabilir ürün kartı
    products/              ProductGrid, CategoryFilter, WeightSelector, ProductImage
    Hours.astro            merkezi veriden yedi günlük saatler
    Location.astro         telefon, adres, harita ve Yemeksepeti
    Footer.astro           marka ve gezinme; olmayan sosyal hesaplar gösterilmez
    MobileContact.astro    JS gerektirmeyen sabit arama/yol tarifi çubuğu
    ExternalLink.astro     güvenli yeni sekme ve ekran okuyucu açıklaması
    Logo.astro, Icon.astro mevcut görsel kimlik
  pages/
    index.astro, 404.astro
    mekanimiz.astro        dokuz fotoğraflı statik galeri
    urunler/[id].astro      15 ürün için statik detay sayfaları
    robots.txt.ts, sitemap.xml.ts
  styles/global.css        ortak renk/radius tokenları, responsive düzen, odak/hareket
  assets/                  yerel görseller; kullanılmayan eski örnekler build'e alınmaz
public/
  logo.png, favicon.png, og-image.jpg, _headers, _redirects
scripts/
  publication.test.mjs     yapılandırma testleri
  catalogue.test.mjs       15 ürün / 51 gramaj / null fiyat regresyonları
  check-production.mjs     yayın öncesi domain ve indeksleme kontrolü
  verify-build.mjs         statik çıktı, linkler ve SEO tutarlılığı
  browser-check.mjs        tarayıcı regresyon kontrolleri
```

## Doğrulanmış işletme bilgileri

- **Cappadokia Profiterol**
- **+90 507 894 18 41**, E.164: `+905078941841`. İletişim: **Umut Ceylan**. Telefon ve WhatsApp üzerinden sipariş alınabilir.
- **Emek Mahallesi, Emek Toplu Konut Yapı Küme Evleri, A3 Blok, Dükkan 35, Nevşehir/Merkez**.
- **Her gün 08.30–23.00**. `dailyHours` düzenlendiğinde haftalık liste ve hero özeti birlikte değişir. Farklı günler için `hours` satırlarını düzenleyebilirsiniz; `closed` kapalı, `null` bilinmeyen saat içindir.
- Instagram gösterilmez. WhatsApp numarası 20 Ekim 2026 tarihinde kullanıcı tarafından doğrulandı; `wa.me/905078941841` bağlantısı iletişim alanında ve mobil alt çubukta yer alır.
- Yemeksepeti linki kullanıcıdan alınmıştır. Dış platformun gösterdiği **İstanbul Profiterol** adı, adresi ve saatleri kullanıcının işletme bilgileriyle aynı değildir. Site sahibinin istediği URL korundu; platformdaki kaydın güncellenmesi/ilişkisi yayın öncesi kontrol edilmelidir.

Katalog, kullanıcının 16 Ekim 2026 tarihinde verdiği 15 ürün ve 51 gramaj/fiyat kaydından oluşur. İki bilinmeyen fiyat `null` tutulur. Klasik Ekler ve Karışık Profiterol mevcut görsellerini kullanır; 20 Ekim 2026 tarihinde kullanıcıdan gelen dokuz ekler görseli eklendi. Karışık Ekler ve Portakallı Ekler görselleri de eklendi; Callebaut Sütlü Çikolata Soslu Profiterol görseli de tamamlandı. Callebaut Beyaz Çikolatalı Profiterol görseliyle birlikte 15 ürünün tamamının görselleri tamamlandı. Hero ve hikâye görseli temsili AI görselidir. Kaynaklar: [docs/ASSETS.md](docs/ASSETS.md).

Schema.org `Bakery` işletme adı, kullanıcıdan gelen telefon/adres/saatler, adres bazlı harita URL'si, yapılandırılmış site URL'si ve kullanıcı tarafından sağlanan üç mekân görselini içerir. Uydurma koordinat, yorum, puan, fiyat aralığı, sosyal profil veya kuruluş tarihi yoktur. 404 sayfasına işletme şeması/canonical eklenmez.

## Yayın ve önizleme ayarları

`.env.example` dosyasını `.env` olarak kopyalayın veya Cloudflare ortam değişkenlerini kullanın:

```dotenv
SITE_URL=https://GERCEK-ALAN-ADINIZ
SITE_INDEXABLE=true
```

`SITE_URL`, yol veya sorgu içermeyen tam HTTPS origin olmalıdır. `.env` yerel config tarafından okunur; CI ortam değişkenleri önceliklidir. `https://example.com` geçerli yayın alanı değildir ve reddedilir. Yerel önizleme için `SITE_URL` boş, `SITE_INDEXABLE=false` bırakın.

- Production: gerçek `SITE_URL`, `SITE_INDEXABLE=true` → canonical, OG URL, JSON-LD URL, açık robots ve ana sayfa + galeri + 15 detay sayfasını içeren sitemap (17 URL ve dokuz benzersiz mekân görseli).
- Preview: `SITE_INDEXABLE=false` → noindex, kapalı robots, boş sitemap. Production URL yapılandırılmışsa canonical onu gösterir.
- Domain olmadan indeksleme açılmaya çalışılırsa build hata verir.
- `pnpm build:production`, eksik/domain test ayarlarıyla yanlışlıkla yayına çıkmayı önler.
- Eski `site.demo` bayrağı kaldırıldı. İndeksleme artık ürün metnine bağlı değildir.

## Cloudflare Pages

Git deposunu Cloudflare Pages'e bağlayın. Framework: **Astro**, output: **dist**, Node: **22** (22.12+), `PNPM_VERSION=11.25.0`.

Production build command: **`pnpm build:production`**. Production ortamına `SITE_URL` ve `SITE_INDEXABLE=true` ekleyin. Preview ortamında `SITE_INDEXABLE=false` ve build command **`pnpm build`** kullanın; Cloudflare'ın ortak build command alanında iki akışı seçmek için aşağıdaki komutu kullanabilirsiniz; `main` yerine projenizin production branch adını yazın:

```sh
if [ "$CF_PAGES_BRANCH" = "main" ]; then pnpm build:production; else SITE_INDEXABLE=false pnpm build; fi
```

Kaynaklar: [Astro on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [branch build commands](https://developers.cloudflare.com/pages/how-to/build-commands-branches/).

Direct Upload seçilirse `pnpm build:production` sonrası yalnızca `dist/` içeriğini yükleyin. SSR adaptörü gerekmez. `_headers` ve `_redirects` köke kopyalanır; hash gezinmesi için SPA fallback gerekmez. Gerçek `404.html` korunur.

Alan adı verilmediği için teslim edilen `dist/` ve ZIP **önizleme ayarındadır**. Doğrudan herkese açık yayın için yukarıdaki ortamla yeniden build alın. Gerçek alan adı yerine test raporundaki `.test` adresini kullanmayın.

## Performans ve erişilebilirlik

Renkler `global.css` içindeki Tailwind v4 `@theme` tokenlarında, font eşleştirmeleri `tailwind.config.mjs` içinde tutulur. Mobil temel grid üzerine masaüstü kolonları eklenir; mevcut premium krem/çikolata düzen korunur. Yardımcı metinler büyütüldü. Etkileşimlerde 44 px ve üzeri dokunma alanı hedeflenir; mobil alt çubuk safe-area boşluğu bırakır.

Hero öncelikli AVIF/WebP, diğer görseller lazy WebP. Bütün fontlar yerel, Türkçe karakter destekli ve swap modundadır. Gereksiz 600 ağırlığı kaldırıldı; başlık fontu preload edilir. Harici font, izleme kodu veya framework runtime yoktur. Konum alanındaki Google Maps iframe'i lazy yüklenir; Google'ın harita içeriği ve ağ istekleri üçüncü taraf hizmetidir. Küçük yerel scriptler filtre, gramaj, menü ve tek seferlik kart görünümünü yönetir. Sayfalar Astro SSG ile HTML olarak üretilir.

Native mobil menü JS kapalıyken de çalışır; filtre JS'i yoksa bütün ürünler görünür; her kartta açılabilir tam gramaj/fiyat listesi bulunur. Escape, görünür odak, içeriğe geçiş, canlı filtre sonucu, azaltılmış hareket ve dış bağlantı açıklamaları desteklenir. WCAG 2.2 AA hedeflenir; otomatik puan tam uygunluk sertifikası değildir.

## Tarayıcı ve Lighthouse

Tarayıcı testleri isteğe bağlı geliştirme araçlarıyla çalışır; üretim bağımlılığı eklenmedi. Sistemde Playwright ve Chromium varsa:

```sh
pnpm preview
# ayrı terminal; varsayılan hedef http://127.0.0.1:4321/
pnpm test:browser
```

Gerekirse `PLAYWRIGHT_MODULE` (kurulu modülün dosya URL'si/absolute yolu), `CHROME_PATH` ve `TEST_URL` değişkenlerini belirtin. Testler menüyü, filtreleri, beş viewport'u, dokunma alanlarını, JS'siz gezinmeyi, klavyeyi, konsol/asset hatalarını ve 404 dönüşünü kontrol eder.

Lighthouse örneği: `lighthouse http://127.0.0.1:4321/ --chrome-flags="--headless" --output=html --output=json --output-path=artifacts/lighthouse`.

En son ölçümler ve sınırlar: [docs/QA.md](docs/QA.md). Gerçek cihaz INP ve saha LCP/CLS verileri için yayından sonra ölçüm gerekir; laboratuvar TBT sonucu INP yerine geçmez.

## Ürün ve gramaj düzenleme

`src/data/products.ts` içindeki ilgili `variants` satırında fiyatı sayısal TL olarak düzenleyin. Bilinmeyen değer **null** olmalı; `0` veya tahmini fiyat kullanmayın. Gramaja özel `description`, ana ürün açıklamasının yerine gösterilir. Kategoriler ve filtre sayıları aynı veri üzerinden üretilir. Ürün `id` değerleri kalıcı URL oluşturur; değiştirilirse eski URL için yönlendirme ekleyin.

Yeni fotoğrafı `src/assets/` altına koyup `product-images.ts` haritasına ekleyin, üründeki `image` alanına aynı anahtarı yazın. Eşleşme doğrulanmadıysa `image: null` bırakın. Çikolatalı Klasik Ekler ve Klasik Ekler, işletme doğrulayana kadar ayrı tutulmalıdır.

Gramaj seçimi sekme içi `sessionStorage` ile korunur; paylaşılabilir detay bağlantısı `?gramaj=` parametresini taşır. Filtre `?kategori=` parametresini kullanır ve geri/ileri gezinmeye katılır. Canonical adresler sorgu parametrelerini içermez. Depolama kapalıyken temel seçim ve bağlantılar çalışmaya devam eder.

Detay sayfalarında Schema.org `MenuItem` ve yalnızca bilinen fiyatlara ait `Offer` kayıtları vardır; stok, puan veya besin değeri üretilmez. Native sayfa geçişleri destekleyen tarayıcılarda 260 ms fade kullanır; diğerlerinde standart bağlantılar çalışır. `prefers-reduced-motion` tercihi tüm animasyonları kapatır.

Değişiklik listesi ve eksikler: [docs/CHANGES.md](docs/CHANGES.md).


## Mekân galerisi ve Google Görseller

`/mekanimiz/` sayfasında dokuz fotoğraf vardır. Ana sayfanın “Mekânımız” bölümü üç fotoğraflık seçki sunar. `src/data/gallery.ts` başlıkları ve alternatif metinleri yönetir. PNG kaynakları `src/assets/shop/` altında saklanır; ziyaretçilere 360/640/960 px ve en fazla 1440 px WebP sürümleri gönderilir. Galeri native dialog ile büyütme, önceki/sonraki, ok tuşları, Escape ve odak dönüşü sağlar; JS kapalıyken fotoğraf bağlantısı çalışır.

Gerçek alan adıyla indekslenebilir build alındığında görsel site haritası, ImageGallery/ImageObject ve Bakery görsel URL'leri üretilir. Açıklayıcı dosya adları, alt metinler, görünür başlıklar ve standart img/src bağlantıları kullanılır. Yerel önizleme Google tarafından taranamaz. Yayından sonra Search Console üzerinden sitemap gönderilebilir; Google'ın tarama ve indeksleme kararı garanti edilemez. Web sitesine eklemek, Google İşletme Profili/Haritalar fotoğraflarına otomatik yükleme yapmaz.

Kaynaklar: [Google görsel SEO rehberi](https://developers.google.com/search/docs/appearance/google-images), [görsel site haritaları](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).

Galeri tarayıcı kontrolü: `node scripts/gallery-browser-check.mjs` (diğer tarayıcı testiyle aynı PLAYWRIGHT_MODULE, CHROME_PATH ve TEST_URL ayarları).

Konum kartı yerinde yalnızca gömülü Google haritası görünür. Harita ve yol tarifi, kullanıcının 21 Ekim'de verdiği https://maps.app.goo.gl/6NutAov7T9cRAScW9 kaydına bağlanır. Merkezi `site.mapEmbedUrl` CID'yi, yol tarifi Place ID'yi kullanır. Google kaydında ad hâlâ İstanbul Profiterol ve telefon eski sabit numaradır; harita içindeki bu bilgiler Google İşletme Profili üzerinden güncellenmelidir. Sitedeki Cappadokia adı ve yeni telefon korunur.
