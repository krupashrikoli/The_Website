import { Hero } from "@/components/Hero";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-section relative w-full overflow-hidden aspect-[3/2] lg:aspect-auto lg:min-h-screen"
    >
      <Hero />
    </section>
  );
}
