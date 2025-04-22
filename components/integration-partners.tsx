"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const featuredPartners = [
  {
    name: "AWS",
    logo: "/images/partners/aws.svg",
    category: "cloud",
  },
  {
    name: "Microsoft Azure",
    logo: "/images/partners/azure.svg",
    category: "cloud",
  },
  {
    name: "Google Cloud",
    logo: "/images/partners/google-cloud.svg",
    category: "cloud",
  },
  {
    name: "Salesforce",
    logo: "/images/partners/salesforce.svg",
    category: "crm",
  },
  {
    name: "Tableau", 
    logo: "/images/partners/tableau.svg",
    category: "analytics",
  },
  {
    name: "GitHub",
    logo: "/images/partners/github.svg",
    category: "development",
  },
]

const partners = [
  {
    name: "AWS",
    description: "Seamless integration with Amazon Web Services for cloud infrastructure and services.",
    logo: "/images/partners/aws.svg",
    category: "cloud",
  },
  {
    name: "Microsoft Azure",
    description: "Connect with Azure services for enterprise-grade cloud computing and AI capabilities.",
    logo: "/images/partners/azure.svg",
    category: "cloud",
  },
  {
    name: "Google Cloud",
    description: "Leverage Google Cloud Platform for advanced machine learning and data analytics.",
    logo: "/images/partners/google-cloud.svg",
    category: "cloud",
  },
  {
    name: "Salesforce",
    description: "Integrate AI-powered insights directly into your Salesforce CRM workflows.",
    logo: "/images/partners/salesforce.svg",
    category: "crm",
  },
  {
    name: "HubSpot",
    description: "Enhance your marketing and sales efforts with AI-driven analytics and automation.",
    logo: "/images/partners/hubspot.svg",
    category: "crm",
  },
  {
    name: "SAP",
    description: "Connect enterprise resource planning with advanced AI capabilities for better business outcomes.",
    logo: "/images/partners/sap.svg",
    category: "erp",
  },
  {
    name: "Oracle",
    description: "Integrate with Oracle's suite of enterprise applications and database solutions.",
    logo: "/images/partners/oracle.svg",
    category: "erp",
  },
  {
    name: "Slack",
    description: "Bring AI-powered insights and automation directly into your team's Slack workspace.",
    logo: "/images/partners/slack.svg",
    category: "collaboration",
  },
  {
    name: "Tableau",
    description: "Enhance your data visualizations with AI-driven insights and predictive analytics.",
    logo: "/images/partners/tableau.svg",
    category: "analytics",
  },
  {
    name: "Shopify",
    description: "Power your e-commerce platform with AI-driven recommendations and insights.",
    logo: "/images/partners/shopify.svg",
    category: "ecommerce",
  },
  {
    name: "Stripe",
    description: "Integrate payment processing with AI fraud detection and revenue optimization.",
    logo: "/images/partners/stripe.svg",
    category: "payment",
  },
  {
    name: "GitHub",
    description: "Enhance your development workflow with AI-powered code analysis and suggestions.",
    logo: "/images/partners/github.svg",
    category: "development",
  },
]

const categories = [
  { id: "all", name: "All Partners" },
  { id: "cloud", name: "Cloud Providers" },
  { id: "crm", name: "CRM Systems" },
  { id: "erp", name: "ERP Solutions" },
  { id: "analytics", name: "Analytics Tools" },
  { id: "collaboration", name: "Collaboration" },
  { id: "development", name: "Development" },
  { id: "ecommerce", name: "E-Commerce" },
  { id: "payment", name: "Payment" },
]

export default function IntegrationPartners() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null)

  const filteredPartners =
    activeCategory === "all" ? partners : partners.filter((partner) => partner.category === activeCategory)

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">ECOSYSTEM</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Integration <span className="text-red-500">Partners</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Seamlessly connect with your existing tools and platforms through our extensive partner network
          </p>
        </div>

        {/* Featured Partners */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white/90">Trusted by Industry Leaders</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12">
            {featuredPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-3"
              >
                <div className="relative group h-12 w-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{
                         background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                       }}></div>
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-10 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === category.id
                  ? "bg-red-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredPartner(index)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 h-full group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Glossy reflection */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                <CardContent className="p-6 flex flex-col items-center text-center h-full relative z-10">
                  <div className="w-20 h-20 mb-4 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/5 rounded-full transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110"></div>
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" 
                         style={{
                           background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                         }}></div>
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="w-16 h-16 object-contain relative z-10 p-2 transition-all duration-300 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="text-lg font-bold mb-2">{partner.name}</h3>
                  <p className="text-white/70 text-sm mb-4 flex-grow">{partner.description}</p>

                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-white/5 group">
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  {hoveredPartner === index && (
                    <motion.div
                      className="absolute inset-0 border border-red-500/30 rounded-xl pointer-events-none"
                      layoutId="partnerHighlight"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Explore All Integrations
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>

          <p className="mt-4 text-white/60 text-sm">
            Don't see your platform?{" "}
            <a href="#contact" className="text-red-500 hover:underline">
              Contact us
            </a>{" "}
            about custom integrations.
          </p>
        </div>

        {/* Integration Process */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">DEVELOPER RESOURCES</Badge>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Simple Integration <span className="text-red-500">Process</span>
            </h3>
            <p className="text-white/70">Our flexible API and SDK options make integration straightforward for developers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-red-500/10 rounded-br-full"></div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                  <span className="text-xl font-bold text-red-500">1</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">API Access</h4>
                <p className="text-white/70 text-sm">
                  Register for API access through our developer portal and receive your unique API key credentials.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-white/10 h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-red-500/10 rounded-br-full"></div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                  <span className="text-xl font-bold text-red-500">2</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Implementation</h4>
                <p className="text-white/70 text-sm">
                  Integrate using our comprehensive SDKs for JavaScript, Python, Java, or other languages with detailed documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-white/10 h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-red-500/10 rounded-br-full"></div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                  <span className="text-xl font-bold text-red-500">3</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Testing & Deployment</h4>
                <p className="text-white/70 text-sm">
                  Use our sandbox environment to validate your integration before moving to production with our support.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Ready to start integrating?</h4>
                <p className="text-white/70 text-sm mb-4 md:mb-0">
                  Access our comprehensive developer resources, API documentation, and code samples.
                </p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Documentation
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Developer Portal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

