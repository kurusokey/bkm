import type { Metadata } from "next";
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
    <div className="min-h-screen flex" style={{ background: "#060e07" }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
