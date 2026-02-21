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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => {
        const price = (product.price_cents / 100).toFixed(2);
        const isAdded = addedId === product.id;

        return (
          <div
            key={product.id}
            className="rounded-xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(15, 26, 15, 0.6)',
              border: '1px solid rgba(74, 122, 61, 0.15)',
              boxShadow: '0 4px 20px rgba(13,31,21,0.4)',
            }}
          >
            {/* Image */}
            <Link href={`/produits/${product.slug}`} className="block">
              <div
                className="relative w-full"
                style={{ aspectRatio: '1 / 1' }}
              >
                <Image
                  src={getProductImage(product.slug, product.image_url)}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(min-width: 768px) 280px, 50vw"
                />
              </div>
            </Link>

            {/* Infos — flex col pour aligner toutes les cartes */}
            <div className="text-center px-3 pb-4 flex flex-col flex-grow">
              {/* Nom — hauteur fixe pour 2 lignes */}
              <Link href={`/produits/${product.slug}`} className="flex items-center justify-center h-8 md:h-10">
                <h2 className="font-serif text-gold tracking-normal text-[0.7rem] md:text-sm leading-snug">
                  {product.name.replace(/^Punch\s+/i, '')}
                </h2>
              </Link>

              {/* Tagline — hauteur fixe */}
              <div className="h-4">
                {product.tagline && (
                  <p className="text-cream-muted/50 text-[0.6rem] font-serif tracking-wider italic">
                    {product.tagline}
                  </p>
                )}
              </div>

              {/* Prix */}
              <p className="text-warm-white font-semibold tracking-wide mt-1 text-sm md:text-base">
                {price}&euro;
              </p>

              {/* Bouton — toujours en bas */}
              <button
                onClick={() => handleAdd(product)}
                className="w-full mt-auto pt-3 text-cream font-semibold uppercase tracking-[0.1em] cursor-pointer transition-all duration-300"
                style={{
                  padding: '8px 0',
                  fontSize: '0.6rem',
                  borderRadius: '6px',
                  border: isAdded ? '1px solid #2A7C7B' : '1px solid rgba(196, 30, 58, 0.5)',
                  background: isAdded
                    ? 'linear-gradient(135deg, #2A7C7B 0%, #1f5f5e 100%)'
                    : 'linear-gradient(135deg, #C41E3A 0%, #D4A017 50%, #1B6B3A 100%)',
                  boxShadow: isAdded
                    ? '0 2px 8px rgba(0,0,0,0.3)'
                    : '0 2px 10px rgba(196, 30, 58, 0.2), 0 2px 6px rgba(0,0,0,0.2)',
                }}
              >
                {isAdded ? 'Ajouté !' : 'Ajouter au panier'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
