/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        105: "1.05",
      },
      colors: {
        theme: {
          green: "#158041",
        },
      },
    },
  },
  plugins: [],
};
