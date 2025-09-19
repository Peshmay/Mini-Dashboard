/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 10px 25px -10px rgba(0,0,0,.25)',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0, transform: 'translateY(4px) scale(.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        pop: {
          '0%': { transform: 'scale(.96)', opacity: .7 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        fade: 'fade .35s ease-out',
        pop: 'pop .12s ease-out',
      },
    },
  },
  plugins: [],
}
