'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import ScrollReveal from '@/components/ScrollReveal';

/* ── Bakoua SVG — conservé pour l'état vide ── */
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

/* ── Styles partagés ── */
const cardStyle: React.CSSProperties = {
  background: 'rgba(6,14,7,0.28)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(200,162,77,0.18)',
  borderRadius: '20px',
  overflow: 'hidden',
};

const logoZoneStyle: React.CSSProperties = {
  height: '180px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'radial-gradient(ellipse 70% 80% at 50% 55%, rgba(200,162,77,0.08) 0%, rgba(42,124,59,0.04) 50%, transparent 80%)',
};

const separatorStyle: React.CSSProperties = {
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.14), transparent)',
};

const lineSoftStyle: React.CSSProperties = {
  height: '1px',
  background: 'linear-gradient(90deg, rgba(200,162,77,0.15), transparent)',
};

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
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la commande');
      window.location.href = data.url;
    } catch (err) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      alert('Erreur : ' + msg);
    }
  };

  /* ════════ FOND COMMUN ════════ */
  const Background = () => (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Image
        src="/images/marche-creole.jpg"
        alt="Marché créole des Antilles"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,12,6,0.72)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(200,162,77,0.04) 0%, transparent 70%)',
        }}
      />
    </div>
  );

  /* ════════ ÉTAT VIDE ════════ */
  if (cart.length === 0) {
    return (
      <div style={{ background: '#060e07', minHeight: '100vh' }}>
        <Background />
        <div
          className="relative"
          style={{
            zIndex: 1,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '120px 24px 48px',
          }}
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <ScrollReveal direction="up" distance={30} delay={60}>
              <div style={cardStyle}>

                {/* Zone logo */}
                <div style={logoZoneStyle}>
                  <Link href="/" aria-label="Accueil" style={{ display: 'block' }}>
                    <Image
                      src="/images/bkm_logo_header.png"
                      alt="Bô Kay Mwen"
                      width={150}
                      height={150}
                      style={{ filter: 'drop-shadow(0 8px 24px rgba(200,162,77,0.2))' }}
                    />
                  </Link>
                </div>

                <div style={separatorStyle} />

                {/* Contenu */}
                <div style={{ padding: '1.75rem 1.75rem 2rem', textAlign: 'center' }}>
                  <p
                    className="font-serif uppercase tracking-[0.38em] mb-5"
                    style={{ fontSize: '0.58rem', color: 'rgba(200,162,77,0.4)' }}
                  >
                    Votre Panier
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', opacity: 0.35 }}>
                    <BakouaSvg size={70} />
                  </div>

                  <h1
                    className="font-serif text-gold tracking-wide"
                    style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}
                  >
                    Ton panier est vide
                  </h1>
                  <p
                    className="font-serif italic"
                    style={{ fontSize: '0.8rem', color: 'rgba(232,224,208,0.4)', marginBottom: '1.5rem' }}
                  >
                    Ba mwen an ti ponch
                  </p>

                  <div style={{ ...lineSoftStyle, marginBottom: '1.5rem' }} />

                  <Link href="/boutique" className="btn-luxury-filled">
                    An nou allé
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ════════ ÉTAT REMPLI ════════ */
  return (
    <div style={{ background: '#060e07', minHeight: '100vh' }}>
      <Background />

      <div
        className="relative"
        style={{ zIndex: 1, minHeight: '100vh', padding: '120px 24px 48px' }}
      >
        <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
          <ScrollReveal direction="up" distance={30} delay={60}>
            <div style={cardStyle}>

              {/* Zone logo */}
              <div style={logoZoneStyle}>
                <Image
                  src="/images/bkm_logo_header.png"
                  alt="Bô Kay Mwen"
                  width={150}
                  height={150}
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(200,162,77,0.2))' }}
                />
              </div>

              <div style={separatorStyle} />

              {/* Contenu */}
              <div style={{ padding: '1.75rem 1.75rem 2rem' }}>

                {/* En-tête */}
                <p
                  className="font-serif uppercase tracking-[0.38em] mb-1"
                  style={{ fontSize: '0.58rem', color: 'rgba(200,162,77,0.4)' }}
                >
                  Votre Panier
                </p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(232,224,208,0.38)', marginBottom: '1.25rem' }}>
                  {totalItems} article{totalItems > 1 ? 's' : ''}
                </p>

                <div style={{ ...lineSoftStyle, marginBottom: '1.25rem' }} />

                {/* Articles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {cart.map((item, i) => {
                    const price = (item.price_cents / 100).toFixed(2);
                    const total = ((item.price_cents * item.quantity) / 100).toFixed(2);
                    return (
                      <div
                        key={item.id}
                        style={{
                          paddingBottom: '1rem',
                          marginBottom: '1rem',
                          borderBottom: i < cart.length - 1 ? '1px solid rgba(200,162,77,0.08)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <div style={{ flex: 1 }}>
                            <h3
                              className="font-serif text-gold"
                              style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}
                            >
                              {item.name}
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(232,224,208,0.45)', marginBottom: '0.5rem' }}>
                              {price}&nbsp;&euro; / unité
                            </p>

                            {/* Contrôles quantité */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                style={{
                                  width: '44px', height: '44px',
                                  border: '1px solid rgba(200,162,77,0.28)',
                                  background: 'rgba(6,14,7,0.55)',
                                  borderRadius: '4px',
                                  color: 'rgba(232,224,208,0.8)',
                                  fontSize: '1rem',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  cursor: 'pointer',
                                }}
                              >
                                &minus;
                              </button>
                              <span style={{ width: '20px', textAlign: 'center', color: 'rgba(232,224,208,0.9)', fontSize: '0.85rem' }}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                style={{
                                  width: '44px', height: '44px',
                                  border: '1px solid rgba(200,162,77,0.28)',
                                  background: 'rgba(6,14,7,0.55)',
                                  borderRadius: '4px',
                                  color: 'rgba(232,224,208,0.8)',
                                  fontSize: '1rem',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  cursor: 'pointer',
                                }}
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                style={{
                                  marginLeft: 'auto',
                                  fontSize: '0.68rem',
                                  color: 'rgba(200,162,77,0.35)',
                                  cursor: 'pointer',
                                  background: 'none',
                                  border: 'none',
                                  padding: 0,
                                }}
                              >
                                Retirer
                              </button>
                            </div>
                          </div>

                          {/* Prix total ligne */}
                          <p
                            className="font-semibold text-gold"
                            style={{ fontSize: '1rem', flexShrink: 0, paddingTop: '2px' }}
                          >
                            {total}&nbsp;&euro;
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Vider le panier */}
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <button
                    onClick={clearCart}
                    style={{
                      fontSize: '0.68rem',
                      color: 'rgba(200,162,77,0.28)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Vider le panier
                  </button>
                </div>

                {/* Séparateur avant récap */}
                <div
                  style={{
                    height: '1px',
                    marginBottom: '1.25rem',
                    background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.25), transparent)',
                  }}
                />

                {/* Récapitulatif */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(232,224,208,0.45)' }}>Sous-total</span>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(232,224,208,0.65)' }}>{(totalPrice / 100).toFixed(2)}&nbsp;&euro;</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(232,224,208,0.45)' }}>Livraison</span>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(42,124,123,0.85)' }}>Gratuite</span>
                  </div>
                </div>

                <div
                  style={{
                    height: '1px',
                    marginBottom: '1.25rem',
                    background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.2), transparent)',
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span className="font-serif" style={{ fontSize: '1rem', color: 'rgba(232,224,208,0.9)' }}>Total</span>
                  <span className="font-bold text-gold" style={{ fontSize: '1.15rem' }}>{(totalPrice / 100).toFixed(2)}&nbsp;&euro;</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="btn-luxury-filled w-full disabled:opacity-50"
                >
                  {isLoading ? 'Redirection...' : 'Passer la commande'}
                </button>

                <p style={{ fontSize: '0.62rem', color: 'rgba(232,224,208,0.12)', textAlign: 'center', marginTop: '1rem' }}>
                  L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
                </p>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
