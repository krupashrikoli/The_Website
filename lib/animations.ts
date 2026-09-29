import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeUpStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
  },
};

export const viewportOnce = {
  once: true,
  margin: "0px 0px -40px 0px" as const,
  amount: 0.2 as const,
};
