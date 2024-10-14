import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        agbalumo: ['var(--font-agbalumo)'],
        raleway: ['var(--font-raleway)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        background: 'hsl(var(--background), 1)',
        foreground: 'hsl(var(--foreground), 1)',
        componentsBg: 'hsl(var(--components-bg), 1)',
        btnBg: 'hsl(var(--btn-bg), 1)',
        btnFg: 'hsl(var(--btn-fg), 1)',
        footerBg: 'hsl(var(--footer-bg), 1)',
        footerFg: 'hsl(var(--footer-fg), 1)',
        cardDate: 'hsl(var(--card-date), 1)',
        cardCreatePrimary: 'hsl(var(--card-create-primary), 1)',
        cardCreateSecondary: 'hsl(var(--card-create-secondary), 1)',
        cardResearchPrimary: 'hsl(var(--card-research-primary), 1)',
        cardResearchSecondary: 'hsl(var(--card-research-secondary), 1)',
        btnPublic: 'hsl(var(--btn-public), 1)',
        btnPrivate: 'hsl(var(--btn-private), 1)',
      },
    },
  },
};
export default config;
