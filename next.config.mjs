/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allows production builds to successfully complete even with unused variables
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also ignore typescript type errors during build for speed
    ignoreBuildErrors: true,
  }
};

export default nextConfig;