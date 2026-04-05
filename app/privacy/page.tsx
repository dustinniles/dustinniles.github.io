import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for dustinniles.github.io.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="p-12 max-w-2xl">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-10">Privacy Policy</h1>

      <div className="space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed">
        <section>
          <h2 className="text-base font-light text-[var(--foreground)] mb-2">Data Collection</h2>
          <p>
            This site collects no personal data beyond standard GitHub Pages server logs.
            GitHub Pages may log IP addresses and request metadata as part of normal server
            operation. See{' '}
            <a
              href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--foreground)]"
            >
              GitHub Pages documentation
            </a>{' '}
            for details on their data practices.
          </p>
        </section>

        <section>
          <h2 className="text-base font-light text-[var(--foreground)] mb-2">Cookies</h2>
          <p>No cookies are set by this site.</p>
        </section>

        <section>
          <h2 className="text-base font-light text-[var(--foreground)] mb-2">Analytics</h2>
          <p>No third-party analytics are used on this site.</p>
        </section>

        <section>
          <h2 className="text-base font-light text-[var(--foreground)] mb-2">Contact</h2>
          <p>
            Questions about privacy?{' '}
            <a
              href="mailto:dustin@dustinniles.com"
              className="underline hover:text-[var(--foreground)]"
            >
              dustin@dustinniles.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
