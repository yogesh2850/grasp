# GRASP — Generalizable Robotic Adaptation for Sim-to-Real Plant Interaction

**M.S. Thesis** · Yogesh Chawla · University of Nebraska–Lincoln · 2026  
Advisor: Dr. Santosh Pitla · Biological Systems Engineering / Computer Science

**Live site:** https://yogesh2850.github.io/grasp

---

## What is GRASP?

GRASP is the first system to use reinforcement learning to train a mobile manipulator to autonomously perform the agronomist's **push test** for maize stalk disease assessment. Instead of passively imaging plants, GRASP physically interacts with them — recovering a continuous stiffness estimate that serves as a quantitative biomarker for stalk rot and lodging risk.

### The problem

Maize stalk rot (Fusarium, Colletotrichum, Macrophomina) degrades internal stem tissue while the outer canopy remains visually intact. Spectral and imaging-based methods therefore arrive too late. The current field standard — a manual push test performed by an agronomist — is binary, subjective, and cannot scale to the 30,000+ plants per acre in a commercial field.

### The approach

| Component | Details |
|-----------|---------|
| **Robot platform** | UFactory xArm6 (6-DOF, 5 kg payload) on AgileX Bunker Pro tracked base |
| **Perception** | ZED X stereo camera + gripper-mounted depth camera |
| **Segmentation** | SAM 3 zero-shot annotation → YOLOv8-seg distillation (30 Hz real-time) |
| **Simulation** | NVIDIA Isaac Lab with FEM deformable plant models |
| **RL algorithm** | PPO with four-stage reward tied to Euler–Bernoulli beam theory |
| **Stiffness range** | Log-uniform randomisation over [10⁷, 10⁸] Pa per episode |
| **Sim-to-real** | Domain randomisation over stiffness, appearance, contact geometry |

### Key contributions

1. Deformable plant-interaction simulation environment in Isaac Lab with GPU-parallel training
2. RL formulation (navigation → visual alignment → push quality → stiffness estimation)
3. Zero-shot-to-real-time perception: SAM 3 annotates ~1,500 field images, distilled to YOLOv8-seg
4. Calibrated ZED X + xArm6 extrinsic pipeline for 3-D push-point extraction
5. Agronomically grounded robotic phenotyping instrument — first fully autonomous push-test system

---

## Repository structure

```
grasp/
├── src/
│   ├── app/
│   │   ├── page.tsx            # Main page layout
│   │   └── layout.tsx          # HTML shell + metadata
│   ├── components/             # UI components (Compare, Figure, links, …)
│   └── constant/
│       ├── site-content.ts     # ← Edit title, abstract, figures, citation here
│       └── config.ts           # Site metadata / SEO
├── public/
│   ├── images/
│   │   ├── thesis/             # Figures extracted from thesis
│   │   │   ├── hardware/       # xArm6, ZED X, Bunker Pro, full platform
│   │   │   ├── perception/     # SAM 3 masks, segmentation examples
│   │   │   ├── simulation/     # Plant mesh, scene layout
│   │   │   └── rl/             # RL training pipeline diagram
│   │   └── unl_logo.png        # UNL logo (hero affiliation)
│   └── video/                  # Drop MP4s here for slider/hero
└── docs/                       # Static export committed for GitHub Pages
```

---

## Local development

```bash
# Use the bundled Node if system node is unavailable
export PATH="$PWD/.node-cache/node/bin:$PATH"

npm install
npm run dev
# → http://localhost:3000/grasp
```

## Build & deploy

```bash
npm run build          # outputs to docs/
git add docs/ && git commit -m "Rebuild site" && git push
```

GitHub Pages is configured to serve from **`master` → `/docs`**.  
Settings → Pages → Source: Deploy from a branch → `master` / `/docs`.

---

## Adding content

### Videos
Drop MP4 files under `public/video/` and update `src/constant/site-content.ts`:

```ts
heroVideo: '/video/hero.mp4',          // hero background loop
slider: [
  { title: 'Motivation', video: '/video/motivation.mp4' },
  { title: 'Results',    video: '/video/results.mp4' },
  { title: 'Demo',       video: '/video/demo.mp4' },
],
```

### Figures
Drop images under `public/images/` and add entries to the `figures` array in `site-content.ts`.

### arXiv / PDF links
Update `links.arxiv` and `links.pdf` in `site-content.ts` once the paper is posted.

---

## Citation

```bibtex
@mastersthesis{chawla2026grasp,
  title   = {GRASP: Generalizable Robotic Adaptation for Sim-to-Real Plant Interaction},
  author  = {Chawla, Yogesh},
  school  = {University of Nebraska--Lincoln},
  year    = {2026},
  month   = {June},
  note    = {M.S. Thesis, Biological Systems Engineering / Computer Science},
  advisor = {Santosh Pitla},
}
```
