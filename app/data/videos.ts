import { VideoItem } from '@/app/types';

export const videoGallery: VideoItem[] = [
  {
    id: 'video-1',
    title: 'Portfolio Reel 2024',
    videoId: 'dQw4w9WgXcQ',
    platform: 'youtube',
    description: 'A showcase of recent photography and videography projects.',
    thumbnail: {
      src: '/images/portfolio/video-1-thumb.jpg',
      alt: 'Portfolio reel thumbnail',
    },
    duration: '3:45',
    order: 1,
    publishDate: '2024-01-20',
  },
  {
    id: 'video-2',
    title: 'Behind the Scenes: Creative Process',
    videoId: 'jNQXAC9IVRw',
    platform: 'youtube',
    description: 'An insight into my creative workflow and approach to visual storytelling.',
    thumbnail: {
      src: '/images/portfolio/video-2-thumb.jpg',
      alt: 'Behind the scenes thumbnail',
    },
    duration: '5:20',
    order: 2,
    publishDate: '2024-01-10',
  },
];
