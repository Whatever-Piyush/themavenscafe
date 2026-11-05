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
  /**
   * NOTE ON THIS TAG, so nobody later mistakes it for the thing that works:
   * Google has ignored <meta name="keywords"> as a ranking signal since 2009.
   * It is kept because it costs nothing and a few smaller engines still read
   * it — but local ranking comes from the Google Business Profile, reviews,
   * NAP consistency and the LocalBusiness structured data in
   * lib/structured-data.ts. Adding terms here will not move a position.
   *
   * Terms are grouped by the intent someone actually types.
   */
  keywords: [
    // Core intent
    'cafe in Chirawa',
    'cafe near me Chirawa',
    'coffee shop in Chirawa',
    'coffee near me Chirawa',

    // Bakery and dessert intent — a distinct set of searchers
    'bakery in Chirawa',
    'cake shop in Chirawa',
    'birthday cake Chirawa',
    'desserts in Chirawa',
    'pastries Chirawa',

    // Landmark and street, which is how people navigate a small town
    'cafe on Pilani Road Chirawa',
    'cafe near SBI Bank Chirawa',

    // Wider district — Chirawa sits in Jhunjhunu
    'cafe in Jhunjhunu',
    'cafe near Jhunjhunu Rajasthan',

    // What the place is for
    'rooftop cafe Chirawa',
    'places to hang out in Chirawa',
    'breakfast in Chirawa',

    /**
     * Both spellings on purpose. The brand is set with an apostrophe, but
     * people type it without one — and the domain, Instagram handle and email
     * all use the flat form. Carrying both means a search either way finds us.
     */
    'The Maven’s',
    'The Maven’s Cafe Chirawa',
    // The rest of the spellings, kept with the structured data in site.ts.
    ...site.alternateNames,
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
