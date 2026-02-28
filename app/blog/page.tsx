import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — Recettes, histoire et actualités',
  description: 'Recettes de cocktails créoles, histoire du punch antillais, actualités Bô Kay Mwen.',
  alternates: { canonical: 'https://blackbeard-umber.vercel.app/blog' },
};

// Articles à venir — à remplacer par des données Supabase ou MDX
const COMING_SOON_ARTICLES = [
  {
    slug: 'histoire-punch-antillais',
    title: 'L\'histoire du punch antillais',
    excerpt: 'Des plantations de canne à sucre aux tables créoles — retrace l\'origine de notre boisson emblématique.',
    category: 'Histoire',
    date: 'Prochainement',
  },
  {
    slug: 'cocktail-ti-punch-moderne',
    title: 'Le Ti-Punch moderne',
    excerpt: 'Revisitez le classique antillais avec nos punchs artisanaux. Trois recettes faciles pour épater vos invités.',
    category: 'Recettes',
    date: 'Prochainement',
  },
  {
    slug: 'choisir-son-punch',
    title: 'Comment choisir son punch ?',
    excerpt: 'Coco, passion, ananas, épicé... Notre guide pour trouver le punch qui correspond à vos goûts.',
    category: 'Guide',
    date: 'Prochainement',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-ink pt-32 md:pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
            Le magazine
          </p>
          <h1 className="font-serif text-gold text-2xl md:text-3xl tracking-wide mb-4">
            Recettes & Histoire
          </h1>
          <div
            className="mx-auto w-[80px] h-[1px] mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #C8A24D, transparent)' }}
          />
          <p className="text-cream-muted/60 text-sm max-w-md mx-auto">
            Cocktails créoles, histoire du punch, conseils de dégustation — notre blog arrive bientôt.
          </p>
        </div>

        {/* Articles à venir */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {COMING_SOON_ARTICLES.map((article) => (
            <div
              key={article.slug}
              className="rounded-xl p-6"
              style={{ background: 'rgba(200,162,77,0.04)', border: '1px solid rgba(200,162,77,0.10)' }}
            >
              <span
                className="inline-block text-[10px] uppercase tracking-[0.2em] font-serif px-2 py-0.5 rounded-full mb-4"
                style={{ background: 'rgba(200,162,77,0.12)', color: '#C8A24D' }}
              >
                {article.category}
              </span>
              <h2 className="font-serif text-gold text-base tracking-wide mb-3 leading-snug">
                {article.title}
              </h2>
              <p className="text-cream-muted/60 text-xs leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <p className="text-cream-muted/30 text-xs font-serif italic">{article.date}</p>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div
          className="text-center py-10 px-6 rounded-2xl"
          style={{ background: 'rgba(200,162,77,0.05)', border: '1px solid rgba(200,162,77,0.12)' }}
        >
          <p className="font-serif text-gold text-lg tracking-wide mb-3">
            Soyez les premiers informés
          </p>
          <p className="text-cream-muted/60 text-sm mb-6">
            Inscrivez-vous à notre newsletter pour recevoir nos articles dès leur publication.
          </p>
          <Link href="/#newsletter" className="btn-luxury-filled">
            S&apos;inscrire à la newsletter
          </Link>
        </div>

      </div>
    </div>
  );
}
