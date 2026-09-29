"use client";

import { motion } from "framer-motion";

type SoftRevealProps = {
  children: React.ReactNode;
  index?: number;
  className?: string;
};

/** Soft fade-up on enter; stays once revealed (no re-animate on scroll). */
export function SoftReveal({
  children,
  index = 0,
  className,
}: SoftRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 1.15,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
