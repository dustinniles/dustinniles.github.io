import Link from 'next/link';
import PhotoGallery from '@/components/PhotoGallery';
import { photographyGallery } from '@/app/data/photos';

export default function PhotographyPage() {
  return (
    <div>
      <div className="px-12 pt-12 pb-0">
        <Link href="/work" className="font-light text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">← Work</Link>
      </div>
      <PhotoGallery photos={photographyGallery} />
    </div>
  );
}
