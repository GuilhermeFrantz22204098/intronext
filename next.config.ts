import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deisishop.pythonanywhere.com',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;