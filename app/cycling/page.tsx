import BlogLayout from '@/components/BlogLayout';
import { blogPosts } from '@/app/data/blog-posts';

export default function CyclingPage() {
  const cyclingPosts = blogPosts.filter((post) => post.category === 'cycling');

  return (
    <div>
      <div className="p-12">
        <h1 className="text-3xl font-light text-gray-900 mb-2">Cycling</h1>
      </div>
      <BlogLayout posts={cyclingPosts} />
    </div>
  );
}
