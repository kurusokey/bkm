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
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-gold tracking-wider">
          Produits
        </h1>
        <button
          type="button"
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-ink text-sm font-medium"
          style={{ background: "#C8A24D" }}
        >
          + Nouveau produit
        </button>
      </div>

      <div
        className="rounded-xl border border-gold/20 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Actif
                </th>
                <th className="px-6 py-3 text-left text-cream-muted text-xs tracking-wider uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-cream-muted"
                  >
                    Chargement…
                  </td>
                </tr>
              )}
              {!loading && products.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-cream-muted"
                  >
                    Aucun produit — la table products n&apos;est peut-être pas
                    encore créée dans Supabase.
                  </td>
                </tr>
              )}
              {!loading &&
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gold/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-cream font-medium">{p.name}</p>
                      <p className="text-cream-muted text-xs">{p.tagline}</p>
                    </td>
                    <td className="px-6 py-4 text-cream">
                      {fmt(p.price_cents)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateStock(p, -1)}
                          className="w-6 h-6 rounded border border-gold/30 text-cream-muted hover:text-cream text-xs flex items-center justify-center"
                        >
                          −
                        </button>
                        <span
                          className={`text-sm font-medium min-w-8 text-center ${p.stock_quantity <= 2 ? "text-crimson-light" : "text-cream"}`}
                        >
                          {p.stock_quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateStock(p, 1)}
                          className="w-6 h-6 rounded border border-gold/30 text-cream-muted hover:text-cream text-xs flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-cream-muted text-xs capitalize">
                        {p.category ?? "punch"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => toggleActive(p)}
                        aria-label={
                          p.is_active ? "Désactiver le produit" : "Activer le produit"
                        }
                        className={`w-10 h-5 rounded-full transition-colors relative ${p.is_active ? "bg-gold" : "bg-cream/20"}`}
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${p.is_active ? "right-0.5" : "left-0.5"}`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        className="text-cream-muted hover:text-gold text-xs transition-colors"
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
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-gold/20 overflow-hidden"
            style={{
              background: "#0d1a0e",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div className="px-6 py-4 border-b border-gold/10 flex items-center justify-between">
              <h2 className="text-cream font-medium">
                {modal === "create" ? "Nouveau produit" : "Modifier le produit"}
              </h2>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="text-cream-muted hover:text-cream text-xl"
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
                <label
                  htmlFor="edit-description"
                  className="block text-cream-muted text-xs uppercase tracking-wider mb-1"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={editing.description ?? ""}
                  onChange={(e) =>
                    setEditing((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full bg-transparent border border-gold/30 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
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
                <label
                  htmlFor="edit-category"
                  className="block text-cream-muted text-xs uppercase tracking-wider mb-1"
                >
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
                  className="w-full bg-transparent border border-gold/30 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
                >
                  <option value="punch" className="bg-charcoal">
                    Punch
                  </option>
                  <option value="coffret" className="bg-charcoal">
                    Coffret
                  </option>
                </select>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-cream text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.is_active ?? true}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, is_active: e.target.checked }))
                    }
                    className="accent-gold"
                  />
                  Actif
                </label>
                <label className="flex items-center gap-2 text-cream text-sm cursor-pointer">
                  <input
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

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 py-2 rounded-lg border border-gold/30 text-cream-muted text-sm hover:text-cream transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 rounded-lg text-ink text-sm font-medium disabled:opacity-50"
                  style={{ background: "#C8A24D" }}
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
        className="block text-cream-muted text-xs uppercase tracking-wider mb-1"
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
        className="w-full bg-transparent border border-gold/30 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold disabled:opacity-40 transition-colors"
      />
    </div>
  );
}
