'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { getProductImage } from '@/lib/productImages';
import { useCart } from '@/context/CartContext';
import ScrollReveal from '@/components/ScrollReveal';

interface ProductListProps {
  products: Product[];
}

const FILTERS = [
  { key: 'tous', label: 'Tous' },
  { key: 'ananas', label: 'Ananas' },
  { key: 'coco', label: 'Coco' },
  { key: 'passion', label: 'Passion' },
  { key: 'goyave', label: 'Goyave' },
  { key: 'coffret', label: 'Coffrets' },
];

function matchesFilter(product: Product, filter: string): boolean {
  if (filter === 'tous') return true;
  if (filter === 'coffret') return product.category === 'coffret';
  const flavor = (product.flavor ?? '').toLowerCase();
  return flavor.includes(filter);
}

export default function ProductList({ products }: ProductListProps) {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('tous');

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filtered = products.filter((p) => matchesFilter(p, activeFilter));

  return (
    <div>
      {/* Filtres */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className="text-xs uppercase tracking-[0.12em] font-serif transition-all duration-300 px-4 py-2 rounded-full"
            style={{
              background:
                activeFilter === key
                  ? 'rgba(200,162,77,0.20)'
                  : 'rgba(200,162,77,0.05)',
              border:
                activeFilter === key
                  ? '1px solid rgba(200,162,77,0.55)'
                  : '1px solid rgba(200,162,77,0.15)',
              color: activeFilter === key ? '#C8A24D' : 'rgba(200,162,77,0.45)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grille produits */}
      {filtered.length === 0 ? (
        <p className="text-center text-cream-muted py-16 text-sm">
          Aucun produit dans cette catégorie.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {filtered.map((product, index) => {
            const price = (product.price_cents / 100).toFixed(2);
            const isAdded = addedId === product.id;
            const inStock = product.stock_quantity > 0;
            const shortName =
              product.category === 'coffret'
                ? product.name
                : product.name.replace(/^Punch\s+/i, '').replace(/-/g, ' ');

            return (
              <ScrollReveal key={product.id} delay={index * 60} distance={24}>
                <div
                  className="group flex gap-3 sm:flex-col sm:gap-0 rounded-lg overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(15, 26, 15, 0.5)',
                    border: '1px solid rgba(200, 162, 77, 0.1)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      '0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(200,162,77,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      '0 2px 8px rgba(0,0,0,0.15)';
                  }}
                >
                  {/* Image */}
                  <Link href={`/produits/${product.slug}`} className="shrink-0 relative">
                    {/* Badge stock */}
                    <span
                      className="absolute top-2 left-2 text-[10px] uppercase tracking-[0.1em] font-serif px-2 py-0.5 rounded-full z-10"
                      style={{
                        background: inStock
                          ? 'rgba(42,124,123,0.25)'
                          : 'rgba(139,47,58,0.25)',
                        border: inStock
                          ? '1px solid rgba(42,124,123,0.5)'
                          : '1px solid rgba(139,47,58,0.5)',
                        color: inStock ? '#3A9B9A' : '#C05C68',
                      }}
                    >
                      {inStock ? 'En stock' : 'Rupture'}
                    </span>

                    <div
                      className="relative w-56 h-56 sm:w-full sm:h-auto overflow-hidden"
                      style={{ aspectRatio: '3/4' }}
                    >
                      <Image
                        src={getProductImage(product.slug, product.image_url)}
                        alt={product.name}
                        fill
                        className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 44vw, 224px"
                      />
                    </div>
                  </Link>

                  {/* Infos */}
                  <div className="flex-1 flex flex-col justify-center py-3 pr-4 sm:px-4 sm:py-4 min-w-0">
                    <Link href={`/produits/${product.slug}`}>
                      <h2
                        className="font-serif text-gold leading-tight sm:text-center"
                        style={{ fontSize: '1rem' }}
                      >
                        {shortName}
                      </h2>
                    </Link>

                    {product.tagline && (
                      <p
                        className="text-cream-muted italic sm:text-center mt-1"
                        style={{ fontSize: '0.75rem' }}
                      >
                        {product.tagline}
                      </p>
                    )}

                    {/* Méta : degré + volume */}
                    <div className="flex gap-3 sm:justify-center mt-2">
                      {product.alcohol_degree != null && (
                        <span
                          className="text-cream-muted/60"
                          style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}
                        >
                          {product.alcohol_degree}°
                        </span>
                      )}
                      {(product.volume ?? product.volume_ml) && (
                        <span
                          className="text-cream-muted/60"
                          style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}
                        >
                          {product.volume ?? `${(product.volume_ml! / 10)}cl`}
                        </span>
                      )}
                    </div>

                    <p
                      className="text-warm-white font-semibold sm:text-center mt-2"
                      style={{ fontSize: '0.95rem' }}
                    >
                      {price}&euro;
                    </p>

                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!inStock}
                      className="mt-3 self-start sm:self-auto sm:w-full font-semibold uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        padding: '6px 12px',
                        fontSize: '0.65rem',
                        letterSpacing: '0.08em',
                        borderRadius: '4px',
                        border: isAdded
                          ? '1px solid rgba(42, 124, 123, 0.6)'
                          : '1px solid rgba(200, 162, 77, 0.5)',
                        background: isAdded
                          ? 'rgba(42, 124, 123, 0.25)'
                          : 'rgba(200, 162, 77, 0.15)',
                        color: isAdded ? '#3A9B9A' : '#C8A24D',
                        cursor: inStock ? 'pointer' : 'not-allowed',
                      }}
                    >
                      {isAdded ? 'Ajouté !' : 'Ajouter au panier'}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
