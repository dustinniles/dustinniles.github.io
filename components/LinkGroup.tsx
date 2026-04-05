import { SocialLinkCategory, SocialMediaLink } from '@/app/types';

interface LinkGroupProps {
  category: SocialLinkCategory;
  label: string;
  links: SocialMediaLink[];
}

export default function LinkGroup({ label, links }: LinkGroupProps) {
  if (links.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-xs font-light text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
        {label}
      </h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="text-base font-light text-[var(--foreground)] hover:text-[var(--color-accent)]"
              style={{ transition: 'color 200ms ease' }}
            >
              {link.platform}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
