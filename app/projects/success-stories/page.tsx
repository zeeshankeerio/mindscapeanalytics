import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ArrowRight,
  Quote,
  Star,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  BarChart2,
  Clock,
  Building2
} from "lucide-react";

export const metadata = {
  title: "Success Stories | Mindscape Analytics",
  description: "Real-world success stories and business transformations powered by our AI and analytics solutions",
};

// Success story data
const successStories = [
  {
    id: "northstar-financial",
    title: "NorthStar Financial Group",
    industry: "Financial Services",
    description: "How AI-powered analytics transformed customer insights and increased revenue by 32%",
    logo: "/images/placeholder.svg",
    metrics: [
      { label: "Revenue Increase", value: "32%" },
      { label: "Customer Retention", value: "27%" },
      { label: "Operational Efficiency", value: "45%" }
    ],
    quote: {
      text: "Mindscape Analytics revolutionized how we understand our customers. The AI-driven insights uncovered opportunities we never knew existed.",
      author: "Sarah Johnson",
      title: "CTO, NorthStar Financial Group"
    },
    color: "blue"
  },
  {
    id: "quantum-healthcare",
    title: "Quantum Healthcare Systems",
    industry: "Healthcare",
    description: "Deploying predictive analytics to improve patient outcomes and reduce operational costs",
    logo: "/images/placeholder.svg",
    metrics: [
      { label: "Cost Reduction", value: "24%" },
      { label: "Diagnosis Accuracy", value: "38%" },
      { label: "Time Savings", value: "65%" }
    ],
    quote: {
      text: "The predictive analytics platform has transformed our ability to provide proactive care while significantly reducing our operational costs.",
      author: "Dr. Michael Chen",
      title: "Medical Director, Quantum Healthcare"
    },
    color: "green"
  },
  {
    id: "velocity-manufacturing",
    title: "Velocity Manufacturing",
    industry: "Manufacturing",
    description: "Optimizing production with real-time analytics and IoT integration",
    logo: "/images/placeholder.svg",
    metrics: [
      { label: "Production Efficiency", value: "47%" },
      { label: "Defect Reduction", value: "59%" },
      { label: "Energy Savings", value: "28%" }
    ],
    quote: {
      text: "The real-time analytics platform has given us unprecedented visibility into our operations, allowing us to optimize every aspect of production.",
      author: "Robert Mendez",
      title: "VP of Operations, Velocity Manufacturing"
    },
    color: "amber"
  },
  {
    id: "nexus-retail",
    title: "Nexus Retail Group",
    industry: "Retail",
    description: "Personalizing customer experiences with AI-driven recommendations",
    logo: "/images/placeholder.svg",
    metrics: [
      { label: "Conversion Rate", value: "41%" },
      { label: "Avg. Order Value", value: "35%" },
      { label: "Customer Satisfaction", value: "87%" }
    ],
    quote: {
      text: "The personalization engine has completely transformed our customer experience. We're seeing engagement metrics we previously thought impossible.",
      author: "Lisa Wong",
      title: "Chief Digital Officer, Nexus Retail"
    },
    color: "purple"
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="relative w-full bg-black pb-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>
      
      {/* Hero section */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-red-900/30 to-red-900/10 text-red-400 border-red-900/30 hover:bg-white/10 backdrop-blur-sm">
              CLIENT SUCCESS
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Success Stories</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Real-world transformations and success stories from organizations leveraging our AI and analytics solutions to drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 transition-all text-white border-none group">
                <span>Schedule a Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                <span>View All Case Studies</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Grid */}
      <div className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16">
              {successStories.map((story, index) => (
                <div 
                  key={story.id} 
                  className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 
                  ${index % 2 === 0 ? 'bg-gradient-to-br from-black/60 to-black/80' : 'bg-gradient-to-tl from-black/60 to-black/80'}`}
                >
                  {/* Accent color */}
                  <div className={`absolute top-0 left-0 w-1 h-full 
                    ${story.color === 'blue' ? 'bg-blue-500/70' : 
                     story.color === 'green' ? 'bg-green-500/70' : 
                     story.color === 'purple' ? 'bg-purple-500/70' : 'bg-amber-500/70'}`
                  }></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <Building2 className={`h-5 w-5 
                          ${story.color === 'blue' ? 'text-blue-500' : 
                          story.color === 'green' ? 'text-green-500' : 
                          story.color === 'purple' ? 'text-purple-500' : 'text-amber-500'}`
                        } />
                        <span className="text-sm text-white/70">{story.industry}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-white">{story.title}</h2>
                      <p className="text-white/70 text-lg">{story.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                        {story.metrics.map((metric, i) => (
                          <div key={i} className="bg-black/30 p-4 rounded-lg">
                            <div className={`text-xl font-bold mb-1 
                              ${story.color === 'blue' ? 'text-blue-400' : 
                              story.color === 'green' ? 'text-green-400' : 
                              story.color === 'purple' ? 'text-purple-400' : 'text-amber-400'}`
                            }>
                              {metric.value}
                            </div>
                            <div className="text-xs text-white/70">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="ghost" className="mt-2 group text-white/80 hover:text-white px-0">
                        <span>Read full case study</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className={`bg-black/30 p-6 rounded-xl border-l-4 
                        ${story.color === 'blue' ? 'border-blue-500' : 
                        story.color === 'green' ? 'border-green-500' : 
                        story.color === 'purple' ? 'border-purple-500' : 'border-amber-500'}`
                      }>
                        <Quote className={`h-6 w-6 mb-4 
                          ${story.color === 'blue' ? 'text-blue-500' : 
                          story.color === 'green' ? 'text-green-500' : 
                          story.color === 'purple' ? 'text-purple-500' : 'text-amber-500'}`
                        } />
                        <p className="text-white/90 text-lg mb-6 italic leading-relaxed">
                          "{story.quote.text}"
                        </p>
                        <div>
                          <div className="font-semibold text-white">{story.quote.author}</div>
                          <div className="text-sm text-white/70">{story.quote.title}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-white/60">
                        <Clock className="h-4 w-4" />
                        <span>Implementation time: 3-6 months</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <span className="text-sm text-white/70">Client satisfaction</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Success Factors */}
      <div className="relative py-16 bg-gradient-to-b from-transparent to-black/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white">
              Our Success Factors
            </h2>
            <p className="text-white/70 text-center mb-12 max-w-3xl mx-auto">
              Consistent elements that drive success across our client engagements
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <TrendingUp className="h-8 w-8 text-red-500" />,
                  title: "Data-Driven Strategy",
                  description: "Aligning analytics capabilities with specific business goals and KPIs"
                },
                {
                  icon: <Building2 className="h-8 w-8 text-blue-500" />,
                  title: "Enterprise Integration",
                  description: "Seamless integration with existing systems and organizational processes"
                },
                {
                  icon: <BarChart2 className="h-8 w-8 text-green-500" />,
                  title: "Actionable Insights",
                  description: "Converting complex data into clear, actionable business recommendations"
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-purple-500" />,
                  title: "Iterative Improvement",
                  description: "Continuous refinement based on performance metrics and feedback"
                },
                {
                  icon: <Clock className="h-8 w-8 text-amber-500" />,
                  title: "Rapid Time-to-Value",
                  description: "Accelerated implementation with quick wins and phased deployment"
                },
                {
                  icon: <Star className="h-8 w-8 text-indigo-500" />,
                  title: "Expert Support",
                  description: "Dedicated teams providing ongoing support and strategic guidance"
                },
              ].map((factor, index) => (
                <Card key={index} className="bg-black/30 border border-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="bg-black/40 p-3 rounded-xl w-fit mb-4">
                      {factor.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{factor.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">{factor.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-red-900/20 via-black/40 to-red-900/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Write Your Success Story?</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Join the growing list of organizations transforming their business with our AI and analytics solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 transition-all text-white border-none">
                <span>Start Your Journey</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                <span>Schedule a Demo</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 