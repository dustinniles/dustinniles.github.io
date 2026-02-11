import { BlogPost } from '@/app/types';

export const blogPosts: BlogPost[] = [
  {
    id: 'cycling-1',
    title: 'Gravel Riding in the Pacific Northwest',
    slug: 'gravel-riding-pacific-northwest',
    content: `Exploring the beautiful gravel roads of the Pacific Northwest has been an incredible journey.
    From the rolling hills of Oregon to the rugged terrain of Washington state, each ride brings new discoveries.
    The combination of stunning landscapes and challenging terrain makes this region perfect for gravel cycling.
    Whether you're a seasoned cyclist or just starting out, these routes offer something for everyone.`,
    excerpt: 'Exploring gravel routes across Oregon and Washington state.',
    category: 'cycling',
    publishDate: '2024-01-15',
    status: 'published',
    readingTime: '5 min read',
  },
  {
    id: 'tech-1',
    title: 'Next.js 16: Building Modern Web Experiences',
    slug: 'nextjs-16-modern-web',
    content: `Next.js 16 brings powerful new features for building fast, scalable web applications.
    With improved App Router capabilities, enhanced performance optimizations, and better developer experience,
    it's an exciting time to be building with Next.js. The static export option is perfect for sites hosted on GitHub Pages,
    and TypeScript support is seamless. Dive into the latest features and see how they can improve your projects.`,
    excerpt: 'Exploring the latest features in Next.js 16 and their impact on web development.',
    category: 'tech',
    publishDate: '2024-01-10',
    status: 'published',
    readingTime: '8 min read',
  },
  {
    id: 'volunteering-1',
    title: 'Community Tech Mentorship Programs',
    slug: 'community-tech-mentorship',
    content: `Giving back to the community through tech education has been incredibly rewarding.
    Mentoring aspiring developers and helping them navigate the tech industry creates meaningful impact.
    From teaching fundamentals to career guidance, there are many ways to contribute.
    If you're interested in volunteering or becoming a mentor, there are organizations ready to welcome you.`,
    excerpt: 'How tech mentorship programs are building the next generation of developers.',
    category: 'volunteering',
    publishDate: '2024-01-05',
    status: 'published',
    readingTime: '6 min read',
  },
];
