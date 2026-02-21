'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import ScrollReveal from '@/components/ScrollReveal';
import { getProductImage } from '@/lib/productImages';
import { getProductBySlug } from '@/lib/products';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = getProductBySlug(slug);
    setProduct(found);
    setLoading(false);
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        setQuantity(1);
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ink pt-32 pb-16 flex items-center justify-center">
        <div className="text-cream-muted">Chargement...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-ink pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl text-gold mb-4">Produit introuvable</h1>
          <Link href="/boutique" className="text-gold hover:text-gold-light transition-colors duration-500">
            Retour a la collection
          </Link>
        </div>
      </div>
    );
  }

  const price = (product.price_cents / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-ink pt-32 md:pt-40 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <Link href="/boutique" className="inline-flex items-center gap-2 text-cream-muted hover:text-gold transition-colors duration-500 mb-10 text-sm tracking-wider">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Retour a la collection
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Image */}
          <ScrollReveal direction="left" distance={40}>
            <div className="bg-charcoal/50 border border-gold-muted/10 rounded-2xl flex items-center justify-center h-[400px] md:h-[600px] relative overflow-hidden">
              <Image
                src={getProductImage(product.slug, product.image_url)}
                alt={product.name}
                fill
                className="object-contain p-10"
              />
            </div>
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal direction="right" distance={40} delay={200}>
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-gold mb-6">{product.name}</h1>

              {product.flavor && (
                <span className="inline-block bg-gold/10 border border-gold-muted/40 text-gold px-4 py-1.5 rounded-full text-sm font-serif tracking-wider mb-6">
                  {product.flavor}
                </span>
              )}

              <p className="text-4xl md:text-5xl font-semibold text-warm-white mb-8 tracking-wide">{price} &euro;</p>

              {/* Gold separator */}
              <div className="gold-line-wide mb-8" />

              <div className="space-y-4 mb-8 text-cream-muted text-sm">
                {product.alcohol_degree && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gold-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                    </svg>
                    <span>Degre d&apos;alcool : {product.alcohol_degree}&deg;</span>
                  </div>
                )}
                {product.volume_ml && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gold-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Volume : {product.volume_ml} ml</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  {product.stock_quantity > 0 ? (
                    <span className="text-teal">En stock ({product.stock_quantity} disponibles)</span>
                  ) : (
                    <span className="text-crimson-light">Rupture de stock</span>
                  )}
                </div>
              </div>

              {/* Gold separator */}
              <div className="gold-line-wide mb-8" />

              <p className="text-cream-muted leading-relaxed mb-6 text-base">{product.description}</p>

              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-3 font-serif">Ingredients</p>
                  <p className="text-cream-muted text-sm leading-relaxed">
                    {product.ingredients.join(', ')}
                  </p>
                </div>
              )}

              {/* Quantite */}
              {product.stock_quantity > 0 && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-cream-muted text-sm tracking-wider">Quantit&eacute;</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-cream/80 text-lg transition-colors duration-300"
                      style={{ background: 'rgba(200,162,77,0.08)', border: '1px solid rgba(200,162,77,0.25)' }}
                    >
                      &minus;
                    </button>
                    <span className="text-cream font-semibold w-8 text-center text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-cream/80 text-lg transition-colors duration-300"
                      style={{ background: 'rgba(200,162,77,0.08)', border: '1px solid rgba(200,162,77,0.25)' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className={`w-full py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-500 rounded-lg ${
                  product.stock_quantity > 0
                    ? 'bg-gold text-ink hover:bg-gold-light'
                    : 'bg-slate-dark text-cream-muted cursor-not-allowed border border-gold-muted/10'
                }`}
              >
                {added
                  ? `${quantity > 1 ? quantity + ' bouteilles ajout\u00e9es' : 'Ajout\u00e9 au panier'}`
                  : `Ajouter au panier${quantity > 1 ? ' (' + quantity + ')' : ''}`}
              </button>

              <p className="mt-8 text-cream-muted/40 text-xs text-center tracking-wider">
                L&apos;abus d&apos;alcool est dangereux pour la sante. A consommer avec moderation.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
