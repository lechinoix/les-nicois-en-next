/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com']
  },
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias["~"] = __dirname + '/lib';
    return config;
  }
}

module.exports = nextConfig
