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
  const displayName = product.category === 'coffret' ? product.name : product.name.replace(/^Punch\s+/i, '');

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
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(42,31,14,0.50) 0%, rgba(60,40,18,0.55) 40%, rgba(42,31,14,0.60) 70%, rgba(30,22,10,0.65) 100%)',
          }}
        />
      </div>

      {/* Contenu scrollable */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Zone haute — on voit le fond marché avec breadcrumb */}
        <div
          className="flex flex-col justify-end"
          style={{ height: '20vh', minHeight: '140px', paddingBottom: '16px' }}
        >
          <div className="mx-auto w-full px-6" style={{ maxWidth: '960px' }}>
            <a
              href="/boutique"
              className="text-shadow-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: '#C8A24D',
                textDecoration: 'none',
                letterSpacing: '0.1em',
              }}
            >
              &larr; Retour à la boutique
            </a>
          </div>
        </div>

        {/* Zone produit — fond semi-transparent + blur, comme la boutique */}
        <div
          className="w-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(42,31,14,0.55) 0%, rgba(30,22,10,0.60) 50%, rgba(42,31,14,0.55) 100%)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div
            className="mx-auto grid md:grid-cols-2 gap-10"
            style={{ maxWidth: '960px', padding: '40px 32px 40px' }}
          >
            {/* Image produit */}
            <ScrollReveal direction="left" distance={40}>
              <div className="relative h-[300px] md:h-[520px] flex items-center justify-center">
                <Image
                  src={getProductImage(product.slug, product.image_url)}
                  alt={product.name}
                  fill
                  className="object-contain p-6 md:p-10"
                />
              </div>
            </ScrollReveal>

            {/* Détails */}
            <ScrollReveal direction="right" distance={40} delay={200}>
              <div className="flex flex-col justify-center">
                {/* Étiquette */}
                <p
                  className="font-serif mb-3 text-shadow-sm"
                  style={{
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.35em',
                    color: '#C8A24D',
                    opacity: 0.6,
                  }}
                >
                  {product.category === 'coffret' ? 'Coffret cadeau' : 'Punch artisanal'}
                </p>

                {/* Nom */}
                <h1
                  className="font-serif text-gold leading-snug text-shadow-lg"
                  style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', marginBottom: '6px' }}
                >
                  {displayName}
                </h1>

                {/* Description */}
                <p className="text-cream leading-relaxed text-sm text-shadow-sm">
                  {product.description}
                </p>

                <div className="gold-line-wide" style={{ margin: '24px 0' }} />

                {/* Contenu du coffret */}
                {product.pack_contents && product.pack_contents.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] mb-3 font-serif text-cream-muted text-shadow-sm">Contenu du coffret</p>
                    <ul className="text-cream text-sm leading-relaxed text-shadow-sm space-y-1">
                      {product.pack_contents.map((item, i) => (
                        <li key={i}>— {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ingrédients */}
                {product.ingredients && product.ingredients.length > 0 && !product.pack_contents && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] mb-3 font-serif text-cream-muted text-shadow-sm">Ingrédients</p>
                    <p className="text-cream text-sm leading-relaxed text-shadow-sm">
                      {product.ingredients.join(', ')}
                    </p>
                  </div>
                )}

                <div className="gold-line-wide" style={{ margin: '24px 0' }} />

                {/* Caractéristiques */}
                <div className="space-y-4 text-sm">
                  {product.alcohol_degree && (
                    <p className="text-cream text-shadow-sm">
                      <span className="text-cream-muted">Degré :</span> {product.alcohol_degree}&deg;
                    </p>
                  )}
                  {product.volume_ml && (
                    <p className="text-cream text-shadow-sm">
                      <span className="text-cream-muted">Volume :</span> {product.volume_ml / 10}cl
                    </p>
                  )}
                  {product.stock_quantity === 0 && (
                    <p className="text-shadow-sm">
                      <span className="text-crimson-light">Rupture de stock</span>
                    </p>
                  )}
                </div>

                {/* Conseils de dégustation */}
                {product.tasting_tips && (
                  <>
                    <div className="gold-line-wide" style={{ margin: '24px 0' }} />
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] mb-3 font-serif text-cream-muted text-shadow-sm">Conseils de dégustation</p>
                      <p className="text-cream text-sm leading-relaxed text-shadow-sm italic">
                        {product.tasting_tips}
                      </p>
                    </div>
                  </>
                )}

                <div className="gold-line-wide" style={{ margin: '24px 0' }} />

                {/* Prix */}
                <p
                  className="text-2xl md:text-3xl font-semibold text-warm-white tracking-wide text-shadow-sm"
                >
                  {price} &euro;
                </p>

                <div className="gold-line-wide" style={{ margin: '24px 0' }} />

                {/* Quantité */}
                {product.stock_quantity > 0 && (
                  <div className="flex items-center gap-3" style={{ marginBottom: '32px' }}>
                    <span className="text-cream-muted text-xs tracking-wider uppercase text-shadow-sm">Qté</span>
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-cream/80 text-base transition-colors duration-300"
                      style={{ background: 'rgba(200,162,77,0.10)', border: '1px solid rgba(200,162,77,0.25)' }}
                    >
                      &minus;
                    </button>
                    <span className="text-cream font-semibold w-8 text-center text-base text-shadow-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-cream/80 text-base transition-colors duration-300"
                      style={{ background: 'rgba(200,162,77,0.10)', border: '1px solid rgba(200,162,77,0.25)' }}
                    >
                      +
                    </button>
                  </div>
                )}

                {/* Ajouter au panier */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className={`py-4 px-10 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-500 rounded-full w-full text-center ${
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
            </ScrollReveal>
          </div>
        </div>

        {/* Zone basse — on revoit le fond marché */}
        <div
          className="flex flex-col items-center justify-center"
          style={{ height: '20vh', minHeight: '120px' }}
        >
          <p className="text-cream/20 text-xs text-center px-6 text-shadow-sm">
            L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>
      </div>
    </div>
  );
}
