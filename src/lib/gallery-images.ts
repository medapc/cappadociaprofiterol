import { getImage } from 'astro:assets';
import { galleryPhotos } from '../data/gallery';

// Reuse identical optimized URLs in HTML, structured data and the image sitemap.
export async function getGalleryImages() {
  return Promise.all(galleryPhotos.map(async photo => {
    const fullWidth = Math.min(1440, photo.image.width);
    const widths = [...new Set([360, 640, 960, fullWidth].filter(width => width <= fullWidth))];
    const variants = await Promise.all(widths.map(width => getImage({ src: photo.image, width, format: 'webp', quality: 80 })));
    const full = variants[variants.length - 1];
    return { ...photo, full, width: fullWidth, height: Math.round(photo.image.height * fullWidth / photo.image.width), srcset: variants.map((image, index) => `${image.src} ${widths[index]}w`).join(', ') };
  }));
}
export type GalleryImage = Awaited<ReturnType<typeof getGalleryImages>>[number];
