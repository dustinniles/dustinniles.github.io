'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { mainMenu } from '@/app/data/navigation';
import { NavigationMenuItem } from '@/app/types';
import SocialLinks from '@/components/SocialLinks';

interface MenuSliderProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export default function MenuSlider({ isExpanded, setIsExpanded }: MenuSliderProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  // T012: Derive initial expandedParent from pathname (lazy initializer)
  const [expandedParent, setExpandedParent] = useState<string | null>(() => {
    const matched = mainMenu.find(
      (item) =>
        item.target === pathname ||
        item.children.some((child) => child.target === pathname)
    );
    return matched ? matched.id : null;
  });

  // T012: Sync expandedParent when pathname changes (adjusting state during render)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    const matched = mainMenu.find(
      (item) =>
        item.target === pathname ||
        item.children.some((child) => child.target === pathname)
    );
    setExpandedParent(matched ? matched.id : null);
  }

  // T020: Determine if a path is the current page or a parent of the current page
  const isActivePath = (path: string): boolean => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(path + '/');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (expandedParent) {
          setExpandedParent(null);
        } else if (isExpanded) {
          setIsExpanded(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedParent, isExpanded, setIsExpanded]);

  const handleParentItemClick = (item: NavigationMenuItem) => {
    setIsExpanded(true);
    setExpandedParent(expandedParent === item.id ? null : item.id);
  };

  const transitionStyle = reducedMotion
    ? {}
    : { transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1), left 300ms cubic-bezier(0.4, 0, 0.2, 1)' };

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: isExpanded ? '256px' : '100vw',
    zIndex: 50,
    willChange: 'width',
    ...transitionStyle,
  };

  return (
    // T010: Replace bg-white/border-gray-100 with CSS variables
    <aside
      style={containerStyle}
      className="border-r overflow-hidden flex flex-col bg-[var(--background)] border-[var(--border)]"
    >
      {/* Profile header — always visible */}
      <div
        className={`flex-shrink-0 ${
          isExpanded
            ? 'p-8 mb-4'
            : 'flex flex-col items-center justify-center pt-16 pb-8'
        }`}
      >
        {/* Profile photo */}
        <div
          className={`rounded-full overflow-hidden flex-shrink-0 bg-[var(--border)] ${
            isExpanded ? 'w-12 h-12 mb-4' : 'w-24 h-24 mb-6'
          }`}
        >
          <Image
            src="/images/profile/DUSTIN HEADSHOT.jpeg"
            alt="Dustin Niles"
            width={96}
            height={96}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        {isExpanded ? (
          <Link
            href="/"
            onClick={() => setIsExpanded(false)}
            className="font-light tracking-wide text-[var(--foreground)] text-xl hover:text-[var(--text-secondary)] transition-colors"
          >
            Dustin Niles
          </Link>
        ) : (
          <h1 className="font-light tracking-wide text-[var(--foreground)] text-3xl">
            Dustin Niles
          </h1>
        )}
      </div>

      {/* T036: Navigation with aria-label */}
      <nav
        aria-label="Main navigation"
        className={`flex-1 overflow-y-auto ${
          isExpanded ? 'px-8' : 'flex flex-col items-center'
        }`}
      >
        <ul className={`space-y-4 ${!isExpanded ? 'w-48' : ''}`}>
          {mainMenu.map((item) => {
            const active = isActivePath(item.target);
            return (
              <li key={item.id}>
                {item.children.length > 0 ? (
                  <>
                    {/* Parent item: navigates to item.target AND expands sub-menu */}
                    <Link
                      href={item.target}
                      onClick={() => handleParentItemClick(item)}
                      tabIndex={0}
                      aria-expanded={expandedParent === item.id}
                      aria-controls={`submenu-${item.id}`}
                      className={`transition-colors text-sm font-light w-full min-h-[44px] flex items-center ${!isExpanded ? 'justify-center' : ''} ${
                        active
                          ? 'text-[var(--foreground)] font-normal'
                          : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {/* T037: submenu with matching id for aria-controls */}
                    <ul
                      id={`submenu-${item.id}`}
                      className={`mt-3 pl-4 space-y-2 border-l border-[var(--border)] ${
                        isExpanded && expandedParent === item.id ? '' : 'hidden'
                      }`}
                    >
                      {item.children.map((child) => {
                        const childActive = isActivePath(child.target);
                        return (
                          <li key={child.id}>
                            {/* T020: aria-current="page" for active child links */}
                            <Link
                              href={child.target}
                              aria-current={childActive ? 'page' : undefined}
                              className={`transition-colors text-xs font-light min-h-[44px] flex items-center ${
                                childActive
                                  ? 'text-[var(--foreground)]'
                                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  // T020: aria-current="page" for active top-level links
                  <Link
                    href={item.target}
                    onClick={() => setIsExpanded(true)}
                    aria-current={active ? 'page' : undefined}
                    className={`transition-colors text-sm font-light min-h-[44px] flex items-center ${!isExpanded ? 'justify-center' : ''} ${
                      active
                        ? 'text-[var(--foreground)] font-normal'
                        : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Social Links */}
      {isExpanded && (
        <div className="flex-shrink-0 py-6 border-t border-[var(--border)]">
          <SocialLinks />
        </div>
      )}

      {/* Footer */}
      {isExpanded && (
        <div className="px-8 pb-8 text-xs text-[var(--text-tertiary)] font-light">
          © {new Date().getFullYear()}
        </div>
      )}
    </aside>
  );
}
