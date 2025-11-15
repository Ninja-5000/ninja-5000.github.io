/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "https://ninja-5000.github.io/",
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
