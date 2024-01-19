/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.m4a$/,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;
