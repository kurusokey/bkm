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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#060e07" }}
    >
      {/* Halo ambiant */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(200,162,77,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-9">
          <div
            className="relative flex items-center justify-center mb-5"
            style={{
              width: 100,
              height: 100,
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(200,162,77,0.10) 0%, transparent 75%)",
            }}
          >
            <Image
              src="/images/bkm_logo_header.png"
              alt="Bô Kay Mwen"
              width={84}
              height={84}
              style={{ filter: "drop-shadow(0 6px 22px rgba(200,162,77,0.28))" }}
              priority
            />
          </div>
          <p
            className="font-serif tracking-[0.32em] text-center"
            style={{ fontSize: "0.68rem", color: "rgba(200,162,77,0.80)" }}
          >
            BÔ KAY MWEN
          </p>
          <div
            className="mx-auto my-2.5"
            style={{
              width: 28,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(200,162,77,0.25), transparent)",
            }}
          />
          <p
            className="tracking-[0.22em] text-center"
            style={{ fontSize: "0.5rem", color: "rgba(200,162,77,0.28)" }}
          >
            ESPACE ADMINISTRATION
          </p>
        </div>

        {/* Carte */}
        <div
          style={{
            background: "rgba(6,14,7,0.45)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(200,162,77,0.14)",
            borderRadius: "20px",
            padding: "2rem 2rem 2.25rem",
          }}
        >
          <p
            className="font-serif text-center mb-6 uppercase"
            style={{
              fontSize: "0.57rem",
              letterSpacing: "0.35em",
              color: "rgba(200,162,77,0.38)",
            }}
          >
            Connexion
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="block font-serif uppercase mb-2"
                style={{
                  fontSize: "0.54rem",
                  letterSpacing: "0.22em",
                  color: "rgba(200,162,77,0.42)",
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
                className="w-full px-4 py-3 text-sm focus:outline-none transition-colors placeholder:text-cream-muted/20 border border-gold/20 focus:border-gold/50"
                style={{
                  background: "rgba(6,14,7,0.60)",
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
                  color: "rgba(200,162,77,0.42)",
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
                className="w-full px-4 py-3 text-sm focus:outline-none transition-colors border border-gold/20 focus:border-gold/50"
                style={{
                  background: "rgba(6,14,7,0.60)",
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
                  "linear-gradient(90deg, transparent, rgba(200,162,77,0.12), transparent)",
                margin: "0.25rem 0",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm tracking-widest font-medium transition-opacity disabled:opacity-50"
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

        <p
          className="text-center mt-7"
          style={{
            fontSize: "0.58rem",
            color: "rgba(200,162,77,0.15)",
            letterSpacing: "0.15em",
          }}
        >
          ✦ Accès réservé ✦
        </p>
      </div>
    </div>
  );
}
