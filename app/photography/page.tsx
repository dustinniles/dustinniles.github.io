import PhotoGallery from '@/components/PhotoGallery';
import { photographyGallery } from '@/app/data/photos';

export default function PhotographyPage() {
  return <PhotoGallery photos={photographyGallery} />;
}
