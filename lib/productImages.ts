const DEFAULT_IMAGE = '/images/products/default-punch.jpg';

export function getProductImage(slug: string, imageUrl: string | null): string {
  return imageUrl || DEFAULT_IMAGE;
}
