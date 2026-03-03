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

const CARD_STYLE = {
  background: "rgba(6,14,7,0.28)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(200,162,77,0.75)",
  borderRadius: "16px",
} as const;

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async (status: string) => {
    setLoading(true);
    const url = status ? `/api/admin/orders?status=${status}` : "/api/admin/orders";
    const res = await fetch(url);
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
    <div className="p-8">
      {/* En-tête */}
      <div className="mb-8">
        <p className="font-serif uppercase tracking-[0.35em] mb-1" style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.40)" }}>
          ✦ Gestion
        </p>
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-gold" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", letterSpacing: "0.06em" }}>
            Commandes
          </h1>
          <span style={{ fontSize: "0.7rem", color: "rgba(232,224,208,0.28)" }}>
            {orders.length} commande{orders.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="mt-3" style={{ width: 40, height: 1, background: "linear-gradient(90deg, rgba(200,162,77,0.50), transparent)" }} />
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUSES.map((s) => (
          <button
            type="button"
            key={s.value}
            onClick={() => setFilter(s.value)}
            className="px-4 py-1.5 text-sm transition-all"
            style={{
              borderRadius: "8px",
              background: filter === s.value ? "rgba(200,162,77,0.15)" : "rgba(6,14,7,0.28)",
              border: filter === s.value ? "1px solid rgba(200,162,77,0.70)" : "1px solid rgba(200,162,77,0.25)",
              color: filter === s.value ? "rgba(200,162,77,0.95)" : "rgba(232,224,208,0.40)",
              fontSize: "0.75rem",
              backdropFilter: "blur(12px)",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div style={{ ...CARD_STYLE, overflow: "hidden" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(200,162,77,0.15)" }}>
                {["Date", "Client", "Articles", "Montant", "Statut", "Action"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left font-serif uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.22em", color: "rgba(200,162,77,0.40)", fontWeight: 400 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="px-6 py-10 text-center" style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.8rem" }}>Chargement…</td></tr>
              )}
              {!loading && orders.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center" style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.8rem" }}>Aucune commande</td></tr>
              )}
              {!loading && orders.map((order, i) => (
                <tr key={order.id} style={{ borderBottom: i < orders.length - 1 ? "1px solid rgba(200,162,77,0.08)" : "none" }}>
                  <td className="px-6 py-4 whitespace-nowrap" style={{ color: "rgba(232,224,208,0.38)", fontSize: "0.8rem" }}>
                    {new Date(order.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4">
                    <p style={{ color: "rgba(232,224,208,0.82)", fontSize: "0.82rem" }}>{order.customer_name ?? "—"}</p>
                    <p style={{ color: "rgba(232,224,208,0.30)", fontSize: "0.7rem" }}>{order.customer_email}</p>
                  </td>
                  <td className="px-6 py-4 max-w-48" style={{ color: "rgba(232,224,208,0.38)", fontSize: "0.78rem" }}>
                    {Array.isArray(order.items) ? order.items.map((it: OrderItem) => `${it.name} ×${it.quantity}`).join(", ") : "—"}
                  </td>
                  <td className="px-6 py-4 font-medium" style={{ color: "rgba(232,224,208,0.90)", fontSize: "0.82rem" }}>
                    {fmt(order.total_amount_cents)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium" style={{ borderRadius: "6px", background: `${STATUS_COLORS[order.status] ?? "rgba(200,162,77,0.15)"}22`, color: STATUS_COLORS[order.status] ?? "rgba(232,224,208,0.50)", border: `1px solid ${STATUS_COLORS[order.status] ?? "rgba(200,162,77,0.15)"}55` }}>
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={(e) => changeStatus(order.id, e.target.value)}
                      className="focus:outline-none transition-colors disabled:opacity-40"
                      style={{ background: "rgba(6,14,7,0.70)", border: "1px solid rgba(200,162,77,0.30)", borderRadius: "7px", color: "rgba(232,224,208,0.70)", fontSize: "0.72rem", padding: "4px 8px" }}
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
    </div>
  );
}
