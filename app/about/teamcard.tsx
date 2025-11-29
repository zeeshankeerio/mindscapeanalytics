"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Github, Mail, Award, Briefcase, GraduationCap, Star, Globe, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Types
interface SocialLinks {
  linkedin?: string
  twitter?: string
  github?: string
  email?: string
}

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  department: string
  achievements?: string[]
  education?: string[]
  experience?: string[]
  social: SocialLinks
}

interface TeamCardProps {
  member: TeamMember
  index: number
}

// Sub-components
const CardWrapper = ({ children, isClickable, isFounder, member }: { 
  children: React.ReactNode
  isClickable: boolean
  isFounder: boolean
  member: TeamMember
}) => {
  if (!isClickable) return <>{children}</>
  
  return (
    <Link 
      href={isFounder ? "/founder" : (member.social.linkedin || "#")}
      target={isFounder ? "" : "_blank"}
      className="block h-full cursor-pointer"
    >
      {children}
    </Link>
  )
}

const ImageSection = ({ member, isFounder }: { member: TeamMember, isFounder: boolean }) => (
  <div className="relative w-full h-[300px] overflow-hidden flex-shrink-0">
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
    
    {/* Decorative elements */}
    <div className={`absolute inset-0 bg-gradient-to-r ${isFounder ? 'from-red-500/5' : 'from-white/5'} to-transparent z-0`} />
    <motion.div 
      className={`absolute -inset-1 bg-gradient-to-r ${isFounder ? 'from-red-500/10' : 'from-white/10'} to-transparent blur-lg opacity-50`} 
      animate={{ 
        opacity: [0.3, 0.6, 0.3], 
        scale: [1, 1.05, 1] 
      }} 
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    />
    
    <div className="h-full w-full overflow-hidden">
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full"
      >
        <Image
          src={member.image}
          alt={member.name}
          width={600}
          height={600}
          className="w-full h-full object-cover transition-all duration-500 professional-image-hover"
          priority={true}
        />
      </motion.div>
    </div>
    
    {/* Role badge */}
    <div className="absolute top-4 right-4 z-20">
      <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm 
                      ${isFounder 
          ? "bg-red-500/20 text-red-400 border border-red-500/30" 
          : "bg-white/10 text-white/70 border border-white/10"
      }`}>
        {member.role}
      </span>
    </div>
    
    {/* Name and department */}
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
      <h3 className={`text-2xl font-bold team-card-name-effect ${isFounder ? "text-white group-hover:text-red-400" : "text-white"} transition-colors`}>
        {member.name}
      </h3>
      <p className="text-white/70 text-sm mt-1">{member.department}</p>
    </div>
  </div>
)

const ContentSection = ({ member, isFounder, isHovered }: { 
  member: TeamMember
  isFounder: boolean
  isHovered: boolean
}) => (
  <div className="flex flex-col p-6 flex-grow">
    {/* Bio */}
    <div className="mb-3">
      <p className={`text-white/70 text-sm leading-relaxed ${isHovered ? '' : 'line-clamp-3'} transition-all duration-300`}>
        {member.bio}
      </p>
    </div>
    
    {/* Key info section */}
    <div className={`grid grid-cols-1 gap-3 flex-grow transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-40'}`}>
      {/* Achievements */}
      <div className="flex items-start gap-3">
        <Award className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
          isFounder ? "text-red-400" : "text-white/70"
        }`} />
        <div>
          <h4 className="text-sm font-medium text-white/90">Key Achievements</h4>
          <ul className="text-white/60 text-sm space-y-1.5 mt-1.5">
            {(member.achievements?.slice(0, 2) || ['Specialized expertise in their field']).map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Star className="h-3 w-3 mt-1 flex-shrink-0 text-red-400" />
                <span className="line-clamp-1">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Education */}
      <div className="flex items-start gap-3">
        <GraduationCap className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
          isFounder ? "text-red-400" : "text-white/70"
        }`} />
        <div>
          <h4 className="text-sm font-medium text-white/90">Education</h4>
          <ul className="text-white/60 text-sm space-y-1.5 mt-1.5">
            {(member.education?.slice(0, 1) || ['Advanced degree in relevant field']).map((edu, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <span className="line-clamp-1">{edu}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
)

const SocialLinks = ({ member, isFounder, isClickable, isHovered }: { 
  member: TeamMember
  isFounder: boolean
  isClickable: boolean
  isHovered: boolean
}) => (
  <div className="mt-4 pt-4 border-t border-white/10">
    <div className="flex items-center">
      <div className="grid grid-flow-col auto-cols-[36px] gap-2">
        {/* LinkedIn */}
        <motion.a
          href={member.social.linkedin && member.social.linkedin !== "#" ? member.social.linkedin : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
            isFounder 
              ? "bg-red-500/20 hover:bg-red-500/30" 
              : "bg-white/5 hover:bg-white/10"
          } ${!member.social.linkedin || member.social.linkedin === "#" ? "opacity-30 pointer-events-none" : ""}`}
          aria-label={`${member.name}'s LinkedIn profile`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            if (!member.social.linkedin || member.social.linkedin === "#") e.preventDefault();
          }}
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
        </motion.a>
        
        {/* Twitter */}
        <motion.a
          href={member.social.twitter && member.social.twitter !== "#" ? member.social.twitter : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
            isFounder 
              ? "bg-red-500/20 hover:bg-red-500/30" 
              : "bg-white/5 hover:bg-white/10"
          } ${!member.social.twitter || member.social.twitter === "#" ? "opacity-30 pointer-events-none" : ""}`}
          aria-label={`${member.name}'s Twitter profile`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            if (!member.social.twitter || member.social.twitter === "#") e.preventDefault();
          }}
        >
          <Twitter className="h-4 w-4" aria-hidden="true" />
        </motion.a>
        
        {/* GitHub */}
        <motion.a
          href={member.social.github && member.social.github !== "#" ? member.social.github : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
            isFounder 
              ? "bg-red-500/20 hover:bg-red-500/30" 
              : "bg-white/5 hover:bg-white/10"
          } ${!member.social.github || member.social.github === "#" ? "opacity-30 pointer-events-none" : ""}`}
          aria-label={`${member.name}'s GitHub profile`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            if (!member.social.github || member.social.github === "#") e.preventDefault();
          }}
        >
          <Github className="h-4 w-4" aria-hidden="true" />
        </motion.a>
        
        {/* Portfolio */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className={!isFounder ? "opacity-30" : ""}
        >
          <Link
            href={isFounder ? "/founder" : "#"}
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
              isFounder 
                ? "bg-red-500/20 hover:bg-red-500/30" 
                : "bg-white/5"
            }`}
            aria-label={`${member.name}'s profile page`}
            onClick={(e) => !isFounder && e.preventDefault()}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
      
      <div className="flex-grow"></div>
      
      {/* View Profile link */}
      {isClickable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-white/50 flex items-center gap-1"
        >
          <span>View Profile</span>
          <ExternalLink className="h-3 w-3" />
        </motion.div>
      )}
    </div>
  </div>
)

export function TeamMemberCard({ member, index }: TeamCardProps) {
  const isFounder = member.name === "Zeeshan Keerio"
  const isClickable = isFounder || member.social.linkedin !== "#"
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="h-[580px] w-full" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="h-full w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <CardWrapper isClickable={isClickable} isFounder={isFounder} member={member}>
          <div
            className={`relative overflow-hidden rounded-xl group transition-all duration-300 
                        h-full w-full flex flex-col
                        card-elevation team-card-hover card-bg-effect
                        backdrop-blur-sm
                        ${isFounder 
              ? "bg-gradient-to-br from-red-500/10 to-black/40 border border-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.2)] hover:shadow-[0_0_35px_rgba(220,38,38,0.4)]" 
              : "bg-gradient-to-br from-black/50 to-black/30 border border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            }`}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Clickable indicator */}
            {isClickable && (
              <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 py-1 px-2 bg-black/40 backdrop-blur-sm rounded-full text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ExternalLink className="h-3 w-3 text-white/70" aria-hidden="true" />
                <span className="text-xs text-white/70">Profile</span>
              </div>
            )}
            
            <ImageSection member={member} isFounder={isFounder} />
            <ContentSection member={member} isFounder={isFounder} isHovered={isHovered} />
            <SocialLinks member={member} isFounder={isFounder} isClickable={isClickable} isHovered={isHovered} />
          </div>
        </CardWrapper>
      </motion.div>
      
      {/* Card shadow */}
      <div className={`mt-2 h-4 mx-auto rounded-full blur-md bg-gradient-to-r card-shadow ${isFounder ? 'from-red-500/0 via-red-500/5 to-red-500/0' : 'from-white/0 via-white/5 to-white/0'} w-4/5`} aria-hidden="true" />
    </div>
  )
}

export default TeamMemberCard; 