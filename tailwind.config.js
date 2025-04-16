/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        "bounce-custom": {
          "0%": { transform: "translateY(250px)", filter: "hue-rotate(0deg)" },
          "50%": { transform: "translateY(0)" },
          "100%": {
            transform: "translateY(250px)",
            filter: "hue-rotate(180deg)",
          },
        },
      },
      animation: {
        "bounce-custom": "bounce-custom 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
