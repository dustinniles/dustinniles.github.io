import SubNav from '@/components/SubNav';

export default function PlayPage() {
  return (
    <div className="p-12">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-6">Play</h1>
      <p className="text-sm text-[var(--text-secondary)]">Discover my personal interests and hobbies.</p>
      <SubNav
        items={[
          { label: 'Cycling', href: '/cycling' },
          { label: 'Tech', href: '/tech' },
          { label: 'Volunteering', href: '/volunteering' },
        ]}
      />
    </div>
  );
}
