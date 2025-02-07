const fs = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your other config
  server: {
    https: {
      key: fs.readFileSync(path.join(process.cwd(), 'ssl', 'localhost.key')),
      cert: fs.readFileSync(path.join(process.cwd(), 'ssl', 'localhost.crt'))
    }
  }
}

module.exports = nextConfig 