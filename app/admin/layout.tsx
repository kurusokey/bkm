import type { Metadata } from "next";
import Image from "next/image";
import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Administration — Bô Kay Mwen",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex">
      {/* Image de fond fixe */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/spirits.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Voile sombre */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(4,12,6,0.82)" }}
        />
        {/* Halo gold central */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 62% 45%, rgba(200,162,77,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Contenu */}
      <div
        className="relative flex min-h-screen w-full"
        style={{ zIndex: 10 }}
      >
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
