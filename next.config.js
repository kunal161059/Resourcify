const fs = require('fs');
const path = require('path');

const getHttpsConfig = () => {
  try {
    return {
      key: fs.readFileSync(path.join(process.cwd(), 'ssl', 'localhost.key')),
      cert: fs.readFileSync(path.join(process.cwd(), 'ssl', 'localhost.crt'))
    };
  } catch (e) {
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