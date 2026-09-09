/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Assets in public/ are already WebP (see scripts/optimize-images.mjs);
    // this lets the optimizer hand AVIF to browsers that take it and keeps
    // the WebP path for everyone else.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
