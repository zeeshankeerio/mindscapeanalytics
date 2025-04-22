// Update the imports to include additional components and hooks
import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ArrowRight, ExternalLink, Play, BarChart2, Zap, Cpu, Brain, Database, X, Search, Code, MessageSquare, Sparkles, ChevronDown, ChevronRight, AlertCircle, Check, Copy, Terminal, Server, Shield, LineChart, PieChart, BarChart, Layers, Maximize, Minimize, RefreshCw } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { TypeAnimation } from 'react-type-animation'
import { cn } from "@/lib/utils"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { VideoModal } from "@/components/video-modal"
import { navigateToContactForm } from "@/lib/utils"

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("analytics")
  const [showVideo, setShowVideo] = useState(false)
  const [hoverStat, setHoverStat] = useState<number | null>(null)
  const statsControls = useAnimation()
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [aiResponseHistory, setAiResponseHistory] = useState<{prompt: string, response: string}[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAiDemo, setShowAiDemo] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHoveringCta, setIsHoveringCta] = useState(false)
  const [aiModel, setAiModel] = useState("gpt-4o")
  const [confidenceLevel, setConfidenceLevel] = useState(92)
  const [showFullAiInterface, setShowFullAiInterface] = useState(false)
  const [aiProcessingStage, setAiProcessingStage] = useState(0)
  const [showLightningEffect, setShowLightningEffect] = useState(false)
  const [activeAiFeature, setActiveAiFeature] = useState("nlp")
  const aiResponseRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Enhanced stats data
  const stats = [
    { label: "Data Processed", value: "15+ PB", icon: <Database className="h-4 w-4" />, description: "Petabytes of data processed through our distributed computing platform" },
    { label: "AI Models", value: "200+", icon: <Brain className="h-4 w-4" />, description: "Pre-trained and custom AI models available for enterprise deployment" },
    { label: "Processing Speed", value: "2.4 TB/s", icon: <Zap className="h-4 w-4" />, description: "Real-time data processing with our high-performance computing clusters" },
    { label: "Accuracy Rate", value: "99.9%", icon: <BarChart2 className="h-4 w-4" />, description: "Industry-leading prediction accuracy across all our AI solutions" },
  ]

  // AI features data
  const aiFeatures = [
    { id: "nlp", name: "Natural Language Processing", icon: <MessageSquare className="h-5 w-5" />, description: "Advanced text analysis, sentiment detection, and language generation capabilities" },
    { id: "cv", name: "Computer Vision", icon: <Search className="h-5 w-5" />, description: "Image recognition, object detection, and visual data processing" },
    { id: "pred", name: "Predictive Analytics", icon: <LineChart className="h-5 w-5" />, description: "Forecast future trends and outcomes based on historical data patterns" },
    { id: "auto", name: "Process Automation", icon: <RefreshCw className="h-5 w-5" />, description: "Intelligent workflow automation with adaptive learning capabilities" },
  ]

  // AI response templates with more sophisticated, realistic responses
  const aiResponseTemplates = {
    business: [
      "Based on our analysis of similar enterprises, implementing our AI solutions could increase operational efficiency by 35-42%. This translates to approximately $2.4M in annual cost savings for a company of your size. Our platform integrates seamlessly with existing ERP systems to minimize disruption during implementation.",
      "Our AI-driven predictive maintenance system has reduced unplanned downtime by an average of 73% across manufacturing clients. The system continuously monitors equipment performance data to detect anomalies before they cause failures, extending machine lifespan by approximately 40%.",
      "Mindscape's customer intelligence platform can help you identify high-value customer segments with 94% accuracy. Our clients typically see a 27% increase in customer retention and a 31% boost in upsell opportunities within the first six months of deployment."
    ],
    technical: [
      "Our neural network architecture employs a hybrid approach combining transformer models with reinforcement learning from human feedback (RLHF). This allows for both exceptional pattern recognition and continuous improvement based on real-world outcomes. The system operates with 512-dimensional embeddings and supports multi-modal inputs including text, images, and structured data.",
      "Mindscape's distributed computing framework processes data across 128 global nodes with automatic load balancing and fault tolerance. The system maintains 99.99% uptime while handling up to 2.4TB/s of throughput. All processing complies with regional data sovereignty requirements through our geo-fencing capabilities.",
      "Our computer vision models achieve 98.7% accuracy on standard benchmarks, outperforming previous state-of-the-art systems by 2.3%. The models are optimized for edge deployment with a compressed footprint of only 47MB while maintaining inference speeds of 24ms on standard hardware."
    ],
    security: [
      "Mindscape's AI platform implements end-to-end encryption with AES-256 for data at rest and TLS 1.3 for data in transit. Our federated learning approach allows model training without exposing raw data, maintaining privacy while still benefiting from diverse training sets. We maintain SOC 2 Type II, ISO 27001, and GDPR compliance certifications.",
      "Our anomaly detection system identifies potential security threats with 99.6% accuracy and a false positive rate of only 0.04%. The system continuously adapts to evolving threat patterns through our proprietary adaptive security algorithm that incorporates threat intelligence from multiple sources.",
      "All AI models deployed through our platform undergo rigorous security testing, including adversarial attack simulations and prompt injection testing. Our security operations center monitors system activity 24/7 with automated threat response capabilities that can isolate affected components within 50ms of detection."
    ]
  }

  // Track mouse position for interactive effects with debouncing for performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }, 5); // Small debounce for performance
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [mouseX, mouseY]);

  // Trigger lightning effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLightningEffect(true);
      setTimeout(() => setShowLightningEffect(false), 200);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    statsControls.start({
      y: 0,
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    });
  }, [statsControls]);

  // Enhanced AI prompt submission with more realistic processing stages
  const handleAiPromptSubmit = useCallback(() => {
    if (!aiPrompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setAiResponse("");
    setAiProcessingStage(1);
    
    // Simulate AI processing stages
    const processingStages = [
      { stage: 1, delay: 300 },  // Initial processing
      { stage: 2, delay: 800 },  // Analyzing context
      { stage: 3, delay: 1200 }, // Retrieving information
      { stage: 4, delay: 1800 }  // Generating response
    ];
    
    processingStages.forEach(({stage, delay}) => {
      setTimeout(() => setAiProcessingStage(stage), delay);
    });
    
    // Determine response category based on prompt content
    const prompt = aiPrompt.toLowerCase();
    let responseCategory = 'business';
    
    if (prompt.includes('security') || prompt.includes('privacy') || prompt.includes('compliance') || prompt.includes('protect')) {
      responseCategory = 'security';
    } else if (prompt.includes('technical') || prompt.includes('model') || prompt.includes('algorithm') || prompt.includes('architecture') || prompt.includes('framework')) {
      responseCategory = 'technical';
    }
    
    // Select response from appropriate category
    const responses = aiResponseTemplates[responseCategory as keyof typeof aiResponseTemplates];
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Simulate typing with variable speed for more realism
    let i = 0;
    setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < selectedResponse.length) {
          // Variable typing speed for more realism
          const chunkSize = Math.floor(Math.random() * 3) + 1;
          const endIndex = Math.min(i + chunkSize, selectedResponse.length);
          const chunk = selectedResponse.substring(i, endIndex);
          setAiResponse(prev => prev + chunk);
          i = endIndex;
        } else {
          clearInterval(typingInterval);
          setIsGenerating(false);
          setAiProcessingStage(0);
          // Add to history
          setAiResponseHistory(prev => [...prev, {
            prompt: aiPrompt,
            response: selectedResponse
          }]);
          // Clear input
          setAiPrompt("");
        }
      }, Math.random() * 30 + 10); // Random delay between 10-40ms for realistic typing
    }, 2000); // Initial delay before typing starts
  }, [aiPrompt, isGenerating, aiResponseTemplates]);

  // Copy AI response to clipboard
  const copyToClipboard = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse);
    }
  };

  // Enhanced neural network animation with more sophisticated particle behavior
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mousePosition = { x: 0, y: 0 };
    const mouseRadius = 150;
    let lightningParticles: LightningParticle[] = [];
    let lastLightningTime = 0;

    // Lightning particle class
    class LightningParticle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      life: number;
      maxLife: number;
      width: number;
      children: LightningParticle[];
      angle: number;
      length: number;
      
      constructor(x: number, y: number, targetX: number, targetY: number, width = 3) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.life = 1;
        this.maxLife = 1;
        this.width = width;
        this.children = [];
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.length = Math.sqrt(Math.pow(targetX - x, 2) + Math.pow(targetY - y, 2));
        
        // Create branches with probability
        if (width > 0.5 && Math.random() < 0.3) {
          const deviation = (Math.random() - 0.5) * Math.PI / 2;
          const newAngle = this.angle + deviation;
          const newLength = this.length * (0.3 + Math.random() * 0.4);
          const newTargetX = this.x + Math.cos(newAngle) * newLength;
          const newTargetY = this.y + Math.sin(newAngle) * newLength;
          
          this.children.push(new LightningParticle(
            this.x, 
            this.y, 
            newTargetX, 
            newTargetY, 
            this.width * 0.6
          ));
        }
      }
      
      update() {
        this.life -= 0.05;
        this.children.forEach(child => child.update());
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;
        
        const alpha = this.life / this.maxLife;
        
        // Draw main lightning bolt
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        
        // Create jagged lightning effect
        const segments = 8;
        const segmentLength = this.length / segments;
        let currentX = this.x;
        let currentY = this.y;
        
        for (let i = 0; i < segments - 1; i++) {
          const nextX = this.x + (i + 1) * segmentLength * Math.cos(this.angle);
          const nextY = this.y + (i + 1) * segmentLength * Math.sin(this.angle);
          
          // Add some randomness to create jagged effect
          const jitterAmount = 5 * (1 - i / segments);
          const jitterX = nextX + (Math.random() - 0.5) * jitterAmount;
          const jitterY = nextY + (Math.random() - 0.5) * jitterAmount;
          
          ctx.lineTo(jitterX, jitterY);
          currentX = jitterX;
          currentY = jitterY;
        }
        
        // Final segment to target
        ctx.lineTo(this.targetX, this.targetY);
        
        ctx.strokeStyle = `rgba(255, 50, 50, ${alpha})`;
        ctx.lineWidth = this.width;
        ctx.stroke();
        
        // Draw glow effect
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.targetX, this.targetY);
        ctx.strokeStyle = `rgba(255, 200, 200, ${alpha * 0.5})`;
        ctx.lineWidth = this.width * 2;
        ctx.stroke();
        
        // Draw children
        this.children.forEach(child => child.draw(ctx));
      }
    }

    // Enhanced particle class with more sophisticated behavior
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      glowing: boolean;
      glowIntensity: number;
      glowTarget: number;
      glowSpeed: number;
      originalX: number;
      originalY: number;
      forceFactor: number;
      connections: Particle[];
      connectionStrength: number;
      pulsePhase: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${Math.random() * 0.5 + 0.2})`;
        this.glowing = false;
        this.glowIntensity = 0;
        this.glowTarget = 0;
        this.glowSpeed = 0.05;
        this.forceFactor = Math.random() * 0.3 + 0.1;
        this.connections = [];
        this.connectionStrength = Math.random() * 0.8 + 0.2;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.03 + Math.random() * 0.02;
      }

      update() {
        // Update pulse phase
        this.pulsePhase += this.pulseSpeed;
        if (this.pulsePhase > Math.PI * 2) {
          this.pulsePhase -= Math.PI * 2;
        }
        
        // React to mouse with improved physics
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          // Particles are repelled from the mouse with variable force
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - distance) / mouseRadius;
          const repelFactor = 0.3 + Math.sin(this.pulsePhase) * 0.1;
          this.speedX -= Math.cos(angle) * force * repelFactor;
          this.speedY -= Math.sin(angle) * force * repelFactor;
          
          // Make particles glow when near mouse with pulsing effect
          this.glowing = true;
          this.glowTarget = Math.min(1, (mouseRadius - distance) / mouseRadius) * (0.8 + Math.sin(this.pulsePhase) * 0.2);
        } else {
          this.glowing = false;
          this.glowTarget = 0;
          
          // Return to original position with a spring effect
          const dx = this.originalX - this.x;
          const dy = this.originalY - this.y;
          this.speedX += dx * this.forceFactor * 0.01;
          this.speedY += dy * this.forceFactor * 0.01;
        }
        
        // Update glow intensity with smoother transition
        if (this.glowing) {
          this.glowIntensity += (this.glowTarget - this.glowIntensity) * this.glowSpeed;
        } else {
          this.glowIntensity -= this.glowIntensity * this.glowSpeed * 2;
        }
        
        // Update size based on glow and pulse
        const pulseEffect = Math.sin(this.pulsePhase) * 0.2 + 1;
        this.size = this.baseSize * (1 + this.glowIntensity * 2) * pulseEffect;
        
        // Apply speed limits with variable caps
        const maxSpeed = 2 + this.glowIntensity * 1;
        this.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, this.speedX));
        this.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, this.speedY));
        
        // Apply friction with variable coefficient
        const friction = 0.97 + this.glowIntensity * 0.01;
        this.speedX *= friction;
        this.speedY *= friction;
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges with smoother transition
        const buffer = 50;
        if (this.x > canvas.width + buffer) this.x = -buffer;
        if (this.x < -buffer) this.x = canvas.width + buffer;
        if (this.y > canvas.height + buffer) this.y = -buffer;
        if (this.y < -buffer) this.y = canvas.height + buffer;
      }

      draw() {
        if (!ctx) return;
        
        // Draw glow effect with pulsing
        if (this.glowIntensity > 0) {
          const pulseEffect = 0.8 + Math.sin(this.pulsePhase) * 0.2;
          const glow = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 4 * pulseEffect
          );
          glow.addColorStop(0, `rgba(255, 0, 0, ${0.3 * this.glowIntensity * pulseEffect})`);
          glow.addColorStop(1, 'rgba(255, 0, 0, 0)');
          
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 4 * pulseEffect, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
        
        // Draw particle with enhanced visual effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Change color based on glow with more vibrant effect
        if (this.glowIntensity > 0) {
          const pulseEffect = 0.8 + Math.sin(this.pulsePhase) * 0.2;
          ctx.fillStyle = `rgba(255, ${Math.floor(50 + 205 * this.glowIntensity * pulseEffect)}, ${Math.floor(50 + 100 * this.glowIntensity * pulseEffect)}, ${0.7 + 0.3 * this.glowIntensity * pulseEffect})`;
        } else {
          ctx.fillStyle = this.color;
        }
        
        ctx.fill();
      }

      connect(particles: Particle[]) {
        if (!ctx) return;
        
        // Find particles to connect to if not already cached
        if (this.connections.length === 0) {
          particles.forEach(particle => {
            if (this !== particle) {
              const distance = Math.sqrt(
                (this.originalX - particle.originalX) ** 2 + 
                (this.originalY - particle.originalY) ** 2
              );
              
              const maxDistance = 100;
              if (distance < maxDistance) {
                this.connections.push(particle);
              }
            }
          });
        }
        
        // Draw connections to cached particles
        this.connections.forEach(particle => {
          const distance = Math.sqrt(
            (this.x - particle.x) ** 2 + 
            (this.y - particle.y) ** 2
          );
          
          const maxDistance = 100;
          
          if (distance < maxDistance) {
            // Calculate opacity based on distance, glow and connection strength
            const distanceFactor = 1 - distance / maxDistance;
            const opacity = distanceFactor * 0.15 * this.connectionStrength;
            const glowFactor = Math.max(this.glowIntensity, particle.glowIntensity);
            
            // Create gradient for connection with pulsing effect
            const pulseEffect = 0.8 + Math.sin((this.pulsePhase + particle.pulsePhase) / 2) * 0.2;
            const gradient = ctx.createLinearGradient(
              this.x, this.y, particle.x, particle.y
            );
            
            if (glowFactor > 0) {
              gradient.addColorStop(0, `rgba(255, ${50 + Math.floor(200 * this.glowIntensity * pulseEffect)}, ${50 + Math.floor(50 * this.glowIntensity * pulseEffect)}, ${opacity + glowFactor * 0.3 * pulseEffect})`);
              gradient.addColorStop(1, `rgba(255, ${50 + Math.floor(200 * particle.glowIntensity * pulseEffect)}, ${50 + Math.floor(50 * particle.glowIntensity * pulseEffect)}, ${opacity + glowFactor * 0.3 * pulseEffect})`);
            } else {
              gradient.addColorStop(0, `rgba(255, 0, 0, ${opacity * pulseEffect})`);
              gradient.addColorStop(1, `rgba(255, 0, 0, ${opacity * pulseEffect})`);
            }
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 + glowFactor * pulseEffect;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
          }
        });
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    window.addEventListener('mousemove', (e) => {
      mousePosition = { x: e.clientX, y: e.clientY };
    });

    // Create lightning effect
    const createLightning = () => {
      const now = Date.now();
      if (now - lastLightningTime < 500) return; // Limit frequency
      
      lastLightningTime = now;
      
      // Create 1-3 lightning bolts
      const numBolts = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numBolts; i++) {
        // Start from top of canvas at random x position
        const startX = Math.random() * canvas.width;
        const startY = 0;
        
        // Target random position in lower half of canvas
        const targetX = Math.random() * canvas.width;
        const targetY = canvas.height * (0.5 + Math.random() * 0.5);
        
        lightningParticles.push(new LightningParticle(
          startX, startY, targetX, targetY, 2 + Math.random() * 2
        ));
      }
    };

    function init() {
      particles = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 150);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
        particle.connect(particles);
      });
      
      // Update and draw lightning
      lightningParticles = lightningParticles.filter(p => p.life > 0);
      lightningParticles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      
      // Trigger lightning effect occasionally
      if (showLightningEffect && Math.random() < 0.8) {
        createLightning();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showLightningEffect]);

  // Calculate dynamic styles based on cursor position with enhanced effects
  const calculateDynamicStyles = (elementRect: DOMRect) => {
    if (!elementRect) return {};
    
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;
    
    const distanceX = cursorPosition.x - centerX;
    const distanceY = cursorPosition.y - centerY;
    
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const maxDistance = 300;
    
    if (distance > maxDistance) return {};
    
    const intensity = 1 - distance / maxDistance;
    const moveX = distanceX * intensity * 0.1;
    const moveY = distanceY * intensity * 0.1;
    
    return {
      transform: `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.05}deg)`,
      boxShadow: `0 0 ${30 * intensity}px ${10 * intensity}px rgba(255, 0, 0, ${0.2 * intensity})`,
    };
  };

  // Scroll to bottom of AI response container when new content is added
  useEffect(() => {
    if (aiResponseRef.current && aiResponse) {
      aiResponseRef.current.scrollTop = aiResponseRef.current.scrollHeight;
    }
  }, [aiResponse]);

  // Create parallax effect for background elements
  const parallaxX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const parallaxY = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);

  // Handle contact form navigation
  const handleGetStartedClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigateToContactForm("ai-analytics", "Hero Section Get Started Request")
  }

  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-black">
      {/* Neural network background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ opacity: isLoaded ? 0.3 : 0 }}
      />

      {/* Animated gradient background with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-black via-black to-black"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.1),transparent_70%)] animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-red-500/5 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-red-500/10 blur-[120px] animate-float"></div>
        
        {/* Additional lighting effects */}
        <div className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-red-500/10 blur-[80px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/2 right-1/3 w-72 h-72 rounded-full bg-red-500/8 blur-[90px] animate-float" style={{ animationDelay: '2s' }}></div>
      </motion.div>

      {/* Grid pattern overlay with enhanced effect */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      </div>

      {/* Lightning effect overlay */}
      <div className={`absolute inset-0 bg-red-500/5 pointer-events-none transition-opacity duration-100 ${showLightningEffect ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8">
            {/* Company badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,0,0.15)]"
            >
              <span className="text-xs font-semibold text-red-500">One Step Software Solutions</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Advanced <span className="text-red-500 relative inline-block">
                  <span className="relative z-10">AI Solutions</span>
                  <span className="absolute -inset-1 bg-red-500/20 blur-lg rounded-lg -z-10 animate-pulse-slow"></span>
                  <motion.span 
                    className="absolute -inset-0.5 rounded-lg border border-red-500/50 -z-10"
                    animate={{ 
                      boxShadow: ['0 0 10px 0px rgba(255, 0, 0, 0.3)', '0 0 20px 5px rgba(255, 0, 0, 0.5)', '0 0 10px 0px rgba(255, 0, 0, 0.3)'] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.span>
                </span> for Enterprise
              </h1>
              
              <div className="h-16">
                <TypeAnimation
                  sequence={[
                    'Transform your business with our cutting-edge AI platform.',
                    2000,
                    'Unlock insights from your data with advanced analytics.',
                    2000,
                    'Automate processes and drive growth with machine learning.',
                    2000,
                    'Enhance decision-making with predictive intelligence.',
                    2000,
                  ]}
                  wrapper="p"
                  speed={50}
                  repeat={Infinity}
                  className="text-xl text-white/70 max-w-[600px]"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div 
                ref={(el) => {
                  if (el) {
                    const rect = el.getBoundingClientRect()
                    if (isHoveringCta) {
                      el.style.transform = `translate(${(cursorPosition.x - rect.left - rect.width/2) * 0.1}px, ${(cursorPosition.y - rect.top - rect.height/2) * 0.1}px)`
                    } else {
                      el.style.transform = 'translate(0, 0)'
                    }
                  }
                }}
                onMouseEnter={() => setIsHoveringCta(true)}
                onMouseLeave={() => setIsHoveringCta(false)}
                className="transition-transform duration-200"
              >
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white relative group overflow-hidden w-full sm:w-auto shadow-[0_0_20px_rgba(255,0,0,0.3)]"
                >
                  <span className="relative z-10 flex items-center">
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  
                  {/* Enhanced animated border effect */}
                  <span className="absolute inset-0 border border-red-500/50 rounded-md opacity-0 group-hover:opacity-100 overflow-hidden">
                    <motion.span 
                      className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                      animate={{ left: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.span 
                      className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-red-500 to-transparent"
                      animate={{ top: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    />
                    <motion.span 
                      className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                      animate={{ right: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-red-500 to-transparent"
                      animate={{ bottom: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
                    />
                  </span>
                </Button>
              </div>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 hover:bg-white/5 group relative overflow-hidden shadow-[0_0_15px_rgba(255,0,0,0.1)]"
                onClick={() => setShowVideo(true)}
              >
                <span className="flex items-center relative z-10">
                  <span className="relative mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 group-hover:bg-red-600">
                    <Play className="h-3 w-3 text-white" />
                    <span className="absolute -inset-3 rounded-full border border-red-500 animate-ping opacity-75"></span>
                  </span>
                  Watch Demo
                </span>
                
                {/* Enhanced glow effect */}
                <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 animate-pulse-slow"></span>
                </span>
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost" 
                className="border-white/10 hover:bg-white/5 group hidden md:flex shadow-[0_0_10px_rgba(255,0,0,0.05)]"
                onClick={() => setShowAiDemo(!showAiDemo)}
              >
                <span className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-red-500" />
                  Try AI Now
                  <ChevronDown className={cn(
                    "ml-1 h-4 w-4 transition-transform duration-200",
                    showAiDemo && "rotate-180"
                  )} />
                </span>
              </Button>
            </motion.div>

            {/* Enhanced AI Demo Dropdown */}
            <AnimatePresence>
              {showAiDemo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 mt-2 shadow-[0_0_30px_rgba(255,0,0,0.1)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Brain className="h-5 w-5 text-red-500 mr-2" />
                        <h3 className="text-lg font-semibold">AI Assistant</h3>
                        <Badge className="ml-2 bg-red-500/20 text-red-500 border-red-500/20 text-[10px]">BETA</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-xs"
                          onClick={() => setShowFullAiInterface(!showFullAiInterface)}
                        >
                          {showFullAiInterface ? (
                            <><Minimize className="h-3.5 w-3.5 mr-1" /> Compact</>
                          ) : (
                            <><Maximize className="h-3.5 w-3.5 mr-1" /> Expand</>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {/* AI model selector and confidence level */}
                    {showFullAiInterface && (
                      <div className="mb-3 grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/70">AI Model</label>
                          <Select value={aiModel} onValueChange={setAiModel}>
                            <SelectTrigger className="h-8 bg-black/50 border-white/10 text-sm">
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/10">
                              <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                              <SelectItem value="claude-3">Claude 3</SelectItem>
                              <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                              <SelectItem value="mindscape-1">Mindscape-1 (Alpha)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between">
                            <label className="text-xs text-white/70">Confidence Level</label>
                            <span className="text-xs text-white/70">{confidenceLevel}%</span>
                          </div>
                          <Slider 
                            value={[confidenceLevel]} 
                            min={50} 
                            max={99} 
                            step={1}
                            onValueChange={(value) => setConfidenceLevel(value[0])}
                            className="py-1"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* AI feature selector */}
                    {showFullAiInterface && (
                      <div className="mb-3 space-y-1.5">
                        <label className="text-xs text-white/70">AI Capabilities</label>
                        <div className="flex flex-wrap gap-2">
                          {aiFeatures.map(feature => (
                            <Badge 
                              key={feature.id}
                              variant={activeAiFeature === feature.id ? "default" : "outline"}
                              className={cn(
                                "cursor-pointer transition-colors",
                                activeAiFeature === feature.id 
                                  ? "bg-red-500 hover:bg-red-600 text-white" 
                                  : "bg-white/5 hover:bg-white/10 border-white/10"
                              )}
                              onClick={() => setActiveAiFeature(feature.id)}
                            >
                              <span className="flex items-center">
                                {feature.icon}
                                <span className="ml-1">{feature.name}</span>
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ask about our AI solutions..."
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          className="bg-black/50 border-white/10"
                          disabled={isGenerating}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleAiPromptSubmit();
                            }
                          }}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                onClick={handleAiPromptSubmit}
                                disabled={!aiPrompt.trim() || isGenerating}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                {isGenerating ? (
                                  <span className="flex items-center">
                                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                                    {aiProcessingStage === 1 && "Processing..."}
                                    {aiProcessingStage === 2 && "Analyzing..."}
                                    {aiProcessingStage === 3 && "Retrieving..."}
                                    {aiProcessingStage === 4 && "Generating..."}
                                  </span>
                                ) : (
                                  <span>Ask</span>
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Ask our AI assistant about our solutions</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      {/* Enhanced AI response area */}
                      {(isGenerating || aiResponse) && (
                        <div className="bg-black/30 border border-white/10 rounded-lg p-3 min-h-[120px] relative shadow-[0_0_20px_rgba(255,0,0,0.05)]">
                          <div className="absolute top-2 left-2 flex items-center gap-2">
                            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-xs">
                              AI Response
                            </Badge>
                            {aiModel === "mindscape-1" && (
                              <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20 text-xs">
                                Experimental
                              </Badge>
                            )}
                          </div>
                          
                          <div className="absolute top-2 right-2 flex items-center gap-1">
                            {aiResponse && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0" 
                                onClick={copyToClipboard}
                              >
                                <Copy className="h-3.5 w-3.5 text-white/50 hover:text-white" />
                                <span className="sr-only">Copy to clipboard</span>
                              </Button>
                            )}
                          </div>
                          
                          <div 
                            ref={aiResponseRef}
                            className="text-white/80 mt-8 max-h-[200px] overflow-y-auto pr-2 space-y-2"
                          >
                            <p className="whitespace-pre-line">{aiResponse}</p>
                            
                            {isGenerating && (
                              <div className="flex gap-1 mt-1">
                                <motion.span 
                                  className="h-1.5 w-1.5 bg-red-500 rounded-full"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <motion.span 
                                  className="h-1.5 w-1.5 bg-red-500 rounded-full"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                />
                                <motion.span 
                                  className="h-1.5 w-1.5 bg-red-500 rounded-full"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                />
                              </div>
                            )}
                          </div>
                          
                          {/* Model confidence indicator */}
                          {aiResponse && !isGenerating && (
                            <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
                              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-red-500 rounded-full" 
                                  style={{ width: `${confidenceLevel}%` }}
                                ></div>
                              </div>
                              <span>{confidenceLevel}% confidence</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Enhanced suggestion chips */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge 
                          variant="outline" 
                          className="bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                          onClick={() => setAiPrompt("How can AI improve my business operations?")}
                        >
                          <Terminal className="h-3 w-3 mr-1" />
                          Business operations
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                          onClick={() => setAiPrompt("What AI models do you offer?")}
                        >
                          <Layers className="h-3 w-3 mr-1" />
                          AI models
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                          onClick={() => setAiPrompt("How secure is your AI platform?")}
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          Security
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                          onClick={() => setAiPrompt("Can you explain your technical architecture?")}
                        >
                          <Terminal className="h-3 w-3 mr-1" />
                          Technical details
                        </Badge>
                      </div>
                      
                      {/* Previous conversations */}
                      {showFullAiInterface && aiResponseHistory.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-white/70">Previous Questions</h4>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-2 text-xs"
                              onClick={() => setAiResponseHistory([])}
                            >
                              Clear
                            </Button>
                          </div>
                          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                            {aiResponseHistory.map((item, index) => (
                              <div 
                                key={index} 
                                className="text-xs p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                                onClick={() => {
                                  setAiPrompt(item.prompt);
                                  setAiResponse(item.response);
                                }}
                              >
                                <p className="font-medium text-white/80 truncate">{item.prompt}</p>
                                <p className="text-white/50 truncate">{item.response.substring(0, 60)}...</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
              initial="hidden"
              animate={statsControls}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`relative p-3 rounded-lg border border-white/10 backdrop-blur-sm transition-all duration-300 ${hoverStat === index ? 'bg-white/10 scale-105' : 'bg-white/5'}`}
                  onMouseEnter={() => setHoverStat(index)}
                  onMouseLeave={() => setHoverStat(null)}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  style={hoverStat === index ? {
                    boxShadow: '0 0 25px rgba(255, 0, 0, 0.2)',
                  } : {}}
                >
                  <div className="flex items-center mb-1 text-white/60">
                    {stat.icon}
                    <span className="text-xs ml-1">{stat.label}</span>
                  </div>
                  <div className="text-xl font-bold text-red-500">{stat.value}</div>
                  
                  {/* Show description on hover */}
                  <AnimatePresence>
                    {hoverStat === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-white/50 mt-1 overflow-hidden"
                      >
                        {stat.description}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {hoverStat === index && (
                    <motion.div 
                      className="absolute -inset-px border border-red-500/50 rounded-lg"
                      layoutId="statHighlight"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Trusted by section */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }} 
              className="pt-8"
            >
              <p className="text-sm text-white/50 mb-4 flex items-center">
                <Check className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                Trusted by leading enterprises
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <motion.div 
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                  whileHover={{ y: -5, filter: "brightness(1.2)" }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/800px-IBM_logo.svg.png" 
                    alt="IBM"
                    className="h-8 object-contain"
                  />
                </motion.div>
                <motion.div 
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                  whileHover={{ y: -5, filter: "brightness(1.2)" }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_logo.svg/800px-Microsoft_logo.svg.png" 
                    alt="Microsoft" 
                    className="h-8 object-contain"
                  />
                </motion.div>
                <motion.div 
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                  whileHover={{ y: -5, filter: "brightness(1.2)" }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png" 
                    alt="Google" 
                    className="h-8 object-contain"
                  />
                </motion.div>
                <motion.div 
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                  whileHover={{ y: -5, filter: "brightness(1.2)" }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cisco_logo.svg/800px-Cisco_logo.svg.png" 
                    alt="Cisco" 
                    className="h-8 object-contain"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
              
              {/* Enhanced 3D AI Visualization */}
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm p-6 shadow-[0_0_30px_rgba(255,0,0,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                
                {/* Enhanced animated corner accents */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-red-500">
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-red-500/50"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-red-500">
                  <motion.div 
                    className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-red-500/50"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-red-500">
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2 border-red-500/50"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-red-500">
                  <motion.div 
                    className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-red-500/50"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  />
                </div>
                
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <Cpu className="h-5 w-5 text-red-500 mr-2" />
                      <h3 className="text-xl font-bold">AI Platform</h3>
                      <Badge className="ml-2 bg-red-500/20 text-red-500 border border-red-500/20 text-[10px]">ENTERPRISE</Badge>
                    </div>
                    <TabsList className="bg-black/50 border border-white/10">
                      <TabsTrigger
                        value="analytics"
                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                      >
                        Analytics
                      </TabsTrigger>
                      <TabsTrigger value="ml" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                        ML Models
                      </TabsTrigger>
                      <TabsTrigger
                        value="vision"
                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                      >
                        AI Vision
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="analytics" className="mt-0">
                    <div className="aspect-video relative rounded-lg overflow-hidden border border-white/10 group shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
                        alt="AI Analytics Dashboard"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-lg font-bold mb-1">Advanced Analytics</h4>
                        <p className="text-sm text-white/70">Real-time data processing and visualization</p>
                        <Button variant="link" size="sm" className="text-red-500 p-0 h-auto mt-2 group">
                          Learn more <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                      
                      {/* Enhanced floating stats */}
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg p-3 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <div className="text-xs text-white/70">Processing Power</div>
                        <div className="text-sm font-bold flex items-center">
                          2.4 TB/s
                          <motion.div 
                            className="ml-1.5 h-1.5 w-1.5 bg-green-500 rounded-full"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                      </div>
                      
                      {/* Enhanced live indicator */}
                      <div className="absolute top-4 left-4 flex items-center">
                        <span className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                        <span className="text-xs text-white/80 font-medium">LIVE</span>
                      </div>
                      
                      {/* Data points overlay */}
                      <motion.div 
                        className="absolute left-1/4 top-1/3 h-3 w-3 rounded-full bg-red-500/80"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div 
                          className="absolute inset-0 rounded-full border border-red-500/50"
                          animate={{ scale: [1, 2], opacity: [1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="absolute right-1/3 top-2/3 h-3 w-3 rounded-full bg-red-500/80"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <motion.div 
                          className="absolute inset-0 rounded-full border border-red-500/50"
                          animate={{ scale: [1, 2], opacity: [1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        />
                      </motion.div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-black/40 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium">Data Sources</div>
                          <div className="text-xs text-white/50">Live</div>
                        </div>
                        <div className="text-2xl font-bold text-red-500">128+</div>
                        <div className="text-xs text-white/50 mt-1">Connected APIs</div>
                        
                        {/* Enhanced mini chart */}
                        <div className="h-8 mt-2 flex items-end gap-1">
                          {[40, 25, 35, 60, 45, 75, 50, 65].map((h, i) => (
                            <motion.div 
                              key={i} 
                              className="flex-1 bg-gradient-to-t from-red-500/80 to-red-500/30 rounded-sm" 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                            >
                              <motion.div 
                                className="w-full h-[1px] bg-white/30"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-black/40 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium">Processing</div>
                          <div className="text-xs text-white/50">Real-time</div>
                        </div>
                        <div className="text-2xl font-bold text-red-500">99.9%</div>
                        <div className="text-xs text-white/50 mt-1">Accuracy Rate</div>
                        
                        {/* Enhanced circular progress */}
                        <div className="flex justify-center mt-2">
                          <div className="relative h-8 w-8">
                            <svg className="h-full w-full" viewBox="0 0 100 100">
                              <circle 
                                cx="50" cy="50" r="40" 
                                fill="none" 
                                stroke="rgba(255,255,255,0.1)" 
                                strokeWidth="10" 
                              />
                              <motion.circle 
                                cx="50" cy="50" r="40" 
                                fill="none" 
                                stroke="url(#circleGradient)" 
                                strokeWidth="10" 
                                strokeDasharray="251.2" 
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 2.5 }}
                                transition={{ duration: 2 }}
                                transform="rotate(-90 50 50)" 
                              />
                              <defs>
                                <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="rgba(255,0,0,0.8)" />
                                  <stop offset="100%" stopColor="rgba(255,50,50,0.5)" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <motion.div 
                              className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              99.9%
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ml" className="mt-0">
                    <div className="aspect-video relative rounded-lg overflow-hidden border border-white/10 group shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                      <img
                        src="https://images.unsplash.com/photo-1677442135136-760c813a7942?q=80&w=2832&auto=format&fit=crop"
                        alt="Machine Learning Models"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-lg font-bold mb-1">ML Models</h4>
                        <p className="text-sm text-white/70">Custom machine learning solutions</p>
                        <Button variant="link" size="sm" className="text-red-500 p-0 h-auto mt-2 group">
                          Learn more <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                      
                      {/* Enhanced model type indicator */}
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg p-3 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <div className="text-xs text-white/70">Model Type</div>
                        <div className="text-sm font-bold flex items-center">
                          Transformer
                          <motion.div 
                            className="ml-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                      </div>
                      
                      {/* Neural network visualization */}
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div 
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
                            style={{ 
                              top: `${20 + i * 15}%`, 
                              left: 0, 
                              right: 0 
                            }}
                            animate={{ 
                              opacity: [0, 0.7, 0],
                              scaleY: [1, 2, 1]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              delay: i * 0.5 
                            }}
                          />
                        ))}
                        
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div 
                            key={i}
                            className="absolute w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent"
                            style={{ 
                              left: `${30 + i * 20}%`, 
                              top: 0, 
                              bottom: 0 
                            }}
                            animate={{ 
                              opacity: [0, 0.7, 0],
                              scaleX: [1, 2, 1]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              delay: i * 0.7 
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-black/40 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium">Models</div>
                          <div className="text-xs text-white/50">Available</div>
                        </div>
                        <div className="text-2xl font-bold text-red-500">50+</div>
                        <div className="text-xs text-white/50 mt-1">Pre-trained Models</div>
                        
                        {/* Enhanced model types */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {['NLP', 'CV', 'RL', 'GAN', 'DRL'].map((type, i) => (
                            <motion.span 
                              key={i} 
                              className="text-xs bg-white/10 px-2 py-0.5 rounded flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.15 }}
                            >
                              <motion.span 
                                className="h-1 w-1 bg-red-500 rounded-full mr-1"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              />
                              {type}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-black/40 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium">Training</div>
                          <div className="text-xs text-white/50">Custom</div>
                        </div>
                        <div className="text-2xl font-bold text-red-500">24/7</div>
                        <div className="text-xs text-white/50 mt-1">Model Training</div>
                        
                        {/* Enhanced training status */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 1.5 }}
                            >
                              <motion.div 
                                className="absolute top-0 right-0 h-full w-5 bg-gradient-to-r from-transparent to-white/30"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                            </motion.div>
                          </div>
                          <span className="text-xs">75%</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="vision" className="mt-0">
                    <div className="aspect-video relative rounded-lg overflow-hidden border border-white/10 group shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                      <img
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2940&auto=format&fit=crop"
                        alt="AI Vision"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-lg font-bold mb-1">AI Vision</h4>
                        <p className="text-sm text-white/70">Computer vision and image recognition</p>
                        <Button variant="link" size="sm" className="text-red-500 p-0 h-auto mt-2 group">
                          Learn more <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                      
                      {/* Enhanced object detection boxes */}
                      <motion.div 
                        className="absolute top-1/4 left-1/4 w-1/5 h-1/5 border-2 border-red-500 rounded-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div 
                          className="absolute -inset-0.5 border border-red-500/50 rounded-sm"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded shadow-lg">
                          Person: 98%
                        </div>
                      </motion.div>
                      <motion.div 
                        className="absolute top-1/3 right-1/4 w-1/6 h-1/6 border-2 border-red-500 rounded-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div 
                          className="absolute -inset-0.5 border border-red-500/50 rounded-sm"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded shadow-lg">
                          Object: 95%
                        </div>
                      </motion.div>
                      
                      {/* Scanning effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent pointer-events-none"
                        style={{ height: '10px' }}
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-black/40 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium">Recognition</div>
                          <div className="text-xs text-white/50">Accuracy</div>
                        </div>
                        <div className="text-2xl font-bold text-red-500">98.7%</div>
                        <div className="text-xs text-white/50 mt-1">Object Detection</div>
                        
                        {/* Enhanced object types */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {['People', 'Vehicles', 'Animals', 'Objects', 'Text'].map((type, i) => (
                            <motion.span 
                              key={i} 
                              className="text-xs bg-white/10 px-2 py-0.5 rounded flex items-center"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.15 }}
                            >
                              <motion.span 
                                className="h-1 w-1 bg-red-500 rounded-full mr-1"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              />
                              {type}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-black/40 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium">Processing</div>
                          <div className="text-xs text-white/50">Speed</div>
                        </div>
                        <div className="text-2xl font-bold text-red-500">0.2s</div>
                        <div className="text-xs text-white/50 mt-1">Response Time</div>
                        
                        {/* Enhanced processing indicator */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4].map((_, i) => (
                              <motion.div 
                                key={i} 
                                className="h-1 w-1 bg-red-500 rounded-full"
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: Infinity, 
                                  delay: i * 0.15 
                                }}
                              ></motion.div>
                            ))}
                          </div>
                          <span className="text-xs text-white/50">Processing...</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Replace the old video modal with the new VideoModal component */}
      <VideoModal
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        videoUrl="/videos/product-demo.mp4"
        title="Product Demo"
      />

      {/* Enhanced floating action button for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-30">
        <motion.button
          className="h-14 w-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAiDemo(!showAiDemo)}
        >
          <Sparkles className="h-6 w-6" />
          <motion.span 
            className="absolute top-0 right-0 h-3 w-3 bg-white rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -inset-1 rounded-full border border-white/20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 group"
          onClick={handleGetStartedClick}
        >
          <span className="mr-1">Get Started</span>
          <ArrowRight className="h-4 w-4 inline group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-6"
          onClick={() => setShowVideo(true)}
        >
          <Play className="h-4 w-4 mr-2" />
          Watch Demo
        </Button>
      </div>
    </section>
  )
}

