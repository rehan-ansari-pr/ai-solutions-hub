/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        havas: {
          red: '#E50200',
          redHover: '#C70200',
          redSoft: '#FBE3E3',
          redSoftText: '#B80200',
          black: '#0D0D0D',
          dark: '#1F1F1F',
          body: '#4B5563',
          muted: '#8C8C8C',
          border: '#E5E7EB',
          borderDark: '#D1D5DB',
          light: '#F8F9FA',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Arial', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
