import type React from "react"
import {
  BarChart2,
  BookOpen,
  Briefcase,
  Building2,
  Code,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    linkedin: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Mindscape Analytics",
  description: "Advanced AI solutions for enterprise businesses",
  url: "https://mindscape-analytics.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/mindscapeai",
    github: "https://github.com/mindscapeai",
    linkedin: "https://linkedin.com/company/mindscapeai",
  },
}

export type NavItem = {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  isExternal?: boolean
  badge?: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
  href?: string
  items?: NavItem[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export interface FooterNav {
  main: FooterItem[]
  secondary?: {
    title: string
    href: string
    external?: boolean
  }[]
}

export const mainNav: MainNavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Services",
    href: "/services",
    icon: LayoutGrid,
  },
  {
    title: "AI Solutions",
    href: "/ai-solutions",
    icon: BarChart2,
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    icon: FileText,
  },
  {
    title: "Pricing",
    href: "/pricing",
    icon: CreditCard,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "Documentation",
    href: "/docs",
    icon: Code,
  },
  {
    title: "About",
    href: "/about",
    icon: Building2,
  },
  {
    title: "Careers",
    href: "/careers",
    icon: Briefcase,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: MessageSquare,
  },
]

export const dashboardNav: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Models",
    href: "/dashboard/models",
    icon: BarChart2,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FileText,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export const footerNav: FooterNav = {
  main: [
    {
      title: "Products",
      items: [
        {
          title: "Services",
          href: "/services",
        },
        {
          title: "AI Analytics Platform",
          href: "/ai-solutions#analytics",
        },
        {
          title: "Computer Vision",
          href: "/ai-solutions#vision",
        },
        {
          title: "Machine Learning",
          href: "/ai-solutions#ml",
        },
        {
          title: "Natural Language Processing",
          href: "/ai-solutions#nlp",
        },
        {
          title: "Predictive Analytics",
          href: "/ai-solutions#predictive",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          title: "Documentation",
          href: "/docs",
        },
        {
          title: "API Reference",
          href: "/docs/api",
        },
        {
          title: "Blog",
          href: "/blog",
        },
        {
          title: "Case Studies",
          href: "/case-studies",
        },
        {
          title: "Webinars",
          href: "/resources/webinars",
        },
      ],
    },
    {
      title: "Company",
      items: [
        {
          title: "About Us",
          href: "/about",
        },
        {
          title: "Founder & CEO",
          href: "/founder",
        },
        {
          title: "Careers",
          href: "/careers",
        },
        {
          title: "Contact",
          href: "/contact",
        },
        {
          title: "Partners",
          href: "/partners",
        },
        {
          title: "Press",
          href: "/press",
        },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          title: "Privacy Policy",
          href: "/legal/privacy",
        },
        {
          title: "Terms of Service",
          href: "/legal/terms",
        },
        {
          title: "Cookie Policy",
          href: "/legal/cookies",
        },
        {
          title: "Security",
          href: "/legal/security",
        },
        {
          title: "GDPR Compliance",
          href: "/legal/gdpr",
        },
      ],
    },
  ],
  secondary: [
    {
      title: "Terms",
      href: "/legal/terms",
    },
    {
      title: "Privacy",
      href: "/legal/privacy",
    },
    {
      title: "Cookies",
      href: "/legal/cookies",
    },
  ],
}

