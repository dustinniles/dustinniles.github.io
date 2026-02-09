# Data Model: Interactive Portfolio Website Frontend

**Feature Branch**: `001-website-frontend`
**Date**: 2026-02-09
**Status**: Draft

## Overview

This document defines the data structures and relationships for the interactive portfolio website. As a static site with file-based content management, entities are represented as TypeScript interfaces and stored as arrays/objects in source files.

---

## Entity Definitions

### 1. Navigation Menu Item

Represents a clickable navigation option in the hierarchical menu system.

```typescript
interface NavigationMenuItem {
  /** Unique identifier for the menu item */
  id: string;

  /** Display text shown to users */
  label: string;

  /** Navigation target (route path or sub-menu identifier) */
  target: string;

  /** Menu hierarchy level (main: 0, sub: 1) */
  level: 0 | 1;

  /** Parent menu item ID (null for main menu items) */
  parentId: string | null;

  /** Child menu items (empty array for leaf items) */
  children: NavigationMenuItem[];

  /** Icon name (optional, for visual enhancement) */
  icon?: string;

  /** Display order within parent menu */
  order: number;
}
```

**Example Data:**
```typescript
const mainMenu: NavigationMenuItem[] = [
  {
    id: 'work',
    label: 'Work',
    target: '/work',
    level: 0,
    parentId: null,
    order: 1,
    children: [
      {
        id: 'work-resume',
        label: 'Resume',
        target: '/resume',
        level: 1,
        parentId: 'work',
        children: [],
        order: 1
      },
      {
        id: 'work-photography',
        label: 'Photography',
        target: '/photography',
        level: 1,
        parentId: 'work',
        children: [],
        order: 2
      },
      {
        id: 'work-video',
        label: 'Video',
        target: '/photography',
        level: 1,
        parentId: 'work',
        children: [],
        order: 3
      }
    ]
  },
  {
    id: 'play',
    label: 'Play',
    target: '/play',
    level: 0,
    parentId: null,
    order: 2,
    children: [
      {
        id: 'play-cycling',
        label: 'Cycling',
        target: '/cycling',
        level: 1,
        parentId: 'play',
        children: [],
        order: 1
      },
      {
        id: 'play-tech',
        label: 'Tech',
        target: '/tech',
        level: 1,
        parentId: 'play',
        children: [],
        order: 2
      },
      {
        id: 'play-volunteering',
        label: 'Volunteering',
        target: '/volunteering',
        level: 1,
        parentId: 'play',
        children: [],
        order: 3
      }
    ]
  },
  {
    id: 'contact',
    label: 'Contact',
    target: '/contact',
    level: 0,
    parentId: null,
    children: [],
    order: 3
  },
  {
    id: 'about',
    label: 'About',
    target: '/about',
    level: 0,
    parentId: null,
    children: [],
    order: 4
  }
];
```

**Validation Rules:**
- `id` must be unique across all menu items
- `label` required, max 50 characters
- `target` must be valid route path or sub-menu ID
- `level` must be 0 (main) or 1 (sub)
- `parentId` must reference existing menu item ID or be null
- `children` must be empty array for leaf items
- `order` must be positive integer

**State Transitions:**
- Main menu visible → Sub-menu visible (when parent clicked)
- Sub-menu visible → Main menu visible (when back arrow clicked)
- Any menu → Content page (when leaf item clicked)

---

### 2. Portfolio Photo

Represents an image in the photography gallery with scroll-snap viewing.

```typescript
interface PortfolioPhoto {
  /** Unique identifier for the photo */
  id: string;

  /** Image file path relative to /public */
  src: string;

  /** Alternative image formats (AVIF, WebP) */
  srcSet?: {
    avif?: string;
    webp?: string;
  };

  /** Descriptive alt text for accessibility */
  alt: string;

  /** Display order in gallery (ascending) */
  order: number;

  /** Original image dimensions for layout calculation */
  width: number;
  height: number;

  /** Aspect ratio category for responsive handling */
  aspectRatio: 'landscape' | 'portrait' | 'square';

  /** Optional caption displayed with photo */
  caption?: string;

  /** Location where photo was taken */
  location?: string;

  /** Date photo was taken (ISO 8601) */
  dateTaken?: string;
}
```

**Example Data:**
```typescript
const photographyGallery: PortfolioPhoto[] = [
  {
    id: 'photo-001',
    src: '/images/portfolio/mountain-sunset.jpg',
    srcSet: {
      avif: '/images/portfolio/mountain-sunset.avif',
      webp: '/images/portfolio/mountain-sunset.webp'
    },
    alt: 'Golden hour sunset over rocky mountain peaks',
    order: 1,
    width: 1920,
    height: 1080,
    aspectRatio: 'landscape',
    caption: 'Rocky Mountain National Park',
    location: 'Colorado, USA',
    dateTaken: '2026-01-15T17:30:00Z'
  },
  {
    id: 'photo-002',
    src: '/images/portfolio/ocean-waves.jpg',
    srcSet: {
      avif: '/images/portfolio/ocean-waves.avif',
      webp: '/images/portfolio/ocean-waves.webp'
    },
    alt: 'Turquoise ocean waves crashing on sandy beach',
    order: 2,
    width: 1920,
    height: 1080,
    aspectRatio: 'landscape'
  }
];
```

**Validation Rules:**
- `id` must be unique across all photos
- `src` must point to existing image file in `/public`
- `alt` required, max 200 characters, descriptive
- `order` must be unique positive integer
- `width` and `height` must match actual image dimensions
- `aspectRatio` auto-calculated from width/height or manually specified
- `caption` optional, max 150 characters
- `dateTaken` must be valid ISO 8601 date

**State Transitions:**
- Photo visible → Next photo visible (on scroll down)
- Photo visible → Previous photo visible (on scroll up)
- No partial photos ever visible (enforced by scroll-snap)

---

### 3. Blog Post

Represents written content for Cycling, Tech, and Volunteering sections.

```typescript
interface BlogPost {
  /** Unique identifier for the post */
  id: string;

  /** Post title */
  title: string;

  /** Post slug for URL (kebab-case) */
  slug: string;

  /** Full post content (markdown or HTML) */
  content: string;

  /** Short excerpt for preview (optional) */
  excerpt?: string;

  /** Post category */
  category: 'cycling' | 'tech' | 'volunteering';

  /** Publication date (ISO 8601) */
  publishDate: string;

  /** Last updated date (ISO 8601, optional) */
  updatedDate?: string;

  /** Featured image for post header */
  featuredImage?: {
    src: string;
    alt: string;
  };

  /** Reading time estimate in minutes */
  readingTime?: number;

  /** Post tags for categorization */
  tags?: string[];

  /** Published status */
  status: 'draft' | 'published';
}
```

**Example Data:**
```typescript
const blogPosts: BlogPost[] = [
  {
    id: 'cycling-001',
    title: 'First Century Ride: Lessons Learned',
    slug: 'first-century-ride-lessons-learned',
    content: '# First Century Ride...',
    excerpt: 'Reflections on completing my first 100-mile bike ride',
    category: 'cycling',
    publishDate: '2026-02-01T10:00:00Z',
    featuredImage: {
      src: '/images/blog/century-ride.jpg',
      alt: 'Cyclist on mountain road'
    },
    readingTime: 5,
    tags: ['endurance', 'training', 'cycling'],
    status: 'published'
  }
];
```

**Validation Rules:**
- `id` must be unique across all blog posts
- `title` required, max 100 characters
- `slug` must be unique, lowercase, kebab-case
- `content` required (markdown or HTML string)
- `category` must be one of defined categories
- `publishDate` must be valid ISO 8601 date
- `status` defaults to 'draft', must be 'published' to display
- `readingTime` auto-calculated or manually set (minutes)

---

### 4. Video Item

Represents embedded video content in the Video portfolio section.

```typescript
interface VideoItem {
  /** Unique identifier for the video */
  id: string;

  /** Video title */
  title: string;

  /** YouTube or Vimeo video ID */
  videoId: string;

  /** Video platform */
  platform: 'youtube' | 'vimeo';

  /** Short description of video content */
  description?: string;

  /** Video thumbnail image (fallback if embed fails) */
  thumbnail: {
    src: string;
    alt: string;
  };

  /** Video duration in seconds */
  duration?: number;

  /** Display order in video gallery */
  order: number;

  /** Upload/publish date (ISO 8601) */
  publishDate: string;
}
```

**Example Data:**
```typescript
const videoGallery: VideoItem[] = [
  {
    id: 'video-001',
    title: 'Portfolio Showreel 2026',
    videoId: 'dQw4w9WgXcQ',
    platform: 'youtube',
    description: 'Collection of photography and video work from 2026',
    thumbnail: {
      src: '/images/video/showreel-thumb.jpg',
      alt: 'Video showreel thumbnail'
    },
    duration: 180,
    order: 1,
    publishDate: '2026-01-01T00:00:00Z'
  }
];
```

**Validation Rules:**
- `id` must be unique across all videos
- `title` required, max 100 characters
- `videoId` must be valid YouTube or Vimeo ID
- `platform` must be 'youtube' or 'vimeo'
- `thumbnail.src` must point to existing image
- `duration` in seconds (optional)
- `order` must be unique positive integer

**Embed URL Generation:**
```typescript
function getEmbedUrl(video: VideoItem): string {
  if (video.platform === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${video.videoId}`;
  } else {
    return `https://player.vimeo.com/video/${video.videoId}`;
  }
}
```

---

### 5. Social Media Link

Represents external platform profile link for sidebar footer.

```typescript
interface SocialMediaLink {
  /** Unique identifier */
  id: string;

  /** Platform name */
  platform: string;

  /** Icon identifier (for icon library) */
  icon: string;

  /** Full URL to profile */
  url: string;

  /** Display order in footer */
  order: number;

  /** Accessibility label */
  ariaLabel: string;
}
```

**Example Data:**
```typescript
const socialLinks: SocialMediaLink[] = [
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/dustinniles',
    order: 1,
    ariaLabel: 'Visit Dustin Niles on LinkedIn'
  },
  {
    id: 'github',
    platform: 'GitHub',
    icon: 'github',
    url: 'https://github.com/dustinniles',
    order: 2,
    ariaLabel: 'Visit Dustin Niles on GitHub'
  }
];
```

**Validation Rules:**
- `id` must be unique
- `url` must be valid HTTPS URL
- `ariaLabel` required for accessibility
- Links must open in new tab with `rel="noopener noreferrer"`

---

### 6. Contact Form Submission

Represents visitor message submitted via contact form (handled by Formspree).

```typescript
interface ContactFormSubmission {
  /** Visitor name */
  name: string;

  /** Visitor email address */
  email: string;

  /** Message content */
  message: string;

  /** Submission timestamp (ISO 8601, set by Formspree) */
  timestamp?: string;

  /** Submission status */
  status?: 'pending' | 'sent' | 'error';
}
```

**Example Data (client-side form):**
```typescript
const formData: ContactFormSubmission = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'I would like to discuss a photography project.'
};
```

**Validation Rules (client-side):**
- `name` required, max 100 characters, trim whitespace
- `email` required, valid email format
- `message` required, max 2000 characters, trim whitespace
- All fields sanitized by Formspree server-side

**State Transitions:**
- Form empty → Form filled (user input)
- Form filled → Submitting (on submit click)
- Submitting → Success (Formspree 200 OK)
- Submitting → Error (Formspree error or network failure)

---

## Data Storage & Management

### File Locations

```
/app/data/
├── navigation.ts          # NavigationMenuItem[] export
├── photos.ts              # PortfolioPhoto[] export
├── blog-posts.ts          # BlogPost[] export
├── videos.ts              # VideoItem[] export
└── social-links.ts        # SocialMediaLink[] export
```

### Example File Structure:

```typescript
// app/data/navigation.ts
import { NavigationMenuItem } from '@/types';

export const mainMenu: NavigationMenuItem[] = [
  // ... menu data
];
```

### Adding New Content

**Add photo:**
1. Place image in `/public/images/portfolio/`
2. Add entry to `app/data/photos.ts`
3. Increment `order` value

**Add blog post:**
1. Add entry to `app/data/blog-posts.ts`
2. Set `status: 'published'` when ready
3. Optional: Add featured image to `/public/images/blog/`

**Update navigation:**
1. Edit `app/data/navigation.ts`
2. Ensure `id`, `order`, and `parentId` are correct

---

## Relationships

```
NavigationMenuItem (main)
  ├─ NavigationMenuItem (sub) → Route/Page
  └─ NavigationMenuItem (sub) → Route/Page

PortfolioPhoto → Image files (/public/images/portfolio/)

BlogPost → Featured Image (/public/images/blog/)

VideoItem → YouTube/Vimeo Embed (external)

SocialMediaLink → External Profile URL (external)

ContactFormSubmission → Formspree API (external)
```

---

## Summary

This data model provides:
- **Type-safe structures** for all content entities
- **Clear validation rules** for content quality
- **File-based storage** compatible with static export
- **Simple content management** via direct file editing
- **Extensibility** for future content types

All entities are stored as TypeScript arrays/objects, enabling easy editing while maintaining type safety and IDE autocomplete support.

