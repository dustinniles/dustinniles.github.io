# Component Contracts: Landing Node Foundation

**Feature Branch**: `001-landing-node-foundation`
**Date**: 2026-04-05

This is a static Next.js site with no backend API. "Contracts" here define the component
prop interfaces, route data contracts, and rendering guarantees that implementation must
honour.

---

## New Components

### ProjectCard

**File**: `components/ProjectCard.tsx`
**Used by**: `app/portfolio/page.tsx`

```typescript
interface ProjectCardProps {
  project: ProjectEntry;
}
```

**Rendering contract**:
- MUST display: `title`, first tag (as domain label), `dateRange`, first sentence of `outcome`
- MUST link to `/portfolio/[slug]`
- MUST provide hover border-highlight affordance (border-color transition)
- MUST NOT render if `project.status !== 'published'`
- MUST degrade gracefully when `project.media` is absent (no broken image)

---

### ProjectDetail

**File**: `components/ProjectDetail.tsx`
**Used by**: `app/portfolio/[slug]/page.tsx`

```typescript
interface ProjectDetailProps {
  project: ProjectEntry;
}
```

**Rendering contract**:
- MUST render all five narrative sections in order: Context, Objective, Approach, Outcome, Lessons
- MUST use `<article>` as root element with semantic `<section>` or `<h2>` headings per section
- MUST include a "Back to Portfolio" navigation link
- MUST render any `project.media` items with appropriate `alt` text
- MUST NOT require media to render — media array is optional

---

### JsonLd

**File**: `components/JsonLd.tsx`
**Used by**: `app/layout.tsx` (Person schema), `app/portfolio/[slug]/page.tsx` (CreativeWork schema)

```typescript
interface JsonLdProps {
  data: Record<string, unknown>;
}
```

**Rendering contract**:
- MUST render a `<script type="application/ld+json">` tag
- Data MUST be serialized with `JSON.stringify()`
- Data MUST only originate from `app/data/` files — never from user input or external sources
- MUST be a Server Component (no `'use client'` directive)

---

### LinkGroup

**File**: `components/LinkGroup.tsx`
**Used by**: `app/links/page.tsx`

```typescript
interface LinkGroupProps {
  category: SocialLinkCategory;
  label: string;
  links: SocialMediaLink[];
}
```

**Rendering contract**:
- MUST display `label` as a group heading
- MUST render each link as `<a target="_blank" rel="noopener noreferrer">`
- MUST render nothing (null) if `links` array is empty

---

## Route Data Contracts

### `/portfolio` (list page)

**File**: `app/portfolio/page.tsx`
**Data source**: `app/data/projects.ts`

- Renders only entries where `status === 'published'`
- `featured === true` entries render first
- Empty state MUST be handled (show message, not blank page)

---

### `/portfolio/[slug]` (detail page)

**File**: `app/portfolio/[slug]/page.tsx`
**Data source**: `app/data/projects.ts`

```typescript
// Required exports
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return projects
    .filter(p => p.status === 'published')
    .map(p => ({ slug: p.slug }));
}
```

- Only published entries generate static routes
- If a slug is not found in data (shouldn't happen with `dynamicParams = false`), render
  a clear error state rather than throwing

---

### `/` (home page)

**File**: `app/page.tsx`
**Data source**: Inline `NavigationSectionCard[]` constant

- MUST display: name, role, value statement, four section cards
- All content MUST be visible without scrolling at 1024px viewport height
- Section cards MUST link to their respective routes
- MUST be a Server Component

---

### `/links` (links page)

**File**: `app/links/page.tsx`
**Data source**: `app/data/social-links.ts`

- Groups links by `category` field
- Category order: professional → code → social → publications
- Empty categories are not rendered

---

## Metadata Contracts

### Root layout metadata

**File**: `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://dustinniles.github.io'),
  title: {
    default: 'Dustin Niles',
    template: '%s | Dustin Niles',
  },
  description: '[professional positioning statement — to be set]',
  openGraph: {
    siteName: 'Dustin Niles',
    type: 'website',
  },
};
```

### Portfolio detail metadata

**File**: `app/portfolio/[slug]/page.tsx`

```typescript
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return {
    title: project?.title,
    description: project?.outcome.slice(0, 155),
    openGraph: {
      type: 'article',
      url: `/portfolio/${slug}`,
    },
    alternates: { canonical: `/portfolio/${slug}` },
  };
}
```

---

## Sitemap Contract

**File**: `app/sitemap.ts`

Must include all of the following routes:
- `/` — priority 1.0, changeFrequency: 'monthly'
- `/portfolio` — priority 0.9
- `/portfolio/[slug]` for each published ProjectEntry — priority 0.8
- `/lab` — priority 0.7
- `/activity` — priority 0.7
- `/activity/cycling` — priority 0.6
- `/activity/volunteering` — priority 0.6
- `/links` — priority 0.6
- `/about` — priority 0.8
- `/privacy` — priority 0.3
- `/terms` — priority 0.3

---

## CSS Design Contracts

### Accent color variable

**File**: `app/globals.css`

```css
:root {
  --color-accent: #2563eb;  /* blue — 8.6:1 contrast on white ✓ WCAG AA */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-accent: #60a5fa;  /* light blue — 6.5:1 contrast on #1a1a1a ✓ */
  }
}
```

### Card border-highlight contract

Every card component MUST apply this pattern or equivalent:
- Default state: `border: 1px solid var(--border)`
- Hover state: `border-color: var(--color-accent)`
- Transition: `transition: border-color 300ms ease`
- Reduced-motion: transition automatically disabled by global `prefers-reduced-motion` rule

### Animation keyframes contract

All custom `@keyframes` MUST be defined inside the `@theme` block in `globals.css`.
All animated elements MUST use `motion-safe:` Tailwind variant OR be gated by the
global reduced-motion rule.

No component MAY define its own `@keyframes` outside of `globals.css`.
