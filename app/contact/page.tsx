"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Heart, 
  Building, 
  Building2, 
  HelpCircle,
  Linkedin,
  MessageSquare,
  Calendar,
  Globe
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactForm from "@/components/contact-form"
import InteractiveMap from "@/components/interactive-map"
import { StandardBackground, SectionBackground } from "@/components/shared/background"

// Custom Mail component
function MailIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

// WhatsApp icon component
function WhatsAppIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2-.5 2.5-1.5" />
    </svg>
  )
}

const contactMethods = [
  {
    icon: <Phone className="h-10 w-10 text-red-500" />,
    title: "Phone Support",
    description: "Our dedicated team is available to assist you via phone during business hours.",
    value: "+1 (888) 123-4567",
    action: "Call us",
    link: "tel:+18881234567"
  },
  {
    icon: <MailIcon className="h-10 w-10 text-red-500" />,
    title: "Email Support",
    description: "Send us an email and we'll get back to you within 24 hours.",
    value: "admin@mindscapeanalytics.com",
    action: "Email us",
    link: "mailto:admin@mindscapeanalytics.com"
  },
  {
    icon: <WhatsAppIcon className="h-10 w-10 text-red-500" />,
    title: "WhatsApp",
    description: "Connect with us instantly via WhatsApp for quick responses.",
    value: "Message us",
    action: "Open WhatsApp",
    link: "https://wa.link/tv0oyw"
  },
  {
    icon: <Linkedin className="h-10 w-10 text-red-500" />,
    title: "LinkedIn",
    description: "Follow us on LinkedIn for updates, insights, and to connect professionally.",
    value: "Mindscape Analytics",
    action: "Visit LinkedIn",
    link: "https://www.linkedin.com/company/mindscapeanalytics/"
  },
]

const additionalContacts = [
  {
    icon: <MessageSquare className="h-10 w-10 text-red-500" />,
    title: "Live Chat",
    description: "Chat with our support team in real-time for immediate assistance.",
    value: "Available 24/7",
    action: "Start chat",
    link: "#chat"
  },
  {
    icon: <Calendar className="h-10 w-10 text-red-500" />,
    title: "Schedule a Call",
    description: "Book a call with our experts at a time that's convenient for you.",
    value: "Book appointment",
    action: "Schedule now",
    link: "#schedule"
  },
  {
    icon: <Globe className="h-10 w-10 text-red-500" />,
    title: "Website",
    description: "Visit our website for more information about our services and solutions.",
    value: "mindscapeanalytics.com",
    action: "Visit site",
    link: "https://mindscapeanalytics.com"
  }
]

const faqs = [
  {
    question: "What services does Mindscape offer?",
    answer: "Mindscape offers a comprehensive suite of AI solutions including predictive analytics, computer vision, natural language processing, custom AI model development, and enterprise AI integration services."
  },
  {
    question: "How can I get started with Mindscape's platform?",
    answer: "You can get started by signing up for a free demo account on our website. Our team will then guide you through the onboarding process and help you understand how our platform can address your specific needs."
  },
  {
    question: "Do you offer customized AI solutions?",
    answer: "Yes, we specialize in developing customized AI solutions tailored to meet the unique requirements of your business. Our team works closely with you to understand your challenges and create AI solutions that deliver tangible results."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve a wide range of industries including healthcare, finance, retail, manufacturing, real estate, and more. Our AI solutions are designed to be adaptable to various business domains."
  },
  {
    question: "How long does implementation typically take?",
    answer: "Implementation timelines vary depending on the complexity of the solution and your specific requirements. Simple integrations can be completed in a few weeks, while more complex enterprise solutions may take several months."
  }
]

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("contact")
  
  const heroRef = useRef(null)
  const contactRef = useRef(null)
  const additionalRef = useRef(null)
  const qrRef = useRef(null)
  const formRef = useRef(null)
  const mapRef = useRef(null)
  const faqRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true })
  const contactInView = useInView(contactRef, { once: true })
  const additionalInView = useInView(additionalRef, { once: true })
  const qrInView = useInView(qrRef, { once: true })
  const formInView = useInView(formRef, { once: true })
  const mapInView = useInView(mapRef, { once: true })
  const faqInView = useInView(faqRef, { once: true })
  
  // Auto-scroll to contact form if URL has parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('interest') || urlParams.has('subject')) {
      setActiveTab('contact')
      
      const contactSection = document.getElementById('contact-form-section')
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      }
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <StandardBackground />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-20">
          <SectionBackground />
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">CONTACT US</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 gradient-text">
                Let's <span className="text-red-500">Connect</span>
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Have questions about our solutions or want to discuss how we can help your business?
                Reach out to our team and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Primary Contact Methods */}
            <motion.div
              ref={contactRef}
              variants={container}
              initial="hidden"
              animate={contactInView ? "show" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {contactMethods.map((method, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-black/40 backdrop-blur-md border border-white/10 h-full hover:border-red-500/50 transition-colors duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 rounded-full bg-white/5 w-16 h-16 flex items-center justify-center">
                        {method.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                      <p className="text-white/70 mb-4 flex-grow">{method.description}</p>
                      <div className="mt-auto">
                        <p className="font-semibold text-lg mb-4">{method.value}</p>
                        <Button variant="outline" className="border-red-500 text-white hover:bg-red-500/10" asChild>
                          <a href={method.link} target="_blank" rel="noopener noreferrer">
                            {method.action} <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* WhatsApp QR Code Section */}
            <motion.div
              ref={qrRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: qrInView ? 1 : 0, y: qrInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <div className="bg-white p-4 rounded-xl">
                        <Image 
                          src="/images/whatsapp-qr.png" 
                          alt="WhatsApp QR Code" 
                          width={200} 
                          height={200}
                          className="rounded-md" 
                        />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold mb-4">Scan to Connect on WhatsApp</h2>
                      <p className="text-white/70 mb-6">
                        Scan this QR code with your smartphone camera to instantly connect with our team on WhatsApp. Get quick answers to your questions, real-time support, and personalized assistance.
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                        <a href="https://wa.link/tv0oyw" target="_blank" rel="noopener noreferrer">
                          <WhatsAppIcon className="mr-2 h-5 w-5" /> Connect on WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Contact Options */}
            <motion.div
              ref={additionalRef}
              variants={container}
              initial="hidden"
              animate={additionalInView ? "show" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
            >
              {additionalContacts.map((method, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-black/40 backdrop-blur-md border border-white/10 h-full hover:border-red-500/50 transition-colors duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 rounded-full bg-white/5 w-16 h-16 flex items-center justify-center">
                        {method.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                      <p className="text-white/70 mb-4 flex-grow">{method.description}</p>
                      <div className="mt-auto">
                        <p className="font-semibold text-lg mb-4">{method.value}</p>
                        <Button variant="outline" className="border-red-500 text-white hover:bg-red-500/10" asChild>
                          <a href={method.link}>
                            {method.action} <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Tabs Section */}
            <div id="contact-form-section" className="mb-20">
              <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-black/40 border border-white/10 mb-8 mx-auto max-w-md">
                  <TabsTrigger value="contact" className="flex-1">Contact Form</TabsTrigger>
                  <TabsTrigger value="locations" className="flex-1">Our Locations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="contact" className="mt-0">
                  <motion.div
                    ref={formRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: formInView ? 1 : 0, y: formInView ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                      <CardContent className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                        <ContactForm />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="locations" className="mt-0">
                  <motion.div
                    ref={mapRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: mapInView ? 1 : 0, y: mapInView ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                      <CardContent className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-6">Our global offices</h2>
                        <InteractiveMap />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section ref={faqRef} className="py-20 relative">
          <SectionBackground />
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: faqInView ? 1 : 0, y: faqInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">FAQs</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-white/70">
                Find answers to common questions about our services and solutions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: faqInView ? 1 : 0, y: faqInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardContent className="p-6 md:p-8">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10">
                        <AccordionTrigger className="text-lg font-medium py-4">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-white/70 pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: faqInView ? 1 : 0, y: faqInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-white/70 mb-6">
                Our team is ready to help you with any other questions you might have
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white" size="lg" asChild>
                <a href="#contact-form-section">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
} 