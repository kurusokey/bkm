'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function SuccesPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #1A1208 0%, #0B0E11 100%)' }}>
      {/* Bande image marche en haut */}
      <div className="relative" style={{ height: '35vh', minHeight: '220px' }}>
        <Image src="/images/marche-creole.jpg" alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,18,8,0.3) 0%, rgba(26,18,8,0.95) 100%)' }} />
      </div>

      {/* Contenu centre */}
      <div className="flex justify-center w-full" style={{ marginTop: '-60px', position: 'relative', zIndex: 2 }}>
        <div className="w-full text-center px-6 pb-20" style={{ maxWidth: '28rem' }}>

          <ScrollReveal delay={200} direction="up" distance={20} duration={1000}>
            <div className="flex justify-center mb-6">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
                <circle cx="30" cy="30" r="28" stroke="#C8A24D" strokeWidth="1.5" fill="rgba(200,162,77,0.06)" />
                <path d="M18 30 L26 38 L42 22" stroke="#C8A24D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400} direction="up" distance={30} duration={1000}>
            <h1 className="font-serif text-2xl text-gold text-shadow-lg mb-3 tracking-wide">
              Mèsi anpil !
            </h1>
            <p className="text-cream-muted/60 text-sm font-serif tracking-wider mb-8">
              Votre commande a bien été enregistrée
            </p>
          </ScrollReveal>

          <ScrollReveal delay={600} direction="up" distance={20} duration={1000}>
            <p className="text-cream-muted mb-10 leading-relaxed">
              Vous recevrez un e-mail de confirmation de Stripe.
              Votre rhum arrangé arrive bientôt !
            </p>
            <Link href="/boutique" className="btn-luxury-filled">
              Retour à la boutique
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
