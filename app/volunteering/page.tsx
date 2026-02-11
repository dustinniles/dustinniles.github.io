import BlogLayout from '@/components/BlogLayout';
import { blogPosts } from '@/app/data/blog-posts';

export default function VolunteeringPage() {
  const volunteeringPosts = blogPosts.filter((post) => post.category === 'volunteering');

  return (
    <div>
      <div className="p-12">
        <h1 className="text-3xl font-light text-gray-900 mb-2">Volunteering</h1>
      </div>
      <BlogLayout posts={volunteeringPosts} />
    </div>
  );
}
