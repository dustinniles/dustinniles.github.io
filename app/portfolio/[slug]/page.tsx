import type { Metadata } from 'next';
import { projects } from '@/app/data/projects';
import ProjectDetail from '@/components/ProjectDetail';
import JsonLd from '@/components/JsonLd';

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return projects
    .filter((p) => p.status === 'published')
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.title,
    description: project?.outcome.slice(0, 155),
    openGraph: {
      type: 'article',
      url: `/portfolio/${slug}`,
      title: project?.title,
      description: project?.outcome.slice(0, 155),
    },
    alternates: { canonical: `/portfolio/${slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="p-12">
        <p className="text-sm text-[var(--text-secondary)]">Project not found.</p>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.outcome,
    dateCreated: project.dateRange,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectDetail project={project} />
    </>
  );
}
