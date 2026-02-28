import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import JsonLd from '@/components/JsonLd';
import ProductClient from '@/components/ProductClient';
import { Product } from '@/types';

const BASE_URL = 'https://blackbeard-umber.vercel.app';

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const price = (product.price_cents / 100).toFixed(2);
  const title = product.name;
  const description = `${product.description} — ${price} € · ${product.volume ?? '70cl'} · ${product.alcohol_degree ?? 15}°`;
  const url = `${BASE_URL}/produits/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${title} | Bô Kay Mwen`,
      description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const price = (product.price_cents / 100).toFixed(2);
  const url = `${BASE_URL}/produits/${slug}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Bô Kay Mwen' },
    image: `${BASE_URL}/og-image.jpg`,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'EUR',
      availability: product.stock_quantity > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url,
      seller: { '@type': 'Organization', name: 'Bô Kay Mwen' },
    },
  };

  // Produits similaires : même catégorie ou saveurs communes, max 3
  const allProducts = getAllProducts();
  const related: Product[] = allProducts
    .filter((p) => p.slug !== product.slug)
    .filter((p) => {
      if (product.category === 'coffret') return p.category === 'coffret';
      if (p.category === 'coffret') return false;
      const currentFlavors = (product.flavor ?? '').toLowerCase().split(',').map((f) => f.trim());
      const pFlavors = (p.flavor ?? '').toLowerCase().split(',').map((f) => f.trim());
      return currentFlavors.some((f) => pFlavors.includes(f));
    })
    .slice(0, 3);

  // Si pas assez de similaires par saveur, compléter avec d'autres punchs
  const relatedProducts =
    related.length >= 2
      ? related
      : allProducts
          .filter((p) => p.slug !== product.slug && p.category !== 'coffret')
          .slice(0, 3);

  return (
    <>
      <JsonLd data={productSchema} />
      <ProductClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
