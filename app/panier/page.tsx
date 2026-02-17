'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import ScrollReveal from '@/components/ScrollReveal';

/* ── Bakoua SVG ── */
function BakouaSvg({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 55" fill="none" aria-hidden="true">
      <ellipse cx="40" cy="45" rx="38" ry="6" stroke="#C8A24D" strokeWidth="1.5" fill="rgba(200,162,77,0.06)" />
      <path d="M40 4 L12 43 Q40 50 68 43 Z" stroke="#C8A24D" strokeWidth="1.2" fill="rgba(200,162,77,0.05)" />
      <line x1="25" y1="20" x2="32" y2="38" stroke="#8B7434" strokeWidth="0.5" opacity="0.3" />
      <line x1="33" y1="14" x2="38" y2="38" stroke="#8B7434" strokeWidth="0.5" opacity="0.3" />
      <line x1="41" y1="10" x2="44" y2="40" stroke="#8B7434" strokeWidth="0.5" opacity="0.3" />
      <line x1="49" y1="14" x2="50" y2="38" stroke="#8B7434" strokeWidth="0.5" opacity="0.3" />
      <line x1="55" y1="20" x2="55" y2="36" stroke="#8B7434" strokeWidth="0.5" opacity="0.3" />
      <path d="M16 40 Q40 46 64 40" stroke="#A63D4A" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

export default function PanierPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price_cents: item.price_cents,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la commande');
      }

      window.location.href = data.url;
    } catch {
      setIsLoading(false);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  /* ════════ ÉTAT VIDE ════════ */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #1A1208 0%, #0B0E11 100%)' }}>
        {/* Bande image marché en haut */}
        <div className="relative" style={{ height: '35vh', minHeight: '220px' }}>
          <Image src="/images/marche-creole.jpg" alt="" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,18,8,0.3) 0%, rgba(26,18,8,0.95) 100%)' }} />
        </div>

        {/* Contenu centré */}
        <div className="flex justify-center w-full" style={{ marginTop: '-60px', position: 'relative', zIndex: 2 }}>
          <div className="w-full text-center px-6 pb-20" style={{ maxWidth: '28rem' }}>

            <ScrollReveal delay={200} direction="up" distance={20} duration={1000}>
              <div className="flex justify-center mb-8" style={{ opacity: 0.45 }}>
                <BakouaSvg size={90} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400} direction="up" distance={30} duration={1000}>
              <h1 className="font-serif text-2xl text-gold text-shadow-lg mb-3 tracking-wide">
                Ton panier est vide
              </h1>
              <p className="text-cream-muted/60 text-sm font-serif tracking-wider mb-8">
                Ba mwen an ti ponch
              </p>
            </ScrollReveal>

            <ScrollReveal delay={600} direction="up" distance={20} duration={1000}>
              <p className="text-cream-muted mb-10 leading-relaxed">
                D&eacute;couvre nos rhums arrang&eacute;s artisanaux.
              </p>
              <Link href="/boutique" className="btn-luxury-filled">
                An nou all&eacute;
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ════════ ÉTAT REMPLI ════════ */
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #1A1208 0%, #0B0E11 60%, #0B0E11 100%)' }}>

      {/* ── Bandeau photo marché en haut ── */}
      <div className="relative" style={{ height: '30vh', minHeight: '200px' }}>
        <Image src="/images/marche-creole.jpg" alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,18,8,0.2) 0%, rgba(26,18,8,0.95) 100%)' }} />

        {/* Titre posé sur la photo */}
        <div className="absolute bottom-0 left-0 right-0 text-center pb-6" style={{ zIndex: 2 }}>
          <ScrollReveal delay={200} direction="up" distance={20} duration={1000}>
            <div className="flex justify-center mb-3">
              <BakouaSvg size={50} />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-cream/60 mb-2 font-serif">
              Au march&eacute;
            </p>
            <h1 className="font-serif text-2xl text-gold text-shadow-lg tracking-wide">
              Votre Panier
            </h1>
          </ScrollReveal>
        </div>
      </div>

      {/* ── L'étal : nappe madras + produits ── */}
      <div className="flex justify-center w-full">
        <div className="w-full px-4 pb-12" style={{ maxWidth: '56rem' }}>

          {/* Surface de l'étal — nappe madras */}
          <div
            className="madras-cloth rounded-t-lg"
            style={{ padding: '20px 16px 8px', marginTop: '-10px', position: 'relative', zIndex: 3 }}
          >
            <p className="text-cream/40 text-xs font-serif tracking-wider text-center mb-4">
              {totalItems} article{totalItems > 1 ? 's' : ''} sur l&apos;&eacute;tal
            </p>
          </div>

          {/* Planche en bois — contient les produits */}
          <div className="wood-surface rounded-b-lg" style={{ padding: '8px 12px 20px' }}>

            {/* Produits sur l'étal */}
            <div className="space-y-3 mb-6">
              {cart.map((item, index) => {
                const price = (item.price_cents / 100).toFixed(2);
                const total = ((item.price_cents * item.quantity) / 100).toFixed(2);

                return (
                  <ScrollReveal key={item.id} delay={Math.min(index * 100, 400)} direction="up" distance={15} duration={800}>
                    <div
                      className="rounded-lg p-4 flex gap-4"
                      style={{
                        background: 'rgba(245,240,232,0.06)',
                        borderBottom: '1px solid rgba(200,162,77,0.12)',
                      }}
                    >
                      {/* Bouteille */}
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(42,31,14,0.5)', border: '1px solid rgba(200,162,77,0.15)' }}
                      >
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#8B7434" strokeWidth="1.5">
                          <rect x="6" y="3" width="12" height="18" rx="4" />
                          <rect x="8" y="1" width="8" height="4" rx="2" />
                        </svg>
                      </div>

                      {/* Détails produit */}
                      <div className="flex-grow min-w-0">
                        <h3 className="font-serif text-gold text-base tracking-wide">{item.name}</h3>
                        <p className="text-cream-muted/60 text-sm">{price} &euro;</p>

                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded text-cream/80 text-sm transition-colors duration-300"
                              style={{ background: 'rgba(42,31,14,0.6)', border: '1px solid rgba(200,162,77,0.2)' }}
                            >
                              &minus;
                            </button>
                            <span className="text-cream font-semibold w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded text-cream/80 text-sm transition-colors duration-300"
                              style={{ background: 'rgba(42,31,14,0.6)', border: '1px solid rgba(200,162,77,0.2)' }}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-crimson-light/70 hover:text-crimson-light text-xs ml-auto transition-colors duration-300"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>

                      {/* Prix total */}
                      <div className="text-right shrink-0 flex items-center">
                        <p className="font-semibold text-gold text-lg">{total} &euro;</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Vider le panier */}
            <div className="text-center mb-6">
              <button
                onClick={clearCart}
                className="text-cream-muted/40 hover:text-crimson-light text-xs transition-colors duration-300"
              >
                Vider l&apos;&eacute;tal
              </button>
            </div>

            {/* ── L'ardoise — récapitulatif ── */}
            <ScrollReveal delay={300} direction="up" distance={15} duration={800}>
              <div className="market-slate rounded-lg" style={{ padding: '20px' }}>

                {/* Titre ardoise */}
                <div className="text-center mb-4">
                  <p className="font-serif text-gold/80 text-sm tracking-wider uppercase">L&apos;addition</p>
                </div>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between">
                    <span className="text-cream/60">Sous-total</span>
                    <span className="text-cream/80">{(totalPrice / 100).toFixed(2)} &euro;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/60">Livraison</span>
                    <span className="text-teal">Gratuite</span>
                  </div>

                  {/* Trait à la craie */}
                  <div className="flex justify-center py-1">
                    <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.3), transparent)' }} />
                  </div>

                  <div className="flex justify-between text-lg">
                    <span className="text-cream font-semibold">Total</span>
                    <span className="text-gold font-bold">{(totalPrice / 100).toFixed(2)} &euro;</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="btn-luxury-filled w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Redirection...' : 'Passer la commande'}
                </button>

                <p className="mt-4 text-cream/20 text-xs text-center">
                  L&apos;abus d&apos;alcool est dangereux pour la sant&eacute;.
                </p>
              </div>
            </ScrollReveal>

          </div>

          {/* Bord de la nappe madras qui dépasse sous la planche */}
          <div
            className="madras-cloth rounded-b-lg"
            style={{ height: '12px' }}
          />

        </div>
      </div>
    </div>
  );
}
