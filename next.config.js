
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",

  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  experimental: {
    turbo: {
      resolveAlias: {},
    },
  },
};

module.exports = nextConfig;
