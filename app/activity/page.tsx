import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Activity',
  description: 'Cycling, volunteering, and what Dustin Niles does outside of work.',
  openGraph: {
    type: 'website',
    url: '/activity',
  },
  alternates: { canonical: '/activity' },
};

export default function ActivityPage() {
  return (
    <main id="main-content" className="p-12">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-10">Activity</h1>
      <ul className="space-y-4">
        <li>
          <Link
            href="/activity/cycling"
            className="card-hover block border border-[var(--border)] p-6 transition-colors duration-300"
          >
            <span className="block text-base font-light text-[var(--foreground)] mb-1">Cycling</span>
            <span className="block text-xs text-[var(--text-secondary)]">Rides, routes, and training notes.</span>
          </Link>
        </li>
        <li>
          <Link
            href="/activity/volunteering"
            className="card-hover block border border-[var(--border)] p-6 transition-colors duration-300"
          >
            <span className="block text-base font-light text-[var(--foreground)] mb-1">Volunteering</span>
            <span className="block text-xs text-[var(--text-secondary)]">Community involvement and service work.</span>
          </Link>
        </li>
      </ul>
    </main>
  );
}
