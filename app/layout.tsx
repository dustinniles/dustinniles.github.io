import type { Metadata } from "next";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://dustinniles.github.io'),
  title: {
    default: 'Dustin Niles',
    template: '%s | Dustin Niles',
  },
  description:
    'Dustin Niles — multimedia producer and communications strategist at NYU. Portfolio of video, photography, and campaign work.',
  openGraph: {
    siteName: 'Dustin Niles',
    type: 'website',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dustin Niles',
  url: 'https://dustinniles.github.io',
  jobTitle: 'Multimedia Producer & Communications Strategist',
  workLocation: { '@type': 'Place', name: 'Brooklyn, New York' },
  sameAs: [
    'https://www.linkedin.com/in/dustinniles',
    'https://www.github.com/dustinniles',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dustin Niles',
  url: 'https://dustinniles.github.io',
  description:
    'Multimedia producer and communications strategist at NYU. Portfolio of video, photography, and campaign work.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'self' https://www.youtube-nocookie.com https://player.vimeo.com; frame-ancestors 'none'; base-uri 'self'; form-action 'none'";

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="antialiased">
        {/* Skip to main content link for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--background)] focus:text-[var(--foreground)] focus:border focus:border-[var(--border)] focus:rounded"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen">
          <SiteLayout>{children}</SiteLayout>
        </div>
        <footer className="sr-only" aria-label="Site footer">
          <p>© {new Date().getFullYear()} Dustin Niles</p>
        </footer>
      </body>
    </html>
  );
}
