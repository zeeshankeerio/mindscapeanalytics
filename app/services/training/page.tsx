import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  GraduationCap, 
  Users, 
  HeadphonesIcon, 
  BarChart,
  BookOpen,
  LaptopIcon,
  Video,
  MessageCircle,
  PhoneCall,
  Clock,
  Calendar,
  CheckCircle
} from "lucide-react";

export const metadata = {
  title: "Training & Support | Mindscape Analytics",
  description: "Comprehensive training programs and dedicated support for your AI and analytics solutions",
};

export default function TrainingPage() {
  return (
    <div className="relative w-full bg-black pb-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-pink-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-indigo-500/10 blur-[120px]"></div>
      
      {/* Hero section */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-red-900/30 to-red-900/10 text-red-400 border-red-900/30 hover:bg-white/10 backdrop-blur-sm">
              ENTERPRISE SERVICES
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Training & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Support</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Empower your team with expert training and access responsive support to maximize the value of your technology investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 transition-all text-white border-none group">
                <span>Explore Training Programs</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                <span>Contact Support</span>
                <HeadphonesIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Training Programs Section */}
      <div className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Comprehensive Training Programs
              </h2>
              <p className="text-white/70 max-w-3xl mx-auto">
                Our training programs are designed to build your team's capabilities with the right skills for success.
              </p>
            </div>
            
            <Tabs defaultValue="technical" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/10 mb-8">
                <TabsTrigger value="technical" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400">
                  Technical Training
                </TabsTrigger>
                <TabsTrigger value="user" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400">
                  User Training
                </TabsTrigger>
                <TabsTrigger value="leadership" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400">
                  Leadership Training
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="technical" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <GraduationCap className="h-8 w-8 text-cyan-500" />,
                      title: "Advanced AI Developer Training",
                      description: "Deep technical training for developers on our AI and ML frameworks, model development, and integration."
                    },
                    {
                      icon: <LaptopIcon className="h-8 w-8 text-purple-500" />,
                      title: "System Administration",
                      description: "Comprehensive training on managing, monitoring, and maintaining your AI systems and infrastructure."
                    },
                    {
                      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
                      title: "Integration Specialist Certification",
                      description: "Specialized training for technical teams on integrating our solutions with existing systems."
                    },
                    {
                      icon: <BarChart className="h-8 w-8 text-green-500" />,
                      title: "Data Engineering Excellence",
                      description: "Training on data pipeline development, ETL processes, and data quality management."
                    },
                  ].map((program, index) => (
                    <div key={index} className="bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-black/40 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                      <div className="bg-black/40 p-3 rounded-xl w-fit mb-4">
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">{program.title}</h3>
                      <p className="text-white/70 mb-4">{program.description}</p>
                      <Button variant="link" className="text-red-400 p-0 h-auto hover:text-red-300 group">
                        <span>View curriculum</span>
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="user" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Users className="h-8 w-8 text-amber-500" />,
                      title: "End User Essentials",
                      description: "Fundamental training for daily users of our analytics platforms and dashboards."
                    },
                    {
                      icon: <BarChart className="h-8 w-8 text-emerald-500" />,
                      title: "Data Analysis & Reporting",
                      description: "Training on creating reports, analyzing data, and deriving actionable insights."
                    },
                    {
                      icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
                      title: "Feature Masterclass Series",
                      description: "Specialized training on advanced features and capabilities of our platforms."
                    },
                    {
                      icon: <Video className="h-8 w-8 text-pink-500" />,
                      title: "Self-Paced Learning Library",
                      description: "Access to comprehensive video courses and interactive learning materials."
                    },
                  ].map((program, index) => (
                    <div key={index} className="bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-black/40 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                      <div className="bg-black/40 p-3 rounded-xl w-fit mb-4">
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">{program.title}</h3>
                      <p className="text-white/70 mb-4">{program.description}</p>
                      <Button variant="link" className="text-red-400 p-0 h-auto hover:text-red-300 group">
                        <span>Explore training</span>
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="leadership" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Users className="h-8 w-8 text-red-500" />,
                      title: "Executive Briefings",
                      description: "Strategic overviews for executives on leveraging AI and analytics for business growth."
                    },
                    {
                      icon: <BarChart className="h-8 w-8 text-blue-500" />,
                      title: "Analytics for Decision Makers",
                      description: "Training for leaders on using data analytics to drive strategic decision-making."
                    },
                    {
                      icon: <Calendar className="h-8 w-8 text-purple-500" />,
                      title: "Implementation Planning",
                      description: "Workshops for leadership teams on planning and managing AI implementation."
                    },
                    {
                      icon: <BookOpen className="h-8 w-8 text-green-500" />,
                      title: "Technology ROI Mastery",
                      description: "Training on measuring and maximizing return on technology investments."
                    },
                  ].map((program, index) => (
                    <div key={index} className="bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-black/40 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                      <div className="bg-black/40 p-3 rounded-xl w-fit mb-4">
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">{program.title}</h3>
                      <p className="text-white/70 mb-4">{program.description}</p>
                      <Button variant="link" className="text-red-400 p-0 h-auto hover:text-red-300 group">
                        <span>Learn more</span>
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Support Services */}
      <div className="relative py-16 bg-gradient-to-b from-transparent to-black/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Dedicated Support Services
              </h2>
              <p className="text-white/70 max-w-3xl mx-auto">
                We offer multiple tiers of support to ensure you get the assistance you need, when you need it.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
                  title: "Standard Support",
                  description: "Email and ticket-based support with 24-hour response times for non-critical issues.",
                  features: ["Business hours access", "Email support", "Knowledge base", "Community forums"]
                },
                {
                  icon: <HeadphonesIcon className="h-8 w-8 text-purple-500" />,
                  title: "Premium Support",
                  description: "Priority support with faster response times and dedicated support representatives.",
                  features: ["24/7 access", "Priority response", "Phone support", "Quarterly reviews", "Designated contact"]
                },
                {
                  icon: <PhoneCall className="h-8 w-8 text-red-500" />,
                  title: "Enterprise Support",
                  description: "White-glove support experience with guaranteed SLAs and proactive monitoring.",
                  features: ["24/7 emergency support", "1-hour response for critical", "Dedicated team", "Proactive monitoring", "Monthly reviews"]
                },
              ].map((tier, index) => (
                <div key={index} className="bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-black/40 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex flex-col h-full">
                  <div className="bg-black/40 p-3 rounded-xl w-fit mb-4">
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{tier.title}</h3>
                  <p className="text-white/70 mb-6">{tier.description}</p>
                  
                  <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white mb-3">Includes:</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/70">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="mt-6 w-full bg-gradient-to-r from-red-700/80 to-red-600/80 hover:from-red-600 hover:to-red-500 text-white">
                    Get Support
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Training Formats */}
      <div className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Flexible Training Formats
              </h2>
              <p className="text-white/70 max-w-3xl mx-auto">
                Choose the training format that best suits your team's needs and schedule.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Users className="h-8 w-8 text-emerald-500" />,
                  title: "On-site Training",
                  description: "In-person training conducted at your location."
                },
                {
                  icon: <Video className="h-8 w-8 text-blue-500" />,
                  title: "Virtual Live Training",
                  description: "Interactive remote sessions with our expert trainers."
                },
                {
                  icon: <BookOpen className="h-8 w-8 text-amber-500" />,
                  title: "Self-paced Learning",
                  description: "Access to our comprehensive digital learning platform."
                },
                {
                  icon: <Clock className="h-8 w-8 text-indigo-500" />,
                  title: "Hybrid Programs",
                  description: "Combination of live and self-paced learning experiences."
                },
              ].map((format, index) => (
                <div key={index} className="bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-black/40 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                  <div className="bg-black/40 p-3 rounded-xl w-fit mb-4">
                    {format.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{format.title}</h3>
                  <p className="text-white/70 text-sm">{format.description}</p>
                </div>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Empower Your Team?</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Contact us to design a customized training program or learn more about our support offerings.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 transition-all text-white border-none">
                <span>Request Training Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                <span>View Support Plans</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 