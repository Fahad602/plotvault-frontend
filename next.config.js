/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'vercel.app', 'railway.app', 'www.queenhillsmurree.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  },
  // Enable static exports for Vercel
  output: 'standalone',
  // Optimize for production
  compress: true,
  // Enable experimental features
  experimental: {
    // optimizeCss: true, // Disabled due to critters dependency issue
  },
}

module.exports = nextConfig 