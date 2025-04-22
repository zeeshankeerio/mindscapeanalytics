"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, HelpCircle, X, ArrowRight, Brain, Database, LineChart, Shield, Zap, MessageSquare } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import PricingCalculator from "@/components/pricing-calculator"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function PricingPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [plansRef, plansInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [calculatorRef, calculatorInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">PRICING</Badge>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Transparent <span className="text-red-500">Pricing</span> Plans
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/70 mb-8"
            >
              Choose the perfect plan for your business needs with our flexible pricing options.
            </motion.p>

            <PricingToggle />
          </div>
        </div>
      </motion.section>

      {/* Pricing Plans */}
      <motion.section
        ref={plansRef}
        initial={{ opacity: 0 }}
        animate={plansInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-black relative overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Tabs defaultValue="standard" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-black/50 border border-white/10 p-1">
                <TabsTrigger value="standard" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Standard Plans
                </TabsTrigger>
                <TabsTrigger
                  value="enterprise"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Enterprise Solutions
                </TabsTrigger>
                <TabsTrigger
                  value="calculator"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Price Calculator
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="standard" className="mt-0">
              <motion.div
                variants={container}
                initial="hidden"
                animate={plansInView ? "show" : "hidden"}
                className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                {standardPlans.map((plan, index) => (
                  <motion.div key={index} variants={item}>
                    <PricingCard plan={plan} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="enterprise" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)]">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Enterprise Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-6">
                      Our enterprise solutions are tailored to the unique needs of large organizations. We offer custom
                      pricing based on your specific requirements, scale, and objectives.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Enterprise Features</h3>
                        <ul className="space-y-3">
                          {[
                            "Unlimited users and projects",
                            "Custom AI model development",
                            "Dedicated infrastructure",
                            "24/7 premium support",
                            "Dedicated account manager",
                            "Custom SLAs",
                            "On-premises deployment options",
                            "Advanced security features",
                            "Custom integrations",
                            "Quarterly business reviews",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold mb-4">Get a Custom Quote</h3>
                        <p className="text-white/70 mb-6">
                          Our team will work with you to understand your needs and provide a tailored solution and
                          pricing.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                              <Shield className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">Enterprise-grade Security</h4>
                              <p className="text-sm text-white/60">SOC 2, HIPAA, GDPR compliant</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                              <Zap className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">High-performance Infrastructure</h4>
                              <p className="text-sm text-white/60">Dedicated resources for your needs</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                              <Brain className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">Custom AI Development</h4>
                              <p className="text-sm text-white/60">Tailored to your specific use cases</p>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white group">
                          Contact Sales
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Financial Services",
                      description: "AI solutions for fraud detection, risk assessment, and customer insights.",
                      icon: <LineChart className="h-6 w-6 text-red-500" />,
                    },
                    {
                      title: "Healthcare",
                      description:
                        "HIPAA-compliant AI for medical imaging, patient analytics, and operational efficiency.",
                      icon: <Shield className="h-6 w-6 text-red-500" />,
                    },
                    {
                      title: "Manufacturing",
                      description: "AI-powered predictive maintenance, quality control, and supply chain optimization.",
                      icon: <Database className="h-6 w-6 text-red-500" />,
                    },
                  ].map((industry, index) => (
                    <Card key={index} className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="p-3 bg-red-500/10 rounded-lg w-fit mb-4">{industry.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{industry.title}</h3>
                        <p className="text-white/70">{industry.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calculator" className="mt-0">
              <motion.div
                ref={calculatorRef}
                initial={{ opacity: 0, y: 30 }}
                animate={calculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Customize Your Plan</h3>
                  <p className="text-white/70">
                    Use our interactive calculator to estimate pricing based on your specific needs.
                  </p>
                </div>
                <PricingCalculator />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Features Comparison */}
      <motion.section
        ref={featuresRef}
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-black to-black/90 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">FEATURES</Badge>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Compare Plan <span className="text-red-500">Features</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/70"
            >
              A detailed comparison of features available in each pricing plan.
            </motion.p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1"></div>
                {standardPlans.map((plan, index) => (
                  <div key={index} className="col-span-1 text-center">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                  </div>
                ))}
              </div>

              {featureCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">{category.name}</h3>

                  {category.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className={`grid grid-cols-4 gap-4 py-3 ${
                        featureIndex !== category.features.length - 1 ? "border-b border-white/10" : ""
                      }`}
                    >
                      <div className="col-span-1 flex items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2">
                                <span>{feature.name}</span>
                                {feature.tooltip && <HelpCircle className="h-4 w-4 text-white/40" />}
                              </div>
                            </TooltipTrigger>
                            {feature.tooltip && (
                              <TooltipContent>
                                <p className="max-w-xs">{feature.tooltip}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {standardPlans.map((plan, planIndex) => {
                        const planFeature = feature.availability[planIndex]
                        return (
                          <div key={planIndex} className="col-span-1 text-center">
                            {typeof planFeature === "boolean" ? (
                              planFeature ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-500/50 mx-auto" />
                              )
                            ) : (
                              <span>{planFeature}</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
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
              Find answers to common questions about our pricing and plans.
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
                question: "Can I switch plans at any time?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be immediately available, and we'll prorate the difference in price. When downgrading, the changes will take effect at the start of your next billing cycle.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "Yes, we offer a 14-day free trial of our Professional plan with no credit card required. This allows you to explore our platform and features before committing to a paid plan.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards (Visa, Mastercard, American Express, Discover), as well as PayPal. For Enterprise plans, we also offer invoice-based payment options.",
              },
              {
                question: "Are there any long-term contracts?",
                answer:
                  "Our standard plans are available on a month-to-month basis with no long-term commitment required. We also offer annual plans at a discounted rate. Enterprise plans typically have a minimum term of one year.",
              },
              {
                question: "What happens if I exceed my plan limits?",
                answer:
                  "If you approach or exceed your plan limits, we'll notify you and provide options to either upgrade to a higher tier plan or purchase additional capacity as needed. We won't automatically charge you for overages without your consent.",
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
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial={{ opacity: 0 }}
        animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-black to-black/90 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.15),transparent_70%)]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,0,0.2)]"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-white/70 mb-6">
                  Choose the plan that's right for your business and start transforming your operations with AI today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
                    Contact Sales
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-3xl opacity-50"></div>
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="AI Platform"
                  className="w-full h-auto rounded-xl border border-white/10 relative z-10"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      </div>
    </div>
  )
}

// Pricing Toggle Component
function PricingToggle() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="flex items-center justify-center mt-8">
      <span className={`mr-3 ${billingCycle === "monthly" ? "text-white" : "text-white/60"}`}>Monthly</span>
      <Switch
        checked={billingCycle === "yearly"}
        onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
        className="data-[state=checked]:bg-red-500"
      />
      <span className={`ml-3 flex items-center ${billingCycle === "yearly" ? "text-white" : "text-white/60"}`}>
        Yearly
        <Badge className="ml-2 bg-red-500 text-white border-0">Save 20%</Badge>
      </span>
    </div>
  )
}

// Pricing Card Component
function PricingCard({ plan }: { plan: any }) {
  return (
    <div className="relative">
      {plan.popular && (
        <div className="absolute -top-5 inset-x-0 flex justify-center">
          <Badge className="bg-red-500 text-white border-0 px-4 py-1">Most Popular</Badge>
        </div>
      )}

      <Card className={`bg-black/40 backdrop-blur-md border ${plan.borderColor} overflow-hidden h-full relative group`}>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-30 group-hover:opacity-40 transition-opacity duration-300`}
        ></div>

        {/* Glossy reflection */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>

        <CardHeader className="relative z-10 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <p className="text-sm text-white/60 mt-1">{plan.description}</p>
            </div>
            <div className={`p-2 rounded-full ${plan.accentColor} text-white`}>{plan.icon}</div>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">${plan.monthlyPrice}</span>
              <span className="text-white/60 ml-2">/month</span>
            </div>
            <p className="text-sm text-white/60 mt-1">Billed monthly, or ${plan.yearlyPrice}/month billed annually</p>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pt-0">
          <div className="space-y-3">
            {plan.features.map((feature: any, i: number) => (
              <div key={i} className="flex items-start">
                <div
                  className={`mt-1 mr-3 flex-shrink-0 ${feature.included ? plan.accentColor : "bg-white/10"} rounded-full p-1`}
                >
                  {feature.included ? <Check className="h-3 w-3 text-white" /> : <div className="h-3 w-3"></div>}
                </div>
                <div className="flex items-center">
                  <span className={feature.included ? "text-white/90" : "text-white/40 line-through"}>
                    {feature.name}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3.5 w-3.5 text-white/40 ml-1.5 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-black/90 border border-white/10 text-white">
                        <p className="text-xs max-w-[200px] flex items-center gap-1.5">
                          {feature.icon}
                          <span>Details about {feature.name.toLowerCase()}</span>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="relative z-10">
          <Button
            className={`w-full ${plan.popular ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white/10 hover:bg-white/20 text-white"} group`}
          >
            {plan.cta}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Sample pricing data
const standardPlans = [
  {
    name: "Starter",
    description: "Perfect for small teams and startups",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      { name: "Up to 5 team members", included: true, icon: <MessageSquare className="h-3.5 w-3.5" /> },
      { name: "Basic analytics dashboard", included: true, icon: <LineChart className="h-3.5 w-3.5" /> },
      { name: "5 AI model deployments", included: true, icon: <Brain className="h-3.5 w-3.5" /> },
      { name: "100GB data processing", included: true, icon: <Database className="h-3.5 w-3.5" /> },
      { name: "Email support", included: true, icon: <MessageSquare className="h-3.5 w-3.5" /> },
      { name: "Custom AI models", included: false, icon: <Brain className="h-3.5 w-3.5" /> },
      { name: "API access", included: false, icon: <MessageSquare className="h-3.5 w-3.5" /> },
      { name: "Advanced security", included: false, icon: <Shield className="h-3.5 w-3.5" /> },
      { name: "Dedicated account manager", included: false, icon: <MessageSquare className="h-3.5 w-3.5" /> },
    ],
    cta: "Start Free Trial",
    popular: false,
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/20",
    accentColor: "bg-blue-500",
    textColor: "text-blue-500",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses",
    monthlyPrice: 249,
    yearlyPrice: 199,
    features: [
      { name: "Up to 20 team members", included: true, icon: <MessageSquare className="h-3.5 w-3.5" /> },
      { name: "Advanced analytics dashboard", included: true, icon: <LineChart className="h-3.5 w-3.5" /> },
      { name: "20 AI model deployments", included: true, icon: <Brain className="h-3.5 w-3.5" /> },
      { name: "500GB data processing", included: true, icon: <Database className="h-3.5 w-3.5" /> },
      { name: "Priority email & chat support", included: true, icon: <MessageSquare className="h-3.5 w-3.5" /> },
      { name: "Custom AI models", included: true, icon: <Brain className="h-3.5 w-3.5" /> },
      { name: "API access", included: true, icon: <MessageSquare className="h-3.5 w-3.5" /> },
      { name: "Advanced security", included: false, icon: <Shield className="h-3.5 w-3.5" /> },
      { name: "Dedicated account manager", included: false, icon: <MessageSquare className="h-3.5 w-3.5" /> },
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "from-red-500/20 to-red-600/20",
    borderColor: "border-red-500/20",
    accentColor: "bg-red-500",
    textColor: "text-red-500",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    name: "Business",
    description: "For larger teams with advanced needs",
    monthlyPrice: 499,
    yearlyPrice: 399,
    features: [
      { name: "Up to 50 team members", included: true, icon: <MessageSquare className="h-3.5 w-3.5" /> },
      { name: "Custom analytics dashboard", included: true, icon: <LineChart className="h-3.5 w-3.5" /> },
      { name: "Unlimited AI model deployments", included: true, icon: <Brain className="h-3.5 w-3.5" /> },
      { name: "2TB data processing", included: true, icon: <Database className="h-3.5 w-3.5" /> },
      { name: "24/7 priority support", included: true, icon: <MessageSquare className="h-3.5 w-3.5" /> },
      { name: "Custom AI models", included: true, icon: <Brain className="h-3.5 w-3.5" /> },
      { name: "Advanced API access", included: true, icon: <MessageSquare className="h-3.5 w-3.5" /> },
      { name: "Enterprise-grade security", included: true, icon: <Shield className="h-3.5 w-3.5" /> },
      { name: "Dedicated account manager", included: true, icon: <MessageSquare className="h-3.5 w-3.5" /> },
    ],
    cta: "Start Free Trial",
    popular: false,
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/20",
    accentColor: "bg-purple-500",
    textColor: "text-purple-500",
    icon: <Zap className="h-5 w-5" />,
  },
]

// Feature comparison data
const featureCategories = [
  {
    name: "Core Features",
    features: [
      {
        name: "Team Members",
        tooltip: "Number of users who can access the platform",
        availability: ["Up to 5", "Up to 20", "Up to 50"],
      },
      {
        name: "AI Model Deployments",
        tooltip: "Number of AI models you can deploy simultaneously",
        availability: ["5", "20", "Unlimited"],
      },
      {
        name: "Data Processing",
        tooltip: "Monthly data processing capacity",
        availability: ["100GB", "500GB", "2TB"],
      },
      {
        name: "API Access",
        tooltip: "Access to our API for custom integrations",
        availability: [false, true, true],
      },
    ],
  },
  {
    name: "AI Capabilities",
    features: [
      {
        name: "Pre-trained Models",
        tooltip: "Access to our library of pre-trained AI models",
        availability: [true, true, true],
      },
      {
        name: "Custom Model Training",
        tooltip: "Ability to train custom AI models on your data",
        availability: [false, true, true],
      },
      {
        name: "Computer Vision",
        tooltip: "Image recognition and object detection capabilities",
        availability: ["Basic", "Advanced", "Enterprise"],
      },
      {
        name: "Natural Language Processing",
        tooltip: "Text analysis and language generation capabilities",
        availability: ["Basic", "Advanced", "Enterprise"],
      },
      {
        name: "Predictive Analytics",
        tooltip: "Forecast future trends based on historical data",
        availability: ["Basic", "Advanced", "Enterprise"],
      },
    ],
  },
  {
    name: "Support & Security",
    features: [
      {
        name: "Support",
        tooltip: "Level of customer support provided",
        availability: ["Email", "Priority Email & Chat", "24/7 Priority"],
      },
      {
        name: "SLA",
        tooltip: "Service Level Agreement for uptime and support response",
        availability: ["99.5% uptime", "99.9% uptime", "99.99% uptime"],
      },
      {
        name: "Security Features",
        tooltip: "Advanced security features for data protection",
        availability: ["Standard", "Enhanced", "Enterprise-grade"],
      },
      {
        name: "Dedicated Account Manager",
        tooltip: "A dedicated point of contact for your account",
        availability: [false, false, true],
      },
      {
        name: "Audit Logs",
        tooltip: "Detailed logs of all activities for compliance and security",
        availability: ["Basic", "Advanced", "Comprehensive"],
      },
    ],
  },
]

