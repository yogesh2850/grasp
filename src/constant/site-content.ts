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
    { name: 'Nitesh Subedi',      url: 'https://scholar.google.com/citations?user=pSmoZbgAAAAJ&hl=en',           affiliations: '2' },
    { name: 'Nils Hoppe',         url: '',                                                                        affiliations: '3' },
    { name: 'Mridula Buragohain', url: 'https://mridulaburagohain.github.io/',                                   affiliations: '4' },
    { name: 'Krishna Muvva',      url: 'https://krishnamuvva.com/',                                              affiliations: '5' },
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
    arxiv:   '#',
    github:  'https://github.com/yogesh2850/grasp',
    pdf:     '#',
    dataset: '#',
  },

  tldr: `GRASP trains a mobile manipulator entirely in GPU-accelerated simulation to autonomously replicate the agronomist's maize push test — using RL with deformable plant models and a SAM 3 → YOLOv8 perception pipeline — and successfully transfers the policy to a real xArm6 + Bunker Pro robot to recover a continuous per-plant stiffness estimate.`,

  /** Path to graphical abstract image under public/ — leave empty until ready */
  graphicalAbstract: '/images/thesis/rl/rl_training_pipeline.png' as string,

  abstract: `Early and accurate identification of plant diseases is critical for mitigating crop losses and ensuring sustainable agriculture. Robotics is changing this on a large scale — but one issue that makes agricultural robotics uniquely challenging is the variability and unstructured nature of real-world environments. Training a robot to push a maize stalk is a difficult task due to the high variability in plant biomechanical properties. To solve this, GRASP presents a framework for training plant manipulation (pushing) to estimate stiffness in a physics-based simulator — NVIDIA's Isaac Lab — using a camera's input. A reinforcement learning algorithm is trained in a simulated environment replicating the real-world field setting. As input, it takes an RGB-D image from a camera, a ground-truth segmented mask of the stalk, and controls the manipulator's torque to push the plant across multiple stiffness cases. Results demonstrate strong sim-to-real transfer performance across most conditions. The use of high-fidelity simulators can be replicated and extended to other manipulation-based agricultural applications.`,

  /** Set to a path under public/video/ when you add hero background video */
  heroVideo: '' as string,

  /** Animated GIF shown as hero background at reduced opacity */
  heroGif: '/video/hero.gif' as string,

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
      leftLabel: 'SAM 3 Input',
      rightLabel: 'SAM 3 Mask',
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
