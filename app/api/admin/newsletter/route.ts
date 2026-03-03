import { type NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdminToken } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { data, error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
