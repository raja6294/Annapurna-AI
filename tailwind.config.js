/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        pineCanopy: {
          DEFAULT: "#14261E",
          hover: "#1B3328",
          light: "#234234",
        },
        milledStone: {
          DEFAULT: "#EDE8DE",
          dark: "#E2DDD1",
          light: "#F5F2EA",
        },
        spiceGold: {
          DEFAULT: "#B98A2E",
          hover: "#A37825",
          light: "#D4A648",
          subtle: "#F9F4E8",
        },
        brickUrgency: {
          DEFAULT: "#8C3B2E",
          hover: "#783226",
          subtle: "#FDF2F0",
        },
        mossVerified: {
          DEFAULT: "#3F6B4A",
          hover: "#34583D",
          subtle: "#F0F5F1",
        },
        warmCharcoal: {
          DEFAULT: "#211D16",
          muted: "#5A544A",
          light: "#8C8476",
        },
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
          DEFAULT: "#B98A2E", // Spice Gold Signature
          secondary: "#14261E", // Pine Canopy
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["Fraunces", "Calistoga", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'accent': '0 4px 14px rgba(0, 82, 255, 0.25)',
        'accent-lg': '0 8px 24px rgba(0, 82, 255, 0.35)',
        'card-hover': '0 16px 32px -4px rgba(0, 82, 255, 0.12), 0 0 0 1px rgba(0, 82, 255, 0.2)',
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
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.2)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 60s linear infinite",
        "float": "float 5s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
