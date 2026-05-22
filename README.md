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

**Option A — GitHub Actions (recommended)**

1. Push this repo (includes `.github/workflows/deploy-pages.yml`).
2. **Settings → Pages → Build and deployment → Source:** **GitHub Actions**.
3. Each push to `master` runs `npm run build` and deploys the `docs/` output to https://yogesh2850.github.io/grasp

**Option B — Commit built `docs/` manually**

1. Run `npm run build` locally.
2. Commit the `docs/` folder.
3. **Settings → Pages → Source:** Deploy from branch → `master` → **`/docs`**

Remove the old root-only `index.html` setup; the Next.js site lives in `docs/` after build.

## Project structure

- `src/app/page.tsx` — page layout (hero, abstract, slider, comparisons, methods, citation)
- `src/components/` — UI components (image compare, figures, links, …)
- `public/` — static assets (videos, images, icons)
- `docs/` — generated static site (commit after `npm run build`)

Based on the layout of [co-me-tokens.github.io](https://github.com/co-me-tokens/co-me-tokens.github.io).
