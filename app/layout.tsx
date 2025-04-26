import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import EnhancedHeader from "@/components/enhanced-header"
import RootLayoutContent from "@/components/root-layout-content"
import { Suspense } from "react"
import Script from "next/script"
import { reportWebVitals } from "@/lib/web-vitals"

// Dynamically import non-critical components
import dynamic from "next/dynamic"
const LoadingOverlay = dynamic(() => import("@/components/loading-overlay"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black"></div>
});

// Use Inter font from Google Fonts
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "#D10000",
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: "Mindscape - AI Analytics Platform",
  description: "Enterprise-grade AI analytics platform for data-driven decision making",
  metadataBase: new URL("https://mindscape-analytics.com"),
  keywords: "AI, machine learning, analytics, data visualization, enterprise AI, computer vision, NLP",
  authors: [{ name: "Mindscape Analytics" }],
  creator: "Mindscape Analytics",
  publisher: "Mindscape Analytics",
  applicationName: "Mindscape Analytics",
  appleWebApp: {
    capable: true,
    title: "Mindscape Analytics",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
    other: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png", rel: "apple-touch-icon" },
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

// Report Web Vitals
export function reportWebVitalsCallback(metric: any) {
  // This function is exported to allow _app.js to report web vitals
  reportWebVitals()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="canonical" href="https://mindscape-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Remove preload for missing resources */}
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
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
        <Script id="performance-metrics" strategy="afterInteractive">
          {`
          // Initialize performance observer to track long tasks
          if (typeof PerformanceObserver !== 'undefined') {
            try {
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  // Log long tasks that might cause jank
                  if (entry.duration > 50) {
                    console.log('Long task detected:', entry.duration, 'ms');
                  }
                }
              });
              
              observer.observe({ type: 'longtask', buffered: true });
            } catch (e) {
              console.error('Performance observer error:', e);
            }
          }
          `}
        </Script>
        
        {/* Core Web Vitals Optimization */}
        <Script id="web-vitals-optimization" strategy="beforeInteractive">
          {`
          // Set up a preemptive connection
          let preconnected = false;
          const preconnectOnUserActive = () => {
            if (!preconnected) {
              // Create preconnect links for domains that will be accessed soon
              ['https://images.unsplash.com'].forEach(url => {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = url;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
              });
              preconnected = true;
            }
          };
          // Add event listeners for user interaction
          ['keydown', 'mousemove', 'touchstart', 'scroll'].forEach(evt => 
            window.addEventListener(evt, preconnectOnUserActive, {once: true, passive: true})
          );

          // Initialize image loading optimization
          if ('loading' in HTMLImageElement.prototype) {
            // Use native lazy loading for browsers that support it
          } else {
            // Fallback lazy loading strategy would go here if needed
          }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<LoadingOverlay />}>
            <EnhancedHeader />
            <RootLayoutContent>
              {children}
            </RootLayoutContent>
          </Suspense>
        </ThemeProvider>
        <div id="portal-root" />
      </body>
    </html>
  )
}

import './globals.css'