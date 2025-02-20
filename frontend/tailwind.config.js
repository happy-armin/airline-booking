/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111712",
        yellow: "#FECB5B",
        "yellow-light": "#FFED5B",
        green: "#69bE90",
        "green-light": "#86D7AB",
        pink: "#FFC0CB",
        "pink-light": "#FFE0E6",
        dark: "#111712",
        grey: "#282C2C",
        "grey-dark": "#191E1E",
        "grey-light": "#7D9596",
        "grey-normal": "#828A87",
        "grey-bright": "#C6C1AE",
      },
    },
  },
  plugins: [],
};
