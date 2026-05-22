# GRASP — Generalizable Robotic Adaptation for Sim-to-Real Plant Interaction

Early and accurate identification of plant diseases is critical for mitigating crop losses and ensuring sustainable agriculture. Robotics is changing this on a large scale. But one issue with agricultural robotics that makes it different is the variability and unstructured environment in real life. To train a robot to push a maize stalk is a very difficult task due to the variability in plant biomechanical properties. To solve it, this study presents a framework for training plant manipulation (pushing) to find out the stiffness in a physics-based simulator, NVIDIA's Isaac Lab, with a camera's input. A reinforcement learning algorithm was trained in the Isaac Lab environment replicating the real-life testing environment. As input, it takes an image from a camera, a ground truth segmented mask of the stalk, and controls the manipulator's torque to push the plant for multiple cases. Results showed a great performance of the simulation-2-real transfer for most cases. Overall, the use of high-fidelity simulators can be replicated and tested for other manipulation-based agricultural applications. The future work would be to test the sim-2-real performance of multiple tasks together.

---

See the full code at: https://github.com/yogesh2850/Plant_Manipulation/tree/master
