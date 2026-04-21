"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/* ── Cycle de vie principal : pending → processing → archived ──
   cancelled reste accessible en cas d'annulation
   paid/shipped/delivered sont conservés pour compat historique Stripe
   ─────────────────────────────────────────────────────────────── */

interface StatusDef {
  value: string;
  label: string;
  color: string;
  // Action contextuelle : texte + prochain statut
  nextAction?: { label: string; next: string };
}

const PRIMARY_STATUSES: StatusDef[] = [
  {
    value: "pending",
    label: "En attente",
    color: "rgba(200,162,77,0.90)",
    nextAction: { label: "Prendre en charge →", next: "processing" },
  },
  {
    value: "processing",
    label: "En cours",
    color: "rgba(74,144,226,0.85)",
    nextAction: { label: "Archiver →", next: "archived" },
  },
  {
    value: "archived",
    label: "Archivée",
    color: "rgba(132,132,132,0.75)",
    nextAction: { label: "Rouvrir", next: "processing" },
  },
  {
    value: "cancelled",
    label: "Annulée",
    color: "rgba(200,80,80,0.75)",
  },
];

// Statuts historiques (Stripe) — gardés pour ne pas casser les anciennes commandes
const LEGACY_STATUSES: StatusDef[] = [
  { value: "paid",      label: "Payé",     color: "rgba(42,124,123,0.85)" },
  { value: "shipped",   label: "Expédié",  color: "rgba(200,162,77,0.90)" },
  { value: "delivered", label: "Livré",    color: "rgba(74,222,128,0.85)" },
];

const ALL_STATUSES = [...PRIMARY_STATUSES, ...LEGACY_STATUSES];
const STATUS_MAP: Record<string, StatusDef> = Object.fromEntries(
  ALL_STATUSES.map((s) => [s.value, s]),
);

const FILTERS: { value: string; label: string }[] = [
  { value: "pending",    label: "En attente" },
  { value: "processing", label: "En cours"   },
  { value: "archived",   label: "Archivées"  },
  { value: "cancelled",  label: "Annulées"   },
  { value: "",           label: "Toutes"     },
];

type OrderItem = { name: string; quantity: number; price_cents: number };
type Order = {
  id: string;
  created_at: string;
  customer_name: string | null;
  customer_email: string;
  customer_message?: string | null;
  total_amount_cents: number;
  status: string;
  items: OrderItem[];
  source?: string | null;
  stripe_session_id?: string | null;
};

function fmt(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}

const CARD = { background: "rgba(6,14,7,0.28)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(200,162,77,0.75)", borderRadius: "20px", overflow: "hidden" } as const;
const HEADER_ZONE = { background: "radial-gradient(ellipse 70% 100% at 0% 50%, rgba(200,162,77,0.07) 0%, rgba(42,124,59,0.03) 55%, transparent 90%)" } as const;
const SEP = { height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.20), transparent)" } as const;
const SEP_LEFT = { height: "1px", background: "linear-gradient(90deg, rgba(200,162,77,0.18), transparent)" } as const;

function StatusBadge({ status }: { status: string }) {
  const def = STATUS_MAP[status] ?? { label: status, color: "rgba(200,162,77,0.5)" };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "6px",
        fontSize: "0.72rem",
        fontWeight: 500,
        background: `${def.color}22`,
        color: def.color,
        border: `1px solid ${def.color}55`,
        whiteSpace: "nowrap",
      }}
    >
      {def.label}
    </span>
  );
}

function ActionButton({
  label,
  disabled,
  onClick,
  muted = false,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="disabled:opacity-40 hover:opacity-80 transition-opacity"
      style={{
        padding: "5px 12px",
        borderRadius: "7px",
        fontSize: "0.70rem",
        letterSpacing: "0.04em",
        fontWeight: 500,
        background: muted ? "transparent" : "rgba(200,162,77,0.15)",
        border: muted ? "1px solid rgba(200,162,77,0.15)" : "1px solid rgba(200,162,77,0.55)",
        color: muted ? "rgba(232,224,208,0.35)" : "rgba(200,162,77,0.95)",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [updating, setUpdating] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const load = useCallback(async (status: string) => {
    setLoading(true);
    const res = await fetch(status ? `/api/admin/orders?status=${status}` : "/api/admin/orders");
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  // Charge les compteurs par statut pour afficher dans les onglets
  const loadCounts = useCallback(async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    if (!Array.isArray(data)) return;
    const next: Record<string, number> = {};
    for (const o of data) {
      next[o.status] = (next[o.status] ?? 0) + 1;
    }
    setCounts(next);
  }, []);

  useEffect(() => { load(filter); }, [filter, load]);
  useEffect(() => { loadCounts(); }, [loadCounts]);

  const changeStatus = useCallback(
    async (id: string, newStatus: string) => {
      setUpdating(id);
      const res = await fetch(`/api/admin/orders?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        // Recharger la liste filtrée (la commande disparaît peut-être du filtre)
        await load(filter);
        await loadCounts();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(`Erreur : ${data.error ?? "impossible de mettre à jour le statut"}`);
      }
      setUpdating(null);
    },
    [filter, load, loadCounts],
  );

  const toggleCancelled = useCallback(
    (order: Order) => {
      if (order.status === "cancelled") {
        changeStatus(order.id, "pending");
      } else if (confirm(`Annuler la commande de ${order.customer_name ?? order.customer_email} ?`)) {
        changeStatus(order.id, "cancelled");
      }
    },
    [changeStatus],
  );

  const totalCount = useMemo(() => Object.values(counts).reduce((a, b) => a + b, 0), [counts]);

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
          {totalCount} au total
        </p>
      </div>
      <div style={SEP} />

      {/* Filtres avec compteurs */}
      <div style={{ padding: "1rem 1.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", borderBottom: "1px solid rgba(200,162,77,0.07)" }}>
        {FILTERS.map((f) => {
          const count = f.value ? counts[f.value] ?? 0 : totalCount;
          return (
            <button
              type="button"
              key={f.value || "all"}
              onClick={() => setFilter(f.value)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "0.70rem",
                letterSpacing: "0.06em",
                background: filter === f.value ? "rgba(200,162,77,0.12)" : "transparent",
                border: filter === f.value ? "1px solid rgba(200,162,77,0.50)" : "1px solid rgba(200,162,77,0.15)",
                color: filter === f.value ? "rgba(200,162,77,0.95)" : "rgba(232,224,208,0.35)",
                transition: "all 0.15s",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {f.label}
              <span
                style={{
                  background: filter === f.value ? "rgba(200,162,77,0.20)" : "rgba(200,162,77,0.08)",
                  padding: "1px 7px",
                  borderRadius: "99px",
                  fontSize: "0.62rem",
                  color: filter === f.value ? "rgba(200,162,77,0.95)" : "rgba(232,224,208,0.45)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Vue mobile : cartes ── */}
      <div className="md:hidden">
        {loading && (
          <p style={{ padding: "3.5rem 1.5rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Chargement…</p>
        )}
        {!loading && orders.length === 0 && (
          <p style={{ padding: "3.5rem 1.5rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Aucune commande</p>
        )}
        {!loading && orders.map((order, i) => {
          const def = STATUS_MAP[order.status];
          const next = def?.nextAction;
          return (
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

              {Array.isArray(order.items) && order.items.length > 0 && (
                <p style={{ color: "rgba(232,224,208,0.45)", fontSize: "0.72rem", marginBottom: "0.6rem" }}>
                  {order.items.map((it) => `${it.name} ×${it.quantity}`).join(" · ")}
                </p>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                <StatusBadge status={order.status} />
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {next && (
                    <ActionButton
                      label={next.label}
                      disabled={updating === order.id}
                      onClick={() => changeStatus(order.id, next.next)}
                    />
                  )}
                  {order.status !== "cancelled" && order.status !== "archived" && (
                    <ActionButton
                      label="Annuler"
                      muted
                      disabled={updating === order.id}
                      onClick={() => toggleCancelled(order)}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
            {!loading && orders.map((order, i) => {
              const def = STATUS_MAP[order.status];
              const next = def?.nextAction;
              return (
                <tr key={order.id} style={{ borderBottom: i < orders.length - 1 ? "1px solid rgba(200,162,77,0.07)" : "none" }}>
                  <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.38)", fontSize: "0.79rem", whiteSpace: "nowrap" }}>
                    {new Date(order.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem" }}>
                    <p style={{ color: "rgba(232,224,208,0.82)", fontSize: "0.82rem" }}>{order.customer_name ?? "—"}</p>
                    <p style={{ color: "rgba(232,224,208,0.28)", fontSize: "0.70rem" }}>{order.customer_email}</p>
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.35)", fontSize: "0.76rem", maxWidth: "220px" }}>
                    {Array.isArray(order.items) ? order.items.map((it) => `${it.name} ×${it.quantity}`).join(", ") : "—"}
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.90)", fontSize: "0.82rem", fontWeight: 500, whiteSpace: "nowrap" }}>
                    {fmt(order.total_amount_cents)}
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem" }}>
                    <StatusBadge status={order.status} />
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem" }}>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {next && (
                        <ActionButton
                          label={next.label}
                          disabled={updating === order.id}
                          onClick={() => changeStatus(order.id, next.next)}
                        />
                      )}
                      {order.status !== "cancelled" && order.status !== "archived" && (
                        <ActionButton
                          label="Annuler"
                          muted
                          disabled={updating === order.id}
                          onClick={() => toggleCancelled(order)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
