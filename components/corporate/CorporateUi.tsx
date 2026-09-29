"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
};

export function SectionEyebrow({ children, className, light }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "font-body text-[0.65rem] font-normal uppercase tracking-[0.22em] sm:text-[0.7rem]",
        light ? "text-white/80" : "text-[#C6A86B]",
        className,
      )}
    >
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  children,
  className,
  light,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-heading text-[2rem] font-normal leading-[1.12] tracking-[-0.01em] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem]",
        light ? "text-white" : "text-black",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function FadeInSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GoldLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-body text-[0.72rem] font-normal uppercase tracking-[0.16em] text-[#2D2D2D] transition-colors hover:text-[#C6A86B]",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

export function GoldButton({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "outline-light";
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "inline-flex items-center justify-center px-7 py-3.5 font-body text-[0.68rem] font-normal uppercase tracking-[0.14em] transition-all duration-300",
        variant === "primary" &&
          "bg-[#C6A86B] text-white hover:bg-[#b89755]",
        variant === "outline" &&
          "border border-[#E6DDCF] bg-transparent text-[#2D2D2D] hover:border-[#C6A86B] hover:text-[#C6A86B]",
        variant === "outline-light" &&
          "border border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10",
        className,
      )}
    >
      {children}
    </a>
  );
}
