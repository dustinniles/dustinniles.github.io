import Link from 'next/link';
import BlogLayout from '@/components/BlogLayout';
import { blogPosts } from '@/app/data/blog-posts';

export default function CyclingPage() {
  const cyclingPosts = blogPosts.filter((post) => post.category === 'cycling');

  return (
    <div>
      <div className="p-12">
        <Link href="/play" className="font-light text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">← Play</Link>
        <h1 className="text-3xl font-light text-[var(--foreground)] mt-4 mb-2">Cycling</h1>
      </div>
      <BlogLayout posts={cyclingPosts} />
    </div>
  );
}
