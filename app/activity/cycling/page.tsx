import type { Metadata } from 'next';
import BlogLayout from '@/components/BlogLayout';
import { blogPosts } from '@/app/data/blog-posts';

export const metadata: Metadata = {
  title: 'Cycling | Activity',
  description: 'Cycling rides, routes, and training notes from Dustin Niles.',
  openGraph: {
    type: 'website',
    url: '/activity/cycling',
  },
  alternates: { canonical: '/activity/cycling' },
};

export default function CyclingPage() {
  const cyclingPosts = blogPosts.filter((post) => post.category === 'cycling');

  return (
    <div>
      <div className="p-12">
        <h1 className="text-3xl font-light text-[var(--foreground)] mb-2">Cycling</h1>
      </div>
      <BlogLayout posts={cyclingPosts} />
    </div>
  );
}
