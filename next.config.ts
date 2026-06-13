import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [48, 96, 160, 320, 480, 640]
  },
  experimental: {
    optimizePackageImports: ["gsap", "@gsap/react", "framer-motion"]
  }
};

export default nextConfig;
