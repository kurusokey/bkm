import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgeVerification from '@/components/AgeVerification';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rhums Arrangés - Artisanaux et Naturels',
  description: 'Découvrez nos rhums arrangés artisanaux, macérés avec des ingrédients naturels',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>
          <AgeVerification />
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}