import { BlogPost } from '@/app/types';

interface BlogLayoutProps {
  posts: BlogPost[];
}

export default function BlogLayout({ posts }: BlogLayoutProps) {
  return (
    <div className="p-12 max-w-2xl">
      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-8 last:border-b-0 border-[var(--border)]">
            <header className="mb-4">
              <h2 className="text-xl font-light mb-2 text-[var(--foreground)]">{post.title}</h2>
              <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
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

            <p className="text-sm leading-relaxed mb-4 text-[var(--text-secondary)]">{post.excerpt}</p>

            <div className="prose prose-sm max-w-none leading-relaxed text-[var(--text-secondary)]">
              <p className="text-sm whitespace-pre-wrap font-light">{post.content}</p>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-[var(--text-tertiary)]">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}
