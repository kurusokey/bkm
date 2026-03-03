"use client";

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

  async function handleLogout() {
    await fetch("/api/admin/auth?action=logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
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
        padding: "0 2rem",
        background: "rgba(4,12,6,0.80)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: "1px solid rgba(200,162,77,0.18)",
      }}
    >
      {/* Logo */}
      <Link
        href="/admin"
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

      {/* Séparateur vertical */}
      <div
        style={{
          width: "1px",
          height: "22px",
          background: "rgba(200,162,77,0.15)",
          margin: "0 2rem",
          flexShrink: 0,
        }}
      />

      {/* Nav items */}
      <div style={{ display: "flex", gap: "0.25rem", flex: 1 }}>
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
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

      {/* Déconnexion */}
      <button
        type="button"
        onClick={handleLogout}
        className="transition-colors"
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
    </nav>
  );
}
