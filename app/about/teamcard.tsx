"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Github, Mail, Award, Briefcase, GraduationCap, Star } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  department: string
  achievements?: string[]
  education?: string[]
  experience?: string[]
  social: {
    linkedin: string
    twitter: string
    github: string
  }
}

interface TeamCardProps {
  member: TeamMember
  index: number
}

export function TeamMemberCard({ member, index }: TeamCardProps) {
  const isFounder = member.name === "Zeeshan Keerio"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-xl group transition-all duration-300 ${
        isFounder 
          ? "bg-gradient-to-br from-red-500/10 to-black/40 border border-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.2)]" 
          : "bg-black/40 border border-white/10"
      }`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image container */}
      <div className="relative h-80 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
        
        {/* Decorative elements */}
        {isFounder && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent z-0" />
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-transparent blur-lg opacity-50 animate-pulse-slow" />
          </>
        )}
        
        <Image
          src={member.image}
          alt={member.name}
          width={500}
          height={500}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isFounder ? "group-hover:scale-110" : "group-hover:scale-105"
          }`}
          priority={index < 3}
        />
        
        {/* Role badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            isFounder 
              ? "bg-red-500/20 text-red-400 border border-red-500/30" 
              : "bg-white/10 text-white/70 border border-white/10"
          }`}>
            {member.role}
          </span>
        </div>
        
        {/* Name and department */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-2xl font-bold">{member.name}</h3>
          <p className="text-white/70 text-sm mt-1">{member.department}</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
        
        {/* Additional details */}
        <div className="space-y-4">
          {/* Achievements */}
          {member.achievements && member.achievements.length > 0 && (
            <div className="flex items-start gap-3">
              <Award className={`h-5 w-5 mt-1 flex-shrink-0 ${
                isFounder ? "text-red-400" : "text-white/70"
              }`} />
              <div>
                <h4 className="text-sm font-medium text-white/90">Key Achievements</h4>
                <ul className="text-white/60 text-sm space-y-2 mt-2">
                  {member.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Star className="h-3 w-3 mt-1 flex-shrink-0 text-red-400" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Education */}
          {member.education && member.education.length > 0 && (
            <div className="flex items-start gap-3">
              <GraduationCap className={`h-5 w-5 mt-1 flex-shrink-0 ${
                isFounder ? "text-red-400" : "text-white/70"
              }`} />
              <div>
                <h4 className="text-sm font-medium text-white/90">Education</h4>
                <ul className="text-white/60 text-sm space-y-2 mt-2">
                  {member.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="h-1 w-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Experience */}
          {member.experience && member.experience.length > 0 && (
            <div className="flex items-start gap-3">
              <Briefcase className={`h-5 w-5 mt-1 flex-shrink-0 ${
                isFounder ? "text-red-400" : "text-white/70"
              }`} />
              <div>
                <h4 className="text-sm font-medium text-white/90">Experience</h4>
                <ul className="text-white/60 text-sm space-y-2 mt-2">
                  {member.experience.map((exp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="h-1 w-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Social links */}
        <div className="flex gap-3 pt-4">
          {member.social.linkedin !== "#" && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all duration-300 ${
                isFounder 
                  ? "bg-red-500/20 hover:bg-red-500/30 hover:scale-110" 
                  : "bg-white/5 hover:bg-white/10 hover:scale-105"
              }`}
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
          {member.social.twitter !== "#" && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all duration-300 ${
                isFounder 
                  ? "bg-red-500/20 hover:bg-red-500/30 hover:scale-110" 
                  : "bg-white/5 hover:bg-white/10 hover:scale-105"
              }`}
              aria-label={`${member.name}'s Twitter profile`}
            >
              <Twitter className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
          {member.social.github !== "#" && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all duration-300 ${
                isFounder 
                  ? "bg-red-500/20 hover:bg-red-500/30 hover:scale-110" 
                  : "bg-white/5 hover:bg-white/10 hover:scale-105"
              }`}
              aria-label={`${member.name}'s GitHub profile`}
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
} 

export default TeamMemberCard; 