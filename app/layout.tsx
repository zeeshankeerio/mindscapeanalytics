import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
import { Inter as FontSans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Mindscape",
    "Analytics",
    "Mindscape Analytics",
    "Data",
    "AI",
    "ML",
    "Data Science",
    "Data Engineering",
    "Data Analytics",
    "Data Visualization",
    "Data Analysis",
    "Web Development",
    "Web Design",
    "Agency",
  ],
  authors: [
    {
      name: "Mindscape Analytics",
      url: "https://www.mindscapeanalytics.com",
    },
  ],
  creator: "Mindscape Analytics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ /* TODO: Add twitter handle */",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={cn(
            "realtive bg-background h-full min-h-screen font-sans antialiased",
            fontSans.className
          )}
        >
          <main className="relative flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </ThemeProvider>
    </html>
  )
}
