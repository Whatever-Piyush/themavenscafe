import type { Metadata, Viewport } from 'next';
import { Great_Vibes, Inter, Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { site } from '@/content/site';
import { cafeSchema, websiteSchema } from '@/lib/structured-data';
import '@/styles/globals.css';

/**
 * Fonts are downloaded at build time and self-hosted by next/font.
 *
 * Three benefits, all of them real: no runtime request to a third-party CDN
 * (so no visitor IP is shared with anyone), no extra host in the CSP, and no
 * flash of unstyled text waiting on an external round trip.
 */
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Cafe, Bakery & Desserts in Chirawa`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'cafe in Chirawa',
    'bakery Chirawa',
    'coffee Chirawa',
    'desserts Chirawa',
    'rooftop cafe Chirawa',
    'The Mavens Cafe',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Cafe, Bakery & Desserts in Chirawa`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Cafe, Bakery & Desserts in Chirawa`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Matches the maroon hero so mobile browser chrome blends into the page
  // instead of cutting a pale band across the top of it.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6B1E2E' },
    { media: '(prefers-color-scheme: dark)', color: '#4A1420' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /**
   * `data-scroll-behavior="smooth"` acknowledges the `scroll-behavior: smooth`
   * set in globals.css. Without it Next warns, because route changes would
   * animate the scroll back to the top instead of jumping — which reads as a
   * lurch on navigation. We want smooth scrolling for in-page anchor links and
   * instant positioning on route change, and this attribute says exactly that.
   */
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}
    >
      <body className="min-h-dvh bg-cream text-espresso antialiased">
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />

        {/*
          JSON-LD. Static objects built from content/site.ts and serialised here
          — never assembled from user input, because there is no user input.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </body>
    </html>
  );
}
