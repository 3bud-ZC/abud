const nextConfig = {
  compress: true,
  poweredByHeader: false,
  
  // Railway - NO Static Generation at all
  generateBuildId: async () => 'build',
  staticPageGenerationTimeout: 60,
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 2,
  },
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  // Disable all static optimization
  trailingSlash: false,
  
  async rewrites() {
    return [
      { source: "/favicon.ico",          destination: "/apple-icon" },
      { source: "/favicon-32x32.png",    destination: "/icon" },
      { source: "/favicon-16x16.png",    destination: "/icon" },
      { source: "/apple-touch-icon.png", destination: "/apple-icon" },
    ];
  },
  
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
  
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "abud.fun", "www.abud.fun", "*.railway.app"],
    },
    workerThreads: false,
    cpus: 1,
  },
  
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|webp|avif|ico|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;