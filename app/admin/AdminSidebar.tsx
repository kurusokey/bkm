"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Vue d'ensemble", icon: "⬡" },
  { href: "/admin/commandes", label: "Commandes", icon: "📦" },
  { href: "/admin/produits", label: "Produits", icon: "🍹" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "✉" },
  { href: "/admin/messages", label: "Messages", icon: "💬" },
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
      className="w-56 flex flex-col border-r border-gold/10 shrink-0"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gold/10">
        <p className="font-serif text-gold text-sm tracking-widest">
          BÔ KAY MWEN
        </p>
        <p className="text-cream-muted text-xs tracking-wider mt-0.5">Admin</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "text-gold bg-gold/10"
                  : "text-cream-muted hover:text-cream hover:bg-white/5"
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream-muted hover:text-cream hover:bg-white/5 transition-colors"
        >
          <span className="text-base w-5 text-center">↩</span>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
