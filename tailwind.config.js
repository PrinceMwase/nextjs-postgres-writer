module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'zapf': ['"Zapf Chancery"', 'cursive'], // use the same name as in the @import rule
      },
    },
  },
  plugins: [],
};
