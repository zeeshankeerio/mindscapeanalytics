import React from "react";

// Background component that implements the landing page's background style and effects
export function StandardBackground() {
  // Background gradient styles
  const backgroundStyles = {
    global: "fixed inset-0 w-full",
    gradient: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black z-0",
    overlay: "bg-gradient-to-b from-red-950/30 via-black/0 to-transparent z-0 opacity-40",
    particles: "fixed inset-0 w-full h-full overflow-hidden z-0",
    grid: "absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]",
    glow: "absolute rounded-full bg-red-500/10 blur-[100px] animate-pulse-slow"
  };

  return (
    <>
      {/* Global Background Elements */}
      <div className={`${backgroundStyles.global} ${backgroundStyles.gradient}`}></div>
      <div className={`${backgroundStyles.global} ${backgroundStyles.overlay}`}></div>
      
      {/* Animated Background Particles */}
      <div className={backgroundStyles.particles}>
        <div className={backgroundStyles.grid}></div>
        <div className={`${backgroundStyles.glow} top-1/4 right-1/4 w-64 h-64`}></div>
        <div className={`${backgroundStyles.glow} bottom-1/4 left-1/4 w-80 h-80 blur-[120px]`}></div>
      </div>
    </>
  );
}

// Section background with glow effect
export function SectionBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900/20 rounded-full blur-[120px] opacity-30 animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900/20 rounded-full blur-[120px] opacity-30 animate-pulse-slow"></div>
    </div>
  );
} 