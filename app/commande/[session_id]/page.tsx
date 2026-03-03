import type { Metadata } from 'next';
import Link from 'next/link';
import Stripe from 'stripe';

export const metadata: Metadata = {
  title: 'Suivi de commande — Bô Kay Mwen',
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  paid:       { label: 'Payée',               color: '#3A9B9A' },
  pending:    { label: 'En attente',           color: '#C8A24D' },
  shipped:    { label: 'Expédiée',             color: '#3A9B9A' },
  delivered:  { label: 'Livrée',              color: '#3A9B9A' },
  cancelled:  { label: 'Annulée',             color: '#A63D4A' },
};

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ session_id: string }>;
}) {
  const { session_id } = await params;

  let session: Stripe.Checkout.Session | null = null;
  let fetchError = false;

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items'],
      });
    } catch {
      fetchError = true;
    }
  }

  const orderRef    = session_id.slice(-8).toUpperCase();
  const total       = session?.amount_total ? (session.amount_total / 100).toFixed(2) : null;
  const email       = session?.customer_details?.email ?? null;
  const paymentStatus = session?.payment_status ?? 'unknown';
  const status      = STATUS_LABELS[paymentStatus] ?? { label: 'Inconnu', color: '#9B9285' };
  const lineItems   = session?.line_items?.data ?? [];
  const createdAt   = session?.created
    ? new Date(session.created * 1000).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    : null;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{ background: 'linear-gradient(180deg, #1A1208 0%, #0B0E11 100%)' }}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-serif mb-3 text-center">
        Suivi de commande
      </p>
      <h1 className="font-serif text-2xl text-gold tracking-wide mb-8 text-center">
        #{orderRef}
      </h1>

      {fetchError || !session ? (
        <div
          className="w-full text-center"
          style={{
            maxWidth: '400px',
            background: 'rgba(139,47,58,0.08)',
            border: '1px solid rgba(139,47,58,0.3)',
            borderRadius: '8px',
            padding: '24px',
          }}
        >
          <p className="text-crimson-light text-sm mb-4">Commande introuvable.</p>
          <Link href="/boutique" className="text-xs text-gold/60 hover:text-gold transition-colors">
            Retour à la boutique
          </Link>
        </div>
      ) : (
        <div className="w-full space-y-4" style={{ maxWidth: '440px' }}>

          {/* Statut */}
          <div
            style={{
              background: 'rgba(200,162,77,0.05)',
              border: '1px solid rgba(200,162,77,0.15)',
              borderRadius: '8px',
              padding: '20px 24px',
            }}
          >
            <p className="font-serif text-gold/70 text-xs tracking-[0.2em] uppercase mb-4">Statut</p>
            <div className="flex items-center justify-between">
              <span className="text-cream text-sm">État de la commande</span>
              <span
                className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{
                  background: `${status.color}22`,
                  border: `1px solid ${status.color}55`,
                  color: status.color,
                }}
              >
                {status.label}
              </span>
            </div>
          </div>

          {/* Détails */}
          <div
            style={{
              background: 'rgba(200,162,77,0.05)',
              border: '1px solid rgba(200,162,77,0.15)',
              borderRadius: '8px',
              padding: '20px 24px',
            }}
          >
            <p className="font-serif text-gold/70 text-xs tracking-[0.2em] uppercase mb-4">Détails</p>
            <div className="space-y-2 text-sm">
              {createdAt && (
                <div className="flex justify-between">
                  <span className="text-cream-muted/70">Date</span>
                  <span className="text-cream">{createdAt}</span>
                </div>
              )}
              {email && (
                <div className="flex justify-between">
                  <span className="text-cream-muted/70">Email</span>
                  <span className="text-cream text-xs">{email}</span>
                </div>
              )}
              {lineItems.length > 0 && (
                <div className="pt-2 mt-2 border-t border-gold/10 space-y-1">
                  {lineItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-cream-muted/70">{item.description} × {item.quantity}</span>
                      <span className="text-cream">{item.amount_total ? (item.amount_total / 100).toFixed(2) : '—'} €</span>
                    </div>
                  ))}
                </div>
              )}
              {total && (
                <div className="flex justify-between border-t border-gold/10 pt-2 mt-2">
                  <span className="text-cream font-semibold">Total</span>
                  <span className="text-gold font-bold">{total} €</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-center pt-4">
            <Link href="/boutique" className="btn-luxury-filled" style={{ fontSize: '0.75rem' }}>
              Retour à la boutique
            </Link>
          </div>
        </div>
      )}

      <p className="text-cream/15 text-xs mt-10 text-center">
        L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
      </p>
    </div>
  );
}
