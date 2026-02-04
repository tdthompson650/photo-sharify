/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        beige: {
          50: '#fdfbf7',
          100: '#f9f5ee',
          200: '#f5f0e6',
          300: '#e8dfd0',
        },
      },
    },
  },
  plugins: [],
};
