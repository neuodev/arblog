import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kufi: ["Noto Kufi Arabic", "sans-serif"],
      },
      colors: {
        dark: "#121212",
      },
    },
  },
  plugins: [],
};
export default config;
