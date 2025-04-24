import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import EnhancedHeader from "@/components/enhanced-header"
import RootLayoutContent from "@/components/root-layout-content"
import LoadingOverlay from "@/components/loading-overlay"
import { Suspense } from "react"
import Script from "next/script"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevent zoom on mobile to improve UX
  userScalable: false,
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="canonical" href="https://mindscape-analytics.com" />
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
      </head>
      <RootLayoutContent inter={inter}>
        <Suspense fallback={<LoadingOverlay />}>
          <LoadingOverlay />
          {children}
        </Suspense>
      </RootLayoutContent>
    </html>
  )
}



import './globals.css'