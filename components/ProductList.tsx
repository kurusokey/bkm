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

export default function ProductList({ products }: ProductListProps) {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {products.map((product, index) => {
        const price = (product.price_cents / 100).toFixed(2);
        const isAdded = addedId === product.id;
        const shortName = product.category === 'coffret' ? product.name : product.name.replace(/^Punch\s+/i, '').replace(/-/g, ' ');

        return (
          <ScrollReveal key={product.id} delay={index * 60} distance={24}>
            {/* Mobile : horizontal — Tablet+ : vertical */}
            <div
              className="flex gap-3 sm:flex-col sm:gap-0 rounded-lg overflow-hidden"
              style={{
                background: 'rgba(15, 26, 15, 0.5)',
                border: '1px solid rgba(200, 162, 77, 0.1)',
              }}
            >
              {/* Image */}
              <Link href={`/produits/${product.slug}`} className="shrink-0">
                <div
                  className="relative w-56 h-56 sm:w-full sm:h-auto overflow-hidden"
                  style={{ aspectRatio: '3/4' }}
                >
                  <Image
                    src={getProductImage(product.slug, product.image_url)}
                    alt={product.name}
                    fill
                    className="object-contain p-1 transition-transform duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 44vw, 224px"
                  />
                </div>
              </Link>

              {/* Infos — flex-1 pour largeur constante sur mobile */}
              <div className="flex-1 flex flex-col justify-center py-2 pr-3 sm:px-3 sm:py-3 min-w-0">
                <Link href={`/produits/${product.slug}`}>
                  <h2
                    className="font-serif text-gold leading-tight sm:text-center"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {shortName}
                  </h2>
                </Link>

                {product.tagline && (
                  <p
                    className="text-cream-muted italic sm:text-center mt-0.5"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {product.tagline}
                  </p>
                )}

                <p
                  className="text-warm-white font-semibold sm:text-center mt-1"
                  style={{ fontSize: '0.75rem' }}
                >
                  {price}&euro;
                </p>

                <button
                  onClick={() => handleAdd(product)}
                  className="mt-2 self-start sm:self-auto sm:w-full cursor-pointer font-semibold uppercase transition-all duration-300"
                  style={{
                    padding: '3px 8px',
                    fontSize: '0.5rem',
                    letterSpacing: '0.08em',
                    borderRadius: '4px',
                    border: isAdded
                      ? '1px solid rgba(42, 124, 123, 0.6)'
                      : '1px solid rgba(200, 162, 77, 0.5)',
                    background: isAdded
                      ? 'rgba(42, 124, 123, 0.25)'
                      : 'rgba(200, 162, 77, 0.15)',
                    color: isAdded ? '#3A9B9A' : '#C8A24D',
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
  );
}
