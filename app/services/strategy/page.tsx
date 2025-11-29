import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  FileText, 
  LineChart, 
  Clock, 
  CheckCircle, 
  Users, 
  Rocket,
  PieChart
} from "lucide-react";

export const metadata = {
  title: "Strategy & Roadmapping | Mindscape Analytics",
  description: "Expert technology strategy planning and roadmapping services for your enterprise AI needs",
};

export default function StrategyPage() {
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
              ENTERPRISE SERVICES
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Strategy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Roadmapping</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Develop a clear vision and actionable technology roadmap aligned with your business goals, optimized for growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 transition-all text-white border-none group">
                <span>Schedule a Strategy Session</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                <span>Download Service Overview</span>
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key features */}
      <div className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">
              Our Strategic Planning Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <LineChart className="h-8 w-8 text-blue-500" />,
                  title: "Business Assessment",
                  description: "Comprehensive analysis of your current technology landscape, capabilities, and challenges."
                },
                {
                  icon: <PieChart className="h-8 w-8 text-green-500" />,
                  title: "Goal Alignment",
                  description: "Aligning technology initiatives with your business goals and market opportunities."
                },
                {
                  icon: <Clock className="h-8 w-8 text-purple-500" />,
                  title: "Timeline Development",
                  description: "Creating realistic implementation timelines with clear milestones and deliverables."
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-amber-500" />,
                  title: "Success Metrics",
                  description: "Establishing KPIs and success criteria to measure progress and return on investment."
                },
                {
                  icon: <Users className="h-8 w-8 text-indigo-500" />,
                  title: "Stakeholder Engagement",
                  description: "Collaborative approach ensuring all key stakeholders are aligned and engaged."
                },
                {
                  icon: <Rocket className="h-8 w-8 text-red-500" />,
                  title: "Innovation Planning",
                  description: "Identifying opportunities for innovation and competitive differentiation through technology."
                },
              ].map((feature, index) => (
                <div key={index} className="bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-black/40 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                  <div className="bg-black/40 p-3 rounded-xl w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="relative py-16 bg-gradient-to-b from-transparent to-black/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white">
              Benefits of Strategic Roadmapping
            </h2>
            <p className="text-white/70 text-center mb-12 max-w-3xl mx-auto">
              Our strategic roadmapping process delivers clear, actionable plans that drive business growth and technology excellence.
            </p>
            <div className="space-y-6">
              {[
                {
                  title: "Clarity of Vision",
                  description: "Gain a clear understanding of your technology future and how it supports business objectives."
                },
                {
                  title: "Resource Optimization",
                  description: "Prioritize initiatives to maximize ROI and ensure efficient resource allocation."
                },
                {
                  title: "Risk Mitigation",
                  description: "Identify potential challenges and develop strategies to address them proactively."
                },
                {
                  title: "Innovation Acceleration",
                  description: "Create structured approaches to incorporate emerging technologies and innovation."
                },
                {
                  title: "Executive Alignment",
                  description: "Build consensus among leadership teams on technology direction and priorities."
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="mt-1 bg-red-500/10 p-1.5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">{benefit.title}</h3>
                    <p className="text-white/70">{benefit.description}</p>
                  </div>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Build Your Technology Roadmap?</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Connect with our strategic advisors to discuss how we can help you develop a clear path to technology excellence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 transition-all text-white border-none">
                <span>Schedule a Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                <span>View Case Studies</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 