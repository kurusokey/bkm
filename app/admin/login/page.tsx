"use client";

import Image from "next/image";
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
        setError(data.error || "Identifiants incorrects");
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
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Image de fond */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/spirits.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(4,12,6,0.78)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(200,162,77,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-sm" style={{ zIndex: 10 }}>
        {/* Carte glassmorphism — style newsletter */}
        <div
          style={{
            background: "rgba(6,14,7,0.28)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(200,162,77,0.75)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Zone logo */}
          <div
            style={{
              height: "190px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(ellipse 70% 80% at 50% 55%, rgba(200,162,77,0.08) 0%, rgba(42,124,59,0.04) 50%, transparent 80%)",
            }}
          >
            <Image
              src="/images/bkm_logo_header.png"
              alt="Bô Kay Mwen"
              width={160}
              height={160}
              style={{ filter: "drop-shadow(0 8px 24px rgba(200,162,77,0.22))" }}
            />
          </div>

          {/* Séparateur */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(200,162,77,0.40), transparent)",
            }}
          />

          {/* Formulaire */}
          <div style={{ padding: "1.75rem 1.75rem 2rem" }}>
            <p
              className="font-serif uppercase tracking-[0.38em] mb-2"
              style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.70)" }}
            >
              Administration
            </p>
            <div
              style={{
                height: "1px",
                marginBottom: "1.5rem",
                background:
                  "linear-gradient(90deg, rgba(200,162,77,0.20), transparent)",
              }}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="block font-serif uppercase mb-2"
                  style={{
                    fontSize: "0.54rem",
                    letterSpacing: "0.22em",
                    color: "rgba(200,162,77,0.50)",
                  }}
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 text-sm focus:outline-none transition-colors placeholder:text-cream-muted/20 border border-gold/30 focus:border-gold/60"
                  style={{
                    background: "rgba(6,14,7,0.55)",
                    borderRadius: "10px",
                    color: "rgba(232,224,208,0.88)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block font-serif uppercase mb-2"
                  style={{
                    fontSize: "0.54rem",
                    letterSpacing: "0.22em",
                    color: "rgba(200,162,77,0.50)",
                  }}
                >
                  Mot de passe
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 text-sm focus:outline-none transition-colors border border-gold/30 focus:border-gold/60"
                  style={{
                    background: "rgba(6,14,7,0.55)",
                    borderRadius: "10px",
                    color: "rgba(232,224,208,0.88)",
                  }}
                />
              </div>

              {error && (
                <p
                  className="text-center text-sm"
                  style={{ color: "rgba(220,80,80,0.85)" }}
                >
                  {error}
                </p>
              )}

              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(200,162,77,0.18), transparent)",
                  margin: "0.5rem 0",
                }}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-sm font-medium tracking-widest transition-opacity disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(200,162,77,0.92) 0%, rgba(200,162,77,0.76) 100%)",
                  borderRadius: "10px",
                  color: "#060e07",
                  letterSpacing: "0.12em",
                }}
              >
                {loading ? "Connexion…" : "Se connecter"}
              </button>
            </form>
          </div>
        </div>

        <p
          className="text-center mt-6"
          style={{
            fontSize: "0.58rem",
            color: "rgba(200,162,77,0.18)",
            letterSpacing: "0.15em",
          }}
        >
          ✦ Accès réservé ✦
        </p>
      </div>
    </div>
  );
}
