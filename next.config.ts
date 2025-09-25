import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kaivalyadigitals.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    // Add timeout and memory optimizations
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    // Increase memory limit and add build optimizations
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      },
    };
    return config;
  },
  // Add build optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Add memory and performance optimizations
  output: 'standalone',
};

export default nextConfig;
