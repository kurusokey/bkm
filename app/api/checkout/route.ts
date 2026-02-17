import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CheckoutItem {
  id: string;
  name: string;
  price_cents: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = (await request.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 },
      );
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price_cents,
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/panier/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Stripe.errors.StripeError
        ? err.message
        : 'Erreur interne du serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
