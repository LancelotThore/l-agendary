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
        background: 'hsl(var(--background)/<alpha-option>)',
        foreground: 'hsl(var(--foreground)/<alpha-option>)',
        componentsBg: 'hsl(var(--components-bg)/<alpha-option>)',
        btnBg: 'hsl(var(--btn-bg)/<alpha-option>)',
        btnFg: 'hsl(var(--btn-fg)/<alpha-option>)',
        footerBg: 'hsl(var(--footer-bg)/<alpha-option>)',
        footerFg: 'hsl(var(--footer-fg)/<alpha-option>)',
        cardDate: 'hsl(var(--card-date)/<alpha-option>)',
        cardCreatePrimary: 'hsl(var(--card-create-primary)/<alpha-option>)',
        cardCreateSecondary: 'hsl(var(--card-create-secondary)/<alpha-option>)',
        cardResearchPrimary: 'hsl(var(--card-research-primary)/<alpha-option>)',
        cardResearchSecondary: 'hsl(var(--card-research-secondary)/<alpha-option>)',
        btnPublic: 'hsl(var(--btn-public)/<alpha-option>)',
        btnPrivate: 'hsl(var(--btn-private)/<alpha-option>)',
      },
    },
  },
  plugins: [],
};
export default config;
