---
title: "Pattern: Layout System"
type: note
permalink: patterns/layout-system
tags:
  - pattern
  - layout
  - sidebar
  - responsive
---

# Pattern: Layout System

## Overview
- [pattern] Two-column layout: fixed sidebar (left) + scrolling content area (right) #layout
- [pattern] Sidebar collapses/expands based on navigation state and current route #interaction

## Component Hierarchy
- [component] `app/layout.tsx` (Server Component) -- Defines HTML shell, `<head>`, CSP meta tag, skip-to-content link, flex container wrapping `SiteLayout` #root
- [component] `components/SiteLayout.tsx` (Client Component) -- Manages `isExpanded` state; wraps `MenuSlider` + `<main>` with responsive margin #state
- [component] `components/MenuSlider.tsx` (Client Component) -- Renders the sidebar `<aside>` with profile, navigation, social links, footer #sidebar

## State Management
- [pattern] `isExpanded` state initialized from pathname: `true` if not on homepage `/`, `false` on homepage #state
- [pattern] State syncs on pathname change using React's "adjust state during render" pattern (comparing `prevPathname` to current) rather than `useEffect` #react
- [pattern] Same sync pattern also re-evaluates on `isDesktop` breakpoint changes #responsive

## Sidebar Behavior
- [pattern] Homepage (`/`): sidebar is full-width (centered layout), profile photo large (96px), name displayed as `<h1>` #home
- [pattern] Subpages: sidebar fixed at 256px (`w-64`) on desktop, 112px (`w-28`) on mobile; profile photo small (48px), name is a link back to `/` #subpage
- [pattern] Content area applies `ml-64` (desktop) or `ml-28` (mobile) margin when sidebar is expanded, `ml-0` when collapsed #responsive

## Animation
- [pattern] Sidebar width and content margin animate with `transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)` #animation
- [pattern] CSS class `.slide-menu` handles sidebar slide; `.content-fade` handles content opacity transitions #css
- [pattern] All transitions disabled when `prefers-reduced-motion: reduce` is active (both CSS and JS) #a11y

## Responsive Breakpoint
- [pattern] Desktop breakpoint: `min-width: 641px` detected via `useMediaQuery` hook #responsive
- [pattern] Below 641px: sidebar narrows to 112px, padding reduced (`px-3` vs `px-8`), text sizes decrease #mobile
- [pattern] Mobile-specific CSS override in `globals.css`: `p-12` becomes `p-6`, heading sizes reduce #mobile

## Key Implementation Details
- [pattern] Sidebar uses `position: fixed`, `top: 0`, `left: 0`, `h-screen`, `z-50` to stay pinned during scroll #css
- [pattern] `will-change: width` on sidebar and `will-change: transform/opacity` on animations for GPU acceleration hints #performance
- [pattern] `overflow-y-auto` on both sidebar nav and content area enables independent scrolling #scroll

## Relations
- related_to [[architecture/system-overview]]
- related_to [[patterns/navigation]]
- related_to [[decisions/design-philosophy]]
