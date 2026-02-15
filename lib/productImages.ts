const PRODUCT_IMAGES: Record<string, string> = {
  'punch-ananas-passion': '/images/products/punch-ananas-passion.jpg',
  'punch-ananas-goyave': '/images/products/punch-ananas-goyave.jpg',
  'punch-passion': '/images/products/punch-passion.jpg',
  'punch-coco': '/images/products/punch-coco.jpg',
  'punch-pili-pili': '/images/products/punch-pili-pili.jpg',
  'punch-coco-gingembre': '/images/products/punch-coco-gingembre.jpg',
  'punch-goyave': '/images/products/punch-goyave.jpg',
  'punch-mangue-ananas': '/images/products/punch-mangue-ananas.jpg',
  'punch-litchis': '/images/products/punch-litchis.jpg',
};

const DEFAULT_IMAGE = '/images/products/default-punch.jpg';

export function getProductImage(slug: string, imageUrl: string | null): string {
  return imageUrl || PRODUCT_IMAGES[slug] || DEFAULT_IMAGE;
}
