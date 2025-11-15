/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.statusbadges.me",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
