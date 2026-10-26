import type { ImageMetadata } from 'astro';
import mixed from '../assets/karisik-profiterol.jpg';
import eclair from '../assets/ekler.jpg';
import supplied0 from '../assets/beyaz-cikolatali-ekler.png';
import supplied1 from '../assets/krempuf-ekler.png';
import supplied2 from '../assets/cikolatali-klasik-ekler.png';
import supplied3 from '../assets/cilekli-ekler.png';
import supplied4 from '../assets/findik-soslu-ekler.png';
import supplied5 from '../assets/antep-fistikli-ekler.png';
import supplied6 from '../assets/frambuazli-ekler.png';
import supplied7 from '../assets/limonlu-ekler.png';
import supplied8 from '../assets/lotuslu-ekler.png';
import mixedEclair from '../assets/karisik-ekler.png';
import orangeEclair from '../assets/portakalli-ekler.png';
import callebaut from '../assets/callebaut-profiterol.png';
import whiteCallebaut from '../assets/beyaz-cikolatali-callebaut.png';
// Images are matched to the products identified by the owner.
export const productImages: Record<string, ImageMetadata> = {
  'beyaz-cikolatali-ekler.png': supplied0,
  'krempuf-ekler.png': supplied1,
  'cikolatali-klasik-ekler.png': supplied2,
  'cilekli-ekler.png': supplied3,
  'findik-soslu-ekler.png': supplied4,
  'antep-fistikli-ekler.png': supplied5,
  'frambuazli-ekler.png': supplied6,
  'limonlu-ekler.png': supplied7,
  'lotuslu-ekler.png': supplied8,
  'karisik-ekler.png': mixedEclair,
  'portakalli-ekler.png': orangeEclair,
  'ekler.jpg': eclair,
  'karisik-profiterol.jpg': mixed,
  'callebaut-profiterol.png': callebaut,
  'beyaz-cikolatali-callebaut.png': whiteCallebaut,
};
