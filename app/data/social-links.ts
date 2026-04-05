import { SocialMediaLink } from '@/app/types';

export const socialLinks: SocialMediaLink[] = [
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/in/dustinniles',
    order: 1,
    ariaLabel: 'Visit Dustin Niles on LinkedIn',
    category: 'professional',
  },
  {
    id: 'github',
    platform: 'GitHub',
    icon: 'github',
    url: 'https://www.github.com/dustinniles',
    order: 2,
    ariaLabel: 'Visit Dustin Niles on GitHub',
    category: 'code',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/dustinniles',
    order: 3,
    ariaLabel: 'Visit Dustin Niles on Instagram',
    category: 'social',
  },
];
