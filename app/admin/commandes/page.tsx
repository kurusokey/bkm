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
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

const STATUS_LABELS: Record<string, string> = {
  paid: "Payé",
  shipped: "Expédié",
  delivered: "Livré",
  cancelled: "Annulé",
};

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-teal/20 text-teal-light",
  shipped: "bg-gold/20 text-gold",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-crimson/20 text-crimson-light",
};

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async (status: string) => {
    setLoading(true);
    const url = status
      ? `/api/admin/orders?status=${status}`
      : "/api/admin/orders";
    const res = await fetch(url);
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load(filter);
  }, [filter, load]);

  async function changeStatus(id: string, newStatus: string) {
    setUpdating(id);
    const res = await fetch(`/api/admin/orders?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: updated.status } : o)),
      );
    }
    setUpdating(null);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-gold tracking-wider">
          Commandes
        </h1>
        <span className="text-cream-muted text-sm">
          {orders.length} commande{orders.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUSES.map((s) => (
          <button
            type="button"
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
              filter === s.value
                ? "bg-gold text-ink font-medium"
                : "border border-gold/20 text-cream-muted hover:text-cream hover:border-gold/40"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div
        className="rounded-xl border border-gold/20 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
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
                  Articles
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-cream-muted"
                  >
                    Chargement…
                  </td>
                </tr>
              )}
              {!loading && orders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-cream-muted"
                  >
                    Aucune commande
                  </td>
                </tr>
              )}
              {!loading &&
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gold/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-cream-muted whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-cream">{order.customer_name ?? "—"}</p>
                      <p className="text-cream-muted text-xs">
                        {order.customer_email}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-cream-muted max-w-48">
                      {Array.isArray(order.items)
                        ? order.items
                            .map(
                              (it: OrderItem) => `${it.name} ×${it.quantity}`,
                            )
                            .join(", ")
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-cream font-medium">
                      {fmt(order.total_amount_cents)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[order.status] ?? "bg-cream/10 text-cream-muted"}`}
                      >
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        disabled={updating === order.id}
                        onChange={(e) => changeStatus(order.id, e.target.value)}
                        className="bg-transparent border border-gold/30 text-cream text-xs rounded px-2 py-1 focus:outline-none focus:border-gold disabled:opacity-50"
                      >
                        {STATUSES.filter((s) => s.value).map((s) => (
                          <option
                            key={s.value}
                            value={s.value}
                            className="bg-charcoal"
                          >
                            {s.label}
                          </option>
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
