"use client";

import { useEffect, useState } from "react";

type Subscriber = {
  id: string;
  email: string;
  created_at: string;
  status?: string;
};

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((r) => r.json())
      .then((d) => {
        setSubscribers(Array.isArray(d) ? d : []);
        setLoading(false);
      });
  }, []);

  function exportCSV() {
    const header = "Email,Date inscription,Statut";
    const rows = subscribers.map(
      (s) =>
        `${s.email},${new Date(s.created_at).toLocaleDateString("fr-FR")},${s.status ?? "actif"}`,
    );
    const blob = new Blob([[header, ...rows].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8 min-h-screen" style={{ background: "#060e07" }}>
      {/* En-tête */}
      <div className="mb-8">
        <p
          className="font-serif uppercase tracking-[0.35em] mb-1"
          style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.40)" }}
        >
          ✦ Abonnés
        </p>
        <div className="flex items-end justify-between">
          <h1
            className="font-serif text-gold"
            style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", letterSpacing: "0.06em" }}
          >
            Newsletter
          </h1>
          <div className="flex items-center gap-4">
            <span style={{ fontSize: "0.7rem", color: "rgba(232,224,208,0.28)" }}>
              {subscribers.length} abonné{subscribers.length !== 1 ? "s" : ""}
            </span>
            <button
              type="button"
              onClick={exportCSV}
              className="px-4 py-1.5 text-sm transition-all"
              style={{
                borderRadius: "8px",
                border: "1px solid rgba(200,162,77,0.18)",
                color: "rgba(200,162,77,0.55)",
                fontSize: "0.72rem",
                letterSpacing: "0.05em",
              }}
            >
              Exporter CSV
            </button>
          </div>
        </div>
        <div
          className="mt-3"
          style={{
            width: 40,
            height: 1,
            background: "linear-gradient(90deg, rgba(200,162,77,0.40), transparent)",
          }}
        />
      </div>

      {/* Recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm text-sm focus:outline-none transition-colors placeholder:text-cream-muted/20 border border-gold/15 focus:border-gold/40"
          style={{
            background: "rgba(6,14,7,0.50)",
            borderRadius: "10px",
            padding: "10px 16px",
            color: "rgba(232,224,208,0.75)",
            fontSize: "0.8rem",
          }}
        />
      </div>

      {/* Tableau */}
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(200,162,77,0.07)" }}>
                {["Email", "Date d'inscription", "Statut"].map((h) => (
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
              {loading && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center"
                    style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.8rem" }}
                  >
                    Chargement…
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center"
                    style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.8rem" }}
                  >
                    Aucun abonné
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((sub, i) => (
                  <tr
                    key={sub.id}
                    style={{
                      borderBottom:
                        i < filtered.length - 1
                          ? "1px solid rgba(200,162,77,0.05)"
                          : "none",
                    }}
                  >
                    <td
                      className="px-6 py-4"
                      style={{ color: "rgba(232,224,208,0.78)", fontSize: "0.82rem" }}
                    >
                      {sub.email}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{ color: "rgba(232,224,208,0.38)", fontSize: "0.8rem" }}
                    >
                      {new Date(sub.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-block px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          borderRadius: "6px",
                          background: "rgba(42,124,123,0.15)",
                          color: "rgba(42,200,195,0.80)",
                          border: "1px solid rgba(42,124,123,0.25)",
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
    </div>
  );
}
