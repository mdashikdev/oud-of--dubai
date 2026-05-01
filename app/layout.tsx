import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cart-context';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Oud of Dubai';

export const metadata: Metadata = {
  title: { default: siteName, template: `%s | ${siteName}` },
  description: 'Premium perfume oils, extrait de parfum, and signature fragrances. Crafted for lasting intensity.',
  keywords: ['perfume', 'attar', 'perfume oil', 'oud', 'luxury fragrance'],
  openGraph: {
    type: 'website',
    siteName,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: '#d4a853',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min- h-screen bg-background text-foreground antialiased">
        <CartProvider>
          <Header />
          <main className="min- h-[60vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}