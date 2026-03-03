"use client";

import { useEffect, useState } from "react";

type Message = { id: string; name: string; email: string; subject?: string; message: string; created_at: string; status?: string };

const STATUS_LABELS: Record<string, string> = { unread: "Non lu", read: "Lu", archived: "Archivé" };
const STATUS_COLORS: Record<string, string> = {
  unread: "rgba(200,162,77,0.90)",
  read: "rgba(42,124,123,0.85)",
  archived: "rgba(232,224,208,0.28)",
};

const CARD = { background: "rgba(6,14,7,0.28)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(200,162,77,0.75)", borderRadius: "20px", overflow: "hidden" } as const;
const HEADER_ZONE = { background: "radial-gradient(ellipse 70% 100% at 0% 50%, rgba(200,162,77,0.07) 0%, rgba(42,124,59,0.03) 55%, transparent 90%)" } as const;
const SEP = { height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.20), transparent)" } as const;
const SEP_LEFT = { height: "1px", background: "linear-gradient(90deg, rgba(200,162,77,0.18), transparent)" } as const;

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((d) => { setMessages(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  async function setStatus(msg: Message, status: string) {
    setUpdating(msg.id);
    const res = await fetch(`/api/admin/messages?id=${msg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, status: updated.status } : m));
      if (selected?.id === msg.id) setSelected((prev) => prev ? { ...prev, status: updated.status } : null);
    }
    setUpdating(null);
  }

  const unread = messages.filter((m) => !m.status || m.status === "unread").length;

  return (
    <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>

      {/* ── Liste ── */}
      <div style={{ flex: 1, ...CARD }}>

        {/* Header */}
        <div style={{ ...HEADER_ZONE, padding: "1.5rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p className="font-serif uppercase tracking-[0.38em]" style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.50)" }}>
              Contact
            </p>
            <div style={{ ...SEP_LEFT, marginTop: "0.35rem", marginBottom: "0.35rem" }} />
            <p className="font-serif text-gold" style={{ fontSize: "1.15rem", letterSpacing: "0.04em" }}>
              Messages
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <p style={{ fontSize: "0.68rem", color: "rgba(232,224,208,0.22)" }}>
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </p>
            {unread > 0 && (
              <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", fontSize: "0.68rem", fontWeight: 500, background: "rgba(200,162,77,0.10)", color: "rgba(200,162,77,0.90)", border: "1px solid rgba(200,162,77,0.30)" }}>
                {unread} non lu{unread !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
        <div style={SEP} />

        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(200,162,77,0.10)" }}>
                {["De", "Sujet", "Date", "Statut", "Actions"].map((h) => (
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
              {loading && <tr><td colSpan={5} style={{ padding: "3.5rem 1.75rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Chargement…</td></tr>}
              {!loading && messages.length === 0 && <tr><td colSpan={5} style={{ padding: "3.5rem 1.75rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Aucun message</td></tr>}
              {!loading && messages.map((msg, i) => {
                const status = msg.status ?? "unread";
                const isUnread = status === "unread";
                return (
                  <tr
                    key={msg.id}
                    onClick={() => { setSelected(msg); if (status === "unread") setStatus(msg, "read"); }}
                    className="cursor-pointer"
                    style={{
                      borderBottom: i < messages.length - 1 ? "1px solid rgba(200,162,77,0.07)" : "none",
                      background: selected?.id === msg.id ? "rgba(200,162,77,0.04)" : "transparent",
                      transition: "background 0.15s",
                    }}
                  >
                    <td style={{ padding: "1.1rem 1.75rem" }}>
                      <p style={{ color: isUnread ? "rgba(232,224,208,0.90)" : "rgba(232,224,208,0.40)", fontSize: "0.82rem", fontWeight: isUnread ? 500 : 400 }}>{msg.name}</p>
                      <p style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.70rem" }}>{msg.email}</p>
                    </td>
                    <td style={{ padding: "1.1rem 1.75rem", color: isUnread ? "rgba(232,224,208,0.75)" : "rgba(232,224,208,0.32)", fontSize: "0.80rem", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {msg.subject ?? "(sans sujet)"}
                    </td>
                    <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.28)", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                      {new Date(msg.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td style={{ padding: "1.1rem 1.75rem" }}>
                      <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", fontSize: "0.70rem", fontWeight: 500, background: `${STATUS_COLORS[status] ?? "rgba(200,162,77,0.12)"}22`, color: STATUS_COLORS[status] ?? "rgba(232,224,208,0.45)", border: `1px solid ${STATUS_COLORS[status] ?? "rgba(200,162,77,0.12)"}55` }}>
                        {STATUS_LABELS[status] ?? status}
                      </span>
                    </td>
                    <td style={{ padding: "1.1rem 1.75rem" }}>
                      <span style={{ display: "flex", gap: "0.75rem" }}>
                        {status !== "read" && (
                          <button type="button" disabled={updating === msg.id} onClick={(e) => { e.stopPropagation(); setStatus(msg, "read"); }} style={{ fontSize: "0.70rem", color: "rgba(232,224,208,0.32)", letterSpacing: "0.03em" }}>Lu</button>
                        )}
                        {status !== "archived" && (
                          <button type="button" disabled={updating === msg.id} onClick={(e) => { e.stopPropagation(); setStatus(msg, "archived"); }} style={{ fontSize: "0.70rem", color: "rgba(232,224,208,0.32)", letterSpacing: "0.03em" }}>Archiver</button>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Prévisualisation ── */}
      {selected && (
        <div style={{ width: "300px", flexShrink: 0, ...CARD }}>

          {/* Header */}
          <div style={{ ...HEADER_ZONE, padding: "1.25rem 1.5rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ flex: 1, paddingRight: "0.5rem" }}>
              <p className="font-serif uppercase tracking-[0.35em]" style={{ fontSize: "0.50rem", color: "rgba(200,162,77,0.42)", marginBottom: "0.3rem" }}>
                Message
              </p>
              <p className="font-serif" style={{ color: "rgba(232,224,208,0.82)", fontSize: "0.85rem", lineHeight: 1.4 }}>
                {selected.subject ?? "(sans sujet)"}
              </p>
            </div>
            <button type="button" onClick={() => setSelected(null)} style={{ color: "rgba(232,224,208,0.22)", fontSize: "1.1rem", lineHeight: 1, flexShrink: 0, marginTop: "2px" }}>×</button>
          </div>
          <div style={SEP} />

          {/* Contenu */}
          <div style={{ padding: "1.25rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <div>
              <p style={{ color: "rgba(232,224,208,0.72)", fontSize: "0.82rem", fontWeight: 500 }}>{selected.name}</p>
              <p style={{ color: "rgba(232,224,208,0.28)", fontSize: "0.70rem" }}>{selected.email}</p>
              <p style={{ color: "rgba(232,224,208,0.18)", fontSize: "0.66rem", marginTop: "2px" }}>
                {new Date(selected.created_at).toLocaleString("fr-FR")}
              </p>
            </div>
            <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(200,162,77,0.12), transparent)" }} />
            <p className="leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(232,224,208,0.62)", fontSize: "0.80rem" }}>
              {selected.message}
            </p>
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.10), transparent)" }} />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject ?? "")}`}
                style={{ flex: 1, padding: "8px 0", textAlign: "center", borderRadius: "9px", border: "1px solid rgba(200,162,77,0.35)", color: "rgba(200,162,77,0.75)", fontSize: "0.70rem", letterSpacing: "0.05em" }}
              >
                Répondre
              </a>
              <button
                type="button"
                onClick={() => setStatus(selected, "archived")}
                style={{ flex: 1, padding: "8px 0", borderRadius: "9px", border: "1px solid rgba(200,162,77,0.15)", color: "rgba(232,224,208,0.30)", fontSize: "0.70rem", letterSpacing: "0.05em" }}
              >
                Archiver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
