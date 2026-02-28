import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

interface CheckoutItem {
  id: string;
  name: string;
  price_cents: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY non configurée' }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);
    const { items } = (await request.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Le panier est vide' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'https://blackbeard-umber.vercel.app';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['FR', 'GP', 'MQ', 'GF', 'RE', 'PM', 'YT'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'eur' },
            display_name: 'Livraison offerte',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 590, currency: 'eur' },
            display_name: 'Livraison express',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            metadata: { product_id: item.id },
          },
          unit_amount: item.price_cents,
        },
        quantity: item.quantity,
      })),
      metadata: {
        // Sérialiser les items pour le webhook (max ~500 chars/key)
        items: JSON.stringify(
          items.map((i) => ({ id: i.id, name: i.name, price_cents: i.price_cents, qty: i.quantity }))
        ).slice(0, 480),
      },
      success_url: `${origin}/commande/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/commande/annulation`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur interne du serveur';
    console.error('[checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
