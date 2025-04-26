import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogType?: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  jsonLd?: Record<string, any>
}

export default function SEO({
  title = "Mindscape Analytics | Advanced AI Solutions for Enterprise",
  description = "Transform your business with our AI-powered analytics platform. Harness the power of machine learning, computer vision, and natural language processing.",
  canonical,
  ogType = "website",
  ogImage = "/images/og-image.jpg",
  ogTitle,
  ogDescription,
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage = "/images/twitter-image.jpg",
  jsonLd,
}: SEOProps) {
  const router = useRouter()
  const currentPath = router?.pathname || '/'
  const siteUrl = 'https://mindscape-analytics.com'
  const fullUrl = canonical || `${siteUrl}${currentPath}`
  
  // Use fallbacks for OG and Twitter if not provided
  const finalOgTitle = ogTitle || title
  const finalOgDescription = ogDescription || description
  const finalTwitterTitle = twitterTitle || finalOgTitle
  const finalTwitterDescription = twitterDescription || finalOgDescription
  
  // Default JSON-LD
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": fullUrl,
    "name": title,
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "Mindscape Analytics",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/logo.png`
      }
    }
  }
  
  const finalJsonLd = jsonLd || defaultJsonLd

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Mindscape Analytics" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={`${siteUrl}${twitterImage}`} />
      <meta name="twitter:creator" content="@mindscapeai" />
      
      {/* JSON-LD Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalJsonLd) }}
      />
    </Head>
  )
} 