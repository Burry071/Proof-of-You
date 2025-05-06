/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["vercel.app"],
  },
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000",
  },
  // Add this section to properly handle environment variables
  publicRuntimeConfig: {
    VERCEL_URL: process.env.VERCEL_URL || "localhost:3000",
  },
  serverRuntimeConfig: {
    VERCEL_URL: process.env.VERCEL_URL || "localhost:3000",
  },
}

module.exports = nextConfig
