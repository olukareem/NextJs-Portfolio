/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pub-83c5db439b40468498f97946200806f7.r2.dev'],
    unoptimized: true
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === "production",
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["*"],
    },
    scrollRestoration: true,
  },
  output: 'standalone'
};

export default nextConfig;