export interface ProductVariant {
  weight: string;
  price: number | null;
  description?: string;
}
export const categories = [
  { id: 'ekler', label: 'Eklerler' },
  { id: 'karisik-profiterol', label: 'Karışık Profiteroller' },
  { id: 'beyaz-cikolatali-profiterol', label: 'Beyaz Çikolatalı Profiteroller' },
  { id: 'sutlu-cikolatali-profiterol', label: 'Sütlü Çikolatalı Profiteroller' },
] as const;
export interface Product {
  id: string;
  name: string;
  category: typeof categories[number]['id'];
  description: string;
  image: string | null;
  variants: ProductVariant[];
}
const eclairVariants = (): ProductVariant[] => [
  { weight: '250 g', price: 290 }, { weight: '500 g', price: 495 }, { weight: '1 kg', price: 890 },
];
const chocolateVariants = (): ProductVariant[] => [
  { weight: '250 g', price: 290 }, { weight: '500 g', price: 490 },
  { weight: '600 g', price: 550 }, { weight: '750 g', price: 590 },
  { weight: '1 kg', price: 830 }, { weight: '1,2 kg', price: 895 }, { weight: '1,5 kg', price: 1250 },
];
// Owner-supplied catalogue. Unknown prices stay null; photographs are matched explicitly.
export const products: Product[] = [
  { id: 'cikolatali-klasik-ekler', name: 'Çikolatalı Klasik Ekler', category: 'ekler', description: 'Çikolatalı klasik ekler, 1 kg seçeneğiyle.', image: 'cikolatali-klasik-ekler.png', variants: [{ weight: '1 kg', price: 890 }] },
  { id: 'lotuslu-ekler', name: 'Lotuslu Ekler', category: 'ekler', description: 'Lotus bisküvisi.', image: 'lotuslu-ekler.png', variants: eclairVariants() },
  { id: 'karisik-ekler', name: 'Karışık Ekler', category: 'ekler', description: 'Günün ekler çeşitlerinden hazırlanan karışık ekler.', image: 'karisik-ekler.png', variants: eclairVariants() },
  { id: 'antep-fistikli-ekler', name: 'Antep Fıstıklı Ekler', category: 'ekler', description: 'Antep fıstığı.', image: 'antep-fistikli-ekler.png', variants: eclairVariants() },
  { id: 'limonlu-ekler', name: 'Limonlu Ekler', category: 'ekler', description: 'Limon aroması.', image: 'limonlu-ekler.png', variants: eclairVariants() },
  { id: 'frambuazli-ekler', name: 'Frambuazlı Ekler', category: 'ekler', description: 'Frambuaz.', image: 'frambuazli-ekler.png', variants: [{ weight: '250 g', price: null }, ...eclairVariants().slice(1)] },
  { id: 'cilekli-ekler', name: 'Çilekli Ekler', category: 'ekler', description: 'Çilek aroması.', image: 'cilekli-ekler.png', variants: eclairVariants() },
  { id: 'findik-soslu-ekler', name: 'Fındık Soslu Ekler', category: 'ekler', description: 'Fındık sosu ve ekler hamuru.', image: 'findik-soslu-ekler.png', variants: eclairVariants() },
  { id: 'beyaz-cikolatali-ekler', name: 'Beyaz Çikolatalı Ekler', category: 'ekler', description: 'Beyaz çikolata.', image: 'beyaz-cikolatali-ekler.png', variants: eclairVariants() },
  { id: 'krempuf-ekler', name: 'Krempuf Ekler', category: 'ekler', description: 'Krempuf ekler, iki gramaj seçeneğiyle.', image: 'krempuf-ekler.png', variants: eclairVariants().slice(0, 2) },
  { id: 'klasik-ekler', name: 'Klasik Ekler', category: 'ekler', description: 'Klasik ekler, iki gramaj seçeneğiyle.', image: 'ekler.jpg', variants: eclairVariants().slice(0, 2) },
  { id: 'portakalli-ekler', name: 'Portakallı Ekler', category: 'ekler', description: 'Portakal aroması.', image: 'portakalli-ekler.png', variants: [{ weight: '250 g', price: 290 }, { weight: '500 g', price: null }] },
  { id: 'karisik-profiterol', name: 'Karışık Profiterol', category: 'karisik-profiterol', description: 'Gramajına göre çikolata, vanilya veya karamel sosuyla karışık profiterol.', image: 'karisik-profiterol.jpg', variants: [
    { weight: '250 g', price: 290, description: '5 adet profiterol topu, çikolata ve vanilya sosu' },
    { weight: '600 g', price: 550, description: '12 adet profiterol, çikolata ve vanilya sosu' },
    { weight: '750 g', price: 590, description: "15'li karışık profiterol, çikolata ve karamel sosu" },
    { weight: '1 kg', price: 830, description: "20'li karışık profiterol, çikolata ve vanilya sosu" },
    { weight: '1,2 kg', price: 895, description: '24 adet profiterol, çikolata ve karamel sosu' },
    { weight: '1,5 kg', price: 1250, description: '1,5 kg olarak servis edilir' },
  ] },
  { id: 'callebaut-beyaz-cikolatali-profiterol', name: 'Callebaut Beyaz Çikolatalı Profiterol', category: 'beyaz-cikolatali-profiterol', description: 'Callebaut beyaz çikolata, profiterol topları ve krema.', image: 'beyaz-cikolatali-callebaut.png', variants: chocolateVariants() },
  { id: 'callebaut-sutlu-cikolata-soslu-profiterol', name: 'Callebaut Sütlü Çikolata Soslu Profiterol', category: 'sutlu-cikolatali-profiterol', description: 'Callebaut sütlü çikolata sosu, profiterol topları ve krema.', image: 'callebaut-profiterol.png', variants: chocolateVariants() },
];
export const productFilters = [
  { id: 'all', label: 'Tüm Tatlılar', count: products.length },
  ...categories.map(category => ({ ...category, count: products.filter(p => p.category === category.id).length })),
];
