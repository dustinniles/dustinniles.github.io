import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for dustinniles.github.io.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="p-12 max-w-2xl">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-10">Terms</h1>

      <div className="space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed">
        <section>
          <h2 className="text-base font-light text-[var(--foreground)] mb-2">Copyright</h2>
          <p>
            All content on this site — including text, photography, and video — is
            copyright &copy; Dustin Niles unless otherwise noted.
          </p>
        </section>

        <section>
          <h2 className="text-base font-light text-[var(--foreground)] mb-2">Attribution</h2>
          <p>
            You may quote or reference content from this site with attribution. For reuse
            or reproduction beyond brief quotation, please contact me first.
          </p>
        </section>

        <section>
          <h2 className="text-base font-light text-[var(--foreground)] mb-2">Contact for Permissions</h2>
          <p>
            <a
              href="mailto:dustin@dustinniles.com"
              className="underline hover:text-[var(--foreground)]"
            >
              dustin@dustinniles.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
