"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Globe, 
  Palette, 
  Brain, 
  MonitorSmartphone, 
  Code,
  Database,
  ShieldCheck,
  BarChart3,
  Cloud,
  Smartphone,
  Cpu,
  Bot
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StandardBackground } from "@/components/shared/background"

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

// Services data
const services = [
  {
    icon: <Globe className="h-10 w-10 text-red-500" />,
    title: "Web Application Development",
    description: "Custom web applications built with cutting-edge technologies that deliver exceptional user experiences and scale with your business.",
    features: [
      "Full-stack development using React, Next.js, Node.js",
      "Responsive and accessible user interfaces",
      "REST API and GraphQL integration",
      "Performance optimization and SEO",
      "Secure authentication and authorization",
      "Scalable cloud-based architecture"
    ],
    slug: "web-application-development"
  },
  {
    icon: <Palette className="h-10 w-10 text-red-500" />,
    title: "UX/UI Design",
    description: "Human-centered design solutions that combine aesthetics with usability to create interfaces your users will love.",
    features: [
      "User research and persona development",
      "Wireframing and prototyping",
      "Responsive and adaptive design",
      "Accessibility compliance (WCAG)",
      "Design systems and component libraries",
      "User testing and iterative improvements"
    ],
    slug: "ux-ui-design"
  },
  {
    icon: <Brain className="h-10 w-10 text-red-500" />,
    title: "Generative AI Solutions",
    description: "Cutting-edge AI implementations that transform your business operations, automate processes, and unlock new capabilities.",
    features: [
      "Custom large language model (LLM) implementations",
      "AI-powered content generation and analysis",
      "Multimodal AI systems (text, image, video)",
      "RAG (Retrieval-Augmented Generation) systems",
      "AI agent development and orchestration",
      "Data processing and fine-tuning pipelines"
    ],
    slug: "generative-ai-solutions"
  },
  {
    icon: <MonitorSmartphone className="h-10 w-10 text-red-500" />,
    title: "Desktop Application Development",
    description: "Powerful, native desktop applications that deliver high performance and seamless user experiences.",
    features: [
      "Cross-platform development (Windows, macOS, Linux)",
      "Electron-based applications",
      "Native application development",
      "Hardware integration and optimization",
      "Offline functionality and data synchronization",
      "Auto-update implementation and maintenance"
    ],
    slug: "desktop-application-development"
  },
  {
    icon: <Smartphone className="h-10 w-10 text-red-500" />,
    title: "Mobile App Development",
    description: "Engaging, high-performance mobile applications for iOS and Android that meet your business objectives.",
    features: [
      "Native iOS and Android development",
      "Cross-platform development with React Native/Flutter",
      "Responsive UI for various device sizes",
      "Push notifications and real-time updates",
      "Offline functionality and data synchronization",
      "App Store and Google Play submission"
    ],
    slug: "mobile-app-development"
  },
  {
    icon: <Database className="h-10 w-10 text-red-500" />,
    title: "Database & Backend Solutions",
    description: "Robust, scalable backend systems and database architectures designed for performance, security, and reliability.",
    features: [
      "Relational and NoSQL database design",
      "API development (REST, GraphQL)",
      "Microservices architecture",
      "Real-time data processing",
      "Database optimization and scaling",
      "Secure authentication and authorization systems"
    ],
    slug: "database-backend-solutions"
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-red-500" />,
    title: "Cybersecurity Services",
    description: "Comprehensive security solutions to protect your applications, data, and infrastructure from evolving threats.",
    features: [
      "Security code reviews and vulnerability assessments",
      "Penetration testing and security audits",
      "Secure authentication implementation",
      "Data encryption and protection",
      "Compliance with security standards (GDPR, HIPAA)",
      "Security monitoring and incident response"
    ],
    slug: "cybersecurity-services"
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-red-500" />,
    title: "Data Analytics & Visualization",
    description: "Transform your data into actionable insights with advanced analytics and beautiful, intuitive visualizations.",
    features: [
      "Business intelligence dashboard development",
      "Real-time data visualization",
      "Predictive analytics and forecasting",
      "Custom reporting systems",
      "Data integration from multiple sources",
      "Interactive charts and graphs"
    ],
    slug: "data-analytics-visualization"
  },
  {
    icon: <Cloud className="h-10 w-10 text-red-500" />,
    title: "Cloud Infrastructure & DevOps",
    description: "Optimized cloud infrastructure and CI/CD pipelines that enhance reliability, scalability, and deployment efficiency.",
    features: [
      "Cloud migration and infrastructure setup",
      "Containerization with Docker and Kubernetes",
      "CI/CD pipeline implementation",
      "Infrastructure as Code (IaC)",
      "Performance monitoring and optimization",
      "Disaster recovery and high availability solutions"
    ],
    slug: "cloud-infrastructure-devops"
  },
  {
    icon: <Cpu className="h-10 w-10 text-red-500" />,
    title: "IoT Development",
    description: "Connect physical devices to the digital world with our IoT solutions that drive innovation and efficiency.",
    features: [
      "IoT device integration and connectivity",
      "Real-time data collection and analysis",
      "Edge computing implementation",
      "Sensor integration and management",
      "IoT dashboard development",
      "Secure IoT communications"
    ],
    slug: "iot-development"
  },
  {
    icon: <Bot className="h-10 w-10 text-red-500" />,
    title: "AI-Powered Automation",
    description: "Streamline operations and reduce manual workloads with intelligent automation systems powered by AI.",
    features: [
      "Workflow automation development",
      "AI-powered business process automation",
      "Robotic Process Automation (RPA)",
      "Intelligent document processing",
      "Conversational AI and chatbots",
      "Custom automation solutions"
    ],
    slug: "ai-powered-automation"
  },
  {
    icon: <Code className="h-10 w-10 text-red-500" />,
    title: "Custom Software Development",
    description: "Tailored software solutions designed to address your specific business challenges and opportunities.",
    features: [
      "Requirements analysis and system design",
      "Agile development methodology",
      "Legacy system modernization",
      "Third-party integrations",
      "Quality assurance and testing",
      "Ongoing maintenance and support"
    ],
    slug: "custom-software-development"
  }
]

export default function ServicesPage() {
  const headingRef = useRef(null)
  const cardsRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true })
  const cardsInView = useInView(cardsRef, { once: true })

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Apply standard background */}
      <StandardBackground />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 gradient-text">
            Our Comprehensive Services
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From cutting-edge AI solutions to beautiful user interfaces, 
            we deliver technology that transforms businesses and creates exceptional digital experiences.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          ref={cardsRef}
          variants={container}
          initial="hidden"
          animate={cardsInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={item}>
              <div className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full hover:border-red-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.1)] hover:shadow-[0_0_30px_rgba(255,0,0,0.2)]">
                <div className="p-3 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors w-fit mb-4">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-3">
                  {service.title}
                </h3>
                
                <p className="text-white/70 mb-4">{service.description}</p>
                
                <div className="border-t border-white/10 pt-4 mt-auto">
                  <h4 className="text-sm font-semibold text-white/90 mb-2">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="ghost" className="text-white hover:text-red-400 hover:bg-white/5 group">
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 w-full py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-red-900/30 to-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12"
          >
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-red-500/10 rounded-full blur-[100px]"></div>
            </div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
              <p className="text-white/70 max-w-2xl mb-8">
                Our team of experts is ready to help you implement the perfect technology solution for your unique challenges.
                Get in touch today to discuss how we can help you achieve your goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button variant="outline" className="border-white/20 hover:border-white/40 text-white px-6 py-2">
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 