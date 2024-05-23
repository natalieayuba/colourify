/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/config');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Merriweather Sans', 'sans-serif'],
    },
    extend: { colors },
  },
  plugins: [],
};
