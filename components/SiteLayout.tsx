'use client';

import MenuSlider from '@/components/MenuSlider';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 641px)');

  const mainClassName = [
    'flex-1 overflow-y-auto',
    isDesktop ? 'ml-64' : 'ml-28',
  ].join(' ');

  return (
    <>
      <MenuSlider />
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
    </>
  );
}
