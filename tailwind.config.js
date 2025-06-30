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
        // Light Theme
        'background-primary': '#FCF9F6',
        'background-secondary': '#fffcf8',
        'text-primary': '#42322d',
        'text-secondary': '#767676',
        'accent-primary': '#F4C18D',
        'accent-primary-light': '#F7D2A9',
        'accent-hover': '#42322d',
        'text-on-accent': '#402D1A',
        'border-subtle': '#EAE4DD',
        'border-interactive': '#A07F56',
        'error': '#D32F2F',
        'light-bg-footer': '#26211e',

        // Dark Theme - Refined Palette
        'dark-bg-primary': '#1e2c33',
        'dark-bg-secondary': '#151f23',
        'dark-bg-footer': '#10171a',
        'dark-heading': '#f5e5d1',
        'dark-text-primary': '#d1cfc9',
        'dark-text-secondary': '#A39E96',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      fontWeight: {
          'regular': 400,
          'bold': 700,
      },
      boxShadow: {
        'soft-lift': '0 4px 20px -5px rgba(74, 59, 42, 0.2)',
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
