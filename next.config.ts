import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // or '10mb' if needed
    },
  },
  domains: [
    "images.unsplash.com",
    "content.mediastg.net",
    "barringtonteam.virtualresults.com",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "content.mediastg.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "content.mediastg.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "barringtonteam.virtualresults.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "barringtonteam.virtualresults.com",
        pathname: "/**",
      },
    ],
    // Disable image optimization for problematic external images
    unoptimized: process.env.NODE_ENV === "production" ? false : true,
  },
};

export default nextConfig;
