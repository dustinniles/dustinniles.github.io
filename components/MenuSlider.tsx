'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { mainMenu } from '@/app/data/navigation';
import { NavigationMenuItem } from '@/app/types';
import SocialLinks from '@/components/SocialLinks';

export default function MenuSlider() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

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
  }, [expandedParent, isExpanded]);

  const handleMenuItemClick = (item: NavigationMenuItem) => {
    if (item.children.length === 0) {
      // Leaf item: expand the sidebar (navigation handled by Link)
      setIsExpanded(true);
    } else {
      // Parent item with children: toggle sub-menu
      setIsExpanded(true);
      setExpandedParent(expandedParent === item.id ? null : item.id);
    }
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
        {/* Profile photo placeholder */}
        <div
          className={`rounded-full flex items-center justify-center bg-[var(--border)] text-[var(--text-tertiary)] ${
            isExpanded ? 'w-12 h-12 text-xs mb-4' : 'w-24 h-24 text-sm mb-6'
          }`}
        >
          Photo
        </div>
        <h1
          className={`font-light tracking-wide text-[var(--foreground)] ${
            isExpanded ? 'text-xl' : 'text-3xl'
          }`}
        >
          Dustin Niles
        </h1>
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
                    {/* T037: aria-expanded and aria-controls for expandable items */}
                    <button
                      type="button"
                      onClick={() => handleMenuItemClick(item)}
                      tabIndex={0}
                      aria-expanded={expandedParent === item.id}
                      aria-controls={`submenu-${item.id}`}
                      className={`transition-colors text-sm font-light w-full text-left min-h-[44px] flex items-center ${
                        active
                          ? 'text-[var(--foreground)] font-normal'
                          : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      {item.label}
                    </button>
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
                    className={`transition-colors text-sm font-light min-h-[44px] flex items-center ${
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
