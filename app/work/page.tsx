import SubNav from '@/components/SubNav';

export default function WorkPage() {
  return (
    <div className="p-12">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-6">Work</h1>
      <p className="text-sm text-[var(--text-secondary)]">Explore my work in photography, video, and design.</p>
      <SubNav
        items={[
          { label: 'Resume', href: '/resume' },
          { label: 'Photography', href: '/photography' },
          { label: 'Video', href: '/video' },
        ]}
      />
    </div>
  );
}
