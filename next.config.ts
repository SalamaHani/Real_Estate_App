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
      {
        protocol: "http",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "barringtonteam.virtualresults.com",
      },
      {
        protocol: "https",
        hostname: "barringtonteam.virtualresults.com",
      },
    ],
  },
};

export default nextConfig;
