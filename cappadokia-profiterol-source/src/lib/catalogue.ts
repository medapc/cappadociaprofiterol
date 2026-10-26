export function formatPrice(price: number | null): string {
  return price === null ? 'Fiyat doğrulanacak' : `${new Intl.NumberFormat('tr-TR').format(price)} TL`;
}
