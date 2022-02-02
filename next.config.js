/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias["~"] = __dirname + '/lib';
    return config;
  }
}

module.exports = nextConfig
