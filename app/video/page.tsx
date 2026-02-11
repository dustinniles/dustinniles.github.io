import { videoGallery } from '@/app/data/videos';

export default function VideoPage() {
  return (
    <div className="p-12">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-12">Video</h1>

      <div className="space-y-12 max-w-2xl">
        {videoGallery.map((video) => {
          const iframeSrc =
            video.platform === 'youtube'
              ? `https://www.youtube-nocookie.com/embed/${video.videoId}`
              : `https://player.vimeo.com/video/${video.videoId}`;

          return (
            <section key={video.id} className="space-y-3">
              <div>
                <h2 className="text-lg font-light text-[var(--foreground)] mb-1">{video.title}</h2>
                {video.duration && (
                  <p className="text-xs text-[var(--text-tertiary)]">{video.duration}</p>
                )}
              </div>

              {/* bg-gray-900 kept intentionally for video player background (dark by design) */}
              <div className="relative w-full bg-gray-900 rounded" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={iframeSrc}
                  title={video.title}
                  className="absolute inset-0 w-full h-full rounded"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  loading="lazy"
                />
              </div>

              {video.description && (
                <p className="text-sm text-[var(--text-secondary)]">{video.description}</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
