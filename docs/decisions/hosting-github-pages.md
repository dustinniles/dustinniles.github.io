---
title: "Decision: Hosting on GitHub Pages"
type: note
permalink: decisions/hosting-github-pages
tags:
  - decision
  - deployment
  - github-pages
---

# Decision: Hosting on GitHub Pages

## Context
- [decision] The repository is named `dustinniles.github.io`, which is the GitHub Pages convention for a user site #naming
- [decision] Site is fully static (HTML/CSS/JS), requiring no server-side runtime #static
- [decision] Goal is zero-cost hosting with automatic deployment on push #deployment

## Decision
- [decision] Host on GitHub Pages with automatic deployment via GitHub Actions #github-pages
- [decision] Deploy from `main` branch using the `actions/deploy-pages` workflow #ci-cd

## Rationale
- [decision] GitHub Pages is free for public repositories and integrates natively with the GitHub repository #cost
- [decision] Repository naming convention (`username.github.io`) provides a clean URL without custom domain configuration #url
- [decision] GitHub Actions automates the build-and-deploy pipeline with no external CI/CD service needed #automation
- [decision] Pinned action SHAs in `deploy.yml` ensure reproducible, secure builds #security

## Workflow Details
- [config] Trigger: push to `main` branch or manual `workflow_dispatch` #trigger
- [config] Build job: checkout, setup Node 20, `npm ci`, `npm run build`, upload `/out` as Pages artifact #build
- [config] Deploy job: `actions/deploy-pages@v4` deploys the artifact to the Pages environment #deploy
- [config] Concurrency group `"pages"` with `cancel-in-progress: false` prevents conflicting deployments #concurrency
- [config] Permissions scoped to `contents: read`, `pages: write`, `id-token: write` (least privilege) #security

## Consequences
- [decision] No server-side rendering -- all pages must be statically exportable #constraint
- [decision] No custom server middleware or API routes #constraint
- [decision] CSP must be set via `<meta>` tag rather than HTTP headers (GitHub Pages does not support custom headers) #security
- [decision] Deployment latency is seconds (GitHub Actions build + Pages propagation) #performance

## Relations
- related_to [[architecture/system-overview]]
- related_to [[decisions/why-nextjs]]
- related_to [[guides/deployment]]
