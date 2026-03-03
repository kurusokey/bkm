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

const STATUS_COLORS: Record<string, string> = {
  paid: "rgba(42,124,123,0.75)",
  shipped: "rgba(200,162,77,0.80)",
  delivered: "rgba(74,222,128,0.75)",
  cancelled: "rgba(200,80,80,0.75)",
};
const STATUS_LABELS: Record<string, string> = {
  paid: "Payé",
  shipped: "Expédié",
  delivered: "Livré",
  cancelled: "Annulé",
};

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-8 min-h-screen" style={{ background: "#060e07" }}>
      {/* Halo subtil */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 30%, rgba(200,162,77,0.03) 0%, transparent 70%)",
        }}
      />

      {/* En-tête */}
      <div className="relative mb-10">
        <p
          className="font-serif uppercase tracking-[0.35em] mb-1"
          style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.40)" }}
        >
          ✦ Dashboard
        </p>
        <h1
          className="font-serif text-gold"
          style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", letterSpacing: "0.06em" }}
        >
          Vue d&apos;ensemble
        </h1>
        <div
          className="mt-3"
          style={{
            width: 40,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(200,162,77,0.40), transparent)",
          }}
        />
      </div>

      {/* Cartes stats */}
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: "Commandes",
            value: stats.totalOrders,
            sub: "au total",
          },
          {
            label: "Chiffre d'affaires",
            value: fmt(stats.totalRevenue),
            sub: "toutes commandes",
          },
          {
            label: "Abonnés",
            value: stats.subscribers,
            sub: "à la newsletter",
          },
          {
            label: "Messages",
            value: stats.unreadMessages,
            sub: stats.unreadMessages > 0 ? "non lus" : "en attente",
            highlight: stats.unreadMessages > 0,
          },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: "rgba(6,14,7,0.38)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(200,162,77,0.12)",
              borderRadius: "16px",
              padding: "1.4rem 1.5rem 1.5rem",
            }}
          >
            <p
              className="font-serif uppercase"
              style={{
                fontSize: "0.53rem",
                letterSpacing: "0.25em",
                color: "rgba(200,162,77,0.38)",
                marginBottom: "0.6rem",
              }}
            >
              {card.label}
            </p>
            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(200,162,77,0.12), transparent)",
                marginBottom: "0.75rem",
              }}
            />
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                color: card.highlight
                  ? "rgba(200,162,77,0.90)"
                  : "rgba(232,224,208,0.88)",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              {card.value}
            </p>
            {card.sub && (
              <p
                className="mt-1.5"
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(232,224,208,0.28)",
                }}
              >
                {card.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Dernières commandes */}
      <div className="relative">
        <div className="mb-5">
          <p
            className="font-serif uppercase tracking-[0.28em]"
            style={{ fontSize: "0.55rem", color: "rgba(200,162,77,0.38)" }}
          >
            Dernières commandes
          </p>
        </div>

        <div
          style={{
            background: "rgba(6,14,7,0.32)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(200,162,77,0.10)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(200,162,77,0.07)",
                }}
              >
                {["Date", "Client", "Montant", "Statut"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left font-serif uppercase"
                    style={{
                      fontSize: "0.5rem",
                      letterSpacing: "0.22em",
                      color: "rgba(200,162,77,0.32)",
                      fontWeight: 400,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recent.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center"
                    style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.8rem" }}
                  >
                    Aucune commande pour le moment
                  </td>
                </tr>
              )}
              {stats.recent.map((order: Order, i: number) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom:
                      i < stats.recent.length - 1
                        ? "1px solid rgba(200,162,77,0.05)"
                        : "none",
                  }}
                >
                  <td
                    className="px-6 py-4"
                    style={{ color: "rgba(232,224,208,0.40)", fontSize: "0.8rem" }}
                  >
                    {new Date(order.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ color: "rgba(232,224,208,0.80)", fontSize: "0.82rem" }}
                  >
                    {order.customer_name ?? order.customer_email}
                  </td>
                  <td
                    className="px-6 py-4 font-medium"
                    style={{ color: "rgba(232,224,208,0.88)", fontSize: "0.82rem" }}
                  >
                    {fmt(order.total_amount_cents)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        borderRadius: "6px",
                        background: `${STATUS_COLORS[order.status] ?? "rgba(200,162,77,0.15)"}22`,
                        color: STATUS_COLORS[order.status] ?? "rgba(232,224,208,0.50)",
                        border: `1px solid ${STATUS_COLORS[order.status] ?? "rgba(200,162,77,0.15)"}44`,
                      }}
                    >
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
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
