/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#E08E27",
        "secondary": "#F2AB6D",
        "accent": "#D9183B",
        "neutral": "#8C2703",
        "base-100": "#200600",
        "info": "#0ca6e9",
        "success": "#2bd4bd",
        "warning": "#E9D502",
        "error": "#cc0000",
      },
    }],
  },
}

