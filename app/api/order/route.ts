import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getProductBySlug } from '@/lib/products';
import { sendOrderEmails, type OrderEmailItem } from '@/lib/email';

/*
  ── Table orders (schéma hybride Stripe + email) ──
  Voir le SQL fourni dans la conversation. Ce flow remplit :
  - customer_name, customer_email, customer_address (text), customer_message
  - items (jsonb), total_amount_cents
  - source = 'email', status = 'pending'
  Les colonnes stripe_* restent NULL.
  ──────────────────────────────────────────────────
*/

interface IncomingItem {
  id: string;
  name: string;
  price_cents: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  let body: {
    customerName?: string;
    customerEmail?: string;
    customerAddress?: string;
    customerMessage?: string;
    items?: IncomingItem[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }

  const customerName = (body.customerName ?? '').trim();
  const customerEmail = (body.customerEmail ?? '').trim().toLowerCase();
  const customerAddress = (body.customerAddress ?? '').trim();
  const customerMessage = (body.customerMessage ?? '').trim();
  const items = body.items ?? [];

  if (!customerName || !customerEmail || !customerAddress) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return NextResponse.json({ error: 'Adresse email invalide' }, { status: 422 });
  }
  if (items.length === 0) {
    return NextResponse.json({ error: 'Le panier est vide' }, { status: 400 });
  }

  const verifiedItems: OrderEmailItem[] = [];
  const itemsJson: Array<{ id: string; name: string; price_cents: number; quantity: number }> = [];
  let totalCents = 0;

  for (const item of items) {
    const product = getProductBySlug(item.id);
    if (!product || !product.is_active) {
      return NextResponse.json({ error: `Produit indisponible : ${item.name}` }, { status: 400 });
    }
    if (product.price_cents !== item.price_cents) {
      return NextResponse.json({ error: `Prix invalide pour : ${item.name}` }, { status: 400 });
    }
    if (product.stock_quantity < item.quantity) {
      return NextResponse.json(
        { error: `Stock insuffisant pour : ${item.name} (${product.stock_quantity} disponible${product.stock_quantity > 1 ? 's' : ''})` },
        { status: 400 },
      );
    }

    verifiedItems.push({
      name: product.name,
      quantity: item.quantity,
      unitPriceCents: product.price_cents,
    });
    itemsJson.push({
      id: product.id,
      name: product.name,
      price_cents: product.price_cents,
      quantity: item.quantity,
    });
    totalCents += product.price_cents * item.quantity;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('[order] SUPABASE_SERVICE_ROLE_KEY manquante');
    return NextResponse.json({ error: 'Service temporairement indisponible' }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  const { data: order, error: insertError } = await supabase
    .from('orders')
    .insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_address: customerAddress,
      customer_message: customerMessage || null,
      items: itemsJson,
      total_amount_cents: totalCents,
      currency: 'eur',
      status: 'pending',
      source: 'email',
    })
    .select('id')
    .single();

  if (insertError || !order) {
    console.error('[order] Erreur Supabase:', insertError?.message);
    return NextResponse.json({ error: "Impossible d'enregistrer la commande" }, { status: 500 });
  }

  try {
    await sendOrderEmails({
      orderId: order.id,
      customerName,
      customerEmail,
      customerAddress,
      customerMessage: customerMessage || undefined,
      items: verifiedItems,
      totalCents,
    });
  } catch (err) {
    console.error('[order] Erreur email:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      {
        orderId: order.id,
        warning:
          "Commande enregistrée mais l'email de confirmation n'a pas pu être envoyé. Nous vous recontactons.",
      },
      { status: 202 },
    );
  }

  console.info('[order] Commande créée', order.id);
  return NextResponse.json({ orderId: order.id });
}
