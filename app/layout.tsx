import type { Metadata } from 'next';
import { Inter, Cinzel, Cinzel_Decorative } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import SiteShell from '@/components/SiteShell';
import AgeVerification from '@/components/AgeVerification';
import CookieBanner from '@/components/CookieBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { BASE_URL } from '@/lib/config';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', weight: ['400', '500', '600', '700'], display: 'swap' });
const cinzelDecorative = Cinzel_Decorative({ subsets: ['latin'], variable: '--font-cinzel-decorative', weight: ['400', '700'], display: 'swap' });


export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Bô Kay Mwen — Punchs Artisanaux des Caraïbes',
    template: '%s | Bô Kay Mwen',
  },
  description: 'Découvrez nos punchs artisanaux macérés avec des fruits tropicaux des Caraïbes. Ananas-passion, coco, goyave, pili-pili — 100 % local, 100 % fait maison.',
  keywords: ['punch artisanal', 'punch antillais', 'punch créole', 'punch martinique', 'punch guadeloupe', 'punch ananas', 'punch coco', 'punch passion', 'rhum arrangé', 'boisson caribéenne'],
  authors: [{ name: 'Bô Kay Mwen' }],
  creator: 'Bô Kay Mwen',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Bô Kay Mwen',
    title: 'Bô Kay Mwen — Punchs Artisanaux des Caraïbes',
    description: 'Punchs artisanaux macérés avec des fruits tropicaux. 100 % local, 100 % fait maison.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Bô Kay Mwen — Punchs Artisanaux' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bô Kay Mwen — Punchs Artisanaux des Caraïbes',
    description: 'Punchs artisanaux macérés avec des fruits tropicaux. 100 % local, 100 % fait maison.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${cinzel.variable} ${cinzelDecorative.variable} bg-ink text-cream`}>
        <CartProvider>
          <AgeVerification />
          <CookieBanner />
          <GoogleAnalytics />
          <SiteShell>{children}</SiteShell>
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
