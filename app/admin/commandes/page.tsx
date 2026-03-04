"use client";

import { useCallback, useEffect, useState } from "react";

const STATUSES = [
  { value: "", label: "Tous" },
  { value: "paid", label: "Payé" },
  { value: "shipped", label: "Expédié" },
  { value: "delivered", label: "Livré" },
  { value: "cancelled", label: "Annulé" },
];

type OrderItem = { name: string; quantity: number; price_cents: number };
type Order = {
  id: string;
  created_at: string;
  customer_name: string | null;
  customer_email: string;
  total_amount_cents: number;
  status: string;
  items: OrderItem[];
  stripe_session_id: string;
};

function fmt(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}

const STATUS_LABELS: Record<string, string> = { paid: "Payé", shipped: "Expédié", delivered: "Livré", cancelled: "Annulé" };
const STATUS_COLORS: Record<string, string> = {
  paid: "rgba(42,124,123,0.85)",
  shipped: "rgba(200,162,77,0.90)",
  delivered: "rgba(74,222,128,0.85)",
  cancelled: "rgba(200,80,80,0.85)",
};

const CARD = { background: "rgba(6,14,7,0.28)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(200,162,77,0.75)", borderRadius: "20px", overflow: "hidden" } as const;
const HEADER_ZONE = { background: "radial-gradient(ellipse 70% 100% at 0% 50%, rgba(200,162,77,0.07) 0%, rgba(42,124,59,0.03) 55%, transparent 90%)" } as const;
const SEP = { height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.20), transparent)" } as const;
const SEP_LEFT = { height: "1px", background: "linear-gradient(90deg, rgba(200,162,77,0.18), transparent)" } as const;

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async (status: string) => {
    setLoading(true);
    const res = await fetch(status ? `/api/admin/orders?status=${status}` : "/api/admin/orders");
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(filter); }, [filter, load]);

  async function changeStatus(id: string, newStatus: string) {
    setUpdating(id);
    const res = await fetch(`/api/admin/orders?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: updated.status } : o)));
    }
    setUpdating(null);
  }

  return (
    <div style={CARD}>

      {/* Header */}
      <div style={{ ...HEADER_ZONE, padding: "1.5rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p className="font-serif uppercase tracking-[0.38em]" style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.50)" }}>
            Gestion
          </p>
          <div style={{ ...SEP_LEFT, marginTop: "0.35rem", marginBottom: "0.35rem" }} />
          <p className="font-serif text-gold" style={{ fontSize: "1.15rem", letterSpacing: "0.04em" }}>
            Commandes
          </p>
        </div>
        <p style={{ fontSize: "0.68rem", color: "rgba(232,224,208,0.22)" }}>
          {orders.length} commande{orders.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div style={SEP} />

      {/* Filtres */}
      <div style={{ padding: "1rem 1.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", borderBottom: "1px solid rgba(200,162,77,0.07)" }}>
        {STATUSES.map((s) => (
          <button
            type="button"
            key={s.value}
            onClick={() => setFilter(s.value)}
            style={{
              padding: "5px 14px",
              borderRadius: "8px",
              fontSize: "0.68rem",
              letterSpacing: "0.06em",
              background: filter === s.value ? "rgba(200,162,77,0.12)" : "transparent",
              border: filter === s.value ? "1px solid rgba(200,162,77,0.50)" : "1px solid rgba(200,162,77,0.15)",
              color: filter === s.value ? "rgba(200,162,77,0.95)" : "rgba(232,224,208,0.35)",
              transition: "all 0.15s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Vue mobile : cartes ── */}
      <div className="md:hidden">
        {loading && (
          <p style={{ padding: "3.5rem 1.5rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Chargement…</p>
        )}
        {!loading && orders.length === 0 && (
          <p style={{ padding: "3.5rem 1.5rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Aucune commande</p>
        )}
        {!loading && orders.map((order, i) => (
          <div
            key={order.id}
            style={{
              padding: "1rem 1.25rem",
              borderBottom: i < orders.length - 1 ? "1px solid rgba(200,162,77,0.07)" : "none",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "rgba(232,224,208,0.82)", fontSize: "0.85rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {order.customer_name ?? "—"}
                </p>
                <p style={{ color: "rgba(232,224,208,0.28)", fontSize: "0.68rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {order.customer_email}
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ color: "rgba(232,224,208,0.90)", fontSize: "0.88rem", fontWeight: 500 }}>
                  {fmt(order.total_amount_cents)}
                </p>
                <p style={{ color: "rgba(232,224,208,0.28)", fontSize: "0.65rem", marginTop: "2px" }}>
                  {new Date(order.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  borderRadius: "6px",
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  background: `${STATUS_COLORS[order.status] ?? "rgba(200,162,77,0.15)"}22`,
                  color: STATUS_COLORS[order.status] ?? "rgba(232,224,208,0.50)",
                  border: `1px solid ${STATUS_COLORS[order.status] ?? "rgba(200,162,77,0.15)"}55`,
                }}
              >
                {STATUS_LABELS[order.status] ?? order.status}
              </span>
              <select
                value={order.status}
                disabled={updating === order.id}
                onChange={(e) => changeStatus(order.id, e.target.value)}
                className="focus:outline-none disabled:opacity-40"
                style={{
                  background: "rgba(6,14,7,0.70)",
                  border: "1px solid rgba(200,162,77,0.22)",
                  borderRadius: "7px",
                  color: "rgba(232,224,208,0.60)",
                  fontSize: "0.75rem",
                  padding: "5px 8px",
                }}
              >
                {STATUSES.filter((s) => s.value).map((s) => (
                  <option key={s.value} value={s.value} className="bg-charcoal">{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* ── Vue desktop : tableau ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(200,162,77,0.10)" }}>
              {["Date", "Client", "Articles", "Montant", "Statut", "Action"].map((h) => (
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
            {loading && (
              <tr><td colSpan={6} style={{ padding: "3.5rem 1.75rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Chargement…</td></tr>
            )}
            {!loading && orders.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "3.5rem 1.75rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Aucune commande</td></tr>
            )}
            {!loading && orders.map((order, i) => (
              <tr key={order.id} style={{ borderBottom: i < orders.length - 1 ? "1px solid rgba(200,162,77,0.07)" : "none" }}>
                <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.38)", fontSize: "0.79rem", whiteSpace: "nowrap" }}>
                  {new Date(order.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td style={{ padding: "1.1rem 1.75rem" }}>
                  <p style={{ color: "rgba(232,224,208,0.82)", fontSize: "0.82rem" }}>{order.customer_name ?? "—"}</p>
                  <p style={{ color: "rgba(232,224,208,0.28)", fontSize: "0.70rem" }}>{order.customer_email}</p>
                </td>
                <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.35)", fontSize: "0.76rem", maxWidth: "180px" }}>
                  {Array.isArray(order.items) ? order.items.map((it) => `${it.name} ×${it.quantity}`).join(", ") : "—"}
                </td>
                <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.90)", fontSize: "0.82rem", fontWeight: 500 }}>
                  {fmt(order.total_amount_cents)}
                </td>
                <td style={{ padding: "1.1rem 1.75rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 10px",
                      borderRadius: "6px",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      background: `${STATUS_COLORS[order.status] ?? "rgba(200,162,77,0.15)"}22`,
                      color: STATUS_COLORS[order.status] ?? "rgba(232,224,208,0.50)",
                      border: `1px solid ${STATUS_COLORS[order.status] ?? "rgba(200,162,77,0.15)"}55`,
                    }}
                  >
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </td>
                <td style={{ padding: "1.1rem 1.75rem" }}>
                  <select
                    value={order.status}
                    disabled={updating === order.id}
                    onChange={(e) => changeStatus(order.id, e.target.value)}
                    className="focus:outline-none disabled:opacity-40"
                    style={{
                      background: "rgba(6,14,7,0.70)",
                      border: "1px solid rgba(200,162,77,0.22)",
                      borderRadius: "7px",
                      color: "rgba(232,224,208,0.60)",
                      fontSize: "0.72rem",
                      padding: "4px 8px",
                    }}
                  >
                    {STATUSES.filter((s) => s.value).map((s) => (
                      <option key={s.value} value={s.value} className="bg-charcoal">{s.label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
