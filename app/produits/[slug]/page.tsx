'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
          <a href="/boutique" className="text-gold hover:text-gold-light transition-colors duration-500">
            Retour à la boutique
          </a>
        </div>
      </div>
    );
  }

  const price = (product.price_cents / 100).toFixed(2);

  return (
    <div className="min-h-screen relative">
      {/* Fond marché créole — fixe pleine page */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/marche-creole.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay chaud — tons bois/ambre */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(42,31,14,0.65) 0%, rgba(60,40,18,0.70) 40%, rgba(42,31,14,0.75) 70%, rgba(30,22,10,0.80) 100%)',
          }}
        />
      </div>

      {/* Contenu scrollable */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Breadcrumb */}
        <div className="pt-28 md:pt-36 px-6 max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 10 }}>
          <a
            href="/boutique"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              fontSize: '0.8rem',
              color: '#C8A24D',
              border: 'none',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              cursor: 'pointer',
            }}
          >
            &larr; Retour à la boutique
          </a>
        </div>

        {/* Carte produit — ambiance bois chaud */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6 pb-20">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background:
                'linear-gradient(160deg, rgba(60,40,18,0.55) 0%, rgba(42,31,14,0.50) 50%, rgba(30,22,10,0.60) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(200,162,77,0.18)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(200,162,77,0.08)',
            }}
          >
            {/* Bande madras décorative en haut */}
            <div
              style={{
                height: '4px',
                background:
                  'repeating-linear-gradient(90deg, #C8A24D 0px, #C8A24D 20px, #8B2F3A 20px, #8B2F3A 40px, #2A7C7B 40px, #2A7C7B 60px, #D4B76A 60px, #D4B76A 80px)',
                opacity: 0.7,
              }}
            />

            <div className="grid md:grid-cols-2">
              {/* Image produit */}
              <ScrollReveal direction="left" distance={40}>
                <div className="relative h-[380px] md:h-[620px] flex items-center justify-center">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at center, rgba(60,40,18,0.15) 0%, rgba(42,31,14,0.30) 100%)',
                    }}
                  />
                  {/* Cadre bois subtil autour de l'image */}
                  <div
                    className="absolute"
                    style={{
                      inset: '24px',
                      border: '1px solid rgba(200,162,77,0.12)',
                      borderRadius: '12px',
                      pointerEvents: 'none',
                    }}
                  />
                  <Image
                    src={getProductImage(product.slug, product.image_url)}
                    alt={product.name}
                    fill
                    className="object-contain p-10 md:p-14"
                  />
                </div>
              </ScrollReveal>

              {/* Séparateur vertical doré sur desktop */}
              <div className="hidden md:block absolute left-1/2 top-[60px] bottom-[60px] w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(200,162,77,0.25), transparent)' }} />

              {/* Détails */}
              <ScrollReveal direction="right" distance={40} delay={200}>
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  {/* Petite étiquette décorative */}
                  <p
                    className="font-serif mb-3"
                    style={{
                      fontSize: '0.6rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.35em',
                      color: '#C8A24D',
                      opacity: 0.6,
                    }}
                  >
                    Punch artisanal
                  </p>

                  {/* Nom */}
                  <h1 className="font-serif text-2xl md:text-3xl text-gold mb-2 leading-tight">
                    {product.name}
                  </h1>

                  {/* Tagline */}
                  {product.tagline && (
                    <p
                      className="italic mb-4"
                      style={{
                        color: '#D4B76A',
                        opacity: 0.7,
                        fontSize: '0.9rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {product.tagline}
                    </p>
                  )}

                  {/* Flavor badge — style madras */}
                  {product.flavor && (
                    <span
                      className="inline-block font-serif self-start mb-5"
                      style={{
                        fontSize: '0.7rem',
                        letterSpacing: '0.15em',
                        padding: '5px 14px',
                        borderRadius: '20px',
                        color: '#C8A24D',
                        background: 'rgba(200,162,77,0.08)',
                        border: '1px solid rgba(200,162,77,0.30)',
                      }}
                    >
                      {product.flavor}
                    </span>
                  )}

                  {/* Prix */}
                  <p className="text-xl md:text-2xl font-semibold text-warm-white mb-6 tracking-wide">
                    {price} &euro;
                  </p>

                  {/* Séparateur madras */}
                  <div
                    className="mb-6"
                    style={{
                      height: '2px',
                      background:
                        'repeating-linear-gradient(90deg, rgba(200,162,77,0.4) 0px, rgba(200,162,77,0.4) 12px, transparent 12px, transparent 16px, rgba(139,47,58,0.3) 16px, rgba(139,47,58,0.3) 28px, transparent 28px, transparent 32px)',
                    }}
                  />

                  {/* Caractéristiques — style étiquette marché */}
                  <div
                    className="mb-6 rounded-xl"
                    style={{
                      background: 'rgba(42,31,14,0.35)',
                      border: '1px solid rgba(200,162,77,0.10)',
                      padding: '16px 20px',
                    }}
                  >
                    <div className="space-y-3 text-sm">
                      {product.alcohol_degree && (
                        <div className="flex items-center justify-between">
                          <span className="uppercase tracking-[0.15em] text-xs" style={{ color: '#9B9285' }}>Degré</span>
                          <span className="text-cream">{product.alcohol_degree}&deg;</span>
                        </div>
                      )}
                      {product.volume_ml && (
                        <div className="flex items-center justify-between">
                          <span className="uppercase tracking-[0.15em] text-xs" style={{ color: '#9B9285' }}>Volume</span>
                          <span className="text-cream">{product.volume_ml / 10} cl</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="uppercase tracking-[0.15em] text-xs" style={{ color: '#9B9285' }}>Stock</span>
                        {product.stock_quantity > 0 ? (
                          <span className="text-teal">{product.stock_quantity} disponibles</span>
                        ) : (
                          <span className="text-crimson-light">Rupture de stock</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-cream-muted leading-relaxed mb-5 text-sm">{product.description}</p>

                  {/* Ingrédients */}
                  {product.ingredients && product.ingredients.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-2 font-serif">Ingrédients</p>
                      <p className="text-cream-muted text-sm leading-relaxed">
                        {product.ingredients.join(', ')}
                      </p>
                    </div>
                  )}

                  {/* Séparateur madras */}
                  <div
                    className="mb-6"
                    style={{
                      height: '2px',
                      background:
                        'repeating-linear-gradient(90deg, rgba(200,162,77,0.4) 0px, rgba(200,162,77,0.4) 12px, transparent 12px, transparent 16px, rgba(139,47,58,0.3) 16px, rgba(139,47,58,0.3) 28px, transparent 28px, transparent 32px)',
                    }}
                  />

                  {/* Quantité + Ajouter au panier */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {product.stock_quantity > 0 && (
                      <div className="flex items-center gap-3">
                        <span className="text-cream-muted text-xs tracking-wider uppercase">Qté</span>
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-cream/80 text-base transition-colors duration-300"
                          style={{ background: 'rgba(200,162,77,0.10)', border: '1px solid rgba(200,162,77,0.30)' }}
                        >
                          &minus;
                        </button>
                        <span className="text-cream font-semibold w-7 text-center text-base">{quantity}</span>
                        <button
                          onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-cream/80 text-base transition-colors duration-300"
                          style={{ background: 'rgba(200,162,77,0.10)', border: '1px solid rgba(200,162,77,0.30)' }}
                        >
                          +
                        </button>
                      </div>
                    )}

                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock_quantity === 0}
                      className={`py-2.5 px-7 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-500 rounded-lg ${
                        product.stock_quantity > 0
                          ? 'bg-gold text-ink hover:bg-gold-light'
                          : 'bg-slate-dark text-cream-muted cursor-not-allowed border border-gold-muted/10'
                      }`}
                    >
                      {added
                        ? `${quantity > 1 ? quantity + ' bouteilles ajout\u00e9es' : 'Ajout\u00e9 au panier'}`
                        : `Ajouter au panier${quantity > 1 ? ' (' + quantity + ')' : ''}`}
                    </button>
                  </div>

                  <p className="mt-8 text-cream-muted/30 text-xs text-center tracking-wider">
                    L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Bande madras décorative en bas */}
            <div
              style={{
                height: '4px',
                background:
                  'repeating-linear-gradient(90deg, #2A7C7B 0px, #2A7C7B 20px, #D4B76A 20px, #D4B76A 40px, #8B2F3A 40px, #8B2F3A 60px, #C8A24D 60px, #C8A24D 80px)',
                opacity: 0.7,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
