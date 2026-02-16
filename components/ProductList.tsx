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
    <div className="space-y-14">
      {products.map((product) => {
        const price = (product.price_cents / 100).toFixed(2);

        return (
          <div key={product.id} className="text-center">
            {/* Image */}
            <Link href={`/produits/${product.slug}`} className="block">
              <div className="relative h-[320px] rounded-2xl overflow-hidden bg-charcoal/40">
                <Image
                  src={getProductImage(product.slug, product.image_url)}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                  sizes="400px"
                />
              </div>
            </Link>

            {/* Name */}
            <h2 className="font-serif text-2xl text-gold mt-6 mb-3 tracking-wider">
              {product.name}
            </h2>

            {/* Price */}
            <p className="text-xl font-semibold text-warm-white tracking-wide mb-6">
              {price}&euro;
            </p>

            {/* Add to cart */}
            <button
              onClick={() => handleAdd(product)}
              className="btn-luxury-filled"
            >
              {addedId === product.id ? 'Ajouté !' : 'Ajouter au panier'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
