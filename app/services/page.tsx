"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
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
  Bot,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { StandardBackground } from "@/components/shared/background"
import { getContainerClasses } from "@/lib/container-utils"

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

// Service categories
const categories = [
  { id: "all", name: "All Services" },
  { id: "web", name: "Web & Mobile" },
  { id: "ai", name: "AI & Automation" },
  { id: "infrastructure", name: "Infrastructure & Security" },
  { id: "data", name: "Data & Analytics" }
]

// Case studies data
const caseStudies = [
  {
    title: "Enterprise SaaS Platform",
    category: "Web Application Development",
    description: "Designed and developed a scalable SaaS platform for a Fortune 500 company, resulting in 45% improved operational efficiency.",
    image: "/images/services/Enterprise SaaS Platform.png"
  },
  {
    title: "AI-Powered Analytics Dashboard",
    category: "AI Solutions & Data Analytics",
    description: "Built a custom analytics system with AI-driven insights that increased decision-making speed by 67%.",
    image: "/images/services/AI-Powered Analytics Dashboard.png"
  },
  {
    title: "Secure FinTech Mobile App",
    category: "Mobile App & Cybersecurity",
    description: "Developed a financial services mobile application with enterprise-grade security, achieving SOC2 compliance.",
    image: "/images/services/Secure FinTech Mobile App.png"
  }
]

// Testimonials data
const testimonials = [
  {
    quote: "Working with the team transformed our entire digital infrastructure. The expertise and attention to detail were exceptional.",
    author: "Sarah Johnson",
    title: "CTO, Nexus Enterprises",
    avatar: "/images/services/testimonial-1.jpg" // Updated image path
  },
  {
    quote: "The AI solutions implemented helped us reduce manual processing by 78% while improving accuracy. Outstanding results.",
    author: "Michael Chen",
    title: "Director of Innovation, TechGlobe",
    avatar: "/images/services/testimonial-2.jpg" // Updated image path
  },
  {
    quote: "From concept to deployment, the team delivered our mobile application ahead of schedule and beyond our expectations.",
    author: "Elena Rodriguez",
    title: "Product Manager, FinanceFlow",
    avatar: "/images/services/testimonial-3.jpg" // Updated image path
  }
]

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
    slug: "web-application-development",
    category: "web",
    image: "/images/services/web_application_development.png"
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
    slug: "ux-ui-design",
    category: "web",
    image: "/images/services/UXUI Design.png"
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
    slug: "generative-ai-solutions",
    category: "ai",
    image: "/images/services/Generative AI Solutions.png"
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
    slug: "desktop-application-development",
    category: "web",
    image: "/images/services/Enterprise SaaS Platform.png"
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
    slug: "mobile-app-development",
    category: "web",
    image: "/images/services/Mobile App Development.png"
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
    slug: "database-backend-solutions",
    category: "infrastructure",
    image: "/images/services/Database & Backend Solutions.png"
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
    slug: "cybersecurity-services",
    category: "infrastructure",
    image: "/images/services/Secure FinTech Mobile App.png"
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
    slug: "data-analytics-visualization",
    category: "data",
    image: "/images/services/Data Analytics & Visualization.png"
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
    slug: "cloud-infrastructure-devops",
    category: "infrastructure",
    image: "/images/services/Cloud Infrastructure & DevOps.png"
  },
  {
    icon: <Cpu className="h-10 w-10 text-red-500" />,
    title: "IoT Development",
    description: "Connect physical devices to the digital world with our IoT solutions that drive innovation and efficiency.",
    features: [
      "IoT device integration and connectivity",
      "Real-time data processing and analytics",
      "Embedded systems development",
      "Sensor integration and calibration",
      "Edge computing solutions",
      "IoT security and compliance"
    ],
    slug: "iot-development",
    category: "infrastructure",
    image: "/images/services/IoT Development.png"
  },
  {
    icon: <Bot className="h-10 w-10 text-red-500" />,
    title: "AI-Powered Automation",
    description: "Streamline operations and enhance productivity with intelligent automation solutions powered by artificial intelligence.",
    features: [
      "Robotic Process Automation (RPA)",
      "Workflow optimization",
      "Intelligent document processing",
      "AI-powered decision support",
      "Business process automation",
      "Custom automation solutions"
    ],
    slug: "ai-powered-automation",
    category: "ai",
    image: "/images/services/AI-Powered Automation.png"
  },
  {
    icon: <Code className="h-10 w-10 text-red-500" />,
    title: "Custom Software Development",
    description: "Tailored software solutions designed and built to address your unique business challenges and requirements.",
    features: [
      "Requirements analysis and planning",
      "Agile development methodology",
      "Quality assurance and testing",
      "Enterprise software integration",
      "Legacy system modernization",
      "Post-launch support and maintenance"
    ],
    slug: "custom-software-development",
    category: "web",
    image: "/images/services/Enterprise SaaS Platform.png"
  }
]

// Function to render a service card
function ServiceCard({ service }: { service: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      variants={item}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-background/10 backdrop-blur-sm shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 duration-300"
      style={{
        boxShadow: "0 10px 30px -15px rgba(255, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.image || "/images/services/service-placeholder.svg"}
          alt={service.title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e: any) => {
            e.currentTarget.src = "/images/services/service-placeholder.svg";
          }}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
        <div className="absolute left-4 top-4 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110 z-10">
          {service.icon}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col justify-between p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <h3 className="mb-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">{service.title}</h3>
          <p className="mb-4 text-white/70">{service.description}</p>
        </div>
        <div className="mt-2 relative z-10">
          <Link href={`/services/${service.slug}`} className="group inline-flex items-center">
            <span className="text-sm font-medium text-red-400 transition-colors duration-300 group-hover:text-red-300">Learn more</span>
            <ArrowRight className="ml-1 h-4 w-4 text-red-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// Function to render a case study card
function CaseStudyCard({ study }: { study: any }) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={study.image || "/images/services/service-placeholder.svg"}
          alt={study.title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // @ts-ignore - set fallback on error
            e.currentTarget.src = "/images/services/service-placeholder.svg";
          }}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <Badge variant="secondary" className="mb-2">{study.category}</Badge>
        <h3 className="mb-2 text-xl font-bold text-white">{study.title}</h3>
        <p className="text-white/90">{study.description}</p>
      </div>
    </div>
  )
}

// Function to render a testimonial card
function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="flex flex-col rounded-lg bg-card p-6 shadow-md">
      <div className="mb-4 text-lg font-medium text-card-foreground">"{testimonial.quote}"</div>
      <div className="mt-auto flex items-center">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar || "/images/services/service-placeholder.svg"}
            alt={testimonial.author}
            width={40}
            height={40}
            className="h-full w-full object-cover"
            onError={(e) => {
              // @ts-ignore - set fallback on error
              e.currentTarget.src = "/images/services/service-placeholder.svg";
            }}
            unoptimized
          />
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-foreground">{testimonial.author}</div>
          <div className="text-xs text-muted-foreground">{testimonial.title}</div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const ref = useRef(null)
  const casesRef = useRef(null)
  const testimonialsRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const casesInView = useInView(casesRef, { once: true, amount: 0.2 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })
  
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <StandardBackground />
      
      {/* Hero Section with Image */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] opacity-80" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] opacity-70" />
        
        <div className={getContainerClasses({ fullWidth: false })}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="z-10"
            >
              <Badge className="bg-red-500/10 text-red-400 border-red-500/20 mb-6">OUR SERVICES</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Enterprise-grade solutions for the <span className="text-red-500 relative">
                  digital age
                  <span className="absolute -inset-1 bg-red-500/20 blur-md rounded-lg -z-10"></span>
              </span>
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                We deliver cutting-edge technology solutions that transform businesses, streamline operations, and drive innovation across your enterprise.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/20">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="#services" scroll={false}>
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 hover:border-red-500/30">
                    Explore Services
                  </Button>
                </Link>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-white/60 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-500" />
                  Trusted by 500+ global enterprises
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  {['Adobe', 'Microsoft', 'IBM', 'Salesforce', 'Oracle'].map((company, i) => (
                    <div key={i} className="h-8 flex items-center">
                      <span className="text-white/40 font-medium">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 hidden lg:block"
            >
              <div className="relative h-[500px] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-transparent z-10" />
                
                <Image 
                  src="/images/services-hero.svg" // Using placeholder SVG
                  alt="Enterprise digital solutions"
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
                
                <div className="absolute bottom-6 left-6 z-20 max-w-[80%]">
                  <Badge className="bg-red-500 text-white border-none mb-3">ENTERPRISE SOLUTIONS</Badge>
                  <h3 className="text-xl font-bold text-white">Custom digital solutions tailored to your business needs</h3>
                </div>
              </div>
            
            <motion.div
                className="absolute -bottom-4 -right-4 w-64 bg-gradient-to-br from-red-500 to-black p-4 rounded-lg shadow-xl border border-white/10 backdrop-blur-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-red-500/20">
                    <Star className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Enterprise-grade Security</h4>
                    <p className="text-xs text-white/70">SOC2 certified & GDPR compliant solutions</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Tabbed Section */}
      <section 
        ref={ref}
        id="services" 
        className="py-20 relative"
      >
        <div className={getContainerClasses({ fullWidth: false })}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 mb-4">OUR EXPERTISE</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Service Portfolio</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From web applications to AI solutions, we offer a full spectrum of technology services to help your business thrive in the digital economy.
            </p>
          </motion.div>
          
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-3xl mx-auto bg-black/50 p-1 backdrop-blur-md border border-white/10 rounded-lg">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-md py-2"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
                  {services
                    .filter(service => category.id === "all" || service.category === category.id)
                    .map((service, index) => (
                      <ServiceCard key={service.slug} service={service} />
                    ))}
              </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
      {/* Featured Case Studies */}
      <section 
        ref={casesRef}
        className="py-20 relative bg-gradient-to-b from-black to-red-950/20"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
        
        <div className={getContainerClasses({ fullWidth: false })}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={casesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 relative z-10"
          >
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 mb-4">CASE STUDIES</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Work in Action</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore real-world examples of how our services have helped businesses achieve their digital transformation goals.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} study={study} />
            ))}
          </div>
          
          <div className="text-center mt-12 relative z-10">
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 hover:border-red-500/30">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="py-20 relative"
      >
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] opacity-30" />
        
        <div className={getContainerClasses({ fullWidth: false })}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 mb-4">TESTIMONIALS</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Don't just take our word for it — hear from the enterprises we've helped transform.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced CTA Section */}
      <section className="py-24 relative bg-gradient-to-b from-black to-red-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15),transparent)]" />
        
        <div className={getContainerClasses({ fullWidth: false })}>
          <div className="max-w-4xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500/20 rounded-full blur-[100px]" />
              
              <div className="relative z-10">
                <Badge className="bg-red-500/10 text-red-400 border-red-500/20 mb-6">GET STARTED</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
                <p className="text-xl text-white/70 mb-8 max-w-2xl">
                  Contact us today to discuss how our enterprise-grade services can help you achieve your digital transformation goals.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/20">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 hover:border-red-500/30">
                    View Our Process
            </Button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Enterprise Clients", value: "500+" },
                    { label: "Years of Experience", value: "15+" },
                    { label: "Success Rate", value: "98%" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-3xl font-bold text-red-400">{stat.value}</p>
                      <p className="text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 