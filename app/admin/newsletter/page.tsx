"use client";

import { useEffect, useState } from "react";

type Subscriber = { id: string; email: string; created_at: string; status?: string };

const CARD = { background: "rgba(6,14,7,0.28)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(200,162,77,0.75)", borderRadius: "20px", overflow: "hidden" } as const;
const HEADER_ZONE = { background: "radial-gradient(ellipse 70% 100% at 0% 50%, rgba(200,162,77,0.07) 0%, rgba(42,124,59,0.03) 55%, transparent 90%)" } as const;
const SEP = { height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.20), transparent)" } as const;
const SEP_LEFT = { height: "1px", background: "linear-gradient(90deg, rgba(200,162,77,0.18), transparent)" } as const;

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((r) => r.json())
      .then((d) => { setSubscribers(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  function exportCSV() {
    const header = "Email,Date inscription,Statut";
    const rows = subscribers.map((s) => `${s.email},${new Date(s.created_at).toLocaleDateString("fr-FR")},${s.status ?? "actif"}`);
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = subscribers.filter((s) => s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={CARD}>

      {/* Header */}
      <div style={{ ...HEADER_ZONE, padding: "1.5rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p className="font-serif uppercase tracking-[0.38em]" style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.50)" }}>
            Abonnés
          </p>
          <div style={{ ...SEP_LEFT, marginTop: "0.35rem", marginBottom: "0.35rem" }} />
          <p className="font-serif text-gold" style={{ fontSize: "1.15rem", letterSpacing: "0.04em" }}>
            Newsletter
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <p style={{ fontSize: "0.68rem", color: "rgba(232,224,208,0.22)" }}>
            {subscribers.length} abonné{subscribers.length !== 1 ? "s" : ""}
          </p>
          <button
            type="button"
            onClick={exportCSV}
            style={{
              padding: "5px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(200,162,77,0.30)",
              color: "rgba(200,162,77,0.60)",
              fontSize: "0.68rem",
              background: "rgba(6,14,7,0.40)",
              backdropFilter: "blur(8px)",
              letterSpacing: "0.04em",
            }}
          >
            Exporter CSV
          </button>
        </div>
      </div>
      <div style={SEP} />

      {/* Recherche */}
      <div style={{ padding: "1rem 1.75rem", borderBottom: "1px solid rgba(200,162,77,0.07)" }}>
        <input
          type="text"
          placeholder="Rechercher un email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:outline-none transition-colors placeholder:text-cream-muted/20 border border-gold/20 focus:border-gold/40"
          style={{
            background: "rgba(6,14,7,0.50)",
            borderRadius: "10px",
            padding: "8px 14px",
            color: "rgba(232,224,208,0.75)",
            fontSize: "0.80rem",
            width: "100%",
            maxWidth: "100%",
          }}
        />
      </div>

      {/* ── Vue mobile : liste ── */}
      <div className="md:hidden">
        {loading && (
          <p style={{ padding: "3.5rem 1.5rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Chargement…</p>
        )}
        {!loading && filtered.length === 0 && (
          <p style={{ padding: "3.5rem 1.5rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Aucun abonné</p>
        )}
        {!loading && filtered.map((sub, i) => (
          <div
            key={sub.id}
            style={{
              padding: "0.85rem 1.25rem",
              borderBottom: i < filtered.length - 1 ? "1px solid rgba(200,162,77,0.07)" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: "rgba(232,224,208,0.82)", fontSize: "0.82rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {sub.email}
              </p>
              <p style={{ color: "rgba(232,224,208,0.30)", fontSize: "0.65rem", marginTop: "2px" }}>
                {new Date(sub.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <span
              style={{
                display: "inline-block",
                padding: "2px 10px",
                borderRadius: "6px",
                fontSize: "0.68rem",
                fontWeight: 500,
                background: "rgba(42,124,123,0.15)",
                color: "rgba(42,200,195,0.85)",
                border: "1px solid rgba(42,124,123,0.30)",
                flexShrink: 0,
              }}
            >
              {sub.status ?? "actif"}
            </span>
          </div>
        ))}
      </div>

      {/* ── Vue desktop : tableau ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(200,162,77,0.10)" }}>
              {["Email", "Date d'inscription", "Statut"].map((h) => (
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
              <tr><td colSpan={3} style={{ padding: "3.5rem 1.75rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Chargement…</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={3} style={{ padding: "3.5rem 1.75rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Aucun abonné</td></tr>
            )}
            {!loading && filtered.map((sub, i) => (
              <tr key={sub.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(200,162,77,0.07)" : "none" }}>
                <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.80)", fontSize: "0.82rem" }}>
                  {sub.email}
                </td>
                <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.38)", fontSize: "0.79rem" }}>
                  {new Date(sub.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td style={{ padding: "1.1rem 1.75rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 10px",
                      borderRadius: "6px",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      background: "rgba(42,124,123,0.15)",
                      color: "rgba(42,200,195,0.85)",
                      border: "1px solid rgba(42,124,123,0.30)",
                    }}
                  >
                    {sub.status ?? "actif"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
