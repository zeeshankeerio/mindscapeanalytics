"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, MessageSquare, Phone, MapPin, Calendar, Globe, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactForm from "@/components/contact-form"
import InteractiveMap from "@/components/interactive-map"
import Footer from "@/components/footer"

// Custom Mail component renamed to MailIcon to avoid conflict
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

// Custom Building component
function BuildingIcon(props: any) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("contact")

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [mapRef, mapInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Auto-scroll to contact form if URL has parameters
  useEffect(() => {
    // Check if we have URL parameters for the form
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('interest') || urlParams.has('subject')) {
      // Set active tab to contact
      setActiveTab('contact')
      
      // Scroll to contact form section
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
    <div className="relative">
      <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">GET IN TOUCH</Badge>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Let's Discuss Your <span className="text-red-500">AI Journey</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/70 mb-8"
            >
              Whether you're just starting to explore AI or looking to enhance your existing solutions, our team is here
              to help.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Contact Options */}
      <motion.section
        ref={contactRef}
        id="contact-form-section"
        initial={{ opacity: 0 }}
        animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-black relative overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-black/50 border border-white/10 p-1">
                <TabsTrigger value="contact" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Us
                </TabsTrigger>
                <TabsTrigger value="demo" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Demo
                </TabsTrigger>
                <TabsTrigger value="support" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Support
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="contact" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div variants={container} initial="hidden" animate={contactInView ? "show" : "hidden"}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-white/70 mb-8">
                    Fill out the form and our team will get back to you within 24 hours. We're excited to learn about
                    your AI needs and how we can help.
                  </p>

                  <div className="space-y-6">
                    <motion.div variants={item} className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 rounded-lg">
                          <MailIcon className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email Us</h3>
                        <p className="text-white/70 mb-1">For general inquiries:</p>
                        <a href="mailto:info@mindscape.ai" className="text-red-500 hover:underline">
                          info@mindscape.ai
                        </a>
                      </div>
                    </motion.div>

                    <motion.div variants={item} className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 rounded-lg">
                        <Phone className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Call Us</h3>
                        <p className="text-white/70 mb-1">Monday to Friday, 9am-6pm EST:</p>
                        <a href="tel:+1-555-123-4567" className="text-red-500 hover:underline">
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </motion.div>

                    <motion.div variants={item} className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Visit Us</h3>
                        <p className="text-white/70 mb-1">Our headquarters:</p>
                        <address className="not-italic text-red-500">
                          123 AI Boulevard
                          <br />
                          San Francisco, CA 94105
                          <br />
                          United States
                        </address>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div variants={item} className="mt-12">
                    <h3 className="font-medium mb-4">Global Offices</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                          { city: "New York", country: "USA", icon: <BuildingIcon className="h-4 w-4 text-red-500" /> },
                          { city: "London", country: "UK", icon: <BuildingIcon className="h-4 w-4 text-red-500" /> },
                        {
                          city: "Singapore",
                          country: "Singapore",
                            icon: <BuildingIcon className="h-4 w-4 text-red-500" />,
                        },
                          { city: "Tokyo", country: "Japan", icon: <BuildingIcon className="h-4 w-4 text-red-500" /> },
                      ].map((office, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {office.icon}
                          <span>
                            {office.city}, {office.country}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_30px_rgba(255,0,0,0.15)]"
                >
                  <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
                  <ContactForm />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="demo" className="mt-0">
              {/* Demo scheduling content */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left column content */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Schedule a Demo</h2>
                  <p className="text-white/70 mb-8">
                    Experience our AI solutions in action with a personalized demo tailored to your business needs.
                  </p>

                  <div className="space-y-6">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                      <h3 className="font-medium mb-4">What to Expect</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          </div>
                          <span>A 30-minute personalized demo of our AI platform</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          </div>
                          <span>Q&A session with our AI experts</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          </div>
                          <span>Discussion of your specific business challenges</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          </div>
                          <span>Custom solution recommendations</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                      <h3 className="font-medium mb-4">Available Demo Topics</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "AI Analytics Platform",
                          "Machine Learning Models",
                          "Computer Vision Solutions",
                          "Natural Language Processing",
                          "Predictive Analytics",
                          "Custom AI Development",
                        ].map((topic, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column with form */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_30px_rgba(255,0,0,0.15)]">
                  <h2 className="text-xl font-bold mb-6">Book Your Demo</h2>
                  <ContactForm />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-0">
              {/* Support content */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left column content */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Customer Support</h2>
                  <p className="text-white/70 mb-8">
                    Our dedicated support team is here to help you get the most out of your AI solutions.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 rounded-lg">
                          <MailIcon className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email Support</h3>
                        <p className="text-white/70 mb-1">For technical issues:</p>
                        <a href="mailto:support@mindscape.ai" className="text-red-500 hover:underline">
                          support@mindscape.ai
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 rounded-lg">
                        <Phone className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Phone Support</h3>
                        <p className="text-white/70 mb-1">24/7 for enterprise clients:</p>
                        <a href="tel:+1-555-987-6543" className="text-red-500 hover:underline">
                          +1 (555) 987-6543
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 rounded-lg">
                        <Globe className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Knowledge Base</h3>
                        <p className="text-white/70 mb-1">Explore our documentation:</p>
                        <a href="#" className="text-red-500 hover:underline">
                          docs.mindscape.ai
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 rounded-lg">
                        <Clock className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Support Hours</h3>
                        <p className="text-white/70 mb-1">Standard support:</p>
                        <p>Monday to Friday, 9am-6pm EST</p>
                        <p className="text-white/70 mt-2 mb-1">Enterprise support:</p>
                        <p>24/7/365</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column with form */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_30px_rgba(255,0,0,0.15)]">
                  <h2 className="text-xl font-bold mb-6">Submit a Support Ticket</h2>
                  <ContactForm />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        ref={mapRef}
        initial={{ opacity: 0 }}
        animate={mapInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-black to-black/90 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">LOCATIONS</Badge>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Global <span className="text-red-500">Presence</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/70"
            >
              With offices around the world, we're ready to support your AI journey wherever you are.
            </motion.p>
          </div>

          <InteractiveMap />
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        ref={faqRef}
        initial={{ opacity: 0 }}
        animate={faqInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">FAQ</Badge>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Frequently Asked <span className="text-red-500">Questions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/70"
            >
              Find answers to common questions about our AI solutions and services.
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={faqInView ? "show" : "hidden"}
            className="max-w-3xl mx-auto space-y-6"
          >
            {[
              {
                question: "What industries do you serve?",
                answer:
                  "We work with clients across various industries including finance, healthcare, retail, manufacturing, telecommunications, and more. Our AI solutions are designed to be adaptable to the specific needs and challenges of each industry.",
              },
              {
                question: "How long does implementation typically take?",
                answer:
                  "Implementation timelines vary depending on the complexity of the solution and your specific requirements. Simple integrations can be completed in a few weeks, while more complex enterprise solutions may take 2-3 months. During our initial consultation, we'll provide a more accurate timeline based on your needs.",
              },
              {
                question: "Do you offer custom AI solutions?",
                answer:
                  "Yes, we specialize in developing custom AI solutions tailored to your specific business challenges. Our team works closely with you to understand your needs, design a solution that addresses those needs, and implement it seamlessly into your existing systems.",
              },
              {
                question: "What kind of support do you provide after implementation?",
                answer:
                  "We offer various support options including standard business hours support, 24/7 enterprise support, regular maintenance and updates, performance monitoring, and ongoing optimization. Our goal is to ensure your AI solutions continue to deliver value long after implementation.",
              },
              {
                question: "How do you handle data privacy and security?",
                answer:
                  "Data privacy and security are top priorities for us. We implement robust security measures including encryption, access controls, and regular security audits. We comply with industry standards and regulations such as GDPR, HIPAA, and SOC 2. All client data is handled according to strict confidentiality protocols.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-white/70 mb-6">Still have questions? Our team is here to help.</p>
            <Button className="bg-red-600 hover:bg-red-700 text-white group">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </motion.section>
      </div>

      <Footer />
    </div>
  )
}

