# Galeri ve harita kontrolü — 21 Ekim 2026

- Dokuz mekân fotoğrafı doğru başlıklarla eşleşti; ana sayfada üç fotoğraflık seçki ve `/mekanimiz/` galerisi var. Responsive WebP çıktıları, gerçek img/src, alt metin ve sabit boyutlar doğrulandı.
- Yedi veri/yayın testi geçti. Astro/TypeScript: 0 hata, 0 uyarı. Önizleme ve üretim test kopyasında build/bağlantı/SEO kontrolleri geçti. Sitemap 17 URL, dokuz benzersiz fotoğraf; ImageGallery dokuz, Bakery üç görsel içeriyor.
- Chrome galeri testi: dokuz görsel decode, 320/390/768/901/1024/1440 px taşma kontrolü, büyütme, önceki/sonraki ve başa sarma, ok tuşları, Tab odağı, Escape/Kapat ve odak dönüşü, JS kapalıyken görsele erişim geçti.
- Mevcut 51 gramaj/15 ürün/kategori/geçmiş/klavye/iletişim regresyonları geçti. Konsol ve yerel varlık hatası bulunmadı.
- Kullanıcının paylaştığı Google Maps bağlantısı İstanbul Profiterol kaydına açılıyor; A3 Blok Dükkan 35 adresi doğrulandı. CID 16883094759500540193, Place ID ChIJFXkbTwBvKhURIelJuTvNTOo. Harita iframe'i ve yol tarifi bu kayda bağlandı. Google'ın eski ad/telefon kaydı sitedeki güncel iletişim bilgilerini değiştirmez.
- Harita çerçevesi responsive/lazy ve başlıklı. Google haritası üçüncü taraf ağ yüklemesine bağlıdır; HTTP 200 ve doğru kayıt doğrulandı. Harita kutucuklarının son renderı otomatik ortamda doğrulanamadı; yayında görsel kontrol gerekir.
- Bu güncellemede Lighthouse yeniden ölçülmedi. Aşağıdaki eski skorlar önceki sürümlere aittir. Google Görseller indekslenmesi veya Google İşletme Profili'ne fotoğraf yüklenmesi yapılmadı. Gerçek domain ile yayın gerekir.
- Ekranler `artifacts/review/gallery-1440.png`, `gallery-390.png`, `gallery-modal-390.png`, `shop-preview.png`.

---

# İletişim kontrolü — 20 Ekim 2026

Arama bağlantıları, SEO meta açıklaması ve Bakery telefon alanı **+905078941841** olarak güncellendi. İletişim kişisi **Umut Ceylan**; WhatsApp hedefi **https://wa.me/905078941841**. Eski telefon üretilen ana sayfada bulunmuyor. İletişim alanında ve mobil alt çubukta WhatsApp bağlantısı var; mobil yol tarifi korunuyor.

Yedi veri/yayın testi, Astro/TypeScript (0 hata/uyarı) ve statik build doğrulaması geçti. Chrome regresyon kontrolü beş ekran genişliğinde geçti; mobil hedef boyutları, telefon ve iki WhatsApp bağlantısı doğrulandı. Arama veya WhatsApp mesajı başlatılmadı; bağlantı hedefleri test edildi. Bu güncellemede Lighthouse yeniden ölçülmedi.

---

# Görsel kontrolü — 20 Ekim 2026

- Kullanıcının gönderdiği dokuz görsel doğru ekler kartlarına eklendi; iki mevcut görselle birlikte 11 görselli kart ve dört geçici görsel alanı var.
- Yedi veri/yayın testi, Astro/TypeScript kontrolü (0 hata/uyarı) ve statik build doğrulaması geçti.
- Chrome kontrolünde 11 ürün görseli WebP olarak sorunsuz yüklendi; lazy loading ve alternatif metinler kontrol edildi. 1440/768/390/320 px genişliklerinde taşma, konsol veya varlık hatası bulunmadı.
- Menüde ürün detay bağlantısı yok. Fiyatlar ve gramajlar değiştirilmedi.
- Bu görsel güncellemesinde Lighthouse yeniden ölçülmedi; aşağıdaki 16 Ekim skorları önceki sürümün tarihli ölçümleridir.
- Ekran görüntüleri: `artifacts/review/images-desktop.png`, `images-mobile.png`.

---

# Son doğrulama — 16 Ekim 2026

Bu rapor 15 ürün / 51 gramaj içeren güncel katalog içindir. Ham ölçümler ve ekran görüntüleri `artifacts/review/` içindedir.

## Otomatik kontroller

- Astro / TypeScript: **0 hata, 0 uyarı, 0 öneri** (39 dosya).
- **7 test geçti**: yayın ayarları + 15 ürünün 51 gramaj/fiyat eşleşmesi, benzersiz kayıtlar, 2 null fiyat, kategori sayıları, gramaja özel açıklamalar, doğrulanmış fotoğraf eşleşmeleri.
- Astro SSG build başarılı: ana sayfa, 15 detay sayfası ve 404; ayrıca robots/sitemap çıktıları.
- Varsayılan önizleme ve indekslenebilir üretim test kopyasında statik doğrulama geçti: yerel dosya/bağlantılar, canonical/robots/sitemap, tek h1, JSON-LD, telefon/adres/saatler, 404 ve Cloudflare dosyaları.
- Üretim sitemap'i **16 URL** içeriyor; detay şemasında yalnızca bilinen fiyatlar var. Önizleme sitemap'i boş ve robots kapalı.
- Chrome/Playwright: **1440, 1024, 768, 390 ve 320 px** ana sayfa; 1440, 768, 390 ve 320 px detay sayfası; yatay taşma bulunmadı.
- 51 gramaj seçeneğinin tamamında fiyat ve açıklama güncellemesi; 15 detay URL'sinde HTTP 200.
- Filtreler: tümü **15**, ekler **12**, diğer üç kategori **1'er**. URL/geri/ileri navigasyonunda filtre ve seçilmiş gramaj korunuyor.
- Native radio klavye okları, bilinmeyen fiyat seçimi, skip link, menü Enter/Escape/bağlantı sonrası kapanışı ve odak dönüşü.
- 44×44 px ve üzeri gramaj/filtre/menü/iletişim hedefleri; telefon, Maps URL'si, yedi gün saatler ve Yemeksepeti bağlantıları.
- Kartların ilk görünümde animasyonu; tekrar kaydırmada yeniden başlamaması; azaltılmış hareket tercihinde animasyonların kapanması.
- JavaScript kapalıyken 15 kart ve açılabilir listelerde **51 gramaj/fiyat**, detay sayfası ve native menü erişilebilir.
- Konsol, script, yerel varlık ve dahili bağlantı hatası bulunmadı.
- Mobil ürün detayı ve masaüstü katalog ekran görüntüleri görsel olarak incelendi.

## Lighthouse

Lighthouse 13.5.0; yerel Chrome; mobil varsayılan simüle throttling, masaüstü `--preset=desktop`.

| Kategori | Ana sayfa mobil | Ana sayfa masaüstü |
| --- | ---: | ---: |
| Performans | 99 | 100 |
| Erişilebilirlik | 100 | 100 |
| İyi uygulamalar | 100 | 100 |
| SEO | 100 | 100 |

Ana sayfa mobil: **LCP 2,1 s, CLS 0,004, TBT 0 ms**. Masaüstü: **LCP 0,5 s, CLS 0,001, TBT 0 ms**.

Karışık Profiterol detay sayfası mobil: **Performans 100, Erişilebilirlik 100, İyi uygulamalar 100, SEO 100**; **LCP 1,7 s, CLS 0, TBT 0 ms**. Bu ölçüm ortak detay şablonunun bir örneği içindir; diğer 14 detay ayrı ayrı Lighthouse ile ölçülmedi.

Bunlar canlı site skorları değildir. `SITE_URL=https://cappadokia.test` ve `SITE_INDEXABLE=true` ile üretilen ayrı `artifacts/production-build` kopyası `127.0.0.1:4322` üzerinde ölçüldü. `.test` yalnızca yerel ölçüm içindir; teslim edilen `dist/` içinde test domaini yoktur. Gerçek domain bilinmediği için `dist/` ve Cloudflare ZIP önizleme/noindex durumundadır; bu önizlemenin SEO skoru 100 olarak iddia edilmez.

Ham raporlar:
- `artifacts/review/catalogue-lighthouse-mobile.report.html` / `.json`
- `artifacts/review/catalogue-lighthouse-desktop.report.html` / `.json`
- `artifacts/review/detail-lighthouse-mobile.report.html` / `.json`
- `artifacts/review/desktop.png`, `mobile.png`, `catalogue-desktop.png`, `catalogue-mobile.png`, `detail-mobile.png`

## Sınırlar ve yayın öncesi

- Canlı Cloudflare dağıtımı, özel domain/DNS/HTTPS ve CDN başlıkları test edilmedi. Gerçek domain ile `pnpm build:production` çalıştırılmalı ve canlı URL yeniden kontrol edilmeli.
- INP saha ölçümü yapılmadı; TBT, INP yerine geçmez. Lighthouse sonuçları laboratuvar ölçümüdür.
- Safari/Firefox, fiziksel iOS/Android ve VoiceOver/NVDA manuel testi yapılmadı. Native View Transitions desteği olmayan tarayıcılarda standart sayfa gezinmesi kullanılır. Otomatik erişilebilirlik skoru tam WCAG sertifikası değildir.
- Telefon araması veya dış platform siparişi başlatılmadı. Maps adres sorgusunun biçimi doğrulandı; gerçek harita pini doğrulanmadı. Dış platformun canlı durumu bu turda tekrar ölçülmedi.
- Frambuazlı Ekler 250 g, Portakallı Ekler 500 g fiyatları ve 13 ürün fotoğrafı bekleniyor. Fiyatlar uydurulmadı; eksik fotoğraflarda başka ürün kullanılmadı.
- Yemeksepeti kaydı farklı işletme bilgileri gösterebiliyor; kullanıcı tarafından verilen bağlantı ve doğrulanmış iletişim bilgileri korundu. Yayın öncesi platform kaydı kontrol edilmeli.
- Build sırasında bağımlılıktaki Zod yorumlarına ilişkin iki Rollup uyarısı var; build başarılıdır. Yeni paket eklenmedi.
