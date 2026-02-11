import type { Metadata } from "next";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Dustin Niles",
  description: "Personal website and portfolio of Dustin Niles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-ancestors 'none'; form-action 'none'" />
      </head>
      <body className="antialiased">
        {/* T012a: Skip to main content link for keyboard/screen reader users (SC-016) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--background)] focus:text-[var(--foreground)] focus:border focus:border-[var(--border)] focus:rounded"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen">
          <SiteLayout>{children}</SiteLayout>
        </div>
        {/* T034: footer landmark */}
        <footer className="sr-only" aria-label="Site footer">
          <p>© {new Date().getFullYear()} Dustin Niles</p>
        </footer>
      </body>
    </html>
  );
}
