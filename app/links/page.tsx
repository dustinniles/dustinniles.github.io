import type { Metadata } from 'next';
import { socialLinks } from '@/app/data/social-links';
import LinkGroup from '@/components/LinkGroup';
import { SocialLinkCategory } from '@/app/types';

export const metadata: Metadata = {
  title: 'Links',
  description: 'Dustin Niles across the web.',
  openGraph: {
    type: 'website',
    url: '/links',
  },
  alternates: { canonical: '/links' },
};

const categoryOrder: { category: SocialLinkCategory; label: string }[] = [
  { category: 'professional', label: 'Professional' },
  { category: 'code', label: 'Code' },
  { category: 'social', label: 'Social' },
  { category: 'publications', label: 'Publications' },
];

export default function LinksPage() {
  return (
    <div className="p-12">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-10">Links</h1>
      {categoryOrder.map(({ category, label }) => {
        const links = socialLinks.filter((l) => l.category === category);
        return (
          <LinkGroup key={category} category={category} label={label} links={links} />
        );
      })}
    </div>
  );
}
