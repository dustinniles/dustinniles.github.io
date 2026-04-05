# Data Model: Landing Node Foundation

**Feature Branch**: `001-landing-node-foundation`
**Date**: 2026-04-05
**Source**: `app/types/index.ts` (existing) + new additions

---

## Existing Types (unchanged)

These interfaces exist in `app/types/index.ts` and require no modification.

### NavigationMenuItem

```typescript
interface NavigationMenuItem {
  id: string;
  label: string;
  target: string;         // route path e.g. '/portfolio'
  level: 0 | 1;           // 0 = top-level, 1 = sub-item
  parentId: string | null;
  children: NavigationMenuItem[];
  icon?: string;          // optional, not currently rendered
  order: number;          // sort order within level
}
```

**Used by**: `app/data/navigation.ts`, `components/MenuSlider.tsx`

---

## Modified Types

### SocialMediaLink (extend with category)

Add `category` field. All existing usages in `MenuSlider.tsx` are unaffected (it only
reads `url`, `platform`, `icon`, `ariaLabel`).

```typescript
type SocialLinkCategory = 'professional' | 'code' | 'social' | 'publications';

interface SocialMediaLink {
  id: string;
  platform: string;
  icon: string;
  url: string;
  order: number;
  ariaLabel: string;
  category: SocialLinkCategory;  // NEW — required for links page grouping
}
```

**Used by**: `app/data/social-links.ts`, `components/SocialLinks.tsx`, `app/links/page.tsx` (new)

---

## New Types

### ProjectEntry

The decision-document portfolio model. Add to `app/types/index.ts`.

```typescript
interface ProjectMedia {
  type: 'image' | 'video';
  src: string;             // path in /public/ or CDN URL
  alt: string;
  caption?: string;
}

interface ProjectEntry {
  id: string;
  title: string;
  slug: string;            // URL-safe identifier e.g. 'nyu-emergency-alerts'
  tags: string[];          // e.g. ['campus-safety', 'video', 'communications']
  dateRange: string;       // human-readable e.g. '2024–2025'
  featured: boolean;       // show on portfolio list above the fold
  status: 'draft' | 'published';

  // Narrative fields — all required for published entries
  context: string;         // starting situation and constraints
  objective: string;       // specific goal
  approach: string;        // what was done and why
  outcome: string;         // MUST contain quantifiable result
  lessons: string;         // reflection and transferable insight

  media?: ProjectMedia[];  // optional — layout degrades gracefully when absent
}
```

**Validation rule**: `status === 'published'` requires `outcome` to contain at least
one numeric or percentage value. This is enforced by convention, not runtime code.

**Used by**: `app/data/projects.ts` (data), `app/portfolio/page.tsx` (list),
`app/portfolio/[slug]/page.tsx` (detail), `app/sitemap.ts` (routes)

---

### NavigationSection (home page cards)

Extends `NavigationMenuItem` with a description for home page decision cards.
Not stored in `navigation.ts` — generated at the home page component level from
the top-level items in `mainMenu` that have descriptions.

```typescript
interface NavigationSectionCard {
  id: string;
  label: string;
  target: string;
  description: string;    // one-line description shown on home page card
}
```

**Used by**: `app/page.tsx` (home) only. Defined inline or as a small constant in
`app/page.tsx` — not added to `app/data/navigation.ts` to keep nav data clean.

---

### SiteMetadata (per-page SEO — implicit, not a runtime type)

This is not a TypeScript interface that gets stored — it describes the shape of the
Next.js `metadata` export. Documented here for reference.

```typescript
// Shape used in each page.tsx
const metadata: Metadata = {
  title: string,               // page-specific, max ~60 chars
  description: string,         // page-specific, max ~155 chars
  openGraph: {
    title: string,
    description: string,
    url: string,               // canonical URL for this page
    type: 'website' | 'article',
  },
  alternates: {
    canonical: string,         // same as og:url
  },
}
```

**Dynamic portfolio routes** use `generateMetadata({ params })` to derive from
the matching `ProjectEntry` in `app/data/projects.ts`.

---

## Data File Map

| File | Exports | Purpose |
|---|---|---|
| `app/data/navigation.ts` | `mainMenu: NavigationMenuItem[]` | Restructured to four-section hierarchy |
| `app/data/projects.ts` | `projects: ProjectEntry[]` | NEW — portfolio case studies |
| `app/data/social-links.ts` | `socialLinks: SocialMediaLink[]` | Extended with `category` field |
| `app/data/photos.ts` | `photographyGallery: PortfolioPhoto[]` | Unchanged (moved to portfolio sub-route) |
| `app/data/videos.ts` | `videoGallery: VideoItem[]` | Unchanged (moved to portfolio sub-route) |
| `app/data/blog-posts.ts` | `blogPosts: BlogPost[]` | Unchanged (cycling/volunteering sub-routes) |

---

## State Transitions

### ProjectEntry lifecycle

```
draft → published
```

Only `published` entries appear in the portfolio list and are included in `sitemap.ts`.
Draft entries can exist in `projects.ts` but are filtered out at the page level.

### Navigation expand/collapse

This is UI state managed in `SiteLayout.tsx` and `MenuSlider.tsx` — not data model state.
No changes needed.

---

## Relationships

```
NavigationMenuItem (portfolio)
  └── children: [projects, photography, video]

NavigationMenuItem (activity)
  └── children: [cycling, volunteering]

NavigationMenuItem (lab)
  └── no children (leaf item in this phase)

NavigationMenuItem (links)
  └── no children (leaf item)

ProjectEntry.slug ──resolves to──> /portfolio/[slug] route

SocialMediaLink.category ──groups into──> Links page sections
```
