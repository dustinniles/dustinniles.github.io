# Video Embed Specifications

**Platforms**: YouTube (Privacy-Enhanced), Vimeo
**Usage**: Portfolio video gallery section

## Overview

Video embeds use iframe elements with privacy-enhanced domains and security sandbox attributes. All embeds lazy-load to improve initial page performance.

## YouTube Privacy-Enhanced Embed

### Embed URL Format
```
https://www.youtube-nocookie.com/embed/{VIDEO_ID}
```

### Example HTML
```html
<iframe
  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
  title="Portfolio Showreel 2026"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  sandbox="allow-scripts allow-same-origin allow-presentation"
  loading="lazy"
  width="560"
  height="315"
></iframe>
```

### React/TypeScript Component
```typescript
interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export const YouTubeEmbed = ({ videoId, title }: YouTubeEmbedProps) => {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};
```

### YouTube URL Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `rel` | 0 | Hide related videos from other channels |
| `modestbranding` | 1 | Minimal YouTube branding |
| `controls` | 1 | Show player controls |
| `autoplay` | 0 | Disable autoplay (default) |

**Example with parameters:**
```
https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1
```

### Privacy Benefits

**youtube-nocookie.com vs youtube.com:**
- Delays setting tracking cookies until user clicks play
- Reduces initial tracking fingerprint
- Complies with GDPR "legitimate interest" requirements
- Still allows full YouTube functionality once video starts

**Limitations:**
- Cookies still set after user interaction
- Local Storage may be used even without play
- Not a complete tracking prevention solution

---

## Vimeo Embed

### Embed URL Format
```
https://player.vimeo.com/video/{VIDEO_ID}
```

### Example HTML
```html
<iframe
  src="https://player.vimeo.com/video/76979871"
  title="Video Title"
  frameBorder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
  sandbox="allow-scripts allow-same-origin allow-presentation"
  loading="lazy"
  width="640"
  height="360"
></iframe>
```

### React/TypeScript Component
```typescript
interface VimeoEmbedProps {
  videoId: string;
  title: string;
}

export const VimeoEmbed = ({ videoId, title }: VimeoEmbedProps) => {
  const embedUrl = `https://player.vimeo.com/video/${videoId}`;

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};
```

### Vimeo URL Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `dnt` | 1 | Do Not Track (privacy mode) |
| `title` | 0 | Hide video title |
| `byline` | 0 | Hide video author |
| `portrait` | 0 | Hide author portrait |

**Example with parameters:**
```
https://player.vimeo.com/video/76979871?dnt=1&title=0&byline=0&portrait=0
```

---

## Security Configuration

### Sandbox Attributes

```html
sandbox="allow-scripts allow-same-origin allow-presentation"
```

**Allowed:**
- `allow-scripts`: JavaScript execution (required for player controls)
- `allow-same-origin`: Same-origin requests (required for video loading)
- `allow-presentation`: Fullscreen mode

**Blocked:**
- Forms submission
- Top-level navigation
- Popups
- Modal dialogs
- Pointer lock
- Orientation lock

### Content Security Policy

```
Content-Security-Policy:
  frame-src 'self' https://www.youtube-nocookie.com https://player.vimeo.com;
  script-src 'self';
  style-src 'self';
```

**Note:** GitHub Pages doesn't support custom headers. CSP is documented for future hosting migration or local development.

### HTTPS Enforcement

- All embed URLs use HTTPS
- Mixed content warnings prevented
- TLS 1.2+ required

---

## Responsive Design

### Aspect Ratio Containers

**16:9 ratio (most common):**
```css
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 9/16 = 0.5625 */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

**4:3 ratio (legacy):**
```css
.video-container {
  padding-bottom: 75%; /* 3/4 = 0.75 */
}
```

### Tailwind CSS Implementation
```tsx
<div className="relative w-full aspect-video">
  <iframe
    src={embedUrl}
    className="absolute inset-0 w-full h-full"
  />
</div>
```

---

## Performance Optimization

### Lazy Loading
```html
<iframe loading="lazy" ... />
```

- Defers iframe loading until near viewport
- Reduces initial page load time
- Supported in all modern browsers (Chrome 77+, Firefox 75+, Safari 15.4+)

### Thumbnail Placeholders (Optional)
```tsx
'use client';

import { useState } from 'react';

export const LazyVideo = ({ videoId, title, thumbnail }: Props) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!showVideo) {
    return (
      <button
        onClick={() => setShowVideo(true)}
        className="relative w-full aspect-video"
      >
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-20 h-20 text-white">
            {/* Play icon */}
          </svg>
        </div>
      </button>
    );
  }

  return <YouTubeEmbed videoId={videoId} title={title} />;
};
```

**Benefits:**
- User control over embed loading
- Further reduces initial page weight
- Improves perceived performance

---

## Accessibility

### Required Attributes
```html
<iframe
  title="Descriptive video title"
  aria-label="Embedded video player"
  ...
/>
```

### Keyboard Navigation
- YouTube and Vimeo players support keyboard controls by default
- Space bar: Play/pause
- Arrow keys: Seek forward/backward
- F: Fullscreen toggle
- M: Mute toggle

### Screen Reader Announcements
```html
<div role="region" aria-label="Portfolio videos">
  <h2>Video Gallery</h2>
  <iframe title="Portfolio Showreel 2026" ... />
</div>
```

---

## Testing

### Manual Testing Checklist
- [ ] Video loads correctly
- [ ] Play/pause controls work
- [ ] Fullscreen mode works
- [ ] Volume controls work
- [ ] Closed captions available (if applicable)
- [ ] Mobile touch controls work
- [ ] Lazy loading defers initial load
- [ ] Privacy-enhanced URL used (YouTube)
- [ ] Do Not Track parameter set (Vimeo)

### Browser Compatibility
- Chrome 90+: ✅ Full support
- Firefox 88+: ✅ Full support
- Safari 14+: ✅ Full support
- Edge 90+: ✅ Full support
- iOS Safari 14+: ✅ Full support
- Android Chrome 90+: ✅ Full support

### Known Issues
- **iOS Safari < 10**: Requires user interaction before autoplay
- **Firefox**: Fullscreen may require additional permissions
- **Safari**: Picture-in-picture may not work on embedded videos

---

## Error Handling

### Video Not Found (404)
YouTube and Vimeo show built-in error messages in iframe.

### Network Errors
```tsx
export const VideoEmbed = ({ videoId, title }: Props) => {
  return (
    <div className="relative w-full aspect-video bg-gray-900">
      <iframe
        src={embedUrl}
        title={title}
        onError={() => console.error(`Failed to load video: ${videoId}`)}
        ...
      />
      <noscript>
        <p className="text-white p-4">
          JavaScript is required to play embedded videos.
        </p>
      </noscript>
    </div>
  );
};
```

### Fallback Content
```html
<iframe ... >
  <p>Your browser does not support iframes.
     <a href="https://youtube.com/watch?v={VIDEO_ID}">Watch on YouTube</a>
  </p>
</iframe>
```

---

## Monitoring

### Metrics to Track
- Video load success rate
- Average load time
- User engagement (play rate)
- Fullscreen usage
- Error rate (failed embeds)

### Analytics
YouTube and Vimeo provide built-in analytics in their dashboards. For client-side tracking:

```typescript
const handleVideoPlay = () => {
  // Track video play event
  console.log(`Video played: ${videoId}`);
};
```

---

## Migration & Updates

### Changing Video Platform
1. Update embed URL generation logic
2. Update CSP frame-src directive
3. Test all embed features
4. Update documentation

### Video ID Changes
1. Update video ID in `app/data/videos.ts`
2. Verify embed loads correctly
3. Update thumbnail if needed

