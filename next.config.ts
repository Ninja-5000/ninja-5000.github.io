/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "production" ? "/ninja-5000.github.io" : "",
  trailingSlash: true,
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
