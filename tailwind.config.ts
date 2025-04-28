import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "typing-cursor": {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "border-blink": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(185, 28, 28, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(185, 28, 28, 0.7)",
          },
        },
        wave: {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
        },
        "enhanced-pulse": {
          "0%": {
            filter: "drop-shadow(0 0 2px rgba(255, 0, 0, 0.5)) brightness(0.9)",
            transform: "scale(1)",
          },
          "50%": {
            filter: "drop-shadow(0 0 10px rgba(255, 0, 0, 0.8)) brightness(1.2)",
            transform: "scale(1.05)",
          },
          "100%": {
            filter: "drop-shadow(0 0 2px rgba(255, 0, 0, 0.5)) brightness(0.9)",
            transform: "scale(1)",
          },
        },
        "logo-pulse": {
          "0%": {
            opacity: "1",
            filter: "drop-shadow(0 0 2px rgba(139, 0, 0, 0.3))",
            transform: "scale(1)",
          },
          "15%": {
            opacity: "0.8",
            filter: "drop-shadow(0 0 8px rgba(139, 0, 0, 0.7))",
            transform: "scale(1.12)",
          },
          "30%": {
            opacity: "0.95",
            filter: "drop-shadow(0 0 4px rgba(139, 0, 0, 0.5))",
            transform: "scale(1.05)",
          },
          "45%": {
            opacity: "0.85",
            filter: "drop-shadow(0 0 6px rgba(139, 0, 0, 0.6))",
            transform: "scale(1.08)",
          },
          "70%": {
            opacity: "1",
            filter: "drop-shadow(0 0 3px rgba(139, 0, 0, 0.4))",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "1",
            filter: "drop-shadow(0 0 2px rgba(139, 0, 0, 0.3))",
            transform: "scale(1)",
          },
        },
        "svg-blink": {
          "0%": {
            filter: "brightness(1) drop-shadow(0 0 5px rgba(220, 38, 38, 0.7))",
          },
          "50%": {
            filter: "brightness(1.6) drop-shadow(0 0 15px rgba(220, 38, 38, 0.9))",
          },
          "100%": {
            filter: "brightness(1) drop-shadow(0 0 5px rgba(220, 38, 38, 0.7))",
          },
        },
        "shine": {
          "0%": {
            transform: "translateX(-100%) skewX(-15deg)",
          },
          "100%": {
            transform: "translateX(100%) skewX(-15deg)",
          }
        },
        "button-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-x": "gradient-x 8s ease infinite",
        "typing-cursor": "typing-cursor 0.8s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "border-blink": "border-blink 3s ease-in-out infinite",
        "border-flow": "border-flow 8s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "pulse-slow": "pulse 6s ease-in-out infinite",
        "wave-slow": "wave 6s ease-in-out infinite",
        "enhanced-pulse": "enhanced-pulse 1.5s ease-in-out infinite",
        "logo-pulse": "logo-pulse 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        "svg-blink": "svg-blink 2s ease-in-out infinite",
        "shine": "shine 3s ease-in-out infinite",
        "button-pulse": "button-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
