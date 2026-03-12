const nextConfig = {
  compress: false,
  async rewrites() {
    return [
      { source: "/favicon.ico",          destination: "/apple-icon" },
      { source: "/favicon-32x32.png",    destination: "/icon" },
      { source: "/favicon-16x16.png",    destination: "/icon" },
      { source: "/apple-touch-icon.png", destination: "/apple-icon" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "abud.com"],
    },
  },
};

module.exports = nextConfig;