// const defaultTheme = require('tailwindcss/defaultTheme')

let colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: colors,
    },
  },
  plugins: [],
}
