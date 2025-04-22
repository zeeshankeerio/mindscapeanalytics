"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PartnerEcosystem() {
  const [activeTab, setActiveTab] = useState("cloud")

  const categories = [
    { id: "cloud", label: "Cloud Providers" },
    { id: "data", label: "Data Platforms" },
    { id: "bi", label: "BI & Analytics" },
    { id: "crm", label: "CRM & Marketing" },
    { id: "dev", label: "Developer Tools" },
  ]

  const partners = {
    cloud: [
      {
        name: "AWS",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Seamlessly integrate with Amazon Web Services for scalable cloud infrastructure.",
        features: [
          "EC2 instance management",
          "S3 data integration",
          "Lambda function deployment",
          "SageMaker model integration",
        ],
      },
      {
        name: "Microsoft Azure",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Connect with Azure services for enterprise-grade cloud solutions.",
        features: [
          "Azure ML integration",
          "Blob storage connectivity",
          "Azure Functions deployment",
          "Active Directory authentication",
        ],
      },
      {
        name: "Google Cloud",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Leverage Google Cloud Platform for advanced AI and data processing capabilities.",
        features: [
          "BigQuery integration",
          "GCP AI Platform connectivity",
          "Cloud Storage management",
          "Kubernetes deployment",
        ],
      },
    ],
    data: [
      {
        name: "Snowflake",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Connect to Snowflake data warehouse for enterprise data management.",
        features: [
          "Direct query integration",
          "Data pipeline automation",
          "Secure data sharing",
          "Real-time analytics",
        ],
      },
      {
        name: "Databricks",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Integrate with Databricks for unified analytics and AI solutions.",
        features: ["Spark job management", "MLflow integration", "Delta Lake connectivity", "Notebook collaboration"],
      },
      {
        name: "MongoDB",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Connect to MongoDB for flexible document database integration.",
        features: ["Document storage", "Atlas integration", "Real-time data sync", "Schema validation"],
      },
    ],
    bi: [
      {
        name: "Tableau",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Integrate with Tableau for powerful data visualization and business intelligence.",
        features: ["Dashboard embedding", "Data source connection", "Custom visualizations", "Report automation"],
      },
      {
        name: "Power BI",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Connect with Microsoft Power BI for interactive data visualization.",
        features: ["Report integration", "DAX query support", "Custom visuals", "Real-time dashboards"],
      },
      {
        name: "Looker",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Integrate with Looker for modern business intelligence and analytics.",
        features: ["LookML model integration", "Embedded analytics", "Data actions", "Custom visualizations"],
      },
    ],
    crm: [
      {
        name: "Salesforce",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Connect with Salesforce for comprehensive CRM integration.",
        features: ["Customer data sync", "Opportunity prediction", "Einstein integration", "Custom object support"],
      },
      {
        name: "HubSpot",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Integrate with HubSpot for marketing, sales, and service automation.",
        features: [
          "Contact management",
          "Marketing automation",
          "Sales pipeline integration",
          "Service ticket analysis",
        ],
      },
      {
        name: "Marketo",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Connect with Marketo for advanced marketing automation.",
        features: ["Lead scoring", "Campaign management", "Email marketing integration", "Marketing analytics"],
      },
    ],
    dev: [
      {
        name: "GitHub",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Integrate with GitHub for seamless development workflow.",
        features: ["Repository integration", "CI/CD pipeline", "Issue tracking", "Code review automation"],
      },
      {
        name: "Jira",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Connect with Jira for project management and issue tracking.",
        features: ["Ticket synchronization", "Sprint planning", "Workflow automation", "Reporting integration"],
      },
      {
        name: "Slack",
        logo: "/placeholder.svg?height=60&width=120",
        description: "Integrate with Slack for team communication and notifications.",
        features: ["Automated alerts", "Command integration", "Interactive messages", "Workflow automation"],
      },
    ],
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">INTEGRATIONS</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Powerful <span className="text-red-500">Ecosystem</span> of Integrations
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Connect Mindscape Analytics with your existing tools and platforms for a seamless workflow
          </p>
        </div>

        <Tabs defaultValue="cloud" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <TabsList className="bg-black/50 border border-white/10 p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(partners).map(([category, partnerList]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {partnerList.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full hover:border-red-500/50 transition-all duration-300 group">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="h-16 mb-6 flex items-center justify-center bg-white/5 rounded-lg p-2">
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={partner.name}
                            className="h-full object-contain"
                          />
                        </div>

                        <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                        <p className="text-white/70 mb-4">{partner.description}</p>

                        <div className="mt-auto">
                          <h4 className="font-medium mb-2">Key Features</h4>
                          <ul className="space-y-1 mb-4">
                            {partner.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-red-500 flex-shrink-0" />
                                <span className="text-white/80">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Button variant="outline" className="w-full mt-4 border-white/10 hover:bg-white/5 group">
                            <span>View Integration</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl">
            <h3 className="text-xl font-bold mb-2">Need a custom integration?</h3>
            <p className="text-white/70 mb-4">
              Our team can build custom integrations for your specific business needs.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Request Custom Integration
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

