import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/*
  ── Supabase : table newsletter_subscribers à créer ──────────────────────────
  create table newsletter_subscribers (
    id uuid default gen_random_uuid() primary key,
    email text unique not null,
    status text default 'pending',
    created_at timestamptz default now()
  );
  alter table newsletter_subscribers enable row level security;
  ─────────────────────────────────────────────────────────────────────────────
*/

export async function POST(request: NextRequest) {
  let email: string;
  try {
    const body = await request.json();
    email = (body.email ?? '').trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Adresse email invalide' }, { status: 422 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('[newsletter] SUPABASE_SERVICE_ROLE_KEY manquante — email non enregistré:', email);
    // Répondre 200 pour ne pas exposer la config manquante au client
    return NextResponse.json({ success: true });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email, status: 'pending' }, { onConflict: 'email', ignoreDuplicates: true });

  if (error) {
    console.error('[newsletter] Erreur Supabase:', error.message);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }

  console.info('[newsletter] Inscription enregistrée:', email);
  return NextResponse.json({ success: true });
}
