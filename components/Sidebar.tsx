import Link from 'next/link';

export default function Sidebar() {
  return (
    // T010: Replace bg-white/border-gray-200 with CSS variables
    <aside className="fixed left-0 top-0 h-screen w-64 border-r p-8 bg-[var(--background)] border-[var(--border)]">
      <div className="flex flex-col h-full">
        <div className="mb-12">
          <h1 className="text-2xl font-light tracking-wide text-[var(--foreground)]">
            Dustin Niles
          </h1>
        </div>

        <nav aria-label="Main navigation" className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors text-sm font-light"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors text-sm font-light"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors text-sm font-light"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-xs text-[var(--text-tertiary)] font-light">
          © {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  );
}
