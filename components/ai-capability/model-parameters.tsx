"use client"

import { Slider } from "@/components/ui/slider"

interface ModelParametersProps {
  settings: {
    temperature: number;
    maxTokens: number;
    topP: number;
  };
  onChange: (setting: string, value: number) => void;
}

export function ModelParameters({ settings, onChange }: ModelParametersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 bg-black/30 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="temperature-slider" className="text-sm text-white/70">Temperature</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{settings.temperature.toFixed(1)}</span>
        </div>
        <Slider
          id="temperature-slider"
          value={[settings.temperature * 10]}
          min={0}
          max={10}
          step={1}
          onValueChange={(value) => onChange("temperature", value[0] / 10)}
          className="my-1.5"
          aria-label="Adjust temperature"
        />
        <p className="text-xs text-white/50">Controls randomness: lower is more deterministic</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="max-tokens-slider" className="text-sm text-white/70">Max Tokens</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{settings.maxTokens}</span>
        </div>
        <Slider
          id="max-tokens-slider"
          value={[settings.maxTokens]}
          min={10}
          max={300}
          step={10}
          onValueChange={(value) => onChange("maxTokens", value[0])}
          className="my-1.5"
          aria-label="Adjust maximum tokens"
        />
        <p className="text-xs text-white/50">Maximum length of generated output</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="top-p-slider" className="text-sm text-white/70">Top P</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{settings.topP.toFixed(1)}</span>
        </div>
        <Slider
          id="top-p-slider"
          value={[settings.topP * 10]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => onChange("topP", value[0] / 10)}
          className="my-1.5"
          aria-label="Adjust top P"
        />
        <p className="text-xs text-white/50">Nucleus sampling: diversity vs. specificity</p>
      </div>
    </div>
  );
} 