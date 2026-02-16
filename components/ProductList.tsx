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
    <div className="space-y-10">
      {products.map((product) => {
        const price = (product.price_cents / 100).toFixed(2);
        const isAdded = addedId === product.id;

        return (
          <div
            key={product.id}
            className="bg-charcoal/30 border border-gold-muted/10 rounded-2xl overflow-hidden"
          >
            {/* Image — cliquable */}
            <Link href={`/produits/${product.slug}`} className="block">
              <div className="relative h-[280px] bg-charcoal/40">
                <Image
                  src={getProductImage(product.slug, product.image_url)}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="400px"
                />
              </div>
            </Link>

            {/* Infos + bouton */}
            <div className="px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <Link href={`/produits/${product.slug}`}>
                  <h2 className="font-serif text-lg text-gold tracking-wider">
                    {product.name}
                  </h2>
                </Link>
                <span className="text-lg font-semibold text-warm-white tracking-wide">
                  {price}&euro;
                </span>
              </div>

              <button
                onClick={() => handleAdd(product)}
                className={`w-full py-3 text-xs font-semibold uppercase tracking-[0.15em] rounded-lg transition-all duration-300 ${
                  isAdded
                    ? 'bg-teal text-warm-white border border-teal'
                    : 'bg-gold text-ink border border-gold hover:bg-gold-light'
                }`}
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
