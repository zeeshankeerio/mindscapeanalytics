"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Briefcase, Building2, Clock, Globe, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FlexibleSection } from "@/components/flexible-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code,
  Palette,
  LayoutDashboard,
  Database,
  Brain,
  Settings
} from "lucide-react"
import { getContainerClasses } from "@/lib/container-utils"

export default function CareersPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px]"></div>

        <div className={getContainerClasses({ fullWidth: true })}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">CAREERS</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Join Our <span className="text-red-500">Mission</span>
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Help us build the future of AI and transform how businesses leverage artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
                Our Culture
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="h-10 w-10 text-red-500" />,
                title: "Collaborative Environment",
                description: "Work with talented individuals who are passionate about AI and innovation.",
              },
              {
                icon: <Globe className="h-10 w-10 text-red-500" />,
                title: "Global Impact",
                description: "Build solutions that transform businesses and industries around the world.",
              },
              {
                icon: <Building2 className="h-10 w-10 text-red-500" />,
                title: "Growth Opportunities",
                description: "Continuous learning and career advancement in a rapidly evolving field.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-red-500/50 transition-colors duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 bg-red-500/10 rounded-lg w-fit group-hover:bg-red-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  {/* Internship Opportunities */}
  <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.05),transparent_70%)]"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px]"></div>

        <div className={getContainerClasses({ fullWidth: true })}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">INTERNSHIPS</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Launch Your <span className="text-red-500">Career</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Gain valuable experience and kickstart your career with our 3-month unpaid internship programs.
              Each intern receives a certificate and recommendation letter upon successful completion.
            </p>
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 backdrop-blur-sm">
              <MapPin className="h-4 w-4 text-red-500" />
              <span>Remote opportunities available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {internshipListings.map((internship, index) => (
              <Card 
                key={index}
                className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-red-500/50 transition-colors duration-300"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="p-3 bg-red-500/10 rounded-lg w-fit group-hover:bg-red-500/20 transition-colors mb-4">
                    {internship.icon}
                  </div>
                  
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold">{internship.title}</h3>
                    <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
                      Unpaid
                    </Badge>
                  </div>
                  
                  <p className="text-white/70 mb-4 flex-grow">{internship.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center text-sm text-white/50">
                      <Clock className="h-4 w-4 mr-1 text-red-500" />
                      3 months
                    </div>
                    <div className="flex items-center text-sm text-white/50">
                      <MapPin className="h-4 w-4 mr-1 text-red-500" />
                      {internship.location}
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="px-0 hover:bg-transparent hover:text-red-400 group mt-auto">
                    Apply Now
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3">How to Apply</h3>
              <p className="text-white/70">
                Please send your resume and a brief cover letter explaining why you're interested in the internship 
                to <span className="text-red-400">internships@mindscapeanalytics.com</span>. Include the specific 
                internship position in the subject line.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  What You'll Receive
                </h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Official internship certificate upon completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Personalized recommendation letter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Hands-on experience with cutting-edge technologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Mentorship from industry professionals</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  Eligibility Criteria
                </h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Currently enrolled in or recently graduated from relevant program</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Strong interest in the specific domain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Ability to commit 15-20 hours per week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Passion for learning and problem-solving</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gradient-to-b from-black to-black/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.1),transparent_70%)]"></div>

        <div className={getContainerClasses({ fullWidth: true })}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">OPEN POSITIONS</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Join Our <span className="text-red-500">Team</span>
            </h2>
            <p className="text-xl text-white/70">
              Explore our current openings and find the perfect role for your skills and interests.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <TabsList className="bg-black/50 border border-white/10 p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  All Departments
                </TabsTrigger>
                <TabsTrigger
                  value="engineering"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Engineering
                </TabsTrigger>
                <TabsTrigger value="research" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Research
                </TabsTrigger>
                <TabsTrigger value="product" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Product
                </TabsTrigger>
                <TabsTrigger value="business" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Business
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-6">
                {jobListings.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </div>
            </TabsContent>

            {["engineering", "research", "product", "business"].map((department) => (
              <TabsContent key={department} value={department} className="mt-0">
                <div className="space-y-6">
                  {jobListings
                    .filter((job) => job.department.toLowerCase() === department)
                    .map((job, index) => (
                      <JobCard key={index} job={job} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

    
      {/* Life at Mindscape */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>

        <div className={getContainerClasses({ fullWidth: true })}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">OUR CULTURE</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Life at <span className="text-red-500">Mindscape</span>
            </h2>
            <p className="text-xl text-white/70">
              We're building a culture that values innovation, collaboration, and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Team Collaboration"
                className="w-full h-auto rounded-xl border border-white/10 mb-6"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                  alt="Office Space"
                  className="w-full h-auto rounded-xl border border-white/10"
                />
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
                  alt="Team Event"
                  className="w-full h-auto rounded-xl border border-white/10"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Our Values</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Innovation",
                    description:
                      "We push the boundaries of what's possible with AI, constantly exploring new ideas and approaches.",
                  },
                  {
                    title: "Collaboration",
                    description:
                      "We believe that diverse perspectives lead to better solutions, and we foster a culture of teamwork and knowledge sharing.",
                  },
                  {
                    title: "Impact",
                    description:
                      "We're driven by the real-world impact of our work, focusing on solutions that create meaningful value for our clients.",
                  },
                  {
                    title: "Growth",
                    description:
                      "We invest in the personal and professional development of our team members, helping them reach their full potential.",
                  },
                ].map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                      <p className="text-white/70">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Benefits & Perks</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Competitive salary",
                    "Flexible work arrangements",
                    "Health & wellness benefits",
                    "Continuous learning budget",
                    "Regular team events",
                    "Modern office spaces",
                    "Stock options",
                    "Paid time off",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,0,0.2)]">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h2>
                <p className="text-white/70 mb-6">
                  Ready to be part of our mission to transform businesses with AI? Explore our open positions and apply
                  today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    View Open Positions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-3xl opacity-50"></div>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="Team Meeting"
                  className="w-full h-auto rounded-xl border border-white/10 relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <FlexibleSection
        fullWidth={true}
        className="py-20 bg-gradient-to-b from-black/90 to-black relative overflow-hidden"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Team Says</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Hear from the talented individuals who make Mindscape Analytics a great place to work.
          </p>
        </div>
      </FlexibleSection>

      {/* FAQ */}
      <FlexibleSection
        fullWidth={true}
        className="py-20 bg-black relative overflow-hidden"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Find answers to common questions about working at Mindscape Analytics.
          </p>
        </div>
      </FlexibleSection>

      {/* Join Us CTA */}
      <FlexibleSection
        fullWidth={true}
        className="py-20 bg-gradient-to-b from-black to-black/90 relative overflow-hidden"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-white/70 max-w-3xl mx-auto mb-8">
            Explore our open positions and apply today to become part of our innovative team.
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
            View Open Positions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </FlexibleSection>
    </main>
  )
}

// Job Card Component
function JobCard({ job }: { job: any }) {
  return (
    <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-red-500/50 transition-colors duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{job.title}</h3>
          <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
            {job.type}
          </Badge>
              </div>
        <p className="text-white/70 mb-6">{job.description}</p>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center text-sm text-white/50">
            <Briefcase className="h-4 w-4 mr-1 text-red-500" />
            {job.department}
              </div>
          <div className="flex items-center text-sm text-white/50">
            <MapPin className="h-4 w-4 mr-1 text-red-500" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-white/50">
            <Clock className="h-4 w-4 mr-1 text-red-500" />
            {job.experience}
          </div>
        </div>
        <Button variant="ghost" className="px-0 hover:bg-transparent hover:text-red-400 group">
          Apply Now
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Sample job listings data
const jobListings = [
  {
    title: "Senior Machine Learning Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "5+ years",
    description:
      "We're looking for a Senior Machine Learning Engineer to join our team and help build and deploy state-of-the-art machine learning models. You'll work on challenging problems in computer vision, natural language processing, and predictive analytics.",
  },
  {
    title: "AI Research Scientist",
    department: "Research",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our research team to advance the state of the art in artificial intelligence. You'll conduct original research, publish papers, and collaborate with engineering teams to bring research innovations to our products.",
  },
  {
    title: "Frontend Engineer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    experience: "3+ years",
    description:
      "We're seeking a talented Frontend Engineer to create intuitive and responsive user interfaces for our AI platform. You'll work closely with designers and backend engineers to deliver exceptional user experiences.",
  },
  {
    title: "Product Manager, AI Solutions",
    department: "Product",
    location: "London, UK",
    type: "Full-time",
    experience: "4+ years",
    description:
      "As a Product Manager for our AI Solutions, you'll define product strategy, gather requirements, and work with cross-functional teams to deliver AI products that solve real business problems for our clients.",
  },
  {
    title: "Data Engineer",
    department: "Engineering",
    location: "Singapore",
    type: "Full-time",
    experience: "2+ years",
    description:
      "We're looking for a Data Engineer to build and maintain our data infrastructure. You'll design data pipelines, optimize data storage, and ensure data quality for our AI models and analytics systems.",
  },
  {
    title: "AI Ethics Researcher",
    department: "Research",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our team to research and develop frameworks for ethical AI development and deployment. You'll help ensure our AI systems are fair, transparent, and aligned with human values.",
  },
  {
    title: "Solutions Architect",
    department: "Engineering",
    location: "Tokyo, Japan",
    type: "Full-time",
    experience: "5+ years",
    description:
      "As a Solutions Architect, you'll design and implement custom AI solutions for our enterprise clients. You'll work closely with clients to understand their needs and translate them into technical requirements.",
  },
  {
    title: "Sales Engineer",
    department: "Business",
    location: "Chicago, IL",
    type: "Full-time",
    experience: "3+ years",
    description:
      "We're seeking a Sales Engineer to bridge the gap between our sales and engineering teams. You'll provide technical expertise during the sales process and help clients understand how our AI solutions can address their specific challenges.",
  },
  {
    title: "UX/UI Designer",
    department: "Product",
    location: "Berlin, Germany",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our design team to create intuitive and visually appealing interfaces for our AI platform. You'll conduct user research, create wireframes and prototypes, and collaborate with engineers to implement your designs.",
  },
  {
    title: "Marketing Manager, AI Solutions",
    department: "Business",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "4+ years",
    description:
      "We're looking for a Marketing Manager to develop and execute marketing strategies for our AI solutions. You'll create compelling content, manage campaigns, and help position our products in the market.",
  },
]

// Sample internship listings data
const internshipListings = [
  {
    icon: <Users className="h-10 w-10 text-red-500" />,
    title: "AI Research Intern",
    description: "Gain hands-on experience in AI research and development.",
    location: "Remote",
  },
  {
    icon: <Globe className="h-10 w-10 text-red-500" />,
    title: "Data Science Intern",
    description: "Work with large datasets and advanced analytics tools.",
    location: "Remote",
  },
  {
    icon: <Building2 className="h-10 w-10 text-red-500" />,
    title: "Product Design Intern",
    description: "Contribute to product design and user experience.",
    location: "Remote",
  },
  {
    icon: <Clock className="h-10 w-10 text-red-500" />,
    title: "Marketing Intern",
    description: "Support marketing campaigns and content creation.",
    location: "Remote",
  },
  {
    icon: <MapPin className="h-10 w-10 text-red-500" />,
    title: "Sales Intern",
    description: "Learn about sales strategies and customer relations.",
    location: "Remote",
  },
]

