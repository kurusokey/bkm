import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commande annulée',
  robots: { index: false, follow: false },
};

export default function AnnulationPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ background: 'linear-gradient(180deg, #1A1208 0%, #0B0E11 100%)' }}
    >
      {/* Icône annulation */}
      <div className="mb-8">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="30" stroke="#8B2F3A" strokeWidth="1.5" fill="rgba(139,47,58,0.06)" />
          <path d="M22 22 L42 42M42 22 L22 42" stroke="#8B2F3A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <p className="text-xs uppercase tracking-[0.3em] text-cream-muted/50 font-serif mb-3">
        Paiement annulé
      </p>
      <h1 className="font-serif text-2xl text-gold tracking-wide mb-3">
        Votre commande a été annulée
      </h1>
      <p className="text-cream-muted/60 text-sm leading-relaxed mb-10" style={{ maxWidth: '360px' }}>
        Aucun montant n&apos;a été débité.
        <br />
        Votre panier est toujours disponible.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link href="/panier" className="btn-luxury">
          Retourner au panier
        </Link>
        <Link href="/boutique" className="text-sm text-cream-muted/60 hover:text-gold transition-colors">
          Continuer mes achats
        </Link>
      </div>

      <p className="text-cream/15 text-xs mt-10">
        L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
      </p>
    </div>
  );
}
