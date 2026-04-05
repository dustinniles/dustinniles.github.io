import Link from 'next/link';

export default function PlayPage() {
  return (
    <div className="p-12">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-6">Play</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        This section has moved. Find cycling, volunteering, and personal interests at:
      </p>
      <Link
        href="/activity"
        className="text-sm text-[var(--foreground)] underline hover:text-[var(--color-accent)]"
      >
        /activity
      </Link>
    </div>
  );
}
