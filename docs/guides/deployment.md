---
title: Deployment Guide
type: note
permalink: guides/deployment
tags:
  - guide
  - deployment
  - github-pages
  - ci-cd
---

# Deployment Guide

## Automatic Deployment
- [pattern] Pushing to the `main` branch automatically triggers the GitHub Actions deployment workflow #ci-cd
- [pattern] Manual deployment can be triggered via the `workflow_dispatch` event in the GitHub Actions UI #ci-cd
- [config] Workflow file: `.github/workflows/deploy.yml` #config

## Workflow Steps

### Build Job
- [command] `actions/checkout@v4` (SHA-pinned) -- Checks out the repository #build
- [command] `actions/setup-node@v4` (SHA-pinned) -- Sets up Node.js 20 with npm cache #build
- [command] `npm ci` -- Clean install of dependencies from lockfile #build
- [command] `npm run build` -- Runs `next build`, producing static HTML/CSS/JS in `/out` directory #build
- [command] `actions/upload-pages-artifact@v3` (SHA-pinned) -- Uploads `/out` as a GitHub Pages artifact #build

### Deploy Job
- [command] `actions/deploy-pages@v4` (SHA-pinned) -- Deploys the uploaded artifact to GitHub Pages #deploy
- [config] Runs after the build job completes (`needs: build`) #deploy
- [config] Environment name: `github-pages`; URL available via `steps.deployment.outputs.page_url` #deploy

## Concurrency
- [config] Concurrency group `"pages"` prevents multiple simultaneous deployments #deploy
- [config] `cancel-in-progress: false` ensures running deployments complete rather than being cancelled by new pushes #deploy

## Permissions
- [config] `contents: read` -- Read repository contents for checkout #security
- [config] `pages: write` -- Write to GitHub Pages deployment #security
- [config] `id-token: write` -- Required for OIDC-based Pages deployment authentication #security

## Manual Build and Deploy
- [command] `npm run build` generates the static site in the `/out` directory #manual
- [command] Push to `main` to trigger automatic deployment; there is no separate manual deploy command #manual

## Build Output
- [config] The `/out` directory contains the complete static site (HTML, CSS, JS, images) #output
- [config] Images are unoptimized (`next.config.ts: images.unoptimized = true`) since static export cannot use the Next.js image optimization server #images
- [config] The `/out` directory is gitignored and regenerated on each build #output

## Troubleshooting
- [pattern] If the build fails, check `npm run lint` for ESLint errors first #debugging
- [pattern] If images are missing, ensure they are in the `public/` directory (not `src/` or `app/`) #debugging
- [pattern] GitHub Pages deployments can be monitored in the repository's Actions tab #monitoring

## Relations
- related_to [[architecture/system-overview]]
- related_to [[decisions/hosting-github-pages]]
- related_to [[guides/setup]]
