# Research: Landing Node Foundation

**Feature Branch**: `001-landing-node-foundation`
**Date**: 2026-04-05
**Status**: Complete — no NEEDS CLARIFICATION items remain

---

## Decision 1: Navigation data restructure approach

**Decision**: Update `app/data/navigation.ts` only. No component changes needed.

**Rationale**: `MenuSlider.tsx` is fully data-driven — it renders whatever `mainMenu` contains.
The `NavigationMenuItem` type already supports the two-level hierarchy needed for all four
sections. Active path highlighting (`isActivePath`), sub-menu expand/collapse (`expandedParent`),
and all ARIA attributes are handled automatically by existing component logic.

**Alternatives considered**: Rebuilding `MenuSlider.tsx` to support three levels — rejected
because all proposed sections fit within the existing two-level structure.

---

## Decision 2: New route directory strategy

**Decision**: Create new route directories (portfolio/, lab/, activity/, links/, privacy/,
terms/) and leave old routes (work/, play/, contact/) in place temporarily to avoid 404s
for any existing links. Old routes can be removed after new ones are confirmed.

**Rationale**: Next.js static export generates a directory per route. There is no redirect
mechanism without a server. Deleting old routes immediately would break any bookmarked or
shared links. Parallel existence has zero runtime cost.

**Alternatives considered**: Redirects via `_redirects` file (GitHub Pages does not support
this for SPA rewrites). Server-side `redirect()` in Next.js (not available with static export).

---

## Decision 3: ProjectEntry as TypeScript data file

**Decision**: Add `ProjectEntry` interface to `app/types/index.ts` and create
`app/data/projects.ts` as a typed TypeScript array. Portfolio detail pages use
`generateStaticParams()` + `dynamicParams = false`.

**Rationale**: Consistent with every other data type in the codebase (photos, videos,
blog-posts, social-links all use this exact pattern). Type-safe. No new dependencies.
Works perfectly with static export.

**Alternatives considered**: MDX files for project content — rejected because it would
require `@next/mdx` dependency and adds build complexity without meaningful benefit for
this content volume.

---

## Decision 4: Per-page metadata pattern

**Decision**: Use Next.js `metadata` export in each `page.tsx`. Set `metadataBase` in
root `app/layout.tsx`. Use `generateMetadata()` for dynamic portfolio routes.

**Rationale**: Native Next.js App Router feature, works fully with `output: 'export'`.
Generates all `<title>`, `<meta>`, Open Graph, and canonical tags at build time.
Current `layout.tsx` already has a minimal `metadata` export — extend it.

**Key implementation detail**: `metadataBase` must be set to `https://dustinniles.github.io`
so all relative canonical URLs and OG image paths resolve correctly.

---

## Decision 5: Sitemap and robots.txt generation

**Decision**: Use `app/sitemap.ts` and `app/robots.ts` conventions (Next.js built-in).

**Rationale**: Both generate static files at build time with `output: 'export'`.
`sitemap.ts` returns `MetadataRoute.Sitemap` array — include all static routes plus
dynamically-generated portfolio slugs by importing from `app/data/projects.ts`.
`robots.ts` returns `MetadataRoute.Robots` — simple allow-all with sitemap pointer.

**Alternative considered**: Static `public/sitemap.xml` — rejected because portfolio
routes are dynamic (generated from data); a static file would require manual updates.

---

## Decision 6: JSON-LD structured data

**Decision**: Create `components/JsonLd.tsx` — a server component that renders a
`<script type="application/ld+json">` tag using `JSON.stringify()` on controlled data.
Include `Person` schema in root layout. Include `CreativeWork` schema on each portfolio
detail page.

**Rationale**: Rendering serialized JSON into a script tag is the canonical Next.js
recommendation for structured data. The approach is safe because all data comes exclusively
from `app/data/` TypeScript files — no user input, no URL parameters, no external sources.
Works with static export. No external library needed.

---

## Decision 7: Animation and micro-interaction approach

**Decision**: Use Tailwind CSS 4 `@theme` block to define custom animation keyframes.
Use `motion-safe:` variant for opt-in animations. Rely on the existing global
`prefers-reduced-motion: reduce` rule in `globals.css` as the global safety net.

**Rationale**: `globals.css` already has a correct global reduced-motion rule that sets
all animation/transition durations to 0.01ms. This means ALL Tailwind transitions and
custom CSS animations are automatically disabled for reduce-motion users without any
per-component effort. Tailwind's `motion-safe:` variant is additive on top of this.

**Card hover pattern**: `border-color` transition + `translateY(-2px)` on hover.
Both are GPU-accelerated and performant. No `will-change` needed for card hovers
(already used sparingly on `.slide-menu` and `.content-fade`).

**Typing animation**: CSS `steps()` animation on `width` with `overflow: hidden` for the
typewriter effect. Reduced-motion fallback shows text immediately (`width: auto`,
`animation: none`). Scope this to headings only — not body text.

---

## Decision 8: Accent color variable

**Decision**: Add `--color-accent` CSS custom property to `:root` in `globals.css` with
a dark-mode override. Do not add to `@theme` — Tailwind utility classes for a single
accent are not needed; all uses will be inline `text-[var(--color-accent)]` references.

**Rationale**: The existing codebase uses inline CSS variable references (e.g.,
`text-[var(--foreground)]`) rather than Tailwind color utilities. Consistency with
existing pattern is more important than generating new utility classes. Keeps `@theme` minimal.

**Values**: Light mode: `#2563eb` (blue — high contrast on white). Dark mode: `#60a5fa`
(existing focus-ring blue — already tested for contrast in dark mode at 6.5:1).

---

## Decision 9: SocialLink category extension

**Decision**: Add `category` field to the existing `SocialMediaLink` interface in
`app/types/index.ts`. Update `app/data/social-links.ts` to populate categories.
The Links page groups entries by category client-side.

**Rationale**: Minimal interface change, backward-compatible with `MenuSlider.tsx` which
only uses `url`, `platform`, `icon`, `ariaLabel`. The `category` field is only consumed
by the new Links page component.

**Categories**: `'professional' | 'code' | 'social' | 'publications'`

---

## Technical Context Summary

| Field | Value |
|---|---|
| Language/Version | TypeScript 5.x, React 19.2.3, Next.js 16.1.6 |
| Primary dependencies | Tailwind CSS 4 (PostCSS), @fontsource/ibm-plex-mono |
| New dependencies | None — no new npm packages required for Phases 1-5 |
| Storage | TypeScript data files in `app/data/` (no database) |
| Testing | Manual: `npm run build`, Lighthouse audit, HTML inspection |
| Target platform | Static HTML/CSS/JS — GitHub Pages (dustinniles.github.io) |
| Project type | Web (Next.js static export) |
| Performance goals | FCP < 1.5s on 3G, Lighthouse Performance ≥ 90 |
| Constraints | Static export (`output: 'export'`) must be preserved — no server features |
| Scale/scope | ~15 routes, <10 portfolio entries initially |
