export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardHover = {
  whileHover: { y: -3, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const } },
};

export const sceneEntrance = {
  initial: { opacity: 0.4 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};
