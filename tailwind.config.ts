/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        lightBackground: "#cdedfd",
        lightText: "#000000",
        darkBackground: "#1b1f36",
        darkText: "#ffffff",
      },
      backgroundImage: {
        light: "linear-gradient(319deg, #cdedfd 0%, #ffec82 37%, #ffcfd2 100%)",
        dark: "linear-gradient(135deg, #1b1f36, #121212)",
      },
    },
  },
  plugins: [],
};
