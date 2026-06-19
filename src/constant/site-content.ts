/**
 * Edit this file when you have final paper content, links, and media paths.
 * Assets go under `public/` (e.g. public/video/hero.mp4 → asset('/video/hero.mp4')).
 */

export const siteContent = {
  title: 'GRASP: Generalizable Robotic Adaptation for Sim-to-Real Plant Interaction',
  titleHighlights: [
    { text: 'G', highlight: true },
    { text: 'R', highlight: true },
    { text: 'A', highlight: true },
    { text: 'S', highlight: true },
    { text: 'P', highlight: true },
    { text: ': Generalizable Robotic Adaptation for Sim-to-Real Plant Interaction', highlight: false },
  ] as { text: string; highlight: boolean }[],

  authors: [
    { name: 'Yogesh Chawla',      url: 'http://yogesh-chawla.com/',                                              affiliations: '1' },
    { name: 'Nitesh Subedi',      url: 'https://nitesh-subedi.github.io/',                                      affiliations: '2' },
    { name: 'Nils Hoppe',         url: 'https://www.linkedin.com/in/nils-hoppe-ba8a58347/',                      affiliations: '3' },
    { name: 'Mridula Buragohain', url: 'https://mridulaburagohain.github.io/',                                   affiliations: '4' },
    { name: 'Raghavendra Jetti',  url: 'https://www.linkedin.com/in/raghavendra-jetti-125b49349/',              affiliations: '1' },
    { name: 'Krishna Muvva',      url: 'https://krishnamuvva.com/',                                              affiliations: '5' },
    { name: 'Kunjan Theo Joseph', url: 'https://www.linkedin.com/in/k-theo-joseph/',                             affiliations: '2' },
    { name: 'Soumik Sarkar',      url: 'https://www.engineering.iastate.edu/people/profile/soumiks/',            affiliations: '2' },
    { name: 'Santosh Pitla',      url: 'https://bse.unl.edu/person/santosh-pitla/',                              affiliations: '1' },
  ],

  affiliations: [
    { id: '1', label: 'University of Nebraska–Lincoln',          logo: '/images/unl_logo.png' },
    { id: '2', label: 'Iowa State University',                   logo: '/images/isu.png' },
    { id: '3', label: 'Osnabrück University of Applied Sciences', logo: '/images/osnabruck.png' },
    { id: '4', label: 'Arizona State University',                logo: '/images/asu.png' },
    { id: '5', label: 'University of Nevada, Reno',              logo: '/images/unr.png' },
  ],

  links: {
    arxiv:    '#',
    github:   'https://github.com/yogesh2850/grasp',
    pdf:      '#',
    dataset:  'https://huggingface.co/datasets/yogesh2850/grasp',
    assembly: 'https://drive.google.com/drive/folders/12M6pMwm3hCQgPGQWIas_aWESB-KsiBAC?usp=sharing',
  },

  tldr: `GRASP replicates the agronomist's maize push test through a hierarchical perception–interaction–inference pipeline. A YOLO segmentation model, trained on SAM-3-generated labels from real field imagery, identifies the stalk; a classical IK-based controller then guides the manipulator through approach and alignment. A recurrent neural network (RNN), trained on interaction data collected in a GPU-accelerated deformable-body simulation with randomized FEM plant mechanics, infers soft/hard stalk stiffness from proprioception alone without requiring vision at inference. The system transfers to a real xArm6 + Bunker Pro robot setup, producing stiffness estimates that align with observed stalk lignification and maturity trends.`,

  /** Path to graphical abstract image under public/ — leave empty until ready */
  graphicalAbstract: '/images/thesis/rl/sim2real_pipeline.png' as string,

  abstract: `Maize stalks fail from the inside. Stalk rot hollows out the stem long before visible symptoms appear, and by the time damage can be seen externally, the plant is often already lost. Current detection methods do not scale well: destructive sampling damages the plant, while hand-held push meters require a person to walk every row.

GRASP automates the agronomist's push test. The robot locates a maize stalk, performs a controlled diagnostic push, and estimates stalk stiffness from the resulting mechanical response.

The challenge is not simply making contact—it is producing a consistent and informative interaction. A useful measurement requires pushing at the correct height and direction while generating enough deflection to reveal stiffness differences without damaging the plant. To study this process, we built a GPU-accelerated simulation environment in NVIDIA Isaac Lab using deformable maize models with randomized FEM stiffness properties spanning more than an order of magnitude. This environment was used to generate large-scale interaction data and evaluate robot–plant contact strategies under diverse plant conditions.

The complete pipeline transfers to a real xArm6 mounted on an AgileX Bunker Pro platform, producing stiffness estimates that align with observed differences in stalk maturity and lignification.`,

  /** Set to a path under public/video/ when you add hero background video */
  heroVideo: '/video/horizontal_final.mp4' as string,

  /** Animated GIF shown as hero background at reduced opacity */
  heroGif: '' as string,

  slider: [
    { title: 'Motivation', video: '' },
    { title: 'Results', video: '' },
    { title: 'Demo', video: '' },
  ],

  comparisons: [
    {
      leftSrc: '/images/thesis/perception/zed_left_rgb_step0000008.png',
      rightSrc: '/images/thesis/perception/zed_left_semantic_segmentation_step0000008.png',
      leftLabel: 'Raw RGB',
      rightLabel: 'Segmentation',
    },
    {
      leftSrc: '/images/thesis/perception/sam3_1.png',
      rightSrc: '/images/thesis/perception/sam3_2.png',
      leftLabel: 'Case 1',
      rightLabel: 'Case 2',
    },
    {
      leftSrc: '/images/thesis/simulation/plant.png',
      rightSrc: '/images/thesis/simulation/plant_textured_render.png',
      leftLabel: 'Plant Mesh',
      rightLabel: 'Textured Render',
    },
    {
      leftSrc: '/images/thesis/simulation/scene_layout.png',
      rightSrc: '/images/thesis/simulation/scene_layout_2.png',
      leftLabel: 'Scene Layout',
      rightLabel: 'Scene Variant',
    },
  ],

  figures: [] as { src: string; caption: string; idx: number }[],

  citation: `@mastersthesis{chawla2026grasp,
  title   = {GRASP: Generalizable Robotic Adaptation for Sim-to-Real Plant Interaction},
  author  = {Chawla, Yogesh},
  school  = {University of Nebraska--Lincoln},
  year    = {2026},
  month   = {June},
  note    = {M.S. Thesis, Biological Systems Engineering / Computer Science},
  advisor = {Santosh Pitla},
}`,
};
