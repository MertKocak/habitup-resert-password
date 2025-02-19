import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://habitup-backend.onrender.com/:path*', // Backend'in canlı URL'si
      },
    ]
  },
}

export default nextConfig;
