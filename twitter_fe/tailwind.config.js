/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'darkslategrey': '#374b4a',
        'feldgrau': '#526760',
        'photoblue': '#88d9e6',
        'tropicalindigo': '#7f7eff'

      }
    },
  },
  plugins: [],
}

