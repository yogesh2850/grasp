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
    { name: 'Yogesh Chawla',      url: '#', affiliations: '1' },
    { name: 'Nitesh Subedi',      url: '',  affiliations: '3' },
    { name: 'Nils Hoppe',         url: '',  affiliations: '4' },
    { name: 'Mridula Buragohain', url: '',  affiliations: '5' },
    { name: 'Krishna Muvva',      url: '',  affiliations: '2' },
    { name: 'Soumik Sarkar',      url: '',  affiliations: '3' },
    { name: 'Santosh Pitla',      url: '',  affiliations: '1' },
  ],

  affiliations: [
    { id: '1', label: 'Biological Systems Engineering, University of Nebraska–Lincoln', logo: '/images/unl_logo.png' },
    { id: '2', label: 'University of Nevada, Reno',                                    logo: '/images/unr.png' },
    { id: '3', label: 'Iowa State University',                                          logo: '/images/isu.png' },
    { id: '4', label: 'Osnabrück University of Applied Sciences',                      logo: '/images/osnabruck.png' },
    { id: '5', label: 'Robotics and Autonomous Systems, Arizona State University',     logo: '/images/asu.png' },
  ],

  links: {
    arxiv:   '#',
    github:  'https://github.com/yogesh2850/grasp',
    pdf:     '#',
    dataset: '#',
  },

  tldr: `GRASP trains a mobile manipulator entirely in GPU-accelerated simulation to autonomously replicate the agronomist's maize push test — using RL with deformable plant models and a SAM 3 → YOLOv8 perception pipeline — and successfully transfers the policy to a real xArm6 + Bunker Pro robot to recover a continuous per-plant stiffness estimate.`,

  /** Path to graphical abstract image under public/ — leave empty until ready */
  graphicalAbstract: '' as string,

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

  figures: [
    {
      src: '/images/thesis/hardware/hardware.png',
      caption:
        'Figure 1. The GRASP hardware platform: a UFactory xArm6 6-DOF manipulator mounted on an AgileX Bunker Pro tracked mobile base, equipped with a ZED X stereo camera for RGB-D perception.',
      idx: 1,
    },
    {
      src: '/images/thesis/rl/rl_training_pipeline.png',
      caption:
        'Figure 2. End-to-end RL training pipeline. The policy receives only signals available on the physical robot; privileged information (true Young\'s modulus, stalk nodal positions, ground-truth segmentation) is confined to reward shaping during simulation training.',
      idx: 2,
    },
    {
      src: '/images/thesis/perception/transformation.png',
      caption:
        'Figure 3. From 2D mask to 3D push point. The calibrated depth-unprojection pipeline converts the YOLOv8-seg stalk mask into a world-frame push target for inverse kinematics.',
      idx: 3,
    },
    {
      src: '/images/thesis/simulation/scene_layout.png',
      caption:
        'Figure 4. Isaac Lab simulation environment. Deformable maize plant models with per-episode log-uniform stiffness randomisation over [10⁷, 10⁸] Pa are placed in a field scene with the xArm6 mobile manipulator.',
      idx: 4,
    },
  ],

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
