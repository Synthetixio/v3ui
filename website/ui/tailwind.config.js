/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        inconsolata: ['Inconsolata', 'monospace'],
      },
      fontSize: {
        bodyText: '15px',
        header: '23px',
      },
      lineHeight: {
        body: '26px',
      },
      letterSpacing: {
        body: '0.01em',
        header: '0.16em',
        tab: '0.12em',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
