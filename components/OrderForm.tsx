'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface Props {
  onCancel?: () => void;
}

export default function OrderForm({ onCancel }: Props) {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    customerMessage: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          customerMessage: form.customerMessage || undefined,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price_cents: item.price_cents,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();

      if (!res.ok && res.status !== 202) {
        setErrorMsg(data.error ?? 'Une erreur est survenue. Réessayez.');
        setStatus('error');
        return;
      }

      const shortRef = data.orderId ? data.orderId.slice(0, 8).toUpperCase() : '';
      clearCart();
      router.push(`/commande/confirmation-email?ref=${shortRef}`);
    } catch {
      setErrorMsg('Impossible de contacter le serveur. Vérifiez votre connexion.');
      setStatus('error');
    }
  };

  const inputCls =
    'w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors disabled:opacity-50';
  const inputStyle: React.CSSProperties = {
    background: 'rgba(6,14,7,0.55)',
    border: '1px solid rgba(200,162,77,0.35)',
    color: 'rgba(232,224,208,0.9)',
  };
  const labelCls =
    'block text-xs uppercase tracking-[0.2em] font-serif mb-2';
  const labelStyle: React.CSSProperties = { color: '#C8A24D' };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p
        className="font-serif uppercase tracking-[0.3em]"
        style={{ fontSize: '0.62rem', color: 'rgba(200,162,77,0.5)', marginBottom: '0.25rem' }}
      >
        Vos coordonnées
      </p>
      <p
        className="font-serif italic"
        style={{ fontSize: '0.72rem', color: 'rgba(232,224,208,0.4)', marginBottom: '1rem' }}
      >
        Aucun paiement en ligne · Nous vous recontactons
      </p>

      <div>
        <label className={labelCls} style={labelStyle}>
          Nom complet *
        </label>
        <input
          type="text"
          required
          value={form.customerName}
          onChange={set('customerName')}
          placeholder="Jean Dupont"
          disabled={status === 'loading'}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      <div>
        <label className={labelCls} style={labelStyle}>
          Email *
        </label>
        <input
          type="email"
          required
          value={form.customerEmail}
          onChange={set('customerEmail')}
          placeholder="votre@email.com"
          disabled={status === 'loading'}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      <div>
        <label className={labelCls} style={labelStyle}>
          Adresse de livraison *
        </label>
        <textarea
          required
          rows={3}
          value={form.customerAddress}
          onChange={set('customerAddress')}
          placeholder={'12 rue des Flibustiers\n97190 Le Gosier\nGuadeloupe'}
          disabled={status === 'loading'}
          className={`${inputCls} resize-none`}
          style={inputStyle}
        />
      </div>

      <div>
        <label className={labelCls} style={labelStyle}>
          Message (optionnel)
        </label>
        <textarea
          rows={3}
          value={form.customerMessage}
          onChange={set('customerMessage')}
          placeholder="Préférence de livraison, cadeau, question…"
          disabled={status === 'loading'}
          className={`${inputCls} resize-none`}
          style={inputStyle}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#D46A75', fontSize: '0.82rem', margin: '0.5rem 0' }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || cart.length === 0}
        className="btn-luxury-filled w-full disabled:opacity-50"
      >
        {status === 'loading' ? 'Envoi…' : 'Envoyer ma commande'}
      </button>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={status === 'loading'}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            color: 'rgba(200,162,77,0.45)',
            fontSize: '0.72rem',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          ← Retour au panier
        </button>
      )}
    </form>
  );
}
