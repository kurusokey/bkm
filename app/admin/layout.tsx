import type { Metadata } from "next";
import Image from "next/image";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: "Administration — Bô Kay Mwen",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#060e07" }}>

      {/* Fond fixe */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/spirits.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(4,12,6,0.82)" }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 62% 45%, rgba(200,162,77,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Barre de navigation */}
      <AdminNav />

      {/* Contenu */}
      <div className="relative" style={{ zIndex: 10, paddingTop: "64px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          {children}
        </div>
      </div>

    </div>
  );
}
