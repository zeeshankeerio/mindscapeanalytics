// The static generation parts need to be in a server component

import { StandardBackground } from "@/components/shared/background"
import ServicePageClient from "./client-page"

// Animation variants and other imports will be moved to the client component

// Service data structure for the dynamic route
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

// Mark this route as dynamically rendered
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function ServicePage({ params }: { params: { service: string } }) {
  const serviceSlug = params.service;
  const serviceData = servicesData[serviceSlug] || null;
  
  // Pass the data to the client component
  return <ServicePageClient serviceData={serviceData} />;
} 