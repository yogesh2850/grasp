/**
 * Edit this file when you have final paper content, links, and media paths.
 * Assets go under `public/` (e.g. public/video/hero.mp4 → asset('/video/hero.mp4')).
 */

export const siteContent = {
  title: 'GRASP: Your Full Project Title Here',
  titleHighlights: [
    { text: 'GR', highlight: true },
    { text: 'A', highlight: true },
    { text: 'SP', highlight: true },
    { text: ': Your Subtitle or Expansion', highlight: false },
  ] as { text: string; highlight: boolean }[],

  authors: [
    { name: 'Author One', url: '#', affiliations: '1' },
    { name: 'Author Two', url: '#', affiliations: '1' },
    { name: 'Author Three', url: '', affiliations: '2' },
  ],

  affiliations: [
    { id: '1', label: 'Institution One (add logo to public/images/)' },
    { id: '2', label: 'Institution Two' },
  ],

  links: {
    arxiv: '#',
    github: 'https://github.com/yogesh2850/grasp',
    pdf: '#',
  },

  abstract: `Replace this placeholder abstract with your paper summary. You can use <b>bold</b> in JSX on the page, or keep plain text here. Math via KaTeX is supported, e.g. speedup of $2\\times$ when wired in page.tsx.`,

  /** Set to a path under public/video/ when you add hero background video */
  heroVideo: '' as string,

  slider: [
    { title: 'Motivation', video: '' },
    { title: 'Results', video: '' },
    { title: 'Demo', video: '' },
  ],

  comparisons: [
    {
      leftSrc: '/images/placeholder/baseline.svg',
      rightSrc: '/images/placeholder/ours.svg',
      leftLabel: 'Baseline',
      rightLabel: 'GRASP',
    },
    {
      leftSrc: '/images/placeholder/baseline.svg',
      rightSrc: '/images/placeholder/ours.svg',
      leftLabel: 'Baseline',
      rightLabel: 'GRASP',
    },
    {
      leftSrc: '/images/placeholder/baseline.svg',
      rightSrc: '/images/placeholder/ours.svg',
      leftLabel: 'Baseline',
      rightLabel: 'GRASP',
    },
    {
      leftSrc: '/images/placeholder/baseline.svg',
      rightSrc: '/images/placeholder/ours.svg',
      leftLabel: 'Baseline',
      rightLabel: 'GRASP',
    },
  ],

  figures: [
    {
      src: '/images/placeholder/method-1.svg',
      caption:
        'Figure 1. Replace with your method overview figure (public/images/).',
      idx: 1,
    },
    {
      src: '/images/placeholder/method-2.svg',
      caption:
        'Figure 2. Replace with your second figure and caption.',
      idx: 2,
    },
  ],

  citation: `@misc{grasp2026placeholder,
      title={GRASP: Your Project Title},
      author={Author One and Author Two},
      year={2026},
      note={Replace with your BibTeX},
}`,
};
