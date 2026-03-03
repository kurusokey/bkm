import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
    console.error('[newsletter] SUPABASE_SERVICE_ROLE_KEY manquante — désinscription impossible');
    return NextResponse.json({ error: 'Service temporairement indisponible' }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase
    .from('newsletter_subscribers')
    .delete()
    .eq('email', email);

  if (error) {
    console.error('[newsletter] Erreur désinscription Supabase:', error.message);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }

  console.info('[newsletter] Désinscription effectuée:', email);
  return NextResponse.json({ success: true });
}
