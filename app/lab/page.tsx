import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Vibe-coded micro-apps and tools by Dustin Niles.',
  openGraph: {
    type: 'website',
    url: '/lab',
  },
  alternates: { canonical: '/lab' },
};

export default function LabPage() {
  return (
    <div className="p-12">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-4">Lab</h1>
      <p className="text-sm text-[var(--text-secondary)]">
        Vibe-coded micro-apps and tools — coming soon.
      </p>
    </div>
  );
}
