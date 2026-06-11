const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid flaky filesystem pack cache on Windows that causes missing chunk/manifests.
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
