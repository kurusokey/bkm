export const dynamic = "force-dynamic";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function getStats() {
  const [ordersRes, newsletterRes, messagesRes] = await Promise.all([
    supabaseAdmin
      .from("orders")
      .select(
        "id, total_amount_cents, status, created_at, customer_name, customer_email, items",
      ),
    supabaseAdmin
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("contact_messages")
      .select("id, status", { count: "exact" }),
  ]);

  const orders = ordersRes.data ?? [];
  const totalRevenue = orders.reduce(
    (sum: number, o: { total_amount_cents: number }) =>
      sum + (o.total_amount_cents ?? 0),
    0,
  );
  const unreadMessages = (messagesRes.data ?? []).filter(
    (m: { status: string }) => m.status === "unread" || !m.status,
  ).length;
  const recent = orders.slice(0, 5);

  return {
    totalOrders: orders.length,
    totalRevenue,
    subscribers: newsletterRes.count ?? 0,
    unreadMessages,
    recent,
  };
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div
      className="rounded-xl border border-gold/20 p-5"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p className="text-cream-muted text-xs tracking-wider uppercase mb-1">
        {label}
      </p>
      <p className="text-2xl font-medium text-cream">{value}</p>
      {sub && <p className="text-cream-muted text-xs mt-0.5">{sub}</p>}
    </div>
  );
}

function fmt(cents: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

type Order = {
  id: string;
  created_at: string;
  customer_name: string | null;
  customer_email: string;
  total_amount_cents: number;
  status: string;
  items: unknown;
};

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-8">
      <h1 className="font-serif text-2xl text-gold tracking-wider mb-6">
        Vue d&apos;ensemble
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Commandes" value={stats.totalOrders} />
        <StatCard label="Chiffre d'affaires" value={fmt(stats.totalRevenue)} />
        <StatCard label="Abonnés newsletter" value={stats.subscribers} />
        <StatCard label="Messages non lus" value={stats.unreadMessages} />
      </div>

      {/* Dernières commandes */}
      <div
        className="rounded-xl border border-gold/20 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <div className="px-6 py-4 border-b border-gold/10">
          <h2 className="text-cream text-base font-medium">
            Dernières commandes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-cream-muted"
                  >
                    Aucune commande
                  </td>
                </tr>
              )}
              {stats.recent.map((order: Order) => (
                <tr
                  key={order.id}
                  className="border-b border-gold/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-3 text-cream-muted">
                    {new Date(order.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-3 text-cream">
                    {order.customer_name ?? order.customer_email}
                  </td>
                  <td className="px-6 py-3 text-cream">
                    {fmt(order.total_amount_cents)}
                  </td>
                  <td className="px-6 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-teal/20 text-teal-light",
    shipped: "bg-gold/20 text-gold",
    delivered: "bg-green-500/20 text-green-400",
    cancelled: "bg-crimson/20 text-crimson-light",
  };
  const labels: Record<string, string> = {
    paid: "Payé",
    shipped: "Expédié",
    delivered: "Livré",
    cancelled: "Annulé",
  };
  const cls = map[status] ?? "bg-cream/10 text-cream-muted";
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${cls}`}
    >
      {labels[status] ?? status}
    </span>
  );
}
