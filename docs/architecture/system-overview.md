---
title: System Overview
type: note
permalink: architecture/system-overview
tags:
  - architecture
  - next-js
  - portfolio
  - static-site
---

# System Overview

## Purpose
- [purpose] Personal website and portfolio for Dustin Niles, hosted at https://dustinniles.github.io #portfolio
- [purpose] Showcases photography, video, resume, blog posts (cycling, tech, volunteering), and social links #content
- [purpose] Designed with a sparse, minimal aesthetic emphasizing large photography and whitespace #design

## Tech Stack
- [tech_stack] Next.js 16.1.6 with App Router and static export (`output: 'export'`) #next-js
- [tech_stack] React 19.2.3 with TypeScript 5.x for type-safe component development #react #typescript
- [tech_stack] Tailwind CSS 4.x via PostCSS (`@tailwindcss/postcss`) for utility-first styling #tailwind
- [tech_stack] IBM Plex Mono (via `@fontsource/ibm-plex-mono`) as the sole typeface, weights 300 and 400 #typography
- [tech_stack] ESLint 9 with `eslint-config-next` for code quality enforcement #linting
- [tech_stack] Node.js 20 as the build runtime (specified in GitHub Actions workflow) #node

## Core Components
- [component] `app/layout.tsx` -- Root layout defining HTML structure, metadata, Content Security Policy, skip-to-content link, flex container, and screen-reader-only footer #layout
- [component] `components/SiteLayout.tsx` -- Client component managing sidebar expand/collapse state; derives `isExpanded` from pathname; handles responsive margin transitions #layout
- [component] `components/MenuSlider.tsx` -- Fixed sidebar rendering profile photo, branding, hierarchical navigation with parent/child expand, keyboard (Escape) support, social links, and copyright #navigation
- [component] `components/SocialLinks.tsx` -- Renders social media links (LinkedIn, GitHub) with inline SVG icons and accessibility labels #social
- [component] `app/page.tsx` -- Home page displaying a centered prompt ("Select a section to explore") when no section is selected #home

## Data Layer
- [data_flow] Navigation menu structure defined as a static array in `app/data/navigation.ts` using `NavigationMenuItem` type #navigation #data
- [data_flow] Social links defined as a static array in `app/data/social-links.ts` using `SocialMediaLink` type #social #data
- [data_flow] All data is file-based JSON/array structures; no database, API, or server-side storage #static

## Type Definitions
- [component] `app/types/index.ts` exports five interfaces: `NavigationMenuItem`, `PortfolioPhoto`, `BlogPost`, `VideoItem`, `SocialMediaLink` #typescript #types

## Custom Hooks
- [component] `app/hooks/useReducedMotion.ts` -- Detects `prefers-reduced-motion: reduce` media query for accessibility-aware animations #accessibility #hooks
- [component] `app/hooks/useMediaQuery.ts` -- Generic media query hook used for responsive breakpoint detection (desktop >= 641px) #responsive #hooks

## Deployment
- [config] Static export to `/out` directory via `next build` with `output: 'export'` in `next.config.ts` #deployment
- [config] GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers on push to `main` or manual dispatch #ci-cd
- [config] Uses pinned GitHub Actions: `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4` #ci-cd
- [config] Images set to `unoptimized: true` since Next.js image optimization requires a server #images

## Security
- [config] Content Security Policy (CSP) set via meta tag in `app/layout.tsx` restricting scripts, styles, images, fonts to `'self'`; frames allowed for YouTube and Vimeo embeds; `frame-ancestors 'none'`; `form-action 'none'` #security
- [config] External links use `rel="noopener noreferrer"` and `target="_blank"` #security

## Accessibility
- [pattern] Skip-to-content link as first focusable element in `app/layout.tsx` #a11y
- [pattern] `aria-label` on all navigation landmarks (`Main navigation`, `Social links`, `Site footer`) #a11y
- [pattern] `aria-current="page"` on active navigation links; `aria-expanded` and `aria-controls` on parent menu items with submenus #a11y
- [pattern] Focus-visible outline using CSS variable `--focus-ring` that switches color between light and dark modes #a11y
- [pattern] Minimum 44px touch targets on all interactive elements via `min-h-[44px]` #a11y
- [pattern] `prefers-reduced-motion` respected: CSS transitions disabled and JavaScript hook disables margin transitions #a11y

## Relations
- related_to [[guides/setup]]
- related_to [[guides/deployment]]
- related_to [[decisions/why-nextjs]]
- related_to [[decisions/hosting-github-pages]]
- related_to [[patterns/layout-system]]
- related_to [[patterns/navigation]]
- related_to [[patterns/theming]]
