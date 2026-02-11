'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { mainMenu } from '@/app/data/navigation';
import { NavigationMenuItem } from '@/app/types';
import SocialLinks from '@/components/SocialLinks';

export default function MenuSlider() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

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
    <aside
      style={containerStyle}
      className="bg-white border-r border-gray-100 overflow-hidden flex flex-col"
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
          className={`bg-gray-100 rounded-full flex items-center justify-center text-gray-400 ${
            isExpanded ? 'w-12 h-12 text-xs mb-4' : 'w-24 h-24 text-sm mb-6'
          }`}
        >
          Photo
        </div>
        <h1
          className={`font-light tracking-wide text-gray-900 ${
            isExpanded ? 'text-xl' : 'text-3xl'
          }`}
        >
          Dustin Niles
        </h1>
      </div>

      {/* Navigation */}
      <nav
        className={`flex-1 overflow-y-auto ${
          isExpanded ? 'px-8' : 'flex flex-col items-center'
        }`}
      >
        <ul className={`space-y-4 ${!isExpanded ? 'w-48' : ''}`}>
          {mainMenu.map((item) => (
            <li key={item.id}>
              {item.children.length > 0 ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleMenuItemClick(item)}
                    tabIndex={0}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:outline-none w-full text-left"
                  >
                    {item.label}
                  </button>
                  {isExpanded && expandedParent === item.id && (
                    <ul className="mt-3 pl-4 space-y-2 border-l border-gray-100">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.target}
                            className="text-gray-500 hover:text-gray-700 transition-colors text-xs font-light focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:outline-none"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.target}
                  onClick={() => setIsExpanded(true)}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      {isExpanded && (
        <div className="flex-shrink-0 py-6 border-t border-gray-100">
          <SocialLinks />
        </div>
      )}

      {/* Footer */}
      {isExpanded && (
        <div className="px-8 pb-8 text-xs text-gray-400 font-light">
          © {new Date().getFullYear()}
        </div>
      )}
    </aside>
  );
}
