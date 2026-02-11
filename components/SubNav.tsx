import Link from 'next/link';

interface SubNavProps {
  items: { label: string; href: string }[];
}

export default function SubNav({ items }: SubNavProps) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="font-light text-[var(--text-secondary)] hover:text-[var(--foreground)]"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
