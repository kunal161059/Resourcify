/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'], // Add your image domains here
  }
}

// Only add HTTPS configuration if we're in development
if (process.env.NODE_ENV === 'development') {
  try {
    const fs = require('fs');
    const path = require('path');
    nextConfig.server = {
      https: {
        key: fs.readFileSync(path.join(process.cwd(), 'ssl', 'localhost.key')),
        cert: fs.readFileSync(path.join(process.cwd(), 'ssl', 'localhost.crt'))
      }
    };
  } catch (e) {
    console.log('SSL certificates not found, running without https');
  }
}

module.exports = nextConfig 