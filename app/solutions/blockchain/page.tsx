"use client"

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  BarChart2, 
  Clock, 
  CreditCard, 
  LineChart, 
  Lock, 
  Share2, 
  Shield, 
  Sparkles,
  Cpu,
  Network,
  Database,
  Key,
  Code2,
  Zap,
  Globe,
  Layers,
  Wallet,
  BarChart3,
  Activity,
  Check,
  Boxes,
  TestTube2,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import EnhancedHeader from "@/components/enhanced-header";
import { SmartContractPlayground } from "@/components/smart-contract-playground";
import { BlockchainVisualizer } from "@/components/blockchain-visualizer";
import { motion } from "framer-motion";

// Set dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function BlockchainSolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedHeader />
      
      {/* Enhanced Hero Section */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Blockchain Platform as a Service
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Enterprise-Grade <span className="text-purple-400">Blockchain</span> Platform
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Complete blockchain infrastructure, development tools, and analytics platform for building and scaling decentralized applications.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-4 min-[400px]:flex-row"
              >
                <Link href="/contact">
                  <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-500/10">
                    Request Demo
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center"
            >
              <Card className="backdrop-blur-sm bg-gray-800/50 border-gray-700 text-white shadow-lg w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Activity className="h-5 w-5" />
                    Platform Performance
                  </CardTitle>
                  <CardDescription className="text-gray-400">Real-time metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-400">Network Throughput</div>
                          <div className="text-2xl font-bold">50,000 TPS</div>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <BarChart3 className="h-6 w-6 text-purple-400" />
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-700 overflow-hidden">
                        <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1 rounded-lg bg-gray-800/50 p-3">
                        <div className="text-xs text-gray-400">Latency</div>
                        <div className="text-sm font-bold">5ms</div>
                      </div>
                      <div className="space-y-1 rounded-lg bg-gray-800/50 p-3">
                        <div className="text-xs text-gray-400">Uptime</div>
                        <div className="text-sm font-bold">99.99%</div>
                      </div>
                      <div className="space-y-1 rounded-lg bg-gray-800/50 p-3">
                        <div className="text-xs text-gray-400">Nodes</div>
                        <div className="text-sm font-bold">10,000+</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PaaS Features */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
              <Sparkles className="mr-2 h-4 w-4" />
              Platform Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Complete Blockchain Development Platform
            </h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl">
              Everything you need to build, deploy, and scale blockchain applications.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paasFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-gray-800 bg-gray-800/50 hover:border-purple-500/50">
                  <CardHeader className="pb-2">
                    <div className="mb-4 w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-purple-400" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                    <div className="mt-4 flex items-center text-sm text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Learn more about {feature.title.toLowerCase()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gray-950">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
              <Sparkles className="mr-2 h-4 w-4" />
              Enterprise Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Advanced Blockchain Infrastructure
            </h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl">
              Our blockchain technology provides unmatched security, scalability, and interoperability for modern businesses.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-gray-800 bg-gray-800/50 hover:border-purple-500/50">
                  <CardHeader className="pb-2">
                    <div className="mb-4 w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-purple-400" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                    <div className="mt-4 flex items-center text-sm text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Learn more about {feature.title.toLowerCase()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Contract Playground */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              <Code2 className="mr-2 h-4 w-4" />
              Interactive Development
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Smart Contract Playground</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              Build, test, and deploy smart contracts directly in your browser with our interactive playground.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-4 w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Code2 className="h-7 w-7 text-purple-800" />
                  </div>
                  <CardTitle>Interactive Development</CardTitle>
                  <CardDescription>Real-time smart contract development and testing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Supported Languages</span>
                        <span className="font-medium">Solidity, Vyper, Rust</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Compilation Speed</span>
                        <span className="font-medium">1s</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-4/5 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Gas Optimization</span>
                        <span className="font-medium">80% Reduction</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-4/5 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-4 w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                    <TestTube2 className="h-7 w-7 text-purple-800" />
                  </div>
                  <CardTitle>Advanced Testing</CardTitle>
                  <CardDescription>Comprehensive testing and debugging tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Test Coverage</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-[95%] rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Security Analysis</span>
                        <span className="font-medium">Real-time</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Debugging Tools</span>
                        <span className="font-medium">Advanced</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <SmartContractPlayground />
          
          <div className="mt-16 flex justify-center">
            <Link href="/docs/smart-contracts">
              <Button variant="outline" className="border-purple-200 text-purple-800 hover:bg-purple-50">
                View Documentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Management & Market Prediction */}
      <section className="w-full py-16 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              <LineChart className="mr-2 h-4 w-4" />
              Advanced Trading Solutions
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Portfolio Management & Market Prediction</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              Leverage AI-powered analytics and real-time market data for intelligent portfolio management and trading decisions.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>AI-Powered Portfolio Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Automated portfolio rebalancing and risk management using advanced AI algorithms.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Risk Assessment</span>
                        <span className="font-medium">Real-time</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-4/5 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Portfolio Diversity</span>
                        <span className="font-medium">Optimized</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-3/4 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Real-Time Market Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Advanced ML models for predicting market movements and identifying trading opportunities.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Prediction Accuracy</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-[85%] rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Data Sources</span>
                        <span className="font-medium">100+</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Automated Trading</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Execute trades automatically based on predefined strategies and market conditions.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Execution Speed</span>
                        <span className="font-medium">50ms</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-4/5 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Success Rate</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-[92%] rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Database className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Market Data Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Comprehensive market data analysis with real-time insights and historical trends.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Data Points</div>
                        <div className="text-2xl font-bold">10M+</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Update Frequency</div>
                        <div className="text-2xl font-bold">100ms</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Layers className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Risk Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Advanced risk assessment and mitigation strategies for secure trading.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Risk Factors</div>
                        <div className="text-2xl font-bold">50+</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Monitoring</div>
                        <div className="text-2xl font-bold">24/7</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/docs/trading">
              <Button variant="outline" className="border-purple-200 text-purple-800 hover:bg-purple-50">
                Learn More About Trading Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blockchain Visualizer */}
      <section className="w-full py-16 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              <Network className="mr-2 h-4 w-4" />
              Network Visualization
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Blockchain Network Visualizer</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              Explore blockchain networks, transactions, and blocks with our interactive visualizer.
            </p>
          </motion.div>
          
          <BlockchainVisualizer />
          
          <div className="mt-16 flex justify-center">
            <Link href="/docs/blockchain">
              <Button variant="outline" className="border-purple-200 text-purple-800 hover:bg-purple-50">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              <Globe className="mr-2 h-4 w-4" />
              Real-World Applications
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Industry Solutions</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              Discover how our blockchain solutions are transforming industries and creating new opportunities.
            </p>
          </motion.div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-purple-400 to-blue-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <useCase.icon className="h-16 w-16 text-white opacity-30" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{useCase.title}</CardTitle>
                    <CardDescription>{useCase.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 mb-4">{useCase.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>ROI: {useCase.roi}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-r from-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-blue-900/50"></div>
        <div className="container px-4 md:px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-8 text-center"
          >
            <div className="inline-flex items-center rounded-lg bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              Ready to Transform?
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Start Your Blockchain Journey Today
            </h2>
            <p className="max-w-[700px] text-gray-200 md:text-xl lg:text-2xl">
              Join the hundreds of businesses already leveraging our blockchain solutions.
            </p>
            <div className="mt-4 grid gap-4 min-[400px]:grid-cols-2">
              <Link href="/contact">
                <Button size="lg" className="w-full bg-white text-purple-900 hover:bg-gray-200">
                  <div className="flex items-center justify-center">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10">
                  <div className="flex items-center justify-center">
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 px-4">
                <div className="text-4xl font-bold text-white">100+</div>
                <p className="text-sm text-gray-200">Enterprise Clients</p>
              </div>
              <div className="flex flex-col items-center space-y-2 px-4">
                <div className="text-4xl font-bold text-white">99.99%</div>
                <p className="text-sm text-gray-200">Uptime Guarantee</p>
              </div>
              <div className="flex flex-col items-center space-y-2 px-4">
                <div className="text-4xl font-bold text-white">24/7</div>
                <p className="text-sm text-gray-200">Expert Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advanced Blockchain Infrastructure */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              <Cpu className="mr-2 h-4 w-4" />
              Advanced Infrastructure
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Enterprise-Grade Blockchain Solutions</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              Scalable, secure, and high-performance blockchain infrastructure for mission-critical applications.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Network className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Multi-Chain Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Interoperable blockchain networks with cross-chain communication and asset transfer.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Supported Chains</span>
                        <span className="font-medium">15+</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Transaction Speed</span>
                        <span className="font-medium">50,000 TPS</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-4/5 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Advanced Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Enterprise-grade security with zero-knowledge proofs and quantum-resistant cryptography.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Security Layers</span>
                        <span className="font-medium">7+</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Compliance</span>
                        <span className="font-medium">100%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Database className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Scalable Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Distributed storage with advanced compression and indexing capabilities.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Storage Capacity</span>
                        <span className="font-medium">PB+</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Query Speed</span>
                        <span className="font-medium">10ms</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-4/5 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Smart Contract Features */}
      <section className="w-full py-16 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              <Code2 className="mr-2 h-4 w-4" />
              Smart Contract Innovation
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Advanced Smart Contract Capabilities</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              Next-generation smart contract features for complex business logic and automation.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Gas Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Advanced gas optimization techniques reducing transaction costs by up to 80%.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Cost Reduction</div>
                        <div className="text-2xl font-bold">80%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Execution Time</div>
                        <div className="text-2xl font-bold">5ms</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Layers className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Modular Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Flexible smart contract modules for rapid development and deployment.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Pre-built Modules</div>
                        <div className="text-2xl font-bold">100+</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Customization</div>
                        <div className="text-2xl font-bold">100%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Analytics & Monitoring */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              <BarChart3 className="mr-2 h-4 w-4" />
              Advanced Analytics
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Real-Time Analytics & Monitoring</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              Comprehensive analytics and monitoring tools for blockchain networks and applications.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Network Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Real-time network performance monitoring and analytics.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Metrics</span>
                        <span className="font-medium">50+</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Update Rate</span>
                        <span className="font-medium">100ms</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-4/5 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Key className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Security Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Advanced security monitoring and threat detection.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Threat Detection</span>
                        <span className="font-medium">Real-time</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Response Time</span>
                        <span className="font-medium">1s</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-4/5 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-purple-800" />
                  </div>
                  <CardTitle>Global Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Global network analytics and performance monitoring.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Regions</span>
                        <span className="font-medium">20+</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Latency</span>
                        <span className="font-medium">50ms</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-4/5 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Tools & SDKs */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              <Code2 className="mr-2 h-4 w-4" />
              Development Tools
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comprehensive Development Suite
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              Everything you need to build and deploy blockchain applications.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {developmentTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                        <tool.icon className="h-6 w-6 text-purple-800" />
                      </div>
                      <div>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tool.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Multi-Chain Support",
    description: "Seamlessly connect and operate across multiple blockchain networks with our unified interface. Support for 15+ major blockchains with cross-chain asset transfers.",
    icon: Share2,
  },
  {
    title: "Advanced Security",
    description: "Enterprise-grade security protocols with multi-signature validation and zero-knowledge proofs. Quantum-resistant cryptography and real-time threat detection.",
    icon: Shield,
  },
  {
    title: "Smart Contract Automation",
    description: "Build, deploy and manage smart contracts with our intuitive automation tools. Includes gas optimization and automated testing frameworks.",
    icon: Code2,
  },
  {
    title: "Tokenization Platform",
    description: "Create and manage digital assets with our comprehensive tokenization infrastructure. Support for multiple token standards and automated compliance checks.",
    icon: Wallet,
  },
  {
    title: "Real-Time Analytics",
    description: "Monitor performance and gain actionable insights with our advanced analytics dashboard. Customizable metrics and automated reporting tools.",
    icon: BarChart3,
  },
  {
    title: "Governance Framework",
    description: "Implement decentralized governance with customizable voting mechanisms and proposal systems. Includes DAO templates and automated execution.",
    icon: Lock,
  },
  {
    title: "High-Performance Nodes",
    description: "Optimized node infrastructure with advanced caching and load balancing. 99.99% uptime guarantee and automated scaling.",
    icon: Cpu,
  },
  {
    title: "Cross-Chain Interoperability",
    description: "Seamless communication and asset transfer between different blockchain networks. Support for atomic swaps and cross-chain messaging.",
    icon: Network,
  },
  {
    title: "Data Privacy",
    description: "Enterprise-grade data encryption and privacy controls for sensitive information. Includes zero-knowledge proofs and secure multi-party computation.",
    icon: Key,
  },
];

const useCases = [
  {
    title: "DeFi Ecosystem",
    subtitle: "Financial Services Transformation",
    description: "A complete infrastructure for lending, borrowing, and trading digital assets with automated yield strategies.",
    roi: "+142% Annual Growth",
    icon: BarChart2,
  },
  {
    title: "Supply Chain Tracking",
    subtitle: "End-to-End Visibility",
    description: "Immutable tracking of goods from manufacturer to consumer, ensuring authenticity and compliance.",
    roi: "47% Cost Reduction",
    icon: Share2,
  },
  {
    title: "DAO Governance",
    subtitle: "Decentralized Decision Making",
    description: "Transparent governance framework allowing stakeholders to propose and vote on organizational changes.",
    roi: "3x Stakeholder Engagement",
    icon: Lock,
  },
  {
    title: "Asset Tokenization",
    subtitle: "Fractional Ownership",
    description: "Convert real-world assets into tradable digital tokens, enabling fractional ownership and liquidity.",
    roi: "78% Increased Liquidity",
    icon: CreditCard,
  },
];

const paasFeatures = [
  {
    title: "Multi-Chain Infrastructure",
    description: "Deploy and manage applications across multiple blockchain networks with unified APIs and tools. Support for 15+ major blockchains with cross-chain interoperability.",
    icon: Network,
  },
  {
    title: "Smart Contract Development",
    description: "Build, test, and deploy smart contracts with our comprehensive development environment. Includes advanced debugging tools and gas optimization features.",
    icon: Code2,
  },
  {
    title: "Node Management",
    description: "Automated node deployment, scaling, and monitoring across multiple networks. Real-time performance metrics and automated failover.",
    icon: Cpu,
  },
  {
    title: "API Gateway",
    description: "RESTful APIs and WebSocket endpoints for seamless blockchain integration. High-performance endpoints with 99.99% uptime guarantee.",
    icon: Share2,
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time monitoring and analytics for network performance and application metrics. Customizable dashboards and automated reporting.",
    icon: BarChart3,
  },
  {
    title: "Security & Compliance",
    description: "Enterprise-grade security features and compliance tools for regulated environments. Includes audit trails and regulatory reporting.",
    icon: Shield,
  },
  {
    title: "Identity Management",
    description: "Secure identity and access management for blockchain applications. Multi-factor authentication and role-based access control.",
    icon: Key,
  },
  {
    title: "Data Storage",
    description: "Distributed storage solutions with advanced indexing and query capabilities. Petabyte-scale storage with 10ms query response times.",
    icon: Database,
  },
  {
    title: "Token Management",
    description: "Create, manage, and track digital assets across multiple networks. Includes token analytics and automated compliance checks.",
    icon: Wallet,
  },
];

const developmentTools = [
  {
    title: "Smart Contract IDE",
    description: "Integrated development environment for smart contracts",
    icon: Code2,
    features: [
      "Visual contract builder",
      "Real-time compilation",
      "Built-in testing framework",
      "Gas optimization tools",
    ],
  },
  {
    title: "SDK Suite",
    description: "Comprehensive SDKs for multiple languages",
    icon: Boxes,
    features: [
      "JavaScript/TypeScript SDK",
      "Python SDK",
      "Java SDK",
      "REST API support",
    ],
  },
  {
    title: "Testing Framework",
    description: "Advanced testing tools for blockchain applications",
    icon: TestTube2,
    features: [
      "Unit testing",
      "Integration testing",
      "Performance testing",
      "Security testing",
    ],
  },
  {
    title: "Deployment Tools",
    description: "Streamlined deployment and management",
    icon: Rocket,
    features: [
      "One-click deployment",
      "Version control",
      "Rollback capabilities",
      "Environment management",
    ],
  },
  {
    title: "Monitoring Suite",
    description: "Real-time monitoring and analytics",
    icon: Activity,
    features: [
      "Performance metrics",
      "Error tracking",
      "Alert system",
      "Log management",
    ],
  },
  {
    title: "Security Tools",
    description: "Comprehensive security solutions",
    icon: Shield,
    features: [
      "Vulnerability scanning",
      "Code analysis",
      "Access control",
      "Audit tools",
    ],
  },
];