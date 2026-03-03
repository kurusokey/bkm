"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";
import type { Product } from "@/types";

function fmt(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}

const EMPTY_PRODUCT: Partial<Product> = {
  id: "", name: "", slug: "", tagline: "", description: "",
  price_cents: 0, alcohol_degree: 15, volume_ml: 700, volume: "70cl",
  flavor: "", stock_quantity: 0, is_active: true, is_featured: false,
  category: "punch", image_url: null,
};

const CARD = { background: "rgba(6,14,7,0.28)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(200,162,77,0.75)", borderRadius: "20px", overflow: "hidden" } as const;
const HEADER_ZONE = { background: "radial-gradient(ellipse 70% 100% at 0% 50%, rgba(200,162,77,0.07) 0%, rgba(42,124,59,0.03) 55%, transparent 90%)" } as const;
const SEP = { height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.25), transparent)" } as const;
const SEP_LEFT = { height: "1px", background: "linear-gradient(90deg, rgba(200,162,77,0.18), transparent)" } as const;

const FIELD_INPUT_STYLE = {
  background: "rgba(6,14,7,0.60)",
  border: "1px solid rgba(200,162,77,0.25)",
  borderRadius: "9px",
  color: "rgba(232,224,208,0.85)",
  fontSize: "0.82rem",
  width: "100%",
  padding: "10px 12px",
} as const;

const LABEL_STYLE = {
  fontSize: "0.52rem",
  letterSpacing: "0.22em",
  color: "rgba(200,162,77,0.45)",
} as const;

export default function ProduitsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<Partial<Product>>(EMPTY_PRODUCT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openCreate() { setEditing({ ...EMPTY_PRODUCT }); setError(""); setModal("create"); }
  function openEdit(p: Product) { setEditing({ ...p }); setError(""); setModal("edit"); }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const isEdit = modal === "edit";
    const res = await fetch(isEdit ? `/api/admin/products?id=${editing.id}` : "/api/admin/products", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) { setModal(null); load(); }
    else { const d = await res.json(); setError(d.error ?? "Erreur lors de la sauvegarde"); }
    setSaving(false);
  }

  async function toggleActive(p: Product) {
    const res = await fetch(`/api/admin/products?id=${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_active: !p.is_active }) });
    if (res.ok) setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, is_active: !x.is_active } : x));
  }

  async function updateStock(p: Product, delta: number) {
    const newStock = Math.max(0, p.stock_quantity + delta);
    const res = await fetch(`/api/admin/products?id=${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ stock_quantity: newStock }) });
    if (res.ok) setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, stock_quantity: newStock } : x));
  }

  return (
    <div className="p-8">
      <div style={CARD}>

        {/* Zone header */}
        <div style={{ ...HEADER_ZONE, padding: "1.5rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p className="font-serif uppercase tracking-[0.38em]" style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.50)" }}>
              Catalogue
            </p>
            <div style={{ ...SEP_LEFT, marginTop: "0.35rem", marginBottom: "0.35rem" }} />
            <p className="font-serif text-gold" style={{ fontSize: "1.15rem", letterSpacing: "0.04em" }}>
              Produits
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <p style={{ fontSize: "0.68rem", color: "rgba(232,224,208,0.25)" }}>
              {products.length} produit{products.length !== 1 ? "s" : ""}
            </p>
            <button
              type="button"
              onClick={openCreate}
              style={{ padding: "6px 16px", borderRadius: "8px", border: "1px solid rgba(200,162,77,0.35)", color: "rgba(200,162,77,0.65)", fontSize: "0.72rem", background: "rgba(6,14,7,0.40)", backdropFilter: "blur(8px)", letterSpacing: "0.04em" }}
            >
              + Nouveau produit
            </button>
          </div>
        </div>
        <div style={SEP} />

        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(200,162,77,0.10)" }}>
                {["Produit", "Prix", "Stock", "Catégorie", "Actif", "Actions"].map((h) => (
                  <th key={h} className="text-left font-serif uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.22em", color: "rgba(200,162,77,0.38)", fontWeight: 400, padding: "1rem 1.75rem" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={6} style={{ padding: "3.5rem 1.75rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Chargement…</td></tr>}
              {!loading && products.length === 0 && <tr><td colSpan={6} style={{ padding: "3.5rem 1.75rem", textAlign: "center", color: "rgba(232,224,208,0.22)", fontSize: "0.8rem" }}>Aucun produit — la table products n&apos;est peut-être pas encore créée dans Supabase.</td></tr>}
              {!loading && products.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < products.length - 1 ? "1px solid rgba(200,162,77,0.07)" : "none" }}>
                  <td style={{ padding: "1.1rem 1.75rem" }}>
                    <p style={{ color: "rgba(232,224,208,0.85)", fontSize: "0.82rem", fontWeight: 500 }}>{p.name}</p>
                    <p style={{ color: "rgba(232,224,208,0.28)", fontSize: "0.7rem" }}>{p.tagline}</p>
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem", color: "rgba(232,224,208,0.82)", fontSize: "0.82rem" }}>{fmt(p.price_cents)}</td>
                  <td style={{ padding: "1.1rem 1.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <button type="button" onClick={() => updateStock(p, -1)} style={{ width: 24, height: 24, borderRadius: "6px", border: "1px solid rgba(200,162,77,0.25)", color: "rgba(232,224,208,0.45)", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ minWidth: "2rem", textAlign: "center", fontSize: "0.82rem", fontWeight: 500, color: p.stock_quantity <= 2 ? "rgba(200,80,80,0.85)" : "rgba(232,224,208,0.82)" }}>{p.stock_quantity}</span>
                      <button type="button" onClick={() => updateStock(p, 1)} style={{ width: 24, height: 24, borderRadius: "6px", border: "1px solid rgba(200,162,77,0.25)", color: "rgba(232,224,208,0.45)", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem" }}>
                    <span style={{ color: "rgba(232,224,208,0.38)", fontSize: "0.75rem", textTransform: "capitalize" }}>{p.category ?? "punch"}</span>
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem" }}>
                    <button type="button" onClick={() => toggleActive(p)} aria-label={p.is_active ? "Désactiver le produit" : "Activer le produit"} style={{ position: "relative", width: 36, height: 20, borderRadius: "10px", background: p.is_active ? "rgba(200,162,77,0.75)" : "rgba(232,224,208,0.12)", transition: "background 0.2s" }}>
                      <span style={{ position: "absolute", top: 2, width: 16, height: 16, borderRadius: "50%", background: "white", transition: "all 0.2s", ...(p.is_active ? { right: 2 } : { left: 2 }) }} />
                    </button>
                  </td>
                  <td style={{ padding: "1.1rem 1.75rem" }}>
                    <button type="button" onClick={() => openEdit(p)} style={{ fontSize: "0.72rem", color: "rgba(200,162,77,0.55)", letterSpacing: "0.05em" }}>Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal create/edit */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(4,10,5,0.85)", backdropFilter: "blur(6px)" }}>
          <div className="w-full" style={{ maxWidth: "520px", background: "rgba(6,14,7,0.70)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)", border: "1px solid rgba(200,162,77,0.75)", borderRadius: "20px", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Header modal */}
            <div style={{ ...HEADER_ZONE, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p className="font-serif uppercase tracking-[0.38em]" style={{ fontSize: "0.52rem", color: "rgba(200,162,77,0.45)" }}>
                  {modal === "create" ? "Catalogue" : "Modifier"}
                </p>
                <div style={{ ...SEP_LEFT, marginTop: "0.3rem", marginBottom: "0.3rem" }} />
                <p className="font-serif text-gold" style={{ fontSize: "1rem", letterSpacing: "0.04em" }}>
                  {modal === "create" ? "Nouveau produit" : "Modifier le produit"}
                </p>
              </div>
              <button type="button" onClick={() => setModal(null)} style={{ color: "rgba(232,224,208,0.30)", fontSize: "1.2rem" }}>×</button>
            </div>
            <div style={SEP} />
            <form onSubmit={handleSave} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="grid grid-cols-2 gap-4">
                <Field id="edit-id" label="ID" value={editing.id ?? ""} onChange={(v) => setEditing((p) => ({ ...p, id: v }))} required disabled={modal === "edit"} />
                <Field id="edit-slug" label="Slug" value={editing.slug ?? ""} onChange={(v) => setEditing((p) => ({ ...p, slug: v }))} required />
              </div>
              <Field id="edit-name" label="Nom" value={editing.name ?? ""} onChange={(v) => setEditing((p) => ({ ...p, name: v }))} required />
              <Field id="edit-tagline" label="Tagline" value={editing.tagline ?? ""} onChange={(v) => setEditing((p) => ({ ...p, tagline: v }))} />
              <div>
                <label htmlFor="edit-description" className="block font-serif uppercase mb-1.5" style={LABEL_STYLE}>Description</label>
                <textarea id="edit-description" value={editing.description ?? ""} onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))} rows={3} className="focus:outline-none resize-none" style={FIELD_INPUT_STYLE} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field id="edit-price" label="Prix (centimes)" value={String(editing.price_cents ?? 0)} onChange={(v) => setEditing((p) => ({ ...p, price_cents: Number.parseInt(v, 10) || 0 }))} type="number" required />
                <Field id="edit-stock" label="Stock" value={String(editing.stock_quantity ?? 0)} onChange={(v) => setEditing((p) => ({ ...p, stock_quantity: Number.parseInt(v, 10) || 0 }))} type="number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field id="edit-alcohol" label="Degré alcool" value={String(editing.alcohol_degree ?? "")} onChange={(v) => setEditing((p) => ({ ...p, alcohol_degree: Number.parseFloat(v) || null }))} type="number" />
                <Field id="edit-volume-ml" label="Volume (ml)" value={String(editing.volume_ml ?? "")} onChange={(v) => setEditing((p) => ({ ...p, volume_ml: Number.parseInt(v, 10) || null }))} type="number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field id="edit-volume" label="Volume (ex: 70cl)" value={editing.volume ?? ""} onChange={(v) => setEditing((p) => ({ ...p, volume: v }))} />
                <Field id="edit-flavor" label="Saveur" value={editing.flavor ?? ""} onChange={(v) => setEditing((p) => ({ ...p, flavor: v }))} />
              </div>
              <div>
                <label htmlFor="edit-category" className="block font-serif uppercase mb-1.5" style={LABEL_STYLE}>Catégorie</label>
                <select id="edit-category" value={editing.category ?? "punch"} onChange={(e) => setEditing((p) => ({ ...p, category: e.target.value as "punch" | "coffret" }))} className="focus:outline-none" style={FIELD_INPUT_STYLE}>
                  <option value="punch" className="bg-charcoal">Punch</option>
                  <option value="coffret" className="bg-charcoal">Coffret</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <label htmlFor="edit-active" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "rgba(232,224,208,0.65)", cursor: "pointer" }}>
                  <input id="edit-active" type="checkbox" checked={editing.is_active ?? true} onChange={(e) => setEditing((p) => ({ ...p, is_active: e.target.checked }))} className="accent-gold" />
                  Actif
                </label>
                <label htmlFor="edit-featured" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "rgba(232,224,208,0.65)", cursor: "pointer" }}>
                  <input id="edit-featured" type="checkbox" checked={editing.is_featured ?? false} onChange={(e) => setEditing((p) => ({ ...p, is_featured: e.target.checked }))} className="accent-gold" />
                  Mis en avant
                </label>
              </div>
              {error && <p style={{ color: "rgba(220,80,80,0.85)", fontSize: "0.8rem" }}>{error}</p>}
              <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.15), transparent)", margin: "0.25rem 0" }} />
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setModal(null)} style={{ flex: 1, padding: "10px 0", borderRadius: "9px", border: "1px solid rgba(200,162,77,0.20)", color: "rgba(232,224,208,0.40)", fontSize: "0.78rem" }}>Annuler</button>
                <button type="submit" disabled={saving} className="disabled:opacity-50" style={{ flex: 1, padding: "10px 0", borderRadius: "9px", background: "rgba(200,162,77,0.88)", color: "#060e07", fontSize: "0.78rem", letterSpacing: "0.05em", fontWeight: 500 }}>
                  {saving ? "Sauvegarde…" : "Sauvegarder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ id, label, value, onChange, required, disabled, type = "text" }: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  required?: boolean; disabled?: boolean; type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-serif uppercase mb-1.5" style={{ fontSize: "0.52rem", letterSpacing: "0.22em", color: "rgba(200,162,77,0.45)" }}>{label}</label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} disabled={disabled} className="focus:outline-none transition-colors disabled:opacity-40"
        style={{ background: "rgba(6,14,7,0.60)", border: "1px solid rgba(200,162,77,0.25)", borderRadius: "9px", color: "rgba(232,224,208,0.85)", fontSize: "0.82rem", width: "100%", padding: "10px 12px" }} />
    </div>
  );
}
