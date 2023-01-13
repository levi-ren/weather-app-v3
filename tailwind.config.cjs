/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: "Quicksand, sans-serif",
      },
      backgroundImage: {
        day: "url('./assets/day.svg')",
        night: "url('./assets/night.svg')",
      },
    },
  },
  plugins: [],
};
