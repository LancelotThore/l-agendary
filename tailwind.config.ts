import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        componentsBg: 'hsl(var(--components-bg) / <alpha-value>)',
        btnBg: 'hsl(var(--btn-bg) / <alpha-value>)',
        btnFg: 'hsl(var(--btn-fg) / <alpha-value>)',
        btnFgS: 'hsl(var(--btn-fg-secondary) / <alpha-value>)',
        footerBg: 'hsl(var(--footer-bg) / <alpha-value>)',
        footerFg: 'hsl(var(--footer-fg) / <alpha-value>)',
        cardDate: 'hsl(var(--card-date) / <alpha-value>)',
        cardCreatePrimary: 'hsl(var(--card-create-primary) / <alpha-value>)',
        cardCreateSecondary: 'hsl(var(--card-create-secondary) / <alpha-value>)',
        cardResearchPrimary: 'hsl(var(--card-research-primary) / <alpha-value>)',
        cardResearchSecondary: 'hsl(var(--card-research-secondary) / <alpha-value>)',
        btnPublic: 'hsl(var(--btn-public) / <alpha-value>)',
        btnPrivate: 'hsl(var(--btn-private) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};

export default config;