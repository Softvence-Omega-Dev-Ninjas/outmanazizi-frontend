import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://72.60.186.49:3000/:path*',
      },
    ];
  },
};

export default nextConfig;
