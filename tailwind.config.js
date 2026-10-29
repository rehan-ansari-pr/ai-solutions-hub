/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Tokens from ppt template - pivotroots.pptx (primary system)
        ink: { DEFAULT: v('ink'), 2: v('ink-2') },
        slate: v('slate'),
        mist: v('mist'),
        line: { DEFAULT: v('line'), soft: v('line-soft') },
        paper: v('paper'),
        card: v('card'),
        fg: v('fg'),
        lime: { DEFAULT: v('lime'), deep: v('lime-deep') },
        // Tokens from ppt template - havas.pptx (signature only)
        havas: {
          red: v('havas-red'),
          redSoft: v('havas-red-soft'),
          black: v('havas-black'),
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        display: ['Montserrat', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        btn: '4px',
        card: '6px',
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
}
