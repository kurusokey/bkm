import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/*
  ── Supabase : table contact_messages à créer ────────────────────────────────
  create table contact_messages (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    subject text,
    message text not null,
    status text default 'unread',
    created_at timestamptz default now()
  );
  alter table contact_messages enable row level security;
  ─────────────────────────────────────────────────────────────────────────────
*/

export async function POST(request: NextRequest) {
  let name: string, email: string, subject: string, message: string;
  try {
    const body = await request.json();
    name = (body.name ?? '').trim();
    email = (body.email ?? '').trim().toLowerCase();
    subject = (body.subject ?? '').trim();
    message = (body.message ?? '').trim();
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 422 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Adresse email invalide' }, { status: 422 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('[contact] SUPABASE_SERVICE_ROLE_KEY manquante — message non enregistré:', { name, email, subject });
    return NextResponse.json({ success: true });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, subject, message });

  if (error) {
    console.error('[contact] Erreur Supabase:', error.message);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }

  console.info('[contact] Message reçu de:', email);
  return NextResponse.json({ success: true });
}
