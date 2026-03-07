import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

/*
  ── Supabase : table orders à créer dans le dashboard ──────────────────────────
  create table orders (
    id uuid default gen_random_uuid() primary key,
    stripe_session_id text unique not null,
    stripe_payment_intent_id text,
    customer_email text not null,
    customer_name text,
    shipping_address jsonb,
    items jsonb not null,
    total_amount_cents integer not null,
    currency text default 'eur',
    status text default 'paid',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  );
  alter table orders enable row level security;
  ─────────────────────────────────────────────────────────────────────────────
*/

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'STRIPE_SECRET_KEY manquante' }, { status: 500 });
  }
  if (!webhookSecret) {
    return NextResponse.json({ error: 'STRIPE_WEBHOOK_SECRET manquante' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);

  // Récupérer le corps brut pour la vérification de signature
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') ?? '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Signature invalide';
    console.error('[webhook] Signature invalide:', msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // Traiter uniquement les paiements complétés
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Récupérer les détails complets de la session
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items', 'customer_details'],
  });

  const customerDetails = fullSession.customer_details;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shippingDetails = (fullSession as any).shipping_details ?? null;

  // Préparer les données de commande
  let parsedItems: unknown[] = [];
  try {
    parsedItems = session.metadata?.items ? JSON.parse(session.metadata.items) : [];
  } catch {}

  const orderData = {
    stripe_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === 'string' ? session.payment_intent : null,
    customer_email: customerDetails?.email ?? '',
    customer_name: customerDetails?.name ?? null,
    shipping_address: shippingDetails?.address ?? null,
    items: parsedItems,
    total_amount_cents: session.amount_total ?? 0,
    currency: session.currency ?? 'eur',
    status: 'paid',
  };

  // Insérer dans Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    // Log l'ordre mais ne bloque pas Stripe (retourner 200)
    console.warn('[webhook] SUPABASE_SERVICE_ROLE_KEY manquante — ordre non enregistré');
    return NextResponse.json({ received: true });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabaseAdmin.from('orders').insert(orderData);

  if (error) {
    console.error('[webhook] Erreur Supabase:', error.message);
    // Retourner 500 pour que Stripe retente
    return NextResponse.json({ error: 'Erreur base de données' }, { status: 500 });
  }

  console.info('[webhook] Commande enregistrée:', session.id);
  return NextResponse.json({ received: true });
}
