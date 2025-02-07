const fs = require('fs');
const path = require('path');

const getHttpsConfig = () => {
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) return undefined;
  
  try {
    return {
      key: fs.readFileSync(path.join(process.cwd(), 'ssl', 'localhost.key')),
      cert: fs.readFileSync(path.join(process.cwd(), 'ssl', 'localhost.crt'))
    };
  } catch (e) {
    console.log('SSL certificates not found, running without https');
    return undefined;
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your other config
  server: process.env.NODE_ENV === 'development' ? {
    https: getHttpsConfig()
  } : undefined
}

module.exports = nextConfig 