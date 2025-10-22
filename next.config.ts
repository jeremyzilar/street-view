import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable faster refresh in development
  reactStrictMode: true,

  // Optimize webpack for faster rebuilds
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Faster rebuilds in development
      config.watchOptions = {
        poll: 300, // Check for changes every 300ms
        aggregateTimeout: 200, // Delay rebuild after first change
      };
    }
    return config;
  },
};

export default nextConfig;
