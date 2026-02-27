---
title: Setup Guide
type: note
permalink: guides/setup
tags:
  - guide
  - setup
  - development
---

# Setup Guide

## Prerequisites
- [dependency] Node.js 20 or later (matches GitHub Actions build environment) #node
- [dependency] npm (bundled with Node.js; `npm ci` used in CI for reproducible installs) #npm
- [dependency] Git for version control #git

## Clone and Install
- [command] `git clone https://github.com/dustinniles/dustinniles.github.io.git` #setup
- [command] `cd dustinniles.github.io` #setup
- [command] `npm install` to install all dependencies from `package-lock.json` #setup

## Development Server
- [command] `npm run dev` starts the Next.js development server at `http://localhost:3000` with hot module replacement #dev
- [pattern] The dev server runs in SSR mode; the static export behavior only applies during `npm run build` #dev

## Available Scripts
- [command] `npm run dev` -- Start development server with hot reload #dev
- [command] `npm run build` -- Build static site to `/out` directory (runs `next build` with `output: 'export'`) #build
- [command] `npm run start` -- Start production server (not used for GitHub Pages; exists for local testing of SSR mode) #production
- [command] `npm run lint` -- Run ESLint with Next.js core-web-vitals and TypeScript rules #lint

## Project Structure
- [component] `app/` -- Next.js App Router pages and layouts (route files follow `app/[route]/page.tsx` convention) #structure
- [component] `app/data/` -- Static data files (navigation menu, social links) #structure
- [component] `app/hooks/` -- Custom React hooks (`useReducedMotion`, `useMediaQuery`) #structure
- [component] `app/types/` -- TypeScript interface definitions #structure
- [component] `components/` -- Shared React components (`SiteLayout`, `MenuSlider`, `SocialLinks`) #structure
- [component] `public/` -- Static assets (images, served at root path) #structure
- [component] `specs/` -- Feature specifications and implementation plans (not deployed) #structure
- [component] `docs/` -- Project documentation (Basic Memory notes) #structure
- [config] `next.config.ts` -- Next.js configuration (static export, unoptimized images) #config
- [config] `tsconfig.json` -- TypeScript configuration (ES2017 target, bundler module resolution, `@/*` path alias) #config
- [config] `postcss.config.mjs` -- PostCSS configuration loading `@tailwindcss/postcss` plugin #config
- [config] `eslint.config.mjs` -- ESLint flat config with Next.js core-web-vitals and TypeScript presets #config

## Adding a New Page
- [pattern] Create `app/[route-name]/page.tsx` exporting a default React component #routing
- [pattern] The page is automatically available at `/{route-name}` with no router configuration needed #routing
- [pattern] Add a navigation entry in `app/data/navigation.ts` to make it accessible from the sidebar #navigation

## Path Alias
- [config] `@/*` maps to the project root, so `import Foo from '@/components/Foo'` resolves to `components/Foo` #typescript

## Relations
- related_to [[architecture/system-overview]]
- related_to [[guides/deployment]]
