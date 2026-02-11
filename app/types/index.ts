export interface NavigationMenuItem {
  id: string;
  label: string;
  target: string;
  level: 0 | 1;
  parentId: string | null;
  children: NavigationMenuItem[];
  icon?: string;
  order: number;
}

export interface PortfolioPhoto {
  id: string;
  src: string;
  srcSet?: {
    avif?: string;
    webp?: string;
  };
  alt: string;
  order: number;
  width: number;
  height: number;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  caption?: string;
  location?: string;
  dateTaken?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: 'cycling' | 'tech' | 'volunteering';
  publishDate: string;
  updatedDate?: string;
  featuredImage?: {
    src: string;
    alt: string;
  };
  readingTime?: string;
  tags?: string[];
  status: 'draft' | 'published';
}

export interface VideoItem {
  id: string;
  title: string;
  videoId: string;
  platform: 'youtube' | 'vimeo';
  description?: string;
  thumbnail: {
    src: string;
    alt: string;
  };
  duration?: string;
  order: number;
  publishDate: string;
}

export interface SocialMediaLink {
  id: string;
  platform: string;
  icon: string;
  url: string;
  order: number;
  ariaLabel: string;
}
