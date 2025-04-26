import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Mindscape Analytics",
  description: "Stay up-to-date with the latest insights and trends in AI, blockchain, and data analytics from Mindscape Analytics.",
  keywords: "AI blog, blockchain blog, data analytics, AI trends, blockchain news, technology insights",
  openGraph: {
    title: "Mindscape Analytics Blog | AI & Blockchain Insights",
    description: "Read expert articles on AI, blockchain, and analytics from industry leaders at Mindscape Analytics.",
    images: [{ url: "/images/blog-og-image.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindscape Analytics Blog",
    description: "Read expert articles on AI, blockchain, and analytics from industry leaders.",
    images: ["/images/blog-twitter-card.jpg"],
  },
}; 