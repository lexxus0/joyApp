/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        lightBackground: "#ffffff",
        lightText: "#000000",
        darkBackground: "#000000",
        darkText: "#ffffff",
      },
    },
  },

  plugins: [],
};
