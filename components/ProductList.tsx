'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { getProductImage } from '@/lib/productImages';
import { useCart } from '@/context/CartContext';

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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
      {products.map((product) => {
        const price = (product.price_cents / 100).toFixed(2);
        const isAdded = addedId === product.id;
        const shortName = product.name.replace(/^Punch\s+/i, '');

        return (
          <div key={product.id} className="flex flex-col">
            {/* Image — cadre carré, jamais tronquée */}
            <Link href={`/produits/${product.slug}`} className="block">
              <div
                className="relative w-full rounded-lg"
                style={{
                  aspectRatio: '1',
                  background: 'rgba(15, 26, 15, 0.6)',
                  border: '1px solid rgba(74, 122, 61, 0.15)',
                }}
              >
                <Image
                  src={getProductImage(product.slug, product.image_url)}
                  alt={product.name}
                  fill
                  className="object-contain p-3"
                  sizes="(min-width: 768px) 260px, 45vw"
                />
              </div>
            </Link>

            {/* Nom */}
            <Link href={`/produits/${product.slug}`} className="mt-3 block text-center">
              <h2 className="font-serif text-gold text-[0.75rem] leading-tight">
                {shortName}
              </h2>
            </Link>

            {/* Prix */}
            <p className="text-warm-white font-semibold text-sm text-center mt-1">
              {price}&euro;
            </p>

            {/* Bouton */}
            <button
              onClick={() => handleAdd(product)}
              className="mt-2 w-full text-cream font-semibold uppercase cursor-pointer transition-all duration-300"
              style={{
                padding: '7px 0',
                fontSize: '0.55rem',
                letterSpacing: '0.05em',
                borderRadius: '6px',
                border: isAdded ? '1px solid #2A7C7B' : '1px solid rgba(196, 30, 58, 0.5)',
                background: isAdded
                  ? 'linear-gradient(135deg, #2A7C7B 0%, #1f5f5e 100%)'
                  : 'linear-gradient(135deg, #C41E3A 0%, #D4A017 50%, #1B6B3A 100%)',
              }}
            >
              {isAdded ? 'Ajout\u00e9 !' : 'Ajouter'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
