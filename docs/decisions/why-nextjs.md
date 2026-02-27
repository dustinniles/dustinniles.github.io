---
title: "Decision: Why Next.js"
type: note
permalink: decisions/why-nextjs
tags:
  - decision
  - next-js
  - architecture
---

# Decision: Why Next.js

## Context
- [decision] The site is a personal portfolio requiring fast page loads, SEO-friendly output, and simple hosting #architecture
- [decision] Content is entirely static (no user authentication, no dynamic data, no API calls) #static

## Decision
- [decision] Chose Next.js (App Router) with `output: 'export'` for static site generation #next-js
- [decision] Version 16.1.6 selected as the latest stable release at project inception #versioning

## Rationale
- [decision] Next.js App Router provides file-based routing (`app/about/page.tsx` creates `/about`) eliminating manual route configuration #routing
- [decision] Static export (`output: 'export'`) generates plain HTML/CSS/JS files deployable to any static host without a Node.js server #deployment
- [decision] Built-in TypeScript support and React Server Components architecture align with modern React patterns #typescript
- [decision] Tailwind CSS 4 integrates via PostCSS with zero additional configuration beyond `postcss.config.mjs` #styling
- [decision] `next/image` component provides responsive image handling even in static mode (with `unoptimized: true`) #images
- [decision] `next/link` provides client-side navigation between pages without full page reloads #navigation

## Alternatives Considered
- [decision] Plain HTML/CSS -- rejected due to lack of component reuse and routing convenience #alternative
- [decision] Gatsby -- viable but Next.js has broader ecosystem adoption and simpler mental model with App Router #alternative
- [decision] Astro -- viable for static content but less mature React integration at the time #alternative

## Consequences
- [decision] Images must use `unoptimized: true` since the Next.js image optimization server is unavailable in static export #tradeoff
- [decision] No server-side rendering or API routes available; all data must be embedded in source files #constraint
- [decision] Build step required (`npm run build`) to generate `/out` directory before deployment #workflow

## Relations
- related_to [[architecture/system-overview]]
- related_to [[decisions/hosting-github-pages]]
- related_to [[guides/deployment]]
