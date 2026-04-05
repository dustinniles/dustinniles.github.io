import type { Metadata } from 'next';
import Link from 'next/link';
import { NavigationSectionCard } from '@/app/types';

export const metadata: Metadata = {
  title: 'Dustin Niles',
  description:
    'Dustin Niles — multimedia producer and communications strategist at NYU. Portfolio of video, photography, and campaign work.',
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Dustin Niles',
    description:
      'Dustin Niles — multimedia producer and communications strategist at NYU. Portfolio of video, photography, and campaign work.',
  },
  alternates: { canonical: '/' },
};

const sections: NavigationSectionCard[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    target: '/portfolio',
    description: 'Decision-document case studies with quantifiable outcomes.',
  },
  {
    id: 'lab',
    label: 'Lab',
    target: '/lab',
    description: 'Vibe-coded micro-apps and tools.',
  },
  {
    id: 'activity',
    label: 'Activity',
    target: '/activity',
    description: 'Cycling, volunteering, and what I do outside of work.',
  },
  {
    id: 'links',
    label: 'Links',
    target: '/links',
    description: 'Where to find me across the web.',
  },
];

export default function Home() {
  return (
    <main id="main-content" className="p-12">
      <header className="mb-12">
        <h1 className="motion-safe:animate-fade-up text-3xl font-light text-[var(--foreground)] mb-2">
          Dustin Niles
        </h1>
        <p className="text-base text-[var(--text-secondary)]">
          Multimedia producer &amp; communications strategist
        </p>
        <p className="text-sm text-[var(--text-tertiary)] mt-1">
          Building audience-centered communications at NYU.
        </p>
      </header>

      <nav aria-label="Site sections">
        <ul className="grid grid-cols-2 gap-4" role="list">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={section.target}
                className="card-hover block border border-[var(--border)] p-6 transition-colors duration-300"
              >
                <span className="block text-base font-light text-[var(--foreground)] mb-1">
                  {section.label}
                </span>
                <span className="block text-xs text-[var(--text-secondary)]">
                  {section.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
