import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // Legacy experience URLs → Nivaãra city attractions
      {
        source: "/experiences",
        destination: "/nivaara/city-attractions",
        permanent: true,
      },
      {
        source: "/experiences/:slug",
        destination: "/nivaara/city-attractions/:slug",
        permanent: true,
      },
      // Old root Nivaãra routes → nested under /nivaara
      // SEO room slug renames (must stay above generic /rooms/:slug)
      {
        source: "/rooms/nivaara-room",
        destination: "/nivaara/rooms/luxury-studio",
        permanent: true,
      },
      {
        source: "/rooms/mountain-view",
        destination: "/nivaara/rooms/luxury-valley-room",
        permanent: true,
      },
      {
        source: "/rooms/sea-view",
        destination: "/nivaara/rooms/luxury-palms-room",
        permanent: true,
      },
      {
        source: "/rooms",
        destination: "/nivaara/rooms",
        permanent: true,
      },
      {
        source: "/rooms/:slug",
        destination: "/nivaara/rooms/:slug",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/nivaara/gallery",
        permanent: true,
      },
      {
        source: "/faqs",
        destination: "/nivaara/faqs",
        permanent: true,
      },
      {
        source: "/city-attractions",
        destination: "/nivaara/city-attractions",
        permanent: true,
      },
      {
        source: "/city-attractions/:slug",
        destination: "/nivaara/city-attractions/:slug",
        permanent: true,
      },
      {
        source: "/booking",
        destination: "/nivaara/booking",
        permanent: true,
      },
      {
        source: "/booking/:path*",
        destination: "/nivaara/booking/:path*",
        permanent: true,
      },
      // SEO room slug renames (via nested paths)
      {
        source: "/nivaara/rooms/nivaara-room",
        destination: "/nivaara/rooms/luxury-studio",
        permanent: true,
      },
      {
        source: "/nivaara/rooms/mountain-view",
        destination: "/nivaara/rooms/luxury-valley-room",
        permanent: true,
      },
      {
        source: "/nivaara/rooms/sea-view",
        destination: "/nivaara/rooms/luxury-palms-room",
        permanent: true,
      },
      // Coming-soon Celéstra placeholder
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
