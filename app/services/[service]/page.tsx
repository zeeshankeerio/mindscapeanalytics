"use client"

import { useRef, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion, useInView } from "framer-motion"
import { ArrowLeft } from "lucide-react"
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

// Service data structure for the dynamic route
// This would typically come from a database or CMS
interface ServiceData {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  processSteps: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  caseStudies: {
    title: string;
    description: string;
    result: string;
  }[];
}

// Mock data for demonstration purposes
const servicesData: Record<string, ServiceData> = {
  "web-application-development": {
    title: "Web Application Development",
    description: "Custom web applications built with cutting-edge technologies that deliver exceptional user experiences and scale with your business.",
    longDescription: "Our web application development services focus on creating powerful, scalable, and user-friendly applications that drive business growth and enhance user engagement. We combine technical expertise with innovative design to deliver web applications that not only meet but exceed your expectations.",
    features: [
      "Custom web application development tailored to your business needs",
      "Full-stack development using React, Next.js, Node.js",
      "Progressive Web Apps (PWAs) for offline capabilities",
      "Responsive and accessible user interfaces",
      "REST API and GraphQL integration",
      "Performance optimization and SEO",
      "Secure authentication and authorization",
      "Scalable cloud-based architecture",
      "Database design and implementation",
      "Third-party API integration"
    ],
    benefits: [
      "Increased operational efficiency",
      "Enhanced user experience and engagement",
      "Improved business processes",
      "Scalable solutions that grow with your business",
      "Reduced development and maintenance costs",
      "Competitive advantage in the market"
    ],
    processSteps: [
      {
        title: "Discovery & Research",
        description: "We begin by understanding your business goals, target audience, and specific requirements to create a solid foundation for your web application."
      },
      {
        title: "Planning & Architecture",
        description: "Our experts design the application architecture, select the appropriate technology stack, and create a detailed development roadmap."
      },
      {
        title: "Design & Prototyping",
        description: "We create intuitive user interfaces and interactive prototypes to visualize the application before development begins."
      },
      {
        title: "Development",
        description: "Our development team brings the design to life, writing clean, efficient code that follows best practices and industry standards."
      },
      {
        title: "Testing & QA",
        description: "Rigorous testing ensures your application is bug-free, secure, and provides optimal performance across all devices and browsers."
      },
      {
        title: "Deployment & Launch",
        description: "We handle the deployment process, ensuring a smooth transition to production and minimal downtime."
      },
      {
        title: "Maintenance & Support",
        description: "Our team provides ongoing maintenance and support to keep your application running smoothly and up-to-date."
      }
    ],
    technologies: [
      "React", "Next.js", "Angular", "Vue.js", "Node.js", "Express", "TypeScript", 
      "JavaScript", "HTML5/CSS3", "Tailwind CSS", "Material UI", "MongoDB", 
      "PostgreSQL", "MySQL", "GraphQL", "REST API", "AWS", "Azure", "Firebase", 
      "Docker", "Kubernetes"
    ],
    caseStudies: [
      {
        title: "E-commerce Platform Modernization",
        description: "Rebuilt an outdated e-commerce platform using modern web technologies, resulting in improved performance and user experience.",
        result: "60% increase in conversion rate and 40% decrease in page load times."
      },
      {
        title: "Healthcare Patient Portal",
        description: "Developed a secure patient portal for a healthcare provider, enabling patients to access their medical records and communicate with healthcare professionals.",
        result: "Reduced administrative workload by 35% and improved patient satisfaction scores by 28%."
      }
    ]
  },
  // Additional service data would be defined here for other services
};

export default function ServicePage() {
  const params = useParams();
  const serviceSlug = params.service as string;
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });
  const contentInView = useInView(contentRef, { once: true });

  useEffect(() => {
    // In a real application, this would fetch data from an API
    if (serviceSlug && servicesData[serviceSlug]) {
      setServiceData(servicesData[serviceSlug]);
    }
  }, [serviceSlug]);

  if (!serviceData) {
    return (
      <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
        <StandardBackground />
        <div className="container mx-auto px-4 py-24 relative z-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="mb-8">The service you're looking for doesn't exist or hasn't been added yet.</p>
          <Link href="/services">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <StandardBackground />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <Link href="/services" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Services
        </Link>

        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 gradient-text">
            {serviceData.title}
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            {serviceData.longDescription}
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          ref={contentRef}
          variants={container}
          initial="hidden"
          animate={contentInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Left Column - Features and Benefits */}
          <div className="md:col-span-2 space-y-12">
            {/* Features Section */}
            <motion.div variants={item} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Features & Capabilities</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Process Steps */}
            <motion.div variants={item} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Our Process</h2>
              <div className="space-y-6">
                {serviceData.processSteps.map((step, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 border border-red-500">
                      <span className="text-sm font-bold text-red-500">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-white/70 mt-1">{step.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Case Studies */}
            <motion.div variants={item} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Case Studies</h2>
              <div className="space-y-6">
                {serviceData.caseStudies.map((caseStudy, index) => (
                  <div key={index} className="border-l-2 border-red-500 pl-4">
                    <h3 className="text-lg font-semibold text-white">{caseStudy.title}</h3>
                    <p className="text-white/70 mt-1">{caseStudy.description}</p>
                    <p className="text-red-400 font-medium mt-2">Result: {caseStudy.result}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Benefits and Technologies */}
          <div className="space-y-8">
            {/* Benefits */}
            <motion.div variants={item} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Benefits</h2>
              <ul className="space-y-4">
                {serviceData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                    <span className="text-white/70">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Technologies */}
            <motion.div variants={item} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Technologies We Use</h2>
              <div className="flex flex-wrap gap-2">
                {serviceData.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-white/90">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div variants={item} className="bg-gradient-to-r from-red-900/30 to-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-3 text-white">Ready to get started?</h2>
              <p className="text-white/70 mb-4">Contact us today to discuss your project requirements.</p>
              <Link href="/contact">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
} 