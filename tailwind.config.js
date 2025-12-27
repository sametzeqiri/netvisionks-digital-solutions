/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6600',
        accent: '#FFEE00',
        dark: {
          900: '#111111',
          800: '#1A1A1A',
        }
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'serif'],
        sans: ['"Nunito Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
