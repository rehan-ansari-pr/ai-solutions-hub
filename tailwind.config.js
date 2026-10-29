/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080A0F',
          darker: '#040608',
          surface: '#0F131D',
          surfaceHover: '#161C2B',
          border: '#1E2638',
          borderLight: '#2D374D',
          orange: '#FF5C00',
          orangeGlow: '#FF7A29',
          cyan: '#00D2FF',
          purple: '#8B5CF6',
          green: '#10B981',
          crimson: '#E50200',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 92, 0, 0.25)',
        'glow-cyan': '0 0 25px -5px rgba(0, 210, 255, 0.25)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.25)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
