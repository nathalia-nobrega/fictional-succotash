/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './app/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        main: 'Jost_400Regular',
        secondary: 'Jost_500Medium',
      },
    },
    colors: {
      red: {
        100: '#FF8C9A',
        400: '#AF4949',
        800: '#F50057',
        900: '#EF233C',
      },
      maroon: {
        900: '#432626',
      },
    },
  },
  plugins: [],
}
