# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and portfolio for Dustin Niles, hosted on GitHub Pages at https://dustinniles.github.io. Built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS. The site features a fixed sidebar layout with scrolling content area, emphasizing a sparse and minimal design aesthetic focused on large photography and portfolio work.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/dustinniles/dustinniles.github.io.git
cd dustinniles.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

## Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:3000

# Build & Deploy
npm run build        # Build static site to /out directory
npm run start        # Start production server (not used for GitHub Pages)

# Code Quality
npm run lint         # Run ESLint
```

## Architecture

### Layout System

The site uses a two-column layout defined in `app/layout.tsx`:
- **Fixed sidebar** (left, 256px width): Contains navigation and branding, stays fixed while content scrolls
- **Scrolling content area** (right): Takes remaining width, contains page content

The sidebar layout consists of two components rendered via `app/layout.tsx`:

- **`components/SiteLayout.tsx`** — manages layout state (sidebar expanded/collapsed), initializes `isExpanded` from the current pathname
- **`components/MenuSlider.tsx`** — renders the fixed sidebar: branding, navigation links, and context-aware sub-navigation

### Tech Stack

- **Next.js 14+** with App Router and static export (`output: 'export'`)
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling (configured via postcss)
- **System fonts** for fast loading and minimal aesthetic

### Directory Structure

```
app/
  layout.tsx        # Root layout with sidebar
  page.tsx          # Home page (portfolio grid)
  globals.css       # Global styles and Tailwind imports
components/
  SiteLayout.tsx    # Root layout wrapper — sidebar expand/collapse state
  MenuSlider.tsx    # Fixed sidebar — branding, nav links, context-aware sub-navigation
.github/workflows/
  deploy.yml        # GitHub Actions deployment workflow
```

## Deployment

The site is configured for static export to GitHub Pages:
- **Build output**: Static HTML/CSS/JS generated in `/out` directory
- **Deployment**: Automatic via GitHub Actions on push to `main` branch
- **Workflow**: `.github/workflows/deploy.yml` builds and deploys using GitHub Pages actions
- **Images**: Unoptimized to support static export

To deploy manually:
1. Run `npm run build` to generate static files
2. Push to `main` branch to trigger automatic deployment

## Adding Content

### New Pages

Create new route files in the `app/` directory following Next.js App Router conventions:
- `app/about/page.tsx` creates `/about` route
- `app/contact/page.tsx` creates `/contact` route

Update `components/Sidebar.tsx` to add navigation links.

### Portfolio Items

Portfolio items are currently defined as an array in `app/page.tsx`. To add real images:
1. Place images in `public/` directory
2. Update the `portfolioItems` array with image paths
3. Replace placeholder divs with Next.js `Image` components

## Design Principles

- **Minimal and sparse**: Emphasize whitespace and large imagery
- **Fixed sidebar**: Navigation remains accessible while scrolling content
- **Typography**: Light font weights, subtle colors (gray-600, gray-900)
- **Grid layout**: Single-column layout for portfolio items

## Active Technologies
- TypeScript 5.x with React 19+ (current: 19.2.3) + Next.js 16.1.6 (App Router), Tailwind CSS 4.x via PostCSS, IBM Plex font family (001-website-frontend)
- Static JSON/array data structures for navigation menus and portfolio items (file-based, no database) (001-website-frontend)
- TypeScript 5.x with React 19.2.3 and Next.js 16.1.6 (App Router) + Next.js 16.1.6 (App Router, static export), React 19.2.3, Tailwind CSS 4.x (via PostCSS), IBM Plex Sans via @fontsource (001-website-frontend)
- N/A (static export to GitHub Pages, no database or server-side storage) (001-website-frontend)

## Recent Changes
- 001-website-frontend: Added TypeScript 5.x with React 19+ (current: 19.2.3) + Next.js 16.1.6 (App Router), Tailwind CSS 4.x via PostCSS, IBM Plex font family
