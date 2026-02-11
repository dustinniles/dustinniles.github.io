import { BlogPost } from '@/app/types';

interface BlogLayoutProps {
  posts: BlogPost[];
}

export default function BlogLayout({ posts }: BlogLayoutProps) {
  return (
    <div className="p-12 max-w-2xl">
      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-gray-100 pb-8 last:border-b-0">
            <header className="mb-4">
              <h2 className="text-xl font-light text-gray-900 mb-2">{post.title}</h2>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.readingTime && <span>{post.readingTime}</span>}
              </div>
            </header>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>

            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
              <p className="text-sm whitespace-pre-wrap font-light">{post.content}</p>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-gray-400">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}
