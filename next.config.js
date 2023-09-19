/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ["picsum.photos", "raw.githubusercontent.com", "www.ikea.com"],
  },
};

module.exports = nextConfig;
