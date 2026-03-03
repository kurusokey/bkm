'use client';

import { useState } from 'react';

const SUBJECTS = [
  'Question sur une commande',
  'Question sur un produit',
  'Partenariat / revendeur',
  'Événement / animation',
  'Autre',
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? 'Une erreur est survenue.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Impossible de contacter le serveur.');
      setStatus('error');
    }
  };

  const inputCls = 'w-full px-4 py-3 rounded-lg text-sm text-cream placeholder:text-cream-muted/40 focus:outline-none transition-colors disabled:opacity-50';
  const inputStyle = {
    background: 'rgba(6,14,7,0.55)',
    border: '1px solid rgba(200,162,77,0.65)',
    color: 'rgba(232,224,208,0.9)',
  };

  if (status === 'success') {
    return (
      <div
        className="text-center py-12 rounded-xl"
        style={{ background: 'rgba(42,124,123,0.07)', border: '1px solid rgba(42,124,123,0.25)' }}
      >
        <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#2A7C7B" strokeWidth="1.5" fill="rgba(42,124,123,0.06)" />
          <path d="M12 20 L17 25 L28 14" stroke="#2A7C7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-serif text-teal-light text-lg mb-2">Message envoyé !</p>
        <p className="text-cream-muted/60 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-xs text-gold/60 hover:text-gold transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] font-serif mb-2" style={{ color: '#C8A24D' }}>
            Nom *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={set('name')}
            placeholder="Votre nom"
            disabled={status === 'loading'}
            className={inputCls}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] font-serif mb-2" style={{ color: '#C8A24D' }}>
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            placeholder="votre@email.com"
            disabled={status === 'loading'}
            className={inputCls}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <label className="block text-xs uppercase tracking-[0.15em] font-serif mb-2" style={{ color: '#C8A24D' }}>
          Sujet
        </label>
        <select
          value={form.subject}
          onChange={set('subject')}
          disabled={status === 'loading'}
          className={inputCls}
          style={{ ...inputStyle, appearance: 'none', color: form.subject === '' ? '#C8A24D' : 'rgba(232,224,208,0.9)' }}
        >
          <option value="">Sélectionnez un sujet</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <label className="block text-xs uppercase tracking-[0.15em] font-serif mb-2" style={{ color: '#C8A24D' }}>
          Message *
        </label>
        <textarea
          required
          value={form.message}
          onChange={set('message')}
          placeholder="Votre message…"
          rows={5}
          disabled={status === 'loading'}
          className={`${inputCls} resize-none`}
          style={inputStyle}
        />
      </div>

      {status === 'error' && (
        <p className="text-crimson-light text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-luxury-filled w-full disabled:opacity-50"
      >
        {status === 'loading' ? 'Envoi…' : 'Envoyer le message'}
      </button>

      <div style={{ height: '1rem' }} />

      <p className="text-cream-muted/30 text-[10px] text-center leading-relaxed">
        Vos données sont utilisées uniquement pour traiter votre demande. Voir notre{' '}
        <a href="/confidentialite" className="underline hover:text-cream-muted/60 transition-colors">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
}
