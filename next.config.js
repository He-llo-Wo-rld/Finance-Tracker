/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
  // appDir is now stable and enabled by default in Next.js 14
  // No need for experimental.appDir anymore
}

module.exports = nextConfig
