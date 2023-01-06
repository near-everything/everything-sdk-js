/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  reactStrictMode: true,
  env: {
    MINTBASE_API_KEY: process.env.MINTBASE_API_KEY,
    NEAR_NETWORK: process.env.NEAR_NETWORK,
    NEAR_DATA_ENV: process.env.NEAR_DATA_ENV
  },
  webpack: (config) =>{
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: ["everything-1.s3.us-east-1.amazonaws.com", "localhost", "placeimg.com", "arweave.net"],
  },
};

module.exports = nextConfig;
