export const dynamic = "force-dynamic";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function getStats() {
  const [ordersRes, newsletterRes, messagesRes] = await Promise.all([
    supabaseAdmin.from("orders").select("id, total_amount_cents, status, created_at, customer_name, customer_email"),
    supabaseAdmin.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("contact_messages").select("id, status", { count: "exact" }),
  ]);

  const orders = ordersRes.data ?? [];
  const totalRevenue = orders.reduce((sum: number, o: { total_amount_cents: number }) => sum + (o.total_amount_cents ?? 0), 0);
  const unreadMessages = (messagesRes.data ?? []).filter((m: { status: string }) => m.status === "unread" || !m.status).length;

  return {
    totalOrders: orders.length,
    totalRevenue,
    subscribers: newsletterRes.count ?? 0,
    unreadMessages,
    recent: orders.slice(0, 5),
  };
}

function fmt(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}

type Order = { id: string; created_at: string; customer_name: string | null; customer_email: string; total_amount_cents: number; status: string };

const STATUS_COLORS: Record<string, string> = {
  paid: "rgba(42,124,123,0.85)",
  shipped: "rgba(200,162,77,0.90)",
  delivered: "rgba(74,222,128,0.85)",
  cancelled: "rgba(200,80,80,0.85)",
};
const STATUS_LABELS: Record<string, string> = { paid: "Payé", shipped: "Expédié", delivered: "Livré", cancelled: "Annulé" };

const CARD = {
  background: "rgba(6,14,7,0.28)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(200,162,77,0.75)",
  borderRadius: "20px",
  overflow: "hidden",
} as const;

const SEP = { height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.20), transparent)" } as const;
const SEP_LEFT = { height: "1px", background: "linear-gradient(90deg, rgba(200,162,77,0.18), transparent)" } as const;
const HEADER_ZONE = { background: "radial-gradient(ellipse 70% 100% at 0% 50%, rgba(200,162,77,0.07) 0%, rgba(42,124,59,0.03) 55%, transparent 90%)" } as const;

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? "rgba(200,162,77,0.50)";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "6px",
        fontSize: "0.70rem",
        fontWeight: 500,
        background: `${color}22`,
        color,
        border: `1px solid ${color}55`,
        whiteSpace: "nowrap",
      }}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const STAT_CARDS = [
    { label: "Commandes", sup: "au total", value: String(stats.totalOrders) },
    { label: "Chiffre d'affaires", sup: "toutes commandes", value: fmt(stats.totalRevenue) },
    { label: "Abonnés newsletter", sup: "inscrits", value: String(stats.subscribers) },
    {
      label: "Messages non lus",
      sup: stats.unreadMessages > 0 ? "à traiter" : "aucun",
      value: String(stats.unreadMessages),
      highlight: stats.unreadMessages > 0,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* ── Cartes stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} style={CARD}>
            <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
              <p
                className="font-serif uppercase tracking-[0.20em]"
                style={{ fontSize: "0.48rem", color: "rgba(200,162,77,0.45)", marginBottom: "0.6rem" }}
              >
                {card.label}
              </p>
              <div style={{ ...SEP_LEFT, marginBottom: "0.85rem" }} />
              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(1.2rem, 4vw, 1.9rem)",
                  color: card.highlight ? "rgba(200,162,77,0.95)" : "rgba(232,224,208,0.92)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                {card.value}
              </p>
              <p style={{ fontSize: "0.58rem", color: "rgba(232,224,208,0.22)", marginTop: "0.4rem" }}>
                {card.sup}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dernières commandes ── */}
      <div style={CARD}>

        {/* Header */}
        <div style={{ ...HEADER_ZONE, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p className="font-serif uppercase tracking-[0.38em]" style={{ fontSize: "0.55rem", color: "rgba(200,162,77,0.50)" }}>
              Aperçu
            </p>
            <div style={{ ...SEP_LEFT, marginTop: "0.35rem", marginBottom: "0.35rem" }} />
            <p className="font-serif text-gold" style={{ fontSize: "1rem", letterSpacing: "0.04em" }}>
              Dernières commandes
            </p>
          </div>
          <p style={{ fontSize: "0.65rem", color: "rgba(232,224,208,0.22)" }}>
            {stats.totalOrders} au total
          </p>
        </div>
        <div style={SEP} />

        {/* ── Vue mobile : liste de cartes ── */}
        <div className="md:hidden">
          {stats.recent.length === 0 && (
            <p style={{ padding: "2.5rem 1.5rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>
              Aucune commande pour le moment
            </p>
          )}
          {stats.recent.map((order: Order, i: number) => (
            <div
              key={order.id}
              style={{
                padding: "1rem 1.5rem",
                borderBottom: i < stats.recent.length - 1 ? "1px solid rgba(200,162,77,0.07)" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "rgba(232,224,208,0.82)", fontSize: "0.82rem", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {order.customer_name ?? order.customer_email}
                </p>
                <p style={{ color: "rgba(232,224,208,0.32)", fontSize: "0.70rem" }}>
                  {new Date(order.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ color: "rgba(232,224,208,0.92)", fontSize: "0.82rem", fontWeight: 500, marginBottom: "0.3rem" }}>
                  {fmt(order.total_amount_cents)}
                </p>
                <StatusBadge status={order.status} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Vue desktop : tableau ── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(200,162,77,0.10)" }}>
                {["Date", "Client", "Montant", "Statut"].map((h) => (
                  <th
                    key={h}
                    className="text-left font-serif uppercase"
                    style={{ fontSize: "0.5rem", letterSpacing: "0.22em", color: "rgba(200,162,77,0.38)", fontWeight: 400, padding: "1rem 1.75rem" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recent.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: "3rem 1.75rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>
                    Aucune commande pour le moment
                  </td>
                </tr>
              )}
              {stats.recent.map((order: Order, i: number) => (
                <tr
                  key={order.id}
                  style={{ borderBottom: i < stats.recent.length - 1 ? "1px solid rgba(200,162,77,0.07)" : "none" }}
                >
                  <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.38)", fontSize: "0.80rem", whiteSpace: "nowrap" }}>
                    {new Date(order.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.82)", fontSize: "0.82rem" }}>
                    {order.customer_name ?? order.customer_email}
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.92)", fontSize: "0.82rem", fontWeight: 500 }}>
                    {fmt(order.total_amount_cents)}
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem" }}>
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
