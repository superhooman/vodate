const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      scale: ['group-hover', 'active'],
      fill: ['first'],
      borderColor: ['dark']
    },
  },
  plugins: [],
}
