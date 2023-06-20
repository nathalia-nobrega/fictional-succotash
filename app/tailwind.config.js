/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/*.tsx', './src/components/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        main: 'Jost_400Regular',
        secondary: 'Jost_500Medium',
      },
    },
    colors: {
      transparent: 'transparent',
      red: {
        400: '#f87171',
        900: '#EF233C',
      },
      maroon: {
        400: '#AF4949',
        900: '#432626',
      },
      rose: {
        200: '#fecdd3',
        300: '#FF8C9A',
        400: '#FF7E8E',
        500: '#f43f5e',
        600: '#e11d48',
      },
      gray: {
        300: '#d1d5db',
      },
    },
  },
  plugins: [],
}
