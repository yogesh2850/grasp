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
    arxiv:    '#',
    github:   'https://github.com/yogesh2850/grasp',
    pdf:      '#',
    dataset:  '#',
    assembly: 'https://drive.google.com/drive/folders/12M6pMwm3hCQgPGQWIas_aWESB-KsiBAC?usp=sharing',
  },

  tldr: `GRASP trains a mobile manipulator entirely in GPU-accelerated simulation to autonomously replicate the agronomist's maize push test using RL with randomized deformable plant models, privileged reward shaping on FEM ground truth, and a SAM-segmented perception pipeline then distills the policy into a lightweight teacher–student model that recovers a continuous per-plant stiffness estimate from proprioception alone, transferring zero-shot to a real xArm6 + Bunker Pro robot.`,

  /** Path to graphical abstract image under public/ — leave empty until ready */
  graphicalAbstract: '/images/thesis/rl/architecture.png' as string,

  abstract: `Maize stalks fail from the inside. Stalk rot hollows out the stem long before anything shows on the surface and by the time it's visible, the plant is already lost. Current detection methods don't scale: destructive sampling kills the plant, and hand-held push meters require a person walking every row.

We taught a robot to do what an agronomist does by hand: push the stalk, feel how far it bends, and read stiffness straight off the resistance.

The hard part isn't pushing. It's pushing well. A useful measurement requires consistent contact at the right height, with enough force to read deflection but not enough to snap the stalk across plants whose stiffness varies by more than an order of magnitude. GRASP learns all of this in simulation. We train a reinforcement-learning policy in NVIDIA Isaac Lab on deformable maize models with randomized stiffness, giving it only what a real robot actually has: a camera image, a segmented stalk mask, and proprioception. The policy decides how to push; an inverse-kinematics controller drives a UFactory xArm6 to execute it.

The key is privileged reward shaping. During training, every push is graded using ground truth the deployed robot will never have true stalk deflection from the simulator's finite-element nodes, true stiffness, clean contact force. The policy sees none of it. This lets us reward a clean, measurable force–deflection response without handing the policy the answer. A final teacher–student distillation step trains a lightweight inference model to recover a continuous per-plant stiffness estimate from proprioception alone no privileged signals, ready to run on hardware.`,

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
