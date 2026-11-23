
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        romantic: {
          pink: "#F7B6CC",
          rose: "#E88BAA",
          red: "#9F234B",
          dark: "#24121F",
          gold: "#D6B477",
          cream: "#FFF5EE",
        },
      },
      fontFamily: {
        romantic: ["Georgia", "serif"],
        display: ['"Cormorant Garamond"', '"Playfair Display"', "Georgia", "serif"],
        body: ['"Cormorant Garamond"', "Georgia", "serif"],
        handwritten: ['"Great Vibes"', '"Cormorant Garamond"', "cursive"],
      },
    },
  },
  plugins: [],
};