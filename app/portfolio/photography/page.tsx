import type { Metadata } from 'next';
import PhotoGallery from '@/components/PhotoGallery';
import { photographyGallery } from '@/app/data/photos';

export const metadata: Metadata = {
  title: 'Photography | Portfolio',
  description: 'Photography portfolio of Dustin Niles.',
  openGraph: {
    type: 'website',
    url: '/portfolio/photography',
  },
  alternates: { canonical: '/portfolio/photography' },
};

export default function PhotographyPage() {
  return <PhotoGallery photos={photographyGallery} />;
}
