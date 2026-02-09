# Quickstart Guide: Interactive Portfolio Website

**Feature Branch**: `001-website-frontend`
**Target Audience**: Developers onboarding to this project
**Estimated Setup Time**: 15 minutes

## Overview

This guide will help you set up the development environment, understand the project structure, and start contributing to the interactive portfolio website frontend.

---

## Prerequisites

- **Node.js**: v20+ (LTS recommended)
- **npm**: v10+ (comes with Node.js)
- **Git**: v2.30+
- **Code Editor**: VS Code recommended (with TypeScript and Tailwind CSS extensions)
- **Browser**: Chrome 90+, Firefox 88+, or Safari 14+ for testing

---

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/dustinniles/dustinniles.github.io.git
cd dustinniles.github.io
```

### 2. Checkout Feature Branch

```bash
git checkout 001-website-frontend
```

### 3. Install Dependencies

```bash
npm install
```

**Expected output:**
```
added 234 packages in 12s
```

### 4. Start Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
- Ready in 1.2s
```

### 5. Open in Browser

Navigate to http://localhost:3000

**You should see:**
- Centered landing page menu (if on home page)
- Profile photo and "Dustin Niles" name
- Navigation items: Work, Play, Contact, About

---

## Project Structure

```
/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with sidebar
│   ├── page.tsx             # Home page (landing/portfolio grid)
│   ├── globals.css          # Global styles + Tailwind imports
│   ├── about/page.tsx       # About section
│   ├── contact/page.tsx     # Contact form
│   ├── resume/page.tsx      # Resume
│   ├── photography/page.tsx # Photography gallery
│   ├── video/page.tsx       # Video portfolio
│   ├── cycling/page.tsx     # Cycling blog
│   ├── tech/page.tsx        # Tech blog
│   └── volunteering/page.tsx # Volunteering blog
│
├── components/              # Reusable React components
│   ├── Sidebar.tsx          # Fixed navigation sidebar
│   ├── MenuSlider.tsx       # Sliding menu system
│   ├── PhotoGallery.tsx     # Scroll-snap photo viewer
│   ├── BlogLayout.tsx       # Blog post layout
│   └── SocialLinks.tsx      # Social media icons
│
├── app/data/                # Content data files
│   ├── navigation.ts        # Menu structure
│   ├── photos.ts            # Photography gallery items
│   ├── blog-posts.ts        # Blog posts
│   ├── videos.ts            # Video portfolio items
│   └── social-links.ts      # Social media links
│
├── public/                  # Static assets
│   ├── images/
│   │   ├── portfolio/       # Photography images
│   │   ├── profile/         # Profile photo
│   │   └── blog/            # Blog featured images
│   └── fonts/               # IBM Plex fonts (self-hosted)
│
├── specs/                   # Feature specifications
│   └── 001-website-frontend/
│       ├── spec.md          # Requirements
│       ├── plan.md          # Implementation plan
│       ├── research.md      # Technical decisions
│       ├── data-model.md    # Data structures
│       ├── contracts/       # API contracts
│       └── quickstart.md    # This file
│
├── .github/workflows/       # CI/CD
│   └── deploy.yml           # GitHub Pages deployment
│
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

---

## Development Workflow

### Running Development Server

```bash
npm run dev
```

- Hot reload enabled
- TypeScript errors shown in terminal
- Available at http://localhost:3000

### Building for Production

```bash
npm run build
```

- Generates static site in `/out` directory
- Validates TypeScript compilation
- Checks for build errors

### Running Linter

```bash
npm run lint
```

- Runs ESLint on all source files
- Fix automatically: `npm run lint --fix`

### Code Quality Checks (Pre-Commit)

```bash
npm run lint && npm audit && npm run build
```

Run this before committing to ensure:
1. No linting errors
2. No security vulnerabilities
3. Build succeeds

---

## Common Tasks

### Task 1: Add a New Photo to Gallery

**Steps:**

1. Place image in `/public/images/portfolio/`
   ```bash
   cp ~/my-photo.jpg public/images/portfolio/mountain-sunset.jpg
   ```

2. Edit `app/data/photos.ts`:
   ```typescript
   export const photographyGallery: PortfolioPhoto[] = [
     // ... existing photos
     {
       id: 'photo-003',
       src: '/images/portfolio/mountain-sunset.jpg',
       srcSet: {
         avif: '/images/portfolio/mountain-sunset.avif',
         webp: '/images/portfolio/mountain-sunset.webp'
       },
       alt: 'Golden hour sunset over rocky mountain peaks',
       order: 3,
       width: 1920,
       height: 1080,
       aspectRatio: 'landscape',
       caption: 'Rocky Mountain National Park',
       location: 'Colorado, USA',
       dateTaken: '2026-01-15T17:30:00Z'
     }
   ];
   ```

3. (Optional) Generate optimized formats:
   ```bash
   # Using imagemagick or online tools
   convert mountain-sunset.jpg -quality 90 mountain-sunset.webp
   ```

4. Test locally:
   ```bash
   npm run dev
   # Navigate to /photography
   ```

---

### Task 2: Add a New Blog Post

**Steps:**

1. Edit `app/data/blog-posts.ts`:
   ```typescript
   export const blogPosts: BlogPost[] = [
     // ... existing posts
     {
       id: 'tech-002',
       title: 'Building Static Sites with Next.js',
       slug: 'building-static-sites-nextjs',
       content: `
# Building Static Sites with Next.js

Next.js is a powerful framework for building static sites...

## Key Benefits

- Fast page loads
- SEO friendly
- Easy deployment

## Getting Started

\`\`\`bash
npx create-next-app@latest
\`\`\`
       `,
       excerpt: 'Learn how to build fast, SEO-friendly static sites with Next.js',
       category: 'tech',
       publishDate: '2026-02-09T10:00:00Z',
       featuredImage: {
         src: '/images/blog/nextjs-static.jpg',
         alt: 'Next.js logo'
       },
       readingTime: 5,
       tags: ['next.js', 'static-sites', 'web-development'],
       status: 'published'
     }
   ];
   ```

2. (Optional) Add featured image to `/public/images/blog/`

3. Test locally:
   ```bash
   npm run dev
   # Navigate to /tech
   ```

---

### Task 3: Update Navigation Menu

**Steps:**

1. Edit `app/data/navigation.ts`:
   ```typescript
   export const mainMenu: NavigationMenuItem[] = [
     {
       id: 'work',
       label: 'Work',
       target: '/work',
       level: 0,
       parentId: null,
       order: 1,
       children: [
         // ... existing children
         {
           id: 'work-speaking',
           label: 'Speaking',
           target: '/speaking',
           level: 1,
           parentId: 'work',
           children: [],
           order: 4  // New item
         }
       ]
     },
     // ... other menu items
   ];
   ```

2. Create new page `app/speaking/page.tsx`:
   ```typescript
   export default function SpeakingPage() {
     return (
       <div className="container mx-auto py-12">
         <h1 className="text-2xl font-light mb-8">Speaking Engagements</h1>
         {/* Content */}
       </div>
     );
   }
   ```

3. Test navigation:
   ```bash
   npm run dev
   # Click Work → Speaking
   ```

---

### Task 4: Configure Formspree Contact Form

**Steps:**

1. Create Formspree account at https://formspree.io

2. Create new form in dashboard

3. Copy Form ID (format: `xxxxxxxxxxxxxxxx`)

4. Update `app/contact/page.tsx`:
   ```typescript
   const FORMSPREE_FORM_ID = 'mqkvrznb';  // Replace with your ID

   const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
     method: 'POST',
     body: formData,
     headers: { 'Accept': 'application/json' }
   });
   ```

5. Test form submission:
   ```bash
   npm run dev
   # Navigate to /contact
   # Fill out and submit form
   # Check email for confirmation
   ```

---

### Task 5: Deploy to GitHub Pages

**Automatic Deployment (Recommended):**

```bash
git add .
git commit -m "Add new feature"
git push origin 001-website-frontend
```

When merged to `main` branch, GitHub Actions automatically:
1. Runs `npm run build`
2. Deploys `/out` directory to GitHub Pages
3. Site live at https://dustinniles.github.io

**Manual Deployment (if needed):**

```bash
npm run build
# Verify /out directory exists
# Push to main branch
```

---

## Technology Stack

### Core Technologies
- **Next.js 16.1.6**: React framework with App Router
- **React 19.2.3**: UI library
- **TypeScript 5.x**: Type-safe JavaScript
- **Tailwind CSS 4.x**: Utility-first CSS framework

### Fonts
- **IBM Plex Sans**: Self-hosted via @fontsource/ibm-plex-sans
- Weights: 300 (Light), 400 (Regular)

### External Services
- **Formspree**: Contact form backend (free tier)
- **GitHub Pages**: Static site hosting
- **YouTube/Vimeo**: Video embeds (privacy-enhanced)

---

## Environment Variables

**No environment variables required for development.**

For production Formspree integration, the Form ID is hard-coded in `app/contact/page.tsx` (safe to expose publicly).

---

## Troubleshooting

### Issue: `npm run dev` fails with port already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Issue: TypeScript errors in editor but build succeeds

**Solution:**
```bash
# Restart TypeScript server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: Images not loading in development

**Solution:**
- Verify image path starts with `/` (e.g., `/images/portfolio/photo.jpg`)
- Check file exists in `/public` directory
- Clear Next.js cache: `rm -rf .next && npm run dev`

### Issue: Tailwind styles not applying

**Solution:**
```bash
# Verify Tailwind config includes correct paths
# Check tailwind.config.ts content array

# Restart dev server
npm run dev
```

### Issue: Build fails with "output: 'export' incompatible with..."

**Solution:**
- Remove Server Components requiring runtime
- Avoid `getServerSideProps` or `getStaticProps`
- Use Client Components (`'use client'`) for interactive features

---

## Code Style Guidelines

### TypeScript
- Use interfaces for component props
- Avoid `any` type
- Enable strict mode (`tsconfig.json`)

### React
- Functional components only (no class components)
- Use hooks (`useState`, `useEffect`, etc.)
- Mark client components with `'use client'` directive

### Tailwind CSS
- Use utility classes over custom CSS
- Follow mobile-first responsive design
- Use `@apply` sparingly (only for repeated patterns)

### File Naming
- Components: PascalCase (e.g., `MenuSlider.tsx`)
- Pages: kebab-case (e.g., `app/contact/page.tsx`)
- Data files: kebab-case (e.g., `blog-posts.ts`)

---

## Testing Checklist

Before submitting changes:

- [ ] Run `npm run lint` (no errors)
- [ ] Run `npm audit` (no critical vulnerabilities)
- [ ] Run `npm run build` (succeeds)
- [ ] Test locally in Chrome, Firefox, Safari
- [ ] Test on mobile device (iOS or Android)
- [ ] Verify accessibility (keyboard navigation works)
- [ ] Check responsive design (resize browser)
- [ ] Verify animations respect prefers-reduced-motion

---

## Getting Help

### Documentation
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Formspree: https://formspree.io/docs

### Project-Specific
- Feature spec: `specs/001-website-frontend/spec.md`
- Implementation plan: `specs/001-website-frontend/plan.md`
- Research decisions: `specs/001-website-frontend/research.md`

### Contact
- GitHub Issues: https://github.com/dustinniles/dustinniles.github.io/issues
- Maintainer: Dustin Niles

---

## Next Steps

1. **Explore codebase**: Read through `app/` and `components/` directories
2. **Make a small change**: Add a photo or blog post
3. **Test locally**: Verify changes work as expected
4. **Review spec**: Read `specs/001-website-frontend/spec.md` for full requirements
5. **Start contributing**: Pick a task from `specs/001-website-frontend/tasks.md` (when available)

Welcome to the project! 🚀

