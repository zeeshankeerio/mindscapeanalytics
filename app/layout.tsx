import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RootLayoutContent from "@/components/root-layout-content"
import PreloadCriticalImages from "@/components/preload-critical-images"
import Script from "next/script"

// Optimize font loading with display=swap for better performance
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  weight: ['400', '500', '600', '700'] // Only load needed weights
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5, 
  userScalable: true,
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Mindscape - AI Analytics Platform",
  description: "Enterprise-grade AI analytics platform for data-driven decision making",
  metadataBase: new URL("https://mindscape-analytics.com"),
  keywords: "AI, machine learning, analytics, data visualization, enterprise AI, computer vision, NLP",
  authors: [{ name: "Mindscape Analytics" }],
  creator: "Mindscape Analytics",
  publisher: "Mindscape Analytics",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mindscape-analytics.com",
    title: "Mindscape Analytics | Advanced AI Solutions for Enterprise",
    description:
      "Transform your business with our AI-powered analytics platform. Harness the power of machine learning, computer vision, and natural language processing.",
    siteName: "Mindscape Analytics",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mindscape Analytics Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindscape Analytics | Advanced AI Solutions for Enterprise",
    description:
      "Transform your business with our AI-powered analytics platform. Harness the power of machine learning, computer vision, and natural language processing.",
    creator: "@mindscapeai",
    images: ["/images/twitter-image.jpg"]
  },
  robots: "index, follow",
  generator: "v0.dev"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full max-w-[100vw] overflow-x-hidden">
      <head>
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="canonical" href="https://mindscape-analytics.com" />
        
        {/* Performance optimizations for faster resource loading */}
        <link rel="preconnect" href="https://mindscape-analytics.com" />
        <link rel="dns-prefetch" href="https://mindscape-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Add preload hints for critical resources */}
        <link rel="preload" href="/_next/static/chunks/main.js" as="script" />
        <link rel="preload" href="/_next/static/chunks/webpack.js" as="script" />
        <link rel="preload" href="/_next/static/chunks/framework.js" as="script" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preload critical images */}
        <link
          rel="preload"
          href="/images/logo.png"
          as="image"
          type="image/png"
        />
        <link rel="preload" href="/images/brain.svg" as="image" type="image/svg+xml" />
        
        {/* Preload WebP versions of large images */}
        <link 
          rel="preload" 
          href="/images/optimized/founder-reduced.webp" 
          as="image" 
          type="image/webp"
        />
        
        {/* Add QuickLink for prefetching visible links */}
        <Script id="quicklink" strategy="afterInteractive">
          {`
            (function() {
              function loadQuicklink() {
                try {
                  import('quicklink/dist/quicklink.mjs').then(module => {
                    module.listen({
                      timeout: 2000,
                      ignores: [
                        /\/api\\//,
                        uri => uri.includes('.zip'),
                        uri => uri.includes('.mp4'),
                        uri => uri.includes('.webm'),
                        uri => uri.includes('.mp3'),
                        uri => uri.includes('chrome-extension'),
                        uri => uri.includes('/admin'),
                      ]
                    });
                  });
                } catch (e) {
                  console.error('Error loading quicklink:', e);
                }
              }
              
              if (document.readyState === 'complete') {
                loadQuicklink();
              } else {
                window.addEventListener('load', loadQuicklink);
              }
            })();
          `}
        </Script>
        
        {/* Add critical CSS inline to reduce render-blocking resources */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical path CSS */
          *, *::before, *::after {
            box-sizing: border-box;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            max-width: 100vw;
            overflow-x: hidden;
          }
          
          body {
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Add image lazy loading default styles */
          img.lazy-load {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          
          img.lazy-load.loaded {
            opacity: 1;
          }
          
          /* Prevent layout shifts with image containers */
          .img-container {
            position: relative;
            overflow: hidden;
          }
        `}} />
        
        {/* Move non-essential scripts to afterInteractive or lazyOnload */}
        <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Mindscape Analytics",
              "url": "https://mindscape-analytics.com",
              "logo": "https://mindscape-analytics.com/images/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-123-456-7890",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://twitter.com/mindscapeai",
                "https://www.linkedin.com/company/mindscapeanalytics/",
                "https://github.com/mindscapeanalytics"
              ],
              "description": "Enterprise-grade AI analytics platform for data-driven decision making"
            }
          `}
        </Script>
        
        {/* Web Vitals measurement */}
        <Script id="web-vitals" strategy="lazyOnload">
          {`
            try {
              window.addEventListener('load', () => {
                setTimeout(() => {
                  import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
                    getCLS(metric => console.log('CLS:', metric.value));
                    getFID(metric => console.log('FID:', metric.value));
                    getLCP(metric => console.log('LCP:', metric.value));
                    getFCP(metric => console.log('FCP:', metric.value));
                    getTTFB(metric => console.log('TTFB:', metric.value));
                  });
                }, 3000);
              });
            } catch (e) {
              console.error('Error loading web-vitals', e);
            }
          `}
        </Script>
      </head>
      {/* 
        RootLayoutContent handles the main structure of the site, including:
        1. Consistent header across non-dashboard pages
        2. Main footer with consistent styling on all non-dashboard/docs pages
        3. Proper theme and layout management
      */}
      <RootLayoutContent inter={inter} fullWidth={true}>
        {/* Preload critical images for faster page load */}
        <PreloadCriticalImages />
        
        {children}
      </RootLayoutContent>
    </html>
  )
}