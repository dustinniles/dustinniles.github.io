import Link from 'next/link';

export default function WorkPage() {
  return (
    <div className="p-12">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-6">Work</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        This section has moved. Find portfolio case studies and media work at:
      </p>
      <Link
        href="/portfolio"
        className="text-sm text-[var(--foreground)] underline hover:text-[var(--color-accent)]"
      >
        /portfolio
      </Link>
    </div>
  );
}
