'use client';

import { useRef, useEffect, useState } from 'react';
import { PortfolioPhoto } from '@/app/types';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

interface PhotoGalleryProps {
  photos: PortfolioPhoto[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Show arrow indicator after 1.5 seconds
    if (!reducedMotion) {
      const timer = setTimeout(() => setShowIndicator(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        container.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
    };

    const handleScroll = () => {
      setShowIndicator(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-scroll"
      style={{
        scrollSnapType: 'y mandatory',
        overscrollBehavior: 'contain',
      }}
    >
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="relative w-full flex-shrink-0"
          style={{
            height: '100vh',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Arrow indicator — T011: uses CSS variable for color */}
      {showIndicator && (
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
          style={{ opacity: showIndicator ? 1 : 0 }}
        >
          <svg
            className="w-6 h-6 animate-bounce text-[var(--text-secondary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
