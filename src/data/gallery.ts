import type { ImageMetadata } from 'astro';
import photo0 from '../assets/shop/cappadokia-profiterol-nevsehir-dis-cephe-aksam.png';
import photo1 from '../assets/shop/cappadokia-profiterol-nevsehir-ic-mekan-genel.png';
import photo2 from '../assets/shop/cappadokia-profiterol-nevsehir-ekler-vitrini.png';
import photo3 from '../assets/shop/cappadokia-profiterol-nevsehir-cam-kenari-oturma.png';
import photo4 from '../assets/shop/cappadokia-profiterol-nevsehir-gunesli-ic-mekan.png';
import photo5 from '../assets/shop/cappadokia-profiterol-nevsehir-krempuf-ekler-tezgahi.png';
import photo6 from '../assets/shop/cappadokia-profiterol-nevsehir-giris-tatli-vitrini.png';
import photo7 from '../assets/shop/cappadokia-profiterol-nevsehir-vitrin-oturma-alani.png';
import photo8 from '../assets/shop/cappadokia-profiterol-nevsehir-pastane-kosesi.png';

export interface GalleryPhoto { id: string; image: ImageMetadata; title: string; alt: string; }
// Owner-supplied edited shop photographs, 21 October 2026.
export const galleryPhotos: GalleryPhoto[] = [
  { id: 'dis-cephe-aksam', image: photo0, title: 'Akşam ışıklarında Cappadokia', alt: 'Nevşehir Cappadokia Profiterol’ün ışıklı tabelası, kalp biçimli girişi ve dış oturma alanı' },
  { id: 'ic-mekan-genel', image: photo1, title: 'İçeriden bir bakış', alt: 'Cappadokia Profiterol iç mekânında ahşap tezgâh, tatlı vitrinleri ve cam kenarındaki koltuklar' },
  { id: 'ekler-vitrini', image: photo2, title: 'Vitrindeki tatlılar', alt: 'Cam vitrinde farklı renk ve soslarla sergilenen ekler çeşitleri' },
  { id: 'cam-kenari-oturma', image: photo3, title: 'Cam kenarında bir mola', alt: 'Cam kenarındaki ahşap koltuklar ve dükkânın önündeki açık oturma alanı' },
  { id: 'gunesli-ic-mekan', image: photo4, title: 'Gün ışığında mekânımız', alt: 'Yüksek tavanlı iç mekânda bitkili aydınlatmalar, ahşap servis tezgâhı ve tatlı vitrinleri' },
  { id: 'krempuf-ekler-tezgahi', image: photo5, title: 'Vitrinden renkli detaylar', alt: 'Krempuf, portakallı ve çilekli çeşitlerin sergilendiği çok katlı tatlı vitrini' },
  { id: 'giris-tatli-vitrini', image: photo6, title: 'Girişten vitrine', alt: 'Cappadokia Profiterol giriş kapısının yanındaki cam tatlı vitrini' },
  { id: 'vitrin-oturma-alani', image: photo7, title: 'Vitrin ve oturma köşemiz', alt: 'Oval tatlı vitrini, kahve köşesi ve pencere önündeki ahşap koltuklar' },
  { id: 'pastane-kosesi', image: photo8, title: 'Tatlı bir köşe', alt: 'Gün ışığı alan pastane köşesinde tatlı vitrini, bitkiler ve oturma alanı' },
];
