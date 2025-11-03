/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // tells Tailwind where to look for class names
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // hospital blue
        secondary: "#16a34a", // health green
        accent: "#9333ea", // appointment purple
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};