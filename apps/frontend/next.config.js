/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'www.ikea.com' },
      { protocol: 'https', hostname: 'nordic-green.vercel.app' },
      { protocol: 'https', hostname: 'plantan-store-demo.myshopify.com' },
    ],
  },
};

module.exports = nextConfig;
