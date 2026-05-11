/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink-soft': '#ffe4e9',
        'pink-light': '#ffcdd9',
        'pink-primary': '#ff8fa3',
        'rose': '#ff6b8a',
        'coral': '#ff7f95',
        'cream': '#fdf8f5',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'exo': ['Exo 2', 'sans-serif'],
        'syncopate': ['Syncopate', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 143, 163, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 143, 163, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}