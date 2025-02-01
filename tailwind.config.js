/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
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
        dark: {
          50: '#f7f7f8',
          100: '#ececf1',
          200: '#d9d9e3',
          300: '#c5c5d2',
          400: '#a0a0b8',
          500: '#8e8ea0',
          600: '#6e6e80',
          700: '#4a4a5c',
          800: '#2d2d3a',
          900: '#202127',
          950: '#101014',
        },
        score: {
          low: '#ef4444',
          mid: '#eab308',
          high: '#22c55e',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 