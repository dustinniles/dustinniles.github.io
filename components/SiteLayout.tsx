'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MenuSlider from '@/components/MenuSlider';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(() => pathname !== '/');
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 641px)');

  const [prevPathname, setPrevPathname] = useState(pathname);
  const [prevIsDesktop, setPrevIsDesktop] = useState(isDesktop);
  if (prevPathname !== pathname || prevIsDesktop !== isDesktop) {
    setPrevPathname(pathname);
    setPrevIsDesktop(isDesktop);
    setIsExpanded(pathname !== '/');
  }

  const mainClassName = [
    'flex-1 overflow-y-auto',
    isExpanded ? (isDesktop ? 'ml-64' : 'ml-28') : 'ml-0',
    reducedMotion ? '' : 'transition-[margin-left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
  ].join(' ');

  return (
    <>
      <MenuSlider isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
    </>
  );
}
