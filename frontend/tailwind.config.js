/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'purpleButton': '#9450A1',
        'blackText': '#0D0842',
        'whiteBg': '#F3F3F3',
        'orangeFav': '#FF5841',
      },
      fontFamily: {
        'textFont': ['Montserrat', 'sans-serif'],
        'buttonFont': ['Nunito Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

