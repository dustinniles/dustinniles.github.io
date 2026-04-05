import type { Metadata } from 'next';
import { projects } from '@/app/data/projects';
import ProjectCard from '@/components/ProjectCard';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Decision-document case studies with quantifiable outcomes from Dustin Niles.',
  openGraph: {
    type: 'website',
    url: '/portfolio',
    title: 'Portfolio | Dustin Niles',
  },
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const published = projects
    .filter((p) => p.status === 'published')
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <div className="p-12">
      <h1 className="motion-safe:animate-fade-up text-3xl font-light text-[var(--foreground)] mb-10">
        Portfolio
      </h1>

      {published.length === 0 ? (
        <p className="text-sm text-[var(--text-secondary)]">
          Case studies coming soon.
        </p>
      ) : (
        <div className="space-y-4 max-w-2xl">
          {published.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
