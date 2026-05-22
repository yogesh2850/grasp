# GRASP — project homepage

Research project site (Co-Me-style layout) built with **Next.js**, **Tailwind CSS**, and static export for **GitHub Pages**.

**Live URL (after Pages is configured):** https://yogesh2850.github.io/grasp

## Edit content (no React required)

Update **`src/constant/site-content.ts`** for title, authors, abstract, links, BibTeX, and asset paths.

Update **`src/constant/config.ts`** for site metadata and SEO.

## Add media

| Asset | Location |
|--------|----------|
| Hero background video | `public/video/hero.mp4` → set `heroVideo: '/video/hero.mp4'` in `site-content.ts` |
| Slider clips | `public/video/…` → set each slider `video` path |
| Comparison images | `public/images/compare_1/…` (pairs for before/after sliders) |
| Method figures | `public/images/…` |
| Institution logos | `public/images/` + update affiliations in `site-content.ts` |

Placeholder SVGs are under `public/images/placeholder/` until you replace them.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000/grasp (base path is `/grasp` to match GitHub Pages).

## Build for GitHub Pages

```bash
npm run build
```

Output goes to **`docs/`** (includes `.nojekyll`).

### GitHub Pages settings

The built site is committed in **`docs/`**. In the repo:

**Settings → Pages → Build and deployment**

- **Source:** Deploy from a branch  
- **Branch:** `master`  
- **Folder:** `/docs`

URL: https://yogesh2850.github.io/grasp

After you change content, run `npm run build` and commit `docs/` again (or enable **GitHub Actions** as the Pages source to rebuild on each push).

## Project structure

- `src/app/page.tsx` — page layout (hero, abstract, slider, comparisons, methods, citation)
- `src/components/` — UI components (image compare, figures, links, …)
- `public/` — static assets (videos, images, icons)
- `docs/` — generated static site (commit after `npm run build`)

Based on the layout of [co-me-tokens.github.io](https://github.com/co-me-tokens/co-me-tokens.github.io).
