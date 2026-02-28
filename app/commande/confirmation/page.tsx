import type { Metadata } from 'next';
import Link from 'next/link';
import Stripe from 'stripe';
import CartClearer from './CartClearer';

export const metadata: Metadata = {
  title: 'Commande confirmée',
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let session: Stripe.Checkout.Session | null = null;
  let error = false;

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items'],
      });
    } catch {
      error = true;
    }
  }

  const total = session?.amount_total
    ? (session.amount_total / 100).toFixed(2)
    : null;

  const email = session?.customer_details?.email ?? null;
  const orderRef = session_id ? session_id.slice(-8).toUpperCase() : '—';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ background: 'linear-gradient(180deg, #1A1208 0%, #0B0E11 100%)' }}
    >
      {/* Vider le panier côté client */}
      <CartClearer />

      {/* Icône succès */}
      <div className="mb-8">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="30" stroke="#C8A24D" strokeWidth="1.5" fill="rgba(200,162,77,0.06)" />
          <path d="M20 32 L28 40 L44 24" stroke="#C8A24D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-serif mb-3">
        Commande confirmée
      </p>
      <h1 className="font-serif text-2xl text-gold tracking-wide mb-2">
        Mèsi anpil !
      </h1>
      <p className="text-cream-muted/60 text-sm font-serif mb-10">
        Votre commande a bien été enregistrée
      </p>

      {/* Récapitulatif */}
      <div
        className="w-full mb-10 text-left"
        style={{
          maxWidth: '400px',
          background: 'rgba(200,162,77,0.05)',
          border: '1px solid rgba(200,162,77,0.15)',
          borderRadius: '8px',
          padding: '20px 24px',
        }}
      >
        <p className="font-serif text-gold/70 text-xs tracking-[0.2em] uppercase mb-4">
          Récapitulatif
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-cream-muted/60">Référence</span>
            <span className="text-cream font-mono text-xs">#{orderRef}</span>
          </div>
          {email && (
            <div className="flex justify-between">
              <span className="text-cream-muted/60">Email</span>
              <span className="text-cream text-xs">{email}</span>
            </div>
          )}
          {total && (
            <div className="flex justify-between border-t border-gold/10 pt-2 mt-2">
              <span className="text-cream font-semibold">Total payé</span>
              <span className="text-gold font-bold">{total} €</span>
            </div>
          )}
        </div>
      </div>

      {!error && (
        <p className="text-cream-muted/50 text-sm leading-relaxed mb-10" style={{ maxWidth: '380px' }}>
          Un email de confirmation vous a été envoyé.
          <br />
          Votre punch arrive bientôt !
        </p>
      )}

      <Link href="/boutique" className="btn-luxury-filled">
        Retour à la boutique
      </Link>

      <p className="text-cream/15 text-xs mt-10">
        L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
      </p>
    </div>
  );
}
