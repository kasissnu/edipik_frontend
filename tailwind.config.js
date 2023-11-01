/** @type {import('tailwindcss').Config} */

const colors = require('./src/utils/colors');

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  important: "#root",
  theme: {
    screens: {
      'xs': '0px',
      // => @media (min-width: 0px) { ... }

      'sm': '600px',
      // => @media (min-width: 640px) { ... }

      'md': '900px',
      // => @media (min-width: 768px) { ... }

      'lg': '1200px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1536px',
      // => @media (min-width: 1280px) { ... }
    },
    colors: colors,
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['playfair', 'sans-serif'],
        'mistrully': ['mistrully', 'sans-serif'],
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}