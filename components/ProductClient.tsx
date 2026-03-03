'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import ScrollReveal from '@/components/ScrollReveal';
import { getProductImage } from '@/lib/productImages';

interface ProductClientProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductClient({ product, relatedProducts = [] }: ProductClientProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [addedRelatedId, setAddedRelatedId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `${product.name} — Punch artisanal Bô Kay Mwen`;
    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url).catch(() => {});
    }
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
    }, 2000);
  };

  const handleAddRelated = (p: Product) => {
    addToCart(p);
    setAddedRelatedId(p.id);
    setTimeout(() => setAddedRelatedId(null), 1500);
  };

  const price = (product.price_cents / 100).toFixed(2);
  const displayName = product.category === 'coffret' ? product.name : product.name.replace(/^Punch\s+/i, '');

  return (
    <div className="min-h-screen relative" style={{ overscrollBehavior: 'none' }}>
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
        {/* Breadcrumb */}
        <div
          className="flex flex-col justify-end"
          style={{ height: '20vh', minHeight: '140px', paddingBottom: '16px' }}
        >
          <div className="mx-auto w-full px-6" style={{ maxWidth: '960px' }}>
            <nav aria-label="fil d'ariane">
              <ol className="flex flex-wrap items-center gap-1 text-shadow-sm" style={{ fontSize: '0.75rem' }}>
                <li>
                  <Link
                    href="/"
                    style={{ color: 'rgba(200,162,77,0.5)', textDecoration: 'none' }}
                    className="hover:text-gold transition-colors"
                  >
                    Accueil
                  </Link>
                </li>
                <li style={{ color: 'rgba(200,162,77,0.3)' }}>/</li>
                <li>
                  <Link
                    href="/boutique"
                    style={{ color: 'rgba(200,162,77,0.5)', textDecoration: 'none' }}
                    className="hover:text-gold transition-colors"
                  >
                    Boutique
                  </Link>
                </li>
                <li style={{ color: 'rgba(200,162,77,0.3)' }}>/</li>
                <li style={{ color: '#C8A24D' }}>{displayName}</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Zone produit */}
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

                {/* Tagline */}
                {product.tagline && (
                  <p className="text-cream-muted/60 italic text-sm text-shadow-sm mb-3">
                    {product.tagline}
                  </p>
                )}

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
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {product.alcohol_degree && (
                    <div
                      className="flex flex-col items-center justify-center text-center py-3 rounded-lg"
                      style={{ background: 'rgba(200,162,77,0.07)', border: '1px solid rgba(200,162,77,0.12)' }}
                    >
                      <span className="text-cream-muted text-xs uppercase tracking-widest mb-1 font-serif text-shadow-sm">Degré</span>
                      <span className="text-gold font-semibold text-base text-shadow-sm">{product.alcohol_degree}°</span>
                    </div>
                  )}
                  {(product.volume ?? product.volume_ml) && (
                    <div
                      className="flex flex-col items-center justify-center text-center py-3 rounded-lg"
                      style={{ background: 'rgba(200,162,77,0.07)', border: '1px solid rgba(200,162,77,0.12)' }}
                    >
                      <span className="text-cream-muted text-xs uppercase tracking-widest mb-1 font-serif text-shadow-sm">Volume</span>
                      <span className="text-gold font-semibold text-base text-shadow-sm">
                        {product.volume ?? `${(product.volume_ml! / 10)}cl`}
                      </span>
                    </div>
                  )}
                </div>

                {product.stock_quantity === 0 && (
                  <p className="text-shadow-sm mt-3">
                    <span className="text-crimson-light text-sm">Rupture de stock</span>
                  </p>
                )}

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
                <p className="text-2xl md:text-3xl font-semibold text-warm-white tracking-wide text-shadow-sm">
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
                    ? `${quantity > 1 ? quantity + ' bouteilles ajoutées' : 'Ajouté au panier'}`
                    : `Ajouter au panier${quantity > 1 ? ' (' + quantity + ')' : ''}`}
                </button>

                {/* Bouton de partage */}
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs uppercase tracking-[0.15em] text-cream-muted/50 hover:text-gold transition-colors duration-300 font-serif"
                  style={{ marginTop: '1.25rem' }}
                >
                  {shared ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Lien copié !
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Partager ce produit
                    </>
                  )}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Section "Vous aimerez aussi" */}
        {relatedProducts.length > 0 && (
          <div
            className="w-full"
            style={{
              background: 'rgba(30,22,10,0.55)',
              backdropFilter: 'blur(2px)',
              padding: '4rem 0 4.5rem',
            }}
          >
            <div className="mx-auto" style={{ maxWidth: '960px', padding: '0 32px' }}>

              {/* Titre */}
              <ScrollReveal direction="up" distance={20}>
                <div className="text-center mb-10">
                  <p
                    className="font-serif uppercase tracking-[0.38em]"
                    style={{ fontSize: '0.58rem', color: 'rgba(200,162,77,0.50)' }}
                  >
                    Vous aimerez aussi
                  </p>
                  <div
                    style={{
                      width: '32px', height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.35), transparent)',
                      margin: '0.6rem auto 0',
                    }}
                  />
                </div>
              </ScrollReveal>

              {/* Grille — style coffrets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedProducts.map((related, i) => {
                  const relatedPrice = (related.price_cents / 100).toFixed(2);
                  const relatedName =
                    related.category === 'coffret'
                      ? related.name
                      : related.name.replace(/^Punch\s+/i, '');
                  const isAddedRelated = addedRelatedId === related.id;

                  return (
                    <ScrollReveal key={related.id} delay={i * 80} distance={25}>
                      <div
                        className="group"
                        style={{
                          background: 'rgba(6,14,7,0.28)',
                          backdropFilter: 'blur(24px)',
                          WebkitBackdropFilter: 'blur(24px)',
                          border: '1px solid rgba(200,162,77,0.18)',
                          borderRadius: '20px',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Zone image */}
                        <Link href={`/produits/${related.slug}`}>
                          <div
                            className="relative flex items-center justify-center"
                            style={{
                              height: '200px',
                              background:
                                'radial-gradient(ellipse 70% 80% at 50% 55%, rgba(200,162,77,0.08) 0%, rgba(42,124,59,0.04) 50%, transparent 80%)',
                            }}
                          >
                            <Image
                              src={getProductImage(related.slug, related.image_url)}
                              alt={related.name}
                              fill
                              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                              sizes="(min-width: 640px) 33vw, 100vw"
                            />
                          </div>
                        </Link>

                        {/* Séparateur */}
                        <div
                          style={{
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.14), transparent)',
                          }}
                        />

                        {/* Infos */}
                        <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                          <Link href={`/produits/${related.slug}`}>
                            <h3
                              className="font-serif text-gold leading-snug mb-1"
                              style={{ fontSize: '0.95rem' }}
                            >
                              {relatedName}
                            </h3>
                          </Link>
                          {related.tagline && (
                            <p className="italic text-cream-muted/45" style={{ fontSize: '0.75rem' }}>
                              {related.tagline}
                            </p>
                          )}
                          <div
                            style={{
                              height: '1px',
                              background: 'linear-gradient(90deg, rgba(200,162,77,0.12), transparent)',
                              margin: '0.85rem 0',
                            }}
                          />
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p className="text-warm-white font-semibold" style={{ fontSize: '1rem' }}>
                              {relatedPrice}&nbsp;€
                            </p>
                            <button
                              onClick={() => handleAddRelated(related)}
                              disabled={related.stock_quantity === 0}
                              className="disabled:opacity-40 transition-all duration-300"
                              style={{
                                padding: '6px 14px',
                                fontSize: '0.65rem',
                                letterSpacing: '0.08em',
                                borderRadius: '8px',
                                border: isAddedRelated
                                  ? '1px solid rgba(42,124,123,0.6)'
                                  : '1px solid rgba(200,162,77,0.40)',
                                background: isAddedRelated
                                  ? 'rgba(42,124,123,0.2)'
                                  : 'rgba(200,162,77,0.10)',
                                color: isAddedRelated ? '#3A9B9A' : '#C8A24D',
                                cursor: related.stock_quantity > 0 ? 'pointer' : 'not-allowed',
                              }}
                            >
                              {isAddedRelated ? 'Ajouté !' : 'Ajouter'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Zone basse */}
        <div
          className="flex flex-col items-center justify-center"
          style={{ height: '16vh', minHeight: '100px' }}
        >
          <p className="text-cream/20 text-xs text-center px-6 text-shadow-sm">
            L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>
      </div>
    </div>
  );
}
