"use client"

import { useState, useEffect, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter, ChevronRight, Mail, MapPin, Phone, ArrowRight, Brain, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

import { footerNav, siteConfig } from "@/config/site-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getContainerClasses } from "@/lib/container-utils"

// Types
interface FooterProps {
  fullWidth?: boolean;
}

type SocialLink = {
  href: string;
  icon: React.ReactNode;
  label: string;
}

// Reusable components
const FooterBackground = memo(() => (
  <>
      {/* Modern layered background with depth */}
      <div className="absolute inset-0 bg-black shadow-2xl" />
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
      
      {/* Background texture */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)', 
                    backgroundSize: '50px 50px' }} />
      
      {/* Neural network nodes with enhanced shadows */}
      <div className="absolute top-1/4 left-10 w-1 h-1 bg-red-500 rounded-full opacity-50 animate-pulse-slow" 
           style={{ boxShadow: "0 0 20px 8px rgba(239, 68, 68, 0.4)" }} />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-red-600 rounded-full opacity-40 animate-pulse-medium"
           style={{ boxShadow: "0 0 30px 10px rgba(220, 38, 38, 0.5)" }} />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-500 rounded-full opacity-30 animate-pulse-slow"
           style={{ boxShadow: "0 0 25px 8px rgba(239, 68, 68, 0.4)" }} />
      
      {/* Enhanced top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
      
      {/* Vertical gradient layer for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80" />
  </>
));

const CompanyLogo = memo(() => (
  <div className="relative flex flex-col items-start">
    <div className="flex items-center gap-4 group">
      <div className="relative">
        <div className="absolute -inset-1 bg-red-800/20 blur-lg rounded-2xl"></div>
        <div className="relative z-10 group">
          <div className="absolute -inset-[1.5px] rounded-2xl">
            <div className="absolute inset-0 bg-red-700 rounded-2xl opacity-90"></div>
          </div>
          <div className="relative bg-black rounded-2xl p-2 sm:p-3 transition-all duration-300 group-hover:scale-[0.98] shadow-lg">
            <Image 
              src="/images/brain.svg" 
              alt="Mindscape Brain Logo"
              width={56}
              height={56}
              className="h-12 w-12 sm:h-14 sm:w-14"
              style={{
                filter: 'drop-shadow(0 0 1px #8B0000)'
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-sans drop-shadow-md">
          <span className="text-white">Mindscape</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700/80 via-red-600 to-red-700/80 ml-2">Analytics</span>
        </h1>
        <p className="text-sm text-white/70 mt-1 drop-shadow-sm">Where AI Meets Innovation</p>
      </div>
    </div>
  </div>
));

const ContactInfo = memo(() => (
  <div className="space-y-4 mb-8">
    <div className="flex items-start gap-3">
      <div className="mt-0.5">
        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 drop-shadow-sm" />
      </div>
      <p className="text-sm sm:text-base text-white/70 drop-shadow-sm">
        AI Innovation Center<br />
        Tech District, Digital City 10011
      </p>
    </div>
    
    <div className="flex items-center gap-3">
      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 drop-shadow-sm" />
      <a href="mailto:admin@mindscapeanalytics.com" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors drop-shadow-sm hover:drop-shadow-md">
        admin@mindscapeanalytics.com
      </a>
    </div>
    
    <div className="flex items-center gap-3">
      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 drop-shadow-sm" />
      <a href="tel:+11234567890" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors drop-shadow-sm hover:drop-shadow-md">
        +1 (123) 456-7890
      </a>
    </div>
  </div>
));

const SocialLinks = memo(({ 
  handleExternalLink 
}: { 
  handleExternalLink: (url: string, e: React.MouseEvent) => void 
}) => {
  const socialLinks: SocialLink[] = [
    {
      href: siteConfig.links.twitter,
      icon: <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Twitter"
    },
    {
      href: siteConfig.links.linkedin || "https://www.linkedin.com/company/mindscapeanalytics/",
      icon: <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "LinkedIn"
    },
    {
      href: siteConfig.links.github,
      icon: <Github className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "GitHub"
    }
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-900/20"
          aria-label={link.label}
          onClick={(e) => handleExternalLink(link.href, e)}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
});

const Newsletter = memo(({ 
  email, 
  isEmailValid, 
  handleEmailChange, 
  handleSubscribe 
}: { 
  email: string; 
  isEmailValid: boolean; 
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  handleSubscribe: () => void; 
}) => (
  <div className="mb-12 sm:mb-16 rounded-2xl p-4 sm:p-8 backdrop-blur-sm bg-gradient-to-r from-black/90 to-black/80 border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.3)] relative z-10">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div className="max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white drop-shadow-sm">Stay updated with Mindscape</h2>
        <p className="text-sm sm:text-base text-white/70">Get the latest AI insights, product updates, and industry news delivered to your inbox.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto relative">
        <Input
          type="email"
          placeholder="Enter your email"
          className={`bg-white/5 border-white/10 focus-visible:ring-red-500 flex-1 shadow-inner shadow-black/50 ${!isEmailValid ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          value={email}
          onChange={handleEmailChange}
          aria-label="Email for newsletter"
          aria-invalid={!isEmailValid}
          aria-describedby={!isEmailValid ? "email-error" : undefined}
        />
        {!isEmailValid && (
          <p id="email-error" className="text-red-500 text-xs mt-1 absolute top-full left-0 drop-shadow-sm">
            Please enter a valid email address
          </p>
        )}
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white group transition-all duration-300 overflow-hidden relative mt-2 sm:mt-0 shadow-md hover:shadow-lg"
          onClick={handleSubscribe}
          aria-label="Subscribe to newsletter"
        >
          <span className="inline-flex items-center group-hover:-translate-x-2 transition-transform duration-300">
            Subscribe
          </span>
          <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 absolute right-4 transition-all duration-300" />
        </Button>
      </div>
    </div>
  </div>
));

const FooterNavLinks = memo(({ footerNav }: { footerNav: typeof import("@/config/site-config").footerNav }) => (
  <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
    {footerNav.main.map((section, i) => (
      <div key={i} className="mb-6 md:mb-0">
        <h3 className="font-medium text-base sm:text-lg mb-3 sm:mb-4 pb-2 border-b border-white/10 text-white drop-shadow-sm">
          {section.title}
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          {section.items.map((item, j) => (
            <li key={j}>
              <Link 
                href={item.href} 
                className="text-sm sm:text-base text-white/70 hover:text-white transition-colors flex items-center group drop-shadow-sm hover:drop-shadow-md"
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <ChevronRight className="h-3 w-3 mr-1 sm:mr-2 opacity-0 -ml-4 sm:-ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-400" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
));

const FooterBottom = memo(({ 
  currentYear, 
  secondaryLinks 
}: { 
  currentYear: number; 
  secondaryLinks: { title: string; href: string; external?: boolean }[] | undefined;
}) => (
  <div className="relative">
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-sm" />
    
    <div className="pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <motion.p 
        className="text-white/60 text-xs sm:text-sm text-center md:text-left drop-shadow-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        © {currentYear} {siteConfig.name}. All rights reserved.
      </motion.p>
      
      {secondaryLinks && (
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          {secondaryLinks.map((item, i) => (
            <Link 
              key={i} 
              href={item.href} 
              className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors drop-shadow-sm hover:drop-shadow-md"
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
));

const ErrorNotification = memo(({ 
  linkError, 
  setLinkError 
}: { 
  linkError: boolean; 
  setLinkError: (value: boolean) => void 
}) => (
  linkError ? (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50" role="alert">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>Failed to open external link. Please try again later.</p>
            <Button 
              size="sm" 
              variant="ghost" 
              className="ml-2 hover:bg-red-700" 
              onClick={() => setLinkError(false)}
          aria-label="Dismiss error notification"
            >
              Dismiss
            </Button>
          </div>
        </div>
  ) : null
));

// Main footer component
export default function Footer({ fullWidth = true }: FooterProps) {
  // State management
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [linkError, setLinkError] = useState(false);
  
  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    // Set initial values
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Email validation
  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setIsEmailValid(true); // Reset validation state on change
  };
  
  const handleSubscribe = (): void => {
    if (!email || !validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    
    try {
      // Handle subscription logic with error handling
      console.log("Subscribed with:", email);
      // In a real app, this would call an API endpoint
      // fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
      //   .then(res => {
      //     if (!res.ok) throw new Error('Subscription failed');
      //     return res.json();
      //   })
      //   .then(data => {
      //     // Handle success
      //     setEmail("");
      //   })
      //   .catch(err => {
      //     console.error('Error:', err);
      //     // Handle error
      //   });
      
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      // Handle error state here if needed
    }
  };
  
  // Safe external link handler
  const handleExternalLink = (url: string, e: React.MouseEvent): void => {
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      e.preventDefault();
      setLinkError(true);
      console.error("Error opening link:", error);
      // Auto-dismiss error after 5 seconds
      setTimeout(() => setLinkError(false), 5000);
    }
  };

  return (
    <footer className="relative bg-black border-t border-white/10 text-white overflow-hidden shadow-xl" role="contentinfo" aria-label="Site footer">
      {/* Background elements */}
      <FooterBackground />
      
      <div className={`${getContainerClasses({ fullWidth })} relative z-10`}>
        {/* Newsletter Subscription */}
        <Newsletter 
          email={email}
          isEmailValid={isEmailValid}
          handleEmailChange={handleEmailChange}
          handleSubscribe={handleSubscribe}
        />
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-4 relative z-10">
            <div className="mb-6 motion-safe:animate-fade-in">
              <CompanyLogo />
            </div>
            <p className="text-sm sm:text-base text-white/70 mb-6 max-w-md drop-shadow-sm">
              Transforming businesses with advanced AI solutions. Our platform helps enterprises harness the power of
              artificial intelligence to drive innovation and growth.
            </p>
            
            <ContactInfo />
            
            {/* Social Media Links */}
            <SocialLinks handleExternalLink={handleExternalLink} />
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-8 relative z-10">
            <FooterNavLinks footerNav={footerNav} />
          </div>
        </div>
        
        {/* Bottom Footer */}
        <FooterBottom 
          currentYear={currentYear}
          secondaryLinks={footerNav.secondary}
        />
      </div>
      
      {/* Error notification */}
      <ErrorNotification linkError={linkError} setLinkError={setLinkError} />
      
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes pulse-medium {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes rgb-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
