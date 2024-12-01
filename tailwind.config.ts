import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grid-pattern': 
        `repeating-linear-gradient(to right, #222 0px, #222 1px, black 1px, black 40px), 
         repeating-linear-gradient(to bottom, #222 0px, #222 1px, black 1px, black 40px)`,
    },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'scroll-x': 'scroll-x 20s linear infinite',
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
