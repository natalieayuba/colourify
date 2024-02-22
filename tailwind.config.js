/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Merriweather Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'spotify-green': '#1DB954',
        'colourify-blue': '#0078ca',
      },
    },
  },
  plugins: [],
};
