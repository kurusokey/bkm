"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erreur de connexion");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#060e07" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo / titre */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl text-gold tracking-widest mb-1">
            BÔ KAY MWEN
          </h1>
          <p className="text-cream-muted text-sm tracking-wider">
            ADMINISTRATION
          </p>
        </div>

        {/* Carte */}
        <div
          className="rounded-xl border border-gold/20 p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h2 className="text-cream text-lg font-medium mb-6 text-center">
            Connexion
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-cream-muted text-xs tracking-wider mb-1.5 uppercase">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-transparent border border-gold/30 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-cream-muted text-xs tracking-wider mb-1.5 uppercase">
                Mot de passe
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-transparent border border-gold/30 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-ink text-sm font-medium tracking-wider transition-opacity disabled:opacity-50"
              style={{ background: "#C8A24D" }}
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
