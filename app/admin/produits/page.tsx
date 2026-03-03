"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";
import type { Product } from "@/types";

function fmt(cents: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

const EMPTY_PRODUCT: Partial<Product> = {
  id: "",
  name: "",
  slug: "",
  tagline: "",
  description: "",
  price_cents: 0,
  alcohol_degree: 15,
  volume_ml: 700,
  volume: "70cl",
  flavor: "",
  stock_quantity: 0,
  is_active: true,
  is_featured: false,
  category: "punch",
  image_url: null,
};

const labelCls = "block font-serif uppercase mb-1.5";
const labelStyle = {
  fontSize: "0.52rem",
  letterSpacing: "0.22em",
  color: "rgba(200,162,77,0.40)",
};
const inputStyle = {
  background: "rgba(6,14,7,0.60)",
  border: "1px solid rgba(200,162,77,0.18)",
  borderRadius: "9px",
  color: "rgba(232,224,208,0.85)",
  fontSize: "0.82rem",
  width: "100%",
  padding: "10px 12px",
};

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

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing({ ...EMPTY_PRODUCT });
    setError("");
    setModal("create");
  }

  function openEdit(p: Product) {
    setEditing({ ...p });
    setError("");
    setModal("edit");
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const isEdit = modal === "edit";
    const url = isEdit
      ? `/api/admin/products?id=${editing.id}`
      : "/api/admin/products";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    if (res.ok) {
      setModal(null);
      load();
    } else {
      const d = await res.json();
      setError(d.error ?? "Erreur lors de la sauvegarde");
    }
    setSaving(false);
  }

  async function toggleActive(p: Product) {
    const res = await fetch(`/api/admin/products?id=${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    if (res.ok) {
      setProducts((prev) =>
        prev.map((x) =>
          x.id === p.id ? { ...x, is_active: !x.is_active } : x,
        ),
      );
    }
  }

  async function updateStock(p: Product, delta: number) {
    const newStock = Math.max(0, p.stock_quantity + delta);
    const res = await fetch(`/api/admin/products?id=${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock_quantity: newStock }),
    });
    if (res.ok) {
      setProducts((prev) =>
        prev.map((x) =>
          x.id === p.id ? { ...x, stock_quantity: newStock } : x,
        ),
      );
    }
  }

  return (
    <div className="p-8 min-h-screen" style={{ background: "#060e07" }}>
      {/* En-tête */}
      <div className="mb-8">
        <p
          className="font-serif uppercase tracking-[0.35em] mb-1"
          style={{ fontSize: "0.58rem", color: "rgba(200,162,77,0.40)" }}
        >
          ✦ Catalogue
        </p>
        <div className="flex items-end justify-between">
          <h1
            className="font-serif text-gold"
            style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", letterSpacing: "0.06em" }}
          >
            Produits
          </h1>
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: "rgba(200,162,77,0.90)",
              borderRadius: "9px",
              color: "#060e07",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
            }}
          >
            + Nouveau produit
          </button>
        </div>
        <div
          className="mt-3"
          style={{
            width: 40,
            height: 1,
            background: "linear-gradient(90deg, rgba(200,162,77,0.40), transparent)",
          }}
        />
      </div>

      {/* Tableau */}
      <div
        style={{
          background: "rgba(6,14,7,0.32)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(200,162,77,0.10)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(200,162,77,0.07)" }}>
                {["Produit", "Prix", "Stock", "Catégorie", "Actif", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left font-serif uppercase"
                    style={{
                      fontSize: "0.5rem",
                      letterSpacing: "0.22em",
                      color: "rgba(200,162,77,0.32)",
                      fontWeight: 400,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center"
                    style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.8rem" }}
                  >
                    Chargement…
                  </td>
                </tr>
              )}
              {!loading && products.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center"
                    style={{ color: "rgba(232,224,208,0.25)", fontSize: "0.8rem" }}
                  >
                    Aucun produit — la table products n&apos;est peut-être pas encore créée dans Supabase.
                  </td>
                </tr>
              )}
              {!loading &&
                products.map((p, i) => (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom:
                        i < products.length - 1
                          ? "1px solid rgba(200,162,77,0.05)"
                          : "none",
                    }}
                  >
                    <td className="px-6 py-4">
                      <p style={{ color: "rgba(232,224,208,0.82)", fontSize: "0.82rem", fontWeight: 500 }}>
                        {p.name}
                      </p>
                      <p style={{ color: "rgba(232,224,208,0.28)", fontSize: "0.7rem" }}>
                        {p.tagline}
                      </p>
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{ color: "rgba(232,224,208,0.80)", fontSize: "0.82rem" }}
                    >
                      {fmt(p.price_cents)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateStock(p, -1)}
                          className="flex items-center justify-center transition-colors"
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "6px",
                            border: "1px solid rgba(200,162,77,0.18)",
                            color: "rgba(232,224,208,0.40)",
                            fontSize: "0.9rem",
                          }}
                        >
                          −
                        </button>
                        <span
                          className="text-sm font-medium min-w-8 text-center"
                          style={{
                            color:
                              p.stock_quantity <= 2
                                ? "rgba(200,80,80,0.80)"
                                : "rgba(232,224,208,0.80)",
                          }}
                        >
                          {p.stock_quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateStock(p, 1)}
                          className="flex items-center justify-center transition-colors"
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "6px",
                            border: "1px solid rgba(200,162,77,0.18)",
                            color: "rgba(232,224,208,0.40)",
                            fontSize: "0.9rem",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="capitalize"
                        style={{ color: "rgba(232,224,208,0.35)", fontSize: "0.75rem" }}
                      >
                        {p.category ?? "punch"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => toggleActive(p)}
                        aria-label={p.is_active ? "Désactiver le produit" : "Activer le produit"}
                        className="relative transition-colors"
                        style={{
                          width: 36,
                          height: 20,
                          borderRadius: "10px",
                          background: p.is_active
                            ? "rgba(200,162,77,0.70)"
                            : "rgba(232,224,208,0.12)",
                        }}
                      >
                        <span
                          className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                          style={{
                            right: p.is_active ? "2px" : undefined,
                            left: p.is_active ? undefined : "2px",
                          }}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        className="transition-colors"
                        style={{
                          fontSize: "0.72rem",
                          color: "rgba(200,162,77,0.45)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal create/edit */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(4,10,5,0.80)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-lg"
            style={{
              background: "rgba(6,14,7,0.92)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(200,162,77,0.14)",
              borderRadius: "20px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Header modal */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(200,162,77,0.08)" }}
            >
              <p
                className="font-serif uppercase tracking-[0.2em]"
                style={{ fontSize: "0.6rem", color: "rgba(200,162,77,0.50)" }}
              >
                {modal === "create" ? "Nouveau produit" : "Modifier le produit"}
              </p>
              <button
                type="button"
                onClick={() => setModal(null)}
                style={{ color: "rgba(232,224,208,0.25)", fontSize: "1.2rem" }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  id="edit-id"
                  label="ID"
                  value={editing.id ?? ""}
                  onChange={(v) => setEditing((p) => ({ ...p, id: v }))}
                  required
                  disabled={modal === "edit"}
                />
                <Field
                  id="edit-slug"
                  label="Slug"
                  value={editing.slug ?? ""}
                  onChange={(v) => setEditing((p) => ({ ...p, slug: v }))}
                  required
                />
              </div>
              <Field
                id="edit-name"
                label="Nom"
                value={editing.name ?? ""}
                onChange={(v) => setEditing((p) => ({ ...p, name: v }))}
                required
              />
              <Field
                id="edit-tagline"
                label="Tagline"
                value={editing.tagline ?? ""}
                onChange={(v) => setEditing((p) => ({ ...p, tagline: v }))}
              />
              <div>
                <label htmlFor="edit-description" className={labelCls} style={labelStyle}>
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={editing.description ?? ""}
                  onChange={(e) =>
                    setEditing((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                  className="focus:outline-none resize-none"
                  style={inputStyle}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  id="edit-price"
                  label="Prix (centimes)"
                  value={String(editing.price_cents ?? 0)}
                  onChange={(v) =>
                    setEditing((p) => ({
                      ...p,
                      price_cents: parseInt(v, 10) || 0,
                    }))
                  }
                  type="number"
                  required
                />
                <Field
                  id="edit-stock"
                  label="Stock"
                  value={String(editing.stock_quantity ?? 0)}
                  onChange={(v) =>
                    setEditing((p) => ({
                      ...p,
                      stock_quantity: parseInt(v, 10) || 0,
                    }))
                  }
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  id="edit-alcohol"
                  label="Degré alcool"
                  value={String(editing.alcohol_degree ?? "")}
                  onChange={(v) =>
                    setEditing((p) => ({
                      ...p,
                      alcohol_degree: parseFloat(v) || null,
                    }))
                  }
                  type="number"
                />
                <Field
                  id="edit-volume-ml"
                  label="Volume (ml)"
                  value={String(editing.volume_ml ?? "")}
                  onChange={(v) =>
                    setEditing((p) => ({
                      ...p,
                      volume_ml: parseInt(v, 10) || null,
                    }))
                  }
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  id="edit-volume"
                  label="Volume (ex: 70cl)"
                  value={editing.volume ?? ""}
                  onChange={(v) => setEditing((p) => ({ ...p, volume: v }))}
                />
                <Field
                  id="edit-flavor"
                  label="Saveur"
                  value={editing.flavor ?? ""}
                  onChange={(v) => setEditing((p) => ({ ...p, flavor: v }))}
                />
              </div>
              <div>
                <label htmlFor="edit-category" className={labelCls} style={labelStyle}>
                  Catégorie
                </label>
                <select
                  id="edit-category"
                  value={editing.category ?? "punch"}
                  onChange={(e) =>
                    setEditing((p) => ({
                      ...p,
                      category: e.target.value as "punch" | "coffret",
                    }))
                  }
                  className="focus:outline-none"
                  style={inputStyle}
                >
                  <option value="punch" className="bg-charcoal">Punch</option>
                  <option value="coffret" className="bg-charcoal">Coffret</option>
                </select>
              </div>
              <div className="flex gap-6">
                <label htmlFor="edit-active" className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "0.8rem", color: "rgba(232,224,208,0.65)" }}>
                  <input
                    id="edit-active"
                    type="checkbox"
                    checked={editing.is_active ?? true}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, is_active: e.target.checked }))
                    }
                    className="accent-gold"
                  />
                  Actif
                </label>
                <label htmlFor="edit-featured" className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "0.8rem", color: "rgba(232,224,208,0.65)" }}>
                  <input
                    id="edit-featured"
                    type="checkbox"
                    checked={editing.is_featured ?? false}
                    onChange={(e) =>
                      setEditing((p) => ({
                        ...p,
                        is_featured: e.target.checked,
                      }))
                    }
                    className="accent-gold"
                  />
                  Mis en avant
                </label>
              </div>

              {error && (
                <p style={{ color: "rgba(220,80,80,0.85)", fontSize: "0.8rem" }}>
                  {error}
                </p>
              )}

              <div
                style={{
                  height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(200,162,77,0.10), transparent)",
                  margin: "0.5rem 0",
                }}
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 py-2.5 transition-colors"
                  style={{
                    borderRadius: "9px",
                    border: "1px solid rgba(200,162,77,0.14)",
                    color: "rgba(232,224,208,0.35)",
                    fontSize: "0.78rem",
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 font-medium transition-opacity disabled:opacity-50"
                  style={{
                    borderRadius: "9px",
                    background: "rgba(200,162,77,0.88)",
                    color: "#060e07",
                    fontSize: "0.78rem",
                    letterSpacing: "0.05em",
                  }}
                >
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

function Field({
  id,
  label,
  value,
  onChange,
  required,
  disabled,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  disabled?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-serif uppercase mb-1.5"
        style={{
          fontSize: "0.52rem",
          letterSpacing: "0.22em",
          color: "rgba(200,162,77,0.40)",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className="focus:outline-none transition-colors disabled:opacity-40"
        style={{
          background: "rgba(6,14,7,0.60)",
          border: "1px solid rgba(200,162,77,0.18)",
          borderRadius: "9px",
          color: "rgba(232,224,208,0.85)",
          fontSize: "0.82rem",
          width: "100%",
          padding: "10px 12px",
        }}
      />
    </div>
  );
}
