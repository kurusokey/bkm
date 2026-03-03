"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
  status?: string;
};

const STATUS_LABELS: Record<string, string> = {
  unread: "Non lu",
  read: "Lu",
  archived: "Archivé",
};

const STATUS_COLORS: Record<string, string> = {
  unread: "bg-gold/20 text-gold",
  read: "bg-teal/20 text-teal-light",
  archived: "bg-cream/10 text-cream-muted",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((d) => {
        setMessages(Array.isArray(d) ? d : []);
        setLoading(false);
      });
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
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msg.id ? { ...m, status: updated.status } : m,
        ),
      );
      if (selected?.id === msg.id)
        setSelected((prev) =>
          prev ? { ...prev, status: updated.status } : null,
        );
    }
    setUpdating(null);
  }

  const unread = messages.filter(
    (m) => !m.status || m.status === "unread",
  ).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-gold tracking-wider">
            Messages
          </h1>
          {unread > 0 && (
            <p className="text-gold text-sm mt-1">
              {unread} non lu{unread !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-6 h-full">
        {/* Liste */}
        <div
          className="flex-1 rounded-xl border border-gold/20 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10">
                  <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                    De
                  </th>
                  <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                    Sujet
                  </th>
                  <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-cream-muted"
                    >
                      Chargement…
                    </td>
                  </tr>
                )}
                {!loading && messages.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-cream-muted"
                    >
                      Aucun message
                    </td>
                  </tr>
                )}
                {!loading &&
                  messages.map((msg) => {
                    const status = msg.status ?? "unread";
                    return (
                      <tr
                        key={msg.id}
                        onClick={() => {
                          setSelected(msg);
                          if (status === "unread") setStatus(msg, "read");
                        }}
                        className={`border-b border-gold/5 cursor-pointer transition-colors ${
                          selected?.id === msg.id
                            ? "bg-gold/10"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <p
                            className={`${status === "unread" ? "text-cream font-medium" : "text-cream-muted"}`}
                          >
                            {msg.name}
                          </p>
                          <p className="text-cream-muted text-xs">
                            {msg.email}
                          </p>
                        </td>
                        <td
                          className={`px-6 py-4 ${status === "unread" ? "text-cream" : "text-cream-muted"} max-w-48 truncate`}
                        >
                          {msg.subject ?? "(sans sujet)"}
                        </td>
                        <td className="px-6 py-4 text-cream-muted whitespace-nowrap">
                          {new Date(msg.created_at).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[status] ?? "bg-cream/10 text-cream-muted"}`}
                          >
                            {STATUS_LABELS[status] ?? status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex gap-2">
                            {status !== "read" && (
                              <button
                                type="button"
                                disabled={updating === msg.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatus(msg, "read");
                                }}
                                className="text-xs text-cream-muted hover:text-gold transition-colors"
                              >
                                Lu
                              </button>
                            )}
                            {status !== "archived" && (
                              <button
                                type="button"
                                disabled={updating === msg.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatus(msg, "archived");
                                }}
                                className="text-xs text-cream-muted hover:text-gold transition-colors"
                              >
                                Archiver
                              </button>
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
          <div
            className="w-80 rounded-xl border border-gold/20 p-6 flex flex-col gap-3 shrink-0"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-cream font-medium text-base">
                {selected.subject ?? "(sans sujet)"}
              </h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-cream-muted hover:text-cream text-xl"
              >
                ×
              </button>
            </div>
            <div>
              <p className="text-cream text-sm font-medium">{selected.name}</p>
              <p className="text-cream-muted text-xs">{selected.email}</p>
              <p className="text-cream-muted text-xs mt-0.5">
                {new Date(selected.created_at).toLocaleString("fr-FR")}
              </p>
            </div>
            <div className="border-t border-gold/10 pt-3">
              <p className="text-cream text-sm leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </p>
            </div>
            <div className="flex gap-2 mt-auto">
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject ?? "")}`}
                className="flex-1 py-2 rounded-lg border border-gold/30 text-cream text-xs text-center hover:border-gold transition-colors"
              >
                Répondre
              </a>
              <button
                type="button"
                onClick={() => setStatus(selected, "archived")}
                className="flex-1 py-2 rounded-lg border border-gold/30 text-cream-muted text-xs hover:text-cream hover:border-gold transition-colors"
              >
                Archiver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
