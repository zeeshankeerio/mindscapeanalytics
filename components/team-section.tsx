"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Github, Mail } from "lucide-react"

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    bio: "Ph.D. in Machine Learning from Stanford. Previously led AI research at Google Brain with over 50 published papers and 15 patents in deep learning and computer vision.",
    expertise: ["Machine Learning", "Neural Networks", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2376&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "mailto:example@mindscape.ai",
    },
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    bio: "20+ years of experience building scalable software systems. Former VP of Engineering at Amazon Web Services, specializing in distributed systems and cloud architecture.",
    expertise: ["Cloud Architecture", "Distributed Systems", "Scalability"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "mailto:example@mindscape.ai",
    },
  },
  {
    name: "Aisha Patel",
    role: "Head of Data Science",
    bio: "Data science leader with experience at Netflix and Spotify. Expert in recommendation systems and predictive analytics that drive business growth.",
    expertise: ["Data Science", "Recommendation Systems", "A/B Testing"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2370&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "mailto:example@mindscape.ai",
    },
  },
  {
    name: "David Kim",
    role: "VP of Product",
    bio: "Product visionary who previously led product teams at Microsoft and Salesforce. Passionate about creating AI products that solve real business problems.",
    expertise: ["Product Strategy", "UX Design", "AI Product Management"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2187&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "mailto:example@mindscape.ai",
    },
  },
  {
    name: "Elena Volkov",
    role: "Lead ML Engineer",
    bio: "Specializes in natural language processing and large language models. Previously worked on GPT models at OpenAI and led NLP teams at Meta.",
    expertise: ["NLP", "Large Language Models", "Transformer Architecture"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2361&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "mailto:example@mindscape.ai",
    },
  },
  {
    name: "James Wilson",
    role: "Director of Solutions",
    bio: "Enterprise solution architect with experience implementing AI systems at Fortune 500 companies. Expert in translating business needs into technical solutions.",
    expertise: ["Solution Architecture", "Enterprise AI", "Digital Transformation"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2187&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "mailto:example@mindscape.ai",
    },
  },
]

export default function TeamSection() {
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null)

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">OUR TEAM</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Meet Our <span className="text-red-500">Expert</span> Team
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Industry leaders and innovators driving the future of AI and software solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
              onMouseEnter={() => setActiveTeamMember(index)}
              onMouseLeave={() => setActiveTeamMember(null)}
            >
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 h-full group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Glossy reflection */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                <CardContent className="p-0 relative z-10">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6">
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-red-500 font-medium">{member.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-red-500 font-medium">{member.role}</p>
                    </div>

                    <p className="text-white/70 text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((skill, i) => (
                        <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <a href={member.social.linkedin} className="text-white/60 hover:text-white transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href={member.social.twitter} className="text-white/60 hover:text-white transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href={member.social.github} className="text-white/60 hover:text-white transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                      <a href={member.social.email} className="text-white/60 hover:text-white transition-colors">
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>

                {activeTeamMember === index && (
                  <motion.div
                    className="absolute inset-0 border-2 border-red-500/30 rounded-xl pointer-events-none"
                    layoutId="teamHighlight"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl">
            <h3 className="text-xl font-bold mb-2">Join Our Team</h3>
            <p className="text-white/70 mb-4">
              We're always looking for talented individuals to join our growing team. Check out our open positions.
            </p>
            <motion.a
              href="#careers"
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

