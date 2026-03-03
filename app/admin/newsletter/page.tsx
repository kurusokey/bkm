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
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-gold tracking-wider">
            Newsletter
          </h1>
          <p className="text-cream-muted text-sm mt-1">
            {subscribers.length} abonné{subscribers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={exportCSV}
          className="px-4 py-2 rounded-lg border border-gold/30 text-cream text-sm hover:border-gold transition-colors"
        >
          Exporter CSV
        </button>
      </div>

      {/* Recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm bg-transparent border border-gold/30 rounded-lg px-4 py-2 text-cream text-sm focus:outline-none focus:border-gold placeholder:text-cream-muted/50"
        />
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Date d&apos;inscription
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-cream-muted"
                  >
                    Chargement…
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-cream-muted"
                  >
                    Aucun abonné
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-gold/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-cream">{sub.email}</td>
                    <td className="px-6 py-4 text-cream-muted">
                      {new Date(sub.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-teal/20 text-teal-light">
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
