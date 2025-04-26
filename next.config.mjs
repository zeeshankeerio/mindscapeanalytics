import withBundleAnalyzer from '@next/bundle-analyzer'
import nextPWA from 'next-pwa'

const withPWA = nextPWA

let withBundleAnalyzer = (config) => config;
try {
  const bundleAnalyzer = await import('@next/bundle-analyzer');
  withBundleAnalyzer = bundleAnalyzer.default({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (e) {
  console.log('Bundle analyzer not available, skipping...');
}

// PWA configuration
const withPWAConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: '/offline',
  },
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        }
      }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
      }
    },
    {
      urlPattern: /\/_next\/image\?url=.+$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'next-image',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /\.(?:mp3|wav|ogg)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-audio-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
      }
    },
    {
      urlPattern: /\.(?:mp4|webm)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-video-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
      }
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-js-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-style-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    // Add API cache strategy
    {
      urlPattern: /\/api\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 5 * 60 // 5 minutes
        },
        networkTimeoutSeconds: 10
      }
    }
  ]
})

let userConfig = undefined
try {
  // Remove the problematic import
  // userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
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
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
    serverComponentsExternalPackages: ['sharp'],
    ppr: false, // Disabled PPR since it requires a canary version of Next.js
    optimizeServerReact: true,
    turbo: {
      rules: {
        // Custom turbo pack rules
      }
    },
    // Add memory cache
    memoryBasedWorkersCount: true
  },
  transpilePackages: [],
  webpack: (config) => {
    config.externals.push({
      'sharp': 'commonjs sharp',
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    // Add module concatenation for better tree shaking
    config.optimization.concatenateModules = true;
    
    // Increase chunk size limit to reduce number of chunks
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      chunks: 'all',
      maxInitialRequests: 25,
      maxAsyncRequests: 25,
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
          name: 'framework',
          priority: 40,
          chunks: 'all',
          enforce: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          chunks: 'all',
          priority: 20,
        },
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: 'three-js',
          chunks: 'all',
          priority: 30,
        },
        ui: {
          test: /[\\/]node_modules[\\/](@radix-ui|cmdk|vaul|embla-carousel)[\\/]/,
          name: 'ui-components',
          chunks: 'all',
          priority: 30,
        },
        // Add specific chunks for heavy components
        analytics: {
          test: /[\\/]components[\\/](analytics-preview|analytics-dashboard)\.tsx$/,
          name: 'analytics-components',
          chunks: 'async',
          priority: 35,
        },
        hero: {
          test: /[\\/]components[\\/](hyper-hero|advanced-hero)\.tsx$/,
          name: 'hero-components',
          chunks: 'async',
          priority: 35,
        },
        industry: {
          test: /[\\/]components[\\/]enhanced-industry-solutions\.tsx$/,
          name: 'industry-solutions',
          chunks: 'async',
          priority: 35,
        },
      },
    };
    
    // Add terser compression options
    if (config.optimization.minimizer) {
      try {
        const TerserPlugin = (await import('terser-webpack-plugin')).default;
        const terserOptions = {
          compress: {
            drop_console: true,
            ecma: 2020,
            passes: 2,
          },
          mangle: true,
          module: true,
        };
        
        config.optimization.minimizer.push(
          new TerserPlugin({
            terserOptions,
            extractComments: false,
          })
        );
      } catch (e) {
        console.log('TerserPlugin not available, skipping optimization...');
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
}

// Only merge if userConfig exists (which it won't in this simplified version)
mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

// Apply the bundle analyzer and PWA wrapper
export default withBundleAnalyzer(withPWAConfig(nextConfig))
