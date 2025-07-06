/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        monopoly: {
          green: '#1a7f37',
          red: '#dc2626',
          blue: '#1d4ed8',
          yellow: '#facc15',
          orange: '#ea580c',
          pink: '#ec4899',
          brown: '#92400e',
          lightblue: '#0ea5e9',
          darkblue: '#1e3a8a',
          purple: '#7c3aed'
        }
      },
      fontFamily: {
        monopoly: ['Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
} 