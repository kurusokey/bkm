"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Vue d'ensemble" },
  { href: "/admin/commandes", label: "Commandes" },
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/auth?action=logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  }

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 1.25rem",
          background: "rgba(4,12,6,0.92)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: "1px solid rgba(200,162,77,0.18)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexShrink: 0, textDecoration: "none" }}
        >
          <Image
            src="/images/bkm_logo_header.png"
            alt="Bô Kay Mwen"
            width={34}
            height={34}
            style={{ filter: "drop-shadow(0 2px 10px rgba(200,162,77,0.35))" }}
          />
          <div>
            <p
              className="font-serif tracking-[0.22em]"
              style={{ fontSize: "0.55rem", color: "rgba(200,162,77,0.85)", lineHeight: 1.3 }}
            >
              BÔ KAY MWEN
            </p>
            <p style={{ fontSize: "0.40rem", letterSpacing: "0.18em", color: "rgba(200,162,77,0.32)", lineHeight: 1 }}>
              ADMINISTRATION
            </p>
          </div>
        </Link>

        {/* Séparateur + Nav items — desktop uniquement */}
        <div className="hidden md:block" style={{ width: "1px", height: "22px", background: "rgba(200,162,77,0.15)", margin: "0 1.5rem", flexShrink: 0 }} />

        <div className="hidden md:flex" style={{ gap: "0.25rem", flex: 1 }}>
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="font-serif uppercase transition-colors"
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  background: active ? "rgba(200,162,77,0.10)" : "transparent",
                  color: active ? "rgba(200,162,77,0.95)" : "rgba(232,224,208,0.38)",
                  border: active ? "1px solid rgba(200,162,77,0.25)" : "1px solid transparent",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Déconnexion — desktop uniquement */}
        <button
          type="button"
          onClick={handleLogout}
          className="hidden md:block transition-colors"
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.08em",
            color: "rgba(200,162,77,0.28)",
            flexShrink: 0,
            padding: "6px 12px",
          }}
        >
          Déconnexion
        </button>

        {/* Hamburger — mobile uniquement */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden"
          aria-label="Menu"
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "5px",
            padding: "8px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: menuOpen ? "rgba(200,162,77,0.90)" : "rgba(200,162,77,0.55)",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              transition: "transform 0.2s, background 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: menuOpen ? "transparent" : "rgba(200,162,77,0.55)",
              transition: "background 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: menuOpen ? "rgba(200,162,77,0.90)" : "rgba(200,162,77,0.55)",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              transition: "transform 0.2s, background 0.2s",
            }}
          />
        </button>
      </nav>

      {/* Dropdown mobile */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 19,
            background: "rgba(4,12,6,0.97)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderBottom: "1px solid rgba(200,162,77,0.12)",
            padding: "1rem 0",
          }}
        >
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif uppercase"
                style={{
                  display: "block",
                  padding: "0.85rem 1.75rem",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  color: active ? "rgba(200,162,77,0.95)" : "rgba(232,224,208,0.55)",
                  borderLeft: active ? "2px solid rgba(200,162,77,0.5)" : "2px solid transparent",
                  textDecoration: "none",
                  background: active ? "rgba(200,162,77,0.05)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <div style={{ height: "1px", background: "rgba(200,162,77,0.10)", margin: "0.75rem 1.75rem" }} />
          <button
            type="button"
            onClick={() => { setMenuOpen(false); handleLogout(); }}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "0.75rem 1.75rem",
              fontSize: "0.70rem",
              letterSpacing: "0.12em",
              color: "rgba(232,224,208,0.28)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Déconnexion
          </button>
        </div>
      )}
    </>
  );
}
