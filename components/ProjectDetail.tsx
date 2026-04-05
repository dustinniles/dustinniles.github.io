import Link from 'next/link';
import Image from 'next/image';
import { ProjectEntry } from '@/app/types';

interface ProjectDetailProps {
  project: ProjectEntry;
}

const sections = [
  { key: 'context', label: 'Context' },
  { key: 'objective', label: 'Objective' },
  { key: 'approach', label: 'Approach' },
  { key: 'outcome', label: 'Outcome' },
  { key: 'lessons', label: 'Lessons' },
] as const;

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="p-12 max-w-2xl">
      <nav className="mb-8">
        <Link
          href="/portfolio"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)]"
          style={{ transition: 'color 200ms ease' }}
        >
          &larr; Back to Portfolio
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-light text-[var(--foreground)] mb-2">{project.title}</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">
            {project.tags[0]}
          </span>
          <span className="text-xs text-[var(--text-tertiary)]">{project.dateRange}</span>
        </div>
      </header>

      {sections.map(({ key, label }) => (
        <section key={key} className="mb-8">
          <h2 className="text-sm font-light text-[var(--text-tertiary)] uppercase tracking-wide mb-2">
            {label}
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            {project[key]}
          </p>
        </section>
      ))}

      {project.media && project.media.length > 0 && (
        <section className="mt-10 space-y-6">
          <h2 className="text-sm font-light text-[var(--text-tertiary)] uppercase tracking-wide mb-4">
            Media
          </h2>
          {project.media.map((item, i) => (
            <figure key={i}>
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={450}
                  className="w-full"
                  unoptimized
                />
              ) : (
                <div className="relative w-full bg-gray-900 rounded aspect-video">
                  <iframe
                    src={item.src}
                    title={item.alt}
                    className="absolute inset-0 w-full h-full rounded"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    loading="lazy"
                  />
                </div>
              )}
              {item.caption && (
                <figcaption className="text-xs text-[var(--text-tertiary)] mt-2">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </section>
      )}
    </article>
  );
}
