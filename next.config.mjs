// Let's remove next-pwa completely
// import nextPWA from 'next-pwa'

let withBundleAnalyzer = (config) => config;
try {
  const bundleAnalyzer = await import('@next/bundle-analyzer');
  withBundleAnalyzer = bundleAnalyzer.default({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (e) {
  console.log('Bundle analyzer not available, skipping...');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me'
      }
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion', 
      '@radix-ui/react-icons', 
      '@react-three/drei', 
      '@react-three/fiber', 
      'cmdk',
      'recharts',
      'chart.js',
      'react-chartjs-2',
      'date-fns',
      'embla-carousel-react',
      'sonner',
      'zod'
    ],
    webpackBuildWorker: true,
    serverComponentsExternalPackages: ['sharp'],
    ppr: false
  },
  webpack: (config) => {
    config.externals.push({
      'sharp': 'commonjs sharp',
    });
    
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    // Optimize for production
    if (process.env.NODE_ENV === 'production') {
      // Enable module concatenation for better tree shaking
      config.optimization.concatenateModules = true;
      
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 25,
        minSize: 20000,
        maxSize: 244000,
      };
    }
    
    return config;
  },
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 120,
  env: {
    NEXT_PUBLIC_API_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api` : 'http://localhost:3000/api',
  },
  // Force all auth API routes to be dynamic rather than static
  serverRuntimeConfig: {
    dynamicRenderingForPaths: [
      '/api/auth/**',
      '/solutions/blockchain/**',
      '/solutions/enterprise/**',
      '/solutions/industry/**',
      '/solutions/real-estate/**',
      '/solutions/industry-paas/**',
      '/solutions/aiops/**',
      '/solutions/genai/**',
      '/solutions/cloud/**',
      '/services/**',
      '/dashboard/**',
      '/blog/**',
      '/projects/**',
      '/case-studies/**'
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  distDir: '.next',
};

let config = nextConfig;
if (process.env.ANALYZE === 'true') {
  try {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    });
    config = withBundleAnalyzer(config);
  } catch (e) {
    console.log('Bundle analyzer not available, skipping...');
  }
}

export default config;
