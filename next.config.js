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
      "www.ikea.com/kr",
      "www.ikea.com/kr/ko",
      "www.ikea.com/kr/ko/images",
      "https://www.ikea.com",
      "https://www.ikea.com/kr",
      "https://www.ikea.com/kr/ko",
      "https://www.ikea.com/kr/ko/images",
      "nordic-green.vercel.app",
    ],
    path: "/_next/image",
  },
};

module.exports = nextConfig;
