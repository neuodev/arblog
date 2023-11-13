/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.CI ? "export" : undefined,
};

module.exports = nextConfig;
