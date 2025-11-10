/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9146FF',
        secondary: '#772CE8',
        dark: {
          900: '#0e0e10',
          800: '#18181b',
          700: '#1f1f23',
        }
      }
    },
  },
  plugins: [],
}