/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/config');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Merriweather Sans', 'sans-serif'],
    },
    extend: {
      colors,
      backgroundImage: {
        'radial-gradient': `radial-gradient(${colors['spotify-green-darker']}, transparent)`,
      },
    },
  },
  plugins: [],
};
