/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      "picsum.photos",
      "raw.githubusercontent.com",
      "www.ikea.com",
      "nordic-green.vercel.app",
    ],
    path: "/_next/image",
  },
};

module.exports = nextConfig;
