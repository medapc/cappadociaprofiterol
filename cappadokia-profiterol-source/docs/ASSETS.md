# Görseller ve referanslar

## Kullanılan görseller

- `src/assets/profiterol.png`: yerleşik Imagegen aracıyla bu proje için üretilmiş temsili fotoğraf. Hero ve hikâye alanında korunmuştur; ürün kartları işletme menüsünden alınan görselleri kullanır. Orijinal: 1536×1024. Build sırasında Astro responsive WebP varyantları üretir.
- `public/og-image.jpg`: aynı görselin 1200×630 paylaşım boyutu.
- `src/assets/brownie.jpg`: [Unsplash kaynak görseli](https://images.unsplash.com/photo-1606313564200-e75d5e30476c). Önceki örnek tasarımdan kalan yerel dosya; artık arayüzde kullanılmaz.
- `src/assets/cheesecake.jpg`: [Unsplash kaynak görseli](https://images.unsplash.com/photo-1533134242443-d4fd215305ad). Önceki örnek tasarımdan kalan yerel dosya; artık arayüzde kullanılmaz.
- Logo ve favicon: bu proje için kodla hazırlanan geometrik Kapadokya/peribacası motifi; resmî mevcut logo olduğu iddia edilmez.
- Fontlar: Fontsource paketleri üzerinden Cormorant Garamond ve DM Sans. Lisanslar ilgili npm paketlerinde yer alır.

## Kullanılan Imagegen promptu

```text
Use case: product-mockup. Asset type: hero photograph for a refined Turkish profiterole patisserie website. Photorealistic editorial food photography, landscape 3:2 composition. A shallow handmade ivory ceramic bowl filled with golden choux profiteroles generously drenched in glossy dark chocolate sauce, one split pastry revealing vanilla cream, a small silver dessert spoon nearby. Warm dark cocoa brown wooden table, softly textured chocolate brown background, linen napkin at bottom right. Side window lighting, cinematic soft shadows, natural delicious texture, tasteful luxury bakery aesthetic. Bowl centered with generous breathing room, camera at 35 degree overhead angle. No lettering, no logo, no watermark, no people.
```

Yeni ürünler için prompt şablonu:

```text
Photorealistic editorial product photograph of [DESSERT], on an ivory ceramic plate, warm cocoa brown table, natural side lighting, warm cream and chocolate palette, realistic texture, restrained styling, no text, no logos, no watermark, landscape 3:2.
```

## Referanslar

- [Pizza Yedi Nevşehir](https://pizzayedinevsehir.com/): sade menü/ürün/konum bölüm akışı incelendi. Sipariş özellikleri projeye taşınmadı; kod veya marka varlıkları kopyalanmadı.
- [Instagram görsel referansı](https://www.instagram.com/istanbul_profiterol/): erişim başarısız olduğu için hesabın paleti birebir doğrulanamadı. Çikolata, krem ve bakır tonları kullanıcının görsel yönlendirmesine göre seçildi.
- Kullanıcının paylaştığı [Yemeksepeti işletme referansı](https://www.yemeksepeti.com/restaurant/e9nu/istanbul-profiterol): referans olarak kaydedildi. 15 Ekim 2026 tarihinde menüsü okundu. Kullanıcının yeni talebiyle arayüzde dış bağlantı olarak kullanılır; dahili sepet veya ödeme yoktur.

Adres, telefon ve saatler kullanıcıdan alınmıştır. Marka adı ilk brief'teki **Cappadokia Profiterol** olarak korunmuştur. Fotoğraflar gerçek işletme ürünlerinin belgesi değildir.

## Güncel ürün kataloğu

[İşletme için kullanıcı tarafından verilen Yemeksepeti menüsü](https://www.yemeksepeti.com/restaurant/e9nu/istanbul-profiterol) 15 Ekim 2026 tarihinde incelendi. Güncel 15 ürünün adı, fiyatı ve gramajları kullanıcının 16 Ekim 2026 tarihinde verdiği listeden alınır. Bu sayfa yalnızca mevcut fotoğrafların kaynağıdır. İşletmenin kullanıcı tarafından doğrulanan adı/adresi/saatleri bu platform verisiyle değiştirilmemiştir.

- `src/assets/cikolatali-profiterol.jpg` (güncel katalogda kullanılmıyor; Callebaut eşleşmesi doğrulanmadı): https://yemeksepeti.dhmedia.io/image/fd-tr/Products/77234431.jpg?height=800&width=1000
- `src/assets/karisik-profiterol.jpg`: https://yemeksepeti.dhmedia.io/image/fd-tr/Products/77234413.jpg?height=800&width=1000
- `src/assets/ekler.jpg`: https://yemeksepeti.dhmedia.io/image/fd-tr/Products/77234254.jpg?height=800&width=1000

Görseller verilen işletme menüsünden yerel kopyalanıp Astro ile optimize edilir. Marka tarafından yeni ürün fotoğrafları sağlandığında merkezi katalogdan değiştirilebilir. AI hero görseli 'Temsili sunum' olarak etiketlidir. Ürün görselleri Bakery şemasına gerçek işletme görseli gibi eklenmez.

Güncel eşleşmeler `src/data/product-images.ts` içindedir: `ekler.jpg` → **Klasik Ekler**, `karisik-profiterol.jpg` → **Karışık Profiterol**. Diğer 13 üründe `image: null` bulunur; ortak krem renkli “Ürün fotoğrafı yakında” alanı gösterilir. Çikolatalı Klasik Ekler, Klasik Ekler fotoğrafıyla otomatik eşleştirilmez. Gerçek fotoğraf eklemek için README'deki içerik yönergesini izleyin.

## 20 Ekim 2026 — Kullanıcıdan gelen görseller

Dokuz PNG, kullanıcının paylaştığı `ai foto` klasöründen orijinalleri değiştirilmeden `src/assets/` içine kopyalandı. Astro bunları 360/560/800 px WebP çıktılarıyla sunar; büyük PNG dosyaları ziyaretçiye doğrudan gönderilmez. Kaynaklar kullanıcı tarafından sağlanan temsili görsellerdir.

- `Beyaz Çikolatalı Ekler.png` → **beyaz-cikolatali-ekler** (`beyaz-cikolatali-ekler.png`).
- `Cream Puff Ekler.png` → **krempuf-ekler** (`krempuf-ekler.png`).
- `Çikolatalı Ekler.png` → **cikolatali-klasik-ekler** (`cikolatali-klasik-ekler.png`).
- `Çilekli Ekler.png` → **cilekli-ekler** (`cilekli-ekler.png`).
- `Fındıklı Ekler.png` → **findik-soslu-ekler** (`findik-soslu-ekler.png`).
- `Fıstıklı Ekler.png` → **antep-fistikli-ekler** (`antep-fistikli-ekler.png`).
- `frambuazlı Ekler.png` → **frambuazli-ekler** (`frambuazli-ekler.png`).
- `Limonlu Ekler.png` → **limonlu-ekler** (`limonlu-ekler.png`).
- `Lotuslu Ekler.png` → **lotuslu-ekler** (`lotuslu-ekler.png`).

Klasik Ekler ve Karışık Profiterol mevcut görsellerini korur. Görsel beklenen dört ürün: Karışık Ekler, Portakallı Ekler, Callebaut Beyaz Çikolatalı Profiterol ve Callebaut Sütlü Çikolata Soslu Profiterol. Çikolatalı Ekler yalnızca Çikolatalı Klasik Ekler kartına atandı; iki klasik kayıt birleştirilmedi.

## Ek görseller — 20 Ekim 2026

Kullanıcının gönderdiği `Karışık Ekler.png` → `karisik-ekler.png` ve `Portakallı Ekler.png` → `portakalli-ekler.png` ilgili kartlara eklendi. Astro responsive WebP/lazy loading düzeni korunur. Artık 13 ürün görselli; yalnızca iki Callebaut profiterol çeşidinin görselleri eksiktir.

## Callebaut görseli — 20 Ekim 2026

Kullanıcının gönderdiği `Callebaut profiterol.png`, `src/assets/callebaut-profiterol.png` olarak eklendi ve **Callebaut Sütlü Çikolata Soslu Profiterol** kartına eşleştirildi. Responsive WebP çıktıları üretilir. 14 ürün görselli; yalnızca Callebaut Beyaz Çikolatalı Profiterol görseli bekleniyor.

## Görseller tamamlandı — 20 Ekim 2026

Kullanıcının gönderdiği `Beyaz Çikolatalı Callebaut.png`, `src/assets/beyaz-cikolatali-callebaut.png` olarak **Callebaut Beyaz Çikolatalı Profiterol** kartına eklendi. 15 ürünün tamamında eşleşen görsel var; geçici görsel alanı kalmadı. Responsive WebP ve lazy loading kullanılır.


## Mekân fotoğrafları — 21 Ekim 2026

Kullanıcının dükkân fotoğrafları olarak sağladığı, `Dükkan/Düzenlenmiş` klasöründeki dokuz düzenlenmiş PNG değiştirilmeden kopyalandı. Fotoğraflar üzerinde yeni AI düzenlemesi yapılmadı. Özgün dosyalar `src/assets/shop/cappadokia-profiterol-nevsehir-<anahtar>.png` yolunda; sunulan WebP boyutları 360, 640, 960 ve kaynağı büyütmeden en fazla 1440 px. Açıklamalar yalnızca görünür mekân ayrıntılarını belirtir; fotoğraf tarihi, fotoğrafçı veya lisans bilgisi uydurulmaz.

| Kullanıcının dosyası | Anahtar |
|---|---|
| ChatGPT Görseli 21 Eki 2026 14_29_34.png | dis-cephe-aksam |
| Modern Bitkilerle Dolu Kafe İç Mekânı.png | ic-mekan-genel |
| ChatGPT Görseli 21 Eki 2026 14_11_50.png | ekler-vitrini |
| ChatGPT Görseli 21 Eki 2026 14_20_01.png | cam-kenari-oturma |
| Güneşli Modern Kafe ve Pastane.png | gunesli-ic-mekan |
| ChatGPT Görseli 21 Eki 2026 14_12_10.png | krempuf-ekler-tezgahi |
| ChatGPT Görseli 21 Eki 2026 14_22_26.png | giris-tatli-vitrini |
| ChatGPT Görseli 21 Eki 2026 14_08_39.png | vitrin-oturma-alani |
| Sıcak ve Modern Patiseri Köşesi.png | pastane-kosesi |
