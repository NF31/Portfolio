import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  // Optimisations pour les icônes
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configuration Webpack désactivée car Turbopack est utilisé
  // webpack: (config, { isServer }) => {
  //   // Optimisation du tree-shaking pour lucide-react
  //   if (!isServer) {
  //     config.resolve.alias = {
  //       ...config.resolve.alias,
  //       'lucide-react': require.resolve('lucide-react/dist/esm/icons'),
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
