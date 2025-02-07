/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your other config
}

// Only add HTTPS configuration if we're in development
if (process.env.NODE_ENV === 'development') {
  const fs = require('fs');
  const path = require('path');
  
  try {
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