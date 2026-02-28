import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgeVerification from '@/components/AgeVerification';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Bô Kay Mwen — Punchs Artisanaux',
  description: 'Découvrez nos punchs artisanaux, macérés avec des ingrédients naturels des Caraïbes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${cinzel.variable} bg-ink text-cream`}>
        <CartProvider>
          <AgeVerification />
          <CookieBanner />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
