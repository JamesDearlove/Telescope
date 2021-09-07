module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        // Page Layout
        'layout': '180px minmax(0, 1fr) 250px',
      },
      width: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      height: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
