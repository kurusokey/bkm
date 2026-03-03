"use client";

import { useEffect, useState } from "react";

type Message = { id: string; name: string; email: string; subject?: string; message: string; created_at: string; status?: string };

const STATUS_LABELS: Record<string, string> = { unread: "Non lu", read: "Lu", archived: "Archivé" };
const STATUS_COLORS: Record<string, string> = {
  unread: "rgba(200,162,77,0.90)",
  read: "rgba(42,124,123,0.85)",
  archived: "rgba(232,224,208,0.30)",
};

const CARD_STYLE = {
  background: "rgba(6,14,7,0.28)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(200,162,77,0.75)",
  borderRadius: "16px",
} as const;

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
    <div className="p-8">
      {/* En-tête */}
      <div className="mb-8">
        <p className="font-serif uppercase tracking-[0.35em] mb-1" style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.40)" }}>
          ✦ Contact
        </p>
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-gold" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", letterSpacing: "0.06em" }}>
            Messages
          </h1>
          {unread > 0 && (
            <span className="px-2.5 py-0.5 text-xs font-medium" style={{ borderRadius: "6px", background: "rgba(200,162,77,0.12)", color: "rgba(200,162,77,0.90)", border: "1px solid rgba(200,162,77,0.35)" }}>
              {unread} non lu{unread !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="mt-3" style={{ width: 40, height: 1, background: "linear-gradient(90deg, rgba(200,162,77,0.50), transparent)" }} />
      </div>

      <div className="flex gap-5">
        {/* Liste */}
        <div className="flex-1" style={{ ...CARD_STYLE, overflow: "hidden" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(200,162,77,0.15)" }}>
                  {["De", "Sujet", "Date", "Statut", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left font-serif uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.22em", color: "rgba(200,162,77,0.40)", fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={5} className="px-6 py-10 text-center" style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.8rem" }}>Chargement…</td></tr>}
                {!loading && messages.length === 0 && <tr><td colSpan={5} className="px-6 py-10 text-center" style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.8rem" }}>Aucun message</td></tr>}
                {!loading && messages.map((msg, i) => {
                  const status = msg.status ?? "unread";
                  const isUnread = status === "unread";
                  return (
                    <tr
                      key={msg.id}
                      onClick={() => { setSelected(msg); if (status === "unread") setStatus(msg, "read"); }}
                      className="cursor-pointer transition-colors"
                      style={{ borderBottom: i < messages.length - 1 ? "1px solid rgba(200,162,77,0.08)" : "none", background: selected?.id === msg.id ? "rgba(200,162,77,0.07)" : "transparent" }}
                    >
                      <td className="px-6 py-4">
                        <p style={{ color: isUnread ? "rgba(232,224,208,0.90)" : "rgba(232,224,208,0.42)", fontSize: "0.82rem", fontWeight: isUnread ? 500 : 400 }}>{msg.name}</p>
                        <p style={{ color: "rgba(232,224,208,0.28)", fontSize: "0.7rem" }}>{msg.email}</p>
                      </td>
                      <td className="px-6 py-4 max-w-48 truncate" style={{ color: isUnread ? "rgba(232,224,208,0.78)" : "rgba(232,224,208,0.35)", fontSize: "0.8rem" }}>
                        {msg.subject ?? "(sans sujet)"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" style={{ color: "rgba(232,224,208,0.30)", fontSize: "0.78rem" }}>
                        {new Date(msg.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-medium" style={{ borderRadius: "6px", background: `${STATUS_COLORS[status] ?? "rgba(200,162,77,0.15)"}22`, color: STATUS_COLORS[status] ?? "rgba(232,224,208,0.50)", border: `1px solid ${STATUS_COLORS[status] ?? "rgba(200,162,77,0.15)"}55` }}>
                          {STATUS_LABELS[status] ?? status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex gap-3">
                          {status !== "read" && (
                            <button type="button" disabled={updating === msg.id} onClick={(e) => { e.stopPropagation(); setStatus(msg, "read"); }} style={{ fontSize: "0.7rem", color: "rgba(232,224,208,0.35)" }}>Lu</button>
                          )}
                          {status !== "archived" && (
                            <button type="button" disabled={updating === msg.id} onClick={(e) => { e.stopPropagation(); setStatus(msg, "archived"); }} style={{ fontSize: "0.7rem", color: "rgba(232,224,208,0.35)" }}>Archiver</button>
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

        {/* Prévisualisation */}
        {selected && (
          <div className="w-80 flex flex-col gap-4 shrink-0" style={{ ...CARD_STYLE, padding: "1.5rem" }}>
            <div className="flex items-start justify-between">
              <p className="font-serif flex-1 pr-2" style={{ color: "rgba(232,224,208,0.85)", fontSize: "0.9rem", lineHeight: 1.4 }}>
                {selected.subject ?? "(sans sujet)"}
              </p>
              <button type="button" onClick={() => setSelected(null)} className="shrink-0 transition-colors" style={{ color: "rgba(232,224,208,0.25)", fontSize: "1.2rem", lineHeight: 1 }}>×</button>
            </div>
            <div>
              <p style={{ color: "rgba(232,224,208,0.75)", fontSize: "0.82rem", fontWeight: 500 }}>{selected.name}</p>
              <p style={{ color: "rgba(232,224,208,0.30)", fontSize: "0.72rem" }}>{selected.email}</p>
              <p style={{ color: "rgba(232,224,208,0.22)", fontSize: "0.68rem", marginTop: "2px" }}>{new Date(selected.created_at).toLocaleString("fr-FR")}</p>
            </div>
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.20), transparent)" }} />
            <p className="leading-relaxed whitespace-pre-wrap flex-1" style={{ color: "rgba(232,224,208,0.68)", fontSize: "0.82rem" }}>
              {selected.message}
            </p>
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.15), transparent)" }} />
            <div className="flex gap-2">
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject ?? "")}`}
                className="flex-1 py-2 text-xs text-center transition-colors"
                style={{ borderRadius: "8px", border: "1px solid rgba(200,162,77,0.40)", color: "rgba(200,162,77,0.75)", letterSpacing: "0.05em" }}
              >
                Répondre
              </a>
              <button type="button" onClick={() => setStatus(selected, "archived")} className="flex-1 py-2 text-xs transition-colors" style={{ borderRadius: "8px", border: "1px solid rgba(200,162,77,0.20)", color: "rgba(232,224,208,0.35)", letterSpacing: "0.05em" }}>
                Archiver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
