"use client"

import MindscapeBrainLogo from "@/components/mindscape-brain-logo"

export default function LogoShowcase() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-gray-950 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Mindscape Logo Showcase</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center gap-6 bg-black/50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white">Logo with Text</h2>
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/70">Small</p>
              <MindscapeBrainLogo size="sm" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/70">Medium</p>
              <MindscapeBrainLogo size="md" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/70">Large</p>
              <MindscapeBrainLogo size="lg" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/70">Extra Large</p>
              <MindscapeBrainLogo size="xl" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-6 bg-black/50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white">Icon Only</h2>
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/70">Small</p>
              <MindscapeBrainLogo size="sm" variant="icon-only" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/70">Medium</p>
              <MindscapeBrainLogo size="md" variant="icon-only" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/70">Large</p>
              <MindscapeBrainLogo size="lg" variant="icon-only" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/70">Extra Large</p>
              <MindscapeBrainLogo size="xl" variant="icon-only" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-black/50 rounded-xl">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">Usage Example in Navbar</h2>
        <div className="bg-black/80 p-4 rounded-lg flex items-center justify-between">
          <MindscapeBrainLogo size="md" />
          <div className="flex gap-4">
            <span className="text-white/70 text-sm">Home</span>
            <span className="text-white/70 text-sm">Products</span>
            <span className="text-white/70 text-sm">Solutions</span>
            <span className="text-white/70 text-sm">Pricing</span>
            <span className="text-white/70 text-sm">Contact</span>
          </div>
        </div>
      </div>
    </div>
  );
} 