/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.CI ? "export" : undefined,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
