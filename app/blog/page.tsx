"use client"

import { useState, useEffect } from "react"
import Image from "next/image";
import Link from "next/link"
import MainNavigation from "@/components/main-navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Search, 
  BookOpen,
  FileText,
  Video,
  Podcast,
  Newspaper,
  TrendingUp,
  Share2,
  ThumbsUp,
  BookmarkIcon,
  Filter,
  SlidersHorizontal
} from "lucide-react"
import { motion } from "framer-motion"
import { StandardBackground, SectionBackground } from "@/components/shared/background"

const latestBlogPosts = [
  {
    id: 1,
    title: "The Convergence of AI and Blockchain: Revolutionizing Digital Trust",
    excerpt: "Explore how AI and blockchain technologies are combining to create new paradigms of digital trust and automation.",
    category: "ai-research",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
    date: "March 15, 2024",
    readTime: "10 min",
    author: {
      name: "Dr. Sarah Chen",
      role: "AI & Blockchain Researcher",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2361&auto=format&fit=crop"
    },
    stats: {
      views: "12.5K",
      likes: "2.3K",
      shares: "1.1K"
    }
  },
  {
    id: 2,
    title: "Zero-Knowledge Proofs: The Future of Privacy in AI Systems",
    excerpt: "How zero-knowledge proofs are enabling private and secure AI computations in decentralized networks.",
    category: "industry",
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=2070&auto=format&fit=crop",
    date: "March 14, 2024",
    readTime: "8 min",
    author: {
      name: "Alex Rivera",
      role: "Privacy Tech Lead",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    stats: {
      views: "9.8K",
      likes: "1.8K",
      shares: "850"
    }
  },
  {
    id: 3,
    title: "Quantum-Resistant Blockchain: Preparing for the Post-Quantum Era",
    excerpt: "Understanding the implications of quantum computing on blockchain security and exploring quantum-resistant solutions.",
    category: "ai-research",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    date: "March 13, 2024",
    readTime: "12 min",
    author: {
      name: "Dr. Marcus Wong",
      role: "Quantum Computing Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop"
    },
    stats: {
      views: "15.2K",
      likes: "3.1K",
      shares: "1.4K"
    }
  },
  {
    id: 4,
    title: "AI-Driven Market Analysis: Predicting Blockchain Trends",
    excerpt: "How advanced AI algorithms are being used to predict market movements and optimize trading strategies in crypto markets.",
    category: "market-analysis",
    image: "https://images.unsplash.com/photo-1642059905896-3d509597a2a3?q=80&w=2069&auto=format&fit=crop",
    date: "March 10, 2024",
    readTime: "9 min",
    author: {
      name: "Emma Johnson",
      role: "Financial Analytics Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
    },
    stats: {
      views: "8.7K",
      likes: "1.5K",
      shares: "720"
    }
  },
  {
    id: 5,
    title: "The State of Enterprise Blockchain Adoption in 2024",
    excerpt: "A comprehensive survey of how Fortune 500 companies are implementing blockchain technology and the challenges they face.",
    category: "industry",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
    date: "March 8, 2024",
    readTime: "11 min",
    author: {
      name: "James Wilson",
      role: "Enterprise Solutions Director",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop"
    },
    stats: {
      views: "10.2K",
      likes: "1.9K",
      shares: "950"
    }
  },
  {
    id: 6,
    title: "Ethical Considerations in AI-Powered Blockchain Systems",
    excerpt: "Navigating the ethical challenges and governance frameworks for autonomous blockchain systems powered by artificial intelligence.",
    category: "ethics",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
    date: "March 5, 2024",
    readTime: "14 min",
    author: {
      name: "Dr. Sophia Kim",
      role: "AI Ethics Researcher",
      avatar: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=2076&auto=format&fit=crop"
    },
    stats: {
      views: "7.8K",
      likes: "2.1K",
      shares: "1.3K"
    }
  }
];

const resources = [
  {
    title: "Research Papers",
    description: "Latest academic research in AI and blockchain",
    icon: FileText,
    count: "250+ papers",
    type: "research"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step guides and explanations",
    icon: Video,
    count: "100+ videos",
    type: "tutorial"
  },
  {
    title: "Whitepapers",
    description: "Technical documentation and analysis",
    icon: BookOpen,
    count: "50+ papers",
    type: "whitepaper"
  },
  {
    title: "Podcasts",
    description: "Industry insights and discussions",
    icon: Podcast,
    count: "75+ episodes",
    type: "podcast"
  },
  {
    title: "Case Studies",
    description: "Real-world implementation examples",
    icon: Newspaper,
    count: "30+ studies",
    type: "case-study"
  },
  {
    title: "Market Reports",
    description: "Industry trends and analysis",
    icon: TrendingUp,
    count: "40+ reports",
    type: "report"
  }
];

const blogCategories = [
  { id: "all", label: "All Posts" },
  { id: "ai-research", label: "AI Research" },
  { id: "industry", label: "Industry Insights" },
  { id: "market-analysis", label: "Market Analysis" },
  { id: "ethics", label: "Ethics & Governance" },
  { id: "tutorials", label: "Tutorials" }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredPosts = latestBlogPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Apply standard background */}
      <StandardBackground />
      
      <MainNavigation />

      <main className="container mx-auto px-4 py-24 relative z-10">
      {/* Hero Section */}
        <section className="mb-16 relative">
          <SectionBackground />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">INSIGHTS & RESEARCH</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
                Latest <span className="text-red-500">Insights</span> from Our Experts
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Explore cutting-edge research, industry trends, and practical guides from our team of AI and blockchain experts.
              </p>

              <div className="relative max-w-xl mx-auto flex mb-12">
                <Input 
                  type="text"
                  placeholder="Search blog posts..."
                  className="pl-10 bg-black/40 border-white/10 focus:border-red-500/50 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Button className="ml-2 bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105">
                  Search
                </Button>
              </div>
            </motion.div>
            
            <div className="w-full max-w-4xl mx-auto">
              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="bg-black/40 backdrop-blur-md border border-white/10 p-1 w-full flex justify-between overflow-x-auto mb-8 [&::-webkit-scrollbar]:hidden">
                  {blogCategories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex-1 data-[state=active]:bg-red-500/20 data-[state=active]:text-white"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {blogCategories.map(category => (
                  <TabsContent key={category.id} value={category.id}>
                    {/* Tab content is intentionally empty as we're using the 
                        activeCategory state to filter posts separately */}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Featured Posts Grid */}
        <section className="mb-20 relative">
          <SectionBackground />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Articles</h2>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white border border-white/10 hover:bg-white/5">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="ghost" size="sm" className="text-white border border-white/10 hover:bg-white/5">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
            
          {filteredPosts.length > 0 ? (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {filteredPosts.slice(0, 1).map((post) => (
                  <Card key={post.id} className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-red-500/50 transition-colors duration-300 h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative">
                  <img
                          src={post.image}
                          alt={post.title}
                    className="w-full aspect-[16/9] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0">Featured</Badge>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                    </div>
                  </div>

                        <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                        <p className="text-white/70 mb-4">{post.excerpt}</p>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                                src={post.author.avatar}
                                alt={post.author.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                              <p className="font-medium">{post.author.name}</p>
                              <p className="text-sm text-white/60">{post.author.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{post.stats.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="h-4 w-4" />
                              <span>{post.stats.shares}</span>
                            </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
                ))}
                </div>

            <div className="grid grid-cols-1 gap-6">
                  {filteredPosts.slice(1, 3).map((post) => (
                <Card
                      key={post.id}
                  className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-red-500/50 transition-colors duration-300"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                              src={post.image}
                              alt={post.title}
                          className="w-full h-full object-cover aspect-video md:aspect-square"
                        />
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex items-center gap-4 mb-2 text-xs text-white/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                                <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                                <span>{post.readTime}</span>
                          </div>
                        </div>

                            <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                            <p className="text-white/70 text-sm mb-3 line-clamp-2">{post.excerpt}</p>

                            <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          className="p-0 h-auto text-red-500 hover:text-red-400 hover:bg-transparent"
                        >
                          Read more
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>

                              <div className="flex items-center gap-3 text-xs text-white/60">
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>{post.stats.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Share2 className="h-3 w-3" />
                                  <span>{post.stats.shares}</span>
                                </div>
                              </div>
                            </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            </>
          ) : (
              <div className="text-center py-12">
                <p className="text-xl text-white/70">No articles found matching your search criteria.</p>
              <Button 
                onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                }}
                  className="mt-4 bg-red-600 hover:bg-red-700"
              >
                  Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

        {/* Resources Section */}
        <section className="mb-20 relative">
          <SectionBackground />
          <div className="relative z-10">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">RESOURCES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Knowledge Center</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Explore our comprehensive library of resources to deepen your understanding of AI and blockchain technologies.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-red-500/50 transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="mb-4 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors duration-300">
                      <resource.icon className="h-6 w-6 text-red-500" />
              </div>
                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                    <p className="text-white/70 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">{resource.count}</span>
                      <Button variant="ghost" className="p-0 h-auto text-red-500 hover:text-red-400 hover:bg-transparent">
                        Browse
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
              </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* Newsletter Section */}
        <section className="relative">
          <SectionBackground />
          <div className="relative z-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-[0_0_50px_rgba(255,0,0,0.15)]">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-black/60 to-red-950/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,0,0.2)]">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay at the Cutting Edge</h2>
                <p className="text-white/70 mb-6">
                    Get weekly insights on AI, blockchain, and emerging technologies delivered straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input placeholder="Enter your email" className="bg-white/5 border-white/10" />
                    <Button className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap">
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                  <p className="text-white/50 text-sm mt-3">Join 50,000+ technology leaders and innovators.</p>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-3xl opacity-50"></div>
                <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Newsletter" width={500} height={300} className="w-full h-auto rounded-xl border border-white/10 relative z-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  )
}


