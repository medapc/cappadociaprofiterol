import { publication } from '../../config/publication.mjs';
import { site, type Day } from '../data/site';

export function getPublication(origin: URL | undefined) {
  return publication(origin?.href, import.meta.env.SITE_INDEXABLE === 'true');
}
export function businessSchema(origin?: URL, images: string[] = []) {
  const days: Day[] = site.hours;
  return {
    '@context': 'https://schema.org', '@type': 'Bakery',
    name: site.name, telephone: site.phone,
    ...(origin && { '@id': new URL('/#isletme', origin).href, url: origin.href, hasMenu: new URL('/#urunler', origin).href }),
    hasMap: site.mapsUrl,
    ...(origin && images.length ? { image: images } : {}),
    address: {
      '@type': 'PostalAddress', streetAddress: site.address.street,
      addressLocality: `${site.address.city}/${site.address.district}`,
      addressRegion: site.address.city, addressCountry: site.address.country,
    },
    openingHoursSpecification: days.flatMap(day => day.hours ? [{
      '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day.schemaDay}`,
      opens: day.hours === 'closed' ? '00:00' : day.hours.opens,
      closes: day.hours === 'closed' ? '00:00' : day.hours.closes,
    }] : []),
  };
}
