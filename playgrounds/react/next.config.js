/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) =>{
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: ["everything-1.s3.us-east-1.amazonaws.com", "localhost", "placeimg.com", "arweave.net"],
  },
};

module.exports = nextConfig;
