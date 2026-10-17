import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // Brand property sites are separate deployments
      {
        source: "/nivaara",
        destination: "https://nivaara.ghdhotels.in",
        permanent: false,
      },
      {
        source: "/nivaara/:path*",
        destination: "https://nivaara.ghdhotels.in/:path*",
        permanent: false,
      },
      {
        source: "/samraya",
        destination: "https://samraya.ghdhotels.in",
        permanent: false,
      },
      {
        source: "/samraya/:path*",
        destination: "https://samraya.ghdhotels.in/:path*",
        permanent: false,
      },
      {
        source: "/celestra",
        destination: "https://celestra.ghdhotels.in",
        permanent: false,
      },
      {
        source: "/celestra/:path*",
        destination: "https://celestra.ghdhotels.in/:path*",
        permanent: false,
      },
      // Legacy property paths → Nivaãra subdomain
      {
        source: "/rooms",
        destination: "https://nivaara.ghdhotels.in/rooms",
        permanent: false,
      },
      {
        source: "/rooms/:slug",
        destination: "https://nivaara.ghdhotels.in/rooms/:slug",
        permanent: false,
      },
      {
        source: "/gallery",
        destination: "https://nivaara.ghdhotels.in/gallery",
        permanent: false,
      },
      {
        source: "/faqs",
        destination: "https://nivaara.ghdhotels.in/faqs",
        permanent: false,
      },
      {
        source: "/city-attractions",
        destination: "https://nivaara.ghdhotels.in/city-attractions",
        permanent: false,
      },
      {
        source: "/city-attractions/:slug",
        destination: "https://nivaara.ghdhotels.in/city-attractions/:slug",
        permanent: false,
      },
      {
        source: "/booking",
        destination: "https://nivaara.ghdhotels.in/booking",
        permanent: false,
      },
      {
        source: "/booking/:path*",
        destination: "https://nivaara.ghdhotels.in/booking/:path*",
        permanent: false,
      },
      {
        source: "/experiences",
        destination: "https://nivaara.ghdhotels.in/city-attractions",
        permanent: false,
      },
      {
        source: "/experiences/:slug",
        destination: "https://nivaara.ghdhotels.in/city-attractions/:slug",
        permanent: false,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
