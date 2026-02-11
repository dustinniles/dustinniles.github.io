'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MenuSlider from '@/components/MenuSlider';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(() => pathname !== '/');
  const reducedMotion = useReducedMotion();

  const mainStyle: React.CSSProperties = {
    marginLeft: isExpanded ? '256px' : 0,
    transition: reducedMotion ? undefined : 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <>
      <MenuSlider isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <main id="main-content" className="flex-1 overflow-y-auto" style={mainStyle}>
        {children}
      </main>
    </>
  );
}
