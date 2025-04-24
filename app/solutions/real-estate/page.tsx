'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function RealEstateSolutions() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-none">AI-Powered</Badge>
                <Badge className="bg-primary/10 text-primary border-none">Enterprise Ready</Badge>
                <Badge className="bg-primary/10 text-primary border-none">SOC 2 Certified</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Transform Your Real Estate Business with <span className="text-primary">AI Intelligence</span>
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Leverage cutting-edge AI to optimize property management, enhance tenant experiences, and maximize ROI across your portfolio.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Trial
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
                <Button size="lg" variant="outline" className="border-primary/20">
                  Watch Demo
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </Button>
              </div>
              
              <div className="flex items-center gap-4 pt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-primary/10" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="font-medium text-foreground">500+</span> leading real estate companies
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
              <div className="relative bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-border/40 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-sm font-medium">Dashboard Preview</div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-primary/10 rounded" />
                      <div className="h-2 w-1/2 bg-primary/10 rounded" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-primary/10 rounded" />
                      <div className="h-2 w-1/2 bg-primary/10 rounded" />
                    </div>
                  </div>
                  <div className="h-48 bg-primary/5 rounded-lg mb-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-16 bg-primary/5 rounded-lg" />
                    <div className="h-16 bg-primary/5 rounded-lg" />
                    <div className="h-16 bg-primary/5 rounded-lg" />
                  </div>
                </div>
              </div>
              
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -right-8 -top-8 w-16 h-16 bg-primary/10 rounded-full blur-xl"
              />
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -left-8 -bottom-8 w-16 h-16 bg-primary/10 rounded-full blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Platform Capabilities Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-none mb-4">Platform Capabilities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Real Estate Intelligence Platform
            </h2>
            <p className="text-xl text-muted-foreground">
              Our AI-powered platform delivers actionable insights and automation across your entire real estate portfolio.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Property Analytics",
                description: "AI-driven insights for property performance, market trends, and investment opportunities.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Tenant Experience",
                description: "Enhance tenant satisfaction with smart building features and automated services.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Maintenance Automation",
                description: "Predictive maintenance and automated work order management for optimal property upkeep.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )
              },
              {
                title: "Market Intelligence",
                description: "Real-time market data and predictive analytics for informed decision-making.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              },
              {
                title: "Financial Optimization",
                description: "AI-powered financial modeling and ROI analysis for portfolio optimization.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Smart Building Integration",
                description: "Seamless integration with IoT devices and building management systems.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border/40 rounded-xl p-6 hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Advanced AI Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-none mb-4">Advanced AI Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Next-Generation AI for Real Estate
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the power of artificial intelligence in transforming your real estate operations.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* AI Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Predictive Analytics",
                    description: "AI models analyze historical data and market trends to forecast property performance and investment opportunities.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    ),
                    features: [
                      "Property value forecasting",
                      "Rent price optimization",
                      "Market trend analysis",
                      "Investment opportunity scoring"
                    ]
                  },
                  {
                    title: "Natural Language Processing",
                    description: "Advanced NLP capabilities analyze tenant feedback, market reports, and legal documents for actionable insights.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    ),
                    features: [
                      "Sentiment analysis",
                      "Document classification",
                      "Contract analysis",
                      "Automated reporting"
                    ]
                  },
                  {
                    title: "Computer Vision",
                    description: "AI-powered image analysis for property condition assessment, maintenance needs, and virtual tours.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    ),
                    features: [
                      "Property condition assessment",
                      "Maintenance issue detection",
                      "Virtual tour generation",
                      "Space utilization analysis"
                    ]
                  },
                  {
                    title: "Reinforcement Learning",
                    description: "AI systems that learn and optimize property management strategies through continuous interaction.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    features: [
                      "Dynamic pricing optimization",
                      "Resource allocation",
                      "Maintenance scheduling",
                      "Energy consumption optimization"
                    ]
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border/40 rounded-xl p-6 hover:border-primary/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Model Performance */}
              <div className="bg-card border border-border/40 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">AI Model Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Prediction Accuracy</span>
                      <span className="text-sm font-medium">94.5%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '94.5%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Model Training</span>
                      <span className="text-sm font-medium">Last updated: 2 hours ago</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Data Processing Speed</span>
                      <span className="text-sm font-medium">12,000 records/second</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '98%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
              <div className="relative bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-border/40 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-sm font-medium">AI Analytics Dashboard</div>
                </div>
                <div className="p-6">
                  {/* AI Insights Panel */}
                  <div className="space-y-6">
                    <div className="bg-background rounded-lg p-4">
                      <h4 className="font-medium mb-3">Real-Time Market Insights</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Market Sentiment</span>
                          <Badge className="bg-green-500/10 text-green-500 border-none">Positive</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Trend Analysis</span>
                          <Badge className="bg-blue-500/10 text-blue-500 border-none">Upward</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Risk Assessment</span>
                          <Badge className="bg-yellow-500/10 text-yellow-500 border-none">Moderate</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background rounded-lg p-4">
                      <h4 className="font-medium mb-3">Property Intelligence</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Maintenance Predictions</span>
                          <span className="text-sm font-medium">3 upcoming issues</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Energy Optimization</span>
                          <span className="text-sm font-medium">15% potential savings</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Tenant Behavior</span>
                          <span className="text-sm font-medium">Patterns identified</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background rounded-lg p-4">
                      <h4 className="font-medium mb-3">AI Recommendations</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          <div>
                            <h4 className="font-medium">Energy Efficiency Upgrade</h4>
                            <p className="text-sm text-muted-foreground mt-1">Install smart thermostats and LED lighting at Downtown Tower to reduce energy consumption by up to 28%.</p>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Badge className="bg-green-500/10 text-green-500 border-none">ROI: 24%</Badge>
                              <Badge className="bg-blue-500/10 text-blue-500 border-none">Payback: 2.1 years</Badge>
                              <Badge className="bg-purple-500/10 text-purple-500 border-none">ESG Score: +4.5</Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90">
                                Implement
                              </Button>
                              <Button size="sm" variant="outline" className="border-primary/20">
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -right-8 -top-8 w-16 h-16 bg-primary/10 rounded-full blur-xl"
              />
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -left-8 -bottom-8 w-16 h-16 bg-primary/10 rounded-full blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Experience Our Enterprise Suite Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-none mb-4">Enterprise Suite</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Real Estate Enterprise Dashboard
            </h2>
            <p className="text-xl text-muted-foreground">
              Gain complete visibility and control over your entire real estate portfolio with our comprehensive enterprise dashboard.
            </p>
          </motion.div>
          
          <div className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-lg">
            {/* Dashboard Header */}
            <div className="border-b border-border/40 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Real Estate Enterprise Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Last updated: Just now • <span className="text-green-500">Live data</span></p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select className="text-sm p-1 rounded bg-background border border-border">
                  <option>All Properties</option>
                  <option>Commercial Portfolio</option>
                  <option>Residential Portfolio</option>
                  <option>Mixed-Use Portfolio</option>
                </select>
                <Button variant="outline" size="sm" className="border-primary/20">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-primary/20">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Report
                </Button>
                <Button variant="outline" size="sm" className="border-primary/20">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              {/* Quick Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-primary/5 rounded-lg p-4 border border-border/20 hover:border-primary/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Portfolio Value</p>
                      <h4 className="text-2xl font-semibold">$85.7M</h4>
                      <p className="text-xs text-muted-foreground mt-1">YTD Growth: <span className="text-green-500">+12.5%</span></p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-1 mt-2 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 border border-border/20 hover:border-primary/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Occupancy</p>
                      <h4 className="text-2xl font-semibold">94.8%</h4>
                      <p className="text-xs text-muted-foreground mt-1">Month over Month: <span className="text-green-500">+2.3%</span></p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-1 mt-2 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 border border-border/20 hover:border-primary/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">NOI Growth</p>
                      <h4 className="text-2xl font-semibold">18.2%</h4>
                      <p className="text-xs text-muted-foreground mt-1">Year over Year: <span className="text-green-500">+3.2%</span></p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-1 mt-2 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 border border-border/20 hover:border-primary/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">ESG Score</p>
                      <h4 className="text-2xl font-semibold">87/100</h4>
                      <p className="text-xs text-muted-foreground mt-1">Quarter over Quarter: <span className="text-green-500">+5.1%</span></p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-1 mt-2 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Market Analysis Column */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-primary/5 rounded-lg p-4 border border-border/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Market Analysis & Insights</h3>
                      <div className="flex items-center gap-2">
                        <select className="text-sm p-1 rounded bg-background border border-border">
                          <option>Last 30 Days</option>
                          <option>Last 90 Days</option>
                          <option>Last 12 Months</option>
                          <option>YTD</option>
                        </select>
                        <Button variant="outline" size="sm" className="border-primary/20">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-background rounded-lg p-4 border border-border/10">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium">Rental Rate Trends</span>
                          <Badge className="bg-green-500/10 text-green-500 border-none">+5.2% YoY</Badge>
                        </div>
                        <div className="h-40 bg-primary/5 rounded-lg overflow-hidden relative">
                          {/* Simulated Chart - Would be real implementation in production */}
                          <div className="absolute inset-0">
                            <div className="relative h-full w-full">
                              <div className="absolute bottom-0 left-0 right-0 flex items-end h-full">
                                {[35, 45, 30, 50, 60, 45, 55, 65, 70, 60, 75, 80].map((height, i) => (
                                  <div key={i} className="flex-1 mx-px">
                                    <div 
                                      className="bg-primary/80 rounded-t" 
                                      style={{ height: `${height}%` }}
                                    ></div>
                                  </div>
                                ))}
                              </div>
                              {/* Trend Line */}
                              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                <path 
                                  d="M0,80 C40,70 60,85 100,50 L100,100 L0,100 Z" 
                                  fill="rgba(124, 58, 237, 0.1)" 
                                />
                                <path 
                                  d="M0,80 C40,70 60,85 100,50" 
                                  fill="none"
                                  stroke="rgba(124, 58, 237, 0.8)"
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
                            <span>Jan</span>
                            <span className="float-right">Dec</span>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center text-xs text-muted-foreground">
                          <span>Average: $32.50/sq.ft</span>
                          <span>Forecast: <span className="text-green-500">↑</span></span>
                        </div>
                      </div>
                      <div className="bg-background rounded-lg p-4 border border-border/10">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium">Market Absorption Rate</span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-xs">Current</span>
                            <div className="w-2 h-2 rounded-full bg-gray-400 ml-2"></div>
                            <span className="text-xs">Historical</span>
                          </div>
                        </div>
                        <div className="h-40 bg-primary/5 rounded-lg overflow-hidden relative">
                          {/* Absorption Rate Gauge */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-32 h-32">
                              <svg className="w-full h-full" viewBox="0 0 100 100">
                                {/* Background Circle */}
                                <circle 
                                  cx="50" cy="50" r="45" 
                                  fill="none" 
                                  stroke="#e2e8f0" 
                                  strokeWidth="10"
                                />
                                {/* Value Circle - 75% filled */}
                                <circle 
                                  cx="50" cy="50" r="45" 
                                  fill="none" 
                                  stroke="rgba(124, 58, 237, 0.8)" 
                                  strokeWidth="10"
                                  strokeDasharray="282.7"
                                  strokeDashoffset="70.7" 
                                  transform="rotate(-90 50 50)"
                                />
                                <text 
                                  x="50" y="50" 
                                  textAnchor="middle" 
                                  dominantBaseline="middle"
                                  fontSize="20"
                                  fontWeight="bold"
                                  fill="currentColor"
                                >75%</text>
                                <text 
                                  x="50" y="65" 
                                  textAnchor="middle" 
                                  dominantBaseline="middle"
                                  fontSize="10"
                                  fill="currentColor"
                                >Absorption</text>
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-muted-foreground">
                            <span>Market Avg: 68%</span>
                            <span>Your Portfolio: 75%</span>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="bg-green-500/10 rounded p-2 text-center">
                            <span className="text-xs text-muted-foreground">Days on Market</span>
                            <p className="font-medium">32 days</p>
                          </div>
                          <div className="bg-blue-500/10 rounded p-2 text-center">
                            <span className="text-xs text-muted-foreground">Vacancy Time</span>
                            <p className="font-medium">18 days</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Market Competitive Analysis */}
                    <div className="mt-4 bg-background rounded-lg p-4 border border-border/10">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium">Competitive Market Analysis</span>
                        <Badge className="bg-blue-500/10 text-blue-500 border-none">5 Competitors</Badge>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-sm">
                          <thead>
                            <tr className="border-b border-border/10">
                              <th className="text-left py-2 font-medium">Property</th>
                              <th className="text-center py-2 font-medium">Rent/sq.ft</th>
                              <th className="text-center py-2 font-medium">Occupancy</th>
                              <th className="text-center py-2 font-medium">Amenities</th>
                              <th className="text-center py-2 font-medium">Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border/5 bg-primary/5">
                              <td className="py-2 font-medium">Your Portfolio (Avg)</td>
                              <td className="py-2 text-center">$32.50</td>
                              <td className="py-2 text-center">94.8%</td>
                              <td className="py-2 text-center">4.5/5</td>
                              <td className="py-2 text-center">
                                <div className="flex justify-center">
                                  {[1, 2, 3, 4].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b border-border/5">
                              <td className="py-2">Urban Heights</td>
                              <td className="py-2 text-center">$28.75</td>
                              <td className="py-2 text-center">88%</td>
                              <td className="py-2 text-center">3.5/5</td>
                              <td className="py-2 text-center">
                                <div className="flex justify-center">
                                  {[1, 2, 3].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                  {[1, 2].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b border-border/5">
                              <td className="py-2">Metro Lofts</td>
                              <td className="py-2 text-center">$34.25</td>
                              <td className="py-2 text-center">92%</td>
                              <td className="py-2 text-center">4/5</td>
                              <td className="py-2 text-center">
                                <div className="flex justify-center">
                                  {[1, 2, 3, 4].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <Button size="sm" variant="outline" className="mt-3 border-primary/20">
                        View Full Analysis
                      </Button>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 border border-border/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Property Performance</h3>
                      <select className="text-sm p-1 rounded bg-background border border-border">
                        <option>All Properties</option>
                        <option>Downtown Tower</option>
                        <option>Riverside Plaza</option>
                        <option>Harbor View</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-background rounded-lg p-4 border border-border/10 col-span-2">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium">Property Revenue Breakdown</span>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-500/10 text-green-500 border-none">+7.2% YoY</Badge>
                          </div>
                        </div>
                        <div className="h-64 bg-primary/5 rounded-lg overflow-hidden relative">
                          {/* Revenue Breakdown Chart */}
                          <div className="absolute inset-0">
                            <div className="absolute inset-0 flex">
                              {/* Left axis labels */}
                              <div className="py-4 pr-2 flex flex-col justify-between text-xs text-muted-foreground">
                                <span>$1.2M</span>
                                <span>$900K</span>
                                <span>$600K</span>
                                <span>$300K</span>
                                <span>$0</span>
                              </div>
                              {/* Chart area */}
                              <div className="flex-1 py-4">
                                <div className="h-full relative">
                                  {/* Grid lines */}
                                  <div className="absolute inset-0 flex flex-col justify-between">
                                    {[0, 1, 2, 3, 4].map((i) => (
                                      <div key={i} className="border-t border-border/10 h-0"></div>
                                    ))}
                                  </div>
                                  
                                  {/* Stacked bar chart */}
                                  <div className="absolute inset-0 flex items-end justify-around">
                                    {[
                                      { label: 'Q1', data: [250, 180, 120] },
                                      { label: 'Q2', data: [280, 200, 150] },
                                      { label: 'Q3', data: [320, 210, 170] },
                                      { label: 'Q4', data: [350, 230, 190] },
                                    ].map((quarter, i) => (
                                      <div key={i} className="flex flex-col items-center" style={{ width: '60px' }}>
                                        <div className="w-full flex flex-col-reverse">
                                          <div 
                                            className="w-full bg-blue-500 rounded-b" 
                                            style={{ height: `${quarter.data[0] / 12}%` }}
                                          ></div>
                                          <div 
                                            className="w-full bg-purple-500" 
                                            style={{ height: `${quarter.data[1] / 12}%` }}
                                          ></div>
                                          <div 
                                            className="w-full bg-teal-500 rounded-t" 
                                            style={{ height: `${quarter.data[2] / 12}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-xs mt-2">{quarter.label}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-center gap-6">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-teal-500"></div>
                            <span className="text-xs">Residential</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
                            <span className="text-xs">Commercial</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                            <span className="text-xs">Mixed-use</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-background rounded-lg p-4 border border-border/10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Occupancy Rate</span>
                            <span className="text-sm font-medium text-green-500">95.2%</span>
                          </div>
                          <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '95.2%' }} />
                          </div>
                          <div className="mt-3 flex justify-between items-center text-xs text-muted-foreground">
                            <span>Target: 90%</span>
                            <span>+2.1% from last quarter</span>
                          </div>
                        </div>
                        
                        <div className="bg-background rounded-lg p-4 border border-border/10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Tenant Retention</span>
                            <span className="text-sm font-medium text-blue-500">87.5%</span>
                          </div>
                          <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '87.5%' }} />
                          </div>
                          <div className="mt-3 flex justify-between items-center text-xs text-muted-foreground">
                            <span>Target: 85%</span>
                            <span>+3.5% YoY</span>
                          </div>
                        </div>

                        <div className="bg-background rounded-lg p-4 border border-border/10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Maintenance Requests</span>
                            <Badge className="bg-green-500/10 text-green-500 border-none">28 Active</Badge>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Avg Response: 4.2 hrs</span>
                            <span>Avg Resolution: 1.8 days</span>
                          </div>
                          <div className="mt-2 grid grid-cols-3 gap-2">
                            <div className="text-center bg-green-500/10 rounded-lg p-2">
                              <div className="text-sm font-medium text-green-500">14</div>
                              <div className="text-xs">Low</div>
                            </div>
                            <div className="text-center bg-yellow-500/10 rounded-lg p-2">
                              <div className="text-sm font-medium text-yellow-500">10</div>
                              <div className="text-xs">Medium</div>
                            </div>
                            <div className="text-center bg-red-500/10 rounded-lg p-2">
                              <div className="text-sm font-medium text-red-500">4</div>
                              <div className="text-xs">High</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - AI Recommendations */}
                <div className="space-y-6">
                  <div className="bg-primary/5 rounded-lg p-4 border border-border/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h3 className="font-medium">AI Insights & Recommendations</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">Analyzing portfolio</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-background rounded-lg p-4 border border-border/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Energy Efficiency Upgrade</h4>
                              <Badge className="bg-green-500/10 text-green-500 border-none">High Impact</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Install smart thermostats and LED lighting at Downtown Tower to reduce energy consumption by up to 28%.</p>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Badge className="bg-green-500/10 text-green-500 border-none">ROI: 24%</Badge>
                              <Badge className="bg-blue-500/10 text-blue-500 border-none">Payback: 2.1 years</Badge>
                              <Badge className="bg-purple-500/10 text-purple-500 border-none">ESG Score: +4.5</Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90">
                                Implement
                              </Button>
                              <Button size="sm" variant="outline" className="border-primary/20">
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-background rounded-lg p-4 border border-border/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Predictive Maintenance Strategy</h4>
                              <Badge className="bg-blue-500/10 text-blue-500 border-none">Medium Impact</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Implement AI-driven predictive maintenance across all properties to reduce emergency repairs by 65%.</p>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Badge className="bg-green-500/10 text-green-500 border-none">ROI: 32%</Badge>
                              <Badge className="bg-blue-500/10 text-blue-500 border-none">Payback: 1.5 years</Badge>
                              <Badge className="bg-yellow-500/10 text-yellow-500 border-none">Tenant Satisfaction: +12%</Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90">
                                Implement
                              </Button>
                              <Button size="sm" variant="outline" className="border-primary/20">
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-background rounded-lg p-4 border border-border/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Dynamic Pricing Opportunity</h4>
                              <Badge className="bg-purple-500/10 text-purple-500 border-none">Data-Driven</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Market analysis shows Riverside Plaza units are underpriced by 8-12% compared to similar properties.</p>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Badge className="bg-green-500/10 text-green-500 border-none">Revenue: +$245K/year</Badge>
                              <Badge className="bg-blue-500/10 text-blue-500 border-none">Confidence: 92%</Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90">
                                Analyze
                              </Button>
                              <Button size="sm" variant="outline" className="border-primary/20">
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="mt-4 w-full border-primary/20">
                      View All Recommendations (12)
                    </Button>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 border border-border/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h3 className="font-medium">Maintenance & System Alerts</h3>
                      </div>
                      <Badge className="bg-red-500/10 text-red-500 border-none">4 Critical</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-background rounded-lg p-3 border border-border/10 border-l-4 border-l-red-500">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">HVAC Unit #5 Failure Risk</h4>
                              <Badge className="bg-red-500/10 text-red-500 border-none">Critical</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Downtown Tower - Predictive analysis shows 82% probability of failure within 2 weeks</p>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-yellow-500/10 text-yellow-500 border-none">Est. Cost: $8,400</Badge>
                                <Badge className="bg-blue-500/10 text-blue-500 border-none">Affects: 12 units</Badge>
                              </div>
                              <Button size="sm" variant="outline" className="border-primary/20">
                                Schedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-background rounded-lg p-3 border border-border/10 border-l-4 border-l-yellow-500">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Elevator #3 Maintenance Due</h4>
                              <Badge className="bg-yellow-500/10 text-yellow-500 border-none">Scheduled</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Riverside Plaza - Regular maintenance required, currently at 82% of service interval</p>
                            <div className="mt-2 flex items-center justify-between">
                              <Badge className="bg-blue-500/10 text-blue-500 border-none">Scheduled: 07/05/2023</Badge>
                              <Button size="sm" variant="outline" className="border-primary/20">
                                Reschedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-3 border border-border/10 border-l-4 border-l-green-500">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Plumbing System Optimization</h4>
                              <Badge className="bg-green-500/10 text-green-500 border-none">Resolved</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Harbor View - Water pressure optimization completed, resulting in 14% water usage reduction</p>
                            <div className="mt-2 flex items-center justify-between">
                              <Badge className="bg-green-500/10 text-green-500 border-none">Savings: $4,200/year</Badge>
                              <Button size="sm" variant="outline" className="border-primary/20">
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="mt-4 w-full border-primary/20">
                      View All Alerts (18)
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-primary/5 rounded-lg p-4 border border-border/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="font-medium">Investment Analysis Calculator</h3>
                    </div>
                    <Button variant="outline" size="sm" className="border-primary/20">
                      New Analysis
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-background rounded-lg p-4 border border-border/10 col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-medium">Harbor View Office Tower</h4>
                          <p className="text-xs text-muted-foreground mt-1">Acquisition Price: $42.5M | Cap Rate: 5.8%</p>
                        </div>
                        <select className="text-xs p-1 rounded bg-card border border-border">
                          <option>5-Year Projection</option>
                          <option>10-Year Projection</option>
                          <option>Custom Period</option>
                        </select>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-primary/5 rounded p-2">
                            <div className="text-xs text-muted-foreground">Initial Investment</div>
                            <div className="text-sm font-medium">$42.5M</div>
                          </div>
                          <div className="bg-primary/5 rounded p-2">
                            <div className="text-xs text-muted-foreground">Annual NOI</div>
                            <div className="text-sm font-medium">$2.47M</div>
                          </div>
                          <div className="bg-primary/5 rounded p-2">
                            <div className="text-xs text-muted-foreground">Projected Value</div>
                            <div className="text-sm font-medium">$52.8M</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-40 bg-primary/5 rounded-lg overflow-hidden relative">
                        {/* ROI Chart */}
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 flex">
                            <div className="py-4 pr-2 flex flex-col justify-between text-xs text-muted-foreground">
                              <span>20%</span>
                              <span>15%</span>
                              <span>10%</span>
                              <span>5%</span>
                              <span>0%</span>
                            </div>
                            <div className="flex-1 py-4">
                              <div className="h-full relative">
                                {/* Grid lines */}
                                <div className="absolute inset-0 flex flex-col justify-between">
                                  {[0, 1, 2, 3, 4].map((i) => (
                                    <div key={i} className="border-t border-border/10 h-0"></div>
                                  ))}
                                </div>
                                
                                {/* Line chart */}
                                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                                  <path 
                                    d="M0,80 L20,65 L40,60 L60,45 L80,30 L100,20" 
                                    fill="none"
                                    stroke="rgba(124, 58, 237, 0.8)"
                                    strokeWidth="2"
                                  />
                                  <path 
                                    d="M0,80 L20,65 L40,60 L60,45 L80,30 L100,20 L100,100 L0,100 Z" 
                                    fill="rgba(124, 58, 237, 0.1)" 
                                  />
                                </svg>
                                
                                {/* Data points */}
                                {[
                                  { x: 0, y: 80 },
                                  { x: 20, y: 65 },
                                  { x: 40, y: 60 },
                                  { x: 60, y: 45 },
                                  { x: 80, y: 30 },
                                  { x: 100, y: 20 }
                                ].map((point, i) => (
                                  <div 
                                    key={i} 
                                    className="absolute w-2 h-2 bg-primary rounded-full" 
                                    style={{ 
                                      left: `${point.x}%`, 
                                      top: `${point.y}%`, 
                                      transform: 'translate(-50%, -50%)' 
                                    }}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-background rounded-lg p-4 border border-border/10">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium">Investment Returns</span>
                          <Badge className="bg-green-500/10 text-green-500 border-none">Excellent</Badge>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">Cash on Cash Return</span>
                              <span className="text-xs font-medium text-green-500">9.2%</span>
                            </div>
                            <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">IRR (5yr)</span>
                              <span className="text-xs font-medium text-green-500">14.5%</span>
                            </div>
                            <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '76%' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">Equity Multiple</span>
                              <span className="text-xs font-medium text-green-500">1.8x</span>
                            </div>
                            <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">Debt Service Coverage</span>
                              <span className="text-xs font-medium text-green-500">1.5x</span>
                            </div>
                            <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm" variant="default" className="w-full bg-primary hover:bg-primary/90">
                        Run Sensitivity Analysis
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-4 border border-border/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      <h3 className="font-medium">Property Digital Twin</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <select className="text-sm p-1 rounded bg-background border border-border">
                        <option>Downtown Tower</option>
                        <option>Riverside Plaza</option>
                        <option>Harbor View</option>
                      </select>
                      <select className="text-sm p-1 rounded bg-background border border-border">
                        <option>3D Model</option>
                        <option>Floor Plan</option>
                        <option>Systems View</option>
                        <option>Energy Map</option>
                      </select>
                    </div>
                  </div>

                  <div className="h-[280px] bg-background rounded-lg relative overflow-hidden border border-border/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                    
                    {/* Digital Twin Visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Building outline - simplified representation */}
                        <svg className="w-4/5 h-4/5" viewBox="0 0 200 300" fill="none">
                          {/* Building base */}
                          <rect x="40" y="250" width="120" height="30" fill="rgba(124, 58, 237, 0.2)" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="1" />
                          
                          {/* Main building */}
                          <rect x="50" y="50" width="100" height="200" fill="rgba(124, 58, 237, 0.1)" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="1" />
                          
                          {/* Windows */}
                          {Array.from({ length: 10 }).map((_, rowIndex) => (
                            Array.from({ length: 5 }).map((_, colIndex) => (
                              <rect 
                                key={`${rowIndex}-${colIndex}`}
                                x={60 + colIndex * 18} 
                                y={60 + rowIndex * 18} 
                                width="10" 
                                height="10" 
                                fill={rowIndex % 3 === 0 && colIndex % 2 === 0 ? "rgba(255, 80, 80, 0.3)" : "rgba(124, 58, 237, 0.2)"} 
                                stroke={rowIndex % 3 === 0 && colIndex % 2 === 0 ? "rgba(255, 80, 80, 0.5)" : "rgba(124, 58, 237, 0.3)"} 
                                strokeWidth="0.5"
                              />
                            ))
                          ))}
                          
                          {/* Roof */}
                          <rect x="50" y="30" width="100" height="20" fill="rgba(124, 58, 237, 0.2)" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="1" />
                          
                          {/* HVAC */}
                          <rect x="60" y="35" width="20" height="10" fill="rgba(255, 80, 80, 0.3)" stroke="rgba(255, 80, 80, 0.5)" strokeWidth="1" />
                        </svg>
                        
                        {/* Alerts */}
                        <div className="absolute top-1/4 left-1/3 w-6 h-6 rounded-full bg-red-500/20 border-2 border-red-500 animate-pulse">
                          <div className="absolute inset-0 animate-ping rounded-full bg-red-500/20" />
                        </div>
                        <div className="absolute top-1/2 right-1/3 w-6 h-6 rounded-full bg-yellow-500/20 border-2 border-yellow-500 animate-pulse">
                          <div className="absolute inset-0 animate-ping rounded-full bg-yellow-500/20" />
                        </div>
                        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-green-500/20 border-2 border-green-500 animate-pulse">
                          <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded p-2 border border-border/20">
                      <div className="text-xs font-medium mb-1">System Status</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <span>Critical Alert (2)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <span>Warning (4)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span>Optimal (18)</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <Button size="icon" variant="outline" className="w-8 h-8 rounded-full bg-background/80">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </Button>
                      <Button size="icon" variant="outline" className="w-8 h-8 rounded-full bg-background/80">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </Button>
                      <Button size="icon" variant="outline" className="w-8 h-8 rounded-full bg-background/80">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-none mb-4">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover how leading real estate companies are transforming their operations with our platform.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: "RealtyGroup International",
                role: "Portfolio Manager",
                quote: "The AI-powered insights have transformed how we manage our properties. We've seen a 30% increase in operational efficiency.",
                results: [
                  { label: "ROI Increase", value: "25%" },
                  { label: "Time Saved", value: "40%" },
                  { label: "Tenant Satisfaction", value: "95%" }
                ]
              },
              {
                company: "Urban Horizon Properties",
                role: "Operations Director",
                quote: "The predictive maintenance features have reduced our maintenance costs by 35% while improving tenant satisfaction.",
                results: [
                  { label: "Maintenance Costs", value: "-35%" },
                  { label: "System Uptime", value: "99.9%" },
                  { label: "Energy Savings", value: "20%" }
                ]
              },
              {
                company: "Global Capital Partners",
                role: "Investment Director",
                quote: "The market intelligence tools have helped us identify and capitalize on emerging opportunities faster than ever.",
                results: [
                  { label: "Deal Volume", value: "+50%" },
                  { label: "ROI", value: "32%" },
                  { label: "Time to Close", value: "-40%" }
                ]
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border/40 rounded-xl p-6 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {testimonial.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.company}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                
                <div className="space-y-2">
                  {testimonial.results.map((result, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{result.label}</span>
                      <span className="font-medium">{result.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action & Contact Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-primary/5 py-20">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div 
            className="absolute right-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                  <div className="flex-1">
                    <Badge className="bg-primary/20 text-primary border-none mb-4">Enterprise Ready</Badge>
                    <h2 className="text-3xl font-bold mb-4">Transform Your Real Estate Operations Today</h2>
                    <p className="text-muted-foreground mb-6">
                      Schedule a personalized demo with our solution experts and discover how our AI-powered platform can revolutionize your real estate business.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Custom implementation plan for your specific needs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Priority onboarding with dedicated specialist</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>30-day money-back guarantee</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
                        Request Demo
                      </Button>
                      <Button size="lg" variant="outline" className="border-primary/20">
                        View Pricing
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-background/40 backdrop-blur-sm rounded-lg border border-border/40 p-6">
                      <h3 className="text-lg font-medium mb-4">Contact Our Solution Experts</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground block mb-1">Full Name</label>
                          <input type="text" className="w-full p-2 rounded bg-background border border-border" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground block mb-1">Work Email</label>
                          <input type="email" className="w-full p-2 rounded bg-background border border-border" placeholder="john@company.com" />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground block mb-1">Company</label>
                          <input type="text" className="w-full p-2 rounded bg-background border border-border" placeholder="ABC Properties" />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground block mb-1">Number of Properties</label>
                          <select className="w-full p-2 rounded bg-background border border-border">
                            <option>1-10 properties</option>
                            <option>11-50 properties</option>
                            <option>51-200 properties</option>
                            <option>201+ properties</option>
                          </select>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Schedule Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-card border border-border/40 rounded-lg p-5 flex flex-col items-center text-center"
              >
                <div className="mb-3 p-3 rounded-full bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Sales Inquiries</h3>
                <p className="text-muted-foreground mb-3 text-sm">Speak with our sales team about your specific requirements</p>
                <a href="tel:+18005551234" className="text-primary">+1 (800) 555-1234</a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-card border border-border/40 rounded-lg p-5 flex flex-col items-center text-center"
              >
                <div className="mb-3 p-3 rounded-full bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Support Team</h3>
                <p className="text-muted-foreground mb-3 text-sm">Our support team is available 24/7 for technical assistance</p>
                <a href="mailto:support@mindscape.ai" className="text-primary">support@mindscape.ai</a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-card border border-border/40 rounded-lg p-5 flex flex-col items-center text-center"
              >
                <div className="mb-3 p-3 rounded-full bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Resources</h3>
                <p className="text-muted-foreground mb-3 text-sm">Access documentation, guides, and training materials</p>
                <a href="#" className="text-primary">docs.mindscape.ai</a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 