import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-8">
      <div className="flex flex-col h-full">
        <div className="mb-12">
          <h1 className="text-2xl font-light tracking-wide text-gray-900">
            Dustin Niles
          </h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-xs text-gray-400 font-light">
          © {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  );
}
