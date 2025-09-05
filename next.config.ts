import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 圖片優化設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  // 效能優化
  experimental: {
    optimizePackageImports: ['@sanity/image-url', '@portabletext/react'],
  },
  // 壓縮設定
  compress: true,
  // 安全性標頭
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
