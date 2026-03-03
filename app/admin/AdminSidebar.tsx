"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  {
    href: "/admin",
    label: "Vue d'ensemble",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    href: "/admin/commandes",
    label: "Commandes",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M1.5 2h1.8l2 7.5h5.9l1.7-5H4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6.5" cy="12.5" r="1" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="11" cy="12.5" r="1" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    href: "/admin/produits",
    label: "Produits",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M7.5 1.5C6.7 1.5 6 2 6 3v1.2C5 4.5 4.5 5.2 4.5 6v6.5c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V6c0-.8-.5-1.5-1.5-1.8V3c0-1-.7-1.5-1.5-1.5z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 6.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/admin/newsletter",
    label: "Newsletter",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 5.5l6.5 3.5 6.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M1 2.5h13c.3 0 .5.2.5.5v7c0 .3-.2.5-.5.5H4l-3.5 3V3c0-.3.2-.5.5-.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth?action=logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside
      className="w-64 flex flex-col shrink-0"
      style={{
        background: "rgba(4,12,6,0.50)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderRight: "1px solid rgba(200,162,77,0.35)",
      }}
    >
      {/* Zone logo — style newsletter */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          background: "radial-gradient(ellipse 70% 80% at 50% 55%, rgba(200,162,77,0.08) 0%, rgba(42,124,59,0.04) 50%, transparent 80%)",
        }}
      >
        <Image
          src="/images/bkm_logo_header.png"
          alt="Bô Kay Mwen"
          width={80}
          height={80}
          style={{ filter: "drop-shadow(0 6px 18px rgba(200,162,77,0.28))", marginBottom: "0.75rem" }}
        />
        <p
          className="font-serif text-center tracking-[0.30em]"
          style={{ fontSize: "0.62rem", color: "rgba(200,162,77,0.85)" }}
        >
          BÔ KAY MWEN
        </p>
        <p
          className="text-center mt-1 tracking-[0.22em]"
          style={{ fontSize: "0.5rem", color: "rgba(200,162,77,0.35)" }}
        >
          ADMINISTRATION
        </p>
      </div>

      {/* Séparateur — identique newsletter */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.25), transparent)" }} />

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 py-3 rounded-lg text-sm transition-all"
              style={{
                paddingLeft: "14px",
                paddingRight: "14px",
                borderLeft: active ? "2px solid rgba(200,162,77,0.70)" : "2px solid transparent",
                background: active ? "rgba(200,162,77,0.08)" : "transparent",
                color: active ? "rgba(200,162,77,0.95)" : "rgba(232,224,208,0.40)",
                letterSpacing: "0.01em",
              }}
            >
              <span className="shrink-0" style={{ opacity: active ? 1 : 0.55 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Séparateur */}
      <div style={{ height: "1px", margin: "0 20px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.15), transparent)" }} />

      {/* Déconnexion */}
      <div className="px-4 py-6">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 py-3 rounded-lg text-sm transition-all hover:bg-gold/5"
          style={{ paddingLeft: "14px", paddingRight: "14px", color: "rgba(200,162,77,0.30)", borderLeft: "2px solid transparent" }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0" aria-hidden="true">
            <path d="M9.5 7.5H2m0 0l2.5-2.5M2 7.5l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.5 4V3C5.5 2.17 6.17 1.5 7 1.5h5.5c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H7c-.83 0-1.5-.67-1.5-1.5v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
