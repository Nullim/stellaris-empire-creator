/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'gothic': ['Century Gothic']
    },
    extend: {
      colors: {
        stellarisGreen: ''
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

