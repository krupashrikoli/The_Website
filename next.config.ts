import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/experiences",
        destination: "/city-attractions",
        permanent: true,
      },
      {
        source: "/experiences/:slug",
        destination: "/city-attractions/:slug",
        permanent: true,
      },
      // SEO room slug renames
      {
        source: "/rooms/nivaara-room",
        destination: "/rooms/luxury-studio",
        permanent: true,
      },
      {
        source: "/rooms/mountain-view",
        destination: "/rooms/luxury-valley-room",
        permanent: true,
      },
      {
        source: "/rooms/sea-view",
        destination: "/rooms/luxury-palms-room",
        permanent: true,
      },
      // Coming-soon brand placeholders → brands page
      {
        source: "/samraya",
        destination: "/brands",
        permanent: false,
      },
      {
        source: "/celestra",
        destination: "/brands",
        permanent: false,
      },
    ];
  },
  images: {
    // Prefer modern formats from the optimizer (AVIF then WebP).
    formats: ["image/avif", "image/webp"],
    // Cache optimized images aggressively at the CDN/edge.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Match common breakpoints used across the site.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Keep visually high quality when Next re-encodes.
    qualities: [75, 85, 92, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
