import Link from 'next/link';
import { ProjectEntry } from '@/app/types';

interface ProjectCardProps {
  project: ProjectEntry;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (project.status !== 'published') return null;

  const firstSentence = project.outcome.split('.')[0] + '.';

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="card-hover block border border-[var(--border)] p-6 transition-colors duration-300"
    >
      <div className="flex items-baseline justify-between mb-1 gap-4">
        <h2 className="text-base font-light text-[var(--foreground)]">{project.title}</h2>
        <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">{project.dateRange}</span>
      </div>
      {project.tags.length > 0 && (
        <span className="inline-block text-xs text-[var(--text-secondary)] mb-3 uppercase tracking-wide">
          {project.tags[0]}
        </span>
      )}
      <p className="text-sm text-[var(--text-secondary)]">{firstSentence}</p>
    </Link>
  );
}
