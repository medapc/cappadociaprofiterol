export type Day = {
  label: string;
  schemaDay: string;
  hours: { opens: string; closes: string } | 'closed' | null;
};

const week = [
  ['Pazartesi', 'Monday'], ['Salı', 'Tuesday'], ['Çarşamba', 'Wednesday'],
  ['Perşembe', 'Thursday'], ['Cuma', 'Friday'], ['Cumartesi', 'Saturday'], ['Pazar', 'Sunday'],
];
const dailyHours = { opens: '08:30', closes: '23:00' };
const address = {
  street: 'Emek Mahallesi, Emek Toplu Konut Yapı Küme Evleri, A3 Blok, Dükkan 35',
  district: 'Merkez', city: 'Nevşehir', country: 'TR',
};
export const addressText = `${address.street}, ${address.city}/${address.district}`;

// Address/hours confirmed 15 October; phone, WhatsApp and contact updated 20 October 2026.
const phone = '+905078941841';
const phoneDisplay = '+90 507 894 18 41';
export const site = {
  name: 'Cappadocia Profiterol',
  title: 'Cappadocia Profiterol | Nevşehir’de Tatlı Molası',
  description: `Nevşehir Emek Mahallesi’nde Cappadocia Profiterol. Profiterol ve ekler çeşitlerini keşfedin. Her gün 08.30–23.00. Telefon: ${phoneDisplay}.`,
  address,
  phone,
  phoneDisplay,
  contactName: 'Umut Ceylan',
  pickupOffer: 'Gel-al’da fiyatlar 130 TL daha uygun.',
  whatsappUrl: `https://wa.me/${phone.replace('+', '')}`,
  mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressText + ', Türkiye')}&destination_place_id=ChIJFXkbTwBvKhURIelJuTvNTOo`,
  // Owner-shared Maps record: https://maps.app.goo.gl/6NutAov7T9cRAScW9 (21 October 2026).
  mapEmbedUrl: 'https://www.google.com/maps?cid=16883094759500540193&output=embed&hl=tr',
  // Owner-supplied vendor link; external checkout only. Its displayed name differs.
  yemeksepetiUrl: 'https://www.yemeksepeti.com/restaurant/e9nu/istanbul-profiterol',
  hoursSummary: `Her gün ${dailyHours.opens.replace(':', '.')}–${dailyHours.closes.replace(':', '.')}`,
  hours: week.map(([label, schemaDay]) => ({ label, schemaDay, hours: { ...dailyHours } })) satisfies Day[],
};
export const navLinks = [
  { href: '#hakkimizda', label: 'Hikâyemiz' },
  { href: '#urunler', label: 'Tatlılarımız' },
  { href: '#mekanimiz', label: 'Mekânımız' },
  { href: '#saatler', label: 'Çalışma Saatleri' },
  { href: '#konum', label: 'Konum' },
];
export const directionsUrl = site.mapsUrl;
