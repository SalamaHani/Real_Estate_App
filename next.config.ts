import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // or '10mb' if needed
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "content.mediastg.net",
      },
      {
        protocol: "https",
        hostname: "content.mediastg.net",
      },
    ],
  },
};

export default nextConfig;
