/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  experimental: {
    reactMode: 'concurrent',
    reactRefresh: false, // Disable Fast Refresh for testing
  },
};

export default nextConfig;
