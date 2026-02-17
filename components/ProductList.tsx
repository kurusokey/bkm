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
    <div>
      {products.map((product, index) => {
        const price = (product.price_cents / 100).toFixed(2);
        const isAdded = addedId === product.id;

        return (
          <div key={product.id}>
            {/* Separateur décoratif entre les produits */}
            {index > 0 && (
              <div className="flex items-center justify-center gap-4 py-10">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(74,122,61,0.4))' }} />
                <svg className="w-5 h-5 shrink-0" style={{ color: 'rgba(74,122,61,0.5)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="8" y1="20" x2="16" y2="4" />
                  <line x1="14" y1="8" x2="18" y2="2" />
                </svg>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, transparent, rgba(74,122,61,0.4))' }} />
              </div>
            )}

            {/* Carte produit */}
            <div className="relative">
              {/* Numéro collection */}
              <div className="text-center mb-3">
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-muted/50 font-serif">
                  N&deg;{String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Image avec cadre boisé */}
              <Link href={`/produits/${product.slug}`} className="block">
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: '13 / 15',
                    borderRadius: '10px',
                    border: '1px solid rgba(74, 122, 61, 0.2)',
                    background: 'linear-gradient(180deg, rgba(20, 35, 20, 0.8) 0%, rgba(15, 26, 15, 0.9) 100%)',
                    boxShadow: '0 8px 32px rgba(13,31,21,0.5), inset 0 1px 0 rgba(74, 122, 61, 0.08)',
                  }}
                >
                  <Image
                    src={getProductImage(product.slug, product.image_url)}
                    alt={product.name}
                    fill
                    className="object-contain p-5"
                    sizes="300px"
                  />
                </div>
              </Link>

              {/* Infos produit */}
              <div className="text-center mt-4">
                <Link href={`/produits/${product.slug}`}>
                  <h2 className="font-serif text-gold tracking-wider text-base">
                    {product.name}
                  </h2>
                </Link>

                <p className="text-warm-white font-semibold tracking-wide mt-1.5 text-base">
                  {price}&euro;
                </p>

                {/* Bouton ajout panier */}
                <button
                  onClick={() => handleAdd(product)}
                  className="w-full mt-4 text-cream font-semibold uppercase tracking-[0.12em] cursor-pointer transition-all duration-300"
                  style={{
                    padding: '10px 0',
                    fontSize: '0.68rem',
                    borderRadius: '8px',
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
          </div>
        );
      })}
    </div>
  );
}
