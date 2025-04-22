import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter, Github, Mail } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  email?: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: SocialLinks;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

// Team Member Card Component with Professional Styling
export function TeamMemberCard({ member }: { member: TeamMember }) {
  const isFounder = member.name === "Zeeshan Keerio";
  const social = member.social || {};

  return (
    <Card 
      className={`bg-black/40 backdrop-blur-md border overflow-hidden group h-full transition-colors duration-300 ${
        isFounder 
          ? "border-red-500/30 hover:border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.2)] founder-card" 
          : "border-white/10 hover:border-red-500/50"
      }`}
    >
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative z-10">
          {isFounder ? (
            <div className="founder-image-container relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-red-500/10 to-red-500/20 blur-lg opacity-70 animate-pulse-slow z-0"></div>
              <img
                src={member.image}
                alt={member.name}
                className="w-full aspect-square object-cover relative z-10 founder-image"
              />
              <div className="founder-image-overlay z-20"></div>
            </div>
          ) : (
            <>
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </>
          )}
        </div>

        <div className={`p-6 flex-grow flex flex-col relative z-10 ${isFounder ? "bg-gradient-to-b from-black/70 to-black/95" : ""}`}>
          <h3 className={`text-xl font-bold mb-1 ${isFounder ? "founder-name" : ""}`}>{member.name}</h3>
          <p className="text-red-500 font-medium mb-3">{member.role}</p>
          <p className="text-white/70 mb-4 text-sm">{member.bio}</p>

          <div className="mt-auto flex space-x-3 social-icons">
            {social.linkedin && (
              <a href={social.linkedin} className="text-white/60 hover:text-red-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} className="text-white/60 hover:text-red-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {social.github && (
              <a href={social.github} className="text-white/60 hover:text-red-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            )}
            {social.email && (
              <a href={social.email} className="text-white/60 hover:text-red-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TeamCard({ member, index }: TeamCardProps) {
  const social = member.social || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300 group"
    >
      <div className="relative h-64 w-full">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-red-400 mb-4">{member.role}</p>
        <p className="text-white/70 text-sm mb-6">{member.bio}</p>
        
        <div className="mt-auto flex space-x-3 social-icons">
          {social.linkedin && (
            <a href={social.linkedin} className="text-white/60 hover:text-red-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {social.twitter && (
            <a href={social.twitter} className="text-white/60 hover:text-red-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          )}
          {social.github && (
            <a href={social.github} className="text-white/60 hover:text-red-400 transition-colors">
              <Github className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
} 