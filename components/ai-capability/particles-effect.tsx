"use client"

import { useEffect } from "react"

// Define type here instead of importing to avoid circular dependency
type CapabilityId = "nlp" | "cv" | "ml" | "gen-ai" | "doc-ai" | "code-ai";

interface AIParticlesEffectProps {
  activeTab: CapabilityId
}

export function AIParticlesEffect({ activeTab }: AIParticlesEffectProps) {
  useEffect(() => {
    // Clean up any existing particles
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random sizes
      const size = Math.random() * 5 + 2;
      
      // Random positions
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const z = Math.random() * 100 - 50;
      
      // Color based on active tab
      let color;
      switch(activeTab) {
        case 'nlp':
          color = `rgba(239, 68, 68, ${Math.random() * 0.5 + 0.1})`;
          break;
        case 'cv':
          color = `rgba(249, 115, 22, ${Math.random() * 0.5 + 0.1})`;
          break;
        case 'ml':
          color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.1})`;
          break;
        case 'gen-ai':
          color = `rgba(217, 70, 239, ${Math.random() * 0.5 + 0.1})`;
          break;
        case 'doc-ai':
          color = `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.1})`;
          break;
        case 'code-ai':
          color = `rgba(245, 158, 11, ${Math.random() * 0.5 + 0.1})`;
          break;
        default:
          color = `rgba(239, 68, 68, ${Math.random() * 0.5 + 0.1})`;
      }
      
      // Animation duration
      const duration = 15 + Math.random() * 30;
      
      // Apply styles
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.transform = `translateZ(${z}px)`;
      particle.style.animation = `float ${duration}s infinite ease-in-out`;
      particle.style.opacity = '0.6';
      
      // Add to container
      container.appendChild(particle);
    }
    
    // Cleanup function
    return () => {
      if (container) container.innerHTML = '';
    };
  }, [activeTab]);
  
  return (
    <div id="particles-container" className="absolute inset-0 z-0 pointer-events-none perspective-1000">
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) translateZ(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) translateZ(10px) rotate(5deg);
          }
          50% {
            transform: translateY(10px) translateX(-15px) translateZ(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(15px) translateX(5px) translateZ(20px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
} 