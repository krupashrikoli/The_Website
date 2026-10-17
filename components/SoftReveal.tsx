"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SoftRevealProps = {
  children: React.ReactNode;
  index?: number;
  className?: string;
};

/**
 * Soft fade-up on enter. Keeps content clickable from the first frame
 * (never starts at opacity 0 — that caused sticky first-tap issues on mobile).
 */
export function SoftReveal({
  children,
  index = 0,
  className,
}: SoftRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -20px 0px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.03, 0.12),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className, "touch-manipulation")}
    >
      {children}
    </motion.div>
  );
}
