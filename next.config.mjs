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
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion', 
      '@radix-ui/react-icons',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'react-day-picker',
      'sonner',
      'recharts',
      'chart.js',
      '@react-three/drei',
      '@react-three/fiber',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@tiptap/react',
      '@tiptap/starter-kit'
    ],
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
    serverComponentsExternalPackages: ['sharp'],
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64'
      ],
    },
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'],
      },
    },
    // Enable memory optimization
    isrMemoryCacheSize: 0, // Disable ISR memory cache to reduce memory usage
    serverMinification: true, // Enable server code minification
    optimizeServerReact: true, // Optimize server React bundle
    // Removing PPR until using canary version
    // ppr: true,
  },
  transpilePackages: [],
  webpack: (config, { isServer, dev }) => {
    config.externals.push({
      'sharp': 'commonjs sharp',
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    // Optimize bundle size by marking dependencies as modularized
    config.module.parser = {
      ...config.module.parser,
      javascript: {
        ...config.module.parser?.javascript,
        exportsPresence: 'error',
        importExportsPresence: 'error',
      },
    };

    // Optimize production bundle size
    if (!isServer) {
      // Create separate chunks for large libraries
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 30,
        maxAsyncRequests: 30,
        minSize: 20000,
        minChunks: 1,
        cacheGroups: {
          // Separate major libraries into their own chunks
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|next|framer-motion)[\\/]/,
            priority: 40,
            enforce: true,
          },
          threeJs: {
            name: 'threejs-vendor',
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            chunks: 'async',
            priority: 30,
            reuseExistingChunk: true,
          },
          charts: {
            name: 'charts-vendor',
            test: /[\\/]node_modules[\\/](chart\.js|recharts)[\\/]/,
            chunks: 'async',
            priority: 20,
            reuseExistingChunk: true,
          },
          radix: {
            name: 'ui-components',
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            chunks: 'all',
            priority: 15,
            reuseExistingChunk: true,
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Add Compression Plugin for production builds
      if (!dev) {
        const CompressionPlugin = require('compression-webpack-plugin');
        config.plugins.push(
          new CompressionPlugin({
            test: /\.(js|css|html|svg|json)$/,
            algorithm: 'gzip',
            threshold: 10240, // Only assets > 10kb get compressed
            minRatio: 0.8, // Only compress if compression ratio is better than 0.8
          })
        );
        
        // Add image optimization for production
        const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
        config.plugins.push(
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                  ['gifsicle', { interlaced: true }],
                  ['jpegtran', { progressive: true }],
                  ['optipng', { optimizationLevel: 5 }],
                  ['svgo', {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false,
                          },
                        },
                      },
                    ],
                  }],
                ],
              },
            },
          })
        );
      }
    }
    
    return config;
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 0,
  env: {
    NEXT_PUBLIC_DISABLE_STATIC_GENERATION: "true"
  },
  // Enhanced cache control headers for better performance
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
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/(.*).json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/(.*).js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Add prefetching and preloading hints
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
  distDir: '.next',
}

// Add bundle analyzer for production builds
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

export default withBundleAnalyzer(nextConfig);
