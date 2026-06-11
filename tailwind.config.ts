import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"]
      },
      colors: {
        offwhite: "#ECE8E3"
      },
      letterSpacing: {
        tight: "-0.03em",
        tighter: "-0.02em"
      },
      fontSize: {
        display: ["72px", { lineHeight: "1" }],
        headline: ["52px", { lineHeight: "1.05" }],
        title: ["28px", { lineHeight: "1.15" }]
      }
    }
  },
  plugins: []
};

export default config;
