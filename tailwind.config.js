/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Merriweather Sans', 'sans-serif'],
    },
    colors: {
      'spotify-green': '#1ed760',
      black: '#121212',
      white: '#fff',
      blue: '#0077CC',
      gray: colors.gray,
    },
    backgroundImage: {
      'darker-center': 'radial-gradient(#00000030 40%, transparent)',
    },
  },
};
