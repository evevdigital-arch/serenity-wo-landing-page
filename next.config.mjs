/**
 * Runtime config mirror for Next.js 14.
 * NOTE: The requested project structure includes next.config.ts, but Next.js 14 CLI loads only next.config.js/mjs.
 * Keep this file in sync with next.config.ts for build compatibility.
 */
const nextConfig = {
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
