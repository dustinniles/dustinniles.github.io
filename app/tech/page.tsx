import BlogLayout from '@/components/BlogLayout';
import { blogPosts } from '@/app/data/blog-posts';

export default function TechPage() {
  const techPosts = blogPosts.filter((post) => post.category === 'tech');

  return (
    <div>
      <div className="p-12">
        <h1 className="text-3xl font-light text-[var(--foreground)] mb-2">Tech</h1>
      </div>
      <BlogLayout posts={techPosts} />
    </div>
  );
}
