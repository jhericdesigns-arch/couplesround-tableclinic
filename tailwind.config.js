/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — magenta/hot-pink from logo outer ring
        blush: {
          50:  '#fef0f7',
          100: '#fde3f2',
          200: '#fbc9e8',
          300: '#f99dd5',
          400: '#f565b5',
          500: '#e91e8c',
          600: '#d0176d',
          700: '#ab1358',
          800: '#891047',
          900: '#6e0d39',
        },
        // Secondary — sky blue from logo bottom half
        plum: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Crimson — logo heart red (used for rose/error states too)
        rose: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // Warm gold — premium accent
        champagne: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        cream:    '#fdfcfa',
        ivory:    '#faf6f1',
        mocha:    '#475569',   // slate-600 — cool body text
        espresso: '#0f172a',   // slate-900 — deep nav/headings
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans:  ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
