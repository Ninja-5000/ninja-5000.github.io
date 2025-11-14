/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.statusbadges.me",
      },
    ],
  },
};

module.exports = nextConfig;
