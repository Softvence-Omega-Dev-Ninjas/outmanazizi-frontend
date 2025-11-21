import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.BACKEND_URL || "https://api.m3alem.group"
        }/:path*`,
      },
    ];
  },
};

export default nextConfig;
